# language: pt
Funcionalidade: Pagamento de contas
  Como cliente autenticado
  Quero pagar contas a partir da minha conta
  Para quitar meus compromissos

  Cenário: Pagar uma conta com saldo suficiente
    Dado que sou um cliente cadastrado e autenticado
    Quando eu pago "Companhia de Energia" no valor de 25 usando minha primeira conta
    Então o pagamento para "Companhia de Energia" deve ser concluído
