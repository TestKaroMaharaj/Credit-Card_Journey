const { test, expect } = require('@playwright/test');
const { BasicDetails } = require('../../pages/CreditCardJourney/BasicDetails.page');
const { PanDetails } = require('../../pages/CreditCardJourney/PanDetails.page');
const { RecommendationPage } = require('../../pages/CreditCardJourney/Recommendation.page');
const constants = require('../../utils/constants');

test.describe('Credit Card Journey — YES Bank', () => {
  test('✅ Full Positive Flow including Existing Application handling', async ({ page }) => {
    const basic = new BasicDetails(page);
    const pan = new PanDetails(page);
    const reco = new RecommendationPage(page);

    // Step 1: Basic Details
    await basic.goto();
    await basic.fillDetails(constants.testData.valid);
    await basic.acceptTerms();
    await basic.submit();

    // Step 2: PAN Details
    await pan.verifyOnPage();
    await pan.fillPanDetails(constants.testData.panDetails);
    await pan.submit();

    // Step 3: Current Application OR Recommendation
    await reco.selectYesAceCard();

    // ✅ Verify landing in Yes Bank journey
    await expect(page).toHaveURL(/yes-bank/i);

    await page.waitForTimeout(5000);
  });
});
