export default `#graphql
    type Query {
        categories: [Category]
    }

    type Mutation {
        createCategory(data:CategoryInputData!): GeneralResponse
    }

    input CategoryInputData {
        name: String!
        description: String
    }

    type Category {
        _id: ID
        name: String!
        description: String
    }
`;