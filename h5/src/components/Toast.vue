<template>
    <div class="wrap" v-if="show">{{text}}</div>
</template>
<style lang='scss'>  
 .wrap{
    max-width: 18.6rem;
    position:fixed;
    left: 50%;
    top:50%;
    background: rgba(0,0,0,.35);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 12;
    text-align: center;
    }
</style>