<template>
    <div class="recharge my_list my_section userManage">
        <div class="live-top bg-fff" style="position: relative;">
            敏感词设置
            <div class="button-right">
                <!-- <el-button class="small" type="primary" v-on:click="export2Excel()">下载模板</el-button>
                <el-button class="small" type="primary">批量导入</el-button>
                <a href="javascript:;" class="file">导入表格
                    <input id="upload" type="file" @change="importExcel()"/>
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                </a> -->
                <!-- <el-button type="danger" plain class="small clear-btn" @click="clearSenWords" :disabled="clearDisable">清空</el-button> -->
            </div>
        </div>
        <div class="bg-fff info-content" style="height: 500px;">
            <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag el-icon-plus"  @click="showInput"></el-button>
        </div>
        <div style="text-align: right;margin: 0">
            <el-button class="small" type="primary" @click="saveSendWord()">保存</el-button>
        </div>
    </div>
</template>
<script>
import XLSX from "xlsx";
var FileSaver = require("file-saver");
import {
  ERR_OK,
  DATA_URL,
  getLStorage,
  setLStorage,
  LIVE_URL
} from "api/config";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      ori_dynamicTags: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      clearDisable: true,
      userID: getLStorage("userId"),
      exportList: [
        {
          name: "坏人"
        }
      ]
    };
  },
  created() {
    this.senWords();
  },
  methods: {
    /***************方法一 excel导出****************/
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../vendor/Export2Excel"); //这里必须使用绝对路径
        const tHeader = ["敏感词"]; // 导出的表头名
        const filterVal = ["name"]; // 导出的表头字段名
        const data = that.formatJson(filterVal, that.exportList);
        export_json_to_excel(tHeader, data, "下载模板"); // 导出的表格名称，根据需要自己命名
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    /****************方法一 excel导入********************/
    importExcel() {
      let that = this;
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        console.log(f, "file");
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          console.log(outdata, "outdata");
          let outArry = [];
          for (var i = 0; i < outdata.length; i++) {
            outArry[i] = outdata[i].name;
          }
          console.log(outArry, "数组");
          console.log(outArry.join("*"), "字符串");
          that.senWords(true, outArry.join("*"));
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(this.file);
    },
    /***************方法二 excel导出****************/
    downloadMater() {
      const defaultCellStyle = {
        font: { name: "Verdana", sz: 11, color: "FF00FF88" },
        fill: { fgColor: { rgb: "FFFFAA00" } }
      };
      const wopts = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary",
        defaultCellStyle: defaultCellStyle,
        showGridLines: false
      };
      const wb = { SheetNames: ["Sheet1"], Sheets: {}, Props: {} };
      let data = this.exportList;
      wb.Sheets["Sheet1"] = XLSX.utils.json_to_sheet(data);

      //创建二进制对象写入转换好的字节流
      let tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], {
        type: "application/octet-stream"
      });
      FileSaver.saveAs(tmpDown, "hello world.xls");
    },
    //字符串转字符流
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefined") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
    handleClose(tag) {
      //删除标签
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      console.log("----");
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    tipsMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type || "info"
      });
    },
    handleInputConfirm() {
      console.log("++++");
      let inputValue = this.inputValue;
      if (inputValue) {
        for (var i = 0; i < this.dynamicTags.length; i++) {
          if (this.inputValue == this.dynamicTags[i]) {
            this.$message({
              type: "success",
              message: "不要输入重复的敏感词！"
            });
            return;
          }
        }
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    senWords(type, word) {
      var url = LIVE_URL + "filterword.action";
      if (!type) {
      //  alert("1");
        //获取敏感词
        var msg = {
          cmd: "get",
          userid: this.userID
        };
        axios({
          method: "post",
          url: url,
          dataType: "json",
          data: msg,
          contentType: "application/json"
          //headers: { "Content-Type": "application/json" }
        }).then(res => {
          console.log(res);
          if (res.status == 200) {
            console.log(res.data.out_words);
            this.dynamicTags = [];
            if (res.data.out_words !== "") {
              var wordList = res.data.out_words.split("*");
              wordList.forEach(element => {
                  this.dynamicTags.push(element);
              });
              this.clearDisable=false;
            }
          }
        });
        //   .catch(function(err) {
        //     this.tipsMessage("获取敏感词失败!", "error");
        //     console.log(err);
        //   });
      } else {
        //设置敏感词
        var msg = {
          cmd: "set",
          userid: this.userID,
          //  userid: this.$api.getLStorage('user_id'),
          words: word
        };
        axios({
          method: "post",
          url: url,
          data: msg,
          contentType: "application/json"
        }).then(res => {
          console.log(res);
          if (res.data.code == ERR_OK) {
            this.$message({
              type: "success",
              message: "设置敏感词成功！"
            });
          }
          this.senWords();
        });
        //   .catch(function(err) {
        //     this.tipsMessage("设置敏感词失败!", "error");
        //     this.$message({
        //       type: "error",
        //       message: "设置敏感词失败"
        //     });
        //     console.log(err);
        //   });
        this.clearDisable = false;
      }
    },
    //保存敏感词
    saveSendWord() {
      console.log(this.dynamicTags.join("*"));
      if (this.dynamicTags.length > 0) {
        this.senWords(true, this.dynamicTags.join("*"));
        this.clearDisable=false;
        console.log(this.ori_dynamicTags);
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "还没有添加敏感词！"
        });
      }
    },
    //清空敏感词
    clearSenWords() {
      this.$confirm("是否清空所有敏感词", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var msg = {
            cmd: "set",
            //userid: this.$api.getLStorage('user_id'),
            words: "*"
          };
            this.$ajax.senWords(msg).then(data => {
              this.$message({
                type: "success",
                message: "已清空敏感词！"
              });
              this.clearDisable = true;
              this.senWords();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.live-top,
.my_section .section_title {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 20px;
  font-family: "Microsoft YaHei" !important;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}
.recharge {
  padding: 20px 30px;
  height: 720px;
  border-radius: 5px;
  background: #fff;
}
.my_list .el-table {
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  border-bottom: none;
}
.button-right {
  position: absolute;
  right: 20px;
  top: -3px;
}
.info-content {
  margin: 20px 0;
  padding: 20px 10px;
  border: 1px solid #e5e5e5;
}
.el-tag {
  margin: 0 8px;
}
.input-new-tag{
  margin-top: 10px;
}
</style>

