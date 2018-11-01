<template>
     <div>
         <quill-editor 
        v-model="content" 
        ref="myQuillEditor" 
        :options="editorOption" 
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
        </quill-editor>
        <el-upload style="display:none;"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="true"
        :auto-upload="false"
        :on-change="fileFunc">
        <el-button size="small" type="primary" id="eUpLoad">点击上传</el-button>
        </el-upload>
        <!-- <upload-img  v-on:updateImg="getImgUrl" id="TuploadImg" style="display:none"></upload-img> -->
     </div>
</template> 
<script>
import VueQuillEditor from "vue-quill-editor";
// require styles 引入样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import UploadImg from "@/components/mainPage/uploadImg";
import { ERR_OK, DATA_URL, getLStorage, DEFAULT_IMG } from "api/config";
import axios from "axios";
import * as Quill from 'quill'
export default {
  props: {
    // 接收一个由父级组件传递过来的值
    message: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      addRange: [],
      qnLocation: "https://jsonplaceholder.typicode.com/posts/",
      photoUrl: "",
      content: this.message,
      userID: getLStorage("userId"),
      editorOption: {
        modules: {
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ["link", "image", "formula"]
          ]
        },
        placeholder: "输入内容..."
      }
    };
  },
  components: {
    quillEditor,
    UploadImg
  },
  watch: {
    message(val) {
      this.content = val;
    },
    content(val) {
        console.log(val.html);
      this.$emit("update:message", val);
    }
  },
  mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler);
  },
  methods: {
    beforeAvatarUpload(file) {
      this.file = file;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG、JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    fileFunc(file) {
      let imgtype = file.raw.type;
      const isJPG =
        imgtype === "image/jpeg" ||
        imgtype === "image/png" ||
        imgtype === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message({
              showClose: true,
              type: "error",
              message: "上传头像图片只能是 JPG、PNG、JPEG 格式!"
            });
        return false;
      }
      if (!isLt2M) {
        this.$message({
              showClose: true,
              type: "error",
              message: "上传头像图片大小不能超过 2MB!"
            });
        return false;
      }
      let url = DATA_URL + "mwlive/setup/file_upload.do";
      let formdata = new FormData();
      formdata.append("file_data", file.raw);
      formdata.append("user_id", this.userID);
      // formdata.append('file_type',1)
      console.log(file.raw, url, formdata);
        axios({
          method: "post",
          url: url,
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(res => {
            console.log(res);
            this.imgUrl = res.data.data.show_url;
            console.log(this.imgUrl);
            this.sendToEditor(this.imgUrl);
          })
          .catch(err => {
            console.log(err);
            this.$message({
              showClose: true,
              type: "error",
              message: "上传失败!"
            });
          });
    },
    sendToEditor(url) {
      var vm=this;
      if (url != null && url.length > 0) {
          this.content=this.content+'<img src="'+url+'"/>';
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "图片上传失败!"
        });
      }
    },
    imgHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();
     // debugger;
      if (state) {
        let fileInput = document.getElementById("eUpLoad");
        fileInput.click(); // 加一个触发事件
      }
    },
    getImgUrl(a) {
      this.photoUrl = a;
      alert(a);
    },
    onEditorBlur(val) {
      //失去焦点事件
    },
    onEditorFocus(val) {
      //获得焦点事件
      console.log("here");
    },
    onEditorChange(val) {
      //内容改变事件
      console.log("content is:"+val.html);
    }
  },
  created() {
      $('[data-video="Embed URL"]').attr('placeholder',' ')
  }
};
</script>  
<style scoped>
.quill-editor {
  height: 300px;
}
</style>
