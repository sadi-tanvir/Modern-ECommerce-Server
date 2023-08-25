export default `#graphql
    type Query {
        ownerInfo: User
    }

    type Mutation {
        signUpUser(data: UserSignUpInputs!): GeneralResponse
        loginUser(data: UserLoginInputs!): LoginResponse
        updateOwnerInfo(email: String!, data: UpdateOwnerInput!): GeneralResponse
    }

    input UserSignUpInputs {
        name: String!
        email: String!
        password: String!
        phone: String!
    }

    input UserLoginInputs {
        email: String!
        password: String!
    }

    input UpdateOwnerInput {
        name: String
        phone: String
        gender: String
        currentAddress: String
        permanentAddress: String
        dateOfBirth: String
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
`;