<template>
    <div class="rechargeRecord my_list ">
        <div class="live-top bg-fff">空间扩容</div>
        <div class="bg-fff" >
            <el-row class="imgDiv">
                <img src="../../common/image/dilatation.png" width="200" height="120" class="dilatationImg"/>
            </el-row>
            <div class="Info">
                <p>名称：{{name}}</p>
                <p>详情：{{detail}}</p>
                <p>容量：<i>{{space}}</i></p>
                <p>有效期：<i>{{validate}}</i></p>
                <p>收费标准：<i style="color:#333333;font-weight:bold;">{{cost}}</i></p>
            </div>
            <el-row>
                <el-button type="primary" style="    background: rgb(66, 133, 244);width: 110px;height: 40px;line-height: 40px;" @click="chatWith">商务洽谈</el-button>
            </el-row>
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
import { ERR_OK, GIFT_URL, DATA_URL, getLStorage,telSplit } from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
    let PhoneExp = /^[18][34567890]\d{9}$/;
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入您的称呼"));
      }else{
          callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入您的手机号码"));
      } else if (!PhoneExp.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
      }else{
          callback();
      }
    };
    return {
      name: "存储空间100G",
      detail: "存储空间增加",
      space: "100G",
      validate: "1年",
      cost: "￥800",
      centerDialogVisible: false,
      formData: {
        userName: getLStorage("admin"),
        userTel: getLStorage("mobile")
      },
      userMessage: "",
      rules: {
        userName: [{ validator: checkName, trigger: "blur" }],
        userTel: [{ validator: checkPhone, trigger: "blur" }]
      },
      flag:0
    };
  },
  created() {
    // this.formData.userTel = telSplit(this.formData.userTel);
  },
  methods: {
    chatWith(){ 
      if(this.flag>0){
        this.$alert('尊敬的客户，您好，您的申请已提交,请保持电话畅通，商务人员将在24小时内与您联系。',  {
          confirmButtonText: '确定',
          center: true,
          callback: action => {
          }
        });
      }
      else{
        this.centerDialogVisible=true;
      }
    },
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.userMessage) {
            this.userMessage = '';
          }
            var url=DATA_URL+"mwlive/user/addBusinessService.do";
          let formdata = new FormData()
            formdata.append('user_id',getLStorage('user_id'))
            formdata.append('user_name',this.formData.userName)
            formdata.append('mobile',this.formData.userTel)
            formdata.append('service_source',"portal后台-存储扩容")
            formdata.append('demand_mess',this.userMessage)
          // let params = {
          //     'user_id':getLStorage('user_id'),
          //     'user_name':this.formData.userName,
          //     'mobile':this.formData.userTel,
          //     'service_source':"portal后台-存储扩容",
          //     'demand_mess':this.userMessage
          // }
          // $.ajax({
          //   type: "POST",
          //         timeout: 120000, //超时时间设置，单位毫秒
          //         async: false,
          //         url: url,
          //         data: params,
          //         dataType: "json",
          //         success:function(data){
                    
          //         }
          // })
            axios({
                method: 'post',
                url: url,
                data:formdata,
            })
            .then((res)=>{
                console.log(res)
                if(res.status==200){
                    if (res.data.code != 200) {
                        this.$message({
                          showClose: true,
                          type: "error",
                          message: "留言失败"+res.data.msg
                        });
                    }else{
                        this.formData.userName="";
                        this.formData.userTel="";
                        this.userMessage="";
                        this.$message({
                        showClose: true,
                        type: "success",
                        message: "感谢您的留言"
                        });
                        this.centerDialogVisible=false;
                        this.flag++;
                    }
                    
                }
                else{
                    this.$message({
                    showClose: true,
                    type: "error",
                    message: "留言失败"+res
                    });
                }
            }).catch((err)=>{
                console.log(err)
            })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.dilatationImg {
    height: 120px;
}
.imgDiv {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 20px;
    height: 163px;
    padding-top: 10px;
}
.Info {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 2px;
}
.Info p {
    margin-top: 10px;
    color:#333;
    font-size: 14px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.Info i {
    color: #4285f4;
    font-style: normal;
}
.Tips1 {
    font-size: 14px;
    color: #9b9b9b;
    margin-top: 10px;
}
.Tips2 {
    font-size: 14px;
    color: #333333;
    margin-top: 20px;
    margin-bottom: 12px;
}
.Tips2 i {
    color: #ff467f;
    margin-right: 5px;
}
#message {
    height: 120px;
}
</style>
