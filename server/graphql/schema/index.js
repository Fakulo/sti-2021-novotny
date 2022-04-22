const { buildSchema } = require('graphql');

const schema =  buildSchema(`
type Message {
    text: String!
}
input MessageInput {
    text: String!
}

type RootQuery {
    userQuery(messageInput: MessageInput): [String!]!
}

schema {
    query: RootQuery
}
`);

module.exports = schema;