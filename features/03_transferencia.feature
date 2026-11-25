# language: pt
Funcionalidade: Transferência entre contas
  Como cliente com mais de uma conta
  Quero transferir dinheiro entre minhas contas
  Para distribuir meu saldo

  @smoke
  Cenário: Transferir valor entre duas contas do mesmo cliente
    Dado que sou um cliente cadastrado e autenticado
    E que tenho uma segunda conta poupança
    Quando eu transfiro 50 da primeira para a segunda conta
    Então a transferência deve ser concluída com sucesso
