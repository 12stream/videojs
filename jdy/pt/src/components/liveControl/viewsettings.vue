<template>
    <div class="viewsettings my_section" style="min-height:680px;">
        <div class="pd10 live-top">观看授权设置</div>
        <div class="mt20" style="margin-top:60px;">
            <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm" style="width:348px;">
                <el-form-item label="授权类型：" prop="live_permit" class="souquan_way newContent">
                    <el-radio-group v-model="form.live_permit" @change="radioChage('form')">
                        <el-radio class="radio footnote" border v-model="form.live_permit" label="0" >免费</el-radio>
                        <el-radio class="radio footnote" border v-model="form.live_permit" label="1">加密</el-radio>
                        <el-radio class="radio footnote" border v-model="form.live_permit" label="2">付费</el-radio>
                        <el-radio class="radio footnote radio_t3" border  v-model="form.live_permit" label="4" style="margin-left:0;">专属直播间</el-radio>
                        <el-radio class="radio footnote" border v-model="form.live_permit" label="3">门票</el-radio>
                    </el-radio-group>

                </el-form-item>
                <!-- <el-form-item v-if="typeVal" label="提示文字:" prop="live_permit_text" class="clear live-passWrap pt20">
                    <el-input v-model="ruleForm.live_permit_text" placeholder="欢迎观看本直播" class="fl"></el-input>
                    <div class="words-style fl"><span>0</span>/20</div>
                </el-form-item>-->
                <el-form-item v-if="typeVal1" label="观看密码：" placeholder="请输入6位数密码" prop="view_pass1"  class="zidingyi_pwd clear my_bot30">
                    <el-input v-model="view_pass1" class="fl" :maxlength="6"></el-input>
                    <!-- <div class="words-style fl"><span>0</span>/20</div> -->
                </el-form-item>
                <el-form-item v-if="typeVal2" label="付费金额：" placeholder="请输入付费金额" prop="view_pass2" class="zidingyi_pwd clear my_bot30" >
                    <el-input v-model="view_pass2" class="fl"></el-input><span style="position: absolute;right: 20px;">元</span>
                    <!-- <div class="words-style fl"><span>0</span>/20</div> -->
                </el-form-item>
                <el-form-item v-if="typeVal4" label="专属名单：" placeholder="请导入白名单"  prop="fileXls" class="zidingyi_pwd clear my_bot30">
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

                <el-form-item v-if="typeVal3" label="门票："  placeholder="请输入门票数量"   prop="ticketsNum" class="my_bot30">
                    <el-input v-model="ticketsNum" :maxlength="5"></el-input>
                </el-form-item>
                <el-form-item v-if="typeVal3" label="在线售票：" prop="ticketMoney" class="ticketMoeny_1" >
                    <el-radio-group @change="ticketOffchange" v-model="ticketOff" style="display:block;height:40px;line-height:55px;">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                    <el-col v-if="ticketOff">
                        <el-input style="width:120px;height:34px;margin-bottom: 15px;" size="medium " class="limitInput limitMoneny"  v-model="form.ticketMoney" placeholder="门票金额0.1-10万"></el-input><span style="margin-left: 16px;font-size: 12px;color: rgba(51,51,51,1);">元</span>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn_40" type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
                <el-form-item v-show="xlsTip&&form.live_permit=='4'">
                    <p style="width:300px;text-align:center;">
                        <span class="default-color">观看权限修改成功，请前往</span>
                        <router-link tag="div" to="/liveControl/whiteList" style="display:inline-block;" class="col_4FF cur-p">名单管理</router-link>
                        <span class="default-color">查看</span>
                    </p>
                </el-form-item>
                <!-- <el-form-item v-show="ticketsTip&&form.live_permit=='3'">
                    <p style="width:300px;text-align:center;">
                        <span class="default-color">观看权限修改成功，请前往</span>
                        <router-link tag="div" to="/liveControl/ticketsList" style="display:inline-block;" class="col_4FF cur-p">门票管理</router-link>
                        <span class="default-color">查看</span>
                    </p>
                </el-form-item> -->

            </el-form>
        </div>
        <el-dialog
            :visible.sync="tickDialog"
            width="400px"
            center
            class="dialog12"
            >
            <div style="margin-bottom:26px;">
                <p>保存成功，门票生成成功</p>
                <p>请前往
                    <span @click="tickHref" style="color: blue;text-decoration: underline;display: inline-block;cursor:pointer;">频道管理-门票管理</span>查看</p>
            </div>
            <span >
                <el-button type="primary" @click="tickDialog = false" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import { ERR_OK, DATA_URL, GIFT_URL, getLStorage } from "api/config";
import { filterObj } from "api/http";
import rootBus from '../rootBus.js'
export default {
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
      let codeNumber = /^\d{6}$/;
      if (!this.view_pass1) {
        callback(new Error("请输入6位数字密码"));
      } else {
        if (!codeNumber.test(this.view_pass1)) {
          callback(new Error("请输入6位数字密码"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      let codeNumber = /^[0-9]+$/;
      if (!this.view_pass2) {
        callback(new Error("请输入整数的金额"));
      } else {
        // if (this.view_pass2 > 5000 || this.view_pass2 < 1) {
        //     return callback(new Error('付费金额只支持数字，最小为1，最大为5000，不支持小数点'))
        // }
        // if (!codeNumber.test(this.view_pass2)) {
        //     callback(new Error('付费金额只支持数字，最小为1，最大为5000，不支持小数点'))
        // }
        let money = this.view_pass2;
        let MoneyExp = /^[0-9]+([.]{1}[0-9]{1})?$/;
        if (!MoneyExp.test(money) || money <= 0 || money > 5000) {
          return callback(
            new Error("付费金额只支持数字，最小为0.1，最大为5000")
          );
        }else {
          callback();
        }
      }
    };
    var valTicketsNum = (rule, value, callback) => {
        if (this.ticketsNum > this.maxEditNuber) {
            return callback(new Error('您最多可以添加' + this.maxEditNuber + '张门票'));
        }
        if (this.newTicketsNum === this.ticketsNum) {
            console.log('0000')
            callback()
        }else{
                let numberExp = /^[0-9]+$/;
                if (!numberExp.test(this.ticketsNum) || this.ticketsNum < 1) {
                  return callback(new Error("门票数量为大于1的整数"));
                }
                // if (this.shareTickNum > this.ticketsNum) {
                //     return callback(new Error(this.shareTickNum + '张门票已被使用，请输入大于' + this.shareTickNum + '张的门票数'));
                // }
            // 查询实名
            if (!this.ticketsNum) {
                return callback(new Error("请输入门票数量"));
            } else if (this.ticketsNum > 100) {
                let numberLimit;
                axios
                .get(DATA_URL + "mwlive/user/user_qualify_cx.do", {
                    params: {
                    userId: getLStorage("user_id")
                    }
                })
                .then(response => {
                    console.log(this.shareTickNum)
                    // 实名成功
                    if (response.data.data.qualify == 3) {
                    numberLimit = 1000;
                    } else {
                    numberLimit = 100;
                    }
                    if (this.ticketsNum > numberLimit) {
                    return callback(new Error("请输入门票数量范围1-" + numberLimit));
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
            }

            setTimeout(() => {
                let numberExp = /^[0-9]+$/;
                if (!numberExp.test(this.ticketsNum)) {
                  return callback(new Error("请输入数字"));
                } else {
                this.disabled = false;
                callback();
                }
            }, 1000);
        }
        
    };
    var validateFileXls = (rule, value, callback) => {
      if (!this.fileXls && !this.isWhite) {
        this.white_list = false;
        return callback(new Error("请导入白名单"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatetMoney = (rule,value,callback)=>{
        var re = /^[0-9]+([.]{1}[0-9]{1})?$/
        if (this.ticketOff == 0) {
            callback()
        }else{
            if (this.ticketOff == 1 && value>0 && value <= 100000) {
                    if(value == 0 || value == '' || value == undefined){
                        this.$message({
                            showClose: true,
                            message: '输入金额不能为空',
                            type: 'warning'
                        });
                    }
                    if (re.test(value)) {
                        callback();
                    }else{
                        this.$message({
                            showClose: true,
                            message: '请输入大于0.1小于10万的数字',
                            type: 'warning'
                        });
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: '请输入大于0.1小于10万的数字',
                        type: 'warning'
                    });
                }
            }
        }
        
    return {
        ticketOff:0,
        tickDialog:false,
      islive: "",
      typeVal1: false,
      typeVal2: false,
      typeVal3: false,
      typeVal4: false,
      form: {
        live_permit: "",
        ticketMoney:''
      },
      view_pass1: "",
      view_pass2: "",
      ticketsNum: "",
      file: "",
      fileXls: "",
      fileName: "",
      xlsInput: "",
      isWhite: "",
      xlsTip: "",
      ticketsTip: "",
      isWlTip: false,
      shareTickNum:'',
      rules: {
        // live_permit_text: [
        //     { required: true, message: '请输入提示文字', trigger: 'blur' },
        //     { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        // ],
        live_permit: [{ message: "请输入选择授权类型", trigger: "change" }],
        view_pass1: [{ validator: validatePass, trigger: "blur" }],
        view_pass2: [{ validator: validatePass2, trigger: "blur" }],
        fileXls: [{ validator: validateFileXls, trigger: "blur" }],
        ticketsNum: [{ validator: valTicketsNum, trigger: "blur" }],
        ticketMoney:[{ validator: validatetMoney, trigger: "blur" }],
      },
      maxEditNuber:'',
        newTicketsNum:'',
        isQualify:''
    };
  },
  created() {
    this._getData();
    // this.getTicketNum()
    this.getQualify();
  },
  methods: {
      getQualify(){
            var params = {userId:getLStorage('user_id')};
                axios.get(DATA_URL + 'mwlive/user/get_userinfo.do',{
                    params:{
                        id:getLStorage('user_id')
                    }
                }).then((response) => {
                    if (response.data.data.qualify == 3) {
                        this.isQualify = 3
                    }else{
                        this.isQualify = 1;
                    }  
                    this.getTicketNum()
                }).catch(function(err){
                    console.log(err)
                })
        },
      ticketOffchange(val){
          if (val == 0) {
            //   console.log('关闭了')
              this.$confirm('<p style="text-align:center;">关闭在线售票后，在直播页面观众将会</p><p style="text-align:center;">无法直接购买门票，您确定关闭吗？</p>', {
                dangerouslyUseHTMLString: true,
                distinguishCancelAndClose: true,
                showClose:false,
                customClass:'offMesBox',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass:'offConfirm',
                cancelButtonClass:'offCancel',
                center:true
                })
                .then(() => {
                    // this.ticketFlag  = true;
                    this.ticketOff = 0;
                })
                .catch(action => {
                    // this.ticketFlag = true;
                    this.ticketOff = 1;
                });
          }
      },
      getTicketNum(){
          let obj = {
              liveID:getLStorage("liveID"),
              qualify:this.isQualify
          }
          axios({
                method:'post',
                url:GIFT_URL +'/service/showCode.action',
                params:obj
        }).then((re)=>{
            if (re.data.resultCode == '01') {
                console.log(re.data)
                this.shareTickNum = Number(re.data.params.useCode);
                this.maxEditNuber = Number(re.data.params.maxEditableNum);
                this.newTicketsNum = Number(re.data.params.autoCreateNum);
                this.ticketsNum = Number(re.data.params.autoCreateNum) <= 0 ? "" : Number(re.data.params.autoCreateNum);
            }
        })
      },
      tickHref(){
          this.$router.push({
            path: '/liveControl/ticketsList'
        })
      },
    _getData() {
      let url =
        DATA_URL + "mwlive/live/get_info.do?id=" + getLStorage("liveID");
      axios
        .get(url)
        .then(response => {
          if (response.data.code == ERR_OK) {
            this.form = response.data.data;
            this.form.live_permit = this.form.live_permit.toString();
            if (this.form.live_permit == 1) {
              this.typeVal1 = true;
              this.view_pass1 = response.data.data.view_pass;
            } else if (this.form.live_permit == 2) {
              this.typeVal2 = true;
              this.view_pass2 = response.data.data.view_pass / 10;
            } else if (this.form.live_permit == 4) {
              this.typeVal4 = true;
            } else if (this.form.live_permit == 3) {
              this.typeVal3 = true;
              this.ticketsNum = response.data.data.view_pass;
            } else {
              this.typeVal1 = true;
              this.view_pass2 = response.data.data.view_pass;
            }
            this.ticketOff = response.data.data.ticket_price/10 > 0 ? 1 : 0;
            this.form.ticketMoney = response.data.data.ticket_price > 0 ? response.data.data.ticket_price/10 : '';

            this.getWhite();
            this.getListByPage();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 白名单查询
    getWhite() {
      let url = DATA_URL + "mwlive/user/select_whiteListPage.do";
      let formdata = new FormData();
      formdata.append("live_id", getLStorage("liveID"));
      formdata.append("page_size", "10");
      formdata.append("page_index", "1");
      axios({
        method: "post",
        url: url,
        data: formdata
      })
        .then(res => {
          if (res.data.code == ERR_OK) {
            if (res.data.data.data_list.length > 0) {
              this.isWhite = true;
            }
          }
          // this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    radioChage(formRule) {
      this.$refs[formRule].clearValidate();
    },
    // 门票分页查询
    getListByPage() {
      let url = GIFT_URL + "service/getListByPage.action";
      let formdata = new FormData();
      formdata.append("liveId", getLStorage("liveID"));
      axios({
        method: "post",
        url: url,
        data: formdata
      })
        .then(res => {
          if (res.data.resultCode == "01") {
            if (res.data.params.list.length > 0) {
            //   this.ticketsNum = parseInt(res.data.params.page.total);
            //   this.newTicketsNum = parseInt(res.data.params.page.total)
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    type() {
      if (this.form.live_permit == 1) {
        this.typeVal1 = true;
      } else {
        this.typeVal1 = false;
      }
    },
    submitForm(formName) {
      if (this.form.live_status == 1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "正在直播中，频道基本信息不可编辑!"
        });
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          var myTkNum = this.ticketOff == 1 ? this.form.ticketMoney*10 : 0;
        //   this.form.ticketMoney = this.ticketOff == 1 ? this.form.ticketMoney*10 : 0;
          let dataParams = {
            user_id: getLStorage("user_id"),
            id: getLStorage("liveID"),
            live_permit: this.form.live_permit,
            ticket_price:myTkNum 
            // view_pass: this.form.view_pass
          };
          if (this.form.live_permit == "1") {
            dataParams.view_pass = this.view_pass1;
          } else if (this.form.live_permit == "2") {
            dataParams.view_pass = this.view_pass2*10;
          } else if (this.form.live_permit == "3") {
            // 生成门票
            this.createtickets();
          }
          axios
            .get(DATA_URL + "mwlive/live/livepermit.do", {
              params: filterObj(dataParams)
            })
            .then(response => {
              if (response.data.code == ERR_OK) {
                console.log(response);
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "观看授权设置成功!"
                });
                if (this.isWlTip) {
                  this.xlsTip = true;
                } else {
                  this.xlsTip = false;
                }
                this.$store.state.live_permit2 = this.form.live_permit;
                this.$emit("refresh");
                this.isWlTip = false;
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    createtickets() {
      // 创建成功/生成门票
    //   let num;
    //   let obj ={
    //       liveID:getLStorage("liveID"),
    //       qualify:this.isQualify
    //   }
    //    axios({
    //         method:'post',
    //         url:GIFT_URL +'/service/showCode.action',
    //         params:obj
    //   }).then((re)=>{
    //       if (re.data.resultCode == '01') {
    //           num = Number(re.data.params.useCode)
    //         if (num > this.ticketsNum) {
    //             this.tipsMessage("可使用门票数不能少于门票总数", "error");
    //             // this.$message(new Error('可使用门票数不能少于门票总数'))
    //             return
    //         }
            let createCodeParams = {
                    liveID: getLStorage("liveID"),
                    number: this.ticketsNum,
                    type: 1
                };
                axios({
                    method: "post",
                    url: GIFT_URL + "service/createCode.action",
                    params: createCodeParams
                })
                    .then(response => {
                    if (response.data.resultCode == "01") {
                        this.tipsMessage("保存成功,门票生成成功!", "success");
                        this.tickDialog = true;
                        // this.ticketsTip = true;
                    } else {
                        this.tipsMessage("保存成功,门票生成失败!", "success");
                        this.tickDialog = false;
                        // this.ticketsTip = false;
                    }
                    this.disabled = false;
                    })
                    .catch(err => {
                    this.tipsMessage("保存成功，门票生成失败!", "error");
                    });
        //   }
        // })
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 保存白名单数据
    changeXls(file, fileList) {
      //保存导入表格数据fileXls
      let _this = this;
      var fileName = file.raw.name;
      var index = fileName.lastIndexOf(".");
      var suffix = fileName.substr(index);
      if (suffix != ".xls" && suffix != ".xlsx") {
        return false;
        _this.tipsMessage("导入名单格式有误，请下载模板重新导入", "error");
        _this.fileName = "";
      } else {
        _this.white_list = true;
        _this.fileName = fileName.replace(
          /^(^.{18})(.+)(.{4}\.+\w+$)$/g,
          "$1...$3"
        );
        _this.isWhite = false;
        _this.fileXls = file.raw;
        _this.importWhiteList();
      }
    },
    // 导入白名单
    importWhiteList() {
      let _this = this;
      var form = new FormData();
      form.append("excelFile", _this.fileXls);
      axios
        .post(
          DATA_URL +
            "mwlive/user/import_WhiteList.do?live_id=" +
            getLStorage("liveID"),
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          if (res.data.code == ERR_OK) {
            _this.tipsMessage("白名单导入成功!", "success");
            _this.isWlTip = true;
            // _this.xlsTip = true
          } else {
            _this.isWlTip = false;
            _this.xlsTip = false;
            _this.fileName = "";
            _this.tipsMessage("导入白名单失败!", "error");
          }
        })
        .catch(function(err) {
          _this.fileName = "";
          _ticketsTip = false;
          _this.xlsTip = false;
          _this.tipsMessage("导入白名单失败!", "error");
        });
    },
    tipsMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type || "info",
        customClass: "tips-text"
      });
    }
  },
  computed: {
    live_permit() {
      return this.form.live_permit;
    },
    live_permit2: {
      get: function() {
        return this.$store.state.live_permit2;
      },
      set: function() {}
    },
    // isQualify:{
    //     get(){
    //        return rootBus.myQualify;
    //     },
    //     set(){
    //        return rootBus.myQualify;
    //     }
    // }
  },
  watch: {
    live_permit(val) {
      if (val == 1) {
        this.typeVal1 = true;
        this.typeVal2 = false;
        this.typeVal3 = false;
        this.typeVal4 = false;
      } else if (val == 2) {
        this.typeVal1 = false;
        this.typeVal2 = true;
        this.typeVal3 = false;
        this.typeVal4 = false;
      } else if (val == 3) {
        this.typeVal1 = false;
        this.typeVal2 = false;
        this.typeVal3 = true;
        this.typeVal4 = false;
        //this.xlsTip = false
      } else if (val == 4) {
        this.typeVal1 = false;
        this.typeVal2 = false;
        this.typeVal3 = false;
        this.typeVal4 = true;
      } else {
        this.typeVal1 = false;
        this.typeVal2 = false;
        this.typeVal3 = false;
        this.typeVal4 = false;
      }
    }
  }
};
</script>

<style scoped>
.footnote {
  margin-bottom: 16px;
}
.demo-ruleForm {
  width: 488px;
  margin-left: 180px;
}
.live-passWrap {
  border-top: 1px solid #ececec;
  /* padding:40px 0 0 30px; */
}

.words-style span {
  color: #ff3626;
}
.viewsettings {
  position: relative;
}
.viewsettings .mt20 {
  margin-top: 30px;
}

.submit_btn {
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
.viewsettings .el-form-item {
  margin-bottom: 0;
}
.viewsettings .btn_40 {
  width: 300px;
  height: 40px;
  line-height: 40px;
}
.viewsettings.my_section .footnote {
  margin-bottom: 20px;
}
.viewsettings.my_section
  .footnote.el-radio.is-bordered
  + .el-radio.is-bordered {
  margin-left: 24px;
}
.viewsettings .el-input,
.viewsettings .el-input__inner {
  width: 200px;
  margin-right: 20px;
}
.dialog12 .el-dialog__body{
    text-align: center;
}
</style>
<style>
.viewsettings.my_section .el-form .el-input__inner {
  width: 300px;
  height: 40px;
  line-height: 40px;
}
.viewsettings .el-radio {
  margin-right: 0px;
}
.live-passWrap .el-form-item__content {
  margin-left: 140px !important;
}
.my_bot30 .el-form-item__content {
  margin-bottom: 15px;
}
.live-passWrap .el-form-item__label {
  width: 124px !important;
}
.viewsettings .livepass-sb .el-form-item__content {
  margin-left: 0 !important;
}
.viewsettings.my_section .el-radio.footnote.radio.is-bordered {
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
.newContent .el-form-item__content{
    width:100%;
}
.dialog12 .el-dialog--center .el-dialog__header{
    border:none;
}
.dialog12 .el-dialog--center .el-dialog__header .el-icon-close{
    display:none;
}
.dialog12 .el-dialog__body{
    text-align: center;
}
.ticketMoeny_1 .el-form-item__label{
    width:149px !important;
}
</style>

