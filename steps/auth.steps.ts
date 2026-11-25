import { Given, When, Then } from '../support/fixtures';

Given('que estou na página inicial do ParaBank', async ({ loginPage }) => {
  await loginPage.open();
});

Given('que sou um cliente cadastrado e autenticado', async ({ registerPage, accountsPage, state }) => {
  await registerPage.open();
  await registerPage.register({
    firstName: 'Ana',
    lastName: 'QA',
    username: state.username,
    password: state.password,
  });
  await registerPage.expectRegistered(state.username);
  state.accounts = await accountsPage.accountNumbers();
});

When('eu me cadastro com dados válidos', async ({ registerPage, state }) => {
  await registerPage.open();
  await registerPage.register({
    firstName: 'Ana',
    lastName: 'QA',
    username: state.username,
    password: state.password,
  });
});

Then('devo ver a mensagem de boas-vindas com meu usuário', async ({ registerPage, state }) => {
  await registerPage.expectRegistered(state.username);
});

When('eu saio e entro novamente com minhas credenciais', async ({ loginPage, state }) => {
  await loginPage.logout();
  await loginPage.login(state.username, state.password);
});

Then('devo ver a visão geral das contas', async ({ accountsPage }) => {
  await accountsPage.expectOverviewVisible();
});

When(
  'eu tento entrar com usuário {string} e senha {string}',
  async ({ loginPage }, usuario: string, senha: string) => {
    await loginPage.login(usuario, senha);
  },
);

Then('devo ver o erro {string}', async ({ loginPage }, mensagem: string) => {
  await loginPage.expectError(mensagem);
});
