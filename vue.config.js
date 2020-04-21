module.exports = {
  // 回调函数当中就是当前打包是采用的webpack配置,我们可以在函数中对配置进行修改
  configureWebpack: (config) => {
    // config.mode = 'development'
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  publicPath: './',
  lintOnSave: false
}
