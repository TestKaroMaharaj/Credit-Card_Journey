const { expect } = require('@playwright/test');

class RecommendationPage {
  constructor(page) {
    this.page = page;
    this.skipAndApplyBtn = page.locator('button:has-text("Skip & Apply For New Card")');
    this.cardTitle = page.getByText('YES Ace Credit Card', { exact: true });
  }

  async selectYesAceCard() {
    console.log('⏳ Waiting after PAN details for redirect...');
    // Wait a few seconds to let redirect fully load
    await this.page.waitForTimeout(5000);

    // ✅ Step 1: Detect Current Application OR Recommendation
    if (await this.skipAndApplyBtn.isVisible({ timeout: 7000 }).catch(() => false)) {
      console.log('⚡ Existing application detected → Clicking Skip & Apply For New Card');
      await this.skipAndApplyBtn.click();

      // Wait until Recommendation screen loads
      await this.page.waitForURL(/recommendation/, { timeout: 20000 });
    } else {
      console.log('✅ No existing application, going directly to Recommendation');
      // Wait for recommendation URL
      await this.page.waitForURL(/recommendation/, { timeout: 20000 });
    }

    // ✅ Step 2: Find YES Ace card
    console.log('🔎 Scrolling to YES Ace Credit Card');
    await this.cardTitle.scrollIntoViewIfNeeded();
    await expect(this.cardTitle).toBeVisible({ timeout: 10000 });

    // ✅ Step 3: Click View & Apply
    console.log('👉 Clicking View & Apply button for YES Ace Credit Card');
    const viewApplyBtn = this.cardTitle.locator('xpath=following::button[normalize-space()="View & Apply"][1]');
    await expect(viewApplyBtn).toBeVisible({ timeout: 10000 });
    await viewApplyBtn.click();

    // ✅ Step 4: Popup → Apply Now
    console.log('👉 Clicking Apply Now on popup');
    const applyNowBtn = this.page.getByRole('button', { name: /Apply Now/i });
    await expect(applyNowBtn).toBeVisible({ timeout: 10000 });
    await applyNowBtn.click();

    // ✅ Step 5: Redirect to YES Bank Journey
    console.log('🚀 Waiting for Yes Bank journey page...');
    await this.page.waitForURL(/yes-bank/i, { timeout: 20000 });
  }
}

module.exports = { RecommendationPage };
