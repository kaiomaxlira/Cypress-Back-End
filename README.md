# Automação dos Testes da API Serverest

 O projeto tem como função a automação de testes utilizando a API Serverest. As tecnologias utilizadas para realização dos tetes foram Cypress, Nodejs, Faker, mochawesome e Ajv.

## Cenários de Testes automatizados

#### Produtos

    ✓ Validando esquema do contrato - SCHEMA

    ✓ Deve realizar a listagem - GET 

    ✓ Deve fazer a busca de produtos por id - GET_ID

    ✓ Deve realizar o cadastro - POST

    ✓ Deve realizar a atualização - PUT

    ✓ Deve deletar - DELETE

####  Carrinhos

    ✓ Validando esquema do contrato - SCHEMA

    ✓ Deve realizar o cadastro - POST

    ✓ Deve deletar concluindo compra - DELETE

    ✓ Deve deletar cancelar compra - DELETE

####  Usuários

    ✓ Validando esquema do contrato - SCHEMA

    ✓ Deve realizar o cadastro - POST

    ✓ Deve fazer a busca de usuarios por id - GET_ID

####  Login

    ✓ Deve validar o esquema do contrato - SCHEMA

    ✓ Deve realizar login com um usuário - POST



## Executando testes


#### Código para clonar o repositório:
```
git clone https://github.com/kaiomaxlira/Cypress-Back-End.git
```

#### Instalando dependências
```
npm install
```

#### Código para executar os testes em ambiente de produção:

```
npm run cy:open:prod
```

#### Código para gerar reportes dos testes:
```
npm run test
```

## Tecnologias

- [Node.js](https://nodejs.org/en/download/)
- [Faker](https://fakerjs.dev/)
- [Cypress](https://www.cypress.io/)
- [Mochawesome](https://www.npmjs.com/package/mochawesome)
- [VSCode](https://code.visualstudio.com/download)
- [Ajv](https://ajv.js.org/)

## Autor
Kaio Max Lira Pereira
