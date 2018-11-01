<template>
    <div class="main index">
        <m-header @dataList="changeData" @PageDATA="changePage"></m-header>
        <el-row class="w1000">
            <el-col class="mt20">
                <!-- <el-row class="mt20">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-col :span="2">
                            <el-button type="primary">删除</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-select v-model="form.region" placeholder="默认排序">
                                <el-option label="最后创建时间" value="aftertiem"></el-option>
                                <el-option label="创建时间" value="tiem"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-select v-model="form.region2" placeholder="全部">
                                <el-option label="预告" value="trailer"></el-option>
                                <el-option label="直播" value="broadcast"></el-option>
                                <el-option label="结束" value="end"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" :offset="4" class="search">
                            <el-input v-model="form.search" :placeholder="placeholder"></el-input>
                            <i @click="clearSearch" v-show="form.search" class="search-icon el-icon-circle-close"></i>
                        </el-col>
                    </el-form>
                </el-row> -->
                <el-row>
                    <el-col :span="24"  class=" default_shadow admin-info my_section">
                        <h3 class="col-333">基本信息</h3>
                        <div class="pd30">
                            <el-row  type="flex"  justify="space-between"  class="default-color row-bg">
                                <el-col :span="10">
                                    <div class="grid_content">
                                        <div class="fl img_box mr30">
                                            <img v-if="!iconImg" src="../../common/image/user_header.png" alt="">
                                            <img v-if="iconImg" :src="iconImg" alt="">
                                        </div>
                                        <div>
                                            <h3>{{account}}</h3>
                                            <span>用户类型：</span><span class="col_26">基础版</span>
                                            <!-- <span class="cur-p  bgc_txt update_btn">
                                                <router-link tag="div" to="/account/recharge" class="d-ib">升级</router-link>
                                            </span> -->
                                            <div class="mt20" style="display:inlin-block;">
                                                <!-- <i class="icon iconfont icon-phone mr10"></i> -->
                                                <!-- <i class="icon iconfont icon-Idcard"></i> -->
                                                <i class="icon iconfont icon_phone mr16" :class="{'hover':qualifIcon==true}"></i>
                                                <i class="icon iconfont icon_idCard" :class="{'hover':qualifIcon==true}"></i>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="7" >
                                    <div class="grid_content margin_txt">
                                        <div style="margin-top:11px;height:26px;">账户余额 :
                                            <span class="color_orange">{{money}}</span>
                                            <span class="col_26">元</span>
                                            <span class="cur-p bgc_txt recharge_btn" @click="recharge">
                                                <router-link tag="div" to="/account/recharge" class="d-ib">充值</router-link>
                                            </span>
                                        </div>
                                        <div style="margin-top:25px;height:26px;">收益余额 :
                                            <span class="color_orange">{{currencyAmount}}</span>
                                            <span class="col_26">梦豆</span>
                                            <span class="bgc_txt bor_fff cur-p tx_btn" @click="recharge"><router-link tag="div" to="/account/withdrawAlipay" class="d-ib">提现</router-link></span>
                                        </div>
                                        <div style="margin-top:25px;height:26px;">累计消费金额 :
                                            <span class="txt_blue">{{spendmoney}}</span>
                                            <span class="col_26">元</span>
                                            <!-- <span class="bgc_txt bor_none cur-p" @click="recharge"><router-link tag="div" to="/account/recharge" class="d-ib">查看</router-link></span> -->
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="6" >
                                    <div class="grid_content margin_txt">
                                        <div style="margin-top:11px;height:26px;">累计观看人数 : <span class="col_26">{{totalViewers}}人</span> </div>
                                        <div style="margin-top:25px;height:26px;">已建频道个数 : <span class="col_26">{{PageDATA.total}}个</span></div>
                                        <div style="margin-top:25px;height:26px;">累计观看时长 : <span class="col_26">{{playTime}}分钟</span></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col class="default_shadow fr my_section" style="">
                        <div class="my_liveT">
                            <h3 class="col-333">最近直播 </h3>
                            <router-link  tag="div" to="/main/newLive1">
                                <span class="bgc_txt update_btn">新建直播</span>
                            </router-link>
                        </div>
                        <el-row class="live-wrap default-color ">
                            <!-- <el-col :span="12" class="mainData-list">
                                <router-link class="add-live cur-p te-c" tag="div" to="/newLive1">
                                    <span class="el-icon-plus"></span><br>
                                    新建直播频道
                                </router-link>
                            </el-col> -->
                            <el-col v-for="item in dataList" :key="item.id" class="mainData-list clear">
                                <div class="mainData_title">
                                    <span class="edit_btn" @click="edit_live(item)">
                                         <i class="icon iconfont icon_edit"></i><span>编辑</span>
                                    </span>
                                    <el-switch
                                    class="my_switch"
                                    v-model="item.live_switch"
                                    active-text="下线"
                                    :width="60"
                                    :disabled="(item, item.switch_disabled)"
                                    @change="toggleStatus(item, item.live_switch)"
                                    active-color="#CCCCCC"
                                    inactive-color="#2B6CFF"
                                    inactive-text="上线">
                                    </el-switch>
                                    <el-button  class="icon iconfont icon_delete mr16"  :disabled="(item,item.no_del)" @click="edit_live(item,true)"></el-button>
                                </div>
                                <div class="show_img">
                                    <div class="mainData-con">
                                        <img class="mainData-img" :src="item.live_cover_url ? item.live_cover_url : defaultImg">

                                        <div class="live-state col-fff" v-bind:class="item.live_status | live_btn">
                                            <!-- {{item.live_status | type}} -->
                                            {{item.live_status | type}}
                                        </div>
                                    </div>
                                </div>
                                <div class="show_bottom">
                                    <div class="mainData-control col-fff te-c">
                                            <!-- <span class="el-icon-caret-right mainData-controlIcon icon iconfont icon-zhibo"></span> -->
                                            <el-row class="te-c main-infoList">
                                                <el-col class="default-colHover live-manage cur-p" :span="8">
                                                    <div @click="toLiveControl(item)">
                                                        <!-- <i class="icon iconfont icon-bianji" style="font-size:16px;"></i> -->
                                                    <span>详情</span></div>
                                                    <!-- <router-link tag="div" :to="'/liveControl/'+ index">管理</router-link> -->
                                                </el-col>
                                                <el-col class="default-colHover statistics cur-p" :span="8">
                                                    <div @click="toLiveControl(item,'DataStatistics')">
                                                        <!-- <i class="icon iconfont icon-tongji" style="font-size:20px;"></i> -->
                                                        <span>统计</span>
                                                    </div>
                                                </el-col>
                                                <el-col class="default-colHover cur-p" :span="8">
                                                    <div @mouseenter="qrcanvas(item)">
                                                        <!-- <i class="icon iconfont icon-yulan" style="font-size:18px;"></i> -->
                                                        <span>预览</span>
                                                        <div class="p-a qrcImg">
                                                            <div class="qrcImg-content clear">
                                                                <div class="fl mr20">
                                                                    <div class="ewm_84" :id=" 'qrc' + item.id"></div>
                                                                    <div style="font-size:12px;">手机扫描观看</div>
                                                                </div>
                                                                <div class="fl te-l">
                                                                    <div style="margin-bottom:6px;">观看地址：</div>
                                                                    <div hidden>{{ item.playUrl = item.playUrl || PlayUrl + item.id }}</div>
                                                                    <div><input readonly type="text" style="width: 375px;margin-bottom:14px;" v-model="item.playUrl" :id=" 'copyUrl' + item.id" class="el-input__inner"></div>
                                                                    <div class="mt5"><el-button type="primary" @click="openLiveUrl(item.playUrl)">打开视频</el-button> <el-button class="btn_cc" @click="copyLink(item)">复制地址</el-button></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </el-col>
                                                <!-- <el-col class="default-colHover cur-p" :span="8"><i class="icon iconfont icon-yulan"></i>预览</el-col> -->
                                            </el-row>
                                    </div>
                                </div>
                                <div class="broadcast-bottom default-color">
                                    <el-col  class="live_info">
                                        <div class="txt-hide col_2316fw">
                                            {{item.live_name}}
                                        </div>
                                        <p v-if="item.live_status==1">
                                            <span >直播时间 : </span>
                                            {{item.notify_begin_time | filterTime}}
                                        </p>
                                        <p v-if="item.live_status!=1">
                                            <span>直播时间 : </span>
                                            {{item.begin_time | filterTime}}
                                        </p>
                                        <p>
                                            <span class="w_120">浏览人数 :  <span class="col_26">{{item.watch_num}} 人</span></span>
                                            <!-- <span>观看时长 : <span class="col_26">{{item.watch_time}}分钟</span> </span>  -->
                                        </p>
                                        <p>
                                            <span class="w_120">预约人数 :    <span class="col_26">{{item.subscrib_num}}人</span></span>
                                            <span>录像个数 :   <span class="col_26">{{item.video_num}} 个</span></span>
                                        </p>
                                    </el-col>
                                    <el-col class="default-color broadcast-live">
                                        <!-- <el-switch on-text="正常" off-text="禁播" @change="toggleStatus(item, item.live_switch)" v-model="item.live_switch"></el-switch> -->
                                        <!-- <input type="text" v-model="filterType"> -->
                                    </el-col>
                                </div>
                            </el-col>
                            <div v-if="noLive" class="no_live">
                                <div class="no_data">
                                </div>
                                    <div class="tip_no_data">
                                    <span class="default-color">目前还没有直播间哦，快去</span>
                                    <router-link tag="div" to="/main/newLive1" class="d-ib  txt_blue">创建直播间</router-link>
                                    <span class="default-color">吧！</span>
                                </div>
                            </div>
                        </el-row>
                    </el-col>
                </el-row>
                <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="390px"
                height="196px"
                class="my_dialog confirm_dialog"
                size="tiny"
                :show-close="false"
                >
                <span>确认删除 "{{thisLive.name}}" 直播间吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteData">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
                </el-dialog>
                <editLive @isShow="changeIsShow" @getEditData="changeEditData" :class="{'editLive-show':isShow}" :isShow="isShow" :editData="editData"></editLive>
                <!-- <editLive @isShow="change" :class="{'editLive-show':isShow}" :isShow="isShow" :editData="editData" @refresh="_LiveBroadcast"></editLive> -->
            </el-col>
        </el-row>
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
            <p class="red_txt">未实名认证用户在直播过程中观看会受到限制</p>
            <p>身份认证后您将获得更多的直播权限</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="toQualify" >
                立即验证
                <!-- <router-link tag="span"  @click="dialogVisible = false" to="/account/certification" >立即验证</router-link> -->
            </el-button>
            <el-button @click="cancel">稍后再说</el-button>
        </span>
        </el-dialog>
        <m-footer></m-footer>
    </div>
</template>
<script>
    import MHeader from 'components/header/header'
    import {ERR_OK, DATA_URL, GIFT_URL,setLStorage,getLStorage,PLAY_URL,copyLink,DEFAULT_IMG} from 'api/config'
    import {filterStatus,axiosData} from 'api/http'
    import axios from 'axios'
    import md5 from 'js-md5'
    import editLive from 'components/editLive/editLive'
    import LeftNav from 'components/leftnav/leftnav'
    import mFooter from 'components/header/footer'

    export default{
        // props:{
        //     placeholder:{
        //         type:String,
        //         default:'搜索直播标题'
        //     }
        // },
        data(){
            return{
                account:'',
                iconImg:'',
                asdf:1,
                dialogVisible: false,
                form: {
                    region: '',
                    region2: '',
                    // search: '',
                    // delivery: false
                },
                dataList:[],
                // defaultImg:require('../../common/image/default.jpg'),
                defaultImg:DEFAULT_IMG,
                isShow:false,
                editData:{},
                PageDATA:{total:0},
                thisLive:{data:{},name:''},
                visible_qualifyBia:false,
                playTime:'',
                spendmoney:'',
                totalViewers:'',
                money:'',
                currencyAmount:'',
                pagelist:global.liveData.PageDATA,
                PlayUrl:PLAY_URL,
                noLive:false,
                qualifIcon:false,
                // totalPage:10
                // loading: true
            }
        },
        created(){
            this._setAdmin()
            this._StatisticsData()
            this._getMoney()
            this._LiveBroadcast()
            this.ISqualify()
            this.timer = setInterval(()=>{
                this._LiveBroadcast()
                this._getMoney()
                this._StatisticsData()
            },5000)
            this._LiveBroadcast()
            this.qualifyShow()
        },
        computed:{
            live_switch:function(){
                return  live_switch + 'live_switch'
            }
        },
        methods:{
            ISqualify(){
                if(this.$route.query.qualify == 0 ){
                    this.visible_qualifyBia = true
                }
            },
            // 查询实名
           qualifyShow(){
                let userId =  getLStorage("userId")
                axios.get(DATA_URL + 'mwlive/user/user_qualify_cx.do?userId='+ userId
                ).then((rs) => {
                    if(rs.data.code == ERR_OK){
                        if(rs.data.data){
                            if(rs.data.data.qualify == 3){
                                // 认证成功
                                this.qualifIcon = true
                            }else{
                                 this.qualifIcon =  false
                            }
                        }
                    }
                }).catch(function(err){
                    console.log("err",err)
                })
            },
            cancel(){
                this.$router.push({
                    path: '/index'
                })
                this.visible_qualifyBia = false
            },
            toQualify(){
                this.$router.push({
                    path: '/account/certification'
                })
            },
            _getMoney(){
                let formdata = new FormData()
                formdata.append('user_id',getLStorage('user_id'))
                axios({
                    method: 'post',
                    url: DATA_URL + 'manage/finance/surplus.do',
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                // axios.get(DATA_URL + 'manage/finance/surplus.do?user_id=' + getLStorage('user_id'))
                .then((res) => {
                    //console.log(JSON.stringify(res))
                    if(res.data.data){
                        // console.log('surplus',res.data.data)
                        this.money = global.liveData.money = parseFloat(res.data.data.surplus).toFixed(2)
                        this.spendmoney = parseFloat(res.data.data.consume).toFixed(2)
                    }else{
                        this.money = 0
                    }
                    // this.money = global.liveData.money = parseFloat(res.data.data).toFixed(2)
                }).catch(function(err){
                    console.log(err)
                })

               let formdata2 = new FormData()
                formdata2.append('userID',getLStorage('user_id'))
                axios({
                        method: 'post',
                        url: GIFT_URL + 'service/currencyAmount.action',
                        data:formdata2,
                        headers: {'Content-Type': 'multipart/form-data'}
                    })
                    .then((res) => {
                        this.currencyAmount = res.data.paramo[1].currencyAmount
                    }).catch(function(err){
                        console.log(err)
                    })



            },
            recharge(){
                //充值execCommand
            },
            copyLink(data){
                let copyUrl = 'copyUrl' + data.id
                copyLink(copyUrl)
            },
            openLiveUrl(url){
                // console.log(url)
                window.open(url)
            },
            qrcanvas(data){
                this.qrcode = PLAY_URL + data.id+"&v=1.7.0"
                var canvas1 = qrcanvas({
                    data: this.qrcode,
                    size: 80
                })
                let id = 'qrc' + data.id
                document.getElementById(id).innerHTML = ''
                document.getElementById(id).appendChild(canvas1)
            },
            toLiveControl(data,DataStatistics){
                setLStorage("liveID",data.id)
                global.liveData.liveID = data.id
                global.liveData.thisData = data
                if(DataStatistics){
                    global.liveData.DataStatistics = true
                }
                // console.log('index-global.liveData.thisData',global.liveData.thisData)
                this.$router.push({
                    path:'/liveControl'
                })
            },
            _LiveBroadcast(){
                // if(!getLStorage('user_id')){
                // }
                axios.get(DATA_URL + 'mwlive/live/get_listbycreatetime.do?user_id='+ getLStorage('user_id') + '&page_index=1&page_size=4&timeType=1'
                ).then((response) => {
                    if(response.status === ERR_OK){
                        // console.log(response)
                        // this.dataList = filterStatus(response.data.data.data_list)

                        let data = response.data.data.data_list

                        if(response.data.data.data_list == null){
                            this.dataList = []
                            this.noLive = true
                            return false
                        }else{
                            for(let i = 0;i < data.length;i++){
                                // console.log('data',data,data.length)
                                // if(data[i].notify_begin_time != null){
                                if(data[i].notify_begin_time != null){
                                    // console.log('data[i].notify_begin_time',data[i].notify_begin_time)
                                    data[i].notify_begin_time = data[i].notify_begin_time
                                }else if(data[i].begin_time != null || data[i].begin_time != ''){
                                    // console.log('data[i].begin_time',data[i].begin_time)
                                    data[i].notify_begin_time = data[i].begin_time
                                }else{
                                    data[i].notify_begin_time = '暂无直播'
                                }
                                if(data[i].live_status == 1){
                                    data[i].switch_disabled = true
                                    data[i].no_del =  true
                                }
                                if (data[i].live_switch == 0) {
                                    data[i].live_switch = false
                                }else if(data[i].live_switch == 2){
                                    data[i].switch_disabled = true
                                    data[i].no_del =  true
                                    data[i].live_switch = true
                                }else {
                                    data[i].live_switch = true
                                }
                            }
                        }
                        global.liveData.data = this.dataList //= this.dataList.reverse()
                        this.PageDATA = response.data.data.page
                        this.dataList = response.data.data.data_list
                        this.noLive = false
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            changeIsShow(isShow){
                this.isShow = isShow
            },
            changeData(dataList){
                this.dataList = dataList
            },
            changePage(PageDATA){
                this.PageDATA = PageDATA
            },
            changeEditData(){
                this._LiveBroadcast()
            },
            clearSearch(){
                this.form.search = ''
            },
            _StatisticsData(){
                axios.get(GIFT_URL + 'service/iBacService.action',{
                    params:{
                        bizCode:6002,
                        userID:getLStorage('user_id')
                    }
                }).then((response) => {
                    console.log("here:"+JSON.stringify(response.data))
                    if(response.data.resultCode == '01'){
                        // console.log('playTime',response.data.params.playTime / 60)
                        this.playTime = Math.ceil(response.data.params.playTime / 60)//取整四舍五入
                        // if(response.data.params.playTime){
                        //     this.spendmoney = parseFloat((response.data.params.playTime / 60)*0.06).toFixed(2)
                        // }else{
                        //     this.spendmoney = 0
                        // }
                        this.totalViewers = response.data.params.totalViewers
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            toggleStatus(data, type){
                if(type){
                    let formdata = new FormData()
                    formdata.append('user_id',getLStorage('user_id'))
                    formdata.append('live_id',data.id)
                    axios({
                        method: 'post',
                        // url: DATA_URL + 'mwlive/live/end.do',
                        url: DATA_URL + 'mwlive/live/close.do',
                        data:formdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    })
                    .then((res) => {
                        // console.log('end',res)
                        this.tipsMessage('直播已下线','info')
                        this._SetLiveEnd(data)
                    }).catch(function(err){
                        console.log(err)
                    })

                }else{
                    let formdata = new FormData()
                    formdata.append('user_id',getLStorage('user_id'))
                    formdata.append('live_id',data.id)

                    // 开启
                    axios({
                        method: 'post',
                        url: DATA_URL + 'mwlive/live/enable.do',
                        data:formdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    })
                    .then((res) => {
                        // console.log('enable',res)
                        this.tipsMessage('直播上线','info')
                    }).catch(function(err){
                        console.log(err)
                    })
                }
                // switch(type){
                //     case 0:
                //         type = true
                //         console.log(type)
                //         this.tipsMessage('没有直播时间，请添加直播时间!', 'warning')
                //         // type = !type
                //         break
                //     case 1:
                //         this.tipsMessage('直播开始！', 'success')
                //         break
                //     case 2:
                //         this.tipsMessage('直播结束！', 'info')
                //         break
                //     case 3:
                //         this.tipsMessage('直播异常，请检查数据是否正确!', 'warning')
                //         break
                // }
                // 直播状态
                // console.log('直播状态',id,type)
            },
            _SetLiveEnd(data){
                let formdata = new FormData()
                formdata.append('id',getLStorage('user_id'))
                formdata.append('end_show_type',0)
                if(data.live_cover_url){
                    formdata.append('end_show_img',data.live_cover_url)
                }else{
                    formdata.append('end_show_img','')
                }
                formdata.append('end_show_vod','')
                formdata.append('cmd','set_room_end_show')
                formdata.append('liveID',data.id)
                let that = this
                axiosData(formdata,DATA_URL + 'mwlive/user/get_userinfo.do').then(res => {
                    if(res.data.code == ERR_OK){
                        // that.tipsMessage('直播关闭自动设置封面显示！','error')
                    }else{
                        that.tipsMessage('网络异常！','error')
                    }
                })
            },
            edit_live(event,deleteLive){
                if(event.live_status == 1){
                    this.tipsMessage('正在直播中，频道基本信息不可编辑!','error')
                    return false
                }
                if(deleteLive && event.live_status != 1){
                    this.openDelete(event)
                    return false
                }
                setLStorage('editID',event.id)
                this.$router.push({
                    path:'/main/newLive1'
                })
                return false
                this.isShow = !this.isShow
                this.editData = event
            },
            tipsMessage(message, type){
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            openDelete(data){
                this.thisLive.name = data.live_name
                this.thisLive.data = data
                this.dialogVisible = true
            },
            deleteData(){
                this.dialogVisible = false
                axios.get(DATA_URL + 'mwlive/live/delete.do',{
                    params: {
                        user_id:getLStorage('user_id'),
                        id:this.thisLive.data.id
                    }
                })
                .then((response)=>{
                    if(response.data.code == ERR_OK){
                        this.tipsMessage('删除成功!','success')
                        this._LiveBroadcast()
                    }
                }).catch(function(err){
                    console.log(err);
                })
            },
            _setAdmin(){
                this.account = getLStorage('admin');
                if(getLStorage('iconImg')=='null'||getLStorage('iconImg')==""){
                    this.iconImg=""
                }else{
                    this.iconImg = getLStorage('iconImg');
                }

            },
            timer(){}
        },
        filters:{
            // filterType(type){
            //     switch(type){
            //         // case 0:
            //         //     return '新创建'
            //         //     break;
            //         case 1:
            //             return true
            //             break;
            //         default:
            //             return false
            //             break
            //         // case 2:
            //         //     return '直播结束'
            //         //     break;
            //         // case 3:
            //         //     return '直播异常'
            //         //     break;
            //     }
            // },
            filterLiveStatus(val){
                // console.log(val,'val')
                if(val == 1){
                    return true
                }else{
                    return false
                }
            },
            type:function(value){
                // if(value){
                //     return '直播中'
                // }else{
                //     return '未开始'
                // }
                switch(value){
                    case 0:
                        return '预告'
                        break;
                    case 1:
                        return '直播'
                        break;
                    case 2:
                        return '结束'
                        break;
                    case 3:
                        return '直播异常'
                        break;
                    case 4:
                        return '结束'
                    break;
                    case 5:
                        return '结束'
                    break;
                }
            },
            live_btn:function(value){
                switch(value){
                    case 0:
                        return 'blue_btn'
                        break;
                    case 1:
                        return 'red_btn'
                        break;
                    case 2:
                        return 'btn_000'
                        break;
                    case 3:
                        return 'off_btn'
                        break;
                    case 4:
                        return 'btn_000'
                        break;
                    case 5:
                        return 'btn_000'
                        break;
                }
            },
            filterTime(val){
                if(!val){
                    let timestamp = Date.parse(new Date())
                    // return '立即开始'
                    // return setDateTime(timestamp)
                    return '暂无直播'
                }
                let regExp = /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/
                if(regExp.test(val)){
                    return val
                }

                let datetime = new Date(val)
                var month = datetime.getMonth() + 1
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                var strDate = datetime.getDate()
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let getHours = datetime.getHours()
                if (getHours >= 0 && getHours <= 9) {
                    getHours = "0" + getHours;
                }
                let strTime = datetime.getMinutes()
                if (strTime >= 0 && strTime <= 9) {
                    strTime = "0" + strTime;
                }
                let getSeconds = datetime.getMinutes()
                if (getSeconds >= 0 && getSeconds <= 9) {
                    getSeconds = "0" + getSeconds;
                }
                return datetime.getFullYear() + "-" + month + "-" + strDate + " " + getHours + ":" + strTime //+ ":" + getSeconds
            }
        },
        computed:{
            filterType:{
                get: function (){
                    let item
                    for(item in this.dataList){
                        return item.live_switch === 1;
                    }
                },
                set: ()=>{}
            }
        },
        components:{
            MHeader,
            editLive,
            LeftNav,
            mFooter
        },
        destroyed() {
            this.timer = clearInterval(this.timer)
        },
        watch:{
            // dataList(val){
            //     console.log('val',val)
            // }
        }
    }
</script>

<style scoped>
.mainData-list{
    margin-bottom: 30px;
    width: 535px;
    height: 256px;
    position: relative;
    border-radius: 5px;
}
.mainData_title{
    height: 26px;
    line-height: 26px;
    position: relative;
}
.mainData_title .edit_btn{
    cursor: pointer;
}
.mainData_title .edit_btn span{
    position: absolute;
    top:0px;
}
.mainData_title .my_switch {
   position: absolute;
   top:5px;
   right:30px;
}
.show_bottom{
    position: absolute;
    width: 100%;
    height: 50px;
    line-height:50px;
    left: 0;
    bottom: 0;
    background-color: #F2F2F2;
}
.show_bottom .iconfont{
    font-size: 24px;
    color: #00b0ff;
}

.show_bottom .default-colHover:nth-child(1):after{
    content: "";
    width: 1px;
    height: 20px;
    background-color: #D8D8D8;
    position: absolute;
    right: 0;
    top: 15px;
}
.show_bottom .default-colHover:nth-child(1){
    border-radius: 0 0  0 5px;
}
.show_bottom .default-colHover:nth-child(3){
    border-radius: 0 0  5px 0;
}
.show_bottom .default-colHover:nth-child(2):after{
    content: "";
    width: 1px;
    height: 20px;
    background-color: #D8D8D8;
    position: absolute;
    right: 0;
    top: 15px;
}
.show_bottom .mainData-control,.show_bottom .main-infoList,.show_bottom .default-colHover{
    height: 50px;
    line-height: 50px;
}


.show_bottom .default-colHover{
    color: #9B9B9B;
    position: relative;
    transition: all 0.5s;
}
.show_bottom .default-colHover:hover{
    background-color: #2B6CFF;
    color: #ffffff;
}
.show_bottom .default-colHover:hover:after{
    width: 0px;
}
.show_bottom .default-colHover:hover .iconfont{
    color: #ffffff;
}
.show_img{
    width: 208px;
    height: 118px;
    position: absolute;
    left: 20px;
    top: 60px;
    border-radius: 5px;
}
.show_img img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.mainData-list:nth-child(2n){
    padding-right:0;
    margin-left: 30px;
}
.mainData-list i{
    font-size:16px;
    cursor: pointer;
}
.editLive.editLive-show{
    display:block;
    z-index:99;
}
.search{
    position:relative
}
.layout-main{
    line-height: 40px;
}
.layout-left{
    padding: 10px;
    box-sizing: border-box;
}
.search-icon{
    font-size:16px;
    position:absolute;
    right:10px;
    top:10px;
    color:#b1b1b1;
}
.broadcast-bottom{
    border-top:none;
    line-height:30px;
    position: absolute;
    width: 270px;
    top: 60px;
    left: 248px;
    font-size: 12px!important;
}

.data-list{padding-right:125px}
.data-listMain{width:100%;margin:5px 0 0 0;}
.data-listRe{width:125px;margin-right:-130px;}
.icon{font-size:20px;color:#999;}

.admin-info .img_box{
    width: 140px;
    height: 140px;
    border:1px solid #E5E5E5;
    border-radius: 5px;

}

.qualifyBia .img_box{
    width: 120px;
    height:120px;
    border-radius: 60px;
    margin:0 auto 20px auto;
    position: relative;
    background: #F2F2F2;
    border-radius: 60px;

}
.qualifyBia  .dialog-footer .el-button {
    width:100px;
    padding:0;
}
.qualifyBia .img_box img{
    border-radius: 60px;
    width: 120px;
    height: 120px;
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

.admin-info .img_box img{
    width:100%;
    height: 100%;
    border-radius: 5px;
}
.admin-info .iconfont{
    font-size: 35px;
    color: #E5E5E5;
    display: inline-block;
}
.admin-info .icon-phone{
    font-size: 38px;
    position: relative;
    left:-4px;
}
.admin-info .icon_phone{
    width:30px;
    height: 30px;
    /* background: url(../../common/image/icon_phone.png); */
    background: url(../../common/image/icon_phone_active.png);
    position: relative;
    top:2px;
}
.admin-info .icon_phone.hover{
    background: url(../../common/image/icon_phone_active.png);
}
.admin-info .icon_idCard{
    width:35px;
    height: 26px;
    background: url(../../common/image/icon_Idcard.png);
}
.admin-info .icon_idCard.hover{
     background: url(../../common/image/icon_Idcard_active.png);
}
.mainData-list .iconfont{
    display: inline-block;
    width:26px;
    height: 26px;
}
.el-button.icon_delete{
    padding:0;
    border:none;
    height:26px;
    line-height:26px;
}
.icon_delete:hover{
    background: url(../../common/image/icon_delete_active.png) no-repeat;
}
.icon_delete,.icon_delete.is-disabled{
    background: url(../../common/image/icon_delete.png);
    position: absolute;
    right:-15px;
    top:2px;
}

.edit_btn{
    display: inline-block;
    width:62px;
    height:26px;
}
.edit_btn:hover{
    background: url(../../common/image/icon_edit_active.png) no-repeat;
    color:#2B6CFF;
}
.edit_btn{
    background: url(../../common/image/icon_edit.png) no-repeat;
}

.default_shadow{
    box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.02);
}
.default_shadow.fr{
    width:1160px;
    padding-bottom: 10px;
    margin-top: 20px;
    border-radius: 5px;
}
.main .default-color{
    font-size: 14px;
}
 .main .account-info {
    font-size: 15px;
}
.add-live{
    height:168px;
    font-size:18px;
    color:#b1b1b1;
}
.add-live .el-icon-plus{
    padding:20px;
    border:1px solid #b1b1b1;
    border-radius:50%;
    margin:35px 0 20px 0;
}
.mainData-con{
    line-height: 0;
    position:relative;
    overflow: hidden;
    height: 118px;
    border-radius: 5px;
}
.mainData-img{
    width: 100%;
    max-height:218px;
    position:absolute;
    top:50%;
    left: 0;
    transform:translate(0,-50%);
}
.mainData-control{
    background:#F2F2F2;
}

.live-state{
    position: absolute;
    left: 10px;
    top: 10px;
    padding:12px 10px;
    border-radius: 2px;
}
.mainData-controlIcon{
    font-size:30px;
    margin:50px 0;
}
.broadcast-live{
    line-height: 44px;
}
.w_120{
    display: inline-block;
    width: 134px;
    line-height: 10px;
}
.w_120 .col_26{
    width: 50%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
    position: relative;
}

.broadcast-live span{
    margin-left:5px;
}

.my_liveT{
    position: relative;
    padding-right: 30px;
}
.my_liveT .bgc_txt{
    font-size: 14px;
    font-weight: normal;
    height:36px;
    line-height: 36px;
    margin-top:14px;
    width: 92px;
    text-align: center;
    padding:0;
    margin-right: 30px;
    position: absolute;
    right: 0;
    top:0;
    cursor:pointer;
}
.grid_content .recharge_btn{
    display: inline-block;
    padding:0;
    width:50px;
    height:26px;
    line-height: 26px;
    text-align: center;
    background-color: #F5A623;
}
.grid_content  .margin_txt div{
    height: 26px;
    line-height: 26px;
    line-height: 0;
}
.grid_content  .margin_txt {

}
.grid_content .recharge_btn:hover{
    background-color: #B36F00;
}
.grid_content  .color_orange{
     color:#F5A623;
}
.grid_content .bgc_txt{
    display: inline-block;
    width: 50px;
    height: 26px;
    line-height: 26px;
    padding: 0;
    text-align: center;
    box-sizing: border-box;
}
.grid_content .recharge_btn .d-ib,.grid_content .bgc_txt  .d-ib {
    width:100%;
    height:100%;
}

.account-info{
    padding-left:25px;
}
.col-red{
    background: #ec6941;
    color: #ffffff;
    padding: 2px 10px;
    border-radius: 2px;
    margin-left: 10px;
}
.live-title{
    line-height: 55px;
    font-weight: normal;
    font-size: 16px;
}
.live-wrap{
    padding:30px;
    min-height:602px;

}
.live-wrap .mainData-list{
    padding: 18px 18px 18px 20px;
}
.live-wrap .mainData-list{
    -webkit-transition: all 0.8s;
    -moz-transition: all 0.8s;
    -ms-webkit-transition:all 0.8s;
    transition: all 0.8s;
    border:1px solid rgba(242,242,242,1);
    /* box-shadow:0px 1px 3px 1px rgba(0, 0, 0, 0.26); */
}
.live-wrap .mainData-list:hover{
    border:1px solid #D9D9D9;
    box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
    -webkit-box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
}
.el-icon-caret-right{
    border: 1px solid #57bce9;
    padding: 15px 14px 13px;
    border-radius: 30px;
    color: #57bce9
}
.default-colHover i{
    margin-right: 5px;
    vertical-align: middle;
}
.live-manage i{
    font-size: 17px;
    vertical-align: middle;
}
.live-manage span,.default-colHover span{
    vertical-align: middle;
}

/* .main-infoList span:hover{color:#f1f5f9;} */

/* code */
.show_bottom .default-colHover .qrcImg{
    display:none;
    right:-2px;
    /* top:0; */
    color:#333;
    width:535px;
    height: auto;
    z-index: 999;
    padding-top:44px;
}
.qrcImg .el-button {
    height:32px;
    line-height: 3px;
    width:80px;
    padding:0;
    font-size:12px;
}
.qrcImg .el-button.btn_cc{
    background: #E5E5E5;
    color:#333333;
    border:1px solid #D9D9D9;
    margin-left:15px;
}
.show_bottom .default-colHover .qrcImg-content{
    line-height: 22px;
    padding: 20px;
    height:118px;
    background:none;
    border: 1px solid #ddd;
    margin: -25px 0 0;
    /* position:relative; */
    background-color:#FFF;
    color:#9B9B9B;
    box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
    -webkit-box-shadow:0px 5px 10px 0px rgba(48,137,252,0.3);
    border-radius: 5px;
    position: relative;
}
.qrcImg:before,.qrcImg:after{
    content:"";
    display:block;
    border-width:12px;
    position:absolute;
    /* bottom:-40px; */
    top: -2px;
    right: 78px;
    border-bottom: 23px;
    border-style:solid dashed dashed;
    border-color: transparent transparent #E5E5E5;
    font-size:0;
    line-height:0;

}
.qrcImg:after{
    top:-11px;
    border-color: transparent transparent #FFF;
}
.qrcImg::before{
    top:-13px;
}
.show_bottom .default-colHover:hover .qrcImg{
    display: block;
}
.yl{
    height:80px;
}
.tc{text-align: center;}

.grid_content h3{
    color: #333333;
    font-size:20px;
    padding: 11px 0 20px 0;
}
.live-wrap .no_live{
    text-align: center;
}
.live-wrap .no_data{
    width:130px;
    height:109px;
    background: url(../../common/image/no_video.png) no-repeat;
    margin:130px auto 20px auto;

}
.live-wrap .no_live .txt_blue{
    cursor: pointer;
}
.ewm_84{
    width:84px;
    height:84px;
    border:1px solid #D9D9D9;
    border-radius: 5px;
    padding:6px 6px 3px 6px;
}
</style>
<style>
.broadcast-bottom .el-switch{
    height: 29px;
}
.qualifyBia .el-dialog__footer{
    text-align: center;
}
.index .el-switch__core:after{
    top: 5px;
    left: 8px;
}
.index .el-switch.is-checked .el-switch__core::after{
    margin-left:-23px;
}
.qualifyBia .el-dialog__header{
    padding:20px 0;
}
</style>
