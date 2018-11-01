<template>
    <div class="rechargeRecord my_list ">
        <div class="live-top bg-fff">收益记录</div>
        <div>
          <p class="amount">总收益 : {{totalAmount/10}} 元</p>
          <el-row class="shiftPart">
            <el-col :span="5">
              <label>收益来源</label>
              <!-- <el-select v-model="benefitFrom" placeholder="请选择" class="selectStyle">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="直播间" value="1"></el-option>
                  <el-option label="点播间" value="2"></el-option>
              </el-select> -->
              <!-- <el-cascader placeholder="全部"
                :options="option"
                v-model="benefitFrom"
                @change="selectVodBySelective">
              </el-cascader> -->
              <el-cascader
              class="selectStyle1"
                expand-trigger="hover"
                :options="option"
                v-model="benefitFrom"
                @change="selectVodBySelective">
              </el-cascader>
            </el-col>
            <el-col :span="4" style="margin-top: 3px;">
              <label>收益方式</label>
              <el-select v-model="benefiType" placeholder="请选择" class="selectStyle">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="礼物打赏" value="1"></el-option>
                  <el-option label="付费观看" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" style="margin-top: 3px;">
              <label>收益去向</label>
              <el-select v-model="benefitTo" placeholder="请选择" class="selectStyle">
                  <el-option label="梦豆" value="0"></el-option>
                  <!-- <el-option label="梦豆" value="1"></el-option> -->
              </el-select>
            </el-col>
            <el-col :span="11" class="timeComponent">
                <!-- @change="getStartDate" -->
              <el-date-picker
            class="datePicker"
                    v-model="sd"
                    type="date"
                    align="right"
                    @change="getStartDate"
                    >
                  </el-date-picker>
                  <span>-</span>
                  <!-- @change="getEndDate" -->
                  <el-date-picker
                  class="datePicker"
                      v-model="ed"
                      type="date"
                      align="right"
                      @change="getEndDate"
                      >
                  </el-date-picker>
                <el-button type="primary"  class="searchBt" @click="searchByTime">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="bg-fff info-content tableShow" >
            <el-table
            :data="tableData"            
            style="margin:0 auto;text-align:center;">
                <el-table-column
                    prop="createTime"
                    label="收益时间"
                    width="170px">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="收益金额(元)">
                    <template slot-scope="scope">
                        <div >{{scope.row.amount=='undefined'?'':scope.row.amount/10}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="revenueFrom"
                    label="收益来源">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="用户昵称">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="收益方式">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px" v-if="scope.row.type ==1">礼物打赏</span>
                      <span style="margin-left: 10px" v-if="scope.row.type ==2">付费观看</span>
                      <span style="margin-left: 10px" v-if="scope.row.type ==3">门票付款</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="revenueTo"
                    label="收益去向">
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
import { ERR_OK, GIFT_URL, DATA_URL,  getLStorage,MW_Live_API_URL,getDay,changeDateType } from "api/config";
import axios from "axios";
import { setDate } from "api/http";
export default {
  data() {
    return {
        tableData: [],
        userID:getLStorage("userId"),
        liveID:"",
        totalAmount:0,
        sd: "",
        ed: "",
        options:[{val:0,label:"全部"},{val:1,label:"礼物打赏"},{val:2,label:"付费观看"}],
        benefitFrom:['0'],
        benefiType:"0",
        benefitTo:"0",
        option:[{value: '0',label: '全部',}],
        pageSize:10,
        pageNo:1,
        total:0,
        mysearch:false
    };
  },
  created() {
    this.getSelectOption();
    this.sd = getDay(-7);
    this.ed = getDay(0);
    this.getDataList();
  },
  methods: {
      handleSizeChange: function (size) {
        this.pageSize = size;
        },
        handleCurrentChange: function(currentPage){
            this.pageNo = Number(currentPage);
            this.getDataList(this.pageNo);
        },
    //获取收益来源
    getSelectOption(){
      axios
        .get(
          DATA_URL +
            "mwlive/live/get_listbycreatetime.do?user_id=" +
            this.userID +
            "&page_index=1" +
            "&page_size=100" +
            "&liveStatus=" +
            "&timeType=1"
        )
        .then(response => {
          //  console.log(JSON.stringify(response))
          if (response.data.code == "200") {

            var liveList=[];
            var ll=response.data.data.data_list;
            if (Array.isArray(ll)) {
                ll.forEach(e => {
                liveList.push({value:e.id,label:e.live_name});
                });
            }
           this.option.push({value:"1",label:"直播间",children:liveList});
          }
        })
        .catch(function(err) {
          console.log(err);
        });
        let paramData = {
        userId: this.userID,
        mediaFolderId: "0",
        page_index: "1",
        page_size: "100"
      };
      this.$ajaxs.getVideoList(paramData).then(res => {
        if (res.code == "200") {
          var getVideoList=[];
          var lv=res.data.list;
          if (Array.isArray(lv)) {
              lv.forEach(e => {
                getVideoList.push({value:e.defRoomId,label:e.vodName});
            });
          }
          
          this.option.push({value:"2",label:"点播间",children:getVideoList});
        }
      });
    },
    selectVodBySelective(data){
      console.log(data[0]);
    },
    getStartDate() {
      console.log(this.sd);
      this.mysearch = true;
      this.sd = changeDateType(this.sd);
    },
    getEndDate() {
      //console.log("end"+val);
      this.ed = changeDateType(this.ed);
    },
    searchByTime(){
        this.mysearch = true;
        this.pageNo = 1;
      this.getDataList();
    },
    getDataList(pgNo) {
      var liveID="0";
      console.log(this.sd)
      if(this.benefitFrom.length>0&&this.benefitFrom[0]!="0"){
        liveID=this.benefitFrom[1];
      }
      else{
        liveID="";
      }
      this.pageNo = pgNo ? pgNo : 1;
      console.log(this.benefitFrom,this.benefiType,this.benefitTo);
      var endTime ;
      if (this.ed.indexOf('/') != -1) {
          endTime = this.ed.replace(/\//g,'-');
      }else{
          endTime = this.ed;
      }
      console.log(this.sd)
      let startTime;
      if (this.mysearch) {
          startTime = this.sd;
      }else{
          startTime = '1971-07-01';
      }
      axios
        .get(
          MW_Live_API_URL +
            "/21/service/revenueRecord.action?userID=" +
            // this.userID +"&liveID="+liveID+"&type="+this.benefiType+"&revenueTo="+this.benefitTo+"&startDate=" +this.sd+"&endDate="+this.ed
            this.userID +"&liveID="+liveID+"&type="+this.benefiType+"&revenueTo="+this.benefitTo+"&startDate=" +startTime+"&endDate="+endTime + '&pageNo=' + this.pageNo +
            '&pageSize=' + this.pageSize
        )
        .then(response => {
          if (response.data.resultCode =="200" ) {
            //   this.mysearch = false;
             this.tableData=response.data.params.result.list;
            //  this.tableData.forEach((e,index)=>{
            //      this.tableData[index].type = 3;
            //  })
             this.totalAmount=response.data.params.sumAmount;
             this.total = response.data.params.result.page.total;
             console.log(this.tableData)
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
    .amount{
      color:#4285F4;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .searchBt{
      width: 70px;
    }
    .shiftPart{
      margin-bottom: 20px;
    }
    .datePicker{
      height: 34px;
      width: 140px;
    }
    .selectStyle{
      width: 82px;
    }
    .selectStyle1{
      width: 120px;
    }
    .timeComponent{
      float: right;
      text-align: right;
    }
    .tableShow{
      height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    }
</style>
<style>
.selectStyle1 input{
  height:30px;
}
.account .el-input__icon{
  line-height: 30px;
}
</style>

