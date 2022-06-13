/// <reference types="cypress" />

import Login from '../services/2.login.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Teste de rota /login da API serverest', () => {

    it('Deve realizar login com sucesso', () => {
        Login.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
                Login.logar(usuario).then( res => {
                    cy.contractValidation(res, "post-login", 200).then((res) => expect(res).to.be.eq(true))
                    ValidaServerest.validarLoginComSucesso(res)
                        Login.salvarBearer(res)
            })
        })         
    })
    it('Deve avisar e-mail e/ou senha inválidos', () => {
        Login.logarComEmailErrado().then( res => {
            cy.contractValidation(res, "post-login", 400).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarlogarComEmailErrado(res)
        })
    })
})