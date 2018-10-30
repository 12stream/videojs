<template>
    <div class="video-detail">
        <Title :showtitle='liveTitle' v-if="!weixinFlag"></Title>
        <div class="top-live">
            <span class="logo"></span>
            <div class="home-personal">
                <span class="personal-center" @click="$router.push({path:'/personal'})">个人中心</span>
                <span class="home goto" @click="$router.push({path:'/'})">返回首页</span>
            </div>
        </div>
        <div class="play-live">
           <video-player class="vjs-custom-skin" :options="playerOptions">
           </video-player>
        </div>
        <div class="introduction">
            <div class="title-introduce">
                <div class="title-time">
                    <span class="title">{{videoList.vodName}}</span>
                    <span class="time">开始时间：<Countdown :time="videoList.createTime" :timeflag='false'></Countdown></span>
                </div>
                <span :class="inductionTitle == 'x' ? 'introduce' : 'introduce noplayd'" @click="induction">{{inductionTitle}}</span>
            </div>
            <!-- <div class="start-time-title">开始时间：2017-12-05 14:57</div> -->
        </div>
        <div class="other-introduce" v-if="intFlag">
            <h3>其他推荐</h3>
            <div class="recommed-wrapper" >
                <div class="recommed-list" v-for="(item,i) in recommedList" :key="i" @click="$router.push({path:`/video/details/${item.id}`})">
                    <div class="recommed-img">
                        <img :src="item.cover_img">
                        <span>{{item.duration | durat}}</span>
                    </div>
                    <div class="recommed-details">
                        <div class="title">{{item.video_name}}</div>
                        <div class="time">时间 : <Countdown :time="item.create_time" :timeflag='false'></Countdown></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="introduce-content" v-if="!intFlag">
            <h5>简介</h5>
            <div class="int-img" v-if="introudeData">
                <p>{{introudeData}}</p>
            </div>
            <div v-if="!introudeData" class="no-introduct">
                <img src="./images/no-introuduce.png">
            </div>
        </div>

    </div>
</template>
<script>
import Title from '@/components/Title'
import Countdown from '@/components/CountDown'
import {is_weixn, is_QQ} from '@/utils/utils'
export default {
    data() {
        return {
            liveTitle:'中国正在上演',
            videoList:{},
            recommedList:[],
            playerOptions:{
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                controls: true, //控制条
                preload: 'auto', //视频预加载
                muted: false, //默认情况下将会消除任何音频。
                loop: false, //导致视频一结束就重新开始。
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: 'application/x-mpegURL',
                    src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
                }],
                poster: 'http://qvw.mvaas.cn/images/videoup_cover_img/941678316d64034a633f/ot3lkyjmp5bu5ajjoasn/thb_300.jpg', //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            },
            weixinFlag:false,
            vodType:'',
            inductionTitle:'简介',
            index:0,
            intFlag:true,
            introudeData:''
        }
    },
    components:{Title, Countdown},
    watch: {
        '$route'(to, from) {
            if (to.name === 'VideoDetails') {
            // 在此调用函数
                if(from.path) {
                    window.location.reload()
                }
            }
        }
   },
    methods:{
        videoListDetails() {
            this.$ajax.getVideoDetails({vid:this.$route.params.videoId}).then(res =>{
                // console.log(res)
                if(res.data.vodText) {
                     this.introudeData = res.data.vodText
                }
                this.vodType = res.data.vod_type;
                    res.data.playerOptions = {
                        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                        autoplay: false, //如果true,浏览器准备好时开始回放。
                        controls: true, //控制条
                        preload: 'auto', //视频预加载
                        muted: false, //默认情况下将会消除任何音频。
                        loop: false, //导致视频一结束就重新开始。
                        language: 'zh-CN',
                        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                        sources: [{
                            type: 'application/x-mpegURL',
                            src: res.data.playM3u8Url
                        }],
                        poster: res.data.vodCoverUrl, //你的封面地址
                        width: document.documentElement.clientWidth,
                        notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    }
                    this.videoList = res.data
                    if(res.code == '200') {
                        this.getRecommedVideoList()
                    }
            })
        },
        getRecommedVideoList() {
            this.$ajax.videoRecommmed({
               vod_type:this.vodType,
               vod_id:this.$route.params.videoId
                }).then(res =>{
                console.log(res)
                this.recommedList = res.data
                // console.log(this.recommedList)
            })
        },
        induction() {
            if(this.index == 0) {
                this.inductionTitle = 'x'
                this.index = 1
                this.intFlag = false
            }else if(this.index == 1) {
                this.inductionTitle = '简介'
                this.index = 0
                this.intFlag = true
            }
        }
    },
    mounted() {
        this.videoListDetails()
        if(is_weixn() || is_QQ()) {
            this.weixinFlag = true
        }
    },
    filters:{
        durat(duration) {
            return duration.split('.')[0] + ':' + duration.split('.')[1]
        }
    }
}
</script>
<style lang="scss">
.common-title .return-title span.goback {
    border-left: 1px solid #111111;
    border-bottom: 1px solid #111111;
    width: 1.2rem;
    height: 1.2rem;
}
.top-live {
    display: flex;
    justify-content: space-between;
    height: 4.4rem;
    align-items: center;
    .logo {
        display: inline-block;
        width: 90px;
        height: 25px;
        background: url('images/logo-live.png') no-repeat;
        background-size: 90px 25px;
        margin-left: 1.5rem;
    }
    .home-personal {
        .personal-center,.home {
            display: inline-block;
            height: 2.7rem;
            width: 7rem;
            line-height: 2.7rem;
            color: #4A4A4A;
            border: 1px solid #979797;
            text-align: center;
            font-size: 1.2rem;
            border-radius: 1.6rem;
            margin-right: 1rem;
            &.goto {
                color: #FF6633;
                border-color: #FF6633;
            }
        }
    }
}
.play-live {
    img {
        width: 100%;
        height: 21.1rem;
    }
}
.introduction {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 1.5rem;
    .title-introduce {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        margin-top: 1rem;
        .title-time {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            max-width: 90%;
            word-break:break-all;
            .title {
                font-size: 1.8rem;
                font-weight: 600;
                color: #333;
                line-height: 2.5rem;
                max-width: 100%;
                word-break:break-all;
            }
            .time {
                color: #999999;
                font-size: 1.3rem;
                margin-top: 0.6rem;
            }
        }
        .introduce {
            min-width: 15%;
            font-size: 1.3rem;
            color: #999;
            font-weight: 400;
            padding-right: 1.7rem;
            text-align: right;
        }
        .introduce.noplayd:after {
            content: "";
            width: 0.6rem;
            height: 0.6rem;
            border-top: 1px solid #999999;
            border-right: 1px solid #999999;
            transform: rotate(45deg);
            position: absolute;
            margin-top: 0.4rem;
        }
    }
    // .start-time-title {
    //     margin-top: 0.6rem;
    //     font-size: 1.3rem;
    //     color: #999;
    //     padding-left: 1.5rem;
    // }
}
.other-introduce {
    margin-top: 1.5rem;
    h3 {
        color: #4A4A4A;
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 2.1rem;
        margin-bottom: 1.5rem;
        margin-left: 1.5rem;
    }
    .recommed-list {
        display: flex;
        border-bottom: 1px solid #F2F2F2;
        padding: 1rem 1.5rem;
        .recommed-img {
            position: relative;
            img {
                width: 15rem;
                height: 8.5rem;
                padding-right: 1.5rem;
                border-radius: 0.3rem;
            }
            span {
                position: absolute;
                bottom: 0.3rem;
                right: 2.1rem;
                font-size: 1.2rem;
                line-height: 1.65rem;
                color: #fff;
            }
        }
        .recommed-details {
                flex: 1;
                .title {
                    font-size: 1.5rem;
                    color: #333333;
                    line-height: 2.1rem;
                    padding-top: 2.2rem;
                    word-break: break-all;
                }
                .time {
                    font-size:1.2rem;
                    color:#9B9B9B;
                    line-height:1.5rem;
                }
        }
    }
}
.introduce-content {
    width:100%;
    padding:1.5rem;
    h5 {
        font-size: 1.5rem;
        line-height: 3rem;
        font-weight: bold;
    }
    .int-img {
        p{
            font-size:1.4rem;
            line-height: 2.5rem;
            color: #333333; 
            font-weight: 400;
        }
    }
    .no-introduct {
        display: flex;
        justify-content: center;
        padding-top: 3rem;
    }
}
.vjs-custom-skin .video-js.vjs-paused .vjs-big-play-button {
    width: 52px !important;
    height: 52px !important;
    border-radius: 50%;
    margin-left: -26px;
    line-height: 1.4em !important;
    // background-color: rgba(36,131,213,0.9);
  }
.vjs-custom-skin .video-js.vjs-paused:hover .vjs-big-play-button{
        background-color: rgba(0,0,0,0.45);
  }
</style>

