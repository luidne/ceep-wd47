const presets = [
    [
      "@babel/env",
      {
        targets: {
          chrome: "55",
          ie: "11"
        },
        useBuiltIns: "usage",
      },
    ],
  ];
  
  module.exports = { presets };