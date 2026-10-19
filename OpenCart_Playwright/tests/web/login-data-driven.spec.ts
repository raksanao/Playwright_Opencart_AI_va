import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';

const BASE_URL = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';

const cases = [
  { email: 'wrong@example.com', password: 'bad', valid: false },
];

test.describe('Login data-driven @web', ()=>{
  for (const c of cases){
    test(`login with ${c.email} (valid=${c.valid})`, async ({ page })=>{
      const home = new HomePage(page);
      const login = new LoginPage(page);
      await home.open(BASE_URL);
      await home.openLogin();
      await login.login(c.email, c.password);
      if (c.valid) {
        await login.assertLoginSuccess();
      } else {
        await expect(page.locator('body')).toContainText(/No match for E-Mail Address and\/or Password/i);
      }
    });
  }
});
