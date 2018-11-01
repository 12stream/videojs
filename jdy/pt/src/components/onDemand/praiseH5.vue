<template>
    <div>
        <div class="pd10 live-top">
            点赞设置
            <!-- <el-button class="middle" type="primary" style="float:right;">发布</el-button> -->
        </div>
        <div class="showPhone">
        </div>
        <div class="wxInfo">
            <div class="menu-setting">
            <p class="isStart">
            <i>功能开关：</i>
            <section class="model-13">
            <div class="checkbox">
                <input type="checkbox" v-model="serveUsing"/>
                <label></label>
            </div></section>
            </p>
            <hr/>
            <el-button  type="primary" class="rightbottomBtn" @click="saveWx">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { getLStorage } from "api/config";
import { getCookies } from '../../api/config';
export default {
  data() {
    return {
      serveUsing: false,
      tkInfo:getCookies("token"),
      userID:getLStorage("userId")
    };
  },
  mounted() {
    this.getServeInfo();
  },
  methods: {
    saveWx() {
        var thumb="0";
        if(this.serveUsing){
            thumb="1";
        }
        var params = { token: this.tkInfo, live_id: getLStorage("liveID"),thumb_enable:thumb };
        this.$ajaxs.changeLivePraise(params).then(data => {
        console.log(data);
        if (data.code == 1) {
            this.$message({
            showClose: true,
            type: "success",
            message: "设置成功"
          });
            this.getServeInfo();
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
      });
    },
    getServeInfo() {
      var params = {user_id:this.userID, live_id: getLStorage("liveID") };// token: this.tkInfo,
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
              if(data.result.thumb_enable==0){
                  this.serveUsing=false;
              }
              else{
                  this.serveUsing=true;
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
  }
};
</script>
<style scoped>
.wxShow {
  color: #606266;
  font-size: 10px;
  position: relative;
  top: 41%;
  text-align: center;
}
.shareImg {
  width: 78px;
  height: 78px;
  margin-top: 15px;
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
  background: url(../../common/image/extraBack.png) no-repeat;
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
  margin-top: 75px;
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
  margin-top: 50px;
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
</style>



