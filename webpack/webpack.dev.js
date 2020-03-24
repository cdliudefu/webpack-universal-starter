/**
 *开发环境
 **/
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const merge = require('webpack-merge')
const config = require('./webpack.config')

const prodConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:4000'
      // delay: 5 // 延迟多久打开
      // browser:'' //指定打开的浏览器
    }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css'
    }),
    //更容易查看patch的
    new webpack.NamedModulesPlugin(),
    //热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    hot: true,
    overlay: true,
    // open: true,
    publicPath: '/',
    host: 'localhost',
    port: 4000
  }
}

module.exports = merge(config, prodConfig)
