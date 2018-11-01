

<template>
    <div>
        <div class="pd10 live-top">
            分享信封设置
            <!-- <el-button class="middle" type="primary" style="float:right;">发布</el-button> -->
        </div>
        <div class="showPhone">
          <div class="shareBackground">
            <el-row class="wxShow">
                <el-col :span="16">
                    <p class="shareTitle">{{shareTitle}}</p>
                    <p class="shareDescrib">{{shareDescrib}}</p>
                    <!-- <h5 class="shareLink">https://lanhuapp.com/web/#/item/board/detail</h5> -->
                </el-col>
                <el-col :span="8">
                    <img class="shareImg" :src="shareImg" v-if="shareImg!=''"/>
                </el-col>
            </el-row>
          </div>
            
        </div>
        <div class="wxInfo">
            <div class="menu-setting">
            <p class="shareWord">
            <i>分享信封：</i>
            </p>
            <hr/>
            <el-row class="shareItem">
            <el-col :span="5">
                <p>卡片标题：</p>
            </el-col>
            <el-col :span="19">
                <el-input placeholder="请输入内容" v-model="shareTitle" :maxlength="30" class="inputWidth" style="margin-left: -17px;"></el-input>
                <div class="text_tip">{{shareTitle?shareTitle.length:0}}<span>/30</span></div>
            </el-col>
            </el-row>
            <el-row class="shareItem">
            <el-col :span="5">
                <p>卡片描述：</p>
            </el-col>
            <el-col :span="19">
                <el-input placeholder="请输入内容" v-model="shareDescrib" :maxlength="30" class="inputWidth"></el-input>
                <div class="text_tip">{{shareDescrib?shareDescrib.length:0}}<span>/30</span></div>
            </el-col>
            </el-row>
            <el-row class="shareItem">
            <el-col :span="5">
                <p>添加图片：</p>
            </el-col>
            <el-col :span="19">
               <img :src="shareImg" class="scannerImg" v-if="shareImg!=''"/>
                <upload-img v-on:updateImg="getImgUrl" style="float: left;margin-left:20px;margin-top:60px;"></upload-img>
                <!-- <el-button><i class="el-icon-upload"></i>上传</el-button> -->
                <div class="scannerTips">
                <p>图片大小2M以内；支持PNG、JPG、JPEG格式</p>
                </div>
            </el-col>
            </el-row>
            <el-button  type="primary" class="rightbottomBtn" @click="saveShare">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import UploadImg from "@/components/mainPage/uploadImg";
import { getLStorage ,getCookies,DATA_URL} from "api/config";
import axios from "axios";
export default {
  data() {
    return {
      shareImg:
        "http://mwdatatest.facebac.com/1/0/0/6331d3b14dc77e625dc7/7290c021-3667-4704-a2f6-98ec8efb36fb.jpg",
      shareTitle: "梦网云播客服",
      shareDescrib: "快来围观我的精彩视频吧！",
      serveUsing: false,
      tkInfo: getCookies('token'),
      userID:getLStorage("userId")
    };
  },
  mounted() {
    this.getVideoInfo();
    this.getShareInfo();
  },
  methods: {
    //获取点播信息
    getVideoInfo(){
      axios
          .get(DATA_URL + "mwlive/vod/getVodInfo.do?id=" + getLStorage("defRoomId"))
          .then(response => {
            if (response.data.code == "200") {
              if(response.data){
                this.shareTitle=response.data.data.vodName;
                this.shareImg = response.data.data.vodCoverUrl;
              }
            }
          })
          .catch(function (err) {
            console.log(err);
            console.log("err", err);
          });
    },
    getImgUrl(a) {
      console.log("image Url:" + a);
      this.shareImg = a;
    },
    saveShare() {
      if(this.shareTitle==""||this.shareDescrib==""||this.shareImg==""){
        this.$message({
            showClose: true,
            type: "Info",
             message: "请将分享信息填写完整"
          });
          return
      }
      var serveParams = {
        token: this.tkInfo,
        video_id: getLStorage("defRoomId"),
        envelope_enable: "1",
        envelope_name: this.shareTitle,
        envelope_desc: this.shareDescrib,
        envelope_logo_url: this.shareImg
      };
      console.log(serveParams);
      this.$ajaxs.setvideoShare(serveParams).then(data => {
        console.log(data);
        if (data.code == 1) {
          console.log(data);
          this.$message({
            showClose: true,
            type: "success",
            message: "保存成功"
          });
          this.getShareInfo();
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
      });
    },
    getShareInfo() {
      var params = { user_id:this.userID, video_id: getLStorage("defRoomId") };//token: this.tkInfo,
      this.$ajaxs.getVideoInfo(params).then(data => {
        console.log(data);
        if (data.code == 1) {
          if (data.result.envelope_enable == undefined) {
            this.$message({
              showClose: true,
              type: "error",
              message: "直播h5页面未添加成功"
            });
          } else {
            if (data.result.envelope_name != null&&data.result.envelope_name != "") {
              this.shareTitle = data.result.envelope_name;
            }
            if (data.result.envelope_desc != null&&data.result.envelope_desc != "") {
              this.shareDescrib = data.result.envelope_desc;
            }
            if (data.result.envelope_logo_url != null&&data.result.envelope_logo_url != "") {
              this.shareImg = data.result.envelope_logo_url;
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
    }
  },
  components: {
    UploadImg
  }
};
</script>
<style scoped> 
.wxShow {
  position: relative;
      top: 165px;
    height: 77px;
    width: 150px;
    left: 40px;
  background: #fff;
  border-radius: 20px;
  padding: 10px;
  padding-left: 15px;
  padding-top: 5px;
}
.shareImg {
  width: 85%;
  margin-left: 10px;
  margin-top: 20px;
      height: 30px;
    width: 30px;
}
.showPhone p {
  font-size: 10px;
}
.shareTitle {
  font-weight: bold;
  margin-top: 2px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.shareDescrib {
  margin-top: 2px;
  font-weight: normal;
  margin-top: 2px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.shareWord {
  height: 45px;
  margin-top: 10px;
  margin-right: 10px;
}
.shareWord i {
  position: absolute;
  top: 20px;
  left: 10px;
  font-style: normal;
  color: #333333;
  font-weight: bold;
}
.showPhone {
  float: left;
  width: 270px;
  height: 550px;
  background: url("../../common/image/phoneFrame.png") no-repeat;
  background-size: 100%;
}
.shareBackground {
  background: url("../../common/image/shareBack.png") no-repeat;
  width: 238px;
    height: 495px;
  background-size: 100%;
  position: relative;
  top: 60px;
  left: 17px;
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
  margin-top: 25px;
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
  margin-top: 120px;
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
.scannerImg {
  height: 96px;
  width: 96px;
  float: left;
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
.text_tip{
  margin-top: 8px;
  top: auto;
}
.inputWidth{
      width: 305px;
        margin-left: -12px;
}
</style>





