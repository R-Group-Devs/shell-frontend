const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
  },

  entry: ['./index.tsx'],
  context: resolve(__dirname, './src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          happyPackMode: true,
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
  performance: {
    hints: false,
  },
};
