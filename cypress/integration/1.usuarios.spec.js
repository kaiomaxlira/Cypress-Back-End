/// <reference types="cypress" />

import Usuario from "../services/1.usuario.service";
import Login from '../services/2.login.service';
import Carrinhos from "../services/4.carrinho.service";
import ValidaServerest from "../services/validaServerest.service";


describe("Teste de rota /usuarios da API serverest", () => {

    it("Deve buscar todos os usuários cadastrados", () => {
        Usuario.buscarUsuarios().then((res) => {
            cy.contractValidation(res, "get-usuarios", 200).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it("Deve cadastrar usuário", () => {
        Usuario.cadastrarUsuario().then((res) => {
            cy.contractValidation(res, "post-usuarios", 201).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarCadastroDeUsuarios(res)
            Usuario.excluirUsuario().then((res) => {
            })
        })
    })

    it('Deve excluir usuario', () => {
        Login.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Login.logar(usuario).then(res => {
                cy.contractValidation(res, "post-login", 200).then((res) => expect(res).to.be.eq(true))
                Login.salvarBearer(res)
                Carrinhos.deletarCarrinhoConcluirCompra().then(res => {
                    cy.contractValidation(res, "delete-carrinhos-concluir-compra", 200).then((res) => expect(res).to.be.eq(true))
                })
            })
            Usuario.excluirUsuario().then((res) => {
                cy.contractValidation(res, "delete-usuarios", 200).then((res) => expect(res).to.be.eq(true))
                ValidaServerest.validarexclusaoUsuario(res)
            })
        })
    })
})
