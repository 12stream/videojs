<template>
    <div class="account">
        <div class="myMask" v-if="mainMask">
            <div class="mainMaxk">
                <div class="mainMaxk_title">
                    <div v-show="imgFlag == 1">1、点击新建主页，开始搭建主页</div>
                    <div v-show="imgFlag == 2">2、进入主页编辑，配置个性化功能</div>
                    <div v-show="imgFlag == 3">3、可添加相应图文、直播、点播视频等内容</div>
                    <div v-show="imgFlag == 4">4、正式发布后将主页链接分享给朋友即可观看</div>
                </div>
                <img src="../../common/image/close@3x.png" class="mainClose" alt="" srcset="" @click="close">
                <div class="mainImg" :class="{'mainImg1':imgFlag == 2,'mainImg2':imgFlag ==3,'mainImg3':imgFlag ==4,'mainImg4': imgFlag == 5}"></div>
                <div class="mainBottom clearfix">
                    <ul class="mainBottom_ul">
                        <li class="main_li" :class="{'mainC1':imgFlag ==1}"></li>
                        <li class="main_li" :class="{'mainC1':imgFlag ==2}"></li>
                        <li class="main_li" :class="{'mainC1':imgFlag ==3}"></li>
                        <li class="main_li" :class="{'mainC1':imgFlag ==4}"></li>
                    </ul>
                    <div class="main_btn">
                        <img v-show="imgFlag == 4" src="../../common/image/zong9@3x.png" class="myImg00" alt="" srcset="">
                        <img v-show="imgFlag == 5" src="../../common/image/zong9@3x.png" class="myImg00" alt="" srcset="">
                        <el-button style="position:absolute;right:114px;width: 70px;height: 36px;padding: 0 0px;" v-show="imgFlag !=1" type="info" @click="prev()">{{tex1}}</el-button>
                        <el-button style="position: absolute;right: 25px;width: 70px;height: 36px;padding: 0 0px;background:#4285F4;" type="primary" @click="next()">{{tex2}}</el-button>
                    </div>
                </div>
            </div>
        </div>
        <m-header></m-header>
        <div class="w1000 mt20" style="width:1160px;">
            <el-row>
                <el-col :span="5" style="width:190px;height: 740px;" >
                    <vboLeft></vboLeft>
                </el-col>
                <el-col :span="19" style="width:970px;">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
        <m-footer></m-footer>
    </div>
</template>

<script>
    import MHeader from 'components/header/header'
    import vboLeft from 'components/leftnav/vboLeft'
    import mFooter from 'components/header/footer'
    import axios from 'axios'
    import {ERR_OK,DATA_URL,getCookies} from 'api/config'
    import Bus from '../bus.js'
    export default{
        data(){
            return{
                imgFlag:1,
                tex1:'上一步',
                tex2:'下一步',
                mainMask:false
                // mainMask:true
            } 
        },
        components:{
            MHeader,
            vboLeft,
            mFooter
        },
        methods:{
            close(){
                let params = {token:getCookies("token"),type:'1',is_guide:'1'}
                this.$ajaxs.setguide(params).then((res)=>{
                    if (res.code == 1) {
                        this.mainMask = false;
                    }
                })
            },
            next(){
                this.imgFlag++;
                if (this.imgFlag == 4) {
                    this.tex2 = '立即体验'
                    
                }else{
                    if (this.imgFlag > 4 ) {
                        let params = {token:getCookies("token"),type:'1',is_guide:'1'}
                        this.$ajaxs.setguide(params).then((res)=>{
                            if (res.code == 1) {
                                this.tex2 = '立即体验'
                                this.mainMask = false;
                                this.imgFlag = 4;
                                Bus.$emit('updateNewaddPage',false)
                            }
                        })
                        return
                    }
                    this.tex2 = '下一步'
                }
                
            },
            prev(){
                if (this.imgFlag == 1) {
                    return
                }
                this.tex2 = '下一步'
                this.imgFlag--;
            },
            getDate(){
                let params = {token:getCookies("token")}
                this.$ajaxs.getBrandInfo(params).then((re)=>{
                    if (re.code == 1) {
                        console.log(re)                      
                        if (re.result.page_guide == 1) {
                            this.mainMask = false;
                        }else{
                            this.mainMask = true;
                        }
                    }
                    
                })
            }
        },
        created() {
            this.getDate();
        },
    }
</script>

<style scoped>
#left-nav .el-submenu__title{
    background-color: #f1f5f9 !important;
    color: #222d37;
}
#left-nav  .is-active .el-submenu__title {
    background-color: #58cafd !important;
    color: #ffffff;
}
#left-nav .is-active .el-submenu__title:hover {
    background-color: #58cafd !important;
    color: #ffffff;
}
#left-nav  .el-submenu__title:hover{
    background-color: #f1f5f9 !important;
}
#left-nav .el-menu .el-menu-item-group{
    background-color: #fff !important;
}
#left-nav  .el-submenu{
    border-bottom: 1px solid #e0e4e7;
}
#left-nav  .el-submenu i{
    margin-right: 10px;
}
#left-nav .el-submenu .el-menu  .is-active{
    background-color: #4f5f6f !important;
}
#left-nav  .el-menu-item, #left-nav  .el-submenu__titl{
    font-size: 12px;
    color:#9B9B9B;
    height: 40px;
    line-height: 40px;
}

#left-nav  .el-menu-item.menu_item_title{
    padding:0;
    height: 36px;
    line-height: 36px;
    background-color: #fff!important;
    color:#000!important;
}

#left-nav  .el-menu-item, #left-nav  .el-submenu__title{
    padding-left:50px!important;
}
#left-nav .menu_item_title{
    font-size:14px;
    color:#000000;
    padding:8px 0;
    cursor: pointer;
}
#left-nav .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
    color: #2B6CFF  !important;
    background-color: #ECF6FF;
}
#left-nav .el-menu-item:focus, #left-nav .el-menu-item:hover {
    background-color: #ECF6FF;
    color:#2B6CFF;
}

#left-nav .el-submenu .el-menu-item{
    background-color: #d8dce0 !important;
    text-align: left;
    height: 35px;
    line-height:  35px;
    border-bottom: 1px solid #e0e4e7;
    padding-left: 83px !important;
}
.my_list {
    min-height: 667px;
}
.mainMaxk{
    width: 642px;
    height: 410px;
    margin: 200px auto;
    background: #fff;
    position: relative;
}
.mainImg{
    width: 642px;
    height: 410px;
    background: url(../../common/image/qyzn_1.png);
    background-size: 100% 100%;
    position: absolute;
    top:0;
}
.mainBottom {
    position: absolute;
    bottom: 0;
    width: 100%;
}
.mainBottom_ul{
    width: 200px;
    display: inline-block;
    text-align: center;
    margin-left: 40px;
    margin-top: 25px;
}
.main_li{
    float: left;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #D8D8D8;
    margin-left: 8px;
}
.main_btn{
    float: right;
    width: 200px;
    text-align: center;
    height: 50px;
    position: relative;
}
.mainImg1{
    background: url(../../common/image/qyzn_2.png);
    background-size: 100% 100%;
}
.mainImg2{
    background: url(../../common/image/qyzn_3.png);
    background-size: 100% 100%;
}
.mainImg3{
    background: url(../../common/image/qyzn_4.png);
    background-size: 100% 100%;
}
.mainImg4{
    background: url(../../common/image/qyzn_4.png);
    background-size: 100% 100%;
}
.mainC1{
    background: rgba(155,155,155,1);
}
.myImg00{
    position: absolute;
    width: 108px;
    height: 35px;
    top: -42px;
    left: 89px;
}
.mainClose{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    z-index:9;
}
.mainMaxk_title{
    font-size:24px;
    color:#4A4A4A;
    text-align:center;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    padding-top:40px;
}
</style>

