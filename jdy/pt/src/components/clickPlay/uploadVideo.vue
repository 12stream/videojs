<template>
  <div class="newLive">
      <v-header></v-header>
      <el-row class="w1000 mt20 bg-fff default_shadow my_section">
          <el-col>
              <div class="newList-list">
                  <div class="my_liveT">
                      <h3 class="col-333">{{title}}</h3>
                    <!--<input type="text" id="video_cover_url" value=""/>-->
                  </div>
                  <!-- 上传视频html结构-->
                  <input type='button'  id='upload' value='上传' style="display:none">
                  <input type='button'  id='vodCoverUrl' value='上传' style="display:none">
                  <input type='button'  id='stopload' value='暂停' style="display:none">
                  <input type='button'  id='pickfiles' value='确定' style="display:none">
                  <div class="fileDiv" id="container" style="display:none;">
                      <input type="hidden" id="token" value=""/>
                      <input type="hidden" id="video_id" value=""/>
                      <input type="hidden" id="folder_id" value="0"/>
                      <input type="hidden" id="istranscode" value="0"/>
                      <input type="hidden" id="file_type" value="video"/>
                      <input type="button" id="pick_file" class="pick_file" value="选择文件" @click="pickfile()"/>
                      <input type="button" id="up_load" value="上传" @click="upload()"/>
                  </div>
                  <!-- 上传视频html结构end-->
                  <el-form ref="form" :rules="rules" :model="form" label-width="88px">
                      <el-row class="form_box">
                          <el-col :span="16" style="margin-left:239px;">
                            <!--上传成功界面-->
                            <div id="uploadSuccess" class="upload-result"><!--style="display:none;"-->
                              <span>文件<a class="videoName1"></a>上传成功！</span>
                              <span @click="pickfile">重新上传</span>
                            </div>
                            <!--上传过程界面-->
                            <div id="progressDiv1" class="progressDiv1"><!--上传过程界面-->
                              <div class="progress_view">
                                <div id="percent" class="progress_bar"></div>
                              </div>
                              <div class="el-row uploadSpeed">
                                <div class="el-col-12" style="color: #4285F4;">
                                  <span class="videoName1"></span>正在上传中：
                                </div>
                                <div class="el-col-12 text-right">
                                  <span id="formatSpeed"></span>/<span id="percentTip"></span>
                                </div>
                              </div>
                            </div>
                              <el-form-item label="视频标题 :" prop="vodName">
                                  <el-input :maxlength="20" v-model="form.vodName" placeholder="请输入视频标题"></el-input>
                              </el-form-item>
                              <el-form-item label="视频封面 :" class="textarea_heigth">
                                  <div  class="avatar-uploader pre_img">
                                      <i v-if="form.vodCoverUrl" class="el-icon-error icon_delete el-icon-circle-close" @click="deleteCoverUrl"></i>
                                    <input id="video_cover_url" v-model="form.vodCoverUrl" type="hidden">
                                      <img id="vodCoverImg" v-if="form.vodCoverUrl" :src="form.vodCoverUrl" class="avatar" onerror="javascript:this.src='http://mwdatatest.facebac.com/1/0/0/7e54cc6ad6b334c61f2c/c8c4dfd7-dd86-4212-ae40-919444f19201.png'">
                                      <div v-else class="uploaderTips">
                                          <i  class="el-icon-plus avatar-uploader-icon"></i><br>
                                          <p>尺寸 : 1280x720px</p>
                                          <p>图片小于2M ( JPG、PNG、GIF )</p>
                                      </div>
                                  </div>
                              </el-form-item>
                              <el-form-item label="">
                                  <el-button  style="float: left;" type="info"  class="btn_120" @click="screenshot">视频截图</el-button><!--v-if="isScreenshot"-->
                                <div style="float: left;position: relative;top: -3px;left: 15px;">
                                  <upload-img id="upPics" v-on:updateImg="getImgUrl"></upload-img>
                                </div>
                              </el-form-item>
                              <div class="p-r livePermit">
                                  <!--0：公开 ；1：私密； 2：付费;-->
                                  <el-form-item label="观看权限 :" prop="vodPermit" class="souquan_way is-required">
                                    <el-radio-group v-model="form.vodPermit" >
                                      <el-radio class="radio footnote " v-model="form.vodPermit" label="0" border>免费</el-radio>
                                      <el-radio class="radio footnote " v-model="form.vodPermit" label="1" border>加密</el-radio>
                                      <el-radio class="radio footnote " v-model="form.vodPermit" label="2" border>付费</el-radio>
                                    </el-radio-group>
                                  </el-form-item>
                                  <el-form-item v-if="typeVal1"  label="观看密码:" placeholder="请输入6位数密码" prop="view_pass" class="zidingyi_pwd clear my_bot30">
                                    <el-input :maxlength="6" v-model="viewPass"  class="fl viewInput"></el-input>
                                  </el-form-item>
                                  <el-form-item v-if="moneyVal1"  label="付费金额:" prop="view_pass_money" class="zidingyi_pwd clear my_bot30">
                                    <el-input v-model="viewPassMoney"  class="fl viewInput"></el-input>
                                  </el-form-item>
                              </div>
                            <el-form-item label="并发限制 :"  prop="limitNum">
                              <el-input v-model="form.limitNum" style="width:100px;" size="medium " class="limitInput"  placeholder="请输入限制人数"></el-input>
                              <p class="p1">人</p>
                              <div class="d1">
                                ?
                                <!--<div class="t1">
                                  <p class="mb1">未认证用户：并发限制不超过10人</p>
                                  <p class="mb1">已认证用户：并发限制不超过余额最高限制人数</p>
                                  <p class="mb1">余额最高限制人数公式为：</p>
                                  <p class="mb1">人数=余额/最低时长30min/每分钟费用</p>
                                  <p class="mb1">如已设置账户最高并发，则最高人数为账户最高并发。</p>
                                  <p class="mb1">如需更多人数需求，请电话联系客服人员。</p>
                                </div>-->
                                <!--<div data-v-4b0ca1d2="" class="t11">
                                  <p data-v-4b0ca1d2="" class="mb1">未认证用户：并发限制不超过10人</p>
                                  <p data-v-4b0ca1d2="" class="mb1">并发限制不超过100万人，实际并发人数根据当前账户余额限制并发，人数=余额/最低时长30min/每分钟费用</p>
                                  <p data-v-4b0ca1d2="" class="mb1">余额最高限制人数公式为：</p>
                                  <p data-v-4b0ca1d2="" class="mb1">人数=余额/最低时长30min/每分钟费用</p>
                                  <p data-v-4b0ca1d2="" class="mb1">如已设置账户最高并发，则最高人数为账户最高并发。</p>
                                  <p data-v-4b0ca1d2="" class="mb1">如需更多人数需求，请电话联系客服人员。</p>
                                </div>-->
                                <div class="t11">
                                  <p  style="line-height: 21px; font-size: 12px; color: rgb(255, 255, 255); margin-bottom: 4px;">未认证用户：并发限制不超过10人</p>
                                  <p style="line-height: 21px; font-size: 12px; color: rgb(255, 255, 255);">已认证用户：并发限制不超过100万人，<br>
                                    实际并发人数根据当前账户余额限制并发， <br>
                                    人数=余额/最低时长30min/每分钟费用</p>
                                  <p data-v-4b0ca1d2="" style="line-height: 21px; font-size: 12px; color: rgb(255, 255, 255);">如需更多人数需求，请电话联系客服人员。</p>
                                </div>
                              </div>

                              <!-- </el-form-item> -->
                              <!-- </el-col>
                          </el-row> -->
                              <!-- </el-form> -->
                            </el-form-item>
                              <el-form-item label="视频简介 : ">
                                <el-row class="newList-main newlivedata">
                                  <el-col>
                                    <div class="clear newList-main newlivedata">
                                    <el-form-item class="newlive-test fl img-file-list" v-for="(domain, index) in form.vodTextImgs"  :key="index" :prop="'vodTextImgs.' + index + '.value'">
                                      <el-input v-if="!domain.img_url" placeholder="请输入文字简介" type="textarea"  v-model="domain.img_text" :maxlength="300"></el-input>
                                      <div class="text_tip">{{domain.img_text?domain.img_text.length:0}}<span>/300</span></div>
                                      <i class="el-icon-circle-close p-a" @click="deleteList(file,index)"></i>
                                      <div v-if="domain.img_url" class="img-file p-r te-c">
                                        <img class="upload-img p-a" :src="domain.img_url">
                                      </div>
                                    </el-form-item>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-upload style="float: left;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="fileFunc"
                                :before-upload="beforeAvatarUpload"
                                accept=".jpg, .png, .jpeg">
                                <el-button type="info" class="btn_120">添加图片</el-button>
                              </el-upload>
                                <el-button style="float: left;position: relative;top: 2px;left: 30px;" type="info" class="btn_120" @click="addText">添加文字</el-button>
                            </el-form-item>

                          </el-col>
                      </el-row>
                      <el-row class="mt10 form_bot" style="margin-left: 239px;">
                          <el-form-item label="" class=""><!--te-c-->
                              <el-button style="margin-left: 105px;" class="btn_40 btn_w120" type="primary" :disabled="disabled" @click="submitForm('form')">{{subTitle}}</el-button>
                              <el-button class="btn_40 btn_w120" @click="resetForm">取消</el-button>
                          </el-form-item>
                      </el-row>
                  </el-form>
              </div>
          </el-col>
      </el-row>
      <v-footer></v-footer>
  </div>
</template>
<script>
import VHeader from '../header//header'
import VFooter from '../header/footer'
import editor from '../mainPage/editor'
import UploadImg from "@/components/mainPage/uploadImg";
import axios from 'axios'
import {setDate,filterObj,copyData,setDateTime,axiosData,getCurrentTime} from 'api/http'
import {get_token} from '../js/comm'

import {getLStorage} from '../../api/config'
import {DATA_URL } from '../../api/config'
export default {
  name: 'newLive',
  data(){
      var validatePass1 = (rule, value, callback) => {
          if (!this.view_pass1) {
              return callback(new Error('密码由6位数字组成'))
          }
          setTimeout(() => {
              let MoneyExp = /^\d{6}$/
              if (!MoneyExp.test(this.view_pass1)) {
                  callback(new Error('密码由6位数字组成'))
              } else {
                  this.disabled = false
                  callback()
              }
          }, 1000);
      };
      var validatePass2 = (rule, value, callback) => {
          if (!this.viewPassMoney) {
              return callback(new Error('请输入整数的金额'))
          }
          /*if (this.view_pass2 > 5000 || this.view_pass2 < 1) {
              return callback(new Error('付费金额只支持数字，最小为1，最大为5000，不支持小数点'))
          }*/
          var money = this.viewPassMoney;
          let MoneyExps = /^[0-9]+([.]{1}[0-9]{1})?$/;
          if (!MoneyExps.test(money) || money <= 0 || money > 5000) {
            return callback(new Error("付费金额只支持数字，最小为0.1，最大为5000"));
          }
          setTimeout(() => {
              /*let MoneyExp =  /^[0-9]+$/
              if (!MoneyExp.test(this.view_pass2)) {
                  callback(new Error('付费金额只支持数字，最小为1，最大为5000，不支持小数点'))
              } else {
                  this.disabled = false
                  callback()
              }*/
            let MoneyExp = /^[0-9]+([.]{1}[0-9]{1})?$/;
            if (!MoneyExp.test(money) || money <= 0 || money > 5000) {
              return callback(
                new Error("付费金额只支持数字，最小为0.1，最大为5000")
              );
            } else {
              this.disabled = false;
              callback();
            }
          }, 1000);
      };
      var validateFileXls = (rule, value, callback) => {
          if (!this.fileXls&&!this.isWhite) {
              this.white_list = false
              return callback(new Error('请导入名单'))
          }
          setTimeout(() => {
              callback()
          }, 1000);
      };
      var valViewPass = (rule, value, callback) => {
          // 加密检验
          if (!this.viewPass) {
              return callback(new Error('请输入6位数密码'))
          }else if(this.viewPass.length!=6){
            return callback(new Error('请输入6位数密码'))
          }else {
            callback()
          }
      };
      var valViewPassMoney = (rule, value, callback) => {
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        //金额校验
        if (!this.viewPassMoney) {
          return callback(new Error('请输入金额'))
        }else if(!reg.test(this.viewPassMoney)){
          return callback(new Error('金额输入格式不正确！'))
        }else {
          callback()
        }
      };
    var limitValidat = (rule,value,callback) =>{
      var Exp = /^[0-9]\d*$/
      if (!value) {
        callback()
      }else{
        if (Exp.test(value)) {
          if (this.limitnum) {
            if (value > 1000000) {
              callback(new Error("并发数不能超过100万人"));
            }else{
              callback()
            }
          } else{
            if (value > 10) {
              this.$alert('您尚未认证，并发人数不得超过10人。',  {
                confirmButtonText: '确定',
                center: true,
                callback: action => {
                }
              });
            }else {
              callback();
            }
          }
        }else {
          callback(new Error("并发数为大于等于0的整数"));
        }
      }
    }
      return{
          vid:'',
          content:'我是富文本编辑器的内容',
          editorSetting:{
              height:400,
          },
          regionMode1:false,
          regionMode2:false,
          regionMode3:false,
          regionMode4:false,
          regionplaceholder:'请输入6位数字密码',
          liveTime:'',
          file:'',
          imageUrl:'',
          videoFile:'',
          videoFileName:'',
          fileXls:'',
          fileName: '',
          xlsInput:'',
          myLiveID:'',
          newliveID:'',
          imgId:'',
          disabled:false,
          title:'上传视频',
          isScreenshot:true,
          subTitle:'创建',
          permit_title:'',
          pickerOptions1:{
              disabledDate(time) {
                  return time.getTime() < Date.now() - 8.64e7;
              }
          },
          form:{
            id:'',
            vodName:'',
            vodCoverUrl:'',
            limitNum:'',
            vodPermit:'0',//观看权限 0：公开 1：私密 2：付费
            vodTextImgs:[]//简介
          },
        viewPass:'',
        viewPassMoney:'',
          view_pass1:'',
          view_pass2:'',
          fileXls:'',
          ticketsNum:'',
          dialogImageUrl: '',
          dialogVisible: false,
          removeID:'',
          fileList:[],
          formData:{},
          rules:{
            vodName:[
                  {required: true, message: '请输入视频标题', trigger: 'blur' },
                  {min:2,max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
              ],
              view_pass:[
                {validator:valViewPass, trigger: 'blur'}
              ],
              view_pass_money:[
                {validator:validatePass2, trigger: 'blur'}
              ],
              view_pass1:[
                  {validator:validatePass1, trigger: 'blur' }
              ],
              view_pass2:[
                  {validator:validatePass2, trigger: 'blur' }
              ],
              fileXls:[
                  {validator:validateFileXls, trigger: 'blur' }
              ],
            limitNum:[{validator:limitValidat,trigger:'blur'}]
          },
          oldImg:'',
          CoverlistDialog:false,
          disabledOk:false,
          coverImgList:{
              isData:false,
              data:''
          },
          checkCover:"",
          no_file_upload:false,
          isWhite:false,
        account:'',
        typeVal1:false,
        moneyVal1:false,
        limitnum:"",
      }
  },
  components:{
            VHeader,
      VFooter,
      editor,
    UploadImg
  },
  created(){
    window.vm = this;
    this.getQualify();
  },
    mounted(){
        if(this.$route.query.id){
          this.title = '编辑视频';
          this.isScreenshot = false;
          this.subTitle = '保存';
          this.form.id = this.$route.query.id;
          this.getVodInfo();
        }
    },
    methods:{
        //上传视频
        getImgUrl(a) {
          clearInterval(this.account);
          // console.log("image Url:" + a);
          //this.shareImg = a;
          this.form.vodCoverUrl = a;
        },
        //获取点播详情
        getVodInfo(){
          this.$ajaxs.getVodInfo({id:this.form.id}).then(res => {
            if(res.data.vodTextImgs){
              this.form.vodTextImgs = JSON.parse(res.data.vodTextImgs)
            }
            this.form.vodName = res.data.vodName;
            this.form.vodCoverUrl = res.data.vodCoverUrl;
            if(res.data.onlineCount==-1){
              this.form.limitNum = "";
            }else {
              this.form.limitNum = res.data.onlineCount;
            }
            // console.log(res.data.vodCoverUrl,'图片地址');
            this.form.vodPermit = res.data.vodPermit;
            if(this.form.vodPermit==0){
              this.form.vodPermit = '0';
            }else if(this.form.vodPermit==1){
              this.form.vodPermit = '1';
              this.typeVal1 = true
              this.viewPass = res.data.viewPass
            }else if(this.form.vodPermit==2){
              this.form.vodPermit = '2';
              this.moneyVal1 = true;
              this.viewPassMoney = res.data.viewPass/10;
            }

          })
        },
        beforeAvatarUpload(file,index) {
        },
        getQualify(){
          axios
            .get(DATA_URL + "mwlive/user/user_qualify_cx.do", {
              params: {
                userId: getLStorage("user_id")
              }
            })
            .then(response => {
              // 实名成功
              if (response.data.data.qualify == 3) {
                this.limitnum = true;
              } else {
                this.limitnum = false;
              }
            })
        },
        pickfile(){
          $('#progressDiv1').hide()
          $('.videoName1').html('');
          $('#uploadSuccess').hide()
          get_token()
        },
        fileFunc(file){
            this.videoFile = file.raw;
            this.videoFileName = file.name;
            console.log(file,'视频');
            //this.imageUrl = file.url
        },
        addText(){
          this.form.vodTextImgs.push({img_text: ''});
        },
        fileFunc(file,fileList){
          let imgtype = file.raw.type
          const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';

          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
            this.tipsMessage('上传头像图片只能是 JPG、PNG、JPEG 格式!','error')
            return false
          }
          if (!isLt2M) {
            this.tipsMessage('上传图片大小不能超过 2MB!','error')
            return false
          }
          // this.file = file.raw

          // let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
          try {
            if( this.form.vodTextImgs.length >= 10){
              this.tipsMessage('简介图文最多添加十张！','error')
              return false
            }
          } catch (e) {
            console.log(e.name + ": " + e.message);
          }

          var img_url = file.url
          var img = new Image()
          img.src = img_url
          var img_width;
          var img_height;
          img.onload = function(){
            img_width = img.width/2
            img_height = img.height/2
          }

          let formdata = new FormData()
          formdata.append('file_data',file.raw)
          formdata.append('user_id',getLStorage('userId'))
          formdata.append('file_type',1)

          var that = this
          axiosData(formdata,DATA_URL+'mwlive/setup/file_upload.do').then(res => {// DATA_URL
            if(res.data.code == 200){
              console.log(res.data.data.img_url)
              if(!that.form.vodTextImgs){
                that.form.vodTextImgs =[]
              }
              that.form.vodTextImgs.push({img_url:res.data.data.show_url,img_text: '',img_id:res.data.data.save_id})
              console.log(that.form.vodTextImgs,'组装后的数据')
            }else{
              that.tipsMessage('上传失败','error')
            }
          })
        },
      tipsMessage(message,type){
        this.$message({
          showClose: true,
          message: message,
          type: type || 'info'
        })
      },
        coverFileFunc(file){
            this.file = file.raw
        },
        resetForm(){//取消
            //delLStorage('editID')
          clearInterval(this.account);
          this.$router.back(-1)
        },
        deleteCoverUrl(){
           clearInterval(this.account);
            this.form.vodCoverUrl = '';
        },
        deleteList(file,index){
          // delete this.dynamicValidateForm.domains[index]
          // delete this.fileList[index]
          this.form.vodTextImgs.splice(index, 1)
        },
        //视频截图
        // videoCoverUrlChange(){
        //   var _this = this;
        //   setTimeout(function(){
        //     _this.form.vodCoverUrl = getVideoCoverUrl();
        //     console.log(_this.form.vodCoverUrl,'视频截图');
        //   },120000);
        //
        // },
        //视频截图
        screenshot(){
          if(this.$route.query.id){
            this.form.id = this.$route.query.id;
          }else {
            this.form.id = $('#video_id').val();
          }
          get_token();
          let paramData = {
            "token":$("#token").val(),
            "search_terms":getLStorage("vId")
          }
          this.$ajaxs.searchList(paramData).then(res => {
            let url = res.data.dataList[0].video_cover_url;
            function show1(url){
                vm.form.vodCoverUrl = '';
                $('#vodCoverImg').attr("src",'');
                vm.form.vodCoverUrl = res.data.dataList[0].video_cover_url;
                $('#vodCoverImg').attr("src",res.data.dataList[0].video_cover_url);
            }
            //定时器
            this.account =  setInterval(function () {
                show1(url)
              },0)
            })
        },
        submitForm(formName){
            this.form.id = $('#video_id').val();
            if(this.$route.query.id){
              this.form.id = this.$route.query.id;
            }

          let paramData =  {
            userId:getLStorage("user_id"),
            id:this.form.id,
            vodId:this.$route.query.vid,
            vodName:this.form.vodName,
            vodCoverUrl:this.form.vodCoverUrl,
            onlineCount :this.form.limitNum,
            vodPermit:this.form.vodPermit,
            vodTextImgs:this.form.vodTextImgs
          }
          if(this.form.vodPermit=="1"){
            paramData.viewPass = this.viewPass;
          }else if(this.form.vodPermit=="2"){
            paramData.viewPass = this.viewPassMoney*10;
          }
          paramData.vodTextImgs =  JSON.stringify(this.form.vodTextImgs)
          if(!this.form.vodCoverUrl){
            get_token();
            let screenshotData = {
              "token":$("#token").val(),
              "search_terms":getLStorage("vId")
            }
            this.$ajaxs.searchList(screenshotData).then(res => {
              let url = res.data.dataList[0].video_cover_url;
              this.form.vodCoverUrl = res.data.dataList[0].video_cover_url;
              paramData.vodCoverUrl = this.form.vodCoverUrl;
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$ajaxs.updateVodInfo(paramData).then(res => {
                    if(res.code==200){
                      this.$message({
                        showClose: true,
                        message: '修改成功！',
                        type: 'success'
                      });
                      clearInterval(this.account);
                      this.$router.push('/videoCenter')
                    }else {
                      console.log(this.form.vodTextImgs,'简介图片');
                      this.$message({
                        showClose: true,
                        message: '操作失败！',
                        type: 'error'
                      });
                    }
                  })
                }
              })
            })
          }else {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$ajaxs.updateVodInfo(paramData).then(res => {
                  if(res.code==200){
                    this.$message({
                      showClose: true,
                      message: '修改成功！',
                      type: 'success'
                    });
                    clearInterval(this.account);
                    this.$router.push('/videoCenter')
                  }else {
                    console.log(this.form.vodTextImgs,'简介图片');
                    this.$message({
                      showClose: true,
                      message: '操作失败！',
                      type: 'error'
                    });
                  }
                })
              }
            })
          }
        }
    },
    computed: {
      vodPermit() {
        return this.form.vodPermit
      }
    },
    watch:{
      vodPermit(val){
        if(val == 1){
          this.typeVal1 = true;
          this.moneyVal1 = false;
        }else if(val == 2){
          this.moneyVal1 = true;
          this.typeVal1 = false;
        }else {
          this.typeVal1 = false;
          this.moneyVal1 = false;
        }
      }
    }
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
        width:100%;
        height:100%;
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
</style>
<style>
  .limitInput .el-input__inner{
    width:116px !important;
    font-size:10px;
  }
  .p1{
    display: inline-block;
    margin-left:24px;
  }
  .d1{
    position: relative;
    display: inline-block;
    width: 15px;
    height: 15px;
    background: rgba(0,0,0,.2);
    text-align: center;
    line-height: 15px;
    font-size: 14px;
    border-radius: 50%;
    color: #fff;
  }
  .t11{
    position: absolute;
    top: 29px;
    left: -36px;
    z-index: 99;
    background: rgba(0,0,0,.7);
    border-radius: 17px ;
    text-align: left;
    color: #fff;
    padding: 17px;
    display: none;
    min-width: 280px;
    font-size: 12px;
    height: 115px;
  }
  .d1:hover{
    background: #2B6CFF;
  }
  .t11::before{
    content: '';
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color: rgba(0,0,0,.7);
    top: -13%;
    left: 33px;
  }
  .d1:hover .t11{
    display: block;
  }
  .t1{
    position: absolute;
    top: 29px;
    left: -36px;
    z-index: 99;
    background: rgba(0,0,0,.7);
    border-radius: 17px ;
    text-align: left;
    color: #fff;
    padding: 17px;
    display: none;
    min-width: 280px;
    font-size: 12px;
    height: 168px;
  }
  .d1{
    position: relative;
    display: inline-block;
    width: 15px;
    height: 15px;
    background: rgba(0,0,0,.2);
    text-align: center;
    line-height: 15px;
    font-size: 14px;
    border-radius: 50%;
    color: #fff;
  }
  .d1:hover{
    background: #2B6CFF;
  }
  .t1::before{
    content: '';
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color: rgba(0,0,0,.7);
    top: -10%;
    left: 33px;
  }
  .d1:hover .t1{
    display: block;
  }
  .mb1 {
    margin-bottom: 10px;
  }
    /*.newList-list .el-button.btn_120{
        width:120px;
        padding:0;
    }*/
    #upPics .el-upload-list{
    right: auto;
    margin-top: 35px;
    }
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

