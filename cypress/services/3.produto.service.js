import Factory from "../fixtures/factory"

const URL_PRODUTOS = '/produtos'

export default class Produto {

    //GET-PRODUTOS

    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    //POST-PRODUTOS

    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })

    }

    //GET-PROTUDOS-ID

    static buscarProdutosId(id) {
        return cy.request({
            method: 'GET',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: true,
            body: null
        })
    }

    //PUT-PRODUTOS

    static alterarProduto(id) {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: true,
            body: produto,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    //DELETE-PRODUTOS

    static produtoExcluidoComSucesso(id) {
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })

    }

}