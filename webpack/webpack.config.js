const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.js')
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src/')
    },
    extensions: ['.js', '.jsx', '.ts', '.vue', '.json']
  },
  module: {
    noParse: content => /jquery|lodash/.test(content),
    rules: [
      {
        test: /\.js|jsx$/,
        use: ['babel-loader?cacheDirectory'], //?cacheDirectory 用于缓存babel的编译结果，加快重新编译的速度
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] //需要安装less
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] //需要安装node-sass，不需要安装sass
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 4000,
          name: '[name].[hash].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack template',
      filename: 'index.html',
      template: path.join(__dirname, '../template.html'),
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true, //移除注释
        removeAttributeQuotes: true //移除双引号
      }
    })
  ],
  //告诉webpack在javascript运行环境中已经内置了哪些全局变量，不用将这些代码打包到代码里面去
  externals: {
    jquery: 'jQuery'
  }
}
