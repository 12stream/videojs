<template>
    <div class="list">
        <div class="list-all" v-if="listNumber !== 0">
            <div v-for="(item,i) in listData" :key="i">
                <div class="one" v-if="i == 0">
                    <img src="./../images/details_ic_the_first.png">
                    <div class="one-detail">
                        <div class="detail">
                            <span class="img"><img :src="item.imgUrl" alt=""></span>
                            <span class="name">{{item.userName}}</span>
                            <span class="money">{{(item.amount/100).toFixed(2)}} 元</span>
                        </div>
                    </div>
                </div>
                <div class="no-one-detail" v-if="i == 1">
                    <img src="./../images/details_ic_second.png">
                    <div class="no-one oneborder">
                        <div class="img-name">
                            <img :src="item.imgUrl">
                            <span class="name">{{item.userName}}</span>
                        </div>
                        <span class="money">{{(item.amount/100).toFixed(2)}}元</span>
                    </div>
                </div>
                <div class="no-one-detail" v-if="i == 2">
                    <img src="./../images/details_ic_third.png">
                    <div class="no-one">
                        <div class="img-name">
                            <img :src="item.imgUrl" >
                            <span class="name">{{item.userName}}</span>
                        </div>
                        <span class="money">{{(item.amount/100).toFixed(2)}}元</span>
                    </div>
                </div>
                <div class="no-one-detail" v-if="i !== 0 && i !== 1 && i !== 2">
                    <span class="number">{{i}}</span>
                    <div class="no-one">
                        <div class="img-name">
                            <img :src="item.imgUrl">
                            <span class="name">{{item.userName}}</span>
                        </div>
                        <span class="money">{{(item.amount/100).toFixed(2)}}元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nolist" v-if="listNumber == 0">
            <img src="./../images/img-git.png">
            <span>暂未收到礼物哦~</span>
        </div>
    </div>
</template>
<script>
import eventVue from '@/components/eventVue.js'
export default {
    data() {
        return {
            listNumber:0,
            listData:[]
        }
    },
    methods:{
        getList() {
            this.$ajax.list({receiveLiveID:this.$route.params.liveId}).then(res =>{
                // console.log(res)
                this.listNumber = res.params.totalAmount-0
                if(res.params.list) {
                    this.listData = res.params.list
                }
            })
        }
    },
    mounted() {
        this.getList()
        eventVue.$emit('livebottom',false)
        eventVue.$on('listD',res=>{
            this.listData = res
        })
    }
}
</script>
<style lang="scss" scoped>
.list-all {
    width: 100%;
    padding-left: 1.5rem;
    background: #fff;
    .one {
        width: 100%;
        height: 140px;
        display: flex;
        // justify-content: center;
        align-items: center;
        position:relative;
        img {
            width: 2.3rem;
            height: 3rem;
        }
        .one-detail {
            width: 100%;
            display: flex;
            justify-content: center;
            // border-bottom: 1px solid #e3e3e7;
            padding: 0.8rem;
            position: absolute;
            top: 0;
            left: -0.75rem;
            .detail {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-bottom: 0.8rem;
                .img {
                    width: 164px;
                    height: 74px;
                    background: url('./../images/details_bg_the_first.png') no-repeat;
                    background-size: cover;
                    img {
                        width: 60px;
                        height: 60px;
                        margin-left: 53px;
                        border-radius: 50%;
                        margin-top: 12px;
                    }
                }
                .name {
                    font-size: 1.4rem;
                    color: #333333;
                    margin-top: 2px;
                    height:20px;
                    line-height: 20px;
                }
                .money {
                    color: #FF6633;
                    font-size: 1.4rem;
                    height:20px;
                    line-height: 20px;
                }
            }
        }
    }
    .no-one-detail {
        display: flex;
        align-items: center;
        >img {
            width: 2.3rem;
            height: 3rem;
        }
        .number {
            display: inline-block;
            width: 2.3rem;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
        }
        .no-one {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e3e3e7;
            // border-top: 1px solid #e3e3e7;
            padding-bottom: 0.8rem;
            padding-top: 0.8rem;
            &.oneborder{
                border-top: 1px solid #E3E3E7;
            }
            .img-name {
                img {
                    width: 3.8rem;
                    height: 3.8rem;
                    margin: 0 1.5rem;
                }
            }
            .money {
                padding-right: 1.5rem;
                color: #FF6633;
            }
        }
    }
}
.nolist {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 4.5rem;
        span {
            margin-top: 1.2rem;
            color: #9B9B9B;         
        }
}
</style>

