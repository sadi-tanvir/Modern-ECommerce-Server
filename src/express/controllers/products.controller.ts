import { Request, Response } from "express";
import Stock from "../../database/models/Stock";

// stock count
export const stockContController = async (req: Request, res: Response) => {
    const totalStocks = await Stock.find().estimatedDocumentCount()
    if (!totalStocks) return res.status(400).json({ status: false, message: 'Failed to fetch product count' })

    res.json({
        status: true,
        totalDocuments: totalStocks
    });
};