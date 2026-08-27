const pactum = require('pactum');

describe('Produtos - Teste de Contrato', () => {
  it('Validar contrato da resposta ao adicionar produto', async () => {
    await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          addProduct(name: "Monitor Gamer", price: 1200.0) {
            id
            name
            price
          }
        }
      `)
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              addProduct: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' }
                },
                required: ['id', 'name', 'price']
              }
            }
          }
        }
      });
  });
});