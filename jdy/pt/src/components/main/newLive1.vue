<template>
    <div class="newLive">
        <m-header></m-header>
        <el-row class="w1000 mt20 bg-fff default_shadow my_section">
            <el-col>
                <div class="newList-list">
                    <div class="my_liveT">
                        <h3 class="col-333">{{title}} </h3>
                    </div>
                    <el-form ref="form" :rules="rules" :model="form" label-width="88px">
                        <el-row class="form_box">
                            <el-col :span="16" style="margin-left:239px;">
                                <el-form-item label="直播标题 :" prop="live_name">
                                    <el-input v-model="form.live_name" placeholder="请输入直播间标题" :maxlength="20"></el-input>
                                </el-form-item>
                                <el-form-item label="直播封面 :" class="textarea_heigth">
                                    <div  class="avatar-uploader pre_img">
                                    <i v-if="form.live_cover_url" class="el-icon-error icon_delete el-icon-circle-close" @click="deleteAvatar($event)"></i>
                                    <img v-if="form.live_cover_url" :src="form.live_cover_url" class="avatar">
                                    <div v-else class="uploaderTips">
                                        <i  class="el-icon-plus avatar-uploader-icon"></i><br>
                                        <p>尺寸 : 1280x720px</p> 
                                        <p>图片小于2M ( JPG、PNG、GIF )</p>
                                    </div>
                                    </div>                  
                                </el-form-item>
                                <el-form-item label="">
                                   
                                    <el-upload
                                    
                                    style="margin-right:20px;position:absolute;left:140px;"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :on-change="coverFileFunc"
                                    accept=".jpg, .gif, .png"
                                    :before-upload="beforeAvatarUpload">
                                        <el-button type="info" class="btn_120">选择自定义封面</el-button>
                                    </el-upload>             
                                    <el-button type="info" @click="openChangeIMG()" class="btn_120">选择默认封面</el-button>
                                    
                                </el-form-item>  
                                <!-- <el-date-picker
                                    v-model="form.begin_date"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0"
                                >
                                </el-date-picker>
                                <el-time-picker
                                    v-model="form.begin_time"
                                    :picker-options = "pickerOptions1"
                                    placeholder="选择时间">
                                </el-time-picker> -->
                                <!-- <el-form-item label="直播时间 :" class="is-required" prop="begin_time">
                                    <div class="block">
                                        <span class="demonstration">默认</span>
                                        <el-date-picker
                                          v-model="value6"
                                          type="datetime"
                                          range-separator="至"
                                          :start-placeholder="timeDefaultShow"
                                          :end-placeholder="pickerOptions0">
                                        </el-date-picker>
                                    </div>
                                </el-form-item> -->
                                
                                <!-- :default-value="timeDefaultShow" -->                                
                                <el-form-item label="直播时间 :" class="is-required" prop="begin_time" id="beginTime">
                                    <p  v-if="!form.begin_time" class="date_placeholder">选择直播时间</p>
                                    <el-date-picker
                                    v-model="form.begin_time"
                                    type="datetime"
                                    :picker-options="pickerOptions0">
                                    </el-date-picker>
                                    <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                                </el-form-item>                            
                                <!-- <el-form-item label="观看权限:" prop="region">
                                    <el-select style="width:54.3%" v-model="form.region" @change="regionVal" placeholder="公开">
                                        <el-option label="公开" value="open"></el-option>
                                        <el-option label="密码" value="encryption"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item v-if="regionMode" label="直播间密码:" prop="live_permit">
                                    <el-input v-model="form.live_permit" style="width:54.3%"></el-input>
                                </el-form-item> -->

                                <div class="p-r livePermit">
                                    <el-form-item label="观看权限 :" prop="live_permit" class="souquan_way is-required">
                                        <el-radio class="radio footnote " v-model="form.live_permit" label="0" border>免费</el-radio>
                                        <el-radio class="radio footnote " v-model="form.live_permit" label="1" border>加密</el-radio>
                                        <el-radio class="radio footnote " v-model="form.live_permit" label="2" border>付费</el-radio>
                                        <el-radio class="radio  footnote  radio_t3" v-model="form.live_permit" label="4" border>专属直播间</el-radio>
                                        <el-radio class="radio footnote" v-model="form.live_permit" label="3" border>门票</el-radio>
                                    </el-form-item>
                                    <div class="p-r">
                                        <el-form-item v-if="regionMode1" :label="permit_title" prop="view_pass1">
                                            <el-input v-model="view_pass1" :placeholder="regionplaceholder" :maxlength="6"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="p-r">
                                        <el-form-item v-if="regionMode2" :label="permit_title" prop="view_pass2">
                                            <el-input v-model="view_pass2" class="input_150" :maxlength="4"></el-input><span style="margin-left:10px;color:#9B9B9B;">元</span>                                            
                                        </el-form-item>
                                    </div>
                                    <!-- 白名单 -->
                                    <div class="p-r" v-bind:class="{white_list:fileName}">
                                        <el-form-item v-if="regionMode4" :label="permit_title" prop="fileXls">
                                            <span class="green_txt" v-if="fileName">{{fileName}}</span>    
                                            <span class="green_txt" v-if="isWhite">手机号白名单</span>    
                                            <el-upload
                                                style="display: inline-block;" 
                                                class="cur-p"
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :show-file-list="false"
                                                :auto-upload="false"
                                                :on-change="changeXls"                                            
                                                accept=".xls, .xlsx"
                                                v-model="fileXls"
                                                >
                                                <el-button type="info" class="file_btn">导入</el-button>
                                            </el-upload> 
                                            <span class="txt_blue cur-p">
                                                <a  class="" href="http://mwdatatest.facebac.com/white/white.xls">下载模板</a>         
                                            </span>
                                            <!-- <el-input v-model="view_pass3"></el-input> -->
                                        </el-form-item>
                                    </div>
                                    <!-- 门票 -->
                                    <div class="p-r livePermit">
                                        <el-form-item class="m_l p_l" v-if="regionMode3" :label="permit_title" prop="ticketsNum">
                                            <el-input v-model="ticketsNum" :maxlength="5" ></el-input>
                                            <p v-show="limitnum" style="color:#949494;font-size:12px;" >单次可输入1千张门票，最高可支持5万张</p>
                                        </el-form-item>
                                    </div>
                                    <div class="p-r">
                                        <el-form-item class="m_l" v-if="regionMode3" label="在线售票：" prop="ticketMoney"  >
                                            <el-radio-group @change="ticketOffchange" v-model="ticketOff" style="display:block;height:40px;line-height:55px;">
                                                <el-radio :label="1">开启</el-radio>
                                                <el-radio :label="0">关闭</el-radio>
                                            </el-radio-group>
                                            <el-col v-if="ticketOff">
                                                <el-input style="width:120px;height:34px;" size="medium " class="limitInput limitMoneny"  v-model="form.ticketMoney" placeholder="门票金额0.1-10万"></el-input><span style="margin-left: 38px;font-size: 12px;color: rgba(51,51,51,1);">元</span>
                                            </el-col>
                                        </el-form-item>
                                    </div>
                                    <!-- <el-form-item label="虚拟直播 :">
                                        <el-button type="info">选择视频 </el-button>
                                    </el-form-item>  -->
                                    <el-form-item label="并发限制 :" prop="limitNum">
                                      <el-input style="width:97px;" size="medium " class="limitInput"  v-model="form.limitNum" placeholder="输入限制人数"></el-input>
                                      <p class="p1">人</p>
                                      <div class="d1">
                                        ?
                                        <div class="t11">
                                            <!-- <p class="mb1">未认证用户：并发限制不超过10人</p>
                                            <p class="mb1">并发限制不超过100万人，实际并发人数根据当前账户余额限制并发，人数=余额/最低时长30min/每分钟费用</p>
                                            <p class="mb1">余额最高限制人数公式为：</p>
                                            <p class="mb1">人数=余额/最低时长30min/每分钟费用</p>
                                            <p class="mb1">如已设置账户最高并发，则最高人数为账户最高并发。</p>
                                            <p class="mb1">如需更多人数需求，请电话联系客服人员。</p> -->
                                            <p style="line-height: 21px;font-size: 12px;color: rgba(255,255,255,1);margin-bottom:4px;">未认证用户：并发限制不超过10人</p>
                                                <p style="line-height: 21px;font-size: 12px;color: rgba(255,255,255,1);">已认证用户：实际并发人数根据当前账户余额限制并发，
                                                人数=余额/每分钟费用</p><p style="line-height: 21px;font-size: 12px;color: rgba(255,255,255,1);">如需更多人数需求，请电话联系客服人员。</p>
                                        </div>
                                      </div>
                                    </el-form-item> 
                                    <el-form-item label="直播简介 : ">
                                        <!-- <el-row class="newList-main newlivedata"> -->
                                            <el-col>
                                                <!-- <el-form-item class="newlive-test" v-for="(domain, index) in form.live_text_imgs" :prop="'form.live_text_img.' + index + '.contentDesc'" :rules="{ -->

                                                <!-- <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
                                                    required: true, message: '域名不能为空', trigger: 'blur'
                                                }"> -->
                                                <!-- <div class="clear newList-main newlivedata" :class="{cs1:txt_flag}" >
                                                    <el-form-item id="tt" class='txt-w' :class="{cs2:txt_flag}" style="width:500px;height:120px" v-if="txt_flag" >
                                                        <el-input placeholder="请输入文字简介" style="height:100%;" type="textarea"  v-model="form.myText" :maxlength="300"></el-input>
                                                    </el-form-item>
                                                    <el-form-item class="newlive-test fl img-file-list" v-for="(domain, index) in form.live_text_imgs"  :key="index" :prop="'live_text_imgs.' + index + '.value'">
                                                        <i class="el-icon-circle-close p-a" @click="deleteList(file,index)"></i>
                                                        <div class="img-file p-r te-c">
                                                            <img class="upload-img p-a" :src="domain.show_url">
                                                        </div>
                                                    </el-form-item>
                                                </div> -->

                                                <div class="clear newList-main newlivedata"   v-for="(domain, index) in form.live_text_imgs" >
                                                    <el-form-item id="tt" class='txt-w' v-if="domain.contentDesc != undefined"  style="margin-bottom:14px;width:500px;postion:relative;">
                                                        <i class="el-icon-circle-close p-a" @click="deleteList(domain.contentDesc,index)"></i>
                                                        <el-input placeholder="请输入文字简介" style="height:100%;width:500px;" type="textarea" :maxlength="300" v-model="domain.contentDesc"></el-input>
                                                        <div class="text_tip" style="margin-top:8px;">{{domain.contentDesc?domain.contentDesc.length:0}}<span>/300</span></div>
                                                    </el-form-item>
                                                    <el-form-item class="newlive-test fl img-file-list" v-if="domain.show_url" :key="index" :prop="'live_text_imgs.' + index + '.value'">
                                                        <i class="el-icon-circle-close p-a" @click="deleteList(file,index)"></i>
                                                        <div class="img-file p-r te-c">
                                                            <img class="upload-img p-a"  :src="domain.show_url">
                                                        </div>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                        <!-- </el-row>    -->
                                        <el-upload
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :show-file-list="false"
                                            :auto-upload="false"
                                            :on-change="fileFunc"
                                            :before-upload="beforeAvatarUpload"
                                            accept=".jpg, .png, .jpeg">
                                            <el-button type="info" class="btn_120">添加图片</el-button>
                                        </el-upload>
                                        <el-button type="info"  @click="addText()" class="btn_120 ps1">添加文字</el-button>                                                                     
                                    </el-form-item> 
                                    <div v-if="editType=='2'">
                                        <el-checkbox v-model="isSyn">同步发布到云播APP</el-checkbox>
                                    </div>
                                </div>


                            </el-col>

                        </el-row>
                        <el-row class="mt10 form_bot">
                            <el-form-item class="te-c" style="    margin-left: -85px;">
                                <el-button class="btn_40 btn_w120" type="primary" :loading="aaa" :disabled="disabled" @click="submitForm('form')">{{subTitle}}</el-button>
                                <el-button class="btn_40 btn_w120" @click="resetForm">取消</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
            </el-col>
        </el-row>

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
        <m-footer></m-footer>
    </div>
</template>

<script>
import MHeader from "components/header/header";
import {
  setDate,
  filterObj,
  copyData,
  setDateTime,
  axiosData,
  getCurrentTime
} from "api/http";
import axios from "axios";
import {
  ERR_OK,
  DATA_URL,
  GIFT_URL,
  LIVE_URL,
  getLStorage,
  delLStorage,
  changeDateType
} from "api/config";
import LeftNav from "components/leftnav/leftnav";
import mFooter from "components/header/footer";
import Bus from '../bus.js'
import rootBus from '../rootBus.js';

export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (!this.view_pass1) {
        return callback(new Error("密码由6位数字组成"));
      }
        let MoneyExp = /^\d{6}$/;
        if (!MoneyExp.test(this.view_pass1)) {
          callback(new Error("密码由6位数字组成"));
        } else {
          callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!this.view_pass2) {
        return callback(new Error("请输入整数的金额"));
      }
      // if (this.view_pass2 > 5000 || this.view_pass2 < 1) {
      //   return callback(
      //     new Error("付费金额只支持数字，最小为1，最大为5000，不支持小数点")
      //   );
      // }
      var money = this.view_pass2;
      let MoneyExps = /^[0-9]+([.]{1}[0-9]{1})?$/;
      if (!MoneyExps.test(money) || money <= 0 || money > 5000) {
        return callback(new Error("付费金额只支持数字，最小为0.1，最大为5000"));
      }
    //   setTimeout(() => {
        let MoneyExp = /^[0-9]+([.]{1}[0-9]{1})?$/;
        if (!MoneyExp.test(money) || money <= 0 || money > 5000) {
          return callback(
            new Error("付费金额只支持数字，最小为0.1，最大为5000")
          );
        } else {
          callback();
        }
    };
    var validateFileXls = (rule, value, callback) => {
        
      if (!this.fileXls && !this.isWhite) {
        this.white_list = false;
        return callback(new Error("请导入名单"));
      }
        callback();
    };
    var valTicketsNum = (rule, value, callback) => {
        if (this.ticketsNum > this.maxEditNumber) {
            return callback(new Error('您最多还可以添加' + this.maxEditNumber + '张门票'));
        }
        if (this.ticketsNum === this.newTicketsNum) {
            callback()
        }else{
            let numberExp = /^[0-9]+$/;
                if (!numberExp.test(this.ticketsNum) || this.ticketsNum < 1 ) {
                  return callback(new Error("门票数量为大于1的整数"));
                }

            // 查询实名
            if (!this.ticketsNum) {
                return callback(new Error("请输入门票数量"));
            } else{
                let numberLimit;
                    // 实名成功
                    if (this.limitnum) {
                        numberLimit = 1000;
                        if (this.ticketsNum > numberLimit) {
                            return callback(new Error("已认证用户，单次最高可输入1000张"));
                        }else{
                            callback();
                        }
                    } else {
                        numberLimit = 100;
                        if (this.ticketsNum > numberLimit) {
                            return callback(new Error("未认证用户，最多添加100张门票！"));
                        }else{
                            callback();
                        }
                    }
            }
        }
        
    };
    var limitValidat = (rule,value,callback) =>{
      var Exp = /^[0-9]*$/
        if (!value) {
           callback()
        }else{
          if (Exp.test(value) && value != 0) {
              console.log(this.limitnum)
              if (this.limitnum) {
                  if (value > 1000000) {
                      callback(new Error("并发数不能超过100万人"));
                  }else{
                    callback()
                  }
              }else{
                  if (value > 10) {
                      this.$alert('您尚未认证，并发人数不得超过10人。',  {
                        confirmButtonText: '确定',
                        center: true,
                        callback: action => {
                        }
                      });
                  }else{
                    callback();
                  }
              }
          }else{
              callback(new Error("请输入1~9正整数"))
          }
        }
    }
    var validatetMoney = (rule,value,callback)=>{
        var re = /^[0-9]+([.]{1}[0-9]{1})?$/
        if (this.ticketOff == 0) {
            callback()
        }else{
            if (this.ticketOff == 1 && value > 0 && value <= 100000) {
                    if(value == 0 || value == '' || value == undefined){
                        // callback(new Error('输入金额不能为空'))
                        this.$message({
                            showClose: true,
                            message: '输入金额不能为空',
                            type: 'warning'
                        });
                    }
                    if (re.test(value)) {
                        callback();
                    }else{
                        this.$message({
                            showClose: true,
                            message: '请输入大于0的正整数或者保留一位小数',
                            type: 'warning'
                        });
                        // callback(new Error('请输入大于0的正整数或者保留一位小数'))
                }
            }else{
                this.$message({
                    showClose: true,
                    message: '请输入金额为0.1~100000元',
                    type: 'warning'
                });
                // callback(new Error('请输入大于0.1小于10万的数字'))
            }
            }
        }
        
    // let validatePass1 = (rule, value, callback) => {
    //     if(this.form.live_permit == 1){
    //         this.disabled = true
    //         if (!this.view_pass1) {
    //             this.disabled = false
    //             return callback(new Error('密码由6位数字组成'));
    //         }
    //         setTimeout(() => {
    //             let regExp = /^\d{6}$/
    //             if (!regExp.test(this.view_pass1)) {
    //                 this.disabled = false
    //                 callback(new Error('密码由6位数字组成'))
    //             }else{
    //                 this.disabled = false
    //                 console.log('view_pass1 success',this.view_pass1)
    //                 callback()
    //             }
    //         }, 1000);
    //     }
    // };

    // let validatePass2 = (rule, value, callback) => {
    //     if(this.form.live_permit == 2){
    //         // 金额
    //         this.disabled = true
    //         let regExp = /^[0-9]+$/
    //         if (!this.view_pass2) {
    //             this.disabled = false
    //             return callback(new Error('请输入正确的金额'));
    //         }
    //         setTimeout(() => {
    //             console.log(2)
    //             if (this.regionMode2 && !regExp.test(this.view_pass2)) {
    //                 this.disabled = false
    //                 callback(new Error('请输入正确的金额'))
    //             } else {
    //                 this.disabled = false
    //                 callback()
    //             }
    //         }, 1000);
    //     }
    // };
    return {
        ticketOff:0,
        aaa:false,
        singleData:[],
      value6:'',
      isSyn: true,
      regionMode1: false,
      regionMode2: false,
      regionMode3: false,
      regionMode4: false,
      regionplaceholder: "请输入6位数字密码",
      liveTime: "",
      file: "",
      fileXls: "",
      fileName: "",
      xlsInput: "",
      myLiveID: "",
      newliveID: "",
      imgId: "",
      disabled: false,
      title: "",
      subTitle: "",
      permit_title: "",
      limitnum:'',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        // var date = new Date();
        // var seperator = ":";
        // var strDate = date.getDate();
        // var currentdate = date.getHours() + seperator2+ date.getMinutes()+ seperator + date.getSeconds()
        selectableRange: getCurrentTime()
        // return currentdate + ' - 20:30:00'
      },
      form: {
        id: "",
        live_name: "",
        begin_time: "",
        region: "",
        live_cover_url: "",
        live_permit: "",
        live_text_imgs: [],
        view_pass: "",
        limitNum:'',
        myText:'',
        live_text:[],
        ticketMoney:''
      },
      // pickerOptions0: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now() - 8.64e7;
      //   }
      // },
      view_pass1: "",
      view_pass2: "",
      fileXls: "",
      ticketsNum: "",
      // dynamicValidateForm: {
      //     domains: [

      //     ],
      // },
      dialogImageUrl: "",
      dialogVisible: false,
      removeID: "",
      fileList: [],
      formData: {},
      rules: {
        live_name: [
          { required: true, message: "请输入直播标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
          
        ],
        // region:[
        //     {message: '请选择参与方式', trigger: 'change'}
        //     // {required: true,message: '请选择参与方式', trigger: 'change'}
        // ],
        begin_time: [
          { required: true, message: "请选择直播时间", trigger: "blur" }
        ],
        live_permit: [
          { required: true, message: "请选择观看权限", trigger: "blur" }
        ],
        view_pass1: [{ validator: validatePass1, trigger: "blur" }],
        view_pass2: [{ validator: validatePass2, trigger: "blur" }],
        fileXls: [{ validator: validateFileXls, trigger: "blur" }],
        ticketsNum: [{ validator: valTicketsNum, trigger: "blur" }],
        limitNum:[{validator:limitValidat,trigger:'blur'}],
        ticketMoney:[{validator:validatetMoney,trigger:'blur'}]
      },
      oldImg: "",
      CoverlistDialog: false,
      disabledOk: false,
      coverImgList: {
        isData: false,
        data: ""
      },
      checkCover: "",
      no_file_upload: false,
      isWhite: false,
      editType: "0",
      originalImgId: "",
      txt_flag:false,
      newTicketsNum:'',
      shareTickNum:'',
      ticketFlag:false,
      isQualify:'',
      createdNumber:''
      // limitForm:{
      //   num:''
      // },
      // rules1:{
      //   num:[{validator:limitValidat,trigger:'blur'}]
      // }
    };
  },

  created() {
    this.editType = this.$route.query.from;
    this.getQualify();
    this.isEdit();
    this.getImgList();
  },
  mounted() {
    if (this.editType == "1") {
      $("#yunbo").addClass("router-link-active");
      $("#videoCenter div").removeClass("router-link-active");
    }
  },
  destroyed() {
    delLStorage("editID");
  },
  methods: {
      getQualify(){
            var params = {userId:getLStorage('user_id')};
            console.log(params)
                axios.get(DATA_URL + 'mwlive/user/get_userinfo.do',{
                    params:{
                        id:getLStorage('user_id')
                    }
                }).then((response) => {
                    console.log(response)
                    if (response.data.data.qualify == 3) {
                        this.isQualify = 3
                    }else{
                        this.isQualify = 1;
                    }
                    this.getTicketNum();
                }).catch(function(err){
                    console.log(err)
                })
        },
      ticketOffchange(val){
        //   if (this.ticketFlag) {
        //       return
        //   }
          if (val == 0) {
              console.log('关闭了')
              this.$confirm('<p style="text-align:center;">关闭在线售票后，在直播页面观众将会</p><p style="text-align:center;">无法直接购买门票，您确定关闭吗？</p>', {
                    dangerouslyUseHTMLString: true,
                    distinguishCancelAndClose: true,
                    showClose:false,
                    customClass:'offMesBox',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass:'offConfirm',
                    cancelButtonClass:'offCancel',
                    center:true
                    })
                    .then(() => {
                        // this.ticketFlag  = true;
                        this.ticketOff = 0;
                    })
                    .catch(action => {
                        // this.ticketFlag = true;
                        this.ticketOff = 1;
                    });
          }
      },
      getTicketNum(){
          if (getLStorage("editID") == '' || getLStorage("editID") == null || getLStorage("editID") == undefined ) {
              return
          }
          console.log(this.isQualify)
          let obj = {
              liveID:getLStorage("editID"),
              qualify:this.isQualify
          }
          axios({
                method:'post',
                url:GIFT_URL +'/service/showCode.action',
                params:obj
        }).then((re)=>{
            if (re.data.resultCode == '01') {
                this.shareTickNum = Number(re.data.params.useCode);
                this.maxEditNumber = Number(re.data.params.maxEditableNum);
                this.newTicketsNum = Number(re.data.params.autoCreateNum);
                this.ticketsNum = Number(re.data.params.autoCreateNum) <= 0 ? "" : Number(re.data.params.autoCreateNum);
            }
        })
      },
    iptChange(val){
        console.log(this.ticketsNum)
        // this.newTicketsNum = val;
    },
    isEdit() {
      this.myLiveID = getLStorage("editID");
      if (getLStorage("editID")) {
        this.title = "编辑直播信息";
        this.subTitle = "保存";
        console.log(getLStorage("editID"));
        let live_id = getLStorage("editID");
        axios
          .get(DATA_URL + "mwlive/live/get_info.do?id=" + live_id)
          .then(response => {
            console.log(response);
            if (response.data.code == ERR_OK) {
              // yst
              if (response.data.data.live_text_imgs) {
                response.data.data.live_text_imgs = JSON.parse(
                  response.data.data.live_text_imgs
                );
              }
              this.form = response.data.data;
              if(response.data.data.onlineCount == '-1'){
                this.form.limitNum = '';
              }else{
                this.form.limitNum = response.data.data.onlineCount;
              }
              if (response.data.data.ticket_price > 0) {
                  this.ticketOff = 1
                  this.form.ticketMoney = response.data.data.ticket_price/10;
              }else{
                  this.ticketOff = 0;
              }
              var begin_time = response.data.data.begin_time;
              
              this.form.begin_time = new Date(begin_time);
                // this.form.begin_time = this.dataConver(begin_time);
              this.oldImg = this.form.live_cover_url;
              if (this.form.live_permit == 1) {
                this.form.live_permit = "1";
                this.view_pass1 = response.data.data.view_pass;
              } else if (this.form.live_permit == 2) {
                this.form.live_permit = "2";
                this.view_pass2 = response.data.data.view_pass / 10;
              } else if (this.form.live_permit == 3) {
                this.form.live_permit = "3";
              } else if (this.form.live_permit == 4) {
                this.form.live_permit = "4";
              } else {
                this.form.live_permit = "0";
              }
              this.getWhite();
              this.getDataList();
              if (response.data.data.isSyn == 1) {
                this.isSyn = true;
              } else {
                this.isSyn = false;
              }
            }
          })
          .catch(function(err) {
            console.log("err", err);
          });
      } else {
        this.title = "创建直播";
        this.subTitle = "创建";
        console.log("addlive");
        this.form = {
          id: "",
          live_name: "",
          begin_time: "",
          region: "",
          live_cover_url: "",
          live_permit: "0",
          live_text_imgs: [],
          view_pass: "",
          limitNum:'',
        };
      }
    },
    //时间转换
    dataConver(time){
        let datetime = new Date(time)
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
        return datetime.getFullYear() + "/" + month + "/" + strDate + " " + getHours + ":" + strTime 
    },
    // 白名单查询
    getWhite(val) {
      this.liveId = getLStorage("liveID");
      let url = DATA_URL + "mwlive/user/select_whiteListPage.do";
      let formdata = new FormData();
      formdata.append("live_id", this.myLiveID);
      formdata.append("page_size", "10");
      formdata.append("page_index", "1");
      axios({
        method: "post",
        url: url,
        data: formdata
      })
        .then(res => {
          if (res.data.code == ERR_OK) {
            if (res.data.data.data_list.length > 0) {
              this.isWhite = true;
            }
          }
          // this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 门票分页查询
    getDataList() {
    //   let url = GIFT_URL + "service/getListByPage.action";
    //   let formdata = new FormData();
    //   formdata.append("liveId", this.myLiveID);
    //   axios({
    //     method: "post",
    //     url: url,
    //     data: formdata
    //   })
    //     .then(res => {
    //       if (res.data.resultCode == "01") {
    //         if (res.data.params.list.length > 0) {
    //             this.newTicketsNum = parseInt(res.data.params.page.total);
    //             this.ticketsNum = parseInt(res.data.params.page.total);
    //         }
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.aaa = true
            this.disabled = true
          // return false
          // let obj = filterObj(this.form)
          // let obj = this.form
          // // 格式化日期时间
          // if(obj.begin_time){
          //     obj.begin_time = setDateTime(obj.begin_time)
          // }
          // obj.user_id = getLStorage('user_id')
          // // formData 深拷贝后的对象
          // let formData = copyData(obj)
          // // 格式化数据
          // delete formData.region
          // console.log(formData)
          // console.log(formData)

          // 上传图片
            if (
            this.form.live_cover_url &&
            this.oldImg != this.form.live_cover_url
            ) {
                if (!this.no_file_upload) {
                let imgUrl = DATA_URL + "mwlive/setup/file_upload.do";
                let formdata = new FormData();
                formdata.append("file_data", this.file);
                formdata.append("user_id", getLStorage("user_id"));
                formdata.append("file_type", 1);
                let that = this;
                axios({
                    method: "post",
                    url: imgUrl,
                    data: formdata,
                    headers: { "Content-Type": "multipart/form-data" }
                })
                    .then(res => {
                    if (res.data.code == ERR_OK) {
                        console.log("img", res);
                        this.imgId = res.data.data.save_id;
                        this.form.live_cover_url = res.data.data.live_cover_url;
                        // 创建直播
                        this.subData();
                        // end 创建直播
                    }
                    })
                    .catch(function(err) {
                    that.tipsMessage("上传图片失败!", "error");
                    console.log(err);
                    });
                } else {
                this.subData();
                }
            } else {
                this.subData();
            }
          // end 上传图片
        } else {
          this.disabled = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    tipsMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type || "info"
      });
    },
    // 创建直播间
    subData() {
      this.disabled = true;
      this.aaa = true
      var isSyn = 1;
      if (!this.isSyn) {
        isSyn = 2;
      }
      if (this.form.live_text_imgs === null) {
        this.form.live_text_imgs = [];
      }
      if (this.form.begin_time === undefined || this.form.begin_time == "") {
        this.form.begin_time = "";
      } else {
        var begin_time = setDateTime(this.form.begin_time);
      }
      if (this.form.live_cover_id == "" || this.form.live_cover_id == null) {
        //this.form.live_cover_id = "817433040741592058";
        this.form.live_cover_url = this.originalImgId;
        this.form.live_cover_id = this.originalImgId;
      }
      var myMoney = this.ticketOff == 0 ? 0 : this.form.ticketMoney*10
    //   this.form.ticketMoney = this.ticketOff == 0 ? 0 : this.form.ticketMoney*10;
      let dataParams = {
        user_id: getLStorage("user_id"),
        live_name: this.form.live_name,
        begin_time: begin_time,
        live_cover_id: this.imgId || this.form.live_cover_id,
        live_cover_url: this.form.live_cover_url,
        live_permit: this.form.live_permit,
        live_text_imgs: this.form.live_text_imgs,
        isSyn: isSyn,
        live_text:this.form.live_text,
        ticket_price:myMoney
      };
      if (this.form.live_permit == "1") {
        dataParams.view_pass = this.view_pass1;
      } else if (this.form.live_permit == "2") {
        dataParams.view_pass = this.view_pass2 * 10;
      } else {
        dataParams.view_pass = "";
      }
      // dataParams.live_text_imgs = [{
      //         "img_id":"",
      //         "img_url":"",
      //         "contentDesc":formData.live_text
      // }]
      dataParams.live_text_imgs = JSON.stringify(dataParams.live_text_imgs);
    //   console.log(this.form.limitNum)
    //   console.log("dataParams", dataParams, this.imgId);
      // 过滤空参数
      // console.log(filterObj(dataParams))
      // let formdata = new FormData()
      // formdata.append('user_id',getLStorage('user_id'))
      // formdata.append('live_name',formData.live_name)
      // formdata.append('begin_time',formData.begin_time)1178309224502803516
      console.log(dataParams);
      let url;
      if (getLStorage("editID")) {
        dataParams.id = getLStorage("editID");
        if (this.form.limitNum == '' || this.form.limitNum == null || this.form.limitNum  == undefined || !this.form.limitNum) {
            dataParams.onlineCount = '-1';
        }else{
            dataParams.onlineCount = this.form.limitNum;
        }
        url = DATA_URL + "mwlive/live/edit_info.do";
      } else {
        url = DATA_URL + "mwlive/live/create.do";
        dataParams["live_source"] = "MVLIVE";
        dataParams.onlineCount = this.form.limitNum
      }
      let that = this;
      $.ajax({
        type: "POST",
        timeout: 120000, //超时时间设置，单位毫秒
        async: false,
        url: url,
        data: dataParams,
        dataType: "json",
        success: function(data) {
          console.log("here" + data.code);
          if (data.code == ERR_OK) {
              that.singleData = data.data;
            that.disabled = false;
            this.aaa = false;
            // 创建直播调接口
            if (data.data.live_id) {
              that.newliveID = data.data.live_id;
            } else {
              that.newliveID = that.myLiveID;
            }
            if (that.form.live_permit == "4" && that.isWhite == false) {
              // 导入白名单
              that.importWhiteList();
            } else if (that.form.live_permit == "3") {
              // 生成门票
              that.createtickets();
            } else {
            //  debugger
              that.tipsMessage("保存成功!", "success");
              if(that.editType=="1"){
                that.$router.push({
                path: "/yunbo"
              });
              }
              else{
                that.$router.push({
                path: "/main"
              });
              }
              
            }
            let  params1 = {
                    cmd:'lb',
                    liveID:that.newliveID,
                    user_id: getLStorage("user_id"),
                    tr_type:'',
                    video_type:'0',
                    }
                axios
                .post(LIVE_URL + "dispatcher.action", params1
                )
                .then(response => {
                    console.log(response)
                })
            delLStorage("editID");
          } else {
            that.tipsMessage("保存失败!", "error");
            if(that.editType=="1"){
                that.$router.push({
                path: "/yunbo"
              });
              }
              else{
                that.$router.push({
                path: "/main"
              });
              }
          }
          that.disabled = false;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          this.tipsMessage("保存失败!", "error");
          this.$router.push({
            path: "/main"
          });
          console.log(err);
        }
      });
      // axios({
      //     method: 'post',
      //     url: url,
      //     params: dataParams
      // })
      // .then((response) => {
      //     if(response.data.code == ERR_OK){
      //         this.disabled = false
      //         // 创建直播调接口
      //         if(response.data.data.live_id){
      //             this.newliveID = response.data.data.live_id
      //         } else{
      //             this.newliveID = this.myLiveID
      //         }
      //         if(this.form.live_permit =='4'&&this.isWhite == false){
      //             // 导入白名单
      //             this.importWhiteList()
      //         }else if(this.form.live_permit == '3'){
      //             // 生成门票
      //             this.createtickets()
      //         }else{
      //             this.tipsMessage('保存成功!','success')
      //             this.$router.push({
      //                 path:'/main'
      //             })
      //         }
      //         delLStorage('editID')
      //     }else{
      //         this.tipsMessage('保存失败!','error')
      //         this.$router.push({
      //             path:'/main'
      //         })
      //     }
      //     this.disabled = false
      // }).catch((err)=>{
      //     this.tipsMessage('保存失败!','error')
      //     this.$router.push({
      //         path:'/main'
      //     })
      //     console.log(err);
      // })
    },
    createtickets() {
      // 创建成功/生成门票
      if (this.ticketsNum == this.newTicketsNum && this.newTicketsNum !='' && this.newTicketsNum != undefined && this.newTicketsNum != null) {
        //   this.disabled = false;
            this.tipsMessage("保存成功!", "success");
            if(this.editType=="1"){
                this.$router.push({
                path: "/yunbo"
                });
            }
            else{
                this.$router.push({
                path: "/main"
                });
            }
          return
      }
    //   let obj = {
    //       liveID:this.newliveID,
    //       qualify:this.isQualify
    //   }
    //   let num ;
    //   axios({
    //         method:'post',
    //         url:GIFT_URL +'service/showCode.action',
    //         params:obj
    //   }).then((re)=>{
    //       if (re.data.resultCode == '01') {
    //           num = Number(re.data.params.useCode)
    //         if (num > this.ticketsNum) {
    //             this.aaa = false;
    //             // this.$message(new Error('可使用门票数不能少于门票总数'))
    //             this.tipsMessage("可使用门票数不能少于门票总数!", "error");
    //             return
    //         }
            let createCodeParams = {
                liveID: this.newliveID,
                number: this.ticketsNum,
                type: 1
            };
            axios({
                method: "post",
                url: GIFT_URL + "service/createCode.action",
                params: createCodeParams
            })
                .then(response => {
                if (response.data.resultCode == "01") {
                    // this.disabled = false;
                    let linkDate = {};
                    // this.tipsMessage("保存成功,门票生成成功!", "success");
                    if(this.editType=="1"){
                        this.$router.push({
                        path: "/yunbo"
                    });
                    //   this.$emit('dialShow',linkDate)
                    rootBus.$emit('dialShow1',this.newliveID);
                    // this.$emit('dialShow1',this.newliveID)
                    }
                    else{
                        this.$router.push({
                        path: "/main",
                        params:{
                            name:'name',
                        }
                    });
                    this.$emit('dialShow',this.newliveID)
                    }
                }
                })
                .catch(err => {
                this.tipsMessage("保存成功，门票生成失败!", "error");
                if(this.editType=="1"){
                        this.$router.push({
                        path: "/yunbo"
                    });
                    }
                    else{
                        this.$router.push({
                        path: "/main"
                    });
                    }
                });
                // }
        // })
    
    
      
    },
    // 导入白名单
    importWhiteList() {
      let _this = this;
      var form = new FormData();
      form.append("excelFile", _this.fileXls);
      axios
        .post(
          DATA_URL +
            "mwlive/user/import_WhiteList.do?live_id=" +
            _this.newliveID,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          if (res.data.code == ERR_OK) {
            _this.tipsMessage("保存成功，导入成功!", "success");
            if(this.editType=="1"){
                _this.$router.push({
                path: "/yunbo"
              });
              }
              else{
                _this.$router.push({
                path: "/main"
              });
              }
          } else {
            _this.fileName = "";
            _this.tipsMessage("导入白名单失败!", "error");
            if(this.editType=="1"){
                _this.$router.push({
                path: "/yunbo"
              });
              }
              else{
                _this.$router.push({
                path: "/main"
              });
              }
          }
        })
        .catch(function(err) {
          _this.fileName = "";
          _this.tipsMessage("保存失败!", "error");
        });
    },
    resetForm() {
      delLStorage("editID");
      this.$router.back(-1);
      // this.$router.push({
      //     path:'/main'
      // })
    },
    // regionVal(){
    //     if(this.form.region === 'encryption'){
    //         this.regionMode = true;
    //     }else{
    //         this.regionMode = false;
    //     }
    // },
    // image upload
    handleAvatarSuccess(res, file) {
      this.form.live_cover_id = URL.createObjectURL(file.raw);
      // 图片 url
      // console.log(this.form.live_cover_id);
    },
    addDomain() {
      this.form.live_text_imgs.push({
        value: ""
        // key: Date.now()
      });
    },
    addText(){
      //  this.txt_flag = true;
      this.form.live_text_imgs.push({
          contentDesc:''
      })
      console.log(this.form.live_text_imgs)
    },
    fileFunc(file, fileList) {
      let imgtype = file.raw.type;
      const isJPG =
        imgtype === "image/jpeg" ||
        imgtype === "image/png" ||
        imgtype === "image/jpg";

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.tipsMessage("上传头像图片只能是 JPG、PNG、JPEG 格式!", "error");
        return false;
      }
      if (!isLt2M) {
        this.tipsMessage("上传图片大小不能超过 2MB!", "error");
        return false;
      }
      // this.file = file.raw

      // let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'

      try {
        if (this.form.live_text_imgs.length >= 10) {
          this.tipsMessage("简介图文最多添加10张！", "error");
          return false;
        }
      } catch (e) {
        console.log(e.name + ": " + e.message);
      }

      var img_url = file.url;
      var img = new Image();
      img.src = img_url;
      var img_width;
      var img_height;
      img.onload = function() {
        img_width = img.width / 2;
        img_height = img.height / 2;
      };

      let formdata = new FormData();
      formdata.append("file_data", file.raw);
      formdata.append("user_id", getLStorage("user_id"));
      formdata.append("file_type", 1);

      var that = this;
      axiosData(formdata, DATA_URL + "mwlive/setup/file_upload.do").then(
        res => {
          if (res.data.code == ERR_OK) {
            console.log(res.data.data.show_url);
            if (!that.form.live_text_imgs) {
              that.form.live_text_imgs = [];
            }
            that.form.live_text_imgs.push({
              show_url: res.data.data.show_url,
              save_id: res.data.data.save_id,
              width: img_width,
              height: img_height
            });
            // that.addDomain()
            console.log(that.form.live_text_imgs);
          } else {
            that.tipsMessage("上传失败", "error");
          }
        }
      );
    },
    changeXls(file, fileList) {
      //保存导入表格数据fileXls
      let _this = this;
      var fileName = file.raw.name;
      var index = fileName.lastIndexOf(".");
      var suffix = fileName.substr(index);
      if (suffix != ".xls" && suffix != ".xlsx") {
        return false;
        _this.tipsMessage("导入名单格式有误，请下载模板重新导入", "error");
        _this.fileName = "";
      } else {
        _this.white_list = true;
        _this.fileName = fileName.replace(
          /^(^.{18})(.+)(.{4}\.+\w+$)$/g,
          "$1...$3"
        );
        _this.isWhite = false;
        _this.fileXls = file.raw;
        // _this.importfPhone()
      }
    },
    importfPhone(obj) {
      let _this = this;
      var form = new FormData();
      form.append("excelFile", _this.fileXls);
      axios
        .post(
          DATA_URL +
            "mwlive/user/import_WhiteList.do?live_id=" +
            _this.myLiveID,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          if (res.data.code == ERR_OK) {
            _this.tipsMessage("导入成功!", "success");
          } else {
            _this.fileName = "";
            _this.tipsMessage("导入失败!", "error");
          }
        })
        .catch(function(err) {
          _this.fileName = "";
          _this.tipsMessage("导入失败!", "error");
        });
    },
    deleteList(file, index) {
      // delete this.dynamicValidateForm.domains[index]
      // delete this.fileList[index]
      this.form.live_text_imgs.splice(index, 1);
      // this.fileList.splice(index, 1)
      console.log("this.fileList", this.form.live_text_imgs);
    },
    coverFileFunc(file) {
      let imgtype = file.raw.type;
      const isJPG =
        imgtype === "image/gif" ||
        imgtype === "image/png" ||
        imgtype === "image/jpg" ||
        imgtype === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      if (!isJPG) {
        this.tipsMessage("上传封面只能是 JPG、PNG、GIF 格式!", "error");
        return false;
      }
      if (!isLt2M) {
        this.tipsMessage("上传封面大小不能超过 2MB!", "error");
        // this.$message.error('上传头像图片大小不能超过 2MB!')
        return false;
      }
      this.file = file.raw;
      this.form.live_cover_url = file.url;
      // return isJPG && isLt2M;
    },
    beforeAvatarUpload(file, index) {
      // alert(index)
      // console.log(file)
      // this.file = file
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG、PNG、JPEG 格式!');
      // }
      // if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    deleteAvatar(event) {
      this.form.live_cover_url = "";
      // 阻止事件冒泡
      event.cancelBubble = true;
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
              this.originalImgId = res.data.data[0].coverImgId;
              console.log(_this.coverImgList);
            }
          }
        })
        .catch(err => {
          this.disabledAdd = false;
        });

      axios
          .get(DATA_URL + "mwlive/user/get_userinfo.do", {
            params: {
              id: getLStorage("user_id")
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
    // 选择自定义封面
    submitCheckList() {
      if (this.checkCover) {
        // 封面地址
        this.form.live_cover_url = document.getElementById(this.checkCover).src;
        this.form.live_cover_id = document
          .getElementById(this.checkCover)
          .getAttribute("data-id");
        this.CoverlistDialog = false;
        this.no_file_upload = true;
      } else {
        this.no_file_upload = false;
      }
    },
    openChangeIMG() {
      this.CoverlistDialog = true;
      this.checkCover = "";
    }
  },
  watch: {
    live_permit(val) {
      // console.log(val)
      if (val == 1) {
        this.permit_title = "观看密码：";
        this.regionMode1 = true;
        this.regionMode2 = false;
        this.regionMode3 = false;
        this.regionMode4 = false;
      } else if (val == 2) {
        this.permit_title = "付费金额：";
        this.regionMode1 = false;
        this.regionMode2 = true;
        this.regionMode3 = false;
        this.regionMode4 = false;
        // this.$confirm("开通第三方授权后，如需使用付费内容，请联系商务开通微信支付，未开通前用户无法使用付费内容。", {
        //   confirmButtonText: "商务洽谈",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        // .then(() => {
        //  // this.centerDialogVisible2=true;
        //  return
        // })
        // .catch(() => {
        // });
      } else if (val == 4) {
        this.permit_title = "专属名单：";
        this.regionMode1 = false;
        this.regionMode2 = false;
        this.regionMode3 = false;
        this.regionMode4 = true;
      } else if (val == 3) {
        this.permit_title = "门票数量：";
        this.regionMode1 = false;
        this.regionMode2 = false;
        this.regionMode3 = true;
        this.regionMode4 = false;
      } else {
        this.regionMode1 = false;
        this.regionMode2 = false;
        this.regionMode3 = false;
        this.regionMode4 = false;
      }
    }
  },
  computed: {
    live_permit() {
      return this.form.live_permit;
    },
    timeDefaultShow: function(val) {
      var date = new Date(),
        Y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      var t = Y + "-" + m + "-" + d + " " + "23:59:59";
      return t;
    },
    // isQualify:{
    //     get(){
    //        return rootBus.myQualify;
    //     },
    //     set(){
    //        return rootBus.myQualify;
    //     }
    // }
  },
  components: {
    MHeader,
    LeftNav,
    mFooter
  }
};
</script>

<style scoped>
.default_shadow {
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
}
.newList-top {
  border-bottom: 1px solid #eaeaea;
  font-size: 16px;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-textarea__inner {
  resize: none;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.uploaderTips {
  width: 500px;
  height: 280px;
  border: 1px solid #d9d9d9;
  text-align: center;
  background: #f5f5f5;
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
  color: #cccccc;
  line-height: 20px;
}
.avatar-uploader-icon:before {
  display: inline-block;
  width: 71px;
  height: 64px;
  margin: 80px auto 8px auto;
  background: url(../../common/image/icon_img.png) no-repeat;
  content: "";
}
.newList-main {
  /* height: 0; */
}
.newList-main.none {
  display: none;
}
.newlivedata .el-form-item.is-required {
  display: inline-block;
}
.newlivedata .el-form-item.is-required,
.img-file,
.img-file-list {
  width: 500px;
  /* margin: 10px 10px 10px 0; */
  margin-bottom: 8px;
}
.img-file {
  height: 280px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
}

.upload-img {
  /* max-width:500px;
    max-height:280px; */
  width: 100%;
  height: 100%;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-icon-circle-close {
  right: -8px;
  top: -8px;
  font-size: 19px;
  color: #ff467f;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #fff;
  z-index: 1;
}
.el-icon-circle-close:before {
  content: "\e62c";
}

.upload-button {
  color: #666;
  display: inline-block;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  padding: 15px 50px;
}
.pre_img {
  position: relative;
  width: 500px;
}
.pre_img .icon_delete {
  position: absolute;
}
.newList-list .form_box {
  padding: 40px 0 0 0;
}
.my_section .form_bot .te-c {
  border-top: 1px solid #f2f2f2;
  margin: 0 36px;
  padding: 30px 0;
}
.green_txt {
  margin-right: 20px;
}
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
  border-radius: 2px;
}
.newList-list .text_tip {
  right: 0px;
  top: -30px;
  left: 110px;
  width: 100px;
  text-align: left;
}
.date_placeholder{
  position: absolute;
  left:11px;
  z-index: 999;
  color:#c0c4cc;
  font-size: 12px;
}
</style>
<style>
.newList-list .el-button.btn_120 {
  width: 120px;
  padding: 0;
}
.newlive-test .el-textarea__inner {
  height: 100px;
}
.newlive-test .el-form-item__content {
  margin-left: 0px !important;
}
/* .livePermit .el-form-item__error{
    top:80px;
} */
.no_padding .el-dialog__body {
  padding: 2px 0 20px 0;
  height: 313px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 762px;
}
.img_list .footnote {
  position: relative;
  height: 204px;
  box-sizing: border-box;
}
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
  border-radius: 2px;
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

.newList-list .el-icon-time:before {
  content: "\E60B";
  color: #4a4a4a;
}
.newList-list .el-date-editor--datetime .el-input__prefix {
  left: 472px;
}
.newList-list .el-date-editor--datetime.el-input--prefix .el-input__inner {
  padding-left: 10px;
}
.newList-list .el-button--info:active,
.newList-list .el-button--info:focus {
  background-color: #e5e5e5;
  color: #333333;
  border: 1px solid #cccccc;
}
.newList-list .el-button--info.btn_120:hover {
  background-color: #2B6CFF;
  border-color: #2B6CFF;
  color: #fff;
}
.newList-list .el-date-editor .el-input__suffix {
  right: -278px;
}
.my_section .el-form .input_150 .el-input__inner,
.my_section .el-form .input_150 {
  width: 150px;
}
.limitInput .el-input__inner{
  width:97px !important;
  font-size:10px;
  padding:11px;
  line-height:14px !important; 
  /* 兼容ie */
}
.p1{
    display: inline-block;
    margin-left:6px;
    color:rgba(51,51,51,1);
    font-size:14px;
}
.d1{
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
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
  border-radius: 6px ;
  text-align: left;
  color: #fff;
  padding: 17px;
  display: none;
  min-width: 230px;
  font-size: 12px;
  height: 90px;
}
.d1:hover{
  background: #2B6CFF;
}
.t11::before{
  content: '';
  position: absolute;
  border: 10px solid transparent;
  border-bottom-color: rgba(0,0,0,.7);
  top: -14%;
  left: 33px;
}
.d1:hover .t11{
  display: block;
}
.mb1{
  margin-bottom:10px;
}
.txt-w textarea.el-textarea__inner{
  min-height:120px !important;
}
.ps1{
    position: relative;
    top: -39px;
    left: 150px;
}
.cs1{
  min-height:120px;
}
.cs2{
  width:500px;
  height:120px;
}
.dialog11 .el-dialog--center .el-dialog__body{
    text-align:center;
}
.dialog11  .el-dialog__header{
    border:none;
}
.ticeOff label{
    width:92px;
}
.limitMoneny input.el-input__inner{
    height: 34px;
    width: 150px !important;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    /* color:rgba(217,217,217,1); */
}
.offMesBox{
    width:300px;
    height: 140px;;
    padding:0;
}
.offMesBox .el-message-box__header{
    padding:0;
}
.offMesBox .el-message-box__content{
    padding-top:27px;
}
.offMesBox .el-message-box__btns .el-button--small{
    width:65px;
    height: 32px;
}
.offMesBox P{
    font-size:12px;
    color:#000000;
    width:204px;
    margin:auto;
}
.offMesBox .offConfirm{
    background:rgba(255,255,255,1);
    border-radius:2px;
    border:1px solid rgba(217,217,217,1);
    color:rgba(89,89,89,1);
}
.offMesBox .offCancel{
    background:rgba(66,133,244,1);
    border-radius:2px;
    color:rgba(255,255,255,1);
    margin-right: 20px;
}
.m_l label.el-form-item__label{
    width: 96px !important;
}
.p_l .el-input{
    width:90%;
    left: -10px;
}
.newList-list .el-input__suffix .el-input__icon.el-icon-circle-close{
  background:none;
  width:24px;
}

</style>
