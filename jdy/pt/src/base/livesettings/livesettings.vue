<template>
    <div class="livesettings">
        <div class="livesettings-top">
            <el-select v-model="value"
                placeholder="请选择直播间"
                @change="optionLive">
                <el-option
                    v-for="item in data"
                    :key="item.live_name"
                    :label="item.live_name"
                    :value="item.live_name + '&' + item.id"
                    >
                </el-option>
            </el-select>
            <el-button>观看地址</el-button>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                value:'',
                data:[]
            }
        },
        created(){
            this.data = global.liveData.data
        },
        methods:{
            optionLive(event){
                let data = event.split("&")
                global.liveData.thisData = data[1]
                console.log(global.liveData.thisData)
            }
        }
    }
</script>

<style scoped>
.livesettings-top{
    background-color: #eef1f6;
    line-height:50px;
    padding-left:10px;
}
</style>