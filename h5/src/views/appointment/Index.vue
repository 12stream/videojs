<template>
    <div class="appointment">
        <!-- <div class="return-title" v-if="!weixinFlag">
            <span>中国网正在上演</span>
        </div> -->
        <div class="appointment-wrapper" >
            <div :class="appointplay.length-1 == i ? 'appointment-list noborder' : 'appointment-list'" v-for="(item,i) in appointplay" :key="i" v-if="appointplay.length !== 0" @click="toLiveDetail(item.id)">
                <div class="appointment-img">
                    <img :src="item.live_cover_url">
                    <span class="play" v-if="item.live_status == 1">直播</span>
                    <span class="afterplay" v-else-if="item.live_status == 0">预告</span>
                    <span class="curplay" v-else-if="item.live_status == 2">回放</span>
                    <span class="end" v-else-if="item.live_status == 5">结束</span>
                </div>
                <div class="appointment-details">
                    <div class="title">{{item.live_name}}</div>
                    <div class="time">时间 : <Countdown :time='item.beginTime' :timeflag="true"></Countdown></div>
                    <div class="hot" v-if="item.live_status !== 0">热度 : {{item.watch_num}}</div>
                    <div class="hot" v-else-if="item.live_status == 0">热度 : {{item.subscrib_num}}</div>
                    <div class="price" v-if="item.live_permit == 2"> 
                        <sub>￥</sub>
                        <span class="money">{{item.view_pass}}</span>
                    </div>
                </div>
            </div>
            <div class="noappointment-list" v-if="loadingv">
                 <Wait></Wait>
            </div>
            <div class="noappointment-list" v-if="(appointplay.length == 0 || !appointplay) && !loadingv">
                <img src="@/components/images/img-ship.png">
                <span>您还没有预约直播哦~</span>
            </div>
            <!-- <div class="bottom-more" v-if="moreFlag">下拉加载更多！</div> -->
            <Wait class="bottom-more" v-if="moreFlag"></Wait>
            <div class="no-more" v-if="noMoreFlag && appointplay.length !== 0">已经到底啦！</div>            
        </div>
    </div>
</template>
<script>
import Countdown from '@/components/CountDown'
import Wait from '@/components/Wait'
import {is_weixn, is_QQ} from '@/utils/utils'
import {getLStorage} from '@/api/config'
export default {
    data() {
        return {
            appointplay:[], 
            weixinFlag:false,
            Page:2,
            moreFlag:false,//下拉加载更多
            pageFalg:true,
            noMoreFlag:false,//已经到底了
            loadingv:true,//优化未加载到数据时的状态
        }
    },
    components:{Countdown, Wait},
    methods:{
        toLiveDetail(liId){
        // window.location.href = 'http://localhost:8080?code=0612Wcld2Sr50E0uould2ERkld22Wcli&state=STATE#/live/817433040754981686'
            var url = window.location.href;
            if(url.indexOf('code') > -1) {
                window.location.href = `${url.split('?code')[0]}#/live/${liId}`
            }else {
                this.$router.push({path:`/live/${liId}`})
            }
        },
        getAppoinetmentList(){
             if(is_weixn() || is_QQ()) {
                this.weixinFlag = true
            }
            if(getLStorage('thirdUserInfo')) {
                var thirMessage = JSON.parse(getLStorage('thirdUserInfo'))
                var thirid = JSON.parse(getLStorage('thirdUserInfo')).id
            }else{
                var thirid = getLStorage('userid')
            }
            this.$ajax.appointOk({
                user_id:thirid,
                page_index:1,
                page_size:10
                }).then(res =>{
                    if(res.code == 200) {
                        this.loadingv = false
                        if(res.data.data_list) {
                            this.appointplay = res.data.data_list;
                        }
                        if(res.data.page.total < 10) {
                            this.noMoreFlag = true;
                        }else {
                            this.noMoreFlag = false;
                        }
                    }
            })
        },
        newMouseWheelListent() {
        var scrollTop = document.getElementById('app').pageYOffset || document.getElementById('app').scrollTop
        var scrollHeight = document.getElementById('app').scrollHeight
        var clientHeight = document.getElementById('app').clientHeight
        if(scrollTop + clientHeight == scrollHeight) {
            if(getLStorage('thirdUserInfo')) {
                var thirMessage = JSON.parse(getLStorage('thirdUserInfo'))
                var thirid = JSON.parse(getLStorage('thirdUserInfo')).id
            }else{
                var thirid = getLStorage('userid')
            }
          if(this.pageFalg) {
                this.$ajax.appointOk({
                user_id:thirid,
                page_index:this.Page,
                page_size:10
              }).then(res =>{
                if(res.data.data_list) {
                  this.appointplay = this.appointplay.concat(res.data.data_list)
                }
                  if(this.appointplay.length < res.data.page.total) {
                    this.Page++
                    this.moreFlag = true
                  }else {
                    this.pageFalg = false
                    this.moreFlag = false
                    this.noMoreFlag = true
                  }
              })
          }else {
            this.noMoreFlag = true;
            this.moreFlag = false;
            console.log(78390)
          }
        }
      }
    },
    mounted(){
        document.getElementById('app').addEventListener('scroll', this.newMouseWheelListent)
        this.getAppoinetmentList()
    },
    destoryed() {
      document.getElementById('app').removeEventListener('scroll', this.newMouseWheelListent)
    }
}
</script>

<style lang="scss">
.return-title {
    display: flex;
    justify-content: center;
    height: 44px;
    background: #EDEEF1;
    span {
        font-size: 17px;
        color: #111;
        line-height: 44px;
    }
}
.appointment {
    padding-bottom: 4.9rem;
}
.appointment-list {
  display: flex;
  border-bottom: 1px solid #f2f2f2;
  &.noborder {
      border: none;
  }
  .appointment-img {
      position: relative;
      img {
            width: 15rem;
            height: 8.5rem;
            padding: 1rem;
            border-radius: 0.3rem;
      }
      span {
            position: absolute;
            top: 1.6rem;
            left: 1.4rem;
            width:4rem;
            height:1.6rem;
            border-radius:1rem;
            font-size: 1.1rem;
            line-height: 1.6rem;
            text-align: center;
            color: #fff; 
            &.play {
                background:#FF1818;
            }
            &.afterplay {
                background:#74C022;
            }
            &.curplay {
                background:#4285F4;
            }
            &.end {
                background:#101010;
            }
      }
  }
  .appointment-details {
        flex: 1;
        padding-top: 1rem;
        .title {
            font-size: 1.5rem;
            color: #333333;
            line-height: 2.1rem;
        }
        .time,.hot {
            font-size:1.2rem;
            color:#9B9B9B;
            line-height:1.5rem;
        }
        .price {
            sub {
                font-size: 0.8rem;
                color: #FF6633;
                // position: relative;
                // top: -1px;
            }
            .money {
                font-size: 1rem;
                color: #FF6633;
                height:1.8rem;
                line-height: 1.4rem;
                position: relative;
                top: 0.2rem;
            }
        }
  }
}
.noappointment-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 13.8rem;
    span {
        margin-top: 2rem;
        color: #9B9B9B;
    }
}
.no-more {
    text-align: center;
    // margin: 3.5rem 0;
    color: #BFBFBF;
}
</style>

