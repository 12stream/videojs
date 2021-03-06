import {get,post,fetch,postParams } from './fetch'
import { ACTIONURL,SERVICE_URL,CHAT_URL,UPLOAD_URL,PARAMURL,SERVER_URL_C,FORMALURL} from './config'
export default {

  /*
  *************大厅***************
  */

//轮播图
  getcarousel(params) {
    return get(SERVICE_URL+'iBacManage.action',params);
  },
//热门
  hotList(params) {
    return get(ACTIONURL+'mwlive/live/selectZzsyHot.do',params);
  },
//最新
  newList(params) {
    return get(ACTIONURL+'mwlive/live/selectZzsyNew.do',params);
  },
//搜索
 searchLiveList(params) {
    return get(ACTIONURL+'mwlive/pc/searchLive.do',params);
 },
 //直播间详情
 liveDetails(params) {
  return get(ACTIONURL + 'mwlive/live/get_info.do',params)
},
//直播预约
  liveAppoint(params) {
    return post(ACTIONURL + 'mwlive/live/live_make.do',params)
  },
//直播是否付费
 livePay(params) {
  return post(PARAMURL + 'api/mwh5/payRecord/viewPay_isok.do',params)
 },
//用户是否已预约
 appointF(params) {
  return post(ACTIONURL + 'mwlive/live/live_ismake.do',params)
 },
//榜单
 list(params) {
  return post(SERVICE_URL + 'queryReceiveGiftAll.action',params)
 },
//创建直播间
 changeLiveRoom(params) {
  return post(CHAT_URL + 'dispatcher.action',params)
 },
//点赞
 praise(params) {
  return post(SERVICE_URL + 'doLike.action',params)
 },
//点赞的次数
 praiseNumber(params) {
  return post(SERVICE_URL + 'queryLike.action',params)
 },
 //获取小程序二维码
 getMinCode(params) {
  return post(FORMALURL + 'api/mwh5/authorization/getWxxQrCode.do',params)
 },
//  获取base64图片
getBImg(params) {
  return post(PARAMURL + 'api/mwh5/other/imgToBase64.do',params)
},
// //获取敏感词
//  SensitiveWord(params) {
//   return post(CHAT_URL + 'filterword.action',params)
//  },
//礼物是否支付
giftPayState(params) {
  return post(PARAMURL + 'api/mwh5/pay/gitfWebPayResult.do',params)
},
//支付
 payStart(params){
  return post(PARAMURL + 'api/mwh5/pay/payView.do',params)
 },
 //礼物支付
 giftPayStart(params) {
  return post(PARAMURL + 'api/mwh5/pay/payGift.do',params)
 },
 //查询礼物接口
 getGift(params) {
  return post(SERVICE_URL + '/queryGift.action',params)
 },
 //记录视频观看时长_开始
 recodeVideoWatchStart(params) {
  return post(ACTIONURL + 'mwlive/live/videoview_begin.do', params)
 },
 //记录视频观看时长_结束
 recodeVideoWatchEnd(params) {
  return post(ACTIONURL + 'mwlive/live/videoview_end.do', params)
 },

 /*
  *************已预约**************
  */

//已预约
 appointOk(params) {
  return post(ACTIONURL + 'mwlive/live/get_live_make.do',params);
 },

 /*
  *************视频***************
  */

//分页获取视频列表
 getVideoList(params) {
  return get(ACTIONURL + 'mwlive/pc/videoLists.do',params);
 },
//视频详情
 getVideoDetails(params) {
  return post(ACTIONURL + 'mwlive/pc/videoInfo.do',params)
 },
//推荐列表
 videoRecommmed(params) {
  return get(ACTIONURL + 'mwlive/pc/getSimilarVod.do',params)
 },

 /*
  *************个人中心************
 */

//发送验证码
 sendMessage(params) {
    return get(ACTIONURL+'mwlive/user/user_login_third_bind.do',params);
 },
//绑定手机号码
 bindPhoneNumber(params) { 
    return post(ACTIONURL+'mwlive/user/mobile_login.do',params);
 },
 //更换手机号
 changePhoneNumber(params) {
  return post(ACTIONURL + 'mwlive/user/mobile_bind.do',params)
 },
 // 反馈
 feedbackapi(params) {
  return post(SERVICE_URL + 'userSuggestion.action',params)
 },
// 公众号登陆初始化
wxStart(params) {
  return post(PARAMURL + 'api/mwh5/authorization/wxAuthorizationInit.do',params)
},
//公众号授权登陆获取用户信息
getUerInfo(params) {
  return post(PARAMURL + 'api/mwh5/authorization/wxAuthorization.do',params)
},
//第三方登录
thirdLogin(params) {
  return post(ACTIONURL + 'mwlive/user/third_login.do',params)
}

}

