<template>
    <div class="details">
            <div class="title">
                <div class="live-title">{{detail.live_name}}</div>
                <div class="start-time-title">开始时间：<Countdown :time='detail.begin_time' :timeflag="true"></Countdown></div>
                <div class="money" v-if="detail.live_permit == 0">
                    <span class="no-money">免费</span>
                </div>
                <div class="money" v-else>
                    <img src="../images/icon_fufei.png">
                    <span>￥{{detail.view_pass}}</span>
                </div>
            </div>
            <div class="introduction">
                <h5>简介</h5>
                <div v-if="introu.length !== 0" v-for="(item,i) in introu" :key="i" class="int-img">
                    <img :src="item.img_url" v-if="item.img_url"> 
                    <p v-else>{{item.img_text}}</p>
                </div>
                <div v-if="!detail.live_text" class="no-introduct">
                    <img src="./../images/no-introuduce.png">
                </div>
                <p class="nointrouce">暂无简介哦~</p>
            </div>
    </div>
</template>
<script>
import Countdown from '@/components/CountDown'
import eventVue from '@/components/eventVue.js'
export default {
    data() {
        return {
            dimg:[]
        }
    },
    props:['detail', 'introu'],
    components:{Countdown},
    methods:{
        detailsImg() {
            this.dimg = JSON.parse(this.detail.live_text_imgs)
        }
    },
    mounted() {
        eventVue.$emit('livebottom',false)
        this.detailsImg()
    }
}
</script>
<style lang="scss" scoped>
    .details {
            .title {
                border-bottom: 1px solid #f2f2f2;
                .live-title {
                    font-size: 1.8rem;
                    padding: 0.6rem 5.6rem 0.6rem 1.5rem;
                    font-family:PingFangSC-Medium;
                    font-weight: bold;
                    color: #333333;
                    line-height: 2.5rem;
                }
                .start-time-title {
                    font-size: 1.3rem;
                    color: #999;
                    padding: 0.6rem 0 0.6rem 1.5rem;
                }
                .money {
                    padding: 0 0 1.5rem 1.5rem;
                    img {
                        width: 41px;
                        height: 20px;
                    }
                    span {
                        color: #FF6634;
                        &.no-money {
                            color: #34A853;
                            font-size: 1.2rem;
                        }
                    }
                }
            }
            .introduction {
                .int-img {
                    img {
                        width: 100%;
                        height: 21rem;
                        padding: 0 3%;
                    }
                    p {
                        font-size:1.4rem;
                        line-height: 2.5rem;
                        word-break: break-all;
                    }
                    }
                h5 {
                    font-size: 1.6rem;
                    color: #333;
                    padding: 1.5rem;
                    line-height: 2.3rem;
                }
                p {
                    font-size: 1.4rem;
                    color: #333;
                    line-height: 2.5rem;
                    padding: 0 1.5rem;
                }
                .no-introduct,.nointrouce {
                    display: flex;
                    justify-content: center;
                    background: #f6f6f6;
                    color: #9B9B9B;
                    padding-bottom: 1rem;
                }
            }
        }
</style>

