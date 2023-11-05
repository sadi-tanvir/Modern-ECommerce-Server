import { createStockService, getStocksService, getStocksWithDetailsService } from "../services/stock.services";
import { checkAdminService } from "../services/admin.services";
import Stock from "../../database/models/Stock";

export type ContextTypes = {
    email: string;
    role?: string;
}

export type StockType = {
    data: {
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
        ////------>>> Get All Stocks <<<--------////
        stocks: async (_: any, { page, size }: { page?: number, size?: number }) => {
            const stocks = await getStocksService({ page: page, size: size })
            return stocks;
        },

        ////------>>> get stocks by category <<<--------////
        getStocksByCategory: async (_: any, { category }: { category: string }) => {
            const stocks = await Stock.find({ 'category.name': category })
            return stocks;
        },

        ////------>>> find all stocks with details for admin <<<--------////
        getStocksWithDetails: async (_: any, { page, size }: { page: number, size: number }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            const stocks = await getStocksWithDetailsService({ page, size })
            return stocks;
        },

        ////------>>> Get a stock with details by id <<<--------////
        stockWithDetailsById: async (_: any, { id }: { id: string }) => {
            const stock = await Stock.findOne({ _id: id })
                .populate('category.id')
                .populate('brand.id');
            return stock;
        }

    },

    Mutation: {
        ////------>>> Create a New Stock <<<--------////
        createStock: async (_: any, { data }: StockType, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // is stock already exist?
            const isExistStock = await Stock.findOne({ name: data.name, 'brand.name': data.brand.name })
            if (isExistStock) throw new Error("The Stock already exist");

            // creating stock
            const stock = await createStockService(data)
            if (!stock) throw new Error("Failed to Create a Stock.")

            return {
                status: true,
                message: 'The Stock has been created successfully',
                stock: stock
            }
        },


        ////------>>> Update Stock Quantity <<<--------////
        updateStockQuantity: async (_: any, { id, data }: { id: string; data: { reference: string; } }) => {
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


        ////------>>> Delete a stock by id <<<--------////
        deleteStockById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // deleting stock
            const stock = await Stock.findByIdAndDelete(id)
            if (!stock) throw new Error("Failed to Delete a Stock.")

            return {
                status: true,
                message: 'The stock has been deleted successfully',
            }
        },


        ////------>>> Update a stock by id <<<--------////
        updateStockById: async (_: any, args: any, context: ContextTypes) => {
            // checking admin authentication
            checkAdminService(context.role);

            // updating stock
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