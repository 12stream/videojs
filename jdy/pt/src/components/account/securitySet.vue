<template>
    <div class="my_list securitySet">
        <div class="live-top">安全设置</div>
        <div class="bg-fff col-333 info-content">
            <el-row class="clear pd20 securitySet-main">
                <div class="fl img_icon"><span class="icon iconfont icon-mima default-color"></span></div>
                <div class="fl ml30">
                    <div style="font-size:16px;color:#4A4A4A;">登录密码</div>
                    <p style="color:#9B9B9B;font-size:12px;margin-top:-5px;">密码用于登录操作时，验证您的身份</p>
                </div>
                <div class="fr">
                     <el-button class="btn modifyPass  btn_32" @click="dialogVisible = true ">修改密码</el-button>
                </div>
            </el-row>

            <el-dialog
            class="my_dialog"
            title="修改密码"
            :visible.sync="dialogVisible"
            :show-close="false"
            width="430px">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
                    <el-form-item label="原密码：" prop="oldPass" class="int_320">
                        <el-input  type="password" v-model.number="ruleForm.oldPass"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="pass" class="int_320" >
                        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="checkPass" class="int_320" >
                        <el-input  type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </el-dialog>


            <!-- <el-row style="width:400px">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldPass">
                        <el-input type="password" v-model.number="ruleForm.oldPass"></el-input>
                    </el-form-item>
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
        </div>
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
                dialogVisible: false,
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    oldPass: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    oldPass: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = DATA_URL + 'mwlive/user/user_pass_check.do'
                    let formdata = new FormData()
                    formdata.append('mobile',getLStorage('mobile'))
                    formdata.append('password',md5(this.ruleForm.oldPass))
                    axios({
                        method: 'post',
                        url: url,
                        data:formdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then((res) => {
                        if(res.data.code == ERR_OK){
                            let rid = res.data.data
                            let url = DATA_URL + 'mwlive/user/user_pass_update.do'
                            let formdata = new FormData()
                            formdata.append('rid',rid)
                            formdata.append('password',md5(this.ruleForm.pass))
                            axios({
                                method: 'post',
                                url: url,
                                data:formdata,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res) => {
                                console.log(res)
                                if(res.data.code == ERR_OK){
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    })
                                    this.dialogVisible = false
                                }else{
                                    this.$message({
                                        type: 'info',
                                        message: '修改失败'
                                    });
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        }else{
                            this.$message({
                                type: 'info',
                                message: '旧密码不正确'
                            });
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        }

    }
</script>

<style scoped>
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
    border:1px solid #E5E5E5;
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
.demo-ruleForm  .el-input{
    width: 90%;
}
</style>
<style>
.securitySet .my_dialog .int_320{
    width:305px;
}
</style>

