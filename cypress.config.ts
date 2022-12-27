import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: 'src/main/test/cypress/support/index.js',
    specPattern: 'src/main/test/cypress/e2e/**/*.{js,jsx,ts,tsx}'
  }
})
