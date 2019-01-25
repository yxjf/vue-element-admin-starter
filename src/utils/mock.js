/**
 * Mock 定义
 *
 * https://github.com/ctimmerm/axios-mock-adapter
 */

import Mock from 'mockjs';

export default function(mock) {
  mock.onPost('/user/login').reply(() => {
    return [
      200,
      Mock.mock({
        data: {
          token: /[a-zA-Z0-9]{32}/,
          userInfo: {
            id: '@id',
            userName: 'admin',
            displayName: '管理员',
          },
          role: ['系统管理员', '业务员'],
          resource: [
            { type: 'menu', name: 'welcome' },
            { type: 'menu', name: 'welcome.index' },
            { type: 'menu', name: 'example' },
            { type: 'menu', name: 'example.bigTable' },
            { type: 'menu', name: 'example.bigForm' },
            { type: 'menu', name: 'example.tabPage' },
            { type: 'menu', name: 'example.component' },
            { type: 'menu', name: 'example.component.codeEditor' },
            { type: 'api', name: '/user/login' },
            { type: 'api', name: '/user/logout' },
            { type: 'api', name: '/example/bigTable' },
            { type: 'action', name: 'example.bigTable.addUser' },
          ],
        },
        message: '',
        status: 0,
      }),
    ];
  });

  mock.onPost(/(\/example\/bigTable)|(\/sample_list)/).reply(config => {
    const { pageNum, pageSize } = { ...JSON.parse(config.data) };
    const total = 500;
    const count = Math.min(pageSize, total - pageNum * pageSize);

    return [
      200,
      Mock.mock({
        data: {
          [`list|${count}`]: [
            {
              id: '@integer(100, 500)',
              title: '@city(true) @ctitle(10, 20)',
              description: '@cparagraph',
              'status|1': true,
              date: '@datetime',
              amount: '@integer(1000, 1000000)',
            },
          ],
          total,
        },
        message: '',
        status: 0,
      }),
    ];
  });

  mock.onPost('/sample_detail').reply(() => {
    return [
      200,
      Mock.mock({
        data: {
          id: '@integer(100, 500)',
          title: '@city(true) @ctitle(10, 20)',
          description: '@csentence(3, 5)',
          'status|1': true,
          date: '@datetime',
          amount: '@integer(1000, 1000000)',
        },
        message: '',
        status: 0,
      }),
    ];
  });

  mock.onPost(/\/sample_(create|update|delete)/).reply(() => {
    return [
      200,
      Mock.mock({
        data: '',
        message: '',
        status: 0,
      }),
    ];
  });

  mock.onAny().reply(200, {
    data: '',
    message: '',
    status: 0,
  });
}
