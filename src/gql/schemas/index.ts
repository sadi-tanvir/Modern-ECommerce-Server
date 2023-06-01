import adminSchema from "./admin.schema";
import globalSchema from "./global.schema";
import userSchema from "./user.schema";
import productSchema from "./product.schema";

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
    productSchema
];