import globalSchema from "./global.schema"

const rootSchema = `
    type Query {
        _:Boolean
    }
    type Mutation {
        _:Boolean
    }
`

export default [
    rootSchema,
    globalSchema
]