const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'

export default class Login {

    static logar(usuario){
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            failOnStatusCode: true,
            body: usuario
        })
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
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
}