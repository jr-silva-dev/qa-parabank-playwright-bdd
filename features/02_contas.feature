# language: pt
Funcionalidade: Gestão de contas
  Como cliente autenticado
  Quero abrir novas contas
  Para organizar meu dinheiro

  Esquema do Cenário: Abrir uma nova conta
    Dado que sou um cliente cadastrado e autenticado
    Quando eu abro uma nova conta "<tipo>"
    Então a nova conta deve aparecer na visão geral

    Exemplos:
      | tipo     |
      | poupança |
      | corrente |
