export default `
    type Mutation {
        signUpUser(data: UserData!): GeneralResponse
    }

    input UserData {
        name: String!
        email: String!
        password: String!
        phone: String!
    }
`