/**
 * 表单校验规则
 */

export default {
  // 用户名验证规则
  username(required = true) {
    return {
      required,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value || value.length < 4) {
          callback(new Error('用户名不能小于4位'))
        } else {
          callback()
        }
      }
    }
  },
  // 密码验证规则
  password(required = true) {
    return {
      required,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value || value.length < 4) {
          callback(new Error('密码不能小于4位'))
        } else {
          callback()
        }
      }
    }
  },
}
