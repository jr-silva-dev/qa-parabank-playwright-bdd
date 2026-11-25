import { When, Then } from '../support/fixtures';

When(
  'eu pago {string} no valor de {int} usando minha primeira conta',
  async ({ billPayPage, state }, favorecido: string, valor: number) => {
    state.lastPayment = { payee: favorecido, amount: String(valor) };
    await billPayPage.open();
    await billPayPage.pay(favorecido, String(valor), state.accounts[0]);
  },
);

Then(
  'o pagamento para {string} deve ser concluído',
  async ({ billPayPage, state }, favorecido: string) => {
    await billPayPage.expectCompleted(favorecido, state.lastPayment!.amount);
  },
);
