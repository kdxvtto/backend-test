import * as orderRepository from "../repositories/orderRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import * as addOnRepository from "../repositories/addOnRepository.js";
import { withTransaction } from "../utils/transaction.js";
import { createError } from "../utils/error.js";

const toMoney = (value) => Number(Number(value || 0).toFixed(2));

const generateOrderNumber = () => {
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `ORD-${Date.now()}-${random}`;
};

const countTotal = (subtotal, discount, tax) => {
    if (discount > subtotal) {
        throw createError(400, "Discount cannot be greater than subtotal");
    }

    return toMoney(subtotal - discount + tax);
};

const getOrderStatus = (status, paymentStatus, paymentStatusWasSent, currentStatus = "pending") => {
    if (status) {
        return status;
    }

    if (paymentStatusWasSent) {
        return paymentStatus === "paid" ? "paid" : "pending";
    }

    return currentStatus;
};

const buildPayment = (payment = {}, total, existingPayment = null, status = null) => {
    const paymentStatus = status === "paid"
        ? "paid"
        : payment.payment_status ?? existingPayment?.payment_status ?? "pending";

    const amount = toMoney(payment.amount ?? existingPayment?.amount ?? 0);

    if (paymentStatus === "paid" && amount < total) {
        throw createError(400, "Payment amount is less than order total");
    }

    return {
        payment_method: payment.payment_method ?? existingPayment?.payment_method ?? "cash",
        payment_status: paymentStatus,
        amount,
        change_amount: paymentStatus === "paid" ? toMoney(amount - total) : 0,
        paid_at: paymentStatus === "paid" ? existingPayment?.paid_at ?? new Date() : null
    };
};

const prepareOrderItems = async (items, db) => {
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
        const product = await productRepository.findProductById(item.product_id, db);

        if (!product || !product.is_active) {
            throw createError(404, "Product not found");
        }

        if (Number(product.stock_quantity) < item.quantity) {
            throw createError(400, `Stock for ${product.name} is not enough`);
        }

        const productSubtotal = toMoney(product.price * item.quantity);
        const addOns = [];

        for (const itemAddOn of item.add_ons || []) {
            const addOn = await addOnRepository.findAddOnById(itemAddOn.add_on_id, db);

            if (!addOn || !addOn.is_active) {
                throw createError(404, "Add-on not found");
            }

            const productAddOn = await addOnRepository.findProductAddOn(
                item.product_id,
                itemAddOn.add_on_id,
                db
            );

            if (!productAddOn) {
                throw createError(400, `${addOn.name} is not available for ${product.name}`);
            }

            const quantity = item.quantity * itemAddOn.quantity;
            const addOnSubtotal = toMoney(addOn.price * quantity);

            addOns.push({
                add_on_id: addOn.id,
                add_on_name: addOn.name,
                quantity,
                unit_price: toMoney(addOn.price),
                unit_cost: toMoney(addOn.cost_price),
                subtotal: addOnSubtotal
            });

            subtotal += addOnSubtotal;
        }

        orderItems.push({
            product_id: product.id,
            product_name: product.name,
            quantity: item.quantity,
            unit_price: toMoney(product.price),
            unit_cost: toMoney(product.cost_price),
            subtotal: productSubtotal,
            add_ons: addOns
        });

        subtotal += productSubtotal;
    }

    return {
        orderItems,
        subtotal: toMoney(subtotal)
    };
};

const decreaseStock = async (items, db) => {
    for (const item of items) {
        const isUpdated = await productRepository.decreaseProductStock(
            item.product_id,
            item.quantity,
            db
        );

        if (!isUpdated) {
            throw createError(400, `Stock for ${item.product_name} is not enough`);
        }
    }
};

const restoreStock = async (orderId, db) => {
    const items = await orderRepository.findOrderItems(orderId, db);

    for (const item of items) {
        await productRepository.increaseProductStock(item.product_id, item.quantity, db);
    }
};

const saveOrderItems = async (orderId, items, db) => {
    for (const item of items) {
        const orderItemId = await orderRepository.createOrderItem(
            {
                order_id: orderId,
                product_id: item.product_id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                unit_cost: item.unit_cost,
                subtotal: item.subtotal
            },
            db
        );

        for (const addOn of item.add_ons) {
            await orderRepository.createOrderItemAddOn(
                {
                    order_item_id: orderItemId,
                    add_on_id: addOn.add_on_id,
                    add_on_name: addOn.add_on_name,
                    quantity: addOn.quantity,
                    unit_price: addOn.unit_price,
                    unit_cost: addOn.unit_cost,
                    subtotal: addOn.subtotal
                },
                db
            );
        }
    }
};

const buildOrderDetail = (order, items, addOns, payment) => {
    const addOnsByItemId = {};

    for (const addOn of addOns) {
        if (!addOnsByItemId[addOn.order_item_id]) {
            addOnsByItemId[addOn.order_item_id] = [];
        }

        addOnsByItemId[addOn.order_item_id].push(addOn);
    }

    return {
        ...order,
        items: items.map((item) => ({
            ...item,
            add_ons: addOnsByItemId[item.id] || []
        })),
        payment
    };
};

export const getAllOrders = async (query = {}) => {
    const orders = await orderRepository.findAllOrders();

    if (query.status) {
        return orders.filter((order) => order.status === query.status);
    }

    return orders;
};

export const getOrderById = async (id) => {
    const order = await orderRepository.findOrderById(id);

    if (!order) {
        throw createError(404, "Order not found");
    }

    const items = await orderRepository.findOrderItems(id);
    const addOns = await orderRepository.findOrderItemAddOns(id);
    const payment = await orderRepository.findPaymentByOrderId(id);

    return buildOrderDetail(order, items, addOns, payment);
};

export const getItemsByOrderId = async (orderId) => {
    const order = await orderRepository.findOrderById(orderId);

    if (!order) {
        throw createError(404, "Order not found");
    }

    return await orderRepository.findOrderItems(orderId);
};

export const getAddOnsByOrderId = async (orderId) => {
    const order = await orderRepository.findOrderById(orderId);

    if (!order) {
        throw createError(404, "Order not found");
    }

    return await orderRepository.findOrderItemAddOns(orderId);
};

export const getPaymentByOrderId = async (orderId) => {
    const order = await orderRepository.findOrderById(orderId);

    if (!order) {
        throw createError(404, "Order not found");
    }

    return await orderRepository.findPaymentByOrderId(orderId);
};

export const createNewOrder = async (order) => {
    const orderId = await withTransaction(async (db) => {
        const prepared = await prepareOrderItems(order.items, db);
        const discount = toMoney(order.discount);
        const tax = toMoney(order.tax);
        const total = countTotal(prepared.subtotal, discount, tax);
        const payment = buildPayment(order.payment, total);
        const status = payment.payment_status === "paid" ? "paid" : "pending";

        await decreaseStock(prepared.orderItems, db);

        const newOrderId = await orderRepository.createOrder(
            {
                order_number: generateOrderNumber(),
                customer_name: order.customer_name,
                status,
                subtotal: prepared.subtotal,
                discount,
                tax,
                total,
                notes: order.notes ?? null
            },
            db
        );

        await saveOrderItems(newOrderId, prepared.orderItems, db);
        await orderRepository.createPayment({ ...payment, order_id: newOrderId }, db);

        return newOrderId;
    });

    return await getOrderById(orderId);
};

export const updateOrderById = async (id, order) => {
    const existingOrder = await orderRepository.findOrderById(id);

    if (!existingOrder) {
        throw createError(404, "Order not found");
    }

    if (existingOrder.status === "cancelled") {
        throw createError(400, "Cancelled order cannot be updated");
    }

    if (order.status === "cancelled") {
        return await cancelOrderById(id);
    }

    const orderId = await withTransaction(async (db) => {
        let subtotal = toMoney(existingOrder.subtotal);
        let preparedItems = null;

        if (order.items) {
            await restoreStock(id, db);

            const prepared = await prepareOrderItems(order.items, db);
            await decreaseStock(prepared.orderItems, db);
            await orderRepository.deleteOrderItemAddOns(id, db);
            await orderRepository.deleteOrderItems(id, db);

            preparedItems = prepared.orderItems;
            subtotal = prepared.subtotal;
        }

        const discount = toMoney(order.discount ?? existingOrder.discount);
        const tax = toMoney(order.tax ?? existingOrder.tax);
        const total = countTotal(subtotal, discount, tax);
        const existingPayment = await orderRepository.findPaymentByOrderId(id, db);
        const payment = buildPayment(order.payment, total, existingPayment, order.status);
        const status = getOrderStatus(
            order.status,
            payment.payment_status,
            Boolean(order.payment?.payment_status),
            existingOrder.status
        );

        await orderRepository.updateOrder(
            id,
            {
                customer_name: order.customer_name ?? existingOrder.customer_name,
                status,
                subtotal,
                discount,
                tax,
                total,
                notes: order.notes !== undefined ? order.notes : existingOrder.notes
            },
            db
        );

        if (preparedItems) {
            await saveOrderItems(id, preparedItems, db);
        }

        if (existingPayment) {
            await orderRepository.updatePaymentByOrderId(id, payment, db);
        } else {
            await orderRepository.createPayment({ ...payment, order_id: id }, db);
        }

        return id;
    });

    return await getOrderById(orderId);
};

export const cancelOrderById = async (id) => {
    const existingOrder = await orderRepository.findOrderById(id);

    if (!existingOrder) {
        throw createError(404, "Order not found");
    }

    if (existingOrder.status === "cancelled") {
        return await getOrderById(id);
    }

    const orderId = await withTransaction(async (db) => {
        await restoreStock(id, db);
        await orderRepository.cancelOrder(id, db);

        return id;
    });

    return await getOrderById(orderId);
};
