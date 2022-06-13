import Factory from "../fixtures/factory"


const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Carrinhos {

               //GET-CARRINHOS

               static buscarCarrinhos(){
                return cy.rest('GET', URL_CARRINHOS)
            }
        
                    //POST-CARRINHOS
        
            static cadastrarCarrinho(){
                return cy.request({
                    method: 'POST',
                    url: URL_CARRINHOS,
                    body:{
                        "produtos": [
                          {
                            "idProduto": "K6leHdftCeOJj8BJ",
                            "quantidade": 2
                          },
                        ]
                      },
                    failOnStatusCode: true,
                    auth: {
                        bearer: Cypress.env("bearer")
                    }
                })
            }
        
            static cadastrarCarrinhoComErro(){
                return cy.request({
                    method: 'POST',
                    url: URL_CARRINHOS,
                    body:{
                        "produtos": [
                          {
                            "idProduto": "dqsQUsOG6bX32fDd",
                            "quantidade": 43
                          },
                        ]
                      },
                    failOnStatusCode: false,
                    auth: {
                        bearer: Cypress.env("bearer")
                    }
                })
            }
        
            static cadastrarCarrinhoComTokenInvalido(){
                return cy.request({
                    method: 'POST',
                    url: URL_CARRINHOS,
                    body: {
                        "produtos": [
                          {
                            "idProduto": "K6leHdftCeOJj8BJ",
                            "quantidade": 2
                          },
                        ]
                      },
                    failOnStatusCode: false
                })
            }
                    //GET-CARRIONHOS-ID
        
            static buscarCarrinhosComId(){
                return this.buscarCarrinhos().then(res => {
                    let id = res.body.carrinhos[0]._id
                    cy.request({
                        method: 'GET',
                        url: URL_CARRINHOS + `/${id}`,
                        failOnStatusCode: true
                    })
                })
            }
        
            static buscarCarrinhosErro(){
                let id = 'iderrado'
                return cy.request({
                    method: 'GET',
                    url: URL_CARRINHOS + `/${id}`,
                    failOnStatusCode: false
                })
            }
        
                    //DELETE-CARRIONHOS-CANCELAR-COMPRA
        
            static deletarCarrinhoCancelandoCompra(){
                return cy.request({
                    method: 'DELETE',
                    url: URL_CARRINHOS + '/cancelar-compra',
                    failOnStatusCode: true,
                    auth: {
                        bearer: Cypress.env("bearer")
                    }
                })
            }
        
            static carrinhoTokenInvalido(){
                return cy.request({
                    method: 'DELETE',
                    url: URL_CARRINHOS + '/cancelar-compra',
                    failOnStatusCode: false,
                })
            }
                                //DELETE-CARRIONHOS-CONCLUIR-COMPRA
        
            static deletarCarrinhoConcluirCompra(){
                return cy.request({
                    method: 'DELETE',
                    url: URL_CARRINHOS + '/concluir-compra',
                    failOnStatusCode: true,
                    auth: {
                        bearer: Cypress.env("bearer")
                    }
                })
            }
                            
            static carrinhoTokenInvalidoOuAusente(){
                return cy.request({
                    method: 'DELETE',
                    url: URL_CARRINHOS + '/concluir-compra',
                    failOnStatusCode: false,
                })
            }
}