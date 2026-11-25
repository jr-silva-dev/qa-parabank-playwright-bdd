import { When, Then } from '../support/fixtures';

When(
  'eu transfiro {int} da primeira para a segunda conta',
  async ({ transferPage, state }, amount: number) => {
    const [from, to] = state.accounts;
    state.lastTransfer = { amount: String(amount), from, to };
    await transferPage.open();
    await transferPage.transfer(String(amount), from, to);
  },
);

Then('a transferência deve ser concluída com sucesso', async ({ transferPage, state }) => {
  const t = state.lastTransfer!;
  await transferPage.expectCompleted(t.amount, t.from, t.to);
});
