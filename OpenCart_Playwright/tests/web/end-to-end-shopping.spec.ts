import { test, expect } from '@playwright/test';
import { generateCustomer } from '../../utils/dataGenerator';
import HomePage from '../../pages/HomePage';
import RegisterPage from '../../pages/RegisterPage';
import MyAccountPage from '../../pages/MyAccountPage';
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';

const BASE_URL = process.env.WEB_APP_URL || 'http://localhost/opencart/upload/';
const PRODUCT_NAME = process.env.PRODUCT_NAME || 'MacBook';

test('end-to-end customer journey: register, login, search, add to cart', async ({ page }) => {
  test.slow();
  const customer = generateCustomer();
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const myAccountPage = new MyAccountPage(page);
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.open(BASE_URL);
  await homePage.openRegister();
  await expect(page).toHaveURL(/register/i);

  await registerPage.registerCustomer(customer);
  await registerPage.assertRegistrationSuccess();

  await myAccountPage.logout();
  await expect(page).toHaveURL(/logout|index/i);

  await homePage.openLogin();
  await expect(page).toHaveURL(/login/i);

  await loginPage.login(customer.email, customer.password);
  await loginPage.assertLoginSuccess();

  await homePage.searchProduct(PRODUCT_NAME);
  await expect(page.getByText(PRODUCT_NAME, { exact: false }).first()).toBeVisible({ timeout: 20000 });

  await productPage.openProductByName(PRODUCT_NAME);
  await productPage.assertProductVisible(PRODUCT_NAME);
  await productPage.addToCart('1');
  await productPage.assertSuccessMessage();

  await cartPage.openCart();
  await expect(page).toHaveURL(/shopping_cart|cart/i);
  await cartPage.assertProductInCart(PRODUCT_NAME, '1');
  await cartPage.assertCartTotalContainsCurrency();

  await expect(page.locator('body')).toContainText(PRODUCT_NAME);
  await expect(page.locator('body')).toContainText('1');
});
