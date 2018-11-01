<template>
    <div class="my_list securitySet">
        <div class="live-top bg-fff">企业域名接入</div>
        <!--  v-show="flag == 'qiyequanxian'" -->
        <div class="bg-fff col-333 info-content" v-show="flag == 'qiyequanxian'">
            <div class="domainSearch" style="position:relative;">
                <el-form :model="enterprise" :rules="rules2" ref="enterprise" :inline='true'>
                    <el-form-item prop="name">
                        <el-input v-bind:disabled="inp" placeholder="输入已备案域名" style="width: 250px;" v-model="enterprise.name">
                            <!-- <el-button slot="append" icon="search" @click="applay()">申请</el-button> -->
                            <!-- <el-button slot="append" icon="search" @click="applay()">更改</el-button>
                            <el-button slot="append" icon="search" @click="applay()">取消</el-button> -->
                        </el-input>
                        <div class="ymBtn">
                            <el-button slot="append" icon="search" type="primary" v-if="applyStatus.apply" @click="applay('enterprise')">申请</el-button>
                            <el-button  type="info"   v-if="applyStatus.applyOk" disabled >申请中...</el-button>
                            <el-button slot="append" icon="search" type="primary" v-if="applyStatus.edit "  @click="updataQiye()">修改</el-button>
                            <el-button slot="append" icon="search" type="primary" v-if="applyStatus.calcel"  @click="calcel_btn()">取消</el-button>
                            <el-button v-if="applyStatus.closeBtn"  @click="comitClose()">关闭</el-button>
                            <el-button v-if="applyStatus.open" type="primary"  @click="open()">开启</el-button>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item prop="website">
                        <el-input v-bind:disabled="inp" placeholder="www.baidu.com" style="width:250px;" v-model="enterprise.website"></el-input>
                    </el-form-item> -->
                </el-form>
                
                
                <!-- <el-switch
                    
                    class="my_switch"
                    v-model="val"
                    active-color="#13ce66"
                    inactive-color="#eee" 
                    active-text="正常"
                    inactive-text="关闭"
                    :width="60"
                    @change="switChang()"
                    style="position:absolute;right:75px;top:10px;">
                </el-switch> -->
                
            </div>
            <p class="tishi">
                温馨提示：<br>
                1、企业用户先申请域名与备案，然后将相关域名，交付开发人员，开发人员可以将域名的主体设置为企业用户指定的域名。<br>
                2、更换域名需要1-3个工作日后生效。
            </p>
            <p>
                <a href="https://shimo.im/docs/md3OGyQK88Er4lnu/" style="color:blue;" target="_blank" rel="nofollow">如何设置企业域名</a>
            </p>
        </div>
        <!-- 关闭弹窗 -->
        <el-dialog
            class="domain"
            title="提示"
            :visible.sync="domainOk"
            width="410px"
            style="margin-top:100px;"
            center>
            <p style="margin-bottom:27px;">确定关闭企业域名定制？</p>
            <div  class="dialog-footer">
                <el-button type="primary" @click="closedomain">确定</el-button>
                <el-button type="info" @click="domainOk=false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 没权限 -->
        <!--  v-show="flag=='noqiyequanxian'" -->
        <div class="bg-fff " v-show="flag=='noqiyequanxian'">
            <el-row class="box">
                <el-col :span="6">
                    <el-button style="margin-bottom:40px;" type="primary" @click="chatWith">商务洽谈</el-button>
                    <div class="Tips3">
                        <p class="Tipp2">温馨提示：</p>
                        <p class="Tipp2">可根据您的需要定制专属域名，</p>
                        <p class="Tipp2">  在微信H5端观看视频时，</p>
                        <p class="Tipp2" style="margin-bottom:32px;">  下拉即可出现企业专属域名。</p>
                        <p class="Tipp2">  如需该需求，请点击商务洽谈</p> 
                    </div>
                </el-col>
                <el-col :span="18" class="exampleImg" style="position:relative;padding-left:15px;">
                    <p style="position: absolute;left: 51px;top: 1px;color: #9b9b9b;">示意图:</p>
                    <img width="46%" src="../../common/image/qiyeimg.png"/>
                    <img width="46%" src="../../common/image/qiyeimg2.png" alt="">
                </el-col>
            </el-row>
        </div>
        <el-dialog
            title="商务洽谈"
            class="shareToFriend"
             :visible.sync="centerDialogVisible"
            width="30%">
            <hr/>
            <b>请将您的需求留言给我们</b>
            <p class="Tips1">1.提交您的需求信息，商务将在24小时内与您联系</p>
            <p class="Tips1">2.致邮：yeepo_sales@facebac.com</p>
            <el-form :model="formData" :rules="rules" ref="formData">
                <p class="Tips2"><i>*</i>您的称呼</p>
                <el-form-item prop="userName">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <p class="Tips2"><i>*</i>您的手机号码</p>
                <el-form-item prop="userTel">
                    <el-input  v-model="formData.userTel"></el-input>
                </el-form-item>
                <p class="Tips2">需求留言</p>
                <el-input type="textarea" id="message" v-model="userMessage"></el-input>
                <hr/>
                <el-button style="margin-left: 45%;" type="primary" @click="submitForm('formData')">提交</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { setCookie, getCookie, removeCookie,getCookies,DATA_URL,getLStorage, facebac_URL } from "../../api/config";
import axios from "axios";
export default {
  name: '',
  data(){
       let PhoneExp = /^[18][34567890]\d{9}$/;
        var checkName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error("请输入您的称呼"));
        } else {
            callback();
        }
        };
        var checkPhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error("请输入您的手机号码"));
        } else if (!PhoneExp.test(value)) {
            return callback(new Error("请输入正确的手机号码"));
        } else {
            callback();
        }
        };
        //企业域名验证
        var enterName = (rule,value,callback)=>{
            // let re =  /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
            // let re =  /^[http:\/\/A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
            let re = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
            if (value =='' || value  == null || value == undefined || !value) {
                return callback(new Error('请输入您的域名信息'))
            }else if (re.test(value)) {
                callback()
            }else{
                return callback(new Error('请检查下您输入的格式是否正确'))
            }
        }
        var enterWebsite = (rule,value,cb)=>{
            console.log('验证企业域名')
        }
      return {
        domainOk:false,
        ruleForm: {
              user_id:'',
              money: '',
              resource: ''
        },
        val:'',
        applyStatus:{
            apply:'',
            applyOk:'',
            edit:'',
            calcel:'',
            closeBtn:'',
            open:''
        },
        hasName:'',
        flag:'',
        // btnFlag:'',
        // btnFlagApply:'',
        userMessage:'',
        inp:false,
        formData: {
            userName: getLStorage("admin"),
            userTel: getLStorage("mobile")
        },
        centerDialogVisible:false,
        rules: {
            userName: [{ validator: checkName, trigger: "blur" }],
            userTel: [{ validator: checkPhone, trigger: "blur" }]
        },
        enterprise:{
            name:'',
            website:''
        },
        rules2:{
            name: [{ validator: enterName, trigger: "blur" }],
            website: [{ validator: enterWebsite, trigger: "blur" }]
        },
        off:''
      }
  },
    created(){
        this.getKey();
        // this.permissingQuery();
    },
    methods:{
        comitClose(){
            this.domainOk = true;
        },
        closedomain(){
            this.close_btn();
        },
        applay(name){
            this.$refs[name].validate(valid=>{
                if (valid) {
                    if (this.hasName) {
                        //修改提交
                        let us_id = getLStorage('user_id');
                        let forData = new FormData();
                        let url = DATA_URL + 'mwlive/user/updateDominioInfo.do';
                        forData.append('user_id',us_id);
                        forData.append('dominio_info',this.enterprise.name);
                        forData.append('dominio_name',this.enterprise.website)
                        axios({
                            method:'POST',
                            url:url,
                            data:forData
                        }).then((res)=>{
                            if (res.data.code == 200 ) {
                                this.applyStatus.apply = false;
                                this.applyStatus.applyOk = true;
                                this.applyStatus.calcel = false;
                                this.inp = true;
                                this.$alert('您的申请已提交，商务将会在三个工作日内协助您进行开通服务。', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {

                                    }
                                });
                            }else{
                                this.$alert(res.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        /*this.$message({
                                            type: 'info',
                                            message: `action: ${ action }`
                                        });*/
                                    }
                                });
                            }
                            console.log(res)
                        })
                    }else{
                            //新增
                            let us_id = getLStorage('user_id');
                            let forData = new FormData();
                            let url = DATA_URL + 'mwlive/user/addDominioInfo.do';
                            forData.append('user_id',us_id);
                            forData.append('dominio_info',this.enterprise.name);
                            forData.append('dominio_name',this.enterprise.website)
                            axios({
                                method:'POST',
                                url:url,
                                data:forData
                            }).then((res)=>{
                                if (res.data.code == 200 ) {
                                    this.applyStatus.apply = false;
                                    this.applyStatus.applyOk = true;
                                    this.inp = true;
                                    this.$alert('您的申请已提交，商务将会在三个工作日内协助您进行开通服务。', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {

                                        }
                                    });
                                }else{
                                    this.$alert(res.data.msg, '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            /*this.$message({
                                                type: 'info',
                                                message: `action: ${ action }`
                                            });*/
                                        }
                                    });
                                }
                                console.log(res)
                            })
                    }
                    
                }
            })
            
            
        },
        submitForm(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                var url = DATA_URL + "mwlive/user/addBusinessService.do";
                let formdata = new FormData();
                formdata.append("user_id", getLStorage("user_id"));
                formdata.append("user_name", this.formData.userName);
                formdata.append("mobile", this.formData.userTel);
                formdata.append("service_source", "portal后台-企业域名");
                formdata.append("demand_mess", this.userMessage);
                axios({
                    method: "post",
                    url: url,
                    data: formdata
                })
                    .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.formData.userName = "";
                        this.formData.userTel = "";
                        this.userMessage = "";
                        this.$message({
                        showClose: true,
                        type: "success",
                        message: "感谢您的留言"
                        });
                        this.centerDialogVisible = false;
                        // this.flag++;
                    } else {
                        this.$message({
                        showClose: true,
                        type: "error",
                        message: "留言失败" + res
                        });
                    }
                    })
                    .catch(err => {
                    console.log(err);
                    });
                } else {
                console.log("error submit!!");
                return false;
                }
            });
        },
        chatWith(){
            this.centerDialogVisible=true;
        },
        closeName(){

        },
        getKey(){
            this.$nextTick(()=>{
                var url = DATA_URL + "mwlive/user/selectUserSpecialServiceByID.do";
                let formdata = new FormData();
                formdata.append("user_id", getLStorage("user_id"));
                formdata.append("type", "5");
                axios({
                    method: "post",
                    url: url,
                    data: formdata
                })
                    .then(res=>{
                    if (res.status == 200) {
                        if(res.data.data!=null&&res.data.data!=""&&res.data.data.length>0){
                            var timestamp = Date.parse(new Date());
                            timestamp = timestamp / 1000;
                            console.log(res.data.data[0].end_time/1000,Number(timestamp)>0);
                            if(res.data.data[0].end_time==0||res.data.data[0].end_time/1000-Number(timestamp)/1000>0){
                                this.flag = 'qiyequanxian'; //开通增值服务
                            }
                        }else{
                            this.flag = 'noqiyequanxian' //未开通增值服务
                            //this.flag = 'qiyequanxian';
                        }
                        // this.centerDialogVisible = false;
                    } else {
                        this.$message({
                        showClose: true,
                        type: "error",
                        message: "获取授权权限失败：" + res
                        });
                    }
                })

                //查看有没有域名
                let that = this;
                // var _url = DATA_URL + "mwlive/user/selectDominioInfoByUserid.do";
                var params ={user_id: getLStorage('user_id')} ;
                $.ajax({
                    type: "POST",
                    timeout: 120000, //超时时间设置，单位毫秒
                    async: true,
                    url: DATA_URL + "mwlive/user/selectDominioInfoByUserid.do",
                    data: params,
                    dataType: "json",
                    success: function(res) {
                        console.log(res);
                        if (res.data != null && res.data != '' ) {
                            let timestamp = Date.parse(new Date());
                            timestamp = timestamp / 1000;
                            if(res.data.end_time==0||res.data.end_time/1000-Number(timestamp)/1000>0){
                                //that.btnFlag = 'xiugai'  //有域名了，修改
                                that.off = res.data.dominio_status;
                                that.hasName = true;
                                that.enterprise.name = res.data.dominio_info;
                                if (that.off == 0) {
                                    if (res.data.audit_status == 1) {
                                        //待确认
                                        that.inp = true;
                                        that.applyStatus.applyOk = true;
                                        that.applyStatus.apply = false;
                                    }
                                    if (res.data.audit_status == 2) {
                                        //已确认
                                        that.applyStatus.edit = true;
                                        that.applyStatus.closeBtn = true;
                                        that.applyStatus.calcel = false;
                                        that.inp = true;
                                        that.applyStatus.applyOk = false;
                                        that.applyStatus.apply = false;
                                    }
                                    if (res.data.audit_status == 3) {
                                        that.applyStatus.apply = true;
                                    }
                                }else{  
                                        that.inp = true;
                                        // that.applyStatus.apply = true;
                                        that.applyStatus.open = true;
                                }
                            }
                        }else{
                            //that.btnFlag = 'shenqing'; //没有域名，要申请
                            that.applyStatus.apply = true;
                        }
                    }
                })
            })
            
        },
        updataQiye(){
            this.inp = false;
            this.applyStatus.apply = true;
            this.applyStatus.closeBtn = false;
            this.applyStatus.edit = false;
            this.applyStatus.calcel = true;
        },
        calcel_btn(){
            this.inp = true;
            this.applyStatus.closeBtn = true;
            this.applyStatus.apply = false;
            this.applyStatus.edit = true;
            this.applyStatus.calcel = false;
        },
        close_btn(){
            let that = this;
            // let off = '';
            // if (this.off == 0) {
            //     off = 1
            // }else{
            //     off = 0;
            // }
            let off = this.off ==1 ? 0 : 1;
            let params = {
                user_id:getLStorage('user_id'),
                dominio_status:off
            }
            $.ajax({
                    type: "POST",
                    timeout: 120000, //超时时间设置，单位毫秒
                    async: true,
                    url: DATA_URL + "mwlive/user/dominioStatusOpenOrShut.do",
                    data: params,
                    dataType: "json",
                    success: function(res) {
                        if (res.code == 200) {
                            that.applyStatus.applyOk = false;
                            that.applyStatus.closeBtn = false;
                            that.applyStatus.edit = false;
                            that.inp = true;
                            that.applyStatus.open = true
                            that.off = 1;
                        }
                    }
                })
        },
        open(){
            let that = this;
            let off = this.off ==1 ? 0 : 1;
            let params = {
                user_id:getLStorage('user_id'),
                dominio_status:off
            }
            $.ajax({
                    type: "POST",
                    timeout: 120000, //超时时间设置，单位毫秒
                    async: true,
                    url: DATA_URL + "mwlive/user/dominioStatusOpenOrShut.do",
                    data: params,
                    dataType: "json",
                    success: function(res) {
                        if (res.code == 200) {
                            that.applyStatus.applyOk = false;
                            that.applyStatus.edit = true;
                            that.inp = true;
                            that.applyStatus.closeBtn = false;
                            that.applyStatus.open = false;
                            that.applyStatus.calcel = true;
                            that.off = 0;
                            that.$alert('开启成功！', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {

                                    }
                                });
                        }
                    }
            })
        }


    },
    mounted(){
        
    }
}
</script>
<style scoped>
.mylist {
  height: 760px;
  background: #fff;
}
.el-switch  .el-switch__label{
    background: red;
}
.el-switch  .el-switch__core:after{
    top: 5px !important;
}
.box{
    position: relative;
}
.Tipp1{
    color: #333333;
    font-weight: 600;
}
.Tipp2{
    color: #9b9b9b;
    /* margin-bottom: 40px; */
    text-align: left;
    line-height: 26px;
}
.tishi {
    margin-top: 10px;
    line-height: 28px;
    color: #9B9B9B;
}
.posiX{
    position: absolute;
    bottom: 71px;
    right: 84px;
    text-align: center;
}
.ymBtn{
    display: inline-block;
}
</style>
<style>
.domain .el-dialog--center .el-dialog__body{
    text-align: center ;
}
</style>


