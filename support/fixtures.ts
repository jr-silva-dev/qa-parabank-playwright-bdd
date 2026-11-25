import { test as base, createBdd } from 'playwright-bdd';
import { AccountsPage } from '../pages/AccountsPage';
import { BillPayPage } from '../pages/BillPayPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { TransferPage } from '../pages/TransferPage';

/** Estado compartilhado entre os passos de um mesmo cenário. */
export interface ScenarioState {
  username: string;
  password: string;
  accounts: string[];
  lastTransfer?: { amount: string; from: string; to: string };
  lastPayment?: { payee: string; amount: string };
}

export const test = base.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
  accountsPage: AccountsPage;
  transferPage: TransferPage;
  billPayPage: BillPayPage;
  state: ScenarioState;
}>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  accountsPage: async ({ page }, use) => use(new AccountsPage(page)),
  transferPage: async ({ page }, use) => use(new TransferPage(page)),
  billPayPage: async ({ page }, use) => use(new BillPayPage(page)),
  state: async ({}, use) => {
    // Usuário único por cenário: evita colisão entre execuções paralelas.
    const unique = `qa${Date.now()}${Math.floor(Math.random() * 1000)}`;
    await use({ username: unique, password: 'Senha@123', accounts: [] });
  },
});

export const { Given, When, Then } = createBdd(test);
