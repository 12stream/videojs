<template>
    <div class="register pass_word">
        <bg-head></bg-head>
        <div class="login_middle">
            <el-row type="flex" class="row-bg" justify="center">
                <h3>
                    <login-head></login-head>
                </h3>
            </el-row>

            <div class="login_mode">
                <h3 class="look_title">找回密码</h3>
                <router-link tag="div" class="cur-p in_text posi_ab" to="/login">
                    已有账号，<span class="register-link col-666">马上登录</span>
                </router-link>
               

            <!-- <el-row style="width:400px">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="isModifyPass = true">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-row> -->

            <el-form :model="formData" :rules="rules" ref="formData" class="demo-ruleForm">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="Phone">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/administer.png" alt=""></i> -->
                                <el-input :maxlength="11" type="tel" v-model="formData.Phone" auto-complete="off" placeholder="请输入手机号"></el-input>
                                <!-- <input type="tel" v-model="formData.Phone" placeholder="手机">
                                <span class="register_prompt">{{regData.PhoneVal}}</span> -->
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="password">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/code.png" alt=""></i> -->
                                <el-input :maxlength="16" type="password" v-model="formData.password" auto-complete="off" placeholder="请输入密码"></el-input>
                                <!-- <input type="password" v-model="formData.password" placeholder="密码"> -->
                            </el-form-item>
                            <!-- <span class="register_prompt">{{regData.passwordVal}}</span> -->
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="ConfirmPassword">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/code.png" alt=""></i> -->
                                <el-input  :maxlength="16" type="password" v-model="formData.ConfirmPassword" auto-complete="off" placeholder="请再次输入密码"></el-input>
                                <!-- <input type="password" v-model="formData.password" placeholder="密码"> -->
                            </el-form-item>
                            <!-- <i class="icon iconfont icon-mima"></i>
                            <input type="password" v-model="formData.ConfirmPassword" placeholder="确认密码">
                            <span class="register_prompt">{{regData.ConfirmPasswordVal}}</span> -->
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg mb10" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="code" class="yzm_box">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/yanzhengma.png" alt=""></i> -->
                                <el-input :maxlength="5" type="tel" v-model="formData.code" auto-complete="off" placeholder="请输入手机验证码"></el-input>
                                <p class="get_ma form-code">
                                    <span class="cur-p" v-show="regData.show" @click="getCode">获取验证码</span>
                                    <span class="col-666" v-show="!regData.show">{{regData.count + '秒后重新获取'}}</span>
                                </p>
                            </el-form-item>

                            <!-- <i class="icon iconfont icon-yanzhengma"></i>
                            <input type="number" v-model.trim="formData.code" placeholder="动态密码">
                            <span class="register_prompt">{{regData.codedVal}}</span>
                            <p class="get_ma form-code">
                                <span class="cur-p" v-show="regData.show" @click="getCode(formData)">获取验证码</span>
                                <span class="col-666" v-show="!regData.show">{{regData.count + '秒再获取'}}</span>
                            </p> -->
                        </div>
                    </el-col>
                </el-row>
                
                <el-row type="flex" class="row-bg mb10" justify="center">
                    <el-col>
                        <div class="login-sub but-col col-fff te-c cur-p" @click="submitForm('formData')">完成</div>
                        <!-- <div class="login-sub but-col col-fff te-c cur-p" v-on:click="submit">确定</div> -->
                    </el-col>
                </el-row>
                <!-- <p class="regist">
                    <router-link tag="div" class="cur-p" to="/login">
                        已有账号，<span class="register-link col-666">请登录</span>
                    </router-link>
                </p> -->
            </el-form>
            </div>
        </div>
        <m-footer></m-footer>
    </div>
</template>

<script>
    import BgHead from 'components/header/bgHead'
    import LoginHead from 'components/header/loginHead'
    import {DATA_URL, ERR_OK} from 'api/config'
    import {getNewTime} from 'api/http'
    import axios from 'axios'
    import md5 from 'js-md5'
    import mFooter from 'components/header/footer'
    
    const TIME_COUNT = 60;

    export default{
        data(){
            let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
            var checkAge = (rule, value, callback) => {
                let PhoneExp = /^[18][34567890]\d{9}$/
                if (!value) {
                    return callback(new Error('手机不能为空'));
                }
                setTimeout(() => {
                    if (!PhoneExp.test(value)) {
                        callback(new Error('请输入正确的手机号码'))
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
                    callback(new Error('请输入密码'));
                } else {
                    if (!regExp.test(value)) {
                        callback(new Error('字母+数字组成，长度为6~16位'))
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.formData.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                let codeNumber = /^\d{5,6}$/
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if (!codeNumber.test(value)) {
                        callback(new Error('请输入正确的验证码!'));
                    }
                    callback();
                }
            };
            return {
                // ruleForm: {
                //     Phone: '',
                //     password: '',
                //     ConfirmPassword: '',
                //     code:''
                // },
                rules: {
                    Phone: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    ConfirmPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    code:[
                        { validator: validateCode, trigger: 'blur' }
                    ]
                },
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.get(DATA_URL + 'mwlive/user/user_edit_pw.do',{
                            params:{
                                mobile:this.formData.Phone,
                                password:md5(this.formData.password),
                                sm_code:this.formData.code
                            }
                        }).then((response) => {
                            if(response.data.code == ERR_OK){
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                })
                                console.log(response)
                                // 跳转
                                this.$router.push({
                                    path:'/login'
                                })
                            }else if(response.data.code == 410){
                                this.$message({
                                    message: '验证码错误！',
                                    type: 'error'
                                })
                                return false
                            }else{
                                this.$message({
                                    message: '修改失败',
                                    type: 'error'
                                })
                                return false
                            }
                        }).catch(function(err){
                            console.log(err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
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
                        this.$message({
                            message: '注册失败',
                            type: 'error'
                        });
                        return false
                    }
                }).catch(function(err){
                    console.log(err);
                })
            },
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
            getCode(){
                let PhoneExp = /^[18][34567890]\d{9}$/
                if(this.formData.Phone == '' || !PhoneExp.test(this.formData.Phone)){
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机！',
                        type: 'error'
                    });
                    return false
                }
                // 获取验证码
                let newTime = getNewTime()
                var data = {
                    mobile:this.formData.Phone,
                    oper_time:newTime,
                    // type:"MWSPY"
                }
                axios({
                    method: 'post',
                    url: DATA_URL + 'mwlive/user/user_edit_getpwsm.do',
                    params: data,
                    headers: {
                        "Content-Type":"application/json;charset=utf-8"
                    }
                })
                .then((response)=>{
                    if(response.data.code == ERR_OK){
                        this.$message('发送成功')
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
                    }else if(response.data.code == 410){
                        this.$message({
                            showClose: true,
                            message: '不存在该用户！',
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '获取失败！',
                            type: 'warning'
                        });
                        return false
                    }
                }).catch((err)=>{
                    console.log('err');
                })                      
            },
        },
        computed:{
        },
        components:{
            LoginHead,
            BgHead,
            mFooter
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
    /* position: fixed;
    top: 0%;
    left: 0%;
    width:100%;
    height: 100%;
    padding:0px;
    text-align:center; */
    padding: 0;
    /* position: absolute;
    left:0;
    top:0; */
    width: 100%;
    height:100%;
    overflow: hidden;
    /* background: url("http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/body_bg.jpg") no-repeat center; */
    background-attachment: fixed;
    background-size: cover;
    font-family: "PingFangSC";
     /* min-height: 700px; */
   

}
.register{
    padding: 0;
    left:0;
    top:0;
    width: 100%;
    height:100%;
    text-align: center;

}
.login_middle {
    width: 430px;
    height: auto;
    margin:0 auto;
    /* margin:187px auto 0 auto; */
    /* position: absolute;
    top: 187px;
    left: 50%; */
    /* transform:translate(-50%,0%);
    -ms-transform:translate(-50%,0%); 
    -moz-transform:translate(-50%,0%); 	
    -webkit-transform:translate(-50%,0%); 
    -o-transform:translate(-50%,0%); 	 */
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
.normal_in i img{
    vertical-align: middle;
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
.cur-p input{
    vertical-align: middle;
    margin-top: 0px;
}
.clause{
    color: #00b0fe
}
.register-link{
    font-size: 12px;
    color: #2B6CFF;
}
.look_title{
    font-size: 18px;
    color: #333333;
    text-align: center;
    height: 40px;
    font-weight: 600;
    display: inline-block;
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
.in_text{
    display: inline-block;
    padding-left:17px;
}
.posi_ab{
    position: absolute;
    right: 53px;
    top:44px;
    font-size: 12px;
    color:#C1C1C1;
}
.pass_word .login_mode{
    text-align: center;
    margin:0 auto;
}
</style>
<style>
.login_mode .el-col-12{
    width:86%;
}

</style>
