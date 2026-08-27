const pactum = require('pactum');

describe('Categorias - Testes Funcionais', () => {
  let categoryId;

  it('addCategory - Deve adicionar uma nova categoria', async () => {
    const response = await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          addCategory(name: "Eletrônicos") {
            id
            name
          }
        }
      `)
      .expectStatus(200);

    categoryId = response.body.data.addCategory.id;
  });

  it('editCategory - Deve alterar a categoria criada', async () => {
    await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          editCategory(id: "${categoryId}", name: "Tecnologia & Eletrônicos") {
            id
            name
          }
        }
      `)
      .expectStatus(200);
  });

  it('deleteCategory - Deve remover a categoria', async () => {
    await pactum.spec()
      .post('http://localhost:8080/graphql')
      .withGraphQLQuery(`
        mutation {
          deleteCategory(id: "${categoryId}")
        }
      `)
      .expectStatus(200);
  });
});