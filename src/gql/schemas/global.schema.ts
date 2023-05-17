export default `
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type GeneralResponse {
    status: Boolean!
    message: String!
  }
`