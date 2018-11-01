<template>
    <div class="accountLeft left-nav" id="left-nav">
        <el-row class="tac">
            <el-col>
                <el-menu  :default-active="$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">
                    <el-submenu  class="menu_item_title subtitle" index="/account" style="border-bottom: none;padding: 0px;">
                      <template slot="title">账户信息</template> 
                    <el-menu-item index="/account" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">基本信息</el-menu-item>
                    <el-menu-item index="/account/certification"  style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">账户认证</el-menu-item>
                    <el-menu-item index="/account/securitySet" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">安全设置</el-menu-item>
                    <!-- <el-menu-item index="/account/accontlimit" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">账户并发设置</el-menu-item> -->
                    </el-submenu >
                    <el-submenu  class="menu_item_title subtitle" index="/account/recharge" style="border-bottom: none;padding: 0px;">
                      <template slot="title">账户充值</template> 
                    <el-menu-item index="/account/recharge" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">充值</el-menu-item>
                    <el-menu-item index="/account/dilatation" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">空间扩容</el-menu-item>
                    </el-submenu >
                    <el-submenu  class="menu_item_title subtitle" index="/account/withdrawAlipay" style="border-bottom: none;padding: 0px;">
                      <template slot="title">账户提现</template> 
                    <el-menu-item index="/account/withdrawAlipay" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">支付宝提现</el-menu-item>
                    <el-menu-item index="/account/withdraw" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">银行卡提现</el-menu-item>
                    </el-submenu >
                    <el-submenu  class="menu_item_title subtitle" index="/account/rechargeRecord" style="border-bottom: none;padding: 0px;">
                      <template slot="title">账户账单</template> 
                    <el-menu-item index="/account/rechargeRecord" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">充值记录</el-menu-item>
                    <el-menu-item index="/account/withdrawalQuery" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">提现记录</el-menu-item>
                    <el-menu-item index="/account/consumeRecord" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">消费记录</el-menu-item>
                    <el-menu-item index="/account/benefitRecord" style="border-bottom: none;padding-left: 20px !important;background-color:#fff !important;">收益记录</el-menu-item>
                    </el-submenu >
                </el-menu>
                <!-- <el-menu  :default-active="$route.path"  class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">

                    <el-menu-item index="/account" class="menu_item_title bgf">账户信息</el-menu-item>
                    <el-menu-item index="/account">基本信息</el-menu-item>
                    <el-menu-item index="/account/certification">账户认证</el-menu-item>
                    <el-menu-item index="/account/securitySet">安全设置</el-menu-item>

                    <el-menu-item index="/account/recharge" class="menu_item_title bgf">账户充值</el-menu-item>
                    <el-menu-item index="/account/recharge">充值</el-menu-item>
                    <el-menu-item index="/account/dilatation">空间扩容</el-menu-item>

                    <el-menu-item index="/account/withdrawAlipay" class="menu_item_title  bgf">账户提现</el-menu-item>
                    <el-menu-item index="/account/withdrawAlipay">支付宝提现</el-menu-item>
                    <el-menu-item index="/account/withdraw">银行卡提现</el-menu-item>

                    <el-menu-item index="/account/rechargeRecord" class="menu_item_title bgf">账户账单</el-menu-item>
                    <el-menu-item index="/account/rechargeRecord">充值记录</el-menu-item>
                    <el-menu-item index="/account/withdrawalQuery">提现记录</el-menu-item>
                    <el-menu-item index="/account/consumeRecord">消费记录</el-menu-item>
                    <el-menu-item index="/account/benefitRecord">收益记录</el-menu-item>

                </el-menu> -->



                <!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title"><i class="icon iconfont icon-yonghu"></i>账户信息</template>
                        <el-menu-item-group>
                            <el-menu-item index="/account">基本信息</el-menu-item>
                            <el-menu-item index="/account/certification">账户认证</el-menu-item>
                            <el-menu-item index="/account/securitySet">安全设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="icon iconfont icon-fenxiang"></i>账户充值</template>
                        <el-menu-item-group>
                            <el-menu-item index="/account/recharge">充值</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="icon iconfont icon-fenxiang"></i>账户提现</template>
                        <el-menu-item-group>
                            <el-menu-item index="/account/withdraw">账户提现</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="icon iconfont icon-zhangdan1"></i>我的账单</template>
                        <el-menu-item-group>
                            <el-menu-item index="/account/rechargeRecord">充值记录</el-menu-item>
                            <el-menu-item index="/account/spendRecord">消费记录</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu> -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK, DATA_URL,getLStorage,setLStorage} from 'api/config'
    import {axiosData} from 'api/http'
    export default{
        data(){
            var checkAge = (rule, value, callback) => {
            }
            var logoAddress = (rule, value, callback) => {
            };
            return {
                noSubmit:true
            };
        },
        created(){
        },
        methods:{
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        }
    }
</script>
<style scoped>

#left-nav .el-submenu__title{
    background-color: #f1f5f9 !important;
    color: #222d37;
}
#left-nav  .is-active .el-submenu__title {
    background-color: #58cafd !important;
    color: #ffffff;
}
#left-nav .is-active .el-submenu__title:hover {
    background-color: #58cafd !important;
    color: #ffffff;
}
#left-nav  .el-submenu__title:hover{
    background-color: #f1f5f9 !important;
}
#left-nav .el-menu .el-menu-item-group{
    background-color: #fff !important;
}
#left-nav  .el-submenu{
    border-bottom: 1px solid #e0e4e7;
}
#left-nav  .el-submenu i{
    margin-right: 10px;
}
#left-nav .el-submenu .el-menu  .is-active{
    /* background-color: #4f5f6f !important; */
}
#left-nav  .el-menu-item, #left-nav  .el-submenu__titl{
    font-size: 12px;
    color:#9B9B9B;
    height: 40px;
    line-height: 40px;
}
#left-nav  .el-menu-item.menu_item_title{
    padding:0;
    height: 36px;
    line-height: 36px;
    background-color: #fff!important;
    /* color:#000!important; */
}
#left-nav  .el-menu-item, #left-nav  .el-submenu__title{
    padding-left:50px!important;
}
#left-nav .menu_item_title{
    font-size:14px;
    color:#000000;
    padding:8px 0;
    cursor: pointer;
}
#left-nav .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
    color: #2B6CFF  !important;
    background-color: #ECF6FF;
}
#left-nav .el-menu-item:focus, #left-nav .el-menu-item:hover {
    background-color: #ECF6FF;
    color:#2B6CFF;
}

#left-nav .el-submenu .el-menu-item{
    /* background-color: #d8dce0 !important; */
    text-align: left;
    height: 35px;
    line-height:  35px;
    border-bottom: 1px solid #e0e4e7;
    padding-left: 83px !important;
}
#left-nav {

    padding-bottom: 0;
}
</style>
<style>
#left-nav .el-submenu .el-menu-item{
      background-color: #fff !important;
}
#left-nav .el-submenu .el-menu .is-active{
      color: #2B6CFF !important;
    background-color: #ECF6FF !important;
}
#left-nav .el-submenu .el-menu-item{
    background-color: #fff !important;}
    .el-submenu .el-menu-item{
      min-width: 180px;
    }
</style>


