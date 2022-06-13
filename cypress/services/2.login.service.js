import Factory from "../fixtures/factory"


const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Login {

    static buscarUsuarioParaLogin(){
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[2].email,
                password: res.body.usuarios[2].password 
            }).as('usuarioLogin')
                       
        })
    }

    static logarComEmailErrado(){
       return cy.request({
           method:'POST',
           url: URL_LOGIN,
           body:{
               "email": "jmlkçj_Saraiva@yahoo.com",
               "password": "kkkkkk"
           },
           failOnStatusCode: false,
       })
    }

    static logar(usuario){
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }
}