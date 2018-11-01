<template>
    <div id="whitelist" style="min-height:699px;">
        <div class="live-top bg-fff clear">
            <div class="fl">
                名单管理
            </div>
        </div>
        <div class="bg-fff info-content">
            <div style="margin-bottom:20px;">
                <el-upload
                    style="display: inline-block;"
                    class="cur-p"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="changeXls"
                    accept=".xls, .xlsx"
                    v-model="fileXls"

                    >
                    <el-button class="bgc_txt  btn_30 white_btn1" style="margin-left:0;"  type="primary">重新导入</el-button>
                </el-upload>
                <el-button class="bgc_txt  btn_30 white_btn1" type="primary" @click="DownLoadModel()">
                     下载模板
                </el-button>
                <div class="fr">
                    <el-button class="bgc_txt  btn_30" @click="openModify(true,'ruleForm')" type="primary">新增用户</el-button>
                </div>
            </div>
            <el-table
            :data="tableData"
            v-if="isData"
            style="margin:0 auto;height:100%;text-align:center;" height="529">
                <el-table-column
                type="index"
                :index="indexMethod"
                width="200%"
                label="序号"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名"
                    width="200%"
                >
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号"
                    width="220%"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    >
                <template slot-scope="scope">
                    <el-button class="hover_blue"  @click="openModify(false,'ruleForm',scope.row)" type="text" size="small">编辑</el-button>
                    <el-button class="hover_red"  @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if="isData"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page_index"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page_size"
                layout="prev, pager, next"
                :total="total"
                background>
            </el-pagination>
        </div>
        <!-- 新增 -->
        <el-dialog
            title="新增用户"
            :visible.sync="dialogVisibleAdd"
            width="371px"
            class="my_dialog no_border AddNewModal"
            :show-close="false"
            >
            <el-form :model="ruleFormAdd"  ref="ruleFormAdd"  label-position="right" label-width="80px" class="AddNewStyle" >
                <el-form-item label="用户名 :"  prop="name" label-width="72px">
                    <el-input class="input_200" v-model="ruleFormAdd.name" ></el-input>
                </el-form-item>
                <el-form-item label="手机号 :" prop="phone"  label-width="72px"
                :rules="[
                            { pattern: /^[1][345789]\d{9}$/, message: '请输入正确的手机号',trigger: 'blur' }
                        ]">
                    <el-input class="input_200" v-model="ruleFormAdd.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleFormAdd',false)" :disabled="disabledAdd">确 定</el-button>
                <el-button @click="dialogVisibleAdd = false">取 消</el-button>

            </span>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog
            title="编辑"
            :visible.sync="dialogVisibleEdi"
            width="370px"
            :show-close="false"
            class="my_dialog no_border"
            :before-close="closeChangeMachie"
            >
            <el-form :model="ruleFormEdit"  ref="ruleFormEdit"  label-position="right">
                <el-form-item label="用户名 :"  prop="name">
                    <el-input class="input_200" v-model="ruleFormEdit.name" ></el-input>
                </el-form-item>
                <el-form-item label="手机号 :" prop="phone"
                :rules="[
                        { pattern: /^[1][345789]\d{9}$/, message: '请输入正确的手机号',trigger: 'blur' }

                        ]">
                     <el-input class="input_200" v-model="ruleFormEdit.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleFormEdit',false)" :disabled="disabled">确 定</el-button>

                <el-button @click="cancelEdit('ruleFormEdit')">取 消</el-button>
            </span>
        </el-dialog>
         <!-- <el-dialog
                title="提示"
                :visible.sync="DownldialogVisible"
                width="360px"
                height="196px"
                class="my_dialog confirm_dialog"
                size="tiny"
                :show-close="false"
                >
                <span>是否要下载该模板？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="DownLoad">确 定</el-button>
                    <el-button @click="DownldialogVisible = false">取 消</el-button>
                </span>
                </el-dialog> -->
        <div v-if="!isData"  class="no_white">
                <div class="no_data"></div>
                <div class="tip_no_data">
                <span class="default-color">当前无任何专属用户，请导入专属用户名单！</span>
            </div>
        </div>
    </div>
</template>
<style scope>
.default-bg .btn_30 a{
    color:#fff!important;
}
#whitelist .no_white{
text-align: center;
margin:0 auto;
vertical-align: middle;
margin-top:124px;
}
#whitelist .no_data{
width:173px;
height:144px;
background: url(../../common/image/img_Load.png) no-repeat;
margin:0 auto;
margin-bottom: 20px;
}
#whitelist .white_btn1{
width:80px;
height:30px;
background:rgba(242,242,242,1);
border-radius: 2px ;
font-size:12px;
color:rgba(51,51,51,1);
line-height:17px;
}
#whitelist tbody tr td{
padding-top: 7px;
padding-bottom: 6px;
}
#whitelist .AddNewStyle{
    padding: 0px;
}
#whitelist .AddNewModal .el-dialog{
    height:273px;
}
#whitelist .el-dialog__body{
    padding: 0px;
    padding-top: 24px;
}
#whitelist  .input_200{
    width:240px;
}
#whitelist .AddNewModal button{
    width: 100px;
    height: 34px;
    line-height:30px;
}
</style>
<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,PAGE_SIZE} from 'api/config'
    import axios from 'axios'
    import {setDate} from 'api/http'
    export default{
        data() {
            return {
                page_index:1,
                page_size:10,
                tableData: [],
                isData:false,
                DownldialogVisible:false,
                total:1,
                ruleFormAdd:{
                    name:'',
                    phone: '',
                    live_id:'',
                },
                ruleForm: {
                    name:'',
                    phone: '',
                    id:'',
                    live_id:''
                },
              ruleFormEdit: {
                  name:'',
                  phone: '',
                  id:'',
                  live_id:''
                },
                liveId:'',
                scope:[],
                dialogVisibleAdd:false,
                dialogVisibleEdi:false,
                disabled:false,
                disabledAdd:false,
                isAdd:true,
                file:'',
                fileXls:'',
                fileName: '',
                xlsInput:'',
                // rules: {
                //     name: [
                //         { required: true, message: '请输入用户名', trigger: 'blur' },
                //         { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                //     ],
                //     phone: [
                //         { required: true, message: '请输入手机号', trigger: 'blur' },
                //         { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                //     ],
                // },
            }
        },
        created(){
            this.getDataList()
        },
        methods:{
            indexMethod(index) {
                return index + (this.page_index - 1) * 10 + 1;
            },
            handleSizeChange: function (size) {
                this.page_size = size;
            },
            handleCurrentChange: function(currentPage){
                this.page_index = currentPage;
            },
            getDataList(val){
                this.liveId = getLStorage("liveID")
                let url = DATA_URL + 'mwlive/user/select_whiteListPage.do'
                let formdata = new FormData()
                formdata.append('live_id',this.liveId)
                formdata.append('page_size',this.page_size)
                if(val){
                    formdata.append('page_index',val)
                }else{
                    formdata.append('page_index',1)
                }
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        if(res.data.data.data_list){
                            this.isData = true
                            this.tableData = res.data.data.data_list
                            this.total = parseInt(res.data.data.page.total)
                        }
                        if(!res.data.data.data_list){
                            this.isData = false
                        }

                    }
                    // this.tableData = res.data.data
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 打开模态框
            openModify(type,formName,scope){
              //console.log(scope,888);
                // 新增
                if(type){
                    this.dialogVisibleAdd = true
                    this.ruleFormAdd.name ='';
                    this.ruleFormAdd.phone = '';
                }else{
                    this.scope = scope
                  //console.log(this.scope,777);
                    this.ruleFormEdit.name = this.scope.name
                    this.ruleFormEdit.phone = this.scope.phone
                    this.ruleFormEdit.id = this.scope.id
                    this.ruleFormEdit.live_id = this.scope.live_id
                    //this.ruleFormEdit = scope //实时绑定
                    this.dialogVisibleEdi = true
                }
            },
          cancelEdit(formName){
           this.dialogVisibleEdi = false
            this.$refs[formName].resetFields();
          },
            submitForm(formName,isAdd) {
                this.$refs[formName].validate((valid) => {
                    let _this = this
                    if (valid) {
                        //编辑
                        if( formName == 'ruleFormEdit'){
                            let formData = new FormData()
                            let url = DATA_URL + 'mwlive/user/update_whiteList.do'
                            formData.append('id',this.ruleFormEdit.id)
                            formData.append('live_id',_this.liveId)
                            formData.append('name',this.ruleFormEdit.name)
                            formData.append('phone',this.ruleFormEdit.phone)
                            this.disabled = true
                            axios({
                                method: 'post',
                                url: url,
                                data: formData,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res) => {
                                if(res.data.code == ERR_OK ){
                                    _this.successMessage('修改成功')
                                }else{
                                    _this.successMessage('修改失败','error')
                                }
                                _this.disabled = false
                                _this.dialogVisibleEdi = false
                                _this.getDataList()
                            })
                            .catch((err) => {
                                _this.disabled = false
                            })

                        }else{
                            //新增
                            let formData = new FormData()
                            let url = DATA_URL + 'mwlive/user/add_whiteList.do'
                            formData.append('live_id',_this.liveId)
                            formData.append('name',this.ruleFormAdd.name)
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
                                _this.getDataList()
                                _this.disabledAdd = false
                                _this.dialogVisibleAdd = false
                            })
                            .catch((err) => {
                                this.disabledAdd = false
                            })
                        }
                    }else {
                        // this.disabled = false
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            handleDelete(scope){
                this.confirmDele(scope)
            },
            confirmDele(scope) {
                this.$confirm('确认删除吗？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'delMessageBox',
                    type: 'warning'
                }).then(() => {
                    let deletData = new FormData()
                    deletData.append('id',scope.id)
                    let url = DATA_URL + 'mwlive/user/delete_WhiteList.do'
                    axios({
                        method: 'post',
                        url: url,
                        data: deletData,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then((res) => {
                        if(res.data.code == ERR_OK){
                            this.getDataList()
                            this.successMessage('删除成功')
                        }else{
                            this.successMessage('网络异常，请检查网络！','error')
                        }
                    })
                    .catch(function(err){
                        this.successMessage('网络异常，请检查网络！','error')
                    })
                }).catch((err)=>{
                    this.successMessage('已取消删除','info')

                })
            },
            changeXls(file,fileList){
                //保存导入表格数据fileXls
                let _this = this;
                var fileName = file.raw.name
                var index = fileName.lastIndexOf('.')
                var suffix = fileName.substr(index)
                if(suffix!='.xls'&&suffix!='.xlsx'){
                    return false
                    _this.successMessage('导入名单格式有误，请下载模板重新导入','error')
                    _this.fileName = "";

                }else{
                    _this.white_list = true
                    _this.fileName = fileName.replace(/^(^.{18})(.+)(.{4}\.+\w+$)$/g, "$1...$3");
                    _this.fileXls = file.raw
                    _this.importfPhone()
                }
            },
            importfPhone(obj) {
                let _this = this
                var form = new FormData()
                form.append('excelFile',_this.fileXls)
                axios.post(DATA_URL + 'mwlive/user/import_WhiteList.do?live_id='+_this.liveId+'&reimport=1', form, {
                    headers: {
                    "Content-Type": "multipart/form-data"
                    }
                })
                .then((res) => {
                    if(res.data.code == ERR_OK ){
                        _this.successMessage('导入成功!','success')
                        _this.getDataList()
                    }else{
                        _this.fileName = "";
                        _this.successMessage('导入失败!','error')
                    }

                }).catch(function(err){
                    _this.fileName = "";
                    _this.tipsMessage('导入失败!','error')
                })
            },
            successMessage(message,type) {
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },
            closeChangeMachie(done){
                done();
                window.location.reload();
            },
            //确认是否下载模板
            DownLoadModel(){
                this.$confirm('是否要下载该模板？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'delMessageBox',
                    type: 'warning'
                }).then(() => {
                    let deletData = new FormData()
                    window.open('http://mwdatatest.facebac.com/white/white.xls')

                }).catch((err)=>{
                    this.successMessage('已取消下载','info')

                })
            }
        }
    }
</script>

