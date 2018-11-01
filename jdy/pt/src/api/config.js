export const ERR_OK = 200;
export const ERR_SERVEROK = '01';
export const PAGE_SIZE = 8;

//V播放php接口正式环境
// export const DATA_API_URL='http://vboppi.yeepo.cn/api/'
// export const WX_API_URL="http://vbofore.yeepo.cn/api/"
// export const facebac_URL = 'http://vbofore.yeepo.cn/'
//V播放php接口测试环境
export const DATA_API_URL='http://vboppitest.facebac.com/api/'
export const WX_API_URL="http://vboforetest.facebac.com/api/"
export const facebac_URL = 'http://vboforetest.facebac.com/'
//V播放php接口开发环境
// export const DATA_API_URL='http://vboppidev.mvaas.cn/api/'
// export const WX_API_URL="http://vboforedev.mvaas.cn/api/"
// export const facebac_URL = 'http://vboforedev.mvaas.cn/'

//java2.0接口开发环境
// export const MW_Live_API_URL="http://mwlivedev.mvaas.cn"
// export const DATA_URL = 'http://mwlivedev.mvaas.cn/21/api/'
// export const GIFT_URL = 'http://mwlivedev.mvaas.cn/21/'
//测试环境
export const MW_Live_API_URL="http://mwlivetest.facebac.com"
// export const DATA_URL = 'http://mwlivetest.facebac.com/21/api/'
export const DATA_URL = 'http://192.169.2.63:5012/21/api/'
export const GIFT_URL = 'http://mwlivetest.facebac.com/21/'
//java2.0接口正式环境
// export const MW_Live_API_URL="http://mwlive.mvaas.cn"
// export const DATA_URL = 'http://mwlive.mvaas.cn/20/api/'
// export const GIFT_URL = 'http://mwlive.mvaas.cn/20/'


//20180703更换域名直播点播h5测试地址
export const LIVEH5_URL='http://vboforetest.facebac.com/H520/vLive.html';
export const VideoH5_URL='http://vboforetest.facebac.com/H520/video.html';
//直播点播h5正式地址
// export const LIVEH5_URL='http://vbofore.yeepo.cn/H520/vLive.html';
// export const VideoH5_URL='http://vbofore.yeepo.cn/H520/video.html';
//直播点播开发地址
// export const LIVEH5_URL='http://vboforedev.mvaas.cn/H520/vLive.html';
// export const VideoH5_URL='http://vboforedev.mvaas.cn/H520/video.html';

//视频云正式环境
// export const facebacURL = 'http://open.facebac.com'
// export const userName="mwlive@facebac.com";
// export const userPwd="mwBck2017live";
//视频云测试环境
export const facebacURL = 'http://open.facebac.com'
export const userName="hufang@facebac.com";
export const userPwd="hf527667092";
//视频云开发环境
// export const facebacURL = 'http://opentest.facebac.com'
// export const userName="zhangchucheng@montnets.com";
// export const userPwd="123456";

//开发地址
// export const LIVE_URL='http://10.10.203.96:9882/';
// 测试地址   废除
// export const LIVE_URL = 'http://120.25.63.233:9882/'
// 新修改测试地址
// export const LIVE_URL = 'http://120.132.120.139:9882/'  // 服务器地址用不了的时候用ip地址
//新修改测试服务器地址
export const LIVE_URL = 'http://mwlivetest.facebac.com:9882/'
// 正式地址
//export const LIVE_URL = 'http://mwlb.facebac.com:9161/'


//云播1.7测试环境接口2.0废除
// export const DATA_URL = 'http://mwlivetest.facebac.com/17/api/'
// export const GIFT_URL = 'http://mwlivetest.facebac.com/17/'
// export const facebacURL = 'http://mwlivetest.facebac.com/'

//云播测试环境接口
export const PROJET_URL = 'http://montnetstest.facebac.com/portal/'
export const PLAY_URL = 'http://montnetstest.facebac.com/H5/videoplayer/bac_liveKing/17/mwLive.html?liveid='
export const vPLAY_URL = 'http://montnetstest.facebac.com/H520/video.html?videoid='
export const SETUSERICON = 1178309224502371684
export const MSGURL = 'http://pt.facebac.com/l/17/'
export const LOGINURI = {
    weiboUrl: "http%3a%2f%2fmwlivetest.facebac.com%2fapi%2fmwlive%2fuser%2fuser_wb_third_login.do",
    QQUrl: "http%3a%2f%2fmwlivetest.facebac.com%2fapi%2fmwlive%2fuser%2fuser_qq_third_login.do",
    weixinUrl: "http%3a%2f%2fmwlivetest.facebac.com%2fapi%2fmwlive%2fuser%2fuser_wx_third_login.do",
    // weiboUrl: "http://mwlivetest.facebac.com/api/mwlive/user/user_wb_third_login.do",
    // QQUrl: "http://mwlivetest.facebac.com/api/mwlive/user/user_qq_third_login.do",
    // weixinUrl: "http://mwlivetest.facebac.com/api/mwlive/user/user_wx_third_login.do",
}


// 云播1.7正式地址2.0废除
// export const LIVE_URL = 'http://mwlb.facebac.com:9161/'
// export const DATA_URL = 'http://mwlive.facebac.com/17/api/'
// export const GIFT_URL = 'http://mwlive.facebac.com/17/'
// export const facebacURL = 'http://mwlive.facebac.com/'

// 云播正式地址
// export const PROJET_URL = 'http://mwportal.mvaas.cn/'
// export const PLAY_URL = 'http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/17/mwLive.html?liveid='
// export const SETUSERICON = 817433040740401945
// export const  MSGURL = 'http://p.mvaas.cn/l/17/'
// export const LOGINURI = {
//     weiboUrl: "http://mwlivetest.facebac.com/17/api/mwlive/user/user_wb_third_login.do",
//     QQUrl: "http://mwlivetest.facebac.com/17/api/mwlive/user/user_qq_third_login.do",
//     weixinUrl: "http://mwlivetest.facebac.com/17/api/mwlive/user/user_wx_third_login.do",
// }

// export const  actionurl = 'http://192.169.2.63:8080/service/iBacManage.action';
// export const DEFAULT_IMG = 'http://montnets.facebac.com/montnet20170707/H5/videoplayer/mw_liveKing/17/image/mobile/video-default.jpg'
export const DEFAULT_IMG = 'http://mwdata.mvaas.cn/1/1/2/a47a408030132116b50c/26cf541b-4ac4-4c8c-a4b2-f32ebec26a50.png'
export const DEFAULT_ADMINIMGICON = 'http://mwdata.mvaas.cn/1/1/1/94944ba50c4eb1c18895/574ffda4-ec37-4eb6-aa68-bce7d870b782.png'
export const DEFAULT_IMGICON = 'http://montnets.facebac.com/montnet20170707/PC/webCloudSeeding/images/timg2.jpg'


export function isLogin() {
    // 检测是否登录状态
    if (localStorage.getItem("admin") == null) {
        console.log(localStorage.getItem("admin"))
        this.$router.push({
            path: '/login'
        })
        return false
    }
}

export let promiseIter = function(promises) {
    return new Promise((resolve, reject) => {
        nextPromise(0, promises);

        function nextPromise(index, promises) {
            let length = promises.length;
            if (index >= length) {
                resolve();
            }
            promises[index]()
                .then(() => {
                    nextPromise(index + 1, promises);
                })
                .catch((err) => {
                    reject(err);
                })
        }
    });
}

export function setCookie(name, value) {
    var d = new Date()
    d.setTime(d.getTime() + 0.5 * 3600 * 1000)
    document.cookie = name + '=' + value + '; expires=' + d.toGMTString()
    console.log('cookie', value)
}
export function getCookie(name) {
    var arr = document.cookie.split('; ')
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split('=')
        if (temp[0] == name) {
            return temp[1]
        }
    }
    return ''
}
export function removeCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = document.cookie
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}
//cookie方法
export function setCookies(name, value,days) {
    var d = new Date()
    d.setTime(d.getTime() + 24*60*60*1000*days)
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
    //console.log(name+value)
}
export function getCookies(name) {
    var v= window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
export function removeCookies(name) {
    setCookie(name, '', -1);
}
export function getLStorage(name) {
    return sessionStorage.getItem(name)
}
export function setLStorage(name, value) {
    return sessionStorage.setItem(name, value)
}
export function delLStorage(name) {
    return sessionStorage.removeItem(name)
}
export function copyLink(id) {
    var url = document.getElementById(id)
    console.log(copyLink, url)
    url.select()
    document.execCommand("copy")
}

export function setSNumber() {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num
}
export function timestampToTime(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y+M+D+h+m+s;
}
export function formatDate(date){
  let seperator1 = "-";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate
}
//判断错误代码，并且返回对应的文字
export function chargeError(code){
    let returnStr="";
    switch(code){
        case 2:
        returnStr="操作失败";
        break;
        case 3:
        returnStr="参数错误";
        break;
        case 4:
        returnStr="身份验证已过期，请重新登录！";
        console.log(window)
        // window.location.href = window.location.origin + '/login'
        this.$router.push({
            path: '/login'
        })
        break;
        case 5:
        returnStr="菜单个数不匹配";
        break;
        case 6:
        returnStr="未开通企业公众号授权";
        break;
        case 7:
        returnStr="名称已存在";
        break;
        default:
        returnStr="失败码为："+code;
        break;
    }
    return returnStr;
}

//获取天 eg:2018-07-03
export function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  }
export function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  }
  //转换日期格式
  export function changeDateType(daystr){
    var d = new Date(daystr);  
    var toDate;
    if(!!window.ActiveXObject || "ActiveXObject" in window){
        toDate =  d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    }else{
        toDate =  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
    return toDate;
  }

// export function toLowercase(data){
//     var reg = /\b(\w)|\s(\w)/g

//     return toLowercase

//
export function defaultDiagam(){
    // if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    //     this.$router.push({
    //         path:'./defaultDiagram'
    //     })
    // }
}
export function telSplit(tel){
    var newTel = tel.substr(0, 3) + '****' + tel.substr(7);
    return newTel;
}
