import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
  async openCart() {
    await this.page.locator('#cart > button').first().click();
    await this.page.getByRole('link', { name: /View Cart|Shopping Cart/i }).first().click();
  }

  async assertProductInCart(productName: string, quantity = '1') {
    const row = this.page.locator('table tbody tr').filter({ hasText: productName }).first();
    await expect(row).toContainText(productName, { timeout: 20000 });
    await expect(row).toContainText(quantity);
  }

  async assertCartTotalContainsCurrency() {
    const bodyText = (await this.page.locator('body').textContent()) ?? '';
    expect(bodyText).toMatch(/\$|€|£/);
  }
}
