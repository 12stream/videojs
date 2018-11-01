<template>
    <div class="gift">
        <div class="gift-wrap my_list">
            <el-row>
                <el-col class="">
                    <div>
                        <div data-v-8e4fd55c="" class="live-top clear" style="border-top-left-radius: 5px;border-top-right-radius: 5px;">
                            <div class="fl">礼物管理</div>
                            <div class="fr">
                                <el-button class="add_gift" @click="openModify(true,'ruleForm')" type="primary">新增礼物</el-button>
                            </div>
                        </div>
                        <div>
                            <!-- element-loading-text="正在处理..." 
                            v-loading="loading"
                            -->
                            <el-table
                            :data="dataList"
                            border
                            style="margin:0 auto;text-align:center;" >
                                    <!-- <el-table-column
                                        type="index"
                                        label="ID"
                                        class="dataTD"
                                        width="120"
                                        >
                                    </el-table-column> -->                                    
                                    <el-table-column
                                        label="礼物图片"
                                        align="center"
                                        >
                                        <template slot-scope="scope">
                                            <div class="dataImgBody">
                                                <img class="dataImg" :src="scope.row.giftImg">
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="giftName"
                                        label="名称"
                                        align="center"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="giveCurrencyValue"
                                        label="价格"                     
                                        align="center"
                                        >
                                    </el-table-column>
                                    <!-- <el-table-column
                                        prop="giveCurrencyValue2"
                                        label="梦币"
                                        align="center">
                                    </el-table-column> -->
                                    <el-table-column
                                        label="操作"
                                        align="center"
                                        >
                                    <template slot-scope="scope">
                                        <!-- <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button> -->
                                        <!-- <giftstatus :status="scope.row.defaultGift ? true : false"></giftstatus> -->
                                        <div v-if="scope.row.defaultGift != 3">
                                            <!-- <span style="display:none">{{scope.row.defaultGift = scope.row.defaultGift ? true : false }}</span> -->
                                            <span>默认礼物:</span>
                                            <el-switch
                                            v-model="scope.row.defaultGift"
                                            @change="SetDefaultGift(scope.row)"
                                            on-text=""
                                            off-text="">
                                            </el-switch>
                                        </div>
                                        <div v-else>
                                            <span>系统默认礼物</span>
                                        </div>
                                        <el-button class="hover_blue" v-show="scope.row.defaultGift != 3" @click="openModify(false,'ruleForm',scope.row)" type="text" size="small">编辑</el-button>
                                        <el-button class="hover_red" v-show="scope.row.defaultGift != 3" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                                    </template>
                                    </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--  编辑礼物 -->
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="480px"
        class="my_dialog"
        size="tiny"
        :show-close="false"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="90px" class="demo-ruleForm">
                <div class="clear">
                    <el-form-item label="礼物图片" prop="giftImg">
                    <!-- <div class="fl imgMain">
                        <el-input style="display:none" v-model="ruleForm.giftImg"></el-input>
                        <img v-if="ruleForm.giftImg" :src="ruleForm.giftImg" class="avatar">
                        <span v-else class="avatar-uploader-icon">小于2M 仅PNG格式</span>
                    </div> -->
                    <!-- <el-upload
                    class="avatar-uploader fl"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="fileFunc"
                    accept=".png"
                    :before-upload="beforeAvatarUpload">
                        <span class="addGiftFile">选择图片</span>
                    </el-upload> -->

                    <div v-if="ruleForm.giftImg" class="p-r avatarImg">
                            <img :src="ruleForm.giftImg" class="avatar" id="addImg">
                    </div>
                    <div v-if="!ruleForm.giftImg"   class="pre_img">
                        <i  class="el-icon-plus avatar-uploader-icon"></i>
                        <p>大小 : 2M以内</p> 
                        <p>格式 : png、jpg、jpeg</p>
                    </div> 
                    <el-upload
                        class="avatar-uploader fl"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="fileFunc"
                        accept=".jpg, .png, .jpeg"
                        :before-upload="beforeAvatarUpload">
                        <el-button class="btn btn_34 btn_D9" style="width:80px;padding:0">选择图片</el-button> 
                    </el-upload>



                    </el-form-item>
                    <el-form-item label="默认礼物" v-if="ruleForm.defaultGift != 3">
                        <el-switch
                        v-model="ruleForm.defaultGift"
                        @change="defaultGift(ruleForm,true)"
                        on-text=""
                        off-text="">
                        </el-switch>
                    </el-form-item>
                </div>
                <el-form-item label="礼物名称" prop="giftName">
                    <el-input v-model="ruleForm.giftName" class="input_200"></el-input>
                </el-form-item>
                <el-form-item label="礼物价格" prop="giveCurrencyValue" required>
                    <el-input v-model="ruleForm.giveCurrencyValue" class="input_200"></el-input>
                </el-form-item>
                <!-- <el-form-item label="梦币价格" prop="giveCurrencyValue">
                    {{ruleForm.giveCurrencyValue * 10}} -->
                    <!-- <el-input v-model=""></el-input> -->
                <!-- </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm',false)" :disabled="disabled">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 编辑礼物 -->
        <!-- 新增礼物 -->
        <el-dialog
        title="新增礼物"
        :visible.sync="ADDdialogVisible"
        width="480px"
        class="my_dialog"
        size="tiny"
        :show-close="false"
        >
            <el-form :model="ADDruleForm" :rules="ADDrules" ref="ADDruleForm" label-width="90px" class="demo-ruleForm">
                <div class="clear">
                    <el-form-item label="礼物图片" prop="giftImg">                   
                    <div v-if="ADDruleForm.giftImg" class="p-r avatarImg">
                        <img :src="ADDruleForm.giftImg" class="avatar">
                    </div>
                    <div v-if="!ADDruleForm.giftImg"   class="pre_img">
                        <i  class="el-icon-plus avatar-uploader-icon"></i>
                        <p>大小 : 2M以内</p> 
                        <p>格式 : png、jpg、jpeg 尺寸为1:1</p>
                    </div> 
                    <el-upload
                        class="avatar-uploader fl"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="fileFunc2"
                        accept=".jpg, .png, .jpeg"
                        :before-upload="beforeAvatarUpload">
                        <el-button class="btn btn_34 btn_D9" style="width:80px;padding:0">选择图片</el-button> 
                    </el-upload>

                    </el-form-item>
                    <!-- <el-form-item label="默认礼物">
                        <el-switch
                        v-model="ADDruleForm.defaultGift"
                        @change="ADDdefaultGift(ruleForm)"
                        on-text=""
                        off-text="">
                        </el-switch>
                    </el-form-item> -->
                </div>
                <el-form-item label="礼物名称" prop="giftName">
                    <el-input v-model="ADDruleForm.giftName" class="input_200"></el-input>
                </el-form-item>
                <el-form-item label="礼物价格" prop="giveCurrencyValue" required>
                    <el-input v-model="ADDruleForm.giveCurrencyValue" class="input_200"></el-input>
                </el-form-item>
                <!-- <el-form-item label="梦币价格" prop="giveCurrencyValue">
                    {{ADDruleForm.giveCurrencyValue  * 10}} -->
                    <!-- <el-input v-model=""></el-input> -->
                <!-- </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ADDruleForm',true)" :disabled="disabled">确 定</el-button>
                <el-button @click="ADDdialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- end 新增礼物 -->
        
        <!-- <el-dialog
        title="编辑礼物"
        :visible.sync="editModality"
        size="tiny"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="礼物名称" prop="giftName">
                    <el-input v-model="ruleForm.giftName"></el-input>
                </el-form-item>
                <div class="clear">
                    <el-form-item label="礼物图片" prop="imageUrl">
                    <div class="fl imgMain">
                        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                        <span v-else class="avatar-uploader-icon">小于2M PNG格式</span>
                    </div>
                    <el-upload
                    class="avatar-uploader fl"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <span class="addGiftFile">选择图片</span>
                    </el-upload>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="_editModality('ruleForm')">修 改</el-button>
                <el-button @click="editModality = false">取 消</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
    import {ERR_OK, GIFT_URL, DATA_URL, promiseIter,getLStorage} from 'api/config'
    import axios from 'axios'
    import giftstatus from 'components/dataManagement/giftstatus'
    export default{
        data(){
            var giftName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入礼物名称'))
                }
                setTimeout(() => {
                    // let MoneyExp = /^(([1-9][0-9]*))$/
                    // let MoneyExp = /^[0-9]*[0-9][0-9]*$/

                    let MoneyExp = // /^([\u4E00-\u9FFF]|\w){1,5}$/ //可为数字
                    /^[\u4E00-\u9FA5\uf900-\ufa2d]{1,5}$/   // 不可为数字

                    // let MoneyExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                    if (!MoneyExp.test(value)) {
                        callback(new Error('礼物名称仅支持1-5个汉字'))
                    } else {
                        this.disabled = false
                        callback()
                    }
                }, 1000);
            };
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入整数的金额'))
                }
                setTimeout(() => {
                    // let MoneyExp = /^(([1-9][0-9]*))$/
                    // let MoneyExp = /^[0-9]*[0-9][0-9]*$/
                     let MoneyExp = /^[1-9]\d{0,3}$/
                    // let MoneyExp = /^[0-9]+$/
                    // let MoneyExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                    if (!MoneyExp.test(value)) {
                        callback(new Error('请输入1-9999整数的金额'))
                    } else {
                        this.disabled = false
                        callback()
                    }
                }, 1000);
            };
            var checkAge2 = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入整数的金额'))
                }
                setTimeout(() => {
                    // let MoneyExp = /^(([1-9][0-9]*))$/
                    // let MoneyExp = /^[0-9]*[0-9][0-9]*$/
                    let MoneyExp = /^[1-9]\d{0,3}$/
                    // let MoneyExp = /^[0-9]+$/
                    // let MoneyExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                    if (!MoneyExp.test(value)) {
                        callback(new Error('请输入1-9999整数的金额'))
                    } else {
                        this.disabled = false
                        callback()
                    }
                }, 1000);
            };
            return{
                GiftUrl:'',
                switchNum:0,
                // loading:false,
                title:'',
                disabled:false,
                dataList:[],
                scope:[],
                oldImg:'',
                bizCode:'',
                state:false,
                dialogVisible:false,
                ADDdialogVisible:false,
                editModality:false,
                imageUrl: '',
                file:'',
                ADDfile:'',
                // defaultVal:'',
                ruleForm: {
                    defaultGift:'',
                    giftName: '',
                    giftImg: '',
                    giveCurrencyValue:''
                },
                rules: {
                    giftName: [
                        { validator:giftName,trigger: 'blur' },
                        // { min: 1, max: 5, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    // giveCurrencyValue:[{required: true, message: '请输入礼物价格', trigger: 'blur'}],
                    giveCurrencyValue:{validator: checkAge,trigger: 'blur' },
                    giftImg:[{required: true, message: '请上传图片', trigger: 'blur'}]
                    // giftImg:[{required: true, message: '请上传图片', trigger: 'blur'}]
                },
                ADDruleForm: {
                    defaultGift:'',
                    giftName: '',
                    giftImg: '',
                    giveCurrencyValue:''
                },
                ADDrules: {
                    giftName: [
                        { validator:giftName,trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    // giveCurrencyValue:[{required: true, message: '请输入礼物价格', trigger: 'blur'}],
                    giveCurrencyValue:{validator: checkAge2,trigger: 'blur' },
                    giftImg:[{required: true, message: '请上传图片', trigger: 'blur'}]
                    // giftImg:[{required: true, message: '请上传图片', trigger: 'blur'}]
                }
            }
        },
        created(){
            this._getDate()
        },
        methods:{
            defaultGift(data,add){
                return false
                // 设置默认礼物

                // if(data.defaultGift){
                //     data.defaultGift = true
                // }else{
                //     data.defaultGift = false
                // }

                // if(data.defaultGift){
                //     this.switchNum++
                // }else{
                //     this.switchNum--
                // }
                // console.log(data.defaultGift)

                // if(this.switchNum > 4){
                //     console.log('this.switchNum > 4')
                //     data.defaultGift = false
                //     setTimeout(()=>{
                //     },100)
                //     this.switchNum--
                //     // this._getDate()
                //     this.successMessage('默认礼物不能超过四个！','error')
                //     return false
                // }else{
                //     this.switchNum++
                //     // data.defaultGift = true
                // }
                // console.log('this.switchNum',this.switchNum)

                if(this.state){
                    if(data.defaultGift = true){
                        data.defaultGift = true
                    }else{
                        data.defaultGift = false
                    }
                    console.log('add',add)
                    return false
                }
                
                // if(add == 'set'){
                
                    // console.log(data)
                    let url = GIFT_URL + 'service/updateGift.action'
                    let formdata = new FormData()
                    // formdata.append('bizCode',2002)
                    // formdata.append('userID',getLStorage('user_id'))
                    formdata.append('giftID',data.id)
                    formdata.append('defaultGift', data.defaultGift ? 1 : 0)
                    axios({
                        method: 'post',
                        url: url,
                        data: formdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then((res) => {
                        if(res.data.resultCode == '01'){
                            console.log(res.data)
                            this._getDate()
                            if(add == 'set'){
                                this.successMessage(data.defaultGift ? '成功设置默认礼物！' : '取消默认礼物')
                                // return false
                            }else{
                                console.log(add)
                                // this.dialogVisible = false
                                this.successMessage(data.defaultGift ? '成功设置默认礼物！' : '取消默认礼物')
                            }
                        }else if(res.data.resultCode == '05'){
                            data.defaultGift = false
                            this.successMessage('默认礼物不能超过四个！','error')
                            this._getDate()
                            return false
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                // }
            },
            SetDefaultGift(data){
                    let url = GIFT_URL + 'service/updateGift.action'
                    let formdata = new FormData()
                    formdata.append('giftID',data.id)
                    formdata.append('defaultGift', data.defaultGift ? 1 : 0)
                    axios({
                        method: 'post',
                        url: url,
                        data: formdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then((res) => {
                        if(res.data.resultCode == '01'){
                            console.log(res.data)
                            
                            this.successMessage(data.defaultGift ? '成功设置默认礼物！' : '取消默认礼物')
                        }else if(res.data.resultCode == '05'){
                            data.defaultGift = false
                            this.successMessage('默认礼物不能超过四个！','error')
                        }
                        this._getDate()
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                // }
            },
            ADDdefaultGift(data){
                // console.log(data)
                // let url = GIFT_URL + 'service/updateGift.action'
                // let formdata = new FormData()
                // // formdata.append('bizCode',2002)
                // // formdata.append('userID',getLStorage('user_id'))
                // formdata.append('giftID',data.id)
                // formdata.append('defaultGift', data.defaultGift ? 1 : 0)
                // axios({
                //     method: 'post',
                //     url: url,
                //     data: formdata,
                //     headers: {'Content-Type': 'multipart/form-data'}
                // }).then((res) => {
                //     if(res.data.resultCode == '01'){
                //         console.log(res.data)
                //         this._getDate()
                //         if(add == 'set'){
                //             console.log(add)
                //             this.successMessage(data.defaultGift ? '成功设置默认礼物！' : '取消默认礼物')
                //             return false
                //         }else {
                //             this.dialogVisible = false
                //             this.loading = false
                //             this.successMessage(data.defaultGift ? '成功设置默认礼物！' : '取消默认礼物')
                //         }
                //     }else if(res.data.resultCode == '05'){
                //         data.defaultGift = false
                //         this.successMessage('默认礼物不能超过四个！','error')
                //         this._getDate()
                //         return false
                //     }
                // })
                // .catch(function(err){
                //     console.log(err);
                // })
                
            },
            _getDate(){
                // this.switchNum = 0
                let url = GIFT_URL + 'service/queryGift.action'
                // 频道 gift 
                // let url = GIFT_URL + 'service/queryGiftLive.action'
                let formdata = new FormData()
                formdata.append('bizCode',2003)
                formdata.append('userID',getLStorage('user_id'))
                formdata.append('giftIndex',1)
                // formdata.append('appID',3)
                axios({
                    method: 'post',
                    url: url,
                    data: formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res)=>{
                    // console.log('res!!!')
                    if(res.data.resultCode == '01'){
                        this.dataList = res.data.paramo
                        // console.log(this.dataList[0].defaultGift)
                        for(var i = 0;i < this.dataList.length;i++){
                            // if(this.dataList[i].giveCurrencyValue == 0){
                            //     this.dataList[i].giveCurrencyValue = this.dataList[i].giveCurrencyValue2 = '免费'
                            // }else{
                            //     }
                            this.dataList[i].giveCurrencyValue = this.dataList[i].giveCurrencyValue / 10
                            this.dataList[i].giveCurrencyValue2 = this.dataList[i].giveCurrencyValue * 10
                            // this.dataList[i].giveCurrencyValue = this.dataList[i].giveCurrencyValue / 10

                            if(this.dataList[i].defaultGift == 1){
                                // this.switchNum++
                                this.dataList[i].defaultGift = true
                            }else if(this.dataList[i].defaultGift == 0){
                                this.dataList[i].defaultGift = false
                            }else if(this.dataList[i].defaultGift ==3){
                                this.dataList[i].defaultGift = 3
                            }
                        }
                        
                        // console.log('switchNum',this.switchNum)
                        // console.log(this.dataList)
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            handleEdit(scope){
                this.editModality = true
                this.ruleForm.name = scope.giftName
                this.ruleForm.giftImg = scope.giftImg
            },
            handleDelete(scope){
                this.confirmDele(scope)
            },
            confirmDele(scope) {
                this.$confirm('确认删除 "'+ scope.giftName +'" 礼物吗？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'delMessageBox',
                    type: 'warning'
                }).then(() => {
                    // 删除
                    let deleGiftData = new FormData()
                    deleGiftData.append('bizCode',2007)
                    deleGiftData.append('giftID',scope.id)
                    // addImgData.append('userID',getLStorage('user_id'))
                    const deleImgUrl = GIFT_URL + 'service/iBacService.action' 
                    axios({
                        method: 'post',
                        url: deleImgUrl,
                        data: deleGiftData,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then((res) => {
                        if(res.data.resultCode == '01'){
                            this._getDate()
                            // this.dialogVisible = false
                            this.successMessage('删除成功')
                        }
                    })
                    .catch(function(err){
                        this.successMessage('网络异常，请检查网络！','error')
                        console.log(err);
                    })
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch((err)=>{
                    this.successMessage('已取消删除','info')
                        
                })
            },
            // resetForm(formName) {
            //     this.ruleForm = {
            //         giftName: '',
            //         giftImg: ''
            //     }
            //     this.dialogVisible = true
            // },
            openModify(type,formName,scope){
                // console.log('scope',scope)
                this.state = type
                if(type){
                    this.title = '新增礼物'
                    // this.ADDruleForm = {
                    //     giftName: '',
                    //     giftImg: '',
                    //     giveCurrencyValue:''
                    // }
                    
                    this.imageUrl = ''
                    // if(!this.state){
                        // }else{
                    this.bizCode = 2001
                    // this.ruleForm.defaultGift = false
                    // this.defaultVal = false
                    // }
                    this.ADDdialogVisible = true
                }else{
                    console.log('edit')
                    this.bizCode = 2002
                    this.title = '编辑礼物'
                    this.scope = scope
                    this.oldImg = scope.giftImg
                    // this.ruleForm.giftName = this.scope.giftName
                    this.ruleForm.giftImg = this.scope.giftImg
                    // this.ruleForm.defaultGift = this.scope.defaultGift

                    // if(scope.defaultGift == 1){
                    //     scope.defaultGift = true
                    // }else if(scope.defaultGift == 0){
                    //     scope.defaultGift = false
                    // }
                    // else if(scope.defaultGift ==3){
                    //     scope.defaultGift = 3
                    // }
                    
                    // this.defaultVal = scope.defaultGift
                    this.ruleForm = scope
                    console.log(scope)
                    this.dialogVisible = true
                }
            },
            submitForm(formName,isADD) {
                // console.log(this.switchNum,this.switchNum)
                // if(this.switchNum > 4){
                //     this.successMessage('默认礼物不能超过四个！','error')
                //     return false
                // }
                this.disabled = true
                // this.ruleForm.giveCurrencyValue = Number(this.ruleForm.giveCurrencyValue)
                if(!isADD){
                    this.ruleForm.giveCurrencyValue = this.ruleForm.giveCurrencyValue.toString()
                }
                // console.log(typeof this.ruleForm.giveCurrencyValue)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.disabled = true
                        // this.dialogVisible = false
                        //上传图片
                        if(this.oldImg != this.ruleForm.giftImg || isADD){
                            // console.log('图片不一致')
                            let url = DATA_URL + 'mwlive/setup/file_upload.do'
                            let formdata = new FormData()
                            if(isADD){
                                formdata.append('file_data',this.ADDfile)
                            }else{
                                formdata.append('file_data',this.file)
                            }
                            formdata.append('user_id',getLStorage('user_id'))
                            formdata.append('file_type',1)
                            axios({
                                method: 'post',
                                url: url,
                                data:formdata,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res)=>{
                                // console.log('uploadImg',res.data)
                                if(res.data.code == ERR_OK){
                                    // this.ruleForm.giftImg = res.data.data.show_url
                                    if(isADD){
                                        console.log('addGift')
                                        this.ADDruleForm.giftImg = res.data.data.show_url
                                        this.addGift()
                                    }else if(isADD === false){
                                        this.ruleForm.giftImg = res.data.data.show_url
                                        this.editGift()
                                        console.log('editGift')
                                    }

                                    // console.log('res.data.show_url',res.data.data.show_url)
                                    // if(isADD){
                                    //     this.addGift()
                                    // }else{
                                    //     this.editGift()
                                    // }
                                }else{
                                    this.disabled = false
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        }else{
                            this.ruleForm.giftImg = this.ruleForm.giftImg
                            if(isADD){
                                this.addGift()
                            }else{
                                this.editGift()
                            }
                            // this.successMessage('礼物图片上传失败请稍后再试','error')
                        }
                    } else {
                        this.disabled = false
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addGift(isADD){
                // 添加 && 编辑礼物
                // let GiftUrl = GIFT_URL + 'service/iBacService.action'
                let addImgData = new FormData()
                // addImgData.append('bizCode',this.bizCode)
                // addImgData.append('userID',getLStorage('user_id'))
                // addImgData.append('giftImg',this.ruleForm.giftImg)
                // addImgData.append('giftName',this.ruleForm.giftName)
                // addImgData.append('giveCurrencyValue',this.ruleForm.giveCurrencyValue)
                // addImgData.append('receiveCurrencyValue',this.ruleForm.giveCurrencyValue)

                // console.log('this.scope.giftStatus',this.giftType ? 1 : 0)
                
                // if(this.bizCode == 2002){
                //     this.GiftUrl = GIFT_URL + 'service/updateGift.action'
                //     // this.imageUrl = this.ruleForm.giftImg
                //     addImgData.append('giftID',this.scope.id)
                //     // addImgData.append('defaultGift',this.giftType ? 1 : 0)
                // }else if(this.bizCode == 2001){
                //     this.GiftUrl = GIFT_URL + 'service/addGift.action'
                //     // addImgData.append('giveCurrencyID',1)
                //     // addImgData.append('receiveCurrencyID',2)
                //     // addImgData.append('giveCurrencyValue',10)
                //     // addImgData.append('receiveCurrencyValue',10)
                // }

                
                // addImgData.append('giftImg','http://mwdatatest.facebac.com/1/1/0/b3b3dd1c3f4eb1778829/0a3dcfe9-4b7e-409b-a100-92032367e806.jpeg')
                // if(isADD){
                    // add
                    let url = GIFT_URL + 'service/addGift.action'
                    // this.GiftUrl = GIFT_URL + 'service/addGift.action'
                    addImgData.append('userID',getLStorage('user_id'))
                    addImgData.append('giftImg',this.ADDruleForm.giftImg)
                    addImgData.append('giftName',this.ADDruleForm.giftName)
                    addImgData.append('giveCurrencyValue',this.ADDruleForm.giveCurrencyValue * 10)
                    addImgData.append('receiveCurrencyValue',this.ADDruleForm.giveCurrencyValue * 10)
                    addImgData.append('giveCurrencyID',1)
                    addImgData.append('receiveCurrencyID',2)
                    addImgData.append('defaultGift',this.ADDruleForm.defaultGift ? 1 : 0)
                // }else{
                //     this.GiftUrl = GIFT_URL + 'service/updateGift.action'
                //     addImgData.append('giftID',this.ruleForm.id)
                //     addImgData.append('giftImg',this.ruleForm.giftImg)
                //     addImgData.append('giftName',this.ruleForm.giftName)
                //     addImgData.append('giveCurrencyValue',this.ruleForm.giveCurrencyValue)
                //     addImgData.append('receiveCurrencyValue',this.ruleForm.giveCurrencyValue)
                //     addImgData.append('defaultGift',this.ruleForm.defaultGift ? 1 : 0)
                // }
                axios({
                    method: 'post',
                    // url: this.GiftUrl,
                    url: url,
                    data: addImgData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.resultCode == '01'){
                        this.ADDdialogVisible = false
                        this.successMessage(this.state ? '添加成功' : '编辑成功')
                        this._getDate()
                        this.ADDruleForm = {
                            giftName: '',
                            giftImg: '',
                            giveCurrencyValue:'',
                            defaultGift:false
                        }
                    }else if(res.data.resultCode == '05'){
                        this.disabled = false
                        this.successMessage('默认礼物不能超过四个！','error')
                        return false
                    }
                    this.disabled = false
                })
                .catch((err) => {
                    console.log(err)
                    this.disabled = false
                })
                this._getDate()
                
            },
            editGift(isADD){
                let addImgData = new FormData()
                //编辑礼物
                let url = GIFT_URL + 'service/updateGift.action'
                addImgData.append('giftID',this.ruleForm.id)
                addImgData.append('giftImg',this.ruleForm.giftImg)
                addImgData.append('giftName',this.ruleForm.giftName)
                addImgData.append('giveCurrencyValue',this.ruleForm.giveCurrencyValue * 10)
                addImgData.append('receiveCurrencyValue',this.ruleForm.giveCurrencyValue * 10)
                addImgData.append('defaultGift',this.ruleForm.defaultGift ? 1 : 0)
                axios({
                    method: 'post',
                    url: url,
                    data: addImgData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.resultCode == '01'){
                        this.dialogVisible = false
                        this.successMessage(this.state ? '添加成功' : '编辑成功')
                        this._getDate()
                    }else if(res.data.resultCode == '05'){
                        this.disabled = false
                        this.dialogVisible = true
                        this.successMessage('默认礼物不能超过四个！','error')
                        return false
                    }
                    this.disabled = false
                })
                .catch((err) => {
                    console.log(err)
                    this.disabled = false
                })
                this._getDate()
                
            },
            handleAvatarSuccess(res, file) {
                console.log('handleAvatarSuccess',file)
                this.ruleForm.giftImg = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                this.file = file
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传礼物图片只能是 JPG、PNG、JPEG格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            fileFunc(file){
                let _this = this
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传礼物图片格式不对!')
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('上传礼物图片大小不能超过 2MB!')
                    return false
                }
                this.file = file.raw
                this.ruleForm.giftImg = file.url
                var img_url = this.ruleForm.giftImg
                var img = new Image()
                img.src = img_url
                img.onload = function(){
                    if(img.width!= img.height){
                        _this.successMessage('请上传1:1尺寸图片','error')
                        _this.file = ''
                        _this.ruleForm.giftImg = ''
                    }                   
                }
            },
            // 上传图片
            fileFunc2(file){
                let _this = this
                let imgtype = file.raw.type
                const isJPG =  imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg'
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    _this.successMessage('只能是 JPG、PNG、JPEG 格式!','error')
                    return false
                }
                if (!isLt2M) {
                    _this.successMessage('上传礼物图片大小不能超过 2MB!','error')
                    return false
                }
                
                _this.ADDfile = file.raw
                _this.ADDruleForm.giftImg = file.url
                var img_url = _this.ADDruleForm.giftImg
                var img = new Image()
                img.src = img_url
                img.onload = function(){
                    if(img.width!= img.height){
                        _this.successMessage('请上传1:1尺寸图片','error')
                        _this.ADDfile = ''
                        _this.ADDruleForm.giftImg = ''
                    }                   
                }
                
            },
            successMessage(message,type) {
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },
        },
        components:{
            giftstatus,
        },
        computed:{
            ADDDialogVisible(){
                return this.ADDdialogVisible
            },
            EditDialogVisible(){
                return this.dialogVisible
            }
        },
        watch:{
            dataList(val){
                // console.log(val,val)
            },
            ADDDialogVisible(val){
                if(!val){
                    // console.log(val,'ADDdialogVisible')
                    this.ADDruleForm = {
                        defaultGift:'',
                        giftName: '',
                        giftImg: '',
                        giveCurrencyValue:''
                    }
                    
                }
            },
            EditDialogVisible(val){
                if(!val){
                    this._getDate()
                }
            }
        }
        
    }
</script>

<style scoped>
.add_gift{
    font-family: "Microsoft YaHei" ! important;
    position: relative;
    top: -4px;
}
.gift .my_list .el-table td{
    padding:24px 0;
}

.dataImgBody{
    height:85px;
    position:relative;
    padding:10px 0;
}
.dataImg{
    max-width: 85px;
    max-height: 85px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(0,-50%);
    transform: translate(-50%,-50%);
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover{
    border-color: #20a0ff;
}
.avatar-uploader-icon{
    font-size: 12px; 
    color: #8c939d;
    width: 65px;
    height: 65px;
    line-height: 30px;
    text-align: center;
}
.avatar{
    width: 65px;
    height: 65px;
    display: block;
}
.imgMain{
    margin-right:10px;
    width: 65px;
    height: 65px;
}
.addGiftFile{
    border:1px solid #eee;
    padding: 0 6px;
    color:#000;
    border-radius: 2px;
    font-size: 12px;
}
.gift-wrap{
    min-height: 670px;
  
}

.my_dialog .pre_img, .my_dialog .avatar{
    height: 200px;
    width: 200px;
    text-align: center;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    font-size: 12px;
    color: #CCCCCC;
    line-height: 20px;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.my_dialog  .pre_img i:before{
    display:inline-block;
    width:71px;
    height: 64px;
    margin:50px auto 8px auto;
    background: url(../../common/image/icon_img.png) no-repeat;
    content:'';
}
.my_dialog .avatar-uploader {
    height: 34px;
    border-radius: 2px;
    margin: 10px 0 0 60px;
}
.info .my_dialog .el-upload {
    height: 34px;
}
.gift .my_list .live-top{
    padding:0 0 20px 0;
    height:24px;
}
.gift .my_list .live-top div{
     height:24px;
     line-height: 24px;
}
.btn_D9{
    background-color: #D9D9D9;
    border:1px solid #CCCCCC!important;
    color:#333333;
}
.default-bg  .btn.btn_D9:hover{
    color: #fff;
    background-color: #5FAEFF;
    border-color: #5FAEFF!important;
}
</style>
<style>
.gift .gift-wrap .el-table__body-wrapper{
    height:100%;
}
.gift  .el-switch__core:after {   
    top: 2px;
    left: 3px;
}
.gift .el-switch__core{
    border:none;
}
.gift   .el-switch.is-checked .el-switch__core::after{
    margin-left:-19px;
}
.gift .el-form-item.is-required .el-form-item__label:before{
    display:none;
}
.gift  .input_200{
    width:200px;
}
</style>
