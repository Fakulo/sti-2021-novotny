const { buildSchema } = require('graphql');

const schema =  buildSchema(`
input MessageInput {
    text: String!
}

type Query {
    userQuery(messageInput: MessageInput): [String!]
}

schema {
    query: Query
}
`);

module.exports = schema;