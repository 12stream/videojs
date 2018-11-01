<template>
    <div class="box">
        <img src="../../common/image/defaultDiagram.png" alt="" srcset="" width="100%" height="100%">
    </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
      console.log('去省图')
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {

        }else{
            this.$router.push({
                path:'/index'
            })
        }
  },
};
</script>
<style scoped>
    .box{
        width: 100%;
        height: 100%;
        background-image: url('../../common/image/defaultDiagram.png');
        background-size: 100% 100%；
    }
    .queshengtu{
        width: 100%;
        height: 100%;
        background-image: url('../../common/image/defaultDiagram.png');
        background-size: 100% 100%；
    }
</style>
