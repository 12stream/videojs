<template>
    <div class="main live_center">
        <m-header @dataList="changeData" @PageDATA="changePage"></m-header>
        <el-row class="w1000">
            <el-col class="mt20">
                <el-row>
                    <el-col  class="bg-fff default_shadow my_section">
                        <div class="main_search clear">
                            <!-- <el-select v-model="timeOptVal" placeholder="请选择" class="sel_110"   @change="timeSelChange">
                                <el-option label="创建时间" value="2"></el-option>
                                <el-option label="最近直播时间" value="1"></el-option>
                            </el-select> -->
                            <el-select v-model="stateOptVal" placeholder="请选择" class="sel_86" @change="stateSelChange">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="直播" value="1"></el-option>
                                <el-option label="预告" value="0"></el-option>
                                <el-option label="过期" value="4"></el-option>
                                <el-option label="回放" value="2"></el-option>
                            </el-select>
                            <div class="fr">
                                <el-input :placeholder="placeholder" v-model="form.search">
                                    <el-button slot="append" icon="search" @click="_LiveBroadcast(true)">搜索</el-button>
                                </el-input>
                            </div>
                        </div>
                        <el-row class="live-wrap">
                            <el-col v-for="item in dataList" :key="item.id" :span="8" class="mainData-list clear mb30" v-if="item.isSyn==1">
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
                                    <i class="icon isSynStyle mr16" v-if="item.isSyn==1" @click="cancelPublish(item.id)">取消发布</i>
                                </div>
                                <div class="show_img">
                                    <div class="default-bor mainData-con">
                                        <img class="mainData-img" :src="item.live_cover_url ? item.live_cover_url : defaultImg" @click="manageLive(item)">
                                        <div class="live-state col-fff" v-bind:class="item.live_status | live_btn">
                                            {{item.live_status | type}}
                                        </div>
                                    </div>
                                </div>
                                <div class="show_bottom">
                                    <div class="mainData-control col-fff te-c">
                                        <el-row class="te-c main-infoList">
                                            <el-col class="default-colHover live-manage cur-p" :span="8">
                                                <div @click="toLiveControl(item)">
                                                    <span>详情</span>
                                                </div>
                                            </el-col>
                                            <el-col class="default-colHover cur-p" :span="8">
                                                <div @click="toLiveControl(item,'DataStatistics')">
                                                    <span>统计</span>
                                                </div>
                                            </el-col>
                                            <el-col class="default-colHover cur-p p-r" :span="8">
                                                <div @mouseenter="qrcanvas(item)">
                                                    <span>预览</span>
                                                    <div class="p-a qrcImg">
                                                        <div class="qrcImg-content clear">
                                                            <div class="fl mr20">
                                                                <div  class="ewm_84"  :id=" 'qrc' + item.id"></div>
                                                                <div style="font-size:12px;">手机扫描观看</div>
                                                            </div>
                                                            <div class="fl te-l">
                                                                <div style="margin-bottom:6px;">观看地址：</div>
                                                                <div hidden>{{ item.playUrl = item.playUrl || PlayUrl + item.id }}</div>
                                                                <div><input readonly type="text"  style="width: 375px;margin-bottom:14px;" v-model="item.playUrl" :id=" 'copyUrl' + item.id" class="el-input__inner"></div>
                                                                <div class="mt5"><el-button type="primary" @click="openLiveUrl(item.playUrl)">打开视频</el-button> <el-button class="btn_cc" @click="copyLink(item)">复制地址</el-button></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <div class="broadcast-bottom">
                                    <el-col class="broadcast_words">
                                        <div class="txt-hide col_2316fw">
                                            {{item.live_name}}
                                        </div>
                                            <p v-if="item.live_status==1">
                                                <span >直播时间 : </span>
                                                {{item.notify_begin_time | filterTime}}
                                            </p>
                                            <p v-if="item.live_status!=1">
                                                <span>开始时间 : </span>
                                                {{item.begin_time | filterTime}}
                                            </p>
                                            <p>
                                              <span>直播结束时间 : </span>
                                              {{item.notify_end_time | filterTime}}
                                            </p>
                                            <p>
                                                <span class="w_120">浏览人次 :  <span class="col_26">{{item.watch_num}} 次</span></span>
                                                <span>预约人数 :    <span class="col_26">{{item.subscrib_num}}人</span></span>
                                            </p>
                                            <p>
                                                <span>录像个数 :   <span class="col_26">{{item.video_num}} 个</span></span>
                                            </p>
                                    </el-col>
                                </div>
                            </el-col>
                            <div v-if="noLive" class="no_live">
                                <div class="no_data">
                                </div>
                                    <div class="tip_no_data">
                                    <span class="default-color" v-if="form.search!=''">没有发现符合条件的直播间哦</span>
                                    <span class="default-color" v-if="form.search==''">目前还没有直播间哦</span>

                                    <!-- <span class="default-color" v-if="form.search!=''">没有发现符合条件的直播间哦，快去</span>
                                    <span class="default-color" v-if="form.search==''">目前还没有直播间哦，快去</span>
                                    <router-link tag="div" to="/main/newLive1" class="d-ib  txt_blue">创建直播间</router-link>
                                    <span class="default-color">吧！</span> -->
                                </div>
                            </div>
                        </el-row>
                        <div class="te-c mb20" >
                            <el-pagination v-show="!noLive"
                            small
                            background
                            layout="prev, pager, next"
                            @current-change="modifyPage"
                            :page-size="Page_Count"
                            :total="PageTotal">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
                <el-dialog
                title="提示"
                width="390px"
                height="196px"
                :visible.sync="dialogVisible"
                size="tiny"
                class="my_dialog confirm_dialog"
                :show-close="false"
                >
                <span>确认删除 "{{thisLive.name}}" 直播间吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteData">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
                </el-dialog>
                <el-dialog
                title="提示"
                width="390px"
                height="196px"
                :visible.sync="cancelPublishDia"
                size="tiny"
                class="my_dialog confirm_dialog"
                :show-close="false"
                >
                <p>您确定取消发布吗？取消发布后将不在</p>
                <p>梦网云播APP展示此内容。</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="setSn">确 定</el-button>
                    <el-button @click="cancelPublishDia = false">取 消</el-button>
                </span>
                </el-dialog>
                <el-dialog
                    :visible.sync="linkmp"
                    width="400px"
                    center
                    class="dialog11 dialog12"
                    >
                    <div style="margin-bottom:26px;">
                        <p>保存成功，门票生成成功</p>
                        <p>请前往
                            <span @click="linkSpan" style="color: blue;text-decoration: underline;display: inline-block;cursor:pointer;">频道管理-门票管理</span>查看</p>
                    </div>
                    <span >
                        <el-button type="primary" @click="linClik" >确 定</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
        <m-footer></m-footer>
    </div>
</template>

<script>
    import MHeader from 'components/header/header'
    import {ERR_OK, DATA_URL, GIFT_URL, PLAY_URL, PAGE_SIZE,setLStorage,getLStorage,copyLink,DEFAULT_IMG,MW_Live_API_URL} from 'api/config'
    import {filterStatus,setDateTime,axiosData} from 'api/http'
    import axios from 'axios'
    import md5 from 'js-md5'
    import mFooter from 'components/header/footer'
    import rootBus from '../rootBus.js'
    export default{
        props:{
            placeholder:{
                type:String,
                default:'搜索直播标题'
            }
        },
        data(){
            return{
                Page_Count:PAGE_SIZE || 0,
                form: {
                    region: '',
                    region2: '',
                    search: '',
                    // delivery: false
                },
                dataList:[],
                // defaultImg:require('../../common/image/default.jpg'),
                defaultImg:DEFAULT_IMG,
                isShow:false,
                editData:{},
                PageTotal:0,
                PageDATA:{total:0},
                thisLive:{data:{},name:''},
                dialogVisible:false,
                playTime:'',
                totalViewers:'',
                money:'',
                pagelist:global.liveData.PageDATA,
                interval:5000,
                isUpload:false,
                PlayUrl:PLAY_URL,
                timeOptVal:'1',
                stateOptVal:'',
                noLive:false,
                page_NO:'1',
                //取消发布id
                cancelId:'',
                cancelPublishDia:false
                // totalPage:10
                // loading: true
            }
        },
        created(){
            this.dataList = []
            this.PlayUrl = PLAY_URL;
            this._StatisticsData()
            this._getMoney()
            this._LiveBroadcast()
            this.timer = setInterval(()=>{
                if(!this.isUpload){
                    this._LiveBroadcast(false)
                }
            },5000)

        },
        methods:{
            linClik(){
                this.linkmp =false;
                rootBus.$emit('upLinkMp',false)
                console.log('afdafafa')
            },
            linkSpan(){
                rootBus.$emit('updateTab','management2');
                setLStorage("liveID", this.sinId);
                global.liveData.liveID = this.sinId;
                // global.liveData.thisData = this.sigleData;
                this.linkmp = false
                this.$router.push({
                    path:'/liveControl/ticketsList',
                    query: { type: '1' }
                })
                rootBus.$emit('upLinkMp',false)
                
            },
            // dialShow1(data){
            //     console.log('24424224')
            //     this.sinId = data;
            //     this.linkmp = true;
            // },
            timer(){},
            modifyPage(val){
                this.page_NO = val

                if(val > 1 && !this.isUpload){
                    this.isUpload = true
                }else{
                    this.isUpload = false
                }
                axios.get(DATA_URL + 'mwlive/live/get_listbycreatetime.do?user_id='+ getLStorage('user_id') + '&page_index=' + val + '&page_size=' + PAGE_SIZE+ '&liveStatus='+this.stateOptVal+'&timeType=1&isSyn=1'
                ).then((response) => {
                    if(response.data.code == ERR_OK){
                        this.dataList = filterStatus(response.data.data.data_list)
                        global.liveData.pageIndex = val
                    }
                }).catch(function(err){
                    console.log(err)
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
                    this.money = global.liveData.money = res.data.data
                }).catch(function(err){
                    console.log(err)
                })
            },
            recharge(){
                //充值
            },
            copyLink(data){
                let copyUrl = 'copyUrl' + data.id
                console.log('copyUrl',data.id);
                copyLink(copyUrl)
                this.tipsMessage('复制成功！')
            },
            openLiveUrl(url){
                // console.log(url)
                window.open(url)
            },
            qrcanvas(data){
                // console.log('data.id',data)
                // this.qrcode = PLAY_URL + getLStorage('liveID')
                this.qrcode = PLAY_URL + data.id+'&v=1.7.0'
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
                    rootBus.$emit('updateTab','management3');
                    global.liveData.DataStatistics = true
                }else{
                    rootBus.$emit('updateTab','liveControl');
                }
                // console.log('main-global.liveData.thisData',global.liveData.thisData)
                setLStorage("type",1);
                this.$router.push({
                    path:'/liveControl',query: {type: "1"}//1表示云播 2代表视频中心 3代表点播
                })
            },
            manageLive(data) {
      setLStorage("liveID", data.id);
      global.liveData.liveID = data.id;
      global.liveData.thisData = data;
      this.$router.push({
        path:'/liveControl',query: {type: "1"}//1表示云播 2代表视频中心 3代表点播
      });
    },
            _LiveBroadcast(type,page_NO){
                let url
                let val = page_NO || 1

                if(type){
                  //  url = DATA_URL + 'mwlive/live/get_listbylivename.do?user_id='+ getLStorage('user_id') + '&live_name=' + this.form.search + '&page=1&page_size=' + PAGE_SIZE
                //搜索更改接口
                url = DATA_URL + 'mwlive/live/get_listbycreatetime.do?user_id='+ getLStorage('user_id') + '&liveName='+this.form.search+ '&page_index=' + val + '&page_size=' + PAGE_SIZE + '&liveStatus=' + this.stateOptVal+'&timeType=' + this.timeOptVal+"&isSyn=1"
                    this.isUpload = true
                    if(this.form.search === ''){
                        this.isUpload = false
                    }
                }else{
                    url = DATA_URL + 'mwlive/live/get_listbycreatetime.do?user_id='+ getLStorage('user_id')+ '&page_index=' + val + '&page_size=' + PAGE_SIZE + '&liveStatus=' + this.stateOptVal+'&timeType=' + this.timeOptVal+"&isSyn=1"
                }

                axios.get(url).then((response) => {
                    console.log(response);
                    if(response.status == ERR_OK){
                        //console.log('_LiveBroadcast',JSON.stringify(response.data.data))

                        let data = response.data.data.data_list
                        global.liveData.data = response.data.data.data_list
                        // console.log('data',response.data.data.data_list)
                        if(data == null){
                            this.dataList = []
                            this.noLive = true
                            return false
                        }else{
                            for(let i = 0;i < data.length;i++){
                                if(data[i].notify_begin_time != null){
                                    data[i].notify_begin_time = data[i].notify_begin_time
                                }else if(data[i].begin_time != null || data[i].begin_time != ''){
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
                            this.dataList = response.data.data.data_list
                            global.liveData.data = this.dataList
                            this.PageTotal = this.PageDATA.total = response.data.data.page.total
                            this.noLive = false
                        }
                        // this.dataList = filterStatus(response.data.data.data_list)
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
                // console.log('changeEditData')
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
                    if(response.data.resultCode == '01'){
                        this.playTime = response.data.params.playTime / 60
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
                        // this.tipsMessage('直播关闭','info')
                        this.tipsMessage('直播已下线','info')
                        this._SetLiveEnd(data)
                    }).catch((err)=>{
                        this.tipsMessage('操作失败','error')
                    })

                }else{
                    let formdata = new FormData()
                    formdata.append('user_id',getLStorage('user_id'))
                    formdata.append('live_id',data.id)
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

                    // 设置显示封面

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
                    this.tipsMessage('正在直播中，频道基本信息不可编辑！','error')
                    // this.$message({
                    //     showClose: true,
                    //     message: '正在直播中，频道基本信息不可编辑！',
                    //     type: 'error'
                    // })
                    return false
                }
                if(deleteLive && event.live_status != 1){
                    this.openDelete(event)
                    return false
                }
                setLStorage('editID',event.id)
                this.$router.push({
                    path:'/main/newLive1',query: {from: "1"}//1表示云播 2代表视频中心 3代表点播
                })
                return false
                this.isShow = !this.isShow
                this.editData = event
                // console.log('edit_live',event.live_status)
            },
            cancelPublish(id){
                this.cancelId=id;
                this.cancelPublishDia=true;
            },
            setSn(){
                    let formdata = new FormData()
                    formdata.append('user_id',getLStorage('user_id'))
                    formdata.append('live_id',this.cancelId)
                    formdata.append('isSyn',"2")
                    console.log(JSON.stringify(formdata));
                axios({
                    method: 'post',
                    url: MW_Live_API_URL + '/20/api/mwlive/live/publishLive.do',
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res) => {
                    console.log(res);
                     if(res.data.code == "200"){
                        this.tipsMessage('设置成功','success')
                        this._LiveBroadcast(true,this.page_NO)
                        this.cancelPublishDia=false;
                    }
                    else{
                        this.tipsMessage(res.data.msg,'error')
                        this.cancelPublishDia=false;
                    }
                }).catch(function(err){
                    console.log(err)
                })
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
                        this.tipsMessage('删除成功','success')
                        this._LiveBroadcast(false,this.page_NO)
                    }
                }).catch(function(err){
                    console.log(err);
                })
            },
            timeSelChange(value){
                this._LiveBroadcast(false)
            },
            stateSelChange(value){
                this._LiveBroadcast(false)
            }
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
                        return '回放'
                        break;
                    case 3:
                        return '直播异常'
                        break;
                    case 4:
                        return '过期'
                    break;
                    case 5:
                        return '回放'
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
            },
            linkmp:{
                get(){
                    return rootBus.linkMp;
                },
                set(){
                    return rootBus.linkMp;
                }
            },
            sinId:{
                get(){
                    return rootBus.ybSinid;
                },
                set(){
                    return rootBus.ybSinid;
                }
            }
        },
        destroyed(){
            this.timer = clearInterval(this.timer)
        },
        components:{
            MHeader,
            mFooter
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
   right:70px;
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
    font-size: 14px;
    cursor: pointer;
    color: #333333;
    margin-top: -2px;
    text-decoration: underline;
    font-style: normal;
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
    background: url(../../common/image/icon_phone_active.png);

}
.admin-info .icon_phone:hover{
    background: url(../../common/image/icon_phone_active.png);
}
.admin-info .icon_idCard{
    width:35px;
    height: 26px;
    background: url(../../common/image/icon_Idcard.png);
}
.admin-info .icon_idCard:hover{
     background: url(../../common/image/icon_Idcard_active.png);
}
.mainData-list .iconfont{
    display: inline-block;
    width:26px;
    height: 26px;
}
.icon_delete:hover{
    /* background: url(../../common/image/icon_delete_active.png) no-repeat; */
}
.icon_delete,.icon_delete.is-disabled{
    /* background: url(../../common/image/icon_delete.png); */
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
    box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.02)
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
.account-info{
    padding-left:25px
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
    padding:20px 30px 30px;
    min-height: 602px;

}
.live-wrap .mainData-list{
     padding: 18px 18px 18px 20px;
}
.live-wrap .mainData-list{
    /* -webkit-transition: all 0.8s;
    -moz-transition: all 0.8s;
    -ms-webkit-transition:all 0.8s;
    transition: all 0.8s;
    box-shadow:0px 1px 3px 1px rgba(0, 0, 0, 0.26); */
    -webkit-transition: all 0.8s;
    -moz-transition: all 0.8s;
    -ms-webkit-transition:all 0.8s;
    transition: all 0.8s;
    border:1px solid rgba(242,242,242,1);

}
.live-wrap .mainData-list:hover{
    /* border:1px solid #D9D9D9;
    box-shadow:  0px 0px 30px 0px rgba(0,86,174,0.1) ;
    -webkit-box-shadow: 0px 0px 30px 0px rgba(0,86,174,0.3); */
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
.isSynStyle{
    position: absolute;
    right: -15px;
    top: 2px;
}
/* .main-infoList span:hover{color:#f1f5f9;} */

/* code */
.show_bottom .default-colHover .qrcImg{
    display:none;
    right:-2px;
    /* top:88px; */
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
    box-shadow: 0px 0px 30px 0px rgba(0, 0,0, 0.17);
    -webkit-box-shadow: 0px 0px 30px 0px rgba( 0, 0,0, 0.17);
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
.ewm_84{
    width:84px;
    height:84px;
    border:1px solid #D9D9D9;
    border-radius: 5px;
    padding:6px 6px 3px 6px;
}
.qrcImg:after{
    top:-11px;
    border-color: transparent transparent #FFF;
}
.show_bottom .default-colHover:hover .qrcImg{
    display: block;
}
.tc{text-align: center;}

.grid_content h3{
    color: #333333;
    font-size:20px;
    padding: 10px 0 12px 0;
}
.main_search{
    padding: 20px 30px 0 30px;
}
.main_search .fr{
    border-radius: 2px;
    width: 250px;
    height: 30px;
    /* border:1px solid #D9D9D9; */
}

.main_search .el-select{
    margin-right:18px;
}
.main_search .el-input-group{
    width:250px;
    height:30px;

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

</style>
<style>
.broadcast-bottom .el-switch{
    height: 29px;
}
.qualifyBia .el-dialog__footer{
    text-align: center;
}
.main_search   .fr .el-input-group .el-input__inner{
    height:30px;
    border-radius:2px;
    font-size:12px;
    border-right:none;
}
.main_search    .el-input-group__append{
    padding:0 ;
    width:60px;
    height:30px;
    text-align:center;
    font-size:12px;
}
.live_center .el-switch__core:after{
    top: 5px;
    left: 8px;
}
.live_center .el-switch.is-checked .el-switch__core::after{
    margin-left:-23px;
}
.dialog12 .el-dialog--center .el-dialog__header .el-icon-close{
    display: none;
}
</style>
