<template>
    <div class="login">
        <h2>登录正在上演</h2>
        <p class="code-ok" v-if="hascode">验证码已发送至 {{this.successPhoneNumber}}</p>
        <div class="login-phone">
            <input class="disance" type="tel" v-model="pn" :placeholder="wordTitle" @input="enterPhoneNumber">
            <button :class="hascode ? inputClass : 'nocontent'" :disabled='hascodeState' v-if="noNumber" @click="empty">{{cancelState}}</button>
        </div>
        <p class="code-error" v-if="codeError">验证码错误，请重新输入</p>
        <button :class="!isOk ? 'getcode' : ''" :disabled="isOk" @click="ok">{{okWordTitle}}</button>
        <span class="goback" @click="goback" v-if="!weixinFlag">x</span>
        <!-- <div class="wechat" v-if="!hascode && !weixinFlag">
            <img src="./images/WeChat.png" alt="404,图片不存在">
            <span>微信</span>
        </div> -->
    </div>
</template>

<script>
import {tfphoneNumber} from '@/utils/utils'
import {is_weixn, is_QQ} from '@/utils/utils.js'
export default {
    data() {
        return {
            pn:'',
            isOk:true, //手机号或验证码是否输入
            noNumber:false,//点击输入框右侧的x时的状态
            codeok:false,//验证码发送成功后的状态
            wordTitle:'请输入手机号',//未发送验证码时的提示
            successPhoneNumber:'',
            hascode:false,
            cancelState:'x',
            okWordTitle:'获取短信验证码',
            codeError:false,
            hascodeState:false,
            inputClass:'nocontent',
            weixinFlag:false
        }
    },
    methods:{
        goback() {
            history.go(-1);
        },
        // 输入框输入数字时
        enterPhoneNumber() {
            if((this.pn !== '' && this.hascode) || (this.pn !== '' && tfphoneNumber(this.pn-0))) {
                this.isOk = false
            }else {
                this.isOk = true
            }
            if(this.pn !== '' || this.hascode) {
                this.noNumber = true;
            }else {
                this.noNumber = false
            }
        },
        empty() {
            if(this.hascode) {
                this.getCode();
            }else {
                this.isOk = true;
                this.noNumber = false;
                this.pn = '';
            }
        },
        // 获取验证码
        getCode() {
            // var timer = setInterval(() => {
            //     index--
            //     this.cancelState = `重获取验证码(${index})`
            //     this.hascodeState = true;
            //     this.inputClass = 'nocontent hascode'
            //     if(index == 0) {
            //         this.cancelState = '重获取验证码'
            //         this.hascodeState = false
            //         this.inputClass = 'nocontent hascode codestate'
            //         clearInterval(timer)
            //     }
            // },1000)
            this.$ajax.sendMessage({mobile:this.pn}).then(res =>{
                // console.log(res)
                var index = 60;
                if(res.code == 200) {
                    this.noNumber = false
                    this.weixinFlag = true
                    this.wordTitle = '输入验证码';
                    this.okWordTitle = '登录'
                    this.successPhoneNumber = this.pn;
                    this.pn = ''
                    this.isOk = true;
                    this.hascode = true
                    var timer = setInterval(() => {
                        index--
                        this.cancelState = `重获取验证码(${index})`
                        this.hascodeState = true;
                        this.inputClass = 'nocontent hascode'
                        if(index == 0) {
                            this.cancelState = '重获取验证码'
                            this.hascodeState = false
                            this.inputClass = 'nocontent hascode codestate'
                            clearInterval(timer)
                        }
                    },1000)
                }
            })
        },
        // 获取短信及登陆
        ok() {
            if(tfphoneNumber(this.pn-0)) {
                this.getCode();
            }else {
                // 登录
                this.$ajax.bindPhoneNumber({
                    mobile:this.successPhoneNumber,
                    sm_code:this.pn,
                    login_type:1,
                    login_platform:2
                }).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$toast('登录成功！')
                        localStorage.setItem('userid',res.data.id)
                        localStorage.setItem('mobile',this.successPhoneNumber)
                        localStorage.setItem('mobileUserInfo',JSON.stringify(res.data))
                        this.$router.push({path:'/personal'})
                    }else if(res.code == 410) {
                        this.codeError = true;
                    }
                })
            }   
        }
    },
    mounted() {
        if(is_weixn() || is_QQ()) {
            this.weixinFlag = true
        }
    }
}
</script>
<style lang="scss">
html,body {
    background: #fff;
}
.login {
    width: 100%;
    padding-left: 3.5rem;
    h2 {
        color: #333333;
        font-size: 2.6rem;
        line-height: 3.7rem;
        margin-top: 9rem;
    }
    .code-ok {
        color: #4A4A4A;
        font-size: 1.3rem;
        padding-top: 0.6rem;
    }
    .login-phone {
        position: relative;
        margin-top: 5.5rem;
        width: 90%;
        input {
            width: 100%;
            height: 4.4rem;
            border-bottom: 1px solid #D9D9D9;
        }
        input::-webkit-input-placeholder {
            color: #D1D1D1; 
        }
        input::-moz-input-placeholder {
            color: #D1D1D1; /* Mozilla Firefox 19+ */
        }
        input:-webkit-input-placeholder {
            color: #D1D1D1; /* Mozilla Firefox 4 to 18 */
        }
        input:-ms-input-placeholder {
            color: #D1D1D1; /* Internet Explorer 10-11 */ 
        }
        .nocontent {
            position: absolute;
            right: 0;
            bottom: 1.3rem;
            color: #d9d9d9;
            background: #fff;
            font-size: 1.5rem;
            border: none;
            &.hascode {
                font-size: 1.2rem;
                &.codestate {
                    color: #FF6633;
                }
            }
        }
    }
    .code-error {
        font-size: 1.3rem;
        color: #E83817;
        margin-top: 0.9rem;
    }
    >button {
        width: 86%;
        margin: 0 auto;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        color: #fff;
        background:#FF6633;
        margin-top: 5rem;
        border: none;
        border-radius: 5rem;
        opacity: 0.6;
        &.getcode {
            opacity:1;
        }
    }
    .goback {
        font-size: 2rem;
        color: #9b9b9b;
        position: absolute;
        top: 0.5rem;
        left: 1.5rem;
    }
    .wechat {
        width: 5rem;    
        position: absolute;
        bottom: 3rem;
        left: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-left: -2.5rem;
        span {
            margin-top: 1rem;
            font-size: 1.2rem;
            color: #909090;
        }
    }
}
</style>

