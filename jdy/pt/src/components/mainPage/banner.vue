<template>
    <div class="b_imageTab">
      <i class="el-icon-d-caret moveTop" @click="moveUp"></i>
        <el-row>
            <el-col :span="22" style="overflow: hidden;">
                <label for="" style="flot:left;">封面图片：</label>
                <div class="b_imageDiv"> 
                    <!-- <img src="../../common/image/noImg.png" width="80" height="80"/> -->
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    accept=".jpg, .png, .jpeg" 
                    :show-file-list="true"
                    :on-change="fileFunc"
                    :file-list="file"
                    :before-upload="beforeAvatarUpload"
                    :on-exceed="handleExceed">
                    <img v-if="imageUrl" v-bind:src="imageUrl"  class="avatar">
                    <i v-else class="avatar-uploader-icon"><img src="../../common/image/noImg2.png"/><p>添加图片</p></i>
                    </el-upload>
                </div>
            </el-col>
            <el-col :span="22">
                <div class="b_InfoTab">
                    <span>封面链接：</span>
                    <el-input placeholder="封面链接地址" v-model="linkUrl" class="linkUrl"></el-input>
                    <el-button type="primary" @click="changeType">选取</el-button>
                </div>
            </el-col>
        </el-row>
        <i class="delete el-icon-circle-close-outline" @click="deleteBanner"></i>
        <i class="el-icon-d-caret moveBottom" @click="moveDown"></i>

    </div>
</template>
<script>
import { setCookie, getCookie, removeCookie, DATA_URL, getLStorage } from "../../api/config";
import axios from "axios";
export default {
  data() {
    return {
      file: [],
      //imageUrl: '',
      imageUrl: this.inputValuePicUrl,
      imgId: "",
      userID:getLStorage("userId")
    };
  },
  props: {
    value: {
      type: String,
      default: function() {
        return "";
      }
    },
    inputValuePicUrl: String,
    cVideo:String,
  },
  methods: {
    handleExceed() {
        this.$message.warning(`当前限制选择 1 个文件`);
      },
    changeType(){
      this.$emit("cVideo","1");
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      //this.imageUrl = URL.createObjectURL(file.raw);
      $(".el-upload--text").css("margin-top", "0px");
      //console.log(this.imageUrl);
    },
    fileFunc(file) {
      let _this = this;
      this.$emit('state',false)
      let imgtype = file.raw.type || file.type;
      
      const isJPG =
        imgtype === "image/jpeg" ||
        imgtype === "image/png" ||
        imgtype === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG、JPEG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      //上传图片
      let url = DATA_URL + "mwlive/setup/file_upload.do";
      let formdata = new FormData();
      formdata.append("file_data", file.raw);
      formdata.append("user_id", this.userID);
      // formdata.append('file_type',1)
      axios({
        method: "post",
        async:false,
        url: url,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          console.log(res);
          _this.imageUrl = res.data.data.show_url;
          this.$emit("getPicUrlChange", this.imageUrl);
          this.$emit('state',true)
          //this.imgId = res.data.data.save_id;
          //this.$emit("getPicUrlChange", this.imageUrl);
        })
        .catch(err => {
          console.log(err);
          _this.$message({
            showClose: true,
            type: "error",
            message: "上传失败!"
          });
        });
      

    //   this.file = file.raw;
    //   this.imageUrl = file.url;
    //  this.$emit("getPicUrlChange", this.imageUrl);
    //   setTimeout(() => {
    //     //监听图片改变，并向父组件传递
    //     this.$emit("getPicUrlChange", this.imageUrl);
    //   }, 1000);
    },
    uploadImg(file) {
      let url = DATA_URL + "mwlive/setup/file_upload.do";
      let formdata = new FormData();
      formdata.append("file_data", file);
      formdata.append("user_id", "1177720833019091471");
      // formdata.append('file_type',1)
      axios({
        method: "post",
        async: false,
        url: url,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          // console.log("返回数据" + res);
          this.imageUrl = res.data.data.show_url;
          this.imgId = res.data.data.save_id;
          // console.log("image Url:" + this.imageUrl);
        })
        .catch(err => {
          // console.log(err);
          this.imageUrl = file.url;
          this.$message({
            showClose: true,
            type: "error",
            message: "上传失败!"
          });
        });
      this.$emit("getPicUrlChange", this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.file = file;
    //   this.file.push(file[0])
      console.log(file)
      console.log(this.file)
      // console.log(file);
      let formdata = new FormData();
      formdata.append("fileData", this.file);
      formdata.append("userId", "184633831020572670");
      formdata.append("fileType", 1); //文件类型 0：未归类 1：图片文件； 2：音频文件； 3：视频文件
      // this.$ajax.fileUpload(formdata).then(data => {
      //   console.log(data, "上传背景成功！");
      //   debugger;
      //   this.imgId = data.obj.save_id;
      //   this.imgUrl = data.obj.show_url;
      // });
      return isJPG && isLt2M;
    },
    showMD() {
      $(".moveTop").css("display", "block");
      $(".moveBottom").css("display", "block");
    },
    deleteBanner() {
      var pJson = { picUrl: this.imageUrl, linkUrl: this.linkUrl };
    //   this.$emit('state',true)
      //与父组件通信传值
      this.$emit("deleteb", {
        id: 1,
        picUrl: this.imageUrl,
        linkUrl: this.linkUrl
      });
    },
    moveUp() {
      var pJson = { picUrl: this.imageUrl, linkUrl: this.linkUrl };
      this.$emit("deleteb", {
        id: 2,
        picUrl: this.imageUrl,
        linkUrl: this.linkUrl
      });
    },
    moveDown() {
      var pJson = { picUrl: this.imageUrl, linkUrl: this.linkUrl };
      this.$emit("deleteb", {
        id: 3,
        picUrl: this.imageUrl,
        linkUrl: this.linkUrl
      });
    },
    changeImg(url) {
      console.log("here" + url);
    }
  },
  watch: {
    //图片路径
    inputValuePicUrl: function(val, oldVal) {
      this.imageUrl = this.inputValuePicUrl;
      console.log(val, oldVal);
    },
    linkUrl: function(val, oldVal) {
      console.log(val, oldVal);
      // this.$emit("deleteb", {id:4,picUrl:this.imageUrl,linkUrl:this.linkUrl});
    },
    imageUrl: function(val, oldVal) {
      //this.$emit("deleteb", {id:5,picUrl:val,linkUrl:this.linkUrl});
    },
    picUrl: function(val, oldVal) {
      this.$emit('update:picUrl', val)
    }
  },
  computed: {
    linkUrl: {
      // 动态计算currentValue的值
      get: function() {
        return this.value; // 将props中的value赋值给currentValue
      },
      set: function(val) {
        console.log(this.$emit("input"));
        this.$emit("input", val); // 通过$emit触发父组件
      }
    }
  },
  created() {
    console.log(this.imageUrl)
  },
};
</script>
<style scoped>
.delete {
  display: none !important;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  right: -14px;
  float: right;
  top: -204px;
  color: #bbb;
  background: #fff;
  border-radius: 50%;
}
.b_imageTab:hover .delete {
  display: block !important;
}
.b_imageTab:hover .moveTop {
  display: block !important;
}
.b_imageTab:hover .moveBottom {
  display: block !important;
}
.delete:hover {
  color: #aaa;
}
.delete:hover .delete {
  display: block !important;
}
.moveTop {
  display: none !important;
  position: relative;
  top: -10px;
  left: 50%;
}
.moveBottom {
  display: none !important;
  position: relative;
  top: 12px;
  left: 50%;
}
.b_imageTab {
  margin-top: 10px;
  border: 1px solid #e5e5e5;
  padding: 5px;
  background: #ffffff;
}
.b_imageDiv {
  position: relative;
  width: 80%;
  height: 129px;
  border: 1px solid #e5e5e5;
  text-align: center;
  margin: auto;
  float: right;
}
.avatar-uploader-icon p {
  font-size: 10px;
  color: #8c8c8c;
}
.b_InfoTab {
  display: flex;
  margin-top: 20px;
}
.b_InfoTab span {
  width: 47%;
  font-size: 14px;
  color: #333333;
  margin-top: 10px;
}
.b_InfoTab input {
  width: 50%;
  margin-left: -50px;
}
.b_InfoTab button {
  margin-left: 10px;
}
.b_imageDiv .avatar-uploader{
    width: 100%;
    height: 100%;
}
.b_imageDiv .avatar-uploader .el-upload{
    width: 100%;
    height: 100%;
}
.avatar{
    width: 100%;
    height: 100%;;
}
.el-upload-list{
    position: absolute;
    top: 0;
}
</style>
<style>
.b_imageDiv  .el-upload-list{
    position: absolute;
    top:36px;
    width:100%;
}
.b_imageDiv .avatar-uploader .el-upload{
    width: 100%;
    height: 100%;
}
</style>



