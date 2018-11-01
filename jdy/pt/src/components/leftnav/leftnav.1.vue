<template>
    <div class="left-nav" id="left-nav">
        <el-row class="tac">
            <el-col>
                <el-menu default-active="/trailer" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>直播管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="/main">直播列表</el-menu-item> 
                            <el-menu-item index="/newLive">创建直播</el-menu-item> 
                            
                        </el-menu-item-group>
                        <el-submenu index="1-2">
                            <template slot="title">基础设置</template>
                            <el-menu-item index="/liveControl">直播控制</el-menu-item>
                            <el-menu-item index="/trailer">直播预告</el-menu-item>
                            <el-menu-item index="/livebg">直播背景</el-menu-item>
                            <el-menu-item index="/liveEnd">直播结束</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>资料管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">分享设置</el-menu-item>
                            <el-menu-item index="2-2">互动打赏</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                
            </el-col> 
        </el-row> 
    </div>
</template>

<script>
    export default{
        created(){
            // this.resizeHeight()
        },
        methods:{
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            resizeHeight(){
                // var height = document.getElementById("left-nav")
                var eh = document.documentElement.clientHeight - 50 + 'px'
                console.log(eh)
                // height.style.height =  eh
                
            }
        }
    }
</script>

<style scoped>
</style>
