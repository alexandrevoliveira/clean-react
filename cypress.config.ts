import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: 'tests/e2e/cypress/fixtures',
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: 'tests/e2e/cypress/support/index.js',
    specPattern: 'tests/e2e/cypress/e2e/**/*.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false
  }
})
