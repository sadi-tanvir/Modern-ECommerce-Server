export default `#graphql
    type Mutation {
        createCategory(data:CategoryInputData!): GeneralResponse
    }

    input CategoryInputData {
        name: String!
        description: String
    }
`;