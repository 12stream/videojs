<template>
    <div class="register">
        <div class="login_middle">
            <el-row type="flex" class="row-bg" justify="center">
                <h3>
                    <login-head></login-head>
                </h3>
            </el-row>

            <div class="login_mode">
                <h3 class="look_title">注册</h3>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="12">
                        <div class="normal_in">
                            <i class="icon iconfont icon-yonghu"></i>
                            <input type="tel" v-model="formData.Phone" placeholder="手机">
                            <span class="register_prompt">{{regData.PhoneVal}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="12">
                        <div class="normal_in">
                            <i class="icon iconfont icon-mima"></i>
                            <input type="password" v-model="formData.password" placeholder="密码">
                            <span class="register_prompt">{{regData.passwordVal}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="12">
                        <div class="normal_in">
                            <i class="icon iconfont icon-mima"></i>
                            <input type="password" v-model="formData.ConfirmPassword" placeholder="确认密码">
                            <span class="register_prompt">{{regData.ConfirmPasswordVal}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg mb10" justify="center">
                    <el-col :span="12">
                        <div class="normal_in">
                            <i class="icon iconfont icon-yanzhengma"></i>
                            <input type="number" v-model.trim="formData.code" placeholder="动态密码">
                            <span class="register_prompt">{{regData.codedVal}}</span>
                            <p class="get_ma form-code">
                                <span class="cur-p" v-show="regData.show" @click="getCode(formData)">获取验证码</span>
                                <span class="col-666" v-show="!regData.show">{{regData.count + '秒再获取'}}</span>
                            </p>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="12">
                        <div class="clear">
                            <div  class="cur-p fl" >
                                <input type="checkbox">
                                <span class="register-link col-666">我已阅读并同意相关</span>
                            </div>
                            <!-- <router-link tag="div" class="cur-p fl" to="/modifyPassword"> -->
                                <span class="clause register-link fl col-666">服务条款</span>
                            <!-- </router-link> -->
                        </div>
                        
                    </el-col>
                </el-row>
                
                <el-row type="flex" class="row-bg mb10" justify="center">
                    <el-col :span="12">
                        <div class="login-sub but-col col-fff te-c cur-p" v-on:click="submit">确定</div>
                    </el-col>
                </el-row>
                <p class="regist">
                    <router-link tag="div" class="cur-p" to="/register">
                        <div class="clear">
                            <router-link tag="div" class="cur-p" to="/login">
                                已有帐号<span class="clause register-link col-666">，请登录</span>
                            </router-link>
                        </div>
                        
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginHead from 'components/header/loginHead'
    import {DATA_URL, ERR_OK} from 'api/config';
    import {filterObj} from 'api/http';
    import axios from 'axios'
    import md5 from 'js-md5'
    import http from 'api/http'

    const TIME_COUNT = 60;

    export default{
        data(){
            return {
                formData:{
                    Phone:'',
                    password:'',
                    ConfirmPassword:'',
                    code:''
                },
                regData:{
                    PhoneVal:'',
                    passwordVal:'',
                    ConfirmPasswordVal:'',
                    codedVal:'',
                    show : true,   //默认是停止的，但界面加载之后会变成false
                    count:'',
                    timer:null
                }
            }
        },
        created(){
            console.log(ERR_OK);
        },
        methods:{
            RegPhone(){
                if(!(/^[1][3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.formData.Phone))) {
                    this.regData.PhoneVal = '请输入正确的手机号码'
                    return false
                }else{
                    this.regData.PhoneVal = null
                    return true
                }
            },
            RegPassword(){
                console.log('RegPassword')
                if(!(/^([0-9]|[a-zA-Z]){6,16}$/.test(this.formData.password))){
                    this.regData.passwordVal = '请输入6-16位密码'
                    return false
                }else{
                    this.regData.passwordVal = null
                    return true
                }
            },
            RegConfirmPassword(){
                if(this.formData.ConfirmPassword !== this.formData.password){
                    this.regData.ConfirmPasswordVal = '两次密码不一致'
                    return
                }else{
                    this.regData.ConfirmPasswordVal = null
                    return true
                }
            },
            RegCode(){
                if(!(/^\d{5,6}$/.test(this.formData.code))){
                    this.regData.codedVal = '请输入6位数验证码'
                }else{
                    this.regData.codedVal = null
                    return true
                }
            },
            submit(){
                if(!this.RegPhone()) return
                if(!this.RegPassword()) return
                if(!this.RegConfirmPassword()) return
                if(!this.RegCode()) return
                console.log(md5(this.formData.password))
                // 提交注册
                axios.get(DATA_URL + 'mwlive/user/user_reg.do',{
                    params:{
                        mobile:this.formData.Phone,
                        password:md5(this.formData.password),
                        sm_code:this.formData.code,
                        pc:'1'
                    }
                }).then((response) => {
                    if(response.data.code == ERR_OK){
                        this.$message({
                            message: '注册成功！',
                            type: 'success'
                        });
                        console.log(response)
                        // 跳转
                        this.$router.push({
                            path:'/login'
                        })
                    }else{
                        alert('注册失败')
                        return false
                    }
                }).catch(function(err){
                    console.log(err);
                })
            },
            getCode(formData){
                if(!this.RegPhone()) return
                // 获取验证码
                let formdata = new FormData()
                formdata.append('mobile',this.formData.Phone)
                formdata.append('oper_time',this._getTime())
               // formdata.append('type',"MWSPY")
                axios({
                    method: 'post',
                    url: DATA_URL + 'mwlive/user/user_reg_getsm.do',
                    data: formdata
                }).then((response) => {
                    if(response.data.code == 410){
                        this.$message('手机号已存在，请更换一个手机号')
                        return false
                    }
                    if(response.data.code == ERR_OK){
                        console.log(response);
                    }else{
                        this.$message({
                            showClose: true,
                            message: '注册失败！',
                            type: 'warning'
                        });
                    }
                }).catch((err)=>{
                    console.log(err);
                })
                if (!this.regData.timer) {
                    this.regData.count = TIME_COUNT;
                    this.regData.show = false;
                    this.timer = setInterval(() => {
                        if (this.regData.count > 0 && this.regData.count <= TIME_COUNT) {
                            this.regData.count--;
                            console.log(this.count);
                        } else {
                            this.regData.show = true;
                            clearInterval(this.timer);
                            this.regData.timer = null;
                        }
                    }, 1000)
                }
            },
            _getTime(){
                var date = new Date();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + month + strDate
                        + date.getHours()  + date.getMinutes()
                        + date.getSeconds();
                return currentdate;
            }
        },
        computed:{
        },
        components:{
            LoginHead
        },
        destroyed() {
            clearInterval(this.timer)
        }
  }
</script>

<style scoped>
html,body{
    height: 100%
}
.register{
    /* position: absolute; */
    /* top: 50%;
    left: 50%;
    width:50%; */
    padding:20px;
    text-align:center;
    /* transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
       -moz-transform: translate(-50%, -50%);
         -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%); */
  
}

.form-code{
    line-height: 46px;
}
.login-sub{
    font-size: 16px;
    width: 98%;
    height: 46px;
    line-height: 46px;
    margin-top:20px; 
}
.regist {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 68px;
    line-height: 68px;
    text-align: center;
    background-color: #f1f2f4;
    color: #000000;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}
.regist span {
    font-size: 12px;
}


.login_mode{
    padding: 24px 24px 0 24px;
    background-color: #ffffff;
    border-radius: 6px;
    height: 500px;
    box-shadow: 0px 0px 5px #b8b8b8;
    position: relative;
}
.login_middle {
    width: 410px;
    height: auto;
    /* position: absolute; */
    /* top: 50%; */
    /* margin-top: 187px; */
    /* left: 50%; */
  
}
.normal_in {
    width: 100%;
    /* height: 40px; */
    border: 1px solid #dddddd;
    /* margin-top: 25px; */
    position: relative;
}
.normal_in i {
    display: inline-block;
    width: 45px;
    height: 100%;
    line-height: 40px;
    border-right: 1px solid #dddddd;
    text-align: center;
    position: absolute;
    z-index: 1;
    left: 0;
}
.normal_in input {
    position: absolute;
    top: 0;
    left: 60px;
    width: 250px;
    height: 38px;
    border: none;
    line-height: 40px;
    float: right;
    outline: none;
    font-size: 14px;
    letter-spacing: 2px;
    font-family: "Arial";
    color: #666;
}
.normal_in .register_prompt{
    position:absolute;
    top:48px;
    left:18px;
    color:#ff3c3c;
}
.get_ma {
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: #00b0fe;
    color: #ffffff;
    font-size: 14px;
    position: absolute;
    right: 3px;
    top: 4px;
    border: none;
    letter-spacing: 2px;
    cursor: pointer;
}
.cur-p input{
    vertical-align: middle;
    margin-top: 0px;
}
.clause{
    color: #00b0fe
}
.register-link{
    font-size: 14px;
}
.look_title{
    font-size: 18px;
    color: #333333;
    text-align: center;
    height: 40px;
    font-weight: 600;
    display: inline-block;
}

</style>
<<style>
.login_mode .el-col-12{
    width:86%;
}
</style>
