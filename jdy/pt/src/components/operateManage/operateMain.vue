<template>
    <div>
        <m-header></m-header>
        <div class="body-panel">
            <div class="w1000 mt20">
                <el-row>
                    <el-col :span="5" style="width:190px;background: #EDEEF1;" >
                        <operate-left></operate-left>
                    </el-col>
                    <el-col :span="19" style="width:970px;">
                        <router-view></router-view>
                    </el-col>
                </el-row>
            </div>
        </div>
        <m-footer></m-footer>
    </div>
</template>
<script>
import MHeader from "components/header/header";
import MFooter from "components/header/footer";
import OperateLeft from "components/leftnav/operateLeft";
export default {
  data() {
    return {
      realshow: "5",
      msg: "视频播放",
      playType: "lplay",
      playStates: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "livePlay",
          label: "直播"
        },
        {
          value: "previewPlay",
          label: "预告"
        },
        {
          value: "endPlay",
          label: "结束"
        }
      ],
      value2: ""
    };
  },
  components: {
    MHeader,
    MFooter,
    OperateLeft
  },
  mounted(){
  }
};
</script>
<style>
    .body-panel {margin:20px auto;width: 1160px;border-radius: 10px;}
    /*.el-button {padding: 0 20px;}*/
</style>

