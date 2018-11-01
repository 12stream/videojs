<template>
    <div class="left-nav" id="left-nav">
        <el-row class="tac"> 
            <el-col>
              <el-menu  :default-active="$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">
                <!-- 直播间 -->
                <el-menu-item index="/liveControl/h5Index" class="menu_item_title" v-if="pathType=='2'" style="padding-left: 20px !important;font-size: 14px;">自定义菜单栏</el-menu-item>
                  <el-submenu  class="menu_item_title subtitle" index="/liveControl/LiveH5WX"   v-if="pathType=='2'" style="border-bottom: none;padding: 0px;">
                    <template slot="title">二维码设置</template> 
                  <el-menu-item index="/liveControl/LiveH5WX" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">公众号设置</el-menu-item>
                  <el-menu-item index="/liveControl/LiveH5Serve"  style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">客服设置</el-menu-item>
                </el-submenu >
                <el-menu-item index="/liveControl/praiseH5" class="menu_item_title" v-if="pathType=='2'" style="padding-left: 20px !important;font-size: 14px;">点赞开关</el-menu-item>

                <!-- 点播间 -->
                <!-- <el-menu-item index="/onDemand/h5Index" v-if="pathType=='3'" class="menu_item_title" style="padding-left: 20px !important;font-size: 14px;">自定义菜单栏</el-menu-item>
                  <el-submenu  class="menu_item_title subtitle" index="/liveControl/LiveH5WX"   v-if="pathType=='3'" style="border-bottom: none;padding: 0px;">
                    <template slot="title">二维码设置</template> 
                  <el-menu-item index="/onDemand/LiveH5WX" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">公众号设置</el-menu-item>
                  <el-menu-item index="/onDemand/LiveH5Serve"  style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">客服设置</el-menu-item>
                </el-submenu > -->

                  <el-submenu  class="menu_item_title subtitle" index="/liveControl/livebg"   style="border-bottom: none;padding: 0px;">
                    <template slot="title">基础设置</template> 
                  <el-menu-item index="/liveControl/livebg" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">直播背景</el-menu-item>
                  <el-menu-item index="/liveControl/liveLogo"  style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">视频LOGO</el-menu-item>
                  <el-menu-item index="/liveControl/liveEnd"  style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">直播结束</el-menu-item>
                  <!-- <el-menu-item index="/liveControl/setDefinition"  style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">直播输出配置</el-menu-item> -->
                </el-submenu >

                <el-menu-item index="/liveControl/viewSettings" class="menu_item_title" style="padding-left: 20px !important;font-size: 14px;">观看设置</el-menu-item>

                <el-submenu  class="menu_item_title subtitle" index="/dataManagement/livegift"   style="border-bottom: none;padding: 0px;">
                    <template slot="title">互动打赏</template> 
                  <el-menu-item index="/dataManagement/livegift" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">礼物管理</el-menu-item>
                </el-submenu >

                <el-menu-item index="/liveControl/ticketsList" class="menu_item_title" v-if="live_permit2==3" style="padding-left: 20px !important;font-size: 14px;">门票管理</el-menu-item>
                <el-menu-item index="/liveControl/venueManagement" class="menu_item_title" style="padding-left: 20px !important;font-size: 14px;">分会场管理</el-menu-item>
                <el-menu-item index="/liveControl/videoList" class="menu_item_title" style="padding-left: 20px !important;font-size: 14px;">录像管理</el-menu-item>
                <el-menu-item index="/liveControl/userSettings" class="menu_item_title"  style="padding-left: 20px !important;font-size: 14px;">重要人物设置</el-menu-item>
                <el-menu-item index="/liveControl/whiteList" class="menu_item_title" v-if="live_permit2==4" style="padding-left: 20px !important;font-size: 14px;">名单管理</el-menu-item>
                <el-menu-item index="/liveControl/shareEmbedded" class="menu_item_title" style="padding-left: 20px !important;font-size: 14px;">分享嵌入</el-menu-item>
                <el-menu-item index="/liveControl/liveH5Share" class="menu_item_title" v-if="pathType=='2'" style="padding-left: 20px !important;font-size: 14px;">分享信封</el-menu-item>
                <el-menu-item index="/liveControl/setAppLogo" class="menu_item_title" v-if="pathType=='1'" style="padding-left: 20px !important;font-size: 14px;">网页展示APP入口</el-menu-item>
                <!-- <el-menu-item index="/liveControl/setAppLogo" class="menu_item_title" style="padding-left: 20px !important;font-size: 14px;">网页展示APP入口</el-menu-item> -->

              </el-menu>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import { ERR_OK, DATA_URL, GIFT_URL, getLStorage } from "api/config";
import { filterObj } from "api/http";
export default {
  data() {
    return {
      pathType: "0"
      //live_permit:'',
      // defaultRouter:''
    };
  },
  mounted() {
    console.log("route" + this.$route.path);
  },
  created() {
    // this.resizeHeight()
    this._getData();
    // this.pathType=this.$route.query.type;
    this.pathType = getLStorage("type");
  },
  methods: {
    _getData() {
      let url =
        DATA_URL + "mwlive/live/get_info.do?id=" + getLStorage("liveID");
      axios
        .get(url)
        .then(response => {
          if (response.data.code == ERR_OK) {
            // this.live_permit = response.data.data.live_permit
            this.$store.state.live_permit2 = response.data.data.live_permit;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    resizeHeight() {
      // var height = document.getElementById("left-nav")
      var eh = document.documentElement.clientHeight - 50 + "px";
      console.log(eh);
      // height.style.height =  eh
    }
  },
  computed: {
    live_permit2: {
      get: function() {
        return this.$store.state.live_permit2;
      },
      set: function() {}
    }
  }
};
</script>


<style scoped>
#left-nav .el-submenu__title {
  background-color: #f1f5f9 !important;
  color: #222d37;
}
#left-nav .is-active .el-submenu__title {
  background-color: #58cafd !important;
  color: #ffffff;
}
#left-nav .is-active .el-submenu__title:hover {
  background-color: #58cafd !important;
  color: #ffffff;
}
#left-nav .el-submenu__title:hover {
  background-color: #f1f5f9 !important;
}
#left-nav .el-menu .el-menu-item-group {
  background-color: #fff !important;
}
#left-nav .el-submenu {
  border-bottom: 1px solid #e0e4e7;
}
#left-nav .el-submenu i {
  margin-right: 10px;
}
/* #left-nav .el-submenu .el-menu .is-active {
  background-color: #4f5f6f !important;
} */
#left-nav .el-menu-item,
#left-nav .el-submenu__titl {
  font-size: 12px;
  color: #9b9b9b;
  height: 40px;
  line-height: 40px;
}
#left-nav .el-menu-item.menu_item_title {
  padding: 0;
  height: 45px;
  line-height: 45px;
  background-color: #fff !important;
  color: #000 !important;
}
#left-nav .el-menu-item,
#left-nav .el-submenu__title {
  padding-left: 50px !important;
}
#left-nav .menu_item_title {
  font-size: 14px;
  color: #000000;
  padding: 8px 0;
  cursor: pointer;
}
#left-nav
  .el-menu--horizontal.el-menu--dark
  .el-submenu
  .el-menu-item.is-active,
.el-menu-item.is-active {
  color: #2B6CFF !important;
  background-color: #ecf6ff;
}
#left-nav .el-menu-item:focus,
#left-nav .el-menu-item:hover {
  background-color: #ecf6ff;
  color: #2B6CFF;
}

#left-nav .el-submenu .el-menu-item {
  /* background-color: #d8dce0 !important; */
  text-align: left;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #e0e4e7;
  padding-left: 83px !important;
}
.tickets .left-nav {
  height: 750px;
}
.el-submenu .el-menu-item {
    min-width: 150px;
}
</style>
<style>
#left-nav .el-menu-item.menu_item_title.is-active {
  background-color: #ecf6ff !important;
  color: #2B6CFF !important;
}
#left-nav .el-menu-item.menu_item_title.is-active.bgf {
  background-color: #fff !important;
  color: #333333 !important;
}
</style>

