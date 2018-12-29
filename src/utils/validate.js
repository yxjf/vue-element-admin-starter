/**
 * 表单校验规则
 */

export default {
  // 通用校验规则
  required(message = '此字段必须填写', required = true) {
    return {
      required,
      trigger: 'blur',
      message,
    };
  },
  requiredForSelect(message = '此字段必须选择', required = true) {
    return {
      required,
      trigger: 'change',
      message,
    };
  },

  // 个性化校验规则

  // 用户名验证规则
  username(required = true) {
    return {
      required,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value || value.length < 4) {
          callback(new Error('用户名不能小于4位'));
        } else {
          callback();
        }
      },
    };
  },
  // 密码验证规则
  password(required = true) {
    return {
      required,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value || value.length < 4) {
          callback(new Error('密码不能小于4位'));
        } else {
          callback();
        }
      },
    };
  },
};
