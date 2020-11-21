const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".ts", ".tsx"],
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new WorkerPlugin(),
  ],
};
