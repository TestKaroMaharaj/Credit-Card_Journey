const { expect } = require('@playwright/test');

class PanDetails {
  constructor(page) {
    this.page = page;
    this.panInput = '#pan';
    this.employmentDropdown = '#v-0-0-2';
    this.incomeItr = '#netMonthlySalary';
    this.submitBtn = this.page.getByRole('button', { name: 'Submit' });
  }

  // ✅ reusable human typing
  async typeField(locator, value, delay = 120) {
    await this.page.type(locator, value.toString(), { delay });
    await this.page.waitForTimeout(300);
  }

  async verifyOnPage() {
    await expect(this.page.getByText(/Add Your Detail/i)).toBeVisible();
  }

  async fillPanDetails({ pan, employmentType, income }) {
    // PAN → only fill if empty
    const panValue = await this.page.inputValue(this.panInput);
    if (!panValue || panValue.trim() === '') {
      await this.typeField(this.panInput, pan);
    }

    // Employment Type → only select if default/empty
    const empText = await this.page.locator(this.employmentDropdown).textContent();
    if (!empText || !empText.includes(employmentType)) {
      await this.page.click(this.employmentDropdown);
      await this.page.getByRole('option', { name: employmentType }).click();
      await this.page.waitForTimeout(300);
    }

    // Income → only fill if empty
    const incomeValue = await this.page.inputValue(this.incomeItr);
    if (!incomeValue || incomeValue.trim() === '') {
      await this.typeField(this.incomeItr, income);
    }
  }

  async submit() {
    await this.submitBtn.waitFor({ state: 'visible', timeout: 20000 });
    await this.page.waitForTimeout(1000); // backend validation wait
    await expect(this.submitBtn).toBeEnabled({ timeout: 20000 });
    await this.submitBtn.click();
  }
}

module.exports = { PanDetails };
