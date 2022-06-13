/// <reference types="cypress" />

import Login from '../services/2.login.service'
import Carrinhos from "../services/4.carrionho.service";
import ValidaServerest from "../services/validaServerest.service";

describe("Teste de rota /carrinhos da API serverest", () => {

                    //CARRINHOS

                //POST-CARRINHOS

    context('Logar com Sucesso', () => {
        beforeEach('Logar', () =>{
            Carrinhos.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
                Login.logar(usuario).then( res => {
                    ValidaServerest.validarLoginComSucesso(res)
                    Carrinhos.salvarBearer(res)
                })
            })        
        })

                    //POST_CARRINHOS

        it('Deve cadastrar carrinho', () => {
            Carrinhos.cadastrarCarrinho().then( res => {
                cy.contractValidation(res, "post-carrinhos", 201).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCadastroDeCarrinho(res)
            })
        })
        it('Deve avisar que deu erro ao cadastrar carrinho', () => {
            Carrinhos.cadastrarCarrinhoComErro().then( res => {
                cy.contractValidation(res, "post-carrinhos", 400).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCadastroDeCarrinhoComErro(res)
            })
        })
        it('Deve avisar que o token é invalido', () => {
            Carrinhos.cadastrarCarrinhoComTokenInvalido().then( res => {
                cy.contractValidation(res, "post-carrinhos", 401).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCadastroDeCarrinhoComTokenInvalido(res)
            })
        })
        
                            //DELETE-CARRIONHOS-CANCELAR-COMPRA

        it('Deve deletar carrionho cancelando compra', () => {
            Carrinhos.deletarCarrinhoCancelandoCompra().then( res => {
                cy.contractValidation(res, "delete-carrinhos-cancelar-compra", 200).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarDeletarCarrinhoCancelandoCompra(res)
            })
        })
        it('Deve avisar token ausente', () => {
            Carrinhos.carrinhoTokenInvalido().then( res => {
                cy.contractValidation(res, "delete-carrinhos-cancelar-compra", 401).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCarrinhoTokenInvalido(res)
            })
        })

                                    //DELETE-CARRIONHOS-CONCLUIR-COMPRA
          
        it('Deve deletar carrionho e concluir compra', () => {
            Carrinhos.deletarCarrinhoConcluirCompra().then( res => {
                cy.contractValidation(res, "delete-carrinhos-concluir-compra", 200).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarDeletarCarrinhoConcluirCompra(res)
            })
        })
        it('Deve avisar token ausente', () => {
            Carrinhos.carrinhoTokenInvalidoOuAusente().then( res => {
                cy.contractValidation(res, "delete-carrinhos-concluir-compra", 401).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCarrinhoTokenInvalidoOuAusente(res)
            })
        })

    })

                    //GET-CARRINHOS

    it('Deve buscar todos os carrinhos', () => {
        Carrinhos.buscarCarrinhos().then( res => {
            cy.contractValidation(res, "get-carrinhos", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeCarrinhos(res)
        })
    })

                //GET-CARRINHOS-ID

    it('Deve buscar todos os carrinhos com id', () => {
        Carrinhos.buscarCarrinhosComId().then( res => {
            cy.contractValidation(res, "get-carrinhos-id", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeCarrinhosComId(res)
        })
    })
    it('Deve avisar do erro', () => {
        Carrinhos.buscarCarrinhosErro().then( res => {
            cy.contractValidation(res, "get-carrinhos-id", 400).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeCarrinhosErro(res)
        })
    })

})