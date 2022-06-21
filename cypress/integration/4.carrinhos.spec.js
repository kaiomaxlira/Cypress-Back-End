/// <reference types="cypress" />

import Login from '../services/2.login.service'
import Carrinhos from "../services/4.carrinho.service";
import ValidaServerest from "../services/validaServerest.service";

describe("Teste de rota /carrinhos da API serverest", () => {

    //CARRINHOS

    //POST-CARRINHOS

    context('Logar com Sucesso', () => {
        beforeEach('Logar', () => {
            Carrinhos.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then(usuario => {
                Login.logar(usuario).then(res => {
                    ValidaServerest.validarLoginComSucesso(res)
                    Carrinhos.salvarBearer(res)
                })
            })
        })

        //POST_CARRINHOS

        it('Deve cadastrar carrinho', () => {
            Carrinhos.cadastrarCarrinho().then(res => {
                cy.contractValidation(res, "post-carrinhos", 201).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCadastroDeCarrinho(res)
            })
        })

        //DELETE-CARRIONHOS-CANCELAR-COMPRA

        it('Deve deletar carrionho cancelando compra', () => {
            Carrinhos.deletarCarrinhoCancelandoCompra().then(res => {
                cy.contractValidation(res, "delete-carrinhos-cancelar-compra", 200).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarDeletarCarrinhoCancelandoCompra(res)
            })
        })


        //DELETE-CARRIONHOS-CONCLUIR-COMPRA

        it('Deve deletar carrionho e concluir compra', () => {
            Carrinhos.deletarCarrinhoConcluirCompra().then(res => {
                cy.contractValidation(res, "delete-carrinhos-concluir-compra", 200).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarDeletarCarrinhoConcluirCompra(res)
            })
        })
    })

    //GET-CARRINHOS

    it('Deve buscar todos os carrinhos', () => {
        Carrinhos.buscarCarrinhos().then(res => {
            cy.contractValidation(res, "get-carrinhos", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeCarrinhos(res)
        })
    })

    //GET-CARRINHOS-ID

    it('Deve buscar todos os carrinhos com id', () => {
        Carrinhos.buscarCarrinhosComId().then(res => {
            cy.contractValidation(res, "get-carrinhos-id", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeCarrinhosComId(res)
        })
    })

})