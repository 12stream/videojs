<template>
    <div class="account">
        <m-header></m-header>
        <div class="w1000 mt20">
            <el-row>
                <el-col :span="5" style="width:190px">
                    <giftLeft></giftLeft>
                </el-col>
                <el-col :span="19" style="width:970px">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
        <m-footer></m-footer>
    </div>
</template>

<script>
    import MHeader from 'components/header/header'
    import giftLeft from 'components/leftnav/giftLeft'
    import axios from 'axios'
    import {ERR_OK,DATA_URL} from 'api/config'
    import mFooter from 'components/header/footer'
    export default{
        components:{
            MHeader,
            giftLeft,
            mFooter
        }
    }
</script>

<style scoped>
.live-top{padding-left: 25px;}
.live-top.bg-fff{background: #fff;}
/* .account .mt20{
    min-height: 780px;
 } */
</style>
<style>
.live-top{line-height:30px;border-bottom:1px solid #e9e9e9;font-size:16px;}
</style>

