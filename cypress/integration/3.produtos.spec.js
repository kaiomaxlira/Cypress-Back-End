/// <reference types="cypress" />

import Login from '../services/2.login.service'
import Produto from '../services/3.produto.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Teste de rota /produtos da API serverest', () => {

                    //GET-PRODUTOS

    it('Deve buscar todos os produtos cadastados', () => {
        Produto.buscarProdutos().then( res => {
            cy.contractValidation(res, "get-produtos", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

                        //POST-PRODUTOS

    context('Logar com Sucesso', () => {
        beforeEach('Logar', () =>{
            Produto.buscarUsuarioParaLogin()
                cy.get('@usuarioLogin').then( usuario => {
                    Login.logar(usuario).then( res => {
                        ValidaServerest.validarLoginComSucesso(res)
                        Produto.salvarBearer(res)
                })
            })        
        })
        it('Deve cadastrar produtos com sucesso', () => {
            Produto.cadastrarProdutoComSucesso().then( res => {
                cy.contractValidation(res, "post-produtos", 201).then((res) => expect(res).to.be.eq(true)) 
                ValidaServerest.validarCadastroDeProdutoComSucesso(res) 
            })
        })
        it('Deve avisar que ja existe um produto com esse nome', () => {
            Produto.nomeDoProdutoJaExiste().then( res => {
                cy.contractValidation(res, "post-produtos", 400).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarJaExisteProdutoComEsseNome(res)
            })
        })                  
        it('Deve avisar que o token esta ausente, invalido ou expirado', () => {
            Produto.tokenAusenteInvalidoExpirado().then( res => {
                cy.contractValidation(res, "post-produtos", 401).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarTokenAusenteInvalidoExpirado(res)
            })
        })
        it('Deve avisar que esta rota é exclusiva para administradores', () => {
            Produto.rotaExclusivaParaAdministradores().then( res => {
                cy.contractValidation(res, "post-produtos", 403).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarRotaExclusivaParaAdministradores(res)
            })
        })
                        //DELETE-PRODUTOS

        it('Deve avisar registro excluído com sucesso', () => {
            Produto.produtoExcluidoComSucesso().then( res => {
                cy.contractValidation(res, "delete-produtos", 200).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.validarProdutoExcluidoComSucesso(res)
            })
        })
        it('Deve avisar que produto não pode ser excluido', () => {
            Produto.produtoNaoPodeSerExcluido().then( res => {
                cy.contractValidation(res, "delete-produtos", 400).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.validarProdutoNaoPodeSerExcluido(res)
            })
        })
        it('Deve avisar que token esta ausente', () => {
            Produto.tokenAusente().then( res => {
                cy.contractValidation(res, "delete-produtos", 401).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.validarTokenAusente(res)
            })
        })
        it('Rota exclusiva para administradores', () => {
            Produto.ExclusivaParaAdministradores().then( res => {
                cy.contractValidation(res, "delete-produtos", 403).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.exclusivaParaAdministradores(res)
            })
        })
            
                            //PUT-PRODUTOS

        it('Deve alterar produto', () => {
            Produto.alterarProduto().then( res => {
                cy.contractValidation(res, "put-produtos", 200).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarAlteracaoNoProduto(res)
            })
        })
        it('Deve cadastrar produto com sucesso', () => {
            Produto.cadastrarProduto().then( res => {
                cy.contractValidation(res, "put-produtos", 201).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCadastroDeProduto(res)
            })
        })
        it('Deve alterar que ja existe produto com este nome', () => {
            Produto.produtoComMesmoNome().then( res => {
                cy.contractValidation(res, "put-produtos", 400).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarErroParaAlterarProdutoComMesmoNome(res)
            })
        })
        it('Deve alterar que token esta ausente', () => {
            Produto.tokenInvalido().then( res => {
                cy.contractValidation(res, "put-produtos", 401).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarTokenInvalido(res)
            })
        })
        it('Deve alterar que esta rota é para administradores', () => {
            Produto.rotaAdministradores().then( res => {
                cy.contractValidation(res, "put-produtos", 403).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarRotaAdministradores(res)
            })
        })
     
    })

                    //GET-PRODUTOS-ID

    it.only('Deve buscar produtos por id', () => {
        Produto.buscarProdutosId().then( res => {
            cy.contractValidation(res, "get-produtos-id", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeProdutosId(res)
        })
    })
    it('Deve avisar que produto não foi encontrado', () => {
        Produto.produtoNaoEncontrado().then( res => {
            cy.contractValidation(res, "post-produtos", 400).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeProdutoNaoEncontrado(res)
        })
    })
})