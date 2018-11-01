<template>
    <div class="rechargeRecord my_list ">
        <div class="live-top bg-fff">充值记录</div>
        <div class="bg-fff info-content" >
            <el-table
            :data="tableData"            
            style="margin:0 auto;text-align:center;">
                <el-table-column
                    prop="oper_date"
                    label="充值时间"
                    width="230">
                </el-table-column>
                <el-table-column
                    prop="oper_money"
                    label="充值金额"
                    width="230">
                </el-table-column>
                <el-table-column
                    prop="oper_type"
                    label="充值方式">
                </el-table-column>
            </el-table>
            <el-pagination 
                v-show="total>0"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total"
                >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage} from 'api/config'
    import axios from 'axios'
    import {setDate} from 'api/http'
import { formatDate } from '../../api/config';
    export default{
        data() {
            return {
                tableData: [],
                pageSize:10,
                pageNo:1,
                total:0,
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
                this.getDataList(this.pageNo);
            },
            getDataList(pagno){
                // let url = DATA_URL + 'manage/finance/mi_list.do'
                let url = GIFT_URL + 'service/getRechargeRecord.action'
                var date = new Date();
                var seperator1 = "-";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate

                date.setMonth(date.getMonth()-1);  
                var y = date.getFullYear();  
                var m = date.getMonth()+1;  
                var d = date.getDate();
                if (m >= 1 && m <= 9) {
                    m = "0" + m;
                }
                if (d >= 0 && d <= 9) {
                    d = "0" + d;
                }
                // var formatwdate = y+'-'+m+'-'+d; 
                var formatwdate = '1970-01-01';
                console.log(formatwdate)
                // let dataParams = {
                //     user_id: getLStorage('uset_id'),
                //     start_time: formatwdate,
                //     end_time:currentdate
                // }
                if (pagno) {
                    this.pageNo = pagno;
                }else{
                    this.pageNo = 1;
                }
                let formdata = new FormData()
                formdata.append('userID',getLStorage('user_id'))
                // formdata.append('start_time',formatwdate)
                // formdata.append('end_time',currentdate)
                formdata.append('pageNo',this.pageNo)
                formdata.append('pageSize',this.pageSize)
                // axios.get(url, 
                //     {params:dataParams}
                // )

                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res)=>{
                    this.tableData = res.data.params.list
                    if (res.data.params.page.total) {
                        this.total = res.data.params.page.total;
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .rechargeRecord{
         height:667px;
    }
</style>
