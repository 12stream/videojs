<template>
    <div class="all-wrapper">
        <div class="all" v-for="(item,i) in videoDatas" :key="i" v-if="videoDatas.length !== 0">
            <video-player id="svideo" class="playvideo vjs-custom-skin" :options="item.playerOptions" x5-video-player-type="h5" :playsinline="true" webkit-playsinline @play="onPlayerPlay($event,item.id)"
                     @pause="onPlayerPause($event)">
            </video-player>
             <!-- <video controls="controls" :id="'svideo' + item.id" class="playvideo vjs-custom-skin" webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow"
                    width="100%" height="100%" :src="item.video_url" preload="true" :poster="item.cover_img" @play="onPlayerPlay($event,item.id)" @pause="onPlayerPause($event)">
            </video> -->
            <div class="video-introduct">
                <p class="title" @click="$router.push({path:`/video/details/${item.id}`})">{{item.video_name}}</p>
                <p class="time">开始时间：<Countdown :time="item.create_time" :timeflag='true'></Countdown></p>
            </div>
        </div>
         <!-- <div class="bottom-more" v-if="moreFlag && videoDatas.length !== 0">下拉加载更多！</div> -->
         <Wait class="bottom-more" v-if="moreFlag && videoDatas.length !== 0"></Wait>
         <div class="no-more" v-if="noMoreFlag && videoDatas.length !== 0">已经到底啦！</div>
        <div class="no-data" v-if="videoDatas.length == 0">
            <img src="@/components/images/img-ship.png">
            <span>暂无视频哦~</span>
        </div>
    </div>
</template>
<script>
import eventVue from '@/components/eventVue.js'
import Countdown from '@/components/CountDown'
import Wait from '@/components/Wait'
export default {
    data() {
        return {
            videoSrc:'',
            videoImg:'',
            playStatus:'',
            muteStatus:'',
            isMute:true,
            isPlay:false,
            videoDatas:[],
            moreFlag:false,
            noMoreFlag:false,
            curVal:0
        }
    },
    components:{Wait, Countdown},
    props:['videoList', 'indexvalue'],
    methods:{
        onPlayerPlay(e,vid) {
           console.log(e)
        //    this.playerTop = e.target.offsetTop
           this.videoId = vid
           document.getElementById(`svideo${vid}`).webkitRequestFullScreen()
       },
       onPlayerPause(e) {
           console.log(e)
       },
        topScroll() {
            var scrollTop = document.getElementById('app').pageYOffset || document.getElementById('app').scrollTop
            var scrollHeight = document.getElementById('app').scrollHeight
            var clientHeight = document.getElementById('app').clientHeight
            // console.log(scrollTop,clientHeight,scrollHeight)
            //  if(scrollTop >this.playerTop) {
            //    console.log(document.getElementById(`svideo${this.videoId}`))
            //    document.getElementById(`svideo${this.videoId}`).pause()
            // // this.onPlayerPause()
            // }
            if(this.$route.name == 'Video') {
                var videotab = document.getElementById('videotab')
                var videotabHight = videotab.offsetTop;
            }
            if(scrollTop > videotabHight) {
                this.tabfix = true
            }else {
                this.tabfix = false
            }

            if(scrollTop + clientHeight == scrollHeight) {
                let paramsData = {
                    vod_type:this.indexvalue,
                    page:this.curpage
                }
                if(this.pageFlag) {
                    this.$ajax.getVideoList(paramsData).then(res => {
                        console.log(res)
                        this.videoDatas = this.videoDatas.concat(res.data.data)
                        for(let val of res.data.data) {
                            val.playerOptions = {
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
                                    src: val.video_url
                                }],
                                poster: val.cover_img, //你的封面地址
                                width: document.documentElement.clientWidth,
                                notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                            }
                        }
                        if(this.videoDatas.length < res.data.totalCount) {
                            this.curpage++
                            this.moreFlag = true
                        }else {
                            this.pageFlag = false
                            this.moreFlag = false
                        }
                    })
                }else {
                    this.noMoreFlag = true;
                    this.moreFlag = false;
                }
            }
        },
        getVD() {
            let paramsData = {
              vod_type:this.indexvalue,
              page:1
            }
            this.$ajax.getVideoList(paramsData).then(res => {
                // console.log(res)
                this.videoDatas = res.data.data
                for(let val of res.data.data) {
                    val.playerOptions = {
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
                            src: val.video_url
                        }],
                        poster: val.cover_img, //你的封面地址
                        width: document.documentElement.clientWidth,
                        notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    }
                }
                if(res.data.totalCount > 10) {
                    this.curpage == 2
                    this.pageFlag = true
                    this.moreFlag = true
                }else {
                    this.pageFlag = false
                    this.moreFlag = false
                }
            })
        }
    },
    watch:{
        indexvalue(val) {
            // console.log(val)
            this.getVD()
        }
    },
    mounted() {
        document.getElementById('app').addEventListener('scroll', this.topScroll)
        // eventVue.$on('TabsIndex', val =>{
        //     this.curVal = val
            
        // })
        this.getVD()
    },
    beforeDestroy() {
      document.getElementById('app').removeEventListener('scroll', this.topScroll)
    }
}
</script>
<style lang="scss">
.no-data {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 13rem;
        height: 10.45rem;
        margin-top: 13.2rem;
    }
    span {
        color: #9B9B9B;
        font-size: 1.3rem;
        line-height: 1.85rem;
        margin-top: 2rem;
    }
}
.no-more,.bottom-more {
    width: 100%;
    height:4.4rem;
    line-height: 4.4rem;
    text-align: center;
    font-size: 1.2rem;
    color:#BFBFBF;
    // border-bottom:1px solid #EDEEF1;
}
.playvideo.vjs-custom-skin .video-js.vjs-paused .vjs-big-play-button {
    width: 52px !important;
    height: 52px !important;
    border-radius: 50%;
    margin-left: -26px;
    line-height: 1.4em !important;
    // background-color: rgba(36,131,213,0.9);
  }
  .playvideo.vjs-custom-skin .video-js.vjs-paused:hover .vjs-big-play-button{
        background-color: rgba(0,0,0,0.45);
  }
</style>

