const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
  },
  projects: [
    { name: 'Germany', use: { country: 'de' } },
    { name: 'France', use: { country: 'fr' } },
    { name: 'Italy', use: { country: 'it' } },
    { name: 'Spain', use: { country: 'es' } },
    { name: 'Sweden', use: { country: 'se' } },
    { name: 'Norway', use: { country: 'no' } },
    { name: 'Austria', use: { country: 'at' } },
    { name: 'Finland', use: { country: 'fi' } },
  ],
});