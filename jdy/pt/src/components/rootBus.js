import Vue from 'vue'
import {ERR_OK, GIFT_URL, DATA_URL,getLStorage,PAGE_SIZE} from 'api/config'
import axios from 'axios'
export default new Vue({
    data(){
        return {
            val:'liveControl', //视频中心详情tab页面控制
            ybSinid:'',
            linkMp:false,
            myQualify:''
        }
    },
    created(){
        this.$on('updateTab',(newVal)=>{
            console.log(newVal)
            this.val = newVal;
        })
        this.$on('dialShow1',(newVal)=>{
            this.ybSinid = newVal;
            this.linkMp = true;
        })
        this.$on('upLinkMp',(newVal)=>{
            this.linkMp = false;
            this.ybSinid = '';
        })
        this.getQualify();
    },
    methods:{
        getQualify(){
            var params = {userId:getLStorage('user_id')};
                axios.get(DATA_URL + 'mwlive/user/get_userinfo.do',{
                    params:{
                        id:getLStorage('user_id')
                    }
                }).then((response) => {
                    if (response.data.data.qualify == 3) {
                        this.myQualify = 3
                    }else{
                        this.myQualify = 1;
                    }  
                }).catch(function(err){
                    console.log(err)
                })
        }
    }
    // watch(){
    //     this.$on('updateTab',(newVal)=>{
    //         console.log(newVal)
    //         this.val = newVal;
    //     })
    // }
})