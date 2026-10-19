import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';

const BASE_URL = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';

test('invalid login shows error @web', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  await home.open(BASE_URL);
  await home.openLogin();
  await login.login('wrong@example.com','wrongpass');
  await expect(page.locator('body')).toContainText(/No match for E-Mail Address and\/or Password/i);
});
