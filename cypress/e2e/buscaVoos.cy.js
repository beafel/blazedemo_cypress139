// Grupo de testes (como se fosse uma Classe) e o Nome do grupo
describe('Busca por voos', () => {
  // Contexto / Cenário
  context('Não Logado', () => {
    // Caminho para o arquivo com a massa de teste
    const massaVoos = require('../fixtures/massaVoos')

    // Inicialização dos testes (como se fosse o Before)
    beforeEach(() => {
      cy.visit('/') // abrir a página inicial da URL informada no arquivo cypress.config.js
    })

    // Exemplo de Teste Simples
    it('Buscar voos entre São Paolo e Cairo - Simples', () => {
      // Verifica se o titulo da aba é igual a 'BlazeDemo'
      cy.title().should('eq', 'BlazeDemo')

      // Preenche a origem e o destino do voo
      cy.get('select.form-inline')
        .eq(0)  // Origem
        .select('São Paolo')

      cy.get('select.form-inline')
        .eq(1)  // Destino
        .select('Cairo')

      // Aperta o botão Find Flights
      cy.get('input.btn.btn-primary').click()

      // Ocorre a transição para página de Reserva
      cy.title().should('eq', 'BlazeDemo - reserve')

      // Verifica a frase de origem e destino do voo
      cy.get('.container h3')
        .should('have.text', 'Flights from São Paolo to Cairo: ')

      // clica no primeiro botão
      cy.get('tbody input[type="submit"]')
        .eq(0)  // botão na primeira posição
        .click()
    });

    // Exemplo de Teste Data Driven
    massaVoos.array.forEach(({ origem, destino }) => {
      it(`Buscar voos entre ${origem} e ${destino} - Data Driven`, () => {
        // Verifica se o titulo da aba é igual a 'BlazeDemo'
        cy.title().should('eq', 'BlazeDemo')

        // Preenche a origem e o destino do voo
        cy.get('select.form-inline')
          .eq(0)  // Origem
          .select(origem)

        cy.get('select.form-inline')
          .eq(1)  // Destino
          .select(destino)

        // Aperta o botão Find Flights
        cy.get('input.btn.btn-primary').click()

        // Ocorre a transição para página de Reserva
        cy.title().should('eq', 'BlazeDemo - reserve')

        // Verifica a frase de origem e destino do voo
        cy.get('.container h3')
          .should('have.text', `Flights from ${origem} to ${destino}: `)

        // clica no primeiro botão
        cy.get('tbody input[type="submit"]')
          .eq(0)  // botão na primeira posição
          .click()
      }); // fim do it
    }) // fim do array

  }) // fim do context
}) // fim do describe