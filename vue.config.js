module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      // 防止 Cyclic dependency 错误
      args[0].chunksSortMode = 'none';
      return args;
    });
  },
  devServer: {
    // mock
    // 在这里定义mock需要重启server，改为在 utils/mock 中定义
    // https://webpack.js.org/configuration/dev-server/
    before: function(app) {
      app.get('/api/version', function(req, res) {
        res.json({
          data: 'V1.0.0',
          message: '',
          status: 0,
        });
      });
    },

    // 反向代理配置
    // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
    proxy: {
      // '/api': {
      //   target: '<url>',
      //   ws: true,
      //   changeOrigin: true
      // },

      '/api': {
        target: 'http://10.10.22.23:20102/',
        changeOrigin: true,
        autoRewrite: true,
        pathRewrite: {
          '^/api/': '/',
        },
      },
    },
  },
};
