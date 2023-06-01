export default `#graphql
    type Mutation {
        signUpUser(data: UserSignUpInputs!): GeneralResponse
        loginUser(data:UserLoginInputs!): LoginResponse
    }

    input UserSignUpInputs {
        name: String!
        email: String!
        password: String!
        phone: String!
    }

    type LoginResponse {
        status: Boolean!
        message: String!
        token: String!
        user: User
    }

    type User {
        _id: ID
        name: String
        email: String
        password: String
        phone: String
        image: String
        role: String
        gender: String
        currentAddress: String
        permanentAddress: String
        dateOfBirth: String
        authToken: String
        accountStatus: String
        darkMode: String
        createdAt: String
        updatedAt: String
    }

    input UserLoginInputs {
        email: String!
        password: String!
    }
`;