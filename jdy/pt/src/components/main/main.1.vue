<template>
    <div class="main">
        <m-header></m-header>
        <el-row class="w1000">
            <el-col class="mt20" v-loading="!dataList.length" element-loading-text="拼命加载中">
                <el-row class="default-color">
                    <el-col :span="24" class="">直播列表</el-col>
                </el-row>
                <el-row class="mt20">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-col :span="2">
                            <el-button type="primary">删除</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-select v-model="form.region" placeholder="默认排序">
                                <el-option label="最后创建时间" value="aftertiem"></el-option>
                                <el-option label="创建时间" value="tiem"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-select v-model="form.region2" placeholder="全部">
                                <el-option label="预告" value="trailer"></el-option>
                                <el-option label="直播" value="broadcast"></el-option>
                                <el-option label="结束" value="end"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" :offset="4" class="search">
                            <el-input v-model="form.search" :placeholder="placeholder"></el-input>
                            <i @click="clearSearch" v-show="form.search" class="search-icon el-icon-circle-close"></i>
                        </el-col>
                    </el-form>
                </el-row>
                <el-row class="mt20">
                    <el-col v-for="item in dataList" :key="item.name" :span="8" class="mainData-list clear mb10">
                        <div class="layout default-bor clear">
                            <div class="layout-left fl">
                                <img :src="item.imgurl ? 'item.imgurl' : defaultImg">
                            </div>
                            <div class="layout-main fl">
                                <div class="data-list clear">
                                    <div class="data-listMain fl txt-hide" :title="item.live_name">{{item.live_name}}</div>
                                    <div class="data-listRe fl">
                                        <el-switch on-text="" off-text="" @change="toggleStatus(item.id, form.delivery)" v-model="form.delivery"></el-switch>
                                        <span @click="edit_live(item)"><i class="icon el-icon-setting"></i></span>
                                        <span @click="openDelete(item)"><i class="icon el-icon-delete"></i></span>
                                    </div>
                                </div>
                                <p>录像：<span class="default-color">2</span>  个</p>
                            </div>
                        </div>
                        <div class="broadcast-bottom clear te-c">
                            <el-col :span="6">管理</el-col>
                            <el-col :span="6">预览</el-col>
                            <el-col :span="6">导播</el-col>
                            <el-col class="default-color" :span="6">{{item.live_status | type}}</el-col>
                        </div>
                    </el-col>
                    <!-- <div class="block te-c mb30">
                        <span class="demonstration" style="font-size:0px;">分页：</span>
                        <el-pagination
                            layout="prev, pager, next"
                            :total="50">
                        </el-pagination>
                    </div> -->
                </el-row>

                <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                size="tiny"
                :before-close="handleClose"
                
                >
                <span>确认删除 {{thisLive.name}} 直播吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteData">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>                  
                </span>
                </el-dialog>

                <editLive @isShow="change" :class="{'editLive-show':isShow}" :isShow="isShow" :editData="editData" @refresh="_LiveBroadcast"></editLive>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
global.liveData = {data:[],thisLive:{}}
    import MHeader from 'components/header/header'
    import {ERR_OK, DATA_URL} from 'api/config'
    import axios from 'axios'
    import md5 from 'js-md5'
    import editLive from 'components/editLive/editLive'
    import LeftNav from 'components/leftnav/leftnav'

    export default{
        props:{
            placeholder:{
                type:String,
                default:'搜索直播标题'
            }
        },
        data(){
            return{
                form: {
                    region: '',
                    region2: '',
                    search: '',
                    delivery: false
                },
                dataList:'',
                defaultImg:require('../../common/image/default.jpg'),
                isShow:false,
                editData:{},
                thisLive:{data:{},name:''},
                dialogVisible:false,
                // loading: true
            }
        },
        created(){
            this._LiveBroadcast()
            // this.dataList = global.liveData.data
        },
        methods:{
            change(isShow){
                this.isShow = isShow
            },
            clearSearch(){
                this.form.search = ''
            },
            _LiveBroadcast(){
                axios.get(DATA_URL + 'mwlive/live/get_listbyuser.do?user_id='+ localStorage.getItem('user_id')
                ).then((response) => {
                    if(response.status === ERR_OK){
                        global.liveData.data = this.dataList = response.data.data.data_list
                        // console.log(global.liveData.data)
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            toggleStatus(id, type){
                // 直播状态
                console.log(id,type)
            },
            edit_live(event){
                this.isShow = !this.isShow
                this.editData = event
            },
            tipsMessage(message){
                this.$message({
                    message: message,
                    type: 'success'
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            openDelete(data){
                this.thisLive.name = data.live_name
                this.thisLive.data = data
                this.dialogVisible = true
            },
            deleteData(){
                this.dialogVisible = false
                axios.get(DATA_URL + 'mwlive/live/delete.do',{
                    params: {
                        user_id:localStorage.getItem('user_id'),
                        id:this.thisLive.data.id
                    }
                })
                .then((response)=>{
                    if(response.data.code == ERR_OK){
                        this.tipsMessage('删除成功')
                        console.log(response);
                        this._LiveBroadcast()
                        // setTimeout(function(){
                        //     this.$router.push({
                        //         path:'/main'
                        //     })
                        // },1000)
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }
        },
        filters:{
            type:function(value){
                switch(value){
                    case 0:
                        return '新创建'
                        break;
                    case 1:
                        return '直播开始'
                        break;
                    case 2:
                        return '直播结束'
                        break;
                    case 3:
                        return '直播异常'
                        break;
                }

            }
        },
        computed:{
            
        },
        components:{
            MHeader,
            editLive,
            LeftNav
        }
    }
</script>

<style scoped>
.mainData-list{
    padding-right:10px;
}
.mainData-list:nth-child(3n){
    padding-right:0;
}
.editLive.editLive-show{
    display:block;
    z-index:99;
}
.search{
    position:relative
}
.layout-main{
    line-height: 40px;
}
.layout-left{
    padding: 10px;
    box-sizing: border-box;
}
.search-icon{
    font-size:16px;
    position:absolute;
    right:10px;
    top:10px;
    color:#b1b1b1;
}
.broadcast-bottom{
    border: 1px solid #d3d3d3;
    border-top:none;
    line-height:40px
}
.data-list{padding-right:125px}
.data-listMain{width:100%;margin:5px 0 0 0;}
.data-listRe{width:125px;margin-right:-130px;}
.icon{font-size:20px;color:#999}
</style>