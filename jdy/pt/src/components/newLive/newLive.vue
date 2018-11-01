<template>
    <div class="newLive">
        <m-header></m-header>
        <el-row class="w1000 mt20 bg-fff default_shadow">
            <el-col>
                <div class="newList-list">
                    <div class="newList-top pd15">创建直播</div>
                    <el-form ref="form" :rules="rules" :model="form" label-width="88px">
                        <el-row class="pd15 mt20 newList-main">
                            <el-col :span="11" :offset="1">
                                    <el-form-item label="直播标题:" prop="live_name">
                                        <el-input :maxlength="20" v-model="form.live_name" placeholder="请输入直播间标题"></el-input>
                                    </el-form-item>
                                    <el-form-item label="直播简介:" prop="live_text" class="textarea_heigth">
                                        <el-input type="textarea" resize="none" v-model="form.live_text"></el-input>
                                    </el-form-item>
                                    <el-form-item label="直播时间:">
                                        <!-- <el-col :span="11">
                                            <el-form-item>
                                                <el-date-picker :picker-options="pickerOptions1" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col class="line te-c" :span="2">-</el-col>
                                        <el-col :span="11">
                                            <el-form-item>
                                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                            </el-form-item>
                                        </el-col> -->
                                        <el-date-picker
                                        v-model="form.begin_time"
                                        type="datetime"
                                        placeholder="选择直播时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="参与方式:" prop="region">
                                        <el-select style="width:54.3%" v-model="form.region" @change="regionVal" placeholder="公开">
                                            <el-option label="公开" value="open"></el-option>
                                            <el-option label="密码" value="encryption"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item v-if="regionMode" label="直播间密码:" prop="live_permit">
                                        <el-input v-model="form.live_permit" style="width:54.3%"></el-input>
                                    </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-upload
                                    class="avatar-uploader te-c"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :on-change="fileFunc"
                                    accept=".jpg, .png, .jpeg"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="form.live_cover_id" :src="form.live_cover_id" class="avatar">
                                    <div v-else class="uploaderTips">
                                        <i class="el-icon-plus avatar-uploader-icon"></i><br>
                                        <span class="">尺寸1280×720px<br>图片小于2MB（jpg、gif、png）</span>
                                    </div>
                                </el-upload> 
                                 <!-- <el-upload
                                    class="avatar-uploader te-c"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="form.live_cover_id" :src="form.live_cover_id" class="avatar">
                                    <div v-else class="uploaderTips">
                                        <i class="el-icon-plus avatar-uploader-icon"></i><br>
                                        <span class="">尺寸1280×720px<br>图片小于2MB（jpg、gif、png）</span>
                                    </div>
                                </el-upload>  -->
                            </el-col>
                        </el-row>
                        <el-row class="mt20" :span="24">
                            <el-form-item class="te-c">
                                <el-button type="primary" :disabled="disabled" @click="submitForm('form')">创建</el-button>
                                <el-button @click="resetForm">取消</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
    import MHeader from 'components/header/header'
    import {setDate,filterObj,copyData,setDateTime} from 'api/http'
    import axios from 'axios'
    import {ERR_OK, DATA_URL,getLStorage} from 'api/config'
    import LeftNav from 'components/leftnav/leftnav'

    export default{
        data(){
            let validatePass = (rule, value, callback) => {
                let regExp = /^\d{6}$/
                if (this.regionMode && value === '') {
                    callback(new Error('请输直播间密码'))
                }
                setTimeout(() => {
                    if (regExp.test(value) === false) {
                        callback(new Error('6位数字组成'))
                    } else {
                        if (this.form.live_permit !== '') {
                            this.$refs.form.validateField('live_permit')
                        }
                        callback()
                    }
                }, 1000);
            };
            return{
                regionMode:false,
                liveTime:'',
                file:'',
                imgId:'',
                disabled:false,
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                form:{
                    live_name:'',
                    live_text:'',
                    begin_time:'',
                    region:'',
                    live_cover_id:'',
                    live_permit:''
                },
                formData:{},
                rules:{
                    live_name:[
                        {required: true, message: '请输入直播标题', trigger: 'blur' },
                        {min:2,max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    live_text:[
                        // {required:true, message:'请输入直播简介',trigger:'blur'},
                        {min:2,max:200,message:'长度在 2 到 200 个字符',trigger:'blur'}
                    ],
                    region:[
                        {message: '请选择参与方式', trigger: 'change'}
                        // {required: true,message: '请选择参与方式', trigger: 'change'}
                    ],
                    live_permit:[
                        {validator:validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.disabled = true
                        // let obj = filterObj(this.form)
                        let obj = this.form
                        // 格式化日期时间
                        if(obj.begin_time){
                            obj.begin_time = setDateTime(obj.begin_time)
                        }
                        obj.user_id = getLStorage('user_id')
                        // formData 深拷贝后的对象
                        let formData = copyData(obj)
                        // 格式化数据
                        delete formData.region
                        console.log(formData)
                        // console.log(formData)
                        // 上传图片

                        if(formData.live_cover_id){
                            let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
                            let formdata = new FormData()
                            formdata.append('file_data',this.file)
                            formdata.append('user_id',getLStorage('user_id'))
                            formdata.append('file_type',1)
                            axios({
                                method: 'post',
                                url: imgUrl,
                                data:formdata,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res) => {
                                if(res.data.code == ERR_OK){
                                    console.log('img',res);
                                    this.imgId = res.data.data.save_id
                                    // 创建直播
                                    this.subData(formData)
                                    // end 创建直播
                                }
                            })
                            .catch(function(err){
                                this.tipsMessage('上传图片失败!','error')
                                console.log(err);
                            })
                        }else{
                            this.subData(formData)
                        }
                        // end 上传图片

                    } else {
                        this.disabled = false
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            tipsMessage(message,type){
                this.$message({
                    showClose: true,
                    message: message,
                    type: type || 'info'
                })
            },
            subData(formData){
                let dataParams = {
                    user_id:getLStorage('user_id'),
                    live_name:formData.live_name,
                    // live_text:formData.live_text,
                    begin_time:formData.begin_time,
                    live_cover_id:this.imgId,
                    live_permit:formData.live_permit,
                    live_text_imgs:[]
                    
                    // live_text_imgsid:this.imgId
                }
                dataParams.live_text_imgs = [{
                        "img_id":"",
                        "img_url":"",
                        "contentDesc":formData.live_text
                }]
                dataParams.live_text_imgs =  JSON.stringify(dataParams.live_text_imgs)
                console.log('dataParams',dataParams,this.imgId)
                // 过滤空参数
                // console.log(filterObj(dataParams))
                // let formdata = new FormData()
                // formdata.append('user_id',getLStorage('user_id'))
                // formdata.append('live_name',formData.live_name)
                // formdata.append('live_text',formData.live_text)
                // formdata.append('begin_time',formData.begin_time)
                axios({
                    method: 'post',
                    url: DATA_URL + 'mwlive/live/create.do',
                    params: filterObj(dataParams)
                })
                .then((response) => {
                    if(response.data.code == ERR_OK){
                        this.disabled = false
                        this.tipsMessage('创建成功!','success')
                        console.log(response)
                        this.$router.push({
                            path:'/main'
                        })
                    }
                }).catch((err)=>{
                    this.tipsMessage('创建失败!','error')
                    console.log(err);
                })
            },
            resetForm(){
                this.$router.push({
                    path:'/main'
                })
            },
            regionVal(){
                if(this.form.region === 'encryption'){
                    this.regionMode = true;
                }else{
                    this.regionMode = false;
                }
            },
            // image upload
            handleAvatarSuccess(res, file) {
                this.form.live_cover_id = URL.createObjectURL(file.raw);
                // 图片 url
                // console.log(this.form.live_cover_id);
            },
            fileFunc(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                // const isJPG = file.type === 'image/jpeg';
                // const isPNG = file.type === 'image/png';
                // const isGIF = file.type === 'image/gif';
                // const isJPEG = file.type === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isJPG) {
                if (!isJPG) {
                    this.tipsMessage('上传头像图片只能是 JPG、PNG、JPEG!','error')
                    // this.$message.error('上传头像图片只能是 JPG、PNG、JPEG、GIF 格式!')
                    return false
                }
                if (!isLt2M) {
                    this.tipsMessage('上传头像图片大小不能超过 2MB!','error')
                    // this.$message.error('上传头像图片大小不能超过 2MB!')
                    return false
                }
                this.file = file.raw
                this.form.live_cover_id = file.url
                console.log('fileFunc',file)
                // return isJPG && isLt2M;
            },
            beforeAvatarUpload(file) {
                console.log(file)
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
            }
        },
        components:{
            MHeader,
            LeftNav
        }
    }
</script>

<style scoped>
.default_shadow{
box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.02) 
}
.newList-top{
    border-bottom:1px solid #eaeaea;
    font-size: 16px;
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
    width:390px;
    border: 1px dashed #d9d9d9; 
    text-align: center;
    margin-left: 30px;
    background: #f1f5f9;
    padding:35px 0;
}
.avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    text-align: center;
    padding: 15px;
    border-radius: 40px;
    margin-bottom: 20px;
    border: 1px dashed #aaaaaa;
}
.uploaderTips span{
      font-size:12px;
      color:#888;
      line-height: 20px;
      letter-spacing: 1px;
}
.avatar {
    width: 480px;
    height: 270px;
    display: block;
}
.newList-main{
    border-bottom:1px solid #eaeaea;
}
</style>
<<style>
.textarea_heigth .el-textarea__inner{
    height:180px
}
</style>
