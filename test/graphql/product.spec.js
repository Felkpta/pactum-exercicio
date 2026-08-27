const pactum = require('pactum');

describe('Produtos - Testes Funcionais', () => {
  let productId;

  it('addProduct - Deve cadastrar um novo produto', async () => {
    const response = await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          addProduct(name: "Teclado Mecânico", price: 250.0) {
            id
            name
            price
          }
        }
      `)
      .expectStatus(200);

    productId = response.body.data.addProduct.id;
  });

  it('editProduct - Deve atualizar os dados do produto', async () => {
    await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          editProduct(id: "${productId}", name: "Teclado RGB", price: 299.9) {
            id
            name
            price
          }
        }
      `)
      .expectStatus(200);
  });

  it('deleteProduct - Deve deletar o produto cadastrado', async () => {
    await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          deleteProduct(id: "${productId}")
        }
      `)
      .expectStatus(200);
  });
});