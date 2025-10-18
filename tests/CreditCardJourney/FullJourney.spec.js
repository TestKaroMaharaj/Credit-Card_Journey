const { test, expect } = require('@playwright/test');
const { BasicDetails } = require('../../pages/CreditCardJourney/BasicDetails.page');
const { PanDetails } = require('../../pages/CreditCardJourney/PanDetails.page');
const constants = require('../../utils/constants');

test.describe('Credit Card Journey — End-to-End', () => {
  test('✅ Full flow: Basic → PAN → Recommendations', async ({ page }) => {
    // Step 1: Basic Details
    const basic = new BasicDetails(page);
    await basic.goto();
    await basic.fillDetails(constants.testData.valid);
    await basic.acceptTerms();
    await basic.submit();

    // Step 2: PAN Details
    const panDetails = new PanDetails(page);
    await panDetails.verifyOnPage();
    await panDetails.fillPanDetails(constants.testData.panDetails);
    await panDetails.submit();

    // Step 3: Recommendation Screen
    await page.waitForURL(new RegExp(constants.urls.recommendation), { timeout: 20000 });
    await expect(page.getByText(/Wooooooo/i)).toBeVisible(); // heading check
    await expect(page).toHaveURL(new RegExp(constants.urls.recommendation));
  });
});
