<template>
    <div class="newlivedata">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
            <div>
                <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" :prop="'domains.' + index + '.contentDesc'" :rules="{
                    required: true, message: '直播简介不能为空', trigger: 'blur'
                    }">
                <!-- <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'直播简介' + index" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
                    required: true, message: '直播简介不能为空', trigger: 'blur'
                    }"> -->
                    <el-input v-model="domain.contentDesc"></el-input>
                    <!-- <el-button @click.prevent="removeDomain(domain)">删除</el-button> -->
                </el-form-item>
            </div>
        
            <div class="clear">
                <div class="img-file p-r te-c fl" v-for="(file,index) in fileList">
                    <img  class="upload-img p-a" :src="file.show_url" >
                    <i class="el-icon-circle-close p-a" @click="deleteList(file,index)"></i>
                </div>
            </div>
            
            <div>
                <!-- <el-upload
                    auto-upload="false"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :show-file-list="false"
                    :file-list="fileList"
                    action="http://mwlivetest.facebac.com/api/mwlive/setup/file_upload.do"
                    :data="{'user_id':userID,'file_type':1}"
                    :headers="{'Content-Type': 'multipart/form-data'}"
                > -->
                <el-upload
                    class="upload-button"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="fileFunc"
                    accept=".jpg, .png,.jpeg"
                    :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i> 添加图片简介
                </el-upload>
                <!-- <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl">
                </el-dialog> -->
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="addDomain">新增直播简介</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {ERR_OK, DATA_URL,getLStorage} from 'api/config'
    import {axiosData} from 'api/http'
    export default{
        data() {
            return {
                data_url:DATA_URL,
                userID:getLStorage('user_id'),
                dynamicValidateForm: {
                    domains: [
                        // {
                        //     value: ''
                        // }
                    ],
                },
                dialogImageUrl: '',
                dialogVisible: false,
                removeID:'',
                fileList:[]
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                console.log(item)
                return false
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            // handleSuccess(file,fileList){
            //     // console.log('handleSuccess',file,fileList)
            //     this.fileList.push(fileList)
            //     console.log(this.fileList)
            //     this.addDomain()
            // },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            handleRemove(file, fileList) {
                console.log(fileList);
                // console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                console.log(this.fileList)
                console.log(file,file.uid)
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                // for(){

                // }
            },
            deleteList(file,index){
                // delete this.dynamicValidateForm.domains[index]
                // delete this.fileList[index]
                this.dynamicValidateForm.domains.splice(index, 1)
                this.fileList.splice(index, 1)
                console.log(this.fileList,this.dynamicValidateForm.domains)
            },
            beforeAvatarUpload(file) {
                // console.log(file)
                // this.file = file
                // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                // const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG、PNG、JPEG 格式!');
                // }
                // if (!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            },
            fileFunc(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.tipsMessage('上传头像图片只能是 JPG、PNG、JPEG格式!','error')
                    return false
                }
                if (!isLt2M) {
                    this.tipsMessage('上传图片大小不能超过 2MB!','error')
                    return false
                }
                this.file = file.raw

                // let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
                let formdata = new FormData()
                formdata.append('file_data',this.file)
                formdata.append('user_id',getLStorage('user_id'))
                formdata.append('file_type',1)

                let that = this
                axiosData(formdata,DATA_URL +'mwlive/setup/file_upload.do').then(res => {
                    if(res.data.code == ERR_OK){
                        console.log(res.data.data.show_url)
                        that.fileList.push({'show_url':res.data.data.show_url})
                        that.addDomain()
                        console.log(that.fileList)
                    }else{
                        that.tipsMessage('上传失败','error')
                    }
                })
                // this.form.live_cover_id = file.url
                console.log('fileFunc',file)
            },
            tipsMessage(message,type){
                this.$message({
                    showClose: true,
                    message: message,
                    type: type || 'info'
                })
            }
        }
    }
</script>

<style scoped>
.newlivedata .el-form-item.is-required{
    display:inline-block;
}
.newlivedata .el-form-item.is-required,.img-file{
    width:200px;
    margin:10px 10px 10px 0;
}
.img-file{
    height:200px;
    border:1px solid #eaeaea;
}
.upload-img{
    max-width:200px;
    max-height:200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.el-icon-circle-close{
    right:-5px;
    top:-5px;
    font-size: 18px;
    color:#999;
}
.upload-button{
    color:#666;
    display:inline-block;
    border:1px solid #eaeaea;
    padding:15px 50px;
}
</style>
