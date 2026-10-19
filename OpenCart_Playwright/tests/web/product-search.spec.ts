import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';

const BASE_URL = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';
const VALID_PRODUCT = process.env.PRODUCT_NAME || 'MacBook';

test('product search @web', async ({ page }) => {
  const home = new HomePage(page);
  await home.open(BASE_URL);
  await home.searchProduct(VALID_PRODUCT);
  await expect(page.getByText(VALID_PRODUCT, { exact: false }).first()).toBeVisible({ timeout: 20000 });
});
