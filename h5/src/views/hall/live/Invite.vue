<template>
<nav>
    <div class="invite-card" id="invite-canvas" v-if="canvasState">
        <!-- <Title :showtitle='liveTitle' v-if="!weixinFlag"></Title> -->
        <!-- <div :class="weixinFlag ? 'card no' : 'card'"> -->
            <div class="card noinv">
            <div class="user">
                <img :src="'data:image/png;base64,' + hImg">
                <div class="user-name">
                    <span class="name">{{wxName ? wxName : inviteInfo.user_title}}</span>
                    <span>邀您一起看直播</span>
                </div>
            </div>
            <div class="erweima">
                <div class="live-title">
                    <div class="live-img-wrapper">
                        <img :src="'data:image/png;base64,' + infoImg" class="live-img">
                    </div>
                     <h2>{{inviteInfo.live_name}}</h2>
                     <div class="time">开播时间：<Countdown :time="inviteInfo.begin_time" :timeflag="false"></Countdown></div>
                </div>
                <div class="erweima-icon">
                    <div class="xtitle">正在上演 推荐...</div>
                    <div class="xcx-icon"><img :src="'data:image/png;base64,' + xcxImg" id="limg"></div>
                    <div class="xcx-title">长按识别小程序二维码</div>
                </div>
            </div>
            <div class="title">长按图片保存邀请卡</div>
        </div>
        <Wait class="more" v-if="waitFlag"></Wait>
        <div class="more-wait" v-if="waitFW"></div>
    </div>
</nav>
</template>
<script>
import Title from '@/components/Title'
import Wait from '@/components/Wait'
import { is_weixn, is_QQ } from '@/utils/utils.js'
import Countdown from '@/components/CountDown'
import html2canvas from '@/../static/html2canvas.js'
import {getCookie, getLStorage} from '@/api/config'
export default {
    data() {
        return {
            weixinFlag:false,
            liveTitle:'中国网正在上演',
            canvasState:true,
            inviteInfo:{},
            xcxCode:'',
            Flag:false,
            b64datas:{},
            infoImg:'',
            xcxImg:'',
            hImg:'',
            wxName:'',
            imgF:false,
            waitFlag:true,
            waitFW:true,
            imgT:false
        }
    },
    components:{Title, Countdown, Wait},
    watch:{
        imgF(val) {
            console.log(val)
            if(val) {
                html2canvas(document.querySelector("#invite-canvas"),{
                    allowTaint: true,
                    useCORS: true,
                }).then(canvas => {
                    console.log("这是测试canvas:" + canvas)
                    var inviteNav = document.getElementsByTagName('nav')[0];
                    canvas.setAttribute('id','invite-canvas')
                    canvas.crossOrigin = '*'
                    inviteNav.appendChild(canvas)
                    this.canvasState = false
                });
                html2canvas(document.querySelector("#invite-canvas"),{
                    useCORS: true,
                    windowWidth:window.innerWidth,
                    windowHeight:window.innerHeight,
                    taint:false
                }).then((canvas) => {
                    let base64ImgSrc = canvas.toDataURL("image/png")
                    /* 如果只是显示,可用以下代码 */
                    console.log(window.innerWidth,window.innerHeight)
                    let img = document.createElement("img")
                    img.crossOrigin = "anonymaous"
                    img.src = base64ImgSrc 
                    canvas.setAttribute('id','invite-img')
                    // img.crossorigin = 'anonymaous'
                    document.getElementsByTagName('nav')[0].appendChild(img)
                    // document.querySelector("#invite-canvas").style.display = 'none'
                    this.imgT = true
                    // document.getElementsByTagName('nav')[0].removeChild(document.getElementsByTagName("canvas")[0])
                })
            }
        },
        imgT(val) {
            if(val) {
                if(document.querySelector("#invite-canvas")) {
                    // 此处使用延时删除是因为直接删除canvas标签会不确定性失效，猜测是渲染问题
                    setTimeout(function(){
                        document.getElementsByTagName('nav')[0].removeChild(document.getElementsByTagName("canvas")[0])
                    },500)
                }
                 
            }
        }

    },
    methods:{
       getMin() {
           this.$ajax.getMinCode({
               scene:this.$route.params.livId,
               path:'pages/liveKing/mwLive'
            // path:'pages/liveKing/liveDetail'
           }).then(res => {
               console.log(res)
               if(res.code == 200) {
                   this.xcxCode = res.data
                   this.Flag = true
                   this.getUserInfo()
               }
           })
       },
    //    获取base64图片
    getBaseImg() {
        if(getCookie('wxUserInfo')) {
           var mes = JSON.parse(getCookie('wxUserInfo'))
           var wxImg = mes.headImg
           this.wxName = mes.nickname
        }else {
            // 不是微信端时如果登录的用户有头像和名称的话，则拿去，否则默认详情返回的名称及默认头像
            if(getLStorage('mobileUserInfo')) {
                var mobileMes = JSON.parse(getLStorage('mobileUserInfo'))
                this.wxName = mobileMes.user_title
                var wxImg = mobileMes.user_icon_url
            }else {
                var wxImg = 'https://zzsydatatest.mvaas.cn/hb/default_head_image.png'
            }
        }
        var params = {
            // imgUrl:[wxImg,this.inviteInfo.head_url,this.xcxCode]
            // imgUrl:`${wxImg}&imgUrl=${this.inviteInfo.head_url}&imgUrl=${this.xcxCode}`
            imgUrl:wxImg + '&imgUrl=' + this.inviteInfo.live_cover_url + '&imgUrl=' + this.xcxCode
        }
        this.$ajax.getBImg(params).then(res =>{
            console.log(res)
            this.imgF = true
            this.waitFlag = false
            this.waitFW = false
            this.hImg = res.data[0]
            this.infoImg = res.data[1],
            this.xcxImg = res.data[2]
        })
    },
       getUserInfo() {
           this.$ajax.liveDetails({id:this.$route.params.livId}).then(res =>{
               this.inviteInfo = res.data
               if(res.code == 200) {
                   if(this.Flag && this.inviteInfo) {
                       console.log(this.Flag,this.inviteInfo)
                       this.getBaseImg()
                   }
               }
           })
       }
    },
    mounted() {
        // alert(window.screen.availWidth)
        // alert(window.screen.availHeight)
        if(is_weixn() || is_QQ()) {
            this.weixinFlag = true
        }
         this.getMin();
    }
}
</script>
<style lang="scss">
body {
    height: 100%;
}
nav{
    height: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
#invite-canvas {
    height: 100% !important;
}
    .invite-card {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        .card {
            position: absolute;
            width: 100%;
            top: 4.4rem;
            bottom: 0;
            padding: 0 2.5rem;
            background: url('./../images/bg_Big.png') no-repeat;
            background-size: cover;
            &.noinv {
                top: 0;
            }
            .user {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                @media only screen and (min-width: 320px) {
                    margin-bottom: 0.51rem;
                    line-height: 1.87rem;
                }
                @media only screen and (min-width: 360px){
                    margin-bottom: 0.6rem;
                    line-height: 2.2rem;
                }
                img {
                    width: 4rem;
                    height: 4rem;
                    border-radius: 50%;
                }
                .user-name {
                    display: flex;
                    flex-direction: column;
                    color: #fff;
                    justify-content: center;
                    span {
                        font-size: 1.3rem;
                        text-align: center;
                        &.name {
                            font-size: 1.6rem;
                            font-weight: 600;
                        }
                    }
                }
            }
            .erweima{
                width: 100%;
                @media only screen and (min-width: 320px) {
                    min-height: 388px;
                    transform: scale(0.95)
                }
                @media only screen and (min-width: 360px) {
                    min-height: 456px;
                    transform: scale(1)
                }
                @media all and (min-height:600px) and (max-height:700px){
                    min-height: 456px;
                    transform: scale(0.9);
                }
                background: url('./../images/CombinedShape.png') no-repeat;
                background-size: 100% 100%;
                display: flex;
                // justify-content: center;
                flex-direction: column;
                align-items: center;
                .live-title {
                    @media only screen and (min-width: 320px) {
                       width: 234px;
                       max-height: 223px;
                    }
                    @media only screen and (min-width: 360px) {
                        width: 275px;
                        max-height: 262px;
                    }
                    border-bottom: 1px dotted #979797;
                    .live-img-wrapper {
                        display: flex;
                        justify-content: center;
                        .live-img {
                            @media only screen and (min-width: 320px) {
                                width: 235px;
                                height: 132px;
                                margin-top: 1.3rem;
                            }
                            @media only screen and (min-width: 360px) {
                                width: 275px;
                                height: 155px;
                                margin-top: 15px;
                            }
                        }
                    }
                    h2 {
                         color: #111;
                         text-align: center;
                         @media only screen and (min-width: 320px) {
                            font-size: 1.78rem;
                            height: 2.55rem;
                            line-height: 2.55rem;
                            font-weight: 500;
                            margin-top: 1.275rem;
                        }
                        @media only screen and (min-width: 360px) {
                            font-size: 2.1rem;
                            height: 30px;
                            line-height: 30px;
                            font-weight: 500;
                            margin-top: 1.5rem;
                        }
                    }
                    .time {
                        text-align: center;
                        font-size: 13px;
                        height: 18.5px;
                        line-height: 18.5px;
                        color:rgba(17,17,17,0.8);
                        margin-top: 9px;
                        margin-bottom: 20px;
                    }
                }
                .erweima-icon {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    .xtitle {
                        font-size: 13px;
                        color: #4A4A4A;
                        line-height: 19px;
                        margin: 12px 0;
                    }
                    .xcx-icon {
                        width: 112px;
                        height: 114px;
                        img {
                           width: 112px;
                           height: 114px; 
                        }
                    }
                    .xcx-title {
                        font-size: 13px;
                        color: #9B9B9B;
                        line-height: 19px;
                        margin: 9px 0;
                    }
                }
            }
            .title {
                //  @media only screen and (min-width: 320px) {
                //     height: 3.5rem;
                //     line-height: 3.5rem;
                // }
                @media only screen and (min-width: 360px) {
                    height: 4rem;
                    line-height: 4rem;
                }
                width: 100%;
                text-align: center;
                font-size: 1.2rem;
                color:rgba(255,255,255,0.8);
            }
        }
    }
    #invite-img {
        width: 100%;
        height: 100%;
    }
    .more {
        width: 20px;
        height: 20px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
    }
    .more-wait {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 1;
    }
    .container1 > div, .container2 > div, .container3 > div {
        background-color: #fff !important;
    }
</style>

