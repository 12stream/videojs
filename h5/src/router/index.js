import Vue from 'vue'
import Router from 'vue-router'
import * as utils from '@/common/utils'
import fetch from '@/api/api'
import { getQueryString, setLStorage, getLStorage, setCookie, getCookie, removeCookie } from '@/api/config'
import { is_weixn } from '@/utils/utils'

/*授权页面*/
import Autor from '@/views/Autor'

/*大厅*/
import Hall from '@/views/hall/Index'
import Search from '@/views/hall/Search'
import Live from '@/views/hall/Live'
import InviteCard from '@/views/hall/live/Invite' //邀请卡片页面

/*视频*/
import Video from '@/views/video/Index'
import VideoDetails from '@/views/video/Details'

/*预约*/
import Appointment from '@/views/appointment/Index'

/*个人中心*/
import Personal from '@/views/personal/Index'
import Feedback from '@/views/personal/Feedback'
import Newphone from '@/views/personal/Newphone'
import Login from '@/views/personal/Login' //登陆

/*OTT反馈专用页面*/
import FeedbackOTT from '@/views/FeedbackOTT'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'Autor',
            component: Autor,
            meta: {
                title: '中国网正在上演',
                navStatus: false
            }
        },
        {
            path: '/hall',
            name: 'Hall',
            component: Hall,
            meta: {
                title: '中国网正在上演',
                navStatus: true
            }
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
            meta: {
                title: '中国网正在上演'
            }
        },
        {
            path: '/live/:liveId',
            name: 'Live',
            component: Live,
            meta: {
                title: '中国网正在上演'
            }
        },
        {
            path: '/invite/:livId',
            name: 'Invite',
            component: InviteCard,
            meta: {
                title: '中国网正在上演'
            }
        },
        {
            path: '/appointment',
            name: 'Appointment',
            component: Appointment,
            meta: {
                title: '中国网正在上演',
                navStatus: true
            }
        },
        {
            path: '/personal',
            name: 'Personal',
            component: Personal,
            meta: {
                navStatus: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/newphone',
            name: 'Newphone',
            component: Newphone,
        },
        {
            path: '/feedback',
            name: 'Feedback',
            component: Feedback,
        },
        {
            path: '/feedbackOTT',
            name: 'FeedbackOTT',
            component: FeedbackOTT,
        },
        {
            path: '/video',
            name: 'Video',
            component: Video,
            meta: {
                title: '中国网正在上演',
                navStatus: true
            }
        },
        {
            path: '/video/details/:videoId',
            name: 'VideoDetails',
            component: VideoDetails
        },
        // {
        //     path: '/autor',
        //     name: 'Autor',
        //     component: Autor,
        //     meta: {
        //         title: '授权页面'
        //     }
        // },
    ]
})
router.beforeEach((to, from, next) => {
    // 未登陆时跳转操作
    console.log("wxuid:"+getCookie("wxuserid"))
    // 不是在微信端时，作此判断
    console.log(3224345,getLStorage("userid"))
    if(!is_weixn()) {
        console.log(to.name)
        if(!getLStorage("userid") || getLStorage("userid") == 'undefined') {
            if ((to.name === 'Personal' || to.name === 'Appointment')) {
                router.push({ path: '/login' })
            }
            // if(is_weixn()) {
            //     if(!getCookie("wxuserid") || getCookie("wxuserid") == 'undefined') {
            //         router.push({ path: '/login' })
            //     }
            // }
        }
        if(to.name === 'Autor'){
            router.push({ path: '/hall'})
        }
    }else{
        setLStorage('curUrlAutor',window.location.href)
        if(getCookie('wxUserOpenid') && to.name === 'Autor') {
            router.push({ path: '/hall' })
        }else if(!getCookie('wxUserOpenid') && to.name !== 'Autor'){
            router.push({ path: '/'})
        }
    }
    // var url = window.location.href;
    // // var test = 'http://zzsyportaltest.mvaas.cn/public/zzsyH5/index.html?code=021Y38M00g5loF1ULRI00XRVL00Y38Mw&state=STATE#/'
    // // console.log(test.indexOf('code'),'sdjdjdfsjklafjdskfklsfl发号施令的福克斯开发',(test.indexOf('code') < 0 && getCookie('oneCode') !== 'one') && (!getCookie('wxUserOpenid')) || getCookie('wxUserOpenid') == 'undefined')
    // console.log('url:' + url)
    // console.log("wxopenid:" + getCookie('wxUserOpenid'))
    // if(!getCookie('wxUserOpenid') || getCookie('wxUserOpenid') == 'undefined') {
    //     removeCookie('oneCode')
    // }
    // console.log(url.indexOf('code') < 0,(getCookie('oneCode') !== 'one'),getCookie('wxUserOpenid'),(getCookie('wxUserOpenid') == 'undefined'))
    // // 先判断是否从微信进入，后判断未拿到code值时调用
    // if (is_weixn()) {
    //     if ((url.indexOf('code') < 0 && getCookie('oneCode') !== 'one') && (!getCookie('wxUserOpenid') || getCookie('wxUserOpenid') == 'undefined')) {
    //         console.log(2)
    //         fetch.wxStart({
    //             redirect_uri: url
    //         }).then(res => {
    //             console.log("res值:" + JSON.stringify(res))
    //             console.log("res.data:" + res.data)
    //             setCookie('oneCode','one',10)
    //             // 用户未同意授权时，此时code值为空，若在此条件下会导致无限死循环
    //             if(res.data.indexOf('code') > -1) {
    //                 window.location.href = res.data;
    //                 // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbcae134740b4d0a5&redirect_uri=http%3A%2F%2Fzzsyportaltest.mvaas.cn%2Fpublic%2FzzsyH5%2Findex.html%23%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    //             }
    //         })
    //     } else {
    //         //获取用户信息
    //         console.log("查看参数：" + getCookie('wxUserInfo'))
    //         console.log("查看用户信息：" + getCookie('wxUserOpenid'))
    //         if( getCookie('wxUserOpenid') && to.name === 'Autor') {
    //             router.push({ path: '/hall' })
    //         }else {
    //             if (!getCookie('wxUserOpenid') || getCookie('wxUserOpenid') == 'undefined') {
    //                 // console.log(getLStorage('wxUserOpenid'))
    //                 console.log(3)
    //                 fetch.getUerInfo({
    //                     code: getQueryString('code')
    //                 }).then(res => {
    //                     console.log("用户信息：" + res.data)
    //                     console.log("用户信息：" + JSON.stringify(res))
    //                     console.log('wxUserInfo:' + JSON.stringify(res.data))
    //                     console.log('res.data.openid:' + res.data.openid)
    //                     // setLStorage('code', getQueryString('code'));
    //                     // setLStorage('wxUserInfo', JSON.stringify(res.data))
    //                     // setLStorage('wxUserOpenid', res.data.openid)
    //                     setCookie('code', getQueryString('code'), 10)
    //                     setCookie('wxUserInfo', JSON.stringify(res.data), 10)
    //                     setCookie('wxUserOpenid', res.data.openid, 10)
    //                     // 此用户信息未微信端返回的信息
    //                     setLStorage('wxUserData',JSON.stringify(res.data))
    //                     if(res.code == 200) {
    //                         var paramsTir = {
    //                             user_title:res.data.nickname,
    //                             third_icon:res.data.headImg,
    //                             reg_type:4,
    //                             third_id:res.data.unionid,
    //                             login_type:0,
    //                             login_platform:2
    //                         }
    //                         fetch.thirdLogin(paramsTir).then(res =>{
    //                             console.log("第三方登陆返回信息：" +JSON.stringify(res))
    //                             if(res.code == 200) {
    //                                 // setLStorage('wxuserid', res.data.id);
    //                                 // 存取第三方返回的所有信息，考虑到cookie部分手机的存取有问题，还有h5的切换手机号之后需要变更信息，故用localStorage
    //                                 setLStorage('thirdUserInfo',JSON.stringify(res.data))
    //                                 setCookie('wxuserid', res.data.id, 10)
    //                             }
    //                         })
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }
    // 设置各个路由的标题
    utils.setTitle(to.meta.title || '')
    next()
})

export default router