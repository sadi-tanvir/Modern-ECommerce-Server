export default `#graphql
    type Query {
        brands: [Brand]
        getBrandById(id:ID!): Brand
    }

    type Mutation {
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


    type Brand {
        _id: ID
        name: String!
        description: String
        email: String
        phone: String
        website: String
        status: String
        location: String
    }

`