<template>
    <div>
      <div class="my_list securitySet" id="wxDiv" style="height: 700px;display:none">
        <div class="live-top bg-fff">授权管理<span style="color: #409EFF;margin-left: 6px;">（只可选择一种授权形式）</span></div>
        <div class="bg-fff col-333 info-content" style="margin-top: 20px;">
            <el-row class="clear pd20 securitySet-main mr-bg">
                <div class="fl img_icon"><span class="icon iconfont icon-moren icon-pic default-color"></span></div>
                <div class="fl ml30">
                    <div style="font-size:16px;color:#4A4A4A;">默认授权</div>
                    <p style="color:#9B9B9B;font-size:12px;margin-top:5px;">用户进入网页时默认为梦网云播公众号授权</p>
                </div>
                <div class="fr">
                    <el-button class="btn modifyPass small" :class="{'is-active':rightType.mr}" @click="startUp('mr','您确定要开启默认授权吗？')" id="original">已开启</el-button>
                </div>
            </el-row>
            <el-row class="clear pd20 securitySet-main gzh-bg">
                <div class="fl img_icon"><span class="icon iconfont icon-gzh icon-pic default-color"></span></div>
                <div class="fl ml30">
                    <div style="font-size:16px;color:#4A4A4A;">公众号授权</div>
                    <p style="color:#9B9B9B;font-size:12px;margin-top:5px;">绑定公众号授权后，用户进入网页时默认为绑定公众号授权</p>
                </div>
                <div class="fr">
                    <el-button class="btn modifyPass small" :class="{'is-active':rightType.gzh}"  @click="startUp('gzh','你确定要开启公众号授权？')" id="applyGZH">前往申请</el-button>
                </div>
            </el-row>
            <!-- <el-row class="clear pd20 securitySet-main yk-bg">
                <div class="fl img_icon"><span class="icon iconfont icon-yk icon-pic default-color"></span></div>
                <div class="fl ml30">
                    <div style="font-size:16px;color:#4A4A4A;">以游客身份证进入</div>
                    <p style="color:#9B9B9B;font-size:12px;margin-top:5px;">用户无需授权，即可进入网页进行浏览，以游客显示</p>
                </div>
                <div class="fr">
                    <el-button class="btn modifyPass small" :class="{'is-active':rightType.yk}"  @click="startUp('yk','你确定无需授权，以游客身份进入？')" id="visitor">启用</el-button>
                </div>
            </el-row> -->
            <!-- <el-row class="clear pd20 securitySet-main nc-bg">
                <div class="fl img_icon"><span class="icon iconfont icon-nc icon-pic default-color"></span></div>
                <div class="fl ml30">
                    <div style="font-size:16px;color:#4A4A4A;">输入昵称进入</div>
                    <p style="color:#9B9B9B;font-size:12px;margin-top:5px;">用户仅需输入昵称，即可进入网页进行浏览了</p>
                </div>
                <div class="fr">
                    <el-button class="btn modifyPass small" :class="{'is-active':rightType.nc}"  @click="startUp('nc','你确定无需授权，输入昵称进入？')" id="inputor">启用</el-button>
                </div>
            </el-row> -->
        </div>
    </div>
    <!-- centerDialogVisible2 -->
    <el-dialog
            title="商务洽谈"
            class="shareToFriend  one_wx"
            :visible.sync="centerDialogVisible2"
            width="30%">
            <hr/>
            <b>请将您的需求留言给我们</b>
            <p class="Tips1">1.提交您的需求信息，商务将在24小时内与您联系</p>
            <p class="Tips1">2.致邮：yeepo_sales@facebac.com</p>
            <el-form :model="formData" :rules="rules" ref="formData">
                <p class="Tips2"><i>*</i>您的称呼</p>
                <el-form-item prop="userName">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <p class="Tips2"><i>*</i>您的手机号码</p>
                <el-form-item prop="userTel">
                    <el-input  v-model="formData.userTel"></el-input>
                </el-form-item>
                <p class="Tips2">需求留言</p>
                <el-input type="textarea" id="message" v-model="userMessage"></el-input>
                <hr/>
                <el-button style="margin-left: 45%;" type="primary" @click="submitForm('formData','1')">提交</el-button>
            </el-form>
            </el-dialog>
    <div class="rechargeRecord my_list" id="wxTips" style="height: 700px;">
        <div class="live-top bg-fff">授权管理</div>
        <div class="bg-fff">
            <el-row>
                <el-col :span="10">
                    <el-button type="primary" @click="chatWith">商务洽谈</el-button>
                    <div class="Tips3">
                        <p class="Tipp1">授权管理说明：</p>
                        <p class="Tipp2">支持观众使用第三方账号登录时，将显示您定制的</p>
                        <p class="Tipp2">品牌信息等。</p>
                    </div>
                </el-col>
                <el-col :span="11" class="exampleImg">
                    <span>例子:</span>
                    <img src="../../common/image/wxRight.png"/>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            title="商务洽谈"
            class="shareToFriend two_wx"
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
                <el-button style="margin-left: 45%;" type="primary" @click="submitForm('formData','2')">提交</el-button>
            </el-form>
            </el-dialog>
    </div>
    </div>
</template>
<script>
import VHeader from "@/components/header/header";
import VFooter from "@/components/header/footer";
import { setCookie, getCookie, removeCookie,getCookies,DATA_URL,getLStorage } from "../../api/config";
import axios from "axios";
import Bus from '../bus.js'
export default {
  name: "operate",
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
      msg: "视频播放",
      centerDialogVisible2:false,
      playType: "lplay",
      tkInfo: getCookies("token"),
      playStates: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "livePlay",
          label: "直播"
        },
        {
          value: "previewPlay",
          label: "预告"
        },
        {
          value: "endPlay",
          label: "结束"
        }
      ],
      value2: "",
      rightType: { mr: true, gzh: false, yk: false, nc: false },
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
  components: {
    VHeader,
    VFooter
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
    submitForm(name,id) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var url = DATA_URL + "mwlive/user/addBusinessService.do";

          let formdata = new FormData();
          formdata.append("user_id", getLStorage("user_id"));
          formdata.append("user_name", this.formData.userName);
          formdata.append("mobile", this.formData.userTel);
          formdata.append("service_source", "portal后台-授权管理");
          formdata.append("demand_mess", this.userMessage);
          

          let params_new = new FormData();
          params_new.append("user_id", getLStorage("user_id"));
          params_new.append("user_name", this.formData.userName);
          params_new.append("mobile", this.formData.userTel);
          params_new.append("service_source", "portal后台-微信支付");
          params_new.append("demand_mess", this.userMessage);
          // let params_new = {
          //     'user_id':getLStorage("user_id"),
          //     "user_name": this.formData.userName,
          //     "mobile": this.formData.userTel,
          //     "service_source": "portal后台-微信支付",
          //     "demand_mess": this.userMessage
          // }
          let params_1 = new FormData();
          params_1 = id == '1' ? params_new : formdata;
          axios({
            method: "post",
            url: url,
            data: params_1
          })
            .then(res => {
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
                this.centerDialogVisible2 = false;
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
    getRight(){
        var url = DATA_URL + "mwlive/user/selectUserSpecialServiceByID.do";
          let formdata = new FormData();
          formdata.append("user_id", getLStorage("user_id"));
          formdata.append("type", "1");
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
                    //    res.data.data[0].end_time = 1537437642000;
                    //    timestamp = 1537437642000;
                      if(res.data.data[0].end_time==0||res.data.data[0].end_time/1000-Number(timestamp)/1000>0){
                          $("#wxDiv").show();
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
    startUp(type, msg) {
      if (type == "gzh") {
        // this.$confirm("开通第三方授权后，如需使用付费内容，请联系商务开通微信支付，未开通前用户无法使用付费内容。", {
        //   confirmButtonText: "商务洽谈",
        //   cancelButtonText: "继续开通",
        //   type: "warning"
        // })
        // .then(() => {
          this.centerDialogVisible2=true;
        // })
        // .catch(() => {
          this.$router.push({ path: "/mainPage/gzhRight2" });
          return;
        // });
        
      } else {
        this.$confirm(msg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var result = "操作成功";
            if (type == "mr") {
              result = "成功申请默认授权";
              Bus.$emit('update',false)
              $("#original").html("已开启");
              $("#applyGZH").html("开启");
              $("#visitor").html("开启");
              this.rightType.mr=true;
              this.rightType.gzh=false;
              this.rightType.yk=false;
              var params = { token: this.tkInfo, type: "0" };
              this.$ajaxs.setAuthorization(params).then(data => {
                if (data.code == "1") {
                  this.$message({
                    showClose: true,
                    type: "success",
                    message: "默认授权成功!"
                  });
                  this.getData();
                } else {
                  this.$message({
                    showClose: true,
                    type: "error",
                    message: "修改失败："+data.msg
                  });
                }
              });
            } else if (type == "gzh") {
              result = "成功开启公众号授权";
              Bus.$emit('update',true)
              $("#applyGZH").html("已开启");
              $("#original").html("开启");
              $("#visitor").html("开启");
              this.rightType.mr=false;
              this.rightType.gzh=true;
              this.rightType.yk=false;
            } else if (type == "yk") {
              result = "成功开启游客身份进入";
              $("#visitor").html("已开启");
              $("#applyGZH").html("开启");
              $("#original").html("开启");
              this.rightType.mr=true;
              this.rightType.gzh=false;
              this.rightType.yk=false;
            } else if (type == "nc") {
              result = "成功开启昵称输入进入";
            }
            this.$message({
              type: "success",
              message: result
            });
          })
          .catch(() => {});
      }
    },
    getData(){
      if (this.tkInfo == null) {
      this.$message({
        showClose: true,
        type: "error",
        message: "登陆失效！"
      });
      // this.$router.push({
      //   path: "/login"
      // });
    }
    var params={token:this.tkInfo};
    this.$ajaxs.getUserAccredit(params).then(data => {
      console.log("公众号授权"+JSON.stringify(data));
      if (data.code == "1") {
        switch(data.result.user_Accredit_type){
          case 0:
          this.rightType.mr=true;
          this.rightType.gzh=false;
        $("#original").html("已开启");
        $("#applyGZH").html("开启");
        $("#visitor").html("开启");
        break;
        case 1:
        this.rightType.gzh=true;
        this.rightType.mr=false;
        $("#applyGZH").html("已开启");
        $("#original").html("开启");
        $("#visitor").html("开启");
        break;
        case 2:
        this.rightType.yk=true;
        $("#visitor").html("已开启");
        $("#applyGZH").html("开启");
        $("#original").html("开启");
        break;
        case 3:
        this.rightType.nc=true;
        $("#inputor").html("已开启");
        break;
        }
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: data.msg
        });
      }
    })
    }
  },
  created() {
    this.getRight();
    this.getData();
  },
  mounted() {
    $("#mainHeader").addClass("router-link-active");
    console.log("1");
    var Acode = this.$route.query.code; //code的参数值
    if (Acode == null || Acode == undefined) {
      console.log("2"+Acode);
      return;
    }
  //  debugger
    console.log("3"+Acode);
    var params = { token: this.tkInfo, code: Acode };
    this.$ajaxs.getWxCode(params).then(data => {
      console.log(4+data);
      if (data.code == "1") {
        this.$message({
          showClose: true,
          type: "success",
          message: "授权成功!"
        });
        this.rightType.gzh=true;
        this.rightType.mr=false;
        $("#applyGZH").html("已开启");
        $("#original").html("开启");
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: data.msg
        });
      }
    });
  }
};
</script>
<style scoped>
.icon.iconfont.icon-pic:before {
  display: inline-block;
  width: 66px;
  height: 66px;
  content: "";
}
.icon.iconfont.icon-moren:before {
  background: url(../../common/image/icon_mr@2x.png) no-repeat;
}
.icon.iconfont.icon-gzh:before {
  background: url(../../common/image/icon_gzh@2x.png) no-repeat;
}
.icon.iconfont.icon-yk:before {
  background: url(../../common/image/icon_yk@2x.png) no-repeat;
}
.icon.iconfont.icon-nc:before {
  background: url(../../common/image/icon_nc@2x.png) no-repeat;
}
.mr-bg:hover{
  background: #ecf6ff;
}
.gzh-bg:hover {
  background: #f6feec;
}
.yk-bg:hover {
  background: #fffbee;
}
.nc-bg:hover {
  background: #fcefee;
}
.modifyPass {
  color: #4a4a4a;
  background: #fff;
}
.modifyPass.is-active {
  background: #34a853;
  color: #fff;
}
.default-bg .securitySet .btn {
  margin-top: 23px;
}
.pd20{
    border: 1px solid #e5e5e5;
    margin-top: 10px;
}
.exampleImg img{
    height: 427px;
    width: 240px;
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

