<template>
  <div class="main" @click.stop>
    <!-- <div class="return-title" v-if="!weixinFlag">
        <span>中国网正在上演</span>
    </div> -->
    <div class="search">
      <span class="logo"></span>
      <span class="searchinput" @click="$router.push({path:'/search'})">请输入要搜索的内容
        <img src="./images/search.png">
      </span>
    </div>
    <div class="banner">
      <swiper :options="swiperOption"  ref="mySwiper">  
          <swiperSlide v-for="(item,i) in carousel" :key="i"> 
            <a :href="item.key" v-if="item.type == 1">
              <img :src="item.imageUrl" class="index_img">
            </a>
              <img :src="item.imageUrl" class="index_img" v-if="item.type == 0" @click="$router.push({path:`/live/${item.key}`})">
          </swiperSlide>  
          <!-- 这是轮播的小圆点 -->  
          <div class="swiper-pagination swiper-pagination-white" slot="pagination" v-if="carousel.length !== 1"></div>  
      </swiper>  
    </div>
    <div class="hot-new-wrapper">
      <!-- 热门，最新tab标题 -->
      <div class="hotnew">
        <div class="hot-new" v-for="(item,i) in tabContents" :key="i">
          <div :class="currentTabsIndex == i ? 'tabs-item active' : 'tabs-item'" @click="selectTabs(i)">
            {{item}}
          </div>
        </div>
      </div>
        <!-- 热门内容 -->
        <Hot :tabNumber="currentTabsIndex" :totalNumber='total' v-show="currentTabsIndex == 0" :moreFlag='waitF'></Hot>
        <!-- 最新内容 -->
        <New :tabNumber="currentTabsIndex" :totalNumber='total' v-show="currentTabsIndex == 1" :newMoreFlag='newWaitF'></New>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import eventVue from '@/components/eventVue';
import {is_weixn, is_QQ} from '@/utils/utils'
import {getCookie, removeCookie} from '@/api/config'
import Hot from './home/Hot'
import New from './home/New'
export default {
  name: 'index',
  data () {
    return {
      carousel:[],
        swiperOption: {}, 
        tabContents:['热门','最新'],
        currentTabsIndex:0,
        playsTitle:'',
        carsouelList:[],
        weixinFlag:false,
        total:0,
        // swiperOption:{}
        swiperOption: {
          pagination: '.swiper-pagination',  
          paginationClickable: true,
          autoplay: 3000,
          speed:500,
          // loop:true,
          autoplayDisableOnInteraction: false,
          // initialSlide :1,//轮播不设置该属性，初始化的第一张图片为最后一张图片
      },
      waitF:false,
      newWaitF:false
    }
  },
  components:{Hot, New, swiper, swiperSlide},
  methods:{
    // 处理向左划到第一张不复制点击事件问题
    // endImg(){
    //   console.log(123)
    // },
    selectTabs(index){
      this.currentTabsIndex = index;
    },
    // 轮播
    getShuffling(){
      var params = {
        bizCode:'9024',
        appID:'1',
        pageNo:1,
        pageSize:8
      }
      this.$ajax.getcarousel(params).then(res =>{
        if (res.params.page > 8) {
          this.carousel = res.params.list.slice(0,7)
        }else {
          this.carousel = res.params.list
        }
        if(res.params.list) {
          var index = res.params.page.total;
          if(res.params.list.length == 1) {
             this.swiperOption = {}
          }else {
            this.swiperOption = {
                pagination: '.swiper-pagination',  
                paginationClickable: true,
                onSlideChangeEnd: swiper => {  
                    //这个位置放swiper的回调方法  
                    this.page = swiper.realIndex+1;  
                    this.index = swiper.realIndex;  
                },
                autoplay: 3000,
                speed:500,
                // loop:true,
                autoplayDisableOnInteraction: false,
                // initialSlide :1,
            }    
          }
        }
      })
    },
    // 热门
    getLiveData(){
      if(is_weixn() || is_QQ()) {
        this.weixinFlag = true
      }
      var params = {
        page_index:1,
        page_size:10
      }
      this.$ajax.hotList(params).then(res => {
        console.log(res)
        if(res.code == '200') {
          eventVue.$emit('loadingH',false)
        }
        this.total = res.data.page.total
        // 数据存在
        if(res.data.data_list) {
          for(let val of res.data.data_list) {
            if(val.cur_viewers > 9999) {
              val.curViews = (val.cur_viewers/10000).toFixed(2) + '万'
            }
          }
          eventVue.$emit('playsHot',res.data.data_list)
          var liveResult = this.plays;
        }
        // 当前条数小于总条数
        if(res.data.data_list.length < res.data.page.total) {
          this.waitF = true
        }
      })
    },
    // 最新
    getNewData() {
      var params = {
        page_index:1,
        page_size:10
      }
      this.$ajax.newList(params).then(res => {
        if(res.code == '200'){
          eventVue.$emit('loadingN',false)
        }
        for(let val of res.data.data_list) {
          if(val.live_status == 0) {
              val.liveType = '预约'
            }else if(val.live_status == 5) {
              val.liveType = '查看'
            }else {
              val.liveType = '观看'
            }
            if(val.cur_viewers > 9999) {
              val.curViews = (val.cur_viewers/10000).toFixed(2) + '万'
            }
        }
         // 当前条数小于总条数
        if(res.data.data_list.length < res.data.page.total) {
          this.waitF = true
        }
        eventVue.$emit('playsNew',res.data.data_list)
      })
    }
  },
  computed:{
    swiper() {  
      return this.$refs.mySwiper.swiper;  
    }  
  },
  mounted(){
    this.getShuffling()
    this.getNewData()
    this.getLiveData()
    // if(getCookie('wxUserOpenid')) {
    //   removeCookie('oneCode')
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  /* pages/hall/hall.wxss */
.main {
  padding-bottom: 4.9rem;
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
}
.search {
  width: 100%;
  background: #EDEEF1;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 90px;
    height: 25px;
    background: url('images/logo.png') no-repeat;
    background-size: 90px 25px;
    margin-left: 1.5rem;
  }
  .searchinput {
    height: 3.2rem;
    background: #fff;
    border-radius: 1.7rem;
    flex: 8;
    font-size: 1.3rem;
    margin: 0 1.5rem;
    padding-left: 1.5rem;
    line-height: 3.2rem;
    color: #9B9B9B;
    position: relative;
    img {
      height: 2rem;
      width: 2rem;
      position: absolute;
      right: 1rem;
      top: 50%;
      margin-top: -1rem;
    }
  }
}
.banner {
  width: 100%;
  height: 12rem;
  img {
    width: 100%;
    height: 12rem;
    overflow: hidden;
  }
}
.hotnew {
  display: flex;
  justify-content: center;
  align-items:center;
  .hot-new {
    .tabs-item {
      padding: 1.2rem 2.8rem;
      font-size: 1.3rem;
      color:#111;
      display: flex;
      align-items: center;
      &.active {
        font-size: 2.1rem; 
        color: #FF6633;
      }
    }
  }
}
// .pay-money {
//   width: 5rem;
//   height: 1.9rem;
//   border-radius:5rem 0rem 0rem 5rem;
//   position: absolute;
//   top: 1rem;
//   right: 0;
//   background: #FF6634;
//   color: #fff;
//   text-align: center;
//   line-height: 1.9rem;
// }
</style>
