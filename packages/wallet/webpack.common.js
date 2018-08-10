import path, { resolve } from 'path';
import webpack from 'webpack';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// const merge = require('webpack-merge');
// const common = require('./webpack.common.js');

const hotReloadModules = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
];

export default {
  target: 'web',
  devtool: 'eval-source-map',
  entry: {
    common: [
      'babel-polyfill',
      ...hotReloadModules,
      path.join(__dirname, 'src/index.js'),
    ],
  },
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  plugins: [
    new ProgressBarPlugin(),
    new CopyWebpackPlugin([{
      from: './public',
      to: 'public',
    }]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   enforce: "pre",
      //   options: {
      //     outputReport: {
      //       filePath: 'checkstyle.xml',
      //       formatter: require('eslint/lib/formatters/checkstyle')
      //     },
      //     cache: true
      //   }
      // },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.(ttf|eot|svg|ico)(\?[a-z0-9#=&.]+)?$/, loader: 'file' },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass',
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
    ],
  },
};
