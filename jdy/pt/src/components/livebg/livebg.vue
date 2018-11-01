<template>
    <div class="livebg" v-loading="libebgLoading">
        <el-row>
            <el-col class="livebg-main" :span="24">
                <div class="live-top">直播背景</div>
                <div class="content_livebg">
                    <div>
                        <div class="mb10">
                            预览：
                        </div>
                        <div  class="preview-img">
                            <div class="clear">
                                <div class="uploadImg-main">
                                    <img :src="imageUrl">
                                </div>
                            <!-- <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"> -->
                                <!-- <div>
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                </div> -->

                                <!-- <el-upload class="upload-demo"
                                list-type="picture-card"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :before-upload="beforeAvatarUpload"
                                :on-change="handleChange"
                                :file-list="fileList"
                                accept=".jpg, .png, .gif"
                                :auto-upload="false"
                                > -->
                                <div class="upload_tip">
                                        <span class="default-color">图片大小2M以内，建议分辨率865*486像素，PNG、JPG、JPEG格式</span>
                                            <el-upload class="upload-demo"
                                            list-type="picture-card"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :show-file-list="false"
                                            :auto-upload="false"
                                            :on-change="fileFunc"
                                            accept=".jpg, .png, .jpeg"
                                            :before-upload="beforeAvatarUpload">
                                            <!-- <span class="cur-p icon iconfont icon-juanlouqu"></span> -->
                                            上传
                                        <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-change="handleChange"
                                            :file-list="fileList"
                                            :auto-upload="false"> -->
                                            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                                            <!-- <i class="el-icon-plus avatar-uploader-icon"></i><br> -->
                                            <!-- <div v-else class="uploaderTips">
                                                <i class="el-icon-plus avatar-uploader-icon"></i><br>
                                                <span class="">尺寸1280×720px<br>图片小于2MB（jpg、gif、png）</span>
                                            </div>
                                            <div v-if="imageUrl" class="mt20">点击图片替换</div> -->
                                        </el-upload>

                                </div>                    
                            </div>
                            <div v-show="isImg" class="el-form-item__error" style="margin-left:90px">请选择需要上传的背景</div>
                        </div>
                    </div>
                     <!-- <div class="mt20 pic_prompt" style="margin-left:90px">
                        <p>图片大小2M以内</p>
                        <p>图片建议分辨率865*486像素</p>
                        <p>PNG、JPG、JPEG格式</p>
                    </div> -->
                    <div class="primary_btn">
                        <el-button type="primary" class="btn blue_btn"  @click="onSubmit">提交</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import MHeader from 'components/header/header'
    import LeftNav from 'components/leftnav/leftnav'
    import LiveSettings from 'base/livesettings/livesettings'
    import {ERR_OK,DATA_URL,getLStorage,DEFAULT_IMG} from 'api/config'
    import axios from 'axios'
    // import qs from 'qs'
    export default{
        data(){
            return{
                libebgLoading:true,
                // imgUrl:'https://jsonplaceholder.typicode.com/posts/'
                oldImg:'',
                fileList:[],
                dialogImageUrl: '',
                dialogVisible: false,
                setImgUrl: DATA_URL + 'mwlive/setup/file_upload.do',
                isImg:false,
                imgUrl:'',
                imgId:'',
                imageUrl:'',
                file:[],
                islive:''
            }
        },
        created(){
            this.libebgLoading = false
            this._getData()
        },
        methods:{
            _getData(){
                let live_id =  getLStorage("liveID")
                axios.get(DATA_URL + 'mwlive/live/get_info.do?id='+ live_id
                ).then((response) => {
                    console.log(response)
                    if(response.data.code == ERR_OK){
                        this.islive = response.data.data.live_status
                        this.oldImg = this.imageUrl = response.data.data.live_cover_url || DEFAULT_IMG
                    }
                }).catch(function(err){
                    console.log(err)
                    console.log("err",err)
                })
            },
            fileFunc(file){ 
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG、PNG、JPEG 格式!')
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                    return false
                }
                this.file = file.raw
                this.imageUrl = file.url
                console.log('fileFunc',file)
            },
            beforeAvatarUpload(file) {
                this.file = file
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG、PNG、JPEG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // handleAvatarSuccess(res, file) {
            //     console.log(res,file)
            //     this.imageUrl = URL.createObjectURL(file.raw);
            // },
            // beforeAvatarUpload(file) {
            //     console.log('file11',file)
            //     this.file = file
            //     // console.log(file)
            //     // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
            //     // const isJPG = file.type === 'image/jpeg';
            //     const isLt2M = file.size / 1024 / 1024 < 2;
            //     alert(file.size)
            //     // if (!isJPG) {
            //     //     this.$message.error('上传头像图片只能是 JPG 格式!');
            //     // }
            //     if (!isLt2M) {
            //         this.$message.error('上传头像图片大小不能超过 2MB!');
            //     }
            //     return isLt2M;
            // },
            handleChange(file, fileList) {
                this.file = file.raw
                this.imageUrl = file.raw.url
                console.log('file',file)
                this.fileList = fileList.slice(-1)
                this.imageUrl = file.url
            },
            // handlePictureCardPreview(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible = true;
            // },
            onSubmit(){
                if(this.islive == 1){
                    this.$message({
                      showClose:true,
                      type: 'error',
                      message: '正在直播中，频道基本信息不可编辑!'
                    });
                    return false
                }
                if(this.imageUrl == ''){
                    this.isImg = true
                    return false
                }
                if(this.oldImg == this.imageUrl){
                    this.$message({
                        showClose:true,
                        type: 'error',
                        message: '请勿提交相同的背景图片!!'
                    });

                    return false
                }else{
                    let url = DATA_URL + 'mwlive/setup/file_upload.do'
                    let formdata = new FormData()
                    formdata.append('file_data',this.file)
                    formdata.append('user_id',getLStorage('user_id'))
                    // formdata.append('file_type',1)
                    axios({
                        method: 'post',
                        url: url,
                        data:formdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then((res)=>{
                        console.log(res)
                        this.imgUrl = res.data.data.show_url
                        this.imgId = res.data.data.save_id
                        // if(res.data.code == ERR_OK){
                        //     console.log(res);
                        // }
                        this._setData()
                    })
                    .catch((err)=>{
                        console.log(err)
                        this.$message({
                            showClose:true,
                            type: 'error',
                            message: '上传失败!'
                        });
                    })
                }
            },
            _setData(){
                if(!this.imgUrl){
                    this.$message({
                        showClose:true,
                        type: 'error',
                        message: '上传失败!'
                    })
                    return false
                }
                let dataParams = {
                    user_id:getLStorage('user_id'),
                    id: getLStorage('liveID'),
                    live_cover_url: this.imgId,
                }
                console.log(dataParams)
                axios({
                    method: 'get',
                    url: DATA_URL + 'mwlive/live/livebackground.do',
                    params:dataParams,
                }).then((response) => {
                    if(response.data.code == ERR_OK){
                        console.log(response)
                        this.$message({
                            showClose:true,
                            type: 'success',
                            message: '直播背景上传成功!'
                        })
                        this.$emit('refresh')
                    }
                }).catch(function(err){
                    console.log(err)
                })
            }
        },
        components:{
            MHeader,
            LeftNav,
            LiveSettings
        }
    }
</script>

<style scoped>


/* .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.el-upload:hover {
    border-color: #20a0ff;
} */
/* .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    font-size: 40px;
    line-height: 130px;
    text-align: center;
} */
/* .uploaderTips{
    width:230px;
    height:230px;
    border: 1px dashed #d9d9d9;
} */
/* .uploaderTips span{color:#999}
.avatar{
    width: 230px;
    height: 230px;
    display: block;
    border: 1px dashed #d9d9d9;
}
.avatar:hover {
    border-color: #20a0ff;
} */
.content_livebg{
    padding-top:10px;
    margin-left: 205px;
}
.content_livebg .default-color{
    font-size:12px;
}
.content_livebg .upload-demo{
    display: inline-block;
    position: relative;
    right: -46px;
    top:-10px;
}

.content_livebg  .upload_tip{
    height:100%;
}
.content_livebg  .default-bg .el-upload{
    right:-72px;
}
.pic_prompt p{
    color: #a7a8a9;
}
.livebg {
    position: relative;
}
.livebg .el-button {
    display: inline-block;
    padding: 10px 50px;
    color: #fff;
    background-color: #58cafd;
    border-color: #58cafd;
}
.primary_btn{
    margin-top:126px;
    margin-left:200px;
}
.primary_btn .btn{
    width:100px;
    line-height: 34px;
    height:36px;
    font-size:14px;
    padding:0;
    text-align: center;
}
.livebg-main{
    /* border: 1px solid #d9d9d9; */
    min-height: 680px;
}
.preview-img span{vertical-align: middle}
.preview-img .iconfont{
    font-size: 16px;
}
</style>
<style>
.livebg-main .uploadImg-main{
    display: block;
    height:280px;
    width: 500px;
    position: relative;
    margin-bottom:30px;
}
/* .livebg-main .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    position: absolute;
    top: 50%;
    left: 0;
    width:100%;
    height:80%;
    transform: translate(0, -50%);
} */

.livebg-main .uploadImg-main img{
    width:498px;
    height:280px;
    border-radius:2px;
    /* border:1px solid #D9D9D9; */
}
/* .livebg-main .el-upload-list--picture-card .el-upload-list__item{
    width: 480px;
    height: 270px;
} */
.livebg-main .el-upload--picture-card{
    text-align:center;
    border:1px solid #CCCCCC;
    width: 80px;
    height: 34px;
    line-height:34px;
    background-color:#E5E5E5;
    font-size:14px;
    color:#333333;
    border-radius:2px;
}
.livebg-main .el-upload--picture-card:hover{
    background-color: #2B6CFF;
    color:#fff;
    border:none;
}
.livebg-main .el-upload--picture-card:focus{
    background-color: #0068D2!important;
}
</style>

