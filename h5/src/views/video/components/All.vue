<template>
    <div class="all-wrapper">
        <div class="all" v-for="(item,i) in videoList" :key="i">
            <video-player :id="'svideo' + item.id" class="playvideo vjs-custom-skin" x5-video-player-type="h5" :playsinline="true" webkit-playsinline :options="item.playerOptions" @play="onPlayerPlay($event,item.id)"
                     @pause="onPlayerPause($event)">
            </video-player>
            <!-- <video controls="controls" :id="'svideo' + item.id" class="playvideo vjs-custom-skin" webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow"
                    width="100%" height="100%" :src="item.video_url" preload="true" :poster="item.cover_img" @play="onPlayerPlay($event,item.id)" @pause="onPlayerPause($event)">
            </video> -->
            <div class="video-introduct">
                <p class="title" @click="$router.push({path:`/video/details/${item.id}`})">{{item.video_name}}</p>
                <p class="time">创建时间：<Countdown :time="item.create_time" :timeflag='true'></Countdown></p>
            </div>
        </div>
         <!-- <div class="bottom-more" v-if="moreF">下拉加载更多！</div> -->
         <Wait class="bottom-more" v-if="moreF"></Wait>
         <div class="no-more" v-if="noMoreF">已经到底啦！</div>
    </div>
</template>
<script>
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
            playerOptions: {
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
                poster: "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          },
          playerTop:0,
          videoId:0,
          events: ['fullscreenchange']
        }
    },
    props:['videoList', 'moreF', 'noMoreF'],
    components:{Countdown, Wait},

    methods:{
       onPlayerPlay(e,vid) {
           console.log(e)
        //    this.playerTop = e.target.offsetTop
           this.videoId = vid
        //    document.getElementById(`svideo${vid}`).requestFullscreen()
        document.getElementById(`svideo${vid}`).webkitRequestFullScreen()
        console.log(`svideo${vid}`)
       },
       onPlayerPause(e) {
           console.log(e)
       },
       onPlayerFullScreenchange(player) {
        console.log(player)
        player.exitFullscreen() 
       },
    //    videomouse() {
    //        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //     //    var allNode = document.getElementsByClassName('all')
    //        if(scrollTop >this.playerTop) {
    //            console.log(document.getElementById(`svideo${this.videoId}`))
    //            document.getElementById(`svideo${this.videoId}`).pause()
    //         // this.onPlayerPause()
    //         }
    //    }
    },
    // mounted() {
    //     window.addEventListener('scroll', this.videomouse)
    // },
    // beforeDestroy() {
    //   window.removeEventListener('scroll', this.videomouse)
    // }
}
</script>
<style lang="scss">
.no-more,.bottom-more {
    width: 100%;
    height:4.4rem;
    line-height: 4.4rem;
    text-align: center;
    font-size: 1.2rem;
    color:#BFBFBF;
    // border-bottom:1px solid #EDEEF1;
}
</style>

