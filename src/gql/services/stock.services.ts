import { ObjectId } from "mongodb";
import Stock from "../../database/models/Stock";

export type StockServiceType = {
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

// create stock service
export const createStockService = async (data: StockServiceType) => {
    const stock = await Stock.create({
        name: data.name,
        description: data.description,
        unit: data.unit,
        imageUrl: data.imageUrl,
        price: data.price,
        discount: data.discount,
        quantity: data.quantity,
        status: data.status,
        category: {
            name: data.category.name,
            id: new ObjectId(data.category.id)
        },
        brand: {
            name: data.brand.name,
            id: new ObjectId(data.brand.id)
        }
    })

    return stock;
};


// find all stocks service
export const getStocksService = async ({ page, size }: { page: number, size: number }) => {
    const stocks = await Stock.find().skip(page * size).limit(size)

    return stocks;
};

// find all stocks with details service
export const getStocksWithDetailsService = async ({ page, size }: { page: number; size: number }) => {
    const stocks = await Stock.find()
        .skip(page * size)
        .limit(size)
        .populate('brand.id')
        .populate('category.id')

    return stocks;
};