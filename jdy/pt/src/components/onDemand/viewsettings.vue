<template>
    <div class="viewsettings my_section" style="min-height:680px;">
        <div class="pd10 live-top">观看授权设置</div>
        <div class="mt20" style="margin-top:60px;">
            <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm">
                <el-form-item label="授权类型:" prop="live_permit" class="souquan_way">
                    <el-radio-group v-model="form.live_permit" @change="radioChage('form')">
                        <el-radio class="radio footnote" border v-model="form.live_permit" label="0" >免费</el-radio>
                        <el-radio class="radio footnote" border v-model="form.live_permit" label="1">加密</el-radio>
                        <el-radio class="radio footnote" border v-model="form.live_permit" label="2">付费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="typeVal1" label="观看密码:" placeholder="请输入6位数密码" prop="view_pass1" class="zidingyi_pwd clear my_bot30">
                    <el-input v-model="view_pass1" class="fl"></el-input>
                </el-form-item>
                <el-form-item v-if="typeVal2" label="付费金额:" placeholder="请输入付费金额" prop="view_pass2" class="zidingyi_pwd clear my_bot30" >
                    <el-input v-model="view_pass2" class="fl"></el-input>
                </el-form-item>
                <el-form-item v-if="typeVal4" label="专属名单:" placeholder="请导入白名单"  prop="fileXls" class="zidingyi_pwd clear my_bot30">
                    <span class="green_txt" v-if="fileName">{{fileName}}</span>
                    <span class="green_txt" v-show="isWhite">手机号白名单</span>
                    <el-upload
                        style="display: inline-block;"
                        class="cur-p"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="changeXls"
                        accept=".xls, .xlsx"
                        v-model="fileXls"
                        >
                        <el-button type="info" class="file_btn">导入</el-button>
                    </el-upload>
                    <span class="txt_blue cur-p">
                        <a  class="" href="http://mwdatatest.facebac.com/white/white.xls">下载模板</a>
                    </span>
                    <!-- <div class="words-style fl"><span>0</span>/20</div> -->
                </el-form-item>

                <el-form-item v-if="typeVal3" label="门票:"  placeholder="请输入门票数量"   prop="ticketsNum" class="my_bot30">
                    <el-input v-model="ticketsNum" :maxlength="5"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button style="width: 196px;" type="primary" @click="submitForm('form')">提交</el-button><!--btn_40-->
                </el-form-item>
                <el-form-item v-show="xlsTip&&form.live_permit=='4'">
                    <p style="width:300px;text-align:center;">
                        <span class="default-color">观看权限修改成功，请前往</span>
                        <router-link tag="div" to="/liveControl/whiteList" style="display:inline-block;" class="col_4FF cur-p">名单管理</router-link>
                        <span class="default-color">查看</span>
                    </p>
                </el-form-item>
                <el-form-item v-show="ticketsTip&&form.live_permit=='3'">
                    <p style="width:300px;text-align:center;">
                        <span class="default-color">观看权限修改成功，请前往</span>
                        <router-link tag="div" to="/liveControl/ticketsList" style="display:inline-block;" class="col_4FF cur-p">门票管理</router-link>
                        <span class="default-color">查看</span>
                    </p>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK,DATA_URL,GIFT_URL,getLStorage} from 'api/config'
    import {filterObj} from 'api/http'
    export default{
        data() {
            // let validatePass = (rule, value, callback) => {
            //     if (this.regionMode && value === '') {
            //         callback(new Error('请输直播间密码'))
            //     }
            //     setTimeout(() => {
            //         let regExp = /^\d{6}$/
            //         if (this.regionMode && regExp.test(value) === false) {
            //             callback(new Error('6位数字组成'))
            //         } else {
            //             if (this.form.view_pass !== '') {
            //                 this.$refs.form.validateField('view_pass')
            //             }
            //             callback()
            //         }
            //     }, 1000);
            // }

            var validatePass = (rule, value, callback) => {
                let codeNumber = /^\d{6}$/
                if (!this.view_pass1) {
                    callback(new Error('请输入6位数字密码'))
                } else {
                    if (!codeNumber.test(this.view_pass1)) {
                        callback(new Error('请输入6位数字密码'))
                    }
                    callback()
                }
            }
            var validatePass2 = (rule, value, callback) => {
                let codeNumber = /^[0-9]+$/
                if (!this.view_pass2) {
                    callback(new Error('请输入整数的金额'))
                } else {
                    /*if (this.view_pass2 > 5000 || this.view_pass2 < 1) {
                        return callback(new Error('付费金额只支持数字，最小为1，最大为5000，不支持小数点'))
                    }*/
                  var money = this.view_pass2;
                  let MoneyExps = /^[0-9]+([.]{1}[0-9]{1})?$/;
                  if (!MoneyExps.test(money) || money <= 0 || money > 5000) {
                    return callback(new Error("付费金额只支持数字，最小为0.1，最大为5000"));
                  }
                    /*if (!codeNumber.test(this.view_pass2)) {
                        callback(new Error('付费金额只支持数字，最小为1，最大为5000，不支持小数点'))
                    }*/
                    callback()
                }
            }
            var valTicketsNum = (rule, value, callback) => {
                // 查询实名
                 if (!this.ticketsNum) {
                    return callback(new Error('请输入门票数量'))
                }else if(this.ticketsNum>100){
                    let numberLimit
                    axios.get(DATA_URL + 'mwlive/user/user_qualify_cx.do',{
                        params:{
                            userId:getLStorage('user_id')
                        }
                    }).then((response) => {
                        // 实名成功
                        if(response.data.data.qualify==3){
                            numberLimit = 1000
                        }else{
                            numberLimit = 100
                        }
                        if (this.ticketsNum > numberLimit ) {
                        return callback(new Error('请输入门票数量范围1-'+ numberLimit))
                        }
                    }).catch(function(err){
                        console.log(err)
                    })

                }

                setTimeout(() => {
                    let numberExp =  /^[0-9]+$/
                    if (!numberExp.test(this.ticketsNum)) {
                        callback(new Error('请输入数字'))
                    } else {
                        this.disabled = false
                        callback()
                    }
                }, 1000);
            };
            var validateFileXls = (rule, value, callback) => {
                if (!this.fileXls&&!this.isWhite) {
                    this.white_list = false
                    return callback(new Error('请导入白名单'))
                }
                setTimeout(() => {
                    callback()
                }, 1000);
            };
            return {
                islive:'',
                typeVal1:false,
                typeVal2:false,
                typeVal3:false,
                typeVal4:false,
                form: {
                    live_permit: '',
                },
                view_pass1: '',
                view_pass2: '',
                ticketsNum: '',
                file:'',
                fileXls:'',
                fileName: '',
                xlsInput:'',
                isWhite:'',
                xlsTip:'',
                ticketsTip:'',
                isWlTip:false,
                rules: {
                    // live_permit_text: [
                    //     { required: true, message: '请输入提示文字', trigger: 'blur' },
                    //     { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                    // ],
                    live_permit: [
                        {message: '请输入选择授权类型', trigger: 'change' }
                    ],
                    view_pass1: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    view_pass2: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    fileXls:[
                        {validator:validateFileXls, trigger: 'blur' }
                    ],
                    ticketsNum:[
                         {validator:valTicketsNum, trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            this.getVodInfo();
//            this._getData()
        },
        methods: {
            //获取点播详情
            getVodInfo(){
              this.$ajaxs.getVodInfo({id:getLStorage("defRoomId")}).then(res => {
                this.form.live_permit =  res.data.vodPermit;
                  if(this.form.live_permit == 1){
                      this.form.live_permit = '1';
                      this.typeVal1 = true
                      this.view_pass1 = res.data.viewPass;
                  }else if(this.form.live_permit == 0){
                     this.form.live_permit = '0';
                  }else if(this.form.live_permit == 2){
                    this.form.live_permit = '2';
                    this.typeVal2 = true
                    this.view_pass2 = res.data.viewPass/10;
                  }
                })
            },
//            _getData(){
//                let url = DATA_URL + 'mwlive/live/get_info.do?id=' + getLStorage('liveID')
//                axios.get(url).then((response) => {
//                    if(response.data.code == ERR_OK){
//                        this.form = response.data.data
//                        this.form.live_permit = this.form.live_permit.toString()
//                        if(this.form.live_permit == 1){
//                            this.typeVal1 = true
//                            this.view_pass1 = response.data.data.view_pass
//                        }else if(this.form.live_permit == 2){
//                            this.typeVal2 = true
//                            this.view_pass2 = response.data.data.view_pass
//                        }else if(this.form.live_permit == 4){
//                            this.typeVal4 = true
//                        }else if(this.form.live_permit == 3){
//                            this.typeVal3= true
//                            this.ticketsNum = response.data.data.view_pass
//                        }else{
//                            this.typeVal1 = true
//                            this.view_pass2 = response.data.data.view_pass
//                        }
//                        this.getWhite()
//                        this.getListByPage()
//
//                    }
//                }).catch(function(err){
//                    console.log(err)
//                })
//
//            },
            // 白名单查询
            getWhite(){
                let url = DATA_URL + 'mwlive/user/select_whiteListPage.do'
                let formdata = new FormData()
                formdata.append('live_id',getLStorage("liveID"))
                formdata.append('page_size','10')
                formdata.append('page_index','1')
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        if(res.data.data.data_list.length>0){
                            this.isWhite = true
                        }

                    }
                    // this.tableData = res.data.data
                }).catch((err)=>{
                    console.log(err)
                })
            },
            radioChage(formRule){
                this.$refs[formRule].clearValidate();
            },
            // 门票分页查询
            getListByPage(){
                let url = GIFT_URL + 'service/getListByPage.action'
                let formdata = new FormData()
                formdata.append('liveId',getLStorage('liveID'))
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.resultCode == '01'){
                        if(res.data.params.list.length>0){
                            this.ticketsNum = parseInt(res.data.params.page.total)
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            type(){
                if(this.form.live_permit == 1){
                    this.typeVal1 = true
                }else{
                    this.typeVal1 = false
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      let paramData = {
                        id:getLStorage("defRoomId"),
                        vodId:getLStorage("defRoomId"),
                        vodPermit:this.form.live_permit,
                        userId:getLStorage('userId')
                      }
                      if(this.form.live_permit==1){
                        paramData.viewPass = this.view_pass1;
                      }else if(this.form.live_permit==2){
                        paramData.viewPass = this.view_pass2*10;
                      }
                      this.$ajaxs.updateVodInfo(paramData).then(res => {
                        if(res.code==200){
                          this.$message({
                            showClose: true,
                            message: '修改成功！',
                            type: 'success'
                          });
                        }else {
                          this.$message({
                            showClose: true,
                            message: '操作失败！',
                            type: 'error'
                          });
                        }
                      })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            createtickets(){
                // 创建成功/生成门票
                let createCodeParams = {
                    liveID:getLStorage('liveID'),
                    number:this.ticketsNum,
                    type:1
                }
                axios({
                    method: 'post',
                    url:GIFT_URL + 'service/createCode.action',
                    params: createCodeParams
                })
                .then((response) => {
                    if(response.data.resultCode == '01'){
                        this.tipsMessage('保存成功,门票生成成功!','success')
                        this.ticketsTip = true
                    }else{
                        this.tipsMessage('保存成功,门票生成失败!','success')
                        this.ticketsTip = false
                    }
                    this.disabled = false
                }).catch((err)=>{
                    this.tipsMessage('保存成功，门票生成失败!','error')

                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 保存白名单数据
            changeXls(file,fileList){
                //保存导入表格数据fileXls
                let _this = this;
                var fileName = file.raw.name
                var index = fileName.lastIndexOf('.')
                var suffix = fileName.substr(index)
                if(suffix!='.xls'&&suffix!='.xlsx'){
                    return false
                    _this.tipsMessage('导入名单格式有误，请下载模板重新导入','error')
                    _this.fileName = "";

                }else{
                    _this.white_list = true
                    _this.fileName = fileName.replace(/^(^.{18})(.+)(.{4}\.+\w+$)$/g, "$1...$3");
                    _this.isWhite = false
                    _this.fileXls = file.raw
                    _this.importWhiteList()
                }
            },
            // 导入白名单
            importWhiteList(){
                let _this = this
                var form = new FormData()
                form.append('excelFile',_this.fileXls)
                axios.post(DATA_URL + 'mwlive/user/import_WhiteList.do?live_id='+getLStorage('liveID'), form, {
                    headers: {
                    "Content-Type": "multipart/form-data"
                    }
                })
                .then((res) => {
                    if(res.data.code == ERR_OK ){
                        _this.tipsMessage('白名单导入成功!','success')
                        _this.isWlTip=true
                        // _this.xlsTip = true
                    }else{
                        _this.isWlTip=false
                        _this.xlsTip = false
                        _this.fileName = "";
                        _this.tipsMessage('导入白名单失败!','error')
                    }

                }).catch(function(err){
                    _this.fileName = "";
                    _ticketsTip= false
                    _this.xlsTip = false
                    _this.tipsMessage('导入白名单失败!','error')
                })

            },
            tipsMessage(message,type){
                this.$message({
                    showClose:true,
                    message: message,
                    type:type || 'info',
                    customClass: 'tips-text'
                })
            },
        },
        computed: {
            live_permit() {
        　　　　return this.form.live_permit
        　　},
          live_permit2: {
            get: function () {
              return this.$store.state.live_permit2
            },
            set: function () {
            }
          }
        },
        watch:{
            live_permit(val){

                if(val == 1){
                    this.typeVal1 = true
                    this.typeVal2 = false
                    this.typeVal3 = false
                    this.typeVal4 = false
                }else if(val == 2){
                    this.typeVal1 = false
                    this.typeVal2 = true
                    this.typeVal3 = false
                    this.typeVal4 = false
                }else if(val == 3){
                    this.typeVal1 = false
                    this.typeVal2 = false
                    this.typeVal3 = true
                    this.typeVal4 = false
                    //this.xlsTip = false
                }else if(val == 4){
                    this.typeVal1 = false
                    this.typeVal2 = false
                    this.typeVal3 = false
                    this.typeVal4 = true
                }else{
                    this.typeVal1 = false
                    this.typeVal2 = false
                    this.typeVal3 = false
                    this.typeVal4 = false
                }


            }
        }
    }
</script>

<style scoped>
.footnote{
    margin-bottom:16px;
}
.demo-ruleForm{
    width:488px;
    margin-left:180px;
}
.live-passWrap{
    border-top:1px solid #ececec;
    /* padding:40px 0 0 30px; */

}

.words-style span{
    color: #ff3626;
}
.viewsettings{
    position: relative;
}
.viewsettings .mt20{
    margin-top: 30px;
}

.submit_btn{
    position: absolute;
    left: 0;
    bottom: 0px;
    margin: 0;
    width: 100%;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    border-top: 1px solid rgb(217, 217, 217);
}
.viewsettings .el-form-item{
    margin-bottom:0;
}
.viewsettings .btn_40{
    width:300px;
    height:40px;
    line-height: 40px;
}
.viewsettings.my_section .footnote{
    margin-bottom:20px;
}
.viewsettings.my_section .footnote.el-radio.is-bordered+.el-radio.is-bordered{
    margin-left:24px;
}
.viewsettings .el-input, .viewsettings .el-input__inner{
    width:200px;
    margin-right:20px
}
</style>
<style>
.viewsettings.my_section .el-form  .el-input__inner{
    width:300px;
    height:40px;
    line-height: 40px;
}
.viewsettings .el-radio{
    margin-right:0px
}
.live-passWrap .el-form-item__content{
    margin-left:140px !important
}
.my_bot30 .el-form-item__content{
    margin-bottom:30px;
}
.live-passWrap .el-form-item__label{
    width:124px !important;
}
.viewsettings .livepass-sb .el-form-item__content{
    margin-left:0 !important;
}
.viewsettings.my_section .el-radio.footnote.radio.is-bordered{
    width: 86px;
    height: 40px;
    line-height: 38px;
}
.viewsettings.my_section .footnote .el-radio__inner:before {
    top: 9px;
    left: 67px;
}
.viewsettings .radio_t3 .el-radio__label {
    position: relative;
    left: -12px;
}

</style>

