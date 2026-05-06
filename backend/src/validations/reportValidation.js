import { z } from 'zod';

export const productSalesReportQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(20).optional().default(3)
});

export const salesReportQuerySchema = z.object({});
