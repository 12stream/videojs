<template>
    <div class="main live_center">
        <m-header @dataList="changeData" @PageDATA="changePage"></m-header>
        <el-row class="w1000">
            <el-col class="mt20">
                <el-row>
                    <el-col  class="bg-fff default_shadow my_section">
                        <div class="my_liveT mw-subTitle">
                            <ul class="mw-tabs">
                              <router-link to="/main/liveCenter">
                                <li class="mw-tab">
                                  直播管理
                                </li>
                              </router-link>
                                <li class="mw-tab active">点播管理</li>
                            </ul>
                            <router-link  tag="div" to="/main/newLive1" v-if="playType=='lplay'">
                                <span class="bgc_txt update_btn">新建直播</span>
                            </router-link>
                        </div>
                        <div v-if="playType=='onplay'">
                          <on-demand></on-demand>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <m-footer></m-footer>
    </div>
</template>

<script>
import MHeader from "components/header/header";
import OnDemand from "components/onDemand/index";
import {
  ERR_OK,
  DATA_URL,
  GIFT_URL,
  PLAY_URL,
  PAGE_SIZE,
  setLStorage,
  getLStorage,
  copyLink,
  DEFAULT_IMG
} from "api/config";
import { filterStatus, setDateTime, axiosData } from "api/http";
import axios from "axios";
import md5 from "js-md5";
// import editLive from 'components/editLive/editLive'
import LeftNav from "components/leftnav/leftnav";
import mFooter from "components/header/footer";
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索直播标题"
    }
  },
  data() {
    return {
      patghType:"0",
      Page_Count: PAGE_SIZE || 0,
      form: {
        region: "",
        region2: "",
        search: ""
        // delivery: false
      },
      dataList: [],
      // defaultImg:require('../../common/image/default.jpg'),
      defaultImg: DEFAULT_IMG,
      isShow: false,
      editData: {},
      PageTotal: 0,
      PageDATA: { total: 0 },
      thisLive: { data: {}, name: "" },
      dialogVisible: false,
      playTime: "",
      totalViewers: "",
      money: "",
      pagelist: global.liveData.PageDATA,
      interval: 5000,
      isUpload: false,
      PlayUrl: PLAY_URL,
      timeOptVal: "1",
      stateOptVal: "",
      noLive: false,
      page_NO: "1",
      playType: "onplay"
    };
  },
  created() {
    this.dataList = [];
    this.PlayUrl = PLAY_URL;
  },
  mounted(){
    $("#videoCenter").addClass("router-link-active");
  },
  methods: {
    timer() {},
    modifyPage(val) {
      this.page_NO = val;

      if (val > 1 && !this.isUpload) {
        this.isUpload = true;
      } else {
        this.isUpload = false;
      }
      axios
        .get(
          DATA_URL +
            "mwlive/live/get_listbycreatetime.do?user_id=" +
            getLStorage("user_id") +
            "&page_index=" +
            val +
            "&page_size=" +
            PAGE_SIZE +
            "&liveStatus=" +
            "&timeType=1"
        )
        .then(response => {
          //console.log(JSON.stringify(response))
          if (response.data.code == ERR_OK) {
            //console.log('分页',response.data)
            this.dataList = filterStatus(response.data.data.data_list);
            // global.liveData.data = this.dataList = this.dataList.reverse()
            global.liveData.pageIndex = val;
          }
        })
        .catch(function(err) {
          // this.tipsMessage('分页获取失败！','error')
          console.log(err);
        });
    },
    recharge() {
      //充值
    },
    copyLink(data) {
      let copyUrl = "copyUrl" + data.id;
      console.log("copyUrl", data.id);
      copyLink(copyUrl);
      this.tipsMessage("复制成功！");
    },
    openLiveUrl(url) {
      // console.log(url)
      window.open(url);
    },
    qrcanvas(data) {
      // console.log('data.id',data)
      // this.qrcode = PLAY_URL + getLStorage('liveID')
      this.qrcode = PLAY_URL + data.id + "&v=1.7.0";
      var canvas1 = qrcanvas({
        data: this.qrcode,
        size: 80
      });
      let id = "qrc" + data.id;
      document.getElementById(id).innerHTML = "";
      document.getElementById(id).appendChild(canvas1);
    },
    toLiveControl(data, DataStatistics) {
      setLStorage("liveID", data.id);
      global.liveData.liveID = data.id;
      global.liveData.thisData = data;
      if (DataStatistics) {
        global.liveData.DataStatistics = true;
      }
      // console.log('main-global.liveData.thisData',global.liveData.thisData)
      this.$router.push({
        path:'/liveControl',query: {type: "2"}//1表示云播 2代表视频中心 3代表点播
      });
    },
    manageLive(data) {
      setLStorage("liveID", data.id);
      global.liveData.liveID = data.id;
      global.liveData.thisData = data;
      this.$router.push({
        path:'/liveControl',query: {type: "2"}//1表示云播 2代表视频中心 3代表点播
      });
    },
    changeIsShow(isShow) {
      this.isShow = isShow;
    },
    changeData(dataList) {
      this.dataList = dataList;
    },
    changePage(PageDATA) {
      this.PageDATA = PageDATA;
    },
    changeEditData() {
      // console.log('changeEditData')
      this._LiveBroadcast();
    },
    clearSearch() {
      this.form.search = "";
    },
    toggleStatus(data, type) {
      if (type) {
        let formdata = new FormData();
        formdata.append("user_id", getLStorage("user_id"));
        formdata.append("live_id", data.id);
        axios({
          method: "post",
          // url: DATA_URL + 'mwlive/live/end.do',
          url: DATA_URL + "mwlive/live/close.do",
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(res => {
            // console.log('end',res)
            // this.tipsMessage('直播关闭','info')
            this.tipsMessage("直播已下线", "info");
            this._SetLiveEnd(data);
          })
          .catch(err => {
            this.tipsMessage("操作失败", "error");
          });
      } else {
        let formdata = new FormData();
        formdata.append("user_id", getLStorage("user_id"));
        formdata.append("live_id", data.id);
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/enable.do",
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(res => {
            // console.log('enable',res)
            this.tipsMessage("直播上线", "info");
          })
          .catch(function(err) {
            console.log(err);
          });

        // 设置显示封面
      }

      // switch(type){
      //     case 0:
      //         type = true
      //         console.log(type)
      //         this.tipsMessage('没有直播时间，请添加直播时间!', 'warning')
      //         // type = !type
      //         break
      //     case 1:
      //         this.tipsMessage('直播开始！', 'success')
      //         break
      //     case 2:
      //         this.tipsMessage('直播结束！', 'info')
      //         break
      //     case 3:
      //         this.tipsMessage('直播异常，请检查数据是否正确!', 'warning')
      //         break
      // }
      // 直播状态
      // console.log('直播状态',id,type)
    },
    _SetLiveEnd(data) {
      let formdata = new FormData();
      formdata.append("id", getLStorage("user_id"));
      formdata.append("end_show_type", 0);
      if (data.live_cover_url) {
        formdata.append("end_show_img", data.live_cover_url);
      } else {
        formdata.append("end_show_img", "");
      }
      formdata.append("end_show_vod", "");
      formdata.append("cmd", "set_room_end_show");
      formdata.append("liveID", data.id);
      let that = this;
      axiosData(formdata, DATA_URL + "mwlive/user/get_userinfo.do").then(
        res => {
          if (res.data.code == ERR_OK) {
            // that.tipsMessage('直播关闭自动设置封面显示！','error')
          } else {
            that.tipsMessage("网络异常！", "error");
          }
        }
      );
    },
    edit_live(event, deleteLive) {
      if (event.live_status == 1) {
        this.tipsMessage("正在直播中，频道基本信息不可编辑！", "error");
        // this.$message({
        //     showClose: true,
        //     message: '正在直播中，频道基本信息不可编辑！',
        //     type: 'error'
        // })
        return false;
      }
      if (deleteLive && event.live_status != 1) {
        this.openDelete(event);
        return false;
      }
      setLStorage("editID", event.id);
      this.$router.push({
        path: "/main/newLive1"
      });
      return false;
      this.isShow = !this.isShow;
      this.editData = event;
      // console.log('edit_live',event.live_status)
    },
    tipsMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type || "success"
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    openDelete(data) {
      this.thisLive.name = data.live_name;
      this.thisLive.data = data;
      this.dialogVisible = true;
    },
    deleteData() {
      this.dialogVisible = false;
      axios
        .get(DATA_URL + "mwlive/live/delete.do", {
          params: {
            user_id: getLStorage("user_id"),
            id: this.thisLive.data.id
          }
        })
        .then(response => {
          if (response.data.code == ERR_OK) {
            this.tipsMessage("删除成功", "success");
            this._LiveBroadcast(false, this.page_NO);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    timeSelChange(value){
        this._LiveBroadcast(false)
    },
    stateSelChange(value) {
      this._LiveBroadcast(false);
    }
  },
  filters: {
    // filterType(type){
    //     switch(type){
    //         // case 0:
    //         //     return '新创建'
    //         //     break;
    //         case 1:
    //             return true
    //             break;
    //         default:
    //             return false
    //             break
    //         // case 2:
    //         //     return '直播结束'
    //         //     break;
    //         // case 3:
    //         //     return '直播异常'
    //         //     break;
    //     }
    // },
    filterLiveStatus(val) {
      // console.log(val,'val')
      if (val == 1) {
        return true;
      } else {
        return false;
      }
    },
    type: function(value) {
      // if(value){
      //     return '直播中'
      // }else{
      //     return '未开始'
      // }
      switch (value) {
        case 0:
          return "预告";
          break;
        case 1:
          return "直播";
          break;
        case 2:
          return "结束";
          break;
        case 3:
          return "直播异常";
          break;
        case 4:
          return "结束";
          break;
        case 5:
          return "结束";
          break;
      }
    },
    live_btn: function(value) {
      switch (value) {
        case 0:
          return "blue_btn";
          break;
        case 1:
          return "red_btn";
          break;
        case 2:
          return "btn_000";
          break;
        case 3:
          return "off_btn";
          break;
        case 4:
          return "btn_000";
          break;
        case 5:
          return "btn_000";
          break;
      }
    },
    filterTime(val) {
      if (!val) {
        let timestamp = Date.parse(new Date());
        // return '立即开始'
        // return setDateTime(timestamp)
        return "暂无直播";
      }
      let regExp = /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/;
      if (regExp.test(val)) {
        return val;
      }

      let datetime = new Date(val);
      var month = datetime.getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      var strDate = datetime.getDate();
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let getHours = datetime.getHours();
      if (getHours >= 0 && getHours <= 9) {
        getHours = "0" + getHours;
      }
      let strTime = datetime.getMinutes();
      if (strTime >= 0 && strTime <= 9) {
        strTime = "0" + strTime;
      }
      let getSeconds = datetime.getMinutes();
      if (getSeconds >= 0 && getSeconds <= 9) {
        getSeconds = "0" + getSeconds;
      }
      return (
        datetime.getFullYear() +
        "-" +
        month +
        "-" +
        strDate +
        " " +
        getHours +
        ":" +
        strTime
      ); //+ ":" + getSeconds
    }
  },
  computed: {
    filterType: {
      get: function() {
        let item;
        for (item in this.dataList) {
          return item.live_switch === 1;
        }
      },
      set: () => {}
    }
  },
  destroyed() {
    this.timer = clearInterval(this.timer);
  },
  components: {
    MHeader,
    // editLive,
    LeftNav,
    mFooter,
    OnDemand
  },
  watch: {
    // dataList(val){
    //     console.log('val',val)
    // }
  }
};
</script>

<style scoped>
.mw-subTitle {
  padding: 8px 30px;
  border-bottom: 1px solid #f2f2f2;
  overflow: hidden;
} /*display: flex;justify-content:space-between;*/
.mw-subTitle .mw-tabs {
  float: left;
}
.mw-subTitle .el-button {
  float: right;
  margin-top: 5px;
}
.mw-tabs li {
  float: left;
  margin-right: 18px;
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.mw-tabs li.active {
  border-bottom: 3px solid #4285f4;
  color: #4285f4;
}
.mainData-list {
  margin-bottom: 30px;
  width: 535px;
  height: 256px;
  position: relative;
  border-radius: 5px;
}
.mainData_title {
  height: 26px;
  line-height: 26px;
  position: relative;
}
.mainData_title .edit_btn {
  cursor: pointer;
}
.mainData_title .edit_btn span {
  position: absolute;
  top: 0px;
}
.mainData_title .my_switch {
  position: absolute;
  top: 5px;
  right: 30px;
}
.show_bottom {
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  left: 0;
  bottom: 0;
  background-color: #f2f2f2;
}
.show_bottom .iconfont {
  font-size: 24px;
  color: #00b0ff;
}

.show_bottom .default-colHover:nth-child(1):after {
  content: "";
  width: 1px;
  height: 20px;
  background-color: #d8d8d8;
  position: absolute;
  right: 0;
  top: 15px;
}
.show_bottom .default-colHover:nth-child(1) {
  border-radius: 0 0 0 5px;
}
.show_bottom .default-colHover:nth-child(3) {
  border-radius: 0 0 5px 0;
}
.show_bottom .default-colHover:nth-child(2):after {
  content: "";
  width: 1px;
  height: 20px;
  background-color: #d8d8d8;
  position: absolute;
  right: 0;
  top: 15px;
}
.show_bottom .mainData-control,
.show_bottom .main-infoList,
.show_bottom .default-colHover {
  height: 50px;
  line-height: 50px;
}

.show_bottom .default-colHover {
  color: #9b9b9b;
  position: relative;
  transition: all 0.5s;
}
.show_bottom .default-colHover:hover {
  background-color: #2B6CFF;
  color: #ffffff;
}
.show_bottom .default-colHover:hover:after {
  width: 0px;
}
.show_bottom .default-colHover:hover .iconfont {
  color: #ffffff;
}
.show_img {
  width: 208px;
  height: 118px;
  position: absolute;
  left: 20px;
  top: 60px;
  border-radius: 5px;
}
.show_img img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.mainData-list:nth-child(2n) {
  padding-right: 0;
  margin-left: 30px;
}
.mainData-list i {
  font-size: 16px;
  cursor: pointer;
}
.editLive.editLive-show {
  display: block;
  z-index: 99;
}
.search {
  position: relative;
}
.layout-main {
  line-height: 40px;
}
.layout-left {
  padding: 10px;
  box-sizing: border-box;
}
.search-icon {
  font-size: 16px;
  position: absolute;
  right: 10px;
  top: 10px;
  color: #b1b1b1;
}
.broadcast-bottom {
  border-top: none;
  line-height: 30px;
  position: absolute;
  width: 270px;
  top: 50px;
  left: 248px;
  font-size: 12px !important;
}

.data-list {
  padding-right: 125px;
}
.data-listMain {
  width: 100%;
  margin: 5px 0 0 0;
}
.data-listRe {
  width: 125px;
  margin-right: -130px;
}
.icon {
  font-size: 20px;
  color: #999;
}

.admin-info .img_box {
  width: 140px;
  height: 140px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}

.qualifyBia .img_box {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin: 0 auto 20px auto;
  position: relative;
}
.qualifyBia .img_box img {
  border-radius: 60px;
  width: 120px;
  height: 120px;
}
.qualifyBia .icon_err {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 42px;
  height: 42px;
  margin-left: 18px;
  margin-top: 18px;
  background: url(../../common/image/icon_err.png);
}

.admin-info .img_box img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.admin-info .iconfont {
  font-size: 35px;
  color: #e5e5e5;
  display: inline-block;
}
.admin-info .icon-phone {
  font-size: 38px;
  position: relative;
  left: -4px;
}
.admin-info .icon_phone {
  width: 30px;
  height: 30px;
  background: url(../../common/image/icon_phone_active.png);
}
.admin-info .icon_phone:hover {
  background: url(../../common/image/icon_phone_active.png);
}
.admin-info .icon_idCard {
  width: 35px;
  height: 26px;
  background: url(../../common/image/icon_Idcard.png);
}
.admin-info .icon_idCard:hover {
  background: url(../../common/image/icon_Idcard_active.png);
}
.mainData-list .iconfont {
  display: inline-block;
  width: 26px;
  height: 26px;
}
.icon_delete:hover {
  background: url(../../common/image/icon_delete_active.png) no-repeat;
}
.icon_delete,
.icon_delete.is-disabled {
  background: url(../../common/image/icon_delete.png);
  position: absolute;
  right: -15px;
  top: 2px;
}
.edit_btn {
  display: inline-block;
  width: 62px;
  height: 26px;
}
.edit_btn:hover {
  background: url(../../common/image/icon_edit_active.png) no-repeat;
  color: #2B6CFF;
}
.edit_btn {
  background: url(../../common/image/icon_edit.png) no-repeat;
}

.default_shadow {
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
}
.default_shadow.fr {
  width: 1160px;
  padding-bottom: 10px;
  margin-top: 20px;
  border-radius: 5px;
}
.main .default-color {
  font-size: 14px;
}
.main .account-info {
  font-size: 15px;
}
.add-live {
  height: 168px;
  font-size: 18px;
  color: #b1b1b1;
}
.add-live .el-icon-plus {
  padding: 20px;
  border: 1px solid #b1b1b1;
  border-radius: 50%;
  margin: 35px 0 20px 0;
}
.mainData-con {
  line-height: 0;
  position: relative;
  overflow: hidden;
  height: 118px;
  border-radius: 5px;
}
.mainData-img {
  width: 100%;
  max-height: 218px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}
.mainData-control {
  background: #f2f2f2;
}

.live-state {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 12px 10px;
  border-radius: 2px;
}
.mainData-controlIcon {
  font-size: 30px;
  margin: 50px 0;
}
.broadcast-live {
  line-height: 44px;
}
.w_120 {
  display: inline-block;
  width: 134px;
  line-height: 10px;
}
.w_120 .col_26 {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  position: relative;
}

.broadcast-live span {
  margin-left: 5px;
}

.my_liveT {
  position: relative;
  padding-right: 30px;
}
.my_liveT .bgc_txt {
  font-size: 14px;
  font-weight: normal;
  height: 36px;
  line-height: 36px;
  margin-top: 14px;
  width: 92px;
  text-align: center;
  padding: 0;
  margin-right: 30px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.account-info {
  padding-left: 25px;
}
.col-red {
  background: #ec6941;
  color: #ffffff;
  padding: 2px 10px;
  border-radius: 2px;
  margin-left: 10px;
}
.live-title {
  line-height: 55px;
  font-weight: normal;
  font-size: 16px;
}
.live-wrap {
  padding: 20px 30px 30px;
  min-height: 602px;
}
.live-wrap .mainData-list {
  padding: 18px 18px 18px 20px;
}
.live-wrap .mainData-list{
    -webkit-transition: all 0.8s;
    -moz-transition: all 0.8s;
    -ms-webkit-transition:all 0.8s;
    transition: all 0.8s;
    border:1px solid rgba(242,242,242,1);
    /* box-shadow:0px 1px 3px 1px rgba(0, 0, 0, 0.26); */

}
.live-wrap .mainData-list:hover{
    border:1px solid #D9D9D9;
    box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
    -webkit-box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
}
.el-icon-caret-right {
  border: 1px solid #57bce9;
  padding: 15px 14px 13px;
  border-radius: 30px;
  color: #57bce9;
}
.default-colHover i {
  margin-right: 5px;
  vertical-align: middle;
}
.live-manage i {
  font-size: 17px;
  vertical-align: middle;
}
.live-manage span,
.default-colHover span {
  vertical-align: middle;
}

/* .main-infoList span:hover{color:#f1f5f9;} */

/* code */
.show_bottom .default-colHover .qrcImg {
  display: none;
  right: -2px;
  /* top:88px; */
  color: #333;
  width: 535px;
  height: auto;
  z-index: 999;
  padding-top: 44px;
}
.qrcImg .el-button {
  height: 32px;
  line-height: 3px;
  width: 80px;
  padding: 0;
  font-size: 12px;
}
.qrcImg .el-button.btn_cc {
  background: #e5e5e5;
  color: #333333;
  border: 1px solid #d9d9d9;
  margin-left: 15px;
}
.show_bottom .default-colHover .qrcImg-content{
    line-height: 22px;
    padding: 20px;
    height:118px;
    background:none;
    border: 1px solid #ddd;
    margin: -25px 0 0;
    /* position:relative; */
    background-color:#FFF;
    color:#9B9B9B;
    box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
    -webkit-box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
    border-radius: 5px;
    position: relative;
}
.qrcImg:before,
.qrcImg:after {
  content: "";
  display: block;
  border-width: 12px;
  position: absolute;
  /* bottom:-40px; */
  top: -2px;
  right: 78px;
  border-bottom: 23px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #e5e5e5;
  font-size: 0;
  line-height: 0;
}
.ewm_84 {
  width: 84px;
  height: 84px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 6px 6px 3px 6px;
}
.qrcImg:after {
  top: -11px;
  border-color: transparent transparent #fff;
}
.qrcImg::before{
    top:-13px;
}
.show_bottom .default-colHover:hover .qrcImg{
    display: block;
}
.tc {
  text-align: center;
}

.grid_content h3 {
  color: #333333;
  font-size: 20px;
  padding: 10px 0 12px 0;
}
.main_search {
  padding: 20px 30px 0 30px;
}
.main_search .fr {
  border-radius: 2px;
  width: 250px;
  height: 30px;
  /* border:1px solid #D9D9D9; */
}

.main_search .el-select {
  margin-right: 18px;
}
.main_search .el-input-group {
  width: 250px;
  height: 30px;
}
.live-wrap .no_live {
  text-align: center;
}
.live-wrap .no_data {
  width: 130px;
  height: 109px;
  background: url(../../common/image/no_video.png) no-repeat;
  margin: 130px auto 20px auto;
}
.live-wrap .no_live .txt_blue {
  cursor: pointer;
}
</style>
<style>
.broadcast-bottom .el-switch {
  height: 29px;
}
.qualifyBia .el-dialog__footer {
  text-align: center;
}
.main_search .fr .el-input-group .el-input__inner {
  height: 30px;
  border-radius: 2px;
  font-size: 12px;
  border-right: none;
}
.main_search .el-input-group__append {
  padding: 0;
  width: 60px;
  height: 30px;
  text-align: center;
  font-size: 12px;
}
.live_center .el-switch__core:after {
  top: 5px;
  left: 8px;
}
.live_center .el-select__caret.el-input__icon.el-icon-arrow-up:before{
    position: relative;
    top:-5px;
}
.live_center .el-switch.is-checked .el-switch__core::after{
    margin-left:-23px;
}
  li.mw-tab a {color: #333;}
  .click-btn {display: none}
  .click-list:hover .click-btn {display: block;}
</style>
