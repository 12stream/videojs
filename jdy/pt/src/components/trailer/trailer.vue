<template>
    <div class="trailer">
        <!-- <m-header></m-header> -->
        <div class="pd10 live-top">直播预告</div>
        <el-row>
            <!-- <el-col :span="3">
                <left-nav></left-nav>
            </el-col> -->
            <el-col :span="24" style="border-bottom:1px solid #d9d9d9;">
                <el-form ref="form" :rules="rules" :model="form" label-width="125px">
                    <el-row>
                        <el-col :span="12" class="trailer-left">
                            <el-form-item label="直播预告图：" class="trailer_pic" prop="live_before_type" required>
                                <el-switch on-text="" off-text="" v-model="form.live_before_type"></el-switch>
                            </el-form-item>
                            <div style="padding-left:36px;color:#a7a8a9;">注：此图片显示在进入直播页面之前，用于展示直播相关介绍内容</div>
                            <!-- <el-upload
                                class="avatar-uploader mt10"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="fileFunc"
                                :before-upload="beforeAvatarUpload">
                                <div class="uploaderTips">
                                    <i class="el-icon-plus avatar-uploader-icon"></i><br>
                                    <span class=""><br>尺寸1280×720px<br>图片小于2MB（jpg、gif、png）</span>
                                </div>
                                <div v-if="imageUrl" class="mt20">点击图片替换</div>
                            </el-upload> -->
                            <el-col :span="22" class="preview-img clear  p-r">
                                <div class="fl">
                                    <!-- <el-upload class="upload-demo"
                                        list-type="picture-card" 
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :before-upload="beforeAvatarUpload"
                                        :on-change="fileFunc"
                                        accept=".jpg, .png,.jpeg"
                                        :auto-upload="false"
                                        > -->
                                        <el-upload class="upload-demo" list-type="picture-card" 
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :auto-upload="false"
                                        :on-change="fileFunc"
                                        accept=".jpg, .png,.jpeg"
                                        :before-upload="beforeAvatarUpload">
                                        <span class="cur-p icon iconfont icon-juanlouqu"></span>
                                        上传
                                    </el-upload>
                                </div>
                                    <div v-show="imgIsShow" class="el-form-item__error" style="top:70%;">请选择上传LOGO</div>
                                <div class="trailer_promptPic fl">
                                    图片大小4M以内，建议分辨率1080*1740像素支持PNG、JPG、JPEG格式
                                </div>
                                
                            </el-col>
                            <el-form-item class="mt10 trailer_pic" label="直播倒计时：">
                                <el-switch on-text="" off-text="" v-model="form.begin_time_tag"></el-switch>
                            </el-form-item>
                            <el-row>
                                <el-col :span="22">
                                    <el-form-item label="直播提示文字：" class="trailer_words trailer_prompt">
                                        <el-input v-model="form.begin_time_text"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="直播开始时间：" class="trailer_words" prop="begin_time">
                                <el-date-picker
                                v-model="form.begin_time"
                                type="datetime"
                                placeholder="选择直播时间">
                                </el-date-picker>
                                <!-- <el-col :span="10">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line te-c" :span="1">-</el-col>
                                <el-col :span="10">
                                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                </el-col> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="trailer-right">
                            <span>预览：</span>
                            <img v-if="form.live_before_url" :src="form.live_before_url" class="avatar">
                        </el-col>
                    </el-row>
                </el-form>

                <!-- <div class="pd10" style="background:#eaeaea;line-height:40px;">直播背景</div>
                <div class="pd10">
                    <el-row>
                        <el-col :span="2" class="te-r">
                            预览:
                        </el-col>
                        <el-col :span="22" class="preview-img">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <div v-else class="uploaderTips">
                                    <i class="el-icon-plus avatar-uploader-icon"></i><br>
                                    <span class="">尺寸1280×720px<br>图片小于2MB（jpg、gif、png）</span>
                                </div>
                                <div v-if="imageUrl" class="mt20">点击图片替换</div>
                            </el-upload>
                        </el-col>
                        
                    </el-row>
                </div> -->
            </el-col>
        </el-row>
        <div class="te-c mt20 pb30">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </div>
    </div>
</template>

<script>
    import MHeader from 'components/header/header'
    import LeftNav from 'components/leftnav/leftnav'
    import {setDate,filterObj,setDateTime} from 'api/http'
    import {DATA_URL,ERR_OK,getLStorage} from 'api/config'
    
    import axios from 'axios'
    export default{
        data() {
            let validateType = (rule, value, callback) => {
                if (!this.form.live_before_type) {
                    callback(new Error('请选择直播预告图'))
                }
                callback()
            }
            let validateTime = (rule, value, callback) => {
                if (!this.form.begin_time) {
                    callback(new Error('请选择直播预告图'))
                }
                callback()
            }
            return {
                // trailerLoading:true,
                fileImg:'',
                imageUrl: '',
                oldImg:'',
                imgIsShow:'',
                form: {
                    begin_time_text: '',
                    live_before_url:'',
                    begin_time:'',
                    begin_time_tag:false,
                    live_before_type:false,
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules:{
                    live_before_type:[
                        {validator:validateType,trigger: 'blur'}
                    ],
                    begin_time:[
                        {validator:validateTime,required:true,message:'请选择直播时间',trigger: 'blur'}
                    ]
                }
            }
        },
        created(){
            this._getData()
        },
        methods:{
            _getData(){
                let url = DATA_URL + 'mwlive/live/get_info.do?id=' + getLStorage('liveID')
                setTimeout(()=>{
                    axios.get(url).then((response) => {
                        if(response.data.code == ERR_OK){
                            this.oldImg = response.data.data.live_before_url
                            console.log('get',response.data.data)
                            if(response.data.data.live_before_type == 1){
                                response.data.data.live_before_type  = true
                            }else{
                                response.data.data.live_before_type  = false
                            }

                            if(response.data.data.begin_time_tag !=1 ){
                                response.data.data.begin_time_tag = false
                            }else{
                                response.data.data.begin_time_tag = true
                            }
                            this.form = response.data.data
                            // this.trailerLoading = false
                        }
                    }).catch(function(err){
                        console.log(err)
                    })
                },500)
            },
            // handleAvatarSuccess(res, file) {
            //     this.imageUrl = URL.createObjectURL(file.raw);
            // },
            beforeAvatarUpload(file) {
                // this.fileImg = file
                // const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                // const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG、png 格式!');
                // }
                // if (!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            },
            onSubmit(formName){
                if(!this.form.live_before_type){
                    this.tipsMessage('请开启直播预告图显示!','error')
                    
                    return false
                }
                console.log(this.form.live_before_url)
                if(this.form.live_before_url == '' || this.form.live_before_url === null){
                    this.imgIsShow = true
                    return false
                }else{
                    this.imgIsShow = false
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.form.live_before_url == ''){
                            this.isImg = true
                            return false
                        }
                        if(this.oldImg != this.form.live_before_url){
                            let url = DATA_URL + 'mwlive/setup/file_upload.do'
                            let formdata = new FormData()
                            formdata.append('file_data',this.fileImg)
                            formdata.append('user_id',getLStorage('user_id'))
                            formdata.append('file_type',1)
                            axios({
                                method: 'post',
                                url: url,
                                data:formdata,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res) => {
                                if(res.data.code == ERR_OK){
                                    this.oldImg = this.form.live_before_url
                                    this.imgUrl = res.data.data.save_id
                                    this._subData()
                                }else{
                                    this.$message({
                                        showClose: true,
                                        type: 'error',
                                        message: '图片上传失败!'
                                    });
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        }else{
                            console.log('true')
                            this._subData()
                        }
                    }
                })
            },
            _subData(){
                let dataParams = {
                    user_id:getLStorage('user_id'),
                    id: getLStorage('liveID'),
                    live_before_type:this.form.live_before_type ? 1 : 0,
                    live_before_url: this.imgUrl,
                    begin_time_tag:this.form.begin_time_tag ? 1 : 0,
                    begin_time_text:this.form.begin_time_text
                }
                if(!this.imgUrl){
                    dataParams.live_before_url = ''
                }
                if(this.form.begin_time){
                    dataParams.begin_time = setDateTime(this.form.begin_time)
                }
                axios({
                    method: 'get',
                    url: DATA_URL + 'mwlive/live/livebeforeset.do',
                    params:filterObj(dataParams),
                }).then((response) => {
                    if(response.data.code == ERR_OK){
                        console.log(response)
                        this.tipsMessage('直播预告设置成功!','success')
                        
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
            fileFunc(file){
                if(this.form.live_before_type == ''){
                    this.tipsMessage('直播请开启直播预告图显示预告设置成功!','error')
                    return false
                }
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg' ;
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG) {
                    this.tipsMessage('上传头像图片只能是 JPG、PNG、JPEG格式!','error')
                    return false
                }
                if (!isLt2M) {
                    this.tipsMessage('上传头像图片大小不能超过 2MB!','error')
                    return false
                }
                this.fileImg = file.raw
                this.form.live_before_url = file.url
                console.log('fileFunc',file)
            }
        },
        components:{
            MHeader,
            LeftNav
        }
    }
</script>

<style scoped>
.trailer{
    min-height: 680px;
}
.trailer-left{
    padding-left:20px;
    /* border-left:1px solid #d9d9d9; */
    border-right:1px solid #d9d9d9;
}
.preview-img{padding:0 10px;}
.preview-img span{vertical-align: middle}
.preview-img .iconfont{
    font-size: 16px;
}
.uploaderTipsS{opacity: 0;}
.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader{
    margin-left:60px;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    font-size: 40px;
    line-height: 130px;
    text-align: center;
}
.uploaderTips{
    width:230px;
    height:230px;
    border: 1px dashed #d9d9d9; 
}
.uploaderTips span{color:#999}
.avatar{
    width: 480px;
    height: 270px;
    display: block;
    border: 1px dashed #d9d9d9;
}
.avatar:hover {
    border-color: #20a0ff;
}
.trailer-right{padding:20px}
.trailer_prompt .el-input, .el-input__inner{
    width:95%;
}
.trailer_promptPic{
    color: #a7a8a9;
    width: 160px;
    margin-top: 36px;
}
</style>
<style>
.trailer .el-form-item__label{
    text-align: left;
}
.trailer_prompt .el-input input{
    background-color:#f1f5f9;
}
.trailer_words .el-form-item__content input{
    background-color:#f1f5f9;
}
.trailer .el-upload--picture-card{
    border:1px solid #eee;
    width: 120px;
    height: 40px;
    line-height:40px;
    background-color:#f1f5f9;
    border:1px solid #dddee0;
    font-size:14px;
    margin:36px 20px 55px 28px;
}
.liveWords_prompt{
    width:95%;
}
</style>

