<template>
<div class="left-nav" id="left-nav" style="min-height:646px;">
        <el-row class="tac">
            <el-col>
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
                <el-menu-item index="/dataStatistics/visitorData"  class="menu_item_title">访客统计</el-menu-item>
                <el-menu-item index="/dataStatistics/periodData" class="menu_item_title">时长统计</el-menu-item>
                <el-menu-item index="/dataStatistics/saveData" class="menu_item_title">存储统计</el-menu-item>
                <el-menu-item index="/dataStatistics/playTimesData" class="menu_item_title">播放次数</el-menu-item>
                </el-menu>
            </el-col> 
        </el-row> 
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
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
    background-color: #4f5f6f !important;
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
    color:#000!important;
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
    background-color: #d8dce0 !important;
    text-align: left;
    height: 35px;
    line-height:  35px;
    border-bottom: 1px solid #e0e4e7;
    padding-left: 83px !important;
}

</style>
<style>
#left-nav  .el-menu-item.menu_item_title.is-active{
    background-color: #ECF6FF!important;
    color: #2B6CFF!important;
}
#left-nav  .el-menu-item.menu_item_title.is-active.bgf{
    background-color: #fff!important;
    color: #333333!important;
}
</style>


