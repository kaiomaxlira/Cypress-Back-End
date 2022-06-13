/// <reference types="cypress" />

import Usuario from "../services/1.usuario.service";
import ValidaServerest from "../services/validaServerest.service";

describe("Teste de rota /usuarios da API serverest", () => {

    it("Deve buscar todos os usuários cadastrados", () => {
        Usuario.buscarUsuarios().then((res) => {
            cy.contractValidation(res, "get-usuarios", 200).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarBuscaDeUsuarios(res);
        });
    });

    it("Deve cadastrar usuário", () => {
        Usuario.cadastrarUsuario().then((res) => {
            cy.contractValidation(res, "post-usuarios", 201).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarCadastroDeUsuarios(res);
        });
    });

    it("Deve falhar ao tentar cadastrar um usuário", () => {
        Usuario.falhaAoCadastrarUsuario().then((res) => {
            cy.contractValidation(res, "post-usuarios", 400).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarFalhaAoCadastrarUsuario(res);
        });
    });

    it('Deve buscar usuário por ID', () => {
        Usuario.buscarUsuarioPorId().then((res) => {
            cy.contractValidation(res, "get-usuarios-id", 200).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarBuscaUsuarioPorId(res)
        })
    })

    it('Deve falhar ao tentar encontar usuario por id', () => {
        Usuario.buscarUsuarioPorIdInvalido().then((res) => {
            cy.contractValidation(res, "get-usuarios-id", 400).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarBuscaUsuarioPorIdInvalido(res)
        })
    })

    it.only('Deve excluir usuarios', () => {
        Usuario.cadastrarUsuario().then((res) => {
            Usuario.excluirUsuario().then((res) => {
                cy.contractValidation(res, "delete-usuarios", 200).then((res) => expect(res).to.be.eq(true));
                ValidaServerest.validarexclusaoUsuario(res)
            })
        })
    })

    it('Não pode excluir usuario com carrinho cadastrado', () => {
        Usuario.usuarioComCarrinhoCadastrado().then((res) => {
            cy.contractValidation(res, "delete-usuarios", 400).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarANaoExclusaoDoUsuarioComCarrinho(res)
        })
    })

    it('Deve editar os usuarios', () => {
        Usuario.editarUsuarios().then((res) => {
            cy.contractValidation(res, "put-usuarios", 200).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarAlteraçaoNoUsuario(res)
        })
    })

    it('Deve avisar que o email ja esta cadastrado', () => {
        Usuario.emailJaCadastrado().then((res) => {
            cy.contractValidation(res, "put-usuarios", 400).then((res) => expect(res).to.be.eq(true));
            ValidaServerest.validarQueEmailDoUsuarioJaEstaCadastrado(res)
        })
    })
});
