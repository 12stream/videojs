<template>
    <div class="autor">
        <div class="autor-wrapper">
            <div class="title"><img src="./../assets/images/logo_autor.png"></div>
            <div class="autor-button">正在上演Live</div>
            <div class="login-autor">你还未登录</div>
        </div>
        <div class="weixin-login">
            <button @click="startAutor">微信登录</button>
        </div>
    </div>
</template>
<script>
import { getQueryString, setLStorage,getLStorage, setCookie, getCookie, removeCookie } from '@/api/config'
import { is_weixn } from '@/utils/utils'
import * as utils from '@/common/utils'
import fetch from '@/api/api'
export default {
    data() {
        return {

        }
    },
    methods:{
        startAutor() {
            if(getCookie('wxUserOpenid') && is_weixn() && this.$route.name === 'Autor'){
                this.router.push({ path: '/hall'})
            }
            var url = window.location.href;
            // var test = 'http://zzsyportaltest.mvaas.cn/public/zzsyH5/index.html?code=021Y38M00g5loF1ULRI00XRVL00Y38Mw&state=STATE#/'
            // console.log(test.indexOf('code'),'sdjdjdfsjklafjdskfklsfl发号施令的福克斯开发',(test.indexOf('code') < 0 && getCookie('oneCode') !== 'one') && (!getCookie('wxUserOpenid')) || getCookie('wxUserOpenid') == 'undefined')
            console.log('url:' + url)
            console.log("wxopenid:" + getCookie('wxUserOpenid'))
            if(!getCookie('wxUserOpenid') || getCookie('wxUserOpenid') == 'undefined') {
                removeCookie('oneCode')
            }
            console.log(url.indexOf('code') < 0,(getCookie('oneCode') !== 'one'),getCookie('wxUserOpenid'),(getCookie('wxUserOpenid') == 'undefined'))
            // 先判断是否从微信进入，后判断未拿到code值时调用
            if (is_weixn()) {
                if ((url.indexOf('code') < 0 && getCookie('oneCode') !== 'one') && (!getCookie('wxUserOpenid') || getCookie('wxUserOpenid') == 'undefined')) {
                    console.log(2)
                    fetch.wxStart({
                        redirect_uri: url
                    }).then(res => {
                        console.log("res值:" + JSON.stringify(res))
                        console.log("res.data:" + res.data)
                        setCookie('oneCode','one',10)
                        // 用户未同意授权时，此时code值为空，若在此条件下会导致无限死循环
                        if(res.data.indexOf('code') > -1) {
                            window.location.href = res.data;
                            // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbcae134740b4d0a5&redirect_uri=http%3A%2F%2Fzzsyportaltest.mvaas.cn%2Fpublic%2FzzsyH5%2Findex.html%23%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                        }
                    })
                } else {
                    //获取用户信息
                    console.log("查看参数：" + getCookie('wxUserInfo'))
                    console.log("查看用户信息：" + getCookie('wxUserOpenid'))
                   
                }
            }
        },
    },
    mounted(){
        setCookie('')
        if(getCookie('wxUserOpenid') && is_weixn() && this.$route.name === 'Autor'){
            this.router.push({ path: '/hall'})
        }
        var curUrl = window.location.href
        if ((!getCookie('wxUserOpenid') || getCookie('wxUserOpenid') == 'undefined') && curUrl.indexOf('code') > -1) {
            // console.log(getLStorage('wxUserOpenid'))
            console.log(3)
            fetch.getUerInfo({
                code: getQueryString('code')
            }).then(res => {
                console.log("用户信息：" + res.data)
                console.log("用户信息：" + JSON.stringify(res))
                console.log('wxUserInfo:' + JSON.stringify(res.data))
                console.log('res.data.openid:' + res.data.openid)
                // setLStorage('code', getQueryString('code'));
                // setLStorage('wxUserInfo', JSON.stringify(res.data))
                // setLStorage('wxUserOpenid', res.data.openid)
                setCookie('code', getQueryString('code'), 10)
                setCookie('wxUserInfo', JSON.stringify(res.data), 10)
                setCookie('wxUserOpenid', res.data.openid, 10)
                // 此用户信息未微信端返回的信息
                setLStorage('wxUserData',JSON.stringify(res.data))
                var paramsTir = {
                        user_title:res.data.nickname,
                        third_icon:res.data.headImg,
                        reg_type:4,
                        third_id:res.data.unionid,
                        login_type:0,
                        login_platform:2
                    }
                    fetch.thirdLogin(paramsTir).then(res =>{
                        console.log("第三方登陆返回信息：" +JSON.stringify(res))
                        if(res.code == 200) {
                            this.$toast('登录成功')
                            // setLStorage('wxuserid', res.data.id);
                            // 存取第三方返回的所有信息，考虑到cookie部分手机的存取有问题，还有h5的切换手机号之后需要变更信息，故用localStorage
                            setLStorage('thirdUserInfo',JSON.stringify(res.data))
                            setCookie('wxuserid', res.data.id, 10)
                            this.$router.push({ path: '/hall'})
                        }
                    })
            })
        }
    }

}
</script>
<style lang="scss" scoped>
.autor {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    // margin: 20px;
    .autor-wrapper {
        background: url('./../assets/images/bg_autorlt.png')left top no-repeat, url('./../assets/images/bg_autorrb.png') right bottom no-repeat;
        background-size:12rem 13.8rem, 8.3rem 10rem;
        width: 100%;
        height: 24.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{
            img{
                width: 6.5rem;
                height: 6.5rem;
                margin-top: 5.7rem;
            }
        }
        .autor-button{
            font-size: 1.4rem;
            color: #4A4A4A;
            margin: 1.2rem 0;
        }
        .login-autor{
            font-size: 1.4rem;
            color: #999999;
        }
    }
}
.autor-button {
    width: 100%;
    display: flex;
    justify-content: center;
}
.weixin-login{
    width: 100%;
    display: flex;
    justify-content: center;
    button {
        width: 89%;
        height: 44px;
        background: #65BB24;
        color: #fff;
        margin-top: 20px;
        border-radius: 1.7rem;
    }
}
</style>
