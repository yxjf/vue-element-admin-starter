/**
 * Mock 定义
 *
 * https://github.com/ctimmerm/axios-mock-adapter
 */

export default function (mock) {

  mock.onPost('/user/login').reply(200, {
    data: {
      token: '123',
      userInfo: {
        id: '1',
        userName: 'admin',
        displayName: '管理员',
      },
      role: ['系统管理员', '业务员'],
      resource: [
        {type: 'menu', name: 'welcome'},
        {type: 'menu', name: 'welcome.index'},
        {type: 'menu', name: 'example'},
        {type: 'menu', name: 'example.bigTable'},
        {type: 'menu', name: 'example.bigForm'},
        {type: 'menu', name: 'example.tabPage'},
        {type: 'menu', name: 'example.component'},
        // {type: 'menu', name: 'example.component.codeEditor'},
        {type: 'api', name: '/user/login'},
        {type: 'api', name: '/user/logout'},
      ]
    },
    message: '',
    status: 0,
  });

  mock.onAny().reply(200, {
    data: '',
    message: '',
    status: 0,
  })
}
