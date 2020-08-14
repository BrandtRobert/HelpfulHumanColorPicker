const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const cors = require('cors');
const sqlite3 = require('sqlite3');

/**
 * Simple graphQL express server that fetches colors from the sqlite database. Currently,
 *  there is only one query supported which is just a batch fetch from the database. We woudl likely
 *  want to implement a query for pagination so that we can select small color subsets. It would also
 *  be wise to add a related color query, where you could ask for colors similiar to one you like.
 */

// GraphQL color schema
// Colors have a family (that is the primary hue we would identify them with i.e. red, green, blue, orange)
//    and a hex-value defining the rgb params of the color
var schema = buildSchema(`
  type Query {
    colors: [Color]!
  }
  type Color {
    color: String!
    family: String!
  }
`);

const database = new sqlite3.Database("../model/color.db");

// The root provides a resolver function for each API endpoint
var root = {
  colors: (obj, context) => {
    return (
      new Promise((resolve, reject) => {
        context.database.all("SELECT color, family FROM Colors", [], (err, result) => {
          if(err) {
            reject([]);
          }
          resolve(result);
      })})
    );
  }
};

var app = express();
// In a production environment we would in theory be making requests to the same server / domain
// Thus we would not want to allow cross origin access for security reasons
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false,
  context: {database}
}));
app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');