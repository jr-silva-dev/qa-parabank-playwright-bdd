import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/parabank/index.htm');
  }

  async login(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async expectError(message: string) {
    await expect(this.page.locator('#rightPanel')).toContainText(message);
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Log Out' }).click();
  }
}
