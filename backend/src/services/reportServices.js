import * as reportRepository from "../repositories/reportRepository.js";

export const getProductSalesReport = async () => {
    const topSellingProducts = await reportRepository.getTopSellingProducts();
    const lowestOrderedProducts = await reportRepository.getLowestOrderedProducts();

    return {
        top_selling_products: topSellingProducts,
        lowest_ordered_products: lowestOrderedProducts
    };
};

export const getSalesReport = async () => {
    const report = await reportRepository.getSalesReport();
    return report;
};
