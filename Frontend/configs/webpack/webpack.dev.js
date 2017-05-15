const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const commonConfig = require('./webpack.common.js');

process.env.BABEL_ENV = process.env.npm_lifecycle_event;

const NODE_ENV = process.env.ENV === 'local' ? 'local' : 'development';

const PATHS = {
  src: path.join(__dirname, '../../src'),
  app: path.join(__dirname, '../../src/app'),
  build: path.join(__dirname, '../../dist'),
  styles: path.join(__dirname, '../../src/styles'),
  publicPath: '/',
};

module.exports = webpackMerge(commonConfig, {
  devtool: '#eval',

  entry: {
    polyfills: `${PATHS.src}/polyfills.jsx`,
    vendors: `${PATHS.src}/vendors.jsx`,
    app: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', `${PATHS.app}/main.jsx`],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: PATHS.publicPath,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?cacheDirectory',
        include: [PATHS.app, PATHS.src],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?&importLoaders=1', 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        include: [PATHS.styles],
      },
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendors', 'polyfills'] }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
      'process.env.BASE_URL': JSON.stringify('http://localhost:3000/'),
    }),
  ],
  devServer: {
    port: 3000,
    inline: true,
    publicPath: PATHS.publicPath,
    historyApiFallback: { index: '/' },
    hot: true,
    stats: 'minimal',
    quiet: true,
    proxy: {
      '/rest/*': { target: 'http://localhost:8080' },
    },
  },
});
