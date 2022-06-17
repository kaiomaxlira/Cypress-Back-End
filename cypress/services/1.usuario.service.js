import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'

export default class Usuario {

    //USUARIOS
    //GET-USUARIOS

    static buscarUsuarios(){
        return cy.rest('GET', URL_USUARIOS)
    }


    //POST-USUARIOS

    static cadastrarUsuario(){
        let usuario = Factory.gerarUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true,
        })
    }
         //DELETE-USUARIOS

    static excluirUsuario(){
        return this.buscarUsuarios().then(res => {
            let id = res.body.usuarios[0]._id
            cy.request({
                method: 'DELETE',
                url: URL_USUARIOS + `/${id}`,
                failOnStatusCode: true
            })
        })
    }
}