const HTMLPlugin = require("html-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const path = require("path");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    main: [path.join(__dirname, "src", "index.tsx")],
  },
  output: {
    path: outputPath,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
  },
  optimization: {
    chunkIds: "natural",
    splitChunks: {
      chunks: "initial",
      filename: "[id].[contenthash].chunk.js",
      cacheGroups: {
        vendors: {
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
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
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".wasm", ".mjs", ".js", ".json", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: outputPath,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new WorkerPlugin(),
  ],
};
