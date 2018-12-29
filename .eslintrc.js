/**
 * eslint 配置
 *
 * https://eslint.org/
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 在这里添加自定义规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
}
