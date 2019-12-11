const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }, {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment
            ? 'style-loader'
            : MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }, {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader', {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader?name=images/[name].[ext]'
      }
    ]
  },
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass']
  },
  plugins: [
    require('autoprefixer'),
    new HtmlWebPackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? '[name].css'
        : '[name].[hash].css',
      chunkFilename: isDevelopment
        ? '[id].css'
        : '[id].[hash].css'
    }),
    new Dotenv()
  ]
};