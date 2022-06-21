import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'

export default class Usuario {

    //POST-USUARIOS

    static cadastrarUsuario() {
        let usuario = Factory.gerarUsuario()
        cy.writeFile('./cypress/fixtures/usuario.json', usuario)
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true,
        })
    }

    static falhaAoCadastrarUsuario() {
        return cy.fixture('usuario.json').then((res) => {
            let email = res.email
            cy.request({
                method: 'POST',
                url: URL_USUARIOS,
                body: {
                    "nome": "Sr. Kelly Costa",
                    "email": email,
                    "password": "eY3Yv8IaToT5rXH",
                    "administrador": "false",
                },
                failOnStatusCode: false,
            })
        })
    }

    //GET-USUARIOS-ID

    static buscarUsuarioPorId(id) {
        return cy.request({
            method: 'GET',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: true
        })
    }

    //DELETE-USUARIOS

    static excluirUsuario(id) {
        return cy.request({
            method: 'DELETE',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: true
        })
    }
}