<template>
    <div class="common-title">
         <div class="return-title">
            <span class="goback" @click="goback"></span>
            <span>{{showtitle}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:['showtitle'],
    methods:{
        goback() {
            window.history.go(-1)
        }
    }
}
</script>
<style lang="scss">
.return-title {
    display: flex;
    justify-content: center;
    height: 44px;
    position: relative;
    background: #EDEEF1;
    span {
        font-size: 1.7rem;
        color: #111;
        line-height: 44px;
        &.goback {
            content: "";
                border-left: 1px solid #999;
                border-bottom: 1px solid #999;
                width: 1.2rem;
                height: 1.2rem;
                position: absolute;
                transform: rotate(45deg);
                margin-left: 1.5rem;
                margin-top: -0.6rem;
                top: 50%;
                left: 0;
            }
    }
}
</style>

