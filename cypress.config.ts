import { defineConfig } from "cypress";

export default defineConfig({
  env:{
    productApiUrl: 'https://dummyjson.com',
    productListingLimit: 20,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
});
