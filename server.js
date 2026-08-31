const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Category { id: ID!, name: String! }
  type Product { id: ID!, name: String!, price: Float! }

  type Query {
    getCategories: [Category]
    getProducts: [Product]
  }

  type Mutation {
    addCategory(name: String!): Category
    editCategory(id: ID!, name: String!): Category
    deleteCategory(id: ID!): String
    addProduct(name: String!, price: Float!): Product
    editProduct(id: ID!, name: String!, price: Float!): Product
    deleteProduct(id: ID!): String
  }
`);

let count = 1;

const root = {
  addCategory: ({ name }) => ({ id: String(count++), name }),
  editCategory: ({ id, name }) => ({ id, name }),
  deleteCategory: ({ id }) => `Categoria ${id} removida`,
  addProduct: ({ name, price }) => ({ id: String(count++), name, price }),
  editProduct: ({ id, name, price }) => ({ id, name, price }),
  deleteProduct: ({ id }) => `Produto ${id} removido`
};

const app = express();
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.listen(8080, () => {
  console.log('🚀 API GraphQL rodando em http://localhost:8080/graphql');
});
