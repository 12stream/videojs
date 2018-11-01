<template>
    <div class="rechargeRecord my_list" style="max-height:605px">
        <div class="live-top bg-fff">
            <span>提现记录</span>
            <div class="tab_box fr">
                <span class="fl" :class="{active:searchStatus=='0'}" @click="tabChange('0')">全部</span>
                <span class="fl" :class="{active:searchStatus=='1'}"    @click="tabChange('1')">提现中</span>
                <span class="fl" :class="{active:searchStatus=='2'}"    @click="tabChange('2')">提现完成</span>
                <span class="fl" :class="{active:searchStatus=='3'}"   @click="tabChange('3')"  style="border-right:none;">提现失败</span>
            </div>
        </div>
        <div class="bg-fff info-content">
            <el-table
                :data="tableData"
                style="margin:0 auto;text-align:center;">
                <el-table-column
                    prop="createTime"
                    label="提现时间"
                    width="200">
                    <template slot-scope="scope">
                        <div >{{scope.row.createTime.substring(0,19)}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="提现金额"
                     width="100"
                    >
                </el-table-column>
                <el-table-column
                    prop="type"
                    width="100"
                    label="提现方式">
                    <template slot-scope="scope">
                        <div>{{scope.row.type==1?'支付宝':(scope.row.type==2?'个人账户':'企业账户')}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="100"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="cardNo"
                    label="账号">
                     <template slot-scope="scope">
                        <div >{{scope.row.cardNo=='undefined'?'':scope.row.cardNo}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    width="100"
                    label="状态">
                    <template slot-scope="scope">
                        <!-- status 1提现中，2提现成功，3提现失败 -->
                        <div  v-bind:class="[ {'clo_y': scope.row.status==1,'clo_c': scope.row.status==4, 'clo_r': scope.row.status==5 }]">{{scope.row.status==1?'提现中':(scope.row.status==4?'提现成功':'提现失败')}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                v-show="total>0" 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total"
                background>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,filterObj,MW_Live_API_URL} from 'api/config'
    import axios from 'axios'
    import {setDate} from 'api/http'
    export default{
        data() {
            return {
                tableData: [],
                pageNo:1,
                pageSize:10,
                total:0,
                searchStatus:'0',
            }
        },
        created(){
            this.getDataList()
        },
        methods:{
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleCurrentChange: function(currentPage){
                this.pageNo = currentPage;
                this.getDataList(this.searchStatus,this.pageNo)
            },
            tabChange(type){
                this.searchStatus = type
                this.pageNo = 1
                this.getDataList(this.searchStatus,1)
            },
            getDataList(type,val){
                let url = MW_Live_API_URL + '/mwcurrency/getAmountCashPage.action'
                let formdata = new FormData()
                formdata.append('userId',getLStorage('user_id'))
                formdata.append('pageSize',this.pageSize)
                if(type!=""&&type!='0'){
                    formdata.append('status',type)
                }
                if(val){
                    formdata.append('pageNo',val)
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
                    this.tableData = []
                    this.total = 0
                    if(res.data.resultCode=="01"){
                        if( res.data.params.list&& res.data.params.list.length>0&&res.data.params.list!="无数据"){
                            this.tableData = res.data.params.list
                            this.total  = res.data.params.page.total
                        }else{
                            this.tableData = []
                            this.total = 0    
                        }

                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .clo_y{
        color:#F5A623;
    }
    .clo_r{
        color:#FF467F;
    }
    .clo_c{
        color:#CCCCCC;
    }
    .tab_box{
        border: 1px solid #2B6CFF;
        height:30px;
        box-sizing: border-box;
        border-radius: 2px;
        position: relative;
        top: -4px;
    }
    .tab_box span{
        display: inline-block;
        border-right: 1px solid #2B6CFF;
        background-color: #fff;
        height:28px;
        line-height: 28px;
        width:80px;
        text-align: center;
        font-size:12px;
        color:#2B6CFF;
        font-weight: normal;
        box-sizing: border-box;
        padding:0;
        cursor: pointer;
    }
    .tab_box span.active{
        background-color: #2B6CFF;
        color:#fff;
    }
    
</style>
<style>
.rechargeRecord.my_list .el-table  td{
    height:50px;
    line-height: 50px;
    padding-top:0;
    padding-bottom:0;
}
.rechargeRecord.my_list .el-table__body-wrapper{
    height:500px;
}
</style>

