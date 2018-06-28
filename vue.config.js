module.exports = {
  devServer: {
    // mock
    // https://webpack.js.org/configuration/dev-server/
    before: function (app) {
      app.get('/api/version', function (req, res) {
        res.json({
          data: 'V1.0.0',
          message: '',
          status: 0,
        });
      });
      app.post('/api/user/login', function (req, res) {
        res.json({
          data: {
            token: '123',
            user: {
              id: '1'
            }
          },
          message: '',
          status: 0,
        });
      });
    },

    // 反向代理配置
    // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
    }
  }
}
