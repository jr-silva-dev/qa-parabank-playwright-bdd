import { Page, expect } from '@playwright/test';

export class AccountsPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.getByRole('link', { name: 'Accounts Overview' }).click();
  }

  async expectOverviewVisible() {
    await expect(this.page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
  }

  /** Lê os números das contas listadas na visão geral. */
  async accountNumbers(): Promise<string[]> {
    await this.expectOverviewVisible();
    const links = this.page.locator('#accountTable a[href*="activity.htm"]');
    await expect(links.first()).toBeVisible();
    return (await links.allTextContents()).map((t) => t.trim());
  }

  async openNewAccount(type: 'CHECKING' | 'SAVINGS'): Promise<string> {
    await this.page.getByRole('link', { name: 'Open New Account' }).click();
    await this.page.locator('#type').selectOption(type);
    // O formulário carrega as contas de origem via AJAX; espera ter ao menos uma opção.
    await expect(this.page.locator('#fromAccountId option').first()).toBeAttached();
    await this.page.getByRole('button', { name: 'Open New Account' }).click();
    await expect(this.page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
    return (await this.page.locator('#newAccountId').innerText()).trim();
  }
}
