const path = require("path");

module.exports = {
  webpack(config) {
    const aliasedDirectories = ["requests", "server", "utils"];
    aliasedDirectories.forEach(dir => {
      config.resolve.alias[dir] = path.join(__dirname, dir);
    });
    return config;
  }
};
