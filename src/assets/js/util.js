/**
 * Created by Dull on 2017/5/3 0003.
 */
export default{
  serverUrl: '',
  api: {},
  authcode:'',
  vue: {},
  setSession(key, value){
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getSession(key){
    return JSON.parse(sessionStorage.getItem(key))
  },
  removeSession(key){
    sessionStorage.removeItem(key)
  },
  //这是有设定过期时间的使用示例：
  //s20是代表20秒
  //h是指小时，如12小时则是：h12
  //d是天数，30天则：d30
  setCookieAndTime(key, value, time) {
    let strsec = this.getsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = key + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/";
  },
  //读取cookies
  getCookie(key) {
    let arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return decodeURI(arr[2]);
    else
      return null;
  },
  //删除cookies
  delCookie(key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(key);
    if (cval)
      document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
  },
  //对时间的解析处理
  getsec(str) {
    let str1 = str.substring(1, str.length) * 1;
    let str2 = str.substring(0, 1);
    if (str2 === "s")
      return str1 * 1000;
    else if (str2 === "h")
      return str1 * 60 * 60 * 1000;
    else if (str2 === "d")
      return str1 * 24 * 60 * 60 * 1000;
  }

}
