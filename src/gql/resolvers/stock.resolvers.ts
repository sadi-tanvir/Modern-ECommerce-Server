import { createStockService, getStocksService, getStocksWithDetailsService } from "../services/stock.services";
import { checkAdminService } from "../services/admin.services";
import Stock from "../../database/models/Stock";

export type ContextTypes = {
    email: string;
    role?: string;
}

export type StockType = {
    data: {
        productId: string;
        name: string;
        description: string;
        unit: string;
        imageUrl: string;
        price: Number;
        discount: Number;
        quantity: Number;
        status: string;
        category: {
            name: string;
            id: string;
        };
        brand: {
            name: string;
            id: string;
        }
    }
}

const stockResolver = {
    Query: {
        stocks: async (_: any, args: any, context: ContextTypes) => {
            // find all stocks
            const stocks = await getStocksService()
            return stocks;
        },
        getStocksByCategory: async (_: any, { category }: { category: string }, context: ContextTypes) => {
            // find stocks by category
            const stocks = await Stock.find({ 'category.name': category })
            return stocks;
        },
        getStocksWithDetails: async (_: any, args: any, context: ContextTypes) => {

            // checking admin authentication
            checkAdminService(context.role);

            // find all stocks
            const stocks = await getStocksWithDetailsService()
            return stocks;
        },

    },

    Mutation: {
        createStock: async (_: any, { data }: StockType, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // is stock already exist?
            const isExistStock = await Stock.findOne({ name: data.name, 'brand.name': data.brand.name })

            if (isExistStock) throw new Error("The Stock already exist");

            // create stock
            const stock = await createStockService(data)
            if (!stock) throw new Error("Failed to Create a Stock.")

            return {
                status: true,
                message: 'The Stock has created successfully',
                stock: stock
            }
        },
        updateStockQuantity: async (_: any, { id, data }: { id: string; data: { reference: string; } }, context: ContextTypes) => {
            // update stock quantity
            if (data.reference === 'increase') {
                const stock = await Stock.findOne({ _id: id })
                if (!stock) throw new Error("Failed to find stock")
                stock.quantity = stock.quantity + 1
                stock.sellCount = stock.sellCount - 1
                await stock.save()
            } else {
                const stock = await Stock.findOne({ _id: id })
                if (!stock) throw new Error("Failed to find stock")
                stock.quantity = stock.quantity - 1
                stock.sellCount = stock.sellCount + 1
                await stock.save()
            }

            return {
                status: true,
                message: 'The Stock has updated successfully',
            }
        },
        deleteStockById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            const stock = await Stock.findByIdAndDelete(id)
            if (!stock) throw new Error("Failed to Delete a Stock.")

            return {
                status: true,
                message: 'The stock has been deleted successfully',
            }
        },
        updateStockById: async (_: any, args: any, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            const stock = await Stock.findOneAndUpdate({ _id: args.id }, args.data)
            if (!stock) throw new Error("Failed to Update the stock.")

            return {
                status: true,
                message: 'The stock has been updated successfully'
            };
        }
    }
};

export default stockResolver;