<template>
    <div class="rechargeRecord my_list ">
        <div class="live-top bg-fff">消费记录</div>
        <div class="bg-fff info-content" >
            <el-table
            :data="tableData"            
            style="margin:0 auto;text-align:center;">
                <el-table-column
                    prop="date"
                    label="消费时间"
                    width="230">
                </el-table-column>
                <el-table-column
                    prop="costMoney"
                    label="消费金额"
                    width="230">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="消费内容">
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
import { ERR_OK, GIFT_URL, DATA_URL, getLStorage,MW_Live_API_URL } from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
    return {
        tableData: [],
        userID:getLStorage("userId"),
        pageSize:10,
        pageNo:1,
        total:0,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
      handleSizeChange: function (size) {
        this.pageSize = size;
    },
    handleCurrentChange: function(currentPage){
        this.pageNo = currentPage;
        this.getDataList(this.pageNo);
    },
    getDataList(myVal) {
      let url = MW_Live_API_URL + "/20/service/consumptionRecord.action";
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
      var currentdate =
        date.getFullYear() + seperator1 + month + seperator1 + strDate;

      date.setMonth(date.getMonth() - 1);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var formatwdate = y + "-" + m + "-" + d;
      console.log(formatwdate);
      // let dataParams = {
      //     user_id: getLStorage('uset_id'),
      //     start_time: formatwdate,
      //     end_time:currentdate
      // }
      let formdata = new FormData();
      formdata.append("userID", getLStorage("user_id"));
      formdata.append("pageNo", "1");
      formdata.append("pageSize", "10");
      // axios.get(url,
      //     {params:dataParams}
      // )
        console.log(myVal)
        if (myVal) {
            this.pageNo = myVal;
        }else{
            this.pageNo = 1;
        }
      axios
        .get(
          MW_Live_API_URL +
            "/20/service/consumptionRecord.action?userID=" +
            this.userID +
            "&pageNo=" + this.pageNo +
            "&pageSize=" + this.pageSize
        )
        .then(response => {
          console.log(JSON.stringify(response));
          if (response.data.resultCode =="200" ) {
            console.log(JSON.stringify(response.data.params));
             this.tableData=response.data.params.list;
             this.total = response.data.params.page.total;
            // var code=[];
            // var userCode=[];
            // var codeDate=[]
            // //this.option.xAxis.data
            // response.data.params.visitorCount.forEach(e => {
            //   code.push(e.code);
            //   userCode.push(e.userCode);
            //   codeDate.push(e.date);
            // });
            // this.option.xAxis.data=codeDate;
            // this.option.xAxis.series[0].data=code;
            // this.option.xAxis.series[1].data=userCode;
          }
        })
        .catch(function(err) {
          // this.tipsMessage('分页获取失败！','error')
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.rechargeRecord{
         height:667px;
    }
</style>


