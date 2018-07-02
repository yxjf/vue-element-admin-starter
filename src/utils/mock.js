/**
 * Mock 定义
 *
 * https://github.com/ctimmerm/axios-mock-adapter
 */

export default function (mock) {

  // 随机字符串
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'

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
        {type: 'menu', name: 'example.component.codeEditor'},
        {type: 'api', name: '/user/login'},
        {type: 'api', name: '/user/logout'},
        {type: 'api', name: '/example/bigTable'},
      ]
    },
    message: '',
    status: 0,
  });

  mock.onPost('/example/bigTable').reply((config) => {
    let params = JSON.parse(config.data)
    let list = []
    const total = 500
    const start = (params.pageNum - 1) * (params.pageSize) + 1
    for (let i = start; i < start + params.pageSize; i++) {
      list.push({
        id: i + ~~(Math.random() * 12345),
        title: lorem.substr(0, Math.max(10, ~~(Math.random() * 50))),
        status: Math.random() * 2 > 1 ? 1 : 0,
        date: +new Date
      })
    }
    console.log(params);

    return [200, {
      data: {
        list,
        total,
      },
      message: '',
      status: 0,
    }]
  });

  mock.onAny().reply(200, {
    data: '',
    message: '',
    status: 0,
  })
}
