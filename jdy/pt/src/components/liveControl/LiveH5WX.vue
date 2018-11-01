<template>
    <div style="height: 700px;">
        <div class="pd10 live-top">
            公众号设置
            <!-- <el-button class="middle" type="primary" style="float:right;">发布</el-button> -->
        </div>
        <div class="showPhone">
            <div class="backgroundImg">
              <el-row class="wxShow">
            <el-col :span="24">
                <p style="margin-top:21px;" class="shareTitle">{{wxName}}</p>
                <!-- <h5 class="shareLink">https://lanhuapp.com/web/#/item/board/detail</h5> -->
            </el-col>
            <el-col :span="24">
                <img class="shareImg" :src="wxImg"/>
            </el-col>
            <el-col :span="24">
                <p class="smallTips">关注后可收到直播最新状态哦</p>
            </el-col>
            </el-row>
            <div class="iconPosition" v-if="wxUsing">
              <img src="../../common/image/wxscanner.png"/>
            </div>
            </div>
        </div>
        <div class="wxInfo">
            <div class="menu-setting">
            <p class="isStart">
            <i>功能开关：</i>
            <!-- <section class="model-13">
            <div class="checkbox">
                <input type="checkbox" v-model="wxUsing"/>
                <label></label>
            </div></section> -->
            <el-switch
              class="my_switch mySwitch"
              v-model="wxUsing"
              active-text="开启"
              :width="60"
              @change="setWxOf"
              active-color="#2B6CFF"
              inactive-color="#CCCCCC"
              inactive-text="关闭">
              </el-switch>
            </p>
            <hr/>
            <el-row class="shareItem">
            <el-col :span="5">
                <p>公众号名称：</p>
            </el-col>
            <el-col :span="19">
                <el-input placeholder="请输入内容" v-model="wxName" :maxlength="30" readonly="readonly" id="inputPart" style="width: 305px;"></el-input>
                <div class="text_tip" style="margin-top:8px;">{{wxName?wxName.length:0}}<span>/30</span></div>
            </el-col>
            </el-row>
            <el-row class="shareItem">
            <el-col :span="5">
                <p>二维码：</p>
            </el-col>
            <el-col :span="19">
                <!-- <upload-img v-on:updateImg="getImgUrl" style="float: left;"></upload-img> -->
                <img :src="wxImg" class="scannerImg" v-if="wxImg!=''"/>
                <div class="scannerTips">
                <p>图片大小2M以内;支持PNG、JPG、JPEG格式</p>
                <el-row class="checkboxItem">
                    <el-checkbox v-model="scannerShow">进入直播间弹二维码</el-checkbox>
                </el-row>
                <el-row class="checkboxItem">
                    <el-checkbox v-model="focus">强制关注</el-checkbox>
                </el-row>
                </div>
            </el-col>
            </el-row>
            <el-button  type="primary" class="rightbottomBtn" @click="saveWx">提交</el-button>
            </div>
        </div>
        <el-dialog
        :visible.sync="wxDialog1"
        width="420px"
        :before-close="cancleBuy"
        center>
        <b>强制关注需要开通公众号授权,是否前往开通？</b>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goBuy">前往购买</el-button>
          <el-button @click="cancleBuy">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="wxDialog2"
        width="420px"
        center>
        <p style="font-weight:bold;">开启强制关注后，有被微信拉黑朋友圈、</p>
        <p style="font-weight:bold;">甚至有被微信封号一段时间的风险，请自行选择。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="wxDialog2 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import UploadImg from "@/components/mainPage/uploadImg";
import { getLStorage, getCookies,facebac_URL,chargeError } from "api/config";
export default {
  data() {
    return {
      wxDialog1:false,
      wxDialog2:false,
      wxImg:facebac_URL+"public/1178309224503852333/img/1_817433040746800104_1531107730.jpg",
    //   wxImg:"http://mwdatatest.facebac.com/1/0/0/6331d3b14dc77e625dc7/d2e6c0ac-c484-41e5-82fb-edcc81ebe8f1.jpg",
      scannerShow: "0",
      focus: "0",
      wxName: "梦网云播", 
      wxUsing: "0",
      tkInfo: getCookies("token"),
      CreditType: 0,
      userID: getLStorage("userId"),
      flag:0
    };
  },
  watch: {
    focus: function(val, oldval) {
      // console.log(val);
      if (val&&this.flag>0) {
        this.scannerShow = true;
        this.$ajaxs.checkWX({ token: this.tkInfo }).then(data => {
          console.log(data);
          if (data.code == 1) {
            this.wxDialog2=true;
          } else {
            this.wxDialog1=true;
          }
        });
      }
      this.flag++;
    },
    scannerShow: function(val, oldval) {
      //console.log(val);
      if (!val) {
        if (this.focus) {
          this.scannerShow = true;
        }
      }
    }
  },
  mounted() {
    this.getCredit();
    this.getData();
    this.getWXInfo();
  },
  methods: {
      setWxOf(){
        //   console.log('222')
        //   let params = {

        //   }
        //   this.$ajaxs.changeLiveWX(params).then(data => {

        //   })
      },
    cancleBuy(){
      this.wxDialog1 = false;
      this.focus=false;
    },
    goBuy(){
      this.$router.push({
              path: "/mainPage/operateManage"
            });
      this.wxDialog1 = false;
    },
    getCredit() {
      var wxParams = { token: this.tkInfo };
      this.$ajaxs.getUserAccredit(wxParams).then(data => {
        console.log(data);
        if (data.code == 1) {
          this.CreditType = data.result.user_Accredit_type;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "获取授权信息失败：" + data.msg
          });
        }
      });
    },
    getImgUrl(a) {
      console.log("image Url:" + a);
      this.wxImg = a;
    },
    getData(){
      var Sparams = {
                user_id:getLStorage("userId"),
                token: this.tkInfo,
                param_id: getLStorage("liveID"),
                param_type: "1"
              };
              // this.$ajaxs.getWXScanner(Sparams).then(data => {
              //   console.log(data);
              //   if (data.code == 1) {
              //     this.wxImg = data.result.img_url;
              //     this.wxName = data.result.name;
              //   } else {
              //     this.$message({
              //       showClose: true,
              //       type: "error",
              //       message: "获取公众号二维码失败"
              //     });
              //   }
              // });
              this.getWXInfo();
    },
    getWXInfo() {
      var params = { user_id: this.userID, live_id: getLStorage("liveID") }; //token: this.tkInfo,
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
            if(data.result.wechat_enable){
              this.wxUsing =true ;
            }
            else{
              this.wxUsing =false ;
            }

            switch (data.result.is_show_qr) {
              case 0:
                this.scannerShow = false;
                this.focus = false;
                break;
              case 1:
                this.scannerShow = true;
                this.focus = false;
                break;
              case 2:
                this.scannerShow = true;
                this.focus = true;
                break;
            }
            // if (this.CreditType != 1) {
              this.wxImg = data.result.qr_code_url;
              this.wxName = data.result.wechat_name;
              // var Sparams = {
              //   user_id:getLStorage("userId"),
              //   token: this.tkInfo,
              //   param_id: getLStorage("liveID"),
              //   param_type: "1"
              // };
              // this.$ajaxs.getWXScanner(Sparams).then(data => {
              //   console.log(data);
              //   if (data.code == 1) {
              //     this.wxImg = data.result.img_url;
              //     this.wxName = data.result.name;
              //   } else {
              //     this.$message({
              //       showClose: true,
              //       type: "error",
              //       message: "获取公众号二维码失败"
              //     });
              //   }
              // });
            // }
            console.log(this.wxImg)
          }
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: chargeError(data.code)
          });
        }
      });
    },
    saveWx() {
      // if (this.CreditType != 1) {
      //   this.$message({
      //     showClose: true,
      //     type: "error",
      //     message: "请先到‘梦网V播’中进行公众号授权"
      //   });
      //   return;
      // }
      var isShow = "0";
      if (this.focus) {
        isShow = "2";
      } else {
        if (!this.scannerShow) {
          isShow = "0";
        } else {
          isShow = "1";
        }
      }
      var wxEnable = "0";
      if (this.wxUsing) {
        wxEnable = "1";
      }
      var wxParams = {
        token: this.tkInfo,
        live_id: getLStorage("liveID"),
        wechat_enable: wxEnable,
        wechat_name: this.wxName,
        qr_code_url: this.wxImg,
        is_show_qr: isShow
      };
      this.$ajaxs.changeLiveWX(wxParams).then(data => {
        console.log(data);
        if (data.code == 1) {
          console.log(data);
          this.$message({
            showClose: true,
            type: "success",
            message: "保存成功"
          });
          this.getWXInfo();
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
.backgroundImg{
  /* background: url(../../common/image/liveBackground.png) no-repeat;
   */
    background: url(../../common/image/iphonebg6.png) no-repeat;
    width: 235px;
    height: 415px;
    background-size: 100%;
    position: relative;
    top: 64px;
    left: 17px;
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
  margin-top: 19px;
}
.smallTips{
      left: 43px;
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
  margin-top: 100px;
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
.scannerImg {
  height: 96px;
  width: 96px;
  float: left;
}
.mySwitch{
  float: right;
      margin-top: 8px;
}
.text_tip{
      top: auto;
}
</style>
<style>
#inputPart{
  color: #ccc;
}
</style>




