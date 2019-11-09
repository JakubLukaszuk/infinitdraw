module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env", {
        "targets": {
          "browsers": ["> 1%, last 2 versions"]
        }
      }
    ],
    "@babel/preset-react"
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties"
  ];

  return {presets, plugins};
}