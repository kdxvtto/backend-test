import { createError } from "./error.js";

export const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }));

            return next(createError(400, 'Validation error', errors));
        }

        if (source === 'body') {
            req.body = result.data;
        } else {
            req.validated = {
                ...(req.validated || {}),
                [source]: result.data
            };
        }

        return next();
    };
};
