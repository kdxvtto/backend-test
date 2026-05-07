import {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProductById,
    deleteProductById,
} from "../services/productServices.js";

export const findAllProducts = async (req, res, next) => {
    try{
        const products = await getAllProducts();
        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        return next(err);
    }
}

export const findProductById = async (req, res, next) => {
    try{
        const product = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        return next(err);
    }
}

export const createProduct = async (req, res, next) => {
    try{
        const product = await createNewProduct(req.body);
        return res.status(201).json({
            success: true,
            data: product
        });
    } catch (err) {
        return next(err);
    }
}

export const updateProduct = async (req, res, next) => {
    try{
        const product = await updateProductById(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        return next(err);
    }
}

export const deleteProduct = async (req, res, next) => {
    try{
        const product = await deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        return next(err);
    }
}
