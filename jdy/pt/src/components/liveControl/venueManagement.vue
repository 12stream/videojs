<template>
    <div class="venue">
        <div class="live-top bg-fff">分会场管理</div>
        <div class="btn_fr">
            <el-button class="bgc_txt  btn_30" type="primary" @click="addLive()">添加直播</el-button>
        </div>
        <div class="bg-fff info-content" style="margin-top:70px;height:540px;">
            <ul  v-if="venueList.isData">
                <li  class="item_box" v-for="item in venueList.data">
                    <div class="item">
                        <div class="item_img fl">
                            <!-- <img src="../../common/image/icon_play.png"  class="play_icon" alt="" @click="playVideo(item.play_url)"> -->
                            <img src="../../common/image/icon_play.png"  class="play_icon" alt="" >
                            <img :src="item.liveCoverUrl" alt="">
                        </div>
                        <div class="item_info ml10">
                            <p class="length_txt">{{item.liveName}}</p>
                            <p class="col_9B">开播时间 : {{item.beginTime | filterTime}}</p>
                        </div>
                        <el-button class="btn  btn_26 btn_hover_red"  :disabled="del_dis" @click="unBindingLive(item.id)">删除</el-button>
                    </div>
                </li>
            </ul>
            <div v-if="!venueList.isData"  class="no_video"> 
                    <div class="no_data"></div>                                                                                                                       
                    <div class="tip_no_data">
                    <span class="default-color">你还没有绑定分会场!</span>
                </div>               
            </div>

        </div> 
         <!-- 添加直播 -->
        <el-dialog  
            title="添加直播"
            :visible.sync="dialogAddVideo"
            width="638px"
            class="my_dialog"
            :show-close="false"
            >
            <ul v-if="venueListAdd.isData" class="myTable_list">
                <el-checkbox-group v-model="checkList" @change="select_checkbox">
                    <li v-for="item in venueListAdd.data" class="item_box">
                        <el-checkbox :label="item.id">
                            <div class="item">
                                    <div class="item_img fl">
                                        <img src="../../common/image/icon_play.png" class="play_icon" alt="" >
                                        <img class="fl" :src="item.liveCoverUrl || DEFAULT_IMG">
                                    </div>
                                <div class="item_info ml10">
                                    <p class="length_txt">{{item.liveName}}</p>
                                    <p class="col_9B">开播时间 : {{item.beginTime | filterTime}}</p>
                                </div>
                                </div>                               
                        </el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
            <div v-if="!venueListAdd.isData"  class="no_video_add"> 
                    <div class="no_data"></div>                                                                                                                       
                    <div class="tip_no_data">
                    <span class="default-color">没有可绑定的直播!</span>
                </div>               
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitCheckList()" :disabled="disabledAdd">确 定</el-button>
                <el-button @click="close()">取 消</el-button>
            </span>
        </el-dialog>
    </div>  
</template>

<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,PAGE_SIZE,DEFAULT_IMG} from 'api/config'
    import axios from 'axios'
    import {setDate} from 'api/http'
    export default{
        data() {
            return {
                liveId:'',
                dialogAddVideo:false,
                tableData: [],            
                tableDataAdd: [],            
                venueList:{
                    isData:false,
                    data:'',  
                },
                venueListAdd:{
                    isData:false,
                    data:'',  
                },
                checkList: [],
                disabledAdd:true,
                venueNum : 0,
                DEFAULT_IMG:DEFAULT_IMG,
                del_dis:false
            }
        },
        created(){
          this.liveId = getLStorage("liveID")
          this.getLiveList()
          this.getVunue()
        },
        methods:{
            select_checkbox(){            
                if(this.checkList!=""){
                    this.disabledAdd = false
                }else{
                    this.disabledAdd = true
                }
               
            },
            // 播放器播放
            playVideo (url) {
                let player
                this.dialogPlay = true
                this.$alert('<video style=" min-width:720px;min-height:406px;"  id="preVideo"  class="video-js vjs-default-skin" controls ebkit-playsinline="true" autobuffer preload="auto" poster="" x-webkit-airplay="true" webkit-playsinline="true" playsinline></video>', '录像预览', {
                    dangerouslyUseHTMLString: true,
                    showConfirmButton:false,
                    customClass:'videoMessageBox',
                    callback:() => {                      
                        player.pause()                        
                    }
                })
                setTimeout(function(){
                     //初始化视频
                    player = videojs('preVideo', {
                        "controls": true,
                        "autoplay": true,
                        controlBar: {
                            captionsButton: false,
                            chaptersButton: false,
                            liveDisplay: false,
                            playbackRateMenuButton: false,
                            subtitlesButton: false
                        }

                    }, function () {

                    });
                    
                    videojs("preVideo").ready(function () {
                        
                        var myPlayer = this;
                        myPlayer.reset();
                        player.src({                            
                            src: url,
                            type: "rtmp/flv"
                            
                        })
                    })
                    
                },500)                              
            },
            close(){
                this.checkList =[] 
                this.dialogAddVideo = false
            },
            addLive(){
                this.dialogAddVideo = true
                this.disabledAdd = true
                this.getLiveList()
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.page_index = currentPage;
                this.getVideoList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection.length>0){
                    this.del_disabled = false
                }else{
                    this.del_disabled = true
                }
                console.log( this.multipleSelection)
            },
            addList(){
                //添加
                let _this = this
                let formData = new FormData()
                let url = GIFT_URL + 'service/bindingLive.action'
                formData.append('userID',_this.liveId)
                formData.append('liveID',this.ruleFormAdd.name)
                formData.append('phone',this.ruleFormAdd.phone)
                this.disabledAdd = true
                axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == ERR_OK ){
                        _this.successMessage('新增用户成功')
                    }else{
                        _this.successMessage('新增用户失败','error')
                    }
                    _this.dialogAddVideo = false
                    _this.getLiveList()
                })
                .catch((err) => {
                    this.disabledAdd = false
                })         
            },
            // 查询已经绑定的分会场列表
            getVunue(){
                let _this = this
                let formData = new FormData()
                let url = GIFT_URL + 'service/queryBindingLive.action'
                formData.append('liveID',getLStorage("liveID"))
                formData.append('user_id',getLStorage('user_id'))
                axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.resultCode =='01'){
                        if(res.data.paramo && res.data.paramo.length>0){
                            _this.venueList.isData = true
                            _this.venueList.data = res.data.paramo 
                            _this.venueNum =  res.data.paramo.length
                        }
                    }else{
                        _this.venueList.isData = false
                        _this.venueList.data = '' 
                        _this.venueNum =  0
                    }
                })
                .catch((err) => {
                    
                })     
            },
            // 获取可绑定直播列表
            getLiveList(){
                let _this = this
                let formData = new FormData()
                let url = DATA_URL + 'mwlive/live/select_allVideoInfo.do'
                formData.append('live_id',getLStorage("liveID"))
                formData.append('user_id',getLStorage('user_id'))
                this.venueListAdd.isData = false
                this.venueListAdd.data = ''
                axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == ERR_OK ){
                        if(res.data.data.length>0){
                            this.venueListAdd.isData = true
                            this.venueListAdd.data = res.data.data
                            this.tableDataAdd = res.data.data
                        }
                        let myDate = res.data.data.data
                        this.getVunue()
                        console.log(this.checkList)
                    }           
                })
                .catch((err) => {
                    
                })     
            },
            // 绑定分会场
            submitCheckList(){
                let _this = this
                if(_this.venueNum + _this.checkList.length >10){
                    _this.successMessage('捆绑数量超过上限','error')
                    return
                }
                let formData = new FormData()
                let url = GIFT_URL + 'service/bindingLive.action'
                formData.append('userID',getLStorage('user_id'))
                formData.append('liveID',getLStorage("liveID"))
                formData.append('liveBindingID',_this.checkList)
                this.disabledAdd = true
                axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.resultCode == '01' ){
                        _this.successMessage('绑定成功')
                    }else{
                        _this.successMessage('绑定失败','error')
                        _this.dialogAddVideo = false
                    }
                    // _this.disabledAdd = false
                    _this.dialogAddVideo = false
                    _this.checkList =[]
                    // 获取可绑定直播列表
                    _this.getLiveList()
                    // 查询已经绑定的分会场列表
                    _this.getVunue()

                })
                .catch((err) => {
                    // this.disabledAdd = false
                })         
            },
            // 分会场解绑
            unBindingLive(id){
                let _this = this
                let formData = new FormData()
                let url = GIFT_URL + 'service/unBindingLive.action'
                formData.append('id',id)
                this.del_dis = true
                axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.resultCode == '01' ){
                        _this.successMessage('删除成功')
                    }else{
                        _this.successMessage('删除失败','error')
                    }
                    _this.del_dis  = false
                    _this.dialogAddVideo = false
                    _this.getVunue()
                })
                .catch((err) => {
                })        
                
            },
            successMessage(message,type) {
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },


        
        },
        filters:{
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
            },
            msgStateInfo(val){
                if(val == 1){
                    return '发送成功'
                }else if(val == 2){
                    return '发送失败'
                }else{
                    return '发送中...'
                }
            }
        },
    }
</script>
<style scope>
/* 播放器样式 start*/
.el-message-box  .vjs-paused  .vjs-big-play-button{
    display: block;
}
.vjs-big-play-button .vjs-icon-placeholder:before {
    content: "";
    display:none;
}
.video-js .vjs-big-play-button:focus, .video-js:hover .vjs-big-play-button{
    background-color:rgba(115,133,159,0)
}
.venue  .item_box .item .item_img{
    position: relative;
}
.venue .item_img .play_icon{
    width:50px;
    height: 50px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-25px;
    margin-top:-25px;
    z-index: 999;

}


/* 播放器样式 end*/
.venue .no_video{
    text-align: center;
    margin:0 auto;
    vertical-align: middle;
    margin-top:170px;
}
.venue  .no_data{
    width:130px;
    height:109px;
    background: url(../../common/image/no_video.png) no-repeat;  
    margin:0 auto;
    margin-bottom: 20px;
}
.venue .no_video_add{
    text-align: center;
    margin:20px  auto 20px auto;
    vertical-align: middle;
}

.videoMessageBox.el-message-box .vjs-big-play-button {
    top: 50%;
    left: 50%;
    margin-top: -35px;
    margin-left: -35px;
    background: url(../../common/image/play.png) no-repeat;
    background-size: contain;
    border:0;
}
.venue .btn_fr{
    position: absolute;
    right:30px;
}
.venue .item_box{
    box-sizing: border-box;
    width:100%;
    height:120px;
    border:1px solid #E5E5E5;
    margin-bottom:20px;
    padding:10px;
    position: relative;
    box-sizing: border-box;
}

.item_box .el-checkbox-group{
    display: inline-block;
    float: left;
}
.venue .item_box .item .item_img{
    width:178px;
    height:100px;
    border-radius: 2px;
    margin-top:-2px;
    position: relative;
}
.venue .item_box .item .item_img img{
    width:100%;
    height:100%;
    border-radius: 2px;
}
.venue .item_info {
    position: absolute;
    top:50%;
    left:187px;
    transform:translate(0,-50%);
    -ms-transform:translate(0,-50%); 	/* IE 9 */
    -moz-transform:translate(0,-50%); 	/* Firefox */
    -webkit-transform:translate(0,-50%); /* Safari 和 Chrome */
    -o-transform:translate(0,-50%);
}
.venue .item_box  .btn{
    position: absolute;
    top:50%;
    right:21px;
    transform:translate(0,-50%);
    -ms-transform:translate(0,-50%); 	/* IE 9 */
    -moz-transform:translate(0,-50%); 	/* Firefox */
    -webkit-transform:translate(0,-50%); /* Safari 和 Chrome */
    -o-transform:translate(0,-50%);
}
.venue .col_9B{
    font-size: 12px;
    padding-top:19px;
}
.default-bg  .btn_26.el-button--default{
    height:26px;
    line-height: 26px;
    padding:0;
    font-size: 12px;
    color:#9B9B9B;
    border:1px solid #CCCCCC;
    background-color: #F2F2F2;
    width:60px;
}
    

.venue  .el-checkbox__inner{
    width:16px;
    height:16px;
    margin:0 10px;
    position: relative;
    top:-45px;
}
.venue  .el-checkbox{
    width:100%;
}
.el-dialog__body{
    padding:20px 0;
   
}

.venue  .el-checkbox__inner::after {
    height: 9px;
    width: 4px;
    left: 5px;
}
.venue .my_dialog .item_info{
    left:225px;
}
.venue .item_info .length_txt{
    width:367px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.venue .my_dialog .item_info .length_txt{
    width:297px;
}
.venue .item_box .item .item_img .play_icon{
    width:50px;
    height: 50px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-25px;
    margin-top:-25px;
    z-index: 999;

}
</style>


