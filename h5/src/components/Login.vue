<template>
    <div class="login">
        <div class="mobile">
            <h4>绑定手机号</h4>
            <div class="phone">
                <input type="tel" placeholder="请输入手机号" class="iphone" v-model="phone" @input="phoneNumber">
            </div>
            <div class="code">
                <input type="tel" placeholder="请输入验证码" class="icode">
                <button :class="phoneState ? 'getcode' : ''" @click="getCode" :disabled='disabled'>获取验证码</button>
            </div>
            <p class="ok">确定</p>
            <img src="./../assets/images/cancel.png" class="cancel" @click="cancel"/>
        </div>
    </div>
</template>
<script>
import eventVue from './eventVue.js'
import {tfphoneNumber} from '@/utils/utils'
export default {
    data(){
        return {
            disabled:true,
            phone:'',
            phoneState:false
        }
    },
    props:['without'],
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
        },
        getCode() {
            var that = this;
            // console.log(this.phone-0)
            if(tfphoneNumber(this.phone-0)) {
                // console.log(123)
            }else {
                this.$toast('请输入正确的手机号码！')
            }
        },
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
    z-index: 2;
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
                width: 12.9rem;
            }
        }
        button {
            display: inline-block;
            width: 8.8rem;
            height: 3.4rem;
            line-height: 3.4rem;
            text-align: center;
            border: 1px solid #D9D9D9;
            background: #F2F2F2;
            border-radius: 1.7rem;
            font-size: 1.2rem;
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
        margin-top: 3rem;
        padding-bottom: 2rem;
        text-align: center;
        border-radius: 1.7rem;
        color: #B9B9B9;
    }
}
</style>


