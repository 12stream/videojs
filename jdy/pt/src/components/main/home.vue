<template>
    <div>
        <div class="myMask" v-if="maskFlag">
          <el-row class="head-list w1000">
              <el-col :span="2">
              </el-col>
              <el-col :span="17">
                  <div class="tips1" v-if="guideFlag=='qiye'">
                    <div class="tips1_1">
                      <div class="home_TPS">
                          企业版
                      </div>
                    </div>
                    <div class="tips1_2" style="height:153px;margin-bottom:65px;">
                      <img width="25%" height="64%" class="mr_1" src="../../common/image/tps1.png" alt="" srcset="">
                      <div class="tips_img1">
                        <p class="p6_1">此处为企业个性化功能的集合，<br>在这里您可以进行个性化功能的配置，<br>例如企业主页的搭建、授权管理的更换等等。</p>
                      </div>
                    </div>
                    <div class="tips1_3" >
                      <button  class="tips_btn" @click="guide(1)">下一步</button>
                    </div>
                  </div>
                  <div class="tips2 tips1" v-if="guideFlag == 'biaozhun'">
                    <div class="tips1_1">
                      <div class="home_TPS">
                          标准版
                      </div>
                      
                    </div>
                    <div class="tips1_2" style="height:153px;margin-bottom:60px;">
                      <img width="25%" height="64%" class="mr_1 img-bg1"  src="../../common/image/tps1.png" alt="" srcset="">
                      <div class="tips_img1 tips_img2">
                        <p class="p6_1">
                          此处管理着您发布在梦网云播app内的<br>所有直播间，在这里您可以对所有发布在app内的<br>直播间进行预览、编辑以及取消发布等操作。
                        </p>
                      </div>
                    </div>
                    <div class="tips1_3" >
                      <button  class="tips_btn" @click="guide(2)">下一步</button>
                    </div>
                  </div>
                  <div class="tips3 tips1" v-if="guideFlag == 'spcenter'">
                    <div class="tips1_1">
                      <div class="home_TPS">
                        视频中心
                      </div>
                    </div>
                    <div class="tips1_2" style="height:153px;margin-bottom:60px;">
                      <img width="25%" height="64%" class="mr_1" src="../../common/image/tps1.png" alt="" srcset="">
                      <div class="tips_img1 tips_img3">
                        <p class="p6_1">此处包含直播管理与点播管理，<br>在这里您可以创建或管理自己的直播间，<br>也可以上传本地视频到点播库中进行管理</p>
                      </div>
                    </div>
                    <div class="tips1_3" >
                      <button  class="tips_btn" @click="guide(3)">完成</button>
                    </div>
                  </div>
              </el-col>
              <el-col :span="4">
              </el-col>
          </el-row>
         
        </div>
        <m-header></m-header>
        <div class="w1000 el-row">
            <el-row class="basicInfo">
                <el-col :span="2" class="logo">
                    <!-- <img class="logo" src="../../common/image/logo-lv.jpg"/> -->
                    <img v-if="!iconImg" src="../../common/image/userImg.png" alt="" >
                    <img v-if="iconImg" :src="iconImg" alt="" style="height:100%;width:100%;">
                </el-col>
                <el-col :span="3"  class="nickname">
                    <h3>{{nickname}}</h3>
                </el-col>
                <el-col :span="6">
                    <div class="icon_position">
                        <i class="icon iconfont icon_phone mr16" :class="{'hover':qualifIcon==true}"></i>
                        <i class="icon iconfont icon_idCard" :class="{'hover':qualifIcon==true}"></i>
                    </div>
                </el-col>
                <el-col :span="17">
                    <!-- <div class="versionInfo">
                        <span>套餐类型：</span><b class="vi1">{{versionname}}</b>
                        <el-button type="primary"  class="vi2">升级</el-button>
                    </div> -->
                </el-col>
            </el-row>
            <el-row>
                <el-col class="dv1">
                    <h3 class="vp1">账户预览</h3>
                    <div style="border-bottom-right-radius: 0px;position:relative;text-align:center;">
                        <p class="vp2 count_space1" style="display:inline-block;">帐户余额（元）</p>
                        <p class="tps_7" >？</p>
                        <div class="tps_2 block">
                          <p class="" style="font-size:12px;">账户余额指您充值至云播平台内的余额，主要用于平台内相关付费功能的开通和网络带宽服务费的支付</p>
                        </div>
                        <!-- <div style="display: inline-block;width: 15px;height: 15px;">
                          <img src="../../common/image/im1-2.png" alt="" srcset="" class="tps">
                          <div class="tps_2 block css1" >
                            <p class="">账户余额指您充值至云播平台内的余额，主要用于平台内相关付费功能的开通和网络带宽服务费的支付</p>
                          </div>
                        </div> -->
                        <!-- <i class="tps_1">？</i> -->
                        
                        <h3 class="vp2 count_space" style="display:inlin-block;">{{balance}}</h3>
                        
                    </div>
                    <div style="margin-left: -3px;border-bottom-left-radius: 0px;position:relative;text-align:center;">
                        <p class="vp2 count_space1" style="display:inline-block;">收益余额（元）</p>
                        <p class="tps_7" >？</p>
                        <div class="tps_2 block tps7-1">
                          <p class="" style="font-size:12px;">收益余额指您在平台内所获得的所有收益，主要由用户付费打赏和付费直播的观看收益组成</p>
                        </div>
                        <!-- <div style="display: inline-block;width: 15px;height: 15px;">
                          <img src="../../common/image/im1-2.png" alt="" srcset="" class="tps">
                          <div class="tps_2 block">
                            <p class="">收益余额指您在平台内所获得的所有收益，主要由用户付费打赏和付费直播的观看收益组成。</p>
                          </div>
                        </div> -->
                        <h3 class="vp2 count_space" style="display:inlin-block;">{{benefit}}</h3>
                        <!-- <i class="tps_1">？</i> -->
                        
                    </div>
                </el-col>
                <el-col class="dv2">
                    <h3  class="vp1">运营数据</h3>
                    <div style="border-bottom-right-radius: 0px;position:relative;text-align:center;">
                        <p class="vp2 count_space1" style="display:inline-block;">总访客数（UV）</p>
                        <p class="tps_7" >？</p>
                        <div class="tps_2 block upda">
                          <p class="" style="font-size:12px;">账户内所有直播、点播以及主页的页面独立访客量</p>
                        </div>
                        <!-- <div style="display: inline-block;width: 15px;height: 15px;">
                          <img src="../../common/image/im1-2.png" alt="" srcset="" class="tps">
                          <div class="tps_2 block upda">
                            <p class="">账户内所有直播、点播以及主页的页面独立访客量。</p>
                          </div>
                        </div> -->
                        <h3 class="vp2 count_space" style="display:inlin-block;" >{{visitcount}}</h3>
                        <!-- <i class="tps_1">？</i> -->
                        
                    </div>
                    <div style="margin-left: -3px;border-bottom-left-radius: 0px;position:relative;text-align:center;">
                        <p class="vp2 count_space1" style="display:inline-block;">总浏览量（PV）</p>
                        <p class="tps_7" >？</p>
                        <div class="tps_2 block upda">
                          <p class="" style="font-size:12px;">账户内所有直播、点播以及主页的页面浏览量</p>
                        </div>
                        <!-- <div style="display: inline-block;width: 15px;height: 15px;">
                          <img src="../../common/image/im1-2.png" alt="" srcset="" class="tps">
                          <div class="tps_2 block upda">
                            <p class="">账户内所有直播、点播以及主页的页面访客量。</p>
                          </div>
                        </div> -->
                        <h3 class="vp2 count_space">{{scancount}}</h3>
                        <!-- <i classs -->
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="dv3">
                    <div>
                        <h3 class="vp1">观看总时长：<span style="color:#4285F4">{{moneytary}}分钟</span></h3>
                        <div  class="dateStyle">
                            <div class="selectType">
                              <!-- @change="timeSelChange" -->
                              <el-select v-model="consumptionType" placeholder="请选择">
                                    <el-option label="全部" value="0"></el-option>
                                    <el-option label="标准版" value="1"></el-option>
                                    <el-option label="企业版" value="2"></el-option>
                                </el-select>
                            </div>
                            <!-- <div class="periodBtns">
                            <el-button type="warning"  class="searchBt" @click="searchByTime7" id="7days">最近7天</el-button>
                            <el-button type="warning"  class="searchBt" @click="searchByTime30" id="30days">最近30天</el-button>
                            </div> -->
                            <div class="dateSelect"> 
                              <!-- @change="searchByTime" -->
                              <el-date-picker
                                v-model="startDate"
                                type="date"
                                align="right"
                                @change="getStartDate"
                                >
                              </el-date-picker>
                              <span>-</span>
                              <el-date-picker
                                  v-model="endDate"
                                  type="date"
                                  align="right"
                                  @change="getEndDate"
                                  >
                              </el-date-picker>
                              <!-- <el-date-picker
                                id="dtPicker"
                                v-model="dateRange"
                                type="datetimerange"
                                range-separator="~"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="searchByTime">
                              </el-date-picker> -->
                              <el-button type="warning"  class="searchBt" @click="searchByTime()">查询</el-button>
                            </div>
                        </div>
                        <div class="charts">
                            <div id="chart1" style="width: 890px;height: 400px" ref="myEchart" ></div>
                        </div>
                    </div>
                    <div class="space">
                        <h3 class="vp1">总存储:{{memorySpace}}G</h3>
                        <div class="charts">
                         <div id="chart2" style="width: 750px;height: 400px;margin-left: 180px;" ref="myEchart2"></div>
                        </div>
                    </div>
                </el-col>
                <el-col class="dv4">
                    <h3 class="vp1">数据概况</h3>
                    <div class="div5">
                        <p class="dvp1">主页个数（个）</p>
                        <p class="count_space2">{{pageNo}}</p>
                        <router-link to="/vbIndex">
                        <el-button type="primary"  class="dvbutton" style="background-color:#FF8208;border-color:#FF8208;">我的主页</el-button>
                        </router-link>
                    </div>
                    <div class="div5">
                        <p class="dvp1">直播间个数（个）</p>
                        <p class="count_space2">{{roomNo}}</p>
                        <router-link to="/main">
                          <el-button type="success"  class="dvbutton">我的直播</el-button>
                        </router-link>
                    </div>
                    <div class="div5">
                        <p class="dvp1">点播文件数（个）</p>
                        <p class="count_space2">{{fileNo}}</p>
                      <router-link to="/videoCenter">
                        <el-button type="warning"  class="dvbutton">我的视频</el-button>
                      </router-link>
                    </div>
                </el-col>
            </el-row>
        </div>
         <el-dialog class="qualifyBia"
        :visible.sync="visible_qualifyBia"
        width="500px"
        title="实名认证"
        @close='cancel'
        :show-close="false"
        >
        <div class="tc">
            <div class="img_box">
                <img v-if="!iconImg" src="../../common/image/user_header.png" alt="">
                <img v-if="iconImg" :src="iconImg" alt="">
                <i class="icon iconfont icon_err"></i>
            </div>
            <p class="red_txt" style="text-align: center;">未实名认证用户在直播过程中观看会受到限制</p>
            <p  style="text-align: center;">身份认证后您将获得更多的直播权限</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="toQualify" >
                立即验证
                <!-- <router-link tag="span"  @click="dialogVisible = false" to="/account/certification" >立即验证</router-link> -->
            </el-button>
            <el-button @click="cancel">稍后再说</el-button>
        </span>
        </el-dialog>
        <el-dialog
        class="expand"
        :visible.sync="wxDialog1"
        width="30%"
        center>
        <p>尊敬的梦网云播用户,您的存储空间不足,</p>
        <p style="margin-top: 5px;">空间使用完毕后,直播将不会生成录像,</p>
        <p style="margin-top: 5px;">请及时前往个人后台进行空间扩容或清理。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goBuy">前往购买</el-button>
          <el-button @click="wxDialog1=false">取 消</el-button>
        </span>
      </el-dialog>
        <m-footer></m-footer>
    </div>
</template>
<script>
import MHeader from "components/header/header";
import MFooter from "components/header/footer";
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
import { getCookies, DATA_URL, chargeError, setLStorage } from "../../api/config";
export default {
  data() {
    return {
      num:1,
      maskFlag:'',
      guideFlag:'qiye',
      wxDialog1:false,
      visible_qualifyBia: false,
      consumptionType: "0",
      iconImg: "",
      qualifIcon: getLStorage("userQulify"),
      nickname: "", //昵称
      versionname: "", //版本
      balance: "0.00", //账户余额
      benefit: "0.00", //收益余额
      moneytary: "0.00", //累计消费金额
      visitcount: "0", //总访问量
      scancount: "0", //总浏览量
      pageNo: 0, //主页个数
      roomNo: 0, //直播间个数
      fileNo: 0, //点播文件个数
      chart: null,
      chart2: null,
      userID: getLStorage("userId"),
      memorySpace: "0",
      token: getCookies("token"),
      startDate: "",
      endDate: "",
      dateRange:[]
    };
  },
  mounted() {
    this.startDate = getDay(-6);
    this.endDate = getDay(0);
    this.dateRange.push(getDay(-6));
    this.dateRange.push(getDay(0));
    //   this.checkToken();
    this.getLiveTime();
    this.getSaveData();
    this.getMainData();
    this._setAdmin();
    this.ISqualify();
    this.is_guide()
    $("#7days").css("color", "#fff");
    $("#7days").css("background-color", "#4285f4");
  },
  watch: {
    consumptionType() {
      this.getLiveTime();
    },
    qualifIcon(value){
      if(value==null|value==""){
        this.qualifIcon=false;
      }
    }
  },
  methods: {
    is_guide(){
        let params = {token:this.token}
        this.$ajaxs.getBrandInfo(params).then((re)=>{
            if (re.result.is_guide) {
                this.maskFlag = false;
                $('body').css('overflow-y','auto')
                
            }else{                
                this.maskFlag = true;
                $('body').css('overflow-y','hidden')
            }
        })
    },
    goBuy(){
      this.$router.push({
              path: "/account/dilatation"
            });
      this.wxDialog1 = false;
    },
    ISqualify() {
      if (this.$route.query.qualify =="2"||this.$route.query.qualify =="0") {
        this.visible_qualifyBia = true;
        setLStorage("userQulify","0")
      }
      else if(this.$route.query.qualify =="3"){
        this.qualifIcon = true;
        setLStorage("userQulify","1")
      }
    },
    cancel() {
      this.visible_qualifyBia = false;
    },
    toQualify() {
      this.$router.push({
        path: "/account/certification"
      });
    },
    getStartDate() {
    //   console.log(this.startDate);
        this.startDate = changeDateType(this.startDate);
        // this.startDate = this.startChangDate(this.startDate);
    },
    getEndDate() {
      //console.log("end"+val);
        this.endDate = changeDateType(this.endDate);
    },
    checkToken() {
      if (this.token == "" || this.token == null) {
        this.$message({
          showClose: true,
          type: "error",
          message: "您的用户信息失效，请重新登陆！"
        });
        this.$router.push({
          path: "/login"
        });
      } else {
        let formdata = new FormData();
        formdata.append("token", this.token);
        let that = this;
        axios({
          method: "post",
          url: DATA_URL + "manage/user/check_token.do",
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
          if (res.data.code != ERR_OK) {
            this.$message({
              showClose: true,
              type: "error",
              message: "您的用户信息失效，请重新登陆！"
            });
            this.$router.push({
              path: "/login"
            });
          }
        });
      } 
    },
    _setAdmin() {
      if (getLStorage("admin") != null && getLStorage("admin").length > 5) {
        this.nickname = getLStorage("admin").slice(0, 5) + "...";
      } else {
        this.nickname = getLStorage("admin");
      }
      if (getLStorage("iconImg") == "null" || getLStorage("iconImg") == "") {
        this.iconImg = "";
      } else {
        this.iconImg = getLStorage("iconImg");
      }
    },
    getMainData() {
      var Params = { token: this.token };
      // if (Params.token) {
      //   if (sessionStorage.getItem('basis')) {
      //     this.maskFlag = false
      //     sessionStorage.getItem('basis');
      //   }else{
      //     this.maskFlag = true
      //     sessionStorage.setItem('basis',this.num);
      //   }
      // }
      this.$ajaxs.getMainData(Params).then(data => {
        // console.log(data);
        if (data.code == "1") {
          this.pageNo = data.result.page_count;
          this.balance = data.result.java_result.params.amount;
          this.benefit = data.result.java_result.params.revenueAmount;
          this.visitcount = data.result.uv;
          this.scancount = data.result.pv;
          this.roomNo = data.result.java_result.params.liveCount;
          this.fileNo = data.result.java_result.params.pointCount;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: chargeError(data.code)
          });
        }
      });
    },
    fileterTime(str){
       var d = new Date(str);  
       var  resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
       return resDate;
    },
    searchByTime() {
      // this.startDate=this.fileterTime(this.dateRange[0]);
      // this.endDate=this.fileterTime(this.dateRange[1]);
      // if(this.dateRange[1]&&this.dateRange[0]&&(this.dateRange[1]-this.dateRange[0])/ (1000 * 60 * 60 * 24)>365){
      //   this.$message({
      //       showClose: true,
      //       type: "info",
      //       message: "天数跨度不能大于365天"
      //     });
      //     this.dateRange[0]=getDay(0);
      //     this.dateRange[1]=getDay(0);
      //     return
      // }
      // if(this.compareTime(this.endDate,getDay(0))<0){
        
      //   this.endDate=getDay(0);
      //   this.dateRange[1]=getDay(0);
      // }
      // if(this.compareTime(this.startDate,getDay(0))<0){
        
      //   this.startDate=getDay(0);
      //   this.dateRange[0]=getDay(0);
      // }
      if(this.startDate&&this.endDate&&(new Date(this.endDate)-new Date(this.startDate))/ (1000 * 60 * 60 * 24)>366){
        this.$message({
            showClose: true,
            type: "info",
            message: "天数跨度不能大于365天"
          });
          this.startDate=getDay(0);
          this.endDate=getDay(0);
          return
      }
      if(this.compareTime(this.endDate,getDay(0))<0){
        this.endDate=getDay(0);
      }
      if(this.compareTime(this.startDate,getDay(0))<0){
        this.startDate=getDay(0);
      }
      if(this.compareTime(this.startDate,this.endDate)<0){
        this.startDate=this.endDate;
      }
      this.getLiveTime();
      $("#7days").css("color", "#333");
      $("#7days").css("background-color", "#ffffff");
      $("#30days").css("color", "#333");
      $("#30days").css("background-color", "#ffffff");
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
    searchByTime7() {
      this.startDate = getDay(-6);
      this.endDate = getDay(0);
      this.dateRange[0] = getDay(-6);
      this.dateRange[1] = getDay(0);
      this.getLiveTime();
      $("#7days").css("color", "#fff");
      $("#7days").css("background-color", "#4285f4");
      $("#30days").css("color", "#333");
      $("#30days").css("background-color", "#ffffff");
    },
    searchByTime30() {
      this.startDate = getDay(-29);
      this.endDate = getDay(0);
      this.dateRange[0] = getDay(-29);
      this.dateRange[1] = getDay(0);
      this.getLiveTime();
      $("#30days").css("color", "#fff");
      $("#30days").css("background-color", "#4285f4");
      $("#7days").css("color", "#333");
      $("#7days").css("background-color", "#ffffff");
    },
    getLiveTime() {
      let that = this;
      var sDate;
      var eDate;
    //   if (this.startDate.indexOf('/') != -1) {
    //       console.log('我是ie')
            sDate = this.startDate.replace(/\//g,'-');
            eDate = this.endDate.replace(/\//g,'-');
    //   }else{
    //       sDate = this.startDate;
    //       eDate = this.endDate;
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
            this.consumptionType
        )
        .then(response => {
          //   console.log(JSON.stringify(response));
          if (response.data.resultCode == "200") {
            //   console.log(JSON.stringify(response.data.params));
            this.moneytary = response.data.params.sumTime;
            var date = [];
            var allDate = [];
            var lDate = [];
            var pDate = [];
            var dataList = response.data.params.playTime;
            //    console.log(dataList);
            dataList.forEach(e => {
              date.push(e.date);
              allDate.push(e.allPlayTime);
              lDate.push(e.livePlayTime);
              pDate.push(e.pointPlayTime);
            });
           // console.log(date, allDate, lDate, pDate);
            var option = {
              //echart图表测试数据
              title: { text: "" }, //表名
              tooltip: {
                trigger: "axis",
                formatter: function(params) { //自定义函数修改折线图给数据加单位
              // console.log(params)
                var str = '';//声明一个变量用来存储数据
                str += '<div>'+ params[0].name +'</div>';   //显示日期的函数
                for(var i=0; i<params.length; i++) {  //图显示的数据较多时需要循环数据，这样才可以成功的给多条数据添加单位
                    str += params[i].marker+ params[i].seriesName +'</span> : <span>'+ params[i].data+'分钟</span></div><br>';
                }
                return str;
            }
                // formatter: "{b} <br/>{a0} : {c0} 分钟<br/>{a1} : {c1} 分钟<br/>{a2} : {c2} 分钟"
              }, //坐标轴触发
              grid: {
                top: "5%",
                left: "3%",
                right: "4%",
                bottom: "10%",
                containLabel: true
              },
              legend: {
                y: "bottom",
                data: ["当日播放总时长", "直播播放总时长", "点播播放总时长"],
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: date,
                axisLine: {
                  lineStyle: {
                    color: "#9B9B9B"
                  }
                }
              },
              yAxis: {
                type: "value",
                splitLine: {
                  lineStyle: {
                    color: "#E9E9E9"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#9B9B9Bs"
                  }
                }
              },
              series: [
                {
                  name: "当日播放总时长",
                  type: "line",
                  data: allDate
                },
                {
                  name: "直播播放总时长",
                  type: "line",
                  data: lDate
                },
                {
                  name: "点播播放总时长",
                  type: "line",
                  data: pDate
                },
              ],
              color: ["rgb(251,188,5)", "rgb(255,70,127)", "rgb(66,133,244)"]
            };
            this.chart = Chart.init(this.$refs.myEchart);
          this.chart.setOption(option);
          }
          else{
            that.$message({
              showClose: true,
              type: "info",
              message: "无该时间段数据"
            });
            console.log(response.data.resultMsg);
          }
        })
        .catch(function(err) {
          // this.tipsMessage('分页获取失败！','error')
          if ((err.code = 4)) {
            that.$message({
              showClose: true,
              type: "error",
              message: chargeError(err.code)
            });
            // that.$router.push({
            //   path: "/login"
            // });
          }
         // console.log(err);
        });
    },
    getSaveData() {
      axios
        .get(
          MW_Live_API_URL +
            "/20/service/memorySpaceCount.action?userID=" +
            this.userID
        )
        .then(response => {
          // console.log(JSON.stringify(response));
          if (response.data.resultCode == "200") {
            //    console.log(JSON.stringify(response.data.params));
            this.memorySpace = response.data.params.space;
            if(response.data.params.haveSpace<0&&this.$route.query.qualify!=undefined){
              this.visible_qualifyBia=false;
              this.wxDialog1=true;
            }
            var option2 = {
              tooltip: {
                // trigger: "item",
                formatter: "{b} : {c}G ({d}%)"
              },
              legend: {
                orient: "vertical",
                x: "left",
                y: "50%",
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
                },
              },
              toolbox: {
                feature: {
                  mark: { show: true },
                  magicType: {
                    type: ["pie", "funnel"],
                    option: {
                      funnel: {
                        x: "30%",
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
                  type: "pie",
                  radius: "55%",
                  center: ["55%", "60%"],
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
                          //formatter: '{b}:{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                          formatter:function(key){
                              let val = key.percent.toFixed(2);
                              let name = key.name;
                              return name + ':' + val +'%';
                          },
                        textStyle : {
                          fontFamily : '微软雅黑',
                          fontSize : 14,
                          fontWeight : 'bolder',
                      }
                      },
                  },
                //   labelLine: {
                //         normal: {
                //             show: false
                //         }
                //     }
                }
              ],
              color: ["rgb(255,220,98)", "rgb(244,102,124)", "rgb(85,167,255)"]
            };
            // console.log(this.option2);
            this.chart2 = Chart.init(this.$refs.myEchart2);
            this.chart2.setOption(option2);
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
    },
    // 查询实名
    qualifyShow() {
      let userId = getLStorage("userId");
      axios
        .get(DATA_URL + "mwlive/user/user_qualify_cx.do?userId=" + userId)
        .then(rs => {
          if (rs.data.code == ERR_OK) {
            if (rs.data.data) {
              if (rs.data.data.qualify == 3) {
                // 认证成功
                this.qualifIcon = true;
              } else {
                this.qualifIcon = false;
              }
            }
          }
        })
        .catch(function(err) {
          console.log("err", err);
        });
    },
    guide(id){
      if (id === 1) {
          this.guideFlag = 'biaozhun';
      }
      if (id === 2) {
          this.guideFlag = 'spcenter';
      }
      if (id === 3) {
          let params = {token:this.token,type:'0',is_guide:'1'}
          this.$ajaxs.setguide(params).then((res)=>{
              console.log(res)
              if (res.code == 1) {
                  $('body').css('overflow-y','auto')
                this.maskFlag = false;
              }
          })
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    } 
    this.chart.dispose();
    this.chart = null;
  },
  components: {
    MHeader,
    MFooter
  }
};
</script>
<style scoped>
.expand p{
  color: #000000;
  font-weight: bold;
}
.admin-info .img_box {
  width: 140px;
  height: 140px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}

.qualifyBia .img_box {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin: 0 auto 20px auto;
  position: relative;
  background: #f2f2f2;
  border-radius: 50%;
}
.img_box img{
  height: 120px;
  width: 120px;
  border-radius: 50%;
}
.w1000 {
  width: 1160px;
}
#chart1,
#chart2 {
  padding-bottom: 10px;
}
.basicInfo {
  background-color: #ffffff;
  padding: 6px 30px;
  margin-top: 20px;
  border-radius: 5px;
}
.dateStyle {
  padding: 0px 0px 16px 30px;
}
.logo {
  width: 50px;
  height: 50px;
  /* border: 1px solid #e5e5e5; */
  margin-right: 20px;
  border-radius: 5px;
}
.icon {
  font-size: 35px;
  display: inline-block;
  color: #e5e5e5;
}
.icon_phone {
  width: 30px;
  height: 30px;
  background: url(../../common/image/icon_phone_active.png);
  position: relative;
  top: -10px;
}
.icon_idCard {
  width: 35px;
  height: 26px;
  background: url(../../common/image/icon_Idcard.png);
  position: relative;
  top: -12px;
}
.icon_idCard.hover {
  background: url(../../common/image/icon_Idcard_active.png);
}
.icon_position {
  margin-left: -20px;
  margin-top: 20px;
}
.nickname {
  margin-top: 10px;
}
.nickname h3 {
  font-size: 20px;
}
.versionInfo {
  font-size: 14px;
  float: right;
  margin-top: 10px;
}
.versionInfo span {
  color: #9b9b9b;
}
.vi1 {
  display: inline;
}
.vi2 {
  display: inline;
  margin-left: 20px;
}
.dv1 {
  width: 575px;
}
.dv2 {
  margin-left: 10px;
  width: 575px;
}
.dv1 div,
.dv2 div {
  width: 286.5px;
  display: inline-block;
  background-color: #ffffff;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.dv3 {
  width: 909px;
}
.dv3 div {
  background-color: #ffffff;
  border-radius: 5px;
}
.dv4 {
  margin-left: 10px;
  width: 241px;
}
.div5 {
  margin-top: 1px;
}
.dvp1 {
  margin-top: 0px;
  padding-top: 30px;
  color: #9b9b9b;
}
.dvbutton {
  margin-bottom: 30px;
}
.vp1 {
  padding: 16px 0px 16px 30px;
  margin-bottom: 1px;
  margin-top: 10px;
  background-color: #ffffff;
  font-size: 18px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.vp2 {
  text-align: center;
  padding-top: 9px;
  font-size: 14px;
  color: #9b9b9b;
}
.dv4 div {
  text-align: center;
  padding-bottom: 5px;
  background-color: #ffffff;
  /* border-radius: 5px; */
}
.space {
  margin-top: 5px;
}
.el-button--success {
  background-color: #ff467f;
  border-color: #ff467f;
}
.el-button--warning {
  background-color: #2B6CFF;
  border-color: #2B6CFF;
}
.periodBtns {
  float: right;
  margin-right: 10px;
}
.periodBtns button {
  background-color: #ffffff;
  border-color: #d9d9d9;
  color: #333;
}
.count_space {
  padding-bottom: 54px;
  font-size: 30px;
  color: #000;
}
.count_space1 {
  padding-top: 30px;
}
.count_space2 {
  padding-top: 18px;
  padding-bottom: 19px;
  font-size: 24px;
  font-weight: bold;
}
.selectType {
  display: inline;
  width: 80px;
}
.selectType .el-select {
  width: 80px;
}
.selectType input {
  background-color: #fff;
  height: 40px;
}
.dateSelect {
  display: inline;
  float: right;
  margin-right: 20px;
}
.dateSelect .el-date-editor {
  width: 225px;
}
.dateSelect button,
.periodBtns button {
  height: 40px;
}
.qualifyBia  .icon_err{
    position: absolute;
    left:50%;
    top:50%;
    width: 42px;
    height: 42px;;
    margin-left:18px;
    margin-top:18px;
    background: url(../../common/image/icon_err.png);

}
</style>
<style>
.broadcast-bottom .el-switch {
  height: 29px;
}
.qualifyBia .el-dialog__footer {
  text-align: center;
}
.index .el-switch__core:after {
  top: 5px;
  left: 8px;
}
.index .el-switch.is-checked .el-switch__core::after {
  margin-left: -23px;
}
.qualifyBia .el-dialog__header {
  padding: 20px 0;
}
.el-date-range-picker__time-header{
  display: none;
}
.myMask{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    z-index: 999;
}
.tips1{
    width: 500px;
    height: 250px;
    /* border: 1px solid red; */
    margin-left: 235px;
}
.tips1_1{
    width: 108px;
    height: 64px;
    border: 2px dashed #fff;
    /* background: #444; */
    text-align: center !important;
    text-align: right;
    font-size: 16px;
    line-height: 64px;
}
.tips_btn{
    margin-right: 304px;
    height: 48px;
    width: 93px;
    border: 3px dashed #fff;
    float:right;
    background:url(../../common/image/tps3.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;;
    outline:none;
    border:none;
    color:#fff;
}
.tips2{
  margin-left:336px;
}
.tips3{
  margin-left:446px;
}
.tps_1{
    /* position: absolute; */
    top: 70px;
    right: 74px;
    width: 20px;
    height: 20px;
    background: #2B6CFF;
    /* text-align: center; */
    line-height: 20px;
    color: #fff;
    border-radius: 50%;
    font-style:normal;
    text-align:right;
}
.tps_7{
    color: #fff;
    /* background: #2B6CFF; */
    background:#ccc;
    border-radius: 50%;
    font-style:normal;
    text-align:center;
    font-size:10px;
    /* padding-left: 4px; */
    line-height: 15px;
    width: 15px;
    height: 15px;
    display: inline-block;
    cursor: default;
}
.tps_7:hover{
    background:#2B6CFF;
}
.tps_7:hover + .tps_2{
    /* background:#2B6CFF; */
    display:block !important;
}
.tps_7:hover + .tps_2 p{
  text-align:justify;
  text-justify:inter-ideograph;
}
.block.tps_2{
    position: absolute !important;
    /* height: 42px; */
    top: 71px;
    left: 150px;
    z-index: 99;
    background: rgba(0,0,0,.7) !important;
    border-radius:6px !important;
    text-align: left;
    color: #fff;
    padding: 17px;
    display: none !important;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 21px;
    font-size: 12px;
    width: 216px !important;
}
.tps_2::after{
    content: '';
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color: rgba(0,0,0,.7);
    top: -21%;
    left: 33px;
}
.tps_1:hover +.tps_2{
      display:block !important;

  }
.mr_1{
  margin-left:46px;
}
.tips_img1{
    background:url(../../common/image/tps2.png);
    width: 317px;
    height: 99px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: -19px;
    text-align:center;
    padding-top: 21px;
    color: #fff;
    line-height:20px;
}
.tips_img1.tips_img2{
    width:340px;
    height: 96px;
}
.tips_img1.tips_img3{
    width:334px;
    height: 98px;
}
.p6_1{
  width: 90%;
  height: 80%;
  margin: auto;
  margin-top: 5px;
}
.upda::after{
  top: -26%;
}
.tps_2.upda{
    left: 153px;
}
.tps_2.css1.div{
  left:56px;
  top:151px;
}
.tps7-1::after{
  top:-20px;
}
/* .tps{
    background:url(../../common/image/im1-2.png)
} */
.tps:hover + .tps_2{
    display: block !important;
}
.home_TPS{
    width: 90%;
    height: 88%;
    text-align: center;
    margin: 3px auto;
    border: 1px solid #eee;
    background: #fff;
}
/* .tps:hover{
    background:url(../../common/image/img1-1.png)
} */
/* 前样式 */
/* @media (min-width: 1280px) {.tips1{margin-left:244px;}.tips2{margin-left:345px;}.tips3{margin-left:456px;}} 
@media (min-width: 1366px) {.tips1{margin-left: 283px;}.tips2{margin-left:394px;}.tips3{margin-left:501px;}}  
@media (min-width: 1440px) {.tips1{margin-left:324px;}.tips2{margin-left:435px;}.tips3{margin-left:546px;}} 
@media (min-width: 1600px) {.tips1{margin-left:406px;}.tips2{margin-left:517px;}.tips3{margin-left:628px;}} 
@media (min-width: 1680px) {.tips1{margin-left: 444px;}.tips2{margin-left:555px;}.tips3{margin-left:666px;}} 
@media (min-width: 1920px) {.tips1{margin-left:562px;}.tips2{margin-left:673px;}.tips3{margin-left:784px;}} */
/* @media (min-width: 1100px) {.tps_1{}}  */

/* yst 360 新手指引错位*/
/* @media (min-width: 1024px) {.tips1{margin-left:233px;}.tips2{margin-left:336px;}.tips3{margin-left:445px;}}
@media (min-width: 1280px) {.tips1{margin-left:293px;}.tips2{margin-left:395px;}.tips3{margin-left:506px;}}
@media (min-width: 1366px) {.tips1{margin-left: 336px;}.tips2{margin-left:439px;}.tips3{margin-left:550px;}}
@media (min-width: 1440px) {.tips1{margin-left:373px;}.tips2{margin-left:475px;}.tips3{margin-left:587px;}} 
@media (min-width: 1600px) {.tips1{margin-left:454px;}.tips2{margin-left:556px;}.tips3{margin-left:667px;}} 
@media (min-width: 1680px) {.tips1{margin-left: 493px;}.tips2{margin-left:595px;}.tips3{margin-left:706px;}}
@media (min-width: 1920px) {.tips1{margin-left:604px;}.tips2{margin-left:706px;}.tips3{margin-left:816px;}} */
/* yst */
.myMask .w1000{
  background:none;
}

/* @media (min-width: 1920px) {.tips1{position:fixed;left: 112px;}.tips2{position:fixed;left: 112px;}.tips3{position:fixed;left: 112px;}} */
</style>
