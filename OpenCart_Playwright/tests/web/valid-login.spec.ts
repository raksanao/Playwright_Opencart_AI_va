import { test, expect } from '@playwright/test';
import { generateCustomer } from '../../utils/dataGenerator';
import HomePage from '../../pages/HomePage';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';

const BASE_URL = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';

test('valid login @web', async ({ page }) => {
  const customer = generateCustomer();
  const home = new HomePage(page);
  const reg = new RegisterPage(page);
  const login = new LoginPage(page);

  await home.open(BASE_URL);
  await home.openRegister();
  await reg.registerCustomer(customer);
  await reg.assertRegistrationSuccess();

  await home.openLogin();
  await login.login(customer.email, customer.password);
  await login.assertLoginSuccess();
});
