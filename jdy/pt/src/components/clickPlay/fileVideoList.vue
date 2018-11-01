<template>
  <div class="clickPlay">
    <m-header></m-header>
    <div class="w1000 bg-fff mt20" style="padding-bottom: 30px;">
      <div class="main-search">
        <div class="el-row">
          <div class="el-col-6">
              <el-input placeholder="请输入直播名称" style="width: 250px;">
                  <el-button slot="append" icon="search">搜索</el-button>
              </el-input>
          </div>
          <div class="el-col-18 main-search-fr">
            <el-button type="primary" plain @click="removeFile()">移动</el-button>
            <el-button type="primary" plain @click="uploadVideo()">上传</el-button>
            <el-button type="danger" plain @click="deleteDialog(checkedListData,2)">删除</el-button>
          </div>
      </div>
      </div>
      <div style="padding:30px 30px 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="thirdBread">
          <el-breadcrumb-item :to="{ path: '/fileList' }">返回上一级<a style="margin: 0 6px;position:relative;top: 2px;display: inline-block;width: 1px;height: 15px;border-right: 1px solid #2B6CFF;"></a></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/videoCenter' }">点播管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/fileList' }">文件夹管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{fileName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="click-wrap">
          <div class="click-list-title">视频信息</div>
        <el-checkbox-group
          v-model="checkedListData"
          @change="handleCheckedChange">
          <div class="click-list" v-for="item in vodListData.list">
            <el-checkbox :label="item.id"></el-checkbox>
            <div class="click-leftImg" @click="playVideo(item)">
              <img class="play-icon"  src="../../common/image/icon_play@2x.png" alt="">
              <img class="bgImg" :src="item.vodCoverUrl" alt="" onerror="javascript:this.src='http://mwdatatest.facebac.com/1/0/0/7e54cc6ad6b334c61f2c/45698775-780e-4f31-8f90-b15a9593de69.png'">
            </div>
            <div class="click-rightContent">
              <div class="click-title">
                <span>{{item.vodName}}</span>
                <span style="margin-left: 30px;">{{item.size}}M</span>
              </div>
              <!--1、直播录像 2、上传视频-->
              <div v-if="item.vodSource==1" class="click-p">视频来源：直播录像</div>
              <div v-else-if="item.vodSource==2" class="click-p">视频来源：上传视频</div>
              <div class="click-p">上传时间：{{item.createTime}}</div>
              <!--0:审核中 1：审核通过  2：审核不通过-->
              <div v-if="item.vodStatus==0" class="click-p">审核中</div>
              <div v-else-if="item.vodStatus==1" class="click-p pass">审核通过</div>
              <div v-else-if="item.vodStatus==2" class="click-p check-p">审核不通过</div>
            </div>
            <div class="click-btn">
              <el-button v-if="item.vodStatus==1" @mouseenter.native="qrcanvas(item)" type="primary" class="small default-colHover" plain>
                分享
                <div class="p-a qrcImg">
                  <div class="qrcImg-content clear">
                    <div class="fl mr20" style="margin-top: 8px;">
                      <div class="ewm_84" :id=" 'qrc' + item.defRoomId"></div>
                      <div style="font-size:12px;">手机扫描观看</div>
                    </div>
                    <div class="fl te-l">
                      <div style="margin-bottom:6px;">观看地址：</div>
                      <!--<div hidden>{{ item.playUrl = item.playUrl || PlayUrl + item.id }}</div>-->
                      <div><input readonly type="text" style="width: 375px;margin-bottom:14px;" v-model="item.shareUrl" :id=" 'copyUrl' + item.id" class="el-input__inner"></div>
                      <div class="mt5">
                        <!--<el-button type="primary" @click="playVideo(item)">打开视频</el-button>-->
                        <el-button type="primary"  @click="copyLink(item)">复制地址</el-button><!--class="btn_cc"-->
                      </div>
                    </div>
                  </div>
                </div>
              </el-button>
              <el-button type="primary" plain class="small"  @click="clickPlayDetail(item)">详情</el-button>
              <el-button type="primary" plain class="small" @click="management(item)">管理</el-button>
              <el-button type="primary" plain class="small"  @click="editor(item)">编辑</el-button>
              <el-button type="danger" plain class="small" @click="deleteDialog(item,1)">删除</el-button>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="vodListData.page.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="vodListData.page.page_size"
        layout="prev, pager, next"
        :total="vodListData.page.total"
        background>
      </el-pagination>

      <el-dialog
        title="移动到"
        :visible.sync="filePop"
        width="400px"
      >
        <div>
          <!--<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
          <el-radio-group v-model="toMediaFolderId">
            <div style="margin-bottom: 20px;">
              <el-radio label="0">点播管理</el-radio>
            </div>
            <div v-for="item in videoFileList" style="margin-bottom: 20px;">
              <el-radio :label="item.id" >{{item.fileName}}</el-radio>
            </div>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateVodPlace">确 定</el-button>
        <el-button @click="filePop = false">取 消</el-button>
      </span>
      </el-dialog>

      <!--删除视频提示 start-->
      <el-dialog
        class="dialogComfirm"
        :visible.sync="deleteDialogVisible"
        width="400px"
        center>
        <p v-if="type==1" style="font-size:14px;text-align: center;color: #000;margin-bottom: 3px;">您确定删除此视频吗？</p>
        <p v-if="type==2" style="font-size:14px;text-align: center;color: #000;margin-bottom: 3px;">您确定删除选中的视频吗？</p>
        <p style="font-size:14px;text-align: center;color: #000;">删除后的视频不可恢复！</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deteltVodInfo(deleteVideoId)">确 定</el-button>
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--删除视频提示 end-->

    </div>
    <m-footer></m-footer>
  </div>
</template>
<script>
  import {getLStorage,setLStorage,timestampToTime,VideoH5_URL} from '../../api/config'
  import {copyLink} from 'api/config'
  import MHeader from 'components/header/header'
  import mFooter from 'components/header/footer'
export default {
  name: 'clickPlay',
  data(){
      return {
        type:0,
        deleteVideoId:'',
        deleteDialogVisible:false,
        vodListData:{
          list:[],
          page:{
            page_no:1,
            page_size:10,
            total:0
          }
        },
        checkedListData:[],
        filePop:false,
        toMediaFolderId:'',
        videoFileList:[],
        playType:'',
        multipleSelection: [],
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        fileName:'文件夹标题',
        index_video:"1"
      }
  },
    created(){
      if(this.$route.query.id){
        this.mediaFolderId = this.$route.query.id;
        this.getSelectVodListData();
      }
      if(this.$route.query.name){
          this.fileName = this.$route.query.name
      }
      this.selectMediaFolderList2();
    },
    methods: {
      //播放视频
      playVideo(data){
        this.index_video ++;
        if(data.vodStatus==1) {
          let url = data.playM3u8Url;
          let player;
          this.dialogPlay = true;
          this.$alert(
            '<video  data-id='+this.index_video+' style=" min-width:720px;min-height:406px;"  id="preVideo"  class="video-js vjs-default-skin" controls ebkit-playsinline="true" autobuffer preload="auto" poster="" x-webkit-airplay="true" webkit-playsinline="true" playsinline></video>',
            "录像预览",
            {
              dangerouslyUseHTMLString: true,
              showConfirmButton: false,
              customClass: "videoMessageBox",
              callback: () => {
                player.dispose();
              }
            }
          );
          setTimeout(function () {
            //初始化视频
            player = videojs(
              "preVideo",
              {
                controls: true,
                autoplay: true,
                controlBar: {
                  captionsButton: false,
                  chaptersButton: false,
                  liveDisplay: false,
                  playbackRateMenuButton: false,
                  subtitlesButton: false
                }
              },
              function () {
              }
            );
            videojs("preVideo").ready(function () {
              var myPlayer = this;
              player.src({
                src: url,
                type: "application/x-mpegURL"
              });
            });
          }, 500);
        }
      },
      //显示二维码
      qrcanvas(data){
        this.qrcode = VideoH5_URL+"?videoid=" + data.defRoomId+"&v=1.7.0"
        var canvas1 = qrcanvas({
          data: this.qrcode,
          size: 85
        })
        let id = 'qrc' + data.defRoomId;
        document.getElementById(id).innerHTML = ''
        document.getElementById(id).appendChild(canvas1)
      },
      copyLink(data){
        let copyUrl = 'copyUrl' + data.id
        copyLink(copyUrl)
        this.$message({
          showClose: true,
          message: '复制成功！',
          type: 'success'
        });
      },
      //获取点播列表
      getSelectVodListData(){
        let paramData = {
          userId:getLStorage('userId'),
          mediaFolderId:this.mediaFolderId,
          page_index:this.vodListData.page.page_no,
          page_size:this.vodListData.page.page_size,
        }
        this.$ajaxs.getVideoList(paramData).then(res => {
          this.vodListData.list = res.data.list;
          this.vodListData.page.total = res.data.page.total;
          for(var i=0;i<this.vodListData.list.length;i++){
            this.vodListData.list[i].createTime = timestampToTime(this.vodListData.list[i].createTime);
            this.vodListData.list[i].shareUrl = VideoH5_URL+"?videoid=" + this.vodListData.list[i].defRoomId;
          }
        })
      },
      //点击多选按钮
      handleCheckedChange(){
      },
      handleCurrentChange(val){
        this.vodListData.page.page_no = val;
        this.getSelectVodListData();
      },
      //查询文件夹列表
      selectMediaFolderList(){
        let paramsData = {
          userId:getLStorage('userId'),
        }
        this.$ajaxs.selectMediaFolderList(paramsData).then(res => {
          if(res.code==200){
            if(res.data!=null){
            }
          }
        })
      },
      editor(data){
        setLStorage("vId", data.id);
        setLStorage("defRoomId", data.defRoomId);
        this.$router.push("/uploadVideo?id="+data.defRoomId+"&vid="+data.id);
      },
      uploadVideo() {
        this.$router.push({ path: "uploadVideo2" });
      },
      clickPlayDetail(data){
        setLStorage("vId", data.id);
        setLStorage("defRoomId", data.defRoomId);
        this.$router.push({path:"/onDemand/vLiveControl?id="+data.defRoomId});
      },
      management(data){
        setLStorage("vId", data.id);
        setLStorage("defRoomId", data.defRoomId);
        this.$router.push({path:"/onDemand/vLiveControl?id="+data.defRoomId+"&type="+3+"&tabType="+2});
      },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleNodeClick(data) {
        },
      //删除弹窗提示
      deleteDialog(data,type){
        this.type = type;
        if(this.type==1){
          this.deleteVideoId = data.id;
          this.deleteDialogVisible = true;
        }else if(this.type=2){
          if(data.length!=0){
            this.deleteDialogVisible = true;
          }else {
            this.$message({
              showClose: true,
              message: '请选择需要删除的记录！',
              type: 'error'
            });
          }
        }
      },
      //删除视频 触发事件
      deteltVodInfo(data){
        if(this.type==1){//单个删除
          this.deletVideo(data);
        }else if(this.type==2){//批量删除
          this.deletVideo(this.checkedListData.join(','));
        }
      },
      //删除视频
      deletVideo(id){
        let paramData = {id:id}
        this.$ajaxs.deteltVodInfo(paramData).then(res => {
          if(res.code=200){
            this.$message({
              type: 'success',
              showClose: true,
              message: '删除成功!'
            });
            //重置
            this.deleteDialogVisible = false;
            this.deleteVideoId = ''
            //刷新列表
            this.getSelectVodListData();
          }else {
            this.$message({
              type: 'error',
              showClose: true,
              message: '删除失败!'
            });
          }
        })
      },
      //移动文件夹弹窗
      removeFile() {
        this.toMediaFolderId = '';
        if(this.checkedListData.length==0){
          this.$message({
            showClose: true,
            message: '请选择需要移动的视频文件！',
            type: 'error'
          });
          return;
        }
        this.filePop = true;
      },
      //查询文件夹列表
      selectMediaFolderList2(){
        let paramsData = {
          userId:getLStorage('userId'),
        }
        this.$ajaxs.selectMediaFolderList(paramsData).then(res => {
          if(res.code==200){
            if(res.data!=null){
              this.videoFileList = res.data.list;
            }
            //console.log(this.videoFileList,'文件夹列表');
          }
        })
      },
      //移至文件夹
      updateVodPlace(){
        if(!this.toMediaFolderId){
          this.$message({
            showClose: true,
            message: '请选择移至的视频文件！',
            type: 'error'
          });
          return;
        }
        let paramData = {
          id:this.checkedListData.join(','),
          toMediaFolderId:this.toMediaFolderId
        };
        this.$ajaxs.updateVodPlace(paramData).then(res => {
          if(res.code==200){
            this.filePop = false;
            this.$message({
              showClose: true,
              message: '移动文件夹成功了！',
              type: 'success'
            });
            this.getSelectVodListData();
          }else {
            this.$message({
              showClose: true,
              message: '操作失败！',
              type: 'error'
            });
          }
        })
      }
    },
  components:{
    MHeader,mFooter
        }
}
</script>
<style scoped>
  /* code */
  .click-btn .default-colHover .qrcImg{
    display:none;
    right:-2px;
    color:#333;
    width:535px;
    height: auto;
    z-index: 999;
    padding-top:44px;
  }
  .click-btn .default-colHover:hover .qrcImg {
    display: block;
  }
  .qrcImg .el-button {
    height:32px;
    line-height: 3px;
    width:80px;
    padding:0;
    font-size:12px;
  }
  .qrcImg .el-button.btn_cc{
    background: #E5E5E5;
    color:#333333;
    border:1px solid #D9D9D9;
    margin-left:15px;
  }
  .click-btn .default-colHover .qrcImg-content{
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
  .qrcImg:before,.qrcImg:after{
    content:"";
    display:block;
    border-width:12px;
    position:absolute;
    /* bottom:-40px; */
    top: -2px;
    left: 123px;
    border-bottom: 23px;
    border-style:solid dashed dashed;
    border-color: transparent transparent #E5E5E5;
    font-size:0;
    line-height:0;

  }
  .qrcImg:after{
    top:-11px;
    border-color: transparent transparent #FFF;
  }
  .qrcImg::before{
    top:-13px;
  }
  /*code end*/
    .moveFile_dialog .mw-dialog-header {text-align: left;border-bottom: 1px solid #DFDFDF;font-size: 16px;color: #000;height: 45px;line-height: 30px;padding-bottom: 20px;}
    .mw-dialog-body {width: 450px;min-height: 300px;max-height: 350px;overflow-x:hidden;overflow-y: scroll;}
    .moveFile_dialog .mw-dialog-footer {padding-top: 20px;border-top: 1px solid #DFDFDF;}
    .moveFile_dialog .mw-dialog {padding-bottom: 20px;}
    .clickPlay {padding-bottom: 20px;}
    .main-search {padding: 20px 30px 0 30px;}
    .main-search-fr {float: right;text-align: right;}
    .main-search-fr .el-select{width:100px!important;margin-right:10px;top: -2px; }
    .main-search-fr .el-button {margin-right: 0;}
    .main-search-fr .state-select {margin-right: 15px;}
    .click-wrap {margin: 15px 30px 0px 30px;border-left: 1px solid #E5E5E5;border-right: 1px solid #E5E5E5;}
    .click-list {position: relative;padding:10px 20px;padding-left:0;height: 121px;border-bottom: 1px solid #E5E5E5;}
    .click-list:hover {background: #ECF6FF;}
    .click-list .el-checkbox {position: absolute;top: 54px;left: 22px;}
    .click-leftImg {
      position: absolute;
      top: 20px;
      left: 60px;
      width: 180px;
      height: 100px;
      cursor: pointer;
      background: #F5F5F5;
    }
    .click-leftImg.leftImgFiel img {display: block;margin: 14px auto;}
    .click-leftImg img.bgImg {
      width: 180px;
      height: 100px;
    }
    .click-leftImg .play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -25px;
      margin-left: -25px;
      width: 50px;
      height: 50px;
    }
    .click-rightContent {padding: 10px 0;padding-left: 260px;width: 100%;}
    .click-title {display: flex;justify-content: space-between;width: 100%;font-size: 16px;margin-top: 0px;margin-bottom: 8px;}
    .click-title span:nth-child(1){font-weight: bold;color: #333;}
    .click-title span:nth-child(2){color: #999999;font-size: 13px;}
    .click-p {line-height: 25px;height: 25px;font-size: 12px;color: #999999;}
    .click-p.check-p {color: #EA4335;}
    .click-p.pass {color: #6EB81C;}
    .click-btn {position: absolute;right: 20px;bottom: 30px;width: 600px;text-align: right;}
    .el-select.state-select {height: 32px;}
    .click-list-title {padding-left: 60px;font-size:16px;line-height: 40px;height: 40px;background: #F5F5F5;color: #333;border-top: 1px solid #e5e5e5;border-bottom: 1px solid #E5E5E5;}
    .click-btn {display: none}
    .click-list:hover .click-btn {display: block;}
</style>

