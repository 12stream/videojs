/**
 * Created by Administrator on 2018/7/26.
 */
export const CODE_OK = 200;
//请求后台成功
export const success_code='200';
//登陆超时
export const login_out_code='-1';
export const PAGE_SIZE = 10;

// 正式环境
export const FORMALURL = 'https://zzsyh5.shineup.com.cn/mwh5/';
// 测试环境
export const ACTIONURL = 'https://zzsyapitest.mvaas.cn/20/api/';
export const SERVICE_URL = 'https://zzsyapitest.mvaas.cn/20/service/'
//判断直播是否付费用
export const PARAMURL = "https://zzsyh5test.mvaas.cn/mwh5/"
// 测试地址(聊天室)
export const CHAT_URL = 'https://zzsylbtest.mvaas.cn/'

// 连接聊天室
export const connetChat = 'https://zzsytrtest.mvaas.cn/'

//cookie方法
export function setCookie(name, value,days) {
  var d = new Date()
  d.setTime(d.getTime() + 24*60*60*1000*days)
  // d.setTime(d.getTime() + hour*60*60*1000)
  window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}
export function getCookie(name) {
  var v= window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
export function removeCookie(name) {
  setCookie(name, '', -1);
}

export function formatDate(date){
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hours = date.getHours();//时
  let minutes = date.getMinutes();//分
  let seconds = date.getSeconds();//秒
  if(hours<10){
    hours = "0"+hours;
  }
  if(minutes<10){
    minutes = "0"+minutes;
  }
  if(seconds<10){
    seconds = "0"+seconds;
  }
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +" "+ hours + seperator2+ minutes+ seperator2 +seconds;
  return currentdate
}
export  function funDate (date){//获取前后几天的日期
  let date1 = new Date();
  let time1 = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
  let date2 = new Date(date1);
  date2.setDate(date1.getDate()+date);
  let time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
  return time2;
}
export function timestampToTime(timestamp,type) {//时间戳转成时间
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = (date.getDate() <10 ? '0'+ date.getDate() : date.getDate() ) + ' ';
  let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours()) + ':';
  let s = (date.getSeconds()<10 ? '0'+ date.getSeconds():date.getSeconds());
  let m ;
  if(type==1){
    m = (date.getMinutes() <10 ? '0'+date.getMinutes():date.getMinutes())+':';
    return Y+M+D+h+m+s;
  }else {
    m = (date.getMinutes() <10 ? '0'+date.getMinutes():date.getMinutes());
    return Y+M+D+h+m;
  }
}
export function formatSeconds(mss) {
  var days = parseInt(mss / (60 * 60 * 24));
  var hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60));
  var minutes = parseInt((mss % (60 * 60)) / ( 60));
  var seconds = (mss % (60)).toFixed(2);
  return  hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
}
export function getLStorage(name) {
  return localStorage.getItem(name)
}
export function setLStorage(name, value) {
  return localStorage.setItem(name, value)
}
export function delLStorage(name) {
  return localStorage.removeItem(name)
}
function getCreateTime(){
  var date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var currentTime = "现在是:" + year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second ;
  return currentTime;
}
/**
 * 获取token
 */
export function getAuthorizationFromCookie(){
  var arr,reg=new RegExp("(^| )user_id=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
/**
 * 设置token 到cookie
 * @param value
 */
export function setAuthorizationToCookie(value){
  /* var exp = new Date();
   var cookieTime=5*24*60*60*1000;//5天
   //console.log(cookieTime);
   exp.setTime(exp.getTime()+cookieTime);
   document.cookie="Authorization="+obj+";expires="+exp.toGMTString();*/
  var Days = 5;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = "user_id="+ escape (value) + ";expires=" + exp.toGMTString();
}
/**
 * 清除tokenvalue
 */
export function clearAuthorizationFromCookie(){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getAuthorizationFromCookie();
  if(cval!=null)
    document.cookie= "user_id" + "="+cval+";expires="+exp.toGMTString();
}
/**
 * 复制
 */
export function copyLink(id) {
  var url = document.getElementById(id)
  console.log(copyLink, url)
  url.select()
  document.execCommand("copy")
}

/**
 * 截取url中的参数
 */
export function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}
