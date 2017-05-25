const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../../src'),
  app: path.join(__dirname, '../../src/app'),
  assets: path.join(__dirname, '../../assets'),
  publicPath: '/',
};

module.exports = {
  resolve: {
    unsafeCache: true,
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?cacheDirectory',
        include: [PATHS.app, PATHS.src],
      },
      {
        test: /\.min.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: `${PATHS.assets}/css`,
      },
      {
        test: /\.(png|jpe?g|gif|PNG|JPE?G|GIF)$/,
        loader: 'url-loader?limit=100000&name=assets/images/[name].[ext]',
        include: [PATHS.assets],
      },
      {
        test: /\.woff2?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]',
        include: [PATHS.assets],
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'url-loader?limit=100000&name=assets/fonts/[name].[ext]',
        include: [PATHS.assets],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: [PATHS.app, PATHS.src, PATHS.assets],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'd3': 'd3'
    }),
    new HtmlWebpackPlugin({
      title: 'RaceAnalyse',
      template: './src/index.html',
      chunksSortMode: 'dependency',
    }),
  ],
};
