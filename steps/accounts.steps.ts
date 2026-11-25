import { expect } from '@playwright/test';
import { Given, When, Then } from '../support/fixtures';

const TIPOS = { poupança: 'SAVINGS', corrente: 'CHECKING' } as const;

When('eu abro uma nova conta {string}', async ({ accountsPage, state }, tipo: string) => {
  const type = TIPOS[tipo as keyof typeof TIPOS];
  if (!type) throw new Error(`Tipo de conta desconhecido: ${tipo}`);
  state.accounts.push(await accountsPage.openNewAccount(type));
});

Then('a nova conta deve aparecer na visão geral', async ({ accountsPage, state }) => {
  const newest = state.accounts[state.accounts.length - 1];
  await accountsPage.open();
  expect(await accountsPage.accountNumbers()).toContain(newest);
});

Given('que tenho uma segunda conta poupança', async ({ accountsPage, state }) => {
  state.accounts.push(await accountsPage.openNewAccount('SAVINGS'));
});
