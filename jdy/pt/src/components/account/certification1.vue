<template>
    <div class="my_list certification ">
        <div class="live-top">账户认证</div>
        <div class="bg-fff col-333 content">
            <el-row  class="table_form mt30">
                <div class="content_section">
                    <div class="title">审核信息</div >
                    <div  class="tc">
                        <p style="color:#F5A623;" v-if="qualifyStu=='1'">您的信息正在审核中，大约需要1-3个工作日。</p>
                        <div v-if="qualifyStu=='2'">
                            <p style="color:#FC296C;font-weight: bolder;">认证失败</p>
                            <p style="color:#262626;font-size:14px;">身份证号码与证件不一致，上传的照片模糊不清</p>
                        </div>
                        <p style="color:#7ED321" v-if="qualifyStu=='3'">您已实名认证成功！</p>
                    </div >
                </div>
                <div class="content_section">
                    <div class="title">
                        基本信息
                    </div>
                    <div class="Tf_content">
                        <div class="Tf_item">
                            <span class="m_lable default-color">真实姓名：</span>
                            <span>{{realName}}</span>
                        </div>
                        <div class="Tf_item">
                            <span class="m_lable default-color">身份证号：</span>
                            <span>{{idNo}}</span>
                        </div >
                        <el-row class="Tf_item">
                            <div style="width:80px;display:inline-block;">
                                <span class="m_lable default-color">照片信息：</span>
                            </div>
                            <div class="card_box">
                                <img :src="cardFileUrl" alt="" class="pre_idCard">
                            </div>
                            <div class="card_box">
                                <img :src="handFileUrl" class="pre_idCard" alt="">
                            </div >
                        </el-row>
                    </div>


                </div>
                <div class="tc">
                    <el-button v-if="qualifyStu=='2'" class="btn_40 blue_btn" style="width:120px;padding:0;margin:0 auto" @click="noSubmit = true">重新提交</el-button>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK, DATA_URL,getLStorage,setLStorage} from 'api/config'
    import {axiosData} from 'api/http'
    export default{
        data(){
            var regName =/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                }
                setTimeout(() => {
                    // if (regExp.test(value) === false) {
                    if (!regName.test(value)) {
                        callback(new Error('请输入正确的姓名'))
                    } else {
                        // if (value.length < 6) {
                        //     callback(new Error('不能低于6位'))
                        // } else {
                            callback()
                        // }
                    }
                }, 1000);
            };
            var checkIdentityCard = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('身份证号码不能为空'));
                }
                setTimeout(() => {
                    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
                    if(!value || !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(value)){
                        ///^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/
                        return callback(new Error('身份证号格式错误'));
                    }else if(!city[value.substr(0,2)]){
                            return callback(new Error('身份证号格式错误'));
                    } else{
                            //18位身份证需要验证最后一位校验位
                            if(value.length == 18){
                                value = value.split('');
                                //∑(ai×Wi)(mod 11)
                                //加权因子
                                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                                //校验位
                                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                                var sum = 0;
                                var ai = 0;
                                var wi = 0;
                                for (var i = 0; i < 17; i++)
                                {
                                    ai = value[i];
                                    wi = factor[i];
                                    sum += ai * wi;
                                }
                                var last = parity[sum % 11];
                                if(parity[sum % 11] != value[17]){
                                    return callback(new Error('请输入正确的身份证号码'));
                                }
                            }
                        }
                    callback()
                }, 1000);

            };
            return{
                formData:{},
                noSubmit:true,
                qualify:'',
                qualifyTit:'',
                qualifyMsg:'',
                realName:'',
                idNo:'',
                cardFileUrl:'',
                handFileUrl:'',
                qualifyStu:'',
                ruleForm: {
                    rzName: '',
                    rzCard: '',
                    rzPhoneCard:'',
                    rzPhoneHand:'',
                    phoneCardUrl:'',
                    phoneHandUrl:'',
                },
                rules: {
                    rzName: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    rzCard: [
                        { validator: checkIdentityCard, trigger: 'blur' }
                    ],
                }
            }
        },
        created(){
            this.getDate()
        },
        methods:{
            getDate(){
                let userId =  getLStorage("userId")
                axios.get(DATA_URL + 'mwlive/user/user_qualify_cx.do?userId='+ userId
                ).then((rs) => {
                    if(rs.data.code == ERR_OK){
                        if(rs.data.data){
                            //实名信息已提交
                            console.log(rs.data.data)
                            this.realName = rs.data.data.rzName
                            this.idNo = rs.data.data.rzCard
                            this.cardFileUrl = rs.data.data.cardFileUrl
                            this.handFileUrl = rs.data.data.handFileUrl
                            this.qualifyStu = rs.data.data.qualify
                            // if(rs.data.data.qualify == 1){
                            //     // 认证中
                            //     this.qualifyMsg = "您的信息正在审核中，大约需要1-3个工作日。"
                            // }
                            // if(rs.data.data.qualify == 2){
                            //     // 认证失败
                            //     this.qualifyTit = "认证失败"
                            //     this.qualifyMsg = rs.data.data.rzReason
                            // }
                            // if(rs.data.data.qualify == 3){
                            //     // 认证成功
                            //     this.qualifyMsg = "您已实名认证成功！"

                            // }
                            //提交实名
                            this.noSubmit = false
                        }else{
                            //实名信息未提交
                            this.noSubmit = true
                        }
                    }
                }).catch(function(err){
                    console.log("err",err)
                })
            },
            tipsMessage(message,type){
                this.$message({
                    showClose: true,
                    message: message,
                    type: type || 'info'
                })
            },
            beforeAvatarUpload(){

            },
            identityCardFunc(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.tipsMessage('上传封面只能是 JPG、PNG、JPEG格式!','error')
                    return false
                }
                if (!isLt2M) {
                    this.tipsMessage('上传封面大小不能超过 2MB!','error')
                    return false
                }
                let formdata = new FormData()
                formdata.append('file_data',file.raw)
                formdata.append('user_id',getLStorage('user_id'))
                formdata.append('file_type',1)
                var that = this
                axiosData(formdata,DATA_URL+'mwlive/setup/file_upload.do').then(res => {
                    if(res.data.code == ERR_OK){
                        this.ruleForm.rzPhoneCard = res.data.data.save_id
                        this.ruleForm.phoneCardUrl  = res.data.data.show_url
                    }else{
                        that.tipsMessage('上传失败','error')
                    }
                })
            },
            identityCardFunc2(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.tipsMessage('上传封面只能是 JPG、PNG、JPEG格式!','error')
                    return false
                }
                if (!isLt2M) {
                    this.tipsMessage('上传封面大小不能超过 2MB!','error')
                    return false
                }
                let formdata = new FormData()
                formdata.append('file_data',file.raw)
                formdata.append('user_id',getLStorage('user_id'))
                formdata.append('file_type',1)
                var that = this
                axiosData(formdata,DATA_URL+'mwlive/setup/file_upload.do').then(res => {
                    if(res.data.code == ERR_OK){
                        this.ruleForm.rzPhoneHand = res.data.data.save_id
                        this.ruleForm.phoneHandUrl  = res.data.data.show_url
                    }else{
                        that.tipsMessage('上传失败','error')
                    }
                })
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formdata = new FormData()
                        if(this.ruleForm.rzPhoneCard&&this.ruleForm.rzPhoneHand){
                            let url = DATA_URL + 'mwlive/user/user_qualify.do'
                            let formdata = new FormData()
                            formdata.append('userId',getLStorage('user_id'))
                            formdata.append('rzName',this.ruleForm.rzName)
                            formdata.append('rzCard',this.ruleForm.rzCard)
                            formdata.append('rzPhoneCard',this.ruleForm.rzPhoneCard)
                            formdata.append('rzPhoneHand',this.ruleForm.rzPhoneHand)
                            let that = this
                            axios({
                                method: 'post',
                                url: url,
                                data:formdata,
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((res) => {
                                if(res.data.code == ERR_OK){
                                    this.tipsMessage('提交成功!','success')
                                    this.getDate()
                                    this.noSubmit = false
                                }
                            })
                            .catch(function(err){
                                that.tipsMessage('提交失败!','error')
                                console.log(err)
                            })
                        }else{
                            this.tipsMessage('请上传身份证照片','error')
                        }
                        // end 上传图片
                    } else {
                        this.disabled = false
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>

.certification .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.certification .avatar-uploader,.certification .el-form-item.textarea_heigth {
    width:80px;
    position: relative;
    left: 292px;
    top: -34px;
}
.certification .el-textarea__inner{
    resize:none;
}
.certification .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.certification .uploaderTips{
    width:360px;
    border: 1px dashed #d9d9d9;
    text-align: center;
    /* margin-left: 30px; */
    background: #f1f5f9;
    padding:18px 0;
}

.certification .img_box img{
    width: 100%;
    height: 100%;

}
.pre_img{
    display: inline-block;
    width: 200px;
    height:200px;
    border:1px solid #E5E5E5;
    border-radius: 2px;
    margin:0 auto;
    text-align: center;
    margin-left:60px;
}
.certification .uploaderTips span{
      font-size:12px;
      color:#888;
      display: inline-block;
      line-height: 22px!important;
      letter-spacing: 1px;
}
.certification .avatar {
    width: 200px;
    height:200px;
}

.certification .grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.certification .textarea_heigth .el-textarea__inner{
    height:180px
}
.certification .tc{
    text-align: center;
}
.certification .m_lable{
    display: inline-block;
    /* width: 80px;
    text-align: right; */
}
.certification .pre_idCard{
    width:400px;
    height: 150px;
}
.certification  .pre_img i:before{
    display:inline-block;
    width:71px;
    height: 64px;
    margin:68px auto 0 auto;
    background: url(../../common/image/icon_img.png) no-repeat;
    content:'';
}
.certification .content_section .tc{
    height:100px;
    line-height: 100px;
    font-size:16px;
    vertical-align: middle;
}
.certification .content_section .tc div{
    line-height: 25px;
    padding-top:25px;
}
.certification  .Tf_item{
    margin-bottom: 20px;
}
.certification  .card_box{
    display: inline-block;
    width:200px;
    height:200px;
    margin-right:50px;
    vertical-align: top;
}
.certification  .card_box img{
    width:100%;
    height:100%;
    border-radius: 2px;
}
.f1{
    width: 66px;
    height: 66px;
}
</style>

