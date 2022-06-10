/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Teste de rota /produtos da API serverest', () => {

                    //GET-PRODUTOS

    it('Deve buscar todos os produtos cadastados', () => {
        Serverest.buscarProdutos().then( res => {
            cy.contractValidation(res, "get-produtos", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

                        //POST-PRODUTOS

    context('Logar com Sucesso', () => {
        beforeEach('Logar', () =>{
            Serverest.buscarUsuarioParaLogin()
                cy.get('@usuarioLogin').then( usuario => {
                    Serverest.logar(usuario).then( res => {
                        ValidaServerest.validarLoginComSucesso(res)
                        Serverest.salvarBearer(res)
                })
            })        
        })
        it('Deve cadastrar produtos com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                cy.contractValidation(res, "post-produtos", 201).then((res) => expect(res).to.be.eq(true)) 
                ValidaServerest.validarCadastroDeProdutoComSucesso(res) 
            })
        })
        it('Deve avisar que ja existe um produto com esse nome', () => {
            Serverest.nomeDoProdutoJaExiste().then( res => {
                cy.contractValidation(res, "post-produtos", 400).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarJaExisteProdutoComEsseNome(res)
            })
        })                  
        it('Deve avisar que o token esta ausente, invalido ou expirado', () => {
            Serverest.tokenAusenteInvalidoExpirado().then( res => {
                cy.contractValidation(res, "post-produtos", 401).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarTokenAusenteInvalidoExpirado(res)
            })
        })
        it('Deve avisar que esta rota é exclusiva para administradores', () => {
            Serverest.rotaExclusivaParaAdministradores().then( res => {
                cy.contractValidation(res, "post-produtos", 403).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarRotaExclusivaParaAdministradores(res)
            })
        })
                        //DELETE-PRODUTOS

        it('Deve avisar registro excluído com sucesso', () => {
            Serverest.produtoExcluidoComSucesso().then( res => {
                cy.contractValidation(res, "delete-produtos", 200).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.validarProdutoExcluidoComSucesso(res)
            })
        })
        it('Deve avisar que produto não pode ser excluido', () => {
            Serverest.produtoNaoPodeSerExcluido().then( res => {
                cy.contractValidation(res, "delete-produtos", 400).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.validarProdutoNaoPodeSerExcluido(res)
            })
        })
        it('Deve avisar que token esta ausente', () => {
            Serverest.tokenAusente().then( res => {
                cy.contractValidation(res, "delete-produtos", 401).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.validarTokenAusente(res)
            })
        })
        it('Rota exclusiva para administradores', () => {
            Serverest.ExclusivaParaAdministradores().then( res => {
                cy.contractValidation(res, "delete-produtos", 403).then((res) => expect(res).to.be.eq(true))   
                ValidaServerest.exclusivaParaAdministradores(res)
            })
        })
            
                            //PUT-PRODUTOS

        it('Deve alterar produto', () => {
            Serverest.alterarProduto().then( res => {
                cy.contractValidation(res, "put-produtos", 200).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarAlteracaoNoProduto(res)
            })
        })
        it('Deve cadastrar produto com sucesso', () => {
            Serverest.cadastrarProduto().then( res => {
                cy.contractValidation(res, "put-produtos", 201).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCadastroDeProduto(res)
            })
        })
        it('Deve alterar que ja existe produto com este nome', () => {
            Serverest.produtoComMesmoNome().then( res => {
                cy.contractValidation(res, "put-produtos", 400).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarErroParaAlterarProdutoComMesmoNome(res)
            })
        })
        it('Deve alterar que token esta ausente', () => {
            Serverest.tokenInvalido().then( res => {
                cy.contractValidation(res, "put-produtos", 401).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarTokenInvalido(res)
            })
        })
        it('Deve alterar que esta rota é para administradores', () => {
            Serverest.rotaAdministradores().then( res => {
                cy.contractValidation(res, "put-produtos", 403).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarRotaAdministradores(res)
            })
        })
     
    })

                    //GET-PRODUTOS-ID

    it('Deve buscar produtos por id', () => {
        Serverest.buscarProdutosId().then( res => {
            cy.contractValidation(res, "get-produtos-id", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeProdutosId(res)
        })
    })
    it('Deve avisar que produto não foi encontrado', () => {
        Serverest.produtoNaoEncontrado().then( res => {
            cy.contractValidation(res, "post-produtos", 400).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeProdutoNaoEncontrado(res)
        })
    })
})