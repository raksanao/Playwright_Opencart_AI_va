import { expect } from '@playwright/test';
import fs from 'fs';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  async login(email: string, password: string) {
    const loginUrl = 'https://tutorialsninja.com/demo/index.php?route=account/login';

    // Ensure we're on the login page (handles redirects)
    if (!this.page.url().includes('route=account/login')) {
      await this.page.goto(loginUrl, { waitUntil: 'networkidle' });
    }

    // Try multiple selectors in order of stability
    const candidateSelectors = [
      '#input-email',
      'input[type="email"]',
      'input[name="email"]',
      'input[placeholder*="E-Mail"]',
      'input[placeholder*="Email"]'
    ];

    let emailLocator = null as any;
    for (const sel of candidateSelectors) {
      const loc = this.page.locator(sel).first();
      if ((await loc.count()) > 0) {
        try {
          await loc.waitFor({ state: 'visible', timeout: 3000 });
          emailLocator = loc;
          break;
        } catch (e) {
          // try next
        }
      }
    }

    // Fallback: placeholder-based locator
    if (!emailLocator) {
      const ph = this.page.getByPlaceholder(/E-?Mail Address|Email/i).first();
      if ((await ph.count()) > 0) {
        try {
          await ph.waitFor({ state: 'visible', timeout: 3000 });
          emailLocator = ph;
        } catch (e) {
          // ignore
        }
      }
    }

    // If still not found, capture debug artifacts and fail clearly
    if (!emailLocator) {
      const ts = Date.now();
      const screenshotPath = `test-results/login-debug-${ts}.png`;
      const htmlPath = `test-results/login-debug-${ts}.html`;
      try {
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        fs.writeFileSync(htmlPath, await this.page.content(), 'utf8');
      } catch (e) {
        // ignore fs errors
      }
      throw new Error(`Email input not found on login page. Captured: ${screenshotPath}, ${htmlPath}`);
    }

    await emailLocator.scrollIntoViewIfNeeded();
    await emailLocator.click({ force: true });
    await emailLocator.fill(email);

    // Password locator with fallback
    let passwordLocator = this.page.locator('#input-password').first();
    if ((await passwordLocator.count()) === 0) passwordLocator = this.page.locator('input[type="password"]').first();
    await passwordLocator.waitFor({ state: 'visible', timeout: 5000 });
    await passwordLocator.fill(password);

    await this.page.getByRole('button', { name: /^Login$/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/account\/account|account\/success/i, { timeout: 20000 });
  }
}
