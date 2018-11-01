<template>
    <div class="giftStatus">
        defaultGift
        <el-switch
        v-model="value"
        on-text=""
        off-text="">
        </el-switch>
        <!-- <el-switch
        v-model="scope.row.defaultGift"
        @change="defaultGift(scope.row.id, scope.row.defaultGift)"
        on-text=""
        off-text="">
        </el-switch> -->
    </div>
</template>

<script>
    export default{
        props:{
            status:{
                type:Boolean,
                default:false
            }
        },
        created(){
        },
        data(){
            return{
                value: false
            }
        },
        methods:{
            
        },
        watch:{
            
        }
    }
</script>

<style scoped>
</style>
