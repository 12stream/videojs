<template>
    <div class="livegift">
        <div class="pd10 live-top">打赏设置</div>
        <div class="livegift-content pd20">
            <p class="offFn">功能开关:</p>
            <el-switch class="my_switch swi_50 new_51"  @change="liveChange" inactive-text="关" active-text="开" v-model="value" active-color="#2B6CFF" inactive-color="#CCCCCC"></el-switch>
            <div class=" livegift-title">礼物设置</div>
            <div class="pd20">
                <div class="livegidt-list">
                    <ul class="clear">
                        <li v-for="item in defaultGift" class="te-c p-r">
                            <img :src="item.giftImg">
                            <div class="default-color">{{item.giftName}}</div>
                            <div class="col-999">￥{{item.giveCurrencyValue/10}}</div>
                            <div class="p-a livegift-hover clear">
                                <div class="te-r" style="padding-top:5px;"><span class="icon iconfont icon-cancel cur-p" style="margin:0 5px 0 0;" @click="openDeleGift(item)"></span></div>
                                <div class="restGift">
                                    <span class="cur-p" @click="_getGiftData(item.id)">
                                        <span class="icon iconfont icon-tihuan" style=""></span> <span style="font-size:18px;">重新选择</span>
                                    </span>
                                </div>
                            </div>
                        </li>
                        <!--v-show="defaultGift.length < 4"-->
                        <li class="add-livegift te-c cur-p gift_li" @click="_getGiftData()">
                            <div class="gift_d">+</div></li>
                    </ul>
                </div>
            </div>
        </div>
        <el-dialog class="gift-modify"
        title="礼物选择:"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose"
        :show-close="false"
        >
        <div class="livegidt-list">
            <div v-show="allGift.length < 1" class="te-c">
                没有礼物可以选择了，去
                <router-link class="default-color" to="/operateManage/livegift">
                    "运营管理"
                </router-link>
                添加吧
            </div>
            <ul class="clear">
                <li v-for="item in allGift" class="te-c cur-p" @click="addLiveGift(item,item.id)">
                    <img :src="item.giftImg">
                    <div class="default-color">{{item.giftName}}</div>
                    <div class="col-999">￥{{item.giveCurrencyValue/10}}</div>
                </li>
            </ul>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        </span>
        </el-dialog>
        <!-- 删除提示 -->
        <el-dialog
        title="提示"
        :visible.sync="GiftDialogVisible"
        size="tiny"
        :show-close="false"
        >
        <span>礼物删除后，直播将不再显示，确认删除吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteLiveGift()">确 定</el-button>
            <el-button @click="GiftDialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK,DATA_URL,GIFT_URL,LIVE_URL,getLStorage,getCookies} from 'api/config'
    export default{
        data(){
            return{
                dialogVisible:false,
                GiftDialogVisible:false,
                dataLiveList:[],
                dataGiftList:[],
                defaultGift:[],
                deleteID:undefined,
                deleteDATA:'',
                allGift:[],
                arrayGift:[],
                live_status:'',
                value:false,
                userID: getLStorage("userId"),
                tkInfo:getCookies("token"),
                flag:0,
                liveID:getLStorage("liveID")
            }
        },
        created(){
            this._getLiveData()
            this._getInfo()
        },
        methods:{
            liveChange(){
                var params;
                console.log(this.value)
                if(this.value){
                    params={
                        liveId:this.liveID,
                        userId:this.userID,
                        giftSwitch:"1"
                    }
                }
                else{
                    params={
                        liveId:this.liveID,
                        userId:this.userID,
                        giftSwitch:"0"
                    }
                }
                let that  = this;
                $.ajax({
                    type: "POST",
                    timeout: 120000, //超时时间设置，单位毫秒
                    async: false,
                    url: DATA_URL + "mwlive/live/setGiftSwitch.do",
                    data: params,
                    dataType: "json",
                    success: function(data) {
                        console.log(data)
                        if (data.code == 200) {
                            that.$message({
                            showClose: true,
                            type: "success",
                            message:"设置成功"
                        });
                        }else{
                            that.$message({
                            showClose: true,
                            type: "error",
                            message:"data.msg"
                        });
                        }
                    }
                })
            },
            isLive(){
                if(this.live_status == 1){
                  this.$message({
                    showClose:true,
                    type: 'error',
                    message: '正在直播中，频道基本信息不可编辑!'
                  });
                  return false
                }
            },
            openDeleGift(data){
                if(this.live_status == 1){
                  this.$message({
                    showClose:true,
                    type: 'error',
                    message: '正在直播中，频道基本信息不可编辑!'
                  });
                  return false
                }
                this.deleteDATA = data
                this.GiftDialogVisible = true
            },
            deleteLiveGift(data){
                data = this.deleteDATA
                let live_id =  getLStorage("liveID")
                let user_id =  getLStorage("user_id")
                let formdata = new FormData()
                if(this.deleteID != undefined){
                    formdata.append('giftID', this.deleteID)
                }else{
                    console.log(2)
                    formdata.append('giftID', data.id)
                }
                formdata.append('liveID', live_id)
                axios({
                    method: 'post',
                    url: GIFT_URL + 'service/deleteGiftLive.action',
                    data:formdata
                }).then((response)=>{
                    if(response.data.resultCode == '01'){
                        console.log(response.data)
                        this.deleteID = undefined
                        this.$message({
                            showClose:true,
                            type: 'success',
                            message: '删除成功!'
                        });
                        this._getLiveData()
                        this.dialogVisible = false
                        this.GiftDialogVisible = false
                    }
                }).catch((err)=>{
                    this.$message({
                        showClose:true,
                        type: 'error',
                        message: '获取数据失败，请刷新重试'
                    });
                    this.GiftDialogVisible = false
                    console.log(err)
                })
            },
            _getLiveData(){
                let live_id =  getLStorage("liveID")
                let user_id =  getLStorage("user_id")
                let formdata = new FormData()
                formdata.append('userID', user_id)
                formdata.append('liveID', live_id)
                axios({
                    method: 'post',
                    url: GIFT_URL + 'service/queryGiftLive.action',
                    data:formdata
                }).then((response)=>{
                    if(response.data.resultCode == '01'){

                        this.defaultGift = []
                        this.arrayGift = []
                        this.dataLiveList = response.data.paramo
                        
                        for(let i = 0;i < this.dataLiveList.length;i++){
                            console.log(this.dataLiveList[i].defaultGift)
                            if(this.dataLiveList[i].defaultGift == 0){
                                this.defaultGift.push(this.dataLiveList[i])
                                this.arrayGift.push(this.dataLiveList[i].id)
                            }
                        }
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            _getInfo(){
              axios.get(DATA_URL + 'mwlive/live/get_info.do?id='+ getLStorage("liveID")
              ).then((response) => {
                  this.live_status = response.data.data.live_status;
                  if (response.data.data.giftSwitch === 1) {
                      this.value = true
                  }else{
                      this.value = false;
                  }
              })
            },
            _getGiftData(id){
                if(this.live_status == 1){
                  this.$message({
                    showClose:true,
                    type: 'error',
                    message: '正在直播中，频道基本信息不可编辑!'
                  });
                  return false
                }
                if(id){
                    this.deleteID = id
                }
                this.dialogVisible=true
                // let live_id =  getLStorage("liveID")
                let user_id =  getLStorage("user_id")
                let formdata = new FormData()
                formdata.append('userID',user_id)
                formdata.append('bizCode',2003)
                // formdata.append('liveID', live_id)
                axios({
                    method: 'post',
                    url: GIFT_URL + 'service/queryGift.action',
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((response)=>{
                    if(response.data.resultCode == '01'){
                        this.dataGiftList = response.data.paramo
                        this.allGift = []
                        console.log('`!`',this.arrayGift)
                        for(let i = 0;i < this.dataGiftList.length;i++){
                            if(this.arrayGift.indexOf(this.dataGiftList[i].id) == -1 && this.dataGiftList[i].defaultGift !=3 && this.dataGiftList[i].defaultGift !=1){
                                this.allGift.push(this.dataGiftList[i])
                                this._getLiveData()
                            }
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            addLiveGift(data,id){
                let live_id =  getLStorage("liveID")
                let user_id =  getLStorage("user_id")
                let formdata = new FormData()
                formdata.append('userID', user_id)
                formdata.append('liveID', live_id)
                formdata.append('giftID', data.id)
                axios({
                    method: 'post',
                    url: GIFT_URL + 'service/addGiftLive.action',
                    data:formdata
                }).then((response)=>{
                    if(response.data.resultCode == '01'){
                        // console.log(response.data)
                        if(this.deleteID != undefined){
                            this.deleteLiveGift(data)
                        }
                        this._getLiveData()
                        this.dialogVisible = false
                        this.$message({
                            showClose:true,
                            type: 'success',
                            message: '设置成功!!'
                        });
                    }else if(response.data.resultCode == '03'){
                        this.$message({
                            showClose:true,
                            type: 'error',
                            message: '直播间礼物重复添加，请重新选择!'
                        });
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },

            handleClose(done) {
                this.dialogVisible = false
                // this.$confirm('确认关闭？')
                // .then(_ => {
                //     done();
                // })
                // .catch(_ => {});
            }
        },
        watch:{
            // value(value){
            //     var params;
            //     if(value){
            //         params={
            //             liveId:this.liveID,
            //             userId:this.userID,
            //             giftSwitch:"1"
            //         }
            //     }
            //     else{
            //         params={
            //             liveId:this.liveID,
            //             userId:this.userID,
            //             giftSwitch:"0"
            //         }
            //     }
            //     let that  = this;
            //     $.ajax({
            //         type: "POST",
            //         timeout: 120000, //超时时间设置，单位毫秒
            //         async: false,
            //         url: DATA_URL + "mwlive/live/setGiftSwitch.do",
            //         data: params,
            //         dataType: "json",
            //         success: function(data) {
            //             console.log(data)
            //             if (data.code == 200) {
            //                 that.$message({
            //                 showClose: true,
            //                 type: "success",
            //                 message:"设置成功"
            //             });
            //             }else{
            //                 that.$message({
            //                 showClose: true,
            //                 type: "error",
            //                 message:"data.msg"
            //             });
            //             }
            //         }
            //     })

            // }
        }
    }
</script>

<style scoped>
.livegift-content{
  height: 560px;
  overflow-y: auto;
}
.livegift{
    min-height: 655px;
}
.livegift-title{
    /* font-size:16px; */
    color:#00b0ff;
    padding:0 20px 10px;
    /* border-bottom:1px solid #eaeaea; */
}
.livegidt-list ul li{
    float:left;
    width:140px;
    height: 180px;
    margin:0 10px 10px;
}
.livegidt-list ul li img{
    margin:10px;
    width:100px;
    height:100px;
}
.add-livegift{
    line-height:180px;
    font-size:50px;
    color:#999;
}
.livegift-hover{
    display: none;
    left: 0;
    top:0;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    color:#fff;
}
.livegidt-list ul li:hover .livegift-hover{
    display: block;
}
.restGift{
    line-height: 140px;
}
.livegift .swi_50{
  margin-bottom:46px;
}
.cur-p.gift_li{
    /* background:#e5e5e5; */
    background: rgba(245,245,245,1);
    width: 220px;
    height: 220px;
}
.gift_d{
    width:194px;
    height: 194px;
    border:1px dashed rgba(204,204,204,1);
    background: rgba(245,245,245,1);
    margin: 10px auto;
    font-size: 65px;
}
.offFn{
    display: inline-block;
    position: relative;
    top: -23px;
    left: 20px;
    margin-right: 31px;
}

</style>
<style>
/* .new_51 .el-switch__label.el-switch__label--left span{
    right: 4px !important;
    top: 4px !important;
}
.new_51 .el-switch__label.el-switch__label--right span{
    right: -13px !important;
    top: 4px !important;
} */
.gift-modify .el-dialog--tiny{
    width: 52%;
}
.new_51 span.el-switch__label--right{
    position: relative;
}
.new_51 .el-switch__label--left{
    margin-right:0;
}
</style>
