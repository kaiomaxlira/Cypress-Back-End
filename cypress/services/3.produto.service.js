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
        }).then(res => {
            cy.wrap(res._id).as('produtoid')
            console.log(cy.get('@produtoid'))
        })
    }

    //GET-PROTUDOS-ID

    static buscarProdutosId() {
            let id = cy.get('@produtoid')
            return cy.request({
                method: 'GET',
                url: URL_PRODUTOS + `/${id}`,
                failOnStatusCode: true,
                body: null
            })
    }

    //DELETE-PRODUTOS

    static produtoExcluidoComSucesso() {
        return this.buscarProdutos().then(res => {
            let id = res.body.produtos[0]._id
            cy.request({
                method: 'DELETE',
                url: URL_PRODUTOS + `/${id}`,
                failOnStatusCode: true,
                auth: {
                    bearer: Cypress.env("bearer")
                }
            })
        })
    }

    //PUT-PRODUTOS

    static alterarProduto() {
            let id = 'kIEgBNi7on1HGYG1'
        return cy.request({
                method: 'PUT',
                url: URL_PRODUTOS + `/${id}`,
                failOnStatusCode: true,
                body: {
                    "nome": "kaio max",
                    "preco": 341,
                    "descricao": "Mouse",
                    "quantidade": 123,
                },
                auth: {
                    bearer: Cypress.env("bearer")
                }
            })
        }
}