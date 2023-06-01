export default `#graphql
    type Query {
        products: [Product]
    }

    type Mutation {
        createProduct(data: ProductInputs!): GeneralResponse
    }

    input ProductInputs {
        name: String!
        description: String
        unit: String!
        imageUrl:String
        category: CategoryInputRef
        brand: BrandInputRef
    }

    type Product {
        _id: ID
        name: String!
        description: String
        unit: String
        imageUrl: String
        category: CategoryRef
        brand: BrandRef
    }
`;