<template>
    <div class="viewsettings my_section customMenu" style="min-height:680px;">
        <div class="pd10 live-top">
            自定义菜单
            <!-- <el-button class="middle" type="primary" style="float:right;">发布</el-button> -->
        </div>
        <div class="play-body">
            <!--手机编辑区域 start-->
            <div class="phone-view">
                <div class="phone-inner">
                    <div class="phone-header"></div>
                    <div class="phone-title">梦网科技</div>
                    <div class="phone-page">
                        <div class="phone-banner"></div>
                        <div class="phone-menu">
                          <el-menu  id="menusShow" mode="horizontal">
                            <el-menu-item class="menuItem showContentli"  v-for="(item,index) in liList" :key="index" :index="'item'+item.id"    @click="selectMenu(index,item.menu_name,item.id,item.menu_index,item.menu_type,item.menu_content)" :class="phoneMenu==index?'is-active':''">
                              <i class="el-icon-d-caret moveTop" @click="preMove(item.id,item.menu_index,index)"></i>
                              <p class="menuIteP">{{item.menu_name}}</p>
                              <i class="el-icon-d-caret moveBottom" @click="nextMove(item.id,item.menu_index,index)"></i>
                            </el-menu-item>
                          </el-menu>
                            <!-- <ul id="menuList">
                                <li v-for="(item,index) in liList" :key="index" v-if="item.menu_type!=3" @click="selectMenu(index,item.menu_name,item.id,item.menu_index,item.menu_type)" :class="phoneMenu==index?'is-active':''">{{item.menu_name}}</li>
                            </ul> -->
                            <span class="addMenu" @click="addMenu"><i class="el-icon-plus"></i></span>
                        </div>
                    </div>
                    <div class="page-content">
                      <div id="chatOne" style="display:none;"></div>
                      <div id="liveDetail" style="display:none;">
                        <h4>{{liveName}}</h4>
                        <p><span class="ld1">创建时间：</span><span>{{beginTime|filterTime}}</span></p>
                        <p><span class="ld1">观看权限：</span><span>{{userRight}}</span></p>
                      </div>
                    </div>
                </div>
            </div>
            <!-- <div class="phone-bottom">
                <el-button type="primary">预览</el-button>
            </div> -->
            <!--手机编辑区域 end-->
            <div class="play-right ">
                <div class="menu-setting">
                    <p class="tip">点击左侧菜单栏可进行添加或者修改菜单栏信息</p>
                </div>
                <div class="menu-editting" style="display:none;">
                    <div class="menu-setting-title">菜单配置</div>
                    <div class="menu-setting-main">
                        <el-row class="menuSelect">
                            <el-col :span="5">
                              <h3>菜单名称：</h3>
                            </el-col>
                            <el-col :span="6">
                              <el-input v-model="menuName" placeholder="请输入内容" style="width: 120px;margin-top: 5px;" :maxlength="4"></el-input>
                              <div class="text_tip">{{menuName?menuName.length:0}}<span>/4</span></div>
                            </el-col>
                            <el-col :span="4" style="margin-left: 8.3%;">
                              <h3>菜单分类：</h3>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="Selected" placeholder="请选择" class="selectDiv">
                                    <el-option
                                    v-for="item in classify"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <div class="descript">功能说明：<span>在点播加入聊天功能，用户可以发送聊天内容到点播间。</span>
                        </div>
                        <div class="twDiv" style="display:none">
                          <!-- <editor id="editor" class="editor" :message.sync="content"></editor> -->
                          <editors id="editor" class="editor" :message.sync="content"></editors>
                        </div>
                    </div>
                    <el-row class="delMenu">
                        <a @click="deleteMenu">删除菜单栏</a>
                        <el-button type="primary" class="saveBanner" @click="saveMenu" style="float:right;">提交</el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getLStorage,chargeError,DATA_URL } from "api/config";
import editor from "@/components/mainPage/editor";
import { getCookies } from '../../api/config';
import editors from "@/components/mainPage/editors";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      phoneMenu: -1,
      classify: [
        {
          value: "0",
          label: "聊天",
          disabled: false
        },
        {
          value: "1",
          label: "简介",
          disabled: false
        }
      ],
      menuName: "",
      Selected: "0",
      liList: [],
      content: "",
      menuId: "1",
      menuIndex: "1",
      mType: "1",
      tkInfo: getCookies("token"),
      userID:getLStorage("userId"),
      beginTime: "",
      userRight: "",
      liveName:""
    };
  }, 
  components: {
    editor,
    editors
  },
  mounted() {
    this.getMenuInfo();
    this.getVideoInfo();
  },
  filters: {
    filterTime(val) {
      if (!val) {
        let timestamp = Date.parse(new Date());
        // return '立即开始'
        // return setDateTime(timestamp)
        return "暂无点播";
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
  methods: {
    //获取点播信息
    getVideoInfo(){
      axios
          .get(DATA_URL + "mwlive/vod/getVodInfo.do?id=" + getLStorage("defRoomId"))
          .then(response => {
            if (response.data.code == "200") {
              if(response.data){
                this.liveName=response.data.data.vodName;
                this.beginTime = response.data.data.createTime;
                if (response.data.data.live_permit == 1) {
                  this.userRight = "加密";
                } else if (response.data.data.live_permit == 2) {
                  this.userRight = "付费";
                } else if (response.data.data.live_permit == 3) {
                  this.userRight = "门票";
                } else if (response.data.data.live_permit == 4) {
                  this.userRight = "专属点播间";
                } else {
                  this.userRight = "免费";
                }
              }
            }
          })
          .catch(function (err) {
            console.log(err);
            console.log("err", err);
          });
    },
    getMenuInfo() {
      var params = { user_id:this.userID, video_id: getLStorage("defRoomId") };//token: "test123",
      this.$ajaxs.getVideoInfo(params).then(data => {
        console.log("点播间："+JSON.stringify(data));
        if (data.code == 1) {
          if (data.result.envelope_enable == undefined) {
            this.$message({
              showClose: true,
              type: "error",
              message: "点播h5页面未添加成功"
            });
          } else {
            var liMenu= data.result.menu_list;
            
            liMenu.sort((a, b) => a.menu_index - b.menu_index);
            this.liList =liMenu;
            if(liMenu.length>0){
              this.selectMenu("0",liMenu[0].menu_name,liMenu[0].id,liMenu[0].menu_index,liMenu[0].menu_type,liMenu[0].menu_content)
            }
            this.refreshType(this.liList);
          }
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: chargeError(data.code)
          });
        }
      });
    },
    refreshType(menyList){
      this.classify[0].disabled = false;
      this.classify[1].disabled = false;
      menyList.forEach(e => {
              switch (e.menu_type.toString()) {
                case "0":
                  this.classify[0].disabled = true;
                  break;
                case "1":
                  this.classify[1].disabled = true;
                  break;
              }
            });
    },
    addMenu() {
      $(".menu-setting").hide();
      $(".menu-editting").show();
      this.menuName = "";
      this.phoneMenu = -1;
      var name;
      switch(this.Selected){
        case "0":
        name="聊天"
        break;
        case "1":
        name="简介"
        break;
      }
      this.menuName=name;
    },
    //排序
    preMove(id, mindex, index) {
      console.log(id, mindex, index);
      if (index == 0) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已经是第一个了"
        });
      } else {
        var menus = this.liList;
        var menuargs = [];
        for (var i = 0; i < menus.length; i++) {
          // debugger
          if (i == index - 1) {
            menuargs.push(
              '{"menu_index":' +
                menus[i].menu_index +
                ',"menu_id":' +
                menus[i + 1].id +
                "}"
            );
            continue;
          }
          if (i == index) {
            menuargs.push(
              '{"menu_index":' +
                menus[i].menu_index +
                ',"menu_id":' +
                menus[i - 1].id +
                "}"
            );
            continue;
          }
          menuargs.push(
            '{"menu_index":' +
              menus[i].menu_index +
              ',"menu_id":' +
              menus[i].id +
              "}"
          );
        }
        //console.log(menuargs);
        var orderParams = {
          token: this.tkInfo,
          video_id: getLStorage("defRoomId"),
          menu_args: "[" + menuargs.toString() + "]"
        };
        console.log(orderParams);
        this.move(orderParams);
      }
    },
    move(menuOrder) {
      this.$ajaxs.setVideoMenuOrder(menuOrder).then(data => {
        console.log(data);
        if (data.code == 1) {
          this.getMenuInfo();
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: chargeError(data.code)
          });
        }
      });
    },
    nextMove(id, mindex, index) {
      if (index >= $(".menuItem").length-1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已经是第最后一个了"
        });
      }
      var menus = this.menuList;
      var menuargs = [];
      //console.log(menus.length,a,b,c);
      for (var i = 0; i < menus.length; i++) {
        // debugger
        if (i == index) {
          menuargs.push(
            '{"menu_index":' +
              menus[i].menu_index +
              ',"menu_id":' +
              menus[i + 1].id +
              "}"
          );
          continue;
        }
        if (i == index + 1) {
          menuargs.push(
            '{"menu_index":' +
              menus[i].menu_index +
              ',"menu_id":' +
              menus[i - 1].id +
              "}"
          );
          continue;
        }
        menuargs.push(
          '{"menu_index":' +
            menus[i].menu_index +
            ',"menu_id":' +
            menus[i].id +
            "}"
        );
      }

      //console.log(menuargs);
      var orderParams = {
        token: this.tkInfo,
        video_id: getLStorage("defRoomId"),
        menu_args: "[" + menuargs.toString() + "]"
      };
      //console.log(orderParams);
      this.move(orderParams);
    },
    deleteMenu() {
      console.log(this.phoneMenu);
      if(this.liList.length<=1){
        this.$message({
              showClose: true,
              type: "error",
              message: "无法删除最后一项菜单"
            });
            return
      }
      if (this.phoneMenu == -1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "请选择一个菜单"
        });
      } else {
        var params = {
          token: this.tkInfo,
          video_id: getLStorage("defRoomId"),
          menu_id: this.menuId,
          menu_index: this.menuIndex
        };
        this.$ajaxs.deleteVideoMenu(params).then(data => {
          console.log(data);
          if (data.code == 1) {
            this.getMenuInfo();
            this.menuName = "";
            this.$message({
              showClose: true,
              type: "success",
              message: "删除菜单成功"
            });
            this.phoneMenu="-1";
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: chargeError(data.code)
            });
          }
        });
      }
    },
    modifyMenu(params){
      this.$ajaxs.modifyVideoMenu(params).then(data => {
          console.log(data);
          if (data.code == 1) {
            this.getMenuInfo();
           // this.menuName = "";
           this.$message({
              showClose: true,
              type: "success",
              message: "更改菜单成功"
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: chargeError(data.code)
            });
          }
        });
    },
    saveMenu() {
      console.log(this.phoneMenu );
      if(this.menuName==""){
        this.$message({
              showClose: true,
              type: "info",
              message: "请先输入菜单名"
            });
            return
      }
      if(this.phoneMenu!="-1"){
        if(this.Selected==4){
          var params={token:this.tkInfo,menu_id:this.menuId,menu_name:this.menuName,menu_type:this.mType,menu_content:this.content}
        }
        else{
          var params={token:this.tkInfo,menu_id:this.menuId,menu_name:this.menuName,menu_type:this.mType,menu_content:""}
        }
        //console.log(params);
        this.modifyMenu(params);
        return;
      }
      if(this.liList.length>=10){
        this.$message({
          showClose: true,
          type: "error",
          message: "最多添加10个菜单"
        });
        this.menuName == "";
        return;
      }
      if (this.classify[this.Selected].disabled == true) {
        this.$message({
          showClose: true,
          type: "error",
          message: "菜单已存在"
        });
        this.menuName == "";
        return;
      } else {
        if (this.Selected == "4") {
          var params = {
            token: this.tkInfo,
            video_id: getLStorage("defRoomId"),
            menu_name: this.menuName,
            menu_type: this.Selected,
            menu_content: this.content,
            menu_index: (this.liList.length + 1).toString()
          };
        } else {
          var params = {
            token: this.tkInfo,
            video_id: getLStorage("defRoomId"),
            menu_name: this.menuName,
            menu_type: this.Selected,
            menu_content: "",
            menu_index: (this.liList.length + 1).toString()
          };
        }
        console.log(params);
        this.$ajaxs.addideoMenu(params).then(data => {
          console.log(data);
          if (data.code == 1) {
           // this.menuName = "";
            this.$message({
              showClose: true,
              type: "success",
              message: "添加菜单成功"
            });
            this.getMenuInfo();
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: chargeError(data.code)
            });
          }
        });
      }
    },
    selectMenu(num, name, id, index, type,mcontent) {
      this.phoneMenu = num;
      this.menuName = name;
      $(".menu-setting").hide();
      $(".menu-editting").show();
      if(type==4){
        this.content=mcontent;
      }
      this.menuId = id;
      this.menuIndex = index;
      this.mType = type;
      this.Selected = type.toString();
      console.log(type);
      switch (type) {
        case 0:
          $("#chatOne").show();
          $("#liveDetail").hide();
          break;
        case 1:
          $("#chatOne").hide();
          $("#liveDetail").show();
          break;
        default:
          $("#chatOne").hide();
          $("#liveDetail").hide();
          break;
      }
    },
    submitForm(form) {}
  },
  watch: {
    Selected(val) {
      this.mType = val;
      console.log(val);
      if (val == "4") {
        $(".twDiv").show();
        $(".descript").hide();
        $(".menu-editting").css("height", "640px");
        $(".delMenu").css("margin-top", "0px");
      } else {
        $(".twDiv").hide();
        $(".descript").show();
        $(".menu-editting").css("height", "380px");
        $(".delMenu").css("margin-top", "150px");
      }
    }
  }
};
</script>
<style scoped>
.editor {
  margin-top: 10px;
}
.descript {
  margin-top: 32px;
}
.addMenu {
  position: relative;
  top: -32px;
  font-size: 16px;
  border: 2px solid #cccccc;
  padding: 3.76px;
  float: right;
}
.menuSelect h3 {
  margin-top: 10px;
  font-size: 14px;
  color: #333333;
  font-weight: normal;
}
.delMenu {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 150px;
  position: relative;
}
.delMenu a {
  float: left;
  font-size: 14px;
  color: #4285f4;
}
.menu-setting-title {
  padding: 0 20px;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #d9d9d9;
  font-size: 14px;
  color: #333;
  text-align: left;
}
.menu-setting-main {
  padding: 20px;
  padding-bottom: 10px;
}
.menu-editting {
  position: relative;
  margin-left: 70px;
  width: 480px;
  height: 380px;
  border: 1px solid #d9d9d9;
  text-align: center;
}
.footnote {
  margin-bottom: 16px;
}
.demo-ruleForm {
  width: 488px;
  margin-left: 180px;
}
.live-passWrap {
  border-top: 1px solid #ececec;
  /* padding:40px 0 0 30px; */
}

.words-style span {
  color: #ff3626;
}
.viewsettings {
  position: relative;
}
.viewsettings .mt20 {
  margin-top: 30px;
}

.submit_btn {
  position: absolute;
  left: 0;
  bottom: 0px;
  margin: 0;
  width: 100%;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  border-top: 1px solid rgb(217, 217, 217);
}
.viewsettings .el-form-item {
  margin-bottom: 0;
}
.viewsettings .btn_40 {
  width: 300px;
  height: 40px;
  line-height: 40px;
}
.viewsettings.my_section .footnote {
  margin-bottom: 20px;
}
.viewsettings.my_section
  .footnote.el-radio.is-bordered
  + .el-radio.is-bordered {
  margin-left: 24px;
}
/*.play-body {overflow: hidden;}
    .phone-view {width: 320px;float: left;}
    .phoneImg {margin:20px 40px;width: 240px;height: 490px;}
    .phone-bottom {text-align: center;}*/
.play-right {
  float: left;
  width: 590px;
}
.menu-setting {
  position: relative;
  margin-left: 70px;
  margin-top: 75px;
  width: 480px;
  height: 380px;
  border: 1px solid #f2f2f2;
  text-align: center;
}
.customMenu .menu-setting {
  background: #f2f2f2;
}
.menu-setting p.tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  width: 100%;
  color: #333;
}
.el-input__inner {
  width: 120px;
}
.el-select .el-input__innert {
  height: 40px;
  background-color: #fff;
}
.phone-bottom {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.menuItem .moveTop {
  display: none !important;
  position: relative;
  transform: rotate(-90deg);
  float: left;
  top: 20%;
  left: -50%;
}
.menuItem .moveBottom {
  display: none !important;
  position: relative;
  top: -85%;
  right: -30px;
  transform: rotate(-90deg);
}
.menuItem:hover{
  overflow: hidden;
}
.menuItem:hover .moveTop {
  display: block !important;
}
.menuItem:hover .moveBottom {
  display: block !important;
}
.menuItem:hover .menuIteP {
  left: -40%;
  overflow: inherit;
}
.menuIteP {
  position: relative;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  height: 30px;
}
#menusShow li {
      height: 30px;
    line-height: 33px;
    padding: 0 5px;
    width: 20%;
    float: none;
    display: inline-block;
}
.el-menu--horizontal > .el-menu-item {
  height: 30px;
}
.phone-menu ul{
      border-bottom: 1px solid #cccccc;
    white-space: nowrap;
    height: 32px;
    overflow-y: hidden;
    overflow-x: auto;
}
.selectDiv{
  margin-top: 5px;
}
#chatOne {
  width: 220px;
  height: 550px;
  background: url("../../common/image/chat.png") no-repeat;
  background-size: 100%;
  position: absolute;
  top: 190px;
  left: -18px;
}
#liveDetail {
  position: absolute;
  top: 210px;
  width: 215px;
  height: 205px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}
.ld1{
      color: #8C8C8C;
}
#liveDetail h4{
      margin: 0px;
    margin-bottom: 10px;
        overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}
.text_tip{
      top: -25px
}
</style>
<style>
.viewsettings.my_section .el-form .el-input__inner {
  width: 300px;
  height: 40px;
  line-height: 40px;
}
.viewsettings .el-radio {
  margin-right: 0px;
}
.viewsettings .el-input,
.viewsettings .el-input__inner {
  width: 120px;
  margin-right: 20px;
      background-color: #fff;
          height: 32px;
}
.live-passWrap .el-form-item__content {
  margin-left: 140px !important;
}
.my_bot30 .el-form-item__content {
  margin-bottom: 30px;
}
.live-passWrap .el-form-item__label {
  width: 124px !important;
}
.viewsettings .livepass-sb .el-form-item__content {
  margin-left: 0 !important;
}
.viewsettings.my_section .el-radio.footnote.radio.is-bordered {
  width: 86px;
  height: 40px;
  line-height: 38px;
}
.viewsettings.my_section .footnote .el-radio__inner:before {
  top: 9px;
  left: 67px;
}
.viewsettings .radio_t3 .el-radio__label {
  position: relative;
  left: -17px;
}
</style>
