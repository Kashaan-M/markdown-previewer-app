const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {targets: "defaults"}]
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        type: "asset/resource"

      },
      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource"
      }
    ]
  },
  resolve: { extensions: ["*", ".js",".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.[contenthash].js",
    assetModuleFilename: "assets/[name].[hash][ext]"
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "[name].[contenthash].css"})
  ,new CleanWebpackPlugin()
],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  }
};
