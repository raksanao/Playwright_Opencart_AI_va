import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
  async openProductByName(productName: string) {
    const productLink = this.page.locator('.product-layout').filter({ hasText: productName }).first().locator('a').nth(1);
    await productLink.click();
  }

  async addToCart(quantity = '1') {
    await this.page.locator('#input-quantity').fill(quantity);
    await this.page.locator('button[id*="button-cart"]').first().click();
  }

  async assertSuccessMessage() {
    await expect(this.page.locator('body')).toContainText(/Success:|Success/i, { timeout: 20000 });
  }

  async assertProductVisible(productName: string) {
    await expect(this.page.locator('h1').filter({ hasText: productName })).toBeVisible({ timeout: 20000 });
  }
}
