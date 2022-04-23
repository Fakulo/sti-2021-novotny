const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');


const graphQlSchema = require('./graphql/schema/index');
const graphQLResolver = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQLResolver,
    graphiql: true
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT + '.');
});