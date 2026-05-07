import {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrderById,
    cancelOrderById
} from "../services/orderServices.js";

export const findAllOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrders(req.query);
        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
        return next(err);
    }
}

export const findOrderById = async (req, res, next) => {
    try {
        const order = await getOrderById(req.params.id);
        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        return next(err);
    }
}

export const createNewOrderController = async (req, res, next) => {
    try {
        const order = await createNewOrder(req.body);
        return res.status(201).json({
            success: true,
            data: order
        });
    } catch (err) {
        return next(err);
    }
}

export const updateOrderByIdController = async (req, res, next) => {
    try {
        const order = await updateOrderById(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        return next(err);
    }
}

export const cancelOrderByIdController = async (req, res, next) => {
    try {
        const order = await cancelOrderById(req.params.id);
        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        return next(err);
    }
}
