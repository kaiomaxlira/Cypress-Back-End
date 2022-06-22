/// <reference types="cypress" />

import Login from '../services/2.login.service'
import Produto from '../services/3.produto.service'
import Usuario from '../services/1.usuario.service';
import Carrinhos from "../services/4.carrinho.service";
import ValidaServerest from "../services/validaServerest.service";

describe("Teste de rota /carrinhos da API serverest", () => {

    context('Logar com Sucesso', () => {
        before('Logar', () => {
            Usuario.cadastrarUsuario().then((res) => {
                let id = res.body._id
                Usuario.buscarUsuarioPorId(id).then(res => {
                    cy.wrap({
                        email: res.body.email,
                        password: res.body.password
                    }).as('usuarioLogin')
                })
                cy.get('@usuarioLogin').then(usuario => {
                    Login.logar(usuario).then(res => {
                        cy.contractValidation(res, "post-login", 200).then((res) => expect(res).to.be.eq(true))
                        ValidaServerest.validarLoginComSucesso(res)
                        Login.salvarBearer(res)
                    })
                })
            })
        })
        context('Concluindo compra', () => {

            //POST_CARRINHOS

            it('Deve cadastrar carrinho', () => {
                Produto.cadastrarProdutoComSucesso().then(res => {
                    cy.writeFile('./cypress/fixtures/produtoid.json', res.body)
                    Carrinhos.cadastrarCarrinho().then(res => {
                        cy.contractValidation(res, "post-carrinhos", 201).then((res) => expect(res).to.be.eq(true))
                        ValidaServerest.validarCadastroDeCarrinho(res)
                    })
                })
            })

            //DELETE-CARRIONHOS-CONCLUIR-COMPRA

            it('Deve deletar carrinho e concluir compra', () => {
                Carrinhos.deletarCarrinhoConcluirCompra().then(res => {
                    cy.contractValidation(res, "delete-carrinhos-concluir-compra", 200).then((res) => expect(res).to.be.eq(true))
                    ValidaServerest.validarDeletarCarrinhoConcluirCompra(res)
                })
            })
        })
        context('Cancelar compra', () => {

            //POST_CARRINHOS

            it('Deve cadastrar carrinho', () => {
                Produto.cadastrarProdutoComSucesso().then(res => {
                    cy.writeFile('./cypress/fixtures/produtoid.json', res.body)
                    Carrinhos.cadastrarCarrinho().then(res => {
                        cy.contractValidation(res, "post-carrinhos", 201).then((res) => expect(res).to.be.eq(true))
                        ValidaServerest.validarCadastroDeCarrinho(res)
                    })
                })
            })

            //DELETE-CARRIONHOS-CANCELAR-COMPRA

            it('Deve deletar carrinho cancelando compra', () => {
                Carrinhos.deletarCarrinhoCancelandoCompra().then(res => {
                    cy.contractValidation(res, "delete-carrinhos-cancelar-compra", 200).then((res) => expect(res).to.be.eq(true))
                    ValidaServerest.validarDeletarCarrinhoCancelandoCompra(res)
                })
            })

            it('Deve excluir usuario', () => {
                cy.fixture('usuarioid').then((res) => {
                    let id = res._id
                    Usuario.excluirUsuario(id).then((res) => {
                        cy.contractValidation(res, "delete-usuarios", 200).then((res) => expect(res).to.be.eq(true))
                        ValidaServerest.validarexclusaoUsuario(res)
                    })
                })
            })
        })
    })
})
