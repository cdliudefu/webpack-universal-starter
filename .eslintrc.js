module.exports = {
  root: true, //eslint会认为当前目录为根目录，不再向上查找配置
  parser: 'babel-eslint', // 解析器类型 espima(默认)、babel-eslint、@typescript-eslint/parse
  parserOptions: {
    // 解析器配置参数
    ecmaVersion: 2018, // es版本号，默认是5，可以用年份比如2015同6
    sourceType: 'module', //代码类型 script(默认)、module
    ecmaFeatures: {
      //es特性配置
      // globalReturn:true, //允许在全局作用域下使用return语句
      // impliedStrict:true, //启用全局strict mode
      jsx: true //启用jsx
    }
    //如果启用了@typescript-eslint/parse解析器配置有些不同：
    // useJSXTextNode:true,
    // project:'./tsconfig.json',
    // tsconfigRootDir:'../../',
    // extraFileExtensions:['.vue']
  },
  env: {
    //在 globals 中一个个的进行声明未免有点繁琐，这个时候就需要使用到 env ，这是对一个环境定义的一组全局变量的预设
    browser: true,
    es6: true,
    node: true
    // jquery:true
  },
  globals: {
    //ESLint 会检测未声明的变量，并发出警告，但是有些变量是我们引入的库声明的，这里就需要提前在配置中声明
    //声明 jQuery 对象为全局变量
    // "$": false // true表示该变量为 writeable，而 false 表示 readonly
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  extends: [
    'eslint:recommended', //eslint: 开头的是 ESLint 官方的扩展，一共有两个：eslint:recommended 、eslint:all。
    'plugin:prettier/recommended', //plugin: 开头的是扩展是插件类型，也可以直接在 plugins 属性中进行设置
    'alloy', //https://github.com/AlloyTeam/eslint-config-alloy/blob/master/README.zh-CN.md
    'alloy/react',
    'alloy/typescript',
    'alloy/vue',
    'eslint-config-standard' //最后一种扩展来自 npm 包，官方规定 npm 包的扩展必须以 eslint-config- 开头，使用时可以省略这个头，上面案例中 eslint-config-standard 可以直接简写成 standard
  ],
  //ESLint 的插件与扩展一样有固定的命名格式，以 eslint-plugin- 开头，使用的时候也可以省略这个头
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
