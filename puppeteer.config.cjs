const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, "/opt/render/project/.cache", "puppeteer"),
};
