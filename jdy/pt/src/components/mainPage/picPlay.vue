<template>
    <div class="carousel-wrap" v-show="!(picData.length == 0)">
        <div v-if="playType=='1'">
            <div class="slide-ul1">
                <li v-for="(list,index) in picData" :key="index" v-show="index===currentIndex" @click="bannClick" @mouseenter="stop" @mouseleave="go">
                    <img :src="list.img_url">
                </li>
            </div>
            <div class="carousel-items"  v-if="picData.length>1">
            <span v-for="(item,index) in picData" :key="index" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
            </div>
        </div>
        <div v-if="playType=='2'">
            <div class="slide-ul2">
                <li v-for="(list,index) in picData" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
                    <img :src="list.img_url">
                </li>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        currentIndex: 0,
        timer: ''
    };
  },
  props: ["picData", "playType"],
  created() {
      this.$nextTick(() => {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        })
  },
  mounted() {},
  watch: {
    picData: function(val, oldVal) {
      console.log("图片列表" + JSON.stringify(val));
    },
    playType: function(val, oldVal) {
      console.log("图片类型" + val);
    }
  },
  methods: {
      bannClick(){
          console.log('nihao')
          this.$emit('bannerOk','1')
      },
      go() {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        },
        stop() {
            clearInterval(this.timer)
            this.timer = null
        },
        change(index) {
            this.currentIndex = index
        },
        autoPlay() {
            this.currentIndex++
            if (this.currentIndex > this.picData.length - 1) {
                this.currentIndex = 0
            }
        }
  }
};
</script>
<style scoped>
 .carousel-wrap {
   height: 145px;
   width: 280px;
   overflow: hidden;
   background-color: #fff;
}

.slide-ul1 {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-ul1 li {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-ul1 img {
  width: 280px;
  height: 145px;
}
.slide-ul2 {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-ul2 li {
  position: relative;
  width: 250px;
  height: 125px;
  margin-left: 15px;
  margin-top: 5px;

}

.slide-ul2 img {
  width: 280px;
  height: 145px;
  border-radius: 5px;
}
.carousel-items {
  position: absolute;
  z-index: 10;
  top: 135px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}

.carousel-items span {
  display: inline-block;
  height: 3px;
  width: 20px;
  margin: 0 3px;
  background-color: #b2b2b2;
  cursor: pointer;
}
.carousel-items .active {
  background-color: #fff;
}

.list-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.list-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%)
}

.list-enter {
  transform: translateX(100%)
}

.list-leave {
  transform: translateX(0)
}
</style>



