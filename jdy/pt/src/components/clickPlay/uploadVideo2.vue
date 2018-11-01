<template xmlns="http://www.w3.org/1999/html">
  <div class="newLive" id="container">
    <v-header></v-header>
    <div class="w1000 bg-fff" style="padding: 0 20px 20px 30px;box-sizing: border-box;min-height: 750px;">
      <div class="el-row" style="margin-top: 20px;background:#fff;border-bottom: 1px solid rgb(237,238,241);">
        <div class="el-col-12">
          <h2 style="margin: 20px 0;font-size: 18px;">上传视频</h2>
        </div>
        <div class="el-col-12 text-right">
          <el-button id="pick_file" type="primary" @click="pickfile()" style="margin-top: 15px;">上传视频</el-button>
        </div>
      </div>
      <div class="tip" style="padding: 20px 0;font-size: 13px;line-height: 25px;color: #9B9B9B;">
        温馨提示：</br>
        支持HTML5的浏览器可进行断点续传，如chrome、firefox等，</br>
        且视频上传后将自动转码。</br>
      </div>
      <!--<div class="el-row">
        <div class="el-col-24 text-right">
          <el-button v-if="uploadStatus==1" id="stop_load" type="primary" @click="stopuploadHtml()">暂停</el-button>
          <el-button v-else-if="uploadStatus==2" id="deletefile" type="primary" @click="startuploadHtml()">续传</el-button>
        </div>
      </div>-->
      <input type="hidden" id="getTable" @click="getTable" value="获取table">
      <input type="hidden" id="file_type" value="video"/>
      <input type="hidden" id="third_key"/><br>
      <input type="hidden" id="folder_id" value="0"/>
      <input type="hidden" id="istranscode" value="1"/>
      <el-table
        :data="fileTable"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文件名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小">
          <template slot-scope="scope">
            {{scope.row.size1}}MB
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="上传目录">
          <template slot-scope="scope">
            根目录
          </template>
        </el-table-column>
        <el-table-column
          prop="percent"
          label="文件状态"
        width="350">
          <template slot-scope="scope">
              <div class="progress">
                <div class="progressBar" v-bind:style="{width:scope.row.percent+'%'}"></div>
              </div>
            <span style="float: left;margin-left: 8px;">{{scope.row.percent}}%</span>
            <span v-if="scope.row.percent!=100" style="float: left;margin-left: 8px;color: #9B9B9B;">({{parseInt(parseInt(scope.row.speed)/1024)}}KB/s)</span>
            <span v-else style="float: left;margin-left: 8px;color: #9B9B9B;">完成</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button  v-if="uploadStatus==1&&0<scope.row.percent&&scope.row.percent<100" id="stop_load" type="text" @click="stopuploadHtml()">暂停</el-button>
            <el-button  v-else-if="uploadStatus==2&&0<scope.row.percent&&scope.row.percent<100" id="deletefile" type="text" @click="startuploadHtml()">续传</el-button>
            <el-button class="onUpload" v-if="scope.row.percent!=100" type="text" @click="removeFile(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<table border="1" id="files">
        <tr>
          <td>序号</td>
          <td>文件名</td>
          <td><a>大小</a></td>
          <td>上传速度</td>
          <td>进度</td>
          <td>操作</td>
        </tr>
      </table>-->

      <!--fileTable-->
      <a id="result"></a>

    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import VHeader from '../header//header'
import VFooter from '../header/footer'
import {setDate,filterObj,copyData,setDateTime,axiosData,getCurrentTime} from 'api/http'
// 视频上传
import {get_token,upload,initUpload,getComTable,deletefile,stopupload,startUpload} from '../js/comm'
import '../js/upload'
import '../../api/config'
import {getLStorage,getCookies} from "../../api/config";
window.onbeforeunload = function (e) {
  if(window.location.href.indexOf("uploadVideo2")>0 && $(".onUpload").is(':visible')){
    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
      e.returnValue = '关闭提示';
    }

    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+

    alert('关闭提示1');
    return '关闭提示';
  }
};
export default {
  name: 'newLive',
  data(){
    return {
      fileTable:[],
      uploadStatus:1,
    }
  },
  components:{
    VHeader,VFooter
  },
  created(){
    window.vm = this;
  },
  mounted(){
    initUpload();
  },
  methods:{
      //获取数组
      getTable(){
          this.fileTable = getComTable();
          for(let i= 0;i<this.fileTable.length;i++){
            this.fileTable[i].size1 = (parseInt(this.fileTable[i].size)/1024/1024).toFixed(2);
            this.fileTable[i].speed = 0;
          }
      },
    pickfile(){
      get_token();
    //   getCookies('token')
    },
    upload(){
      upload();
    },
    //暂停
    stopuploadHtml(){
        this.uploadStatus = 2;
      stopupload();
    },
    //开始
    startuploadHtml(){
      this.uploadStatus = 1;
      startUpload();
    },
    removeFile(id){
      for(let i= 0;i<this.fileTable.length;i++){
          if(id == this.fileTable[i].id){
            deletefile(this.fileTable[i]);
            this.fileTable.splice(i,1);
          }
      }
    }
  },
  /*beforeRouteEnter (to, from, next) {
    alert('刷新');
    next();
  },*/
  beforeRouteLeave (to, from, next) {
    if($(".onUpload").is(':visible')){
      var r=confirm("要离开此网站吗？系统可能不会保存您所做的更改");
      if(r){
        next();
      }else {
        next(false);
      }
    }else {
      next();
    }
  },
}
</script>
<style scoped>
  .upload-result {display: none;color: #333;width: 495px;font-size: 14px;margin-left: 88px;margin-bottom:15px;overflow: hidden;}
  .upload-result span:first-child {float: left;color: #4285F4;}
  .upload-result span:last-child {float: right;color: #4285F4;border-bottom: 1px solid #4285F4;cursor: pointer;}
  /*进度条*/
  .progressDiv1 {display: none;width: 495px;margin-left: 88px;margin-top: 20px;height:auto;}
  .progress_view {margin-bottom: 12px;width: 490px;height: 14px;border: 1px solid #4285F4;border-radius: 8px;overflow: hidden;}
  .progress_view .progress_bar {width: 0%;height: 100%;border-radius: 8px;background: #c6dafb;}
  .text-right {text-align: right;}
    .default_shadow{
        box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.02)
    }
    .newList-top{
        border-bottom:1px solid #eaeaea;
        font-size: 16px;
    }
    .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-textarea__inner{
        resize:none;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .uploaderTips{
        width:500px;
        height:280px;
        border: 1px solid #D9D9D9;
        text-align: center;
        background: #F5F5F5;
        border-radius: 2px;
        box-sizing: border-box;
    }

    .avatar {
        width: 500px;
        height: 280px;
        display: block;
        border-radius: 2px;
    }
    .uploaderTips {
        font-size: 12px;
        color: #CCCCCC;
        line-height: 20px;
    }
    .avatar-uploader-icon:before{
        display:inline-block;
        width:71px;
        height: 64px;
        margin:80px auto 8px auto;
        background: url(../../common/image/icon_img.png) no-repeat;
        content:'';
    }
    .newList-main{
        height:0;
    }
    .newList-main.none{
        display: none;
    }
    .newlivedata .el-form-item.is-required{
        display:inline-block;
    }
    .newlivedata .el-form-item.is-required,.img-file,.img-file-list{
        width:500px;
        margin:10px 10px 10px 0;
    }
    .img-file{
        height:280px;
        border:1px solid #eaeaea;
        box-sizing: border-box;
    }

    .upload-img{
        max-width:500px;
        max-height:280px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .el-icon-circle-close{
        right:-8px;
        top:-8px;
        font-size: 19px;
        color:#FF467F;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        background-color: #fff
    }
    .el-icon-circle-close:before{
        content: "\e62c";
    }

    .upload-button{
        color:#666;
        display:inline-block;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        padding:15px 50px;
    }
    .pre_img{
        position: relative;
        width:500px;
    }
    .pre_img .icon_delete{
        position: absolute;
        right:5;
    }
    .newList-list .form_box{
        padding:40px 0 0 0;
    }
    .my_section .form_bot .te-c{
        border-top:1px solid #F2F2F2;
        margin:0 36px;
        padding:30px 0;
    }
    .green_txt{
        margin-right:20px;
    }
    .img_list{
        width:820px;
    }
    .img_list .item{
        width:360px;
        height:203px;
        box-sizing: border-box;
        margin-right:20px;
        margin-bottom: 20px;

    }
    .el-radio.is-bordered{
        width: 360px;
        height: 203px;
    }
    .img_list .item:nth-child(even){
        margin-right:0;
    }
    .img_list .item img{
        width:360px;
        height:100%;

    }
  .progress {float: left;width: 180px;height: 16px;background: #fff;border:1px solid #dbdbdb;}
  .progressBar {height: 16px;background: #5BCB75;}
  .el-table {border:1px solid #eee;border-bottom:0;}
  .el-table thead {background: #F5F5F5;}
</style>
<style>
    /*.newList-list .el-button.btn_120{
        width:120px;
        padding:0;
    }*/
    .newlive-test .el-textarea__inner{
        height:100px;
    }
    .newlive-test .el-form-item__content{
        margin-left:0px !important;
    }
    /* .livePermit .el-form-item__error{
        top:80px;
    } */
    .no_padding .el-dialog__body{
        padding:2px 0 20px 0;
        height:313px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 762px;
    }
    .img_list  .footnote{
        position: relative;
        height: 204px;
        box-sizing: border-box;
    }
    .img_list  .footnote.is-checked{
        top:15px
    }
    .img_list  .el-radio__input.is-checked{
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 36px;
        height: 36px;
        background: none;

    }
    .img_list .footnote .el-radio__label{
        padding:0;
    }
    .img_list  .el-radio.footnote.is-checked{
        border:2px solid #2B6CFF;
    }
    .img_list  .el-radio__input.is-checked{
        background: url(../../common/image/Selected.png) no-repeat;

    }
    .img_list .footnote .el-radio__inner::after{
        display: none;
    }
    .img_list .footnote .el-radio__inner{
        font-family: "iconfont" !important;
        font-size: 36px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        border:none;


    }

    .newList-list .el-icon-time:before{
        content: "\E60B";
        color:#4A4A4A;
    }
    .newList-list .el-date-editor--datetime .el-input__prefix{
        left:472px;
    }
    .newList-list .el-date-editor--datetime.el-input--prefix .el-input__inner{
        padding-left:10px;
    }
    .newList-list .el-button--info:active,.newList-list .el-button--info:focus{
        background-color: #E5E5E5;
        color: #333333;
        border: 1px solid #CCCCCC;
    }
    .newList-list .el-button--info.btn_120:hover{
        background-color: #2B6CFF;
        border-color: #2B6CFF;
        color:#fff;
    }
    .newList-list  .el-date-editor .el-input__suffix {
        right:-278px;
    }
    .my_section .el-form  .input_150 .el-input__inner,.my_section .el-form .input_150{
        width:150px;
    }
</style>

