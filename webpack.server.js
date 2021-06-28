const { resolve } = require("path");
const { merge } = require("webpack-merge");
const commonConfigMaker = require("./webpack.common.maker");
const baseDirectoryPath = __dirname;
const distDirectoryPath = resolve(baseDirectoryPath, "dist");
const serverDistDirectoryPath = resolve(distDirectoryPath, "server");
const nodeExternals = require("webpack-node-externals");

const config = {
  name: "server",
  externals: [
    nodeExternals({
      allowlist: [/^@babel\/runtime/, /^regenerator-runtime/],
    }),
  ],
  target: "node",
  output: {
    path: serverDistDirectoryPath,
  },
};

const merged = merge(
  commonConfigMaker({
    babelPresetEnvConfig: {
      targets: {
        node: "12",
      },
    },
  }),
  config
);

module.exports = merged;
