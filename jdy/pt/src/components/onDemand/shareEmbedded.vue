<template>
    <div id="Url" style="min-height:670px;">
        <div class="live-top bg-fff clear">
            <div class="fl">
                分享嵌入
            </div>
        </div>
        <div class="bg-fff table_form">
            <div class="content_section">
                <div class="title">微信嵌入 </div>
                <div class="content">
                    <!--<div class="item" v-if="type=='1'">
                        <span>我的主页</span>
                        <input readonly class="input_340 my_input" id="HomeUrl" v-model="myHomeUrl">
                        <el-button type="primary" class="btn btn_cc" @click="copyLink('HomeUrl')">复制</el-button>
                    </div>-->
                    <div class="item">
                        <span>观看视频</span>
                        <input  readonly class="input_340 my_input" id="liveUrl" v-model="liveUrl">
                        <el-button type="primary" class="btn" @click="copyLink('liveUrl')">复制</el-button>
                    </div>
                    <!-- <span style="color:#9B9B9B;font-size:12px;">帮助 : 在微信公众号管理平台，自定义菜单添加链接，用户点击菜单可快速观看直播，详细信息参见</span>
                    <span style="color:#247DFF;">微信嵌入</span> -->
                </div>
            </div>
            <div class="content_section">
                <div class="title">网页嵌入</div>
                <div class="content">
                    <div class="item">
                        <span>完全嵌入</span>
                        <input readonly class="input_340 my_input" id="inset1" v-model="insetAll">
                        <el-button type="primary" class="btn btn_cc"  @click="copyLink('inset1')">复制</el-button>
                    </div>
                    <div class="item">
                        <span>视频嵌入</span>
                        <input readonly class="input_340 my_input" id="inset2" v-model="insetVideoUrl">
                        <el-button type="primary" class="btn"  @click="copyLink('inset2')">复制</el-button>
                    </div>
                    <!-- <span style="color:#9B9B9B;font-size:12px;">注意 :当前只支持默认活动和密码活动的嵌入，更多嵌入信息参见</span>
                    <span style="color:#247DFF;">网页嵌入指南</span> -->
                </div>
            </div>
        </div>

    </div>
</template>
<style scope>
#Url .item {
  margin-bottom: 30px;
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
</style>



<script>
import { ERR_OK, GIFT_URL, DATA_URL, getLStorage, PAGE_SIZE,LIVEH5_URL } from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
    return {
      myHomeUrl: "",
      liveUrl: "",
      insetVideoUrl: "",
      insetAll: "",
      type: getLStorage("type")
    };
  },
  created() {
    this.getURL();
  },
  methods: {
    getURL() {
      axios
        .get(//  DATA_URL
          DATA_URL +
            "mwlive/live/select_h5Embed.do?user_id=" +
            getLStorage("userId") +
            "&live_id=" +
            getLStorage("defRoomId")+
          "&type=VOD"
        )
        .then(res => {
          if (res.data.code == ERR_OK) {
            /*if (this.type == "1") {
              this.liveUrl = res.data.data.liveUrl;
            } else {
              this.liveUrl = LIVEH5_URL + "?liveid=" + getLStorage("liveID");
            }*/
            this.liveUrl = res.data.data.liveUrl;
            this.myHomeUrl = res.data.data.myHomeUrl;
            this.insetVideoUrl = res.data.data.playUrl;
            this.insetHomeUrl =
              '<iframe border="0" src="' +
              this.myHomeUrl +
              '"width="800" height="600"></iframe>';
            this.insetAll =
              '<iframe border="0" src="' +
              this.myHomeUrl +
              '"width="800" height="600"></iframe>';
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    copyLink(id) {
      var url = document.getElementById(id);
      url.select();
      console.log(url);
      document.execCommand("copy");
      this.tipsMessage("复制成功！");
    },
    // copyLink(data){
    //     copyLink(data)
    //     this.tipsMessage('复制成功！')
    // },
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

