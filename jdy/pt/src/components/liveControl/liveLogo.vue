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
                        <img class="logo-bgimg" :src="defaultImg" alt="" >
                        <div class="logo-box" :class="'yd' + form.logo_xy" v-show="form.logo_url&&form.isshowlogo==1">
                            <!-- <img v-show="form.logo_url&&form.isshowlogo==1" :src="form.logo_url" class="avatar p-a" :class="'avatar' + form.logo_xy"> -->
                            <img style="display:block;" v-show="form.logo_url&&form.isshowlogo==1" v-bind:style="{ 'opacity':opacity/100 }" width="100%" height="100%" :src="form.logo_url" >
                            <!-- <img :class="'imgYd' + form.logo_xy" src="../../common/image/icon-log-la.png"  alt="" class="t1 cuor" draggable="true" @mousedown="drag($event)" id="t_img"  srcset=""> -->
                        </div>
                        
                        <!-- <img class="p-a defaultLogo" src="../../common/image/chinanet.png" alt=""> -->
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
                    <el-switch class="swi_50" @change="_subData(true,form.isshowlogo)" active-text="开" inactive-text="关"  v-model="form.isshowlogo"></el-switch>
                </el-form-item>

                <el-form-item label="视频LOGO位置：" prop="logo_xy" class="videoLogo mt5">
                    <el-radio class="radio my_radio" v-model="form.logo_xy" label="4">左上</el-radio>
                    <!-- <el-radio class="radio" v-model="form.logo_xy" label="1">右上</el-radio> -->
                    <el-radio class="radio my_radio" v-model="form.logo_xy" label="2">右下</el-radio>
                    <el-radio class="radio my_radio" v-model="form.logo_xy" label="3">左下</el-radio>
                </el-form-item>

                <el-form-item label="透明度选择：" class="slideChoose">
                    <el-slider v-model="opacity"></el-slider>
                </el-form-item>
                <el-form-item>
                    <span>0%</span>
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
        <div class="te-c submit_btn" style="margin-top: -30px;">
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
            opacity:100,
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
            let live_id =  getLStorage("liveID")
            axios.get(DATA_URL + 'mwlive/live/get_info.do?id='+ live_id
            ).then((response) => {
                //console.log(response);
                if(response.data.code == ERR_OK){
                    this.live_status = response.data.data.live_status
                    this.defaultImg = response.data.data.live_cover_url || DEFAULT_IMG
                }
            }).catch(function(err){
                console.log("err",err)
            })
        },
        _getLogonInfo(){
            axios.get(DATA_URL + 'mwlive/setup/get_logoinfo.do?user_id='+ getLStorage('user_id') + '&live_id=' + getLStorage('liveID')
            ).then((response) => {
                 console.log(response)
                if(response.data.data === null){
                    $('.swi_50').find('.el-switch__label--left').show();
                    $('.swi_50').find('.el-switch__label--right').hide();
                    this.form.isshowlogo = false
                    return false
                }
                if(response.data.code == ERR_OK){
                    if(response.data.data.isshowlogo == 1){
                        $('.swi_50').find('.el-switch__label--left').hide();
                        $('.swi_50').find('.el-switch__label--right').show();
                        response.data.data.isshowlogo = true
                        this.form = response.data.data
                        this.form.logo_xy = this.form.logo_xy.toString()
                        // console.log('this.form.logo_xy',this.form.logo_xy)
                        this.oldImg = response.data.data.logo_url;
                        this.opacity=Number(response.data.data.opacity);
                    }else{
                        $('.swi_50').find('.el-switch__label--right').hide();
                        $('.swi_50').find('.el-switch__label--left').show();
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
                        let formdata = new FormData()
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
                    this._subData()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                // upload img end
            });
        },
        _subData(type,show){
            console.log(type,show)
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
            let w = $('.logo-box').width();
            let h = $('.logo-box').height()
            let dataParams = {
                user_id:getLStorage('user_id'),
                live_id: getLStorage('liveID'),
                logo_url: this.form.logo_url,
                logo_xy: Number(this.form.logo_xy),
                opacity:this.opacity,
                isshowlogo: this.form.isshowlogo ? 1 : 0,
                type:'',
                width:w,
                height:h
            }
            let logoTips
            if(this.form.isshowlogo == 1){
                $('.swi_50').find('.el-switch__label--right').show();
                $('.swi_50').find('.el-switch__label--left').hide();
                logoTips = '视频LOGO显示设置成功'
            }else{
                $('.swi_50').find('.el-switch__label--right').hide();
                $('.swi_50').find('.el-switch__label--left').show();
                logoTips = '视频LOGO显示关闭'
                this._getData()
            }
            if(type){
                if(show){
                    return false
                }else{
                }
            }
            // else{
            //     dataParams = {
            //         user_id:getLStorage('user_id'),
            //         live_id: getLStorage('liveID'),
            //         logo_url: '',
            //         logo_xy: 4,
            //         isshowlogo: this.form.isshowlogo ? 1 : 0
            //     }
            // }

            console.log(dataParams)
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
        },
        drag(e,$evt){
            // // console.log(e)
            // // e.preventDefault();
            // // let w = $('.logo-box').width();
            // // let h = $('.logo-box').height()
            // // let ev = e || event;
            // // let initX = ev.pageX;
            // // let initY = ev.pageY;

            // // //获取X坐标和Y坐标
            // // let x1 = e.clientX;
            // // let y1 = e.clientY;
            // // let img1 = document.getElementById('t_img');
            // // let l1 = img1.offsetLeft;
            // // let t1 = img1.offsetTop;
            // // let r1 = img1.offsetRight;
            // // let b1 = img1.offsetBottom;
            // // let tImg = $(document).get(0);
            // // tImg.onmousemove = function(ent){
            // // // $(document).on('mousemove',function(ent){
            // //     let x = ent.pageX - initX;
            // //     let y = ent.pageY - initY;
            // //      //获取移动后的x，y
            // //     var x2 = ent.clientX;
            // //     var y2 = ent.clientY;
            // //     //计算移动后的偏移量
            // //     var l2 = x2 - (x1 -l1);
            // //     var t2 = y2 - (y1 - t1);
            // //     if (x1 < x2 && y1 < y2) {
            // //         //左上
            // //         l2 = x2 - (x1 -l1);
            // //         t2 = y2 - (y1 - t1);
            // //         l2 = x2 - (x1 -l1);
            // //         t2 = y2 - (y1 - t1);
            // //         if (w >= (w +x)) {
            // //             $('.logo-box').width(w);
            // //             $('#t_img').css('left',l1 +'px');
            // //         }else{
            // //             $('.logo-box').width(w+x);
            // //             $('#t_img').css('left',l2 +'px');
            // //         }
            // //         if (h >= (h + y)) {
            // //             $('.logo-box').height(h);
            // //             $('#t_img').css('top',t1 +'px');
            // //         }else{
            // //             $('.logo-box').height(h + y);
            // //             $('#t_img').css('top',t2 +'px');
            // //         }
            // //     }
            // //     if (x1 < x2 && y1 > y2) {
            // //         //左下
            // //         l2 = x2 - (x1 -l1);
            // //         t2 = b1 + (y2 - y1);
            // //         x = ent.pageX - initX;
            // //         y = initY - ent.pageY;
            // //         $('.logo-box').width(w+x);
            // //         $('.logo-box').height(h + y);
            // //         $('#t_img').css('left',l2 +'px');
            // //         $('#t_img').css('bottom',t2 +'px');
            // //         if (condition) {
                        
            // //         }
                    
            // //     }
            // //     if (x1 > x2 && y1 > y2) {
            // //         // 右下
            // //         l2 = b1 + (y1 - y2);
            // //         t2 = r1 + (y2 - y1);
            // //         x = x1 - x2;
            // //         y = y1 - y2;
            // //         $('.logo-box').width(w+x);
            // //         $('.logo-box').height(h + y);
            // //         $('#t_img').css('bottom',l2 +'px');
            // //         $('#t_img').css('right',t2 +'px');
            // //     }
            // //     if (x1 > x2 && y1 < y2) {
            // //         //右上 
            // //         l2 = r1 + (x1 - x2);
            // //         t2 = t1 + (y2 - y1);
            // //         x = x1 - x2;
            // //         y = y2 - y1;
            // //         $('.logo-box').width(w+x);
            // //         $('.logo-box').height(h + y);
            // //         $('#t_img').css('right',l2 +'px');
            // //         $('#t_img').css('top',t2 +'px');
            // //     }
            // }
            // $(tImg).on('mouseup',function(evt){
            //     tImg.onmousemove = false;
            // })
        },
    },
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


.sliderChoose label{
    margin-top:10px;
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
    /* left: 20px;
    top:10px;
    bottom:auto;
    right: auto; */
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
    right: 550px;
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
.slideChoose .el-form-item__label{
    margin-top: 10px;
}
.logo-box{
    position: absolute;
    /* top: 20px; */
    /* left: 20px; */
    /* top: 10px; */
    /* bottom: auto;
    right: auto; */
    width: 40px;
    /* height: 40px; */
    border:1px dashed white;
}
.t1{
    width: 18px;
    height: 18px;
    /* top: 30px; */
    position: absolute;
    /* left: 30px; */
}
/* 左上 */
div.yd4{
    left: 20px;
    top:10px;
}
.t1.imgYd4{
    left: 30px;
    top:30px;
}
/* 左下 */
div.yd3{
    bottom:20px;
    left: 20px;
}
.t1.imgYd3{
    left:30px;
    /* top:-6px; */
    bottom:30px;
}
/* 右下 */
div.yd2{
    bottom:20px;
    right: 20px;
}
.t1.imgYd2{
    bottom:30px;
    right:30px;
}
/* 右上 */
div.yd1{
    top:20px;
    right: 20px;
}
.t1.imgYd1{
    right: 30px;
    top:30px;
}
.cuor{
    cursor: all-scroll;;
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

