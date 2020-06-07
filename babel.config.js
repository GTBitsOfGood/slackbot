/**
 * Configures Babel so that Mocha tests
 * can take advantage of ES6+ features
 */

module.exports = (api) => {
  // Cache configuration is a required option
  api.cache(false);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true
        },
        useBuiltIns: false
      }
    ]
  ];

  return { presets };
};
