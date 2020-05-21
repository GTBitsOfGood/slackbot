const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
  webpack(config) {
    const aliasedDirectories = ["requests", "server", "utils"];
    aliasedDirectories.forEach(dir => {
      config.resolve.alias[dir] = path.join(__dirname, dir);
    });
    return config;
  }
};
