const { test, expect } = require('@playwright/test');
const { PanDetails } = require('../../pages/CreditCardJourney/PanDetails.page');
const constants = require('../../utils/constants');

test.describe('Credit Card Journey — PAN Details', () => {
  test('✅ Positive flow: Redirects to Recommendation page', async ({ page }) => {
    const panDetails = new PanDetails(page);

    // Assume navigation already landed here from Basic Details in full flow
    await panDetails.verifyOnPage();

    // Fill PAN details (only if not already prefilled)
    await panDetails.fillPanDetails(constants.testData.panDetails);

    // Submit form
    await panDetails.submit();

    // ✅ Verify redirect to Recommendation screen
    await expect(page).toHaveURL(new RegExp(constants.urls.recommendationPrefix));
    await expect(page.getByText(/Wooooooo/i)).toBeVisible(); // heading on recommendation page
  });
});
