<template>
<div class="my_list securitySet">
    <div class="live-top bg-fff" style="position:relative;">
        <!--<el-select v-model="stateOptVal" placeholder="请选择" class="sel_96" @change="stateSelChange">
            <el-option label="全部数据" value="0"></el-option>
            &lt;!&ndash; <el-option label="主页" value="2"></el-option> &ndash;&gt;
            <el-option label="直播间" value="1"></el-option>
            <el-option label="点播间" value="2"></el-option>
        </el-select>-->
        存储统计
        <!-- <div style="display: inline-block;width: 15px;height: 15px;">
          <img src="../../common/image/im1-2.png" @mouseover="move($event)" alt="" srcset="" :class="{'img_bg':aaa,'img_bg2':bbb}" class="tps saveDataTps">
          <div class="tps_2 block" style="left:35px;top:37px;">
            <p class="">账户余额指您充值至云播平台内的余额，主要用于平台内相关付费功能的开通和网络带宽服务费的支付</p>
          </div>
        </div> -->
        <p class="tps_12" style="left:70px;top:9px;">？</p>
        <div class="tps_23 block" style="left:34px;top:45px;">
          <p class="" style="font-size:12px;font-weight:100">储存统计分别统计直播视频和点播视频所占用的空间<br>
            直播储存：所有直播视频和直播录像所占用的空间<br>
            点播储存：所有视频中心中点播视频所占用的空间
          </p>
        </div>
    </div>
    <div>
        <div>
            <div class="charts" style="position:relative;">
                <div id="chart1" style="width: 880px;height: 400px" ref="myEchart" ></div>
                <!-- <i class="tps_1" style="left:145px;top:192px;">？</i>
                <div class="tps_2 block" style="left:48px;top:50px;">
                  <p class="">储存统计分别统计直播视频和点播视频所占用的空间。</p>
                </div> -->
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Chart from "echarts";
import { getLStorage, MW_Live_API_URL, ERR_OK } from "api/config";
import axios from "axios";
export default {
  data() {
    return {
      bbb:'',
      aaa:false,
      imgURL:'../../common/image/im1-2.png',
      userID: getLStorage("userId"),
      stateOptVal: "0",
      chart: null,
      space: 0
    };
  },
  mounted() {
    var dt = new Date();
    this.getData(
      this.filterTime(dt - 7 * 24 * 3600 * 1000).split(" ")[0],
      dt
        .toLocaleDateString()
        .toString()
        .replace(/\//g, "-")
    );
  },
  methods: {
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
    getData(a, b) {
      var params = { userId: this.userID };
      console.log(a, b, this.userID);
      //debugger;
      axios
        .get(
          MW_Live_API_URL +
            "/20/service/memorySpaceCount.action?userID=" +
            this.userID
        )
        .then(response => {
          //debugger;
          console.log(JSON.stringify(response));
          if (response.data.resultCode == "200") {
            console.log(JSON.stringify(response.data));
            this.space = response.data.params.space;
            var haveSpace = response.data.params.haveSpace;
            var liveSpace = response.data.params.liveSpace;
            //this.option.xAxis.data
            var option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                x: "left",
                y: "center",
                data: ["剩余存储", "直播存储", "点播存储"],
                formatter:  function(name){
                  if(name=="剩余存储"){
                    return name+" : "+response.data.params.haveSpace+"G"
                  }
                  if(name=="直播存储"){
                    return name+" : "+response.data.params.liveSpace+"G"
                  }
                  if(name=="点播存储"){
                    return name+" : "+response.data.params.pointSpace+"G"
                  }
                  
                }
              },
              toolbox: {
                feature: {
                  mark: { show: true },
                  magicType: {
                    type: ["pie", "funnel"],
                    option: {
                      funnel: {
                        x: "25%",
                        width: "50%",
                        funnelAlign: "left",
                        max: 1548
                      }
                    }
                  }
                }
              },
              calculable: true,
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: [
                    {
                      value: Number(response.data.params.haveSpace),
                      name: "剩余存储"
                    },
                    {
                      value: Number(response.data.params.liveSpace),
                      name: "直播存储"
                    },
                    {
                      value: Number(response.data.params.pointSpace),
                      name: "点播存储"
                    }
                  ],
                  label: {
                normal: {
                    show: true,
                    position: 'outer',
                    formatter: function(key){
                      let val = key.percent.toFixed(2);
                      let name = key.name;
                      return name + ':' + val + '%';
                    }
                },
            }
                }
              ],
              color: ["rgb(255,220,98)", "rgb(244,102,124)", "rgb(85,167,255)"]
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
    stateSelChange() {},
    move(e){
      // this.aaa = true
        console.log(e)
        // $(e).
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
.tps_12{
    position: absolute;
    top: 70px;
    right: 74px;
    width: 15px;
    height: 15px;
    background: rgba(0,0,0,.2);
    text-align: center;
    line-height: 15px;
    color: #fff;
    border-radius: 50%;
    /* text-align: right; */
    font-style: normal;
    font-size: 7px;
    line-height: 15px;
}
.tps_12:hover{
    background: #2B6CFF;
}
.block.tps_23{
    position: absolute !important;
    /* height: 42px; */
    top: 59px;
    left: 159px;
    z-index: 99;
    background: rgba(0,0,0,.7) !important;
    border-radius: 17px !important;
    text-align: left;
    color: #fff;
    padding: 17px;
    display: none !important;
    max-width: 276px;
    font-size:12px;
    line-height: 21px;
    font-family: Arial, Helvetica, sans-serif;
}
.tps_23::after{
    content: '';
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color: rgba(0,0,0,.7);
    top: -16% !important;
    left: 33px;
}
.tps_12:hover +.tps_23{
      display:block !important;

  }
.mr_1{
  margin-left:46px;
}
.tips_img{
    background:url(../../common/image/tps2.png);
    width: 73%;
    height: 54%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: -19px;
    text-align:center;
    padding-top: 21px;
    color: #fff;
}
.p6{
  width: 80%;
  height: 80%;
  margin: auto;
  margin-top: 5px;
}
.img_bg2{

}
/* .img_bg.tps{
  background:url(../../common/image/img1-1.png);
} */
/* .tps:hover + .tps_2{
    display: block !important;
} */
</style>


