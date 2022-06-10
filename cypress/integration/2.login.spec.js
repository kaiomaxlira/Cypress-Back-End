/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Teste de rota /login da API serverest', () => {

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.logar(usuario).then( res => {
                    cy.contractValidation(res, "post-login", 200).then((res) => expect(res).to.be.eq(true))
                    ValidaServerest.validarLoginComSucesso(res)
                        Serverest.salvarBearer(res)
            })
        })         
    })
    it('Deve avisar e-mail e/ou senha inválidos', () => {
        Serverest.logarComEmailErrado().then( res => {
            cy.contractValidation(res, "post-login", 400).then((res) => expect(res).to.be.eq(true))
            ValidaServerest.validarlogarComEmailErrado(res)
        })
    })
})