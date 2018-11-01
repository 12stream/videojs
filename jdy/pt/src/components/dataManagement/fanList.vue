<template>
    <div class="my_list fanList">
        <div class="live-top bg-fff">粉丝列表</div>
        <div class="bg-fff info-content">
            <el-table
             v-if="!noDate" 
            :data="tableData"            
            background
            style="margin:0 auto;text-align:center;" height="541">
                <el-table-column
                type="index"
                :index="indexMethod" 
                width="50"
                label="序号"
                >
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="用户名"
                 >
                </el-table-column>
                <el-table-column
                    prop="showId"
                    label="账号"
                  >
                </el-table-column>
            </el-table>
            <div v-if="noDate" class="no_live">
                <div class="no_data">                                                                                                                          
                </div>  
                    <div class="tip_no_data">
                    <span class="default-color">您还没有粉丝哦！</span>                    
                </div>
            </div>
            <el-pagination  v-if="!noDate"  class="mt10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total"
                background
                >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,PAGE_SIZE} from 'api/config'
    import axios from 'axios'
    import {setDate} from 'api/http'
    export default{
        data() {
            return {
                pageNo:1,
                pageSize:10,
                tableData: [],
                total:1,
                noDate:false
            }
        },
        created(){
            this.getDataList()
        },
        methods:{
            indexMethod(index) {
                return index + (this.pageNo - 1) * 10 + 1;
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.pageNo = currentPage;
                this.getDataList(this.pageNo)
            },
            getDataList(val){
                let url = GIFT_URL + 'service/queryFans.action'
                let formdata = new FormData()
                formdata.append('masterID',getLStorage('user_id'))
                formdata.append('pageSize',this.pageSize)
                if(val){
                    formdata.append('pageNo',this.pageNo)
                }else{
                    formdata.append('pageNo',1)
                }
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res)=>{
                    if(res.data.resultCode == '01'){
                        if(res.data.paramo){
                            this.tableData = res.data.paramo  
                            this.noDate = false
                            this.total = parseInt(res.data.params.total) 
                        }else{
                            this.noDate = true
                        }
                    } else{
                        this.noDate = true
                    }                 
                }).catch((err)=>{
                    console.log(err)
                })
            }
        
        }
    }
</script>
<style scope>
.fanList{
    height:668px;
}
.fanList .no_live{
    text-align: center;
    height:454px;
}
.fanList  .no_data{
    width:130px;
    height:109px;
    background: url(../../common/image/img_Load.png) no-repeat;
    margin:145px auto 20px auto;
    
}
.fanList .no_live .txt_blue{
    cursor: pointer;
}
.fanList.my_list .live-top{
    padding:0 0 20px 0;
    height:24px;
}
.fanList.my_list .live-top div{
     height:24px;
     line-height: 24px;
}
</style>



