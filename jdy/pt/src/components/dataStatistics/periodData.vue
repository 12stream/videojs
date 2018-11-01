<template>
<div class="my_list securitySet">
    <div class="live-top bg-fff">
        <el-select v-model="stateOptVal" placeholder="请选择" class="sel_96" @change="getData">
            <el-option label="全部数据" value="0"></el-option>
            <el-option label="标准版" value="1"></el-option>
            <el-option label="企业版" value="2"></el-option>
        </el-select>
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
                <el-date-picker
                    v-model="sd"
                    type="date"
                    @change="getStartDate"
                    align="right">
                  </el-date-picker>
                  <span>-</span>
                  <!-- @change="searchByTime" -->
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
                <div id="chart1" style="width: 880px;height: 400px" ref="myEchart" ></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Chart from "echarts";
import {
  getLStorage,
  MW_Live_API_URL,
  ERR_OK,
  formatDate,
  getDay,
  changeDateType
} from "api/config";
import axios from "axios";
export default {
  data() {
    return {
      userID: getLStorage("userId"),
      stateOptVal: "0",
      value1: [new Date() - 7 * 24 * 3600 * 1000, new Date()],
      chart: null,
      sd: "",
      ed: ""
    };
  },
  mounted() {
    this.sd = getDay(-6);
    this.ed = getDay(0);
    this.getData();
    $("#7days").css("color", "#fff");
    $("#7days").css("background-color", "#4285f4");
  },
  methods: {
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
        strDate +
        " " +
        getHours +
        ":" +
        strTime
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
    searchByTime() {
      if (this.sd &&this.ed &&(new Date(this.ed) - new Date(this.sd)) / (1000 * 60 * 60 * 24) > 366) {
        this.$message({
          showClose: true,
          type: "info",
          message: "天数跨度不能大于365天"
        });
        this.sd = getDay(0);
        this.ed = getDay(0);
        return;
      }
      if (this.compareTime(this.ed, getDay(0)) < 0) {
        this.ed = getDay(0);
      }
      if (this.compareTime(this.sd, getDay(0)) < 0) {
        this.sd = getDay(0);
      }
      if (this.compareTime(this.sd, this.ed) < 0) {
        this.sd = this.ed;
      }
      this.getData(this.sd, this.ed);
      $("#7days").css("color", "#333");
      $("#7days").css("background-color", "#ffffff");
      $("#30days").css("color", "#333");
      $("#30days").css("background-color", "#ffffff");
    },
    searchByTime7() {
      this.sd = getDay(-6);
      this.ed = getDay(0);
      this.getData(this.sd, this.ed);
      $("#7days").css("color", "#fff");
      $("#7days").css("background-color", "#4285f4");
      $("#30days").css("color", "#333");
      $("#30days").css("background-color", "#ffffff");
    },
    searchByTime30() {
      this.sd = getDay(-29);
      this.ed = getDay(0);
      this.getData(this.sd, this.ed);
      $("#30days").css("color", "#fff");
      $("#30days").css("background-color", "#4285f4");
      $("#7days").css("color", "#333");
      $("#7days").css("background-color", "#ffffff");
    },
    getData(a, b) {
      var params = { userId: this.userID };
      console.log(a, b);
    //   if (this.sd.indexOf('/') != -1) {
    //       console.log('我是ie')
        var   sDate = this.sd.replace(/\//g,'-');
        var   eDate = this.ed.replace(/\//g,'-');
    //   }else{
    //       sDate = this.sd;
    //       eDate = this.ed;
    //   }
      axios
        .get(
          MW_Live_API_URL +
            "/21/service/liveTimeCount.action?user_id=" +
            this.userID +
            "&startDate=" +
            sDate +
            "&endDate=" +
            eDate +
            "&platform=" +
            this.stateOptVal
        )
        .then(response => {
          console.log(JSON.stringify(response));
          if (response.data.resultCode == "200") {
            console.log(JSON.stringify(response.data.params.playTime));
            var date = [];
            var allDate = [];
            var lDate = [];
            var pDate = [];
            //this.option.xAxis.data
            response.data.params.playTime.forEach(e => {
              date.push(e.date);
              allDate.push(e.allPlayTime);
              lDate.push(e.livePlayTime);
              pDate.push(e.pointPlayTime);
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
                data: ["当日播放总时长", "直播播放总时长", "点播播放总时长"]
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: date
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  name: "当日播放总时长",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: allDate
                },
                {
                  name: "直播播放总时长",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: lDate
                },
                {
                  name: "点播播放总时长",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: pDate
                }
              ]
            };
            this.chart = Chart.init(this.$refs.myEchart);
            this.chart.setOption(option);
          } else {
            this.$message({
              showClose: true,
              type: "info",
              message: "无该时间段数据"
            });
            console.log(response.data.resultMsg);
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
.dateStyle {
  padding: 0px 0px 16px 30px;
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
</style>


