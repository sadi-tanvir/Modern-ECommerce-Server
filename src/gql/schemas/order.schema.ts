export default `#graphql
    type Query {
        orders: [Order]
        getOrdersByCustomerId(id:ID!): [Order]
    }

    type Mutation {
        createOrder(data: OrderInputs!): GeneralResponse
        deleteOrderById(id:ID!): GeneralResponse
    }

    input ItemsInput {
        stockId: ID
        qty: Int
        price: Int
        name: String
        imageUrl: String
    }

    input OrderInputs {
        userId: ID
        items: [ItemsInput]
        email: String
        phone: String
        address: String
        amount: Int
    }


    type ItemsType {
        stockId: Stock
        qty: Int
        price: Int
        name: String
        imageUrl: String
    }
 

    type Order {
        _id: ID
        userId: User
        items: [ItemsType]
        email: String
        phone: String
        address: String
        amount: Int
        paymentStatus: String
        trxId: String
        orderStatus: String
        orderDate: String
    }
`;