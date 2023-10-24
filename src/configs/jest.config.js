const { defaults } = require("jest-config");

/** @type {import('jest').Config} */
const config = {
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};

module.exports = config;
