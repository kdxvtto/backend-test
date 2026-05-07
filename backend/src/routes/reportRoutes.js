import { Router } from "express";
import { validate } from "../utils/validation.js";
import {
    productSalesReportQuerySchema,
    salesReportQuerySchema
} from "../validations/reportValidation.js";
import {
    findProductSalesReport,
    findSalesReport
} from "../controllers/reportController.js";

const router = Router();

router.get(
    "/product-sales",
    validate(productSalesReportQuerySchema, "query"),
    findProductSalesReport
);
router.get("/sales", validate(salesReportQuerySchema, "query"), findSalesReport);

export default router;
