<template>
    <div class="tickets" style="height:718px;">
        <div class="live-top bg-fff">门票管理
            <!-- <p style="float:right">已使用门票：<span style="color:#F5A623;">{{userNum}}</span>张</p> -->
            <div class="ticeTitle">
                <p class="tice_p2" v-show="ticketOff">
                    门票金额：
                    <span style="color:#F5A623;">{{ticketAmount}}</span>元
                    <span class="ticeUpdate" @click="ticeUp">修改</span>
                </p>
                <p class="tice_p">
                    在线售票：
                    <el-switch class="swi_50 ticketMoney_01" @change="ticketOnchange" active-text="开" inactive-text="关"  v-model="ticketOff"></el-switch>
                </p>
            </div>
        </div>
        <div style="position:relative;">
            <span class="default-color">门票总数量：<span class="yellow_txt">{{total}}</span>张</span>
            <span class="default-color" style="margin-left:24px;">已使用门票：<span class="yellow_txt">{{userTickteNum}}</span>张</span>
            <span class="default-color" v-if="ticketOff" style="margin-left:24px;">在线售出门票：<span class="yellow_txt">{{sellOutTicketNum}}</span>张</span>
            <span style="position: absolute;right:0px">
                <el-button class="bgc_txt  btn_30 border_btn" @click="addTicket">追加门票</el-button>
                <el-button class="bgc_txt  btn_30 border_btn" type="primary" @click="dialogVisibleMore = true">批量发送</el-button>
                <el-button class="bgc_txt  btn_30" type="primary" :disabled="upTime" @click="export2Excel()">{{myExport}}</el-button>
            </span>
        </div>
        <div class="bg-fff info-content" style="padding-top:20px;">
            <el-table
            :data="tableData"
            style="margin:0 auto;height:520px;text-align:center;" height="541">
                <el-table-column
                type="index"
                :index="indexMethod" 
                label="序号"
                width="200%"
                >
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="门票编号"
                >
                </el-table-column>
                <el-table-column
                    prop="useStatus"
                    label="状态"
                >
                 <template slot-scope="scope">
                    <!-- <div href="javascript:;" class="green_txt" v-bind:class="{clo_ccc: scope.row.useStatus}">{{scope.row.useStatus==0?'未使用':'已使用'}}</div> -->
                    <div href="javascript:;" v-show="scope.row.useStatus == 1 && scope.row.createType !=2 && scope.row.codeStatus !=2" class="green_txt" v-bind:class="{clo_ccc: scope.row.useStatus}">{{scope.row.useStatus==1?'已使用':''}}</div>
                    <div href="javascript:;" v-show="scope.row.codeStatus==2 && scope.row.createType !=2" class="green_txt" v-bind:class="{clo_ccc: scope.row.useStatus}">{{scope.row.codeStatus==2?'已注销':''}}</div>
                    <div href="javascript:;" v-show="scope.row.useStatus == 1 && scope.row.codeStatus==3 && scope.row.createType !=2" class="green_txt" v-bind:class="{clo_ccc: scope.row.useStatus}">{{scope.row.codeStatus==3?'已重置':''}}</div>
                    <el-select v-show="scope.row.useStatus == 0 && scope.row.createType !=2 && scope.row.codeStatus !=2" v-model="scope.row.showStatus" @change="userState(scope.row)" class="mySele" placeholder="未使用">
                        <el-option label="未使用" value="0"></el-option>
                        <el-option label="已赠送" value="1"></el-option>
                        <el-option label="已售出" value="2"></el-option>
                    </el-select>
                    <div href="javascript:;" v-show="scope.row.createType == 2" class="green_txt">在线售出</div>
                </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    >
                <template slot-scope="scope">
                    <!-- <el-button v-if="scope.row.shareType=='0'" class="hover_blue"  @click="shareModify(false,'formSingleShare',scope.row)" type="text" size="small">分享</el-button>
                    <el-button v-if="scope.row.shareType!='0'"  class="clo_ccc"  type="text" size="small">已分享</el-button> -->
                    <el-button v-if="scope.row.createType !=2"  class="hover_blue" :class="{'clo_ccc':scope.row.useStatus !=0,'clo_ccc1':scope.row.codeStatus == 2}"  @click="shareModify(false,'formSingleShare',scope.row)" type="text" size="small">发送</el-button>
                    <el-button v-if="scope.row.createType !=2 && scope.row.useStatus == 1" class="hover_blue" :class="{'clo_ccc':scope.row.codeStatus ==2,'clo_ccc1':scope.row.codeStatus == 3}" @click="ticketReset(scope.row)" type="text" size="small">重置</el-button>
                    <el-button v-if="scope.row.createType == 2" class="hover_blue clo_ccc" type="text" size="small">发送</el-button>
                    <!-- <el-button v-if="scope.row.createType == 2" class="hover_blue clo_ccc" v-show="scope.row.createType == 2" @click="ticketReset(scope.row)" type="text" size="small">重置</el-button> -->
                </template>
                </el-table-column>
            </el-table>
            <p class="ResetRecord" @click="resetRecord('1')">重置记录</p>
            <!-- 重置弹出框 -->
            <el-dialog title="重置记录" width="860px" style="overflow:hidden" class="resetBox" :visible.sync="resetRecordDilog">
                <el-table :data="resetRecordDate">
                    <el-table-column style="height:36px;" label="序号"    type="index"
                :index="indexReset"></el-table-column>
                    <el-table-column property="newCode" label="新门票"></el-table-column>
                    <el-table-column property="oldCode" label="原门票"></el-table-column>
                    <el-table-column property="oldStatus" label="原状态"></el-table-column>
                    <el-table-column property="createTime" label="重置时间"></el-table-column>
                </el-table>
                <el-pagination 
                    background
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="pageNo2"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize2"
                    layout="prev, pager, next"
                    :total="total2"
                    >
                </el-pagination>
            </el-dialog>
            <!-- end -->
            <el-pagination 
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
        <el-dialog
            title="输入手机号"
            :visible.sync="dialogVisibleAdd"
            width="400px"
            class="my_dialog no_border add"
            :show-close="false"
            >
            <el-form  :model="formSingleShare"  ref="formSingleShare"     label-position="top" label-width="80px" class="top_lable">
                <el-form-item label="门票编号：" prop="sharePhone"
                    :rules="[
                            {required: true, message: '手机不能为空', trigger: 'blur'},
                            { pattern: /^[1][345789]\d{9}$/, message: '请输入正确的手机号',trigger: 'blur' }
                        ]"
                    >
                    <span class="col_4FF">{{formSingleShare.code}}</span>
                    <el-input class="input_340" v-model="formSingleShare.sharePhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="singleShare('formSingleShare')" :disabled="disabledAdd">确 定</el-button>
                <el-button @click="closeChangeMachie">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 追加门票 -->
         <el-dialog
            title="追加门票数量"
            :visible.sync="addToDialog"
            width="400px"
            class="my_dialog no_border add addToForm"
            :show-close="false"
            >
            <el-form  :model="addToForm"  ref="addToForm"     label-position="top" label-width="80px" class="top_lable">
                <el-form-item  prop="number" type="tel"
                    :rules="[
                            {required: true, message: '数量不能为空', trigger: 'blur'},
                            { pattern: /^\+?[1-9][0-9]*$/, message: '门票数量为大于1的数字',trigger: 'blur' }
                        ]"
                    >
                    <el-input class="input_260" @keyup.enter.native="checkAdd('addToForm')" v-model="addToForm.number" :maxlength="4"></el-input>
                    <p style="color:#999" v-show="nameVali">单次可追加一千张门票，最高可支持五万张。</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="checkAdd('addToForm')">确 定</el-button>
                <el-button @click="addToDialog=false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 批量分享 -->
        <el-dialog
            title="门票发送"
            :visible.sync="dialogVisibleMore"
            width="640px"
            class="my_dialog no_border max_500"
            :show-close="false"
            @close = "cleardialogVisibleMore()"

            >
            <div class="top_title">
                <span class="txt_623">发送{{dynamicValidateForm.domains.length}}张门票</span>
                <div class="btn_list">
                    <span class="txt_blue cur-p">
                        <a  href="http://mwdatatest.facebac.com/ticket/contacts.xls">下载模板</a>
                    </span>
                    <el-button class="bgc_txt  btn_34" type="primary" @click="addDomain">添加收件人</el-button>
                    <!-- <el-button class="bgc_txt  btn_34 border_btn" type="primary" id="important">
                        <input style="width:90px;height:34px;opacity:0;opacity: 0;top: -2px;left: -1px;" class="cur-p" id="upload" type="file" value="导入" @change="importfPhone(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        <span class="up_btn">导入收件人</span>
                    </el-button> -->
                    <span class="bgc_txt  btn_34 border_btn" id="important">
                        导入收件人
                        <span class="p-a" style="top:0;left:0;" >
                            <input style="width:90px;height:34px;opacity:0;opacity: 0;top: -2px;left: -1px;" class="cur-p" id="upload" type="file" value="导入" @change="importfPhone(this,$event)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        </span>
                    </span>
                    <el-button class="bgc_txt  btn_34  border_btn" type="primary" @click="dynamicValidateForm.domains=[]">清空收件人</el-button>
                </div>
            </div>
            
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" id="phoneBox">
                <el-form-item 
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="[
                            {required: true, message: '手机不能为空', trigger: 'blur'},
                            { pattern: /^[1][345789]\d{9}$/, message: '请输入正确的手机号',trigger: 'blur' }
                        ]"
                >
                    <el-input style="display:inline-block;margin-right:8px;" v-model="domain.value"></el-input><el-button class="icon_del" @click.prevent="removeDomain(domain)"></el-button>
                     </el-form-item>
                
                </el-form>
            <div class="clear" style="border-top:1px solid #F2F2F2;padding-top:9px;width:580px;">
                 <span style="color:#9B9B9B;float:left;">可以输入、粘贴或导入号码，单次最导入10000个</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button  id="checkMsg" type="primary" @click="submitFormInvitation('dynamicValidateForm')" >确 定</el-button>
                <el-button  @click="cleardialogVisibleMore()" >取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="设置售票金额"
            :visible.sync="upTicket"
            width="33%"
            custom-class="newMoneny_01"
            center
            @close="setTickNumClose($event)"
            >
            <p>
                <span>售票金额：</span>
                <el-input v-model="newMoeny" @input="onIput($event)" placeholder="请输入" style="width:182px;"></el-input>
                <span>元</span>
            </p>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="upTicket = false">取 消</el-button> -->
                <el-button type="primary" @click="upTicketOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,PAGE_SIZE} from 'api/config'
    import axios from 'axios'
    import {setDate,filterObj} from 'api/http'
    import rootBus from '../rootBus.js'
    export default{
        data() {
            return {
                newMoeny:'',
                upTicket:false,
                pageSize2:5,
                pageNo2:1,
                total2:4,
                ticketOff:false,
                userNum:0,
                nameVali:'',
                currentPage:1,
                pageSize:10,
                pageNo:1,
                total:0,
                tableData: [],
                tableDataAll:[],
                exportDate:[],
                formSingleShare: {
                    code:'',
                    sharePhone:''
                    
                },
                addToForm:{
                    number:""
                },
            
                dynamicValidateForm: {
                    domains: [],
                    msg:'',
                    msgStateInfo:{totalCount:'',data:''},
                    InvitationMony:0,
                    InvitationNum:0
                },
                batchShare:'',
                userId:'',
                liveID:'',
                scope:[],
                dialogVisibleAdd:false,
                disabled:false,
                disabledAdd:false,
                addToDialog:false,
                dialogVisibleMore:false,
                resetRecordDilog:false,
                // options: [{
                //     seleVal: '未使用',
                //     label: '1'
                //     }, {
                //     seleVal: '已售出',
                //     label: '2'
                //     }, {
                //     seleVal: '已赠送',
                //     label: '3'
                //     }],
                seleVal: '',
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ege:1,
                    time:'qwe'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ege:1,
                    time:'qwe'
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ege:1,
                    time:'qwe'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ege:1,
                    time:'qwe'
                    }],
                userTickteNum:0,
                sellOutTicketNum:0,
                ticketAmount:'',
                resetRecordDate:[],
                totalPages:0 ,//总页数,
                config:true,
                maxEditNuber:'',
                isQualify:'',
                upTime:false,
                html:60,
                myExport:'导出',
                setTime:''
            }
        },
        computed:{
            // isQualify:{
            //     get(){
            //         return rootBus.myQualify;
            //     },
            //     set(){
            //         return rootBus.myQualify;
            //     }
            // }
        },
        created(){
            rootBus.$emit('updateTab','management2')
            this.getQualify();
            // this.getDataList()
            // this.getAllTikets()
            this.getAllUserNum()
            this.getTickeAmount()
            
        },
        watch:{
            ticketOff(val,newVal){
                console.log(val,newVal)
                if (newVal) {
                    $('.ticketMoney_01').find('.el-switch__label--right').hide();
                    $('.ticketMoney_01').find('.el-switch__label--left').show();
                }else{
                    $('.ticketMoney_01').find('.el-switch__label--right').show();
                    $('.ticketMoney_01').find('.el-switch__label--left').hide();
                }
            },
            // html(val,oldVal){
            //     console.log(val,oldVal)
            //     if (val == 0) {
            //         this.html = 0;
            //         this.myExport = '导出';
            //         this.upTime = false;
            //         clearInterval(this.setTime)
            //     }
            // }

        },
        methods:{
            getQualify(){
                var params = {userId:getLStorage('user_id')};
                    axios.get(DATA_URL + 'mwlive/user/get_userinfo.do',{
                        params:{
                            id:getLStorage('user_id')
                        }
                    }).then((response) => {
                        if (response.data.data.qualify == 3) {
                            this.isQualify = 3
                        }else{
                            this.isQualify = 1;
                        } 
                        this.getDataList();
                        this.getAllTikets();
                    }).catch(function(err){
                        console.log(err)
                    })
            },
            setTickNumClose(){
                if (!this.config) {
                    this.ticketOff = false
                }
            },
            userState(val,a){
                if (val == '' || val == null || val == undefined) {
                    this.successMessage('获取参数失败','error')
                    return
                }
                var url = GIFT_URL + '/service/updateShowStatus.action?id='+ val.id + '&showStatus=' + val.showStatus;
                axios.get(url)
                        .then((res)=>{
                            if (res.data.resultCode == '01') {
                                this.successMessage('设置成功','success')
                            }else{
                                this.successMessage('设置失败','error');
                            }
                        })
            },
            onIput(e){
                // this.newMoeny = (e.match(/^\d*(\.?\d{0,1})/g)[0]) || null;
            },
            // 重置记录
            resetRecord(resetVal){
                console.log(resetVal)
                if (resetVal == 1) {
                    this.pageNo2 = 1;
                }else{
                    this.pageNo2 = resetVal;
                    
                }
                let url =GIFT_URL + "service/getLiveCodeRecordPage.action?liveID=" + getLStorage("liveID") +"&pageSize=" + this.pageSize2 + "&pageNo=" + this.pageNo2;
                axios
                    .get(url)
                    .then(response => {
                        if (response.data.resultCode == "01") {
                            console.log(response)
                            this.resetRecordDilog = true;
                            this.resetRecordDate = response.data.params.list;
                            if (Array.isArray(this.resetRecordDate)) {
                                this.resetRecordDate.forEach((e,index)=>{
                                    if (e.oldStatus == 0) {
                                        this.resetRecordDate[index].oldStatus = '未使用'
                                    }
                                    if (e.oldStatus == 1) {
                                        this.resetRecordDate[index].oldStatus = '已赠送'
                                    }
                                    if (e.oldStatus == 2) {
                                        this.resetRecordDate[index].oldStatus = '已售出'
                                    }
                                    if (e.oldStatus == 3) {
                                        this.resetRecordDate[index].oldStatus = '已使用'
                                    }
                                    this.resetRecordDate[index].createTime = this.filterTime(this.resetRecordDate[index].createTime);
                                })
                                this.total2 = response.data.params.page.total;
                            }

                        }
                    })
            },
            getTickeAmount(){
                let url =DATA_URL + "mwlive/live/get_info.do?id=" + getLStorage("liveID");
                axios
                    .get(url)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.ticketAmount = response.data.data.ticket_price/10;
                            if (this.ticketAmount == 0) {
                                this.ticketAmount = '';
                            }
                            this.ticketOff = this.ticketAmount > 0 ? true :false;
                        }
                    })
            },
            ticketReset(valDate){
                console.log(valDate)
                if (valDate.codeStatus == 2 || valDate.codeStatus == 3 ||valDate.createType == 2) {
                    //已注销 或者重置 或者在线售出
                    this.$confirm('<p style="text-align:center;">当前门票处于锁定状态，无法重置</p>', {
                        dangerouslyUseHTMLString: true,
                        distinguishCancelAndClose: true,
                        showClose:false,
                        showCancelButton:false,
                        customClass:'offMesBox_01',
                        confirmButtonText: '确定',
                        confirmButtonClass:'offConfirm',
                        cancelButtonClass:'offCancel',
                        center:true
                        })
                        .then(() => {})
                }else{
                    this.$confirm('<p class="pcSS1">重置门票后原有的门票无法使用，新生成的门<br> 票请在重置记录查看，您确定要重置吗？</p>', {
                        dangerouslyUseHTMLString: true,
                        distinguishCancelAndClose: true,
                        showClose:false,
                        showCancelButton:true,
                        customClass:'offMesBox_01 offMesBox_02',
                        confirmButtonText: '确定',
                        confirmButtonClass:'offConfirm',
                        cancelButtonClass:'offCancel',
                        center:true
                        })
                        .then(() => {
                            axios.get(GIFT_URL + 'service/resetLiveTicket.action',{
                                params:{
                                        id:valDate.id
                                    }
                                }).then((response) => {
                                    if (response.status == 200) {
                                        // this.$confirm('<p class="pcSS1">最后一张门票为生成的新门票，<br>是否前往查看？</p>', {
                                        //     dangerouslyUseHTMLString: true,
                                        //     distinguishCancelAndClose: true,
                                        //     showClose:false,
                                        //     showCancelButton:true,
                                        //     customClass:'offMesBox_01 offMesBox_02',
                                        //     confirmButtonText: '前往查看',
                                        //     confirmButtonClass:'offConfirm',
                                        //     cancelButtonClass:'offCancel',
                                        //     center:true
                                        //     })
                                        //     .then(() => {
                                                //跳最后一页
                                                // this.getDataList(this.totalPages);
                                                // this.pageNo = this.totalPages;
                                            // }).catch((action)=>{

                                            // })
                                            this.getDataList(this.pageNo);
                                    }
                                })
                            })
                        .catch(action => {

                        });
                    
                }
            },
            ticeUp(){
                this.newMoeny = this.ticketAmount;
                this.upTicket = true;
            },
            upTicketOk(){
                    var re = /^[0-9]+([.]{1}[0-9]{1})?$/
                    if (!re.test(this.newMoeny)) {
                        // this.$message({
                        //     showClose: true,
                        //     message: '请输入金额为0.1~100000元',
                        //     type: 'error'
                        // });
                        this.successMessage('请输入金额为0.1~100000元','error')
                        return
                    }
                    if (this.newMoeny > 100000  || this.newMoeny == 0) {
                        this.successMessage('请输入金额为0.1~100000元','error')
                        return
                    }
                    // this.ticketAmount = this.newMoeny == 0 ? '': this.newMoeny;
                    this.ticketAmount = this.newMoeny;
                    let dataParams = {
                        user_id: getLStorage("user_id"),
                        id: getLStorage("liveID"),
                        live_permit: '3',
                        ticket_price:this.ticketAmount*10 
                    }
                    axios
                        .get(DATA_URL + "mwlive/live/livepermit.do", {
                            params: filterObj(dataParams)
                            })
                            .then(response => {
                            if (response.data.code == 200) {
                                this.config = true;
                                this.upTicket = false;
                                this.ticketOff = true;
                            }
                        })
            },
            ticketOnchange(val){
                if (val == 0) {
                    // alert('确定关闭')
                    this.$confirm('<p style="text-align:center;">关闭在线售票后，在直播页面观众将会</p><p style="text-align:center;">无法直接购买门票，您确定关闭吗？</p>', {
                        dangerouslyUseHTMLString: true,
                        distinguishCancelAndClose: true,
                        showClose:false,
                        customClass:'offMesBox',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        confirmButtonClass:'offConfirm',
                        cancelButtonClass:'offCancel',
                        center:true
                        })
                        .then(() => {
                            var num = ''
                            if (this.ticketAmount == 0) {
                                num = 0;
                            }
                            this.ticketAmount = '';
                            let dataParams = {
                                user_id: getLStorage("user_id"),
                                id: getLStorage("liveID"),
                                live_permit: '3',
                                ticket_price:num
                            }
                            
                            axios
                                .get(DATA_URL + "mwlive/live/livepermit.do", {
                                params: filterObj(dataParams)
                                })
                                .then(response => {
                                if (response.data.code == 200) {
                                    this.ticketOff = false;
                                }
                            })
                        })
                        .catch(action => {
                            // this.ticketFlag = true;
                            this.ticketOff = true;
                        });
                }else{
                    this.upTicket = true;
                    this.newMoeny = '';
                    this.config = false;
                }
            },
            getAllUserNum(){
                this.userId =  getLStorage("userId")
                this.liveID =  getLStorage('liveID')
                let url = GIFT_URL + 'service/getListByPage.action'
                let formdata = new FormData()
                formdata.append('liveId',this.liveID)
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.resultCode == '01'){
                       if(res.data.params.list.length>0){
                           var myDate = res.data.params.list
                           for(var i = 0;i< myDate.length;i++){
                                if (myDate[i].code == 'BG3434') {
                                }
                                if (myDate[i].useStatus == 1) {
                                    this.userNum++;
                                }
                            }                         
                        }

                        
                    }                                              
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 追加门票
            addTicket(){
                let params = {userId:getLStorage('user_id')};
                axios.get(DATA_URL + 'mwlive/user/get_userinfo.do',{
                    params:{
                        id:getLStorage('user_id')
                    }
                }).then((response) => {
                    // 实名成功
                    var qualify = response.data.data.qualify;
                    // 实名
                    if(qualify==3){
                        this.nameVali = true;                      
                        this.total >= 50000 ? this.successMessage('门票数量达到上限，如需更多门票请联系客服人员','error'):this.addToDialog = true;
                    }else{
                        this.nameVali = false;                      
                        this.total >= 100 ? this.successMessage('未认证用户最多添加100张门票','error'):this.addToDialog = true;
                    }           
                }).catch(function(err){
                    console.log(err)
                })
            },
            indexMethod(index) {
                return index + (this.pageNo - 1) * 10 + 1;
            },
            indexReset(index){
                return index + (this.pageNo2 - 1) * 10 + 1;
            },
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleSizeChange2: function (size) {
                this.pageSize2 = size;
            },
            handleCurrentChange2: function(currentPage){
                this.pageNo2 = currentPage;
                this.resetRecord(this.pageNo2);
            },
            handleCurrentChange: function(currentPage){
                this.pageNo = currentPage;
                this.getDataList(this.pageNo)
            },
            // 导出表格
            export2Excel() {
                this.upTime = true;
                let url = GIFT_URL + 'service/excelShareBack.action'
                let url1 = GIFT_URL + 'service/excelShare.action'
                let formdata = new FormData();
                formdata.append('liveID', getLStorage('liveID'));
                formdata.append('num', this.tableDataAll.length);
                //excel分享接口
                axios({
                    method: 'post',
                    url: url1,
                    data:formdata,
                }).then((response)=>{
                    if(response.data.resultCode == "01"){
                        this.exportDate = response.data.paramo; 
                        var listArr = this.exportDate;
                        for(var i=0;i< this.exportDate.length;i++) {
                           listArr[i].showStatus = this.exportDate[i].showStatus == 0?"未使用": (this.exportDate[i].showStatus == 1?"已赠送":"已售出");
                        }   
                        require.ensure([], () => {    
                            const { export_json_to_excel } = require('../../vendor/Export2Excel');
                            const tHeader = ['门票编号', '状态'];
                            const filterVal = ['code','showStatus'];
                            const list = listArr;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '门票');                                          
                    　　});
                        this.successMessage('导出成功');
                        this.upTime = false;
                    }else if(res.data.resultCode == "03"){
                        this.successMessage('当前无可发送门票，请追加后再次的发送','error')
                    }  
                });      



            // 　　require.ensure([], () => {
            // 　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
            // 　　　　const tHeader = ['门票编号', '状态'];
            // 　　　　const filterVal = ['code','useStatus'];
            //         const list=[];
            //         let idList = []
            //         const td = this.tableDataAll;
            //         var j=0;
                    
            //        for(var n=0;n<td.length;n++) {
                  
            //             if (td[n].createType == 2) {
            //                 continue
            //             }
            //                list.push(td[n])
            //                 idList.push(td[n].id)
            //                list[j].useStatus=list[j].showStatus==0?"未使用": (list[j].showStatus==1?"已赠送":"已售出");
            //                j++;
            //        }       
            //        if (list.length == 0) {
            //            this.$message({
            //                 showClose: true,
            //                 message: '无可分享门票',
            //                 type: 'error'
            //             });
            //             return
            //        }
            //        var idList2 =  idList.join(',')               
            //             let url = GIFT_URL + 'service/excelShareBack.action'
            //             let url1 = GIFT_URL + 'service/excelShare.action'
            //             let formdata = new FormData()
            //             formdata.append('liveID', getLStorage('liveID'))
            //             formdata.append('num', idList.length)
            //             formdata.append('IDList', idList2)
            //             //excel分享接口
            //             axios({
            //                 method: 'post',
            //                 url: url1,
            //                 data:formdata,
            //             }).then((response)=>{
            //                 if(response.data.resultCode == "01"){
            //                     const data = this.formatJson(filterVal, list);
            //                     export_json_to_excel(tHeader, data, '门票');
            //                     this.successMessage('导出成功')
            //                     this.getDataList()
                                
            //                 }else if(res.data.resultCode == "03"){
            //                     this.successMessage('当前无可分享门票，请追加后再次的分享','error')
            //                     this.successMessage('',)
            //                 }  
            //             })
            // 　　});
                
            },
            formatJson(filterVal, jsonData) {
            　　return jsonData.map(v => filterVal.map(j => v[j]))
            },
            // 所有门票
            getAllTikets(){
                let fD = new FormData()
                let num = 0;
                console.log(this.isQualify)
                fD.append('liveID',this.liveID);
                fD.append('qualify',this.isQualify)
                axios({
                    method:'post',
                    url:GIFT_URL + 'service/showCode.action',
                    data:fD
                }).then((data)=>{
                    if (data.status == 200) {
                        console.log(data)
                        num = data.data.params.codeTotal;
                        this.maxEditNuber = data.data.params.maxEditableNum;
                        console.log(num)
                        this.userId =  getLStorage("userId")
                        this.liveID =  getLStorage('liveID')
                        let url = GIFT_URL + 'service/getListByPage.action'
                        let formdata = new FormData()
                        formdata.append('liveId',this.liveID);
                        formdata.append('pageSize',num);
                        formdata.append('pageNo','1');
                        axios({
                            method: 'post',
                            url: url,
                            data:formdata,
                        })
                        .then((res)=>{
                            if(res.data.resultCode == '01'){
                                if(res.data.params.list.length>0){
                                    var myDate = res.data.params.list
                                    this.tableDataAll = [] 
                                    for(var i = 0;i< myDate.length;i++){
                                            if(myDate[i].useStatus==0){
                                                myDate[i].useStatus = "未使用"
                                                this.tableDataAll.push(myDate[i])
                                            }
                                        }                         
                                    }
                            }                                              
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                })
                
            },
            // 门票分页查询
            getDataList(val){
                this.userId =  getLStorage("userId")
                this.liveID =  getLStorage('liveID')
                let url = GIFT_URL + 'service/getListByPage.action'
                let formdata = new FormData()
                formdata.append('liveId',this.liveID)
                formdata.append('pageSize',this.pageSize)
                if(val){
                    formdata.append('pageNo',val)
                }else{
                    formdata.append('pageNo',1)
                }
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.resultCode == '01'){
                       if(res.data.params.list.length>0){
                            this.tableData = res.data.params.list;
                            if (Array.isArray(this.tableData)) {
                                this.tableData.forEach((e,index)=>{
                                    if (e.showStatus == 0) {
                                        // this.tableData[0].createType = 2;
                                        // this.tableData[1].createType = 2;
                                        // this.tableData[2].codeStatus = 3;
                                        // this.tableData[3].codeStatus = 2;
                                        // this.tableData[3].useStatus = 1;
                                        // this.tableData[4].codeStatus = 1;
                                        // this.tableData[index].createType = 2;
                                        // this.tableData[index].useStatus = 1;
                                        // this.tableData[index].codeStatus = 3;
                                        this.tableData[index].showStatus = '未使用';
                                    }
                                    if (e.showStatus == 1) {
                                        this.tableData[index].showStatus = '已赠送';
                                    }
                                    if (e.showStatus == 2) {
                                        this.tableData[index].showStatus = '已售出';
                                    }
                                })
                            }
                            this.userTickteNum = parseInt(res.data.params.usedCount)
                            this.sellOutTicketNum  = parseInt(res.data.params.sellCount);

                            this.total = parseInt(res.data.params.page.total);
                            this.totalPages = parseInt(res.data.params.page.totalPages);
                            this.getAllTikets()
                        }
                    }                                              
                }).catch((err)=>{
                    console.log(err)
                })
            },
            
            //查看实名
            checkAdd(addToForm){
                // 查询实名
                let numberLimit
                axios.get(DATA_URL + 'mwlive/user/user_qualify_cx.do',{
                    params:{
                        userId:getLStorage('user_id')
                    }
                }).then((response) => {
                    // 实名成功
                    var qualify = response.data.data.qualify
                    if(qualify==3){       
                        // this.nameVali = true;
                        numberLimit = 50000
                    }else{
                        // this.nameVali = false;
                        numberLimit = 100
                    }        
                    this.addOneTikket(addToForm,numberLimit,qualify)          
                }).catch(function(err){
                    console.log(err)
                })
                
               
                
            },
            // 追加门票
            addOneTikket(formName,max,qualify){      
                 this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addToDialog = true    
                        var number = Number(this.addToForm.number) 
                        var  total = Number(this.total)
                        if (qualify == 3 && number > 1000) {
                            this.successMessage('认证用户单次添加最多1000张门票','error');
                            return
                        }
                        if (qualify != 3 && number > 100) {
                            this.successMessage('未认证用户单次追加最多100张门票','error');
                            return
                        }
                        if(total+number>max){
                            if(qualify==3){
                                this.successMessage('门票数量达到上限，如需更多门票请联系客服人员','error')
                            }else{
                                this.successMessage('未认证用户最多添加100张门票','error')
                            }                           
                            return;
                        }
                        let _this = this
                        let formData = new FormData()
                        let url = GIFT_URL + 'service/createCode.action'
                        formData.append('liveID',_this.liveID)
                        formData.append('number',this.addToForm.number)
                        formData.append('type', '0')
                        axios({
                            method: 'post',
                            url: url,
                            data: formData,
                            headers: {'Content-Type': 'multipart/form-data'}
                        }).then((res) => {
                            if(res.data.resultCode == '01' ){
                                this.successMessage('追加成功')
                                this.getDataList(this.pageNo)
                            }else{
                                this.successMessage('追加失败','error')
                            }
                            this.addToDialog = false
                        })
                        .catch((err) => {
                            this.successMessage('追加失败','error')
                        })     
                        
                    }else{

                    }
                });
               
            },
            // 单个打开分享
            shareModify(type,formName,scope){
                console.log(scope)
                if(scope.useStatus == "1" || scope.codeStatus==2 || scope.codeStatus == 3 || scope.createType == 2){
                    this.$confirm('<p style="text-align:center;">当前门票处于锁定状态，无法发送</p>', {
                        dangerouslyUseHTMLString: true,
                        distinguishCancelAndClose: true,
                        showClose:false,
                        showCancelButton:false,
                        customClass:'offMesBox_01',
                        confirmButtonText: '确定',
                        confirmButtonClass:'offConfirm',
                        cancelButtonClass:'offCancel',
                        center:true
                        })
                        .then(() => {})
                    return;
                }
                this.formSingleShare = scope
                this.formSingleShare.code =  scope.code
                this.formSingleShare.sharePhone =  ''
                this.dialogVisibleAdd = true
            },
            //单个门票短信分享
            singleShare(formName){
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = new FormData()
                        let url = GIFT_URL + 'service/oneSmsShare.action'
                        formData.append('userID', _this.userId)
                        formData.append('liveID',_this.liveID)
                        formData.append('code',_this.formSingleShare.code)
                        formData.append('setPhone', getLStorage('mobile'))
                        formData.append('givePhone',this.formSingleShare.sharePhone)
                        // if(getLStorage("type")==2){
                        //     formData.append('type',"MVO")
                        // }
                        this.disabledAdd = true
                        axios({
                            method: 'post',
                            url: url,
                            data: formData,
                            headers: {'Content-Type': 'multipart/form-data'}
                        }).then((res) => {
                            if(res.data.resultCode == '01' ){
                                this.successMessage('发送成功')
                            }else{
                                this.successMessage('发送失败','error')
                            }
                            this.getDataList()
                            this.disabledAdd = false
                            this.dialogVisibleAdd = false
                        })
                        .catch((err) => {
                            this.disabledAdd = false
                            this.successMessage('发送失败','error')
                        })             

                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            closeChangeMachie(done){
                this.dialogVisibleAdd = false
                this.$refs['formSingleShare'].resetFields();
            },
            successMessage(message,type) {
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },
            importfPhone(obj,e) {
                //导入表格
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                // e=obj.callee.caller.arguments[0] || window.event;
                console.log(e)
                
                this.file = e.currentTarget.files[0];
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                console.log(reader)
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        console.log('outdata--',outdata)
                        // 插入表格
                        outdata = outdata.reverse()
                        for(var i=0;i<outdata.length;i++){
                            if(outdata[i].手机号){
                                _this.dynamicValidateForm.domains.unshift({
                                    value: outdata[i].手机号,                                   
                                });    
                            }
                        }
                        console.log(_this.dynamicValidateForm.domains,'list')                        
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
                // 清空上传
                var input = document.getElementById("upload");
                input.value='';
                setTimeout(()=>{
                    this.submitFormInvitation('dynamicValidateForm','checkMsg')
                },400)
                
            },
          
          
            // 批量分享
            submitFormInvitation(formName,checkMsg) {
                var _this = this
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.dynamicValidateForm.domains.length){
                        this.$message({
                            showClose:true,
                            type: 'error',
                            message: '请添加收件人'
                        });
                        return false
                    }   
                    if(checkMsg!='checkMsg'){
                        let formData = new FormData()
                        let url = GIFT_URL + 'service/smsShare.action'
                        var dataNum="",
                        len = _this.dynamicValidateForm.domains.length
                        for(var i=0;i<len;i++){
                            if(i === 0){
                                dataNum = _this.dynamicValidateForm.domains[i].value
                            }else{
                                dataNum = dataNum + ',' + _this.dynamicValidateForm.domains[i].value
                            }
                        }
                        dataNum = dataNum.toString()
                        var ary =dataNum.split(",")
                        var nary=ary.sort();
                        for(var i=0;i<ary.length;i++){
                            if (nary[i]==nary[i+1]){
                               _this.successMessage("手机号"+nary[i]+"重复",'error');
                                return;
                            }
                        }                        
                        formData.append('userID', _this.userId)
                        formData.append('liveID',_this.liveID)
                        formData.append('num',_this.dynamicValidateForm.domains.length)
                        formData.append('setPhone', getLStorage('mobile'))
                        formData.append('givePhone',dataNum)
                        // if(getLStorage("type")==2){
                        //     formData.append('type',"MVO")
                        // }
                        axios({
                            method: 'post',
                            url: url,
                            data: formData,
                            headers: {'Content-Type': 'multipart/form-data'}
                        }).then((res) => {
                            //console.log(this.dynamicValidateForm.domains.length+" / "+this.tableDataAll.length)
                            if(res.data.resultCode == '01' ){
                                _this.successMessage('发送成功')                    
                                _this.getDataList()
                            }else{
                                if(this.dynamicValidateForm.domains.length>this.tableDataAll.length){
                                    _this.successMessage('发送错误，您导入用户数量过多，请追加门票数量','error')
                                }
                                else{
                                    _this.successMessage('发送失败','error')
                                }
                            }
                            _this.dialogVisibleMore  = false
                        })
                        .catch((err) => {
                            _this.successMessage('发送失败','error')
                             _this.dialogVisibleMore  = false
                        })     
                    }                           
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
                }
                
                setTimeout(()=>{
                    this.submitFormInvitation('dynamicValidateForm','checkMsg')
                },400)

            },
            addDomain() {
                this.dynamicValidateForm.domains.unshift({
                value: '',
                key: Date.now()
                });
            },
            // 重置表单
            cleardialogVisibleMore(){
                this.dialogVisibleMore = false
                this.dynamicValidateForm.domains=[]
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
            }
            

        
        }
    }
</script>
<style scope>

.top_lable span{
    position: absolute;
    top: -35px;
    left: 80px;
    
}
.top_lable .el-form-item__label{
    line-height: 30px;
}
.top_lable.el-form--label-top .el-form-item__label{
    padding:0;
}
.tickets .my_dialog .el-dialog__body {
    padding:10px  0  0  0;

}

.tickets .my_dialog.add .el-dialog__body{
    padding-top:25px;
}
.tickets .my_dialog.max_500 .el-dialog__body{
   max-height:450px;
   width:600px;

}


.my_list .tickets  .btn_add{
    width:80px;
    background-color: #F2F2F2;
    color:#333333;
    font-size:12px;
    border:none;
    margin-left:10px;
    border:1px solid #E5E5E5;
}
.my_list .tickets  .btn_add:hover{
    background-color: #f5a623;
    border:1px solid #f5a623;
    color:#fff;
}
.yellow_txt{
    color:#F1951C;
}
.my_list .tickets .el-button.border_btn{
    background-color: #fff;
    border:1px solid #2B6CFF;
    color:#2B6CFF;

}
.tickets .clo_ccc,.my_list .el-table .el-button.clo_ccc{
    color:#ccc !important;
    cursor: text;
}
.tickets .clo_ccc,.my_list .el-table .el-button.clo_ccc1{
    color:#ccc !important;
    cursor: text;
}
.green_txt{
    text-decoration: none;
}
.tickets .demo-dynamic{
    min-height: 300px;
    width: 633px;
    max-height: 350px;
    overflow: auto;
}
.tickets  .demo-dynamic .el-form-item__content{margin-left: 0px !important; width:201px;}
.tickets .demo-dynamic .el-form-item__content .el-input{
    width:130px;
}

.tickets .dialogVisibleInvitation .demo-dynamic{min-height:325px;max-height:325px;overflow-y:auto;padding-top:15px;width:650px;}
.tickets .demo-dynamic .el-form-item.is-error .el-input__inner,
.tickets  .demo-dynamic .el-form-item.is-error .el-input__inner:focus,
.tickets .demo-dynamic   .el-form-item.is-error .el-textarea__inner,
.tickets .demo-dynamic    .el-form-item.is-error .el-textarea__inner:focus, 
.tickets .demo-dynamic    .el-message-box__input input.invalid, 
.tickets .demo-dynamic    .el-message-box__input input.invalid:focus{
    border-color: #D9D9D9;
}
.tickets .max_500 .btn_34{
    width: 90px;
    display: inline-block;
    background-color: #2B6CFF;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-radius: 2px;
    padding:0;
}
.tickets .demo-dynamic .el-form-item {
    margin-bottom: 12px;
}
.tickets .icon_del{
    display:inline-block;
    width:34px;
    height:34px;
    padding-left:4px;
    padding:0;
    background: url(../../common/image/icon_delete.png) no-repeat 3px 2px;
    position: absolute;
    top: 50%;
    margin-top:-17px;
    border:1px solid #D9D9D9;

}
.tickets .icon_del:hover{
    background: url(../../common/image/icon_delete_active.png)  no-repeat 3px 2px;
    border:1px solid #FF467F;
}
.tickets .max_500 .btn_list{
    text-align: right;
    margin-right:24px;
    margin-bottom:10px;
}
#important {
    position: relative;
    /* top:10px; */
}
#important .up_btn{
    position: absolute;
    top:0;
    left:10px;
}
#upload{
    position: relative;
    z-index: 99;
}
.tickets .input_340 .el-input__inner{
    width:340px;
}
.tickets .input_260 .el-input__inner{
    width:260px;
}
.tickets .left-nav{
    height:750px;
}
.top_title .txt_623{
    float: left;
    color:#F5A623;
    margin-top:6px;
}
.tickets .el-table .el-button.hover_blue{
    color:#2B6CFF;
}
.ticeTitle{
    float: right;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    clear: both;
}
.ticeUpdate{
    color: #4285F4;
    text-decoration: underline;
    cursor: pointer;
}
.tice_p{
    display: inline-block;
}
.tice_p2{
    display: inline-block;
    margin-right:30px;
}
.mySele{
    width: 70px;
    height: 38px;
    font-size: 12px;
    padding-top: 5px;
}
.ResetRecord{
    float: right;
    height: 20px;
    margin-top: 3px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(66,133,244,1);
    text-decoration: underline;
    cursor: pointer;
}
.newMoneny_01{
    width: 370px;
    height: 258px;
}
.newMoneny_01 .el-dialog__header{
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    text-align: left;
}
.newMoneny_01 .el-dialog__header .el-dialog__title{
    font-size:18px;
    color:rgba(51,51,51,1);
}
.newMoneny_01 .el-dialog__body{
    height: 81px;
    line-height: 81px;
}
.offMesBox_01{
    width: 300px;
    height: 140px;
    padding: 0;
}
.offMesBox_01 .el-message-box__content .pcSS1{
    font-size: 12px;
    text-align: center;
    line-height: 17px;
    font-weight: 600;
}
.offMesBox_02{
    padding-top: 30px;
    height: 110px;
}
.offMesBox_01 .el-message-box__content{
    /* margin-bottom: 28px; */
}
.offMesBox_02 .el-message-box__header{
    padding: 0;
}
.resetBox .el-table__body-wrapper{
    /* height: 216px; */
    /* overflow-y: auto; */
    overflow-y: auto;
    max-height: 165px;
}
.resetBox thead{
    height: 36px;
}
.resetBox tr td{
    height: 36px !important;
}
</style>
<style>
.tickets .el-form-item {
    display:inline-block;
}
.tickets .my_dialog.add .el-form-item{
  margin-left:0;

}
.tickets .el-table td {
    height:50px;
    line-height:50px;
    padding:0;
}
.my_dialog.addToForm .el-dialog{
    text-align: center;
}
.my_dialog.addToForm .el-dialog__header{
    padding: 30px 0 0 0;
    border:none;
}
.my_dialog.addToForm  .el-dialog__footer{
    padding:0 0 30px 0;
}
.tickets .my_dialog.addToForm .el-dialog__body{
    padding-top:20px;
}
.my_dialog.addToForm .el-form-item{
    margin-bottom:30px;
}


.swi_50 .el-switch__label--left{
    position: absolute;
    right: 0;
    z-index:1;
    font-size:12px;
    color:#000;
    top:0px;
}
.swi_50 .el-switch__label--right{
    position: absolute;
    left: 0;
    z-index:1;
    font-size:12px;
    color:rgba(255,255,255,1);
    top:0px;
}
.swi_50 .el-switch__label--left span,.swi_50 .el-switch__label--right span{
    font-size:10px;
}
</style>

