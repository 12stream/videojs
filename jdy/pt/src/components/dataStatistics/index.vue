<template>
    <div>
        <m-header></m-header>
        <div class="w1000 mt20">
            <el-row>
                <el-col :span="5" style="width: 190px; background: rgb(237, 238, 241);">
                    <s-data></s-data>
                </el-col>
                <el-col :span="19" style="width:970px;">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div> 
        
        <m-footer></m-footer>
    </div>
</template>
<script>
import MHeader from "components/header/header";
import mFooter from "components/header/footer";
import SData from "components/leftnav/statisticLeft";
export default {
  data() {
    return {};
  },
  components: {
    MHeader,
    mFooter,
    SData
  }
};
</script>

