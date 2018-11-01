import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import SetPhone from '@/components/login/setPhone'
import ModifyPassword from '@/components/login/modifyPassword'


import Main from '@/components/main/main'
import LiveCenter from '@/components/main/liveCenter'
import NewLive1 from '@/components/main/newLive1'
import Index from '@/components/main/home'
// import Index2 from '@/components/main/Index2'
import Account from '@/components/account/account'
import AccountInfo from '@/components/account/info'
import RechargeGo from '@/components/account/rechargeGo'
import Certification from '@/components/account/certification'
import Certification1 from '@/components/account/certification1'
import Recharge from '@/components/account/recharge'
import Withdraw from '@/components/account/withdraw'
import withdrawAlipay from '@/components/account/withdrawAlipay'
import SecuritySet from '@/components/account/securitySet'
import RechargeRecord from '@/components/account/rechargeRecord'
import WithdrawalQuery from '@/components/account/withdrawalQuery'
import consumeRecord from '@/components/account/consumeRecord'
import benefitRecord from '@/components/account/benefitRecord'
import dilatation from '@/components/account/dilatation'
//账户并发
import accontlimit from '@/components/account/accontlimit'

import yunbo from '@/components/main/yunbo'

import NewLive from '@/components/newLive/newLive'
import Newlivedata from '@/components/newLive/newlivedata'

import vbIndex from '@/components/mainPage/index'
import mainPage from '@/components/mainPage/mainPage'
import editPage from '@/components/mainPage/editPage'

import operateMain from '@/components/operateManage/operateMain'
import operateRight from '@/components/operateManage/operateRight'
import gzhRight2 from '@/components/operateManage/gzhRight2'
import gzhRight1 from '@/components/operateManage/gzhRight1'
import operateWXPay from '@/components/operateManage/operateWXPay'
import openWeixinPay from '@/components/operateManage/openWeixinPay'
import operateDomainName from '@/components/operateManage/operateDomainName'
import userManage from '@/components/operateManage/userManage'
import senWords from '@/components/operateManage/senWords'
import lGift from '@/components/operateManage/gift'
import brandSetting from '@/components/operateManage/brandSetting'
import requestWXPay from '@/components/operateManage/requestWXPay'

import LiveControl from '@/components/liveControl/liveControl'
import liveLogo from '@/components/liveControl/liveLogo'
import viewSettings from '@/components/liveControl/viewsettings'
import vViewSettings from '@/components/onDemand/viewsettings'

import ticketsList from '@/components/liveControl/ticketsList'
import venueManagement from '@/components/liveControl/venueManagement'
import UserSettings from '@/components/liveControl/userSettings'
import WhiteList from '@/components/liveControl/whiteList'
import VideoList from '@/components/liveControl/videoList'
import ShareEmbedded from '@/components/liveControl/shareEmbedded'
import vShareEmbedded from '@/components/onDemand/shareEmbedded'
import setDefinition from '@/components/liveControl/setDefinition'
import vsetDefinition from '@/components/onDemand/setDefinition'
import vliveLogo from '@/components/onDemand/liveLogo'
import setAppLogo from '@/components/liveControl/setAppLogo'

import vLiveControl from '@/components/onDemand/vLiveControl'
// import vLiveControl from '@/components/clickPlay/uploadVideo2'

import h5Index from '@/components/liveControl/h5Index'
import LiveH5WX from '@/components/liveControl/LiveH5WX'
import LiveH5Serve from '@/components/liveControl/LiveH5Serve'
import praiseH5 from '@/components/liveControl/praiseH5'
import liveH5Share from '@/components/liveControl/liveH5Share'
import vh5Index from '@/components/onDemand/h5Index'
import vLiveH5WX from '@/components/onDemand/LiveH5WX'
import vLiveH5Serve from '@/components/onDemand/LiveH5Serve'
import vpraiseH5 from '@/components/onDemand/praiseH5'
import vliveH5Share from '@/components/onDemand/liveH5Share'

import ClickPlayDetail from '@/components/onDemand/videoDetail'


import Trailer from '@/components/trailer/trailer'
import LiveBg from '@/components/livebg/livebg'
import vLiveBg from '@/components/onDemand/livebg'
import LiveEnd from '@/components/liveEnd/liveEnd'

import Management from '@/components/dataManagement/dataManagement'
import Gift from '@/components/dataManagement/gift'
import VideoManagement from '@/components/dataManagement/videoManagement'
import FanList from '@/components/dataManagement/fanList'
import InterestList from '@/components/dataManagement/interestList'

import dataStatistic from '@/components/dataStatistics/index'
import visitorData from '@/components/dataStatistics/visitorData'
import periodData from '@/components/dataStatistics/periodData'
import saveData from '@/components/dataStatistics/saveData'
import playTimesData from '@/components/dataStatistics/playTimesData'

import LiveGift from '@/components/dataManagement/livegift'
import VideoCenter from '@/components/main/videoCenter'
import UploadVideo from '@/components/clickPlay/uploadVideo'
import UploadVideo2 from '@/components/clickPlay/uploadVideo2'
import FileList from '@/components/clickPlay/fileList'
import FileVideoList from '@/components/clickPlay/fileVideoList'

import defaultDiagram from '@/components/main/defaultDiagram'

//支付回调页面
import payreturn from '@/components/main/payreturn'



Vue.use(Router)

export default new Router({
    //部署线上portal20文件夹下面
    // base: '/portal20/',
    // mode: 'history',
    routes: [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index
    },
    // {
    //     path: '/index2',
    //     component: Index2
    // },
    {
        path: '/login',
        component: Login
    },
    {
        path:'/payreturn',
        component:payreturn
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/setPhone',
        component: SetPhone
    },
    {
        path: '/defaultDiagram',
        component: defaultDiagram
    },
    {
        path: '/Main',
        component: Main,
        children: [
            { path: '/', component: LiveCenter },
            { path: '/main/liveCenter', component: LiveCenter },
            { path: '/main/Index', component: Index },
            { path: '/main/newLive1', component: NewLive1 }
        ]
    },
    {
        path: '/yunbo',
        component: yunbo
    },
    { path: '/yunbo/newLive1', component: NewLive1 },
    //主页管理
    {
        path: '/vbIndex',
        component: vbIndex,
        children: [
            { path: '/', component: mainPage },
            { path: '/mainPage', component: mainPage },
            { path: '/mainPage/operateManage', component: operateRight },
            { path: '/mainPage/gzhRight2', component: gzhRight2 },
            { path: '/mainPage/gzhRight1', component: gzhRight1 },
            { path: '/mainPage/operateWXPay', component: operateWXPay },
            { path: '/mainPage/operateDomainName', component: operateDomainName },
            { path: '/mainPage/brandSetting', component: brandSetting },
            { path: '/mainPage/requestWXPay',component:requestWXPay},
            { path: '/mainPage/openWeixinPay',component:openWeixinPay},
        ]
    },
    {
        path: '/mainPage/editPage', component: editPage ,
        // children:[
        //     { path: '/operateManage/requestWXPay',component:requestWXPay}
        // ]
    },
    //运营管理
    {
        path: '/operateManage',
        component: operateMain,
        children: [
            { path: '/', component: operateRight },
            { path: '/operateManage/operateRight', component: operateRight },
            { path: '/operateManage/operateWXPay', component: operateWXPay },
            { path: '/operateManage/operateDomainName', component: operateDomainName },
            { path: '/operateManage/userManage', component: userManage },
            { path: '/operateManage/senWords', component: senWords },
            { path: '/operateManage/gzhRight2', component: gzhRight2 },
            { path: '/operateManage/gzhRight1', component: gzhRight1 },
            { path: '/operateManage/openWeixinPay', component: openWeixinPay },
            { path: '/operateManage/livegift', component: lGift },
            { path: '/operateManage/brandSetting', component: brandSetting }
        ]
    },
    //数据统计
    {
        path: '/dataStatistics',
        component: dataStatistic,
        children: [{ path: '/', component: visitorData },
        { path: '/dataStatistics/visitorData', component: visitorData },
        { path: '/dataStatistics/periodData', component: periodData },
        { path: '/dataStatistics/saveData', component: saveData },
        { path: '/dataStatistics/playTimesData', component: playTimesData }]
    },
    {
        path: '/rechargeGo',
        component: RechargeGo,
    },
    {
        path: '/account',
        component: Account,
        children: [
            { path: '/', component: AccountInfo },
            { path: '/account/info', component: AccountInfo },
            { path: '/account/Certification', component: Certification },
            { path: '/account/Certification1', component: Certification1 },
            { path: '/account/recharge', component: Recharge },
            { path: '/account/withdraw', component: Withdraw },
            { path: '/account/withdrawAlipay', component: withdrawAlipay },
            { path: '/account/rechargeRecord', component: RechargeRecord },
            { path: '/account/withdrawalQuery', component: WithdrawalQuery },
            { path: '/account/securitySet', component: SecuritySet },
            { path: '/account/consumeRecord', component: consumeRecord },
            { path: '/account/benefitRecord', component: benefitRecord },
            { path: '/account/dilatation', component: dilatation },
            { path: '/acount/interestList', component: InterestList },
            { path: '/acount/fanList', component: FanList },
            {path:'/account/accontlimit',component:accontlimit}
            // { path: '/account/rechargeGo', component: RechargeGo }
        ]
    },
    {
        path: '/newLive',
        component: NewLive
    },
    // {
    //     path: '/newLive1',
    //     component: NewLive1
    // },
    {
        path: '/newlivedata',
        component: Newlivedata
    },
    {
        // path: '/liveControl/:index',
        path: '/liveControl',
        component: LiveControl,
        children: [
            // { path: '/', component: Trailer },
            // { path: '/liveControl/trailer', component: Trailer },
            { path: '/', component: LiveBg },
            { path: '/liveControl/h5Index', component: h5Index },
            { path: '/liveControl/LiveH5WX', component: LiveH5WX },
            { path: '/liveControl/LiveH5Serve', component: LiveH5Serve },
            { path: '/liveControl/liveH5Share', component: liveH5Share },
            { path: '/liveControl/praiseH5', component: praiseH5 },
            { path: '/liveControl/livebg', component: LiveBg },
            { path: '/liveControl/liveLogo', component: liveLogo },
            { path: '/liveControl/liveEnd', component: LiveEnd },
            { path: '/liveControl/viewSettings', component: viewSettings },
            { path: '/dataManagement/livegift', component: LiveGift },
            { path: '/liveControl/ticketsList', component: ticketsList },
            { path: '/liveControl/venueManagement', component: venueManagement },
            { path: '/liveControl/userSettings', component: UserSettings },
            { path: '/liveControl/whiteList', component: WhiteList },
            { path: '/liveControl/videoList', component: VideoList },
            { path: '/liveControl/shareEmbedded', component: ShareEmbedded },
            { path: '/liveControl/setDefinition', component: setDefinition },
            { path: '/onDemand/setDefinition', component: vsetDefinition },
            { path: '/liveControl/setAppLogo', component: setAppLogo }


        ]
        // beforeEnter: (to, from, next) => {
        //     // next('/liveControl/0')
        //     console.log(this.ruleForm)
        // }
    },
    //点播
    {
        path: '/ClickPlayDetail',
        component: ClickPlayDetail
    },
    {
        path: '/onDemand/vLiveControl',
        component: vLiveControl,
        children: [
            { path: '/', component: vh5Index },
            { path: '/onDemand/h5Index', component: vh5Index },
            { path: '/onDemand/LiveH5WX', component: vLiveH5WX },
            { path: '/onDemand/LiveH5Serve', component: vLiveH5Serve },
            { path: '/onDemand/liveH5Share', component: vliveH5Share },
            { path: '/onDemand/praiseH5', component: vpraiseH5 },
            { path: '/onDemand/liveLogo', component: vliveLogo },
            { path: '/onDemand/liveBg', component: vLiveBg },
            { path: '/onDemand/viewSettings', component: vViewSettings },
            { path: '/onDemand/liveLogo', component: vliveLogo },
            { path: '/onDemand/vShareEmbedded', component: vShareEmbedded },
        ]
    },
    // {
    //     path: '/trailer',
    //     component: Trailer
    // },
    // {
    //     path: '/livebg',
    //     component: LiveBg
    // },
    // {
    //     path: '/liveEnd',
    //     component: LiveEnd
    // },
    {
        path: '/modifyPassword',
        component: ModifyPassword
    },
    {
        path: '/dataManagement',
        component: Management,
        children: [
            { path: '/', component: Gift },
            { path: '/dataManagement/gift', component: Gift },
            { path: '/dataManagement/fanList', component: FanList },
            { path: '/dataManagement/videoManagement', component: VideoManagement },
            { path: '/dataManagement/interestList', component: InterestList }

        ]
    },
    {
        path: '/videoCenter',
        component: VideoCenter
    },
    {
        path: '/uploadVideo',
        component: UploadVideo
    },
    {
        path: '/uploadVideo2',
        component: UploadVideo2
    },
    {
        path: '/fileList',
        component: FileList
    },
    {
        path: '/fileVideoList',
        component: FileVideoList
    },
    ]
})
