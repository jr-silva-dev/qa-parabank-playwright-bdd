import { Page, expect } from '@playwright/test';

export class TransferPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.getByRole('link', { name: 'Transfer Funds' }).click();
  }

  async transfer(amount: string, fromAccount: string, toAccount: string) {
    await expect(this.page.locator('#fromAccountId option').first()).toBeAttached();
    await this.page.locator('#amount').fill(amount);
    await this.page.locator('#fromAccountId').selectOption(fromAccount);
    await this.page.locator('#toAccountId').selectOption(toAccount);
    await this.page.getByRole('button', { name: 'Transfer' }).click();
  }

  async expectCompleted(amount: string, fromAccount: string, toAccount: string) {
    await expect(this.page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    const result = this.page.locator('#showResult');
    await expect(result).toContainText(`$${Number(amount).toFixed(2)}`);
    await expect(result).toContainText(fromAccount);
    await expect(result).toContainText(toAccount);
  }
}
