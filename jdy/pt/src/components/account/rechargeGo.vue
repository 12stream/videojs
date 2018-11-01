<template>
    <div class="rechargeGo">
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK, DATA_URL,getLStorage,setLStorage} from 'api/config'
    import {axiosData} from 'api/http'
    export default{
        data(){
        },
        created(){
            let data = {
                'user_id': this.$route.query.user_id,
                'to_type': this.$route.query.to_type,
                'money': this.$route.query.money,
            }
            let url = DATA_URL + 'manage/finance/topup.do'
            axios({
                method: 'post',
                url: url,
                params: data,
                headers: {
                    "Content-Type":"application/json;charset=utf-8"
                }
            }).then((res) => {
                var url = res.data.payUrl.replace(/&amp/g, "&")
                console.log(url)
                window.location.href=url
            })
            .catch(function(err){
                console.log(err);
            })
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>

