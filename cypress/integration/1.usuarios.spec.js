/// <reference types="cypress" />

import Usuario from "../services/1.usuario.service";
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
            cy.writeFile('./cypress/fixtures/usuarioid.json', res.body)
            cy.contractValidation(res, "post-usuarios", 201).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarCadastroDeUsuarios(res)
        })
    })

    it('Deve buscar usuário por ID', () => {
        cy.fixture('usuarioid').then((res) => {
            let id = res._id
            Usuario.buscarUsuarioPorId(id).then((res) => {
                cy.contractValidation(res, "get-usuarios-id", 200).then((res) => expect(res).to.be.eq(true));
                ValidaServerest.validarBuscaUsuarioPorId(res)
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
