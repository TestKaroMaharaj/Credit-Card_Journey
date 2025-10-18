const { expect } = require('@playwright/test');

class BasicDetails {
  constructor(page) {
    this.page = page;
    this.phoneNumber = '#mobile';
    this.fullName = '#fullName';
    this.pincode = '#pincode';
    this.termsCheckbox = this.page.getByLabel('I agree to Privacy Policy , Terms of use and Disclaimer');
    this.checkEligibility = this.page.getByRole('button', { name: 'Check Eligibility' });
  }

  // ✅ reusable human typing
  async typeField(locator, value, delay = 120) {
    await this.page.type(locator, value.toString(), { delay });
    await this.page.waitForTimeout(300);
  }

  async goto() {
    await this.page.goto('/v2/credit-card/apply?utm_org_code=ORG01093&pageState=CREATE_LEAD');
    await expect(this.page).toHaveTitle('Get Best Credit Card Offers!');
  }

  async fillDetails({ phone, name, pincode }) {
    await this.typeField(this.phoneNumber, phone);
    await this.typeField(this.fullName, name);
    await this.typeField(this.pincode, pincode);
  }

  async acceptTerms() {
    await this.termsCheckbox.check();
  }

  async submit() {
    await this.checkEligibility.waitFor({ state: 'visible', timeout: 20000 });
    await this.page.waitForTimeout(1000); // give validation some time
    await expect(this.checkEligibility).toBeEnabled({ timeout: 20000 });
    await this.checkEligibility.click();
  }
}

module.exports = { BasicDetails };
