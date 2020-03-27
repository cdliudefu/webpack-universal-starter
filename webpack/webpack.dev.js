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
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.join(__dirname, 'src'),
        options: {
          fix: true
        }
      },
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
    //指定了服务器资源的根目录，如果不配置contentBase的话，那么contentBase默认是当前执行的目录,一般是项目的根目录
    contentBase: path.join(__dirname, '../dist'),
    compress: true, //对所有服务器资源采用gzip进行压缩 默认为false
    hot: true, //模块替换换功能 在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的
    overlay: true, //编译出错的时候，在浏览器页面上显示错误,默认为false
    /*有两种模式可以实现自动刷新和模块热替换机制。
    *iframe:页面是被嵌入到一个iframe页面，并且在模块变化的时候重载页面。inline: false
      http://localhost:4000/webpack-dev-server/
      iframe 模式的特点有：
      1. 在网页中嵌入了一个iframe，将我们自己的应用代码注入到 这个 iframe中去了。
      2. 在页面头部会有一个 App ready. 这个提示，用于显示构建过程的状态信息。
      3. 加载了 live.bundle.js文件，还同时包含了 socket.io的client代码，进行了 websocket通讯，从而完成了自动编译打包，页面自动刷新功能。
    * inline模式:在构建变化后的代码会通过代理客户端来控制网页刷新。 inline: true
      inline模式的特点有：
      1. 构建的消息在控制台中直接显示出来。
      2. socket.io的client代码被打包进bundle.js当中，这样就能和websocket通讯，从而完成自动编译工作，页面就能实现自动刷新功能。
      3. 以后的每一个入口文件都会插入上面的socket的一段代码，这样会使的打包后的bundle.js文件变得臃肿。
    */
    // inline: false,
    // open: true,  //自动使用我们的系统默认浏览器去打开网页
    publicPath: '/',
    host: '0.0.0.0', //服务器监听地址
    port: 4000, //端口号
    // 配置项可以在HTTP响应中注入一些HTTP响应头
    headers: {
      'x-foo': 1234
    },
    //来应对返回404页面时定向跳转到特定页面的。一般是应用在 HTML5中History API 的单页应用，
    //比如在访问路由时候，访问不到该路由的时候，会跳转到index.html页面。
    historyApiFallback: true,
    // historyApiFallback: {
    //   // 使用正则来匹配路由跳转到指定的页面
    //   rewrites: [
    //     { from: /^\/user/, to: '/user.html' },
    //     { from: /^\/home/, to: '/home.html' }
    //   ]
    // }
    /**
     * 在编译的时候再命令行中输出的内容:
     * errors-only:只打印错误
     * 属性值还有 'minimal', 'normal', 'verbose' 等
     */
    // stats: 'errors-only',
    /**
     * 该配置来解决跨域的问题，那是因为 dev-server 使用了 http-proxy-middleware 包
     *1. 首先是百度的接口地址是这样的：http://news.baidu.com/widget?ajax=json&id=ad;
     *2. proxy 的配置项 '/api' 和 target: 'http://news.baidu.com' 的含义是，匹配请求中 /api 含有这样的域名 重定向 到 'http://news.baidu.com'来。因此我在接口地址上 添加了前缀 '/api', 如： axios.get('/api/widget?ajax=json&id=ad'); 因此会自动补充前缀，也就是说，url: '/api/widget?ajax=json&id=ad' 等价
     *于 url: 'http://news.baidu.com/api/widget?ajax=json&id=ad'.
     *3. changeOrigin: true/false 还参数值是一个布尔值，含义是 是否需要跨域。
     *4. secure: true, 如果是https请求就需要改参数配置，需要ssl证书吧。
     *5. pathRewrite: {'^/api' : ''}的含义是重写url地址，把url的地址里面含有 '/api' 这样的 替换成 '',
     *因此接口地址就变成了 http://news.baidu.com/widget?ajax=json&id=ad； 因此就可以请求得到了，最后就返回
     *接口数据了。
      */
    proxy: {
      '/': {
        target: 'http://news.baidu.com', // 目标接口的域名
        // secure: true,  // https 的时候 使用该参数 需要ssl证书吧
        changeOrigin: true, // 是否跨域
        //
        pathRewrite: {
          '^/api': '' // 重写路径
        }
      }
    }
  }
}

module.exports = merge(config, prodConfig)
