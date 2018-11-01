<template>
<div class="my_list securitySet">
    <div class="live-top bg-fff">
        <!--<el-select v-model="stateOptVal" placeholder="请选择" class="sel_96" @change="stateSelChange">
            <el-option label="全部数据" value="0"></el-option>
            <el-option label="直播间" value="1"></el-option>
            <el-option label="点播间" value="2"></el-option>
        </el-select>-->
        播放次数
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
import { getLStorage, MW_Live_API_URL, ERR_OK ,formatDate,getDay,changeDateType} from "api/config";
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
    this.sd = getDay(-7);
    this.ed = getDay(0);
    this.getData();
    $("#7days").css("color","#fff")
      $("#7days").css("background-color","#4285f4")
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
    searchByTime(){
      this.getData(this.sd,this.ed);
      $("#7days").css("color","#333")
      $("#7days").css("background-color","#ffffff")
      $("#30days").css("color","#333")
      $("#30days").css("background-color","#ffffff")
    },
    searchByTime7(){
      this.sd = getDay(-7);
    this.ed = getDay(0);
      this.getData(this.sd,this.ed);
      $("#7days").css("color","#fff")
      $("#7days").css("background-color","#4285f4")
      $("#30days").css("color","#333")
      $("#30days").css("background-color","#ffffff")
    },
    searchByTime30(){
      this.sd = getDay(-30);
    this.ed = getDay(0);
      this.getData(this.sd,this.ed);
      $("#30days").css("color","#fff")
      $("#30days").css("background-color","#4285f4")
      $("#7days").css("color","#333")
      $("#7days").css("background-color","#ffffff")
    },
    getData(a, b) {
      var params = { userId: this.userID };
    //   console.log(a, b);
    //   this.sd = this.sd.replace(/\//g,'-');
    //   this.ed = this.ed.replace(/\//g,'-');
      var startTime = this.sd.replace(/\//g,'-');
      var endTime = this.ed.replace(/\//g,'-');
      axios
        .get(
          MW_Live_API_URL +
            "/20/service/livePlayCount.action?user_id=" +
            this.userID +
            "&startDate=" +
            startTime +
            "&endDate=" +
            endTime
        )
        .then(response => {
          console.log(JSON.stringify(response));
          if (response.data.resultCode == "200") {
            console.log(JSON.stringify(response.data.params));
            var date = [];
            var allPlayCount = [];
            var livePlayCount = [];
            var pointPlayCount = [];
            //this.option.xAxis.data
            response.data.params.playCount.forEach(e => {
              date.push(e.date);
              allPlayCount.push(e.allPlayCount);
              livePlayCount.push(e.livePlayCount);
              pointPlayCount.push(e.pointPlayCount);
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
                data: ["总播放次数", "直播播放次数", "点播播放次数"]
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
                  },
                  axisLabel: {
                    formatter: "{value} 次"
                  }
                }
              ],
              series: [
                {
                  name: "总播放次数",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: allPlayCount
                },
                {
                  name: "直播播放次数",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: livePlayCount
                },
                {
                  name: "点播播放次数",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: pointPlayCount
                }
              ]
            };
            this.chart = Chart.init(this.$refs.myEchart);
            this.chart.setOption(option);
          }
        })
        .catch(function(err) {
          // this.tipsMessage('分页获取失败！','error')
          console.log(err);
        });
    },
    stateSelChange() {}
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


