const { defaults } = require("jest-config");

/** @type {import('jest').Config} */
const config = {
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  preset: "jest-playwright-preset"
};

module.exports = config;