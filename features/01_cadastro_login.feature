# language: pt
Funcionalidade: Cadastro e login
  Como cliente do banco
  Quero me cadastrar e acessar minha conta
  Para consultar e movimentar meu dinheiro

  @smoke
  Cenário: Cadastro com dados válidos já autentica o cliente
    Dado que estou na página inicial do ParaBank
    Quando eu me cadastro com dados válidos
    Então devo ver a mensagem de boas-vindas com meu usuário

  @smoke
  Cenário: Cliente cadastrado consegue sair e entrar novamente
    Dado que sou um cliente cadastrado e autenticado
    Quando eu saio e entro novamente com minhas credenciais
    Então devo ver a visão geral das contas

  Esquema do Cenário: Login inválido exibe mensagem de erro
    Dado que estou na página inicial do ParaBank
    Quando eu tento entrar com usuário "<usuario>" e senha "<senha>"
    Então devo ver o erro "<mensagem>"

    Exemplos:
      | usuario       | senha        | mensagem                                         |
      | usuario.falso | senha.errada | The username and password could not be verified. |
      |               |              | Please enter a username and password.            |
