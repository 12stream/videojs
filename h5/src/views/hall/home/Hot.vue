<template>
<div id="hot">
  <div v-if="play.length !== 0">
    <div v-for="(item,i) in play" :key="i" track-by="$index" @click="toLive(item)">
        <div class="tabs-contents">
          <div class="play-wrapper">
            <div class="play-img">
              <img :src="item.live_cover_url">
            </div>
            <div class="play-details">
              <div class="play-title">
                <span>{{item.live_name}}</span>
                <span class="watch appoint" v-if="item.live_status == 0">预约</span>
                <span class="watch" v-else-if="item.live_status == 1">观看</span>
                <span class="watch goback" v-else-if="item.live_status == 2">观看</span>
                <span class="watch end" v-else-if="item.live_status == 5">查看</span>
              </div>
              <div class="play-time">
                <div class="pay-money" v-if="item.live_permit == 2">付费</div>
                <div class="time">开始时间：<Countdown :time='item.begin_time' :timeflag="true"></Countdown></div>
              </div>     
            </div>
            <!-- 左上脚直播和观看人数开始 -->
            <!-- 直播 -->
            <div class="play-seenumber" v-if="item.live_status == 1">
              <div :class="item.live_status == 1 ? 'play-wordwrapper play' : 'play-wordwrapper'">
                <span class="live-word">直播</span>
                <img src="../images/icon_camera.png">
              </div>
              <span class="see-livenumber">{{item.curViews ? item.curViews : item.cur_viewers}}</span>
            </div>
            <!-- 预告 -->
            <div class="play-seenumber" v-else-if="item.live_status == 0">
              <div :class="item.live_status == 0 ? 'play-wordwrapper afterplay' : 'play-wordwrapper'">
                <span class="live-word">预告</span>
                <img src="../images/icon_clock.png">
              </div>
              <span class="see-livenumber">{{item.subscrib_num ? item.subscrib_num : item.subscrib_num}}</span>
            </div>
            <!-- 回放 -->
            <div class="play-seenumber" v-else-if="item.live_status == 2">
              <div :class="item.live_status == 2 ? 'play-wordwrapper curplay' : 'play-wordwrapper'">
                <span class="live-word">回放</span>
                <img src="../images/icon_back.png">
              </div>
              <span class="see-livenumber">{{item.curViews ? item.curViews : item.cur_viewers}}</span>
            </div>
            <!-- 结束 -->
            <div class="play-seenumber" v-else-if="item.live_status == 5">
              <div :class="item.live_status == 5 ? 'play-wordwrapper end' : 'play-wordwrapper'">
                <span class="live-word">结束</span>
                <img src="../images/icon_clock.png">
              </div>
              <span class="see-livenumber">{{item.curViews ? item.curViews : item.cur_viewers}}</span>
            </div>
            <!-- 左上脚直播和观看人数结束 -->
          </div>
        </div>
    </div>
    <!-- <div class="bottom-more" v-if="moreFlag">下拉加载更多！</div> -->
    <Wait class="bottom-more" v-if="moreFlag"></Wait>
    <div class="no-more" v-if="noMoreFlag">已经到底啦！</div>
  </div>
     <div v-else-if="loadingF" class="nothingdata">
       <Wait></Wait>
    </div>
    <div v-else class="nothingdata">
        <span>暂无数据哦~</span>
    </div>
</div>
</template>
<script>
import Countdown from '@/components/CountDown'
import Wait from '@/components/Wait'
import eventVue from '@/components/eventVue';
export default {
    data() {
        return {
          Page:2,
          pageFalg:true,
          play:[],
          noMoreFlag:false,
          loadingF:true
        }
    },
    components:{Countdown, Wait},
    props:['tabNumber','totalNumber', 'moreFlag'],
    methods:{
      // imgerror(e){
      //   e.path[0].src = require('./../images/card.png')
      // },
      toLive(res) {
        console.log(res)
         var url = window.location.href;
        if(url.indexOf('code') > -1) {
          window.location.href = `${url.split('?code')[0]}#/live/${res.id}`
        }else {
          window.location.href = `${url.split('hall')[0]}live/${res.id}`
        }
      },
      mouseWheelListent() {
        var scrollTop = document.getElementById('app').pageYOffset || document.getElementById('app').scrollTop
        var scrollHeight = document.getElementById('app').scrollHeight
        var clientHeight = document.getElementById('app').clientHeight
        // console.log(scrollTop,scrollHeight,clientHeight)
        if(scrollTop + clientHeight == scrollHeight) {
          if(this.pageFalg && this.tabNumber == 0) {
                this.$ajax.hotList({
                page_index:this.Page,
                page_size:10
              }).then(res =>{
                if(res.data.data_list) {
                  this.play = this.play.concat(res.data.data_list)
                  for(let val of this.play) {
                    // if(val.live_status == 0) {
                    //   val.liveType = '预约'
                    // }else if(val.live_status == 5) {
                    //   val.liveType = '查看'
                    // }else {
                    //   val.liveType = '观看'
                    // }
                    if(val.cur_viewers > 9999) {
                      val.curViews = (val.cur_viewers/10000).toFixed(2) + '万'
                    }
                    if(val.subscrib_num > 9999) {
                      val.subscrib_num = (val.subscrib_num/10000).toFixed(2) + '万'
                    }
                  }
                }
                  if(this.play.length < res.data.page.total || this.play.length == 10) {
                    this.Page++
                    this.moreFlag = true
                  }else {
                    this.pageFalg = false
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
      document.getElementById('app').addEventListener('scroll', this.mouseWheelListent)
       eventVue.$on('playsHot',val =>{
        this.play = val
         for(let lval of this.play) {
          //  if(lval.live_status == 0) {
          //     lval.liveType = '预约'
          //   }else if(lval.live_status == 5) {
          //     lval.liveType = '查看'
          //   }else {
          //     lval.liveType = '观看'
          //   }
            if(lval.cur_viewers > 9999) {
              lval.curViews = (lval.cur_viewers/10000).toFixed(2) + '万'
            }
            if(lval.subscrib_num > 9999) {
              lval.subscrib_num = (lval.subscrib_num/10000).toFixed(2) + '万'
            }
          }
        // 判断初始时是否大于10条显示下来加载更多还是已到底部
         if(this.totalNumber == val.length) {
            this.moreFlag = false;
            this.noMoreFlag = true;
            this.pageFalg = false;
          }else {
             this.pageFalg = true;
          }
      })
      // 加载数据较慢时的优化
      eventVue.$on('loadingH',res=>{
        this.loadingF = res
      })
    },
    beforeDestroy() {
      document.getElementById('app').removeEventListener('scroll', this.mouseWheelListent)
    }
}
</script>
<style lang='scss'>
.nothingdata {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12.4rem;
  span {
    font-size: 1.4rem;
    color: #9B9B9B;
  }
}
.no-more,.bottom-more {
  width: 100%;
  // height: 4.4rem;
  // line-height: 4.4rem;
  padding-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color:#BFBFBF;
}
.tabs-contents {
  width: 92%;
  margin: 0 auto;
  position: relative;
  .play-wrapper {
    margin-bottom:1rem;
    box-shadow: 0 0.3rem 1rem #EDEEF1;
    .play-img {
      img {
        display: inline-block;
        width: 100%;
        height: 19.4rem;
      }
    }
    .play-details {
      .play-title {
        font-size: 1.6rem;
        line-height: 2.3rem;
        color: #333;
        padding: 0.6rem 1rem;
        display: flex;
        justify-content: space-between;
        .watch {
          display: inline-block;
          border-radius:1.6rem;
          width: 5.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
          text-align: center;
          color: #fff;
          font-size: 1.3rem;
          background:linear-gradient(305deg,rgba(255,139,26,1) 0%,rgba(255,102,51,1) 100%);
          box-shadow:0px 4px 8px 0px rgba(255,102,52,0.5);
          &.appoint {
            background:linear-gradient(315deg,rgba(140,208,67,1) 0%,rgba(122,201,34,1) 100%);
            box-shadow:0px 4px 8px 0px rgba(181,239,117,1);
          }
          &.goback {
            background:linear-gradient(121deg,rgba(66,133,244,1) 0%,rgba(113,163,255,1) 100%);
            box-shadow:0px 4px 8px 0px rgba(66,133,244,0.58);
          }
          &.end {
            background:linear-gradient(305deg,rgba(0,0,0,0.8) 0%,rgba(100,100,100,1) 100%);
            box-shadow:0px 4px 8px 0px rgba(0,0,0,0.3);
          }
        }
      }
      .play-time {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        line-height: 1.9rem;
        color: #9B9B9B;
        padding: 0 1rem 0.6rem 1rem;
        >.pay-money {
          width: 3.4rem;
          height: 1.5rem;
          background: url('./../images/Group.png') no-repeat;
          background-size: 3.4rem 1.5rem;
          text-align: center;
          line-height: 1.5rem;
          color: #fff;
          font-size: 1rem;
          margin-right: 0.6rem;
        }
      }
    }
  }
  .play-seenumber {
    width: 80%;
    position: absolute;
    top: 1rem;
    left: 1rem;
    height: 1.9rem;
    display: flex;
    .play-wordwrapper {
      display: flex;
      height: 1.9rem;
      font-size: 1.2rem;
      border-radius:1rem;
      width: 5.4rem;
      text-align: center;
      color: #fff;
      position: relative;
      z-index: 2;
      justify-content: space-around;
      align-items: center;
      &.play {
        background: #FF1818;
      }
      &.afterplay {
        background: #7ED321;
      }
      &.curplay {
        background: #4285F4;
      }
      &.end {
        background: #000;
      }
      .live-word {
        position: relative;
        left: 0.3rem;
      }
    }
    img {
      width: 16px;
      height: 16px;
      position: relative;
      right: 1px;
    }
    .see-livenumber {
      font-size: 1.2rem;
      height: 1.9rem;
      line-height: 1.9rem;
      color: #fff;
      border-radius: 0 1rem 1rem 0;
      background: rgba(0, 0, 0, 0.5);
      min-width: 5rem;
      text-align: center;
      position: relative;
      z-index: 1;
      left: -0.7rem;
    }
  }
}
</style>

