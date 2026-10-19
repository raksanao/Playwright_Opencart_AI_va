import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  async open(url: string) {
    await this.goto(url);
  }

  async goToMyAccount() {
    await this.page.goto('https://tutorialsninja.com/demo/index.php?route=account/account');
  }

  async searchProduct(productName: string) {
    const encoded = encodeURIComponent(productName);
    await this.page.goto(`https://tutorialsninja.com/demo/index.php?route=product/search&search=${encoded}`);
  }

  async openLogin() {
    await this.page.goto('https://tutorialsninja.com/demo/index.php?route=account/login');
  }

  async openRegister() {
    await this.page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
  }

  async assertHomeLoaded() {
    await expect(this.page).toHaveURL(/index|home/i);
  }
}
