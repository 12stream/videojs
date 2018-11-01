<template>
    <div class="my_list video_table videoManagement" style="min-height:522px;">
        <div class="live-top bg-fff clear">视频管理</div>
        <div class="bg-fff info-content" >
            <div style="margin-bottom:50px;" class="btn_header">
                <el-button class="bgc_txt  btn_30" type="primary" @click="uploadVideo()">上传</el-button>
                <el-button class="bgc_txt  btn_30 del_icon" type="info" v-show="del_disabled1" @click="delVideoMore()">删除</el-button> 
                <el-input class="search_btn" placeholder="请输入直播名称" v-model="search">
                    <el-button slot="append" icon="search" @click="getVideoListP(search)">搜索</el-button>
                </el-input>
            </div>
                <ul v-if="videoList.isData" class="video_table video_list" style="min-height:452px;">
                    <el-checkbox-group v-model="checkList">
                        <li  v-for="(item,index) in videoList.data" class="item_box">                            
                                 <div class="item clear">
                                    <el-checkbox :label="item.id"></el-checkbox>
                                    <div class="item_img fl">
                                        <img src="../../common/image/icon_play.png"  class="play_icon" alt="" @click="playVideo(item.url)">
                                        <img class="fl" :src="item.img">
                                    </div>
                                    <div class="item_info fl">
                                        <p class="length_txt">{{item.title}}</p>
                                        <p class="col_9B">时间 : {{item.createTime | filterTime}}</p>
                                        <p class="col_9B">简介 : {{item.synopsis=='undefined'?'':item.synopsis}}</p>
                                    </div>
                                    <div  class="item_btnG">                                        
                                        <el-button class="btn  btn_26 hover_blue"  @click="editVideo(item)">编辑</el-button>
                                        <el-button class="btn  btn_26 hover_red"  :disabled="del_disabled2" @click="delVideo(item)">删除</el-button>
                                    </div>
                                                                
                                </div>                              
                          
                        </li>
                    </el-checkbox-group>
                </ul>

            <div v-if="!videoList.isData"  class="no_video"> 
                    <div class="no_data"></div>                                                                                                                       
                    <div class="tip_no_data">
                    <span class="default-color">你还没有视频，快去上传吧！</span>
                </div>               
            </div>
           
            <el-pagination class="mt10" v-if="videoList.isData" 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page_index"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page_size"
                layout=" prev, pager, next"
                :total="total"
                background
                >
            </el-pagination>
        </div>
        <!-- 上传视频html结构-->
        <input type='button'  id='upload' value='上传' style="display:none">
        <input type='button'  id='stopload' value='暂停' style="display:none">
        <input type='button'  id='pickfiles' value='确定' style="display:none">
        <div class="fileDiv" id="container" style="display:none;">
            <input type="hidden" id="token" value=""/>
            <input type="hidden" id="folder_id" value="0"/>
            <input type="hidden" id="istranscode" value="0"/>
            <input type="hidden" id="file_type" value="video"/>
            <input type="button" id="pick_file" class="pick_file" value="选择文件" @click="pickfile()"/>
            <input type="button" id="up_load" value="上传" @click="upload()"/>                  
        </div>
        <!-- 上传视频html结构end-->

        <!-- 上传视频dialog -->
        <el-dialog  
            title="上传视频"
            :visible.sync="dialogUpdataVideo"
            width="638px"
            height="606px;"
            class="my_dialog"
            :show-close="false"
            >          
            <el-form :model="uploadVideoForm"  ref="uploadVideoForm"  label-position="right" label-width="88px" class="mt5">
                <el-form-item label="选择视频 :"  prop="video" class="is-required">        
                    <el-button   class="bgc_txt  btn_34 no_progress1" style="margin-left:0;"  type="info" @click="pickfile()">导入视频</el-button> 
                    <span class="no_progress1" style="color:#CCCCCC;margin-left:20px;">单个文件大小不超过4G、支持绝大多数视频格式</span>
                    <el-input v-model="uploadVideoForm.video"  id="videoSrc1" style="display:none"></el-input> 
                    <div id="progressDiv1">
                        <div class="progress_div">
                            <div class="progress_view">
                                <div class="control">
                                    <div class="progress_bar" id="percent"></div>
                                </div>
                            </div>
                        </div>  
                        <span class="videoupload_tip">
                            上传速度<span id="formatSpeed"></span>已上传<span id="percentTip"></span>
                        </span>                      
                        <span class="file_tip" id="reUploadVideo" style="display:none;cursor: pointer;" @click="pickfile()">重新上传</span>
                    </div> 
                    <div class="el-form-item__error my_form_err" style="display:none;" id="add_form_err">
                        请上传视频
                    </div>                                 
                </el-form-item>

                <el-form-item label="视频封面 :" prop="VideoCover"  id="item_add_cover"
                :rules="[
                            {required: true, message: '视频封面不能为空', trigger: 'blur'},                          
                        ]">
                    <el-upload
                    v-show="!VideoCover"
                    style="display: inline-block;" 
                    class="cur-p"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-change="videoCoverFunc"
                    :auto-upload="false"                                                                
                    accept=".jpg, .png, .jpeg"
                    :before-upload="beforeAvatarUpload"
                    > 
                        <el-button class="bgc_txt  btn_34" style="margin-left:0;"  type="info" @click="dialogUpdataVideo = true">选择图片</el-button>                    
                    </el-upload>
                    <span v-show="!VideoCover"  style="color:#CCCCCC;margin-left:20px;">尺寸1280x720，图片小于2M ( JPG、PNG、GIF )</span> 
                    <img v-show="VideoCover"  class="Video_cover" :src="VideoCover" alt="" >
                    <el-upload v-show="VideoCover"
                        style="display: inline-block;" 
                        class="cur-p"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-change="videoCoverFunc"
                        :auto-upload="false"                                                                
                        accept=".jpg, .png, .jpeg"
                        :before-upload="beforeAvatarUpload"
                        > 
                        <span style="color:#2B6CFF;;position: relative;top:10px;left:18px;" >重新上传</span>                      
                    </el-upload>
                </el-form-item>
                <el-form-item label="视频标题 :"  prop="title" :rules="[
                    {required: true, message: '视频标题不能为空', trigger: 'blur'},
                ]">
                    <el-input  v-model="uploadVideoForm.title" ></el-input>
                </el-form-item>
                <el-form-item label="视频简介 :"  prop="intro" style="margin-bottom:10px;">
                    <el-input type="textarea" v-model="uploadVideoForm.intro" class="txt_80" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="submitForm('uploadVideoForm',false)" :disabled="disUpload">确 定</el-button>
                <el-button @click="dialogUpdataVideo = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 上传视频dialog end -->

        <!-- 编辑视频dialog -->
        <el-dialog
            title="编辑视频"
            :visible.sync="dialogEdit"
            width="638px"
            :show-close="false"
            class="my_dialog"
            :before-close="closeChangeMachie"
            >
            <el-form :model="ruleFormEdit"  ref="ruleFormEdit"  label-position="right" label-width="88px" class="mt5">
                <el-form-item label="选择视频 :"  prop="video" class="is-required">        
                    <!-- <el-button   class="bgc_txt  btn_34 no_progress2" style="margin-left:0;"  type="info" @click="pickfile()">导入视频</el-button>  -->
                    <!-- <span class="no_progress2" style="color:#CCCCCC;margin-left:20px;">单个文件大小不超过4G、支持绝大多数视频格式</span> -->
                    <el-input v-model="ruleFormEdit.videoUrl"  id="videoSrc2" style="display:none"></el-input> 
                    <div id="progressDiv2">
                        <div class="progress_div">
                            <div class="progress_view">
                                <div class="control">
                                    <div class="progress_bar" id="percent"></div>
                                </div>
                            </div>
                        </div>
                        <span class="videoupload_tip">
                            上传速度<span id="formatSpeed"></span>已上传<span id="percentTip"></span>
                        </span>
                    </div> 
                    <span class="file_tip" style="cursor: pointer;" @click="pickfile()">重新上传</span>
                    <div class="pre_video" v-show="ruleFormEdit.videoUrl" id="pre_video">
                        <img src="../../common/image/icon_play.png"  class="play_icon" alt="">
                        <img class="fl"  :src="ruleFormEdit.videoCover">
                    </div> 
                    <div class="el-form-item__error"   style="display:none;" id="add_form_err">
                        请上传视频
                    </div>                                 
                </el-form-item>
                <el-form-item label="视频封面 :" prop="videoCover" 
                :rules="[
                            {required: true, message: '视频封面不能为空', trigger: 'blur'},                          
                        ]">
                    <el-upload
                    v-show="!ruleFormEdit.videoCover"
                    style="display: inline-block;" 
                    class="cur-p"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-change="imgUpload"
                    :auto-upload="false"                                                                
                    accept=".jpg, .png, .jpeg"
                    :before-upload="beforeAvatarUpload"
                    > 
                        <el-button class="bgc_txt  btn_34" style="margin-left:0;"  type="info" @click="dialogUpdataVideo = true">选择图片</el-button>                    
                    </el-upload>
                    <span v-show="!ruleFormEdit.videoCover"  style="color:#CCCCCC;margin-left:20px;">尺寸1280x720，图片小于2M ( JPG、PNG、GIF )</span> 
                    <img v-show="ruleFormEdit.videoCover"  class="Video_cover" :src="ruleFormEdit.videoCover" alt="" >
                    <el-upload v-show="ruleFormEdit.videoCover"
                        style="display: inline-block;" 
                        class="cur-p"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-change="imgUpload"
                        :auto-upload="false"                                                                
                        accept=".jpg, .png, .jpeg"
                        :before-upload="beforeAvatarUpload"
                        > 
                        <span style="color:#2B6CFF;;position: relative;top:-2px;left:18px;" >重新上传</span>                      
                    </el-upload>
                </el-form-item>
                <el-form-item label="视频标题 :"  prop="title" :rules="[
                    {required: true, message: '视频标题不能为空', trigger: 'blur'},
                ]">
                    <el-input  v-model="ruleFormEdit.title" ></el-input>
                </el-form-item>
                <el-form-item label="视频简介 :"  prop="intro" style="margin-bottom:10px;">
                    <el-input type="textarea" v-model="ruleFormEdit.intro" class="txt_80" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="submitEdit()" :disabled="disablEdedit">确 定</el-button>
                <el-button @click="dialogEdit = false">取 消</el-button>
            </span>
        </el-dialog> 
        <!-- 编辑视频dialog end -->

        <!-- 上传提示 -->
        <input id="otherTip" value=""  data-id="" @click="otherTip()">


        <!-- 添加视频 dialog-->
        <el-dialog  
            title="添加视频"
            :visible.sync="dialogAddVideo"
            width="638px"
            class="my_dialog mt_70"
            :show-close="false"
            >
            <el-input class="search_btn" placeholder="请输入视频名称" v-model="searchVideo">
                <el-button slot="append" icon="search" @click="getVideoLibrary(searchVideo)">搜索</el-button>
            </el-input>
            <ul v-if="VideoLibrary.isData" class="myTable_list my_checkbox_list">            
                <el-checkbox-group v-model="videoCheckList">
                    <li v-for="item in VideoLibrary.data" class="item_box">
                        <el-checkbox :label="item.id">
                            <div class="item">
                                    <div class="item_img fl">
                                        <img src="../../common/image/icon_play.png" class="play_icon" alt="" >
                                        <img class="fl" :src="item.img || DEFAULT_IMG">
                                    </div>
                                <div class="item_info ml10">
                                    <p class="length_txt">{{item.title}}</p>
                                    <p class="col_9B">开播时间 : {{item.modifyTime | filterTime}}</p>
                                </div>
                                </div>                               
                        </el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
            <div v-if="!VideoLibrary.isData"  class="no_video_add"> 
                    <div class="no_data"></div>                                                                                                                       
                    <div class="tip_no_data">
                    <span class="default-color">暂无视频！</span>
                </div>               
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitCheckList()" :disabled="disabledAdd">确 定</el-button>
                <el-button @click="close()">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 添加视频dialog end -->
        <!-- 删除录像dialog  -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisibleDel"
            width="360px"
            height="196px"
            class="my_dialog confirm_dialog"
            size="tiny"
            :show-close="false"
            >
            <span>确认删除视频吗？</span>
            <span slot="footer" class="dialog-footer">       
                <el-button type="primary" @click="delOk">确 定</el-button>     
                <el-button @click="dialogVisibleDel = false">取 消</el-button>                    
            </span>
            </el-dialog>
    </div>
</template>


<script>
    import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,PAGE_SIZE,actionurl,PLAY_URL,url,DEFAULT_IMG} from 'api/config'
    import axios from 'axios'
    import {setDate} from 'api/http'

    // 视频上传
    // import {addFile,upload,tokenErro,myVideoUrl} from 'api/videoUpload/facebac'
    // import {get_token,uptokenurl,fileType,initUpload} from 'api/videoUpload/comm'
    // import {UploadDemo} from 'api/videoUpload/upload'

    export default{
        data() {            
            return {   
                player:"",           
                page_index:1,
                page_size:10,
                tableData: [],
                tableDataAll: [],
                scope:[],
                total:1,               
                uploadVideoForm:{
                    videoUrl:'',
                    VideoCover:'',                   
                    title: '',
                    intro:''
                },
                ruleFormEdit:{
                    id:'',
                    videoUrl:'',
                    videoCover:'',                   
                    title: '',
                    intro:''
                },
                VideoCover:'',       
                liveId:'',
                scope:[],
                dialogAddVideo:false,
                dialogUpdataVideo:false,
                dialogEdit:false,
                dialogVisibleDel:false,
                dialogPlay:false,
                disabled:false,
                disUpload:false,
                disablEdedit:false,
                disabledAdd:false,
                isAdd:true,
                videoList:{
                    isData:true,
                    data:'',  
                },
                videoAllList:{
                    isData:true,
                    data:'',  
                },
                del_disabled1:false,
                del_disabled2:false,
                del_formdata:'',
                open:true,
                multipleSelection:[],
                search:'',
                searchVideo:'',
                Addsearch:'',
                soldType:1,
                checkList:[],
                videoCheckList:[],
                // 录像库
                VideoLibrary:{
                    isData:true,
                    data:'',  
                },
                index_video:'1'
                

            }
        },
        created(){
            // 获取视频库分页
            this.getVideoListP()
            // 获取视频库
            // this.getVideoLibrary()
           
        },
        updated: function () { //由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
            this.$nextTick(function () {
              
            })
        },
        mounted(){            
            // this.uploadVideoForm.videoUrl = myVideoUrl
            // initUpload()  
        },
        computed:{
            resource(){
                return this.checkList
            },
            resource2(){
                return this.videoCheckList
            },
         
        },
        watch:{
            resource(val){
               if(val==""||val==null){
                   this.del_disabled1 = false
               }else{
                   this.del_disabled1 = true
               }
            },
            resource2(val){
            //    if(val==""||val==null){
            //        this.del_disabled1 = false
            //    }else{
            //        this.del_disabled1 = true
            //    }
            },
         
           
        },
        methods:{  
            // 视频上传
            uploadVideo(formName){
                this.uploadVideoForm = {}
                this.myvideoUrl = ''
                this.VideoCover = ''
                this.uploadVideoForm.VideoCover = ''
                $("#videoSrc1").val('')
                $(".no_progress1").show()
                $('#progressDiv1').hide()
                this.dialogUpdataVideo = true   
                $("#item_add_cover .el-form-item__error").show()                           
            },
            pickfile(){                            
                get_token()                    
            },
            // 上传视频
            submitForm(formName,isAdd) {   
                if(!$("#videoSrc1").val()){
                    $("#add_form_err").show()
                }else{
                    $("#add_form_err").hide()
                }    
                this.$refs[formName].validate((valid) => {                                       
                    if (valid) {
                        let _this = this
                        let url = DATA_URL + 'mwlive/live/add_videoList.do' 
                        let addDate = new FormData()
                        addDate.append('user_id',getLStorage("user_id"))
                        addDate.append('url',$("#videoSrc1").val())
                        addDate.append('img',_this.VideoCover)
                        addDate.append('title',_this.uploadVideoForm.title)
                        addDate.append('synopsis',_this.uploadVideoForm.intro)                                                
                        //编辑
                        this.disUpload = true
                        axios({
                            method:'post',
                            url:url,
                            data:addDate,
                            headers:{'content-Type':'multipart/form-data'}
                         }).then((res)=>{
                            if(res.data.code == ERR_OK){
                                this.successMessage('提交成功！')
                                this.getVideoListP()
                            }else{
                                this.successMessage('提交失败！','error')
                            }                           
                         }).catch(()=>{
                             this.successMessage('提交失败！','error')
                        })
                        this.dialogUpdataVideo = false;
                        this.disUpload = false    
                    }else {
                        console.log('error submit!!');
                        this.disUpload = false 
                        return false;

                    }
                });
            },
            // 保存编辑
            submitEdit(){
                let url = DATA_URL + 'mwlive/live/update_videoList.do' 
                let editDate = new FormData()
                editDate.append('id',this.ruleFormEdit.id)
                editDate.append('url',this.ruleFormEdit.videoUrl)
                editDate.append('img',this.ruleFormEdit.videoCover)
                editDate.append('title',this.ruleFormEdit.title)
                editDate.append('synopsis',this.ruleFormEdit.intro)
                this.disablEdedit = true
                axios({
                    method:'post',
                    url:url,
                    data:editDate,
                    headers:{'content-Type':'multipart/form-data'}
                }).then((res)=>{
                    if(res.data.code = ERR_OK){
                        this.successMessage('提交成功！')
                        this.getVideoListP()
                    }else{
                        this.successMessage('提交失败！','error')
                    }
                    this.disablEdedit = false
                    this.dialogEdit = false
                }).catch(()=>{

                })
              
            },
            // 添加视频,获取视频库
            getVideoLibrary(){
                let url = DATA_URL + 'mwlive/live/select_videoList.do'
                let formdata = new FormData()
                formdata.append('user_id',getLStorage('user_id'))
                axios({
                    method:'post',
                    url:url,
                    data:formdata,
                }).then((res)=>{
                    if(res.data.code == ERR_OK){
                        var data = res.data.data
                        if(data&&data.length>0){
                            this.VideoLibrary.isData = true
                            this.VideoLibrary.data = data                        
                        }else{
                            this.VideoLibrary.isData = false
                        }
                    }                    
                }).catch(()=>{

                })

            },
            close(){
                this.videoCheckList =[] 
                this.dialogAddVideo = false
            },
            upload(){
                upload()
            },
            // 视频封面上传
            videoCoverFunc(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.successMessage('上传封面只能是 JPG、PNG、JPEG!','error')
                    return false
                }
                if (!isLt2M) {
                    this.successMessage('上传封面大小不能超过 2MB!','error')
                    return false
                }
                this.file = file.raw               
                let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
                let formdata = new FormData()
                formdata.append('file_data',this.file)
                formdata.append('user_id',getLStorage('user_id'))
                formdata.append('file_type',0)
                axios({
                    method: 'post',
                    url: imgUrl,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == ERR_OK){
                        this.successMessage('视频封面上传成功!')  
                        this.VideoCover = res.data.data.show_url
                        this.uploadVideoForm.VideoCover = res.data.data.show_url
                        $("#item_add_cover .el-form-item__error").hide()
                    }else{
                        this.successMessage('请选择图片！','error')
                    }
                })
                .catch((err) => {
                    this.successMessage('视频封面上传失败!','error')
                })

            },
            imgUpload(file){
                let imgtype = file.raw.type
                const isJPG = imgtype === 'image/jpeg' || imgtype === 'image/png' || imgtype === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.successMessage('上传封面只能是 JPG、PNG、JPEG!','error')
                    return false
                }
                if (!isLt2M) {
                    this.successMessage('上传封面大小不能超过 2MB!','error')
                    return false
                }
                this.file = file.raw               
                let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
                let formdata = new FormData()
                formdata.append('file_data',this.file)
                formdata.append('user_id',getLStorage('user_id'))
                formdata.append('file_type',0)
                axios({
                    method: 'post',
                    url: imgUrl,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == ERR_OK){
                        this.successMessage('视频封面上传成功!')  
                        this.ruleFormEdit.videoCover = res.data.data.show_url                
                    }else{
                        this.successMessage('请选择图片！','error')
                    }
                }).catch((err) => {
                    this.successMessage('视频封面上传失败!','error')
                })

            },
            beforeAvatarUpload(){

            },
            // 播放器代码
            playVideo (url) {
                this.index_video ++;
                let player
                this.dialogPlay = true
                var src = url
                this.$alert('<video data-id='+this.index_video+' style=" min-width:720px;min-height:406px;"  id="preVideo"  class="video-js vjs-default-skin" controls ebkit-playsinline="true" autobuffer preload="auto" poster="" x-webkit-airplay="true" webkit-playsinline="true" playsinline></video>', '录像预览', {
                    dangerouslyUseHTMLString: true,
                    showConfirmButton:false,
                    customClass:'videoMessageBox',
                    callback:() => {                      
                        player.dispose();                        
                    }
                })
                setTimeout(function(){
                     //初始化视频
                    player = videojs('preVideo', {
                        "controls": true,
                        "autoplay": true,
                        controlBar: {
                            captionsButton: false,
                            chaptersButton: false,
                            liveDisplay: false,
                            playbackRateMenuButton: false,
                            subtitlesButton: false
                        }

                    }, function () {

                    });
                    videojs("preVideo").ready(function () {
                        var myPlayer = this;
                        player.src({                            
                            src: src,
                            type: 'application/x-mpegURL',
                            
                        });
                    });
                },500)                              
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
        
            handleCurrentChange: function(currentPage){
                this.page_index = currentPage;
                this.getVideoListP()
            },
            
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection.length>0){
                    this.del_disabled = false
                }else{
                    this.del_disabled = true
                }
                console.log( this.multipleSelection)
            },
            // 获取视频库列表
            getVideoListP(val){
                let formdata = new FormData()
                formdata.append('user_id',getLStorage("user_id"))  
                formdata.append('page_size',this.page_size)
                if(val){
                    formdata.append('name',this.search)
                }
                formdata.append('page_index',this.page_index)
                         
                axios({
                    method: 'post',
                    url: DATA_URL + 'mwlive/live/select_videoListPage.do',
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == '200'){
                        if(res.data.data.data_list == null||res.data.data.data_list==""){
                            this.videoList.isData = false
                        }else{
                            var data =  res.data.data.data_list
                            for(let i = 0;i < data.length;i++){
                                if (data[i].videoSwitch == 1) {
                                    data[i].videoSwitch = false 
                                }else{
                                    data[i].videoSwitch = true 
                                }
                            }
                            this.videoList.isData = true
                            this.tableData = data
                            this.videoList.data = data  
                        }
                       
                    }
                   
                })
                .catch(function(err){
                    console.log(err);
                })

            },
            // 编辑视频
            editVideo(item){
                axios({
                    method: 'post',
                    url: DATA_URL + 'mwlive/live/select_video.do?id='+item.id,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == ERR_OK){
                        this.dialogEdit = true
                        this.ruleFormEdit.id = item.id
                        this.ruleFormEdit.videoUrl = res.data.data.url
                        this.ruleFormEdit.videoCover = res.data.data.img
                        this.ruleFormEdit.title = res.data.data.title
                        this.ruleFormEdit.intro = res.data.data.synopsis == 'undefined'?"":res.data.data.synopsis
                        this.getVideoListP()
                    }                  
                }).catch(function(err){
                    console.log(err);
                })   
            },
            // // 上下线
            // soldVideo(item,soldType){
            //     let _this = this
            //     let formdata = new FormData()
            //     formdata.append('id',item.id) 
            //     //video_switch  0 上架1下架  
            //     if(soldType){
            //         formdata.append('video_switch','0') 
            //     }else{
            //         formdata.append('video_switch','1')
            //     }                 
            //     axios({
            //             method: 'post',
            //             url: DATA_URL + 'mwlive/live/update_videoInfo.do',
            //             data:formdata,
            //             headers: {'Content-Type': 'multipart/form-data'}
            //         }).then((res) => {
            //             if(res.data.code == ERR_OK){
            //                 if(soldType){
            //                     _this.successMessage('已上线')
            //                 }else{
            //                     _this.successMessage('已下线')
            //                 }                           
            //                 _this.getVideoListP()
            //             }else{
            //                 _this.successMessage('修改失败','error')
            //             }
                       
            //         })
            //         .catch(function(err){
            //             _this.successMessage('修改失败','error')
            //         })
            // },
            delVideo(item){             
                let _this = this
                let formdata = new FormData()
                formdata.append('id',item.id)   
                _this.dialogVisibleDel = true  
                _this.del_formdata =  formdata                                        
            },
            // 删除视频  2018/5/27
            delOk(){
                let _this = this
                axios({
                        method: 'post',
                        url: DATA_URL + 'mwlive/live/delete_videoList.do',
                        data:_this.del_formdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    if(res.data.code == ERR_OK){
                        _this.dialogVisibleDel = false 
                        _this.successMessage('删除成功')
                        _this.getVideoListP()
                    }else{
                        _this.successMessage('删除失败')
                        _this.dialogVisibleDel = false 
                    }                   
                })
                .catch(function(err){
                    console.log(err);
                })   
            },
            delVideoMore(){
                let _this = this
                let formdata = new FormData()
                formdata.append('id',this.checkList)   
                _this.dialogVisibleDel = true  
                _this.del_formdata =  formdata  
                // this.$confirm('确认删除吗？', '删除提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     let _this = this
                //     let formdata = new FormData()
                //     formdata.append('id',this.checkList)  
                // }).catch((err)=>{
                //     this.successMessage('已取消删除','info')
                        
                // })

            },
        
            handleDelete(scope){
                this.confirmDele(scope)
            },
            confirmDele(scope) {
                this.$confirm('确认删除吗？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'delMessageBox',
                    type: 'warning'
                }).then(() => {
                    let deletData = new FormData()
                    deletData.append('id',scope.id)
                    let url = DATA_URL + 'mwlive/user/delete_WhiteList.do' 
                    axios({
                        method: 'post',
                        url: url,
                        data: deletData,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then((res) => {
                        if(res.data.code == ERR_OK){
                            this.getDataList()
                            this.successMessage('删除成功')
                        }else{
                            this.successMessage('网络异常，请检查网络！','error')
                        }
                    })
                    .catch(function(err){
                        this.successMessage('网络异常，请检查网络！','error')
                    })
                }).catch((err)=>{
                    this.successMessage('已取消删除','info')
                        
                })
            },
            successMessage(message,type) {
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },
            otherTip(message,type){
                message = $('#otherTip').val()
                type = $('#otherTip').attr('data-id')
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },
            closeChangeMachie(done){
                done();
                window.location.reload();
            }
            
        },
        filters:{
            filterTime(val){
                if(!val){
                    let timestamp = Date.parse(new Date())
                    // return '立即开始'
                    // return setDateTime(timestamp)
                    return '暂无直播'
                }
                let regExp = /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/
                if(regExp.test(val)){
                    return val
                }

                let datetime = new Date(val)
                var month = datetime.getMonth() + 1
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                var strDate = datetime.getDate()
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let getHours = datetime.getHours()
                if (getHours >= 0 && getHours <= 9) {
                    getHours = "0" + getHours;
                }
                let strTime = datetime.getMinutes()
                if (strTime >= 0 && strTime <= 9) {
                    strTime = "0" + strTime;
                }
                let getSeconds = datetime.getMinutes()
                if (getSeconds >= 0 && getSeconds <= 9) {
                    getSeconds = "0" + getSeconds;
                }
                return datetime.getFullYear() + "-" + month + "-" + strDate + " " + getHours + ":" + strTime //+ ":" + getSeconds
            },
            msgStateInfo(val){
                if(val == 1){
                    return '发送成功'
                }else if(val == 2){
                    return '发送失败'
                }else{
                    return '发送中...'
                }
            }
        },
    }
</script>
<style scope>
.video_table .no_video{
    text-align: center;
    margin:0 auto;
    vertical-align: middle;
    margin-top:221px;
}
.video_table  .no_data{
    width:130px;
    height:109px;
    background: url(../../common/image/no_video.png) no-repeat;  
    margin:0 auto;
    margin-bottom: 20px;
}


/* .video_table .videoList{
    width:100%;
} */
/* .video_table .item_box{
    box-sizing: border-box;
    width:100%;
    height:120px;
    border:1px solid #E5E5E5;
    margin-bottom:20px;
    padding:10px;
    position: relative;
    box-sizing: border-box;
} */

.video_table .videoList .item_box .item .item_img{
    width:178px;
    height:100px;
}
.video_table.video_list .item_img {
    width:178px;
    height:100px;
    margin-right:9px;
    position: relative;
    margin-top:-21px;
    margin-left:46px;
}
/* .video_table .item_img .play_icon,.pre_video .play_icon{
    width:50px;
    height: 50px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-25px;
    margin-top:-25px;
    z-index: 999;
} */
.video_table .item_img img,.pre_video .fl{
    width:100%;
    height:100%;
    border-radius: 2px;
   
}
.video_table  .item_info {
    line-height: 34px;
    margin-top:10px;
    text-align: left;
}
.video_table .length_txt{
    width:367px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.video_table .my_dialog .item_info .length_txt{
    width:297px;
}
.video_table  .item_btnG{

    position: absolute;
    top:76px;
    right:10px;
}
.video_table .swi_check{
    position: absolute;
    top:20px;
    right:0px;
}
.video_table .item_btnG .btn.btn_26{
    width:60px;
    height:26px;
    line-height: 24px;
    background-color: #F2F2F2;
    border:1px solid #CCCCCC;
    color:#9B9B9B;
    padding:0;
    margin-left:6px;
    box-sizing: border-box;
}
.video_table .item_btnG .btn_26:hover{
    color:#fff;
}

.video_table .item_btnG .hover_orange:hover{
    background-color: #F5A623;
    border:1px solid #F5A623;
}
.video_table .item_btnG  .hover_red:hover{
    background-color: #FF467F;
    border:1px solid #FF467F;
}
.video_table .item_btnG  .hover_blue:hover{
    background-color: #2B6CFF;
    border:1px solid #2B6CFF;
}
.video_table  .btn_30.el-button--primary.del_icon.is-disabled{
    background-color: #E5E5E5;
    border:1px solid #CCCCCC;
    color:#333333;
    position: relative;
    top:2px;
}

.video_table  .btn_30.el-button--primary.del_icon{
    background-color: #FF467F;
    border:1px solid #FF467F;
    color:#fff;
    position: relative;
    top:1px;
}
.video_table .btn_30.del_icon{
    position: absolute;
    top: 1px;
}
.video_table  .el-table__body-wrapper{
    height:auto;
    min-height:620px;
 
}
.video_table .col_9B{
    font-size: 12px;
}
 

.video_table  .bgc_txt{
    /* margin-left:15px; */
    margin-left:0px;
}
.video_table .btn_30{
    margin-right:16px;
}
.default-bg .btn_30 a{
    color:#fff!important;
}
.video_list .bgc_txt{
    margin-left:15px;
}
.btn_header{
    position: relative;
}
.search_btn{
    position: absolute;
    top:0;
    right: 3px;
}
.video_table .info-content{
    min-height: 600px;
}
.item_box .el-checkbox-group{
    display: inline-block;
    float: left;
}

.video_table .el-button--info:focus{
    background-color: #E5E5E5;
    color: #333333;
    border: 1px solid #CCCCCC;
}

.icon_delete:hover{
    background: url(../../common/image/icon_delete_active.png) no-repeat;
}
.icon_delete,.icon_delete.is-disabled{
    background: url(../../common/image/icon_delete.png);
    position: absolute;
    right:-15px;
    top:2px;
}
.el-icon-circle-close{
    right:-8px;
    top:-8px;
    font-size: 19px;
    color:#FF467F;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    background-color: #fff
}
.el-icon-circle-close:before{
    content: "\e62c";
}
</style>
<style>
.video_table  .el-checkbox__label{
    display: none;
}
.video_table  .el-checkbox__inner{
    width:16px;
    height:16px;
    margin:0 10px;
    position: relative;
    top:40px;
}
.video_table .el-table__header-wrapper {
    display: none;
}
.txt_80 .el-textarea__inner{
    height:80px;
    border-radius:2px;
}
.video_table .info-content  .el-table,.my_list .my_dialog .el-table{
    border:none;
}
.video_table .el-table td{
    box-sizing: border-box;
    height:120px;
    border:1px solid #E5E5E5!important;
    margin-bottom:20px;
    padding:9px 0px!important;
    position: relative;
    background-color:#FCFCFC;

}
.video_table .el-table tr td:nth-child(1){
    border-right:none!important;
}
.video_table .el-table tr td:nth-child(2){
    border-left:none!important;
}

.video_table   .swi_54 {
    position: relative;

}
.video_table  .swi_54 .el-switch__core{
    width: 54px!important;
    height: 24px!important;
}

.video_table  .mt_70 .el-dialog__body{
    padding:70px 0 0 0;
    /* min-height:490px; */
}

.video_table .confirm_dialog .el-dialog__body{
    min-height:30px;
}
.video_table  .el-checkbox__inner{
    width:16px;
    height:16px;
}
.video_table  .el-checkbox__inner::after {
    height: 9px;
    width: 4px;
    left: 5px;
}
.video_table .el-input-group{
    width:250px;
    height:30px;
  
}
.video_table .my_dialog .el-input-group{
    top:85px;
    right:30px;
}
.video_table  .el-input-group .el-input__inner{
    height:30px;
    border-radius:2px;
    border-right:none;
}
.video_table   .el-input-group__append{
    padding:0 ;
    width:60px;
    height:30px;
    text-align:center;
}
.video_table .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color:#ECF6FF;
}
.video_table   .el-checkbox__inner{
    width:16px;
    height:16px;
    margin:0 10px;
    position: relative;
}
.video_table   .el-checkbox{
    width:100%;
}
.el-dialog__body{
    padding:20px 0;
   
}
.video_table   .el-checkbox__inner::after {
    height: 9px;
    width: 4px;
    left: 5px;
}
.video_table  .my_dialog .item_info{
    left:225px;
}
.video_table.videoManagement .item_info{
    margin-top:-14px;
    line-height:28px;
    width:453px;
}
.video_table .item_info .col_9B{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.video_table .item_info .length_txt{
    width:367px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#333;
    font-size:14px;
}
.video_table .my_dialog .item_info .length_txt{
    width:297px;
}
.liveControl  .video_table  .el-switch__core:after{
    top:4px;
    left:5px;
}
.liveControl  .video_table  .el-switch.is-checked .el-switch__core::after{
    margin-left:28px;
}

/* 播放器样式 */
.videoMessageBox.el-message-box .vjs-big-play-button {
    top: 50%;
    left: 50%;
    margin-top: -35px;
    margin-left: -35px;
    background: url(../../common/image/play.png) no-repeat;
    background-size: contain;
    border:0;
}

</style>



