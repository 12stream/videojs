<template>
<div class="my_list securitySet" id="visitorData">
    <div class="live-top bg-fff">
        <!-- <el-select v-model="stateOptVal" placeholder="请选择" class="sel_96" @change="getData">
            <el-option label="全部数据" value="0"></el-option>
            <el-option label="标准版" value="1"></el-option>
            <el-option label="企业版" value="2"></el-option>
        </el-select> -->
        访客统计
        
    </div>
    <div class="live-content" style="margin-left:0">
      <el-cascader
        class="selectStyle1"
          expand-trigger="hover"
          :options="option"
          v-model="stateOptVal"
          @change="selectVodBySelective">
        </el-cascader>
    </div>
    
    <div>
        <div>
            <div  class="dateStyle">
                <!-- <el-date-picker
                    v-model="value1"
                    @change="searchByTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker> -->
                <!-- @change="getStartDate" -->
                 <el-date-picker
                    v-model="sd"
                    type="date"
                    @change="getStartDate"
                    align="right">
                  </el-date-picker>
                  <span>-</span>
                  <!-- @change="searchByTime" -->
                  <!-- @change="getEndDate" -->
                  <el-date-picker
                      v-model="ed"
                      type="date"
                      @change="getEndDate"
                      align="right">
                  </el-date-picker>
                <el-button type="default"  class="searchBt" @click="searchByTime">查询</el-button>
                <div class="periodBtns">
                <el-button type="warning"  class="searchBt" id="7days" @click="searchByTime7">最近7天</el-button>
                <el-button type="warning"  class="searchBt" id="30days" @click="searchByTime30">最近30天</el-button>
                </div>
            </div>
            <div class="charts">
                <div id="chart1" style="width: 908px;height: 400px" ref="myEchart" ></div>
            </div>
            <div  id="showTable">
                <el-table
                :data="tableData"
                    height="600"
                style="margin:0 auto;text-align:center;"
                :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column
                        prop="date"
                        label="时间"
                        width="230"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="pv"
                        label="浏览量 (PV)"
                        width="230"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="uv"
                        label="访问量 (UV)"
                        align="center">
                    </el-table-column>
              </el-table>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Chart from "echarts";
import { getLStorage, MW_Live_API_URL, ERR_OK,formatDate,getDay,changeDateType,DATA_URL ,DATA_API_URL,getCookies} from "api/config";
import axios from "axios";
export default {
  data() {
    return {
      userID: getLStorage("userId"),
      tableData: [],
      stateOptVal: ['0'],
      startDate:'',
      endDate:'',
      value1: [new Date() - 7 * 24 * 3600 * 1000, new Date()],
      chart: null,
      sd: "",
      ed: "",
      num:'666',
      option:[{value: '0',label: '全部'}]
    };
  },
  mounted() {
    this.sd = getDay(-6);
    this.ed = getDay(0);
    this.getSelectOption();
    this.getData();
    $("#7days").css("color","#fff")
      $("#7days").css("background-color","#4285f4")
  },
  methods: {
    selectVodBySelective(data){
      console.log(data[0]);
      if (data[0] == 1) {
        this.num = 0;
      }
      if (data[0] == 2) {
        this.num = 1;
      }
      if (data[0] == 3) {
        this.num = 2;
      }
      this.getData();
    },
    //获取收益来源
    getSelectOption(){
      //获取主页列表
      let params1 = {
        token:getCookies('token'),
        page_size:"100",
        cur_page:"1"
      }
      this.$ajaxs.getMainPageList(params1).then(res=>{
          // console.log(res)
          if (res.code === 1) {
             var zyList = [];
             let list = res.result.dataList;
             list.forEach(e=>{
               zyList.push({value:e.id,label:e.page_name});
             })
             this.option.push({value:'1',label:'主页',children:zyList})
          }
      })
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
            ll.forEach(e => {
              liveList.push({value:e.id,label:e.live_name});
            });
           this.option.push({value:"2",label:"直播间",children:liveList});
          }
        })
        .catch(function(err) {
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
          if (res.data.list != '' && res.data.list != null && res.data.list != undefined) {
              var lv=res.data.list;
              lv.forEach(e => {
                getVideoList.push({value:e.defRoomId,label:e.vodName});
              });
              this.option.push({value:"3",label:"点播间",children:getVideoList});
          }
          
        }
      });
    },
    getStartDate() {
      console.log(this.sd);
      this.sd = changeDateType(this.sd);
    },
    getEndDate() {
      //console.log("end"+val);
      this.ed = changeDateType(this.ed);
    },
    filterTime(val) {
      if (!val) {
        let timestamp = Date.parse(new Date());
        // return '立即开始'
        // return setDateTime(timestamp)
        return "暂无直播";
      }
      let regExp = /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/;
      if (regExp.test(val)) {
        return val;
      }

      let datetime = new Date(val);
      var month = datetime.getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      var strDate = datetime.getDate();
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let getHours = datetime.getHours();
      if (getHours >= 0 && getHours <= 9) {
        getHours = "0" + getHours;
      }
      let strTime = datetime.getMinutes();
      if (strTime >= 0 && strTime <= 9) {
        strTime = "0" + strTime;
      }
      let getSeconds = datetime.getMinutes();
      if (getSeconds >= 0 && getSeconds <= 9) {
        getSeconds = "0" + getSeconds;
      }
      return (
        datetime.getFullYear() +
        "-" +
        month +
        "-" +
        strDate
      ); //+ ":" + getSeconds
    },
    //比较两个日期的大小
    compareTime(date1,date2){
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        if(oDate1.getTime() > oDate2.getTime()){
            return -1
        } else {
            return 1
        }
    },
    searchByTime(){
      if(this.sd&&this.ed&&(new Date(this.ed)-new Date(this.sd))/ (1000 * 60 * 60 * 24)>366){
        this.$message({
            showClose: true,
            type: "info",
            message: "天数跨度不能大于365天"  
          });
          this.sd=getDay(0);
          this.ed=getDay(0);
          return
      }
      if(this.compareTime(this.ed,getDay(0))<0){
        this.ed=getDay(0);
      }
      if(this.compareTime(this.sd,getDay(0))<0){
        this.sd=getDay(0);
      }
      if(this.compareTime(this.sd,this.ed)<0){
        this.sd=this.ed;
      }
      this.getData(this.sd,this.ed);
      $("#7days").css("color","#333")
      $("#7days").css("background-color","#ffffff")
      $("#30days").css("color","#333")
      $("#30days").css("background-color","#ffffff")
    },
    searchByTime7(){
    this.sd = getDay(-6);
    this.ed = getDay(0);
      this.getData(this.sd,this.ed);
      $("#7days").css("color","#fff")
      $("#7days").css("background-color","#4285f4")
      $("#30days").css("color","#333")
      $("#30days").css("background-color","#ffffff")
    },
    searchByTime30(){
      this.sd = getDay(-29);
    this.ed = getDay(0);
      this.getData(this.sd,this.ed);
      $("#30days").css("color","#fff")
      $("#30days").css("background-color","#4285f4")
      $("#7days").css("color","#333")
      $("#7days").css("background-color","#ffffff")
    },
    getData(a, b) {
      var liveID="0";
      if(this.stateOptVal.length>0&&this.stateOptVal[0]!="0"){
        liveID=this.stateOptVal[1];
      }
      else{
        liveID="";
      }
      var params = {
            token: getCookies("token"),
            // token:this.userID,
            type:this.num,
            start_time:this.sd,
            end_time:this.ed,
            room_id:liveID
         };
      this.$ajaxs.getVisitorInfo(params).then(res=>{
        this.rendeing(res.result)
      })


     /* axios
        .get(
          //旧的接口
          MW_Live_API_URL + 
            "/20/service/liveVisitorCount.action?user_id=" +
            // DATA_API_URL +
            // "20/service/visitrecord/visit_list?user_id=" +
            this.userID +
            "&startDate=" +
            this.sd +
            "&endDate=" +
          this.ed +
            "&type=" +
            this.stateOptVal[0]+"&liveID="+liveID
        )
        .then(response => {
          if (response.data.resultCode == "200") {
            this.rendeing(response.data.params.visitorCount)
          }
          else{
            this.$message({
              showClose: true,
              type: "info",
              message: "无该时间段数据"
            });
          //  console.log(response.data.resultMsg);
          }
        })
        .catch(function(err) {
          // this.tipsMessage('分页获取失败！','error')
          console.log(err);
        });*/
    },
    rendeing(myData){
        console.log(myData)
        this.tableData = myData;
            var code = [];
            var userCode = [];
            var codeDate = [];
            //this.option.xAxis.data
            myData.forEach(e => {
              // console.log(e);
              // code.push(e.count);
              // userCode.push(e.userCount);
              code.push(e.pv)
              userCode.push(e.uv);
              codeDate.push(e.date);
            });
            var option = {
              //echart图表测试数据
              title: { text: "" }, //表名
              tooltip: {
                trigger: "axis"
              },
              grid: {
                top: "5%",
                left: "3%",
                right: "4%",
                bottom: "10%",
                containLabel: true
              },
              legend: {
                y: "bottom",
                data: ["浏览量", "访客数"]
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: codeDate,
                  axisLine: {
                  lineStyle: {
                    color: "#9B9B9B"
                  }
                }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLine: {
                  lineStyle: {
                    color: "#9B9B9B"
                  }
                }
                }
              ],
              series: [
                {
                  name: "浏览量",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: code
                },
                {
                  name: "访客数",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: userCode
                }
              ],
              color: ["#FF8208", "#2B6CFF"]
            };
            console.log(option);
          this.chart = Chart.init(this.$refs.myEchart);
          this.chart.setOption(option);
    }
  }
};
</script>
<style scoped>
.dateStyle {
  padding: 0px 0px 16px 0px;
}
.periodBtns {
  float: right;
  margin-right: 10px;
}
.searchBt {
  background-color: #4285f4;
  border-color: #4285f4;
  color: #fff;
}
.sel_96 .el-input__inner {
  width: 200px;
}
.charts {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 30px;
}
.periodBtns button {
  background-color: #ffffff;
  border-color: #d9d9d9;
  color: #333;
}
.live-content{
  margin-bottom: 30px;
  margin-left: 30px;
}


</style>
<style>
  #visitorData .el-input__inner{
    height: 34px;
    line-height: 34px;
}
</style>



