<template>
  <div class="clickPlay">
    <m-header></m-header>
    <div class="w1000 bg-fff mt20" style="padding-bottom: 30px;">
      <!--top搜索操作部分 start-->
      <div class="main-search">
        <div class="el-row">
          <div class="el-col-6">
              <!--<el-input v-model="prom" @change="selectVodInfoBySearch" placeholder="搜索直播名称" style="width: 250px;">
                  <el-button @click="selectVodInfoBySearch" slot="append" icon="search">搜索</el-button>
              </el-input>-->
          </div>
          <div class="el-col-18 main-search-fr">
            <!--<el-cascader
              :options="options"
              v-model="selectedOptions"
              @change="selectVodBySelective">
            </el-cascader>-->
              <el-button type="primary" plain  @click="addMediaFolder">新建文件夹</el-button>
              <el-button type="danger" plain @click="deleteMediaFolderList()">删除</el-button>
          </div>
        </div>
      </div>
      <!--top搜索操作部分 end-->

    <!--文件夹列表 start-->
      <!--点播管理/文件列表-->
      <div style="padding:20px 30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/videoCenter' }">返回上一级<a style="margin: 0 6px;position:relative;top: 2px;display: inline-block;width: 1px;height: 15px;border-right: 1px solid #2B6CFF;"></a>点播管理</el-breadcrumb-item>
          <el-breadcrumb-item>文件夹管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="click-wrap">
          <div class="click-list-title">视频信息</div>
          <!--文件夹列表 start-->
          <el-checkbox-group
            v-model="checkedFileListData"
            @change="handleCheckedFileChange">
            <div class="click-list" v-for="(item,index) in videoFileList.list">
              <el-checkbox :label="item.id"></el-checkbox>
                <div class="click-leftImg leftImgFiel" @click="intoFileVideoList(item)">
                    <img src="../../common/image/file.png" alt="">
                </div>
                <div class="click-rightContent">
                    <div class="click-title">
                        <input :maxlength="16" :disabled="item.isEdit" class="fileName" type="text" v-model="item.fileName" style="border:0;background: transparent;"><!--style="border:0;background: transparent;"-->
                        <span style="float: right" v-if="item.fileSize">{{item.fileSize}}M</span>
                        <span style="float: right" v-else>0M</span>
                    </div>
                  <div class="click-p">创建时间：{{item.createTime}}</div>
                  <div class="el-row actionBtn">
                    <div class="el-col" style="text-align: right">
                      <el-button v-if="!item.isEdit" class="save" type="primary" plain @click="editMediaFolder(item)">保存</el-button>
                      <el-button v-if="!item.isEdit" class="save" type="danger" plain @click="cancelEdit(index)">取消</el-button>
                      <el-button v-if="item.isEdit" class="edit" type="primary" plain @click="isEdit(index)">编辑</el-button>
                      <el-button v-if="item.isEdit" class="delete" type="danger" plain @click="deleteMediaFolderList(item)">删除</el-button>
                    </div>
                  </div>
                </div>
            </div>
          </el-checkbox-group>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="videoFileList.page.page_no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="videoFileList.page.page_size"
            layout="prev, pager, next"
            :total="videoFileList.page.total"
            background>
          </el-pagination>
          <!--文件夹列表 end-->

          <!--视频管理列表 start-->
          <!--<el-checkbox-group
            v-model="checkedListData"
            @change="handleCheckedChange">
            <div class="click-list" v-for="item in vodListData.list">
              <el-checkbox :label="item.id"></el-checkbox>
              <div class="click-leftImg">
                <img src="http://mwdata.mvaas.cn/1/1/2/a47a408030132116b50c/26cf541b-4ac4-4c8c-a4b2-f32ebec26a50.png" alt="">
              </div>
              <div class="click-rightContent">
                <div class="click-title">
                  <span  contenteditable="true">{{item.vodName}}</span>
                  <span style="margin-left: 30px;">视频大小：{{item.size}}M</span>
                </div>
                &lt;!&ndash;1、直播录像 2、上传视频&ndash;&gt;
                <div v-if="item.vodSource==1" class="click-title">视频来源：直播录像</div>
                <div v-else-if="item.vodSource==2" class="click-title">视频来源：上传视频</div>
                <div class="click-title">上传时间：{{item.createTime}}</div>
                &lt;!&ndash;0:审核中 1：审核通过  2：审核不通过&ndash;&gt;
                <div v-if="item.vodStatus==0" class="click-title check-p">审核中</div>
                <div v-else-if="item.vodStatus==1" class="click-title check-p">审核通过</div>
                <div v-else-if="item.vodStatus==2" class="click-title check-p">审核不通过</div>
              </div>
              <div class="click-btn">
                <el-button type="primary" class="small"  @click="clickPlayDetail()">详情</el-button>
                <el-button type="primary" class="small" >管理</el-button>
                <el-button type="primary" class="small"  @click="editor(item)">编辑</el-button>
                <el-button type="danger" class="small"  @click="deteltVodInfo(item)">删除</el-button>
              </div>
            </div>
          </el-checkbox-group>
          <el-pagination
            v-if="vodListData.list.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="vodListData.page.page_no"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="vodListData.page.page_size"
            layout="prev, pager, next"
            :total="vodListData.page.total"
            background>
          </el-pagination>-->
          <!--视频管理列表 end-->
      </div>
    <!--文件夹列表 end-->
    </div>
  </div>
</template>
<script>
  import {getLStorage,timestampToTime} from '../../api/config'
  import MHeader from 'components/header/header'
  import mFooter from 'components/header/footer'
export default {
  name: 'clickPlay',
  data(){
      return {
          videoFileList:{//文件夹列表
              list:[],
            page:{
                  page_no:1,
              page_size:10,
              total:0
            }
          },
          prom:'',
          vodListData:{
            list:[],
            page:{
              page_no:1,
              page_size:10,
              total:0
            }
          },
          checkedFileListData:[],//文件夹选中的数据
          options: [{
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
              },
            ]
          }],
        checkedListData:'',
          playType:'',
          multipleSelection: [],
          defaultProps: {
              children: 'children',
              label: 'label'
          }
      }
  },
    created(){
      this.selectMediaFolderList();
    },
    methods: {
      //查询文件夹列表
      selectMediaFolderList(){
        let paramsData = {
          userId:getLStorage('userId'),
          page_index:this.videoFileList.page.page_no,
          page_size:this.videoFileList.page.page_size
        }
        this.$ajaxs.selectMediaFolderList(paramsData).then(res => {
          if(res.code==200){
            if(res.data!=null){
              this.videoFileList.list = res.data.list;
              this.videoFileList.page.total = res.data.page.total;
              for(var i=0;i<this.videoFileList.list.length;i++){
                this.videoFileList.list[i].isEdit = true;
                this.videoFileList.list[i].createTime = timestampToTime(this.videoFileList.list[i].createTime);
              }
            }
          }
        })
      },
      //获取点播接口
      selectVodInfoBySearch(){
        let paramData = {
          userId:getLStorage('userId'),
          prom:this.prom
        }
        this.$ajaxs.selectVodInfoBySearch(paramData).then(res => {
          this.videoFileList.list = res.data.folderList;
          this.vodListData.list = res.data.vodList.list;
          this.vodListData.page.total = res.data.vodList.page.total;
          console.log(res,'点播筛选');
        })
      },
      //进入到文件夹详情页面
      intoFileVideoList(data){
        this.$router.push('/fileVideoList?id='+data.id+'&name='+data.fileName);
      },
      //批量选择文件checked
      handleCheckedFileChange(){
        console.log(this.checkedFileListData,'选择文件集');
      },
      //新建文件夹
      addMediaFolder(){
        let paramData = {
          userId:getLStorage('userId'),
          fileName:'新建文件夹'+this.getRandNum(),
          parentId:0
        };
        this.$ajaxs.addMediaFolder(paramData).then(res => {
          if(res.code==200){
            console.log(res,'新建文件夹成功！');
            this.selectMediaFolderList();
          }
        })
      },
      getRandNum(){
        var d = new Date();
        var m = d.getMonth() + 1;
        d =d.getFullYear().toString() +(m < 10 ? "0" + m : m).toString() + d.getDate().toString() +d.getHours().toString() +d.getMinutes().toString() +d.getSeconds().toString();
        return d
      },
      //删除文件夹
      deleteMediaFolderList(data){
        if(data){
          this.$confirm('你确定要删除该文件吗？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            //删除单个文件夹
            this.deletFiles(data.id);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else {
          if(this.checkedFileListData.length==0){
            this.$message({
              showClose: true,
              message: '请选择需要删除的文件',
              type: 'error'
            });
            return;
          }
          this.$confirm('你确定要删除选中的文件吗？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            //删除批量文件夹
            this.deletFiles(this.checkedFileListData.join(','));
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //删除文件
      deletFiles(id){
        let paramData = {
          mediaFolderId:id,
        };
        this.$ajaxs.deleteMediaFolderList(paramData).then(res => {
          if(res.code==200){
            this.$message({
              showClose: true,
              message: '删除文件成功！',
              type: 'success'
            });
            this.selectMediaFolderList();
          }
        })
      },
      //确认编辑文件夹（保存）
      editMediaFolder(data){
        if(data.fileName){
          let paramData = {
            id:data.id,
            fileName:data.fileName
          };
          this.$ajaxs.editMediaFolder(paramData).then(res => {
            if(res.code==200){
              this.$message({
                showClose: true,
                message: '修改成功！',
                type: 'success'
              });
              this.selectMediaFolderList();
            }else {
              this.$message({
                showClose: true,
                message: '修改失败！',
                type: 'error'
              });
            }
          })
        }else {
          this.$message({
            showClose: true,
            message: '文件夹名字不能为空！',
            type: 'error'
          });
        }
      },
      //点击编辑按钮(编辑)
      isEdit(index){
          for(var i=0;i<this.videoFileList.list.length;i++){
            this.videoFileList.list[i].isEdit = true;
          }
          this.videoFileList.list[index].isEdit = false;
          var fileName = this.videoFileList.list[index].fileName;
          this.videoFileList.list[index].fileName = '';
          this.videoFileList.list[index].fileName = fileName;
          setTimeout(function () {
            $(".fileName").eq(index).focus();
          },0)
      },
      cancelEdit(index){
        this.videoFileList.list[index].isEdit = true;
        var fileName = this.videoFileList.list[index].fileName;
        this.videoFileList.list[index].fileName = '';
        this.videoFileList.list[index].fileName = fileName;
        this.selectMediaFolderList();
      },
      handleCurrentChange(val){
        this.videoFileList.page.page_no = val;
        this.selectMediaFolderList();
      },
      /*****************************************视频相关处理***********************************************/
      //点播筛选
      selectVodBySelective(data){
        console.log(data,'参数');
        let paramData = {
          userId:getLStorage('userId'),
          vodSource:data[0],//1：直播录像；2：上传视频
          prom:data[1],//0:审核中 1:审核通过 2:审核不通过
        }
        console.log(paramData,'传入参数');
        this.$ajaxs.selectVodBySelective(paramData).then(res => {
          console.log(res,'筛选结果');
          this.vodListData.list = res.data.list;
          this.vodListData.page.total = res.data.page.total;
        })
      },
      //编辑视频
      editor(data){
        this.$router.push("/uploadVideo?id="+data.id);
      },
      //删除视频 触发事件
      deteltVodInfo(data){
        if(data){//单个删除
          this.$confirm('您确定删除此视频吗？ 删除后的视频不可恢复！',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            //删除视频
            this.deletVideo(data.id);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{//批量删除
          if(this.checkedListData.length==0){
            this.$message({
              showClose: true,
              message: '请选择需要删除的记录！',
              type: 'error'
            });
            return;
          }
          this.$confirm('你确定要删除选中的视频吗？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            //删除视频
            this.deletVideo(this.checkedListData.join(','));
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //删除视频
      deletVideo(id){
        let paramData = {id:id}
        this.$ajaxs.deteltVodInfo(paramData).then(res => {
          if(res.code=200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //this.getSelectVodListData();
            this.selectVodBySelective();
          }else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      },
      //点击多选按钮
      handleCheckedChange(){
        console.log(this.checkedListData);
      },
      clickPlayDetail(){
          //this.$router.push({"path":"/clickPlayDetail"})
      },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
    },
  components:{
    MHeader,mFooter
        }
}
</script>
<style scoped>
    .moveFile_dialog .mw-dialog-header {text-align: left;border-bottom: 1px solid #DFDFDF;font-size: 16px;color: #000;height: 45px;line-height: 30px;padding-bottom: 20px;}
    .mw-dialog-body {width: 450px;min-height: 300px;max-height: 350px;overflow-x:hidden;overflow-y: scroll;}
    .moveFile_dialog .mw-dialog-footer {padding-top: 20px;border-top: 1px solid #DFDFDF;}
    .moveFile_dialog .mw-dialog {padding-bottom: 20px;}
    .clickPlay {padding-bottom: 20px;}
    .main-search {padding: 20px 30px 0 30px;}
    .main-search-fr {float: right;text-align: right;}
    .main-search-fr .el-select{width:100px!important;margin-right:10px;top: -2px; }
    .main-search-fr .el-button {margin-right: 0;}
    /*.main-search-fr .el-button ,.click-btn .el-button,.main-search-fr .el-button{padding: 7px 8px;border-radius: 2px;}*/
    .main-search-fr .state-select {margin-right: 15px;}
    .click-wrap {margin: 15px 30px 0px 30px;border-left: 1px solid #E5E5E5;border-right: 1px solid #E5E5E5;}
    .click-list {position: relative;padding:10px 20px;padding-left:0;height: 121px;overflow: hidden;border-bottom: 1px solid #E5E5E5;}
    /*.click-list:first-child {cursor: pointer;}*/
    .click-list:hover {background: #ECF6FF;}
    /*.click-list:first-child {border-top: 1px solid #E5E5E5;}*/
    .click-list .el-checkbox {position: absolute;top: 54px;left: 22px;}
    .click-leftImg {position:absolute;top: 20px;left: 60px;width: 180px;height: 100px;cursor: pointer;background: #F5F5F5;}
    .click-leftImg.leftImgFiel img {display: block;margin: 14px auto;}
    .click-rightContent {padding: 10px 0;padding-left: 260px;width: 820px;}
    .click-title {width: 100%;font-size: 16px;margin-top: 0px;margin-bottom: 8px;}
    .click-title input{font-size: 16px;color: #000;width: 270px;height: 30px;}
    .click-title span:nth-child(1){font-weight: bold;color: #333;}
    .click-title span:nth-child(2){color: #999999;font-size: 13px;}
    .click-p {line-height: 25px;height: 25px;font-size: 12px;color: #999999;}
    .click-p.check-p {color: #EA4335;}
    .click-p.pass {color: #6EB81C;}
    .click-btn {position: absolute;right: 20px;bottom: 30px;width: 600px;text-align: right;}
    .el-select.state-select {height: 32px;}
    .click-list-title {padding-left: 60px;font-size:16px;line-height: 40px;height: 40px;background: #F5F5F5;color: #333;border-top: 1px solid #e5e5e5;border-bottom: 1px solid #E5E5E5;}
    .actionBtn {display: none;}
    .click-list:hover .actionBtn{display: block;}
</style>

