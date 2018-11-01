<template>
    <div class="newLive">
        <m-header></m-header>
        <el-row>
            <el-col :span="3">
                <left-nav></left-nav>
            </el-col>
            <el-col :span="21" class="default-border">
                <div class="newList-list mt20">
                    <el-form ref="form" :rules="rules" :model="form" label-width="88px">
                        <el-row>
                            <el-col :span="10" :offset="2">
                                    <el-form-item label="直播标题:" prop="live_name">
                                        <el-input v-model="form.live_name" :maxlength="20"></el-input>
                                    </el-form-item>
                                    <el-form-item label="直播简介:" prop="live_text">
                                        <el-input type="textarea" resize="none" v-model="form.live_text"></el-input>
                                    </el-form-item>
                                    <el-form-item label="活动时间:">
                                        <el-col :span="11">
                                            <el-form-item prop="date1">
                                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col class="line te-c" :span="2">-</el-col>
                                        <el-col :span="11">
                                            <el-form-item prop="date2">
                                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="参与方式:" prop="region">
                                        <el-select style="width:100%" v-model="form.region" @change="regionVal" placeholder="公开">
                                            <el-option label="公开" value="open"></el-option>
                                            <el-option label="密码" value="encryption"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item v-if="regionMode" label="直播间密码:" prop="view_pass">
                                        <el-input v-model="form.view_pass"></el-input>
                                    </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                 <el-upload
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
                                </el-upload> 
                            </el-col>
                        </el-row>
                        <el-row  :span="24">
                            <el-form-item class="te-c">
                                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                                <el-button @click="resetForm('form')">重置</el-button>
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
    import {setDate,filterObj,copyData} from 'api/http'
    import axios from 'axios'
    import {ERR_OK, DATA_URL} from 'api/config'
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
                        if (this.form.view_pass !== '') {
                            this.$refs.form.validateField('view_pass')
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
                form:{
                    live_name:'',
                    live_text:'',
                    date1:'',
                    date2:'',
                    region:'',
                    live_cover_id:'',
                    view_pass:''
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
                    date1:[
                        {type:'date',message:'请选择日期',trigger: 'change'}
                    ],
                    date2:[
                        {type:'date',message:'请选择时间',trigger: 'change'}
                    ],
                    region:[
                        {message: '请选择参与方式', trigger: 'change'}
                        // {required: true,message: '请选择参与方式', trigger: 'change'}
                    ],
                    view_pass:[
                        {validator:validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = filterObj(this.form)
                        // 格式化日期时间
                        if(obj.date1 && obj.date2){
                            obj.begin_time = setDate(obj.date1,obj.date2)
                        }
                        obj.user_id = localStorage.getItem('user_id')
                        // formData 深拷贝后的对象
                        let formData = copyData(obj)
                        // 格式化数据
                        delete formData.date1
                        delete formData.date2
                        delete formData.region
                        // console.log(formData)
                        // 上传图片

                        if(formData.live_cover_id){
                            let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
                            let formdata = new FormData()
                            formdata.append('file_data',this.file)
                            formdata.append('user_id',localStorage.getItem('user_id'))
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
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        }

                        // end 上传图片

                        // 创建直播
                        setTimeout(()=>{
                            let dataParams = {
                                user_id:localStorage.getItem('user_id'),
                                live_name:formData.live_name,
                                live_text:formData.live_text,
                                begin_time:formData.begin_time,
                                live_text_imgsid:this.imgId
                            }
                            console.log('dataParams',dataParams,this.imgId)
                            // 过滤空参数
                            // console.log(filterObj(dataParams))
                            // let formdata = new FormData()
                            // formdata.append('user_id',localStorage.getItem('user_id'))
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
                                    console.log(response)
                                    this.$router.push({
                                        path:'/main'
                                    })
                                }
                            }).catch(function(err){
                                console.log(err);
                            })
                        }, 1000)
                        // end 创建直播
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName){
                this.$refs[formName].resetFields()
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
            }
        },
        components:{
            MHeader,
            LeftNav
        }
    }
</script>

<style scoped>
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
    width:230px;
    height:230px;
    border: 1px dashed #d9d9d9; 
}
.avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    line-height: 130px;
    text-align: center;
}
.uploaderTips span{
      font-size:12px;
      color:#888;
}
.avatar {
    width: 230px;
    height: 230px;
    display: block;
}
</style>