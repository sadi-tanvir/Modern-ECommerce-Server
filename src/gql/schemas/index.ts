import adminSchema from "./admin.schema";
import globalSchema from "./global.schema";
import userSchema from "./user.schema";
import productSchema from "./product.schema";
import brandSchema from "./brand.schema";
import categorySchema from "./category.schema";
import stockSchema from "./stock.schema";
import orderSchema from "./order.schema";

const rootSchema = `#graphql
    type Query {
        _:Boolean
    }
    type Mutation {
        _:Boolean
    }
`;

export default [
    rootSchema,
    adminSchema,
    globalSchema,
    userSchema,
    productSchema,
    brandSchema,
    categorySchema,
    stockSchema,
    orderSchema
];