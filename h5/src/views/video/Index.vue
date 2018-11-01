<template>
    <div class="video-wrapper" @click.stop>
        <div id="videotab" :class="tabfix ? 'tabfix' : ''">
            <ul>
                <li  v-for="(item,i) in tabContents" :key="i" :class="currentTabsIndex == i ? 'tabs-item active' : 'tabs-item'" @click="selectTabs(i)">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="video">
        <!-- <div class="return-title" v-if="!weixinFlag">
            <span>中国网正在上演</span>
        </div> -->
        <!-- <div id="videotab" :class="tabfix ? 'tabfix' : ''">
            <ul>
                <li  v-for="(item,i) in tabContents" :key="i" :class="currentTabsIndex == i ? 'tabs-item active' : 'tabs-item'" @click="selectTabs(i)">
                    {{item}}
                </li>
            </ul>
        </div> -->
        <All :videoList="videoData" v-if="currentTabsIndex == 0" :moreF='moreFlag' :noMoreF='noMoreFlag'></All>
        <NoAll :videoList="videoData" :indexvalue="vi" v-if="currentTabsIndex !== 0"></NoAll>
    </div>
    </div>
</template>
<script>
import All from './components/All'
import NoAll from './components/NoAll'
import {is_weixn, is_QQ} from '@/utils/utils'
import eventVue from '@/components/eventVue.js'
export default {
    data() {
        return {
            tabContents:['全部', '中华戏曲', '戏剧文化', '亲子剧场', '音乐现场', '旅游演艺','国际剧场','曲艺杂谈'],
            currentTabsIndex:0,
            videoData:[],
            weixinFlag:false,
            tabfix:false,
            curpage:1,
            pageFlag:false,
            moreFlag:false,
            noMoreFlag:false,
            vi:''
        }
    },
    components:{All, NoAll},
    methods:{
        selectTabs(i) {
            if(i == 0) {
               this.vi = '';
            }else if (i > 0) {
               this.vi = i+1;
            }
            this.currentTabsIndex = i;
            // console.log(this.vi)
            // eventVue.$emit('TabsIndex',this.vi)
        },
         getVideoListData() {
             if(is_weixn() || is_QQ()) {
                this.weixinFlag = true
            }
          let paramsData = {
              vod_type:'',
              page:1
            }
            this.$ajax.getVideoList(paramsData).then(res => {
                this.videoData = res.data.data
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
                     this.noMoreFlag = false;
                }else {
                    this.pageFlag = false
                    this.moreFlag = false
                     this.noMoreFlag = true;
                }
            })
        },
        topScroll(e) {
            var scrollTop = document.getElementById('app').pageYOffset || document.getElementById('app').scrollTop
            var scrollHeight = document.getElementById('app').scrollHeight
            var clientHeight = document.getElementById('app').clientHeight
            // console.log(scrollTop,clientHeight,scrollHeight)
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
                    vod_type:'',
                    page:this.curpage
                }
                if(this.pageFlag) {
                    this.$ajax.getVideoList(paramsData).then(res => {
                        console.log(res)
                        this.videoData = this.videoData.concat(res.data.data)
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
                        if(this.videoData.length < res.data.totalCount) {
                            this.curpage++
                            this.moreFlag = true
                             this.noMoreFlag = false;
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
        }
    },
    mounted() {
        if(this.$route.name == 'Video') {
             document.getElementById('app').addEventListener('scroll', this.topScroll)
        }
        this.getVideoListData();
    },
     beforeDestroy() {
      document.getElementById('app').removeEventListener('scroll', this.topScroll)
    }
}
</script>
<style lang="scss">
body::-webkit-scrollbar {
    display: none;
}
.video {
    padding-bottom: 5rem;
    .return-title {
        display: flex;
        justify-content: center;
        height: 4.4rem;
        background: #EDEEF1;
        span {
            font-size: 1.7rem;
            color: #111;
            line-height: 4.4rem;
        }
    }
    // #videotab {
    //     max-width: 100%;
    //     height: 5rem;
    //     background: #fff;
    //     &.tabfix {
    //         position: fixed;
    //         top:0;
    //         left: 0;
    //         z-index: 10;
    //     }
    //     ul {
    //         width: 100%;
    //         height: 5rem;
    //         line-height: 5rem;
    //         white-space: nowrap;
    //         overflow-x: scroll;
    //         // -webkit-overflow-scrolling: touch;
    //         // overflow-scrolling:touch;
    //         // display: flex;
    //         justify-content: space-between;
    //         // align-items: center;
    //         // overflow:hidden;
    //         overflow-y: hidden;
    //         li {
    //             font-size: 1.3rem;
    //             padding: 0 2rem;
    //             color:#4A4A4A;
    //             display: inline !important;
    //             &.active {
    //                 width: 100%;
    //                 font-size: 2.1rem; 
    //                 color: #FF6633;
    //             }
    //         }
    //     }
    //     ul::-webkit-scrollbar{
    //         display: none;
    //     }
    // }
    .no-more,.bottom-more {
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        color:rgb(59, 40, 40);
        // border-bottom:1px solid #EDEEF1;
        &.wait {
            background: #EDEEF1;
        }
        &.nothing {
            height:4.4rem;
            line-height: 4.4rem;
        }
    }
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


  #videotab {
    max-width: 100%;
    height: 5rem;
    background: #fff;
    &.tabfix {
        position: fixed;
        top:0;
        left: 0;
        z-index: 10;
    }
    ul {
        width: 100%;
        height: 5rem;
        line-height: 5rem;
        white-space: nowrap;
        // overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling:touch;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        // overflow:hidden;
        overflow-y: hidden;
        li {
            min-width: 100px;
            height: 5rem;
            // border: 1px solid #000;
            line-height: 5rem;
            font-size: 1.3rem;
            // padding: 0 2rem;
            color:#4A4A4A;
            text-align: center;
            display: inline-block !important;
            &.active {
                width: 100%;
                font-size: 2.1rem; 
                color: #FF6633;
            }
        }
    }
    ul::-webkit-scrollbar{
        display: none;
    }
}
</style>

