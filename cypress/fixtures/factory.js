const faker = require('faker');

export default class Factory {

    static gerarProduto(){
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.datatype.number(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static gerarInteiroAleatorio(){
        return faker.datatype.number(5)
    }

    static gerarUsuario() {
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": faker.datatype.boolean().toString()
        }
    }

    static gerarCarrinhos(){
        return{
            "quantidade": faker.datatype.number(),
            "precoUnitario": faker.datatype.number()
        }
    }
}