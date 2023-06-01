export default `#graphql
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

    # type Product {
    #     _id: ID
    #     name: String!
    #     description: String
    #     unit: String
    #     imageUrl: String
    #     category: CategoryRef
    #     brand: BrandRef
    # }
`;