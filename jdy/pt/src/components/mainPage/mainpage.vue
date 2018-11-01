<template>
    <div>
        <!-- <m-header></m-header> -->
        <div class="w1000 el-row">
            <div class="mainList" style="height:710px;">
                <div class="my_section">
                  <div class="section_title">
                    <h2 style="position:relative;font-weight: 600;font-size: 16px;color: rgba(51,51,51,1);font-family: 'Microsoft YaHei';top:6px;">
                      主页列表
                      <p class="tps_11" style="left:82px;top:6px;line-height: 15px;width:15px;height:15px;font-weight: 100;">？</p>
                      <div class="tps_22 block" style="left:48px;top:43px;">
                        <p class="" style="font-size:12px;">这里展示着您所创建的所有企业主页的列表，您可以按照自己个性化需求对主页内的内容进行配置。</p>
                      </div>
                    </h2>
                  <el-button @click="addNewPage" type="primary" class="addPageBtn" style="background:#4285F4;font-size:12px;">新建主页</el-button>
                  </div>
                </div>
                <div class="List">
                    <div  v-if="pagesNum*3 >3" class="in_block w_37">
                      <div  @click="preClick">
                        <span><i class="el-icon-arrow-left" style="cursor: pointer;"></i></span>
                    </div>
                    </div>
                    <div class="new_item_box in_block" v-if="pages.length<1">
                        <div id="newItem">
                            <div class="addNew">
                                <h1 @click="addNewPage" style="color:rgba(155,155,155,1);font-size:70px;">+</h1>
                            </div>
                        </div>
                    </div>
                    <div class="center_box">
                        <div v-for="page in pages" :key="page.id" class="in_block w_250">
                            <div class="title" @click="changePageTitle(page.id,page.page_name)"><h3 style="max-width: 90%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"> {{page.page_name}}</h3><i class="el-icon-edit"></i></div><!-- centerDialogVisible = true -->
                            <!-- <div class="viewItem" id="item2" @click="editPage(page.id)" v-on:mouseenter="onEnter(page.id)" v-on:mouseleave="onLeave(page.id)">  -->
                                <div class="viewItem" @click="editPage(page.id)" id="item2" v-on:mouseenter="onEnter(page.id)" v-on:mouseleave="onLeave(page.id)">
                                <div class="newViewItem">
                                    <div class="p_bg1"><span style="color: white;display: inline-block;width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:12px;">{{page.page_name}}</span></div>
                                    <div class="newView_li1"><img :src="page.banner_content" alt="" srcset="" style="width:100%;height:100%;"></div>
                                    <ul class="newView_ul1" >
                                        <li class="li1_1" v-for="a,inx in page.menu_list">{{a.menu_name}}</li>
                                    </ul>
                                    <ul class="newView_ul2">
                                        <li class="li2_2">
                                            <img src="../../common/image/pageImg1.png" style="width:100%;height:100%;" alt="">
                                        </li>
                                    </ul>
                                </div>
                                <div  v-bind:id="page.id" class="v-content">
                                    <p>创建时间:<span>{{page.create_time}}</span></p>
                                    <p>访客数：<span>{{pCount}}</span>人 浏览量:<span>{{scanCount}}</span>人</p>
                                    <!-- <p>访客数：<span>{{page.uv}}</span>人 浏览量:<span>{{page.pv}}</span>人</p> -->
                                    <el-row class="btns">
                                    <!-- <el-button @click="copyLink(page.id)" class="tag-read" :data-clipboard-text ="pageUrl">复制链接</el-button> -->
                                    <el-button @click.stop="shareLink(page.id)" class="tag-read">分享</el-button>
                                    <el-button @click="editPage(page.id)">编辑</el-button>
                                    </el-row>
                                </div>
                            </div>
                            <a class="delete" id="delete2" @click="deletePage(page.id)">删除</a>
                        </div>
                    </div>
                   
                    <div class="in_block w_37" style="position: absolute;right: 0px;top:0" @click="nextClick" v-if="pagesNum*3 > 3">
                        <span><i class="el-icon-arrow-right" style="cursor: pointer;"></i></span>
                    </div>
                </div>
                <el-row class="paginationRow" v-if="pages.length>0">
                  <!-- <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">第{{curpage}}页</a></li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul> -->
                   <el-pagination
                    small
                    background
                    layout="prev, pager, next"
                    class="myPagination"
                    :current-page.sync="curpage"
                    @current-change="changeCurrentPage"
                    :page-size="3"
                    :total="pagesNum*3">
                    </el-pagination>
                </el-row>
                <!--更改title-->
                <el-dialog
                  :visible.sync="centerDialogVisible"
                  width="390px"
                  center>
                   <el-input class="input_main" placeholder="请输入标题" @focus="titleChange" v-model="changedTitle"  :maxlength="30"></el-input>
                   <div class="text_tip" style="margin-top: 8px;">{{changedTitle?changedTitle.length:0}}<span>/30</span></div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="changeTitle" :loading="loadFlag" :disabled="sureDisabled">确 定</el-button>
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                  </span>
                </el-dialog>
                <!--删除主页-->
                <el-dialog
                  :visible.sync="DeleteDialogVisible"
                  width="390px"
                  center>
                   <p class="askDeleteTip1">删除后主页内的内容将不可恢复，</p>
                   <p class="askDeleteTip1">您仍然确定删除吗？</p>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deletePageNow()" :disabled="sureDisabled">确 定</el-button>
                    <el-button @click="DeleteDialogVisible = false">取 消</el-button>
                  </span>
                </el-dialog>
                <!--添加主页-->
                <el-dialog
                  :visible.sync="IsAdd"
                  width="390px"
                  center>
                    <el-input placeholder="请输入标题" class="input_main"  v-model="AddruleForm.newTitle" :maxlength="30"></el-input>
                    <div class="text_tip" style="margin-top: 8px;">{{AddruleForm.newTitle?AddruleForm.newTitle.length:0}}<span>/30</span></div>
                   
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('AddruleForm','1')" :loading="loadFlag" :disabled="sureDisabled">确 定</el-button>
                    <el-button @click="resetForm('AddruleForm','1')">取 消</el-button>
                  </span>
                </el-dialog>
                <el-dialog
                  title="分享给朋友"
                  class="shareToFriend"
                  :visible.sync="preShowDialogVisible"
                  width="560px"
                  center>
                  <div>
                    <hr/>
                    <div id="preShowImg" class="fourCorner">
                    </div>
                    <!-- <p class="dlTips">点击<a class="downLoad" @click="dlPics">下载二维码</a>分享</p> -->
                    <p class="dlTips">二维码分享</p>
                    <el-row style="margin-top:20px;">
                    <input readonly type="text" v-model="pageUrl" id="cpLink" class="el-input__inner">
                    <el-button class="btn blue_btn" @click="copyLink(pageUrl)">复制</el-button>
                    </el-row>
                  </div>
                  <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="preShowDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="preShowDialogVisible = false">确 定</el-button>
                  </span> -->
                </el-dialog>
            </div>
        </div>
        <!-- <m-footer></m-footer> -->
    </div>
</template>
<script>
// import MHeader from "components/header/header";
// import MFooter from "components/header/footer";
import Clipboard from "clipboard";
import { setCookies, getCookies, getLStorage, copyLink,removeCookies,setLStorage,chargeError,DATA_API_URL } from "api/config";
import { removeCookie } from '../../api/config';
import Bus from '../bus.js'
export default {
  data() {
    return {
      flag:false,
      name: "主页管理",
      pCount: 0,
      scanCount: 0,
      centerDialogVisible: false,
      DeleteDialogVisible: false,
      preShowDialogVisible: false,
      IsAdd: false,
      AddruleForm: { newTitle: "" },
      //token: getCookie("fecbb6e8b4699053"),
      token: getCookies("token"),
      pageId: "",
      deletePageId: "",
      changedTitle: "",
      curpage: 1,
      pagesNum: 1,
      pages: [],
      pageUrl: "",
      sureDisabled:false,
      menuList:[],
      items:[],
      listArr:[],
      loadFlag:false
    };
  },
  components: {
    // MHeader,
    // MFooter
  },
  watch:{
  },
  mounted() {
    this.getPageList();
    this.getPagedetails();
    Bus.$on('updateNewaddPage',()=>{
        this.addNewPage()
    })
  },
  methods: {
      titleChange(){
          console.log('变化')
      },
      getPagedetails(){
          var pageId = getCookies("page");
          var pageInfo = {
          // token: getCookies("fecbb6e8b4699053"),
            user_id: getLStorage("userId"),
            page_id: pageId
            };
            this.$ajaxs.getMainpageInfo(pageInfo).then(data => {
                if (data.code == 1) {
                    var menus = data.result.menu_list;
                    menus.sort((a, b) => a.menu_index - b.menu_index);
                    this.menuList = menus;
                    this.items = $.parseJSON(data.result.banner_content);
                    console.log(this.items,this.menuList)

                }
            })
      },
    changeCurrentPage(val){
      this.curpage=val;
      this.getPageList();
      },
    addRow() {
      console.log(this.pageUrl);
      var canvas = qrcanvas({
        data: this.pageUrl,
        size: 98
      });
      //console.log();
      $("#preShowImg").html("");
      $("#preShowImg").html(canvas);
      //document.getElementById("preShowImg").innerHTML = "";
      // document.getElementById("preShowImg").appendChild(canvas);
    },
    shareLink(id) {
      var params = {
        view_id: id,
        view_type: "1",
        token: this.token
      };
      console.log(params);
      this.$ajaxs.getH5Url(params).then(data => {
        console.log("this" + JSON.stringify(data));
        if (data.code == "1") {
          //console.log(data.result.path);
          this.pageUrl = data.result.path;
          this.preShowDialogVisible = true;
          setTimeout(() => {
            this.addRow();
          }, 500);
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
      });
    },
    getPageList() {
      let pageListParams = {
        token: this.token,
        page_size: 3,
        cur_page: this.curpage
      };

      this.$ajaxs.getMainPageList(pageListParams).then(data => {
        //   console.log(data);
        if (data.code == "1") {
          if (data.result.dataList == "" || data.result.dataList == null) {
            $("#newItem").show();
          }
          var pageHtml = "";
          this.pages = data.result.dataList;
          let isUrl = '';
          this.listArr = ['列表一','列表二','列表三']
          console.log(this.pages)
          if (Array.isArray(this.pages)) {
              this.pages.forEach((e,index)=>{
                  if (e.banner_content == '[]') {
                      e.banner_content = '[{"pic_url":"http://qv.facebac.com/image/2e2398bcba7ce082c7d7/9wyqlg18j32kyrefzcwy/n_n/235dfade932ef4f62a48e913dacc7efa.png","link_url":""}]';
                  }
                isUrl = $.parseJSON(e.banner_content);
                this.pages[index].banner_content = isUrl[0].pic_url;
                // 浏览 uv pv 获取
                //  let params = {
                //         token:this.token,
                //         view_id:e.id
                //     }
                //     this.$ajaxs.setsingle(params).then((res)=>{
                //         if (res.code == 1) {
                //             this.pages[index].uv = res.uv;
                //             this.pages[index].pv = res.pv;
                //         }
                //     })
                //     console.log(this.pages)
              })
          }
          this.pagesNum = Number(data.result.page.pages);
          this.curpage = data.result.page.cur_page;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
      });
    },
    onEnter(i) {
      $("#" + i).addClass("v-shadow");
      $("#" + i).css("display", "block");
      let params = {
          token:this.token,
          view_id:i
      }
      this.$ajaxs.setsingle(params).then((res)=>{
          if (res.code == 1) {
              // this.pCount = res.result[0].pv;
              // this.scanCount = res.result[0].uv;
              this.scanCount = res.result[0].pv;
               this.pCount = res.result[0].uv;
              // this.getPageList();
          }
      })
      //$("#delete" + i).css("display", "block");
    },
    onLeave(i) {
      $("#" + i).removeClass("v-shadow");
      $("#" + i).css("display", "none");
      this.pCount = 0;
      this.scanCount =0;
      // $("#delete" + i).css("display", "none");
    },
    addNewPage() {
      this.IsAdd = true;
      this.AddruleForm.newTitle = "";
    },
    debounce(){
        // var timer;
		// return function(){
		// 	var that = this;		//防止定时器中的this变成window对象了
		// 	var args = arguments;	//获取函数参数
		// 	if(timer){		
		// 		//当定时器里的函数还未运行，会走里面，清除即将触发的定时器
		// 		clearTimeout(timer);	
		// 	}
		// 	timer = setTimeout(function(){
		// 		timer = null;		 
		// 		fn.apply(that,args); //用apply调用函数	
		// 	},500);	
		// }
    },
    submitForm(formName, index) {
            // this.sureDisabled = true;
            this.loadFlag = true;
            setTimeout(()=>{
                this.loadFlag = false;
            },1000)
          switch (index) {
            //添加主页
            case "1":
              if(this.AddruleForm.newTitle==""){
                this.$message({
                      showClose: true,
                      type: "info",
                      message: "标题不能为空!"
                    });
                    return
              }
              let Aparams = {
                token: this.token,
                page_name: this.AddruleForm.newTitle
              };
              let that=this;
              $.ajax({
                  type: "POST",
                  timeout: 120000, //超时时间设置，单位毫秒
                  async: false,
                  url: DATA_API_URL + "mainpage/new_page",
                  data: Aparams,
                  dataType: "json",
                  success: function(data) {
                    //   this.sureDisabled = false;
                    // that.loadFlag = false;
                    console.log(data);
                switch (data.code) {
                  case 1:
                    that.$message({
                      showClose: true,
                      type: "success",
                      message: "设置成功!"
                    });
                    $("#newItem").hide();
                    that.editPage(data.result);
                    break;
                  case 2:
                    that.$message({
                      showClose: true,
                      type: "error",
                      message: "操作失败!"
                    });
                    break;
                  case 3:
                    that.$message({
                      showClose: true,
                      type: "error",
                      message: "参数错误!"
                    });
                    break;
                  case 4:
                    that.$message({
                      showClose: true,
                      type: "error",
                      message: "token错误!"
                    });
                    break;
                  case 7:
                    that.$message({
                      showClose: true,
                      type: "error",
                      message: "名称已存在，新建失败"
                    });
                    break;
                  default:
                    that.$message({
                      showClose: true,
                      type: "error",
                      message: "添加失败!"
                    });
                    break;
                }
                that.getPageList();
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      that.loadFlag = false;
                    console.log(XMLHttpRequest);
                  }
                });
              this.IsAdd = false;
              break;
            //更改主页名称
            case "2":
              break;
          }
    },
    resetForm(formName, index) {
      switch (index) {
        //添加主页
        case "1":
          this.IsAdd = false;
          break;
        //更改主页名称
        case "2":
          break;
      }
    },
    copyLink(pageId) {
      copyLink("cpLink");
      this.$message({
        showClose: true,
        type: "success",
        message: "复制成功"
      });
    },
    editPage(pageId) {
      //this.copyLink(pageId);
      var params = {
        view_id: pageId,
        view_type: "1",
        token: this.token
      };
      console.log(params);
      this.$ajaxs.getH5Url(params).then(data => {
        console.log("this" + JSON.stringify(data));
        if (data.code == "1") {
          //console.log(data.result.path);
          this.pageUrl = data.result.path;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
      });
     // debugger
      setTimeout(() => {
        setCookies("page", pageId, 7, 7 * 24 * 60 * 60 * 1000);
        //  removeCookie("pageUrl");
        setLStorage("pageUrl", this.pageUrl);
        this.$router.push({
          path: "/mainPage/editPage"
        });
      }, 100);
    },
    changePageTitle(id,name) {
      console.log(id);
      this.centerDialogVisible = true;
      this.pageId = id;
      this.changedTitle=name;
    },
    //更改主页名字
    changeTitle() {
      if(this.changeTitle==""){
        this.$message({
            showClose: true,
            type: "info",
            message: "标题不能为空!"
        });
        return
      }
      this.centerDialogVisible = false;
      var modifyParams = {
        token: this.token,
        page_id: this.pageId,
        page_name: this.changedTitle
      };
      console.log(modifyParams)
      this.loadFlag = true;
      let that = this;
      $.ajax({
            type: "POST",
            timeout: 120000, //超时时间设置，单位毫秒
            async: false,
            url: DATA_API_URL + "mainpage/mod_page_name",
            data: modifyParams,
            dataType: "json",
            success: function(data) {
                console.log(data)
                if (data.code == 1) {
                    that.$message({
                        showClose: true,
                        type: "success",
                        message: "修改成功"
                });
                    that.loadFlag = false;
                    that.getPageList();
                    that.changedTitle = "";
                }else{
                    that.loadFlag = false;
                }
            }
        })
    //   this.$ajaxs.modifyPageTitle(modifyParams).then(data => {
    //     console.log(data);
    //     if (data.code == "1") {
    //       this.$message({
    //         showClose: true,
    //         type: "success",
    //         message: "修改成功"
    //       });
    //       this.loadFlag = false;
    //       this.getPageList();
    //       this.changedTitle = "";
    //     } else {
    //         this.loadFlag = false;
    //     }
    //   });
    },
    deletePage(pageId) {
      this.getPageList();
      this.DeleteDialogVisible = true;
      this.deletePageId = pageId;
    },
    deleteH5Page(){
      var deleteParams={token:this.token,view_id:this.deletePageId};
      this.$ajaxs.deleteH5Page(deleteParams).then(data => {
        console.log(data);
        if (data.code == 1) {
          console.log("a");
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "H5主页删除失败"
          });
          console.log(data.msg);
        }
      });
    },
    deletePageNow() {
      this.DeleteDialogVisible = false;
      var deleteParams = { token: this.token, page_id: this.deletePageId };
      console.log(deleteParams);
      this.$ajaxs.deletePage(deleteParams).then(data => {
        console.log(data);
        if (data.code == "1") {
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功"
          });
          if(this.curpage>1){
            this.curpage=1;
          }
          this.getPageList();
          this.deleteH5Page();
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
      });
    },
    nextClick() {
      if (this.curpage >= this.pagesNum) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已是最后一页了"
        });
      } else {
        this.curpage++;
        this.getPageList();
      }
    },
    preClick() {
      //console.log();
      if (this.curpage <= 1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已是第一页了"
        });
      } else {
        this.curpage--;
        this.getPageList();
      }
    },
    myMove(key){
      console.log(key)
        if (key == 1) {
          $('#myshow').css('display','block !important')
          console.log($('#myshow'))
          // this.flag = true
        }else{
          $('#myshow').css('display','none !important')
          // this.flag = false;
        }
    }
  }
};
</script>
<style scoped>
.addPageBtn {
  float: right;
  position: absolute;
  right: 20px;
  top: 13px;
}
#cpLink {
  background: #fff;
  border: 1px solid #d6d8d9;
  height: 32px;
  border-radius: 2px;
  width: 290px;
  color: #333;
}
#preShowImg canvas {
  padding: 20px;
  border: 1px solid #4285f4;
}
.dlTips{
  font-weight: bolder;
  margin-top: 20px;
}
.blue_btn {
  width: 70px;
  position: absolute;
  right: 19px;
  height: 32px;
  background-color: #f2f2f2 !important;
  color: #000000;
  border: 1px solid #d9d9d9;
}
.downLoad{
  color: #4285F4;
}
.mainList {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 14px 10px 10px;
  padding-top: 20px;
  font-size: 1.8rem;
  height: 750px;
}
.mainList .my_section{
  padding-left:30px;
}

.mainList hr {
  margin-top: 30px;
  border: 0.5px solid #f2f2f2;
}
.mainList h2 {
  font-size: 18px;
  margin: 0px;
}
.ValidTip {
  border: 1px solid red;
}
#newItem {
  background-color: rgba(245, 245, 245, 1);
  background:rgba(245,245,245,1);
  border-radius:5px;
  padding:17px;

}
.List {
  margin-top: 77px;
  position: relative;
}
#newItem,
.viewItem {
  height: 446px;
  width: 250px;
  /*-webkit-filter:brightness(0.3);删除*/
}
.addNew {
  border: 1px dashed #cccccc;
  height: 446px;
  width: 250px;
  margin: 0 auto;
  text-align: center;
  /* position: relative;
  padding: 10px;
  left: -10px;
  top: -10px; */

}

.addNew h1 {
  font-size: 97px;
  line-height: 448px;
  margin: 0 auto;
  font-family: -webkit-pictograph;
  cursor: pointer;

}
.addNew span {
  font-size: 20px;
  font-weight: bold;
  margin-left: 92px;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  position: relative;
  top: 200px;
  font-size: 47px;
  font-weight: bolder;
  color: #e5e5e5;
}
#item1 {
  /* background: url(../../common/image/Main1.png) no-repeat; */
  background-size: 100%;
  background-color: #fff;
}
#item2 {
  /* background: url(../../common/image/Main1.png) no-repeat; */
  background-size: 100%;
  /* border: 1px solid #979797; */
  border-radius: 5px;
  cursor: pointer;
}
.delete {
  position: relative;
  top: 12px;
  font-size: 12px;
  /* background: -webkit-linear-gradient(right, #09a7ff, #6a28ff); */
  color: #4285F4;
  cursor: pointer;
  text-decoration: underline;
  /* display: none; */
}
.viewItem p {
  font-size: 12px;
  color: #fff;
  margin-top: 20px;
}
.v-shadow {
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  height: 250px;
  width: 101%;
}
.v-content {
  padding-top: 80%;
  text-align: center;
  display: none;
}
.btns button {
  background: #4285f4;
  color: #ffffff;
  margin-top: 28px;
  border: none;
}
.title {
  margin-top: -32px;
  margin-bottom: 11px;
  font-size: 16px;
  text-align: left;
}
.title h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 16px;
}
.title i {
  color: #cccccc;
  cursor: pointer;
}
.askDeleteTip1 {
  color: #000000;
  /* font-weight: bold; */
  font-size: 15px;
}
.askDeleteTip2 {
  color: #ee6054;
}
/*分页*/
.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
  margin-top: 20px;
}
.page-item:first-child .page-link {
  margin-left: 0;
  /* border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem; */
}
.page-link:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.page-link {
  position: relative;
  display: block;
  padding: 0.75rem 1rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  font-size: 1.5rem;
  /* border: 1px solid #dee2e6; */
}
.w1000 {
  width: 970px;
}
.el-col-7 {
  margin-left: 15px;
}
.new_item_box.el-col-7,.new_item_box{
  width:100%;
}
#newItem,.new_item_box.el-col-7{
    margin:0 auto;
}
#preShowImg{
      margin-top: 41px;
}
#preShowImg{
  width: 98px;
  height: 98px;
    padding: 10px;
    border: 1px #4285F4 solid;
        position: relative;
    left: 166px;
}
.text_tip{
      margin-top: -5px;
}
/* .myPagination{
  margin-top: 56px;
} */
.paginationRow{
      position: relative;
    top: 30px;
}
.mainList .center_box{
  margin: 0 auto;
  text-align: center;
  padding-left:37px;
}

.in_block{
  display: inline-block;
}
.in_block.w_250{
  width:250px;
  margin-right: 38px;
}
.in_block.w_37{
  width: 37px;
  height: 37px;
  position: absolute;
}
</style>
<style>
html,
body {
  font-size: 10px;
}
.el-dialog {
  border-radius: 5px;
}
.el-dialog--center .el-dialog__body {
  text-align: center;
}
.el-dialog__body,
.el-dialog__header {
  border-bottom: none;
}

.tps_11{
    position: absolute;
    top: 70px;
    right: 74px;
    width: 15px;
    height: 15px;
    background: rgba(0,0,0,.2);
    line-height: 20px;
    color: #fff;
    border-radius: 50%;
    text-align:center;
    /* padding-left:5px; */
    font-style:normal;
    font-size:10px;
}
.tps_11:hover{
    background: #2B6CFF;
}
.block.tps_22{
    position: absolute !important;
    /* height: 42px; */
    top: 103px;
    left: 159px;
    z-index: 99;
    background: rgba(0,0,0,.7) !important;
    border-radius: 17px !important;
    text-align: left;
    color: #fff;
    padding: 17px;
    display: none !important;
    max-width: 216px;
    font-size:12px;
    line-height:21px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
}
.tps_22::after{
    content: '';
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color: rgba(0,0,0,.7);
    top: -21%;
    left: 33px;
}
/* .tps_1:hover +.tps_2{
      display:block !important;

  } */
.mr_1{
  margin-left:46px;
}
.tips_img{
    background:url(../../common/image/tps2.png);
    width: 73%;
    height: 54%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: -19px;
    text-align:center;
    padding-top: 21px;
    color: #fff;
}
.p6{
  width: 80%;
  height: 80%;
  margin: auto;
  margin-top: 5px;
}
.tps_11:hover +.tps_22{
    display:block !important;
}
.newViewItem{
    position: absolute;
    width: 251px;
    height: 446px;
    border: 1px solid #eee;
    border-radius: 10px;
}
.newViewItem .p_bg1{
    width: 251px;
    height: 43px;
    line-height:55px;
    background: url("../../common/image/pageHeader.png") no-repeat;
    background-size: 100% auto;
    background-color: #000;
    text-align:center;
    font-size:15px;
    border-radius: 5px 5px 0 0;
}
.newViewItem .newView_li1{
    height: 134px;
    width:251px;
}
.newViewItem .newView_ul1{
    height: 28px;
    width: 251px;
    background: yellow;
    line-height: 50px;
    overflow: hidden;
    background:#fff;
    line-height:28px;
}
.newViewItem .newView_ul1 .li1_1{
    height: 100%;
    min-width: 50px;
    float: left;
    text-align:center;
    /* border:1px solid #eee; */
    font-size: 10px;
    color: #606266;
}
.newView_ul2{
    height: 240px;
    width: 251px;
    border: 1px solid #eee;
}
.newView_ul2 .li2_2{
    width:251px;
    height: 240px;
}
..newView_ul2 .li2_2 img{
    height: 240px;
    width:251px;
}
.input_main input{
    padding-right:39px;
}
/* .shareToFriend .el-dialog--center{
    width:560px;
    height: 470px;
} */
</style>



