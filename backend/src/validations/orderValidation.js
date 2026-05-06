import { z } from 'zod';

const idSchema = z.coerce.number().int().positive();
const quantitySchema = z.coerce.number().int().positive();
const moneySchema = z.coerce.number().nonnegative();

const itemAddOnSchema = z.object({
    add_on_id: idSchema,
    quantity: quantitySchema.optional().default(1)
});

const itemSchema = z.object({
    product_id: idSchema,
    quantity: quantitySchema,
    add_ons: z.array(itemAddOnSchema).optional().default([])
});

const paymentSchema = z.object({
    payment_method: z.enum(['cash', 'card']).optional().default('cash'),
    payment_status: z.enum(['pending', 'paid', 'failed']).optional().default('pending'),
    amount: moneySchema,
    change_amount: moneySchema.optional().default(0)
});

export const createOrderSchema = z.object({
    customer_name: z.string().trim().min(2).max(255),
    items: z.array(itemSchema).min(1),
    payment: paymentSchema,
    discount: moneySchema.optional().default(0),
    tax: moneySchema.optional().default(0),
    notes: z.string().trim().max(1000).optional().nullable()
});

export const updateOrderSchema = z.object({
    customer_name: z.string().trim().min(2).max(255).optional(),
    status: z.enum(['pending', 'paid', 'cancelled']).optional(),
    items: z.array(itemSchema).min(1).optional(),
    payment: paymentSchema.partial().optional(),
    discount: moneySchema.optional(),
    tax: moneySchema.optional(),
    notes: z.string().trim().max(1000).optional().nullable()
}).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one order field must be provided'
});

export const getOrdersQuerySchema = z.object({
    status: z.enum(['pending', 'paid', 'cancelled']).optional()
});
