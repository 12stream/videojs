<template>
    <div class="mainNav">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="false" :default-openeds="defaultOpen">
        <el-submenu index="1">
            <template slot="title">
            <!--<i class="el-icon-location"></i>-->
            <span slot="title">基础组件</span>
            </template>
            <el-menu-item index="1-1" @click="toParentIndex('1')">banner</el-menu-item>
            <el-menu-item index="1-2" @click="toParentIndex('2')">菜单</el-menu-item>
            <el-menu-item index="1-3" @click="toParentIndex('3')">分享信封</el-menu-item>
            <el-menu-item index="1-4" @click="toParentIndex('4')">公众号设置</el-menu-item>
            <el-menu-item index="1-5" @click="toParentIndex('5')">客服设置</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
            <!--<i class="el-icon-menu"></i>-->
            <span slot="title">基本模板</span>
            </template>
            <el-menu-item index="2-1"  @click="toParentIndex('6')">模板一</el-menu-item>
            <el-menu-item index="2-2"  @click="toParentIndex('7')">模板二</el-menu-item>
        </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
  data() {
    return {
      defaultOpen: ["1", "2"]
    };
  },
  methods: {
    toParentIndex: function(index) {
      //与父组件通信传值
      this.$emit("nowIndex", index);
    }
  }
};
</script>
<style scoped>
.mainNav ul{border: 0 !important;}
  .mainNav .el-submenu__title{font-size:16px;color: #333;font-weight: bold;text-align: center;}
  .mainNav .el-submenu .el-menu-item{margin: 0 auto 10px;font-size:14px;color: #333;line-height:32px;text-align: center;min-width: 90px;width:90px;height: 32px;border: 1px dashed #CCCCCC;padding: 0 !important;background-color: rgb(245,245,245)}
  .mainNav .el-submenu__icon-arrow {display: none}
  .mainNav .el-submenu .el-menu-item.is-active{
      background-color: #fff;
      border: 1px solid #4285F4;
  }
  .mainNav {width: 140px;height: 644px;border:solid 1px #e6e6e6}
.mainNav ul {
  border: none;
  border: solid 1px #e6e6e6;
}

</style>


