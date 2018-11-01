<template>
    <div>
        <div class="left-nav" id="left-nav">
            <el-row class="tac">
                <el-col>
                    <el-menu :default-active="$route.path"  router class="el-menu-vertical-demo">
                        <!-- <el-menu-item index="/operateManage">授权管理</el-menu-item>
                        <el-menu-item index="/operateManage/operateWXPay">开通微信支付</el-menu-item>
                        <el-menu-item index="/operateManage/operateDomainName">企业域名接入</el-menu-item>
                        <el-menu-item index="/operateManage/brandSetting">品牌设置</el-menu-item> -->

                        <!-- <el-menu-item index="/operateManage/senWords" class="menu_item_title bgf">敏感词设置</el-menu-item>
                        <el-menu-item index="/operateManage/userManage" class="menu_item_title bgf">用户管理</el-menu-item> -->
                        <el-menu-item index="/operateManage/livegift" class="menu_item_title bgf">礼物管理</el-menu-item>
                        
                    </el-menu>
                </el-col>

            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    },
    mounted(){
       console.log(this.$route.path);
    }
}
</script>
<style scoped>
/*左边导航*/
.left-nav {
    min-height: 720px;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding-top: 40px;
    width: 180px;
    -webkit-box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.02);
    box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.02);
    padding-bottom: 0px;
}
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
.el-menu {border:0;}
#left-nav  .el-submenu{
    border-bottom: 1px solid #e0e4e7;
}
#left-nav  .el-submenu i{
    margin-right: 10px;
}
#left-nav .el-submenu .el-menu  .is-active{
    background-color: #4f5f6f !important;
}
#left-nav  .el-menu-item.menu_item_title{
    padding:0;
    height: 36px;
    line-height: 36px;
    background-color: #fff!important;
    color:#000!important;
}
#left-nav  .el-menu-item, #left-nav  .el-submenu__title{
    padding-left:50px!important;
    height: 40px;
    line-height: 40px;
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
    background-color: #d8dce0 !important;
    text-align: left;
    height: 35px;
    line-height:  35px;
    border-bottom: 1px solid #e0e4e7;
    padding-left: 83px !important;
}
#left-nav  .el-menu-item.menu_item_title.is-active{
    background-color: #ECF6FF!important;
    color: #2B6CFF!important;
}
#left-nav  .el-menu-item.menu_item_title.is-active.bgf{
    background-color: #fff!important;
    color: #333333!important;
}
</style>


