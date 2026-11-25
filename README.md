# ParaBank: testes E2E com Playwright, TypeScript e BDD

![E2E](https://github.com/jr-silva-dev/qa-parabank-playwright-bdd/actions/workflows/e2e.yml/badge.svg)

Testes de ponta a ponta do [ParaBank](https://parabank.parasoft.com), um banco de demonstração público da Parasoft, escritos em **BDD (Gherkin em português)** com **Playwright** e **TypeScript**, usando **Page Object Model** e rodando no **GitHub Actions**.

## Cenários cobertos

| Funcionalidade | Cenários |
|---|---|
| Cadastro e login | cadastro válido já autentica o cliente; sair e entrar novamente; login inválido (credenciais erradas e campos vazios) |
| Gestão de contas | abrir conta poupança e conta corrente |
| Transferência | transferir valor entre duas contas do mesmo cliente |
| Pagamento de contas | pagar uma conta com saldo suficiente |

Os cenários marcados com `@smoke` formam a suíte rápida: `npx bddgen && npx playwright test --grep @smoke`.

## Estrutura

```
features/   cenários em Gherkin (português)
steps/      definição dos passos, sem seletores
pages/      Page Objects (login, cadastro, contas, transferência, pagamento)
support/    fixtures do Playwright e estado compartilhado do cenário
.github/    pipeline do GitHub Actions
```

Decisões de projeto:

- **Passos sem seletores:** os steps só chamam métodos dos Page Objects. Se a tela mudar, o ajuste fica em `pages/`.
- **Dados isolados:** cada cenário cadastra um usuário novo com nome único, então os testes não dependem uns dos outros e podem rodar em paralelo.
- **Fixtures:** as páginas e o estado do cenário são injetados pelo Playwright, sem variáveis globais.

## Como rodar

```bash
npm install
npx playwright install chromium

npm test              # gera os testes a partir dos .feature e executa
npm run test:headed   # com o navegador visível
npm run report        # abre o relatório HTML
```

Para apontar para outra instância: `BASE_URL=https://meu-parabank npm test`.

## Premissas e limitações

- O ParaBank é um ambiente público e compartilhado: pode ficar lento ou indisponível, e a Parasoft reinicia os dados de tempos em tempos. Por isso o pipeline usa 2 tentativas extras (`retries`) e guarda `trace` e capturas de tela das falhas.
- Os testes assumem que o cadastro cria uma conta padrão para o cliente, o que acontece no ParaBank atual.
- As mensagens de erro verificadas (`The username and password could not be verified.` e `Please enter a username and password.`) estão em inglês porque a aplicação é em inglês. Os cenários e os passos estão em português.
- O número do CPF/SSN usado no cadastro é fictício e exigido pelo formulário de demonstração.

## Tecnologias

Playwright, TypeScript, playwright-bdd (Gherkin), GitHub Actions.
