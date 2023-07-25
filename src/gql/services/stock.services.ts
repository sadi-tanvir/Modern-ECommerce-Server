import { ObjectId } from "mongodb";
import Stock from "../../database/models/Stock";

export type StockServiceType = {
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
    suppliedBy: {
        name: string;
        id: string;
    }
}

// create stock service
export const createStockService = async (data: StockServiceType) => {
    const stock = await Stock.create({
        productId: data.productId,
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
        },
        suppliedBy: {
            name: data.suppliedBy.name,
            id: new ObjectId(data.suppliedBy.id)
        }
    })

    return stock;
}


// find all stocks service
export const getStocksService = async () => {
    const stocks = await Stock.find()

    return stocks;
}

// find all stocks with details service
export const getStocksWithDetailsService = async () => {
    const stocks = await Stock.find()
        .populate('productId')
        .populate('brand.id')
        .populate('category.id')
        .populate('suppliedBy.id')

    return stocks;
}