<template>
    <div class="header bg-fff">
        <el-row class="head-list w1000" style="height:80px;line-height:80px;">
            <el-col :span="2">
                <img class="head-logo" :src="hlImg" id="headLogo" v-if="hlImg!=''">
                <img class="head-logo" src="../../common/image/W-LOGO-1 Copy@3x.png" id="headLogo" v-if="hlImg==''">
            </el-col>
            <el-col  :span="17" class="te-l menu">
                <div class="menuTabs">
                    <span class="tab-item cur-p">
                        <router-link @click="Mlinke('home')" tag="div" to="/index">
                            <!-- <i class="icon iconfont icon-shouye"></i> -->
                            <p>首页</p>
                        </router-link>
                    </span>
                    <span class="tab-item cur-p" id="mainHeader">
                        <router-link @click="Mlinke('qiye')" tag="div" to="/vbIndex">
                            <p>企业版</p>
                        </router-link>
                    </span>
                    <span class="tab-item cur-p" id="yunbo" >
                        <!-- <router-link tag="div" to="/liveControl/0">直播中心</router-link> -->
                        <router-link @click="Mlinke('biaozhun')" tag="div" to="/yunbo">
                            <!-- <i class="icon iconfont icon-zhibo"></i> -->
                            <p>标准版</p>
                        </router-link>
                    </span>
                    <span class="tab-item cur-p" id="videoCenter">
                        <!-- <router-link tag="div" to="/liveControl/0">直播中心</router-link> -->
                        <router-link @click="Mlinke('vidio')" tag="div" to="/main">
                            <!-- <i class="icon iconfont icon-zhibo"></i> -->
                            <p>视频中心</p>
                        </router-link>
                    </span>
                    <span class="tab-item cur-p" id="operateHeader">
                        <router-link @click="Mlinke('guanli')" tag="div" to="/operateManage/livegift">
                            <!-- <i class="icon iconfont icon-iconset0196"></i> -->
                            <p>运营管理</p><!-- 资料管理 -->
                        </router-link>
                    </span>
                    <span class="tab-item cur-p">
                        <router-link @click="Mlinke('zhanghu')" tag="div" to="/account">
                             <!-- <i class="icon iconfont icon-yonghu"></i> -->
                            <p>账户管理</p>
                        </router-link>
                    </span>
                    <span class="tab-item cur-p">
                        <router-link @click="Mlinke('tongji')" tag="div" to="/dataStatistics/visitorData">
                             <!-- <i class="icon iconfont icon-yonghu"></i> dataManagement-->
                            <p>数据统计</p>
                        </router-link>
                    </span>
                </div>
            </el-col>

            <el-col  :span="4" class="te-r account-center">
                <span class="over_txt" id="userName">{{account}}</span><span class="line"></span><span  @click="exitAdmin" class="cur-p">{{adminState}}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// function window.onbeforeunload()
// {
// if(event.clientX > document.body.clientWidth && event.clientY<0 || event.altKey)
//     {
//         window.event.returnValue="确定要退出本页吗？";
//     }
// }
global.liveData = { data: [], thisLive: {}, AllData: {} };
import {
  DATA_URL,
  ERR_OK,
  PAGE_SIZE,
  removeCookie,
  getCookie,
  setLStorage,
  getLStorage,
  delLStorage,
  getCookies,
  chargeError
} from "api/config";
import md5 from 'js-md5'
import { filterStatus } from "api/http";
import axios from "axios";
export default {
  data() {
    return {
      account: "",
      adminState: "退出",
      tkInfo:getCookies("token"),
      hlImg:""
    };
  },
  created() {
  //  this.checkToken();
    this._isLogin();
    this._setAdmin();
    this._LiveBroadcast();
    this._getLiveAllData();
    this.getData();
  },
  methods: {
      Mlinke(name){
          switch (name) {
                case 'home':
                        this.$router.push({
                            path: "/index"
                        });
                    break;
                case 'qiye':
                        this.$router.push({
                            path: "/vbIndex"
                        });
                    break;
                case 'biaozhun':
                    this.$router.push({
                        path: "/yunbo"
                    });
                  break;
                case 'vidio':
                    this.$router.push({
                        path: "/main"
                    });
                  break;
                case 'guanli':
                    this.$router.push({
                        path: "/operateManage/livegift"
                    });
                  break;
                case 'zhanghu':
                    this.$router.push({
                        path: "/account"
                    });
                  break;
                case 'tongji':
                    this.$router.push({
                        path: "/dataStatistics/visitorData"
                    });
                  break;
              default:
                  break;
          }
          
      },
    checkToken(){
      if(this.tkInfo==""||this.tkInfo==null){
        this.$message({
            showClose: true,
            type: "error",
            message: "您的用户信息失效，请重新登陆！"
          });
          this.$router.push({
              path: "/login"
            });
            return;
      }
      else{
        let formdata = new FormData()
        formdata.append('token',this.tkInfo)
        let that = this
        axios({
            method: 'post',
            url: DATA_URL+"manage/user/check_token.do",
            data:formdata,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => {
            if(res.data.code != ERR_OK){
              this.$message({
                showClose: true,
                type: "error",
                message: "您的用户信息失效，请重新登陆！"
              });
              this.$router.push({
              path: "/login"
            });
            }
        })
      }
    },
    changelogo(a){
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = a;//需要更改
        console.log(link);
        document.getElementsByTagName('head')[0].appendChild(link);
      },
    getData(){
          var paramsData={token:this.tkInfo};
          this.$ajaxs.getBrandInfo(paramsData).then(res => {
          if(res.code==1){
              if(res.result.portal_logo_url!=null){
                  this.hlImg=res.result.portal_logo_url;
              }
              if(res.result.browser_ico_url!=null){
                  this.changelogo(res.result.browser_ico_url);
              }
          }else{
            console.log(md5('xiaojiang'))
            this.$message({
              showClose: true,
              type: "error",
              message: chargeError(res.msg)
            });
          }
        })
      },
    _LiveBroadcast() {
      let url;
      if (this.$route.path == "/index") {
        url =
          DATA_URL +
          "mwlive/live/get_listbycreatetime.do?user_id=" +
          getLStorage("user_id") +
          "&page_index=1&page_size=4&timeType=1";
      } else if (this.$route.path == "/main") {
        url =
          DATA_URL +
          "mwlive/live/get_listbycreatetime.do?user_id=" +
          getLStorage("user_id") +
          "&page_index=1&page_size=" +
          PAGE_SIZE +
          "&liveStatus=" +
          "&timeType=1";
        // url = DATA_URL + 'mwlive/live/get_listbyuser.do?user_id='+ getLStorage('user_id') + '&page_index=1&page_size=' + PAGE_SIZE
      }
      axios
        .get(url)
        .then(response => {
          if (response.status === ERR_OK) {
            // if(this.$route.path == '/index'){
            //     global.liveData.data = filterStatus(response.data.data.data_list)
            // }else if(this.$route.path == '/main'){
            //     global.liveData.data = filterStatus(response.data.data.data_list)
            //     // global.liveData.data = global.liveData.data.reverse()
            // }

            global.liveData.PageDATA = response.data.data.page;
            // console.log('response.data',response.data.data)
            // console.log('global',global.liveData.PageDATA)

            let data = response.data.data.data_list;
            for (let i = 0; i < data.length; i++) {
              if (data[i].notify_begin_time != null) {
                // console.log('data[i].notify_begin_time',data[i].notify_begin_time)
                data[i].notify_begin_time = data[i].notify_begin_time;
              } else if (
                data[i].begin_time != null ||
                data[i].begin_time != ""
              ) {
                // console.log('data[i].begin_time',data[i].begin_time)
                data[i].notify_begin_time = data[i].begin_time;
              } else {
                data[i].notify_begin_time = "暂无直播";
              }

              // if (data[i].live_switch == 1) {
              //     data[i].live_switch = false
              // } else {
              //     data[i].live_switch = true
              // }

              if (data[i].live_switch == 0) {
                data[i].live_switch = false;
              } else if (data[i].live_switch == 2) {
                data[i].switch_disabled = true;
                data[i].no_del = true;
                data[i].no_del = true;
                data[i].live_switch = true;
              } else {
                data[i].live_switch = true;
              }
            }

            this.$emit("dataList", data);
            this.$emit("PageDATA", global.liveData.PageDATA);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    _getLiveAllData() {
      if (this.$route.path == "/index") return false;
      // axios.get(DATA_URL + 'mwlive/live/get_listbyuser.do?user_id='+ getLStorage('user_id') + '&page_size=200'
      axios
        .get(
          DATA_URL +
            "mwlive/live/get_listbyuser.do?user_id=" +
            getLStorage("user_id") +
            "&page_index=1&page_size=" +
            PAGE_SIZE
        )
        .then(response => {
          if (response.status === ERR_OK) {
            global.liveData.AllData = filterStatus(
              response.data.data.data_list
            );
            // console.log('global',global.liveData.AllData)
            this.$emit("dataList", global.liveData.data);
            this.$emit("PageDATA", global.liveData.PageDATA);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    exitAdmin() {
      delLStorage("admin");
      delLStorage("userId");
      delLStorage("liveID");
      delLStorage("iconImg");
      delLStorage("mobile");
      delLStorage("showId");
      removeCookie("admin");
      removeCookie("password");
      removeCookie("flag");
      removeCookie("mid");
      removeCookie("22eb4d3820015070");
      removeCookie("d4c0e137f9de3dfc");
      removeCookie("token");
      this.$router.push({
        path: "/login"
      });
    },
    _isLogin() {
      if (getCookie("admin") && getCookie("userId")) {
          setLStorage("user_id", getCookie("userId"));
          setLStorage("admin", getCookie("admin"));
          setLStorage("user_id", getCookie("userId"));
      }
      // 登陆失效
      if (!getCookie("admin")) {
        this.$router.push({
          path: "/login"
        });
      }
      // if (!getLStorage("admin") && !getCookie("flag")) {
      //   // this.$message({
      //   //   message: "请登录！",
      //   //   type: "info"
      //   // });
      //   return false;
      // }
    },
    _setAdmin() {
      this.account = getLStorage("admin");
    }
  },
};
</script>

<style scoped>
/* .header{border-bottom: 1px solid #caced1;box-shadow: 0 1px 5px #d3d5d7;} */
.w1000 {
  width: 1160px;
}
.header .iconfont {
  font-size: 28px;
  margin-bottom: 10px;
}
.menu {
  position: absolute;
  left: 130px;
}
.head-list {
  position: relative;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
  background-color: #fff;
}
.head-logo {
  position: absolute;
      top: 50%;
    width: 132px;
    height: 49px;
     /* top: 50px;
    width: 90px;
    height: 44px; */
  transform: translate(0, -50%);
  -ms-transform: translate(0, -50%); /* IE 9 */
  -moz-transform: translate(0, -50%); /* Firefox */
  -webkit-transform: translate(0, -50%); /* Safari 和 Chrome */
  -o-transform: translate(0, -50%); /* Opera */
}
.new-live {
  background: #20a0ff;
  color: #fff;
}
.tab-item {
  display: inline-block;
  padding-left: 60px;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  color: #333333;
}
/* .tab-item div{
    height: 96px;
    line-height: 96px;
} */
.router-link-active {
  background: #fff;
  color: #2B6CFF;
}
.account-center {
  /* line-height: 96px; */
  position: absolute;
  right: 0px;
  color: #9b9b9b;
  font-size: 14px;
}
.account-center .over_txt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  display: inline-block;
  position: absolute;
  right: 55px;
}
.account-center .line {
  display: inline-block;
  width: 1px;
  height: 16px;
  position: relative;
  top: 3px;
  left: -6px;
  border-right: 1px solid #e5e5e5;
}
.account-center span {
  padding: 0 5px;
  display: inline-block;
}
.account-center span:first-child {
  padding-left: 0;
}
</style>
<style>
.menuTabs .tab-item{
  padding-left: 50px;
}
</style>
