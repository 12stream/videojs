<template>
    <div class="liveEnd">
        <el-row>
            <el-col :span="24">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-ruleForm">
                <div class="live-top">直播结束画面</div>
                <div class="pd20">
                    <el-row>
                        <div style="padding: 10px 170px 0 170px;">
                            <div class="mb10">
                                预览：
                            </div>
                            <div class="te-c pre_img">
                                <div style="position:relative;width: 100%;height: 100%;">
                                    <div class="preview-img">
                                        <img v-if="ruleForm.resource ==3" src="../../common/image/icon_play.png"  class="play_icon" alt="">
                                        <img v-if="ruleForm.resource ==2" src="../../common/image/icon_play.png"  class="play_icon" alt=""> 
                                        <!-- <img v-if="ruleForm.resource!=1" src="../../common/image/icon_play.png"  class="play_icon" alt="" @click="playVideo(play_url)">  -->
                                        <!-- <img v-if="ruleForm.resource!=1||!converImg" :src="converImgVideo" alt=""> -->
                                        <img v-if="ruleForm.resource==3" :src="converImgVideo" alt="">
                                        <img v-if="ruleForm.resource==1" :src="converImg || converImgVideo" alt="">
                                        <img v-if="ruleForm.resource==2" :src="customImg || converImgVideo" alt="">
                                        <!-- <img v-if="ruleForm.resource==1"  :src="converImg " alt="">                             -->
                                    </div>                                    
                                </div>                                
                            </div>   
                            <el-col :span="24" >
                                <el-form-item label="直播结束后显示 :" class="lable_left">
                                    <el-radio :disabled="liveEnd" class="radio my_radio" v-model="ruleForm.resource" label="3">最近直播录像</el-radio>
                                    <!-- <el-radio :disabled="liveEnd" class="radio my_radio" v-model="ruleForm.resource" label="0">默认显示</el-radio> -->
                                    <el-radio :disabled="liveEnd" class="radio my_radio" v-model="ruleForm.resource" label="1">自定义图片</el-radio>
                                    <el-radio :disabled="liveEnd" class="radio my_radio" v-model="ruleForm.resource" label="2">自定义视频</el-radio>
                                    <!-- <div v-show="ruleForm.ruleTipe" class="el-form-item__error">请选择直播结束显示内容</div> -->
                                </el-form-item>
                                <el-form-item  style="margin-bottom:0px;position:relative;" prop="url1" v-show="ruleForm.resource == 1" label="自定义图片 :">
                                    <el-button type="button" class="btn btn_30 el-button--primary"  @click="openChangeIMG()" style="width: auto;">选择默认图片</el-button>
                                    <el-upload                                    
                                    style="position:absolute; left: 230px;top:0;"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :on-change="coverFileFunc"
                                    accept=".jpg, .png, .jpeg"
                                    :before-upload="beforeAvatarUpload">
                                        <el-button type="info" class="btn btn_30 el-button--primary" style="width: auto;" >选择自定义图片</el-button>
                                    </el-upload>       
                                    <el-input style="display:none;"  :disabled="liveEnd" v-model="ruleForm.url1" :placeholder="'请自定义图片地址'" ></el-input>
                                    <div style="margin-left:100px;line-height:30px;">图片大小2M以内；建议865*486像素；支持PNG、JPG、JPEG格式</div>
                                </el-form-item>
                                <!-- label="自定义视频 :" -->
                                <el-form-item style="margin-bottom:0px;" prop="url2" v-show="ruleForm.resource == 2"  >
                                    <el-button type="info" class="btn btn_30 el-button--primary" @click="openChangeVideo()">选择视频</el-button>
                                    <!-- <el-input :disabled="liveEnd" v-model="ruleForm.url2" :placeholder="'请自定义视频地址'"></el-input> -->
                               </el-form-item>
                            </el-col>             
                        </div>                                                                   
                    </el-row>
                    <div class="ml10 mt10 col-red" v-show="liveEnd" style="text-align: center;">禁播状态不能选择状态</div>
                </div>
                </el-form>
            </el-col>
        </el-row>

    
        <!-- 添加视频 -->
        <el-dialog  
            title="添加视频"
            :visible.sync="dialogAddVideo"
            width="638px"
            class="my_dialog mt_70"
            :show-close="false"
            >
            <el-input class="search_btn" placeholder="请输入视频名称" v-model="searchVideo">
                <el-button slot="append" icon="search" @click="openChangeVideo(searchVideo)">搜索</el-button>
            </el-input>
            <ul v-if="VideoLibrary.isData" class="myTable_list my_checkbox_list">            
                <el-radio-group v-model="videoCheckList" @change="select_video">
                    <li v-for="item in VideoLibrary.data" v-if="item.vodStatus == 1" class="item_box">
                        <el-radio class="radio my_radio" :label="item.vodCoverUrl">
                            <div class="item">
                                    <div class="item_img fl">
                                        <img src="../../common/image/icon_play.png" class="play_icon" alt="" >
                                        <img class="fl" :src="item.vodCoverUrl || DEFAULT_IMG">
                                    </div>
                                <div class="item_info ml10" style="line-height:34px;">
                                    <p class="length_txt" style="color:#333;">{{item.vodName}}</p>
                                    <p class="col_9B" style="font-size:12px;">创建时间 : {{item.createTime | filterTime}}</p>
                                </div>
                                </div>                               
                        </el-radio >
                    </li>
                </el-radio-group>
            </ul>
            <div v-if="!VideoLibrary.isData"  class="no_video_add"> 
                    <div class="no_data"></div>                                                                                                                       
                    <div class="tip_no_data">
                    <span class="default-color">暂无视频！</span>
                </div>               
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectVideo()" :disabled="disabledAdd">确 定</el-button>
                <el-button @click="close()">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 添加视频end -->

        <div class="submit_btn" :style="{'padding-bottom':btn_pb}">
            <el-button type="primary" v-show="!liveEnd" style="height:36px;line-height:36px;padding:0;width:100px;" class="el-button" :disabled="liveEnd" @click="onSubmit('ruleForm')">提交</el-button>
            <!-- <span class="el-button" :disabled="liveEnd" @click="onSubmit('ruleForm')">提交</span> -->
        </div>
        <el-dialog
            title="选择默认封面"
            :visible.sync="CoverlistDialog"
            width="800px"
            class="my_dialog no_padding"
            :show-close="false"
            >
            <div class="img_list clear" v-if="coverImgList.isData"> 
                <div   v-for="(item, index) in coverImgList.data" class="fl item">
                    <el-radio  class="radio footnote" v-model="checkCover" :label="item.id" >
                        <div>
                            <img :src="item.coverImg" alt="" :id="item.id" :data-id="item.coverImgId">
                        </div>
                    </el-radio>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitCheckList()" :disabled="disabledOk">确 定</el-button>
                <el-button @click="CoverlistDialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MHeader from "components/header/header";
import LeftNav from "components/leftnav/leftnav";
import LiveSettings from "base/livesettings/livesettings";
import axios from "axios";
import { ERR_OK, LIVE_URL, getLStorage, DATA_URL ,DEFAULT_IMG ,MW_Live_API_URL} from "api/config";
import { filterObj } from "api/http";



export default {
  props: ["childData"],
  data() {
    // let PhoneExp = /http(s)?:////([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
    let PhoneExp = /(http:\/\/|https:\/\/|HTTP:\/\/|HTTPS:\/\/)/;
    //((\w|=|\?|\.|\/|&|-)+)/g;
    var checkAge = (rule, value, callback) => {
      if (this.ruleForm.resource == "1" && !this.ruleForm.url1) {
        //console.log('val',value)
        // return callback(new Error("请选择视频"));
         return callback(new Error("请输入正确的视频地址"));
      }
      setTimeout(() => {
        if (this.ruleForm.url1) {
          this.ruleForm.url1 = this.ruleForm.url1.toLocaleLowerCase();
        }
        // console.log('A ',this.ruleForm.url1)
        if (
          this.ruleForm.resource == "1" &&
          !PhoneExp.test(this.ruleForm.url1)
        ) {
          callback(new Error("请输入正确的视频地址"));
        } else {
          // console.log(this.isTrue.phone1)
          callback();
        }
      }, 1000);
    };
    var checkAge2 = (rule, value, callback) => {
      if (this.ruleForm.resource == "2" && !this.ruleForm.url2) {
        console.log("30px");
        // console.log('val2',this.ruleForm.url2)
        return callback(new Error("请输入正确的地址"));
      }
      setTimeout(() => {
        if (this.ruleForm.url2) {
          this.ruleForm.url2 = this.ruleForm.url2.toLocaleLowerCase();
        }
        // this.ruleForm.url2 = this.ruleForm.url2.toLocaleLowerCase()
        if (
          this.ruleForm.resource == "2" &&
          !PhoneExp.test(this.ruleForm.url2)
        ) {
          callback(new Error("请输入正确的地址"));
        } else {
          // console.log(this.isTrue.phone1)
          callback();
        }
      }, 1000);
    };
    return {
        customImg:'',
      video_id:'',
      converImgId:"",
      ruleForm: {
        url: "",
        ruleTipe: false,
        resource: "",
        releTips: "",
        inputShow: false,
        end_show_val: "",
      },
      rules: {
        // url1: [
        //     { validator: checkAge, trigger: 'blur' }
        // ],
        url2: [{ validator: checkAge2, trigger: "blur" }]
        // url: [
        //     { validator: checkAge, trigger: 'blur' }
        // ]
        // ,
        // Phone2: [
        //     { validator: checkAge2, trigger: 'blur' }
        // ]
      },
      liveEnd: false,
      islive: "",
      converImg: "",
      converImgVideo: "",
      isConverImg: false,
      btn_pb:"100px",
      CoverlistDialog: false,
      coverImgList: {
        isData: false,
        data: ""
      },
      disabledOk: false,
      checkCover: "",
      no_file_upload: false,
      file: "",
      play_url: "",
      dialogAddVideo:false,
      disabledAdd:true,
      // 录像库
      VideoLibrary:{
          isData:true,
          data:'',  
      },
      videoCheckList:'',
      searchVideo:'',
      fileID:"",
      index_video:'1'
    };
  },
  created() {
    this._getData();
    this.getImgList();
    // this._liveEnd()
  },
  computed: {
    resource() {
      return this.ruleForm.resource;
    }
  },
  watch: {
    resource(val) {
      // if(val == 1 || val == 2){
      //     this.ruleForm.inputShow = true
      //     // this.ruleForm.url1 = ''
      //     // this.ruleForm.url2 = ''
      // }else{
      //     this.ruleForm.inputShow = false
      // }
      //console.log("here"+val+this.btn_pb)
      switch (val) {
        case "1":
          this.btn_pb="30px"
          break;
        case "2":
          this.isConverImg = true;
          this.btn_pb="60px"
          break;
        case "3":
         this.btn_pb="60px"
         break;
      }
    },
    childData(val) {
      if (val) {
        console.log("asdf", val);
        this.liveEnd = false;
      } else {
        this.liveEnd = true;
      }
    }
  },
  methods: {
    // 播放器代码
    playVideo(src) {
      this.index_video ++;
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
      setTimeout(function() {
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
          function() {}
        );
        videojs("preVideo").ready(function() {
          var myPlayer = this;
          player.src({
            src: src,
            type: "application/x-mpegURL"
          });
        });
      }, 500);
    },
    coverFileFunc(file) {
      let imgtype = file.raw.type;
      const isJPG =
        imgtype === "image/jpeg" ||
        imgtype === "image/png" ||
        imgtype === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      if (!isJPG) {
        this.tipsMessage("上传封面只能是 JPG、PNG、JPEG!", "error");
        return false;
      }
      if (!isLt2M) {
        this.tipsMessage("上传封面大小不能超过 2MB!", "error");
        return false;
      }
      this.file = file.raw;
      let imgUrl = DATA_URL + "mwlive/setup/file_upload.do";
      let formdata = new FormData();
      formdata.append("file_data", this.file);
      formdata.append("user_id", getLStorage("user_id"));
      formdata.append("file_type", 0);
      axios({
        method: "post",
        url: imgUrl,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          if (res.data.code == ERR_OK) {
            this.ruleForm.url1 = res.data.data.show_url;
            this.converImg = this.ruleForm.url1;
            this.fileID=res.data.data.save_id;
            this.converImgId="";
          } else {
            this.tipsMessage("请选择图片！", "error");
          }
        })
        .catch(err => {
          this.tipsMessage("上传图片失败!", "error");
        });
    },
    beforeAvatarUpload(file, index) {},
    // 封面库
    submitCheckList() {
      if (this.checkCover) {
       // console.log(document.getElementById(this.checkCover));
        // 封面地址
        this.ruleForm.url1 = document.getElementById(this.checkCover).src;
        this.converImg = this.ruleForm.url1;
        this.converImgId = document.getElementById(this.checkCover).getAttribute("data-id")
        this.CoverlistDialog = false;
        this.no_file_upload = true;
      } else {
        this.no_file_upload = false;
      }
    },
    // 获取自定义图片库
    getImgList() {
      let _this = this;
      let formData = new FormData();
      let url = DATA_URL + "mwlive/live/get_coverImgList.do";
      formData.append("userID", getLStorage("user_id"));
      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          if (res.data.code == ERR_OK) {
            if (res.data.data.length > 0 && res.data.data) {
              _this.coverImgList.isData = true;
              _this.coverImgList.data = res.data.data;
              console.log(_this.coverImgList);
            }
          }
        }).catch(err => {
          
        });

        let  liveId = getLStorage("liveID");
        let formData2 = new FormData();
        let url2 = DATA_URL + 'mwlive/live/getLiveAfter.do'
        formData2.append('liveId',liveId);
        axios({
            method:"post",
            url: url2,
            data:formData2,
            headers:{"Content-Type": "multipart/form-data"}
        })
            .then((res2)=>{
                if (res2.data.code == 200) {
                    this.customImg = res2.data.data.coverUrl;
                }
            })
    },
    openChangeIMG() {
      this.CoverlistDialog = true;
      this.checkCover = "";
    },

    // 获取视频库
    openChangeVideo(val){
        this.select_video()
        this.dialogAddVideo = true
        // console.log(val)
        // let url = DATA_URL + 'mwlive/live/select_videoList.do'
        let url = DATA_URL + 'mwlive/vod/selectVodList.do'
        let formdata = new FormData()
        formdata.append('userId',getLStorage('user_id'))
        if(val){
            // formdata.append('name',this.searchVideo)
            formdata.append('prom',this.searchVideo)
        }
        axios({
            method:'post',
            url:url,
            data:formdata,
        }).then((res)=>{
            if(res.status == ERR_OK){
                var data = res.data.data.list;
                if(data&&data.length>0){
                    this.VideoLibrary.isData = true;
                    this.VideoLibrary.data = data                   
                }else{
                    this.VideoLibrary.isData = false
                }
            }                    
        }).catch(()=>{

        })

    },

   
    _liveEnd() {
      // $nextTick(()=>{
      //     if(getLStorage('liveEnd')){
      //         this.liveEnd = true
      //     }else{
      //         this.liveEnd = false
      //     }
      //     console.log('liveEnd',getLStorage('liveEnd'))
      // })
    },
    _getData() {
      // setTimeout(()=>{
      let isShow = getLStorage("liveEnd");
      // console.log('isShow',isShow)
      if (isShow === "true") {
        this.liveEnd = true;
        // console.log('liveEnd ~~true')
      } else if (isShow === "false") {
        // console.log('liveEnd~~ false')
        this.liveEnd = false;
      }
      // console.log('liveEnd',this.liveEnd)
      // console.log(this.liveEnd)
      // },500)
      // console.log('getLStorage liveEnd',getLStorage('liveEnd'))
      // this.liveEnd = !!getLStorage('liveEnd')
      // console.log(this.liveEnd)

      axios({
        method: "post",
        url: LIVE_URL + "dispatcher.action",
        data: {
          cmd: "lb",
          liveID: getLStorage("liveID"),
          user_id:getLStorage("user_id"),
          video_type:0
        }
      }).then(response => {
        console.log("聊天室!!!", response.data);
        if (
          response.data.end_show_type == 0 &&
          response.data.end_show_img !== "" &&
          response.data.end_show_img !== null
        ) {
          // console.log(11111)
          this.ruleForm.resource = "1";
          this.ruleForm.inputShow = true;
        } else if (response.data.end_show_type == 0) {
          this.ruleForm.resource = "0";
          // console.log('00000')
        } else if (
          response.data.end_show_type == 1 &&
          response.data.end_show_vod !== "" &&
          response.data.end_show_vod !== null
        ) {
          // console.log('2222')
          this.ruleForm.resource = "2";
          this.ruleForm.inputShow = true;
        } else if (response.data.end_show_type == 1) {
          this.ruleForm.resource = "3";
          // console.log('3333')
        }
        this.ruleForm.url1 = response.data.end_show_img;
        this.converImg = this.ruleForm.url1;

        // this.ruleForm.url1 = response.data.end_show_img

        this.ruleForm.url2 = response.data.end_show_vod;
      });

      //                let live_id =  getLStorage('liveID')
      axios
        .get(DATA_URL + "mwlive/live/get_info.do?id=" + getLStorage("liveID"))
        .then(response => {
          console.log(response);
          if (response.data.code == ERR_OK) {
            this.islive = response.data.data.live_status;
            // this.ruleForm.url1 = response.data.data.live_cover_url
            this.converImg = this.ruleForm.url1;
            this.converImgVideo = response.data.data.live_cover_url;
            this.play_url = response.data.data.play_m3u8_url;
          }
        })
        .catch(function(err) {
          console.log("err", err);
        });
    },
    select_video(){
        if(this.videoCheckList!=""){
            this.disabledAdd = false
        }else{
            this.disabledAdd = true
        }
    },
    // 选择自定义视频
    selectVideo(){  
        this.ruleForm.url2 = this.videoCheckList
        this.customImg = this.videoCheckList;
        this.dialogAddVideo = false
        if (this.VideoLibrary.data.length > 0) {
            this.VideoLibrary.data.forEach((e)=>{
                if (e.vodCoverUrl == this.ruleForm.url2) {
                    // console.log(e.id)
                    this.video_Url = e.playM3u8Url;
                    this.video_id = e.id
                }
            })
        }
    },
    // 关闭视频库弹屏
    close(){
        this.videoCheckList =[] 
        this.dialogAddVideo = false
    },
    tipsMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type || "success"
      });
    },
    onSubmit(formName) {
      //              if(this.islive == 1) {
      //                this.$message({
      //                  showClose: true,
      //                  type: 'info',
      //                  message: '正在直播中，频道基本信息不可编辑!'
      //                });
      //                return false
      //              }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitData();
        }
      });
      return false;
      // if(this.ruleForm.resource == 2 && this.ruleForm.url === '' || this.ruleForm.resource == 1  && this.ruleForm.url === ''){
      if (
        (this.ruleForm.resource == 2 && this.ruleForm.url2 === undefined) ||
        (this.ruleForm.resource == 2 && this.ruleForm.url2 === "")
      ) {
        this.$confirm(
          "您的自定义视频内容为空，系统会自动显示最近直播录像?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            customClass: "delMessageBox",
            type: "info"
          }
        )
          .then(() => {
            this.submitData();
          })
          .catch(() => {
            this.tipsMessage("已取消设置!", "info");
            // this.$message({
            //     showClose:true,
            //     type: 'info',
            //     message: '已取消设置'
            // })
          });
      } else if (
        (this.ruleForm.resource == 1 && this.ruleForm.url1 === undefined) ||
        (this.ruleForm.resource == 1 && this.ruleForm.url1 === "")
      ) {
        this.$confirm("您的自定义图片为空，系统会自动显示默认显示?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          customClass: "delMessageBox",
          type: "info"
        })
          .then(() => {
            this.submitData();
          })
          .catch(() => {
            this.tipsMessage("已取消设置!", "info");    
          });
      } else {
        this.submitData();
      }
    },
    submitOver(type,overUrl){      
      let url = DATA_URL + 'mwlive/live/add_oldVideoInof.do';  
      let formdata = new FormData()
      formdata.append('user_id',getLStorage('user_id'))    
      formdata.append('live_id',getLStorage('liveID'))    
      // formdata.append('source_type',type)    
      // formdata.append('url',overUrl)    
      formdata.append('live_after_type',type)  
    // formdata.append('live_after_url',overUrl) 
    if(type==2||type==1){
      formdata.append('live_after_url',overUrl);
      if(overUrl==""){this.tipsMessage("请选择图片！", "error");}
    }else{
      formdata.append('live_after_url',this.fileID);
    }
    
      axios({
        method: "post",
        url: url,
        data: formdata
      })
      .then(response => {
        if (response.data.code == ERR_OK) {
          this.tipsMessage("设置成功!");
        }else{
          this.tipsMessage("设置失败!",'error');
        }
      })
      .catch(err => {
         this.tipsMessage("设置失败!",'error');
      });

    },
    submitData() {
      let type;
      let overUrl;
      // resource  1图片  2视频    3默认录像
      let url = LIVE_URL + "dispatcher.action";
      let formdata = new FormData()
      let newData = {
        cmd: "set_room_end_show",
        liveID: getLStorage("liveID"),
        end_show_type: this.ruleForm.resource
      };
     // debugger
      if (this.ruleForm.resource == 2 || this.ruleForm.resource == 3) {
        newData.end_show_type = 1;
        if (this.ruleForm.resource == 3) {
          // newData.end_show_vod = this.ruleForm.url2 = "";
          newData.end_show_vod = this.video_Url = "";
         // type = '1'
         type = '0'
        } else if (this.ruleForm.resource == 2) {
          // newData.end_show_vod = this.ruleForm.url2;
          newData.end_show_vod = this.video_Url;
          // 自定义视频
        //  type = '3'
        type = '2'
        }
        newData.end_show_img = "";
        // overUrl =  this.ruleForm.url2
        overUrl = this.video_id;
      } else {
        // 自定义图片
        newData.end_show_type = 0;
        if (this.ruleForm.resource == 0) {
          newData.end_show_img = this.ruleForm.url1 = "";
        } else if (this.ruleForm.resource == 1) {
          if (this.ruleForm.url1 == "") {
            this.tipsMessage("请先选择图片", "error");
          } else {
            newData.end_show_img = this.ruleForm.url1;
            //自定义图片
           // type = '6'
           type = '1'
            //overUrl = this.ruleForm.url1;
            if(this.converImgId=="")
            {
              overUrl = this.ruleForm.url1;
            }
            else{
              overUrl=this.converImgId
            }
          }
        }
        newData.end_show_vod = "";
      }
      this.submitOver(type,overUrl);
      this.converImgId="";

      axios({
        method: "post",
        url: url,
        data: newData
      })
      .then(response => {
          if (response.data.resultCode == ERR_OK) {
            this._getData();
            // this.submitOver(type,overUrl);
          }
        })
      .catch(err => {
          console.log("err");
      });
    },




  },
  filters:{
      filterTime(val){
          if(!val){
              let timestamp = Date.parse(new Date())
              // return '立即开始'
              // return setDateTime(timestamp)
              return '暂无直播'
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
          let getSeconds = datetime.getMinutes()
          if (getSeconds >= 0 && getSeconds <= 9) {
              getSeconds = "0" + getSeconds;
          }
          return datetime.getFullYear() + "-" + month + "-" + strDate + " " + getHours + ":" + strTime //+ ":" + getSeconds
      },
      
  },
  components: {
    MHeader,
    LeftNav,
    LiveSettings
  }
};
</script>

<style scoped>
.preview-img {
  text-align: left;
  margin-top: 20px;
  position: relative;
}

.preview-img span {
  vertical-align: middle;
}
.preview-img .iconfont {
  font-size: 16px;
}
.preview-img img,
.preview-img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.liveEnd {
  min-height: 680px;
  position: relative;
}
.liveEnd .el-form-item {
  margin-bottom: 10px;
}
.submit_btn {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 100px;
  /* margin-left:-15px; */
}

.pre_img {
  width: 500px;
  height: 280px;
  margin-bottom: 40px;
}
.liveEnd .btn_30 {
  width: 100px;
}
/* 封面库单选按钮 */
.img_list {
  width: 820px;
}
.img_list .item {
  width: 360px;
  height: 203px;
  box-sizing: border-box;
  margin-right: 20px;
  margin-bottom: 20px;
}
.el-radio.is-bordered {
  width: 360px;
  height: 203px;
}
.img_list .item:nth-child(even) {
  margin-right: 0;
}
.img_list .item img {
  width: 360px;
  height: 100%;
}
.el-radio.is-bordered {
  width: 360px;
  height: 203px;
}
.img_list .footnote {
  position: relative;
  height: 204px;
  box-sizing: border-box;
}
/* 播放器样式 */
.liveEnd .play_icon {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
  z-index: 999;
}

/* 搜索 */
.liveEnd .el-input-group{
    width:250px;
    height:30px;
  
}
.liveEnd .my_dialog .el-input-group{
    top:85px;
    right:30px;
}
.liveEnd  .el-input-group .el-input__inner{
    height:30px;
    border-radius:2px;
    border-right:none;
}
.liveEnd   .el-input-group__append{
    padding:0 ;
    width:60px;
    height:30px;
    text-align:center;
}
.liveEnd  .myTable_list.my_checkbox_list .item_box .item .item_img{
  margin-left:46px;
}
.search_btn{
    position: absolute;
    top:0;
    right: 3px;
}
.liveEnd .length_txt{
    width:300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-upload--text{
  margin-top: 0px;
}
</style>
<style>
.no_padding.my_dialog .el-dialog__body{
    padding:2px 0 20px 0;
    height:313px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 762px;
}
.liveEnd .mt_70 .el-dialog__body .el-radio__input{
  position: absolute;
    top: 50%;
    margin-top: -15px;
    margin-left:10px
}
.liveEnd  .el-dialog__body .el-radio__label {
  font-size: 14px;
  padding-left: 0px;
}
.liveEnd .mt_70 .el-dialog__body {
    padding: 70px 0 0 0;
    max-height: 490px;
    max-height: 490px;
}
.liveEnd .el-input {
  width: 500px;
}
.liveEnd .el-form-item__content {
  font-size: 12px;
  color: #9b9b9b;
}
.liveEnd .el-form-item__label {
  padding-right: 23px;
}
.liveEnd .lable_left .el-form-item__label {
  padding-right: 26px;
}

.liveEnd   .el-radio__label {
  font-size: 12px;
  padding-left: 6px;
}
.liveEnd .el-radio + .el-radio {
  margin-left: 46px;
}
.issss .el-form-item__error {
  display: none !important;
}
/* 封面库单选按钮 */
.img_list .footnote.is-checked {
  top: 15px;
}
.img_list .el-radio__input.is-checked {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 36px;
  height: 36px;
  background: none;
}
.img_list .footnote .el-radio__label {
  padding: 0;
}
.img_list .el-radio.footnote.is-checked {
  border: 2px solid #2B6CFF;
  border-radius:2px;
}
.img_list .el-radio__input.is-checked {
  background: url(../../common/image/Selected.png) no-repeat;
}
.img_list .footnote .el-radio__inner::after {
  display: none;
}
.img_list .footnote .el-radio__inner {
  font-family: "iconfont" !important;
  font-size: 36px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: none;
}
/* 单选按钮 end*/

.liveEnd .myTable_list .el-radio-group{
    width:578px;
}
.el-form-item__content{
  width:100%;
}
.my_list .el-button.btn_30{
  width:100px;
}
.el-upload--text{
  margin-top:0;
}
</style>

