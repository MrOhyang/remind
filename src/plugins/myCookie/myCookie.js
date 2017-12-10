let myCookie = {};

// 获取 Cookie 前缀
function getPrefix() {
  let host = window.location.host;

  return '';
  // if (/^localhost:8080/.test(host)) {
  //   return 'ril_';
  // } else if (/(richim\.4399houtai\.com)|(chat\.richim\.4399houtai\.com)|(chat\.richim\.4377\.com)/.test(host)) {
  //   return 'rlt_';
  // } else {
  //   return 'rld_';
  // }
}

// 获取 Cookie Domain
function getDomain() {
  return '';
  // if (/localhost/.test(window.location.host)) return '';
  // return window.location.host.match(/\.\w+\.\w+$/g)[0];
  // if (/(4399houtai\.com)/.test(window.location.host)) {
  //   return '\.4399houtai\.com';
  // }
  // return '';
}

myCookie.install = function(Vue, options) {

  // 添加实例方法

  /**
   * @desc 获取 cookie
   * @param {string} key - 键名
   */
  Vue.$getCookie = Vue.prototype.$getCookie = function(key) {
    let prefix = getPrefix(),
      c_name = `${prefix}${key}`;

    if (document.cookie.length > 0) {
      let c_start,
        c_end;

      c_start = document.cookie.indexOf(`${c_name}=`);
      if (c_start != -1) {
        c_start = c_start + `${prefix}${key}`.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return '';
  };

  /**
   * @desc 设置 cookie
   * @param {string} key   - 键名
   * @param {string} name  - 值
   * @param {string} days  - 保存天数
   * @param {string} hours - +小时
   */
  Vue.$setCookie = Vue.prototype.$setCookie = function(key, value, days = 0, hours = 0, not_prefix = false) {
    let prefix = not_prefix ? '' : getPrefix(),
      c_name = `${prefix}${key}`,
      extend = '',
      domain = getDomain();

    if (days || hours) {
      let exdate = new Date();

      exdate.setDate(exdate.getDate() + days);
      exdate = new Date(exdate.getTime() + hours * 3600000);
      extend = 'expires=' + exdate.toGMTString();
    }
    if (domain != '') {
      extend += `;domain=${domain}`;
    }
    document.cookie = `${c_name}=${escape(value)};${extend}`;
  };
}

module.exports = myCookie;