import { Router } from "express";
import { validate } from "../utils/validation.js";
import { idParamSchema } from "../validations/commonValidation.js";
import {
    createProductSchema,
    updateProductSchema
} from "../validations/productValidation.js";
import {
    findAllProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = Router();

router.get("/", findAllProducts);
router.post("/", validate(createProductSchema), createProduct);
router.get("/:id", validate(idParamSchema, "params"), findProductById);
router.put(
    "/:id",
    validate(idParamSchema, "params"),
    validate(updateProductSchema),
    updateProduct
);
router.delete("/:id", validate(idParamSchema, "params"), deleteProduct);

export default router;
