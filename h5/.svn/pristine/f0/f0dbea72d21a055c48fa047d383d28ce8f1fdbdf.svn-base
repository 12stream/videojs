<template>
  <div>
    <transition name="msgbox">
      <div v-if="show" class="msgbox-container" :class="className">
        <!-- <header>{{title}}</header> -->
        <div class="cancel" @click="cancelModal">x</div>
        <div class="content-body">
          <div class="content">{{content}}</div>
        </div>
        <botton class="sucess">已完成支付</botton>
        <footer>
          <!-- <a v-if="cancel" href="javascript:;" @click="cancelBtn" class="button">{{cancel}}</a> -->
          <div class="again-pay">支付遇到问题，<span @click="successBtn">重新支付</span></div>
        </footer>
      </div>
    </transition>
    <div class="mask" v-if="show" @click="cancelModal"></div>
  </div> 
</template>
<script>
export default {
  data () {
    return {
      show: false,
      title: '提示',
      content: '',
      confirm: '确定',
      cancel:'',
      className:''
    }
  },
  watch:{
    show (val) {
      if (val) {
        if(!this.hasClass(document.body,"pop-mask")){
          this.addClass(document.body,"pop-mask");
        }
      }else{
        this.removeClass(document.body,"pop-mask");
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
    cancelModal() {
      this.show = false
    },
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
  width: 90%;
  background: #fff;
  color: #555;
  border-radius: 0.8rem;
  transform:translate(-50%,-50%) scale(1, 1);
  z-index: 2;
  .cancel {
      padding-left: 1rem;
      padding-top: 0.5rem;
      font-size: 1.5rem;
  }
  .sucess {
      display: block;
      width: 80%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      border-radius: 15px;
      background: #FF6633;
      margin: 0 10%;
      color: #fff;
  }
//   header{
//     margin: 0;
//     padding: 1.2rem 0;
//     text-align: center;
//     color: #333;
//     line-height: 2rem;
//     font-size: 1.7rem;
//     border-radius: 0.8rem 0.8rem 0 0;
//     background: #fff;
//     border-width: 0;
//     border-bottom: 1px solid #ccc;
//   }
  .content-body{
    font-size: 1.5rem;
    margin: 2rem 1rem;
    line-height: 2;
    max-height: 20rem;
    overflow-y: auto;
    color: #666;
    div{
      padding: 0 1rem;
      text-align: center;
      word-break: break-all;
    }
  }
  footer {
    width: 100%;
    text-align: center;
    display: block !important;
    border-width: 0;
    border-top: 1px solid #ccc;
    overflow: hidden;
    background: transparent;
    border-radius: 0 0 0.8rem 0.8rem;
    .again-pay {
        height: 44px;
        line-height: 44px;
        width: 100%;
        span {
            color: #FF6633;
        }
    }
    // .button{
    //   float: left;
    //   padding: 1rem 0;
    //   width: 50%;
    //   color: #999;
    //   box-sizing: border-box;
    //   line-height: 3rem;
    //   font-size: 1.7rem;
    //   background: #f7f7f7;
    //   border-right: 1px solid #D5D7D6;
    //   text-decoration: none;
    //   -webkit-tap-highlight-color: transparent;
    // }
    // .button:first-child:nth-last-child(1) {
    // 	width: 100%;
    // }
    // .button:first-child:nth-last-child(2) ~ .button {
    // 	width: 50%;
    // }
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
  z-index: 1;
}
</style>