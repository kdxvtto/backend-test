import { Router } from "express";
import { validate } from "../utils/validation.js";
import { idParamSchema } from "../validations/commonValidation.js";
import {
    createOrderSchema,
    updateOrderSchema,
    getOrdersQuerySchema
} from "../validations/orderValidation.js";
import {
    findAllOrders,
    findOrderById,
    createNewOrderController,
    updateOrderByIdController
} from "../controllers/orderController.js";

const router = Router();

router.get("/", validate(getOrdersQuerySchema, "query"), findAllOrders);
router.post("/", validate(createOrderSchema), createNewOrderController);
router.get("/:id", validate(idParamSchema, "params"), findOrderById);
router.put(
    "/:id",
    validate(idParamSchema, "params"),
    validate(updateOrderSchema),
    updateOrderByIdController
);

export default router;
