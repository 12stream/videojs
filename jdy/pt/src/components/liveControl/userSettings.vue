<template>
    <div class="userSetting">
        <div v-if="!addUser">
            <div class="live-top bg-fff">重要人物设置</div>
            <div class="btn_fr">
                <el-button class="bgc_txt  btn_30" type="primary" @click="addOpen('formAddUser')" >新增用户</el-button>
            </div>
            <div class="bg-fff info-content" style="padding:50px 0 0 0;">
                <el-table
                :data="tableData"
                stripe
                 v-if="isData"
                style="margin:0 auto;height:520px;text-align:center;" height="529">
                    <el-table-column
                        label="图片"
                        width="132"
                    >
                   <template slot-scope="scope">
                        <div class="dataImgBody">
                            <img class="dataImg" :src="scope.row.photo">
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                        prop="name"
                        label="名称"
                        width="100"
                    >
                    </el-table-column>

                    <el-table-column
                        prop="title"
                        label="职位"
                        width="100"
                    >
                    </el-table-column>

                    <el-table-column
                        prop="phone"
                        label="电话号"
                        width="120"
                    >
                    </el-table-column>

                    <el-table-column
                        prop="content"
                        label="简介"  
                        width="330"                      
                    >
                        <template slot-scope="scope" >
                            <span class="content_info">{{scope.row.content}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="操作"
                        align="center"
                        >
                    <template slot-scope="scope">
                        <el-button class="hover_blue"  @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button class="hover_red"  @click="openDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div v-if="!isData"  class="no_user"> 
                        <div class="no_data"></div>                                                                                                                       
                        <div class="tip_no_data">
                        <span class="default-color">当前直播间无特殊用户，快去添加吧！</span>
                    </div>               
                </div>
                <!-- <el-pagination class="mt10"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pagesize"
                    layout="prev, pager, next"
                    :total="total"
                    >
                </el-pagination> -->
            </div>
        </div>
       
        <div v-if="addUser">
            <div class="live-top bg-fff">{{addTille}}</div>
            <div class="bg-fff info-content" style="padding:35px 0 20px 0;">
                <div class="fl phone_box">
                    <div class="center_box">
                        <div class="title"></div>
                        <div class="content clear">
                            <div class="phone_img fl">
                                <img v-show="formAddUser.photo" :src="photo" alt="" >
                                <img v-show="!formAddUser.photo" src="../../common/image/user_header.png"  alt="" style="border:1px solid #ccc;">
                            </div>
                            <div class="fr">
                                <div style="position:relative;height:29px;">
                                    <div class="user_img">
                                        <img v-if="formAddUser.user_img" :src="formAddUser.user_img"  alt="">
                                        <img v-if="!formAddUser.user_img" src="../../common/image/user_header.png"  alt="" style="border:1px solid #ccc;">
                                    </div>
                                    <div class="user_name">{{formAddUser.name?formAddUser.name:'用户名'}}</div>
                                    <div class="user_job">{{formAddUser.title?formAddUser.title:'职位'}}</div>
                                </div>
                            </div>
                            <div class="intro">
                                <p class="intro_pt">
                                    {{formAddUser.content?formAddUser.content:'请在右侧输入用户简介'}}
                                </p>                            
                            </div>

                        </div>
                    </div>
                </div>
                <div class="fl  form_box" style="width:370px;">
                    <el-form    label-position="right" label-width="80px" :model="formAddUser"  ref="formAddUser" >
                        <!-- <el-form-item label="头像 :"  :rules="[
                            {required: true, message: '简介不能为空', trigger: 'blur'},
                        ]">
                            <el-upload  
                            class="cur-p"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="uploaUserImg"
                            accept=".jpg, .png, .jpeg"
                            :before-upload="beforeAvatarUpload">                                
                            <el-button class="btn_D9 btn_34" style="margin-left:0;"  type="info">上传</el-button>
                            </el-upload>
                        </el-form-item> -->
                        <el-form-item label="照片 :"    :rules="[
                            {required: true, message: '照片不能为空', trigger: 'blur'},
                        ]">
                            <el-upload  
                            v-show="!formAddUser.photo"
                            class="cur-p"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="uploadImg"
                            accept=".jpg, .png, .jpeg"
                            :before-upload="beforeAvatarUpload"
                                                      
                            >                                
                            <el-button class="btn_D9 btn_34" style="margin-left:0;"  type="info">选择图片</el-button>  
                            </el-upload>
                           <!-- <input type="file" id="uploads"  value="选择文件" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)"> -->

                            <p  v-show="!formAddUser.photo"  class="img_tips" style="margin-top: -7px;margin-bottom: 20px;">图片大小 2M 以内，尺寸比例为 9 : 16</p>                         

                            <span  v-show="formAddUser.photo" class="img_name" style="margin-left:0;"  type="info">
                                {{photoName}}
                            </span>  

                             <el-upload
                                v-show="formAddUser.photo"  
                                style="display:inline-block;margin-left:20px;"
                                class="cur-p"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="uploadImg"
                                accept=".jpg, .png, .jpeg"
                                :before-upload="beforeAvatarUpload"
                                >      
                                <span style="color:#2B6CFF;;position: relative;top:-11px" >重新上传</span>                          
                            </el-upload> 
                            <p   v-show="formAddUser.photo"  class="img_tips" style="margin-top: -17px;margin-bottom: 20px;">图片大小 2M 以内，尺寸比例为 16 : 9</p>

                        </el-form-item>
                        <el-form-item label="用户名 :"  prop="name"  :rules="[
                            {required: true, message: '用户名不能为空', trigger: 'blur'}, 
                            { max: 15, message: '用户名不能超过20个字符', trigger: 'blur' }                   
                        ]">
                            <el-input :maxlength="15" class="my_input inp_300" v-model="formAddUser.name"></el-input>
                        </el-form-item>
                        <el-form-item label="职位 :"   prop="title"  :rules="[
                            {required: true, message: '职位不能为空', trigger: 'blur'},
                        ]">
                            <el-input :maxlength="20" class="my_input inp_300" v-model="formAddUser.title"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号 :"  prop="phone"  :rules="[
                            {required: true, message: '手机不能为空', trigger: 'blur'},
                            { pattern: /^[1][345789]\d{9}$/, message: '请输入正确的手机号',trigger: 'blur' }
                        ]">
                            <el-input :maxlength="11" class="my_input inp_300" v-model="formAddUser.phone"></el-input>
                            
                        </el-form-item>
                        <el-form-item label="简介 :"   prop="content"  :rules="[
                            {required: true, message: '简介不能为空', trigger: 'blur'},
                        ]">
                            <el-input :maxlength="100" class="my_input inp_300" type="textarea" v-model="formAddUser.content"></el-input>
                            <div class="text_tip">{{formAddUser.content?formAddUser.content.length:0}}<span>/100</span></div>
                        </el-form-item>
                    </el-form>
                    <div class="primary_btn" style="margin-left:102px;margin-top:30px;">
                        <el-button type="primary" class="btn blue_btn"  @click="addUserFun('formAddUser',false)" :disabled="disabled">确 定</el-button>
                        <el-button type="button" class="btn blue_btn border_btn btn_38" @click="closeAdd('formAddUser')">取消</el-button>
                    </div>
                   
                </div>
            </div>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="360px"
        height="196px"
        class="my_dialog confirm_dialog"
        size="tiny"
        :show-close="false"
        >
        <span>确认将“{{delName}}”用户从重要人物列表中删除吗？</span>
        <span slot="footer" class="dialog-footer">            
            <el-button type="primary" @click="deleteData">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
        <!-- 图片裁剪 -->
         <!-- <el-dialog
            title="提示"
            :visible.sync="cropperDialog"
            width="640px"
            height="596px"
            class="my_dialog"
            size="tiny"
            :show-close="false"
            >
            <div class="my_cropper">
                <div class="cropper_wrapper">
                    <vueCropper
                        ref="cropper2"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="option.info"
                        :canScale="option.canScale"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixed="option.fixed"
                        :fixedNumber="option.fixedNumber"
                        @realTime="realTime"
                    ></vueCropper>
                </div>	
                <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                    <div :style="previews.div" class="preview">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </div>
            
        </el-dialog>        -->
        <!-- 图片裁剪end -->

        
    </div>
</template>

<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,PAGE_SIZE} from 'api/config'
    import axios from 'axios'
    import {setDate} from 'api/http'
    // import vueCropper from 'vue-cropper'
    export default{
        data() {
            return {
                currentPage:1,
                pagesize:10,
                total:1,
                tableData: [],
                
                ruleForm: {
                    userName:'',
                    phone: '',
                },

                formAddUser:{
            
                  
                },
                isData:false,
                disabled:false,
                scope:[],
                addUser:false,
                fileImg:'',
                filePhoto:'',
                photo:"",
                photoName:'',
                fileUserImg:'',
                addTille:'新增用户',
                isEdit:false,
                dialogVisible:false,
                delId:'',
                delName:'',
                // 图片裁剪
                crap: false,
                previews: {},
                option: {
                    img: 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png',
                    info: true,
                    size: 1,
                    outputType: 'png',
                    canScale: false,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 210,
                    autoCropHeight: 375,
                    // 开启宽度和高度比例
                    fixed: true,
                    canMove:false,
                    fixedNumber: [9, 16],
                    full: false,//输出原图比例截图 props名full
                },
                downImg: '#',
                cropperDialog:false,
                changeImg:'',
            }
        },
        // components: {
        //     vueCropper
        // },
        created(){
            this.getDataList()
        },
        methods:{
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
            // 图片裁剪
           
            // 实时预览函数 
            realTime (data) { 
                console.log("#######")
                console.log(data.url)
                this.previews = data 
            },
            
            // 图片裁剪结束
            beforeAvatarUpload(file) {
                this.fileImg = this.form.fileImg = file
                const isJPG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.successMessage('上传头像图片只能是 JPG 格式!',error);
                }
                if (!isLt2M) {
                    this.successMessage('上传头像图片大小不能超过 2MB!',error);
           
                }
                return isJPG && isLt2M;
            },
            fileFunc(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg' ;
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    successMessage('上传照片只能是 JPG、PNG、JPEG!',error)
                    return false
                }
                if (!isLt2M) {
                    successMessage('上传照片大小不能超过 2MB!',error)
                    return false
                }
                this.fileImg = file.raw
                this.formAddUser.photo = file.url 
                this.photo = file.url 
               
            },
            // 照片
            uploadImg(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg' ;
                const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isJPG) {
                if (!isJPG) {
                    this.successMessage('上传头像图片只能是 JPG、PNG、JPEG!','error')
                    return false
                }
                if (!isLt2M) {
                    this.successMessage('上传头像图片大小不能超过 2MB!','error')
                    return false
                }
                // 保存照片
                this.filePhoto = file.raw               
                let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
                let formdata = new FormData()
                formdata.append('file_data',this.filePhoto)
                formdata.append('user_id',getLStorage('user_id'))
                formdata.append('file_type',1)
                formdata.append('biz_type',1)
                axios({
                    method: 'post',
                    url: imgUrl,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == ERR_OK){
                        this.formAddUser.photo = res.data.data.show_url
                        this.photo =  res.data.data.show_url 
                        // photoName
                        this.photoName = file.raw.name
                        this.successMessage('图片上传成功')
                    }else{
                        this.successMessage('请选择图片！','error')
                    }
                })
                .catch((err) => {
                    this.successMessage('上传照片失败!','error')
                    console.log(err)
                })
            },
          
            // 头像
            // uploaUserImg(file){
            //     let imgtype = file.raw.type
            //     const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg' ;
            //     const isLt2M = file.size / 1024 / 1024 < 2;
            //     // if (!isJPG) {
            //     if (!isJPG) {
            //         this.successMessage('上传头像图片只能是 JPG、PNG、JPEG!','error')
            //         return false
            //     }
            //     if (!isLt2M) {
            //         this.successMessage('上传头像图片大小不能超过 2MB!','error')
            //         return false
            //     }
            //     // 保存头像
            //     this.fileUserImg = file.raw
            //     let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
            //     let formdata = new FormData()
            //     formdata.append('file_data',this.fileUserImg)
            //     formdata.append('user_id',getLStorage('user_id'))
            //     formdata.append('file_type',1)
            //     formdata.append('biz_type',1)
            //     axios({
            //         method: 'post',
            //         url: imgUrl,
            //         data:formdata,
            //         headers: {'Content-Type': 'multipart/form-data'}
            //     }).then((res) => {
            //         if(res.data.code == ERR_OK){
            //             this.formAddUser.user_img = res.data.data.show_url
            //         }else{
            //             this.successMessage('请选择图片！','error')
            //         }
            //     })
            //     .catch((err) => {
            //         this.successMessage('上传照片失败!','error')
            //         console.log(err)
            //     })
            // },
            getDataList(val){
                var _this = this
                let url = DATA_URL + 'mwlive/user/select_importantFigureList.do'
                let formdata = new FormData()
                formdata.append('live_id',getLStorage("liveID"))
                formdata.append('page_size',this.pagesize)
                if(val){
                    formdata.append('page_index',this.currentPage)
                }else{
                    formdata.append('page_index',1)
                }
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        if(res.data.data&&res.data.data.length>0 &&res.data.data!='无数据'){
                            _this.isData =true
                            _this.tableData = res.data.data  
                            // _this.total = parseInt(res.data.data.page.total)
                        }else{
                            this.isData =false
                            // _this.total = 0
                        }                                                                      
                    }      
                            
                }).catch((err)=>{
                    console.log(err)
                })
            },
           
            // 新增用户
            addUserFun(formName){
                var _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {    
                                           
                        if(!_this.formAddUser.photo){
                            _this.successMessage('请上传用户照片','error')
                            return
                        }  
                         _this.disabled = true   
                        if(_this.editId){                            
                            this.submitAdd()   
                        }else{
                            // 查询是否存在用户
                            axios.get(DATA_URL + 'mwlive/user/select_oneImportantFigure.do?live_id='+ getLStorage('liveID')  + '&phone=' + _this.formAddUser.phone
                            ).then((res) => {
                                if(res.data.code == ERR_OK&&res.data.data!=null){
                                    _this.successMessage('该用户已存在，请重新添加','error')
                                    _this.disabled = false
                                }else{
                                    _this.submitAdd()
                                }
                                 
                            }).catch(function(err){
                                console.log(err)
                            })
                        }    
                         _this.editId =''
                    }
                })
            },

            submitAdd(){
                let _this = this
                let formdata = new FormData()
                let url 
                if(_this.editId){
                    url = DATA_URL + 'mwlive/user/update_importantFigure.do' 
                    formdata.append('id',_this.editId)
                }else{
                    url = DATA_URL + 'mwlive/user/add_importantFigure.do'
                }                                                 
                formdata.append('live_id',getLStorage("liveID"))
                formdata.append('user_img',_this.formAddUser.user_img)
                formdata.append('name',_this.formAddUser.name)
                formdata.append('phone',_this.formAddUser.phone)
                formdata.append('title',_this.formAddUser.title)
                formdata.append('content',_this.formAddUser.content)
                formdata.append('photo',_this.formAddUser.photo) 
                _this.disabled = true           
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        _this.successMessage('提交成功')
                        // 验证重置
                        _this.getDataList()
                    }else{
                        _this.successMessage('提交失败','error')
                    }     
                    _this.disabled = false 
                    _this.addUser = false
                    _this.$refs[formName].resetFields();
                    _this.editId =''
                   
                }).catch((err)=>{
                    console.log(err)
                })
            },
            closeAdd(formName){
                this.$refs[formName].resetFields();
                this.addUser = false
            },
            addOpen(formName){
                this.formAddUser = {

                }
                // this.formAddUser.user_img = ''
                // this.formAddUser.name =''
                // this.formAddUser.phone = ''
                // this.formAddUser.title =''
                // this.formAddUser.content = ''
                // this.formAddUser.photo = ''
                this.addUser = true
                this.addTille = "新增用户"
            },
            // 删除
            openDelete(scope){
                this.dialogVisible = true
                this.delId = scope.id
                this.delName = scope.name
            },
            deleteData(){
                this.dialogVisible = false 
                var _this = this
                let url = DATA_URL + 'mwlive/user/delete_importantFigure.do'
                let formdata = new FormData()
                formdata.append('id',_this.delId)  
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        _this.successMessage('删除用户成功')
                        _this.getDataList()
                    }else{
                        _this.successMessage('删除用户失败','error')
                        _this.getDataList()
                    }      
                    _this.addUser = false
                }).catch((err)=>{
                    console.log(err)
                })
            },
            handleEdit(scope){
                var _this = this
                let url = DATA_URL + 'mwlive/user/select_importantFigure.do'
                let formdata = new FormData()
                formdata.append('id',scope.id)  
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){ 
                        _this.addTille = "编辑用户"
                        _this.addUser = true
                        _this.formAddUser.user_img = res.data.data.userImg
                        _this.formAddUser.name = res.data.data.name
                        _this.formAddUser.phone = res.data.data.phone
                        _this.formAddUser.title = res.data.data.title
                        _this.formAddUser.content = res.data.data.content
                        _this.formAddUser.photo = res.data.data.photo
                        _this.photo = res.data.data.photo
                        _this.photoName = res.data.data.photo


                        _this.editId = scope.id
                    }else{
                       
                    }      
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            successMessage(message,type) {
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },
        
        }
    }
</script>




<style scope>
.userSetting  .img_tips{
    font-size:12px;
    color:#9B9B9B;
    height:0;
    margin-bottom:10px;
}
.userSetting  .text_tip{
    width: 10px;
    position: absolute;
    top: unset;
    bottom: -14px;
    right: -30px;
    text-align: left;
}
.userSetting .no_user{
    text-align: center;
    margin:0 auto;
    vertical-align: middle;
    margin-top:124px;
}
.userSetting  .no_data{
    width:173px;
    height:144px;
    background: url(../../common/image/img_Load.png) no-repeat;  
    margin:0 auto;
    margin-bottom: 20px;
}
.userSetting{
    min-height:699px;
}
.userSetting .btn_fr{
    position: absolute;
    right:30px;
}
.userSetting .form_box{
    margin-left:68px;
    margin-top:37px;
}

.phone_box .center_box{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    -ms-transform:translate(-50%, -50%); 	/* IE 9 */
    -moz-transform:translate(-50%, -50%); 	/* Firefox */
    -webkit-transform:translate(-50%, -50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%, -50%); 	/* Opera */
 
}
.phone_box .phone_img {
    width:76px;
    height:auto;
    margin-top:17px;
}

.phone_box{
    width:271px;
    height:543px;
    background:url(../../common/image/phone.png) no-repeat;  
    margin-left:88px;
    position: relative;
}
.phone_box .title{
    position: relative;
    height:45px;
    background: url(../../common/image/title.png) no-repeat center center; 
    background-size: 162px 45px; 
    z-index:99;
}
.phone_box .content{
    width:196px;
    min-height:173px;
    background-color: #fff;
    border-radius: 16px;
    margin-top:-18px;
    padding: 6px 10px 7px 15px;
}
.phone_box .content .fr{
    width:100px;
}
.userSetting .user_img{
    width: 29px;
    height:29px;
    position: absolute;
    top:18px;
}
.user_img img{
    width: 100%;
    height:100%;
    border-radius: 100%;
}
.userSetting  .btn_D9{
    background-color: #D9D9D9;
    border:1px solid #CCCCCC;
    width:100px;
}
.userSetting  .blue_btn{
    width:100px;
    height:38px;
    line-height: 38px;;
}
.userSetting  .btn.border_btn{
    border:1px solid #2B6CFF;
    color:#2B6CFF;
    background-color: #fff!important;
    margin-left:52px;
}
.userSetting  .intro{
    font-size: 10px;
    line-height: 17px;
    width: 132px;
    -webkit-transform: scale(0.78);
    display: block;
    text-indent: 2em;
    margin-left: 78px;
    margin-top: 35px;

}
.img_name{
    box-sizing: border-box;
    display: inline-block;
    padding:0 10px;
    height:34px;
    line-height: 34px;
    background-color: #F5F5F5;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    border-radius: 2px;
    border:1px solid #CCCCCC;
}
.intro_pt{
    padding-top:18px;
    word-wrap:break-word;
}
.userSetting  .user_name{
   font-size: 12px;
    position: absolute;
    top: 20px;
    left: 37px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:66px;
}
.userSetting  .user_job{
    font-size: 12px;
    -webkit-transform: scale(0.8);
    color: #9B9B9B;
    position: absolute;
    top: 35px;
    left: 31px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:66px;
}
.userSetting .dataImgBody{
    width:91px;
    height:91px;
    margin:0 auto;
}
.userSetting .dataImgBody img{
    height:100%;
}
.content_info{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
}
.userSetting tbody .el-table__row td{
    border-right:1px solid #E5E5E5;
}
.my_cropper{
    position: relative;
    width:580px;
}
.my_cropper .show-preview{
    width:140px;
    height:250px;
    background: #ccc;
    position: absolute;
    right:0;
    top:0;
}
.userSetting .cropper_wrapper{
    width:400px;
    height:400px;
}
</style>
<style>
.userSetting  .my_input .el-input__inner{
  height: 34px;
  line-height: 34px;
}
.userSetting  .inp_300  .el-textarea__inner{
    height:120px;
    border-radius: 2px;
}
</style>


