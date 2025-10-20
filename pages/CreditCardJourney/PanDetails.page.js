const { expect } = require('@playwright/test');
const { maximizeScreen, typeHuman, waitBetweenScreens } = require('../../utils/helpers');

class PanDetails {
  constructor(page) {
    this.page = page;
    this.panInput = '#pan';
    this.employmentTypeDropdown = '#v-0-0-2';
    this.incomeInput = '#netMonthlySalary';
    this.submitButton = 'button:has-text("Submit")';
  }

  async waitForPage() {
    await this.page.waitForSelector(this.panInput, { state: 'visible' });
    await maximizeScreen(this.page);
    await expect(this.page.getByText('Add Your Detail')).toBeVisible();
    await waitBetweenScreens(this.page);
  }

  async fillPanDetails({ pan, employmentType, income }) {
    const panField = this.page.locator(this.panInput);

    if (!(await panField.isEnabled())) {
      console.log('ℹ️ PAN details already prefilled → skipping inputs.');
      return;
    }

    await typeHuman(this.page, this.panInput, pan);

    await this.page.click(this.employmentTypeDropdown);
    await this.page.getByRole('option', { name: employmentType }).click();

    await typeHuman(this.page, this.incomeInput, income);
  }

  async submit() {
    await this.page.waitForSelector(this.submitButton, { state: 'visible' });
    await expect(this.page.locator(this.submitButton)).toBeEnabled();
    await this.page.click(this.submitButton);
    await waitBetweenScreens(this.page);
  }
}

module.exports = { PanDetails };
