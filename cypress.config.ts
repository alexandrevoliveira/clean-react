import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: 'src/main/test/cypress/fixtures',
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: 'src/main/test/cypress/support/index.js',
    specPattern: 'src/main/test/cypress/e2e/**/*.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false
  }
})
