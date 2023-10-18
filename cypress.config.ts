import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  chromeWebSecurity: false,
  watchForFileChanges: true,
  defaultCommandTimeout: 6000,
  e2e: {
    specPattern: "cypress/integration/**/*.spec.ts",
    supportFile: "cypress/support/index.ts",
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("file:preprocessor", vitePreprocessor());
    },
  },
});
