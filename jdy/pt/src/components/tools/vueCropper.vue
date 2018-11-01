<template>
  <div class="default-bg">
    <!-- 图片裁剪模态框start -->
      <el-dialog class="my_dialog dialog_cropper"
          title="图片裁剪"
          :visible.sync="dialogCropper"
          :width="dialogWidth"
          :show-close="false">
        <div class="btn_box">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="uploadImg"
                    accept=".jpg, .png, .jpeg">
                <el-button class="btn btn_34 blue_btn" type="info" style="width:80px;padding:0;">本地上传</el-button>
            </el-upload>
            <div :class="{ 'icon iconfont icon_rotate active':rotateFlag == true,'icon iconfont icon_rotate':!rotateFlag}"   @click="rotateLeft"></div>
            <div :class="{ 'icon iconfont icon_preview active':previewFlag == true,'icon iconfont icon_preview':!previewFlag}"   @click="preview"></div>
        </div>   
        <div class="cropper-content">
            <div class="cropper">             
                <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"                 
                    @realTime="realTime"
                    @imgLoad="imgLoad"
                ></vueCropper>
            <!-- :fixedBox="option.fixedBox" -->
            </div>
            <div class="show-preview box_preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
                'margin': '5px'}">
            <div :style="previews.div" class="preview">
                <img :src="option.img" :style="previews.img">
            </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="finish">确 定</el-button>
            <el-button @click="dialogCropper = false">取 消</el-button>
        </span>
          <!-- <div class="footer-btn">
              <div class="scope-btn">            
              <button  @click="changeScale(1)">+</button>
              <button  @click="changeScale(-1)">-</button>
              <button  @click="rotateLeft">↺</button>
              <button  @click="rotateRight">↻</button>
              </div>
              <div class="upload-btn">
              <button  @click="down('blob')">下载</button>
              <button  @click="finish('blob')">完成</button>
              </div>
          </div> -->

      </el-dialog>
    <!-- 图片裁剪模态框start --> 
  </div>
</template>
<script>
  import axios from 'axios'
  import {ERR_OK, DATA_URL,getLStorage,setLStorage} from 'api/config'
  import {axiosData} from 'api/http'
  export default {
    data () {
      return {
        //裁剪组件的基础配置option
        dialogCropper:false,
        dialogWidth:'600px',
        crap: false,
        previews: {},
        option: {
            img: '',
            size: 1,
            full: false,//输出原图比例截图 props名full
            outputType: 'png',//裁剪生成图片的格式
            canMove: true, //上传图片是否可以移动
            original: false,//上传图片按照原始比例渲染
            canMoveBox: true, //截图框能否拖动
            autoCrop: true,//是否默认生成截图框 
            autoCropWidth: 200, //默认生成截图框宽度
            autoCropHeight: 200, //默认生成截图框高度
            fixed:true,// 是否开启截图框宽高固定比例
            fixedNumber:[1,1],//截图框的宽高比例,[宽度, 高度]
            fixedBox: false, //	固定截图框大小 不允许改变
            centerBox:true,//截图框是否被限制在图片里面
        }, 
        downImg: '#', 
        parentData:'',
        previewFlag:false,
        rotateFlag:false,
      }
    },
    props: ['cropperDate'],
    watch: {
        // 接收图片数据
        cropperDate(data){
            this.parentData = data
            this.option.fixed = data.fixed || this.option.fixed
            this.option.fixedNumber = data.fixedNumber || this.option.fixedNumber
            this.option.autoCropWidth = data.autoCropWidth || this.option.autoCropWidth
            this.option.autoCropHeight = data.autoCropHeight || this.option.autoCropHeight
            this.dialogWidth = data.dialogWidth || this.dialogWidth
            this.option.img = data.imgDate
            this.dialogCropper = true
        }
    },
    created(){
        console.log("================")
      console.log(this.data);
    },
    methods: {
        // 图片裁剪
        changeScale(num) {
            num = num || 1 
            this.$refs.cropper.changeScale(num)
        },
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
            var str = this.previews.img.transform
            console.log(this.previews.img)
            str = str.match(/rotateZ(\S*)/)[1]; 
            console.log(str)
            if(str == '(-270deg)'){
                this.rotateFlag = false
            }else{
                this.rotateFlag = true
            }
        },
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        preview(){
            var bgc = $('.cropper-modal').css('background-color');
            if( bgc == 'rgba(0, 0, 0, 0.5)'){
                $('.cropper-modal').css('background','rgba(0, 0, 0, 1)')
                this.previewFlag = true
            }else{
                $('.cropper-modal').css('background','rgba(0, 0, 0, 0.5)')
                this.previewFlag = false
            }
        },
        finish(type) {
            // if (type === 'blob') { 
            //     // 获取截图的blob数据
            //     this.$refs.cropper.getCropBlob((data) => { 
            //         this.downImg = window.URL.createObjectURL(data)
            //     })
            // } else {                     
                // 获取截图的base64 数据 
            this.$refs.cropper.getCropData((data) => { 
                var file  = this.getBlobBydataURI(data,'image/jpeg');
                console.log("确认裁剪地址")
                console.log(file)
                let imgUrl = DATA_URL + 'mwlive/setup/file_upload.do'
                let formdata = new FormData()
                formdata.append('file_data',file,"file_"+Date.parse(new Date())+".jpeg")
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
                        this.iconImg2 = res.data.data.show_url
                        this.iconID = res.data.data.save_id
                        var data = {
                            'save_id':res.data.data.save_id,
                            'show_url':res.data.data.show_url,
                            'parentData':this.parentData,
                        }
                        this.dialogCropper = false;
                        this.$emit('cropper-data',data)
                    }else{
                        this.tipsMessage('请选择图片！','error')
                    }
                })
                .catch((err) => {
                    this.tipsMessage('上传图片失败!','error')
                    console.log(err)
                })
            });
            // }
            
        },
        // 实时预览函数 
        realTime (data) {
            this.previews = data
        }, 
        down (type) { 
            var aLink = document.createElement('a') 
            aLink.download = 'author-img' 
            // 输出 
            // if (type === 'blob') { 
            //     // 获取截图的blob数据
            //     this.$refs.cropper.getCropBlob((data) => { 
            //         this.downImg = window.URL.createObjectURL(data)
            //         aLink.href = window.URL.createObjectURL(data) 
            //          console.log(data) 
            //         aLink.click()
            //     })
            //  } else {                     
                // 获取截图的base64 数据 
                this.$refs.cropper.getCropData((data) => { 
                    this.downImg = data 
                    aLink.href = data
                    aLink.click() 
                });
            // }
        }, 
        // 将base64的图片转换为file文件
        dataURLtoFile(dataurl, filename) {//将base64转换为文件
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
            

        },
        getBlobBydataURI(dataURI,type) {
            var binary = atob(dataURI.split(',')[1]);
            var array = [];
            for(var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type:type });
        },
        uploadImgCopper (file) {  
            let imgtype = file.raw.type;
            const isJPG = imgtype === "image/gif" || imgtype === "image/png" ||imgtype === "image/jpg" ||imgtype === "image/jpeg";
            if (!isJPG) {
                this.tipsMessage("上传头像只能是 JPG、PNG、GIF 格式!", "error");
                return false;
            }
            this.file = file.raw;
            var data = window.URL.createObjectURL(new Blob([this.file]))
            this.option.img = data;
            this.dialogCropper = true; 
        },
        imgLoad (msg) {
            console.log(msg) 
        },
        // 本地上传
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
            this.option.img = data
        },
    }
  }
</script>
<style scoped>
.dialog_cropper .btn_box{
    height:50px;
    position: relative;
}
.default-bg  .my_dialog.dialog_cropper  .el-upload .el-button--info{
   color:#fff!important;
   border:none;
   margin-bottom: 20px;
}
.default-bg .cropper-content .btn.btn_34:hover{
    color: #fff;
    background-color: #5FAEFF;
    border:none;
}
.dialog_cropper .iconfont{
    background-image: url(../../common/image/spirit.png);
    display: inline-block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    top:5px;
    /* -webkit-transition-duration: .4s;
    transition-duration: .4s; */
}
.dialog_cropper .iconfont.icon_rotate{
    background-position: 0 -104px;
    right:35px;   
}
.dialog_cropper .iconfont.icon_rotate:hover,.dialog_cropper .iconfont.icon_rotate.active{
    background-position: 0 -78px;
}
.dialog_cropper .iconfont.icon_preview{
    background-position: 0 -46px;
    right:0;
}
.dialog_cropper .iconfont.icon_preview:hover,.dialog_cropper .iconfont.icon_preview.active{
    background-position: 0 -24px;
}
</style>

<style lang="less">
.vue-cropper{
    background:#999!important;
}
.cropper-content img{
  max-width: max-content;
}
.cropper-content{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .cropper{
    width: 588px;
    height: 407px;
    margin:0 auto;
  }
  .show-preview{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    display: none;
    .preview{
      overflow: hidden;
      border-radius: 50%;
      border:1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.footer-btn{
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .scope-btn{
    width: 350px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .upload-btn{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
}
</style>
