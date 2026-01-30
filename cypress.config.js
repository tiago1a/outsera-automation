const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      // mantém cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // bundler com polyfill de crypto
      on(
        "file:preprocessor",
        createBundler({
          platform: "node",
          plugins: [
            createEsbuildPlugin(config),
            {
              name: "crypto-polyfill",
              setup(build) {
                build.onResolve({ filter: /^crypto$/ }, () => ({
                  path: require.resolve("crypto-browserify"),
                }));
              },
            },
          ],
        })
      );

      // reporter mochawesome
      mochawesome(on);

      return config;
    },
    baseUrl: "https://www.saucedemo.com",
  },

  // grava vídeos e screenshots
  video: true,
  screenshotOnRunFailure: true,

  // reporter config
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: true,
    json: true,
  },
});
