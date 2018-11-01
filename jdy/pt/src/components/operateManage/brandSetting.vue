<template>
    <div>
        <div class="setBrand" id="brandDiv" style="display:none;">
        <div id="Url" style="min-height:670px;">
        <div class="live-top bg-fff clear">
            <div class="fl">
                品牌设置
            </div>   
            <!-- <div class="fr">
                <el-button class="clearbtn">清空</el-button>
            </div>           -->
        </div>
        <div class="bg-fff table_form">
            <div class="content_section">
                <div class="title">观看端品牌 </div>
                <div class="content">
                    <el-row class="item">
                        <el-col :span="6" style="width: 300px;height:70px">
                            <img src="../../common/image/brandSetting1.png" class="showImg1"/>
                            <img :src="image1" v-if="image1!=''" class="showBrandImg"/>
                            <img src="../../common/image/logoBrand.png" v-if="image1==''" class="showBrandImg"/>
                        </el-col>
                        <el-col :span="6" class="Tips">
                            <p>图片大小：2M以内</p>
                            <p>建议尺寸：128*45 256*90</p>
                            <p>支持格式：PNG、JPG、JPGE、GIF</p>
                        </el-col>
                        <el-col :span="5">
                            <upload-img  v-on:updateImg="getImgUrl1" class="uploadImg"></upload-img>
                        </el-col>
                    </el-row>
                </div>                              
            </div> 
            <div class="content_section">
                <div class="title">后台页面品牌Logo </div>
                <div class="content">
                    <el-row class="item">
                        <el-col :span="6"  style="width: 300px;height:70px">
                            <img src="../../common/image/brandSetting2.png" class="showImg2"/>
                            <img :src="image2" v-if="image2!=''" class="showBrandImg2"/>
                            <img src="../../common/image/logo_icon.png" v-if="image2==''" class="showBrandImg2"/>
                        </el-col>
                        <el-col :span="6" class="Tips">
                            <p>图片大小：2M以内</p>
                            <p>建议尺寸：128*45 256*90</p>
                            <p>支持格式：PNG、JPG、JPGE、GIF</p>
                        </el-col>
                        <el-col :span="5">
                            <upload-img  v-on:updateImg="getImgUrl2" class="uploadImg"></upload-img>
                        </el-col>
                    </el-row>
                </div>                 
            </div>
            <div class="content_section">
                <div class="title">浏览器icon </div>
                <div class="content">
                    <el-row class="item">
                        <el-col :span="6"  style="width: 300px;height:70px">
                            <img src="../../common/image/brandSetting3.png" class="showImg3"/>
                            <img :src="image3" v-if="image3!=''" class="showBrandImg3"/>
                            <img src="../../common/image/logo_icon.png" v-if="image3==''" class="showBrandImg3"/>
                        </el-col>
                        <el-col :span="6" class="Tips">
                            <p>图片大小：2M以内</p>
                            <p>建议尺寸：16*16 32*32</p>
                            <p>支持格式：ICO</p>
                        </el-col>
                        <el-col :span="5">
                            <upload-img  v-on:updateImg="getImgUrl3" class="uploadImg"></upload-img>
                        </el-col>
                    </el-row>
                </div>                 
            </div>  
            <!-- <el-row style="text-align: center;">
                <el-button type="primary">确定</el-button>
            </el-row> -->
        </div>
        </div>
        </div>
    <div class="rechargeRecord my_list" id="wxTips" style="height: 700px;">
        <div class="live-top bg-fff">品牌设置</div>
        <div class="bg-fff">
            <el-row>
                <el-col :span="10">
                    <el-button type="primary" @click="chatWith">商务洽谈</el-button>
                    <div class="Tips3">
                        <p class="Tipp1">品牌设置说明：</p>
                        <p class="Tipp2">您可以配置网站内相关的品牌标识，如后台LOGO、 </p>
                        <p class="Tipp2">观看页LOGO等</p>
                    </div>
                </el-col>
                <el-col :span="11" class="exampleImg">
                    <span>例子:</span>
                    <img src="../../common/image/brandRight.png"/>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            title="商务洽谈"
            class="shareToFriend"
            :visible.sync="centerDialogVisible"
            width="30%">
            <hr/>
            <b>请将您的需求留言给我们</b>
            <p class="Tips1">1.提交您的需求信息，商务将在24小时内与您联系</p>
            <p class="Tips1">2.致邮：yeepo_sales@facebac.com</p>
            <el-form :model="formData" :rules="rules" ref="formData">
                <p class="Tips2"><i class="t_red">*</i>您的称呼</p>
                <el-form-item prop="userName">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <p class="Tips2"><i class="t_red">*</i>您的手机号码</p>
                <el-form-item prop="userTel">
                    <el-input  v-model="formData.userTel"></el-input>
                </el-form-item>
                <p class="Tips2">需求留言</p>
                <el-input type="textarea" id="message" v-model="userMessage"></el-input>
                <hr/>
                <el-button style="margin-left: 45%;" type="primary" @click="submitForm('formData')">提交</el-button>
            </el-form>
            </el-dialog>
    </div>
    </div>
</template>
<style scoped>
.default-bg .el-button--default{
    /* color: #EA4335;
    border: 1px solid #EA4335; */
}
/* .item img{
    padding: 5px;
    background: #F5F5F5;
    border: 1px dashed #cccccc;

} */
.showBrandImg{
        height: 45px;
    width: 128px;
    position: relative;
    top: -62px;
    left: 20px;
}
.showBrandImg2{
        height: 51px;
    width: 51px;
    top: -65px;
    position: relative;
    left: 20px;
    
}
.showBrandImg3{
         height: 21px;
    width: 21px;
    position: relative;
    top: -49px;
    left: 23px;
}
.Tips{
    margin-left: 50px;
}
.Tips p{
        color: #9B9B9B;
    font-size: 12px;
    margin-top: 5px;
}
.uploadImg{
    margin-top: 10px;
}
.setBrand {
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
}
.fl {
  font-family: "Microsoft YaHei" !important;
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}
#Url .item span {
  margin-right: 8px;
}
#Url .my_input {
  width: 700px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #e5e5e5;
  background-color: #f5f5f5;
  padding: 0 10px;
  border-radius: 2px;
  color: #9b9b9b;
}
#Url .content {
  padding: 30px 0 30px 20px;
}
#Url .btn {
  width: 70px;
  height: 34px;
  line-height: 34px;
  margin-left: 8px;
}
#Url .btn_cc {
  border: 1px solid #d9d9d9;
  color: #333333;
  background-color: #e5e5e5;
}
.live-top {
  margin-bottom: 20px;
  padding: 0px;
  padding-bottom: 20px;
}
.live-top,
.my_section .section_title {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 20px;
  font-family: "Microsoft YaHei" !important;
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}
.elradio {
  margin-left: 30px;
}
.elradio i {
  color: #ea4335;
  font-style: normal;
  margin-left: 10px;
}
.elradio2 {
  padding-left: 100px;
}
.exampleImg img{
        height: 284px;
    width: 370px;
        margin-left: 40px;
}
.exampleImg span{
        top: 0px;
    position: absolute;
}
.Tips3{
    margin-top: 24px;
}
.Tips3 p{
    margin-top: 10px;
    font-size: 14px;
}
.Tipp1{
    color: #333333;
    font-weight: 600;
}
.Tipp2{
    color: #9b9b9b;
}
.dilatationImg {
  height: 100px;
}
.imgDiv {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 20px;
}
.Info {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 2px;
}
.Info p {
  margin-top: 10px;
}
.Info i {
  color: #4285f4;
  font-style: normal;
}
.Tips1 {
  font-size: 14px;
  color: #9b9b9b;
  margin-top: 10px;
}
.Tips2 {
  font-size: 14px;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 12px;
}
.Tips2 i {
  color: #ff467f;
  margin-right: 5px;
}
#message {
  height: 120px;
}
</style>



<script>
import UploadImg from "@/components/mainPage/uploadImg";
import {
  ERR_OK,
  GIFT_URL,
  DATA_URL,
  getLStorage,
  PAGE_SIZE,
  MW_Live_API_URL,getCookies,telSplit
} from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
      let PhoneExp = /^[18][34567890]\d{9}$/;
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入您的称呼"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入您的手机号码"));
      } else if (!PhoneExp.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      userID: getLStorage("userId"),
      tkInfo:getCookies("token"),
      image1:"",
      image2:"",
      image3:"",
      centerDialogVisible: false,
      formData: {
        userName: getLStorage("admin"),
        userTel: getLStorage("mobile")
      },
      userMessage: "",
      rules: {
        userName: [{ validator: checkName, trigger: "blur" }],
        userTel: [{ validator: checkPhone, trigger: "blur" }]
      },
      flag:0
    };
  },
  components:{
      UploadImg
  },
  created() {
      this.getRight();
      this.getData();
  },
  mounted(){
      $("#mainHeader").addClass("router-link-active");
  },
  methods: {
      chatWith(){
          if(this.flag>0){
        this.$alert('尊敬的客户，您好，您的申请已提交,请保持电话畅通，商务人员将在24小时内与您联系。',  {
          confirmButtonText: '确定',
          center: true,
          callback: action => {
          }
        }); 
      }
      else{
        this.centerDialogVisible=true;
      }
          
      },
      submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var url = DATA_URL + "mwlive/user/addBusinessService.do";
          let formdata = new FormData();
          formdata.append("user_id", getLStorage("user_id"));
          formdata.append("user_name", this.formData.userName);
          formdata.append("mobile", this.formData.userTel);
          formdata.append("service_source", "portal后台-品牌定制");
          formdata.append("demand_mess", this.userMessage);
          axios({
            method: "post",
            url: url,
            data: formdata
          })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                this.formData.userName = "";
                this.formData.userTel = "";
                this.userMessage = "";
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "感谢您的留言"
                });
                this.centerDialogVisible = false;
                this.flag++;
              } else {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: "留言失败" + res
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     getTimeShow(time_str){
            //debugger;
            var now = new Date();
            var date = new Date(time_str);
            //计算时间间隔，单位为分钟
            var inter = parseInt((now.getTime() - date.getTime())/1000/60);
            if(inter == 0){
                return "刚刚";
            }
            //多少分钟前
            else if(inter < 60){
                return inter;
            }
            //多少小时前
            else if(inter < 60*24){
                return parseInt(inter/60);
            }
            //本年度内，日期不同，取日期+时间  格式如  06-13 22:11
            else if(now.getFullYear() == date.getFullYear()){
                return (date.getMonth()+1).toString() + "-" +
                    date.getDate().toString() + " " + 
                    date.getHours() + ":" +
                    date.getMinutes();
            }
            else{
                return date.getFullYear().toString().substring(2, 3) + "-" +
                (date.getMonth()+1).toString() + "-" + 
                date.getDate().toString() + " " + 
                date.getHours() + ":" +
                date.getMinutes();
            }
        },
    getRight(){
        var url = DATA_URL + "mwlive/user/selectUserSpecialServiceByID.do";
          let formdata = new FormData();
          formdata.append("user_id", getLStorage("user_id"));
          formdata.append("type", "2");
        axios({
            method: "post",
            url: url,
            data: formdata
          })
            .then(res => {
              if (res.status == 200) {
                  if(res.data.data!=null&&res.data.data!=""&&res.data.data.length>0){
                   //   debugger
                      var timestamp = Date.parse(new Date());
                    //    timestamp = timestamp / 1000;
                       console.log(res.data.data[0].end_time/1000,Number(timestamp)>0);
                      if(res.data.data[0].end_time==0||res.data.data[0].end_time/1000-Number(timestamp)/1000>0){
                          $("#brandDiv").show();
                         $("#wxTips").hide();
                      }
                  }
                this.centerDialogVisible = false;
              } else {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: "获取授权权限失败：" + res
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
    },
      getData(){
          var paramsData={token:this.tkInfo};
          this.$ajaxs.getBrandInfo(paramsData).then(res => {
        //      console.log(res);
          if(res.code==1){
              if(res.result.look_logo_url!=null){
                  this.image1=res.result.look_logo_url;
              }
              if(res.result.portal_logo_url!=null){
                  this.image2=res.result.portal_logo_url;
              }
              if(res.result.browser_ico_url!=null){
                  this.image3=res.result.browser_ico_url;
                  this.changelogo(this.image3);
              }
          }
        })
      },
      setBrand(params){
          this.$ajaxs.setBrandInfo(params).then(res => {
          //    console.log(res);
          if(res.code==200){
        //    console.log(res);
          }
        })
      },
      changelogo(a){
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = a;//需要更改
        console.log(link);
        document.getElementsByTagName('head')[0].appendChild(link);
      },
      getImgUrl1(a) {
      console.log("上传图片路径1:" + a);
      this.image1 = a;
      var params={token:this.tkInfo,type:"0",url:a};
      this.setBrand(params);
    },
    getImgUrl2(a) {
        console.log(a);
      console.log("上传图片路径2:" + a);
      this.image2 = a;
      var params={token:this.tkInfo,type:"1",url:a};
      this.setBrand(params);
    },
    getImgUrl3(a) {
      console.log("上传图片路径3:" + a);
      this.image3 = a;
      var params={token:this.tkInfo,type:"2",url:a};
      this.setBrand(params);
      this.$message({
                    showClose: true,
                    type: "success",
                    message: "更改成功，请刷新该页面进行查看"
                });
    },
    tipsMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type || "info",
        customClass: "tips-text"
      });
    }
  }
};
</script>
<style>
.showImg1,.showImg2,.showImg3{
       width: 388px;
    height: 60px;
    padding: 5px;
    background: #F5F5F5;
    border: 1px dashed #cccccc;
}
/* .showImg2{
        width: 128px;
    height: 45px;
}
.showImg3{
        width: 64px;
    height: 64px;
} */
.Tips{
        margin-left: 0px;
}
</style>

