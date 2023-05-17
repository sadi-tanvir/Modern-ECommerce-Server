import globalSchema from "./global.schema"
import userSchema from "./user.schema"

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
    globalSchema,
    userSchema
]