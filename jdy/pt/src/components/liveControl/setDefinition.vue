<template>
    <div id="Url" style="min-height:670px;">
        <div class="live-top bg-fff clear">
            <div class="fl">
                直播输出配置
            </div>             
        </div>
        <div class="bg-fff table_form">
            <div class="content_section">
                <div class="title"></div>
                <div class="content">
                    <div class="item">
                        <!-- <el-radio-group v-model="radio1">
                            <el-radio :label="3" class="elradio">480P (高清)</el-radio>
                            <el-radio :label="2" class="elradio elradio2">720P (超清)</el-radio>
                            <el-radio :label="1" class="elradio elradio2">原画 (未转码)<i>默认输出</i></el-radio>
                        </el-radio-group> -->
                        <el-checkbox-group v-model="radio1">
                          <el-checkbox :label="'3'" class="elradio">480P (高清)</el-checkbox>
                          <el-checkbox :label="'2'" class="elradio elradio2">720P (超清)</el-checkbox>
                          <el-checkbox :label="'1'" class="elradio elradio2">原画 (未转码)<i>默认输出</i></el-checkbox>
                        </el-checkbox-group>
                        <!-- <span @click="original(1)">设为默认</span> -->
                    </div>
                    <!-- <span style="color:#9B9B9B;font-size:12px;">帮助 : 在微信公众号管理平台，自定义菜单添加链接，用户点击菜单可快速观看直播，详细信息参见</span>
                    <span style="color:#247DFF;">微信嵌入</span> -->
                </div>                
            </div>
            <el-row style="text-align: center;">
                <el-button type="primary" @click="setDefinition">确定</el-button>
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
import {
  ERR_OK,
  GIFT_URL,
  DATA_URL,
  getLStorage,
  PAGE_SIZE,
  MW_Live_API_URL
} from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
    return {
      userID: getLStorage("userId"),
      radio1: '',
      liveID: getLStorage("liveID"),
      radio2:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    original(a) {
      this.radio1 = 3;
    },
    getData() {
      axios
        .get(
          MW_Live_API_URL +
            "/20/api/mwlive/live/get_info.do?id=" +
            this.liveID +
            "&user_id=" +
            this.userID
        )
        .then(res => {
          if (res.data.code == "200") {
            // this.radio1 = Number(res.data.data.selectDefinition);
            this.stats = res.data.data.live_status;
            this.radio2 = res.data.data.definition;
            // this.radio1 = Number(res.data.data.definition);
            this.radio1 = res.data.data.selectDefinition.split(',');
            // this.radio1 = [1]
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    setDefinition() {
      if (this.stats == 1) {
          this.$message('正在直播，不能修改直播配置')
          return
      }
      let url = MW_Live_API_URL + "/20/api/mwlive/live/setLiveDefintion.do";
      let formdata = new FormData();
      formdata.append("liveId", this.liveID);
      formdata.append("userId", this.userID);
      formdata.append("definition", this.radio2);
      formdata.append("selectDefinition", this.radio1);
      axios({
        method: "post",
        url: url,
        data: formdata
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "200") {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.getData();
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
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

