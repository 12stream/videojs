<template>
    <div class="personal-wrapper">
       <div class="top-message">
           <div class="personal-img">
               <img :src="wxHeadImg" v-if="wxHeadImg">
               <img src="./images/toux.png" v-else>
           </div>
           <div class="personal-message">
               <div class="personal-name">{{nickname == '' ? pmobile : nickname}}</div>
               <div class="personal-id">ID {{userUid == '' ? userId : userUid}}</div>
           </div>
       </div>
       <div class="personal-state">
            <span class="bindphone">绑定手机号</span>
            <span class="yourmobile" v-if="pmobile">{{pmobile}}</span>
            <span class="changephonenumber" @click="bindMobile">{{bcphonenumber}}</span>
        </div>
         <div class="personal-state" @click="$router.push({path:'/feedback'})">
            <span class="user-feedback">用户反馈</span>
        </div>
        <!-- <button class="clear" @click="clear">测试清除cookie用</button> -->
        <Login v-if="flag" :loginF="okF" ></Login>
        <div class="mask" v-if="flag"></div>
    </div>
</template>
<script>
import Login from '@/components/LoginBox'
import eventVue from '@/components/eventVue.js'
import {getLStorage, getCookie, removeCookie} from '@/api/config'
export default {
    name: 'index',
    data() {
        return {
            msg:'个人中心',
            flag:false,
            pmobile:'',
            bcphonenumber:'绑定',
            userId:'',
            wxHeadImg:null,
            nickname:'',
            userUid:'',
            okF:'loginF'
        }
    },
    components:{Login},
    methods:{
        mobileshow(phone) {
           this.pmobile = phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
        },
        bindMobile() {
            
            if(getLStorage('mobile')) {
                this.$router.push({path:'/newphone'})
            }else if(getLStorage('thirdUserInfo')){
                var mobileT = JSON.parse(getLStorage('thirdUserInfo'))
                if(mobileT.mobile){
                    this.$router.push({path:'/newphone'})
                }else{
                    this.okF = 'changF'
                    this.flag = true
                }
            }else {
                this.flag = true;
                this.okF = 'changF'
            }
        },
        // clear() {
        //     console.log('清除cookie开始：')
        //     removeCookie('oneCode')
        //     localStorage.removeItem('userid')
        //     localStorage.removeItem('mobile')
        //     localStorage.removeItem('mobileUserInfo')
        //     console.log('清除cookie结束：')
        //     this.$toast('清除成功')
        //      removeCookie('wxuserid')
        //     localStorage.removeItem('wxUserData')
        //     removeCookie('code')
        //     removeCookie('wxUserInfo')
        //     removeCookie('wxUserOpenid')
        //     // 测试调式用，方便与测试。如果是在微信端的话就清除微信的用户信息
        //     // var ua = navigator.userAgent.toLowerCase();
        //     // if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //     //     removeCookie('wxuserid')
        //     //     localStorage.removeItem('wxUserData')
        //     //     removeCookie('code')
        //     //     removeCookie('wxUserInfo')
        //     //     removeCookie('wxUserOpenid')
        //     // }
        // }
    },
    mounted(){
        eventVue.$on('cancel', val => {
            this.flag = val.cF
        })
        if(getLStorage('thirdUserInfo')) {
            var tuip = JSON.parse(getLStorage('thirdUserInfo'))
            if(tuip.mobile){
                var tuiphone = tuip.mobile
            }
        }
        if((getLStorage('mobile') || tuiphone) && getLStorage('wxUserData')) {
            var phone = tuiphone || getLStorage('mobile')
            this.userId = getCookie('wxuserid') || getLStorage('userid')
            this.mobileshow(phone)
            this.bcphonenumber = '更换手机'
        }
        // console.log(getCookie('wxUserInfo'))
        console.log(getLStorage('wxUserData'))
        // if(getCookie('wxUserInfo') !== null || getCookie('wxUserInfo') !== 'undefined' ) {
        if(getLStorage('wxUserData')) {
            var mes = JSON.parse(getLStorage('wxUserData'))
            console.log("mes:" + mes)
            console.log("mesmessage:" + JSON.stringify(mes))
            console.log('mes.unionid:'+mes.unionid,mes.nickname,mes.headImg)
            // this.userUid = mes.unionid
            this.userUid = getCookie('wxuserid')
            this.nickname = mes.nickname
            this.wxHeadImg = mes.headImg
        if(getLStorage('thirdUserInfo')) {
            var tui = JSON.parse(getLStorage('thirdUserInfo'))
            this.wxHeadImg = tui.user_icon_url
            if(tui.mobile){
                this.pmobile = (tui.mobile).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
                this.bcphonenumber = '更换手机'
            }else{
                this.bcphonenumber = '绑定'
            }
        }else if(getLStorage('mobile')) {
            this.pmobile = getLStorage('mobile').replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
            this.bcphonenumber = '更换手机'
        }
        }else if(getLStorage('mobileUserInfo')) {
            var mobileMes = JSON.parse(getLStorage('mobileUserInfo'))
            console.log(mobileMes.id)
            this.userUid = mobileMes.id
            var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if(!myreg.test(mobileMes.user_name)) {
               this.nickname = mobileMes.user_title
            }
            this.wxHeadImg = mobileMes.user_icon_url
            if(getLStorage('mobile')) {
                this.pmobile = getLStorage('mobile').replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
                this.bcphonenumber = '更换手机'
            }
        }
    }
}
</script>
<style lang="scss">
.clear {
    width: 100%;
    margin-top: 50px;
    color: #f60;
    height: 44px;
    line-height: 44px;
}
.top-message {
    background: url('./../../assets/images/bitm.png') no-repeat;
    background-size: cover;
    height: 14.5rem;
    display: flex;
    .personal-img {
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 3rem;
        img {
            width: 7.7rem;
            height: 7.7rem;
            border-radius: 50%;
        }
    }
    .personal-message {
        flex: 1;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 1.2rem;
        .personal-name {
            font-size: 2.4rem;
            line-height: 3.4rem;
        }
        .personal-id {
            font-size: 1.2rem;
            line-height: 1.7rem;
        }
    }
}
.personal-state {
    width: 86%;
    margin:0 7%;
    padding: 1.6rem 0;
    border-bottom: 1px solid #E3E3E7;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bindphone {
        color: #4A4A4A;
        font-size: 1.4rem;
        line-height: 2rem;
    }
    .yourmobile {
        font-size: 1.4rem;
        color: #9B9B9B;
        line-height: 2rem;
        padding-left: 10px;
    }
    .changephonenumber {
        display: inline-block;
        padding: 0.8rem 2.5rem;
        font-size: 1.2rem;
        color: #8C8C8C;
        background: #F2F2F2;
        border-radius: 5rem;
        margin-right: 1.6rem;
    }
    :after{
            content: " ";
            display: inline-block;
            height: 1rem;
            width: 1rem;
            border-width: 1px 1px 0 0;
            border-color: #9B9B9B;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            position: absolute;
            top: 50%;
            right: 0;
    }
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 1;
}
</style>

