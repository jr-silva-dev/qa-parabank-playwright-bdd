import { Page, expect } from '@playwright/test';

export class BillPayPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.getByRole('link', { name: 'Bill Pay' }).click();
  }

  async pay(payeeName: string, amount: string, fromAccount: string) {
    const input = (name: string) => this.page.locator(`input[name="${name}"]`);
    await input('payee.name').fill(payeeName);
    await input('payee.address.street').fill('Av. Paulista, 1000');
    await input('payee.address.city').fill('São Paulo');
    await input('payee.address.state').fill('SP');
    await input('payee.address.zipCode').fill('01310-100');
    await input('payee.phoneNumber').fill('1133334444');
    await input('payee.accountNumber').fill('12345');
    await input('verifyAccount').fill('12345');
    await input('amount').fill(amount);
    await this.page.locator('select[name="fromAccountId"]').selectOption(fromAccount);
    await this.page.getByRole('button', { name: 'Send Payment' }).click();
  }

  async expectCompleted(payeeName: string, amount: string) {
    await expect(this.page.getByRole('heading', { name: 'Bill Payment Complete' })).toBeVisible();
    const result = this.page.locator('#billpayResult');
    await expect(result).toContainText(payeeName);
    await expect(result).toContainText(`$${Number(amount).toFixed(2)}`);
  }
}
