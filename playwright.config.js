// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'https://d9-customer.credilio.in',   // ✅ main domain
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']  // ✅ start every test maximized
    }
  },
  reporter: [['html', { outputFolder: 'reports', open: 'never' }]],
  timeout: 60000  // global timeout (optional, safer for slow pages)
});
