<template>
    <div class="recharge my_list my_section userManage" style="min-height: 720px;">
        <div class="live-top bg-fff">用户管理</div>
        <div class="bg-fff info-content" >
           <!--  <el-select  v-model="stateOptVal" @change="searchByState()" placeholder="请选择" class="state-select" style="width: 200px;margin-bottom: 20px;">
                <el-option
                        v-for="item in playStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
                </el-select> -->
                <el-cascader
                class="selectStyle1"
                expand-trigger="hover"
                :options="option"
                v-model="benefitFrom"
                @change="selectVodBySelective">
              </el-cascader>
            
            <el-table
                    :data="tableData"
                    style="margin:0 auto;text-align:center;">
                <el-table-column
                        prop="userName"
                        label="用户名"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="ipAddress"
                        label="地址"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="lookTime"
                        label="观看时长"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机号"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="oper_type"
                        label="等级"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="首次登陆时间"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="lastTime"
                        label="最后在线时间"
                        width="180"
                        align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { ERR_OK, GIFT_URL, DATA_URL, getLStorage,MW_Live_API_URL } from "api/config";
export default {
  name: '',
  data(){
      return {
          benefitFrom:['0'],
          option:[{value: '0',label: '全部'}],
          tableData: [
          ],
          playStates:[{
              value:'',
              label:'全部'
            },
              {
                  value:'1',
                  label:'预告'
              },
              {
                  value:'2',
                  label:'直播'
              },

              {
                  value:'3',
                  label:'回放'
              }],
          stateOptVal:'',
          userID:getLStorage("user_id"),
          liveID:getLStorage("liveID"),
      }
  },
  created(){
        this.getSelectOption();
        this.getData();
    },
    methods:{
    getSelectOption(){
      axios
        .get(
          DATA_URL +
            "mwlive/live/get_listbycreatetime.do?user_id=" +
            this.userID +
            "&page_index=1" +
            "&page_size=100" +
            "&liveStatus=" +
            "&timeType=1"
        )
        .then(response => {
          //  console.log(JSON.stringify(response))
          if (response.data.code == "200") {
            var liveList=[];
            var ll=response.data.data.data_list;
            ll.forEach(e => {
              liveList.push({value:e.id,label:e.live_name});
            });
           this.option.push({value:"1",label:"直播间",children:liveList});
          }
        })
        .catch(function(err) {
          console.log(err);
        });
        let paramData = {
        userId: this.userID,
        mediaFolderId: "0",
        page_index: "1",
        page_size: "100"
      };
      this.$ajaxs.getVideoList(paramData).then(res => {
        if (res.code == "200") {
          var getVideoList=[];
          var lv=res.data.list;
          lv.forEach(e => {
            getVideoList.push({value:e.defRoomId,label:e.vodName});
          });
          this.option.push({value:"2",label:"点播间",children:getVideoList});
        }
      });
    },
    selectVodBySelective(data){
      console.log(data[0]);
      this.getData();
    },
    searchByState(){
        console.log(this.stateOptVal);
    },
    getData(){
        if(this.benefitFrom[0]=="0"){
          this.liveID="";
        }else{
          this.liveID=this.benefitFrom[1];
        }
        let formdata = new FormData();
      formdata.append("pageNo", "1");
      formdata.append("pageSize", "10");
      formdata.append("userID", this.userID);
      formdata.append("liveID",this.liveID);
 console.log(JSON.stringify(formdata));
      axios
        .get(
          MW_Live_API_URL +
            "/20/service/liveUserManager.action?userID=" +
            this.userID +
            "&pageNo=1" +
            "&pageSize=100"+"&liveID=" +this.liveID
        )
        .then(response => {
          console.log(JSON.stringify(response));
          if (response.data.resultCode =="200" ) {
            console.log(JSON.stringify(response));
            this.tableData=response.data.params.list;
          }
        })
        .catch(function(err) {
          // this.tipsMessage('分页获取失败！','error')
          console.log(err);
        });
    }
}

}
</script>
<style scoped>
.selectStyle1{
  margin-bottom: 20px;
}
</style>
