import * as addOnRepository from "../repositories/addOnRepository.js";
import { createError } from "../utils/error.js";

export const getAllAddOns = async () => {
    const addOns = await addOnRepository.findAllAddOns();
    return addOns;
};

export const getAddOnById = async (id) => {
    const addOn = await addOnRepository.findAddOnById(id);

    if (!addOn) {
        throw createError(404, "Add-on not found");
    }

    return addOn;
};

export const createNewAddOn = async (addOn) => {
    const addOnId = await addOnRepository.createAddOn(addOn);
    return await getAddOnById(addOnId);
};

export const updateAddOnById = async (id, addOn) => {
    const existingAddOn = await addOnRepository.findAddOnById(id);

    if (!existingAddOn) {
        throw createError(404, "Add-on not found");
    }

    const nextAddOn = {
        ...existingAddOn,
        ...addOn
    };

    if (Number(nextAddOn.price) < Number(nextAddOn.cost_price)) {
        throw createError(400, "Price must be greater than or equal to cost price");
    }

    await addOnRepository.updateAddOn(id, addOn);

    return await getAddOnById(id);
};

export const deleteAddOnById = async (id) => {
    const existingAddOn = await addOnRepository.findAddOnById(id);

    if (!existingAddOn) {
        throw createError(404, "Add-on not found");
    }

    await addOnRepository.deactivateAddOn(id);

    return true;
};
