module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  // plugins: ["@babel/plugin-syntax-import-meta"],
  plugins: ["babel-plugin-transform-import-meta"], // ✅ transforme import.meta.url
};
