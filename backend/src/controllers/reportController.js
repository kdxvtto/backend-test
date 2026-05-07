import {
    getProductSalesReport,
    getSalesReport
} from "../services/reportServices.js";

export const findProductSalesReport = async (req, res, next) => {
    try {
        const report = await getProductSalesReport();
        return res.status(200).json({
            success: true,
            data: report
        });
    } catch (err) {
        return next(err);
    }
};

export const findSalesReport = async (req, res, next) => {
    try {
        const report = await getSalesReport();
        return res.status(200).json({
            success: true,
            data: report
        });
    } catch (err) {
        return next(err);
    }
};
