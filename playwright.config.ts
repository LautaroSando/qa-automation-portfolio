import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env';

export default defineConfig({
  testDir: './tests',
  // Tests are fully independent (each one starts from a fresh browser context).
  fullyParallel: true,
  forbidOnly: env.isCI,
  retries: env.isCI ? env.ciRetries : 0,
  workers: env.isCI ? env.ciWorkers : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: env.baseUrl,
    // SauceDemo uses data-test attributes instead of data-testid.
    testIdAttribute: 'data-test',
    trace: env.isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  // Cross-browser runs only need extra entries here, e.g.
  // { name: 'firefox', use: { ...devices['Desktop Firefox'] } } and the matching browser install.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
