const { expect } = require('@playwright/test');
const { maximizeScreen, waitBetweenScreens } = require('../../utils/helpers');

class RecommendationPage {
  constructor(page) {
    this.page = page;
    this.skipAndApplyBtn = page.locator('button:has-text("Skip & Apply For New Card")');
    this.cardTitle = page.getByText('YES Ace Credit Card', { exact: true });
  }

  async waitForPage() {
    await maximizeScreen(this.page);
    await waitBetweenScreens(this.page);

    if (await this.page.getByText('Current Application').isVisible().catch(() => false)) {
      console.log('⚡ Current Application screen detected.');
      return;
    }

    await this.page.waitForSelector('text=Select card from your favourite banks', { timeout: 15000 });
  }

  async selectYesAceCard() {
    if (await this.skipAndApplyBtn.isVisible().catch(() => false)) {
      console.log('⚡ Existing application detected → Clicking Skip & Apply For New Card');
      await this.skipAndApplyBtn.click();
      await this.page.waitForURL(/recommendation/, { timeout: 20000 });
      await waitBetweenScreens(this.page);
    }

    console.log('🔎 Selecting YES Ace Credit Card');
    await this.cardTitle.scrollIntoViewIfNeeded();
    await expect(this.cardTitle).toBeVisible({ timeout: 10000 });

    const viewApplyBtn = this.cardTitle.locator('xpath=following::button[normalize-space()="View & Apply"][1]');
    await expect(viewApplyBtn).toBeVisible({ timeout: 10000 });
    await viewApplyBtn.click();
    await waitBetweenScreens(this.page);

    const applyNowBtn = this.page.getByRole('button', { name: /Apply Now/i });
    await expect(applyNowBtn).toBeVisible({ timeout: 10000 });
    await applyNowBtn.click();

    await this.page.waitForURL(/yes-bank/i, { timeout: 20000 });
    await waitBetweenScreens(this.page);
  }
}

module.exports = { RecommendationPage };
