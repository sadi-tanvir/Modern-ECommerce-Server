export default `#graphql
    extend type Mutation {
        createBrand(data:BrandInputData!): GeneralResponse
    }

    input BrandInputData {
        name: String!
        description: String
        email: String!
        phone: String
        website: String
        location: String
    }
`