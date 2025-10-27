const { expect } = require('@playwright/test');
const { maximizeScreen, waitBetweenScreens } = require('../../utils/helpers');

class YesBankPersonalInfoPage {
    constructor(page) {
      this.page = page;
      this.consentCheckbox = 'button:has-text("I Accept all the T&C and Key fact statement for YES Bank credit card application. Read More")';
      this.savePreferencesButton = 'button:has-text("Save Preferences")';
      this.saveAndNextButton = 'button:has-text("Save & Next")';
  }

  async waitForPage() {
    await this.page.waitForSelector(this.consentCheckbox, { timeout: 15000 });
    await maximizeScreen(this.page);
    await this.page.waitForLoadState('domcontentloaded');
    await waitBetweenScreens(this.page);
  }

  async giveConsent() {
    await expect(this.page.locator(this.consentCheckbox)).toBeVisible();
    await this.page.click(this.consentCheckbox);
    await waitBetweenScreens(this.page);
  }

  async savePreferences() {
    await this.page.waitForSelector(this.savePreferencesButton, { state: 'visible' });
    await this.page.click(this.savePreferencesButton);
    await waitBetweenScreens(this.page);
  }

  async submitPersonalInfo() {
    await expect(this.page.locator(this.saveAndNextButton)).toBeEnabled();
    await this.page.click(this.saveAndNextButton);
    await waitBetweenScreens(this.page);
  }
}

module.exports = { YesBankPersonalInfoPage };
