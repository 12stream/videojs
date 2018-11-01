<template>
    <div class="my_list securitySet">
        <div class="live-top">安全设置</div>
        <div class="bg-fff col-333 info-content">
            <el-row class="clear pd20 securitySet-main">
                <label for="">账户并发限制 ：</label>
                <input class="setIptVal" type="text" v-model="val" v-on:blur="inputBlur" name="" id="">
                <label for="" style="margin-left:6px;" >人</label>
            </el-row>
            <p class="p5">温馨提示：</p>
            <p class="p5">如已设置账户并发限制，则所有直播间并发总和为账户最高并发</p>
            <p class="p5">未认证用户：并发限制不超过10</p>
            <p class="p5">认证用户：并发限制不超过余额最高限制人数</p>
            <p class="p5 p6">余额最高限制公式为：<br>人数=余额/最低时长为30min/每分钟费用</p>
            <p class="p5">如需更多人数需求，请电话联系销售人员</p>
        </div>
        <el-row class="subFoot">
             <el-button type="primary" @click="sheBtn">提交</el-button>
        </el-row>
    </div>
</template>

<script>
    import {DATA_URL, ERR_OK,getLStorage} from 'api/config';
    import {filterObj} from 'api/http';
    import axios from 'axios'
    import md5 from 'js-md5'
    export default{
        data(){
            let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('原密码不能为空'));
                }
                setTimeout(() => {
                    // if (regExp.test(value) === false) {
                    if (!regExp.test(value)) {
                        callback(new Error('字母+数字组成，最低不能低于6位数'))
                    } else {
                        // if (value.length < 6) {
                        //     callback(new Error('不能低于6位'))
                        // } else {
                            callback()
                        // }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (!regExp.test(value)) {
                        callback(new Error('字母+数字组成，最低不能低于6位数'))
                    }else if(value === this.ruleForm.oldPass){
                        callback(new Error('新密码不能和旧密码一样'))
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                val:''
            }
        },
        methods:{
            inputBlur(){
                console.log(this.val)
            },
            sheBtn(){
                let params = {
                    user_id:getLStorage('user_id'),
                    // user_id:'M934755',
                    conCurrency:this.val
                }
                let URL = DATA_URL +'mwlive/user/updateConcurrency.do';
                $.ajax({
                    type : "POST",
                    timeout : 120000, //超时时间设置，单位毫秒
                    async : false,
                    url : URL,
                    data : params,
                    dataType : "json",
                    success : function(res) {
                        console.log(res)
                    }      
                })
            }
        },
        created(){
        }

    }
</script>

<style scoped>
.setIptVal{
    width: 49px;
    height: 28px;
    text-align: center;
}
.p5{
    color: #999;
    height: 26px;
}
.p6{
    margin-bottom: 20px;
}
.subFoot{
    text-align: center;
    padding-top: 85px;
}
.securitySet-main .fl.ml30{
    line-height: 28px;
    text-align:left;
}
.iconfont{
    font-size:60px;
}
.modifyPass{
    border:1px solid #E5E5E5;
    background-color: #F2F2F2;
    color:#4A4A4A;
    width:80px;
    font-size:14px;
    padding:0;
    margin-top: 23px;
}

.my_input{
    border:1px solid #D9D9D9;
    border-radius: 2px;
}
.securitySet .securitySet-main{
    /* border:1px solid #E5E5E5; */
    border-radius: 2px;
    height:120px;
    padding:20px 40px 20px 27px;
}
.securitySet .securitySet-main .img_icon{
    margin-top:8px;
}
.securitySet .securitySet-main  .ml30{
     margin-top:13px;
}
.my_list .info-content .securitySet .info-content{
    text-align: left;
}
.icon.iconfont.icon-mima:before{
    display: inline-block;
    width:66px;
    height: 66px;
    content: "";
    background: url(../../common/image/icon_lock.png) no-repeat;
}
</style>

