<template>
    <div class="liveControl">
        <v-header :realshow="realshow"></v-header>
        <div class="liveControl-main liveControl-wrap">
            <el-row class="w1000 mt20">
                <el-col :span="24">
                    <div class="liveControl-top liveControl-tab mainNav">
                        <el-tabs border class="tabs-header" v-model="activeNameTab" @tab-click="handleClick" type="border-card">
                            <el-tab-pane name="liveControl">
                                <span slot="label">视频控制</span>
                                <div class="liveControl-content my_section">
                                    <el-row class="fl-betw">
                                        <el-col  class="liveControl-left">
                                            <div class="live-wrap">
                                                <div id="box_top" v-show="NoticeING==true">
                                                    <div class="my_marquee"   style="width:100%">
                                                        <div>
                                                            <span>{{noticeList.data}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="liveControl-img te-c">
                                                    <div class="video" id="video">
                                                        <div class="flash" id="flash">
                                                            <div class="p-r" v-if="viedoShow">
                                                               <div v-if="viedoShow" id="videoA1"></div>
                                                            </div>
                                                        </div>
                                                        <div v-if="!viedoShow" class="live-pic">
                                                            <img class="live-picBg" :src="chat.thisData.live_cover_img || defaultImgUrl">
                                                         </div>
                                                    </div>
                                                    <!-- end live -->
                                                </div>
                                                <div class="liveControl-title" style="padding-left:20px">
                                                    <!-- <span>{{chat.thisData.live_switch == 0 ? true : false}}</span> -->
                                                    <!-- <el-switch
                                                    v-model="chat.live_switch"
                                                    @change="_LiveStatus"
                                                    class="fr pd15"
                                                    on-text=""
                                                    off-text="">
                                                    </el-switch> -->

                                                    <span class="liveControl-titleN">{{chat.liveStatusTxt || '直播监控'}}</span>
                                                    <el-button  class="btn red_btn" :disabled="overLive" @click="overLiveFun">结束点播</el-button>
                                                    <!-- red_btn -->
                                                </div>
                                            </div>
                                            <div class="liveControl-bom live-bom">
                                                <div class="liveControl-class te-c" style="color:#333333;font-size:12px;">观看方式 :</div>
                                                <el-tabs v-model="activeName"   @tab-click="handleClick2">
                                                    <el-tab-pane class="pd20"   label="扫码观看" name="first">
                                                        <div style="">
                                                            <input placeholder="rtmp://push.facebac.com/live/2a949943ef7ce25b7e68?token=8df7" readonly type="text" class="el-input__inner">
                                                            <el-button class="btn blue_btn">复制</el-button>
                                                        </div>
                                                            <div class="down_app" style="width: 111px;margin: 20px auto 0;">
                                                                <img  class="img_ewm"  src="../../common/image/download_ma.png" alt="">
                                                                <span style="display:block;width: 111px;text-align: center;" >手机扫描观看</span>
                                                            </div>
                                                    </el-tab-pane>
                                                </el-tabs>
                                            </div>
                                        </el-col>
                                        <el-col  class="liveControl-re">
                                            <div class="liveControl-bom liveControl-cen live_right">
                                                <el-tabs class="liveControl-title" v-model="liveInfo" @tab-click="handleClick3">
                                                    <!-- <el-tab-pane label="聊天互动" name="Interaction">直播互动</el-tab-pane> -->
                                                    <el-tab-pane label="公告栏" class="notice_board"  name="notice_board">
                                                        <div style="height: 446px;">
                                                            <div class="notice_content" v-if="noticeList.isData">
                                                                <div class="item"  v-for="item in noticeList.data">
                                                                    <div class="time">{{item.createTime}}</div><!--{{item.createTime | filterTime}}-->
                                                                    <div class="item_conten">{{item.content}}</div>
                                                                </div>
                                                            </div>
                                                            <div class="p-r" v-if="!noticeList.isData">
                                                                <div class="no_noticeList">
                                                                    <!--暂无公告-->
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="notice_rules">
                                                            <div class="rules_title">
                                                                <template>
                                                                    <el-radio class="my_radio" v-model="radioRoll" label="0">滚动次数</el-radio>
                                                                    <el-input v-model="rollNumber" type="number" class="input_50" style="margin-right:37px;"></el-input>
                                                                    <el-radio class="my_radio" v-model="radioRoll" label="1">滚动时间</el-radio>
                                                                </template>
                                                                <template>
                                                                    <el-time-select class="my_time"
                                                                                    v-model="startTimeRoll"
                                                                                    :picker-options="{
                                                                        start: '00:10',
                                                                        step: '00:10',
                                                                        end: '24:00',
                                                                        maxTime: endTimeRoll
                                                                        }"
                                                                                    placeholder="开始时间">
                                                                    </el-time-select>~
                                                                    <el-time-select class="my_time" style="margin-right:25px"
                                                                                    v-model="endTimeRoll"
                                                                                    :picker-options="{
                                                                        start: '00:00',
                                                                        step: '00:10',
                                                                        end: '24:00',
                                                                        minTime: startTimeRoll
                                                                        }"
                                                                                    placeholder="结束时间">
                                                                    </el-time-select>
                                                                </template>
                                                                <el-popover
                                                                        ref="popover1"
                                                                        placement="top-start"
                                                                        trigger="hover"
                                                                >
                                                                    <div class="popover">
                                                                        <p><span class="txt_blue">滚动次数：</span><span>输入滚动次数，则公告就会在屏幕中滚动相应次数。</span></p>
                                                                        <p><span class="txt_blue">滚动时间：</span><span>可以设置指定一段时间内公告一直滚动，次数不限。</span></p>
                                                                        <p><span class="txt_blue">公告栏开关：</span><span>可以随时关闭或开启公告栏。</span></p>
                                                                    </div>
                                                                </el-popover>
                                                                <span v-popover:popover1>
                                                                    <img v-popover:popover1 src="../../common/image/icon_Help@2x.png" style="position: relative;top: 3px;cursor: pointer;" alt="">
                                                                </span>
                                                                    <!--<span class="col_4FF" style="font-size:12px" v-popover:popover1>使用帮助</span>&lt;!&ndash;&ndash;&gt;-->
                                                                <el-switch class="my_switch swi_50"
                                                                           active-text="开启"
                                                                           inactive-text="关闭"
                                                                           active-color="#2B6CFF"
                                                                           inactive-color="#CCCCCC"
                                                                           v-model="openNotice"
                                                                           @change="changeNotice"
                                                                >
                                                                </el-switch>
                                                            </div>
                                                            <el-input
                                                                    type="textarea"
                                                                    class="textH_60"
                                                                    placeholder="请输入您要显示的公告…"
                                                                    v-model="textareaNotice"
                                                                    :maxlength="30"
                                                            >
                                                            </el-input>
                                                            <el-button  class="fr btn_30"  type="primary" @click="add_noticeList()" :disabled="disabledAdd_noticeList">发送11333</el-button>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane active-name="chat" label="聊天互动" name="chat" style="padding:0">
                                                        <div class="chat bg-fff">
                                                            <div class="chat-top" style="height: 40px;">
                                                                <!--@change="ClearScreen"-->
                                                                观看显示：
                                                                <el-switch class="my_switch swi_54"
                                                                           v-model="chat.show_msg"
                                                                           active-text="正常"
                                                                           inactive-text="清屏"
                                                                           active-color="#2B6CFF"
                                                                           inactive-color="#CCCCCC"
                                                                           on-text="正常"
                                                                           off-text="清屏">
                                                                </el-switch>
                                                                弹幕审核：
                                                                <el-switch class="my_switch swi_54"
                                                                           v-model="chat.barrage_msg"
                                                                           active-text="正常"
                                                                           inactive-text="清屏"
                                                                           active-color="#2B6CFF"
                                                                           inactive-color="#CCCCCC"
                                                                           on-text="正常"
                                                                           off-text="清屏">
                                                                </el-switch>
                                                                <el-button  class="btn btn_24" >禁言名单</el-button><!--@click="getBannedList"-->
                                                            </div>
                                                            <ul class="chat-filter">
                                                                <li>全部<span>(4)</span></li>
                                                                <li>通过<span>(3)</span></li>
                                                                <li>未通过<span>(1)</span></li>
                                                            </ul>
                                                            <div class="chat-main">
                                                                <ul id="scrollBody" ><!--@scroll="handleScroll"-->
                                                                    <li v-for="(item,index) in chat.MsgData" class="pd10 clear">
                                                                        <div class="layout">
                                                                            <aside class="layout__aside--left fl">
                                                                                <img class="chat-img" :src="item.sender_head || item.imgUrl">
                                                                            </aside>
                                                                            <div class="layout__main fl">
                                                                                <div class="userName_date">
                                                                                    <span class="chat-name">{{item.nickName}}</span>
                                                                                    <span style="color:#CCCCCC">  </span>
                                                                                </div><!--{{item.send_time | filterTime}}-->
                                                                                <p style="word-wrap:break-word;font-size:12px;" :class="item.data.giftName ? 'col-red':''">
                                                                                    <span v-show="item.data.giftName">赠送了</span>{{item.data.msgbody || item.data.giftName}}
                                                                                </p>
                                                                            </div>
                                                                            <aside  class="layout__aside--right fr"><!--v-show="!item.data.giftName"-->
                                                                                <span  class="cur-p blue_bor_btn">通过</span>
                                                                                <span v-if="item.user_id != 0" class="cur-p blue_bor_btn" @click="prohibitMsg(item)">{{item.silence ? '解禁': '禁言'}}</span>
                                                                                <span class="el-icon-delete2   red_bor_btn" @click="deleteMsg(item,index)">删除</span>
                                                                            </aside>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="chat-edit pl10 wallet-wrap">
                                                                <!-- <span class="icon iconfont icon-statistics"></span> -->
                                                                <el-input  type="textarea" v-model="chat.MsgTxt"  :disabled="disabledText"  value="http://www.mwzbw/facebac.com" :placeholder="placeholderTxt"></el-input><!--@keyup.enter.native="sendMsg"-->
                                                                <span class="cur-p icon iconfont icon-hongbao" @click="dialogVisible = true"></span>
                                                                <span class="cur-p icon iconfont icon-xinxi" ></span><!--@click="openDialogVisibleInvitation"-->
                                                                <el-button type="primary" class="fr small " :disabled="disabledText" >发送</el-button><!--@click="sendMsg"-->
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="直播简介" name="introduce">
                                                        <div class="introduce bg-fff">
                                                            <div class="introduce-conter">
                                                                <!--<img :src="chat.thisData.live_cover_url || defaultImgUrl">-->
                                                                <img src="http://mwdatatest.facebac.com/1/1/2/998accadb311217a6cf4/08c27b43-7d37-4042-bd36-f02644f2a843.png" alt="">
                                                                <h3>{{chat.thisData.live_name}}</h3>
                                                                <div class="start-time">
                                                                    <p>开始时间: {{chat.thisData.notifyBeginTime}}</p><!-- | filterTime-->
                                                                    <p>观看权限: {{chat.thisData.live_permit || '免费'}}</p>
                                                                </div>
                                                                <div class="live-brief"><span>直播简介</span></div>
                                                                <div v-for="list in chat.thisData.live_text_imgs">
                                                                    <div style="word-wrap: break-word">{{list.contentDesc}}</div>
                                                                    <div><img :src="list.show_url" alt=""></div>
                                                                </div>
                                                                 <p>{{chat.thisData.live_text_imgs || '暂无'}}</p>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="贡献榜单" name="contribution">
                                                        <div v-if="giftList.isData" class="introduce contribution bg-fff">
                                                            <ul class="pd20">
                                                                <li v-for="(item,index) in giftList.data" class="clear mb10 pb10">
                                                                    <span class="fr mlr10">
                                                                        <img class="bin_icon fl" :src="giftList.bin_icon">
                                                                        <span class="fl">{{item.amount}}</span>
                                                                    </span>
                                                                    <div class="fl te-c contribution_img">
                                                                        <span v-if="index==0" class="giftList_index mt10"><img :src="giftList.top1" alt=""></span>
                                                                        <span v-else-if="index==1" class="giftList_index mt10"><img :src="giftList.top2" alt=""></span>
                                                                        <span v-else-if="index==2" class="giftList_index mt10"><img :src="giftList.top3" alt=""></span>
                                                                        <span v-else class=" giftList_index">{{index + 1}}</span>
                                                                    </div>
                                                                    <img class="giftListPortriait fl mlr10" :src="item.imgUrl" alt="">
                                                                    <span class="fl mlr10">{{item.userName}}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="contribution p-r" else>
                                                            <img class="giftListNotList p-a" src="http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/image/mobile/no_paihang.png" alt="">
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="录像列表" name="videoList">
                                                        <div  class="bg-fff"  v-if="videoList.isData">
                                                            <ul class="pd20 videoList">
                                                                <li v-for="(item,index) in videoList.data"    class="item_box">
                                                                    <div class="item">
                                                                        <div class="item_img fl">
                                                                            <img src="../../common/image/icon_play.png"  class="play_icon" alt="" ><!--@click="playVideo(item.outputPath)"-->
                                                                            <img class="fl" :src="item.videoCoverUrl">
                                                                        </div>
                                                                        <div class="item_info">
                                                                            <p>{{item.videoName}}</p><!--{{item.videoName?item.videoName.substr(0, item.videoName.length-15):''}}-->
                                                                            <p class="col_9B">时间 : {{item.createTime}}</p><!-- | filterTime-->
                                                                        </div>
                                                                        <div class="item_btnG">
                                                                            <el-button v-if="item.top==1" class="btn  btn_24  hover_red" >取消置顶</el-button><!--@click="setTop(item,'0')"-->
                                                                            <el-button v-if="item.top!=1" class="btn  btn_24 hover_orange" >置顶</el-button><!--@click="setTop(item,'1')"-->
                                                                            <el-button v-if="item.top!=1" class="btn  btn_24 hover_orange" >编辑</el-button><!--@click="setTop(item,'1')"-->
                                                                            <el-button class="btn  btn_24 hover_red" >{{item.videoSwitch =="0"?'下线':'上线'}}</el-button><!-- @click="soldVideo(item,item.videoSwitch)"-->
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="videoList p-r" else>
                                                            <div class="no_data">
                                                            </div>
                                                            <div class="tip_no_data">
                                                                <span class="default-color">你还没有录像视频！</span>
                                                                <!-- ，前往 -->
                                                                <!-- <router-link tag="div" to="/account/recharge" class="d-ib txt_blue">录像管理上传</router-link> -->
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                </el-tabs>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane name="management2">
                                <span slot="label"> 频道管理</span>
                                <el-row class="clear">
                                    <el-col :span="5" style="width:190px;" class="leftNav_wraper">
                                        <div class="live-leftNav">
                                            <channel-left></channel-left>
                                        </div>
                                    </el-col>

                                    <el-col :span="19" style="width:970px;overflow: hidden;" class="my_list">
                                        <router-view  :changeLogoMsg="changeLogoMsg" :child-data="chat.live_switch"></router-view><!--@refresh="_createData" @changeLogin="changeLogoInfo"-->
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane name="management3">
                                <span slot="label">数据统计</span>
                                <div class="lives-Statistics">
                                    <!-- 直播统计 -->
                                    <div class="Statistics-content content_section">
                                        <div class="title">直播统计</div>
                                        <el-row class="te-c statisticsTitle">
                                            <el-col :span="6">
                                                <div>经济收益 (梦豆)</div>
                                                <div class="col_4FF">{{liveStatistics.economic}}</div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div>短信服务费 (元)</div>
                                                <div class="col_4FF">{{liveStatistics.messageServer}}</div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div>观看人次 (次)</div>
                                                <div class="col_4FF">{{liveStatistics.totalViewer}}</div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div>观看人数 (人)</div>
                                                <div class="col_4FF">{{liveStatistics.lookCount}}</div>
                                            </el-col>
                                        </el-row>
                                        <el-row class="te-c statisticsTitle">
                                            <el-col :span="6">
                                                <div>累计观看时长 (分钟)</div>
                                                <div class="col_4FF">{{liveStatistics.lookTime}}</div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div>最高同时在线人数 (人)</div>
                                                <div class="col_4FF">{{liveStatistics.maxViewer}}</div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div>参与互动人数 (人)</div>
                                                <div class="col_4FF">{{liveStatistics.interaction}}</div>
                                            </el-col>

                                        </el-row>
                                    </div>
                                    <!-- 录像统计 -->
                                    <div class="Statistics-content content_section">
                                        <div class="title">录播统计</div>
                                        <el-row class="te-c statisticsTitle">
                                            <el-col :span="6">
                                                <div>经济收益 (梦豆)</div>
                                                <div class="col_4FF">{{recordedStatistics.economic}}</div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div>观看人次 (次)</div>
                                                <div class="col_4FF">{{recordedStatistics.totalViewer}}</div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div>观看人数 (人)</div>
                                                <div class="col_4FF">{{recordedStatistics.lookCount}}</div>
                                            </el-col>
                                        </el-row>
                                        <el-row class="te-c statisticsTitle">
                                            <el-col :span="6">
                                                <div>累计观看时长 (分钟)</div>
                                                <div class="col_4FF">{{recordedStatistics.lookTime}}</div>
                                            </el-col>
                                            <el-col :span="6">

                                            </el-col>
                                            <el-col :span="6">

                                            </el-col>
                                            <el-col :span="6">

                                            </el-col>
                                        </el-row>
                                    </div>
                                    <!-- 数据统计 -->
                                    <div class="my_chart">
                                        <div class="clear">
                                            <div class="fl chart_content">
                                                <div class="title">在线人数分布</div>
                                                <div id="statisticsMain1"  style="width:528px;height:250px;"></div>
                                            </div>
                                            <div class="fr chart_content">
                                                <div class="title">观看时长分析</div>
                                                <div id="statisticsMain2"  style="width:528px;height:250px;"></div>
                                            </div>
                                        </div>
                                        <div class="chart_content chart_content2 clear">
                                            <div class="title">观看方式</div>
                                            <div class="chart_content3 clear">
                                                <div id="statisticsMain3" class="fl"  style="width:440px;height:440px;">
                                                </div>
                                                <div id="statisticsMain4" class="fr"  style="width:600px;height:440px;">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <div class="main-title">
                            <h3>点播间：<span class="col_2B94FF">{{chat.thisData.live_name || '我的精彩点播'}}</span></h3>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- 红包设置 -->
            <!--<el-dialog class="my_dialog red_pack"
                       title="红包设置"
                       width="600px"
                       :visible.sync="dialogVisible"
                       size="tiny"
                       :show-close="false"

            >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name">
                        <el-input class="input_440" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动链接" prop="wallet" required>
                        <el-input class="input_440" v-model="ruleForm.wallet"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" required class="time_active" style="width:600px;">
                        <div class="data_input fl" >
                            <el-form-item prop="date1">
                                <el-date-picker
                                        v-model="ruleForm.date1"
                                        type="datetime"
                                        placeholder="选择开始时间">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <span  class="line fl" >~</span>
                        <div class="data_input fl">
                            <el-form-item prop="date2">
                                <el-date-picker
                                        v-model="ruleForm.date2"
                                        type="datetime"
                                        placeholder="选择结束时间">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
                &lt;!&ndash; <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span> &ndash;&gt;
            </el-dialog>-->
            <!-- 红包设置 End -->
            <!-- 邀请设置 -->
            <!--<el-dialog class="red_setting dialogVisibleInvitation my_dialog"
                       :visible.sync="dialogVisibleInvitation"
                       width="640px;"
                       size="tiny"
                       @close='closeMsg'
                       :show-close="false"
            >
                <div class="p-r">
                    <button type="button" @click="dialogVisibleInvitation = false" aria-label="Close" class="el-dialog__headerbtn p-a" style="top:10px;right:10px;z-index:1000;"><i class="el-dialog__close el-icon el-icon-close"></i></button>
                    <el-tabs v-model="sendMain" @tab-click="handleClickMsg">
                        <el-tab-pane class="pd20" label="收件人" name="recipient">
                            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" id="phoneBox">
                                <div class="p-a bgfff te-r" style="left:0;top:0px;width:100%;height:45px;padding-top:20px;margin-bottom:0px !important;background：#fff;z-index:999;">
                                    <span class="txt_blue cur-p" style="margin-right:20px">
                                        <a  href="http://mwdatatest.facebac.com/ticket/ticket.xls">下载模板</a>
                                    </span>
                                    <span class="msgInfo-button  col-fff cur-p mr10"  @click="addDomain">添加收件人</span>
                                    <span class="msgInfo-button bor_blue col-fff cur-p p-r mr10">
                                        导入收件人
                                        <span class="p-a" style="top:0;left:0;" >
                                            <input style="width:68px;height:30px;opacity:0;" class="cur-p" id="upload" type="file" value="导入" @change="importfPhone(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                        </span>
                                    </span>

                                    <span class="msgInfo-button bor_blue col-fff cur-p"  style="margin-right:4px;" @click="dynamicValidateForm.domains=[]">清空收件人</span>
                                </div>
                                <el-form-item   style="display:inline-block;"
                                                v-for="(domain, index) in dynamicValidateForm.domains"
                                                :key="domain.key"
                                                :prop="'domains.' + index + '.value'"
                                                :rules="[
                                            {required: true, message: '手机不能为空', trigger: 'blur'},
                                            { pattern: /^[1][345789]\d{9}$/, message: '请输入正确的手机号',trigger: 'blur' }
                                        ]"
                                >
                                    <el-input style="display:inline-block;margin-right:8px;" v-model="domain.value"></el-input><el-button class="icon_del" @click.prevent="removeDomain(domain)"></el-button>
                                </el-form-item>
                                <div class="p-a bgfff te-c" style="left:0;bottom:0px;width:100%;height:166px;margin-bottom:0px !important;">
                                    <el-form-item>
                                        <div class="te-l fl">
                                            <el-input type="textarea" :disabled="true"  class="text_info" v-model="dynamicValidateForm.msg"></el-input>
                                        </div>
                                        <div class="fr">
                                            <span id="checkMsg" class="msgInfo-button col-fff cur-p"  @click="submitFormInvitation('dynamicValidateForm')">发送</span>
                                        </div>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </el-tab-pane>

                        <el-tab-pane class="send_list" label="发送记录" name="sendList">
                            <div class="msg-state">
                                <div v-if="dynamicValidateForm.msgStateInfo.totalCount > 0" class="mt10 mb10 clear">
                                    &lt;!&ndash; <el-col :offset="1" :span="11"> &ndash;&gt;
                                    <div class="d-ib fl clear"  v-for="item in dynamicValidateForm.msgStateInfo.data">
                                        <span class="fr msg_sta" :class="'msg-status' + item.status">{{item.status | msgStateInfo}}</span>
                                        <span>{{item.phone}}</span>
                                    </div>
                                    &lt;!&ndash; </el-col> &ndash;&gt;
                                </div>
                                <div v-else class="te-c" style="margin-left:-88px">
                                    暂无发送记录
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-dialog>-->
            <!-- 发送确认-->
            <!--<el-dialog
                    :visible.sync="dialogVisibleIsInvitation"
                    :show-close="false"
                    size="tiny" class="te-c">
                <span style="line-height:30px;font-size:16px;">共发送{{dynamicValidateForm.InvitationNum}}条信息</span><br />
                <span class="col-red" style="line-height:30px;font-size:16px;">￥{{dynamicValidateForm.InvitationMony}}元</span>
                <span slot="footer" class="dialog-footer" style="margin:0 auto;display:block;">
                <el-button type="primary" @click="submitFormIsInvitation">发送</el-button>
                <el-button @click="dialogVisibleIsInvitation = false">取消</el-button>
            </span>
            </el-dialog>-->
            <!-- 发送确认-->
            <!-- 禁言列表 -->
            <!--<el-dialog
                    :visible.sync="dialogBanned"
                    :show-close="false"
                    width="638px"
                    title="禁播名单"
                    @close="closeBanned"
                    size="tiny" class="my_dialog">
                <ul  v-if="isBannedData" class="bannedList">
                    <li  class="item_box" v-for="item in bannedList">
                        <div class="item">
                            <div class="item_img fl">
                                <img :src="item.pic" alt="">
                            </div>
                            <div class="item_info" style="margin-left:70px;">
                                <p class="length_txt">{{item.nickname}}</p>
                                <p class="col_9B" style="font-size:12px;">{{item.time | filterTime}}</p>
                            </div>
                            <el-button class="btn  btn_26"  >取消禁言</el-button>&lt;!&ndash; @click="noProhibit(item)"&ndash;&gt;
                        </div>
                    </li>
                </ul>
                <div v-if="!isBannedData" class="no_BannedData">
                    <div class="no_data">
                    </div>
                    <div class="tip_no_data">
                        <span class="default-color">无数据！</span>
                    </div>
                </div>
            </el-dialog>-->
            <!-- 邀请设置 End -->

            <!--短信 start-->
            <div v-if="shortMessageFlag" class="mw-dialog__wrapper my_dialog shortMessage_dialog">
                <div class="mw-dialog__bg" @click="shortMessageFlag=false"></div>
                <div class="mw-dialog">
                    <div class="mw-dialog-body">
                        <el-tabs tab-position="top" style="height: 200px;">
                            <el-tab-pane label="收件人">
                                <div style="text-align: right;margin-bottom: 20px">
                                    <el-button type="primary">添加收件人</el-button>
                                    <el-button type="">导入收件人</el-button>
                                    <el-button type="">清空收件人</el-button>
                                </div>
                                <ul class="addressee-list">
                                    <li><input type="text"/><span><i class="icon el-icon-delete"></i></span></li>
                                    <li><input type="text"/><span><i class="icon el-icon-delete"></i></span></li>
                                    <li><input type="text"/><span><i class="icon el-icon-delete"></i></span></li>
                                    <li><input type="text"/><span><i class="icon el-icon-delete"></i></span></li>
                                </ul>
                                <div style="width: 100%;">
                                    <textarea class="sendMessage-textarea">
                                        海带 告知您参加《To open a live broadcast》的点播。点播在2018年2月3日，14点57分 开始。详情请点击http://pt.facebac.com/l/817433040741652759
                                    </textarea>
                                </div>
                                <div class="sendBtn">
                                    <el-button type="primary">发送</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="发送记录">
                                <ul class="shortMessage-list">
                                    <li>18276817381<span class="result success">发送成功</span></li>
                                    <li>18276817382<span class="result fail">失败</span></li>
                                    <li>18276817382<span class="result fail">失败</span></li>
                                    <li>18276817382<span class="result fail">失败</span></li>
                                    <li>18276817382<span class="result fail">失败</span></li>
                                    <li>18276817382<span class="result fail">失败</span></li>
                                    <li>18276817383<span class="result success">发送成功</span></li>
                                    <li>18276817383<span class="result success">发送成功</span></li>
                                    <li>18276817383<span class="result success">发送成功</span></li>
                                    <li>18276817383<span class="result success">发送成功</span></li>
                                    <li>18276817383<span class="result success">发送成功</span></li>
                                    <li>18276817384<span class="result success">发送成功</span></li>
                                </ul>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <!--<div class="mw-dialog-footer">
                        <el-button type="primary" >确定</el-button>
                        <el-button type="" >取消</el-button>
                    </div>-->
                </div>
            </div>
            <!--短信 end-->

            <!--添加第三方平台 start-->
            <div v-if="addPlatformFlag" class="mw-dialog__wrapper my_dialog addPlatform_dialog">
                <div class="mw-dialog__bg"></div>
                <div class="mw-dialog">
                    <div class="mw-dialog-header">
                       <div class="body-title">请选择</div>
                    </div>
                    <div class="mw-dialog-body">
                        <ul class="platform-list">
                            <li><el-radio v-model="plateRadio" label="1"><img src="../../common/image/icon_gzh@2x.png"/>新浪微博</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="2"><img src="../../common/image/icon_gzh@2x.png"/>一直播</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="3"><img src="../../common/image/icon_gzh@2x.png"/>今日头题</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="5"><img src="../../common/image/icon_gzh@2x.png"/>斗鱼直播</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="6"><img src="../../common/image/icon_gzh@2x.png"/>映客直播</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="7"><img src="../../common/image/icon_gzh@2x.png"/>花椒直播</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="8"><img src="../../common/image/icon_gzh@2x.png"/>哔哩哔哩</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="9"><img src="../../common/image/icon_gzh@2x.png"/>KK唱吧</el-radio></li>
                            <li><el-radio v-model="plateRadio" label="10"><img src="../../common/image/icon_gzh@2x.png"/>YY-live</el-radio></li>
                        </ul>
                        <div class="platform-more">
                            <el-radio v-model="plateRadio" label="10">添加更多第三方平台</el-radio>
                        </div>
                    </div>
                    <div class="mw-dialog-footer">
                        <el-button type="primary" @click="addPlatformNext()">下一步</el-button>
                        <el-button type=""  @click="addPlatformFlag = false">取消</el-button>
                    </div>
                </div>
            </div>
            <!--添加第三方平台 end-->

            <!--推流平台 start-->
            <div v-if="tuiliuFlatform" class="mw-dialog__wrapper my_dialog tuiliuFlatform_dialog">
                <div class="mw-dialog__bg"></div>
                <div class="mw-dialog">
                    <div class="mw-dialog-header">
                        <div class="body-title">花椒直播推流</div>
                    </div>
                    <div class="mw-dialog-body">
                        <el-form ref="tuiliuForm" :model="tuiliuForm" label-width="120px">
                            <el-form-item label="推流地址：">
                                <el-input v-model="tuiliuForm.address"></el-input>
                            </el-form-item>
                            <el-form-item label="直播码：：">
                                <el-input v-model="tuiliuForm.code"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="mw-dialog-footer">
                        <el-button type=""  @click="tuiliuFlatform = false">取消</el-button>
                    </div>
                </div>
            </div>
            <!--推流平台 end-->
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import VHeader from "@/components/header/header";
import VFooter from "@/components/header/footer";
import ChannelLeft from "@/components/leftnav/channelLeft";
import { GIFT_URL, DATA_URL, ERR_OK } from "../../api/config";
import echarts from "echarts";
import axios from "axios";
export default {
  name: "controlIndex",
  mounted() {
    console.log(this.$store.state);
    this._isData();
    this.getLiveCountData();
    this.getLiveBroadInfo();
  },
  data() {
    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
    var testurl = "http://test.redpackets.cn";
    var Url = "https://h5.redpackets.cn";
    var validateHerf = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入活动链接"));
      } else {
        if (
          value.substring(0, 25) != testurl &&
          value.substring(0, 24) != Url
        ) {
          callback(new Error("活动链接有误"));
        }
        callback();
      }
    };
    return {
      realshow: "3",
      tuiliuForm: {
        address: "http://element.eleme.io/#/zh-CN/component/form",
        code: ""
      },
      tuiliuFlatform: false, //推流平台
      plateRadio: "1",
      addPlatformFlag: false, //添加第三方平台
      shortMessageFlag: false, //短信弹窗
      disableSetFlag: true, //设备直播
      filterTime: "",
      // loading:true,
      qrcode: "",
      viedoShow: true,
      ruleForm: {
        name: "",
        date1: "",
        date2: "",
        wallet: "http://test.redpackets.cn/llhb/jump?event=1m0V0n1y2O",
        portrait: "",
        type: 1,
        redID: "",
        head_url: "",
        user_title: ""
      },
      disabledText: false,
      overLive: false,
      activeId: "",
      placeholderTxt: "我也来说一句...",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        wallet: [
          { required: true, validator: validateHerf, trigger: "blur" }
          // { required: true, message: '请输入活动链接', trigger: 'blur' },
          // { pattern: /^[http://test.redpackets.cn/llhb/jump?event]\+$/, message: '请输入正确的活动链接',trigger: 'blur' }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      },
      timer: "",
      timer2: "",
      flag: false,
      addressUrl: {
        watchAddress: ""
      },
      defaultImgUrl: "", //DEFAULT_IMG
      dialogVisible: false,
      dialogVisibleInvitation: false,
      dialogVisibleIsInvitation: false,
      dialogBanned: false,
      dynamicValidateForm: {
        domains: [],
        msg: "",
        msgStateInfo: { totalCount: "", data: "" },
        InvitationMony: 0,
        InvitationNum: 0
      },
      url: "http://mwlb.facebac.com:9161/",
      value: "",
      socket: "",
      dataList: "",
      // dataListNav:[],
      // 默认显示tab
      liveInfo: "notice_board",
      activeName: "first",
      activeNameTab: "liveControl",
      sendMain: "recipient",
      optionVal: {},
      chat: {
        logoInfo: {},
        isVideo: true,
        liveSetInterval: "",
        live_switch: true,
        chatTabName: "chat",
        playLiveUrl: "",
        live_cover_img: "",
        coverImg: "",
        _scrollBody: "",
        end_show_val: "",
        liveStatusTxt: "",
        isplay: false,
        liveStatus: "",
        deleteConfirm: false,
        isSocket: false,
        liveUrl: "",
        // 统计数据
        dataStatistics: {
          onlineTime: "",
          peakViewers: "",
          playTime: "",
          totalViewers: ""
        },
        data: [],
        thisData: { live_switch: true, live_logo: "" },
        liveID: "",
        show_msg: "", //观看显示
        barrage_msg: "", //弹幕审核
        user: [],
        opts: {},
        out_roomID: "",
        out_room_ServerAddress: "",
        end_show_type: "",
        imgUrl: "", //getLStorage('iconImg'),
        defaultImgUrl: "", //DEFAULT_IMGICON,
        user_id: "", //getLStorage('user_id'),
        Msg: "",
        MsgData: [
          {
            sender_head: "http://mwdata.mvaas.cn/1/1/2/45a1bfa36720bd382bf4/5baf3b1d-1782-4aba-b992-940216a3e3d6.jpeg",
            nickName: "汤姆",
            data: {
              giftName: "鲜花",
              msgbody: "三朵鲜花"
            }
          },
          {
            sender_head: "http://mwdata.mvaas.cn/1/1/2/45a1bfa36720bd382bf4/5baf3b1d-1782-4aba-b992-940216a3e3d6.jpeg",
            nickName: "小怪兽",
            data: {
              giftName: "掌声",
              msgbody: "热烈的掌声"
            }
          }
        ],
        MsgTxt: "",
        portrait: "",
        defaultPortrait: "" //require('common/image/default.jpg')
      },
      giftList: {
        isData: true,
        data: [
          {
            amount: "100",
            userName: "汤姆"
          },
          {
            amount: "200",
            userName: "乔治"
          }
        ],
        bin_icon: "http://mwdata.mvaas.cn/1/1/2/45a1bfa36720bd382bf4/5baf3b1d-1782-4aba-b992-940216a3e3d6.jpeg", //require('common/image/bin_icon.png'),
        top1: "", //require('common/image/top_1.png'),
        top2: "", //require('common/image/top_2.png'),
        top3: "" //require('common/image/top_3.png')
      },
      videoList: {
        isData: true,
        data: [
          {
            videoName: "上海文化广场2018年演出季发布提升演出创作能力提升演…",
            createTime: "2017-05-30 16:22"
          },
          {
            videoName: "上海文化广场2018年演出季发布提升演出创作能力提升演…",
            createTime: "2018-12-30 16:22"
          }
        ]
      },
      noticeList: {
        //公告列表
        isData: true,
        data: [
          { createTime: "2018-01-01", content: "梦网集团" },
          { createTime: "2018-03-02", content: "梦网集团百科研发部" }
        ]
      },

      dataListUrl: {
        name: "",
        imgurl:
          "http://mwportaltest.facebac.com/images/sign_add.png?ver=201703271100",
        url: ""
      },
      scroll: "",
      changeLogoMsg: "",
      radioRoll: "0",
      startTimeRoll: "",
      endTimeRoll: "",
      rollNumber: "",
      openNotice: true,
      textareaNotice: "",
      // 公告栏滚动
      animate: false,
      rollCount: 0,
      rollMax: 0,
      allNoticeId: [],
      disabledAdd_noticeList: false,
      timerRoll: "",
      // 禁言列表
      bannedList: [
        {
          nickname: "小红",
          time: "2017-01-20"
        },
        {
          nickname: "小明",
          time: "2017-05-20"
        }
      ],
      isBannedData: true, //禁言判断
      // 生效公告
      NoticeING: false,
      liveCount: {},
      // 直播统计
      liveStatistics: {},
      // 录播统计
      recordedStatistics: {},
      // 在线时长
      onlineTime: {
        duration: [],
        date: []
      },
      lookTimeStatistics: [],
      beginTime: "",
      endTime: "",
      // 测试
      animate: false,
      marqueeList: [{ name: "" }, { name: "" }],
      mini_apps: ""
    };
  },
  components: {
    VHeader,
    VFooter,
    ChannelLeft
  },
  methods: {
    addPlatformNext() {
      this.addPlatformFlag = false;
      this.tuiliuFlatform = true;
    },
    goStep() {},
    handleClick() {},
    handleClick2() {},
    handleClick3(tab, event) {
      //console.log(tab, event,'====')
      // 切换聊天页面，聊天区域跳到最低部
      this.chat.chatTabName = tab.name;
      if (this.chat.chatTabName === "chat") {
        //this._scrollTop()
      } else if (this.chat.chatTabName === "contribution") {
        //this._getGiftList()
      }
    },
    overLiveFun() {},
    _isData() {
      if (this.$store.state.liveData.DataStatistics) {
        this.activeNameTab = "management3";
        this.$store.state.liveData.DataStatistics = false;
      }
    },
    getLiveCountData() {
      let _this = this;
      let formdata = new FormData();
      formdata.append("user_id", "817433040744294632");
      formdata.append("live_id", "817433040744628706");
      axios({
        method: "post",
        url: GIFT_URL + "service/liveCount.action",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.liveCount = res.data.params;
        // 直播统计
        this.liveStatistics = this.liveCount[0];
        // 录播统计
        this.recordedStatistics = this.liveCount[1];
        // 观看时长分析
        var lookTimeV = this.liveCount[2];
        console.log(lookTimeV);
        for (var key in lookTimeV) {
          this.lookTimeStatistics.push(lookTimeV[key]);
        }
        console.log(this.lookTimeStatistics, "2222");

        var onlineTime = _this.liveCount[3];
        _this.onlineTime.date = [];
        _this.onlineTime.duration = [];
        for (var i = 0, l = onlineTime.length; i < l; i++) {
          for (var key in onlineTime[i]) {
            _this.onlineTime.date.push(key.substring(5, 16).replace("-", "/"));
            _this.onlineTime.duration.push(onlineTime[i][key]);
          }
        }
        console.log(_this.onlineTime, "3333");

        //表格数据
        var myChart1 = echarts.init(document.getElementById("statisticsMain1"));
        var myChart2 = echarts.init(document.getElementById("statisticsMain2"));
        var myChart3 = echarts.init(document.getElementById("statisticsMain3"));
        var myChart4 = echarts.init(document.getElementById("statisticsMain4"));
        var option1 = {
          tooltip: {
            trigger: "axis",
            formatter: "日期：{b}<br>在线：{c}人"
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: _this.onlineTime.date,
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: "value",
            minInterval: 1
          },
          series: [
            {
              data: _this.onlineTime.duration,
              type: "line",
              areaStyle: {
                show: true,
                position: "top"
              },
              markPoint: {
                data: [{ type: "max", name: "最大值" }]
              }
            }
          ]
        };
        var option2 = {
          tooltip: {
            trigger: "axis",
            formatter: "{b}：{c}人"
          },
          xAxis: {
            type: "category",
            data: [
              "5分钟以内",
              "5-10分钟",
              "10到30分钟",
              "30-60分钟",
              "60分钟以上"
            ],
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: "value",
            minInterval: 1
          },
          series: [
            {
              data: _this.lookTimeStatistics,
              type: "line"
            }
          ]
        };

        var option3 = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: "观看方式",
              type: "pie",
              radius: "55%",
              data: [
                { value: _this.liveStatistics.pcClientCount, name: "pc端" },
                {
                  value:
                    _this.liveStatistics.mobileClientCount +
                    _this.liveStatistics.h5ClientCount,
                  name: "移动端"
                }
              ]
            }
          ]
        };
        var option4 = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          xAxis: {
            type: "value"
          },
          yAxis: {
            type: "category",
            data: ["pc端", "移动端"]
          },
          series: [
            {
              name: "观看方式",
              type: "bar",
              radius: "55%",
              data: [
                { value: _this.recordedStatistics.pcClientCount, name: "pc端" },
                {
                  value:
                    _this.recordedStatistics.mobileClientCount +
                    _this.recordedStatistics.h5ClientCount,
                  name: "移动端"
                }
              ]
            }
          ]
        };

        myChart1.setOption(option1);
        myChart2.setOption(option2);
        myChart3.setOption(option3);
        myChart4.setOption(option4);
      });
    },
    //关闭公告
    changeNotice() {
      let _this = this;
      let open;
      if (_this.openNotice) {
        open = 1;
        this.disabledAdd_noticeList = false; //可发送
      } else {
        open = 0;
        this.disabledAdd_noticeList = true; //不可发送
        // this.rollNumber = ""
        // this.startTimeRoll = ""
        // this.endTimeRoll=""
        // this.textareaNotice=""
      }
    },
    //新增公告
    add_noticeList() {
      let _this = this;
      var msg = { msg: "公告：" + _this.textareaNotice };
      if (_this.textareaNotice == "") {
        this.$message({
          message: "请输入公告内容",
          type: "info"
        });
        return;
      }

      // 设置为滚动次数
      console.log(_this.radioRoll, "滚动次数");
      if (_this.radioRoll == "0") {
        if (this.rollNumber) {
          if (this.rollNumber <= 0) {
            //_this.tipsMessage('请您输入大于0的整数')
            this.$message({
              message: "请您输入大于0的整数",
              type: "info"
            });
            return;
          } else {
            var data = {
              cmd: "set_room_sys_broadcast",
              //liveID:this.chat.thisData.id,
              liveID: "817433040744628706",
              sys_broadcast_switch: 1,
              sys_broadcast_times: _this.rollNumber,
              sys_broadcast_time_start: "0",
              sys_broadcast_time_end: "0",
              sys_broadcast: JSON.stringify(msg)
            };
            console.log(data, "滚动设置参数");
            _this.send_noticeList(data);
          }
        } else {
          // _this.tipsMessage('请输入滚动次数')
          this.$message({
            message: "请输入滚动次数",
            type: "info"
          });
        }
      } else {
        // 设置为滚动时间
        if (_this.startTimeRoll && _this.endTimeRoll) {
          var data = {
            cmd: "set_room_sys_broadcast",
            //liveID:this.chat.thisData.id,
            liveID: "817433040744628706",
            sys_broadcast_switch: 1,
            sys_broadcast_times: 0,
            sys_broadcast_time_start: _this.startTimeRoll.replace(":", ""),
            sys_broadcast_time_end: _this.endTimeRoll.replace(":", ""),
            sys_broadcast: JSON.stringify(msg)
          };
          console.log(data, "选择时间");
          _this.send_noticeList(data);
        } else {
          // _this.tipsMessage('请选择开始时间和结束时间')
          this.$message({
            message: "请选择开始时间和结束时间",
            type: "info"
          });
        }
      }
    },
    // 发送公告,设置公告
    send_noticeList(formdata) {
      let _this = this;
      this.$ajax.dispatcher(formdata).then(data => {
        this.$message({
          showClose: true,
          type: "success",
          message: "设置成功!"
        });
        _this.NoticeING = true;
        _this.noticeList.data = _this.textareaNotice;
        console.log(_this.noticeList.data);
      });
    },
    //获取直播间相关数据
    getLiveBroadInfo() {
      let paramData = {
        id: "817433040744628706"
      };
      axios
        .get(DATA_URL + "mwlive/live/get_info.do?id=" + "817433040744628706")
        .then(response => {
          console.log(response);
          if (response.data.code == ERR_OK) {
            var data = response.data;
            console.log(data, "直播间相关数据");
            this.chat.thisData.live_Logo = data.live_Logo;
            this.qrcode = data.play_url;
            /*// 直播时间
                    if(data.notifyBeginTime != null){
                        data.notifyBeginTime = data.notifyBeginTime
                    }else if(data.begin_time != null || data.begin_time != ''){
                        data.notifyBeginTime = data.begin_time
                    }else{
                        data.notifyBeginTime = '暂无直播'
                    }
                    this.activeId = data.active_id
                    console.log('activeId'+data.active_id)

                    // 观看权限状态
                    if(data.live_permit == 1){
                        data.live_permit = '加密'
                    }else if(data.live_permit == 2){
                        data.live_permit = '付费'
                    }else if(data.live_permit == 3){
                        data.live_permit = '门票'
                    }else if(data.live_permit == 4){
                        data.live_permit = '专属直播间'
                    }else{
                        data.live_permit = '免费'
                    }
                    this.chat.thisData = data.data;
                    console.log(this.chat.thisData,'故事康');
                    // 邀请时间
                    if(this.chat.thisData.notifyBeginTime){
                        this.dynamicValidateForm.msg = getLStorage('admin') + ' 告知您参加《'+ this.chat.thisData.live_name +'》的直播。直播在'+ setDateTime(this.chat.thisData.notifyBeginTime,true) +'开始。详情请点击http://pt.facebac.com/l/' + getLStorage('liveID')
                    }else{
                        this.dynamicValidateForm.msg = getLStorage('admin') + ' 告知您参加《'+ this.chat.thisData.live_name +'》的直播。直播在'+ setDateTime(this.chat.thisData.create_time,true) +'开始。详情请点击http://pt.facebac.com/l/' + getLStorage('liveID')
                    }

                    // 禁播状态
                    if (this.chat.thisData.live_switch == 0) {
                        // this.chat.thisData.live_switch = true
                        this.chat.live_switch = true
                        setLStorage('liveEnd',false)
                    } else {
                        this.chat.live_switch = false
                        console.log('禁播状态')
                        setLStorage('liveEnd',true)
                    }

                    this.chat.thisData.live_cover_img = this.chat.thisData.live_cover_url
                    console.log('live_switch',this.chat.thisData.live_switch)
                    if(this.chat.thisData.live_text_imgs !== ''){
                        this.chat.thisData.live_text_imgs =  JSON.parse(this.chat.thisData.live_text_imgs)
                    }
                    this.dataListUrl.url = data.data.push_url
                    this.chat.playLiveUrl = this.chat.liveUrl = data.data.play_url
                    // 直播状态获取

                    this.chat.liveStatus = data.data.live_status*/
          }
        });
      //获取小程序相关信息
      this.get_miniApps();
    },
    get_miniApps() {
      let paramData = { live_id: "817433040744628706" };
      axios
        .get(
          DATA_URL +
            "mwlive/live/select_code.do?live_id=" +
            "817433040744628706"
        )
        .then(response => {
          if (response.data.code == ERR_OK) {
            var data=response.data;
            console.log(data, "小程序！");
            this.mini_apps = data.data;
          }
        });
    },
    copyLink(cpLink) {
      console.log(cpLink);
     // debugger;
      let copyUrl = "copyUrl" + cpLink;
      console.log(copyUrl);
      this.$api.copyLink(copyUrl);
      this.$message({
        type: "success",
        message: "复制成功！"
      });
    }
  },
  computed: {
    liveData: {
      get: function() {
        return this.$store.state.liveData;
      },
      set: function() {}
    }
  }
};
</script>
<style scoped>
.tishi span {
  color: red;
}
.next-btn {
  margin: 30px auto;
  width: 129px;
  font-size: 16px;
  color: #4285f4;
  border-bottom: 1px solid #4285f4;
  cursor: pointer;
}
/* 测试 */
.marquee {
  width: 100%;
  height: 50px;
  align-items: center;
  color: #3a3a3a;
  background-color: #b3effe;
  display: flex;
  box-sizing: border-box;
}

.marquee_title {
  padding: 0 20px;
  height: 30px;
  font-size: 14px;
  border-right: 1px solid #d8d8d8;
  align-items: center;
}

.marquee_box {
  display: block;
  position: relative;
  width: 100%;
  height: 30px;
  overflow: hidden;
}

.marquee_list {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
}
.marquee_top {
  transition: all 10s;
  /* margin-top: -30px */
}

.marquee_list li {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 20px;
}

.marquee_list li span {
  padding: 0 2px;
}

.red {
  color: #ff0101;
}

/* 公告栏样式 */
#box_top {
  /* width: 100%; */
  width: 528px;
  height: 34px;
  background-color: #ff467f;
  color: #fff;
  font-size: 12px;
  text-align: left;
  position: absolute;
  z-index: 999;
  overflow: hidden;
}
.anim {
  transition: all 0.5s;
  margin-top: -34px;
}

/* 定义一个走马灯动画 */

@-webkit-keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
@-moz-keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
@-ms-keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
@-o-keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}

.my_marquee {
  height: 34px;
  overflow: hidden;
  position: relative;
}
.my_marquee div {
  display: block;
  width: 100%;
  height: 34px;
  left: 100%;
  line-height: 34px;
  position: absolute;
  overflow: hidden;
}
.my_test div {
  width: 100%;
  position: relative;
  left: 0;
}

.marquee div {
  -webkit-animation: marquee 13s linear;
  -moz-animation: marquee 13s linear;
  -ms-animation: marquee 13s linear;
  -o-animation: marquee 13s linear;
  animation: marquee 13s linear;
  animation-fill-mode: forwards;
}
/* 定义一个走马灯动画 */

#con1 li {
  list-style: none;
  line-height: 34px;
  height: 34px;
}
.icon_del {
  display: inline-block;
  width: 34px;
  height: 34px;
  padding-left: 4px;
  padding: 0;
  background: url(../../common/image/icon_delete.png) no-repeat 3px 2px;
  position: relative;
  top: 10px;
  margin-right: 30px;
  border: 1px solid #d9d9d9;
}

.icon_del:hover {
  background: url(../../common/image/icon_delete_active.png) no-repeat 3px 2px;
  border: 1px solid #ff467f;
}
.line {
  margin: 0 15px;
}

.chat-top .btn_24 {
  width: 60px;
  height: 24px;
  line-height: 24px;
  background-color: #f5a623;
  color: #fff;
  border: none;
  padding: 0;
  border-radius: 2px;
  float: right;
  margin-top: 8px;
  margin-right: 20px;
}
.chat-top .btn_24:hover {
  background-color: #ffbd51;
}
.chat-top .btn_24:focus {
  background-color: #d58a10;
}
.chat-filter {
  overflow: hidden;
  padding: 0 10px;
}
.chat-filter li {
  float: left;
  margin-right: 30px;
  line-height: 38px;
  color: #333;
  cursor: pointer;
}
.chat-filter li span {
  display: inline-block;
  margin-left: 5px;
}
.notice_content,
.no_noticeList {
  height: 406px;
  background-color: #fff;
  padding: 20px;
  overflow: auto;
}
.notice_board .col_4FF {
  cursor: pointer;
}
.notice_board .small,
.wallet-wrap .small {
  width: 70px;
  margin-top: 10px;
}
.notice_board .small[disabled],
.wallet-wrap .small[disabled] {
  background-color: #d9d9d9;
}
.notice_rules {
  height: 152px;
  background-color: #f5f5f5;
  padding: 0 10px 0px 10px;
}
.notice_board .item {
  background-color: #ecf6ff;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 10px;
  line-height: 24px;
  table-layout: fixed;
  word-wrap: break-word;
  word-break: normal;
  text-align: justify;
  text-justify: inter-ideograph;
}
.notice_board .rules_title {
  line-height: 24px;
  padding-top: 10px;
  padding-bottom: 9px;
      color: #333;
}
.notice_board .item .time {
  color: #9b9b9b;
  font-size: 12px;
}

.live-leftNav {
  height: 694px;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
}
/* .time_active .el-date-editor.el-input{
        width: 130px;
    } */
.lives-Statistics {
  border-radius: 5px;
  overflow: hidden;
  min-height: 680px;
}

.Statistics-content.content_section {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}
.Statistics-content.content_section.search {
  padding: 13px 20px;
  text-align: right;
}
.Statistics-content.content_section.search .btn {
  width: 60px;
  margin-left: 18px;
}
.Statistics-content .title {
  height: 38px;
  line-height: 37px;
  background-color: #f5f5f5;
  padding-left: 20px;
  font-size: 16px;
  color: #333333;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
}

.fl-betw {
  display: -webkit-flex;
  display: flex;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
}

.live-bom {
  margin-top: 20px;
  background: #f5f5f5;
  border-radius: 5px;
  overflow: hidden;
}
.live-bom input {
  background: #fff;
  border: 1px solid #d6d8d9;
  height: 32px;
  border-radius: 2px;
  width: 420px;
  color: #333;
}
.live-bom #pane-second .btn {
  width: 70px;
  position: absolute;
  right: 19px;
  height: 32px;
}
.liveControl-re {
  width: 570px;
}
.start-time {
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #e5e5e5;
  padding: 5px 0;
}
.live-brief {
  margin-top: 10px;
}
.live-brief span {
  font-size: 14px;
  border-left: 3px solid #2B6CFF;
  padding-left: 10px;
  height: 15px;
  line-height: 13px;
  display: inline-block;
}
.start-time p {
  color: #a3a3a3;
}
.live-wrap {
  background: #ffffff;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
}
.tips-text {
  color: red;
}
.liveControl-left {
  width: 530px;
  margin: 20px;
}
.liveControl-title {
  border-top: 1px solid #e5e5e5;
  line-height: 48px;
  background-color: #fbfdff;
  color: #333333;
}
.liveControl-title .red_btn {
  float: right;
  margin: 8px 20px 0 0;
}
.liveControl-titleN {
  font-size: 14px;
}

.wallet-wrap span {
  vertical-align: middle;
  margin-top: 10px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  position: relative;
}
.wallet-wrap .icon-hongbao:before {
  background: url(../../common/image/icon_Redenvelopes.png);
  top: -20px;
}
.wallet-wrap .icon-xinxi:before {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../../common/image/icon_sm.png);
}
.wallet-wrap .iconfont::before {
  display: inline-block;
  width: 20px;
  height: 20px;
  content: "";
  position: absolute;
  top: 5px;
  left: 4px;
}
.icon-hongbao:hover {
  background: #2B6CFF;
  padding: 0;
}
.iconfont:hover::before {
  background: #2B6CFF;
  content: "红包";
  font-size: 12px;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  text-align: center;
}
.icon-hongbao:hover::before {
  content: "红包";
}
.icon-xinxi:hover::before {
  content: "短信";
}
.liveControl-img #videoA1 {
  height: 298px;
  line-height: 298px;
  background: #000000;
  line-height: 0;
  height: 298px;
}
.live-pic {
  width: 530px;
  height: 298px;
  margin: auto;
  position: relative;
}

.liveControl-img .live-pic p {
  font-size: 16px;
  margin-bottom: 10px;
}
.liveControl-img .live-pic img.live-picBg {
  width: 530px;
  height: 298px;
  /* max-width: 380px;
        max-height: 246px; */
  /* position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%) */
}
.liveControl-img img.live-picBg {
  max-width: 530px;
}
.mainNav {
  position: relative;
}
.main-title {
  position: absolute;
  top: 23px;
  left: 20px;

  font-family: "Helvetica" !important;
  font-weight: 700;
}
.main-title h3 {
  color: #333333;
  font-size: 18px !important;
}
.main-title .col_2B94FF {
  color: #2B6CFF;
  font-size: 18px !important;
}
.channel-management {
  padding: 10px 20px;
  line-height: 45px;
}
.channel-le {
  width: 120px;
  padding-right: 10px;
}
.chat-top {
  line-height: 40px;
  background: #f7fbfe;
  padding-left: 10px;
  color: #9b9b9b;
}
/* .chat-main{height:500px;overflow: hidden} */
.chat-main ul {
  height: 430px;
  overflow-y: auto;
  padding: 0 10px;
  margin-top: 10px;
  background-color: #fcfcfc;
}
.chat-main ul li {
  line-height: 20px;
}
.chat-img {
  height: 36px;
  width: 36px;
  border-radius: 5px;
  margin-top: 5px;
}
.chat-name {
  margin-right: 15px;
}
.chat-edit {
  background-color: #f5f5f5;
  height: 112px;
  padding: 8px 10px 0 10px;
}

.layout {
  padding: 0 90px 0 60px;
}
.layout__main .userName_date {
  color: #9b9b9b;
  font-size: 12px;
}
.layout__main {
  width: 100%;
  position: relative;
  left: -12px;
}
.layout__aside--left {
  width: 50px;
  margin-left: -60px;
}
.layout__aside--right {
  /*width: 80px;*/
  position: absolute;
  top: 20px;
  right: 100px;
  margin-right: -90px;
  display: none;
}
#scrollBody li {
  position: relative;
}
#scrollBody li:hover .layout__aside--right {
  display: inline-block;
}
.layout__aside--right .red_bor_btn,
.layout__aside--right .blue_bor_btn {
  display: inline-block;
  width: 36px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
}
.layout__aside--right .blue_bor_btn {
  border: 1px solid #2B6CFF;
  color: #2B6CFF;
}
.layout__aside--right .blue_bor_btn:hover,
.layout__aside--right .blue_bor_btn:focus {
  color: #fff;
  background-color: #2B6CFF;
}
.layout__aside--right .red_bor_btn {
  border: 1px solid #ff467f;
  color: #ff467f;
  margin-left: 8px;
}
.layout__aside--right .red_bor_btn:hover,
.layout__aside--right .red_bor_btn:focus {
  background-color: #ff467f;
  color: #fff;
}
.el-icon-delete2 {
  color: #58cafd;
}
.download-but {
  display: inline-block;
  width: 140px;
  line-height: 40px;
  border-radius: 20px;
  font-size: 14px;
}

.download-and {
  background: #7ed321;
  margin-top: 13px;
}
.download-ios {
  background: #2B6CFF;
}
.download-and:hover,
.download-and:focus {
  background: #6ab815;
}
.download-ios:hover,
.download-ios:focus {
  background: #0068d2;
}
.download-but.download-ios,
.download-but.download-and {
  width: 120px;
  height: 36px;
  border-radius: 2px;
  color: #fff;
  margin-left: 30px;
  cursor: pointer;
}
.liveControl-class {
  width: 96px;
  position: absolute;
  font-size: 14px;
  line-height: 39px;
  background: #f5f5f5;
}
.liveControl-bom {
  position: relative;
}
.liveInfo-top {
  border-bottom: 1px solid #eaeaea;
  font-size: 16px;
  padding-left: 20px;
}
.channel-img {
  width: 420px;
  margin: 20px 0 0 100px;
}
.mainNav .el-tabs--border-card,
.liveControl-bom {
  border-radius: 2px;
  border: 1px solid #e5e5e5;
}
.liveControl-top.liveControl-tab.mainNav:nth-child(1) .el-tabs--border-card {
  border: none;
}
.introduce.bg-fff,
.contribution,
.videoList {
  height: 590px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
.videoList .item_box {
  box-sizing: border-box;
  height: 92px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  padding: 9px 10px;
  position: relative;
}
.bannedList .item_box {
  color: #000000;
}
.bannedList .item_box:hover {
  background-color: #ecf6ff;
}
.bannedList .item_box .btn_26 {
  width: 60px;
  height: 24px;
  line-height: 22px;
  border: 1px solid #2B6CFF;
  background: #fff;
  color: #2B6CFF;
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  position: absolute;
  right: 20px;
  top: 23px;
  font-size: 12px;
}
.bannedList .item_box .btn_26:hover {
  color: #fff;
  background-color: #2B6CFF;
}
.bannedList .item_box {
  box-sizing: border-box;
  height: 70px;
  border: 1px solid #e5e5e5;
  margin-bottom: 10px;
  padding: 10px 20px;
  position: relative;
}
.bannedList .item_box .item_img {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.bannedList .item_box .item_img img {
  border-radius: 25px;
}

.videoList .item_box .item .item_img {
  width: 128px;
  height: 72px;
  border-radius: 2px;
}
.item_img img {
  width: 100%;
  height: 100%;
}
.videoList .item_info {
  line-height: 38px;
  margin-left: 138px;
}
/* .videoList .item_box  .btn{
        position: absolute;
        top:50%;
        right:21px;
        transform:translate(0,-50%);
        -ms-transform:translate(0,-50%);
        -moz-transform:translate(0,-50%);
        -webkit-transform:translate(0,-50%);
        -o-transform:translate(0,-50%);
    } */
.videoList .item_btnG {
  float: right;
  position: absolute;
  top: 42px;
  right: 17px;
}
.videoList .btn_24 {
  width: 60px;
  height: 24px;
  line-height: 22px;
  background-color: #f2f2f2;
  border: 1px solid #cccccc;
  color: #9b9b9b;
  padding: 0;
  margin-left: 6px;
  box-sizing: border-box;
}
.videoList .btn_24:hover {
  color: #fff;
}
.videoList .hover_orange:hover {
  background-color: #f5a623;
  border: 1px solid #f5a623;
}
.videoList .hover_red:hover {
  background-color: #ff467f;
  border: 1px solid #ff467f;
}
.videoList .hover_blue:hover {
  background-color: #2B6CFF;
  border: 1px solid #2B6CFF;
}
.videoList .col_9B {
  font-size: 12px;
}

.videoList .no_data {
  width: 130px;
  height: 109px;
  background: url(../../common/image/no_video.png) no-repeat;
  margin: 190px 0 13px 220px;
}

.no_BannedData .no_data {
  width: 130px;
  height: 109px;
  background: url(../../common/image/no_video.png) no-repeat;
  margin: 0 auto;
}
.no_BannedData .tip_no_data {
  margin-top: 10px;
}
.tip_no_data {
  text-align: center;
}

.introduce-conter {
  /*width:70%;*/
  margin: 0 20px;
  padding-top: 30px;
  height: 560px;
}
.introduce-conter h3 {
  margin-bottom: 9px;
}
.liveControl-title .introduce-conter {
  line-height: 30px;
}
.statisticsTitle {
  padding: 25px 0;
  background: #fff;
  color: #4a4a4a;
  font-size: 12px;
  border: 1px solid #e5e5e5;
  border-top: none;
  border-radius: 2px;
}
.statisticsTitle .col_4FF {
  font-size: 18px;
}

.statisticsTitle .el-col {
  height: 60px;
  line-height: 30px;
  border-right: 1px solid #e5e5e5;
}
.statisticsTitle .el-col:last-child {
  border-right: none;
}
.icon {
  color: #555;
}
.liveControl-tab i {
  font-size: 16px;
  margin-right: 4px;
}
#qrcode {
  margin: 20px auto 10px auto;
  width: 98px;
  height: 98px;
  border: 1px solid #e5e5e5;
  padding: 8px;
  border-radius: 2px;
}
.avatar {
  max-width: 50px;
  max-height: 50px;
  left: 10px;
  top: 10px;
}
.avatar4 {
  left: 20px;
  top: 10px;
  bottom: auto;
  right: auto;
}
.avatar2 {
  left: auto;
  top: auto;
  bottom: 10px;
  right: 20px;
}
.avatar3 {
  left: 20px;
  top: auto;
  bottom: 10px;
  right: auto;
}
img.defaultLogo {
  right: 20px;
  top: 10px;
  width: 60px;
  height: 45px;
}
.giftListNotList {
  left: 50%;
  top: 50%;
  width: 230px;
  transform: translate(-50%, -50%);
}

.introduce.contribution ul li {
  border-bottom: 1px solid #f7f7f7;
}
.introduce.contribution ul li .giftList_index {
  width: 35px;
  height: 35px;
  display: inline-block;
}
.contribution_img {
  max-width: 35px;
  max-height: 35px;
}
.giftListPortriait {
  height: 50px;
  width: 50px;
  border-radius: 60px;
}
.bin_icon {
  width: 20px;
  height: 20px;
  margin-top: 15px;
  margin-right: 2px;
}
.giftList_index.mt10 {
  margin-left: 8px;
}
.msgInfo-button {
  width: 90px;
  display: inline-block;
  background-color: #2B6CFF;
  height: 34px;
  line-height: 34px;
  text-align: center;
  border-radius: 2px;
}
.msgInfo-button:hover {
  background-color: #5faeff;
}
.msgInfo-button:focus {
  background-color: #0068d2;
}

#checkMsg.msgInfo-button {
  height: 38px;
  line-height: 38px;
  position: relative;
  top: -18px;
}
.msgInfo-button.bor_blue {
  background-color: #fff;
  border: 1px solid #2B6CFF;
  color: #2B6CFF;
}
.msgInfo-button.bor_blue:hover {
  border: 1px solid #5faeff;
}
.msgInfo-button.bor_blue:focus {
  border: 1px solid #0068d2;
}

#scrollBody li {
  border-radius: 5px;
}
#scrollBody li:hover {
  background-color: #ecf6ff;
}
.el-tabs__header is-top {
  padding: 18px 0;
}
.el-tabs__nav-wrap {
  overflow: auto;
}
</style>

<style>
/*短信弹窗*/
.shortMessage_dialog .mw-dialog-body {
  min-width: 640px;
}
.shortMessage-list,
.addressee-list {
  padding: 20px;
}
.shortMessage-list li {
  width: 50%;
  float: left;
  line-height: 35px;
  height: 35px;
  font-size: 14px;
}
.shortMessage-list li span {
  margin-left: 15px;
}
.shortMessage-list li span.success {
  color: #34a853;
}
.shortMessage-list li span.fail {
  color: #ea4335;
}
.shortMessage_dialog .el-tabs__content {
  background: transparent !important;
}
.shortMessage_dialog .el-tabs__nav-wrap::after {
  background-color: transparent;
}
/*短信收件人*/
.addressee-list li {
  margin-bottom: 20px;
  width: 33.33%;
  float: left;
  display: table;
}
.addressee-list li input {
  width: 132px;
  height: 32px;
  border: 1px solid #d9d9d9;
}
.addressee-list li span {
  display: inline-block;
  margin-left: 8px;
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
.addressee-list li span i {
  font-size: 16px;
  line-height: 30px;
}
.sendMessage-textarea {
  margin-bottom: 20px;
  width: 100%;
  height: 88px;
  border: 1px solid #d9d9d9;
}
.sendBtn {
  text-align: right;
}

/*平台列表*/
.addPlatform_dialog .mw-dialog {
  width: 540px;
}
.platform-list {
  overflow: hidden;
}
.platform-list li {
  float: left;
  margin-bottom: 15px;
  width: 33.33%;
}
.platform-list li img,
.platform-more img {
  position: relative;
  top: 4px;
  width: 20px;
  height: 20px;
  margin: 0 5px;
}
.body-title {
  text-align: left;
}
.platform-more {
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}

/*推流平台*/
.tuiliuFlatform_dialog .mw-dialog {
  width: 540px;
}

.greyBtn {
  background: #d9d9d9 !important;
  color: #fff !important;
}
.item_conten {
  color: #333;
}
/*滑块透明度*/
.slider-wrap {
  display: inline-block;
  width: 400px;
  position: relative;
  top: 15px;
  left: 15px;
}
.el-slider__runway {
  width: 100%;
  height: 24px;
}
.el-slider__button-wrapper {
  height: 10px;
  width: 24px;
}
.el-slider__button {
  width: 8px;
  height: 22px;
  border: 1px solid #dbdbdb;
  background: #fff;
  border-radius: 4px;
}
.el-slider__button-wrapper {
  top: 0;
}
.el-slider__button {
  border-radius: 0px;
}
.el-slider__runway {
  background: linear-gradient(left, #eee, #666); /* Safari 5.1 - 6.0 */
  background: -webkit-linear-gradient(left, #eee, #666); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #eee, #666); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #eee, #666); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #eee, #666); /* 标准的语法 */
  border-radius: 0 12px 12px 0;
  border: 1px solid #eee;
}
.el-slider__bar {
  background-color: transparent;
}
/*上传文件*/
.el-upload-list {
  position: absolute;
  top: 1px;
  right: 0;
}
.el-upload-list__item:first-child {
  margin-top: 0;
}
.delet-menu div {
  width: 75px;
  line-height: 34px;
  text-align: left;
  color: #4285f4;
  font-size: 14px;
  cursor: pointer;
}
.demo-dynamic .el-form-item__content {
  margin-left: 0px !important;
}
.demo-dynamic .el-form-item__content .el-input {
  width: 130px;
}
.dialogVisibleInvitation .el-dialog {
  width: 640px;
  min-height: 632px;
}
.dialogVisibleInvitation .el-dialog__body {
  padding: 0;
}
.dialogVisibleInvitation .el-tabs__item {
  font-size: 18px;
  padding-bottom: 10px;
  color: #333333;
}

.dialogVisibleInvitation .el-dialog__body {
  padding-top: 20px;
  border-bottom: none;
}
.dialogVisibleInvitation .el-tabs__item.is-active {
  color: #2B6CFF;
  font-weight: 700;
  font-family: "Helvetica", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    Arial, sans-serif;
}
.dialogVisibleInvitation .el-tab-pane:first-child {
  padding: 50px 0 188px 0;
  position: relative;
}

.dialogVisibleInvitation .el-tab-pane:first-child .demo-dynamic,
.msg-state {
  min-height: 325px;
  max-height: 325px;
  overflow-y: auto;
  padding-top: 15px;
  width: 650px;
}
.msg-status0 {
  color: #ff467f;
}
.msg-status1 {
  color: #7ed321;
}
.msg-state {
  line-height: 30px;
  width: 580px;
  font-size: 18px;
  margin-left: 46px;
  padding-top: 20px;
}

.msg-state .msg_sta {
  margin-right: 63px;
  margin-left: 22px;
  width: 80px;
}
.msg-state .d-ib {
  margin-bottom: 10px;
}
.dialogVisibleInvitation .el-dialog__header {
  display: none;
}
.liveControl .dialogVisibleInvitation .el-tabs__content {
  background: #fff;
}
.liveControl .el-tabs__content {
  background: #f2f2f2;
  color: #333333;
}
.mainNav .el-tabs__nav {
  float: right;
  margin-right: 20px;
}
.is-top .el-tabs__nav {
  margin-top: 1px;
}
.dialogVisibleInvitation.my_dialog .el-tabs__nav {
  margin-bottom: 6px;
}
.mainNav .el-tabs--border-card {
  background: none;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
#tab-notice_board {
  padding: 0 29px;
}
.mainNav .liveControl-title .el-tabs__nav {
  float: left;
}
.mainNav .liveControl-bom .el-tabs__nav {
  float: left;
  margin-left: 96px;
  border-left: 1px solid #e5e5e5;
  height: 39px;
}
.mainNav .liveControl-re .el-tabs__nav-scroll {
  height: 38px;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
}
.liveControl-re .el-tabs__nav-scroll {
  overflow: visible;
}
.mainNav .liveControl-bom .el-tabs__nav .el-tabs__item {
  width: 96px;
  height: 36px;
  color: #9b9b9b;
  font-size: 12px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.mainNav .liveControl-bom .el-tabs__nav .el-tabs__item.is-active{
  color: #2B6CFF;
}
.mainNav .liveControl-bom.live-bom .el-tabs__nav .el-tabs__item {
  border: 1px solid #e5e5e5;
}
.mainNav .liveControl-bom .el-tabs__nav .el-tabs__item.is-active, {
  height: 41px;
  border: 1px solid #e5e5e5;
}
.mainNav .liveControl-bom .el-tabs__nav .el-tabs__item:first-child.is-active {
  border-left: 0;
}
.liveControl-re .liveControl-title {
  height: 638px;
  border-radius: 5px;
  overflow: hidden;
}
.channel-top .channel-management {
  padding: 10px 0;
}

.liveControl-bom .el-tabs__active-bar {
  bottom: auto;
  top: 0;
  display: none;
}
.left-nav .el-menu-item-group__title {
  padding-top: 0;
}
.live-top {
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}
.live-top .el-button {
  float: right;
  margin-top: -10px;
}
.liveControl-tab
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active:first-child
  i {
  color: #ffffff;
}
.liveControl-bom .el-tabs__item.is-active {
  border-top: 3px solid #2B6CFF !important;
  height: 40px;
}
.liveControl-tab
  .liveControl-bom
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  color: #2B6CFF;
}
.liveControl-tab
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  background-color: #2B6CFF;
  color: #ffffff;
}
.liveControl-tab
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active
  i {
  color: #ffffff;
}
.liveControl-tab .el-tabs__item {
  height: 36px;
  line-height: 34px;
}
.liveControl-tab .el-tabs__header .el-tabs__item {
  border: 1px solid #2B6CFF;
}
.liveControl-tab .el-tabs__content .el-tabs__item {
  border: none;
}
.liveControl-tab .el-tabs__item:first-child {
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
  -webkit-border-top-left-radius: 4px !important;
  -webkit-border-bottom-left-radius: 4px !important;
}
.liveControl-tab .el-tabs__item:last-child {
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
  -webkit-border-top-right-radius: 4px !important;
  -webkit-border-bottom-right-radius: 4px !important;
}

.liveControl-tab .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  margin-right: 0px;
  /* margin-left: 0px; */
  color: #2B6CFF;
}
.liveControl-bom .el-tabs__item:first-child,
.liveControl-bom .el-tabs__item:last-child {
  border-radius: 0 !important;
}
.liveControl-bom .el-tabs__item.is-active {
  background: #ffffff !important;
}
.liveControl-bom .el-tabs__item:nth-child(3) {
  border-left: 0px !important;
}
.liveControl-bom .el-tabs__item {
  border-top: 0px !important;
}
.liveControl-bom .el-tabs__active-bar {
  width: 89px !important;
}

.mainNav .liveControl-cen .el-tabs__nav {
  margin-left: 0px;
}
.liveControl-cen .el-tabs__item {
  height: 50px;
  line-height: 50px;
}

.liveControl-wrap .el-tabs--border-card > .el-tabs__content {
  padding: 0;
  padding-top: 10px;
}
.liveControl-bom .el-tabs__content {
  background: #ffffff;
  color: #fff;
}
.live-bom .el-tabs__content {
  height: 231px;
}
.live-bom .el-button {
  background: #2B6CFF;
  border: none;
  color: #fff;
}
.trailer {
  background: #fff;
}
/*.el-switch.is-checked .el-switch__core,.el-button--primary,.el-tabs__active-bar{
        background-color:#2B6CFF;
        border:none;
    }*/
.my_list .el-button.btn_30 {
  width: 80px;
  padding: 0;
}
.el-tabs__item.is-active {
  color: #2B6CFF;
}
.red_setting .el-dialog--tiny {
  width: 580px;
}
.el-tabs__nav-wrap::after {
  background-color: #e5e5e5;
  height: 1px;
}
/* .liveControl-title .el-tabs__content{position:relative;}
    .liveControl-title .el-tab-pane{display:block !important;position:absolute;z-index:98;top:0;left:0;}
    .liveControl-title .el-tab-pane:last-child{z-index:100;} */

/* .el-loading-mask{width:100% !important;height:100% !important;} */
.liveControl-cen.live_right {
  width: 570px;
  height: 654px;
  margin-top: 20px;
  border-radius: 2px;
  /*margin-bottom:20px;*/
}
.mainNav .liveControl-cen.live_right .el-tabs__nav {
  border-left: none !important;
}

.liveControl-cen.live_right .el-tabs__nav-wrap {
  height: 39px;
}
.liveControl-cen.live_right .liveControl-title {
  border: none;
  background-color: #fff;
}
.mainNav .liveControl-cen.live_right .el-tabs__nav .el-tabs__item {
  height: 39px;
  line-height: 39px;
  border: 1px solid #e5e5e5;
  border-top: none;
}
.mainNav .liveControl-cen.live_right .el-tabs__nav .el-tabs__item:nth-child(1) {
  border-left: none;
}
.mainNav .liveControl-cen.live_right .el-tabs__nav .el-tabs__item.is-active {
  height: 41px;
  line-height: 34px;
  border: none;
  width: 95px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
}
.mainNav .liveControl-cen.live_right .el-tabs__nav:first-child .el-tabs__item {
  border-left: none;
}
* .mainNav .liveControl-cen.live_right .el-tabs__nav .el-tabs__item {
  float: left;
  width: 94px;
}

.notice_board .my_time i::after,
.notice_board .my_time i::before {
  content: "";
}

.notice_board .my_time.el-input--prefix .el-input__inner {
  padding-left: 0;
  padding-right: 0;
}
.notice_board .el-date-editor.el-input,
.notice_board .el-date-editor.el-input__inner {
  width: 60px;
}
.notice_board .input_50 .el-input__inner,
.notice_board .my_time .el-input__inner {
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  font-size: 12px;
  text-align: center;
  height: 24px;
}
.notice_board .el-input__icon {
  width: 0;
  height: 0;
  display: none;
}
.notice_board .my_time .el-input__inner {
  width: 60px;
}
.notice_board .input_50 .el-input__inner,
.notice_board .input_50.el-input {
  width: 50px;
  padding-left: 0;
  padding-right: 0;
}
.notice_board .textH_60 textarea {
  border: none;
  height: 60px !important;
  border-radius: 2px;
}
.notice_board .my_switch .el-switch__label span {
  font-size: 12px;
  -webkit-transform: scale(0.84);
}
.notice_board .my_switch .el-switch__label.el-switch__label--right span {
  right: 28px;
  top: 4px;
}
.notice_board .my_switch .el-switch__label.el-switch__label--left span {
  right: 13px;
  top: 4px;
}
.notice_board .swi_50 {
  position: relative;
}
.notice_board .swi_50 .el-switch__core {
  width: 46px !important;
  height: 22px !important;
}
.notice_board .swi_50 .el-switch__core .el-switch__button {
  width: 16px;
  height: 16px;
}
.notice_board .swi_50 .el-switch__core:after {
  top: 3px;
}
.el-popover {
  padding: 10px;
  border: 1px solid #e5e5e5;
  width: 278px;
  height: 65px;
  background-color: #000;
  border-radius: 5px;
  -webkit-box-shadow: none;
}

.popover p {
  font-size: 12px;
  width: 352px;
  -webkit-transform: scale(0.84);
  position: relative;
  left: -28px;
  line-height: 20px;
}
.el-popper[x-placement^="top"] .popper__arrow {
  border-top-color: #e5e5e5;
}
.el-popper[x-placement^="top"] .popper__arrow::after {
  border-top-color: #f5f5f5;
}
.chat-edit .el-textarea__inner {
  height: 60px;
  border: none;
}
.liveControl-wrap .input_440 .el-input__inner {
  width: 440px;
}

.data_input .el-date-editor.el-input,
.data_input .el-date-editor.el-input__inner {
  width: 200px;
}
.el-dialog__wrapper .el-tabs__active-bar {
  height: 3px;
  background-color: #2B6CFF;
  border-radius: 1.5px;
}
.demo-dynamic .el-form-item__error {
  color: #ff467f;
  padding-top: 0;
}
.demo-dynamic .el-form-item.is-error .el-input__inner,
.demo-dynamic .el-form-item.is-error .el-input__inner:focus,
.demo-dynamic .el-form-item.is-error .el-textarea__inner,
.demo-dynamic .el-form-item.is-error .el-textarea__inner:focus,
.demo-dynamic .el-message-box__input input.invalid,
.demo-dynamic .el-message-box__input input.invalid:focus {
  border-color: #d9d9d9;
}
.demo-dynamic .el-form-item {
  margin-bottom: 5px;
}
.text_info.el-textarea textarea {
  display: inline-block;
  height: 90px;
  width: 580px;
  border: 1px solid #d9d9d9 !important;
  border-radius: 2px;
  margin-bottom: 10px;
  margin-top: 13px;
  background-color: #fff !important;
  padding: 10px 14px;
  color: #333333 !important;
}

.down_app .img_ewm {
  width: 111px;
  height: 111px;
  padding: 9px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  margin-left: 60px;
}
.mini_apps {
  width: 100%;
  margin: 5px auto 0 auto;
  text-align: center;
}
.down_app .mini_apps span {
  margin-left: 0;
}
.mini_img {
  height: 141px;
  width: 141px;
}
.down_app span {
  font-size: 12px;
  margin: 0 auto;
}
.my_chart .chart_content {
  background-color: #fff;
  border-radius: 5px;
  width: 528px;
  margin-bottom: 20px;
  height: 330px;
  padding: 20px;
  box-sizing: content-box;
}
.my_chart .chart_content .title,
#statisticsMain1,
#statisticsMain2,
.chart_content3 {
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  font-size: 16px;
}
#statisticsMain1,
#statisticsMain2 {
  border-top: none;
  padding: 0 18px;
}
.my_chart .chart_content2 {
  width: 1120px;
  height: 540px;
  padding: 20px;
}
.chart_content3 {
  height: 440px;
  border-top: none;
}
.my_chart .title {
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  border-radius: 2px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #f5f5f5;
}

/* 播放器样式 */
.videoMessageBox.el-message-box .vjs-paused .vjs-big-play-button {
  display: block;
}
.vjs-big-play-button .vjs-icon-placeholder:before {
  content: "";
  display: none;
}
.video-js .vjs-big-play-button:focus,
.video-js:hover .vjs-big-play-button {
  background-color: rgba(115, 133, 159, 0);
}
#pane-videoList .item_box .item .item_img {
  position: relative;
}
#pane-videoList .item_img .play_icon {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
  z-index: 999;
}
/* 时间控件 */
.Statistics-content .el-date-editor.el-input,
.Statistics-content .el-date-editor.el-input__inner {
  width: 190px;
}
.Statistics-content .el-icon-time:before {
  content: "\E60B";
  color: #4a4a4a;
}
.Statistics-content .el-input--prefix .el-input__inner {
  padding-left: 10px;
  color: #333333;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
  border-radius: 2px;
}
.Statistics-content .el-input__prefix {
  left: 162px;
}
.Statistics-content .el-input__suffix {
  right: 17px;
}
.red_btn.el-button--default.is-disabled {
  background: #d9d9d9 !important;
  color: #fff !important;
}
.red_pack.my_dialog .el-dialog__body {
  padding-left: 10px;
  padding-bottom: 12px;
}
.red_pack.my_dialog .el-icon-time:before {
  content: "\E60B";
  color: #4a4a4a;
}
.red_pack .el-date-editor--datetime .el-input__prefix {
  left: 172px;
}
.red_pack .el-input--prefix .el-input__inner {
  padding-left: 10px;
}
.liveControl .el-switch.is-checked .el-switch__core::after {
  margin-left: -21px;
}
.liveControl .notice_rules .el-switch.is-checked .el-switch__core:after {
  margin-left: -19px;
}
.liveControl .el-switch__core:after {
  top: 4px;
  left: 4px;
}
.videoMessageBox.el-message-box .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-top: -35px;
  margin-left: -35px;
  background: url(../../common/image/play.png) no-repeat;
  background-size: contain;
  border: 0;
}
#tab-four {
  padding: 0 17px;
}

.playQrCode .el-form-item__content {
  width: 300px;
  float: left;
  margin-left: 20px;
  text-align: left;
}
.viewsettings.playQrCode .el-input,
.viewsettings .el-input__inner {
  width: 100%;
}
.viewsettings.playQrCode .el-form-item[data-v-6ff8e55a] {
  margin-bottom: 15px;
}
.viewsettings.playQrCode .el-form-item__label {
  width: 82px;
}
.viewsettings.playQrCode .no-label .el-form-item__content {
  margin-left: 102px;
  text-align: left;
}

/*phone start*/
.play-body {
  margin-top: 36px;
  margin-left: 40px;
  overflow: hidden;
}
.phone-view {
  float: left;
  width: 270px;
  height: 550px;
  background: url("../../common/image/phoneFrame.png") no-repeat;
  background-size: 100%;
}
.phone-inner {
  position: relative;
  width: 235px;
  height: 415px;
  margin: 65px auto;
}
/*add qrcode start*/
.qrcode-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.qrcode-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.qrcode-main {
  position: relative;
  margin: 100px auto;
  padding: 10px 0;
  background: #fff;
  border-radius: 4px;
  width: 150px;
  text-align: center;
  font-size: 10px;
}
.qrcode-main img {
  display: block;
  width: 80%;
  margin: 8px auto;
}
/*add qrcode end*/
.phone-header {
  margin: 0 auto;
  background: url("../../common/image/pageHeader.png") no-repeat;
  background-size: 100% auto;
  width: 235px;
  height: 47px;
}
.phone-title {
  position: relative;
  top: -22px;
  left: 0;
  width: 100%;
  display: block;
  color: #fff;
  text-align: center;
}
.phone-page {
  margin: -16px auto 0;
  width: 235px;
}
.phone-banner {
  background: url("../../common/image/h5Header.png") no-repeat;
  width: 100%;
  height: 123px;
  background-size: 100% auto;
}
.phone-menu {
  border-bottom: 1px solid #ccc;
}
.phone-menu ul {
  overflow: hidden;
}
.phone-menu li {
  float: left;
  width: 20%;
  text-align: center;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
}
.phone-menu li.is-active {
  background: #ecf6ff;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  color: #2B6CFF;
}
/*phone end*/
.phone-bottom {
  margin-top: 30px;
  padding-left: 140px;
  width: 100%;
  text-align: left;
}
</style>

