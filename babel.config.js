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
