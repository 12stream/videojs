<template>
  <div>
    <transition name="msgbox">
      <div v-if="show" class="msgbox-container" :class="className">
        <header v-if="resultF">{{title}}</header>
        <header v-if="xF" class="isx" @click="cancelP">x</header>
        <div class="content-body">
          <div>
            <p>{{content1}}</p>
            <p>{{content2}}</p>
          </div>
        </div>
        <footer :class="xF? 'isfooter' : ''">
          <a v-if="cancel" href="javascript:;" @click="cancelBtn" :class="xF ? 'cancelr button' : 'button'">{{cancel}}</a>
          <a href="javascript:;" @click="successBtn" :class="xF ? 'comlr button' : 'button'">{{confirm}}</a>
        </footer>
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
      title: '提示',
      content1: '',
      content2:'',
      confirm: '确定',
      cancel:'',
      className:'',
      resultF:false,
      xF:false
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
    cancelP(){
      this.show = false;
    },
    successBtn () {
      this.show = false;
    },
    cancelBtn () {
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
  top:60%;
  left:50%;
  width: 80%;
  background: #fff;
  color: #555;
  border-radius: 0.8rem;
  transform:translate(-50%,-50%) scale(1, 1);
  z-index: 2;
  header{
    margin: 0;
    padding: 1.2rem 0;
    text-align: center;
    color: #333;
    line-height: 2rem;
    font-size: 1.7rem;
    border-radius: 0.8rem 0.8rem 0 0;
    background: #fff;
    border-width: 0;
    border-bottom: 1px solid #ccc;
    &.isx{
      text-align:left;
      padding: 1rem 2rem;
      border-bottom: 0;
      font-size: 2rem;
    }
  }
  .content-body{
    font-size: 1.5rem;
    margin: 0px 0 2.2rem 0;
    line-height: 2;
    max-height: 20rem;
    overflow-y: auto;
    color: #666;
    div{
      padding: 0 1rem;
      text-align: center;
      word-break: break-all;
      color: #000000;
      font-weight:400;
    }
  }
  footer {
    width: 100%;
    text-align: center;
    // display: block !important;
    padding-bottom: 20px;
    border-width: 0;
    border-top: 1px solid #ccc;
    overflow: hidden;
    background: transparent;
    border-radius: 0 0 0.8rem 0.8rem;
    &.isfooter{
      border:none;
      display: flex;
      justify-content: space-around;
      a{
         background: #fff;
         font-size: 1.3rem;
      }
    }
    .button{
      float: left;
      padding: 1rem 0;
      width: 50%;
      color: #999;
      box-sizing: border-box;
      line-height: 3rem;
      font-size: 1.7rem;
      background: #f7f7f7;
      border-right: 1px solid #D5D7D6;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      &.cancelr{
        border: 1px solid #979797;
        font-size: 1.3rem;
        width: 10rem;
        height: 3.4rem;
        line-height: 3.4rem;
        display: inline-block;
        color: #979797;
        border-radius: 1.7rem;
        padding: 0;
      }
      &.comlr{
        border: 1px solid #FF6633;
        font-size: 1.3rem;
        width: 10rem !important;
        height: 3.4rem;
        line-height: 3.4rem;
        display: inline-block;
        color: #fff;
        border-radius: 1.7rem;
        padding: 0;
        background: #FF6633;
      }
    }
    .button:first-child:nth-last-child(1) {
    	width: 100%;
    }
    .button:first-child:nth-last-child(2) ~ .button {
    	width: 50%;
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
  z-index: 1;
}
</style>