const { test, expect } = require('@playwright/test');
const { BasicDetails } = require('../../pages/CreditCardJourney/BasicDetails.page');
const { PanDetails } = require('../../pages/CreditCardJourney/PanDetails.page');
const { RecommendationPage } = require('../../pages/CreditCardJourney/Recommendation.page');
const { YesBankPersonalInfoPage } = require('../../pages/CreditCardJourney/YesBankPersonalInfo.page');
const { takeScreenshot } = require('../../utils/helpers');

test.describe('Credit Card Journey — YES Bank Full Flow', () => {
  test('✅ End-to-End till Personal Info Save & Next', async ({ page }) => {
    const basic = new BasicDetails(page);
    await basic.goto();
    await basic.fillDetails({ phone: '9820675766', name: 'Saswat Chaturvedi', pincode: '400055' });
    await basic.acceptTerms();
    await basic.submit();
    await takeScreenshot(page, 'basic-details-submitted');

    const pan = new PanDetails(page);
    await pan.waitForPage();
    await pan.fillPanDetails({ pan: 'BVXPN1059K', employmentType: 'Salaried', income: '1500000' });
    await pan.submit();
    await takeScreenshot(page, 'pan-details-submitted');

    const reco = new RecommendationPage(page);
    await reco.waitForPage();
    await reco.selectYesAceCard();
    await takeScreenshot(page, 'recommendation-yes-ace-selected');

    const personalInfo = new YesBankPersonalInfoPage(page);
    await personalInfo.waitForPage();
    await personalInfo.giveConsent();
    await personalInfo.savePreferences();
    await personalInfo.submitPersonalInfo();
    await takeScreenshot(page, 'personal-info-submitted');

    await expect(page).not.toHaveURL(/personal-info/);
  });
});
