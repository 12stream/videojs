<template>
    <div class="login">
        <div class="mobile">
            <h4>绑定手机号</h4>
            <div class="phone">
                <input type="tel" placeholder="请输入手机号" class="iphone" v-model="phone" @input="phoneNumber">
            </div>
            <div class="code">
                <input type="tel" placeholder="请输入验证码" class="icode" v-model="code" @input="enterCode" maxlength="4">
                <button :class="phoneState ? 'getcode' : ''" @click="getCode" :disabled='disabled'>{{codeTitle}}</button>
            </div>
            <!-- loginF时为登录，changF时为绑定手机号 -->
            <p :class="okState ? 'ok comfirm' : 'ok'" @click="ok" v-if="loginF == 'loginF'">确定</p>
            <p :class="okState ? 'ok comfirm' : 'ok'" @click="wxok" v-else-if="loginF == 'changF'">确定</p>
            <img src="../assets/images/cancel.png" class="cancel" @click="cancel"/>
        </div>
    </div>
</template>
<script>
import eventVue from './eventVue.js'
import {tfphoneNumber} from '@/utils/utils'
import {getCookie} from '@/api/config'
import api from '@/api/api'
export default {
    data(){
        return {
            disabled:true,
            phone:'',
            code:'',
            phoneState:false,
            okState:false,
            codeTitle:'获取验证码'
        }
    },
    props:['without', 'loginF'],
    methods:{
        cancel() {
            var cancelD = {
                cF:false,
                uId:''
            }
            eventVue.$emit('cancel',cancelD)
        },
        phoneNumber() {
           if(this.phone.length == 11) {
                this.disabled = false;
                this.phoneState = true
            }else {
                this.disabled = true;
                this.phoneState = false
            }
            if(tfphoneNumber(this.phone-0) && this.code !== '') {
                this.okState = true;
            }else {
                this.okState = false
            }
        },
        getCode() {
            if(tfphoneNumber(this.phone-0)) {  
                this.$ajax.sendMessage({
                    mobile:this.phone
                }).then(res =>{
                    var index = 60;
                    if(res.code == 200){
                        this.disabled = true;
                        var timer = setInterval(() => {
                            index--
                            this.codeTitle = `重获验证码(${index})`
                            if(index == 0) {
                                this.codeTitle = '重获验证码'
                                this.disabled = false;
                                clearInterval(timer)
                            }
                        },1000)
                    }
                })
            }else {
                this.$toast('请输入正确的手机号码！')
            }
        },
        enterCode() {
            if(tfphoneNumber(this.phone-0) && this.code !== '') {
                this.okState = true;
            }else {
                this.okState = false
            }
        },
        // 不在微信浏览器里
        ok() {
            this.$ajax.bindPhoneNumber({
                mobile:this.phone,
                sm_code:this.code,
                login_type:1,
                login_platform:2
            }).then(res => {
                console.log(res)
                if(res.code == '200') {
                    this.$toast('绑定成功！')
                    localStorage.setItem('userid',res.data.id)
                    localStorage.setItem('mobile',this.phone)
                    localStorage.setItem('mobileUserInfo',JSON.stringify(res.data))
                    eventVue.$emit('useridF',res.data.id)
                    var cancelD = {
                        cF:false,
                        uId:res.data.id
                    }
                    eventVue.$emit('cancel',cancelD)
                }else{
                    var titleMessage = res.msg;
                    this.$toast(titleMessage);
                }
            })
        },
        // 在微信浏览器里
        wxok() {
            console.log(this.loginF)
            // var mes = JSON.parse(getCookie('wxUserInfo'))
            this.$ajax.changePhoneNumber({
                mobile:this.phone,
                sm_code:this.code,
                // user_id: mes.unionid,
                user_id:getCookie('wxuserid'),
                isTip:0
            }).then(res =>{
                // console.log(res)
                if(res.code == 200) {
                     console.log(JSON.stringify(res))
                    this.$toast('绑定成功！')
                    var cancelD = {
                        cF:false,
                        uId:res.data.id
                    }
                    eventVue.$emit('cancel',cancelD)
                    localStorage.setItem('userid',res.data.id)
                    localStorage.setItem('mobile',this.phone)
                    localStorage.setItem('mobileUserInfo',JSON.stringify(res.data))
                }else{
                    var titleMessage = res.msg;
                    this.$toast(titleMessage);
                }
            })
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="scss">
.mobile {
    width: 28rem;
    height: 22.5rem;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 12;
    padding: 0 2.1rem;
    input::-webkit-input-placeholder{
        color:#D9D9D9;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#D9D9D9;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#D9D9D9;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        color:#D9D9D9;
    }
    h4 {
        text-align: center;
        font-size: 1.6rem;
        color: #000;
        padding: 2rem 0;
        font-weight: bold;
        position: relative;
    }
    .cancel {
        position: absolute;
        top: 0.8rem;
        left: 0.8rem;
    }
    .phone,.code {
        margin-top: 1rem;
        display: flex;
        input {
            height: 3.4rem;
            display: inline-block;
            border: 1px solid #D9D9D9;
            border-radius: 1.7rem;
            padding-left: 1.6rem;
            &.iphone {
                width: 100%;
            }
            &.icode {
                // width: 12.9rem;
                width: 11rem;
            }
        }
        button {
            display: inline-block;
            min-width: 8.8rem;
            height: 3.4rem;
            line-height: 3.4rem;
            text-align: center;
            border: 1px solid #D9D9D9;
            background: #F2F2F2;
            border-radius: 1.7rem;
            font-size: 12px;
            margin-left: 1rem;
            color: #8c8c8c;
            &.getcode {
                border: 1px solid #FF6633;
                color: #FF6633;
                background:#fff;
            }
        }
    }
    .ok {
        width: 100%;
        height: 3.4rem;
        line-height: 3.4rem;
        background: #F2F2F2;
        // margin-top: 3rem;
        margin-top: 1rem;
        // padding-bottom: 2rem;
        text-align: center;
        border-radius: 1.7rem;
        color: #B9B9B9;
        &.comfirm {
            background: #FF6633;
            color: #fff;
        }
    }
}
</style>


