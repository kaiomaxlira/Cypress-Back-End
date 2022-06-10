import Factory from "../fixtures/factory"


const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {

    //USUARIOS
    //GET-USUARIOS

    static buscarUsuarios(){
        return cy.rest('GET', URL_USUARIOS)
    }

    //POST-USUARIOS

    static cadastrarUsuario(){
        let usuario = Factory.gerarUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true,
        })
    }

    static falhaAoCadastrarUsuario(){

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": "Fulano da Silva",
                "email": "titii@qa.com.br",
                "password": "teste",
                "administrador": "true"
              },
            failOnStatusCode: false,
        }) 
    }

        //GET-USUARIOS

    static buscarUsuarioPorId(){
        return this.buscarUsuarios().then(res => {
            let id = res.body.usuarios[5]._id
            cy.request({
                method: 'GET',
                url: URL_USUARIOS + `/${id}`,
                failOnStatusCode: true
            })
        })
    }

    static buscarUsuarioPorIdInvalido(){
        let id = 'iderrado'
        return cy.request({
            method: 'GET',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false
        })
    }

         //DELETE-USUARIOS

    static excluirUsuario(){
        return this.buscarUsuarios().then(res => {
            let id = res.body.usuarios[5]._id
            cy.request({
                method: 'DELETE',
                url: URL_USUARIOS + `/${id}`,
                failOnStatusCode: true
            })
        })
    }

    static usuarioComCarrinhoCadastrado(){
        let id = 'oUb7aGkMtSEPf6BZ'
        return cy.request({
            method: 'DELETE',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false
        })
    }

        //PUT-USUARIOS

    static editarUsuarios(){
        let id = 'CfkHqp7Wz2uyDnR6'
        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: true,
            body:{
                "nome": "Kaio Max",
                "email": "Gidevaldo83@live.com",
                "password": "ZDehoAtrGLWa7rF",
                "administrador": "true"
            }
        })
    }

    static emailJaCadastrado(){
        let id = 'CfkHqp7Wz2uyDnR6'
        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false,
            body:{
                "nome": "Kaio Maxx",
                "email": "Luciano97@yahoo.com",
                "password": "ZDehoAtrGLWa7rF",
                "administrador": "true"
            }
        })
    }

        //LOGIN

    static buscarUsuarioParaLogin(){
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[2].email,
                password: res.body.usuarios[2].password 
            }).as('usuarioLogin')
                       
        })
    }

    static logarComEmailErrado(){
       return cy.request({
           method:'POST',
           url: URL_LOGIN,
           body:{
               "email": "jmlkçj_Saraiva@yahoo.com",
               "password": "kkkkkk"
           },
           failOnStatusCode: false,
       })
    }

    static logar(usuario){
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    // PRODUTOS
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

            //CARRINHOS

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