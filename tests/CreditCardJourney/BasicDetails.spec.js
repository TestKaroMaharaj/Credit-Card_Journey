const { test, expect } = require('@playwright/test');
const { BasicDetails } = require('../../pages/CreditCardJourney/BasicDetails.page');
const constants = require('../../utils/constants');

test.describe('Credit Card Journey — Basic Details', () => {
  test('✅ Positive flow: Redirects to PAN Details page', async ({ page }) => {
    const basic = new BasicDetails(page);

    // Step 1: Navigate to Basic Details page
    await basic.goto();

    // Step 2: Fill valid details
    await basic.fillDetails(constants.testData.valid);

    // Step 3: Accept terms
    await basic.acceptTerms();

    // Step 4: Submit form
    await basic.submit();

    // ✅ Verify redirect to PAN details
    await expect(page).toHaveURL(new RegExp(constants.urls.panDetailsPrefix));
    await expect(page.getByText('Add Your Detail')).toBeVisible();
  });
});
