const { expect } = require('@playwright/test');
const { maximizeScreen, typeHuman, waitBetweenScreens } = require('../../utils/helpers');

class BasicDetails {
  constructor(page) {
    this.page = page;
    this.url = '/v2/credit-card/apply?utm_org_code=ORG01093&pageState=CREATE_LEAD';
    this.phoneNumber = '#mobile';
    this.fullName = '#fullName';
    this.pincode = '#pincode';
    this.consentCheckbox = 'label:has-text("I agree to Privacy Policy , Terms of use and Disclaimer")';
    this.checkEligibility = 'button:has-text("Check Eligibility")';
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(this.phoneNumber);
    await maximizeScreen(this.page);
    await expect(this.page).toHaveTitle(/Get Best Credit Card Offers!/);
    await waitBetweenScreens(this.page);
  }

  async fillDetails({ phone, name, pincode }) {
    await typeHuman(this.page, this.phoneNumber, phone);
    await typeHuman(this.page, this.fullName, name);
    await typeHuman(this.page, this.pincode, pincode);
  }

  async acceptTerms() {
    await this.page.getByLabel('I agree to Privacy Policy , Terms of use and Disclaimer').check();
  }

  async submit() {
    await this.page.waitForSelector(this.checkEligibility, { state: 'visible' });
    await expect(this.page.locator(this.checkEligibility)).toBeEnabled();
    await this.page.click(this.checkEligibility);
    await waitBetweenScreens(this.page);
  }
}

module.exports = { BasicDetails };
