/// <reference types="cypress" />

import Login from '../services/2.login.service'
import Usuario from '../services/1.usuario.service'
import Produto from '../services/3.produto.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Teste de rota /produtos da API serverest', () => {

    //GET-PRODUTOS

    it('Deve buscar todos os produtos cadastados', () => {
        Produto.buscarProdutos().then(res => {
            cy.contractValidation(res, "get-produtos", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

    context('Logar com Sucesso', () => {
        beforeEach('Logar', () => {
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

        //POST PRODUTOS

        it('Deve cadastrar produtos com sucesso', () => {
            Produto.cadastrarProdutoComSucesso().then(res => {
                cy.writeFile('./cypress/fixtures/produtoid.json', res.body)
                cy.contractValidation(res, "post-produtos", 201).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarCadastroDeProdutoComSucesso(res)
            })
        })

        //GET-PRODUTOS-ID

        it('Deve buscar produtos por id', () => {
            cy.fixture('produtoid').then((res) => {
                let id = res._id
                Produto.buscarProdutosId(id).then(res => {
                    cy.contractValidation(res, "get-produtos-id", 200).then((res) => expect(res).to.be.eq(true))
                    ValidaServerest.validarBuscaDeProdutosId(res)
                })
            })
        })

        //PUT-PRODUTOS

        it('Deve alterar produto', () => {
            cy.fixture('produtoid').then((res) => {
                let id = res._id
                Produto.alterarProduto(id).then(res => {
                    cy.contractValidation(res, "put-produtos", 200).then((res) => expect(res).to.be.eq(true))
                    ValidaServerest.validarAlteracaoNoProduto(res)
                })
            })
        })

        //DELETE-PRODUTOS

        it('Deve avisar produto excluído com sucesso', () => {
            cy.fixture('produtoid').then((res) => {
                let id = res._id
                Produto.produtoExcluidoComSucesso(id).then(res => {
                    cy.contractValidation(res, "delete-produtos", 200).then((res) => expect(res).to.be.eq(true))
                    ValidaServerest.validarProdutoExcluidoComSucesso(res)
                })
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