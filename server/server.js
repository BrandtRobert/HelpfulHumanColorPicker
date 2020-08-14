const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const cors = require('cors');
const sqlite3 = require('sqlite3');

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
  graphiql: true,
  context: {database}
}));
app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');