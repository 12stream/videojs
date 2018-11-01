<template>
    <div class="setAppLogo">
        <div id="Url" style="min-height:670px;">
        <div class="live-top bg-fff clear">
            <div class="fl">
               网页展示APP入口
            </div>          
        </div>
        <div class="bg-fff table_form">
            <el-row>
                <el-col :span="8" class="webPage">
                    手机网页展示APP入口
                    <el-switch class="my_switch swi_90"   inactive-text="关" active-text="开" v-model="value" active-color="#2B6CFF" inactive-color="#CCCCCC"></el-switch>
                    <div class="Tips">
                        <p>温馨提示：</p>
                        <p>手机网页默认展开打开APP入口,</p>
                        <p>关闭后，H5将不展开此入口。</p>
                    </div>
                </el-col>
                <el-col :span="2">
                    例子：
                </el-col>
                <el-col :span="5">
                    <img src="../../common/image/setAppEnter.png"/>
                </el-col>
                <el-col :span="5">
                    <img src="../../common/image/setAppEnter.png"/>
                </el-col>
            </el-row>
        </div>
        
    </div>
    </div>
</template>
<style scope>
.Tips{
    margin-top: 20px;
}
.Tips p{
    margin-top: 10px;
    color: #9B9B9B;
    font-size:14px;
}
#Url .item span {
  margin-right: 8px;
}
#Url .my_input {
  width: 700px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #e5e5e5;
  background-color: #f5f5f5;
  padding: 0 10px;
  border-radius: 2px;
  color: #9b9b9b;
}
#Url .content {
  padding: 30px 0 30px 20px;
}
#Url .btn {
  width: 70px;
  height: 34px;
  line-height: 34px;
  margin-left: 8px;
}
#Url .btn_cc {
  border: 1px solid #d9d9d9;
  color: #333333;
  background-color: #e5e5e5;
}
.live-top {
  margin-bottom: 20px;
  padding: 0px;
  padding-bottom: 20px;
}
.live-top,
.my_section .section_title {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 20px;
  font-family: "Microsoft YaHei" !important;
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}
.elradio {
  margin-left: 30px;
}
.elradio i {
  color: #ea4335;
  font-style: normal;
  margin-left: 10px;
}
.elradio2 {
  padding-left: 100px;
}
</style>
<style>
.swi_90 {
  position: relative;
  right: 0px;
}
.webPage .swi_90 .el-switch__core {
  width: 46px !important;
  height: 22px !important;
}
.webPage .swi_90 .el-switch__core .el-switch__button {
  width: 16px;
  height: 16px;
}
.webPage .swi_90 .el-switch__core:after {
  top: 3px;
}
.webPage .swi_90 .el-switch__label.el-switch__label--right span {
  right: 35px;
  top: 4px;
}
.webPage .swi_90 .el-switch__label.el-switch__label--left span {
  right: 18px;
  top: 4px;
}
</style>

<script>
import {
  ERR_OK,
  GIFT_URL,
  DATA_URL,
  getLStorage,
  PAGE_SIZE,
  MW_Live_API_URL,
  getCookies
} from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
    return {
      userID: getLStorage("userId"),
      value: false,
      tkInfo:getCookies("token"),
      flag:0,
      liveID:getLStorage("liveID")
    };
  },
  components:{
  },
  created() {},
  watch:{
      value(value){
          this.flag++;
          if(this.flag==1){ return}
          
          var params;
          if(value){
              params={
                  userId:this.userID,
                  liveId:this.liveID,
                  appSwitch:"1"
              }
          }
          else{
              params={
                  userId:this.userID,
                  liveId:this.liveID,
                  appSwitch:"0"
              }
          }
          let that = this;
              $.ajax({
                  type: "POST",
                  timeout: 120000, //超时时间设置，单位毫秒
                  async: false,
                  url: DATA_URL + "mwlive/live/setAppSwitch.do",
                  data: params,
                  dataType: "json",
                  success: function(data) {
                    console.log(data)
                    if (data.code == 200) {
                        that.$message({
                        showClose: true,
                        type: "success",
                        message:"设置成功"
                      });
                    }else{
                        that.$message({
                        showClose: true,
                        type: "error",
                        message:"data.msg"
                      });
                    }
                  }
              })
      }
  },
  mounted(){
      this.getInfo();
  },
  methods: {
     getInfo() {
      var params = {user_id:this.userID, live_id: getLStorage("liveID") };//token: this.tkInfo, 
      this.$ajaxs.getH5LiveInfo(params).then(data => {
        console.log(data);
        if (data.code == 1) {
          if (data.result.envelope_enable == undefined) {
            this.$message({
              showClose: true,
              type: "error",
              message: "直播h5页面未添加成功"
            });
          } else {
            if (data.result.show_app_enable == 1) {
                this.value=true;
            } else {
                this.value=false;
            }
          }
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
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
  }
};
</script>

