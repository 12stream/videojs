<template>
    <div class="feedback">
        <Title :showtitle="title" v-if="!weixinFlag"></Title>
        <div class="feedb">
            <textarea name="feedback" class="feedback-content" cols="30" rows="10" placeholder="请输入你的问题" v-model="feedbackContent" @input="fbcontent"></textarea>
        </div>
        <div class="feedback-mobile">
            <input type="tel" placeholder="请输入你的手机号码" v-model="phone" @input="feedState">
        </div>
        <button :class="subState ? 'sub oksub' : 'sub'" @click="feedBack" :disabled="subState">提交</button>
    </div>
</template>
<script>
import Title from '@/components/Title'
import {tfphoneNumber, is_weixn, is_QQ} from '@/utils/utils'
import {getLStorage} from '@/api/config'
export default {
    data() {
        return {
            title:'用户反馈',
            feedbackContent:'',
            phone:'',
            subState:true,
            weixinFlag:false
        }
    },
    components:{Title},
    computed:{
        
    },
    methods:{
        feedBack(){
            if(getLStorage('thirdUserInfo')){
                var tui = JSON.parse(getLStorage('thirdUserInfo'))
                var userid = tui.id
            }else if(getLStorage('mobileUserInfo')){
                var mobileMessage = JSON.parse(getLStorage('mobileUserInfo'))
                var userid = mobileMessage.id
            }else{
                var userid = localStorage.getItem('userid');
            }
            if(tfphoneNumber(this.phone-0)) {
                this.$ajax.feedbackapi({
                userID:userid,
                suggestion:this.feedbackContent,
                contact:this.phone
                }).then(res =>{
                    if(res.resultCode == '01') {
                        this.$toast('反馈成功')
                    }
                })
            }else{
                this.$toast('请输入正确的手机号!')
            }
        },
        fbcontent(){
            if(this.feedbackContent !== '' && this.phone !== '') {
                this.subState = false
            }else {
                this.subState = true
            }
        },
        feedState(){
            if(this.feedbackContent !== '' && this.phone !== ''){
                this.subState = false
            }else {
                this.subState = true
            }
        }
    },
    mounted() {
        if(is_weixn() || is_QQ()) {
            this.weixinFlag = true
        }
        // if(localStorage.getItem('mobile')) {
        //     this.phone = localStorage.getItem('mobile')
        // }
    }
}
</script>
<style lang="scss">
.feedback {
    position: absolute;
    top: 0;
    left: 0;
    min-height:100%;
    width: 100%;
    padding: 0 2.5rem;
    background: #EDEEF1;
    .feedb {
        display: flex;
        justify-content: center;
        .feedback-content {
            width: 100%;
            height: 20rem;
            border: 1px solid #D9D9D9;
            margin-top: 2.5rem;
            padding: 1rem 0 0 1.5rem;
            font-size: 1.7rem;
        }
    }
    .feedback-mobile {
        display: flex;
        justify-content: center;
        margin-top: 1.5rem;
        input {
            width: 100%;
            height: 5rem;
            display: block;
            border: 1px solid #D9D9D9;
            padding-left: 1.5rem;
        }
    }
    .sub {
            width: 100%;
            background: #FF6633;
            height: 4rem;
            border-radius: 5rem;
            line-height: 4rem;
            text-align: center;
            color: #fff;
            margin-top: 3rem;
            border: none;
            &.oksub {
                opacity:0.6;
            }
        }
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
}
.common-title .return-title span.goback {
    left:-2.2rem;
}
</style>

