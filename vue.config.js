const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    proxy: {    // 配置跨域
      '/factor_detect': {    // 请求相对路径以/api开头的, 才会走这里的配置
        target: 'http://njhlwtj.iflysec.com',
            // 需要代理的地址
        secure: false,    // 如果是不是https接口，可以不配置这个参数
        changeOrigin: true,    // 允许跨域
      },
      '/fact_update': {    // 请求相对路径以/api开头的, 才会走这里的配置
        target: 'http://njhlwtj.iflysec.com',    // 需要代理的地址
        secure: false,    // 如果是不是https接口，可以不配置这个参数
        changeOrigin: true,    // 允许跨域
        // pathRewrite: {
        //   '^/factor_detect': '', // 路径重写，将前缀/apis转为"/"，也可以理解为"/apis"代替target里面的地址
        //   // 如果本身的接口地址就有"/api"这种通用前缀，也就是说https://www.exaple.com/api，就可以把pathRewrite删掉，如果没有则加上
        // },
      },
      '/sjcq/web':{
        target: 'http://localhost:12345',  // 如果是不是https接口，可以不配置这个参数
        secure: false, 
        changeOrigin: true,    // 允许跨域
      },
      '/metrics':{
        target: 'http://localhost:12345',
        secure: false, 
        changeOrigin: true,    // 允许跨域
      },
      '/metrics/single':{
        target: 'http://localhost:12345',
        secure: false, 
        changeOrigin: true,    // 允许跨域
      }
    },
  },
})
