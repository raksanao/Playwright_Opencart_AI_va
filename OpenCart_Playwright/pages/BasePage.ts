import type { Page, Locator } from '@playwright/test';

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForUrl(regex: RegExp | string, timeout = 20000) {
    await this.page.waitForURL(regex, { timeout });
  }

  async getText(locator: Locator) {
    return (await locator.textContent())?.trim() ?? '';
  }
}
