import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';

const BASE_URL = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';
const VALID_PRODUCT = process.env.PRODUCT_NAME || 'MacBook';

test('add to cart @web', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.open(BASE_URL);
  await home.searchProduct(VALID_PRODUCT);
  await product.openProductByName(VALID_PRODUCT);
  await product.assertProductVisible(VALID_PRODUCT);
  await product.addToCart('1');
  await product.assertSuccessMessage();

  await cart.openCart();
  await cart.assertProductInCart(VALID_PRODUCT, '1');
});
