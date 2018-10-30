<template>
    <div class="history">
        <Title :showtitle="title" v-if="!weixinFlag"></Title>
        <div :class="tabfix ? 'search fix' : 'search'" id="search">
            <input type="text" placeholder="搜索直播标题" v-model="liveTitle" @input="search"/>
            <span class="cancel" @click="$router.push({path:'/'})">取消</span>
        </div>
        <div class="historylist" v-if="historyList.length !== 0 && searchplay.length == 0">
             <div class="history-title">
                <span>搜索记录</span>
                <img src="./images/fill.png" @click="clearHistory">
            </div>
            <div class="wordList">
                <span v-for="item in historyList" :key="item" @click="historySearch(item)">{{item}}</span>
            </div>
        </div>

        <!-- 搜索直播数据列表 -->
        <div class="historylist" v-else-if="searchplay.length !== 0">
            <div class="search-live-wrapper" >
                <div class="search-live" v-for="(item,i) in searchplay" :key="i" @click="toPage(item)">
                    <div class="search-img">
                        <img :src='item.file_url'>
                        <span class="play" v-if="item.live_status == 1">直播</span>
                        <span class="afterplay" v-else-if="item.live_status == 0">预告</span>
                        <span class="curplay" v-else-if="item.live_status == 2">回放</span>
                        <span class="end" v-else-if="item.live_status == 5">结束</span>
                    </div>
                    <div class="search-details">
                        <div class="title">{{item.live_name}}</div>
                        <div class="time">时间 : <Countdown :time='item.begin_time' :timeflag="true"></Countdown></div>
                        <div class="hot" v-if="item.live_status !== 0">热度 : {{item.cur_viewers}}</div>
                        <div class="hot" v-else-if="item.live_status == 0">热度 : {{item.subscrib_num}}</div>
                        <div class="price" v-if="item.view_pass && item.live_permit == 2">
                            <sub>￥</sub>
                            <span class="money">{{item.view_pass}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nohistorylist" v-else>
            <img src="./images/img-weix.png">
            <span>无搜索结果</span>
        </div>
    </div>
</template>
<script>
import Title from '@/components/Title'
import api from '@/api/api'
import Countdown from '@/components/CountDown'
import {is_weixn, is_QQ} from '@/utils/utils'
export default {
    data() {
        return {
            liveTitle:'',
            historyList:[],
            title:'中国网正在上演',
            show:false,
            mes:'删除咯',
            searchplay:[],
            weixinFlag:false,
            tabfix:false
        }
    },
    components:{Title, Countdown},
    methods:{
        toPage(vId) {
            if(vId.live_status !== 6) {
                this.$router.push({path:`/live/${vId.id}`})
            }else {
                this.$router.push({path:`/video/details/${vId.id}`})
            }
        },
        search(){
             var params = {
                params:this.liveTitle,
                page_index:1,
                page_size:10000000
            }
            setTimeout(() => {
                 this.$ajax.searchLiveList(params).then(res =>{
                    if(res.code == 200) {
                        if(this.liveTitle !== ''){
                            if(res.data.data_list) {
                                 this.searchplay = res.data.data_list
                            }else {
                                this.historyList = []
                                this.searchplay = []
                            }
                            if(localStorage.getItem('liveTitle')) {
                                var liveListTime = JSON.parse(localStorage.getItem('liveTitle'));
                                if(liveListTime.indexOf(this.liveTitle) < 0 && res.data.data_list) {
                                    liveListTime.push(this.liveTitle)
                                    localStorage.setItem('liveTitle',JSON.stringify(liveListTime))
                                }
                            }else {
                                if(res.data.data_list) {
                                    var list = [];
                                    list.push(this.liveTitle)
                                    localStorage.setItem('liveTitle',JSON.stringify(list))
                                }
                            }
                            
                        }
                    }
                })
            },500)
        },
        clearHistory() {
           this.$msgbox({
                title:'温馨提示',
                cancel:'取消',
                content:'你确定删除搜索记录吗？',
                confirm:'确定按钮',
                className:'pop-custom',
                resultF:true
            }).then(()=>{
                localStorage.removeItem('liveTitle')
                this.historyList = []
            }).catch((err)=>{
                // console.log("error");
            })
        },
        historySearch(item) {
             var params = {
                params:item,
                page_index:1,
                page_size:100000
            }
            this.$ajax.searchLiveList(params).then(res =>{
                if(res.code == 200) {
                    if(res.data.data_list) {
                        this.searchplay = res.data.data_list
                    }else {
                        this.historyList = []
                        this.searchplay = []
                    }
                }
            })
        },
        topScroll() {
            var scrollTop = document.getElementById('app').pageYOffset || document.getElementById('app').scrollTop
            // var scrollHeight = document.getElementById('app').scrollHeight
            // var clientHeight = document.getElementById('app').clientHeight
            if(this.$route.name == 'Search') {
                var videotab = document.getElementById('search')
                var videotabHight = videotab.offsetTop;
            }
            // console.log(scrollTop,videotabHight)
            if(scrollTop > videotabHight) {
                this.tabfix = true
            }else {
                this.tabfix = false
            }
        }
    },
    mounted(){
        document.getElementById('app').addEventListener('scroll', this.topScroll)
        if(localStorage.getItem('liveTitle')) {
            this.historyList = JSON.parse(localStorage.getItem('liveTitle'))
        }
        if(is_weixn() || is_QQ()) {
            this.weixinFlag = true
        }
    },
     beforeDestroy() {
      document.getElementById('app').removeEventListener('scroll', this.topScroll)
    }
}
</script>
<style lang="scss">
.history {
    .search {
        width: 100%;
        background: #EDEEF1;
        padding: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &.fix {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1;
        }
        input {
            height: 3.2rem;
            border-radius: 1.7rem;
            flex: 8;
            font-size: 1.3rem;
            margin: 0 1.5rem;
            padding-left: 3.5rem;
            line-height: 3.2rem;
            color: #9B9B9B;
            background:url('images/souicon.png') no-repeat #fff 1.5rem;
        }
        .cancel {
            height: 1.9rem;
            width: 2.7rem;
            line-height: 1.9rem;
            font-size: 1.3rem;
            margin-right: 1.5rem;
            color: #111111;
        }
        input::-webkit-input-placeholder{
            color:#D9D9D9;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#D9D9D9;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#D9D9D9;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#D9D9D9;
        }
    }
    .historylist {
        .history-title {
            height: 5.7rem;
            line-height: 5.7rem;
            display: flex;
            justify-content: space-between;
            align-items:center;
            span {
                color: #111;
                font-size: 1.3rem;
                padding-left: 1.5rem;
                font-weight: bold;
            }
            img {
                margin-right: 1.5rem;
                width: 1.5rem;
                height: 1.5rem;
            }
        }
        .wordList {
            span {
                display: inline-block;
                height: 3rem;
                text-align: center;
                line-height: 3rem;
                font-size: 1.3rem;
                background: #F8F8F8;;
                border-radius: 1.5rem;
                padding: 0 1.2rem;
                color: #333;
                margin-left: 1rem;
            }
        }

        .search-live {
            display: flex;
            .search-img {
                position: relative;
                img {
                    width: 15rem;
                    height: 8.5rem;
                    padding: 1rem;
                    border-radius: 0.3rem;
                }
                span {
                    position: absolute;
                    top: 1.6rem;
                    left: 1.4rem;
                    width:4rem;
                    height:1.6rem;
                    border-radius:1rem;
                    font-size: 1.1rem;
                    line-height: 1.6rem;
                    text-align: center;
                    color: #fff; 
                    &.play {
                        background:#FF1818;
                    }
                    &.afterplay {
                        background:#74C022;
                    }
                    &.curplay {
                        background:#4285F4;
                    }
                    &.end {
                        background:#101010;
                    }
                }
            }
            .search-details {
                    flex: 1;
                    padding-top: 1rem;
                    .title {
                        font-size: 1.5rem;
                        color: #333333;
                        line-height: 2.1rem;
                    }
                    .time,.hot {
                        font-size:1.2rem;
                        color:#9B9B9B;
                        line-height:1.5rem;
                    }
                    .price {
                        sub {
                            font-size: 0.8rem;
                            color: #FF6633;
                            position: relative;
                            top: -1px;
                        }
                        .money {
                            font-size: 1rem;
                            color: #FF6633;
                            height:1.8rem;
                            line-height: 1.4rem;
                        }
                    }
            }
        }
    }
    .nohistorylist {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 13.8rem;
        span {
            margin-top: 2rem;
            color: #9B9B9B;
        }
    }
}
</style>
