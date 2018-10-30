<template>
  <time>{{timeflag ? str : str1}}</time>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['time','timeflag'],
  computed: {
    str() {
      var date = new Date(this.time);
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth()+1 < 10 ? + (date.getMonth()+1) : date.getMonth()+1) + '/';
      var D = date.getDate() + ' ';
      var H = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      var Mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return Y  + M + D  + H + Mi
    },
     str1() {
        var date = new Date(this.time);
        var Y = date.getFullYear();
        var M = (date.getMonth()+1 < 10 ? + (date.getMonth()+1) : date.getMonth()+1) ;
        var D = date.getDate() < 10 ? + '0' + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return Y + '-' + M + '-' + D + '　' + h + ':' + m
    }
  },
  methods: {
    
  },
  mounted() {
    
  },
}
</script>

<style>

</style>
