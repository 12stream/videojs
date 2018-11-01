<template>
  <div class="clickPlay">
    <div class="main-search">
        <div class="el-row">
          <div class="el-col-6">
              <el-input v-model="prom" @change="selectVodInfoBySearch" placeholder="请输入视频名称" style="width: 250px;">
                  <el-button @click="selectVodInfoBySearch" slot="append" icon="search">搜索</el-button>
              </el-input>
          </div>
          <div class="el-col-18 main-search-fr">
              <!--<el-cascader placeholder="全部"
                :options="options"
                v-model="selectedOptions"
                @change="selectVodBySelective">
              </el-cascader>-->
              <el-select v-model="selectedOptions" @change="selectVodBySelective" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-button type="primary" plain  @click="removeFile()">移动</el-button> -->
              <el-button type="primary" plain class="small"  @click="uploadVideo()">上传</el-button>
              <el-button type="danger" plain class="small"  @click="deleteDialog(checkedListData,2)">删除</el-button>
          </div>
      </div>
      </div>
      <div class="click-wrap">
          <div class="click-list-title">视频信息</div>
          <!--<div class="click-list" @click="intoFiles" style="cursor: pointer;">
              <div class="click-leftImg leftImgFiel">
                  <img src="../../common/image/fileSet.png" alt="">
              </div>
              <div class="click-rightContent">
                  <div class="click-title">
                      <span  contenteditable="true">文件夹管理入口</span>
                  </div>
                  <div class="click-p">直播间录像管理与上传视频文件夹管理入口</div>
              </div>
          </div>-->
        <div class="click-list" @click="intoFiles" v-for="item in folderListData">
          <div class="click-leftImg">
            <img src="../../common/image/file.png" alt="">
          </div>
          <div class="click-rightContent">
            <div class="click-title">
              <span>{{item.fileName}}</span>
              <span>300M</span>
            </div>
          </div>
        </div>
        <el-checkbox-group
          v-model="checkedListData"
          @change="handleCheckedChange">
          <div class="click-list" v-if="vodListData.list.length" v-for="item in vodListData.list">
              <el-checkbox :label="item.id"></el-checkbox>
              <div class="click-leftImg"  @click="playVideo(item)">
                <img class="bgImg" :src="item.vodCoverUrl" alt="" onerror="javascript:this.src='http://mwdatatest.facebac.com/1/0/0/7e54cc6ad6b334c61f2c/45698775-780e-4f31-8f90-b15a9593de69.png'">
                <img class="play-icon"  src="../../common/image/icon_play@2x.png" alt="">
              </div>
              <div class="click-rightContent">
                <div class="click-title">
                    <span>{{item.vodName}}</span>
                    <span style="margin-left: 30px;">{{item.size}}M</span>
                </div>
                <!--1、直播录像 2、上传视频-->
                <div v-if="item.vodSource==1" class="click-p">视频来源：直播录像</div>
                <div v-else-if="item.vodSource==2" class="click-p">视频来源：上传视频</div>
                <div class="click-p">上传时间：{{item.createTime|filterTime}}</div>
                <!--0:审核中 1：审核通过  2：审核不通过 3:审核中-->
                <div v-if="item.vodStatus==0" class="click-p">审核中</div>
                <div v-else-if="item.vodStatus==1" class="click-p pass">审核通过</div>
                <div v-else-if="item.vodStatus==2" class="click-p check-p">审核不通过</div>
                <!--<div v-else-if="item.vodStatus==3" class="click-p">处理中</div>-->
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
                            <!--<span>分享嵌入</span>--><!--class="btn_cc"-->
                            <span style="margin-left: 5px;color: #2B6CFF;" @click="goVshareVideo(item)">嵌入设置</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-button>
                  <el-button v-if="item.vodStatus==1" type="primary" class="small" plain @click="clickPlayDetail(item)">详情</el-button>
                  <el-button v-if="item.vodStatus==1" type="primary" class="small" plain @click="management(item)">管理</el-button>
                  <el-button type="primary" class="small" plain @click="editor(item)">编辑</el-button>
                  <el-button type="danger" class="small" plain @click="deleteDialog(item,1)">删除</el-button>
              </div>
          </div>
        </el-checkbox-group>

        <div  class="no_live" v-if="no_video">
          <div class="no_data">
          </div>
          <div class="tip_no_data">
            <span class="default-color" v-if="search_no_video">没有发现符合条件的视频！</span><!--v-if="form.search!=''"-->
            <span class="default-color" v-if="!search_no_video">您还没有上传视频哦！</span><!--v-if="form.search!=''"-->
            <span v-if="!search_no_video" @click="uploadVideo()" tag="div" class="d-ib  txt_blue">请前往上传视频</span>
          </div>
        </div>

      </div>
    <div v-if="!no_video">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="vodListData.page.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="vodListData.page.page_size"
        layout="prev, pager, next"
        :total="vodListData.page.total"
        background>
      </el-pagination>
    </div>
      <!--移动文件夹 start-->
       <el-dialog
          title="移动到"
          :visible.sync="filePop"
          width="400px"
          >
          <div>
            <!--<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
            <el-radio-group v-model="toMediaFolderId" @change="selectFileName">
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
      <!--移动文件夹 end-->
      <!--绑定弹窗 start-->
      <el-dialog title="提示" :visible.sync="dialogBingVisible" width="600px" height="480px">
        <div>此视频已绑定以下直播间/点播间，请解除绑定后再删除！</div>
        <div class="el-row">
          <div class="el-col-24 text-right">
            <el-button type="text" style="float: right;">全部解除</el-button>
          </div>
        </div>
        <el-table :data="bingListData">
          <el-table-column property="name" label="姓名" width="400"></el-table-column>
          <el-table-column property="" label="操作" width="200" slot-scope="scope">
            <template>
              <el-button type="text">解绑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--绑定弹窗 end-->
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

      <!--绑定视频提示 start-->
      <!--确定从列表中上传视频1吗？-->
      <el-dialog
        class="dialogComfirm"
        :visible.sync="bingDialogVisible"
        width="400px"
        center>
        <div style="width: 100%;text-align: center;font-size: 16px;color: #000;font-weight: bold;margin-bottom: 20px;">确定从列表中删除视频吗？</div>
        <p style="font-size:12px;text-align: center;color: #ea4335;margin-bottom: 5px;">提示：该视频已经绑定其他直播间/点播间 </p>
        <p style="font-size:12px;text-align: center;color: #ea4335;margin-bottom: 5px;">删除源文件后将失效</p>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="deteltVodInfo(deleteVideoId)">确 定</el-button>
            <el-button @click="bingDialogVisible = false">取 消</el-button>
          </span>
      </el-dialog>
      <!--绑定视频提示 end-->
  </div>
</template>
<script>
  import axios from 'axios'
  import {getLStorage,setLStorage,timestampToTime,VideoH5_URL} from '../../api/config'
  import {copyLink} from 'api/config'
export default {
  name: "clickPlay",
  data() {
    return {
      type:0,
      deleteVideoId:'',
      deleteDialogVisible:false,
      bingDialogVisible:false,
      dialogBingVisible:false,//删除绑定弹窗
      bingListData:[],
      videoFileList:[],
      toMediaFolderId:'',
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '审核中'
      }, {
        value: '1',
        label: '审核通过'
      }, {
        value: '2',
        label: '审核未通过'
      },/* {
        value: '3',
        label: '处理中'
      }*/],
      selectedOptions:'',
      /*options: [{
        value: '2',
        label: '我上传的',
        children: [
          {
            value: '',
            label: '全部',
          },{
            value: '0',
            label: '审核中'
          },
          {
            value: '1',
            label: '审核通过',
          },{
            value: '2',
            label: '审核未通过'
          },{
            value: '3',
            label: '处理中'
          }
        ]
      },*/
      prom:'',
      folderListData:[],
      vodListData:{
        list:[],
        page:{
          page_no:1,
          page_size:10,
          total:0
        }
      },
      checkedListData:[],
      filePop: false,
      playType: "",
      multipleSelection: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      no_video:false,
      search_no_video:false,
      index_video:'1'
    };
  },
  mounted(){
      this.getSelectVodListData();
      this.selectMediaFolderList();
      this.selectMediaFolderList2();
  },
  filters:{
    filterTime(val){
                if(!val){
                    let timestamp = Date.parse(new Date())
                    // return '立即开始'
                    // return setDateTime(timestamp)
                    return '暂无点播时间'
                }
                let regExp = /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/
                if(regExp.test(val)){
                    return val
                }

                let datetime = new Date(val)
                var month = datetime.getMonth() + 1
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                var strDate = datetime.getDate()
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let getHours = datetime.getHours()
                if (getHours >= 0 && getHours <= 9) {
                    getHours = "0" + getHours;
                }
                let strTime = datetime.getMinutes()
                if (strTime >= 0 && strTime <= 9) {
                    strTime = "0" + strTime;
                }
                let getSeconds = datetime.getSeconds()
                if (getSeconds >= 0 && getSeconds <= 9) {
                    getSeconds = "0" + getSeconds;
                }
                return datetime.getFullYear() + "-" + month + "-" + strDate + " " + getHours + ":" + strTime + ":" + getSeconds
            }
  },
  methods: {
    //播放视频
    playVideo(data){
      this.index_video++;
      if(data.vodStatus==1) {
        let url = data.playM3u8Url;
        console.log(url,'播放地址');
        let player;
        this.dialogPlay = true;
        this.$alert(
          '<video data-id='+this.index_video+'  style=" min-width:720px;min-height:406px;"  id="preVideo"  class="video-js vjs-default-skin" controls ebkit-playsinline="true" autobuffer preload="auto" poster="" x-webkit-airplay="true" webkit-playsinline="true" playsinline></video>',
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
    //获取点播列表
    getSelectVodListData(){
      let paramData = {
        userId:getLStorage('userId'),
        mediaFolderId:0,
        page_index:this.vodListData.page.page_no,
        page_size:this.vodListData.page.page_size,
      }
      this.$ajaxs.getVideoList(paramData).then(res => {
        this.vodListData.list = res.data.list;
        this.vodListData.page.total = res.data.page.total;
        if(this.vodListData.list){
          for(var i=0;i<this.vodListData.list.length;i++){
            // this.vodListData.list[i].createTime = timestampToTime(this.vodListData.list[i].createTime);
            this.vodListData.list[i].shareUrl = VideoH5_URL+"?videoid=" + this.vodListData.list[i].defRoomId;
            if(this.vodListData.list[i].playM3u8Url_720p){
              this.vodListData.list[i].playM3u8Url = this.vodListData.list[i].playM3u8Url_720p;
            }else if(this.vodListData.list[i].playM3u8Url_480p){
              this.vodListData.list[i].playM3u8Url = this.vodListData.list[i].playM3u8Url_480p;
            }
          }
          this.no_video = false;
          this.search_no_video = true;
        }else {
          this.no_video = true;
          this.search_no_video = false;
        }
      })
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
    //分享嵌入
    goVshareVideo(data){
      console.log(data.defRoomId);
      setLStorage('defRoomId',data.defRoomId)
      this.$router.push({path:'/onDemand/vShareEmbedded'+"?tabType="+2});// defRoomId
    },
    handleSizeChange(size){
      this.vodListData.page.page_size = size;
    },
    handleCurrentChange(val){
      this.vodListData.page.page_no = val;
      this.getSelectVodListData();
    },
    //获取点播接口
    selectVodInfoBySearch(){
      let paramData = {
        userId:getLStorage('userId'),
        prom:this.prom
      }
      this.$ajaxs.selectVodInfoBySearch(paramData).then(res => {
        //console.log(res,'搜素');
        this.folderListData = res.data.folderList;
        this.vodListData.list = res.data.vodList.list;
        if(!res.data.vodList.list){
          this.no_video = true;
          this.search_no_video = true;
        }else {
          this.no_video = false;
          this.search_no_video = false;
        };
        this.vodListData.page.total = res.data.vodList.page.total;
      })
    },
    //点播筛选
    selectVodBySelective(data){
      let paramData = {
        userId:getLStorage('userId'),
        // vodSource:data[0],//1：直播录像；2：上传视频
        // prom:data[1],//0:审核中 1:审核通过 2:审核不通过
        vodSource:2,//1：直播录像；2：上传视频
        prom:this.selectedOptions,//0:审核中 1:审核通过 2:审核不通过
      }
      this.$ajaxs.selectVodBySelective(paramData).then(res => {
        this.vodListData.list = res.data.list;
        this.vodListData.page.total = res.data.page.total;
        if(!this.vodListData.list){
          this.no_video = true;
          this.search_no_video = true;
        }else {
          this.no_video = false;
          this.search_no_video = false;
        }
      })
    },
      toTree(data) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function (item) {
          delete item.children;
        });
        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {};
        data.forEach(function (item) {
          map[item.id] = item;
        });
        var val = [];
        data.forEach(function (item) {
          // 以当前遍历项，的pid,去map对象中找到索引的id
          var parent = map[item.parentId];
          // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
          if (parent) {
            (parent.children || ( parent.children = [] )).push(item);

          } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
          }
        });

        return val;
      },
      //点击多选按钮
      handleCheckedChange(){
      },
    //删除弹窗提示
    deleteDialog(data,type){
      this.type = type;
      let paramData = {}
      console.log(data,type);
      if(this.type==1){
        paramData.id = data.id;
        this.deleteVideoId = data.id;
        this.$ajaxs.selectVodIsBind(paramData).then(res => {
          if(res.code==202){
            this.bingDialogVisible= true;
          }else if (res.code==200){
            this.deleteDialogVisible = true;
          }
        })
      }else if(this.type=2){
        if(data.length!=0){
          paramData.id = data.join(',');
          this.$ajaxs.selectVodIsBind(paramData).then(res => {
            if(res.code==202){
              this.bingDialogVisible= true;
            }else if (res.code==200){
              this.deleteDialogVisible = true;
            }
          })
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
          this.bingDialogVisible = false;
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
        }
      })
    },
    selectFileName(){
    },
    //查询文件夹列表
    selectMediaFolderList(){
      var that = this;
      let paramData = {
        userId:getLStorage("userId"),
        isLive:'1'//只查直播间文件夹
      }
      this.$ajaxs.selectMediaFolderList(paramData).then(res => {
        if(res.code=200){
          /*let obj = new Object();
          let arry = [{'id':'','label':'全部'}];
          for(var i=0;i<res.data.length;i++){
            obj['value'] = res.data[i].fileName;
            obj['label'] = res.data[i].fileName;
            arry.push(obj);
          }
          this.options[1].children = arry;
          var data = res.data;*/
        }
      })
    },
    clickPlayDetail(data) {
     // this.$router.push({ path: "/liveControl",query: {type: "3"}//1表示云播 2代表视频中心 3代表点播
      setLStorage("vId", data.id);
      setLStorage("defRoomId", data.defRoomId);
     this.$router.push({path:"/onDemand/vLiveControl?id="+data.defRoomId+"&type="+3});
    },
    management(data){
      setLStorage("vId", data.id);
      setLStorage("defRoomId", data.defRoomId);
      this.$router.push({path:"/onDemand/vLiveControl?id="+data.defRoomId+"&type="+3+"&tabType="+2});
    },
    editor(data){
      setLStorage("vId", data.id);
      setLStorage("defRoomId", data.defRoomId);
      this.$router.push("/uploadVideo?id="+data.defRoomId+"&vid="+data.id);
    },
    uploadVideo() {
      window.open(window.location.href.split("videoCenter")[0]+"uploadVideo2");
    },
    //进入文件夹
    intoFiles(){
      this.$router.push({ path: "/fileList" });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleNodeClick(data) {
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
          this.checkedListData = [];
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
  components: {}
};
</script>
<style scoped>
  .click-btn  .qrcImg {
    /*display: none;*/
  }

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

  .moveFile_dialog .mw-dialog-header {
  text-align: left;
  border-bottom: 1px solid #dfdfdf;
  font-size: 16px;
  color: #000;
  height: 45px;
  line-height: 30px;
  padding-bottom: 20px;
}
.mw-dialog-body {
  width: 450px;
  min-height: 300px;
  max-height: 350px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.moveFile_dialog .mw-dialog-footer {
  padding-top: 20px;
  border-top: 1px solid #dfdfdf;
}
.moveFile_dialog .mw-dialog {
  padding-bottom: 20px;
}
.clickPlay {
  padding-bottom: 20px;
}
.main-search {
  padding: 20px 30px 0 30px;
}
.main-search-fr {
  float: right;
  text-align: right;
}
 .main-search-fr .el-select{width:100px!important;margin-right:10px;top: -2px;}
.main-search-fr .el-button {
  margin-right: 0;
}
/*.main-search-fr .el-button ,.click-btn .el-button,.main-search-fr .el-button{padding: 7px 8px;border-radius: 2px;}*/
.main-search-fr .state-select {
  margin-right: 15px;
}
.click-wrap {
  margin: 15px 30px 0px 30px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  min-height: 602px;
}
.click-wrap .no_live {
  text-align: center;
}
.click-wrap .no_data {
  width: 130px;
  height: 109px;
  background: url(../../common/image/no_video.png) no-repeat;
  margin: 180px auto 20px auto;
}
.click-wrap .no_live .txt_blue {
  cursor: pointer;
}
.click-list {
  position: relative;
  padding: 10px 20px;
  padding-left: 0;
  height: 121px;
  border-bottom: 1px solid #e5e5e5;
}
/*.click-list:first-child {
  cursor: pointer;
}*/
.click-list:hover {
  background: #ecf6ff;
}
/*.click-list:first-child {border-top: 1px solid #E5E5E5;}*/
.click-list .el-checkbox {
  position: absolute;
  top: 54px;
  left: 22px;
}
.click-leftImg {
  position: absolute;
  top: 20px;
  left: 60px;
  width: 178px;
  height: 100px;
  cursor: pointer;
  /*background: #F5F5F5;*/
  background-color: #000;
}
.click-leftImg.leftImgFiel img {display: block;margin: 14px auto;}
.click-leftImg img.bgImg {
  /*width: 180px;*/
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
.click-rightContent {
  padding: 10px 0;
  padding-left: 260px;
  width: 820px;
  color: #333;
}
.click-title {
  width: 100%;
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 8px;
  overflow: hidden;
}
.click-title span:nth-child(1) {
  font-weight: bold;
  color: #333;
}
.click-title span:nth-child(2) {
  color: #999999;
  font-size: 13px;
  float: right;
}
.click-p {
  line-height: 25px;
  height: 25px;
  font-size: 12px;
  color: #999999;
}
.click-p.check-p {
  color: #ea4335;
}
.click-p.pass {
  color: #6eb81c;
}
.click-btn {
  position: absolute;
  right: 20px;
  bottom: 30px;
  width: 600px;
  text-align: right;
}
.el-select.state-select {
  height: 32px;
}
.click-list-title {
  padding-left: 60px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  background: #f5f5f5;
  color: #333;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.el-button--primary {
  color: #fff;
}
.el-select .el-input__inner {
    background-color: #fff;
}
.default-bg .click-list .el-button.is-plain.el-button--primary {background-color: #fff;}
.default-bg .click-list .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {color: #2B6CFF;}
</style>

