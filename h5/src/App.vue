<template>
<div id="app-wrapper">
  <div id="bottom-wrapper" v-if="$route.meta.navStatus">
    <div id="bottom">
        <router-link to="/hall">
          <span class="icon"></span>
          <span class="icon-word">大厅</span>
        </router-link>
      <router-link to="/video">
        <span class="icon"></span>
        <span class="icon-word">视频</span>
      </router-link>
      <router-link to="/appointment">
        <span class="icon"></span>
        <span class="icon-word">已预约</span>
      </router-link>
      <router-link to="/personal">
        <span class="icon"></span>
        <span class="icon-word">个人中心</span>
      </router-link>
    </div>
  </div>
  <!-- 此做法不是常规的写法，无奈ios固定定位层级在vue的子组件兼容不好，出此下策 -->
  <div class="bottom-invitation-pay" v-if="livebStatus">
      <span class="invitation" @click="appInvite">邀请</span>
      <span class="pay" @click="payClick">{{payWord}}</span>
  </div>
   <!-- 邀请 -->
  <transition name="invite" v-if="inviteFlag">
      <div class="live-invite1">
          <div class="card" @click="$router.push({path:`/invite/${lId}`})">
              <img src="./assets/images/icon_Invitation.png">
              <span>邀请卡</span>
          </div>
          <div class="cancel" @click="closeLiveInvite">取消</div>
      </div>
  </transition>
   <div class="mask-live" v-if="inviteFlag" @click="closeInvite"></div>
  <div id="app">
      <router-view/>
  </div>
</div>
  
</template>

<script>
import eventVue from '@/components/eventVue.js'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      livebStatus:false,
      payWord:'付费预约',
      inviteFlag:false,
      lId:''
    }
  },
  methods:{
    // 点击了邀请
    appInvite() {
      this.inviteFlag = true
      eventVue.$emit('appToLive',true)
    },
    // 点击了预约付费按钮
    payClick() {
      eventVue.$emit('payFT',true)
    },
    // 关闭邀请卡
    closeLiveInvite(){
        this.inviteFlag = false
    },
    closeInvite(){
       this.inviteFlag = false
    }
  },
  mounted(){
    // console.log(this.$route)
    // 直播详情底部邀请，付费的有无
    eventVue.$on('livebottom',res =>{
      console.log('无奈的选择',res)
      this.livebStatus = res
      this.lId = this.$route.params.liveId
      if(!res) {
        this.inviteFlag = false
      }
    })
    // 预告，付费的显示字样
    eventVue.$on('payTitle',res =>{
      console.log('字体',res)
      this.payWord = res
    })
    
  }
}
</script>

<style lang="scss">
    // 邀请
.invite-enter-active{
	/*从下到上*/
	animation:slideTop .4s;
}


.invite-leave-active{

	/*从上到下*/
	animation:slideBottom .4s;
}
@keyframes slideTop{

	0%{
		transform: translate(0,100%);
	}

	100%{
		transform: translate(0,0);
	}
}

@keyframes slideBottom{

	0%{
		transform: translate(0,0);
	}

	100%{
		transform: translate(0,100%);
	}
}
.live-invite1 {
    height: 14.8rem;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 15;
    .card {
        width: 100%;
        height: 10.5rem;
        border-bottom: 1px solid #E3E3E7;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span {
            color: #909090;
            margin-top: 0.3rem;
        }
        img {
            width: 4.8rem;
            height: 4.8rem;
        }
    }
    .cancel {
        width: 100%;
        height: 4.1rem;
        line-height: 4.1rem;
        text-align: center;
        color: #9B9B9B;
        font-size: 1.5rem;
    }
}
.mask-live {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 1;
}
.bottom-invitation-pay {
    width: 100%;
    height: 4.8rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    color: #fff;
    text-align: center;
    .invitation {
        flex: 1;
        background: #576AF4;
        line-height: 4.8rem;
    }
    .pay {
        flex: 2;
        background: #FF6633;
        line-height: 4.8rem;
    }
    // .payh {
    //     background: yellow;
    //     color: #000;
    //     flex: 2;
    // }
}
#app {
  height: 100%;
}
  #bottom-wrapper {
    width: 100%;
    position: fixed;
    background: #fff;
    bottom: 0;
    left:0;
    height: 4.9rem;
    z-index: 10;
    #bottom {
      display: flex;
      z-index: 24;
      height: 4.9rem;
      justify-content: space-around;
      border-top: 1px solid #f1f1f1;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon {
          width: 25px;
          height: 25px;
          display: inline-block;
        }
      }
      a:nth-of-type(1){
        .icon {
          background: url('assets/images/hall.png') no-repeat center;
          background-size: 25px 25px;
        }
        &.router-link-exact-active {
          .icon {
            background: url('assets/images/hall-select.png') no-repeat center;
            background-size: 25px 25px;
          }
          .icon-word {
            color: #FF6634;
          }
        }
      }
      a:nth-of-type(2){
        .icon {
          background: url('assets/images/video.png') no-repeat center;
          background-size: 25px 25px;
        }
        &.router-link-exact-active {
          .icon {
            background: url('assets/images/video-select.png') no-repeat center;
            background-size: 25px 25px;
          }
          .icon-word {
            color: #FF6634;
          }
        }
      }
      a:nth-of-type(3){
        .icon {
          background: url('assets/images/order.png') no-repeat center;
          background-size: 25px 25px;
        }
        &.router-link-exact-active {
          .icon {
            background: url('assets/images/order-select.png') no-repeat center;
            background-size: 25px 25px;
          }
          .icon-word {
            color: #FF6634;
          }
        }
      }
      a:nth-of-type(4){
        .icon {
          background: url('assets/images/personal.png') no-repeat center;
          background-size: 25px 25px;
        }
        &.router-link-exact-active {
          .icon {
            background: url('assets/images/personal-select.png') no-repeat center;
            background-size: 25px 25px;
          }
          .icon-word {
            color: #FF6634;
          }
        }
      }
    }
  }
</style>
