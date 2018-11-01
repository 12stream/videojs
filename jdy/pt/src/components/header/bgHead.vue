<template>
    <div class="bgHead">
        <div class="fl">
            <img src="../../common/image/bg_yuan.png" alt="">
        </div>
        <div class="fr">
            <img src="../../common/image/bg_yuan_1.png" alt="">
        </div>
    </div>
</template>

<script>
    import {DATA_URL,ERR_OK,getCookie,getLStorage,setLStorage} from 'api/config'
    import axios from 'axios'
    export default{
        data(){
            return {
              
            }
        },
        created(){
         
        },
        methods:{
           
        }
    }
</script>

<style scoped>
.bgHead{
  width:100%;
}
.bgHead .fl{
    float: left;
}
.bgHead .fr{
    float: right;
}

</style>
