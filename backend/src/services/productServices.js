import {
    findAllProducts,
    findProductById,
    createProduct,
    updateProduct,
    deactivateProduct
} from "../repositories/productRepository.js";
import { createError } from "../utils/error.js";

export const getAllProducts = async () => {
    const products = await findAllProducts();
    return products;
};

export const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw createError(404, "Product not found");
    }

    return product;
};

export const createNewProduct = async (product) => {
    const productId = await createProduct(product);

    return await getProductById(productId);
};

export const updateProductById = async (id, product) => {
    const existingProduct = await findProductById(id);

    if (!existingProduct) {
        throw createError(404, "Product not found");
    }

    const nextProduct = {
        ...existingProduct,
        ...product
    };

    if (Number(nextProduct.price) < Number(nextProduct.cost_price)) {
        throw createError(400, "Price must be greater than or equal to cost price");
    }

    await updateProduct(id, product);

    return await getProductById(id);
};

export const deleteProductById = async (id) => {
    const existingProduct = await findProductById(id);

    if (!existingProduct) {
        throw createError(404, "Product not found");
    }

    await deactivateProduct(id);

    return true;
};
