<template>
    <div class="recharge my_list my_section">
        <div class="live-top bg-fff">账户充值</div>
        <div class="bg-fff info-content"  style="height:535px">
            <div style="width:460px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
                <div>
                    <el-form-item prop="money" label="充值金额 : ">
                        <el-input class="my_input inp_300" v-model="ruleForm.money" placeholder="请输入充值金额" :maxlength="7"></el-input>
                        <!-- <div v-show="isNumber" class="el-form-item__error">请输入数字金额</div> -->
                    </el-form-item>
                </div>
                <div>
                    <el-row>
                        <ul class="defaultMoney">
                            <li :class="isActive=='1'?'active':''" @click="cLi('1')">1w</li>
                            <li :class="isActive=='5'?'active':''" @click="cLi('5')">5w</li>
                            <li :class="isActive=='10'?'active':''" @click="cLi('10')">10w</li>
                            <li :class="isActive=='50'?'active':''" @click="cLi('50')">50w</li>
                        </ul>
                    </el-row>
                </div>
                <div>
                    <el-form-item prop="resource" label="充值方式: ">
                       <div class="choice_pay">
                            <span :class="payType=='2'?'active':''" @click="changePayType('2')">
                              <i class="icon iconfont icon_sj"></i>
                              <img src="../../common/image/weixin.png" alt="">
                            </span>
                            <span :class="payType=='1'?'active':''" @click="changePayType('1')">
                              <i class="icon iconfont icon_sj"></i>
                              <img src="../../common/image/zhifubao.png" alt="">
                            </span>

                       </div>
                    </el-form-item>
                </div>
                <div class="rechatge">
                    <el-form-item class="rechatge-button">
                        <el-button class="blue_btn" style="background-color:#4285F4 !important;" type="primary" @click="submitForm('ruleForm')" :disabled="disabled">充值</el-button>
                    </el-form-item>
                </div>
                <p class="tishi" style="margin-left:90px">
                    温馨提示：<br>
                    1.支持微信，支付宝支付，线下银行付款等方式充值。<br>
                    2.支付成功后，可在账户总览中查看最新余额。<br>
                    3.充值成功的金额不支持提现。<br>
                    4.支持查看所有历史充值记录，点击进入查询。<br>
                    5.若充值未到账或有其他疑问可致电客服热线
                </p>
            </el-form>
            </div>
            <!-- <div>
            ceshi
                <form style="line-height:40px;" method="post" target="_blank">
                    <el-row style="display:none" class="mb20 mt20">
                        <el-col class="te-r" :span="4">：</el-col>
                        <el-col :span="15">
                            <input type="number" class="el-input__inner" name="user_id" :value="ruleForm.user_id" readonly>
                        </el-col>
                    </el-row>
                    <el-row class="mb20 in_money">
                        <el-col class="te-r" :span="5">请输入充值金额：</el-col>
                        <el-col :span="11" style="position:relative;float:none;margin-left:16px;">
                            <input type="text" style="background:#f1f5f9;" v-model="ruleForm.money" class="el-input__inner el-input-money" name="money" placeholder="请输入充值金额">
                            <div v-show="rules.validateMoney" class="el-form-item__error">{{rules.moneyTipe || '请输入充值金额'}}</div>
                        </el-col>
                    </el-row>
                     <el-row class="mb20">
                        <el-col class="te-r" :span="5">请选择充值类型：</el-col>
                        <el-col :span="11" class="pay_in_way" style="position:relative">
                            <label><input name="to_type" v-model="ruleForm.resource" type="radio" value="2"> 微信</label>
                            <label><input name="to_type" v-model="ruleForm.resource" type="radio" value="1"> 支付宝</label>
                            <div v-show="rules.validateType" class="el-form-item__error">请选择充值类型</div>
                        </el-col>
                    </el-row>
                    <button style="margin-left:125px" @click="submitForm" type="submit" class="el-button el-button--primary">下一步</button>
                    <p class="col-666 tishi" style="margin-left:16px">
                        温馨提示：<br>
                        1.支持微信，支付宝支付，线下银行付款等方式充值。<br>
                        2.支付成功后，可在账户总览中查看最新余额。<br>
                        3.充值成功的金额不支持提现。<br>
                        4.支持查看所有历史充值记录，点击进入查询。<br>
                        5.若充值未到账或有其他疑问可致电客服热线
                    </p>
                </form>
            </div> -->
            <el-dialog
            title="微信支付"
            :visible.sync="dialogVisible"
            width="500px"
            class="my_dialog"
            size="tiny"
            :show-close="false"
            >
            <div class="te-c">
                <p style="color:#FF467F;font-size:18px;">
                    支付金额: {{ruleForm.money}} 元
                </p>
                <img :src="wechatImg" alt="" class="wechatImg">
                <p>
                    请扫描二维码完成付款
                </p>
            </div>
            <span slot="footer" class="dialog-footer" >
              <el-button @click="dialogVisible = false" class="btn_38">取消支付</el-button>
              <el-button type="primary" @click="aplipaysucess" class="btn_38">支付完成</el-button>
            </span>

            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {
  ERR_OK,
  DATA_URL,
  getLStorage,
  GIFT_URL,
  PROJET_URL
} from "api/config";
import { submitMoney } from "api/http";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入正确的金额"));
      }
      setTimeout(() => {
        // let MoneyExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        // if (!MoneyExp.test(value)) {
        //   callback(new Error("请输入正确的金额"));
        // } else {
        //   this.disabled = false;
        //   callback();
        // }
        // let MoneyExp = /^[0-9]+([.]{1}[0-9]{2})?$/;
        let MoneyExp = /^\d+(\.\d{1,2})?$/
        if (!MoneyExp.test(value)  ||value <= 0 || value > 5000000) {
          return callback(
            new Error("充值金额只支持数字，最小为0.01元，最大为500万元")
          );
        }else {
          callback();
        }
      }, 1000);
    };
    return {
      wechatImg: "",
      disabled: false,
      isNumber: false,
      dialogVisible: false,
      ruleForm: {
        user_id: getLStorage("user_id"),
        money: "",
        resource: "2"
      },
      rules: {
        validateMoney: false,
        validateType: false,
        moneyTipe: "",
        money: [{ required: true, validator: checkAge, trigger: "blur" }],
        resource: [
          { required: true, message: "请选择充值方式", trigger: "change" }
        ]
      },
      isActive: "",
      payType:'2',
    };
  },
  created() {},
  methods: {
    cLi(a) {
      this.$refs["ruleForm"].resetFields();
      this.ruleForm.money = a + "0000";
      this.isActive = a;
    },
    changePayType(a){
      this.$refs["ruleForm"].resetFields();
      this.ruleForm.resource = a;
      this.payType = a;
    },
    aplipaysucess() {
      this.$message({
        showClose: true,
        type: "Info",
        message: "若已支付成功可到充值记录查询"
      });
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.disabled = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.disabled = true;
          let url = DATA_URL + "manage/finance/topup.do";
          // let formdata = new FormData()
          // formdata.append('user_id',getLStorage('user_id'))
          // formdata.append('to_type',this.ruleForm.resource)
          // formdata.append('money',this.ruleForm.money)
          // axios({
          //     method: 'post',
          //     url: url,
          //     data:formdata,
          //     headers: {'Content-Type': 'multipart/form-data'}
          // })

          let data = {
            user_id: getLStorage("user_id"),
            to_type: this.ruleForm.resource,
            money: this.ruleForm.money
          };
          // IE浏览器跳转
          var newTab;
          if (this.ruleForm.resource == '1') {
              newTab = window.open('about:blank')
          }
          
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
              console.log(newTab)
              axios({
              method: "post",
              url: url,
              params: data,
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              }
            })
              .then(res => {
                  if (this.ruleForm.resource == 1) {
                      newTab.location.href =  PROJET_URL +"#/rechargeGo?user_id=" +getLStorage("user_id") +"&to_type=" +this.ruleForm.resource +"&money=" +this.ruleForm.money
                    //  window.open(
                    //     PROJET_URL +
                    //     "#/rechargeGo?user_id=" +
                    //     getLStorage("user_id") +
                    //     "&to_type=" +
                    //     this.ruleForm.resource +
                    //     "&money=" +
                    //     this.ruleForm.money
                    //     );
                        this.openTips();
                    }else{
                        this.dialogVisible = true;
                        this.wechatImg = res.data.payUrl;
                    }
                
                    this.disabled = false;
              }).catch((err)=>{

              })
            //   console.log(PROJET_URL +"#/rechargeGo?user_id=" +getLStorage("user_id") +"&to_type=" +this.ruleForm.resource +"&money=" +this.ruleForm.money)
            //   newTab.location.href =  PROJET_URL +"#/rechargeGo?user_id=" +getLStorage("user_id") +"&to_type=" +this.ruleForm.resource +"&money=" +this.ruleForm.money
            
            
          } else {
            axios({
              method: "post",
              url: url,
              params: data,
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              }
            })
              .then(res => {
                console.log(res.data);
                if (this.ruleForm.resource == 1) {
                  var url = res.data.payUrl.replace(/&amp/g, "&");
                  console.log(url);
                  newTab.location.href = url;
                //   window.open(url);
                  this.openTips();
                } else {
                  this.dialogVisible = true;
                  this.wechatImg = res.data.payUrl;
                }
                this.disabled = false;
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        } else {
          this.disabled = false;
          console.log("error submit!!");
          return false;
        }
      });

      return false;
    //   var newTab = window.open('about:blank')
      let url = DATA_URL + "manage/finance/topup.do";
      // let url1 = 'http://mwlivetest.facebac.com/api/manage/finance/topup.do'
      let formdata = new FormData();
      formdata.append("user_id", getLStorage("user_id"));
      formdata.append("to_type", this.ruleForm.resource);
      formdata.append("money", this.ruleForm.money);
      axios({
        method: "get",
        url: url1,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          this.openTips();
          console.log(res);
          this.form_data = res.data;
          // let newData = this.form_data.replace(/&amp/g,"&")
          // window.location.href = url
          window.open(
            "http://mwlivetest.facebac.com/api/manage/finance/topup.do"
          );
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // Alipay(url){
    //     console.log('payUrl')
    //     window.open(url)
    // },
    // wechatAayment(url){
    //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //     }).then(() => {
    //         this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //         });
    //     }).catch(() => {
    //         this.$message({
    //             type: 'info',
    //             message: '已取消删除'
    //         });
    //     });
    // },
    openTips() {
      this.$confirm("充值中", "提示", {
        confirmButtonText: "支付完成",
        cancelButtonText: "取消支付",
        customClass: "delMessageBox",
        type: "info"
      })
        .then(() => {
          this.$message({
            type: "Info",
            message: "若已支付成功可到充值记录查询"
          });
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '取消支付'
          // });
        });
    }
    // handleClose(done) {
    //     this.$confirm('确认关闭？')
    //     .then(_ => {
    //         done();
    //     })
    //     .catch(_ => {});
    // }
  }
};
</script>
<style>
.defaultMoney {
  list-style: none;
  display: block;
  margin-top: 5px;
  padding-left: 89px;
  overflow: hidden;
}

.defaultMoney li {
  display: block;
  border: 2px solid #dcdfe6;
  padding: 4px 24px;
  margin-left: 21px;
  margin-bottom: 20px;
  width: 90px;
  float: left;
  text-align: center;
  cursor: pointer;
}
.delMessageBox .el-message-box__btns button:nth-child(1) {
  left: 0px;
}
.delMessageBox .el-message-box__btns button:nth-child(2) {
  left: 0px;
}
.defaultMoney li.active {
  border: 2px solid #2B6CFF;
  color: #2B6CFF;
}
.defaultMoney li:nth-child(2n + 1) {
  margin-left: 0;
}
.recharge .pay_in_way {
  display: block;
  float: none;
}
.rechatge .el-form-item__content {
  color: #262626;
}
.recharge .choice_pay {
  display: block;
  margin-top: 10px;
}
.recharge .el-form-item__label {
  color: #262626;
}
.my_section.recharge .inp_300 .el-input__inner {
  width: 300px;
  height: 40px;
}
.my_section.recharge .footnote .el-radio__inner:before {
  font-size: 20px;
  top: 26px;
  left: 117px;
}
</style>

<style scoped>
.choice_pay span{
    display: inline-block;
    width: 140px;
    height: 54px;
    line-height: 54px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    position: relative;
    text-align:center;
}
.choice_pay span:nth-child(2){
    margin-left: 16px;
}
.choice_pay span.active{
  border: 2px solid #2B6CFF;
 
}
.choice_pay img{
    vertical-align: middle;
}
.choice_pay span i{
   position: absolute;
   right: -1px;
   bottom:-1px;
   line-height:18px;
    font-style: normal;
}
.choice_pay span.active i::before{
  display: inline-block;
  content: "\E8B7";
  color: #2B6CFF;
  font-size: 20px;
}
.info-content {
  padding: 60px 0 0 222px;
  min-height: 502px;
  line-height: 30px;
  font-size: 14px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.in_money {
  display: block;
  float: none !important;
}

.rechatge-button .el-button {
  width: 300px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background-color: #58cafd;
  border: none;
  padding: 0 !important;
  font-size: 16px;
  margin-top: 24px;
}
.tishi {
  margin-top: 10px;
  line-height: 28px;
  color: #9b9b9b;
}
.recharge .footnote {
  position: relative;
  height: 204px;
  box-sizing: border-box;
}
/* .recharge  .footnote.is-checked{
    top:15px
} */
.recharge .el-radio__input.is-checked {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 36px;
  height: 36px;
  background: none;
}
.recharge .footnote .el-radio__label {
  padding: 0;
}
.recharge .el-radio.footnote.is-checked {
  border: 2px solid #2B6CFF;
  border-radius: 2px;
}
.recharge .el-radio__input.is-checked {
  background: url(../../common/image/Selected.png) no-repeat;
}
.recharge .footnote .el-radio__inner::after {
  display: none;
}
.recharge .footnote .el-radio__inner {
  font-family: "iconfont" !important;
  font-size: 36px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: none;
}
.my_section.recharge .el-radio.footnote.radio.is-bordered {
  width: 140px;
  height: 58px;
}

.my_section.recharge .el-radio__label img {
  position: absolute;
  top: 10px;
  left: 17px;
}
.my_section.recharge .footnote.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 16px;
}
.wechatImg {
  width: 198px;
  height: 198px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 10px;
  margin-top: 10px;
}
.dialog-footer .btn_38 {
  width: 100px;
  padding: 0;
}
</style>
