const Authenticate = (function(auth) {
  let casServer = '';
  if (process.env.NODE_ENV !== 'production' || location.host.indexOf('172.') > -1) {
    casServer = 'http://172.16.1.61:8080';
  } else {
    casServer = 'https://sso.youxin.com';
  }

  // SSO登录
  auth.ssoGoToLogin = function() {
    console.log('gotoLogin');
    const url = new URL(location.href);
    location.href = `${casServer}/login?service=${url.origin}`;
  };

  // 主动登出SSO
  auth.ssoGoToLogout = function() {
    console.log('gotoLogout');
    const url = new URL(location.href);
    location.href = `${casServer}/logout?service=${url.origin}`;
  };

  return auth;
})(Authenticate || {});

export default Authenticate;
