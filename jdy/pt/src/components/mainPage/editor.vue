<template>
    <div class='tinymce'>
        <editor id='tinymce' v-model="content" :init='init'></editor>
    </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
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
  name: "tinymce",
  data() {
    return {
      content: this.message,
      init: {
        language_url: "/static/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/skins/lightgray",
        height: 300,
        // plugins:
        //   "link lists image code table colorpicker textcolor wordcount contextmenu",
        // toolbar:
        //   "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        toolbar: "undo redo | styleselect | fontselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        toolbar2: "fullscreen preview | forecolor backcolor emoticons | table | link image media | mybutton",
        branding: false
      }
    };
  },
  mounted() {
    tinymce.init({});
  },
  components: { Editor },
  watch: {
    value(val) {
      // 当传入值变化时跟新富文本内容
      tinymce.get("tinymce").setContent(val);
    },
    message(val){
        this.content=val;
    },
    content(val){
        this.$emit('update:message', val)
    }
  },
  methods: {
    images_upload_handler:(blobInfo,success,failure) => {
      let formdata = new FormData()
      formdata.append("file_data",blobInfo.blob())
      formdata.append("user_id",'184633831020572670')
      formdata.append("file_type",1)
      axios.post('http://mwlivetest.facebac.com/17/api/mwlive/setup/file_upload.do', formdata).then(res => {
          console.log(res.data,'===');
      }).catch(res => {
          failure('error')
      })
  }
  }
};
</script>