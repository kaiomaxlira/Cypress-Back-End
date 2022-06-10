
export default class ValidaServerest{

    // USUÁRIO

    static validarBuscaDeUsuarios(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(10)
    }

    static validarCadastroDeUsuarios(resposta){
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarFalhaAoCadastrarUsuario(resposta){
        expect(resposta.body.message).to.be.eq('Este email já está sendo usado')
    }

    static validarBuscaUsuarioPorId(resposta){

    }

    static validarBuscaUsuarioPorIdInvalido(resposta){
        expect(resposta.body.message).to.be.eq('Usuário não encontrado')
    }

    static validarexclusaoUsuario(resposta){

    }

    static validarANaoExclusaoDoUsuarioComCarrinho(resposta){
        expect(resposta.body.message).to.be.eq('Não é permitido excluir usuário com carrinho cadastrado')
    }

    static validarAlteraçaoNoUsuario(resposta){

    }

    static validarQueEmailDoUsuarioJaEstaCadastrado(resposta){
        expect(resposta.body.message).to.be.eq('Este email já está sendo usado')
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

    static validarJaExisteProdutoComEsseNome(resposta){
        expect(resposta.body.message).to.be.eq('Já existe produto com esse nome')
    }

    static validarTokenAusenteInvalidoExpirado(resposta){
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarRotaExclusivaParaAdministradores(resposta){
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static validarBuscaDeProdutosId(resposta){
 
    }
    static validarBuscaDeProdutoNaoEncontrado(resposta){
        expect(resposta.body.message).to.be.eq('Produto não encontrado')
    }

    static validarProdutoExcluidoComSucesso(resposta){
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    static validarProdutoNaoPodeSerExcluido(resposta){
        expect(resposta.body.message).to.be.eq('Não é permitido excluir produto que faz parte de carrinho')
    }

    static validarTokenAusente(resposta){
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static exclusivaParaAdministradores(resposta){
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static validarAlteracaoNoProduto(resposta){
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarCadastroDeProduto(resposta){
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarErroParaAlterarProdutoComMesmoNome(resposta){
        expect(resposta.body.message).to.be.eq('Já existe produto com esse nome')
    }

    static validarTokenInvalido(resposta){
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarRotaAdministradores(resposta){
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static validarBuscaDeCarrinhos(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarCadastroDeCarrinho(resposta){
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarCadastroDeCarrinhoComErro(resposta){
        expect(resposta.body.message).to.be.eq('Produto não encontrado')
    }

    static validarCadastroDeCarrinhoComTokenInvalido(resposta){
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarBuscaDeCarrinhosComId(resposta){

    }

    static validarBuscaDeCarrinhosErro(resposta){
        expect(resposta.body.message).to.be.eq('Carrinho não encontrado')
    }

    static validarDeletarCarrinhoCancelandoCompra(resposta){
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
    }

    static validarCarrinhoTokenInvalido(resposta){
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarDeletarCarrinhoConcluirCompra(resposta){
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    static validarCarrinhoTokenInvalidoOuAusente(resposta){
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }
}