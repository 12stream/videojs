<template>
    <div class="personal-login">
        <Title :showtitle='personalLoginTitle' v-if="!weixinFlag"></Title>
        <div class="newphone-wrapper">
            <div class="newphone">
                <span>新手机号</span>
                <!-- <span class="distance">|</span> -->
                <input type="tel" v-model="newphone" @input="entNewPhone" placeholder="请输入新手机号">
            </div>
            <div class="newphone-code">
                <span>验证码</span>
                <input type="tel" v-model="newcode" @input="entNewCode" maxlength="4" placeholder="请输入验证码">
                <button :class="!disabledp ? 'getcode' : ''" @click="getCode" :disabled="disabledp">{{getCodeTitle}}</button>
            </div>
            <button :class="!disabledc ? 'ok' : ''" :disabled="disabledc" @click="submitok">提交</button>
        </div>
    </div>
</template>
<script>
import Title from '@/components/Title'
import {tfphoneNumber, is_weixn, is_QQ} from '@/utils/utils'
import {getLStorage} from '@/api/config'
export default {
    data() {
        return {
            personalLoginTitle:'绑定新手机号',
            disabledp:true,
            disabledc:true,
            newphone:'',
            newcode:'',
            getCodeTitle:'获取验证码',
            phoneOk:false,
            weixinFlag:false
        }
    },
    components:{Title},
    methods:{
        entNewPhone() {
            if(tfphoneNumber(this.newphone-0)) {
                this.disabledp = false
            }else {
                this.disabledp = true
                this.disabledc = true;
            }
            
        },
        entNewCode() {
            if(tfphoneNumber(this.newphone-0) && this.newcode !== '') {
                this.disabledc = false;
            }else {
                this.disabledc = true;
            }
        },
        getCode() {
            // if(this.newphone == getLStorage('mobile')){
            //     this.$toast('新绑定的手机号不能与原手机号相同')
            // // 验证号码符合手机号及11位方可发送短信
            // }else 
            if(tfphoneNumber(this.newphone-0)) {
                this.$ajax.sendMessage({
                    mobile:this.newphone
                }).then(res =>{
                    var index = 60;
                    // console.log(res)
                    if(res.code == 200) {
                        this.disabledp = true;
                        // 从新获取验证码倒计时60秒
                        var timer = setInterval(() => {
                            index--
                            this.getCodeTitle = `重获验证码(${index})`
                            if(index == 0) {
                                this.getCodeTitle = '重获验证码'
                                this.disabledp = false;
                                clearInterval(timer)
                            }
                        },1000)
                    }
                })
            }
        },
        submitok() {
            if(getLStorage('thirdUserInfo')) {
                var tui = JSON.parse(getLStorage('thirdUserInfo'))
                var getUserId = tui.id
            }else{
                var getUserId = localStorage.getItem('userid')
            }
            if(tfphoneNumber(this.newphone-0) && this.newcode !== '') {
                this.$ajax.changePhoneNumber({
                    mobile:this.newphone,
                    sm_code:this.newcode,
                    user_id:getUserId,
                    isTip:0
                }).then(res =>{
                    if(res.code == 200) {
                        localStorage.setItem('mobile',this.newphone)
                        localStorage.setItem('mobileUserInfo',JSON.stringify(res.data))
                        this.$toast('更换成功')
                        this.$router.push({path:'/personal'})
                        console.log(res)
                    }else if(res.code !== 200) {
                        var titleMessage = res.msg;
                        this.$toast(titleMessage);
                        // this.$toast('请输入正确的验证码！')
                    }
                })
            }
        }
    },
    mounted(){
        if(is_weixn() || is_QQ()) {
            this.weixinFlag = true
        }
    }
}
</script>
<style lang="scss">
.newphone-wrapper {
     width: 86%;
     margin: 0 auto;
    .newphone {
        border-bottom: 1px solid #E3E3E7;
        color: #4A4A4A;
        padding: 1.5rem 0;
        font-size: 1.4rem;
        margin-top: 0.3rem;
        .distance {
            padding: 0 1rem;
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
    }
    .newphone-code {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 0;
        margin-top: 0.3rem;
        border-bottom: 1px solid #E3E3E7;
        // span {
        //     width: 20%;
        // }
        input {
            // display: block;
            width: 30%;
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
        button {
            width: 44%;
            color:#9B9B9B;
            border: none;
            background: #fff;
            text-align: right;
            &.getcode {
                color:rgba(255,102,51,1);
                border: none;
                background: #fff;
            }
        }
    }
    >button {
        width: 100%;
        height: 4rem;
        background: rgba(255,102,51,0.6);
        text-align: center;
        line-height: center;
        color: #fff;
        border: none;
        border-radius: 5rem;
        margin-top: 3.5rem;
        &.ok {
            background: rgba(255,102,51,1);
        }
    }
}
</style>


