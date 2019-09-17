const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const root = path.resolve(path.dirname(__dirname));

module.exports = {
  mode: 'development',
  entry: path.resolve(root, 'src', 'main.js'),
  output: {
    path: path.resolve(root, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.js',
      '@': path.resolve(root, 'src', 'components'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(root, 'src', 'index.html'),
      inject: true,
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(root, 'dist'),
  },
};
