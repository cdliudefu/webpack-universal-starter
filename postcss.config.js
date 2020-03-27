// require('autoprefixer')// 自动补全 实现兼容
// require('cssgrace') //美化css https://github.com/cssdream/cssgrace/blob/master/README-zh.md
module.exports = {
  plugins: [require('autoprefixer')(), require('cssgrace')]
}
