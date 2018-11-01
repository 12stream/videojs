<template>
    <div class="liveControl">
        <m-header></m-header>
        <div class="liveControl-main mt20">
            <div class="liveControl-top">
                <el-select v-model="value"
                    placeholder="请选择直播间"
                    @change="optionLive"
                    >
                    <el-option
                        v-for="item in data"
                        :value="item.name"
                        :model="optionVal = item"
                        >
                    </el-option>
                </el-select>
                <el-button>观看地址</el-button>
            </div>
            <div class="liveControl-content mt20">
                <el-row>
                    <el-col :span="12" class="liveControl-left">
                        <div class="liveControl-title"><span>直播监控</span> <el-button>关闭观看页直播</el-button></div>
                        <div class="liveControl-img">
                            <img :src="dataList.imgurl">
                        </div>
                        <div class="liveControl-bom">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="直播方式" name="first">直播方式</el-tab-pane>
                                <el-tab-pane label="推流地址" name="second">
                                    <input readonly type="text" v-model="dataList.url" id="cpLink" class="el-input__inner" style="width:80%"></input>
                                    <el-button @click="copyLink">复制</el-button>
                                </el-tab-pane>
                                <el-tab-pane label="手机直播" name="third">手机直播</el-tab-pane>
                                <el-tab-pane label="导播台直播" name="fourth">导播台直播</el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>

    import MHeader from 'components/header/header'
    export default{
        data(){
            return{
                value:'',
                optionVal:[],
                activeName: 'second',
                data:[
                    {
                        name:'直播一',
                        age:22,
                        url:'http://baidu.com',
                        imgurl:'http://mwportaltest.facebac.com/images/sign_add.png?ver=201703271100'
                    },
                    {
                        name:'直播二',
                        age:23,
                        url:"//live.tv.facebac/3654",
                        imgurl:'http://mwportaltest.facebac.com/images/sign_add.png?ver=201703271100'
                    }
                ],
                dataList:{
                    name:'',
                    imgurl:'',
                    url:''
                }
            }
        },
        created(){
            this.dataList = this.data
            // this.defaultData = this.data[0]
            // console.log(this.data[0])
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event)
            },
            copyLink: function () {
                var url = document.getElementById("cpLink");
                url.select();
                document.execCommand("copy");
                this.tipsMessage('复制成功！')
            },
            tipsMessage(message){
                this.$message({
                    message: message,
                    customClass: 'tips-text'
                })
            },
            optionLive(event){
                console.log(this.optionVal)
                this.dataList = this.optionVal
            }
        },
        components:{
            MHeader
        }
    }
</script>

<style scoped>
.tips-text{
    color:red;
}
.liveControl-content{
    
}
.liveControl-left{
    border-right:1px solid #d1dbe5;
    box-sizing:border-box;
}
.liveControl-title{
    background:#f4f4f4;
    line-height:50px;
}
.liveControl-title span{
    margin: 0 15px;
}
.liveControl-img{
    padding:50px;
}
</style>