<template>
    <div>
        <div class="left-nav" id="left-nav">
            <el-row class="tac">
                <el-col>
                    <el-menu :default-active="$route.path" router  class="el-menu-vertical-demo">
                        <el-menu-item index="/controlIndex/playCustomMenu" class="menu_item_title">自定义菜单栏</el-menu-item>
                        <el-menu-item index="/controlIndex/playQrCode" class="menu_item_title">二维码设置</el-menu-item>
                        <el-menu-item index="/controlIndex/playGzhSetting">公众号设置</el-menu-item>
                        <el-menu-item index="/controlIndex/playCusServiceSetting">客服设置</el-menu-item>
                        <el-menu-item index="" class="menu_item_title bgf">基础设置</el-menu-item>
                        <el-menu-item index="/controlIndex/playbg">直播背景</el-menu-item>
                        <el-menu-item index="/controlIndex/playlogo">视频LOGO</el-menu-item>
                        <el-menu-item index="/controlIndex/playEnd">直播结束画面</el-menu-item>
                        <el-menu-item index="" class="menu_item_title bgf">观看设置</el-menu-item>
                        <el-menu-item index="/controlIndex/playViewSetting">观看设置</el-menu-item>
                        <el-menu-item index="/controlIndex/playEmbed" class="">分享嵌入</el-menu-item>
                    </el-menu>
                </el-col>

            </el-row>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
    #left-nav  .el-menu-item, #left-nav  .el-submenu__titl{
        font-size: 12px;
        color:#9B9B9B;
    }
    #left-nav .menu_item_title {font-size: 14px;}
</style>