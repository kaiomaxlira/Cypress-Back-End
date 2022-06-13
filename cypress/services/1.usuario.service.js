import Factory from "../fixtures/factory"


const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

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

    static falhaAoCadastrarUsuario(){

        return this.buscarUsuarios().then(res => { 
            let email = res.body.usuarios[0].email
         cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": "Fulano da Silva",
                "email": email,
                "password": "teste",
                "administrador": "true"
              },
            failOnStatusCode: false,
        })
        })
    }

        //GET-USUARIOS

    static buscarUsuarioPorId(){
        return this.buscarUsuarios().then(res => {
            let id = res.body.usuarios[5]._id
            cy.request({
                method: 'GET',
                url: URL_USUARIOS + `/${id}`,
                failOnStatusCode: true
            })
        })
    }

    static buscarUsuarioPorIdInvalido(){
        let id = 'iderrado'
        return cy.request({
            method: 'GET',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false
        })
    }

         //DELETE-USUARIOS

    static excluirUsuario(){
        return this.buscarUsuarios().then(res => {
            let id = res.body.usuarios[5]._id
            cy.request({
                method: 'DELETE',
                url: URL_USUARIOS + `/${id}`,
                failOnStatusCode: true
            })
        })
    }

    static usuarioComCarrinhoCadastrado(){
        let id = 'oUb7aGkMtSEPf6BZ'
        return cy.request({
            method: 'DELETE',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false
        })
    }

        //PUT-USUARIOS

    static editarUsuarios(){
        let id = 'CfkHqp7Wz2uyDnR6'
        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: true,
            body:{
                "nome": "Kaio Max",
                "email": "Gidevaldo83@live.com",
                "password": "ZDehoAtrGLWa7rF",
                "administrador": "true"
            }
        })
    }

    static emailJaCadastrado(){
        let id = 'CfkHqp7Wz2uyDnR6'
        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + `/${id}`,
            failOnStatusCode: false,
            body:{
                "nome": "Kaio Maxx",
                "email": "Luciano97@yahoo.com",
                "password": "ZDehoAtrGLWa7rF",
                "administrador": "true"
            }
        })
    }
}