<template>
    <div class="box" v-bind:style="{ width: w +'px', height: h + 'px' }">
        <div class="box_card">
            <div class="a1">
                <img src="../../common/image/chongzhireturn.png" alt="">
                <h3>支付成功！感谢您的支持!</h3>
            </div>
            <div class="a3">
                <el-button type="primary" @click="jixu">继续充值</el-button>
                <el-button @click="fanhui">返回首页</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
  getLStorage,
  MW_Live_API_URL,
  ERR_OK,
  formatDate,
  getDay,
  changeDateType
} from "api/config";
import axios from "axios";
import { getCookies, DATA_URL, chargeError, setLStorage } from "../../api/config";
export default {
  data() {
    return {
        w:'',
        h:''
    };
  },
  created() {
      this.w = document.documentElement.clientWidth;
      this.h = document.documentElement.clientHeight;
  },
  methods:{
    jixu(){
        this.$router.push({
            path: '/account/recharge'
        })
    },
    fanhui(){
        this.$router.push({
                path: '/index'
            })
    }
  }
  
};
</script>
<style scoped>
.box{
    background: white;
}
.box_card{
    width: 500px;
    height: 200px;
    margin:350px auto;
    background: #eee;
    line-height: 200px;
    
}
.a1 img{
    width: 40px;
    height: 40px;
}
.a1{
    height: 60px;
    text-align: center;
    /* line-height: 60px; */
}
.a1 h3{
    display: inline-block;
}
.a3{
    text-align: center;
}
</style>
