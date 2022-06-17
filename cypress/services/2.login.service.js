const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'

export default class Login {

    static buscarUsuarioParaLogin(){
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password 
            }).as('usuarioLogin')
                       
        })
    }

    static logar(usuario){
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }
}