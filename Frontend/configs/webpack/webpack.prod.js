const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');

process.env.BABEL_ENV = process.env.npm_lifecycle_event;

const PATHS = {
  src: path.join(__dirname, '../../src'),
  app: path.join(__dirname, '../../src/app'),
  build: path.join(__dirname, '../../resources'),
  styles: path.join(__dirname, '../../src/styles'),
};

module.exports = webpackMerge(commonConfig, {
  devtool: '#source-map',

  entry: {
    polyfills: `${PATHS.src}/polyfills.jsx`,
    vendors: `${PATHS.src}/vendors.jsx`,
    app: [`${PATHS.app}/main.jsx`],
  },
  output: {
    path: PATHS.build,
    filename: 'assets/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
    publicPath: '/',
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1&minimize!postcss-loader!resolve-url-loader!sass-loader?sourceMap',
        }),
        include: [PATHS.styles],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('assets/[name].[hash].css'),
    new CleanWebpackPlugin(['./resources'], {
      root: path.join(__dirname, '../../../'),
      exclude: ['WEB-INF', 'META-INF', 'modules', 'log4j2.xml', 'arquillian.xml', 'project-local.yml', 'project-stages.yml', 'project-integration.yml', 'project-test.yml', 'project-prod.yml'],
      verbose: false,
      dry: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: true }),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendors', 'polyfills'] }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      'process.env.BASE_URL': JSON.stringify('http://localhost:8090/'),
    }),
  ],
});
