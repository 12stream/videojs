<template>
    <div class="live-logo">
        <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm">
        <div class="live-top">视频LOGO</div>
        <el-row class="live-logoWrap clear">

            <el-col class="liveLogo-re" :span="24">
                <div class="mb10">
                    预览：
                </div>
                <div class="te-c">
                    <div class="logo-bg p-r">
                        <img class="logo-bgimg" :src="defaultImg" alt="">
                        <img v-show="form.logo_url&&form.isshowlogo==1" :src="form.logo_url" class="avatar p-a" :class="'avatar' + form.logo_xy">
                        <img class="p-a defaultLogo" src="../../common/image/chinanet.png" alt="">
                    </div>
                    <div style="position:relative">
                        <div class="preview-img">
                            <span class="default-color">图片大小2M以内，建议分辨率100*36像素，PNG、JPG、JPEG格式</span>
                            <el-upload class="upload-demo" list-type="picture-card"  v-show="form.isshowlogo==1"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="fileFunc"
                                accept=".jpg, .png, .jpeg"
                                :before-upload="beforeAvatarUpload">
                                    上传
                            </el-upload>
                            <div class="el-button upload_btn"  v-show="form.isshowlogo==0" @click="checkUpload()">
                                上传
                            </div>
                        </div>
                        <div v-show="logoImgTips" class="el-form-item__error">请选择上传LOGO</div>
                    </div>
                </div>
            </el-col>



            <el-col class="liveLogo-le" :span="24">
                <el-form-item label="视频LOGO显示：" prop="isshowlogo">
                    <el-switch class="swi_50" @change="_subData(true,form.isshowlogo)" on-text="" off-text="" v-model="form.isshowlogo"></el-switch>
                </el-form-item>

                <el-form-item label="视频LOGO位置：" prop="logo_xy" class="videoLogo mt5">
                    <el-radio class="radio my_radio" v-model="form.logo_xy" label="4">左上</el-radio>
                    <!-- <el-radio class="radio" v-model="form.logo_xy" label="1">右上</el-radio> -->
                    <el-radio class="radio my_radio" v-model="form.logo_xy" label="2">右下</el-radio>
                    <el-radio class="radio my_radio" v-model="form.logo_xy" label="3">左下</el-radio>
                </el-form-item>

                <el-form-item label="透明度选择：" class="sliderChoose">
                    <el-slider v-model="opacity"></el-slider>
                    <span class="opacityTip">{{opacity}}%</span>
                </el-form-item>
                <!--
                <div>
                    <el-form-item class="liveLogoImg">
                        <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="fileFunc"
                        :before-upload="beforeAvatarUpload">
                        <div class="uploaderTips">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                            <span class=""><br>尺寸1280×720px<br>图片小于2MB（jpg、gif、png）</span>
                        </div>
                        </el-upload>
                        <div v-show="imgIsShow" class="el-form-item__error">请选择需要上传的LOGO</div>
                    </el-form-item>
                </div>
                -->

            </el-col>
        </el-row>
        <div class="te-c submit_btn">
            <div class="primary_btn">
                <el-button type="primary" class="btn blue_btn" @click="submitForm('form')">提交</el-button>
            </div>
            <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
            </el-form-item> -->
        </div>
    </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import {ERR_OK,DATA_URL,getLStorage,DEFAULT_IMG} from 'api/config'
import {filterObj} from 'api/http'
export default{
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择设置LOGO显示状态'));
            }else{
                callback()
            }
            // setTimeout(() => {
            //     if (this.activeName == 'login_first' && !PhoneExp.test(value)) {
            //         callback(new Error('请输入正确的手机号码'))
            //     } else {
            //         callback()
            //     }
            // }, 1000)
        }
        var logoAddress = (rule, value, callback) => {
            if (!value) {

            }
            if (value === '') {
                return callback(new Error('请选择设置LOGO显示位置'));
            }else{
                callback()
            }
        };
        return {
            opacity:2,
            imageUrl: '',
            oldImg:'',
            fileImg:'',
            imgID:'',
            imgIsShow:false,
            form: {
                isshowlogo:false,
                logo_url: '',
                logo_xy: '4'
            },
            logoImgTips:false,
            defaultImg:'',
            live_status:'',
            rules: {
                // logo_url: [
                //     {required: true, message: '请选择需要上传的LOGO',trigger: 'blur'}
                // ],
                isshowlogo: [
                    { validator: checkAge, trigger: 'blur' }
                ],
                logo_xy: [
                    {validator: logoAddress,trigger: 'blur'}
                ],
            },

        };
    },
    created(){
        this._getLogonInfo()
        this._getData()
    },
    methods: {
        isLive(){
          if(this.live_status == 1){
              this.tipsMessage('正在直播中，频道基本信息不可编辑!','error')
                // this.$message({
                // showClose:true,
                // type: 'error',
                // message: '正在直播中，频道基本信息不可编辑!'
                // });
                // this._getLogonInfo()
                return false
          }
        },
        _getData(){
            /*let live_id =  getLStorage("liveID")
            axios.get(DATA_URL + 'mwlive/live/get_info.do?id='+ live_id
            ).then((response) => {
                //console.log(response);
                if(response.data.code == ERR_OK){
                    this.live_status = response.data.data.live_status
                    this.defaultImg = response.data.data.live_cover_url || DEFAULT_IMG
                }
            }).catch(function(err){
                console.log("err",err)
            })*/
          this.$ajaxs.getVodInfo({id:getLStorage("defRoomId")}).then(res => {
            this.defaultImg = res.data.vodCoverUrl;
          })
        },
        _getLogonInfo(){
            axios.get(DATA_URL + 'mwlive/setup/get_logoinfo.do?user_id='+ getLStorage('user_id') + '&live_id=' + getLStorage('defRoomId')+ '&type=VOD'
            ).then((response) => {
                if(response.data.data === null){
                    this.form.isshowlogo = false
                    return false
                }
                if(response.data.code == 200){
                    if(response.data.data.isshowlogo == 1){
                        response.data.data.isshowlogo = true
                        this.form = response.data.data;
                        this.form.logo_xy = this.form.logo_xy.toString()
                        this.oldImg = response.data.data.logo_url;
                        this.opacity=Number(response.data.data.opacity);
                    }else{
                        this.form.isshowlogo = false,
                        this.form.logo_url= response.data.data.logo_url,
                        this.form.logo_xy= this.form.logo_xy.toString()
                        response.data.data.isshowlogo = false
                    }
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        tipsMessage(message,type){
            this.$message({
                showClose: true,
                message: message,
                type: type || 'info'
            })
        },
        submitForm(formName) {
            if(this.live_status == 1){
                this.tipsMessage('正在直播中，频道基本信息不可编辑!','error')
                // this.$message({
                //     showClose:true,
                //     type: 'error',
                //     message: '正在直播中，频道基本信息不可编辑!'
                // });
                this._getLogonInfo()
                return false
            }
            // alert(this.form.isshowlogo)
            if(!this.form.isshowlogo){
                this.tipsMessage('请开启LOGO显示后再做调整!','error')
                // this.$message({
                //     showClose:true,
                //     type: 'error',
                //     message: '请开启LOGO显示!'
                // })
                return false
            }
            if(!this.form.logo_url){
                this.logoImgTips = true
            }else{
                this.logoImgTips = false
            }
            // if(this.form.logo_url == ''){
            //     this.imgIsShow = true
            //     return false
            // }else{
            //     this.imgIsShow = false
            // }

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.oldImg == this.form.logo_url && this.form.logo_url!= ''){
                        // this.$message({
                        //     showClose:true,
                        //     type: 'error',
                        //     message: '请勿提交相同的LOGO图片!'
                        // })
                        // return false
                        this._subData()
                    }else{
                        let url = DATA_URL + 'mwlive/setup/file_upload.do'
                        let formdata = new FormData();
                        formdata.append('file_data',this.fileImg)
                        formdata.append('user_id',getLStorage('user_id'))
                        formdata.append('file_type',1)
                        if(!this.fileImg){
                            this._subData()
                        }else{
                            axios({
                                method: 'post',
                                url: url,
                                data:formdata,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res) => {
                                if(res.data.code == ERR_OK){
                                    // this.oldImg = this.form.logo_url
                                    this.imgID = res.data.data.save_id
                                    this.form.logo_url = res.data.data.show_url
                                    this.oldImg = this.form.logo_url
                                    console.log(res.data.data.save_id)
                                    console.log(res.data.data.show_url)
                                    this._subData()
                                    return false
                                }
                            })
                            .catch(function(err){
                                console.log(err)
                            })
                        }


                    }
                    // this._subData()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                // upload img end
            });
        },
        _subData(type,show){
            let dataParams = {
                user_id:getLStorage('user_id'),
                live_id: getLStorage('defRoomId'),
                logo_url: this.form.logo_url,
                logo_xy: Number(this.form.logo_xy),
                opacity:this.opacity,
                isshowlogo: this.form.isshowlogo ? 1 : 0,
                width:"60px",
                height:"60px",
              type:"VOD"
            }
            let logoTips
            if(this.form.isshowlogo == 1){
                logoTips = '视频LOGO显示设置成功'
            }else{
                logoTips = '视频LOGO显示关闭'
                this._getData()
            }
            if(type){
                if(show){
                    return false
                }else{
                }
            }
            axios({
                method: 'get',
                url: DATA_URL + 'mwlive/setup/set_logoinfo.do',
                params:dataParams,
            }).then((response) => {
                console.log(response);
                if(response.data.code == ERR_OK){
                    this.$emit('changeLogin',dataParams.logo_xy)
                    console.log(response)
                    this.fileImg = ''
                    this.tipsMessage(logoTips,'success')
                    // this.$message({
                    //     showClose:true,
                    //     type: 'success',
                    //     message: logoTips
                    // });
                    this._getLogonInfo()
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        checkUpload(){
            if(this.form.isshowlogo=='0'){
                this.$message.error('请开启LOGO显示后再上传!')
            }
        },
        fileFunc(file){
            // if(!this.form.isshowlogo){
            //     this.$message.error('请开启LOGO显示!')
            //     return false
            // }
            // console.log('asdf',file)
            let imgtype = file.raw.type
            const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传LOGO图片只能是JPG、PNG、JPEG 格式!')
                return false
            }
            if (!isLt2M) {
                this.$message.error('上传LOGO图片大小不能超过 2MB!')
                return false
            }
            this.fileImg = file.raw
            this.form.logo_url = file.url
            console.log('fileFunc',file)
        },
        beforeAvatarUpload(file) {
            this.fileImg = this.form.fileImg = file
            const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG、PNG、JPEG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style scoped>
.liveLogo-re{
    padding:10px 205px 0 205px;
}


.live-logo{
    height: 680px;
    position: relative;
}



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
.liveLogo-le{
    margin-left:185px;
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
.primary_btn{
    margin-top:36px;
}
.primary_btn .btn{
    width:100px;
    line-height: 36px;
    height:36px;
    padding:0;
}
.uploaderTips span{color:#999}
.avatar{
    max-width: 50px;
    max-height: 50px;
    /* display: block; */
    /* border: 1px dashed #d9d9d9; */
    left: 10px;
    top:10px;
}
.avatar4{
    left: 20px;
    top:10px;
    bottom:auto;
    right: auto;
}
.avatar2{
    left: auto;
    top:auto;
    bottom:10px;
    right: 20px;
}
.avatar3{
    left: 20px;
    top:auto;
    bottom:10px;
    right: auto;
}

.avatar:hover {
    border-color: #20a0ff;
}
.pic_prompt p{
    margin-bottom: 10px;
    color: #a7a8a9;
}
.preview-img{
    text-align: left;
    margin-top:20px;
}
.preview-img span{vertical-align: middle}
.preview-img .iconfont{
    font-size: 16px;
}
.live-logoWrap  .default-color{
    font-size:12px;
    padding-top:30px;
}
.live-logoWrap .upload-demo{
    display: inline-block;
    position: relative;
    right: -54px;
    top:-10px;
}
.upload_btn{
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #CCCCCC;
    width: 80px;
    height: 34px;
    line-height: 34px;
    background-color: #E5E5E5;
    font-size: 14px;
    color: #333333;
    border-radius: 2px;
    display: inline-block;
    float: right;
    position: relative;
    top: -10px;
}
.opacityTip{
        position: absolute;
    right: 380px;
    top: 0px;
}
.upload_btn:hover{
    background-color: #2B6CFF;
    color: #fff;
    border: 1px solid #2B6CFF;
}
.upload_btn:focus {
    background-color: #0068D2!important;
    border: 1px solid #0068D2;
}
.logo-bg{
    display:inline-block;
    width:500px;
    height:280px;
    border-radius: 2px;
}

.logo-bgimg{
    width:500px;
    height:280px;
    border-radius: 2px;
}
.defaultLogo{
    right:10px;
    top:10px;
    width: 60px;
}
</style>
<style>
.live-logo .liveLogoImg .el-form-item__content{margin-left:100px !important;}
.live-logo .el-upload--picture-card{
    border: 1px solid #CCCCCC;
    width: 80px;
    height: 34px;
    line-height: 34px;
    background-color: #E5E5E5;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    color:#333333;
}

.live-logo .el-form-item{
    margin-bottom:0px;
}
.live-logo .el-form-item__content{
    margin-left:0 !important;
}
.live-logo .el-form-item__content {
        margin-left: 140px!important;
}
.el-slider{
    width:350px;
}
.sliderChoose label{
    margin-top:10px;
}
</style>

