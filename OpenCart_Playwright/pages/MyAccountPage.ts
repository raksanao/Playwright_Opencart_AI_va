import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class MyAccountPage extends BasePage {
  async logout() {
    await this.page.locator('a[title="My Account"]').first().click();
    await this.page.locator('#top-links a[href*="logout"]').first().click();
  }

  async assertLoggedIn() {
    await expect(this.page.locator('body')).toContainText('My Account');
  }
}
