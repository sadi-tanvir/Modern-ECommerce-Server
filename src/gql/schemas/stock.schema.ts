
export default `#graphql
    extend type Query {
        stocks: [Stock]
        getStocksByCategory(category: String!): [Stock]
        getStocksWithDetails: [Stock]
        stockWithDetailsById(id: ID!): Stock
    }

    extend type Mutation {
        createStock(data: StockInputData!): StockResponse
        updateStockQuantity(id:ID!, data: StockUpdateInfo!): GeneralResponse
        deleteStockById(id: ID!): GeneralResponse
        updateStockById(id:ID!, data: StockUpdateInputData!): StockResponse
    }

    input StockInputData {
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        discount: Int
        quantity: Int
        status: String
        category: CategoryInputRef
        brand: BrandInputRef
    }

    input StockUpdateInputData {
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        discount: Int
        quantity: Int
        sellCount: Int
        status: String
        category: CategoryInputRef
        brand: BrandInputRef
    }

    input StockUpdateInfo { 
        reference: String!
    }

    type StockResponse {
        status: Boolean!
        message: String!
        stock: Stock
    }

    type Stock {
        _id: ID
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        discount: Int
        quantity: Int
        status: String
        sellCount: Int
        category: CategoryRef
        brand: BrandRef
    }
`