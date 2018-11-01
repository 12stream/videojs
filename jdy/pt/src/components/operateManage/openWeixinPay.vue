<template>
    <div class="my_list securitySet">
        <div class="live-top bg-fff" v-if="!flag">开通微信支付</div>
        <div class="live-top bg-fff" v-if="flag">微信支付</div>
        <div class="bg-fff col-333 info-content">
                <div style="width:460px;margin: 70px auto;">
                    <el-form :model="formData"  :rules="rule" label-width="135px" ref="formData">
                        <el-form-item prop="public_id" label="公众号app_id : ">
                            <el-input class="my_input inp_300" v-model="formData.public_id" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item prop="public_content" label="公众号app_secret : ">
                            <el-input class="my_input inp_300" v-model="formData.public_content" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item prop="public_number" label="商户号 : ">
                            <el-input class="my_input inp_300" v-model="formData.public_number" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item prop="public_stork" label="商户API密钥 : ">
                            <el-input class="my_input inp_300" v-model="formData.public_stork" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <div>
                            <el-form-item>
                                <el-button class="btn_40" type="primary" @click="startUp('formData')">确定</el-button>
                                <el-button  class="btn_40" @click="setWxpayClose">取消</el-button>
                            </el-form-item>
                            <div id="box"></div>
                        </div>
                    </el-form>
                 <div>
             </div>
            </div>
        </div>
        <!--开通微信支付账号测试 start-->
        <div v-show="weixinPay" class="mw-dialog__wrapper my_dialog test_Number">
            <div class="mw-dialog__bg"></div>
            <div class="mw-dialog">
                <div class="mw-dialog-header">
                    <span class="title">微信账号信息已保存成功，请检测绑定账号</span>
                </div>
                <div class="mw-dialog-body">
                    <div class="code" :id="'wxPay_url'">
                        <!-- <img  src="../../common/image/download_ma.png" alt=""> -->
                        <img  :src="url" alt="">
                    </div>
                    <p style="color:#333;text-align: center;font-size: 14px;">请用微信扫码，支付0.01元测试</p>
                    <div class="tishi">
                        <p><span>*</span>付成功即说明账号绑定成功； </p>
                        <p>如无法完成支付可能是账号信息填写错误，</p>
                        <p>请了解"如何开通微信支付商户账号"，修改账号信息</p>
                    </div>
                </div>
                <div class="mw-dialog-footer">
                    <el-button type="primary" @click="weixinPay=false">知道了</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { setCookie, getCookie, removeCookie,getCookies,DATA_URL,getLStorage, facebac_URL, formatDate } from "../../api/config";
import axios from "axios";
import {get_token} from '../js/comm'
export default {
  name: "",
  data() {
    let storkExp =  /[\d\w]{32}/;
    var getStork = (reslut,value,callback)=>{
          if (!value) {
            return callback(new Error('请输入商户密钥'))
          }else if (!storkExp.test(value)) {
            return callback(
              // this.$alert('商户API密钥错误，请输入32位的密钥',  {
              // confirmButtonText: '知道了',
              // center: true,
              //   })
              new Error('商户API密钥错误，请输入32位的密钥')
            )
          }else{
            callback();
          }
      }
    var getPublic_id =(resule,value,callback)=>{
      if (!value) {
          return callback(new Error('请输入公众号app_id'))
      }else{
        callback();
      }
    }
    var getpublic_content =(resule,value,callback)=>{
      if (!value) {
          return callback(new Error('请输入公众号app_secret'))
      }else{
        callback();
      }
    }
    var getpublic_number =(resule,value,callback)=>{
      if (!value) {
          return callback(new Error('请输入商户号'))
      }else{
        callback();
      }
    }
    return {
      url:'',
      my_id:'1',
      formData: {
        public_id: '',
        public_content: "",
        public_number: "",
        public_stork:""
      },
      rule:{
        public_id: [{ validator: getPublic_id, trigger: "blur" }],
        public_content: [{ validator: getpublic_content, trigger: "blur" }],
        public_number: [{ validator: getpublic_number, trigger: "blur" }],
        public_stork:[{ validator: getStork, trigger: "blur" }]
      },
      weixinPay: false,
      tokenInfo:getCookies('token'),
      flag:false
    };
  },
  methods: {
    startUp(name) {
      console.log(111)
      this.$refs[name].validate(valid => {
          if (valid) {
              if (this.flag) {
                  let params = {
                      token:this.tokenInfo,
                      appid:this.formData.public_id,
                      appsecret:this.formData.public_content,
                      mch_id:this.formData.public_number,
                      api_key:this.formData.public_stork
                    };
                   this.$ajaxs.setWxPay(params).then((res)=>{
                      if (res.code == 1) {
                          // let params2 = {token:this.tokenInfo};
                          this.weixinPay = true;
                          this.url = res.result.code_url;
                          this.orde_id = res.result.orde_id;
                          var canvas1 = qrcanvas({
                            data: this.url,
                            size: 160
                          });
                          $('#wxPay_url' ).html('');
                          $('#wxPay_url' ).append(canvas1);
                          // this.$ajaxs.getMoentWxPay(params2).then((reponse)=>{
                          //     if (reponse.code == 1) {
                          //         this.weixinPay = true;
                          //         this.url = reponse.result.code_url;
                          //         var canvas1 = qrcanvas({
                          //           data: this.url,
                          //           size: 160
                          //         });
                          //         $('#wxPay_url' ).html('');
                          //         $('#wxPay_url' ).append(canvas1);
                          //     }
                          // })
                      }else{
                          this.$message({
                            showClose: true,
                            type: "error",
                            message: '您输入的信息有误，请核对后再试。'
                          });
                      }
                  })
              }else{
                  this.$nextTick(()=>{
                        let params = {
                          token:this.tokenInfo,
                          appid:this.formData.public_id,
                          appsecret:this.formData.public_content,
                          mch_id:this.formData.public_number,
                          api_key:this.formData.public_stork
                          // token:this.tokenInfo,
                          // appid:'wx7dc3997b710fe361',
                          // appsecret:'95a6d000f73dda71d6761a896f631343',
                          // mch_id:'1509622191',
                          // api_key:'84a0c681cee8b695d54b6679e4490d44'
                        };
                      this.$ajaxs.setWxPay(params).then((res)=>{
                        if (res.code == 1) {
                              this.weixinPay = true;
                              this.url = res.result.code_url;
                              this.orde_id = res.result.orde_id;
                              var canvas1 = qrcanvas({
                                data: this.url,
                                size: 160
                              });
                              $('#wxPay_url' ).html('');
                              $('#wxPay_url' ).append(canvas1);
                          //   let params2 = {token:this.tokenInfo};
                          //   this.$ajaxs.getMoentWxPay(params2).then((reponse)=>{
                          //     if (reponse.code == 1) {
                          //         this.weixinPay = true;
                          //         this.url = reponse.result.code_url;
                          //         var canvas1 = qrcanvas({
                          //           data: this.url,
                          //           size: 160
                          //         });
                          //         $('#wxPay_url' ).html('');
                          //         $('#wxPay_url' ).append(canvas1);
                          //     }
                          // })
                        }else{
                            this.$message({
                              showClose: true,
                              type: "error",
                              message: '您输入的信息有误，请核对后再试。'
                            });
                        }
                      })
                      
                  })
              } 
          }
      })
      // 
        
        // if (this.flag ) {
        //    
        // }else{
          // 
          // this.$nextTick(()=>{
          //     this.$ajaxs.getMoentWxPay(params2).then((res)=>{
          //     
          //     })
          // })
            
      
      
      
    },
    getWXPay_info(){
      let params  = {token:this.tokenInfo};
      this.$ajaxs.getWxPay_info(params).then((res)=>{
          console.log(res)
          if (res.result != null && res.result != '' && res.code == 1) {
              this.formData.public_id = res.result.appid;
              this.formData.public_content = res.result.appsecret;
              this.formData.public_number = res.result.mch_id;
              this.formData.public_stork = res.result.api_key;
              console.log(res)
              if (this.formData.public_id && this.formData.public_content && this.formData.public_number && this.formData.public_stork) {
                  this.flag = true;
              }else{
                  this.flag = false;
              }
          }
          // if (res.code == 3 && res.reslut == null || res.reslut == '') {
          //     formatDate.public_id = '';
          //     formatDate.public_content = '';
          //     formatDate.public_number = '';
          //     formatDate.public_stork = '';
          // }
      })
    },
    setWxpayClose(){
      this.$router.push({ path: "/mainPage/operateWXPay" });
    }
  },
  created(){
    this.getWXPay_info()
  }
};
</script>
<style scoped>
.test_Number .mw-dialog {
  width: 388px;
}
.mw-dialog-header .title {
  color: #34a853;
}
/*弹窗dialog*/
.mw-dialog__wrapper {
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}
.mw-dialog__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.mw-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px 30px;
  background: #fff;
  border-radius: 8px;
}
.mw-dialog-header {
  margin-bottom: 10px;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.mw-dialog-body {
  margin-bottom: 20px;
}
.mw-dialog-body .code {
  margin: 0 auto 15px;
  width: 160px;
  height: 160px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.mw-dialog-body .code img {
  margin: 10px;
  width: 140px;
  height: 140px;
}
.mw-dialog .tishi {
  text-align: center;
}
.mw-dialog-footer {
  text-align: center;
}

.shortMessage_dialog .el-tabs__content {
  margin: 20px 0;
  min-height: 300px;
  max-height: 420px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.shortMessage_dialog .el-tabs.el-tabs--top {
  height: auto !important;
}
</style>

