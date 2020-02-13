const CopyWebpackPlugin = require('copy-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack');
const path = require('path');

const browserConfig = {
  entry: './index.js',
  devServer: {historyApiFallback: true},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new CopyWebpackPlugin(['index.html', 'icon.png', '_redirects']),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({__BUILD_TIME__: Date.now()})
  ],
  resolve: {alias: {vue: 'vue/dist/vue.min.js'}},
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {test: /\.vue$/, use: 'vue-loader'},
      {test: /\.css$/, use: ['vue-style-loader', 'css-loader']}, {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {name: '[name].[ext]', outputPath: 'fonts/'}
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
          },
        }]
      }
    ]
  },
};

// From https://github.com/webpack/webpack/issues/7647#issuecomment-423788776
const workerConfig = {
  entry: './src/landlord.worker.js',
  target: 'webworker',
  output:
      {path: path.resolve(__dirname, 'dist'), filename: 'landlord.worker.js'}
};

module.exports = [browserConfig, workerConfig];
