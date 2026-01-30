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
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          platform: "node",   // 👈 força esbuild a usar built-ins do Node
          format: "cjs",      // 👈 garante suporte a require()
          target: ["node16"], // 👈 compatível com Node no container
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

      mochawesome(on);
      return config;
    },
    baseUrl: "https://www.saucedemo.com",
  },

  video: true,
  screenshotOnRunFailure: true,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: true,
    json: true,
  },
});
