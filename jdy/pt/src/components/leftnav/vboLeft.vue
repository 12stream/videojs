<template>
    <div class="left-nav" id="left-nav" style="height: 680px;">
        <el-row class="tac">
            <el-col>

                <el-menu  :default-active="$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">
                    <el-menu-item index="/mainPage" class="menu_item_title" style="padding-left: 20px !important;font-size: 14px;">主页列表</el-menu-item>
                    <el-submenu  class="menu_item_title subtitle" index="/mainPage/operateManage" style="border-bottom: none;padding: 0px;">
                      <template slot="title">增值服务</template> 
                      <!-- <el-menu-item index="/mainPage/wxCheck" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">授权管理</el-menu-item>
                      <el-menu-item index="/mainPage/brandCheck" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">品牌设置</el-menu-item> -->
                      <el-menu-item index="/mainPage/operateManage" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">授权管理</el-menu-item>
                      <!-- <el-menu-item index="/mainPage/requestWXPay" v-if="flag == 'nosrvice'" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">微信支付</el-menu-item>
                      <el-menu-item index="/mainPage/operateWXPay" v-if="flag == 'service'" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">微信支付</el-menu-item>
                      <el-menu-item index="/mainPage/operateDomainName" v-if="qyqx" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">企业域名接入</el-menu-item> -->
                      <el-menu-item index="/mainPage/brandSetting" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">品牌设置</el-menu-item>
                    </el-submenu >
                      
                    <!-- <el-menu-item index="/mainPage/operateDomainName">企业域名接入</el-menu-item> -->
                    <!-- <el-menu-item index="/liveControl/LiveH5Serve">定制化小程序</el-menu-item> -->
                </el-menu>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import { ERR_OK, DATA_URL, GIFT_URL, getLStorage ,getCookies} from "api/config";
import Bus from '../bus.js'
import { filterObj } from "api/http";
export default {
  data() {
    return {
      //live_permit:'',
      // defaultRouter:''
      flag:'',
      wxqx:false,
      qyqx:false
    };
  },
  mounted() {
    console.log("route"+this.$route.path);
  },
  created() {
    // this.resizeHeight()
    this._getData();
    this.getWXsq();
    console.log(this.w)
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
    },
    getKey(i){
      var url = DATA_URL + "mwlive/user/selectUserSpecialServiceByID.do";
          let formdata = new FormData();
          formdata.append("user_id", getLStorage("user_id"));
          formdata.append("type", i);
        axios({
            method: "post",
            url: url,
            data: formdata
          })
            .then(res=>{
              if (res.status == 200) {
                  if(res.data.data!=null&&res.data.data!=""&&res.data.data.length>0){
                 //   debugger
                      var timestamp = Date.parse(new Date());
                       timestamp = timestamp / 1000;
                      //  console.log(res.data.data[0].end_time/1000,Number(timestamp)>0);
                      if(res.data.data[0].end_time==0||res.data.data[0].end_time/1000-Number(timestamp)/1000>0){
                          
                          if (i == 4) {
                            this.flag = 'service'; //开通微信支付
                          }else{
                            this.qyqx = true
                          }
                      }
                  }else{
                      
                      if (i == 4) {
                        this.flag = 'nosrvice' //没有微信支付权限
                      }else{
                        this.qyqx = true;
                      }
                  }
                // this.centerDialogVisible = false;
              } else {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: "获取授权权限失败：" + res
                });
              }
            })
            
    },
    getWXsq(){
      //获取微信公众号授权
          let params2 = {
              token:getCookies('token')
          }
          this.$ajaxs.getUserAccredit(params2).then(data=>{
              // data.result.user_Accredit_type = 1
            if (data.code == 1 && data.result.user_Accredit_type == 1 ) {
                this.getKey('4');
                this.getKey('5');
                // if (this.wxqx == 'yes') {
                //     this.flag = 'service';
                //     this.qyqx = true;
                // }else{
                //     this.flag = 'nosrvice';
                //     this.qyqx = true;
                // }
            }
        })
    }

  },
  computed: {
    live_permit2: {
      get: function() {
        return this.$store.state.live_permit2;
      },
      set: function() {}
    }
  },
  mounted(){
    Bus.$on('update',(val)=>{
        if (val) {
            this.getWXsq()
        }else{
          this.flag = false;
          this.qyqx = false;
        }
    })
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
</style>
<style>
#left-nav .el-submenu .el-menu-item{
      background-color: #fff !important;
}
#left-nav .el-submenu .el-menu .is-active{
      color: #2B6CFF !important;
    background-color: #ECF6FF !important;
}
#left-nav .el-submenu .el-menu-item{
    background-color: #fff !important;}
    .el-submenu .el-menu-item{
      min-width: 180px;
    }
</style>



