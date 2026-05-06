import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().trim().min(2).max(255),
    description: z.string().trim().min(5).max(255),
    category: z.string().trim().min(2).max(255),
    price: z.coerce.number().positive(),
    cost_price: z.coerce.number().positive(),
    stock_quantity: z.coerce.number().int().nonnegative(),
    is_active: z.boolean().optional().default(true)
}).refine((data) => data.price >= data.cost_price, {
    path: ['price'],
    message: 'Price must be greater than or equal to cost price'
});

export const updateProductSchema = z.object({
    name: z.string().trim().min(2).max(255).optional(),
    description: z.string().trim().min(5).max(255).optional(),
    category: z.string().trim().min(2).max(255).optional(),
    price: z.coerce.number().positive().optional(),
    cost_price: z.coerce.number().positive().optional(),
    stock_quantity: z.coerce.number().int().nonnegative().optional(),
    is_active: z.boolean().optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one product field must be provided'
}).refine((data) => {
    if (data.price === undefined || data.cost_price === undefined) {
        return true;
    }

    return data.price >= data.cost_price;
}, {
    path: ['price'],
    message: 'Price must be greater than or equal to cost price'
});
