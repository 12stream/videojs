<template>
  <div>
    <transition name="msgbox">
      <div v-if="show" class="msgbox-container" :class="className">
        <header><span @click="nopay">x</span></header>
        <div class="content-body">
          <div>{{content}}</div>
        </div>
         <a href="javascript:;" @click="successBtn" class="button">{{confirm}}</a>
        <!-- <footer>
          <a v-if="cancel" href="javascript:;" @click="cancelBtn" class="button">{{cancel}}</a>
          <a href="javascript:;" @click="successBtn" class="button">{{confirm}}</a>
        </footer> -->
        <div class="footer">支付遇到问题，<a v-if="cancel" href="javascript:;" @click="cancelBtn" class="cancel">{{cancel}}</a></div>
      </div>
    </transition>
    <!-- <div class="mask" v-if="show" @click="cancelModal"></div> -->
    <div class="mask" v-if="show"></div>
  </div> 
</template>
<script>
export default {
  data () {
    return {
      show: false,
    //   title: '提示',
      content: '',
      confirm: '确定',
      cancel:'',
      className:''
    }
  },
  watch:{
    show (val) {
      if (val) {
        if(!this.hasClass(document.body,"pay-mask")){
          this.addClass(document.body,"pay-mask");
        }
      }else{
        this.removeClass(document.body,"pay-mask");
      }
    }
  },
  beforeMount () {
    //如果已经存在，则阻止出现第二次
    let node = document.querySelector('.msgbox-container')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  },
  methods: {
    successBtn () {
      this.show = false;
    },
    cancelBtn () {
      this.show = false;
    },
    nopay(){
        this.show = false;
    },
    // cancelModal() {
    //   this.show = false
    // },
    addClass(obj, cls){
      var obj_class = obj.className,
          blank = (obj_class != '') ? ' ' : '';
      var added = obj_class + blank + cls;
      obj.className = added;
    },
    removeClass(obj, cls){
      var obj_class = ' '+obj.className+' ';
      obj_class = obj_class.replace(/(\s+)/gi, ' ');
      var removed = obj_class.replace(' '+cls+' ', ' ');
      removed = removed.replace(/(^\s+)|(\s+$)/g, '');
      obj.className = removed;//替换原来的 class.
    },
    hasClass(obj, cls){
      var obj_class = obj.className,
          obj_class_lst = obj_class.split(/\s+/);
      var x = 0;
      for(x in obj_class_lst) {
        if(obj_class_lst[x] == cls) {
            return true;
        }
      }
      return false;
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss" scoped>
.msgbox-container{
  position: fixed;
  top:50%;
  left:50%;
  width: 80%;
  background: #fff;
  color: #555;
  border-radius: 0.8rem;
  transform:translate(-50%,-50%) scale(1, 1);
  z-index: 3;
  header{
    span{
        padding: 1rem 1.5rem 0;
        display: inline-block;
        color: #555;
        font-size: 2rem;
    }
  }
  .content-body{
    font-size: 1.5rem;
    margin: 2rem 1rem;
    line-height: 2;
    max-height: 20rem;
    overflow-y: auto;
    color: #666;
    div{
      padding: 0 1rem;
      text-align: justify;
      word-break: break-all;
      text-align: center;
    }
  }
  .button{
      margin: 0 auto;
      width: 90%;
      height: 4.2rem;
      line-height: 4.2rem;
      text-align: center;
      display: block;
      background: #FF6633;
      color: #fff;
      border-radius:1.7rem;
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
  }
  .footer{
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1.3rem;
      color: #9B9B9B;
      a{
          color: #FF6633;
      }
  }
}
.msgbox-enter,.msgbox-leave-to{
  -webkit-transform:  translate(-50%,-50%) scale(0,0);
}
.msgbox-enter-active,.msgbox-leave-active{
  -webkit-transition: all .3s;
  transition: all .3s;
}
.msgbox-enter-to,.msgbox-leave{
    -webkit-transform:  translate(-50%,-50%) scale(1,1);
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 2;
}
</style>