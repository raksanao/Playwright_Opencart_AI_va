import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class RegisterPage extends BasePage {
  async registerCustomer(data: { firstName: string; lastName: string; email: string; telephone: string; password: string; }) {
    await this.page.getByLabel(/First Name/i).fill(data.firstName);
    await this.page.getByLabel(/Last Name/i).fill(data.lastName);
    await this.page.getByLabel(/E-Mail/i).fill(data.email);
    await this.page.getByLabel(/Telephone/i).fill(data.telephone);
    await this.page.locator('#input-password').fill(data.password);
    await this.page.locator('#input-confirm').fill(data.password);
    await this.page.locator('input[name="agree"]').check({ force: true });
    await this.page.locator('input[type="submit"][value="Continue"]').click();
  }

  async assertRegistrationSuccess() {
    await expect(this.page.locator('body')).toContainText(/Your Account Has Been Created!|Your account has been created/i, { timeout: 20000 });
  }
}
