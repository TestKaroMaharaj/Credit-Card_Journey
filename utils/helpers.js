// utils/helpers.js
async function maximizeScreen(page) {
  const screenSize = await page.evaluate(() => {
    return { width: window.screen.width, height: window.screen.height };
  });
  await page.setViewportSize(screenSize);
}

async function typeHuman(page, locator, value, delay = 120) {
  await page.fill(locator, '');
  await page.type(locator, value.toString(), { delay });
  await page.waitForTimeout(300);
}

async function takeScreenshot(page, name) {
  await page.screenshot({ path: `./screenshots/${Date.now()}-${name}.png`, fullPage: true });
  console.log(`📸 Screenshot captured: ${name}`);
}

// ✅ Central wait helper
async function waitBetweenScreens(page, ms = 2000) {
  console.log(`⏳ Waiting ${ms}ms before moving to next screen...`);
  await page.waitForTimeout(ms);
}

module.exports = { maximizeScreen, typeHuman, takeScreenshot, waitBetweenScreens };
