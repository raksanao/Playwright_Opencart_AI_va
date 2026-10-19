import { test, expect } from '@playwright/test';
import { generateCustomer } from '../../utils/dataGenerator';
import HomePage from '../../pages/HomePage';
import RegisterPage from '../../pages/RegisterPage';

const BASE_URL = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';

test('registration @web @sanity', async ({ page }) => {
  const customer = generateCustomer();
  const home = new HomePage(page);
  const reg = new RegisterPage(page);

  await home.open(BASE_URL);
  await home.openRegister();
  await reg.registerCustomer(customer);
  await reg.assertRegistrationSuccess();
});
