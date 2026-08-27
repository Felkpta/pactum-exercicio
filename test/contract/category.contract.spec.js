const pactum = require('pactum');

describe('Categorias - Teste de Contrato', () => {
  it('Validar contrato da resposta ao adicionar categoria', async () => {
    await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          addCategory(name: "Validação Contrato Categoria") {
            id
            name
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
              addCategory: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' }
                },
                required: ['id', 'name']
              }
            }
          }
        }
      });
  });
});