import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    specPattern: 'src/main/test/cypress/e2e/**/*.{js,jsx,ts,tsx}'
  }
})