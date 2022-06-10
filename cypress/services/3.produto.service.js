import Factory from "../fixtures/factory"


const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {

    //GET-PRODUTOS

    static buscarProdutos(){
        return cy.rest('GET', URL_PRODUTOS)
    }

    //POST-PRODUTOS

    static cadastrarProdutoComSucesso(){
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
        
    static nomeDoProdutoJaExiste(){
        return cy.request({
             method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": "New name",
                "descricao": "New description",
                "preco": 820,
                "quantidade": 80211,
            },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }  
        })
    }

    static tokenAusenteInvalidoExpirado(){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": "New name",
                "descricao": "New description",
                "preco": 820,
                "quantidade": 80211,
            },
            failOnStatusCode: false, 
        })
    }

    static rotaExclusivaParaAdministradores(){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": "kaio",
                "preco": 2,
                "descricao": "Soap",
                "quantidade": 47185,
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }  
        })
    }

            //GET-PROTUDOS-ID

    static buscarProdutosId(){
        let id = 'TKnshLckI4cmuFF7'
        return cy.request({
            method: 'GET',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: true,
            body: null
        })
    }
    
    static produtoNaoEncontrado(){
        return this.buscarUsuarios().then(res => {
            let id = res.body.usuarios[0]._id
            cy.request({
                method: 'GET',
                url: URL_PRODUTOS + `/${id}`,
                failOnStatusCode: false
            })
        })
    }

                //DELETE-PRODUTOS

    static produtoExcluidoComSucesso(){
        let id = 'qpqDLTP2e2vJXlUv'
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static produtoNaoPodeSerExcluido(){
        let id = 'BeeJh5lz3k6kSIzA'
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static tokenAusente(){
        let id = 'errado'
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: false,           
        })
    }

    static ExclusivaParaAdministradores(){
        let id = 'lRSZhElT46kP708P'
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + `/${id}`,
            body: {
                "nome": "Intelligent Fresh Fish",
                "preco": 608,
                "descricao": "Hat",
                "quantidade": 96810,
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

            //PUT-PRODUTOS

    static alterarProduto(){
        let id = 'kIEgBNi7on1HGYG1'
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: true,
            body:{
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

    static cadastrarProduto(){
        let id = 'kIEgBNi7on1HGYf2'
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + `/${id}`,
            body: {
                "nome": "kaio MAXX",
                "preco": 341,
                "descricao": "Mouse",
                "quantidade": 123,
              },
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static produtoComMesmoNome(){
        let id = 'kIEgBNi7on1HGYf2'
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: false,
            body:{
                "nome": "kaio MAXX",
                "preco": 341,
                "descricao": "Mouse",
                "quantidade": 123,
              },
              auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static tokenInvalido(){
        let id = 'errado'
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + `/${id}`,
            failOnStatusCode: false,
                    
        })
    }

    static rotaAdministradores(){
        let id = 'kIEgBNi7on1HGYf2'
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + `/${id}`,
            body:{
                "nome": "kaio MAXX",
                "preco": 341,
                "descricao": "Mouse",
                "quantidade": 123,
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }
}