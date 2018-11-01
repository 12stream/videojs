<template>
  <div class="liveControl">
    <m-header></m-header>
    <div class="liveControl-main liveControl-wrap">
      <el-row class="w1000 mt20">
        <el-col :span="24">
          <div class="liveControl-top liveControl-tab mainNav">
            <el-tabs border class="tabs-header" v-model="activeNameTab" @tab-click="handleClick" type="border-card">
              <el-tab-pane name="liveControl">
                <span slot="label">视频控制</span>
                <div class="liveControl-content my_section">
                  <el-row class="fl-betw">
                    <el-col class="liveControl-left">
                      <div class="live-wrap">
                        <div id="box_top" v-show="NoticeING==true">
                          <div class="my_marquee" style="width:100%">
                            <div>
                              <span>{{noticeList.data}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="liveControl-img te-c" style="position: relative;width: 530px;height: 300px;">
                          <img v-if="chat.thisData&&playStatus==0" :src="chat.thisData.vodCoverUrl" alt=""
                               onerror="javascript:this.src='http://mwdatatest.facebac.com/1/0/0/7e54cc6ad6b334c61f2c/45698775-780e-4f31-8f90-b15a9593de69.png'"
                               style="width: 530px;height: 300px;">
                          <img v-if="playStatus==0" @click="playVideoUrl" class="play-icon"
                               src="../../common/image/icon_play@2x.png" alt="">
                          <div class="video" v-html="videoHtml">
                            <!--<video style="width:530px;height:298px;" id="preVideo"
                                   class="video-js vjs-default-skin" controls ebkit-playsinline="true" autobuffer
                                   preload="auto" poster="" x-webkit-airplay="true" webkit-playsinline="true"
                                   playsinline></video>-->
                          </div>
                        </div>
                      </div>
                      <div class="liveControl-bom live-bom vControl-bom">
                        <div class="liveControl-class te-c" style="color:#333333;font-size:12px;">观看方式 :</div>
                        <el-tabs v-model="activeName" @tab-click="handleClick2">
                          <el-tab-pane class="pd20" label="扫码观看" name="second">
                            <input readonly type="text" v-model="qrcode" id="cpLink" class="el-input__inner">
                            <el-button class="btn blue_btn" @click="copyLink('cpLink')">复制</el-button>
                            <div class="te-c" id="qrcode"></div>
                            <div class="te-c fs_12" style="color: #666;">手机扫描观看</div>
                          </el-tab-pane>
                        </el-tabs>
                      </div>
                    </el-col>
                    <el-col class="liveControl-re">
                      <div class="liveControl-bom liveControl-cen live_right">
                        <el-tabs class="liveControl-title" v-model="liveInfo" @tab-click="handleClick3">
                          <el-tab-pane label="公告栏" class="notice_board" name="notice_board">
                            <div>
                              <div class="notice_content" v-if="noticeList.isData">
                                <div class="item" v-for="item in noticeList.data">
                                  <div class="time">{{item.createTime | filterTime}}</div>
                                  <div class="item_conten">{{item.content}}</div>
                                </div>
                              </div>
                              <div class="p-r" v-if="!noticeList.isData">
                                <div class="no_noticeList">
                                </div>

                              </div>
                            </div>
                            <div class="notice_rules">
                              <div class="rules_title">
                                <template>
                                  <el-radio class="my_radio" v-model="radioRoll" label="0">滚动次数</el-radio>
                                  <el-input v-model="rollNumber" type="number" class="input_50"
                                            style="margin-right:37px;"></el-input>
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
                                  </el-time-select>
                                  ~
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
                                    <p><span class="txt_fff">滚动次数：</span><span>输入滚动次数，则公告就会在屏幕中滚动相应次数。</span></p>
                                    <p><span class="txt_fff">滚动时间：</span><span>可以设置指定一段时间内公告一直滚动，次数不限。</span></p>
                                    <p><span class="txt_fff">公告栏开关：</span><span>可以随时关闭或开启公告栏。</span></p>
                                  </div>
                                </el-popover>
                                <span class="icon_query" style="font-size:12px" v-popover:popover1></span>
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
                              <div class="text_tip">{{textareaNotice.length}}<span>/30</span></div>
                              <el-button class="fr btn_30" type="primary" @click="add_noticeList()"
                                         :disabled="disabledAdd_noticeList">发送
                              </el-button>
                            </div>


                          </el-tab-pane>
                          <el-tab-pane active-name="chat" label="聊天互动" name="chat" style="padding:0">
                            <div class="chat bg-fff">
                              <div class="chat-top">
                                观看显示：
                                <el-switch class="my_switch swi_54"
                                           v-model="chat.show_msg"
                                           @change="ClearScreen"
                                           active-text="正常"
                                           inactive-text="清屏"
                                           active-color="#2B6CFF"
                                           inactive-color="#CCCCCC"
                                           on-text="正常"
                                           off-text="清屏">
                                </el-switch>
                                <el-button class="btn btn_24" @click="getBannedList">禁言名单</el-button>
                              </div>
                              <div class="chat-main">
                                <ul id="scrollBody" @scroll="handleScroll">
                                  <li v-for="(item,index) in chat.MsgData" class="pd10 clear">
                                    <div class="layout">
                                      <aside class="layout__aside--left fl">
                                        <img class="chat-img" :src="item.sender_head || item.imgUrl">
                                      </aside>
                                      <div class="layout__main fl">
                                        <div class="userName_date"><span class="chat-name">{{item.nickName}}</span>
                                          <span style="color:#CCCCCC"> {{item.send_time | filterTime}} </span></div>
                                        <p style="word-wrap:break-word;font-size:12px;color: #333;"
                                           :class="item.data.giftName ? 'col-red':''"><span v-show="item.data.giftName">赠送了</span>{{item.data.msgbody
                                          || item.data.giftName}}</p>
                                      </div>
                                      <aside v-show="!item.data.giftName" class="layout__aside--right fr"><span
                                        v-if="item.user_id != 0" class="cur-p blue_bor_btn" @click="prohibitMsg(item)">{{item.silence ? '解禁': '禁言'}}</span>
                                        <span class="el-icon-delete2   red_bor_btn"
                                              @click="deleteMsg(item,index)">删除</span></aside>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div class="chat-edit pl10 wallet-wrap">
                                <el-input type="textarea" v-model="chat.MsgTxt" @keyup.enter.native="sendMsg"
                                          :disabled="disabledText" value="http://www.mwzbw/facebac.com"
                                          :placeholder="placeholderTxt"></el-input>
                                <el-button type="primary" class="fr btn_30 " :disabled="disabledText" @click="sendMsg">
                                  发送
                                </el-button>
                              </div>
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="视频简介" name="introduce">
                            <div class="introduce bg-fff">
                              <div class="introduce-conter">
                                <img :src="chat.thisData.vodCoverUrl||chat.thisData.live_cover_url || defaultImgUrl">
                                <h3>{{chat.thisData.live_name}}</h3>
                                <div class="start-time">
                                  <p>创建时间: {{chat.thisData.createTime | filterTime}}</p>
                                  <p>观看权限: {{chat.thisData.vodPermit}}</p>
                                </div>
                                <div class="live-brief"><span style="color: #000;">视频简介</span></div>
                                <div v-for="list in chat.thisData.vodTextImgs">
                                  <div style="word-wrap: break-word;color: #333;">{{list.img_text}}</div>
                                  <div><img :src="list.img_url" alt=""></div>
                                </div>
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
                      <left-nav></left-nav>
                    </div>
                  </el-col>

                  <el-col :span="19" style="width:970px;overflow: hidden;" class="my_list">
                    <router-view @refresh="_createData" @changeLogin="changeLogoInfo" :changeLogoMsg="changeLogoMsg"
                                 :child-data="chat.vodSwitch"></router-view>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane name="management3">
                <span slot="label">数据统计</span>
                <div class="lives-Statistics">
                  <!-- 录像统计 -->
                  <div class="Statistics-content content_section">
                    <div class="title">点播统计</div>
                    <el-row class="te-c statisticsTitle">
                      <el-col :span="6">
                        <div>经济收益 (梦豆)</div>
                        <div class="col_4FF">{{recordedStatistics.economic}}</div>
                      </el-col>
                      <el-col :span="6">
                        <div>观看人数 (人)</div>
                        <div class="col_4FF">{{recordedStatistics.lookUserCount}}</div>
                      </el-col>
                      <el-col :span="6">
                        <div>观看人次 (次)</div>
                        <div class="col_4FF">{{recordedStatistics.lookCount}}</div>
                      </el-col>
                      <el-col :span="6">
                        <div>累计观看时长 (分钟)</div>
                        <div class="col_4FF">{{recordedStatistics.lookTime}}</div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="Statistics-content content_section">
                    <div class="title">观看方式</div>
                    <el-row class="te-c statisticsTitle">
                      <el-col :span="8">
                        <div>PC端数量</div>
                        <div class="col_4FF">{{lookWays.pcClientCount}}</div>
                      </el-col>
                      <el-col :span="8">
                        <div>移动端数量</div>
                        <div class="col_4FF">{{lookWays.mobileClientCount}}</div>
                      </el-col>
                      <el-col :span="8">
                        <div>H5端数量</div>
                        <div class="col_4FF">{{lookWays.h5ClientCount}}</div>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 数据统计 -->
                  <div class="my_chart">
                    <div class="clear">
                      <div class="fl chart_content">
                        <div class="title">在线人数分布</div>
                        <div id="statisticsMain1" style="width:490px;height:250px;"></div>
                      </div>
                      <div class="fr chart_content">
                        <div class="title">观看时长分析</div>
                        <div id="statisticsMain2" style="width:490px;height:250px;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="main-title">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item @click.native="goManagement1"><router-link to="/videoCenter">{{roomType}}</router-link></el-breadcrumb-item>
                <el-breadcrumb-item><div class="breadcrumb-item-title">{{chat.thisData.vodName || '我的精彩点播'}}</div></el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 红包设置 -->
      <el-dialog class="my_dialog red_pack"
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
            <div class="data_input fl">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="datetime"
                  placeholder="选择开始时间">
                </el-date-picker>
              </el-form-item>
            </div>
            <span class="line fl">~</span>
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
      </el-dialog>
      <!-- 红包设置 End -->
      <!-- 邀请设置 -->
      <el-dialog class="red_setting dialogVisibleInvitation my_dialog"
                 :visible.sync="dialogVisibleInvitation"
                 width="640px;"
                 size="tiny"
                 @close='closeMsg'
                 :show-close="false"
      >
        <div class="p-r">
          <button type="button" @click="dialogVisibleInvitation = false" aria-label="Close"
                  class="el-dialog__headerbtn p-a" style="top:10px;right:10px;z-index:1000;"><i
            class="el-dialog__close el-icon el-icon-close"></i></button>
          <el-tabs v-model="sendMain" @tab-click="handleClickMsg">
            <el-tab-pane class="pd20" label="收件人" name="recipient">
              <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic"
                       id="phoneBox">
                <div class="p-a bgfff te-r"
                     style="left:0;top:0px;width:100%;height:45px;padding-top:20px;margin-bottom:0px !important;background：#fff;z-index:999;">
                                    <span class="txt_blue cur-p" style="margin-right:20px">
                                        <a href="http://mwdatatest.facebac.com/ticket/contacts.xls">下载模板</a>
                                    </span>
                  <span class="msgInfo-button  col-fff cur-p mr10" @click="addDomain">添加收件人</span>
                  <span class="msgInfo-button bor_blue col-fff cur-p p-r mr10">
                                        导入收件人
                                        <span class="p-a" style="top:0;left:0;">
                                            <input style="width:68px;height:30px;opacity:0;" class="cur-p" id="upload"
                                                   type="file" value="导入" @change="importfPhone(this)"
                                                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                        </span>
                                    </span>

                  <span class="msgInfo-button bor_blue col-fff cur-p" style="margin-right:4px;"
                        @click="dynamicValidateForm.domains=[]">清空收件人</span>
                </div>
                <el-form-item style="display:inline-block;"
                              v-for="(domain, index) in dynamicValidateForm.domains"
                              :key="domain.key"
                              :prop="'domains.' + index + '.value'"
                              :rules="[
                                            {required: true, message: '手机不能为空', trigger: 'blur'},
                                            { pattern: /^[1][345789]\d{9}$/, message: '请输入正确的手机号',trigger: 'blur' }
                                        ]"
                >
                  <el-input style="display:inline-block;margin-right:8px;" v-model="domain.value"></el-input>
                  <el-button class="icon_del" @click.prevent="removeDomain(domain)"></el-button>
                </el-form-item>
                <div class="p-a bgfff te-c"
                     style="left:0;bottom:0px;width:100%;height:166px;margin-bottom:0px !important;">
                  <el-form-item>
                    <div class="te-l fl">
                      <el-input type="textarea" :disabled="true" class="text_info"
                                v-model="dynamicValidateForm.msg"></el-input>
                    </div>
                    <div class="fr">
                      <span id="checkMsg" class="msgInfo-button col-fff cur-p"
                            @click="submitFormInvitation('dynamicValidateForm')">发送</span>
                    </div>
                  </el-form-item>
                </div>
              </el-form>
            </el-tab-pane>

            <el-tab-pane class="send_list" label="发送记录" name="sendList">
              <div class="msg-state">
                <div v-if="dynamicValidateForm.msgStateInfo.totalCount > 0" class="mt10 mb10 clear">
                  <!-- <el-col :offset="1" :span="11"> -->
                  <div class="d-ib fl clear" v-for="item in dynamicValidateForm.msgStateInfo.data">
                    <span class="fr msg_sta" :class="'msg-status' + item.status">{{item.status | msgStateInfo}}</span>
                    <span>{{item.phone}}</span>
                  </div>
                  <!-- </el-col> -->
                </div>
                <div v-else class="te-c" style="margin-left:-88px">
                  暂无发送记录
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
      <!-- 发送确认-->
      <el-dialog
        :visible.sync="dialogVisibleIsInvitation"
        :show-close="false"
        size="tiny" class="te-c">
        <span style="line-height:30px;font-size:16px;">共发送{{dynamicValidateForm.InvitationNum}}条信息</span><br/>
        <span class="col-red" style="line-height:30px;font-size:16px;">￥{{dynamicValidateForm.InvitationMony}}元</span>
        <span slot="footer" class="dialog-footer" style="margin:0 auto;display:block;">
                <el-button type="primary" @click="submitFormIsInvitation">发送</el-button>
                <el-button @click="dialogVisibleIsInvitation = false">取消</el-button>
            </span>
      </el-dialog>
      <!-- 发送确认-->
      <!-- 禁言列表 -->
      <el-dialog
        :visible.sync="dialogBanned"
        :show-close="false"
        width="638px"
        title="禁言名单"
        @close="closeBanned"
        size="tiny" class="my_dialog">
        <ul v-if="isBannedData" class="bannedList">
          <li class="item_box" v-for="item in bannedList">
            <div class="item">
              <div class="item_img fl">
                <img :src="item.pic" alt="">
              </div>
              <div class="item_info" style="margin-left:70px;">
                <p class="length_txt">{{item.nickname}}</p>
                <p class="col_9B" style="font-size:12px;">{{item.time | filterTime}}</p>
              </div>
              <el-button class="btn  btn_26" @click="noProhibit(item)">取消禁言</el-button>
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
      </el-dialog>
      <!-- 邀请设置 End -->
      <!-- 上传视频html结构-->
      <input type='button' id='upload' value='上传' style="display:none">
      <input type='button' id='stopload' value='暂停' style="display:none">
      <input type='button' id='pickfiles' value='确定' style="display:none">
      <div class="fileDiv" id="container" style="display:none;">
        <input type="hidden" id="token" value=""/>
        <input type="hidden" id="folder_id" value="0"/>
        <input type="hidden" id="istranscode" value="0"/>
        <input type="hidden" id="file_type" value="video"/>
        <input type="button" id="pick_file" class="pick_file" value="选择文件" @click="pickfile()"/>
        <input type="button" id="up_load" value="上传" @click="upload()"/>
      </div>
      <!-- 上传提示 -->
      <input id="otherTip" value="" data-id="" @click="otherTip(this)">
      <!-- 上传视频html结构end-->
      <!-- 编辑视频 -->
      <el-dialog
        title="编辑视频"
        :visible.sync="dialogEdit"
        width="638px"
        :show-close="false"
        class="my_dialog"
      >
        <el-form :model="ruleFormEdit" ref="ruleFormEdit" label-position="right" label-width="88px" class="mt5">
          <el-form-item label="选择视频 :" prop="video" class="is-required">
            <!-- <el-button   class="bgc_txt  btn_34 no_progress2" style="margin-left:0;"  type="info" @click="pickfile()">导入视频</el-button>  -->
            <!-- <span class="no_progress2" style="color:#CCCCCC;margin-left:20px;">单个文件大小不超过4G、支持绝大多数视频格式</span> -->
            <el-input v-model="ruleFormEdit.videoUrl" id="videoSrc2" style="display:none"></el-input>
            <div id="progressDiv2">
              <div class="progress_div">
                <div class="progress_view">
                  <div class="control">
                    <div class="progress_bar" id="percent"></div>
                  </div>
                </div>
              </div>
              <span class="videoupload_tip">
                                上传速度<span id="formatSpeed"></span>已上传<span id="percentTip"></span>
                            </span>
            </div>
            <span class="file_tip" style="cursor: pointer;" @click="pickfile()">重新上传</span>
            <div class="pre_video" v-show="ruleFormEdit.videoCover" id="pre_video">
              <img src="../../common/image/icon_play.png" class="play_icon" alt="">
              <img class="fl" :src="ruleFormEdit.videoCover">
            </div>
            <div class="el-form-item__error" style="display:none;" id="add_form_err">
              请上传视频
            </div>
          </el-form-item>


          <el-form-item label="视频封面 :" prop="videoCover"
                        :rules="[
                                {required: true, message: '视频封面不能为空', trigger: 'blur'},
                            ]">
            <el-upload
              v-show="!ruleFormEdit.videoCover"
              style="display: inline-block;"
              class="cur-p"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-change="imgUpload"
              :auto-upload="false"
              accept=".jpg, .png, .jpeg"
              :before-upload="beforeAvatarUpload"
            >
              <el-button class="bgc_txt  btn_34" style="margin-left:0;" type="info" @click="dialogUpdataVideo = true">
                选择图片
              </el-button>
            </el-upload>
            <span v-show="!ruleFormEdit.videoCover" style="color:#CCCCCC;margin-left:20px;">尺寸1280x720，图片小于2M ( JPG、PNG、GIF )</span>
            <img v-show="ruleFormEdit.videoCover" class="Video_cover" :src="ruleFormEdit.videoCover" alt="">
            <el-upload v-show="ruleFormEdit.videoCover"
                       style="display: inline-block;"
                       class="cur-p"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       :show-file-list="false"
                       :on-change="imgUpload"
                       :auto-upload="false"
                       accept=".jpg, .png, .jpeg"
                       :before-upload="beforeAvatarUpload"
            >
              <span style="color:#2B6CFF;;position: relative;top:-2px;left:18px;">重新上传</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频标题 :" prop="title" :rules="[
                        {required: true, message: '视频标题不能为空', trigger: 'blur'},
                    ]">
            <el-input v-model="ruleFormEdit.title"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitEdit()" :disabled="disablEdedit">确 定</el-button>
                    <el-button @click="dialogEdit = false">取 消</el-button>
                </span>
      </el-dialog>
      <!-- 编辑视频end -->
      <!-- 上传提示 -->
      <input id="otherTip" value="" data-id="" @click="otherTip(this)">

    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import MHeader from "components/header/header";
  import LeftNav from "components/leftnav/leftnav3";
  import mFooter from "components/header/footer";
  import axios from "axios";
  import echarts from "echarts";
  import {
    ERR_OK,
    ERR_SERVEROK,
    GIFT_URL,
    LIVE_URL,
    PLAY_URL,
    vPLAY_URL,
    getLStorage,
    copyLink,
    DEFAULT_IMG,
    DEFAULT_IMGICON,
    setLStorage,
    delLStorage,
    DEFAULT_ADMINIMGICON,
    MSGURL
  } from "api/config";
  import {filterStatus, setDateTime, getNewTime, axiosData} from "api/http";
  import {DATA_URL, VideoH5_URL} from "../../api/config"
  import {getCookies} from '../../api/config';
  export default {
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
        playStatus: 0,
        videoHtml:'',
        // loading:true,
        userID: getLStorage("userId"),
        vid: '',
        isBegin: true,
        linkTxt: "连接",
        equipUrl: "",
        roomType: "点播管理",
        pathtype: "0",
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
            {required: true, message: "请输入活动名称", trigger: "blur"},
            {min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur"}
          ],
          wallet: [
            {required: true, validator: validateHerf, trigger: "blur"}
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
        defaultImgUrl: DEFAULT_IMG,
        dialogVisible: false,
        dialogVisibleInvitation: false,
        dialogVisibleIsInvitation: false,
        dialogBanned: false,
        dynamicValidateForm: {
          domains: [],
          msg: "",
          msgStateInfo: {totalCount: "", data: ""},
          InvitationMony: 0,
          InvitationNum: 0
        },
        url: "http://mwlb.facebac.com:9161/",
        value: "",
        socket: "",
        dataList: "",
        liveInfo: "notice_board",
        activeName: "second",
        activeNameTab: "liveControl",
        sendMain: "recipient",
        optionVal: {},
        chat: {
          logoInfo: {},
          isVideo: true,
          liveSetInterval: "",
          vodSwitch: true,
          chatTabName: "chat",
          playLiveUrl: "",
          vodCoverUrl: "",
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
          thisData: {vodSwitch: true, vodIcon: "", share_url: ""},
          liveID: "",
          show_msg: "",
          user: [],
          opts: {},
          out_roomID: "",
          out_room_ServerAddress: "",
          end_show_type: "",
          imgUrl: getLStorage("iconImg"),
          defaultImgUrl: DEFAULT_IMGICON,
          user_id: getLStorage("user_id"),
          Msg: "",
          MsgData: [],
          MsgTxt: "",
          portrait: "",
          defaultPortrait: require("common/image/default.jpg")
        },
        giftList: {
          isData: false,
          data: "",
          bin_icon: require("common/image/bin_icon.png"),
          top1: require("common/image/top_1.png"),
          top2: require("common/image/top_2.png"),
          top3: require("common/image/top_3.png")
        },
        videoList: {
          isData: false,
          data: ""
        },
        noticeList: {
          isData: false,
          data: ""
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
        textareaNotice: "",
        // 公告栏滚动
        animate: false,
        rollCount: 0,
        rollMax: 0,
        allNoticeId: [],
        openNotice: true,
        disabledAdd_noticeList: false,
        timerRoll: "",
        // 禁言列表
        bannedList: [],
        isBannedData: false,
        // 生效公告
        NoticeING: false,
        liveCount: {},
        // 点播统计
        liveStatistics: {},
        // 录播统计
        recordedStatistics: {
          economic:'',
          lookUserCount: '',
          lookCount: '',
          lookTime: '',
        },
        //观看方式
        lookWays: {
          pcClientCount: '',
          mobileClientCount: '',
          h5ClientCount: '',
        },
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
        marqueeList: [{name: ""}, {name: ""}],
        mini_apps: "",
        dialogEdit: false,
        ruleFormEdit: {
          id: "",
          videoUrl: "",
          videoCover: "",
          title: "",
          intro: ""
        },
        disablEdedit: false,
        index_video:'1'
      };
    },
    watch: {
      pathtype(value) {
        switch (value) {
          case "3":
            this.roomType = "点播管理";
            break;
          default:
            this.roomType = "点播管理";
        }
      }
    },
    mounted() {
      // initUpload()
      $("#videoCenter").addClass("router-link-active");
    },
    created() {

      this.vid = getLStorage("defRoomId");
      this.chat.portrait = DEFAULT_ADMINIMGICON;
      this._isData();
      this._getStatisticsData();
      this.getUserInfo();
      this.timer = setInterval(() => {
        this._getStatisticsData();
      }, 10000);
      //查询发送短信状态
      this.searchMsgState();
      this.getVideoList();
      this.pathtype = this.$route.query.type;
      this.getEquipNo();
    },
    methods: {
      //回到点播控制
      goManagement1(){
        this.activeNameTab = "liveControl";
      },
      playVideoUrl() {
        this.index_video ++;
        let player;
        let url;
        if(this.chat.thisData.playM3u8Url_720p){
          url = this.chat.thisData.playM3u8Url_720p;
        }else if(this.chat.thisData.playM3u8Url_480p){
          url = this.chat.thisData.playM3u8Url_480p;
        }else {
          url = this.chat.thisData.playM3u8Url;
        }
        console.log(url,'播放地址');
        this.playStatus = 1;
        let videoId = 'preVideo_'+Math.floor(Math.random()*10000);
        this.videoHtml = '<video data-id='+this.index_video+' style="min-width:530px;min-height:298px;" id="'+videoId+'" class="video-js vjs-default-skin" controls ebkit-playsinline="true" autobuffer preload="auto" poster="" x-webkit-airplay="true" webkit-playsinline="true" playsinline></video>';
//        $('#videoHtml').html(html);
        setTimeout(function () {
            //初始化视频
            player = videojs(
              videoId,
              {
                controls: true,
                autoplay: true,
                controlBar: {
                  captionsButton: false,
                  chaptersButton: false,
                  liveDisplay: false,
                  playbackRateMenuButton: false,
                  subtitlesButton: false
                }
              },
              function () {
              }
            );
            videojs(videoId).ready(function () {
              var myPlayer = this;
              player.src({
                src: url,
                type: "application/x-mpegURL"
              });
            });
        }, 1000);
      },
      // 播放器播放
      playVideo(url) {
        let player;
        this.dialogPlay = true;
        this.$alert(
          '<video style=" min-width:720px;min-height:406px;"  id="preVideo"  class="video-js vjs-default-skin vjs-big-play-centered" controls ebkit-playsinline="true" autobuffer preload="auto" poster="" x-webkit-airplay="true" webkit-playsinline="true" playsinline></video>',
          "录像预览",
          {
            dangerouslyUseHTMLString: true,
            showConfirmButton: false,
            customClass: "videoMessageBox",
            callback: () => {
              player.dispose();
            }
          }
        );
        setTimeout(function () {
          //初始化视频
          player = videojs(
            "preVideo",
            {
              controls: true,
              autoplay: true,
              controlBar: {
                captionsButton: false,
                chaptersButton: false,
                liveDisplay: false,
                playbackRateMenuButton: false,
                subtitlesButton: false
              }
            },
            function () {
            }
          );
          videojs("preVideo").ready(function () {
            var myPlayer = this;
            player.src({
              src: url,
              type: "application/x-mpegURL"
            });
          });
        }, 500);
      },
      //开始点播
      startLive() {
        let formdata = new FormData();
        formdata.append("user_id", this.userID);
        formdata.append("id", getLStorage("liveID"));
        formdata.append("type", "2");
        formdata.append("deviceCode", this.equipUrl);
        console.log(formdata);
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/start.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            console.log("开始点播" + JSON.stringify(res));
            if (res.status == 200) {
              this.overLive = true;
              this._createData();
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      endEquipLive() {
        let formdata = new FormData();
        formdata.append("user_id", this.userID);
        formdata.append("id", getLStorage("liveID"));
        formdata.append("type", "2");
        formdata.append("deviceCode", this.equipUrl);
        console.log(formdata);
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/end.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            console.log("结束连接" + JSON.stringify(res));
            if (res.status == 200) {
              this.overLive = false;
              this._createData();
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      linkLive() {
        let formdata = new FormData();
        formdata.append("id", getLStorage("liveID"));
        formdata.append("deviceCode", this.equipUrl.trim());
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/connectLiveDevice.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            console.log("ok" + JSON.stringify(res));
            if (res.status == "200") {
              if (res.data.code == "200") {
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "连接成功"
                });
                this.isBegin = false;
                this.linkTxt = "断开连接";
              }
              else {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: res.data.msg
                });
              }

            }
            else {
              this.$message({
                showClose: true,
                type: "error",
                message: "操作失败"
              });
              console.log(data);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      getEquipNo() {
        // this.equipUrl
        let formdata = new FormData();
        formdata.append("id", getLStorage("liveID"));
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/getLiveDevice.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            // console.log("equip" + JSON.stringify(res));
            if (res.status == "200") {
              this.equipUrl = res.data.data;
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      getPublicNotic() {
        var url = LIVE_URL + "dispatcher.action";
        var msg = {
          cmd: "get_room_sys_broadcasts",
          roomID: this.chat.out_roomID
        };
        axios({
          method: "post",
          url: url,
          dataType: "json",
          data: msg,
          contentType: "application/json"
          //headers: { "Content-Type": "application/json" }
        }).then(res => {
          // console.log("history" + JSON.stringify(res));
          if (res.status == 200) {
            // console.log(res);
            //this.noticeList.data
          }
        });
      },
      // 滚动
      showMarquee: function () {
        this.animate = true;
        setTimeout(() => {
          this.marqueeList.push(this.marqueeList[0]);
          this.marqueeList.shift();
          this.animate = false;
        }, 500);
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function (currentPage) {
        this.page_index = currentPage;
        this.getVideoList(this.page_index);
      },
      importfPhone(obj) {
        //导入表格
        let _this = this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function (e) {
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
            console.log("outdata--", outdata);
            // 插入表格
            outdata = outdata.reverse();
            for (var i = 0; i < outdata.length; i++) {
              if (outdata[i].手机号) {
                console.log(i, " : ", outdata[i].手机号);
                _this.dynamicValidateForm.domains.unshift({
                  value: outdata[i].手机号
                  // key: Date.now(),
                });
              }
            }
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
        // 清空上传
        var input = document.getElementById("upload");
        input.value = "";
        setTimeout(() => {
          this.submitFormInvitation("dynamicValidateForm", "checkMsg");
        }, 400);
      },
      searchMsgState(page) {
        //短信邀请状态
        let formdata = new FormData();
        formdata.append("page", page || 1);
        formdata.append("rows", 1000);
        formdata.append("liveId", getLStorage("liveID"));
        formdata.append("userId", getLStorage("user_id"));
        // 邀请
        axios({
          method: "post",
          url: DATA_URL + "mwlive/user/user_sms_list.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(response => {
            if (response.data.code == ERR_OK) {
              // console.log('查询成功',this.dynamicValidateForm.msgStateInfo);
              this.dynamicValidateForm.msgStateInfo = response.data.data;
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "查询失败"
              });
              console.log("查询失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      submitFormInvitation(formName, checkMsg) {
        //短信单价
        let that = this;
        var price = "";
        //短信邀请
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (!this.dynamicValidateForm.domains.length) {
              this.$message({
                showClose: true,
                type: "error",
                message: "请添加邀请人"
              });
              return false;
            }
            if (checkMsg != "checkMsg") {
              axios
                .get(DATA_URL + "mwlive/sys/config_cx.do?type=2 ")
                .then(response => {
                  price = response.data.data.value;
                  this.dialogVisibleIsInvitation = true;
                  this.dynamicValidateForm.InvitationMony = 0;
                  this.dynamicValidateForm.InvitationMony = parseFloat(
                    this.dynamicValidateForm.domains.length * price
                  ).toFixed(2);
                  this.dynamicValidateForm.InvitationNum = this.dynamicValidateForm.domains.length;
                })
                .catch(function (err) {
                  console.log(err);
                });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      submitFormIsInvitation() {
        //发送短信
        // for(var i = 0;i < this.chat.Msg.data.allsms.length;i++){
        var dataNum = "",
          len = this.dynamicValidateForm.domains.length;
        for (var i = 0; i < len; i++) {
          if (i === 0) {
            dataNum = this.dynamicValidateForm.domains[i].value;
          } else {
            dataNum = dataNum + "," + this.dynamicValidateForm.domains[i].value;
          }
        }
        dataNum = dataNum.toString();
        let formdata = new FormData();
        formdata.append("user_id", getLStorage("user_id"));
        formdata.append("receiver", dataNum);
        formdata.append("live_id", getLStorage("liveID"));
        formdata.append("msg", this.dynamicValidateForm.msg);
        // 邀请
        axios({
          method: "post",
          url: DATA_URL + "mwlive/user/user_sms.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(response => {
            if (response.data.code == ERR_OK) {
              this.dynamicValidateForm.domains = []; //清空列表
              // 关闭模态框
              this.dialogVisibleIsInvitation = false;
              this.dialogVisibleInvitation = false;
              this.$message({
                showClose: true,
                type: "success",
                message: "发送成功!"
              });
              this.searchMsgState();
            } else if (
              response.data.code == "404" &&
              response.data.msg == "not enough balance"
            ) {
              this.$message({
                showClose: true,
                type: "error",
                message: "余额不足，发送失败!"
              });
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "发送失败!"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1);
        }

        setTimeout(() => {
          this.submitFormInvitation("dynamicValidateForm", "checkMsg");
        }, 400);
      },
      addDomain() {
        this.dynamicValidateForm.domains.unshift({
          value: "",
          key: Date.now()
        });
      },
      refreshChat() {
        // alert(11111);
      },
      getUserInfo() {
        let formdata = new FormData();
        formdata.append("id", getLStorage("user_id"));
        let that = this;
        axiosData(formdata, DATA_URL + "mwlive/user/get_userinfo.do").then(
          res => {
            if (res.data.code == ERR_OK) {
              this.chat.imgUrl = res.data.data.user_icon_url;
              setLStorage("iconImg", this.chat.imgUrl);
            } else {
              that.tipsMessage("网络异常！", "error");
            }
          }
        );
      },
      addRow() {
        this.qrcode = VideoH5_URL + "?videoid=" + getLStorage("defRoomId");
        this.dataListUrl.url = VideoH5_URL;
        var APPimg =
          '{"type":"type","data":{"pushAddr":"' +
          this.dataListUrl.url +
          '","liveName":"' +
          this.chat.thisData.vodName +
          '"}}';
        var canvas1 = qrcanvas({
          data: this.qrcode,
          size: 120
        });
        document.getElementById("qrcode").innerHTML = "";
        document.getElementById("qrcode").appendChild(canvas1);
      },
      copyLink(data) {
        copyLink(data);
        this.$message({
          showClose: true,
          message: '复制成功！',
          type: 'success'
        });
      },
      handleScroll() {
        this.scroll = document.getElementById("scrollBody");
        if (this.scroll.scrollTop === 0) {
          this.socket.emit("msg", {
            cmd: 2020,
            msg: "历史聊天",
            data: {
              last_msg_id: this.chat.MsgData[0].msg_id,
              len: 20
            }
          });
        }
      },
      changeLogoInfo(changeLogoMsg) {
        this.chat.logoInfo.logo_xy = changeLogoMsg;
        // this._getLogonInfo()
      },
      _getLogonInfo() {
        axios
          .get(
            DATA_URL +
            "mwlive/setup/get_logoinfo.do?user_id=" +
            getLStorage("user_id") +
            "&live_id=" +
            getLStorage("liveID")
          )
          .then(response => {
            if (response.data.data === null) {
              this.chat.logoInfo.isshowlogo = false;
              return false;
            }
            if (response.data.code == ERR_OK) {
              if (response.data.data.isshowlogo == 1) {
                response.data.data.isshowlogo = true;
                this.chat.logoInfo = response.data.data;
                this.chat.logoInfo.logo_xy = this.chat.logoInfo.logo_xy.toString();
                this.oldImg = response.data.data.logo_url;
                this.chat.logoInfo.logo_url = response.data.data.logo_url;
              } else {
                (this.chat.logoInfo.isshowlogo = false),
                  (this.chat.logoInfo.logo_url = ""),
                  (this.chat.logoInfo.logo_xy = "4");
                response.data.data.isshowlogo = false;
              }
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      _leaveLive() {
        this.socket.emit("leave", {
          roomID: 1,
          nickName: "管理员",
          cmd: 1002,
          user_id: this.chat.user_id,
          imgUrl: this.chat.imgUrl || this.chat.portrait,
          gender: 0
        });
        this.socket.close();
      },
      _scrollTop() {
        // 跳转底部
        this.chat._scrollBody = document.getElementById("scrollBody");
        this.$nextTick(() => {
          this.chat._scrollBody = document.getElementById("scrollBody");
        });
      },
      get_miniApps() {
        let live_id = getLStorage("liveID");
        axios
          .get(DATA_URL + "mwlive/live/select_code.do?live_id=" + live_id)
          .then(response => {
            if (response.data.code == ERR_OK) {
              this.mini_apps = response.data.data;
            }
          })
          .catch(function (err) {
            console.log("err", err);
          });
      },
      _isData() {
        this._getLogonInfo();
        if (this.$route.query.tabType == 2) {
          this.activeNameTab = "management2";
        } else if (this.$route.query.tabType == 3) {
          this.activeNameTab = "management3";
        }
        this._createData();
      },
      _createData() {
        axios
          .get(DATA_URL + "mwlive/vod/getVodInfo.do?id=" + this.vid)
          .then(response => {
            if (response.data.code == ERR_OK) {
              this.chat.thisData.vodIcon = response.data.data.vodIcon;
              if(response.data.playM3u8Url_720p){
                this.qrcode = response.data.playM3u8Url_720p;
              }else if(response.data.playM3u8Url_480p){
                this.qrcode = response.data.playM3u8Url_480p;
              }else {
                this.qrcode = response.data.playM3u8Url;
              }
              let data = response.data.data;
              // 点播时间
              /*if (data.live_status == 0) {
              data.notifyBeginTime = data.createTime;
            } else {
              if (data.notifyBeginTime != null) {
                data.notifyBeginTime = data.notifyBeginTime;
              } else if (data.begin_time != null || data.begin_time != "") {
                data.notifyBeginTime = data.begin_time;
              } else {
                data.notifyBeginTime = "暂无点播";
              }
            }*/

              this.activeId = data.active_id;
              // 禁播状态
              // if (data.vodSwitch == 1) {
              //     data.vodSwitch = false
              // } else {
              //     data.vodSwitch = true
              // }

              // 观看权限状态
              //  vodPermit
              //观看权限 0：公开 ；1：私密； 2：付费； 3：虚拟门票； 4：白名单；
              if (data.vodPermit == 1) {
                data.vodPermit = "加密";
              } else if (data.vodPermit == 2) {
                data.vodPermit = "付费";
                data.show = true;
                data.money = data.view_pass;
              } else if (data.vodPermit == 3) {
                data.vodPermit = "门票";
              } else if (data.vodPermit == 4) {
                data.vodPermit = "专属点播间";
              } else {
                data.vodPermit = "免费";
              }

              this.chat.thisData = data;
              if (this.chat.thisData.vodTextImgs) {
                this.chat.thisData.vodTextImgs = JSON.parse(this.chat.thisData.vodTextImgs)
              }
              // 禁播状态
              if (this.chat.thisData.vodSwitch == 0) {
                this.chat.vodSwitch = true;
                setLStorage("liveEnd", false);
              } else {
                this.chat.vodSwitch = false;
                setLStorage("liveEnd", true);
              }
              this.chat.thisData.vodCoverUrl = this.chat.thisData.vodCoverUrl;

              if(response.data.data.playM3u8Url_720p){
                this.chat.playLiveUrl = this.chat.liveUrl = response.data.data.playM3u8Url_720p;
              }else if(response.data.data.playM3u8Url_480p){
                this.chat.playLiveUrl = this.chat.liveUrl = response.data.data.playM3u8Url_480p;
              }else {
                this.chat.playLiveUrl = this.chat.liveUrl = response.data.data.playM3u8Url;
              }
              // 点播状态获取

              this.chat.liveStatus = response.data.data.vodStatus;
              this._createSocket();
            }
          })
          .catch(function (err) {
            console.log("err", err);
          });
        this.get_miniApps();
        // this.chat.thisData = global.liveData.thisData || global.liveData.data[0]
        // this.chat.begin_time =  setDateTime(this.chat.thisData.begin_time)
      },
      submitForm(formName) {
        let timestamp = Date.parse(new Date());
        this.ruleForm.datetime = setDateTime(timestamp);
        this.ruleForm.head_url = this.chat.thisData.head_url;
        this.ruleForm.user_title = this.chat.thisData.user_title;
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.ruleForm.redID = getNewTime();
            axios({
              method: "post",
              url: LIVE_URL + "dispatcher.action",
              data: {
                cmd: "set_room_sys_broadcast",
                liveID: this.chat.thisData.id,
                sys_broadcast_type: 1,
                sys_broadcast_freq: 2,
                sys_broadcast: JSON.stringify(this.ruleForm)
              }
            })
              .then(response => {
                if (response.data.resultCode == ERR_OK) {
                  this.$message({
                    showClose: true,
                    type: "success",
                    message: "设置成功!!"
                  });
                  this.dialogVisible = false;
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            return false;
          }
        });
      },
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      closeMsg() {
        this.timer2 = clearInterval(this.timer2);
      },
      // wallet(){
      //     this.dialogVisible = true
      // },
      _createSocket(flag) {
        this.addRow();
        // 如果有聊天室连接，先连接再断开
        // if(this.chat.imgUrl){

        // }
        this.chat.MsgData = [];
        let IMGURL = this.chat.imgUrl || this.chat.defaultImgUrl;
        if (this.chat.isSocket) {
          this.chat.MsgData = [];
          this.socket.emit("leave", {
            roomID: 1,
            nickName: "管理员",
            cmd: 1002,
            user_id: this.chat.thisData.id,
            imgUrl: IMGURL,
            gender: 0
          });
          this.chat.user = {
            cmd: 1001, //命令号
            appID: 3, //应用标识
            user_type: 102,
            roomID: this.chat.out_roomID,
            nickName: "管理员", //nickname,
            user_id: this.chat.user_id, //用户ID    类型：整形
            imgUrl: this.chat.imgUrl || this.chat.portrait, //用户头像链接 类型：字符串
            gender: 1 //性别
          };
          this.socket.emit("join", this.chat.user);
        } else {
          // yst
          axios({
            method: "post",
            url: LIVE_URL + "dispatcher.action",
            data: {
              cmd: "lb",
              liveID: this.chat.thisData.id,
              user_id:getLStorage("user_id"),
              video_type:1
            }
          })
            .then(response => {
              // console.log('聊天室ID~~~~',response)
              this.chat.coverImg =
                response.data.end_show_img || this.chat.thisData.live_cover_url;
              //yst点播结束设置
              // this.chat.thisData.vodCoverUrl = response.data.end_show_img || this.chat.thisData.live_cover_url
              this.chat.out_roomID = response.data.out_roomID;
              this.chat.out_room_ServerAddress =
                response.data.out_room_ServerAddress;
              if (!flag) {
                this.changeLiveShow(response);
              }
              this.socketMsg();
              // 获取贡献榜单
              this._getGiftList();
              // 查询公告
              this.getNoticeList();
              this.getPublicNotic();
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      _scrollTop() {
        setTimeout(() => {
          document.getElementById(
            "scrollBody"
          ).scrollTop = document.getElementById("scrollBody").scrollHeight;
        }, 0);
      },
      socketMsg() {
        // this.loading = false

        this.$nextTick(() => {
          // this.$message({
          //     type: 'success',
          //     message: '点播间连接成功!'
          // });
          this.chat.opts = {
            transports: ["websocket"],
            "reconnection delay": 1000
          };
          this.socket = io.connect(
            this.chat.out_room_ServerAddress,
            this.chat.opts
          );
          this.socket.on("connect", () => {
            this.chat.user = {
              cmd: 1001, //命令号
              appID: 3, //应用标识
              user_type: 102,
              roomID: this.chat.out_roomID,
              nickName: "管理员", //nickname,
              user_id: this.chat.user_id, //用户ID    类型：整形
              imgUrl: this.chat.imgUrl || this.chat.portrait, //用户头像链接 类型：字符串
              gender: 1 //性别
            };
            this.socket.emit("join", this.chat.user);
          });
          this.socket.on("reconnecting", () => {
            this.chat.user = {
              cmd: 1001,
              appID: 3,
              user_type: 102,
              roomID: this.out_roomID,
              nickName: "管理员",
              user_id: this.chat.user_id,
              imgUrl: this.chat.imgUrl,
              gender: 1
            };
            this.socket.emit("join", this.chat.user);
          });
          this.chat.isSocket = true;

          this.socket.on("sys", sysMsg => {
            // 广播
            this.chat.Msg = sysMsg;
            switch (sysMsg.cmd) {
              case 1001:
                // 修改人数
                if (this.chat.Msg.data.show_msg !== undefined) {
                  this.chat.show_msg = this.chat.Msg.data.show_msg ? true : false;
                  if (this.chat.Msg.data.show_msg == 0) {
                    this.disabledText = true;
                    this.placeholderTxt = "全体观众已经被禁言";
                  } else {
                    this.disabledText = false;
                    this.placeholderTxt = "我也来说一句...";
                  }
                }
                break;
              case 1004:
                // 聊天室通用消息
                this.chat.MsgData.push(this.chat.Msg);
                if (this.chat.Msg.offline == 0) {
                  var color = this.getBarrageColor();
                  //非禁言-弹幕
                  var barrageMsg =
                    "0=-|-=0=-|-=0=-|-=24=-@-=random=-@-=" +
                    color +
                    "=-@-=" +
                    this.chat.Msg.data.msgbody +
                    "=-|-=0";
                  // console.log("弹幕消息：", barrageMsg);
                  //flash 方法
                  this.getFlash("bacplayer_a1").PushBarrageData(barrageMsg);
                }
                // console.log('1004系统广播',this.chat.MsgData,document.getElementById('scrollBody').scrollHeight)
                this._scrollTop();
                break;
              case 1005:
                // 自定义消息 礼物消息
                this.chat.Msg.sender_head = this.chat.Msg.sender_head;
                this.chat.MsgData.push(this.chat.Msg);
                this._scrollTop();
                // console.log('1005自定义消息',this.chat.Msg)
                break;
              case 2001:
                // 系统广播
                // console.log('2001自定义系统消息',this.chat.Msg.data)
                break;
              case 2002:
                // 系统广播
                var msg2002 = this.chat.Msg;
                var liveIDTmp = msg2002.data.liveID;
                // end_show_type = msg2002.end_show_type;
                // end_show_img = msg2002.end_show_img;
                // end_show_vod = msg2002.end_show_vod;
                if (this.chat.thisData.id == liveIDTmp) {
                  this.chat.liveStatus = msg2002.data.live_status;
                }

                // if(msg2002.data.end_show_type == 0){
                //     this.chat.thisData.live_cover_url = msg2002.data.end_show_img
                // }
                this.changeLiveShow(msg2002);
                break;
              case 2020:
                // 历史聊天记录
                this.chat.Msg.data.allsms = this.chat.Msg.data.allsms.reverse();

                for (var i = 0; i < this.chat.Msg.data.allsms.length; i++) {
                  this.chat.MsgData.unshift(this.chat.Msg.data.allsms[i]);
                }
                break;
              case 2021:
                // 清除聊天记录
                break;
              case 2023:
                // 清屏
                if (this.chat.Msg.data.show_msg == 0) {
                  this.disabledText = true;
                  this.placeholderTxt = "全体观众已经被禁言";
                } else {
                  this.disabledText = false;
                  this.placeholderTxt = "我也来说一句...";
                }
                break;
              case 2010:
                // 禁言列表
                this.bannedList = [];
                if (this.chat.Msg.data[0]) {
                  this.bannedList = this.chat.Msg.data;
                  this.isBannedData = true;
                } else {
                  this.isBannedData = false;
                }
                break;
              case 5001:
                var msg = JSON.parse(this.chat.Msg.data.msgbody).msg;
                var _this = this;
                this.noticeList.data = msg;
                if (!msg) {
                  this.NoticeING = false;
                  this.animate = false;
                  //this.disabledAdd_noticeList = false;
                } else {
                  this.NoticeING = true;
                  //this.disabledAdd_noticeList = true;
                  this.animate = true;
                }
                _this.flag = true;
                $(".my_marquee div").animate(
                  {
                    left: "-100%",
                    opacity: "1"
                  },
                  8000,
                  "linear",
                  function () {
                    $(".my_marquee div").css({left: "100%"});
                    _this.flag = false;
                    setTimeout(() => {
                      if (_this.flag == false) {
                        _this.NoticeING = false;
                       // _this.disabledAdd_noticeList = false;
                      }
                    }, 6000);
                  }
                );
                // var num = 0;
                // function goLeft() {
                //     //750是根据你给的尺寸，可变的
                //     if (num == -530) {
                //         num = 0;
                //         clearInterval(_this.myTimer);
                //         this.NoticeING = false
                //     }
                //     num -= 1;
                //     $(".my_marquee div").css({
                //         left: num
                //     })
                // }
                // //设置滚动速度
                // _this.myTimer = setInterval(goLeft,20);
                //设置鼠标经过时滚动停止
                // $(".box").hover(function() {
                //     clearInterval(timer);
                // },
                // function() {
                //     timer = setInterval(goLeft, 20);
                // })

                //    滚动
                break;
            }
          });
        });
      },
      getBarrageColor() {
        //随机颜色
      },
      changeLiveShow(data) {
        // 点播状态
        if (this.chat.liveStatus == 0) {
          this.chat.isplay = false;
          this.viedoShow = false;
          this.chat.liveStatusTxt = "点播即将开始";
          this.overLive = true;
        }
        if (this.chat.liveStatus == 1) {
          this.chat.liveUrl = this.chat.playLiveUrl;
          this.viedoShow = true;
          this.chat.liveStatusTxt = "点播中";
          this.overLive = false;
          setTimeout(() => {
            this.setplaySize();
          }, 400);
          this.chat.isplay = true;
        }
        if (
          this.chat.liveStatus == 2 ||
          this.chat.liveStatus == 4 ||
          this.chat.liveStatus == 5 ||
          this.chat.liveStatus == 10
        ) {
          this.chat.isplay = false;
          this.viedoShow = false;
          this.chat.liveStatusTxt = "点播已结束";
          this.overLive = true;
          // 点播结束设置
          if (!data) {
            return false;
          }
          let videoBox = document.getElementById("videoA1");
          this.getOverLive(data);
          // 获取录像
          this.getVideoList();
        }
        if (this.chat.liveStatus == 3) {
          this.chat.isplay = false;
          this.viedoShow = false;
          this.chat.liveStatusTxt = "连接异常，信号中断";
        }
        // if(this.chat.liveStatus == 4) {
        //     this.chat.isplay = false
        //     this.viedoShow = false
        //     this.chat.liveStatusTxt = '点播已结束'
        //     this.overLive = true
        // }
        // if(this.chat.liveStatus == 5) {
        //     this.chat.isplay = false
        //     this.viedoShow = false
        //     this.chat.liveStatusTxt = '点播已结束'
        //     this.overLive = true
        // }
        if (this.chat.liveStatus == 10) {
          this.chat.isplay = false;
          this.viedoShow = false;
          this.chat.liveStatusTxt = "点播已结束";
          // let box = document.getElementById('flash')
          let videoBox = document.getElementById("videoA1");
          // videoBox.parentNode.removeChild(videoBox)
        }
      },
      // 点播结束设置
      getOverLive(data) {
        // 点播结束设置
        if (data.data.end_show_type == 1 && data.data.end_show_vod) {
          // this.viedoShow = true
          this.chat.liveUrl = data.data.end_show_vod;
          // this.chat.isplay = true
          let videoBox = document.getElementById("videoA1");
          this.videotape();
        } else if (data.data.end_show_type == 1 && data.data.end_show_vod == "") {
          // this.viedoShow = true
          // this.chat.liveUrl = data.data.end_show_vod
          // this.chat.isplay = true
          // this.chat.thisData.vodCoverUrl = this.chat.thisData.live_cover_url || this.defaultImgUrl
          let videoBox = document.getElementById("videoA1");
          this.videotape();
        } else if (data.data.end_show_type == 0 && data.data.end_show_img) {
          this.chat.thisData.vodCoverUrl = data.data.end_show_img;
        } else if (data.data.end_show_type == 0 && data.data.end_show_vod == "") {
          this.chat.thisData.vodCoverUrl =
            this.chat.thisData.live_cover_url || this.defaultImgUrl;
        }
      },

      videotape() {
        // 录像方法
        let formdata = new FormData();
        formdata.append("select_str", this.chat.thisData.id);
        formdata.append("page_index", 1);
        formdata.append("page_size", 10);
        formdata.append("user_id", getLStorage("user_id"));
        this.chat.isplay = true;
        this.viedoShow = true;
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/get_reclistbyselect.do",
          data: formdata
        }).then(res => {
          if (res.data.code == ERR_OK) {
            if (res.data.data.data_list == null) {
              this.chat.thisData.vodCoverUrl =
                this.chat.thisData.vodCoverUrl ||
                this.chat.thisData.vodCoverUrl;
              this.viedoShow = false;
              this.chat.isplay = false;
              return false;
              // this.chat.thisData.vodCoverUrl = this.chat.thisData.vodCoverUrl || this.chat.thisData.vodCoverUrl
              // let videoBox = document.getElementById('videoA1')
              // this.liveSetInterval = window.setInterval(()=>{
              //     this.videotape()
              // },10000)
            }
            if (res.data.data.data_list[0].video_switch == 2) {
              this.chat.thisData.vodCoverUrl =
                this.chat.thisData.vodCoverUrl || this.defaultImgUrl;
              return false;
            }
            if (res.data.data.data_list[0].source_type == "3") {
              this.chat.liveUrl = res.data.data.data_list[0].file_path;
              this.viedoShow = true;
              this.chat.isplay = true;
              setTimeout(() => {
                this.setplaySize();
              }, 400);
              window.clearInterval(this.liveSetInterval);
            } else if (
              res.data.data.data_list[0].source_type != "3" ||
              res.data.data.data_list[0].source_type != "6"
            ) {
              this.chat.liveUrl = res.data.data.data_list[0].file_path;
              this.viedoShow = true;
              this.chat.isplay = true;
              setTimeout(() => {
                this.setplaySize();
              }, 400);
              window.clearInterval(this.liveSetInterval);
            }
          } else {
            this.chat.isplay = false;
            this.viedoShow = false;
            that.tipsMessage("网络异常！", "error");
          }
        });
      },
      sendMsg() {
        // console.log(this.chat.imgUrl || this.chat.portrait)
        if(this.chat.MsgTxt.trim()==""){
          this.$message({
            showClose: true,
            type: "info",
            message: "请先输入聊天内容"
          });
          this.chat.MsgTxt=this.chat.MsgTxt.trim();
          return;
        };
        if (
          this.socket &&
          this.chat.MsgTxt != "" &&
          !this.chat.MsgTxt.match(/^[ ]+$/)
        ) {
          const sourceApproch = 1; //消息来源  用户实时操作
          this.socket.emit("msg", {
            imgUrl: this.chat.imgUrl || this.chat.portrait,
            cmd: 1004,
            msg: "弹幕",
            nickName: "管理员", //nickname,
            user_id: this.chat.user_id,
            barrage: parseInt(0),
            data: {
              msgbody: this.chat.MsgTxt
            }
          });
          this.chat.MsgTxt = "";
        }
      },
      deleteMsg(item, index) {
        this.$confirm("确认删除这条信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          customClass: "delMessageBox",
          type: "warning"
        })
          .then(() => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!"
            });
            this.chat.deleteConfirm = true;
            // deleteMsg
            if (!this.chat.deleteConfirm) {
              return false;
            }
            if (this.socket) {
              // const sourceApproch = 1;	//消息来源  用户实时操作
              this.socket.emit("msg", {
                cmd: 2022,
                msg: "消息删除",
                data: {
                  msg_id: item.msg_id,
                  user_id: item.user_id
                }
              });
              this.chat.MsgData.splice(index, 1);
              this.chat.deleteConfirm = false;
            }
          })
          .catch(() => {
            this.$message({
              showClose: true,
              type: "info",
              message: "已取消删除"
            });
            return false;
          });
      },
      ClearScreen() {
        if (this.socket) {
          // this.chat.show_msg = this.chat.show_msg ? 1 : 0)
          // const sourceApproch = 1;	//消息来源  用户实时操作
          this.socket.emit("msg", {
            cmd: 2023,
            msg: "管理员清屏",
            data: {
              show_msg: this.chat.show_msg ? 1 : 0
            }
          });
          // console.log("清屏: " + this.chat.show_msg);
          this.$message({
            showClose: true,
            type: "info",
            message: this.chat.show_msg
              ? "取消清屏，用户端显示"
              : "开启清屏，用户端不显示"
          });
        }
      },
      prohibitMsg(item) {
        if (this.socket) {
          // console.log('禁言 ',item.user_id)
          // const sourceApproch = 1;	//消息来源  用户实时操作
          let cmd = item.silence ? 2012 : 2011;
          // console.log("禁言cmd", cmd);
          this.socket.emit("msg", {
            cmd: cmd,
            msg: "用户禁言",
            data: {
              silence_user_id: item.user_id,
              nickname: item.nickName,
              // 用户昵称
              pic: item.sender_head || item.imgUrl
            }
          });
          //禁言后重进房间
          this._createSocket(true);
          // this.optionLive(false)
        }
      },
      // 获取禁言名单
      getBannedList(item) {
        if (this.socket) {
          this.socket.emit("msg", {
            cmd: 2010,
            msg: "获取禁言列表消息"
          });
        }
        this.dialogBanned = true;
      },
      closeBanned() {
        this._createSocket();
      },
      noProhibit(item) {
        if (this.socket) {
          this.socket.emit("msg", {
            cmd: 2012,
            msg: "用户禁言",
            data: {
              silence_user_id: item.userid,
              nickname: item.nickname,
              pic: item.sender_head || item.imgUrl
            }
          });
        }
        this.getBannedList();
        this._createSocket();
      },
      // 设置公告
      setBroadcast() {
        if (this.socket) {
          this.socket.emit("msg", {
            cmd: "set_room_sys_broadcast",
            msg: "管理员清屏",
            data: {
              show_msg: this.chat.show_msg ? 1 : 0
            }
          });
          // console.log("清屏: " + this.chat.show_msg);
          this.$message({
            showClose: true,
            type: "info",
            message: this.chat.show_msg
              ? "取消清屏，用户端显示"
              : "开启清屏，用户端不显示"
          });
        }
      },
      //************************************  end socket

      handleClick(tab, event) {
        // console.log('handleClick',tab)
        if (this.chat.chatTabName === "chat") {
          this._scrollTop();
        }
        // this.getVideoList();
        this.$router.push({path: "/onDemand/vLiveControl?id=" + getLStorage("defRoomId") + "&type=" + 3});
      },
      handleClick2(tab, event) {
      },
      handleClick3(tab, event) {
        // console.log(tab, event)
        // 切换聊天页面，聊天区域跳到最低部
        this.chat.chatTabName = tab.name;
        if (this.chat.chatTabName === "chat") {
          this._scrollTop();
        } else if (this.chat.chatTabName === "contribution") {
          this._getGiftList();
        }
      },
      handleClickMsg(tab, event) {
        if (tab.name === "sendList") {
          this.timer2 = setInterval(() => {
            this.searchMsgState();
          }, 2000);
        } else {
          this.timer2 = clearInterval(this.timer2);
        }
      },
      copyLink(id) {
        var url = document.getElementById(id);
        url.select();
        document.execCommand("copy");
        this.tipsMessage("复制成功！");
      },
      tipsMessage(message, type) {
        this.$message({
          showClose: true,
          message: message,
          type: type || "info",
          customClass: "tips-text"
        });
      },
      _LiveStatus() {
        // 点播监控
        let liveID = this.chat.thisData.id;
        let user_id = getLStorage("user_id");
        if (this.chat.vodSwitch) {
          // if(this.chat.thisData.vodSwitch){
          let formdata = new FormData();
          formdata.append("user_id", user_id);
          formdata.append("live_id", liveID);
          axios({
            method: "post",
            url: DATA_URL + "mwlive/live/enable.do",
            data: formdata,
            headers: {"Content-Type": "multipart/form-data"}
          })
            .then(res => {
              setLStorage("liveEnd", false);
              this.$message({
                showClose: true,
                type: "info",
                message: "频道已开启"
              });
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          let formdata = new FormData();
          formdata.append("user_id", user_id);
          formdata.append("live_id", liveID);
          axios({
            method: "post",
            // url: DATA_URL + 'mwlive/live/end.do',
            url: DATA_URL + "mwlive/live/close.do",
            data: formdata,
            headers: {"Content-Type": "multipart/form-data"}
          })
            .then(res => {
              // console.log('stopStart',res)
              setLStorage("liveEnd", true);
              this.$message({
                showClose: true,
                type: "info",
                message: "频道已关闭，禁止点播"
              });
              this._SetLiveEnd(this.chat.thisData);
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      },
      _SetLiveEnd(data) {
        let url = LIVE_URL + "dispatcher.action";
        let newData = {
          cmd: "set_room_end_show",
          liveID: getLStorage("liveID"),
          end_show_type: 0,
          end_show_img: "",
          end_show_vod: ""
        };
        axios({
          method: "post",
          url: url,
          data: newData
        })
          .then(response => {
            console.log(
              "禁播liveID ",
              getLStorage("user_id"),
              this.chat.vodSwitch
            );
          })
          .catch(() => {
            console.log("禁播结束设置失败 ", getLStorage("user_id"));
          });
      },
      // optionLive(event){
      //     // optionLive 切换点播间 离开房间
      //     this.chat.MsgData = []
      // this.socket.emit("leave", {
      //     roomID:1,
      //     nickName : '管理员',
      //     cmd : 1002,
      //     user_id:this.chat.user_id,
      //     imgUrl:this.chat.imgUrl || this.chat.portrait,
      //     gender:0
      // })
      //     this.socket.close()
      //     let id
      //     if(!event){
      //         id = this.chat.thisData.id
      //     }else{
      //         let data = event.split("&")
      //         this.chat.thisData = global.liveData.thisData = this.chat.data[data[1]]
      //         this.chat.liveID = global.liveData.thisID = id = this.chat.thisData.id
      //     }
      //     this.chat.vodSwitch = this.chat.thisData.vodSwitch
      //     this._createSocket(id)
      //     this._playAddress()
      // },
      //点播统计,yst
      _getStatisticsData() {
        // return false
        let _this = this;
        let formdata = new FormData();
        // formdata.append("user_id", getLStorage("user_id"));
        formdata.append("liveID", getLStorage("defRoomId"));
        axios({
          method: "post",
          url: GIFT_URL + "service/pointCount.action",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            /*
          *
          * {"lookUserCount":观看人数,"lookCount":观看人次,"lookTime":观看时长(分钟),"lookTimeCount":{观看时长分析},"pcClientCount":PC端数量,"mobileClientCount":移动端数量,"h5ClientCount":H5端数量}
          *  onlineUser:在线人数分布[{"时间":"在线人数"},{"时间":"在线人数"},{"时间":"在线人数"}...]
          *
          *
          // 1、lookTimeCount.lookUserCount 2、lookCount 3、lookTime  4、lookTimeCount {count5，} 5、pcClientCount 6、mobileClientCount 7、h5ClientCount
          * */

            _this.liveCount = res.data.params;
            /**********************************************/
            //录播统计
            _this.recordedStatistics.economic = _this.liveCount.economic;
            _this.recordedStatistics.lookUserCount = _this.liveCount.lookUserCount;
            _this.recordedStatistics.lookCount = _this.liveCount.lookCount;
            _this.recordedStatistics.lookTime = _this.liveCount.lookTime;
            //观看方式
            _this.lookWays.pcClientCount = _this.liveCount.pcClientCount;
            _this.lookWays.mobileClientCount = _this.liveCount.mobileClientCount;
            _this.lookWays.h5ClientCount = _this.liveCount.h5ClientCount;
            //在线人数分布
            var myChart1 = echarts.init(
              document.getElementById("statisticsMain1")
            );
            var myChart2 = echarts.init(
              document.getElementById("statisticsMain2")
            );
            //人数分布
            var onlineTime = _this.liveCount.onlineUser;
            _this.onlineTime.date = [];
            _this.onlineTime.duration = [];
            for (var i = 0, l = onlineTime.length; i < l; i++) {
              for (var key in onlineTime[i]) {
                _this.onlineTime.date.push(key.replace("-", "/"));
                _this.onlineTime.duration.push(onlineTime[i][key]);
              }
            }

            // 观看时长分析
            var lookTimeV = _this.liveCount.lookTimeCount;
            this.lookTimeStatistics = [];
            for (var key in lookTimeV) {
              _this.lookTimeStatistics.push(lookTimeV[key]);
            }

            var option1 = {
              tooltip: {
                trigger: "axis",
                formatter: "时间：{b}<br>在线人数：{c}人"
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: _this.onlineTime.date
                // axisLabel :{
                //     interval:1
                // }
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
                    data: [{type: "max", name: "最大值"}]
                  },
                  itemStyle: {
                    normal: {
                      color: "#1890ff"
                    }
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
                  type: "line",
                  itemStyle: {
                    normal: {
                      color: "#1890ff"
                    }
                  }
                }
              ]
            };
            myChart1.setOption(option1);
            myChart2.setOption(option2);
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      _getGiftList() {
        let formdata = new FormData();
        // 数量
        formdata.append("pageSize", 1000);
        formdata.append("pageNo", 1);
        formdata.append("receiveLiveID", getLStorage("liveID"));
        axios({
          method: "post",
          url: GIFT_URL + "service/queryReceiveGiftAll.action",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.resultCode == ERR_SERVEROK) {
              if (res.data.params.list == null) {
                this.giftList.isData = false;
              } else {
                this.giftList.isData = true;
                this.giftList.data = res.data.params.list;
                // console.log('getGiftList-------',this.giftList.data)
              }
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      // 获取录像列表1
      // getVideoList(){
      //     let formdata = new FormData()
      //     formdata.append('user_id',getLStorage('liveID'))
      //     axios({
      //         method: 'post',
      //         url: DATA_URL + 'mwlive/live/select_videoInfoList.do',
      //         data:formdata,
      //         headers: {'Content-Type': 'multipart/form-data'}
      //     }).then((res) => {
      //         if(res.data.code == '200'){
      //             if(res.data.data == null|| res.data.data.length<=0|| res.data.data == "无数据"){
      //                 this.videoList.isData = false
      //             }else{
      //                 this.videoList.isData = true
      //                 this.videoList.data = res.data.data
      //             }
      //         }
      //         console.log(res.data.data)
      //     })
      //     .catch(function(err){
      //         console.log(err);
      //     })

      // },
      // 获取录像列表2
      getVideoList(val) {
        let formdata = new FormData();
        formdata.append("select_str", getLStorage("liveID"));
        formdata.append("user_id", getLStorage("user_id"));
        formdata.append("page_size", this.page_size);
        if (val) {
          formdata.append("name", this.search);
        }
        formdata.append("page_index", this.page_index);
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/get_reclistbyselect.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.code == "200") {
              if (
                res.data.data.data_list == null ||
                res.data.data.data_list == ""
              ) {
                this.videoList.isData = false;
              } else {
                var data = res.data.data.data_list;
                if (data[0].source_type == 3 || data[0].source_type == 6) {
                  data.splice(0, 1);
                }
                for (let i = 0; i < data.length; i++) {
                  if (data[i].videoSwitch == 1) {
                    data[i].videoSwitch = false;
                  } else {
                    data[i].videoSwitch = true;
                  }
                }
                this.tableData = data;
                this.videoList.data = data;
                if (this.videoList.data < 1) {
                  this.videoList.isData = false;
                } else {
                  this.videoList.isData = true;
                }
              }
            }
          })
          .catch(function (err) {
          });
      },

      setTop(item, type) {
        let _this = this;
        let formdata = new FormData();
        formdata.append("id", item.video_id);
        // 置顶
        formdata.append("top", type);
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/update_videoInfo.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.code == ERR_OK) {
              if (type == "0") {
                _this.tipsMessage("已经取消置顶");
              } else {
                _this.tipsMessage("已置顶");
              }

              _this.getVideoList();
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      imgUpload(file) {
        var _this = this;
        let imgtype = file.raw.type;
        const isJPG =
          imgtype === "image/jpeg" ||
          imgtype === "image/png" ||
          imgtype === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          _this.successMessage("上传封面只能是 JPG、PNG、JPEG!", "error");
          return false;
        }
        if (!isLt2M) {
          _this.successMessage("上传封面大小不能超过 2MB!", "error");
          return false;
        }
        this.file = file.raw;
        let imgUrl = DATA_URL + "mwlive/setup/file_upload.do";
        let formdata = new FormData();
        formdata.append("file_data", _this.file);
        formdata.append("user_id", getLStorage("user_id"));
        formdata.append("file_type", 0);
        axios({
          method: "post",
          url: imgUrl,
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.code == ERR_OK) {
              _this.successMessage("视频封面上传成功!");
              this.ruleFormEdit.videoCover = res.data.data.show_url;
            } else {
              _this.successMessage("请选择图片！", "error");
            }
          })
          .catch(err => {
          });
      },
      beforeAvatarUpload() {
      },
      pickfile() {
        get_token();
      },
      // 编辑视频
      editVideo(item) {
        $("#progressDiv2").hide();
        $("#pre_video").show();
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/select_videoInfo.do?id=" + item.video_id,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.code == ERR_OK) {
              this.dialogEdit = true;
              this.ruleFormEdit.id = item.video_id;
              this.ruleFormEdit.videoUrl = res.data.data.outputPath;
              this.ruleFormEdit.videoCover = res.data.data.videoCoverUrl;

              var videoName = res.data.data.videoName;
              var reg = /^[_]\d{14}$/;
              var substring = videoName.substring(videoName.length - 15);
              if (reg.test(substring)) {
                this.ruleFormEdit.title = videoName.replace(substring, "");
              } else {
                this.ruleFormEdit.title = videoName;
              }
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      // 保存编辑
      submitEdit() {
        var _this = this;
        let url = DATA_URL + "mwlive/live/update_videoInfo.do";
        let editDate = new FormData();
        editDate.append("id", _this.ruleFormEdit.id);
        editDate.append("url", _this.ruleFormEdit.videoUrl);
        editDate.append("img", _this.ruleFormEdit.videoCover);
        editDate.append("video_name", _this.ruleFormEdit.title);
        _this.disablEdedit = true;
        axios({
          method: "post",
          url: url,
          data: editDate,
          headers: {"content-Type": "multipart/form-data"}
        })
          .then(res => {
            if ((res.data.code = ERR_OK)) {
              _this.successMessage("提交成功！");
              _this.getVideoList();
            } else {
              _this.successMessage("提交失败！", "error");
            }
            _this.disablEdedit = false;
            _this.dialogEdit = false;
          })
          .catch(() => {
          });
      },
      // 上下线
      soldVideo(item, soldType) {
        let _this = this;
        let formdata = new FormData();
        formdata.append("id", item.video_id);
        //video_switch  0 上架 1下架
        if (soldType) {
          formdata.append("video_switch", "0");
        } else {
          formdata.append("video_switch", "1");
        }
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/update_videoInfo.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.code == ERR_OK) {
              if (soldType) {
                _this.tipsMessage("已上线");
              } else {
                _this.tipsMessage("已下线");
              }
              _this.getVideoList();
            } else {
              _this.tipsMessage("修改失败", "error");
            }
          })
          .catch(function (err) {
            _this.tipsMessage("修改失败", "error");
          });
      },
      delVideo(item) {
        let _this = this;
        let formdata = new FormData();
        formdata.append("id", item.video_id);
        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/delete_videoInfo.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.code == ERR_OK) {
              _this.tipsMessage("删除成功");
              _this.getVideoList();
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },

      //***************************  live
      // _getLiveUrl(){
      //     axios({
      //         method: 'get',
      //         // url: 'http://mwlb.facebac.com:9161/dispatcher.action',
      //         url: DATA_URL + 'mwlive/live/get_playurl.do?id=' + this.chat.thisData.id
      //     }).then((response)=>{
      //         console.log(response)
      //         this.chat.liveUrl = response.data.data.m3u8_url
      //         setTimeout(()=>{
      //             this.setplaySize()
      //         },1000)
      //         if(response.data.code == ERR_OK){
      //             this.dataList.url = response.data.data
      //         }
      //     }).catch((err)=>{
      //         console.log(err);
      //     })
      // },
      getFlash: function (name) {
        // console.log('getFlash',name)
        // flash弹幕方法
        var e = document.getElementById(name);
        if (navigator.appName.indexOf("Microsoft") != -1) {
          return e;
        } else if (e) {
          return e.getElementsByTagName("embed")[0];
        }
        return null;
      },
      getBarrageColor(type) {
        return (
          "#" +
          (function (h) {
            return new Array(7 - h.length).join("0") + h;
          })(((Math.random() * 0x1000000) << 0).toString(16))
        );
      },
      setplaySize() {
        let liveStatus = this.chat.liveStatus == 1 ? 1 : "0";
        var random = Math.random();
        var flashvars = {
          //是否显示播放按钮
          isShowPlayBtn: "1",
          // 视频播放类型-typeVideo：1是点播，0是录播
          videoType: liveStatus,
          //点播时间 0隐藏 1显示
          isShowLiveTime: "0",
          // 视频地址
          videoUrl: this.chat.liveUrl.replace(/&/g, "$#$"),
          isMd5: "0",
          rate: "",
          defi: "高清",
          // defi: Vtext,
          videoKbps: "0",
          /*width:'63.1%',
                    height:heightPlay,*/
          // 是否开始播放
          isPlay: "1",
          //错误信息
          error: "",
          // // 上报播放时长
          // onStartPlayVideo: that.onStartPlayVideo(),
          // // 结束上报播放时长
          // onStopPlayVideo:that.clearSubPlayTime(),
          // 音量
          volume: "60",
          skin: "oneSkin",
          //是否显示logo，1表示显示，0表示不显示
          isShowLogo: "1",
          // logo地址
          logoUrl: this.chat.thisData.vodIcon,
          //logo位置  4表示左上角，1表示右上角，2表示右下角，3表示左下角
          logoPos: "1",
          //logo透明度 0表示不透明，100表示完全透明，0至100区间逐渐透明
          logoAlpha: "0",
          logoUrl2: this.chat.logoInfo.logo_url,
          logoAlpha2: "0",
          logoPos2: this.chat.logoInfo.logo_xy,
          type: "0",
          //信号中断显示的图片
          // liveInterruptUrl: 'http://montnetstest.facebac.com/PC/webCloudSeeding/images/livecover.png',
          // 是否显示开关灯
          /*isShowLight:'1',*/
          // 是否显示弹幕
          // 0禁止，1是显示
          isShowBarrage: "1",
          // 弹幕服务器地址
          // barrage_server_url: 'http://tm.facebac.com:8102',
          // 是否显示分享
          /*isShowShare:'1',*/
          // 分享品牌，对应：新浪，腾讯微博，qq空间，微信，qq，人人网
          /*shareBrand:'1|1|1|1|1|1',*/
          // 分享链接地址
          //shareLink:'http://service.weibo.com/share/share.php?url='+url+'/recordRouter.html?liveID='+liveData.LiveID+'$#$vodID='+vodID+'|http://share.v.t.qq.com/index.php?c=share$#$atx=index$#$url='+url+'/recordRouter.html?liveID='+liveData.LiveID+'$#$vodID='+vodID+'|http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'/recordRouter.html?liveID='+liveData.LiveID+'$#$vodID='+vodID+'|http://s.jiathis.com/?webid=weixin$#$isexit=false$#$url='+url+'/recordRouter.html?liveID="+liveData.LiveID+"$#$vodID="+vodID+"$#$title='+liveData.LiveName+'|http://connect.qq.com/widget/shareqq/index.html?url='+url+'/recordRouter.html?liveID='+liveData.LiveID+'$#$vodID='+vodID+'|http://share.renren.com/share/buttonshare.do?link='+url+'/recordRouter.html?liveID='+liveData.LiveID+'$#$vodID='+vodID,
          /*shareLink:"http://service.weibo.com/share/share.php?url="+url+"/recordRouter.html?liveID="+liveData.LiveID+"$#$vodID="+vodID+"$#$title="+liveData.LiveName+"|http://share.v.t.qq.com/index.php?c=share$#$atx=index$#$url="+url+"/recordRouter.html?liveID="+liveData.LiveID+"$#$vodID="+vodID+"$#$title="+liveData.LiveName+"|http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"/recordRouter.html?liveID="+liveData.LiveID+"$#$vodID="+vodID+"$#$title="+liveData.LiveName+"|http://s.jiathis.com/?webid=weixin$#$isexit=false$#$url="+url+"/recordRouter.html?liveID="+liveData.LiveID+"$#$vodID="+vodID+"$#$title="+liveData.LiveName+"|http://connect.qq.com/widget/shareqq/index.html?url="+url+"/recordRouter.html?liveID="+liveData.LiveID+"$#$vodID="+vodID+"$#$title="+liveData.LiveName+"|http://share.renren.com/share/buttonshare.do?link="+url+"/recordRouter.html?liveID="+liveData.LiveID+"$#$vodID="+vodID+"$#$title="+liveData.LiveName,
                    shareCopyLink:url+'/recordRouter.html?liveID='+liveData.LiveID+'$#$vodID='+vodID,*/
          // 点播获取各种参数接口地址
          liveStatusUrl:
          "http://live.facebac.com/flashplayerAction!checkLiveInfo.action?liveID=" +
          this.chat.thisData.id,
          // 用户ID
          userID: "0",
          // 用户视频ID
          userVideoID: this.chat.thisData.id
        };
        var params = {
          bgcolor: "#222226",
          allowFullScreenInteractive: true,
          allowFullScreen: true,
          allowScriptAccess: "always"
        };
        Mwobject.embedSWF(
          "http://montnetstest.facebac.com/PC/webLive/swf/Mwplayer.swf?random=mwplayer_v1.1.2",
          "videoA1",
          "bacplayer_a1",
          "100%",
          "100%",
          flashvars,
          params
        );
      },
      openDialogVisibleInvitation() {
        this.sendMain = "recipient";
        this.dialogVisibleInvitation = true;
      },
      // 结束点播
      overLiveFun() {
        let formdata = new FormData();
        formdata.append("user_id", getLStorage("user_id"));
        formdata.append("id", getLStorage("liveID"));
        formdata.append("active_id", this.activeId);

        axios({
          method: "post",
          url: DATA_URL + "mwlive/live/end.do",
          data: formdata,
          headers: {"Content-Type": "multipart/form-data"}
        })
          .then(res => {
            if (res.data.code == ERR_OK) {
              this.tipsMessage("点播已结束");
              this.changeLiveShow();
            } else {
              this.tipsMessage("操作失败");
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      // 查询公告栏
      getNoticeList() {
        let data = {
          cmd: "get_broadcast_cfg",
          liveID: this.chat.thisData.id
        };
        let _this = this;
        axios({
          method: "post",
          url: LIVE_URL + "dispatcher.action",
          data: data
        })
          .then(response => {
            // 公告栏开启
            if (response.data[0].sys_broadcast_switch == "0") {
              // 关闭
              this.openNotice = false;
              //this.disabledAdd_noticeList = true;
              this.startTimeRoll = "";
              this.endTimeRoll = "";
              this.textareaNotice = "";
            } else {
              this.openNotice = true;
              // 次数滚动
              if (
                response.data[0].sys_broadcast_freq <
                response.data[0].sys_broadcast_times
              ) {
                this.rollNumber = response.data[0].sys_broadcast_times
                  ? response.data[0].sys_broadcast_times
                  : "";
                this.startTimeRoll = "";
                this.endTimeRoll = "";
                this.radioRoll = "0";
              } else if (
                response.data[0].sys_broadcast_freq ==
                response.data[0].sys_broadcast_times
              ) {
                // 时间滚动
                var time_start = response.data[0].sys_broadcast_time_start.toString();
                var time_end = response.data[0].sys_broadcast_time_end.toString();
                var time_start_len = time_start.toString().length;
                var time_end_len = time_end.toString().length;
                // 滚动时间
                if (time_start_len == 1) {
                  this.startTimeRoll = "00:" + time_start + "0";
                } else if (time_start_len == 2) {
                  this.startTimeRoll = "00:" + time_start;
                } else if (time_start_len == 3) {
                  this.startTimeRoll =
                    "0" +
                    time_start.substring(0, 1) +
                    ":" +
                    time_start.substring(1, 3);
                } else {
                  this.startTimeRoll =
                    time_start.substring(0, 2) + ":" + time_start.substring(2, 4);
                }

                if (time_end_len == 1) {
                  this.endTimeRoll = "00:" + time_end + "0";
                } else if (time_end_len == 2) {
                  this.endTimeRoll = "00:" + time_end;
                } else if (time_end_len == 3) {
                  this.endTimeRoll =
                    "0" +
                    time_end.substring(0, 1) +
                    ":" +
                    time_end.substring(1, 3);
                } else {
                  this.endTimeRoll =
                    time_end.substring(0, 2) + ":" + time_end.substring(2, 4);
                }
                this.rollNumber = "";
                this.radioRoll = "1";
              }
            }
            // 判断公告是否有效

            var obj = eval("(" + response.data[0].sys_broadcast + ")");
            // 滚动次数

            // if(response.data[0].sys_broadcast_times==0){
            //     this.radioRoll = '1'
            // }else{
            //     this.radioRoll = '0'
            //     // this.startTimeRoll=""
            //     // this.endTimeRoll=""
            // }
            // 滚动内容
            if (obj.msg) {
              this.textareaNotice = obj.msg.replace("公告：", "");
            }
          })
          .catch(err => {
            // console.log(err);
            //this.disabledAdd_noticeList = true;
          });
      },
      // 新增公告栏
      add_noticeList() {
        let _this = this;
        var msg = {msg: "公告：" + _this.textareaNotice};
        // 滚动次数
        if (_this.textareaNotice == "") {
          _this.tipsMessage("请输入公告内容");
          return;
        }
        // 设置为滚动次数
        if (_this.radioRoll == "0") {
          if (this.rollNumber) {
            if (this.rollNumber <= 0) {
              _this.tipsMessage("请您输入大于0的整数");
              return;
            } else {
              var data = {
                cmd: "set_room_sys_broadcast",
                liveID: this.chat.thisData.id,
                sys_broadcast_switch: 1,
                sys_broadcast_times: _this.rollNumber,
                sys_broadcast_time_start: "0",
                sys_broadcast_time_end: "0",
                sys_broadcast: JSON.stringify(msg),
                roomID: this.chat.out_roomID
              };
              console.log(data,'发送公告');
              _this.send_noticeList(data);
            }
          } else {
            _this.tipsMessage("请输入滚动次数");
          }
        } else {
          // 设置为滚动时间
          if (_this.startTimeRoll && _this.endTimeRoll) {
            var data = {
              cmd: "set_room_sys_broadcast",
              liveID: this.chat.thisData.id,
              sys_broadcast_switch: 1,
              sys_broadcast_times: 0,
              sys_broadcast_time_start: _this.startTimeRoll.replace(":", ""),
              sys_broadcast_time_end: _this.endTimeRoll.replace(":", ""),
              sys_broadcast: JSON.stringify(msg),
              roomID: this.chat.out_roomID
            };

            _this.send_noticeList(data);
          } else {
            _this.tipsMessage("请选择开始时间和结束时间");
          }
        }
      },

      // 发送公告,设置公告
      send_noticeList(formdata) {
        let _this = this;
        axios({
          method: "post",
          url: LIVE_URL + "dispatcher.action",
          data: formdata
        })
          .then(response => {
            if (response.data.resultCode == ERR_OK) {
              this.$message({
                showClose: true,
                type: "success",
                message: "设置成功!"
              });
              //this.disabledAdd_noticeList = true;
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "设置失败!"
              });
             // this.disabledAdd_noticeList = false;
            }
          })
          .catch(err => {
            console.log(err);
           // this.disabledAdd_noticeList = false;
          });
      },
      // 关闭公告栏
      changeNotice() {
        let _this = this;
        let open;
        if (_this.openNotice) {
          open = 1;
          this.disabledAdd_noticeList = false;
        } else {
          open = 0;
          this.disabledAdd_noticeList = true;
          this.rollNumber = "";
          this.startTimeRoll = "";
          this.endTimeRoll = "";
          this.textareaNotice = "";
        }
        axios({
          method: "post",
          url: LIVE_URL + "dispatcher.action",
          data: {
            cmd: "set_room_sys_broadcast",
            liveID: this.chat.thisData.id,
            roomID:this.chat.out_roomID,
            sys_broadcast_switch: open
          }
        })
          .then(response => {
            if (response.data.resultCode == ERR_OK) {
              if (open == 0) {
                _this.$message({
                  showClose: true,
                  type: "success",
                  message: "公告栏已关闭!"
                });
                // this.disabledAdd_noticeList = true;
              } else {
                _this.$message({
                  showClose: true,
                  type: "success",
                  message: "公告栏已开启!"
                });
                // this.disabledAdd_noticeList = false;
              }
              if (open == 0) {
                this.NoticeING = false;
                // this.disabledAdd_noticeList = true;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      successMessage(message, type) {
        this.$message({
          showClose: true,
          message: message,
          type: type || "success"
        });
      },
      otherTip(message, type) {
        message = $("#otherTip").val();
        type = $("#otherTip").attr("data-id");
        this.$message({
          showClose: true,
          message: message,
          type: type || "success"
        });
      }
    },
    destroyed() {
      this._leaveLive();
      delLStorage("liveEnd");
      this.timer = clearInterval(this.timer);
    },

    filters: {
      filterTime(val) {
        if (!val) {
          let timestamp = Date.parse(new Date());
          // return '立即开始'
          // return setDateTime(timestamp)
          return "暂无点播";
        }
        let regExp = /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/;
        if (regExp.test(val)) {
          return val;
        }

        let datetime = new Date(val);
        var month = datetime.getMonth() + 1;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        var strDate = datetime.getDate();
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let getHours = datetime.getHours();
        if (getHours >= 0 && getHours <= 9) {
          getHours = "0" + getHours;
        }
        let strTime = datetime.getMinutes();
        if (strTime >= 0 && strTime <= 9) {
          strTime = "0" + strTime;
        }
        let getSeconds = datetime.getMinutes();
        if (getSeconds >= 0 && getSeconds <= 9) {
          getSeconds = "0" + getSeconds;
        }
        return (
          datetime.getFullYear() +
          "-" +
          month +
          "-" +
          strDate +
          " " +
          getHours +
          ":" +
          strTime
        ); //+ ":" + getSeconds
      },
      filterVideoName(val) {
        if (!val) {
          return "";
        }
        var reg = /^[_]\d{14}$/;
        var substring = val.substring(val.length - 15);
        if (reg.test(substring)) {
          val = val.replace(substring, "");
        }
        return val;
      },
      msgStateInfo(val) {
        if (val == 1) {
          return "发送成功";
        } else if (val == 2) {
          return "发送失败";
        } else {
          return "发送中...";
        }
      }
    },
    components: {
      MHeader,
      LeftNav,
      mFooter
      // VueQArt
    }
  };
</script>

<style scoped>
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

  .notice_board .btn_30,
  .wallet-wrap .btn_30 {
    width: 70px;
    margin-top: 10px;
  }

  .notice_board .btn_30[disabled],
  .wallet-wrap .btn_30[disabled] {
    background-color: #d9d9d9;
  }

  .notice_rules {
    height: 152px;
    background-color: #f5f5f5;
    padding: 0 10px 10px 10px;
  }

  .notice_board .notice_rules .btn_30 {
    position: relative;
    right: -28px;
    font-size: 14px;
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

  .lives-Statistics .col_4FF {
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    font-weight: 600;
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

  .Statistics-content .title,
  .my_chart .chart_content .title {
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
    margin-right: -90px;
    display: none;
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
    width: 130px;
    height: 130px;
    border: 1px solid #e5e5e5;
    padding: 12px 8px 5px 8px;
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
    /* left:50%;
    top:50%; */
    width: 130px;
    height: 300px;
    margin: 190px 0 13px 220px;
    background: url(../../common/image/no_paihang.png) no-repeat;
    text-align: center;
    /* transform:translate(-50%,-50%); */
  }

  .giftListNotList div {
    margin-top: 157px;
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
</style>

<style>
  /* .demo-dynamic .el-form-item:nth-child(3n+4) .icon_del{
    margin-right:0;
} */
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

  .tabs-header > .el-tabs__header {
    background: #fff;
    line-height: 70px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.02);
  }

  /* .liveControl .el-tabs__content{background:#F2F2F2;color:#333333;} */
  .liveControl .el-tabs__content {
    color: #333333;
  }

  .mainNav .el-tabs__nav {
    float: right;
    margin-right: 20px;
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
    background-color: #f5f5f5;
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

  .mainNav .liveControl-bom .el-tabs__nav .el-tabs__item.is-active {
    color: #2B6CFF;
  }

  .mainNav .liveControl-bom.live-bom .el-tabs__nav .el-tabs__item {
    border: 1px solid #e5e5e5;
  }

  .mainNav .liveControl-bom .el-tabs__nav .el-tabs__item.is-active {
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
    padding-top: 10px;
  }

  .liveControl-bom .el-tabs__content {
    background: #ffffff;
  }

  .live-bom .el-tabs__content {
    height: 231px;
  }

  .live-bom .el-button {
    background: #2B6CFF;
    border: none;
  }

  .trailer {
    background: #fff;
  }

  .el-switch.is-checked .el-switch__core,
  .el-button--primary,
  .el-tabs__active-bar {
    background-color: #2B6CFF;
  }

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
    height: 638px;
    margin-top: 20px;
    border-radius: 2px;
    margin-bottom: 20px;
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
    border: 1px solid #d9d9d9;
  }

  .notice_board .el-input__icon {
    width: 0;
    height: 0;
    display: none;
  }

  .notice_board .my_time .el-input__inner {
    width: 60px;
    /* background:#F5F5F5;
    color:#CCCCCC; */
  }

  .notice_board .input_50 .el-input__inner,
  .notice_board .input_50.el-input {
    width: 50px;
    padding-left: 0;
    padding-right: 0;
    /* background:#F5F5F5; */
    /* color:#CCCCCC; */
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
  .swi_50
  .notice_board .swi_50 {
    position: relative;
    right: -50px;
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
    padding: 8px 0 0 12px;
    /* background: rgba(0, 0, 0, 1); */
    opacity: 0.6;
    border-radius: 5px;
    width: 350px;
    height: 70px;
    -webkit-box-shadow: none;
  }

  .popover .txt_fff {
    font-weight: 600;
    color: #e5e5e5;
    font-family: "PingFangSC", "Microsoft YaHei";
  }

  .el-popper[x-placement^="top"] .popper__arrow::after {
    border-top-color: rgba(0, 0, 0, 1);
  }

  .popover p {
    font-size: 12px;
    color: #e5e5e5;
    line-height: 21px;
  }

  .el-popper[x-placement^="top"] .popper__arrow {
    border-top-color: #e5e5e5;
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
    margin-left: 105px;
  }

  .mini_apps {
    width: 100%;
    margin: 5px auto 0 auto;
    text-align: center;
  }

  #appImag {
    padding-bottom: 0px;
    padding-top: 15px;
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
    margin-left: 104px;
  }

  .my_chart .chart_content {
    background-color: #fff;
    border-radius: 5px;
    width: 528px;
    margin-bottom: 20px;
    height: 330px;
    padding: 20px;
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

  .icon_query {
    background: url(../../common/image/icon_Helpcc.png) no-repeat;
    display: inline-block;
    position: relative;
    top: 2px;
    right: -55px;
    width: 14px;
    height: 14px;
  }

  .icon_query:hover {
    background: url(../../common/image/icon_Help.png) no-repeat;
  }
</style>
<style>
  .liveControl .el-radio__label {
    font-size: 12px;
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

  /*h5 phone样式*/
  /*add*/
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
    margin: -19px auto 0;
    width: 235px;
        top: 63px;
    position: absolute;
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

  .img_scanner {
    width: 111px;
    height: 111px;
    padding: 9px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
  }

  .equipLink .el-input-group__append {
    background-color: #4285f4;
  }

  .equipSure {
    margin: auto;
    margin-top: 60px;
  }

  .equipSure,
  .eqEnsureBtn {
    width: 88px;
  }

  #appImg {
    padding-top: 15px;
    padding-bottom: 2px;
  }

  .p-r {
    cursor: pointer;
  }

  .play-icon {
    position: absolute;
    width: 80px;
    height: 80px;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -40px;
  }

  .video-js {
    width: 530px;
    height: auto;
  }
  .el-popover{
      background-color: #000;
}
</style>
<style>
</style>



