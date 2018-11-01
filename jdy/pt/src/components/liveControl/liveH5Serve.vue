<template>
    <div>
        <div class="pd10 live-top">
            客服设置
            <!-- <el-button class="middle" type="primary" style="float:right;">发布</el-button> -->
        </div>
        <div class="showPhone">
          <div class="backgroundImg" style="">
            <el-row class="wxShow">
            <el-col :span="24">
                <p style="top:22px;" class="shareTitle">{{serviceName}}</p>
                <!-- <h5 class="shareLink">https://lanhuapp.com/web/#/item/board/detail</h5> -->
            </el-col>
            <el-col :span="24" class="imgPosition" style="top:41px;">
                <img class="shareImg" :src="shareImg" v-if="shareImg!=null"/>
            </el-col>
            <el-col :span="24">
                <p style="top:139px;" class="smallTips">扫描联系客服进行咨询</p>
            </el-col>
            <!-- <el-col :span="24">
                <p class="shareFoot">关注后可收到直播最新动态哦</p>
            </el-col> -->
            <div class="iconPosition" v-if="serveUsing">
              <img src="../../common/image/service.png"/>
            </div>
            </el-row>
          </div>
        </div>
        <div class="wxInfo">
            <div class="menu-setting">
            <p class="isStart">
            <i>功能开关：</i>
            <!-- <section class="model-13">
            <div class="checkbox">
                <input type="checkbox" v-model="serveUsing"/>
                <label></label>
            </div></section> -->
            <el-switch
              class="my_switch mySwitch"
              v-model="serveUsing"
              active-text="开启"
              :width="60"
              active-color="#2B6CFF"
              inactive-color="#CCCCCC"
              inactive-text="关闭">
              </el-switch>
            </p>
            <hr/>
            <el-row class="shareItem">
            <el-col :span="5">
                <p>客服名称：</p>
            </el-col>
            <el-col :span="19">
                <el-input placeholder="请输入内容" v-model="serviceName" :maxlength="30" style="width: 305px;"></el-input>
                <div class="text_tip">{{serviceName?serviceName.length:0}}<span>/30</span></div>
            </el-col>
            </el-row>
            <el-row class="shareItem">
            <el-col :span="5">
                <p>二维码上传：</p>
            </el-col>
            <el-col :span="19">
                <upload-img v-on:updateImg="getImgUrl" style="float: left;margin-top:5px;"></upload-img>
                <!-- <el-button><i class="el-icon-upload"></i>上传</el-button> -->
                <div class="scannerTips">
                <p>图片大小2M以内；支持PNG、JPG、JPEG格式</p>
                </div>
            </el-col>
            </el-row>
            <el-button  type="primary" class="rightbottomBtn" @click="saveWx">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import UploadImg from "@/components/mainPage/uploadImg";
import { getLStorage,getCookies,chargeError } from "api/config";
export default {
  data() {
    return {
      shareImg:"http://mwdatatest.facebac.com/1/0/0/6331d3b14dc77e625dc7/d2e6c0ac-c484-41e5-82fb-edcc81ebe8f1.jpg",
      serviceName: "客服",
      serveUsing: false,
      tkInfo:getCookies("token"),
      userID:getLStorage("userId")
    };
  },
  mounted() {
    this.getServeInfo();
  },
  methods: {
    getImgUrl(a) {
      console.log("image Url:" + a);
      this.shareImg = a;
    },
    saveWx() {
      var serveEnable = "0";
      if (this.serveUsing) {
        serveEnable = "1";}
      //else{
      //   this.$message({
      //       showClose: true,
      //       type: "Info",
      //       message: "请先开启客服"
      //     });
      //     return;
      // }
      if(this.serviceName==""||this.shareImg==""){
        this.$message({
            showClose: true,
            type: "Info",
            message: "请将客服名称及二维码填写完整"
          });
          return;
      }
      var serveParams = {
        token: this.tkInfo,
        live_id: getLStorage("liveID"),
        service_enable: serveEnable,
        service_name: this.serviceName,
        service_qr_url: this.shareImg
      };
      console.log(serveParams);
      this.$ajaxs.changeLiveService(serveParams).then(data => {
        console.log(data);
        if (data.code == 1) {
          console.log(data);
          this.$message({
            showClose: true,
            type: "success",
            message: "保存成功"
          });
          this.getServeInfo();
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: chargeError(data.code)
          });
        }
      });
    },
    getServeInfo() {
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
            if (data.result.service_enable == 0) {
              this.serveUsing = false;
            } else {
              this.serveUsing = true;
            }
            
            if(data.result.service_name!=""&&data.result.service_name!=null){
              this.serviceName = data.result.service_name;
            }
            if(data.result.service_qr_url!=""&&data.result.service_qr_url!=null){
              this.shareImg = data.result.service_qr_url;
            }
          }
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: chargeError(data.code)
          });
        }
      });
    }
  },
  components: {
    UploadImg
  }
};
</script>
<style scoped>
.backgroundImg{
    background: url(../../common/image/iphonebg6.png) no-repeat;
    background-size: 100% 100%;
}
.wxShow {
  color: #606266;
  font-size: 10px;
  position: relative;
  top: 142px;
  text-align: center;
}
.shareImg {
  width: 78px;
  height: 78px;
  margin-top: 15px;
}
.imgPosition{
  position: absolute;
    top: 20px;
}
.smallTips{
      position: absolute;
    top: 115px;
    left: 55px;
}
.isStart {
  height: 45px;
  margin-top: 10px;
  margin-right: 10px;
}
.isStart i {
  position: absolute;
  top: 20px;
  right: 110px;
  font-style: normal;
}
.showPhone {
  float: left;
  width: 270px;
  height: 550px;
  background: url(../../common/image/phoneFrame.png) no-repeat;
  background-size: 100%;
}
.wxInfo {
  float: left;
  width: 590px;
}
.wxInfo hr {
  border: 1px solid #f2f2f2;
  margin: 0;
  padding: 0;
}
.menu-setting {
  position: relative;
  margin-left: 70px;
  margin-top: 15px;
  width: 480px;
  height: 450px;
  border: 1px solid #d9d9d9;
  text-align: center;
}
.shareItem {
  margin-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
}
.shareItem p {
  font-size: 14px;
  color: #333333;
  margin-top: 9px;
}
.scannerTips {
  text-align: left;
  margin-top: 70px;
}
.rightbottomBtn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.checkboxItem {
  margin-top: 10px;
}
.scannerTips p {
  font-size: 10px;
  color: #9b9b9b;
}
/*是否checkbox样式*/
.model-13 {
  float: right;
}
.checkbox {
  position: relative;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
}
.checkbox label {
  width: 85px;
  height: 42px;
  background: #ccc;
  position: relative;
  display: inline-block;
  border-radius: 46px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.checkbox label:after {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  left: 0;
  top: -5px;
  z-index: 2;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.checkbox input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}
.model-13 .checkbox:after {
  content: "关闭";
  font-family: Arial;
  position: absolute;
  color: #666;
  top: 9px;
  right: 15px;
}
.model-13 .checkbox label {
  background: none;
  border: 3px solid #777;
  height: 34px;
  border-radius: 20px;
}
.model-13 .checkbox label:after {
  content: "开启";
  font-family: Arial;
  color: #fff;
  text-align: center;
  line-height: 28px;
  text-indent: 100px;
  background: #777;
  overflow: hidden;
  box-shadow: none;
  border-radius: 14px;
  -ms-transform: translateX(-50px);
  -webkit-transform: translateX(-50px);
  transform: translateX(-50px);
  -moz-transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  -o-transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  -webkit-transition: all 0.4s, width 0.2s linear, text-indent 0.4s linear;
  -webkit-transition-delay: 0.2s, 0s, 0s;
  -webkit-transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  top: 3px;
  left: auto;
  right: 2px;
  width: 28px;
  height: 28px;
}
.model-13 .checkbox input:checked + label {
  border-color: #4285f4;
}
.model-13 .checkbox input:checked + label:after {
  background: #4285f4;
  left: auto;
  -ms-transform: translateX(0px);
  -webkit-transform: translateX(0px);
  transform: translateX(0px);
  -moz-transition: all 0.4s, width 0.2s linear 0.4s,
    text-indent 0.3s linear 0.4s;
  -o-transition: all 0.4s, width 0.2s linear 0.4s, text-indent 0.3s linear 0.4s;
  -webkit-transition: all 0.4s, width 0.2s linear, text-indent 0.3s linear;
  -webkit-transition-delay: 0s, 0.4s, 0.4s;
  -webkit-transition: all 0.4s, width 0.2s linear 0.4s,
    text-indent 0.3s linear 0.4s;
  transition: all 0.4s, width 0.2s linear 0.4s, text-indent 0.3s linear 0.4s;
  width: 80px;
  text-indent: 0;
}
.mySwitch{
  float: right;
      margin-top: 8px;
}
.iconPosition{
  top: 200px;
}
.text_tip {
  margin-top: 8px;
  top: auto;
}
.shareTitle{
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    width: 100px;
    position: relative;
    margin: 0 auto;
}
</style>



