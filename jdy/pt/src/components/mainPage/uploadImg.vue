<template>
    <div><!--:on-exceed="handleExceed"-->
        <el-upload 
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            multiple
            :limit="1"
            :on-change="fileFunc"
            :show-file-list="true"
            accept=".jpg, .png, .jpeg,.ico"
            :file-list="fileList">
            <el-button size="small" type="primary"><i class="el-icon-upload"></i>上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
    </div>
</template>
<script>
import axios from 'axios'
import {ERR_OK,DATA_URL,getLStorage,DEFAULT_IMG} from 'api/config'
export default {
  data() { 
    return {
      fileList: [],
      imgId: "",
      imgUrl: "",
      setImgUrl: DATA_URL + 'mwlive/setup/file_upload.do',
      flag:0,
      userID:getLStorage("userId")
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("upload" + file);
    },
    handleExceed(files, fileList) {     
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
      console.log("handleExceed");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeAvatarUpload(file) {
                this.file = file
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return  isLt2M;
            },
    fileFunc(file) {
      let url = DATA_URL + "mwlive/setup/file_upload.do";
      let formdata = new FormData();
      formdata.append("file_data", file.raw);
      formdata.append("user_id", this.userID);
      // formdata.append('file_type',1)
      console.log(file.raw,url,formdata);
      if(this.flag!=0){
        axios({
        method: "post",
        url: url,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          console.log(res);
          this.imgUrl = res.data.data.show_url;
          this.imgId = res.data.data.save_id;
          // if(res.data.code == ERR_OK){
          //     console.log(res);
          // }
          //this._setData();
          console.log(this.imgUrl);
          if(this.imgUrl==""){
            this.$message({
            showClose: true,
            type: "error",
            message: "上传图片失败!"
          });
          }
          this.$emit("updateImg", this.imgUrl);
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            type: "error",
            message: "上传失败!"
          });
        });
      }
      this.flag++;
    }
  }
};
</script>
<style>
.el-upload {
  margin-top: 0px;
}
</style>


