const URL_CARRINHOS = '/carrinhos'

export default class Carrinhos {

    //POST-CARRINHOS

    static cadastrarCarrinho() {
        return cy.fixture('produtoid').then((res) => {
            let id = res._id
            cy.request({
                method: 'POST',
                url: URL_CARRINHOS,
                body: {
                    "produtos": [
                        {
                            "idProduto": id,
                            "quantidade": 2
                        },
                    ]
                },
                failOnStatusCode: true,
                auth: {
                    bearer: Cypress.env("bearer")
                }
            })
        })
    }

    //DELETE-CARRIONHOS-CANCELAR-COMPRA

    static deletarCarrinhoCancelandoCompra(id) {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + '/cancelar-compra',
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static carrinhoTokenInvalido() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + '/cancelar-compra',
            failOnStatusCode: false,
        })
    }
    //DELETE-CARRIONHOS-CONCLUIR-COMPRA

    static deletarCarrinhoConcluirCompra() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + '/concluir-compra',
            body: null,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static carrinhoTokenInvalidoOuAusente() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + '/concluir-compra',
            failOnStatusCode: false,
        })
    }
}