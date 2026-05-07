import { Router } from "express";
import { validate } from "../utils/validation.js";
import { idParamSchema } from "../validations/commonValidation.js";
import {
    createAddOnSchema,
    updateAddOnSchema
} from "../validations/addOnValidation.js";
import {
    findAllAddOns,
    findAddOnById,
    createAddOn,
    updateAddOn,
    deleteAddOn
} from "../controllers/addOnController.js";

const router = Router();

router.get("/", findAllAddOns);
router.post("/", validate(createAddOnSchema), createAddOn);
router.get("/:id", validate(idParamSchema, "params"), findAddOnById);
router.put(
    "/:id",
    validate(idParamSchema, "params"),
    validate(updateAddOnSchema),
    updateAddOn
);
router.delete("/:id", validate(idParamSchema, "params"), deleteAddOn);

export default router;
