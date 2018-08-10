const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  mode: 'production',
  target: 'web',
  devtool: 'eval-source-map',
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx'],
    alias: {
      Public: path.resolve(__dirname, 'public'),
      Scenes: path.resolve(__dirname, 'src/client/scenes'),
      Components: path.resolve(__dirname, 'src/client/components'),
      Containers: path.resolve(__dirname, 'src/client/containers'),
    },
  },
  entry: {
    common: [
      path.join(__dirname, 'src/client/index.jsx'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
      { test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass',
      },
    ],
  },
};

module.exports = webpackConfig;
