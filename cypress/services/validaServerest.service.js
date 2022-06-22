
export default class ValidaServerest{

    // USUÁRIO

    static validarCadastroDeUsuarios(resposta){
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarFalhaAoCadastrarUsuario(resposta){
        expect(resposta.body.message).to.be.eq('Este email já está sendo usado')
    }

    static validarBuscaUsuarioPorId(resposta){

    }

    static validarexclusaoUsuario(resposta){

    }

    //LOGIN

    static validarLoginComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('authorization')    
    }

    static validarlogarComEmailErrado(resposta){
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    //PRODUTOS

    static validarBuscaDeProdutos(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(1)
    }

    static validarCadastroDeProdutoComSucesso(resposta){
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

       static validarBuscaDeProdutosId(resposta){
 
    }

    static validarAlteracaoNoProduto(resposta){
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarProdutoExcluidoComSucesso(resposta){
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    //CARRINHOS

    static validarCadastroDeCarrinho(resposta){
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarDeletarCarrinhoConcluirCompra(resposta){
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    static validarDeletarCarrinhoCancelandoCompra(resposta){
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
    } 
}