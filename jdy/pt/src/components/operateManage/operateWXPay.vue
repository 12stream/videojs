<template>
    <div class="my_list securitySet">
        <div class="live-top bg-fff" v-if="!wxpay_flag">开通微信支付</div>
        <div class="live-top bg-fff" v-if="wxpay_flag">微信支付</div>
        <div class="bg-fff col-333 info-content" v-if="!wxpay_flag">
            <div class="rechatge">
                <div class="rechatge-button">
                    <el-button class="blue_btn" type="primary" @click="goOpenWeixinPay">微信支付</el-button>
                </div>
            </div>
            <p class="tishi">
                <!-- 温馨提示：<br>
                1.支持微信，支付宝支付，线下银行付款等方式充值。<br>
                2.支付成功后，可在账户总览中查看最新余额。<br>
                3.充值成功的金额不支持提现。<br>
                4.支持查看所有历史充值记录，点击进入查询。<br>
                5.若充值未到账或有其他疑问可致电客服热线 -->
                <a href="https://shimo.im/docs/md3OGyQK88Er4lnu/" style="color:blue;">如何开通微信支付？</a>
            </p>
        </div>
        <el-dialog
            :visible.sync="IsAdd"
            width="390px"
            center>
            <p>如需开通微信支付，需设置相应的公众号授权，否则微信内无法进行支付，是否继续前往设置？</p>
            
            <!-- <span slot="footer" class="dialog-footer"> -->
            <div  class="dialog-footer">
                <el-button type="primary" @click="setUp()">前往设置</el-button>
                <el-button @click="openUp()">继续开通</el-button>
            </div>
            
            <!-- </span> -->
        </el-dialog>
        <!-- <div class="live-top bg-fff">开通微信支付</div> -->
        <div class="bg-fff col-333 info-content" v-if="wxpay_flag" >
            <p>微信支付</p>
            <div style="padding-top:30px;">
                <el-button class="btn" type="info" @click="updataWXPay">修改</el-button>
                <el-button class="btn" type="info" @click="closeWXPay">关闭</el-button>
            </div>
            
            <p class="tishi">
                <!-- 温馨提示：<br>
                1.支持微信，支付宝支付，线下银行付款等方式充值。<br>
                2.支付成功后，可在账户总览中查看最新余额。<br>
                3.充值成功的金额不支持提现。<br>
                4.支持查看所有历史充值记录，点击进入查询。<br>
                5.若充值未到账或有其他疑问可致电客服热线 -->
                <a href="https://shimo.im/docs/md3OGyQK88Er4lnu/" style="color:blue;">如何开通微信支付？</a>
            </p>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="wxPay"
            width="410px"
            center>
            <p>关闭将使用默认支付渠道，确定关闭微信支付？</p>
            <!-- <span slot="footer" class="dialog-footer"> -->
            <div  class="dialog-footer">
                <el-button type="primary" @click="closeWXpayOk">确定</el-button>
                <el-button type="info" @click="closeDialog">取消</el-button>
            </div>
            
            <!-- </span> -->
        </el-dialog>
    </div>
    
</template>
<script>
import { setCookie, getCookie, removeCookie,getCookies,DATA_URL,getLStorage, facebac_URL } from "../../api/config";
import axios from "axios";
import {get_token} from '../js/comm'
import Bus from '../bus.js'
export default {
  name: "",
  data() {
      
    return {
        IsAdd:false,
        sureDisabled:false,
        tokenInfo:getCookies('token'),
        wxPay:false,
        wxpay_flag:false
    };
  },
  created(){
      this.getUserPay();
  },
  methods: {
    goOpenWeixinPay() {
        this.IsAdd = true
      console.log("8888");
    //   this.$router.push({ path: "/operateManage/openWeixinPay" });
      //this.$router.push({ path: '/account/Recharge' })
    },
    openUp(){
        //继续
        this.$router.push({ path: "/mainPage/openWeixinPay" });
    },
    setUp(){
        //设置
        this.$router.push({ path: "/mainPage/operateManage" });
    },
    getUserPay(){
      //  var url = DATA_URL + "wecha_pay/get_wecha_pay";
        var params  = {token:this.tokenInfo};
        this.$ajaxs.getWXPay(params).then(data=>{
            if (data.result.type=== 0) {
                this.wxpay_flag = false;
            }
            if (data.result.type === 1) {
                this.wxpay_flag = true;
            }
        })
    },
    //修改微信支付
    updataWXPay(){
        this.$router.push({ path: "/mainPage/openWeixinPay" });
    },
    closeWXPay(){
        this.wxPay = true;
    },
    closeDialog(){
        this.wxPay = false;
    },
    closeWXpayOk(){
        let params = {token : this.tokenInfo};
        
        this.$ajaxs.getActiveWXPay(params)
            .then(res=>{
                if (res.code === 1) {
                    this.wxpay_flag = false;
                    this.wxPay = false;
                    // Bus.$emit('update',false)
                    this.$message({
                        showClose: true,
                        message: '关闭成功',
                        type: 'success'
                    });
                    console.log(res)
                }else {
                    this.$message({
                        showClose: true,
                        message: '修改失败！',
                        type: 'error'
                    });
            }
                
            })
    }

  }
};
</script>
<style scoped>
.mylist {
  height: 760px;
  background: #fff;
}
.tishi {
    margin-top: 10px;
    line-height: 28px;
    color: #9B9B9B;
    padding-top: 30px;
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
.dialog-footer{
    text-align: center;
    margin-top: 44px;
}
.btn{
    color: white;
    background: #999;
}
</style>

