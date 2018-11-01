<template>
    <div class="info my_section">
        <div class="section_title">基本信息</div>
        <div class="info-content bg-fff col-333">
            <div class="bor_bottom">
                <div class="te-c fl user_img">
                    <div v-if="iconImg" class="p-r avatarImg">
                        <img :src="iconImg" class="avatar">
                    </div>
                    <img v-if="!iconImg" src="../../common/image/user_header.png"  alt="">
                </div>
                <div class="fl user_info">
                    <div class="user_name">{{userName}}</div>
                    <div>云播号: {{account}}</div>
                    <div>账户类型: 基础版</div>
                    <div>
                      <div type="primary" plain @click="focusInfo" class="accountBtn">
                        关注：<span>{{attentionSum}}</span>
                      </div>
                      <div class="accountBtn" @click="fanInfo">
                        粉丝：<span>{{fansSum}}</span>
                      </div>
                    </div>
                </div>
                <!--<div class="fl right_num">
                    <span class="col_89">关注：<span class="col_4FF" @click="focusInfo">{{attentionSum}}</span></span>
                    <span class="col_89">粉丝：<span class="col_4FF" @click="fanInfo">{{fansSum}}</span></span>
                </div>-->
                <div class="fr">
                    <span class="edit_btn" @click="dialogVisible = true">
                        <i class="icon iconfont icon_edit" ></i><span>编辑资料</span>
                    </span>
                </div>
            </div>
             <div class="statistics" >
                <el-row>
                    <el-col :span="8" class="te-c hover_b" >
                        <div class="grid_content bg_fa ">账户余额 ( 元 )</div>
                        <div class="big_num">{{money}}</div>
                        <span class="el-button  btn btn_32 blue_btn" @click="recharge">
                            <router-link tag="div" to="/account/recharge">充值</router-link>
                        </span>
                    </el-col>
                    <el-col :span="8"  class="te-c hover_b">
                        <div class="grid_content bg_fa">梦币余额 ( 个 )</div>
                        <div class="big_num">{{mb}}</div>
                        <!-- <el-button class="btn btn_32 red_btn">
                             <router-link tag="div" to="/account/recharge" style="width:60px;height:100%">充值</router-link>
                        </el-button>   -->
                    </el-col>
                    <el-col :span="8"  class="te-c hover_b">
                        <div class="grid_content bg_fa">梦豆余额 ( 个 )</div>
                        <div class="big_num">{{md}}</div>
                        <span class="el-button btn btn_32 btn_oo" @click="recharge">
                            <router-link tag="div" to="/account/withdrawAlipay">提现</router-link>
                        </span>
                    </el-col>
                </el-row>
            </div>
            <!-- 编辑资料 -->
            <el-dialog
                class="my_dialog"
                title="编辑资料"
                :visible.sync="dialogVisible"
                width="480px"
                :show-close="false"
                @close='closeDialog'
                >
                <el-form label-position="right" label-width="90px">
                    <el-form-item label="用户名称 :">
                        <el-input class="input_200" v-model="userName" :maxlength="30"></el-input>
                    </el-form-item>

                    <el-form-item label="头像图片 : " class="textarea_heigth">
                        <div v-if="iconImg2" class="p-r avatarImg">
                            <img :src="iconImg2" class="avatar">
                        </div>
                        <div v-if="!iconImg2"   class="pre_img">
                            <i  class="el-icon-plus avatar-uploader-icon"></i>
                            <p>大小 : 2M以内</p>
                            <p>格式 : png、jpg、jpeg</p>
                        </div>
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="uploadImg"
                             accept=".jpg, .png, .jpeg">
                            <el-button class="btn btn_34" type="info" style="width:80px;padding:0;">选择图片</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editUserInfo">确 定</el-button>
                    <el-button @click="closeDialog">取 消</el-button>
                </span>
            </el-dialog>
            <!--关注及粉丝列表-->
            <el-dialog
                :title="tipTitle"
                :visible.sync="dialogVisible2"
                width="30%">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 图片裁剪start -->
        <m-cropper :cropperDate="cropperDate" v-on:cropper-data="listenCropperDate"></m-cropper>
        <!-- 图片裁剪end -->
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK, DATA_URL,GIFT_URL,getLStorage,setLStorage} from 'api/config'
    import {axiosData} from 'api/http'
    import mCropper from 'components/tools/vueCropper'
    export default{
        data(){
            return{
                userName:'',
                account:'',
                attentionSum:'',
                fansSum:'',
                adminName:getLStorage('admin'),
                money:'',
                mb:'',
                md:'',
                getDataUrl:'http://open.facebac.com/api/',
                iconImg:'',
                iconImg2:'',
                iconID:'',
                file:'',
                dialogVisible: false,
                dialogVisible2:false,
                tipTitle:"关注列表",
                cropperDate:'',
                flag:true
            }
        },
        components:{
            mCropper
        },
        created(){
            this.getData()
        },
        methods:{
            focusInfo(){
                this.$router.push({
              path: "/acount/interestList"
            });
            },
            fanInfo(){

               this.$router.push({
              path: "/acount/fanList"
            });
            },
            recharge(){
            },
            closeDialog(){
                this.dialogVisible = false
                if(this.flag){
                    this.iconImg2 = this.iconImg
                }
                this.flag = true
            },
            getData(){
                let formdata = new FormData()
                formdata.append('user_id',getLStorage('user_id'))
                axios({
                    method: 'post',
                    url: DATA_URL + 'manage/finance/surplus.do',
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res) => {
                    if(res.data.data){
                      this.money = res.data.data.surplus
                    }else{
                        this.money = 0
                    }
                }).catch(function(err){
                    console.log(err)
                })
                this.getUserInfo()
            },
            // 获取用户粉丝数量/用户信息
            getUserInfo(){
                let formdata = new FormData()
                formdata.append('userID	',getLStorage('user_id'))
                let that = this
                axiosData(formdata, GIFT_URL + 'service/queryUserCenter.action').then(res => {
                    if(res.data.resultCode == '01'){
                        this.attentionSum = res.data.params.followNum
                        this.fansSum = res.data.params.fansNum
                        this.iconImg =  res.data.params.imgUrl
                        this.iconImg2 =  res.data.params.imgUrl
                        setLStorage('iconImg',this.iconImg)
                        this.userName =  res.data.params.userName
                        this.account = res.data.params.userNumber
                        this.mb = res.data.params.currencyAmount[0].currencyAmount
                        this.md = res.data.params.currencyAmount[1].currencyAmount
                    }else{
                        that.tipsMessage('网络异常！','error')
                    }
                })
            },
            // 获取用户信息
            // getUserInfo(){
            //     let formdata = new FormData()
            //     formdata.append('id	',getLStorage('user_id'))
            //     let that = this
            //     axiosData(formdata, DATA_URL + 'mwlive/user/get_userinfo.do').then(res => {
            //         if(res.data.code == ERR_OK){
            //             this.iconImg =  res.data.data.imgUrl
            //             this.iconImg2 =  res.data.data.imgUrl
            //             setLStorage('iconImg',this.iconImg)
            //             this.userName =  res.data.data.user_title
            //             // this.account = res.data.data.userNumber
            //         }else{
            //             that.tipsMessage('网络异常！','error')
            //         }
            //     })
            // },
            editUserInfo(){
                this.flag = false
                let formdata = new FormData()
                formdata.append('id	',getLStorage('user_id'))
                formdata.append('user_title	',this.userName)
                if(this.iconID){
                    formdata.append('user_icon_id',this.iconID)
                }
                let that = this
                axiosData(formdata, DATA_URL + 'mwlive/user/edit_userinfo.do').then(res => {
                    if(res.data.code == ERR_OK){
                        that.tipsMessage('编辑成功！','success')
                      $("#userName").html(this.userName);
                      setLStorage("admin",this.userName)
                    }else{
                        that.tipsMessage('编辑失败！','error')
                    }
                    that.dialogVisible = false
                    that.getUserInfo()
                })
                .catch((err) => {
                    that.tipsMessage('网络异常！','error')
                })

            },
            tipsMessage(message,type){
                this.$message({
                    showClose:true,
                    message: message,
                    type:type || 'info',
                    customClass: 'tips-text'
                })
            },
            uploadImg(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.tipsMessage('只支持 JPG、PNG、JPEG格式!','error')
                    return false
                }
                if (!isLt2M) {
                    this.tipsMessage('上传图片大小不能超过 2MB!','error')
                    return false
                }
                this.file = file.raw;
                var data = window.URL.createObjectURL(new Blob([this.file]))
                this.cropperDate = {
                    'imgDate':data,
                    'autoCropWidth': 300,
                    'autoCropHeight':300,
                    'fixed':true,
                    'fixedNumber':[1,1]
                }
            },
             // 获取图片裁剪子组件传递的图片
            listenCropperDate(data){
                console.log("父组件获取的图片信息");
                console.log(data);
                this.iconImg2 =  data.show_url;
                this.iconID = data.save_id;
            }
        }
    }
</script>

<style scoped>
.info{
    padding: 20px 30px;
    height: 667px;
}

.info-content{
    padding-top:50px;
    line-height: 30px;
    font-size: 14px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.info-content .btn_32 div{
    line-height: 32px;
}
.info-content .statistics{
    padding-top:40px;
}
.info-content .statistics .te-c {
    height:236px;
    width:290px;
    border:1px solid #F2F2F2;
    margin-right:20px;
    border-radius: 5px;
}
.info-content .statistics .te-c:nth-child(3) {
    margin-right:0;
}
.info-content .bor_bottom{
    border:1px solid #F2F2F2;
    padding:20px 30px 20px 20px;
    height: 130px;
}
.info-content .right_num{
    font-size:16px;
    margin:34px 0 0 150px
}
.info-content .big_num{
    font-size:36px;
    font-weight: 700;
    padding:38px 0;
}
.right_num .col_89{
    margin-right:70px;
}
.info-content .user_info{
    margin-left:70px;
}
.default-bg .info-content .bg_fa{
    background-color: #FAFAFA;
    height:60px;
    line-height: 60px;
    color:#9B9B9B;
}

.info-content .user_name{
    font-size:20px;
    color:#333333;
    font-weight: 600;
        width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}
.info-content  div{
    line-height: 28px;
}
.default-color{
    color:#00b0ff;
    margin-left: 20px;
}
.d-ib{
    width: 48px;
    text-align: center;
    height: 23px;
    line-height: 23px;
    display: inline-block;
    color: #ffffff;
    background-color: #ec6941;
    margin-left: 20px;
    border-radius: 2px;
}
.avatar{
    border-radius: 2px;
}
.info-content  div.upload-txt{
    display: none;
    left: 0;
    top:0;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    color:#fff;
    line-height: 120px;
}

.livegidt-list ul li:hover .livegift-hover{
    display: block;
}
.my_dialog  .pre_img,.my_dialog .avatar {
    height: 198px;
    width: 198px;
    text-align: center;
    background-color: #F5F5F5;
    border:1px solid #D9D9D9;
    border-radius: 2px;
    font-size:12px;
    color:#CCCCCC;
    line-height: 20px;
}

.my_dialog  .pre_img i:before{
    display:inline-block;
    width:71px;
    height: 64px;
    margin:50px auto 8px auto;
    background: url(../../common/image/icon_img.png) no-repeat;
    content:'';
}

.my_dialog  .avatar-uploader{
    height:34px;
    border-radius: 2px;
    margin:10px 0 0 60px;
}
.textarea_heigth{
    margin-bottom:0;
}
.info-content .my_dialog   div.avatarImg{
    height: 200px;
    width: 200px;
    display: table-cell;
    text-align: center;
}
.el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
/* .avatar {
    width: 130px;
    height: 130px;
} */

.info-content  div.avatarImg{
    width:130px;
    height: 130px;
    line-height: 0;
}
.upload-txt{
    display: none;
    left: 0;
    top:0;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    color:#fff;
}
.avatarImg:hover .upload-txt{
    display: block;
}
.edit_btn{
    color:#2B6CFF;
    cursor: pointer;
}
.edit_btn i{
    display: inline-block;
    width:16px;
    height:16px;
    background: url(../../common/image/icon_edit_active.png) no-repeat;
    background-size:16px 16px;
    position: relative;
    top:3px;
    left:-3px;
}
.statistics .btn_32{
    width:80px;
    padding:0;
}
.hover_b:hover{
    box-shadow: 0px 6px 9px 0px rgba(215, 235, 255, 1);
    -webkit-box-shadow: 0px 6px 9px 0px rgba(215, 235, 255, 1);
}
.hover_r:hover{
    box-shadow: 0px 6px 9px 0px rgba(255, 220, 231, 1);
    -webkit-box-shadow: 0px 6px 9px 0px rgba(255, 220, 231, 1);
}
.hover_y:hover{
    box-shadow: 0px 6px 9px 0px rgba(255, 230, 188, 1);
    -webkit-box-shadow: 0px 6px 9px 0px rgba(255, 230, 188, 1);
}
.default-bg .info .btn.btn_34{
   color:rgba(51,51,51,1);
}
.default-bg .info .btn.btn_34:hover{
    color: #fff;
    background-color: #5FAEFF;
    border-color: #5FAEFF;
}
</style>
<style>
.info .el-upload--picture-card{
    border: 1px solid #eee;
    width: 120px;
    height: 40px;
    line-height: 40px;
    background-color: #f1f5f9;
    border: 1px solid #dddee0;
    font-size: 14px;
    margin: 36px 20px 55px 28px;
}
.info-content  .btn_32 div{
    line-height:30px;

}
.info .my_dialog .el-upload {
    height: 34px;

}

.info .my_dialog .el-upload .el-button--info{
    background-color: #F2F2F2;
    color: #333333;
    border: 1px solid #CCCCCC;
}
.el-input__inner{
    padding-left: 10px;
}
.el-dialog__footer{
    padding-top:19px;
}
  .accountBtn {float: left;border-radius: 2px;margin-right: 15px;margin-top: 8px;padding: 0 12px;line-height: 32px;cursor: pointer;}
  .accountBtn:nth-child(1){color:#4285F4;border: 1px solid #4285F4;}
  .accountBtn:nth-child(2){color:#333;border: 1px solid #e5e5e5;}
</style>

