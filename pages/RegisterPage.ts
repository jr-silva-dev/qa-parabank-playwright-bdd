import { Page, expect } from '@playwright/test';

export interface NewCustomer {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export class RegisterPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/parabank/register.htm');
  }

  async register(customer: NewCustomer) {
    const field = (id: string) => this.page.locator(`input[id="${id}"]`);
    await field('customer.firstName').fill(customer.firstName);
    await field('customer.lastName').fill(customer.lastName);
    await field('customer.address.street').fill('Rua de Teste, 100');
    await field('customer.address.city').fill('São Paulo');
    await field('customer.address.state').fill('SP');
    await field('customer.address.zipCode').fill('01000-000');
    await field('customer.phoneNumber').fill('11999999999');
    await field('customer.ssn').fill('123-45-6789'); // dado fictício exigido pelo formulário demo
    await field('customer.username').fill(customer.username);
    await field('customer.password').fill(customer.password);
    await field('repeatedPassword').fill(customer.password);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async expectRegistered(username: string) {
    await expect(this.page.locator('#rightPanel')).toContainText(`Welcome ${username}`);
    await expect(this.page.locator('#rightPanel')).toContainText(
      'Your account was created successfully',
    );
  }
}
