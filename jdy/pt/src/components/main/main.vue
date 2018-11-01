<template>
    <div>
        <!-- <m-header></m-header> -->
        <div class="myMask" v-if="mainMask">
            <div class="mainMaxk">
                <div class="mainMaxk_title">
                    <div v-show="imgFlag == 1">1、点击新建直播，开始创建直播间</div>
                    <div v-show="imgFlag == 2">2、进入频道管理，配置个性化功能</div>
                    <div v-show="imgFlag == 3">3、进入直播控制，进行直播</div>
                    <div v-show="imgFlag == 4">4、将直播链接发送给观众即可观看</div>
                </div>
                <img src="../../common/image/close@3x.png" class="mainClose1" alt="" srcset="" @click="close">
                <div class="mainImg" :class="{'mainImg1':imgFlag == 2,'mainImg2':imgFlag ==3,'mainImg3':imgFlag ==4,'mainImg4':imgFlag ==5}"></div>
                <div class="mainBottom clearfix">
                    <ul class="mainBottom_ul">
                        <li class="main_li" :class="{'mainC1':imgFlag ==1}"></li>
                        <li class="main_li" :class="{'mainC1':imgFlag ==2}"></li>
                        <li class="main_li" :class="{'mainC1':imgFlag ==3}"></li>
                        <li class="main_li" :class="{'mainC1':imgFlag ==4}"></li>
                    </ul>
                    <div class="main_btn">
                        <img v-show="imgFlag == 4" src="../../common/image/zong10@3x.png" class="myImg00" alt="" srcset="">
                        <img v-show="imgFlag == 5" src="../../common/image/zong10@3x.png" class="myImg00" alt="" srcset="">
                        <el-button style="position:absolute;right:114px;width: 70px;height: 36px;padding: 0 0px;" type="info" v-show="imgFlag !=1" @click="prev()">{{tex1}}</el-button>
                        <el-button style="position: absolute;right: 25px;width: 70px;height: 36px;padding: 0 0px;" type="primary" @click="next()">{{tex2}}</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            :visible.sync="linkmp"
            width="400px"
            center
            class="dialog11 dialog12"
            >
            <div style="margin-bottom:26px;">
                <p>保存成功，门票生成成功</p>
                <p>请前往
                    <span @click="linkSpan" style="color: blue;text-decoration: underline;display: inline-block;cursor:pointer;">频道管理-门票管理</span>查看</p>
            </div>
            <span >
                <el-button type="primary" @click="linkmp = false" >确 定</el-button>
            </span>
        </el-dialog>

        <router-view @dialShow='dialShow'  v-bind:ac="msg"></router-view>
    </div>
</template>

<script>
    // import MHeader from 'components/header/header'
    import axios from 'axios'
    import {ERR_OK,DATA_URL,getCookies,setLStorage} from 'api/config'
    import Bus from '../bus.js'
    import rootBus from '../rootBus.js'
    // import liveControl from '../liveControl/liveControl.vue'
    export default{
        data(){
            return{
                imgFlag:1,
                tex1:'上一步',
                tex2:'下一步',
                mainMask:false,
                // mainMask:true,
                linkmp:false,
                msg:'management2',
                sigleData:[]
            }
        },
        components:{
            // MHeader
        },
        watch:{
            '$router':'myGetParams'
        },
        methods:{
            myGetParams(){
                let val = this.$router.params.data
                console.log(val)
            },
            close_mp(){

            },
            linkSpan(){
                rootBus.$emit('updateTab','management2');
                setLStorage("liveID", this.sigleData);
                setLStorage('type','2')
                global.liveData.liveID = this.sigleData;
                // global.liveData.thisData = this.sigleData;
                this.linkmp = false
                this.$router.push({
                    path:'/liveControl/ticketsList',
                    query: { type: '2' }
                })
                
            },
            dialShow(smitData){
                this.sigleData = smitData;
                this.linkmp = true;
                console.log('2222')
            },
            close(){
                let params = {token:getCookies("token"),type:'2',is_guide:'1'}
                this.$ajaxs.setguide(params).then((res)=>{
                    if (res.code == 1) {
                        this.mainMask = false;
                    }
                })
            },
            next(){
                this.imgFlag++;
                if (this.imgFlag > 4 ) {
                    let params = {token:getCookies("token"),type:'2',is_guide:'1'}
                    this.$ajaxs.setguide(params).then((res)=>{
                        if (res.code == 1) {
                            this.tex2 = '立即体验'
                            this.imgFlag = 4;
                            this.mainMask = false;
                        }
                        this.$router.push({
                                path: '/main/newLive1?from=2'
                            })
                    })
                    return
                }
                if (this.imgFlag == 4) {
                    this.tex2 = '立即体验'
                }else{
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
                        if (re.result.video_guide == 1) {
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
 .myMask{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    z-index: 999;
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
    background: url(../../common/image/spzn_1.png);
    background-size: 100% 100%;
    position: absolute;
    top:0;
}
.mainBottom{
    position: absolute;
    bottom: 0;
    width: 100%
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
    margin-left: 2px;
}
.main_btn{
    float: right;
    width: 200px;
    text-align: center;
    height: 50px;
    position: relative;
}
.mainImg1{
    background: url(../../common/image/spzn_2.png);
    background-size: 100% 100%;
}
.mainImg2{
    background: url(../../common/image/spzn_3.png);
    background-size: 100% 100%;
}
.mainImg3{
    background: url(../../common/image/spzn_4.png);
    background-size: 100% 100%;
}
.mainImg4{
    background: url(../../common/image/spzn_4.png);
    background-size: 100% 100%;
}
.mainC1{
    background: #9B9B9B;
}
.myImg00{
    position: absolute;
    width: 108px;
    height: 35px;
    top: -42px;
    left: 89px;
}
.mainClose1{
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
 <style>
 .dialog12 .el-dialog--center .el-dialog__header .el-icon-close{
    display: none;
}

 </style>
 
 

