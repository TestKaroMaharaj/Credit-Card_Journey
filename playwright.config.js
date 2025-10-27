// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://d9-customer.credilio.in',
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    screenshot: 'off',   // keep auto screenshots if test fails
    video: 'off',      // save video if test fails
  },
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list'] // pretty console logs
  ],
  timeout: 60000
});
