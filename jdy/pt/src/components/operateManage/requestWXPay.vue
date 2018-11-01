<template>
    <div class="my_list securitySet">
        <div class="rechargeRecord my_list" id="wxTips" style="height: 700px;">
            <div class="live-top bg-fff">微信支付</div>
        <div class="bg-fff">
            <el-row>
                <el-col :span="10" style="margin-top:50px;">
                    <el-button type="primary" @click="chatWith">商务洽谈</el-button>
                    <div class="Tips3">
                        <p class="Tipp1">微信支付说明</p>
                        <p class="Tipp2">将您在平台的所有收益，直接打入企业微信公众账号中。</p>
                        <p class="Tipp2">收益包括：用户打赏,付费观看等。</p>
                        <p class="Tipp2" style="margin-bottom: 15px;">如需开通,点击商务洽谈。</p>
                    </div>
                </el-col>
                <el-col :span="12" class="exampleImg" style="margin-left: 50px;margin-top: 53px;">
                    <p style="float: left;margin-right: 9px;">示意图:</p>
                    <img src="../../common/image/wximg.png" width="87%"/>
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
                <p class="Tips2"><i class="t_red">*</i>您的称呼</p>
                <el-form-item prop="userName">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <p class="Tips2"><i class="t_red">*</i>您的手机号码</p>
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
    </div>
    
</template>
<script>
import { setCookie, getCookie, removeCookie,getCookies,DATA_URL,getLStorage,telSplit } from "../../api/config";
import axios from "axios";
export default {
  name: "",
  data() {
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
    return {
        
        userMessage:'',
        formData: {
            userName: getLStorage("admin"),
            userTel: getLStorage("mobile")
        },
        myTel:getLStorage("mobile"),
        centerDialogVisible:false,
        rules: {
            userName: [{ validator: checkName, trigger: "blur" }],
            userTel: [{ validator: checkPhone, trigger: "blur" }]
      },
    };
  },
  created() {
    // this.formData.userTel = telSplit(this.formData.userTel);
  },
  methods: {
    goOpenWeixinPay() {
      console.log("8888");
      this.$router.push({ path: "/operateManage/openWeixinPay" });
      //this.$router.push({ path: '/account/Recharge' })
    },
   submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var url = DATA_URL + "mwlive/user/addBusinessService.do";
          let formdata = new FormData();
          formdata.append("user_id", getLStorage("user_id"));
          formdata.append("user_name", this.formData.userName);
          formdata.append("mobile", this.formData.userTel);
          formdata.append("service_source", "portal后台-微信支付");
          formdata.append("demand_mess", this.userMessage);
          console.log(formdata)
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
                this.centerDialogVisible2 = false;
                this.flag++;
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
      // if(this.flag>0){
      //   this.$alert('尊敬的客户，您好，您的申请已提交,请保持电话畅通，商务人员将在24小时内与您联系。',  {
      //     confirmButtonText: '确定',
      //     center: true,
      //     callback: action => {
      //     }
      //   }); 
      // }
      // else{
        this.centerDialogVisible=true;
      // }
    },
  }
};
</script>
<style scoped>
.mylist {
  height: 760px;
  background: #fff;
}
.tishi {
    margin-top: 10px;
    line-height: 28px;
    color: #9B9B9B;
}
.Tips3{
    margin-top: 24px;
}
.Tips3 p{
    margin-top: 10px;
    font-size: 14px;
}
.Tipp1{
    color: #333333;
    font-weight: 600;
}
.Tipp2{
    color: #9b9b9b;
}
.dilatationImg {
  height: 100px;
}
</style>

