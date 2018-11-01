<template>
    <div class="editLive">
        <div class="editLive-main">
            <div class="editLive-title but-col te-c col-fff">编辑直播信息<i @click="cancel()" class="el-icon el-icon-close" style="float:right;margin-top:13px;margin-right:13px;cursor: pointer;"></i></div>
            <div class="editlive-info mt20">
                <el-form ref="form" :rules="rules" :model="form" label-width="88px">
                    <el-row>
                        <el-col :span="16" :offset="4">
                                <el-form-item label="直播标题:" prop="live_name">
                                    <el-input v-model="form.live_name" maxlength="20"></el-input>
                                </el-form-item>
                                 <el-form-item label="直播简介:">
                                    <el-input type="textarea" resize="none" v-model="form.live_text"></el-input>
                                </el-form-item>
                                 <el-form-item label="直播封面:" class="">
                                    <img v-if="form.live_cover_url" :src="form.live_cover_url" class="avatar fl mr10">
                                    <el-upload
                                        class="avatar-uploader te-c fl"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :auto-upload="false"
                                        :on-change="fileFunc"
                                        accept=".jpg, .png, .jpeg"
                                        :before-upload="beforeAvatarUpload">
                                        <div class="uploaderTips">
                                            <i class="el-icon-plus avatar-uploader-icon"></i><br>
                                        </div>
                                        <!-- <div v-if="form.live_cover_url" class="uploaderTips">
                                            <i class="el-icon-plus avatar-uploader-icon"></i><br>
                                        </div> -->
                                    </el-upload>
                                </el-form-item> 
                                <el-form-item label="直播时间:">
                                    <el-date-picker
                                    v-model="form.begin_time"
                                    type="datetime"
                                    placeholder="选择直播时间">
                                    </el-date-picker>
                                    <!-- <el-col :span="11">
                                        <el-form-item>
                                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="2">-</el-col>
                                    <el-col :span="11">
                                        <el-form-item>
                                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                        </el-form-item>
                                    </el-col> -->
                                </el-form-item>

                                <!-- <el-form-item label="参与方式:" prop="live_permit">
                                    <el-select style="width:100%" v-model="form.live_permit" @change="regionVal" placeholder="公开">
                                        <el-option label="公开" value="0"></el-option>
                                        <el-option label="密码" value="1"></el-option>
                                    </el-select>
                                </el-form-item> -->

                                <el-form-item label="观看权限:" prop="live_permit" class="souquan_way">
                                    <el-radio class="radio" v-model="form.live_permit" label="0">公开</el-radio>
                                    <el-radio class="radio" v-model="form.live_permit" label="1">密码</el-radio>
                                </el-form-item>
                                
                                <el-form-item v-show="regionMode" label="直播间密码:" prop="view_pass">
                                    <el-input v-model="form.view_pass"></el-input>
                                </el-form-item>
                        </el-col>
                        <!-- <el-col :span="10">
                            
                        </el-col> -->
                    </el-row>
                    <el-row  :span="24" class="choice_btn">
                        <el-form-item class="te-c">
                            <el-button @click="cancel()">取消</el-button>
                            <el-button type="primary" @click="submitForm('form')" :disabled="disabled">确定</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {filterObj,copyData,setDate,setDateTime} from 'api/http'
    import {ERR_OK,DATA_URL,getLStorage} from 'api/config'
    export default{
        // props:['isShow'],
        props:{
            isShow:{
                type:Boolean,
                default:true
            },
            editData:{
                type:Object,
                default:{}
            }
        },
        data(){
            let validatePass = (rule, value, callback) => {
                this.disabled = true
                let regExp = /^\d{6}$/
                // if (this.regionMode && value === '') {
                //     callback(new Error('请输直播间密码'))
                // }
                setTimeout(() => {
                    if (this.regionMode && regExp.test(value) === false) {
                        callback(new Error('6位数字组成'))
                    } else {
                        if (this.form.view_pass !== '') {
                            this.$refs.form.validateField('view_pass')
                        }
                        this.disabled = false
                        callback()
                    }
                }, 1000);
            };
            return{
                live_cover_id:'',
                // liveTime:'',
                disabled:false,
                regionMode:false,
                oldImg:'',
                file:'',
                form:{
                    live_permit:'',
                    live_name:'',
                    live_text:'',
                    begin_time:'',
                    live_cover_id:'',
                    view_pass:''
                    // view_pass:''
                },
                formData:{},
                handleData:{},
                rules:{
                    live_name:[
                        {required: true, message: '请输入直播标题', trigger: 'blur' },
                        {min:2,max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    // live_text:[
                    //     {required:true, message:'请输入直播简介',trigger:'blur'},
                    //     {min:2,max:200,message:'长度在 2 到 200 个字符',trigger:'blur'}
                    // ],
                    // date1:[
                    //     {type:'date',message:'请选择日期',trigger: 'change'}
                    // ],
                    // date2:[
                    //     {type:'date',message:'请选择时间',trigger: 'change'}
                    // ],
                    // date1:[
                    //     {type:'date',required:true,message:'请选择日期',trigger: 'change'}
                    // ],
                    // date2:[
                    //     {type:'date',required:true,message:'请选择时间',trigger: 'change'}
                    // ],
                    region:[
                        { message: '请选择观看权限', trigger: 'change'}
                    ],
                    view_pass:[
                        {validator:validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.disabled = true
                        // let obj = filterObj(this.form)
                        // 格式化日期时间
                        // if(obj.date1){
                        //     obj.begin_time = setDate(obj.date1,obj.date2)
                        // }
                        // formData 深拷贝后的对象
                        // let formData = copyData(obj)
                        // 格式化数据
                        // if(this.handleData.begin_time){

                        // }
                        // formData.user_id = getLStorage('user_id')
                        // delete formData.date1
                        // delete formData.date2
                        // delete formData.region
                        // delete formData.create_time

                        // 上传图片
                        //上传图片
                        if(this.oldImg != this.form.live_cover_url){
                            console.log('图片不一致')
                            let url = DATA_URL + 'mwlive/setup/file_upload.do'
                            let formdata = new FormData()
                            formdata.append('file_data',this.file)
                            formdata.append('user_id',getLStorage('user_id'))
                            formdata.append('file_type',1)
                            axios({
                                method: 'post',
                                url: url,
                                data:formdata,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res)=>{
                                if(res.data.code == ERR_OK){
                                    console.log(res.data.data)
                                    this.live_cover_id = res.data.data.save_id
                                    console.log('ajax',res.data.data.save_id)
                                    this.subData()
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        }else{
                            this.subData()
                        }
                        // else{
                        //     console.log('true')
                        //     this.live_cover_url = this.form.live_cover_url
                        //     this.addGift()
                        // }
                        // 上传图片
                        // if(formData.live_cover_id){
                        //     console.log('live_cover_id: '+formData.live_cover_id)
                        //     axios({
                        //         method: 'post',
                        //         url: DATA_URL + 'mwlive/setup/file_upload.do',
                        //         params: {
                        //             user_id:getLStorage('user_id'),
                        //             file_data:formData.live_cover_id,
                        //             file_type:1,
                        //             biz_type:2
                        //         }
                        //     })
                        //     .then(function(response){
                        //         console.log(response)
                        //         if(response.data.code == ERR_OK){
                        //             console.log(response);
                        //         }
                        //     }).catch(function(err){
                        //         console.log(err);
                        //     })
                        // }
                        // end 上传图片

                        // 创建直播
                        // axios({
                        //     method: 'get',
                        //     url: 'http://mwlivetest.facebac.com/api/mwlive/live/edit_info.do',
                        //     params: formData
                        //     // {
                        //     //     user_id:getLStorage('user_id'),
                        //     //     live_name:formData.live_name,
                        //     //     live_text:formData.live_text,
                        //     //     begin_time:formData.begin_time
                        //     // }
                        // })
                        // .then(function(response){
                        //     console.log(response)
                        //     if(response.data.code == ERR_OK){
                        //         console.log(response);
                        //     }
                        // }).catch(function(err){
                        //     console.log(err);
                        // })
                        // end 编辑直播
                    } else {
                        this.disabled = false
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            subData(){
                // 观看权限修改
                // let url = DATA_URL + 'mwlive/live/livepermit.do'
                // let livepermit = new FormData()
                // livepermit.append('id',this.form.id)
                // livepermit.append('user_id',getLStorage('user_id'))
                // livepermit.append('live_permit',this.form.live_permit)
                // if(this.form.live_permit == 1){
                //     livepermit.append('view_pass',this.form.view_pass)
                // }
                // axios({
                //     method: 'post',
                //     url: url,
                //     data:livepermit,
                //     headers: {'Content-Type': 'multipart/form-data'}
                // }).then((res)=>{
                //     if(res.data.code == ERR_OK){
                        
                //     }
                // })
                // .catch(function(err){
                //     console.log(err);
                // })
                // 观看权限修改

                let formData = {
                    user_id:getLStorage('user_id'),
                    id:this.form.id,
                    live_name:this.form.live_name,
                    live_text:this.form.live_text,
                    live_cover_id:this.live_cover_id,
                    live_permit:this.form.live_permit
                }
                if(this.form.live_permit == 1){
                    formData.view_pass = this.form.view_pass
                }else{
                    formData.view_pass = ''
                }
                formData.live_cover_id = this.live_cover_id
                if(this.form.begin_time){
                    formData.begin_time = setDateTime(this.form.begin_time)
                }
                console.log('live_cover_id',this.live_cover_id)
                console.log(formData)
                axios.get(DATA_URL + 'mwlive/live/edit_info.do',{params: filterObj(formData)})
                .then((response)=>{
                    console.log(response)
                    if(response.data.code == ERR_OK){
                        this.disabled = false
                        this.$emit('refresh')
                        this.$emit('isShow',false)
                        this.$emit('getEditData')
                        this.tipsMessage('编辑成功','success')
                    }
                })
                .catch(function(err){
                    this.disabled = false
                    console.log(err);
                });
            },
            tipsMessage(message,type){
                this.$message({
                    closeShow:true,
                    message: message,
                    type: type || 'info'
                })
            },
            cancel(){
                this.$emit('isShow',false)
                // this.$refs[formName].resetFields()
            },
            handleAvatarSuccess(res, file) {
                this.form.live_cover_url = URL.createObjectURL(file.raw);
                // 图片 url
                // console.log(this.form.live_cover_id);
            },
            beforeAvatarUpload(file) {
                this.file = file
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG、PNG、JPEG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            fileFunc(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.tipsMessage('上传头像图片只能是 JPG、PNG、JPEG 格式!','error')
                    return false
                }
                if (!isLt2M) {
                    this.tipsMessage('上传头像图片大小不能超过 2MB!','error')
                    return false
                }
                this.file = file.raw
                this.form.live_cover_url = file.url
                console.log('fileFunc',file)
            },
            regionVal(){
                this.regionMode = true
                if(this.form.live_permit == 1){
                }else{
                    this.regionMode = false
                }
            }
        },
        watch:{
            // 'editData':function(val,oldval){
            //     console.log(editData)
            // }
            editData(val) {
                this.handleData = val
                // this.form = this.handleData

                this.form.id = this.handleData.id
                // this.form.live_name = this.handleData.live_name
                // this.form.live_text = this.handleData.live_text
                // this.form.live_cover_id = this.oldImg = this.handleData.live_cover_url
                // this.form.begin_time = this.handleData.begin_time
                
                // console.log(val)
                console.log('valval',val)
                let url = DATA_URL + 'mwlive/live/get_info.do'
                let formdata = new FormData()
                formdata.append('id', this.form.id)
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res)=>{
                    if(res.data.code == ERR_OK){
                        console.log('editData',res)
                        this.oldImg = res.data.data.live_cover_url
                        
                        this.form = res.data.data
                        
                        // if(this.form.view_pass){
                        //     this.form.live_permit = 1
                            
                        //     console.log(this.form.view_pass)
                        // }
                        // if(this.form.live_permit == 1){
                        //     console.log(123)
                        //     this.regionMode = true
                        //     this.form.live_permit = '密码'
                        //     this.form.view_pass = this.form.view_pass
                        // }else{
                        //     console.log(321)
                        //     this.form.live_permit = '公开'
                        // }
                        this.form.live_permit = this.form.live_permit.toString()
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
            },
            live_permit(val){
                // console.log(val)
                if(val == 1){
                    this.regionMode = true
                }else{
                    this.regionMode = false
                }
            }
        },
        computed: {
            live_permit() {
        　　　　return this.form.live_permit
        　　}
        }
    }
</script>
<style>
.choice_btn{
    width: 100%;
    height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #e5e5e5;
}
.choice_btn .te-c .el-form-item__content{
    margin-left: 380px !important;
    margin-top: 12px;
}
</style>

<style scoped>
.editLive{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgba(0,0,0,0.7);
    display:none; 
}
.editLive-main{
    position: fixed;
    top: 50%;
    left: 50%;
    width:550px;
    height:58%;
    background:#fff;
    transform: translate(-50%, -50%);
}
.editLive-title{
    line-height:40px;
    text-align: left !important;
    padding-left:25px;
}

.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.el-textarea__inner{
    resize:none;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.uploaderTips{
    width:50px;
    height:50px;
    border: 1px solid #d9d9d9; 
    line-height:50px;
}
.avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    text-align: center;
}
.avatar {
    width: 50px;
    height: 50px;
    display: block;
}

</style>
