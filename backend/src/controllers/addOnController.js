import {
    getAllAddOns,
    getAddOnById,
    createNewAddOn,
    updateAddOnById,
    deleteAddOnById
} from "../services/addOnServices.js";

export const findAllAddOns = async (req, res, next) => {
    try {
        const addOns = await getAllAddOns();
        return res.status(200).json({
            success: true,
            data: addOns
        });
    } catch (err) {
        return next(err);
    }
};

export const findAddOnById = async (req, res, next) => {
    try {
        const addOn = await getAddOnById(req.params.id);
        return res.status(200).json({
            success: true,
            data: addOn
        });
    } catch (err) {
        return next(err);
    }
};

export const createAddOn = async (req, res, next) => {
    try {
        const addOn = await createNewAddOn(req.body);
        return res.status(201).json({
            success: true,
            data: addOn
        });
    } catch (err) {
        return next(err);
    }
};

export const updateAddOn = async (req, res, next) => {
    try {
        const addOn = await updateAddOnById(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            data: addOn
        });
    } catch (err) {
        return next(err);
    }
};

export const deleteAddOn = async (req, res, next) => {
    try {
        const addOn = await deleteAddOnById(req.params.id);
        return res.status(200).json({
            success: true,
            data: addOn
        });
    } catch (err) {
        return next(err);
    }
};
