<template>
    <div id="Url" style="min-height:670px;">
        <div class="live-top bg-fff clear">
            <div class="fl">
                直播输出配置
            </div>             
        </div>
        <div class="bg-fff table_form">
            <div class="content_section">
                <div class="title">移动端 </div>
                <div class="content">
                    <div class="item">
                        <el-radio-group v-model="radio1">
                            <el-radio :label="1" class="elradio">480P (标清)</el-radio>
                            <el-radio :label="2" class="elradio elradio2">720P (高清)<i>默认输出</i></el-radio>
                            <el-radio :label="3" class="elradio elradio2">原画 (未转码)</el-radio>
                        </el-radio-group>
                        <span @click="original(1)">设为默认</span>
                    </div>
                    <!-- <span style="color:#9B9B9B;font-size:12px;">帮助 : 在微信公众号管理平台，自定义菜单添加链接，用户点击菜单可快速观看直播，详细信息参见</span>
                    <span style="color:#247DFF;">微信嵌入</span> -->
                </div>                
            </div>
            <div class="content_section">
                <div class="title">网页端</div>
                <div class="content">
                    <div class="item">
                        <el-radio-group v-model="radio2">
                            <el-radio :label="1" class="elradio">480P (标清)</el-radio>
                            <el-radio :label="2" class="elradio elradio2">720P (高清)<i>默认输出</i></el-radio>
                            <el-radio :label="3" class="elradio elradio2">原画 (未转码)</el-radio>
                        </el-radio-group>
                        <span @click="original(2)">设为默认</span>
                    </div>
                    <!-- <span style="color:#9B9B9B;font-size:12px;">注意 :当前只支持默认活动和密码活动的嵌入，更多嵌入信息参见</span>
                    <span style="color:#247DFF;">网页嵌入指南</span> -->
                </div>                
            </div>
            <el-row style="text-align: center;">
                <el-button type="primary">确定</el-button>
            </el-row>
        </div>
        
    </div>
</template>
<style scope>
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



<script>
import { ERR_OK, GIFT_URL, DATA_URL, getLStorage, PAGE_SIZE,MW_Live_API_URL } from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
    return {
      userID: getLStorage("userId"),
      radio1: 1,
      radio2: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    original(a) {
      if (a == 1) {
        this.radio1 = 2;
      } else {
        this.radio2 = 2;
      }
    },
    getData() {
        axios.get(DATA_URL + 'mwlive/live/get_info.do?id='+ getLStorage("liveID")
              ).then((response) => {
                  console.log(response);//definition(默认清晰度),select_definition(勾选中的清晰度，例如：1,2,3)
              })
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

