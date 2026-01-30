const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

// Import do mochawesome reporter
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      // mantém o cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // mantém o esbuild
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // adiciona o mochawesome reporter
      mochawesome(on);

      return config;
    },
    baseUrl: "https://www.saucedemo.com",
  },

  // configuração do reporter
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: true,
    json: true,
  },
});
