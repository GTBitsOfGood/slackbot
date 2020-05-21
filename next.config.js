const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
  webpack(config) {
    const aliasedDirectories = ["pages", "requests", "server"];
    aliasedDirectories.forEach(dir => {
      config.resolve.alias[dir] = path.join(__dirname, dir);
    });
    return config;
  }
};
