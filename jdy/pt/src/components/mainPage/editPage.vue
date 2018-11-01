<template>
    <div>
        <v-header :realshow="realshow"></v-header>
        <div class="centerPanel">
            <div class="mainList">
                <el-row class="editTitle">
                     <h2><a  style="color:#4285F4;" class="backToMain" @click="backToMain">主页列表</a><i class="el-icon-arrow-right"></i><span>{{Title}}</span></h2>
                     <div style="float: right;">
                       <el-button type="primary" id="setPublic" @click="setPublic()">正式发布</el-button>
                       <el-button type="primary" @click="showH5()" style="margin-right:10px;">预览草稿</el-button>
                     </div>
                </el-row>
                <hr/>
                <el-row class="editNav">
                    <el-col :span="4">
                        <main-left v-on:nowIndex="fromChild"></main-left>
                    </el-col>
                    <el-col :span="20" class="editMain">
                        <div class="preview">
                          <div class="phone-inner">
                            <div class="p_header" @click="showPageEdit('1')">
                              <p class="p_show newPshow">{{Title}}</p>
                              <div class="edit" id="pageNameEdit" style="display:none">
                                <p>页面</p>
                                <hr/>
                                <el-row class="e_ptitle">
                                  <el-col :span="4" class="pageName">页面名称：</el-col>
                                  <el-col :span="20">
                                    <el-input id="inputTitle" placeholder="请输入标题" v-model="Title" :maxlength="30" class="inputStyle"></el-input>
                                    <div class="text_tip" style="margin-top:8px;">{{Title?Title.length:0}}<span>/30</span></div>
                                  </el-col>
                                  <el-button type="primary" class="saveName" @click="saveTitle(false)">保存草稿</el-button>
                                </el-row>
                              </div>
                            </div>
                            <div class="p_page">
                            <div>
                                <pic-play v-show="!(imgsList.length==0)" id="picsPlay"  :picData="imgsList" v-on:bannerOk="bannerOk" :playType="showImgType"></pic-play>
                            </div>
                              <div class="p_img"  style="height: 0px;!important" @click="showPageEdit('2')" ><!-- :background="imageUrl" -->
                                
                                <!-- <div v-if="showImgType=='1'">
                                  <div>
                                      <ul>
                                        <li v-for="(item,index) in imgsList" :key="index">
                                          <img :src="item.img_url"/>
                                        </li>
                                      </ul>
                                  </div>
                                  <div class="TabBars">
                                    <span v-for="(item,index) in imgsList" :key="index"></span>
                                  </div>
                                </div> -->
                                <div class="edit" id="pageBannerEdit" style="display:none;">
                                  <p>Banner
                                    <!-- <section class="model-13">
                                    <div class="checkbox">
                                      <input type="checkbox" v-model="bannerUsing"/>
                                      <label></label>
                                    </div></section> -->
                                     <el-switch
                                    class="my_switch mySwitch"
                                    v-model="bannerUsing"
                                    active-text="开启"
                                    :width="60"
                                    active-color="#2B6CFF"
                                    inactive-color="#CCCCCC"
                                    inactive-text="关闭">
                                   </el-switch>
                                    </p>
                                  <hr/>
                                  <el-row class="e_ptitle">
                                    <el-col :span="4" class="pageName">选择模板：</el-col>
                                    <el-col :span="20">
                                      <ul class="bannerList">
                                        <li class="template active" id="banner1" @click="changeLi('1')">
                                          <div class="Carousel">
                                            <img src="../../common/image/Carousel.png" width="90px" height="64px" alt="temp">
                                          </div>
                                          <div class="CarouselName">轮播海报</div>
                                        </li>
                                        <!-- <li class="template" id="banner2" @click="changeLi('2')">
                                          <div class="Slide">
                                            <img src="../../common/image/Slide.png" width="90px" height="64px" alt="temp">
                                          </div>
                                          <div class="SlideName">横向滑动</div>
                                        </li> -->
                                      </ul>
                                      <div id="bannerDetail" class="Info">
                                        <b class="ADTip">最多添加<span>5</span>张背景图</b>
                                        <div id="b_addNewImg"  @click="addBackImage">
                                          <a class="el-icon-plus">添加一个背景图</a>
                                          <p>建议尺寸750*340 像素</p>
                                        </div>
                                        <div class="container_item">
                                          <div class="b_imageTabs">
                                            <span v-for="(item,index) in items" :key="index" @click="currentBanner(index)">
                                                <input hidden type="text" v-model="item.pic_url" style="position: absolute;bottom: 10px;width: 450px;">
                                              <t-banner :inputValuePicUrl="item.pic_url" v-on:cVideo="changeCType" v-on:getPicUrlChange="picUrlChange" v-model="item.link_url"  v-on:deleteb="deleteBanner" :label="test+index" v-on:state="state"></t-banner>
                                              <!-- <t-banner v-model="item.linkUrl"></t-banner> -->
                                              <!-- <img :src="item.pic_url" alt=""> -->
                                            </span>
                                            <!-- <t-banner id="banner1"></t-banner>
                                            <t-banner id="banner2"></t-banner>
                                            <t-banner id="banner3" style="display:none;"></t-banner>
                                            <t-banner id="banner4" style="display:none;"></t-banner>
                                            <t-banner id="banner5" style="display:none;"></t-banner> -->
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                  </el-row>
                                  <!-- <p  style="color: #BFBFBF;font-size: 12px;display: inline-block;margin-left: 77px;margin-top: 32px;">最多添加5个图片，拖动选中的图片广告可对其排序</p> -->
                                  <el-button type="primary" id="saveBanner" @click="saveBanner('false')">保存草稿</el-button>
                                </div>
                              </div>
                              <div class="p_menu">
                                <el-menu :default-active="activeIndex" id="menusShow" mode="horizontal">
                                  <el-menu-item class="menuItem showContentli" v-for="(item,index) in menuList" :key="item.id" :index="'item'+item.id" @click="getMenu(item.id,item.menu_content,item.menu_name,item.menu_type,item.menu_index)">
                                    <i class="moveTop" @click="preMove(item.id,item.menu_index,index)"></i>
                                    <p class="menuIteP">{{item.menu_name}}</p>
                                    <i class="moveBottom" @click="nextMove(item.id,item.menu_index,index)"></i>
                                    <i class="deleteMenuIcon" @click="deleteMenu(item.id)"></i>
                                  </el-menu-item>
                                </el-menu>
                                <!-- <a class="addMenu" @click="addMenu"><i class="el-icon-plus"></i></a> -->
                                <a class="addMenu" @click="addMenu"><i id="iPosition">+</i></a>
                                <div v-if="isShowNew==1" index="items0" class="newMenuShow" style="display:none;">
                                    <p class="menuIteP newMenuHover">{{menuName}}</p>
                                </div>
                              </div>
                              <div class="p_content">
                                <div class="showContent"  id="showContent">
                                  <div v-if="isVideo==0" class="menuContents">{{content}}</div>
                                  <div v-if="isVideo==1" class="menuContents">
                                    <div v-for="(item,index) in displayList" :key="index" style="display: inline;">
                                      <div v-if="item.img_type=='1'||item.img_type==undefined" class="ImgType1">
                                        <img :src="item.pic_url" class="video_pic2"/>
                                        <span class="v_yellow_type videoType1" v-bind:class="item.status | live_btn" v-if="item.video_type=='2'" style="margin-top: 15px;"></span>
                                        <span class="v_yellow_type videoType1" v-bind:class="item.status | live_btn" v-if="item.video_type=='1'">{{item.status | type}}</span>
                                        <p class="menuConten_title">{{item.live_title}}</p>
                                        <el-row class="vTips">
                                          <span>权限:{{item.permitType | type2}}</span>
                                          <span class="fr"><img class="eyes_icon" src="../../common/image/videoVisitor.png"/><em>{{item.watchNum | type3}}</em></span>
                                        </el-row>
                                      </div>
                                      <div v-if="item.img_type=='2'" class="ImgType2">
                                        <img class="video_pic" :src="item.pic_url"/>
                                        <span class="v_yellow_type videoType1" v-if="item.video_type=='2'" style="margin-top: 15px;"></span>
                                        <span class="v_yellow_type videoType1" style="top: -20px;" v-if="item.video_type=='1'">{{item.status | type}}</span>
                                        <p class="menuConten_title">{{item.live_title}}</p>
                                        <el-row class="vTips">
                                          <span>权限:{{item.permitType | type2}}</span>
                                          <span class="fr"><img class="eyes_icon" src="../../common/image/videoVisitor.png"/><em>{{item.watchNum | type3}}</em></span>
                                        </el-row>
                                      </div>
                                      <div v-if="item.img_type=='3'" class="ImgType3">
                                        <img :src="item.pic_url" class="video_pic3"/>
                                        <span class="videoType2 v_yellow_type" v-if="item.video_type=='1'">{{item.status | type}}</span>
                                        <span class="rightTips">
                                          <p class="menuConten_title" style="margin-left: 5px;">{{item.live_title}}</p>
                                          <el-row class="vTips2">
                                            <p>权限:{{item.permitType | type2}}</p>
                                            <p>时间:{{item.begin_time | filterTime}}</p>
                                            <p>浏览:{{item.watchNum | type3}}次</p>
                                          </el-row>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div  class="edit" id="pContent" style="display:none;">
                                  <p>菜单</p>
                                  <hr/>
                                  <el-row class="menuSelect">
                                    <el-col :span="5">
                                      <h3>菜单名称：</h3>
                                    </el-col>
                                    <el-col :span="6">
                                      <el-input v-model="menuName" placeholder="请输入内容" :maxlength="4" v-on:input ="inputFunc(menuName)"></el-input>
                                      <div class="text_tip" style="margin-top:8px;">{{menuName?menuName.length:0}}<span>/4</span></div>
                                    </el-col>
                                    <el-col :span="5" style="margin-left: 8.3%;">
                                      <h3>菜单分类：</h3>
                                    </el-col>
                                    <el-col :span="6">
                                      <el-select v-model="Selected" placeholder="请选择">
                                        <el-option
                                          v-for="item in classify"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                      </el-select>
                                    </el-col>

                                  </el-row>
                                  <el-row class="e_ptitle" id="editText" style="height:400px;">
                                    <!-- <editor id="editor" class="editor" :message.sync="content"></editor> -->
                                    <editors id="editor" class="editor" :message.sync="content"></editors>
                                  </el-row>
                                  <el-row class="e_ptitle" id="videoChoose">
                                    <div id="videoAdd">
                                      <div id="b_addNewVideo"><a  class="el-icon-plus addTip" @click="addViedOfMenu">添加视频</a> <b class="orderTip">点击上下按钮可对视频排序</b></div>
                                      <ul>
                                        <li v-for="(item,index) in displayList" id="item.id" class="videoList" :key="index">
                                          <i class="deleteLiVideo el-icon-circle-close-outline" @click="removeLiVideo(index)"></i>
                                          <i class="moveUpLiVideoStyle" @click="moveUpLiVideo(index)"></i>
                                          <!-- <i class="el-icon-d-caret moveUpLiVideoStyle" @click="moveUpLiVideo(index)"></i> -->
                                          <el-row class="videoDetail">
                                            <el-col :span="10">
                                              <img class="lvImg" :src="item.pic_url"/>
                                            </el-col>
                                            <el-col :span="13" class="llWords2">
                                              <p class="pStyle" :title="item.live_title">{{item.live_title}}</p>
                                              <div style="margin-top: 5px">
                                                <el-radio-group v-model="item.img_type" size="mini" class="imgTypeList">
                                                  <el-radio label="2" border>大图</el-radio>
                                                  <el-radio label="1" border>小图</el-radio>
                                                  <el-radio label="3" border>详情</el-radio>
                                                </el-radio-group>
                                              </div>
                                            </el-col>
                                          </el-row>
                                          <i class="moveDownLiVideo" @click="moveDownLiVideo(index)"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <el-row class="videoOrder">
                                      <h4 class="sameRow">整体排版</h4>
                                      <el-radio-group  v-model="checkAllType" class="sameRow" size="mini" @change="changeImgType">
                                        <el-radio label="2">大图</el-radio>
                                        <el-radio label="1">小图</el-radio>
                                        <el-radio label="4">一大两小</el-radio>
                                        <el-radio label="3">详细列表</el-radio>
                                        <!-- <el-checkbox label="禁用" disabled></el-checkbox>
                                        <el-checkbox label="选中且禁用" disabled></el-checkbox> -->
                                      </el-radio-group >
                                    </el-row>
                                  </el-row>
                                  <el-row class="delMenu">
                                    <a @click="deleteMenu('-1')" style="cursor: pointer;">删除菜单栏</a>
                                    <el-button type="primary" class="saveBanner" @click="saveMenu('false')">保存草稿</el-button>
                                  </el-row>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="shareBack" style="display:none;">
                          <div class="shareBackground">
                            <div id="shareWX">
                            <div class="shareShow">
                              <el-row>
                                <el-col :span="16">
                                  <p class="shareTitle">{{shareTitle}}</p>
                                   <p class="shareDescrib">{{shareDescrib}}</p>
                                  <!-- <h5 class="shareLink">https://lanhuapp.com/web/#/item/board/detail</h5> -->
                                </el-col>
                                <el-col :span="8">
                                  <img class="shareImg" src="../../common/image/noShare.jpg" v-if="shareImg==''"/>
                                  <img class="shareImg" :src="shareImg" v-if="shareImg!=''"/>
                                </el-col>
                              </el-row>
                            </div>
                            <div class="edit" id="shareEdit">
                              <p>分享信封
                                <!-- <section class="model-13">
                                    <div class="checkbox">
                                      <input type="checkbox" v-model="shareUsing"/>
                                      <label></label>
                                    </div></section> -->
                                    </p>
                              <hr/>
                              <el-row class="shareItem">
                                <el-col :span="4">
                                  <p>卡片标题：</p>
                                </el-col>
                                <el-col :span="20">
                                  <el-input placeholder="请输入内容" v-model="shareTitle" :maxlength="30" class="inputStyle"></el-input>
                                  <div class="text_tip" style="margin-top: 8px;">{{shareTitle?shareTitle.length:0}}<span>/30</span></div>
                                </el-col>
                              </el-row>
                              <el-row class="shareItem">
                                <el-col :span="4">
                                  <p>卡片描述：</p>
                                </el-col>
                                <el-col :span="20">
                                  <el-input placeholder="请输入内容" v-model="shareDescrib" :maxlength="30" class="inputStyle"></el-input>
                                  <div class="text_tip" style="margin-top: 8px;">{{shareDescrib?shareDescrib.length:0}}<span>/30</span></div>
                                </el-col>
                              </el-row>
                              <el-row class="shareItem">
                                <el-col :span="4">
                                  <p>添加图片：</p>
                                </el-col>
                                <el-col :span="20">
                                  <img src="../../common/image/noShare.jpg" v-if="shareImg==''" class="shareImgShow"/>
                                  <img :src="shareImg" v-if="shareImg!=''" class="shareImgShow"/>
                                  <upload-img  v-on:updateImg="getImgUrl" id="uploadShareImg"></upload-img>
                                  <!-- <el-button><i class="el-icon-upload"></i>上传</el-button> -->
                                </el-col>
                                <el-col :span="24">
                                  <p id="shareTips">用户通过微信分享给朋友时，会自动显示设定图片</p>
                                </el-col>
                              </el-row>
                              <el-button type="primary" class="rightbottomBtn" @click="setShareEnvelope('false')">保存草稿</el-button>
                            </div>
                          </div>
                          </div>
                        </div>
                        <div class="extraSetting" style="display:none;">
                          <div class="extraBackground">
                            <div class="extraShow">
                            <p>{{Name}}</p>
                            <img src="../../common/image/wximg1.jpg" v-if="!WXImg" alt="">
                            <img :src="WXImg" id="WXImg" v-if="WXImg!=''" />
                            <img v-if="wxUsing" id="WXIcon" src="../../common/image/wxscanner.png">
                            <img :src="srcImg" id="serviceImg" v-if="srcImg!=''" style="left: 0px;"/>
                            <img v-if="serviceUsing" id="ServiceIcon" src="../../common/image/service.png">
                          </div>
                          <div id="wxEdit" class="edit">
                            <div class="wxInfo">
                              <p>
                                公众号设置
                                <!-- <section class="model-13">
                                <div class="checkbox">
                                  <input type="checkbox" v-model="wxUsing"/>
                                  <label></label>
                                </div></section> -->
                                <el-switch
                                    class="my_switch mySwitch"
                                    v-model="wxUsing"
                                    active-text="开启"
                                    :width="60"
                                    active-color="#2B6CFF"
                                    inactive-color="#CCCCCC"
                                    inactive-text="关闭">
                                </el-switch>
                              </p>
                              <hr/>
                              <el-row class="shareItem">
                                <el-col :span="5">
                                  <p>公众号名称：</p>
                                </el-col>
                                <el-col :span="19">
                                  <el-input placeholder="请输入内容" v-model="wxName" :maxlength="30" class="inputStyle2"></el-input>
                                  <div class="text_tip">{{wxName?wxName.length:0}}<span>/30</span></div>
                                </el-col>
                              </el-row>
                              <el-row class="shareItem">
                                <el-col :span="5">
                                  <p>二维码上传：</p>
                                </el-col>
                                <el-col :span="19">
                                  <upload-img v-on:updateImg="getImgUrl2"></upload-img>
                                  <!-- <el-button><i class="el-icon-upload"></i>上传</el-button> -->
                                  <div class="scannerTips">
                                    <p>图片大小2M以内;支持PNG、JPG、JPEG格式</p>
                                    <el-row class="checkboxItem">
                                      <el-radio v-model="scannerShow" label="1">进入主页弹二维码</el-radio>
                                    </el-row>
                                    <el-row class="checkboxItem">
                                      <el-radio @change="force" v-model="scannerShow" label="2">强制关注</el-radio>
                                    </el-row>
                                    <p>
                                      注：开启公众号后，以防您的观众关注公众号后无法回到主页，请您自行在公众号发布相应主页链接。
                                    </p>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-button  type="primary" class="rightbottomBtn" @click="saveWx('false')">保存草稿</el-button>
                            </div>
                            <div class="serviceInfo">
                              <p>
                                客服设置
                                <!-- <section class="model-13">
                                <div class="checkbox">
                                  <input type="checkbox" v-model="serviceUsing"/>
                                  <label></label>
                                </div></section> -->
                                <el-switch
                                    class="my_switch mySwitch"
                                    v-model="serviceUsing"
                                    active-text="开启"
                                    :width="60"
                                    active-color="#2B6CFF"
                                    inactive-color="#CCCCCC"
                                    inactive-text="关闭">
                                </el-switch>
                              </p>
                              <hr/>
                              <el-row class="shareItem">
                                <el-col :span="5">
                                  <p>客服名称：</p>
                                </el-col>
                                <el-col :span="19">
                                  <el-input placeholder="请输入内容" v-model="serviceName" :maxlength="30" class="inputStyle2"></el-input>
                                  <div class="text_tip">{{serviceName?serviceName.length:0}}<span>/30</span></div>
                                </el-col>
                              </el-row>
                              <el-row class="shareItem">
                                <el-col :span="5">
                                  <p>二维码上传：</p>
                                </el-col>
                                <el-col :span="19">
                                  <upload-img  v-on:updateImg="getImgUrl3"></upload-img>
                                  <!-- <el-button><i class="el-icon-upload"></i>上传</el-button> -->
                                  <div class="scannerTips">
                                    <p>图片大小2M以内;支持PNG、JPG、JPEG格式</p>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-button  type="primary" class="rightbottomBtn" @click="serviceSave('false')">保存草稿</el-button>
                            </div>
                          </div>
                          </div>

                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-dialog
          title="预览"
          close="shareToFriend"
          class="yulanDialog"
          :visible.sync="preShowDialogVisible"
          width="490px"
          center>
          <div>
            <div id="preShowImg" class="fourCorner"></div>
            <p class="dlTips">手机扫码预览</p>
            <el-row style="margin-top:20px;">
                <input readonly type="text" v-model="previewUrl" id="copy1" class="el-input__inner">
                <el-button class="btn blue_btn" @click="copyLink('copy1')">复制</el-button>
            </el-row>
            <!-- <el-row>
              <el-button type="primary" class="Margintop Marginb tag-read" @click="copyLink('copy1')" :data-clipboard-text ="previewUrl">复制链接</el-button>
            </el-row>
            <input readonly type="text" v-model="previewUrl" id="copy1" class="el-input__inner"> -->
            <!-- <input class="Margintopa" id="copy1" :href="'http://'+pageUrl">{{pageUrl}}</input> -->
          </div>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="preShowDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="preShowDialogVisible = false">确 定</el-button>
          </span> -->
        </el-dialog>
        <!-- 发布 -->
        <el-dialog
                  title="页面发布成功"
                  class="shareToFriend"
                  :visible.sync="publicVisible"
                  width="490px"
                  center>
                  <div>
                    <hr/>
                    <div id="preShowImg2" class="fourCorner">

                    </div>
                    <!-- <p class="dlTips">点击<a class="downLoad" @click="dlPics">下载二维码</a>分享</p> -->
                    <p class="dlTips">手机扫描预览</p>
                    <el-row style="margin-top:20px;">
                    <input readonly type="text" v-model="pageUrl" id="cpLink" class="el-input__inner">
                    <el-button class="btn blue_btn" @click="copyLink('cpLink')">复制</el-button>
                    </el-row>
                  </div>
                  <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="publicVisible = false">取 消</el-button>
                    <el-button type="primary" @click="publicVisible = false">确 定</el-button>
                  </span> -->
                </el-dialog>
        <el-dialog title="选取视频" :visible.sync="chooseVideo" style="font-weight: 600;" class="chooseVideo">
          <hr/>
          <div>
            <el-row>
              <el-col :span="12">
                <el-button-group class="LTypes">
                  <el-button type="default" :class="isLive==1?'is-active':''" @click="changeIsLive(1)">直播</el-button>
                  <el-button type="default" :class="isLive==0?'is-active':''" @click="changeIsLive(0)">点播</el-button>
                </el-button-group>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-input placeholder="请输入视频名称" v-model="shiftName">
                    <!-- <el-button slot="append" icon="el-icon-search" @click="shiftData()">搜索</el-button> -->
                    <el-button slot="append" @click="shiftData()">搜索</el-button>
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <div id="liveList">
            <ul  id="selectVideoShow">
              <li class="liveList seleMyli" style="cursor: pointer;" v-for="(item,index) in liveList" :key="item.id" :index="'item'+index" @click="item.ck = !item.ck"  v-if="item.live_status!=4&&!item.live_switch">
                <el-row >
                  <el-col :span="1" class="llRadio" >
                      <el-checkbox v-model="item.ck" @change="clickRadio(index,item.id,item.live_name,item.begin_time,'1',item.live_cover_url,item.live_status,item.watch_num,item.live_permit)"></el-checkbox>
                    <!-- <input type='radio' :checked='item.ck' v-model="item.ck" @click="clickRadio(index,item.id,item.live_name,item.create_time,'1',item.live_cover_url,item.live_status,item.watch_num,item.live_permit)"> -->
                    <!-- <el-radio v-model="item.ck" :id="'ck'+item.id" @change="clickRadio(item.id)" ></el-radio> -->
                  </el-col>
                  <el-col :span="6">
                    <img class="llImg" :src="item.live_cover_url"/>
                  </el-col>
                  <el-col :span="1">
                    <span class="videoType3" v-bind:class="item.live_status | live_btn">{{item.live_status | type}}</span>
                  </el-col>
                  <el-col :span="14" class="llWords">
                    <h2>{{item.live_name}}</h2>
                    <b>时间：{{item.begin_time| filterTime}}</b>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
          <div id="videoList" style="display:none">
            <ul>
              <!-- <li class="liveList" id="firstFolder" @click="intoFolder('0')" v-if="folderID=='0'">
                <el-row>
                  <el-col :span="7"  style="margin-left:7%">
                    <img class="lvImg" src="../../common/image/fileSet.png" style="margin-top: 20px;"/>
                  </el-col>
                  <el-col :span="14" class="llWords">
                    <h2>文件夹</h2>
                  </el-col>
                </el-row>
              </li> -->
              <li class="liveList" v-for="(item,index) in folderList" id="firstFolder" @click="intoFolder(item.id)" v-if="folderID=='1'" :key="index">
                <el-row>
                  <el-col :span="7"  style="margin-left:7%">
                    <!-- <img :src="item.vodCoverUrl" class="llImg"/> -->
                    <img class="lvImg" src="../../common/image/file.png" style="margin-top: 20px;"/>
                  </el-col>
                  <el-col :span="14" class="llWords">
                    <h2>{{item.fileName}}</h2>
                  </el-col>
                </el-row>
              </li>
              <li class="liveList" style="cursor: pointer;" v-for="(item,index) in videoList" :key="item.id" @click="item.ck = !item.ck" :index="'item'+index" v-if="item.vodStatus==1">
                <el-row>
                  <el-col :span="1" class="llRadio">
                    <el-checkbox v-model="item.ck"  @change="clickRadio(index,item.id,item.vodName,item.createTime,'2',item.vodCoverUrl,item.vodStatus,item.watch_num,item.vodPermit)"/>
                    <!-- <input type='radio' :checked="item.ck" v-model="item.ck" @click="clickRadio(index,item.defRoomId,item.vodName,item.createTime,'2',item.vodCoverUrl,item.vodStatus,item.watch_num,item.vodPermit)"> -->
                    <!-- :checked='item.ck' v-model="item.ck" @click="clickRadio(index,item.id)" -->
                    <!-- <el-radio v-model="item.ck" :id="'ck'+item.id" @change="clickRadio(item.id)" ></el-radio> -->
                  </el-col>
                  <el-col :span="6">
                    <!-- <img :src="item.vodCoverUrl" class="llImg"/> -->
                    <img class="lvImg" :src="item.vodCoverUrl"/>
                  </el-col>
                  <el-col :span="14" class="llWords">
                    <h2>{{item.vodName}}</h2>
                    <b>时间：{{item.createTime| filterTime}}</b>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer df">
            <hr/>
            <el-row>
              <el-col :span="12" class="cvTip">
                <router-link to="/main"  v-if="videoTypeWords=='1'">
                <a href="./main">没有合适的视频? 去直播管理添加</a>
                </router-link>
                <router-link to="/videoCenter" v-if="videoTypeWords=='2'">
                <a href="./videoCenter">没有合适的视频? 去点播管理添加</a>
                </router-link>
              </el-col>
              <el-col :span="12">
                 <el-button @click="chooseVideo = false" style="width: 65px;height: 38px;padding: 0;margin:0;border:none;color:#595959;">取 消</el-button>
                 <el-button type="primary" @click="ensureVideo" style="width: 65px;height: 38px;padding: 0;margin:0;">确定</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
          <div style="display:none" id="hiddenContent">
            <h3 class="s_title st_color">梦网科技</h3>
            <div class="detail1 sd_color">
                深圳市梦网科技发展有限公司创建于2001年9月，是一家专业从事移动数据技术综合应用的高新技术企业，是中国信息产业部批准的全网ICP，致力于为广大客户提供基于移动数据技术的行业应用解决方案。
            </div>
            <div class="detail1 s_img">
                <img src="http://vboforetest.facebac.com/public/templates/image/monent.png">
            </div>
            <div class="detail2 sd_color">
                未来，梦网科技致力于成为中国移动数据技术行业应用专家，引领中国商务活动全面进入移动数据时代，推动更多的企事业步入移动信息化的高速之路，为中国众多企事业的发展插上移动信息化的翅膀。同时，梦网科技不断加快移动数据技术海外输出的步伐，致力打造全球性的国际化公司。
            </div>
			     </div>
        <v-footer></v-footer>
        <el-dialog
        :visible.sync="wxDialog1"
        width="420px"
        :before-close="cancleBuy"
        center>
        <b style="font-size:12px;">强制关注需要开通公众号授权,是否前往开通？</b>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goBuy" style="width:75px;height:32px;text-align:center;padding:0;line-height:32px;">前往购买</el-button>
          <el-button @click="cancleBuy" style="width:75px;height:32px;text-align:center;padding:0;line-height:32px;margin-left:20px;border:1px solid #D9D9D9;color:#595959;">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="wxDialog2"
        width="420px"
        :before-close="cancleBuy2"
        center>
        <p style="font-weight:bold;font-size:12px;">开启强制关注后，有被微信拉黑朋友圈、</p>
        <p style="font-weight:bold;font-size:12px;">甚至有被微信封号一段时间的风险，请自行选择。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" style="width: 65px;padding: 0;height: 32px;line-height: 32px;" @click="wxDialog2 = false">确 定</el-button>
        </span>
      </el-dialog>

      
    </div>
</template>
<script>
import VHeader from "@/components/header/header";
import VFooter from "@/components/header/footer";
import MainLeft from "@/components/leftnav/mainLeft";
import TBanner from "@/components/mainPage/banner";
import UploadImg from "@/components/mainPage/uploadImg";
import editor from "@/components/mainPage/editor";
import editors from "@/components/mainPage/editors";
import picPlay from "@/components/mainPage/picPlay";
import {
  setCookies,
  getCookies,
  WX_API_URL,
  VideoH5_URL,
  LIVEH5_URL,
  chargeError,
  copyLink,
  DATA_API_URL
} from "api/config";
import Clipboard from "clipboard";
import {
  getLStorage,
  DATA_URL,
  ERR_OK,
  MW_Live_API_URL,
  facebac_URL
} from "../../api/config";
import { filterStatus } from "api/http";
import axios from "axios";

export default {
  data() {
    return {
        newMenuId:1,
        //判断公众号开关是否开启
    isWxCheck:false,
      myTxt:'',
      //判断是否成功
      mySucc:false,
      //判断是否是预览或者发布
      saveAndpreview:true,
      previewUrl:'',
      saveID:'2',
      //banner有没有图片
      bannerOf:[],
      shiftName: "",
      wxDialog1: false,
      wxDialog2: false,
      isShowNew: 0,
      publicVisible: false,
      showImgType: "1",
      imgsList: [],
      isVideo: 0,
      displayList: [],
      folderList: [],
      folderID: "0",
      isLive: 1,
      liveList: [],
      videoList: [],
      chooseVideo: false,
      test: "tBanner",
      shareImg: "",
      // WXImg:
      //   "http://mwdatatest.facebac.com/1/0/0/6331d3b14dc77e625dc7/d2e6c0ac-c484-41e5-82fb-edcc81ebe8f1.jpg",
      WXImg:'',
      // serviceImg:
      //   "http://mwdatatest.facebac.com/1/0/0/6331d3b14dc77e625dc7/d2e6c0ac-c484-41e5-82fb-edcc81ebe8f1.jpg",
      serviceImg:'',
      srcImg: "",
      Name: "",
      //预览二维码
      preShowDialogVisible: false,
      serviceName: "梦网科技",
      wxName: "梦网云播",
      realshow: "2",
      Title: "",
      activeIndex: "1",
      pageId: "1",
      menuName: "",
      bannerNom: 1,
      content: "",
      scannerShow: false,
      focus: "0",
      Selected: "1",
      bannertemplate: "1",
      pagetemplate: "1",
      checkAllType: "",
      //分享信封字段
      shareTitle: "",
      shareDescrib: "",
      serviceUsing: "0",
      bannerUsing: false,
      shareUsing: "0",
      wxUsing: "0",
      menuList: [],
      pageUrl: "",
      isUpload: 0,
      //token值
      bNo: 0,
      tkInfo: getCookies("token"),
      menuID: "0",
      changeFlag: 1,
      userID: getLStorage("user_id"),
      liveListpageId: "1",
      // liveListpageSize: "100",
      classify: [
        {
          value: "1",
          label: "图文"
        },
        {
          value: "2",
          label: "视频"
        }
      ],
      items: [{ pic_url: "", link_url: "" ,isImg:false}],
      lItems: [],
      getItems: [],
      videoTypeWords: "1",
      flag: 0,
      menuFlag: 0,
      temperaturName: ""
    };
  },
  components: {
    VHeader,
    MainLeft,
    VFooter,
    editor,
    TBanner,
    UploadImg,
    picPlay,
    editors,
    isUpOk:true
  },
  watch: {
    Title: function(val, oldval) {
      //    if(this.Title.length>=8){
      //        this.Title=oldval;
      //    }
    },
    Selected: function(val, oldval) {
      //console.log(val);
      if (val == "1") {
        $("#editText").css("display", "block");
        $("#videoAdd").css("display", "none");
        $("#videoChoose").css("display", "none");
      } else {
        $("#videoChoose").css("display", "block");
        $("#editText").css("display", "none");
        $("#videoAdd").css("display", "block");
      }
    },
    // focus: function(val, oldval) {
    //   // console.log(val);
    //   if (val && this.flag > 0) {
    //     // this.scannerShow = true;
    //     this.$ajaxs.checkWX({ token: this.tkInfo }).then(data => {
    //       console.log(data);
    //       if (data.code == 1) {
    //         this.wxDialog2 = true;
    //       } else {
    //         this.wxDialog1 = true;
    //       }
    //     });
    //   }
    //   this.flag++;
    // },
    // scannerShow: function(val, oldval) {
    //   if (!val) {
    //     if (this.focus) {
    //       this.scannerShow = true;
    //     }
    //   }
    // },
    shareUsing: function(val, oldval) {
      if (val) {
        this.shareUsing = "1";
      } else {
        this.shareUsing = "0";
      }
    },
    serviceName: function(val, oldval) {
        console.log(val,oldval)
      this.Name = val;
    },
    wxName: function(val, oldval) {
      this.Name = val;
    },
    serviceImg: function(val, oldval) {
      this.srcImg = val;
    },
    WXImg: function(val, oldval) {
      this.srcImg = val;
    },
    iterms: function(val, oldval) {
      console.log("here" + val, oldval);
    },
    content: function(val, oldval) {
      $("#showContent").html(val);
    },
    bannerUsing: function(val) {
        console.log(this.items.length)
      if (val) {
        //alert("开");
        // $(".p_img").css("height", "145px");
        if (this.items.length > 0) {
            $(".showContent").css("height","240px");
            $("#picsPlay").show();
        }else{
            $(".showContent").css("height","386px");
        }
        // $(".showContent").css("height","240px");
      } else {
        // alert("关");
        // $(".p_img").css("height", "0px");
        $("#picsPlay").hide();
        $(".showContent").css("height","386px");
      }
    }
  },
  mounted() {
    this.getPageInfo();
    $("#videoChoose").css("display", "none");
    $("#mainHeader").addClass("router-link-active");
    // var params={};
    // this.$ajaxs.getLiveList(params).then(data => {
    //   console.log(data);
    // })
  },
  created() {
    this.getPageInfo();
  },
  filters: {
    filterTime(val) {
      if (!val) {
        let timestamp = Date.parse(new Date());
        // return '立即开始'
        // return setDateTime(timestamp)
        return "暂无直播";
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
    type: function(value) {
      // if(value){
      //     return '直播中'
      // }else{
      //     return '未开始'
      // }
      switch (value) {
        case 0:
          return "预告";
          break;
        case 1:
          return "直播";
          break;
        case 2:
          return "回放";
          break;
        case 3:
          return "直播异常";
          break;
        case 4:
          return "过期";
          break;
        case 5:
          return "回放";
          break;
      }
    },
    type2: function(value) {
      switch (value) {
        case 0:
          return "免费";
          break;
        case 1:
          return "私密";
          break;
        case 2:
          return "付费";
          break;
        case 3:
          return "虚拟门票";
          break;
        case 4:
          return "白名单";
          break;
        default:
          return "免费";
          break;
      }
    },
    type3: function(value) {
      if (value == null) {
        return 0;
      } else {
        return value;
      }
    },
    live_btn: function(value) {
      switch (value) {
        case 0:
          return "v_blue_type";
          break;
        case 1:
          return "v_red_type";
          break;
        case 2:
          return "btn_000";
          break;
        case 3:
          return "off_btn";
          break;
        case 4:
          return "btn_000";
          break;
        case 5:
          return "btn_000";
          break;
      }
    }
  },
  methods: {
    inputFunc(val){
      $("#menusShow li.is-active .menuIteP").text(val);
    },
    force(label){
        if (label == '2') {
        // this.scannerShow = true;
        this.$ajaxs.checkWX({ token: this.tkInfo }).then(data => {
          console.log(data);
          if (data.code == 1) {
            this.wxDialog2 = true;
          } else {
            this.wxDialog1 = true;
          }
        });
      }
    },
    bannerOk(a){
        this.saveID = a;
        $("#pageNameEdit").css("display", "none");
        $("#pageBannerEdit").css("display", "block");
        $("#pContent").css("display", "none");
        $(".shareBack").css("display", "none");
        $(".preview").css("display", "block");
        $(".extraSetting").css("display", "none");
        $("#showContent").css("hide");
    },
    state(n){
        console.log(n)
        this.isUpOk = n;
        console.log(this.items.length)
        if (n) {
            if (this.items.length == 0) {
                $("#showContent").css("height",'386px');
            }
        }else{
            $("#showContent").css("height",'240px');
        }
        
    },
    cancleBuy2() {
      this.wxDialog2 = false;
    //   this.focus = false;
        this.scannerShow = '';
    },
    cancleBuy() {
      this.wxDialog1 = false;
    //   this.focus = false;
        this.scannerShow = '';
    },
    shiftData() {
      //  alert("here");
      if (this.videoTypeWords == "1") {
        console.log("搜索直播");
        this.$nextTick(()=>{
            axios
                .get(
                    DATA_URL +
                    "mwlive/live/get_listbycreatetime.do?user_id=" +
                    this.userID +
                    "&page_index=1" +
                    "&page_size=100" +
                    "&liveName=" +
                    this.shiftName.trim() +
                    "&liveStatus=" +
                    "&timeType=1"
                )
                .then(response => {
                    //  console.log(JSON.stringify(response))
                    if (response.data.code == ERR_OK) {
                    // console.log(JSON.stringify(response.data.data.data_list));
                    var ll = filterStatus(response.data.data.data_list);
                    this.liveList = [];
                    ll.forEach(e => {
                        e["ck"] = 0;
                        this.liveList.push(e)
                    });
                    
                    // this.liveList = ll;
                    console.log(this.liveList)
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        })
        
      } else {
        console.log("搜索点播");
        let paramData = {
          userId: this.userID,
          prom: this.shiftName.trim(),
          page_index: "1",
          page_size: "100"
        };
        this.$ajaxs.selectVodInfoBySearch(paramData).then(res => {
          if (res.code == "200") {
            console.log(res.data.list);
            //this.videoList=res.data.list;
            var vl = res.data.vodList.list;
            if (vl != null) {
              vl.forEach(e => {
                e["ck"] = "1";
              });
              this.videoList = vl;
            }
          }
        });
      }
    },
    goBuy() {
      this.$router.push({
        path: "/mainPage/operateManage"
      });
      this.wxDialog1 = false;
    },
    backToMain() {
      this.$router.push({
        path: "/vbIndex"
      });
    },
    removeLiVideo(index) {
      console.log(this.displayList[index]);
      this.displayList.splice(index, 1);
    },
    moveUpLiVideo(index) {
      if (index == 0) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已经是第一个了"
        });
      } else {
        var i = this.displayList[index];
        this.displayList.splice(index - 1, 1, i, this.displayList[index - 1]);
        this.displayList.splice(Number(index) + 1, 1);
      }
    },
    moveDownLiVideo(index) {
      //  alert(index);
      if (index == this.displayList.length - 1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已经是最后一个了"
        });
      } else {
        var item = this.displayList[index];
        this.displayList.splice(
          Number(index) + 1,
          1,
          this.displayList[Number(index) + 1],
          item
        );
        this.displayList.splice(Number(index), 1);
      }
    },
    setPublic() {
      this.myTxt = 'fabu'
      this.saveAndpreview = true;
      switch (this.saveID) {
        case '1': this.saveBanner();
        break;
        case '2': this.saveMenu();
        break;
        case '3': this.setShareEnvelope();
        break;
        case '4': this.saveWx();
        break;
        case '5': this.serviceSave();
        break;
        default:  
        break;
    }
    if (this.saveID == 4 && this.isWxCheck == true) {
        return
    }
    setTimeout(() => {
        this.pageUrl = getLStorage("pageUrl");
        console.log(this.pageUrl)
        var params = { view_id: this.pageId, user_id: this.userID };
        this.$ajaxs.setPublic(params).then(res => {
            if (res.code == 1) {
                let view_url = res.result.view_url;
                let view_url2 = view_url.substring(1,view_url.length)
                this.pageUrl = facebac_URL + view_url2;
                // this.pageUrl = facebac_URL + res.result.view_url;
                if (this.mySucc) {
                    this.publicVisible = true;
                }
            } else {
                var str = chargeError(data.code);
                if (str == "") {
                    str = data.msg;
                }
                this.$message({
                    showClose: true,
                    type: "error",
                    message: str
                });
            }
        });
            setTimeout(() => {
                this.addRow2();
            }, 500);
    }, 500);
    
      if (this.saveID == 4 || this.saveID == 5 || this.saveID == 3) {
          return
      }
      this.saveTitle('false');
    },
    changeImgType() {
      //alert(this.checkAllType);
      var type = this.checkAllType;
      if (type == "4") {
        var i = 0;
        this.displayList.forEach(e => {
          // console.log(i%3);
          if (i % 3 == 0) {
            e.img_type = "2";
          } else {
            e.img_type = "1";
          }
          i++;
        });
      } else {
        this.displayList.forEach(e => {
          e.img_type = type;
        });
      }
    },
    intoFolder(a) {
      let paramsData = {
        userId: getLStorage("userId"),
        page_index: "1", //this.videoFileList.page.page_no,
        page_size: "" //this.videoFileList.page.page_size
      };
      this.$ajaxs.selectMediaFolderList(paramsData).then(res => {
        if (res.code == 200) {
          console.log(res);
          this.folderList = res.data.list;
          if (a == "0") {
            this.folderID = "1";
          } else {
            this.folderID = "2";
          }

          this.getVideoList(a);
        }
      });
    },
    addViedOfMenu() {
      // $(".is-active").css("background-color","#2B6CFF");
      this.chooseVideo = true;
      this.getLiveList();
      this.getVideoList("0");
      this.isUpload = 0;
      this.folderID = "0";
      this.shiftName = "";
      this.getItems = [];

      if (this.videoList.length > 0) {
        this.videoList.forEach(e => {
          e.img_type = "1";
        });
      }
      this.clickChecked();
    },
    //打开勾选已选择的视频
    clickChecked() {
      var ll = this.liveList;
      var lv = this.videoList;
      this.displayList.forEach(e => {
        console.log(e);
        if (e.video_type == "1") {
          for (var i = 0; i < ll.length; i++) {
            if (ll[i].id == e.live_id) {
              ll[i].ck = true;
            }
          }
        } else {
          for (var j = 0; i < lv.length; i++) {
            if (lv[j].id == e.live_id) {
              lv[j].ck = true;
            }
          }
        }
      });
      this.liveList = ll;
      this.videoList = lv;
      console.log("ll:" + ll);
      console.log("liveList:" + this.liveList);
    },
    clickRadio(
      index,
      id,
      name,
      date,
      vType,
      picUrl,
      vodStatus,
      watchNum,
      permitType,
      item
    ) {
      if (index == null) {
        return;
      }
      if (this.isUpload == "1") {
        var ll = this.liveList;
        var lv = this.videoList;
        if (ll[index].ck == true) {
          for (var p = 0; p < ll.length; p++) {
            if (p != index) {
              this.liveList[p].ck = false;
            }
          }
          this.videoList.forEach(e => {
            e.ck = false;
          });
        } else {
          for (var q = 0; q < lv.length; q++) {
            if (q != index) {
              this.videoList[q].ck = false;
            }
          }
          this.liveList.forEach(e,index => {
            e.ck = false;
          });
        }
      }
      console.log("haha");
    },
    //选取视频按钮
    ensureVideo() {
      var ll = this.liveList;
      var lv = this.videoList;
      if (this.isUpload == 1) {
        ll.forEach(e => {
          if (e.ck == true) {
            console.log(e);
            //console.log(e);
            var getUrl = LIVEH5_URL + "?liveid=" + e.id;
            this.items[this.bNo].link_url = getUrl;
          }
        });
        lv.forEach(e => {
          console.log(e);
          if (e.ck == true) {
            // debugger
            console.log(e);
            this.items[this.bNo].link_url =
              // VideoH5_URL + "?videoid=" + e.defRoomId;
              VideoH5_URL + "?videoid=" + e.id;
          }
        });
      } else {
        console.log(this.liveList);
        console.log(this.displayList);
        var pushList = [];
        this.displayList = [];
        //  debugger
        ll.forEach(e => {
          if (e.ck == true) {
            pushList.push({
              begin_time: e.begin_time,
              img_type: "1",
              live_id: e.id,
              live_title: e.live_name,
              pic_url: e.live_cover_url,
              video_type: "1",
              url: LIVEH5_URL + "?liveid=" + e.id,
              status: e.live_status,
              watchNum: e.watch_num,
              permitType: e.live_permit
            });
          }
        });
        lv.forEach(e => {
          if (e.ck == true) {
            pushList.push({
              begin_time: e.createTime,
              img_type: "1",
              // live_id: e.defRoomId,
              live_id: e.id,
              live_title: e.vodName,
              pic_url: e.vodCoverUrl,
              video_type: "2",
              // url: VideoH5_URL + "?videoid=" + e.defRoomId,
              url: VideoH5_URL + "?videoid=" + e.id,
              status: e.vodPermit,
              watchNum: e.watch_num,
              permitType: e.yunLiveType
            });
          }
        });
        console.log(pushList);
        this.displayList = pushList;
        // if (this.getItems.length > 0) {
        //     var newArr = [];
        //     var gI=this.getItems;
        //     for(var i =0;i<gI.length-1;i++){
        //     　　 if(newArr.indexOf(gI[i]) == -1){
        //     　　　　newArr.push(gI[i]);
        //     　　}
        //     }
        //   newArr.forEach(e => {
        //     this.displayList.push(e);
        //   });
        // } else {
        //   this.$message({
        //     showClose: true,
        //     message: "您还未选择视频呢！",
        //     type: "info"
        //   });
        // }
      }

      this.chooseVideo = false;
    },
    changeIsLive(a) {
      this.isLive = a;
      if (a == 1) {
        $("#liveList").show();
        $("#videoList").hide();
        console.log("我是直播");
        this.videoTypeWords = "1";
      } else {
        $("#liveList").hide();
        $("#videoList").show();
        console.log("我是点播");
        this.videoTypeWords = "2";
      }
    },
    changeCType(a) {
      if (a == "1") {
        this.chooseVideo = true;
        this.isUpload = 1;
        // var liveParams = {user_id:this.userID,page_index:this.liveListpageId,PAGE_SIZE:this.liveListpageSize};//'&page_index=' + val + '&page_size=' + PAGE_SIZE+ '&liveStatus='+'&timeType=1'
        // this.$ajaxs.getLiveList(liveParams).then(data => {
        //   console.log(data);
        // });

        this.getLiveList();
        this.getVideoList("0");
      }
    },
    getLiveList() {
      //console.log(DATA_URL + "mwlive/live/get_listbycreatetime.do?user_id=" + this.userID + "&page_index=" + this.liveListpageId +"&page_size=" + this.liveListpageSize +"&liveStatus=" +"&timeType=1");
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
          if (response.data.code == ERR_OK) {
            // console.log(JSON.stringify(response.data.data.data_list));
            var ll = filterStatus(response.data.data.data_list);
            ll.forEach(e => {
              e["ck"] = false;
            });
            if (this.isUpload == "0") {
              this.displayList.forEach(a => {
                for (var i = 0; i < ll.length; i++) {
                  if (ll[i].id == a.live_id) {
                    ll[i].ck = true;
                    break;
                  }
                }
              });
            }
            this.liveList = ll;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getVideoList(id) {
      let paramData = {
        userId: this.userID,
        // mediaFolderId: id,
        page_index: "1",
        page_size: "100"
      };
      this.$ajaxs.getVideoList2(paramData).then(res => {
        if (res.code == "200") {
          console.log(res.data.list);
          //this.videoList=res.data.list;
          var vl = res.data.list;
          vl.forEach(e => {
            e["ck"] = false;
          });
          if (this.isUpload == "0") {
            this.displayList.forEach(a => {
              for (var i = 0; i < vl.length; i++) {
                // if (vl[i].defRoomId == a.live_id) {
                if (vl[i].id == a.live_id) {
                  vl[i].ck = true;
                  break;
                }
              }
            });
          }
          this.videoList = vl;
        }
      });
    },
    currentBanner(a) {
      this.bNo = a;
    },
    addRow() {
        this.$nextTick(()=>{
            var canvas1 = qrcanvas({
                data:this.previewUrl,
                size: 120
            });
            $("#preShowImg").html("");
            $("#preShowImg").html(canvas1);
        })
    },
    addRow2() {
      console.log(this.pageUrl);
      var canvas = qrcanvas({
        data: this.pageUrl,
        size: 120
      });
      //console.log();
      $("#preShowImg2").html("");
      $("#preShowImg2").html(canvas);
      //document.getElementById("preShowImg").innerHTML = "";
      // document.getElementById("preShowImg").appendChild(canvas);
    },
    showH5() {
      // this.pageUrl = getLStorage("pageUrl");
      this.previewUrl =  WX_API_URL + "index/preview_index?view_id=" +this.pageId +"&user_id=" +this.userID;
      if (this.previewUrl == "") {
        this.$message({
          showClose: true,
          type: "error",
          message: "获取页面失败"
        });
      } else {
          switch (this.saveID) {
            case '1': this.saveBanner();
                        // this.saveMenu();
                break;
            case '2': this.saveMenu();
                break;
            case '3': this.setShareEnvelope();
                break;
            case '4': this.saveWx();
                break;
            case '5': this.serviceSave();
                break;
            default:
                break;
            }
            if (this.saveID == 4  && this.isWxCheck == true) {
                return
            }
        setTimeout(() => {
             let params = {
                    view_id:this.pageId,
                    // user_id:this.userID
                    token:this.tkInfo
                    }
                this.$ajaxs.homepreview(params).then((res)=>{
                    console.log(res)
                    if (res.code == 1) {
                        this.myTxt = 'yulan'
                        this.saveAndpreview = true;
                        if(this.mySucc){
                            this.preShowDialogVisible = true;
                        }
                    }
                })
                setTimeout(() => {
                    this.addRow();
                }, 500);
          
        }, 100);
      }
      if (this.saveID == 4 || this.saveID == 5 || this.saveID == 3) {
          return
      }
      this.saveTitle('false');
    },
    copyLink(url) {
      console.log(url)
      copyLink(url);
      this.$message({
        showClose: true,
        type: "success",
        message: "复制成功"
      });
    },
    preMove(a, b, c) {
      if (c == 0) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已经是第一个了"
        });
      }
      var menus = this.menuList;
      var menuargs = [];
      // console.log(menus.length,a,b,c);
      for (var i = 0; i < menus.length; i++) {
        // debugger
        if (i == c - 1) {
          menuargs.push(
            '{"menu_index":' +
              menus[i].menu_index +
              ',"menu_id":' +
              menus[i + 1].id +
              "}"
          );
          continue;
        }
        if (i == c) {
          menuargs.push(
            '{"menu_index":' +
              menus[i].menu_index +
              ',"menu_id":' +
              menus[i - 1].id +
              "}"
          );
          continue;
        }
        menuargs.push(
          '{"menu_index":' +
            menus[i].menu_index +
            ',"menu_id":' +
            menus[i].id +
            "}"
        );
      }

      // console.log(menuargs);
      var orderParams = {
        token: this.tkInfo,
        page_id: this.pageId,
        menu_args: "[" + menuargs.toString() + "]"
      };
      // console.log(orderParams);
      this.move(orderParams);
    },
    nextMove(a, b, c) {
      if (c >= $(".menuItem").length) {
        this.$message({
          showClose: true,
          type: "error",
          message: "已经是第最后一个了"
        });
      }
      var menus = this.menuList;
      var menuargs = [];
      //console.log(menus.length,a,b,c);
      for (var i = 0; i < menus.length; i++) {
        // debugger
        if (i == c) {
          menuargs.push(
            '{"menu_index":' +
              menus[i].menu_index +
              ',"menu_id":' +
              menus[i + 1].id +
              "}"
          );
          continue;
        }
        if (i == c + 1) {
          menuargs.push(
            '{"menu_index":' +
              menus[i].menu_index +
              ',"menu_id":' +
              menus[i - 1].id +
              "}"
          );
          continue;
        }
        menuargs.push(
          '{"menu_index":' +
            menus[i].menu_index +
            ',"menu_id":' +
            menus[i].id +
            "}"
        );
      }

      //console.log(menuargs);
      var orderParams = {
        token: this.tkInfo,
        page_id: this.pageId,
        menu_args: "[" + menuargs.toString() + "]"
      };
      //console.log(orderParams);
      this.move(orderParams);
      this.saveAndpreview = true;
      this.saveBanner();
    },
    move(orderParams) {
      this.$ajaxs.getMenusOrder(orderParams).then(data => {
        console.log(data);
        if (data.code == 1) {
          this.getPageInfo();
        } else {
          var str = chargeError(data.code);
          if (str == "") {
            str = data.msg;
          }
          this.$message({
            showClose: true,
            type: "error",
            message: str
          });
        }
      });
    },
    picUrlChange(data) {
      console.log("toFather" + data);
      //var No = labelNo.substr(labelNo.length - 1, 1); //labelNo.substr(labelNo.length-1,1)
      this.items[this.bNo].pic_url = data;
      /* 对比后的 */
      this.items[this.bNo].isImg = true;
      this.isUpOk = true;
      this.bannerOf.push(data);

      this.imgsList = [];
        this.items.forEach(e => {
            this.imgsList.push({ img_url: e.pic_url });
        });
    /* end */


      //var labelNo = $(event.target).parents('.b_imageTab').attr("label");//.children(".el-input__inner");
      //console.log(labelNo, "labelNo");
      //if(labelNo==undefined){return;}
      // if (labelNo) {
      //   var No = labelNo.substr(labelNo.length - 1, 1); //labelNo.substr(labelNo.length-1,1)
      //   this.items[No].pic_url = data;
      // }
    },
    saveBanner(fs) {
      //   debugger;
      // console.log(this.bannertemplate, JSON.stringify(this.items));
      // this.items.forEach(e => {
      //   if (e.pic_url == "") {
      //     e.pic_url =
      //       "http://qv.facebac.com/image/2e2398bcba7ce082c7d7/tp28o4cz67yxrzbc7qiy/n_n/b47d95546efa95b84e4dd2d273ec607f.png";
      //   }
      // });

    /* 对比后的 */
    //   this.mySucc = false;
      if (fs) {
          this.saveAndpreview = false;
      }
    //   let off = true;
    //   this.items.forEach((key)=>{
    //       if (!key.isImg) {
    //         off = false;
    //       }
          
    //   })
    //   if (!off) {
    //     this.$alert('有图片未进行更换，需要更换后方可保存',  {
    //         confirmButtonText: '确定',
    //         center: true,
    //         callback: action => {
    //         }
    //       });
    //   }
    // let l2 =  'http://qv.facebac.com/image/2e2398bcba7ce082c7d7/9wyqlg18j32kyrefzcwy/n_n/235dfade932ef4f62a48e913dacc7efa.png'
    // let l = 'http://qv.facebac.com/image/2e2398bcba7ce082c7d7/1lwodrvbnvrox791y3ra/n_n/92494a0f1505120bc641f024c52b8d14.png';
    // let o = true;
    // if (this.items.length == 0) {
    //     this.isUpOk = true;
    // }
    // if (this.isUpOk == false) {
    //     this.$message({
    //         showClose:true,
    //         message: '请等待文件上传完毕',
    //         type:'error' || 'info',
    //         customClass: 'tips-text'
    //     })
    //     return
    // }
    // this.items.forEach((key)=>{
    //     console.log(key.pic_url == l ,'oo')
    //     if (key.pic_url == l || key.pic_url == l2) {
    //         o = false;
    //     }
    // })
    // if (!o) {
    //     this.$message({
    //         showClose:true,
    //         message: '请上传图片完成后再提交！',
    //         type:'error' || 'info',
    //         customClass: 'tips-text'
    //     })
    //     return
    // }
    // end
    //   if (this.items.length == 0) {
    //     this.$message({
    //       showClose: true,
    //       type: "success",
    //       message: "无banner图片，已自动关闭"
    //     });
    //   }
      var isStartBanner = "0";
      if (this.bannerUsing) {
        isStartBanner = "1";
      } else {
        isStartBanner = "0";
      }
      var params = {
        token: this.tkInfo,
        page_id: this.pageId,
        banner_enable: isStartBanner,
        banner_template: this.bannertemplate,
        banner_content: JSON.stringify(this.items)
      };
      //return;
      var that = this;
      $.ajax({
        type: "POST",
        timeout: 120000, //超时时间设置，单位毫秒
        async: false,
        url: DATA_API_URL + "mainpage/set_banner_item",
        data: params,
        dataType: "json",
        success: function(data) {
          if (data.code == 1) {
            if (!that.saveAndpreview) {
                that.$message({
                showClose: true,
                type: "success",
                message: "banner保存成功"
              });
            }
            that.getPageInfo();
            // that.content = "";
            that.mySucc = true;
          } else {
            var str = chargeError(data.code);
            if (str == "") {
              str = data.msg;
            }
            that.$message({
              showClose: true,
              type: "error",
              message: str
            });
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
        }
      });
    },
    getPageInfo(str) {
      var pageId = getCookies("page");
      if (pageId === null || pageId == "") {
        this.$message({
          showClose: true,
          type: "error",
          message: "未找到该页面，请重新获取该页面"
        });
        this.$router.push({
          path: "/main"
        });
      } else {
        //需要添加token为空的判断
        var pageInfo = {
          // token: getCookies("fecbb6e8b4699053"),
          user_id: getLStorage("userId"),
          page_id: pageId
        };
        this.$ajaxs.getMainpageInfo(pageInfo).then(data => {
          this.pageId = pageId;
          //  console.log("here1" + pageInfo);
          // console.log("here2" + JSON.stringify(data));
          if (data.code == 1) {
            this.Title = data.result.page_name;
            this.shareTitle = data.result.page_name;
            this.shareDescrib = data.result.envelope_desc;
            this.items = $.parseJSON(data.result.banner_content);
            this.pagetemplate = data.result.page_template;
            this.changePageStyle(this.pagetemplate);
            //banner

            if (data.result.banner_enable) {
              this.bannerUsing = true;
            //   $(".p_img").css("height", "145px");
                if (data.result.banner_content == '[]') {
                    $("#picsPlay").hide();
                }else{
                    $("#picsPlay").show();
                    $(".showContent").css("height","240px");
                }
            } else {
              this.bannerUsing = false;
            //   $(".p_img").css("height", "0px");
              $("#picsPlay").hide();
              $(".showContent").css("height","386px");
            }
            this.changeLi(data.result.banner_template);
            //菜单
            //this.menuList = data.result.menu_list;

            var menus = data.result.menu_list;
            menus.sort((a, b) => a.menu_index - b.menu_index);
            this.menuList = menus;
            console.log(this.menuList)

            if ( this.menuFlag == 0 && menus.length > 0) { //this.menuFlag == 0 && 保存草稿bug
              console.log(menus[0]);
              this.getMenu(
                menus[0].id,
                menus[0].menu_content,
                menus[0].menu_name,
                menus[0].menu_type,
                menus[0].menu_index
              );
             console.log(menus[0].menu_content)
              this.menuIndex ='item' + menus[0].menu_index
            //   this.activeIndex = 'item' + menus[0].menu_index;
            }
            this.menuFlag++;
            // var menu = "";
            // //// <el-menu-item class="menuItem" index="1">简介</el-menu-item>
            // menus.forEach(e => {
            //   //menu='<li data-v-6bd6a0ea="" role="menuitem" tabindex="0" class="el-menu-item menuItem" label="0" style="border-bottom-color: transparent;">简介</li>';
            //   menu +=
            //     '<li data-v-6bd6a0ea="" role="menuitem" tabindex="' +e.menu_type +'" tabindex="' +e.id +'" class="el-menu-item menuItem" style="border-bottom-color: transparent;">' +e.menu_name +"</li>";
            // });
            // console.log(menu);
            // // menu+='<span class="addMenu" @click="addMenu"><i class="el-icon-plus"></i></span>';
            // // $("#menusShow").prepend(menu);
            // $("#menusShow").html(menu);
            this.imgsList = [];
            //banner图片列表
            this.items.forEach(e => {
              this.imgsList.push({ img_url: e.pic_url });
            });
            //获取banner图的张数
            this.bannerNom = JSON.parse(data.result.banner_content).length;

            //公众号
            if (data.result.wechat_enable) {
              this.wxUsing = true;
            } else {
              this.wxUsing = false;
            }
            if (
              data.result.wechat_name != "" &&
              data.result.wechat_name != null
            ) {
              this.wxName = data.result.wechat_name;
            }

            if (
              data.result.qr_code_url != "" &&
              data.result.qr_code_url != null
            ) {
              this.WXImg = data.result.qr_code_url;
            }
            //is_show_qr公众号是否强制关注
            if (data.result.is_show_qr == 2) {
            //   this.scannerShow = true;
            //   this.focus = true;
              this.scannerShow ='2';
            } else {
              if (data.result.is_show_qr == 1) {
                  this.scannerShow = '1';
                // this.focus = false;
                // this.scannerShow = true;
              } else {
                // this.focus = false;
                // this.scannerShow = false;
                this.scannerShow = '';
              }
            }

            //客服
            if (data.result.service_enable) {
              this.serviceUsing = true;
            } else {
              this.serviceUsing = false;
            }
            this.serviceName = data.result.service_name;
            if (data.result.service_qr_url != null) {
              this.serviceImg = data.result.service_qr_url;
            }

            //分享
            this.shareUsing = data.result.envelope_enable;
            if (
              data.result.envelope_logo_url != null &&
              data.result.envelope_logo_url != ""
            ) {
              this.shareImg = data.result.envelope_logo_url;
            }
            if (
              data.result.envelope_name != null &&
              data.result.envelope_name != ""
            ) {
              this.shareTitle = data.result.envelope_name;
            }
            if (
              data.result.envelope_desc != null &&
              data.result.envelope_desc != ""
            ) {
              this.shareDescrib = data.result.envelope_desc;
            }
            this.pagetemplate = data.result.page_template;
          } else {
            var str = chargeError(data.code);
            if (str == "") {
              str = data.msg;
            }
            this.$message({
              showClose: true,
              type: "error",
              message: str
            });
          }
        });
      }
    },
    changePageStyle(a) {
      if (a == 1) {
        $(".p_menu ul").css("background-color", "#fff");
        $(".showContent").css("background-color", "#fff");
        $(".showContent").css("color", "#303133");
        $(".addMenu").css("color", "#cccccc");
        $(".menuIteP").css("color", "#909399");
        $(".showContentli.el-menu-item.is-active").css(
          "border-bottom",
          "4px solid #cccccc"
        );
        $(".showContentli.el-menu-item.is-active").css("color", "#cccccc");
        $(".p_menu li").css("background-color", "#fff");
        $("#picsPlay").css("background-color", "#fff");
        // $(".is-active").css("background-color", "#fff");
        console.log("更换模板1");
      } else {
        $(".p_menu ul").css("background-color", "#121134");
        $(".showContent").css("background-color", "#121134");
        $(".showContent").css("color", "#ffffff");
        $(".addMenu").css("color", "#ffffff");
        $(".menuIteP").css("color", "#ffffff");
        $(".showContentli.el-menu-item.is-active").css(
          "border-bottom",
          "4px solid #FFFFFF"
        );
        $(".showContentli.el-menu-item.is-active").css("color", "#ffffff");
        $("#menusShow li").css("background-color", "#121134");
        $("#picsPlay").css("background-color", "#121134");
        console.log("更换模板2");
      }
      // 默认菜单
  
      if( this.menuFlag == '1'){
          // 默认菜单
        $("#menusShow li:first").click();
      }
      
    },
    showPageEdit(index) {
      switch (index) {
        case "1":
          $("#pageNameEdit").css("display", "block");
          $("#pageBannerEdit").css("display", "none");
          $("#pContent").css("display", "none");
          $(".shareBack").css("display", "none");
          $(".preview").css("display", "block");
          break;
        case "2":
          $("#pageNameEdit").css("display", "none");
          $("#pageBannerEdit").css("display", "block");
          $("#pContent").css("display", "none");
          $(".shareBack").css("display", "none");
          $(".preview").css("display", "block");
          // $("#showContent").css("display", "none");
          break;
        case "3":
          break;
        case "4":
          break;
      }
    },
    changeLi(i) {
      this.showImgType = i;
      this.bannertemplate = i;
      if (i == "1") {
        $("#banner2").removeClass("active");
        $("#banner1").addClass("active");
        $("#bannerDetail").addClass("Info");
        $("#bannerDetail").removeClass("Info2");
      } else {
        $("#banner1").removeClass("active");
        $("#banner2").addClass("active");
        $("#bannerDetail").addClass("Info2");
        $("#bannerDetail").removeClass("Info");
      }
    },
    fromChild(data) {
      // console.log(data);
      /*
        1.banner
        2.菜单
        3.分享信封
        4.公众号设置
        5.客服设置
      */
      this.saveID = data;
      switch (data) {
        case "1":
          $("#pageNameEdit").css("display", "none");
          $("#pageBannerEdit").css("display", "block");
          $("#pContent").css("display", "none");
          $(".shareBack").css("display", "none");
          $(".preview").css("display", "block");
          $(".extraSetting").css("display", "none");
          $("#showContent").css("hide");
          break;
        case "2":
          $("#pageNameEdit").css("display", "none");
          $("#pageBannerEdit").css("display", "none");
          $("#pContent").css("display", "block");
          $(".shareBack").css("display", "none");
          $(".preview").css("display", "block");
          $(".extraSetting").css("display", "none");
          $("#showContent").css("show");
          break;
        case "3":
          $(".shareBack").css("display", "block");
          $(".preview").css("display", "none");
          $(".extraSetting").css("display", "none");
          $("#showContent").css("hide");
          break;
        case "4":
          this.srcImg = this.WXImg;
          this.Name = this.wxName;
          $("#WXImg").show();
          $("#serviceImg").hide();
          $(".extraSetting").css("display", "block");
          $(".shareBack").css("display", "none");
          $(".preview").css("display", "none");
          $(".wxInfo").css("display", "block");
          $(".serviceInfo").css("display", "none");
          $("#showContent").css("hide");
          break;
        case "5":
          this.srcImg = this.serviceImg;
          this.Name = this.serviceName;
          $("#WXImg").hide();
          $("#serviceImg").show();
          $(".extraSetting").css("display", "block");
          $(".shareBack").css("display", "none");
          $(".preview").css("display", "none");
          $(".wxInfo").hide();
          $(".serviceInfo").show();
          $("#showContent").css("hide");
          break;
        //直接调用后台设定模板的接口
        case "6":
          this.changePageTemp(1);
          break;
        case "7":
          this.changePageTemp(2);
          break;
      }
    },
    changePageTemp(a) {
      if (a == this.pagetemplate) {
        this.$message({
          showClose: true,
          type: "error",
          message: "无法更换，现在已经是该模板"
        });
        return;
      }
      if (this.changeFlag == 1) {
        if (a == 1) {
          var params = {
            token: this.tkInfo,
            page_id: this.pageId,
            page_template: "1"
          };
        } else {
          var params = {
            token: this.tkInfo,
            page_id: this.pageId,
            page_template: "2"
          };
        }
        this.$ajaxs.changePageTemplate(params).then(data => {
          if (data.code == 1) {
            this.$message({
              showClose: true,
              type: "success",
              message: "更换模板成功"
            });
            this.pagetemplate = params.page_template;
            this.changePageStyle(params.page_template);
          } else {
            var str = chargeError(data.code);
            if (str == "") {
              str = data.msg;
            }
            this.$message({
              showClose: true,
              type: "error",
              message: str
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "请稍等，正在更换模板"
        });
      }
    },
    deleteBanner(a) {
      var labelNo = $(event.target)
        .parents()
        .attr("label"); //.children(".el-input__inner");
      var No = labelNo.substr(labelNo.length - 1, 1); //labelNo.substr(labelNo.length-1,1)
      console.log(No);
      console.log(this.items, "---");
      // debugger;
      switch (a.id) {
        case 1:
          console.log(this.items);
          this.items.splice(No, 1);
          this.imgsList.splice(No,1);
          this.bannerNom--;
          console.log(this.items)
          if (this.items.length == 0) {
              this.$nextTick(()=>{
                  $("#showContent").css("height",'386px');
              })
          }
          //console.log(JSON.stringify(this.items) + a);
          break;
        case 2: //上移
          if (No == "0") {
            alert("到达最顶部了");
            break;
          }
          //console.log(this.getItemByNo(No - 1));
          var item = { pic_url: a.picUrl, link_url: a.linkUrl };
          // console.log(item, "item");
          // console.log(this.getItemByNo(No - 1), "getItemByNo");
          this.items.splice(No - 1, 1, item, this.getItemByNo(No - 1));
          this.items.splice(Number(No) + 1, 1);
          //  console.log(this.items, "===");
          break;
        case 3: //下移
          //var parentsDiv = $(event.target).parents(".b_imageTabs");
          if (No == this.bannerNom - 1) {
            alert("到达最底部了");
            break;
          }
          var item = { pic_url: a.picUrl, link_url: a.linkUrl };
          this.items.splice(
            Number(No) + 1,
            1,
            this.getItemByNo(Number(No) + 1),
            item
          );
          this.items.splice(Number(No), 1);
          break;
        case 5: //更改跳转链接
          break;
      }
    },
    //删除菜单
    deleteMenu(id) {
      if (this.menuList.length <= 1) {
        this.$alert(
          '<strong style="color:#000000;font-weight: 400;">仅有一项菜单时不可删除</strong>',
          {
            confirmButtonText: "确定",
            center: true,
            dangerouslyUseHTMLString: true,
            customClass:'alertClass',
            callback: action => {}
          }
        );
        return;
      }
      if (id != "-1") {
        this.menuID = id;
      }
      if (this.menuID == "0") {
        this.$message({
          showClose: true,
          type: "error",
          message: "请先选择菜单"
        });
      } else {
          console.log(this.menuList)
          let that = this
          const h = this.$createElement;
          this.$msgbox({
        //   title: '消息',
          message: h('p', null, '确定删除此菜单？'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass:'cellCL',
          center:true,
          beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                  var params = {
                        token: that.tkInfo,
                        page_id: that.pageId,
                        menu_id: that.menuID,
                        menu_index: that.menuIndex.toString() //需要删除的字段
                        };
                        console.log(params);
                        that.$ajaxs.deleteMenu(params).then(data => {
                        if (data.code == 1) {
                            that.$message({
                            showClose: true,
                            type: "success",
                            message: "删除成功"
                            });

                            // this.isShowNew = 1;
                            // this.menuEditShow();
                            // this.menuID = "0";
                            // $("#showContent").html("");
                            // this.menuName = "";
                            // this.Selected == "1";
                            // this.displayList = [];
                            // this.getItems = [];
                            // this.folderID = "0";
                            // this.content = "";
                            
                            // if (this.Selected == 1) {
                            //     this.menuName = "图文";
                            // } else {
                            //     this.menuName = "视频";
                            // }
                            that.addMenu();
                            that.getPageInfo();
                            done()
                        } else {
                            var str = chargeError(data.code);
                            if (str == "") {
                            str = data.msg;
                            }
                            that.$message({
                            showClose: true,
                            type: "error",
                            message: str
                            });
                        }
                    });
              }else{
                  done();
              }
          }})
        //   this.$alert(
        //   '<strong style="color:#000000">确定删除？</strong>',
        //   {
        //     confirmButtonText: "确定",
        //     showConfirmButton:true,
        //     center: true,
        //     dangerouslyUseHTMLString: true,
        //     callback: action => {
        //         var params = {
        //         token: that.tkInfo,
        //         page_id: that.pageId,
        //         menu_id: that.menuID,
        //         menu_index: that.menuIndex.toString() //需要删除的字段
        //         };
        //         console.log(params);
        //         that.$ajaxs.deleteMenu(params).then(data => {
        //         if (data.code == 1) {
        //             that.$message({
        //             showClose: true,
        //             type: "success",
        //             message: "删除成功"
        //             });
        //             that.addMenu();
        //             that.getPageInfo();
        //         } else {
        //             var str = chargeError(data.code);
        //             if (str == "") {
        //             str = data.msg;
        //             }
        //             that.$message({
        //             showClose: true,
        //             type: "error",
        //             message: str
        //             });
        //         }
        //         });

        //     }
        //   }
        // );
        
      }
      //   console.log("删除菜单栏");
    },
    getMenu(mId, mContent, mName, mtype, mIndex) {
      this.isShowNew = 0;
      $("#showContent").show();
    //   console.log("show", mId, mContent, mName, mtype, mIndex);
      this.menuID = mId.toString();
      this.menuIndex = mIndex;
      this.menuName = mName;
      this.menuEditShow();
      if (mtype == 0) {
        this.isVideo = 0;
        this.Selected = "1";
        this.displayList=[];
        console.log(mContent);
        if (mContent == "") {
          var htmlStr = $("#hiddenContent").html();
          mContent = htmlStr;
        }
        this.content = mContent;
        $("#showContent").html(mContent);
      } else {
        this.content = "";
        this.isVideo = 1;
        this.Selected = "2";
        // if (mId > 1000) {
            var vl = $.parseJSON(mContent);
            vl.forEach(e => {
            e["img_type"] = e.img_type;
            });
            this.displayList = vl;
        // }else{
        //     this.displayList = [];
        // }
        
      }
      $("#menusShow li:nth-child("+ mIndex +") .menuIteP").text(this.menuName );
    },
    getItemByNo(No) {
      var iterms = this.items;
      for (var i = 0, l = iterms.length; i < l; i++) {
        if (i == No) {
          return iterms[i];
        }
      }
    },
    addMenu(t) {
      this.isShowNew = 1;
      this.menuEditShow();
      this.menuID = "0";
      $("#showContent").html("");
      this.menuName = "";
      this.Selected == "1";
      this.displayList = [];
      this.getItems = [];
      this.folderID = "0";
      this.content = "";
      var _num = '';

      if (this.Selected == 1) {
        this.menuName = "图文";
        _num = 0;
      } else {
        this.menuName = "视频";
        _num = 1;
      }
    //   if (t == true) {
    //       return
    //   }
    //   this.menuID = this.menuID == 1 ? 1:this.menuID++;
    //   this.$prompt('请输入新菜单名', '',{
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       inputPattern:'',
    //       inputErrorMessage: ''
    //     }).then(({ value }) => {
    //         var newList = {
    //             create_time:new Date(),
    //             id:this.newMenuId,
    //             menu_content:"",
    //             menu_index:this.menuList.length+1,
    //             menu_name:value,
    //             menu_type:_num,
    //             page_id:"155843",
    //             flag:true
    //         }
    //         console.log(this.menuList)
    //         this.menuName = value;
    //         this.menuList.push(newList)
    //         this.activeIndex = 'item' + this.menuList.length;
    //     }).catch(() => {

    //     })  
      
      
      //alert($(".menuItem").length);
    },
    menuEditShow() {
      $("#pageNameEdit").css("display", "none");
      $("#pageBannerEdit").css("display", "none");
      $("#pContent").css("display", "block");
      $(".shareBack").css("display", "none");
      $(".preview").css("display", "block");
      $(".extraSetting").css("display", "none");
    },
    saveMenu(fs) {
      //临时添加判断
      this.mySucc = false;
      if (fs) {
        this.saveAndpreview = false;
      }
      if (this.menuName == "") {
        this.$message({
          showClose: true,
          type: "error",
          message: "请输入菜单名"
        });
        return;
      }
      var mType = "0";
      if (this.Selected == "2") {
        mType = "1";
      }
      var sendContent = "";
      if (this.isUpload == 0 && this.Selected == "2") {
        var finalList = [];
        this.displayList.forEach(e => {
          finalList.push({
            begin_time: e.begin_time,
            img_type: e.img_type,
            live_id: e.live_id,
            live_title: e.live_title,
            pic_url: e.pic_url,
            video_type: e.video_type,
            url: e.url,
            status: e.status,
            watchNum: e.watchNum,
            permitType: e.permitType
          });
        });
        sendContent = JSON.stringify(finalList);
      } else {
        // sendContent = this.content;
        var str = this.content.replace(/\s/g,'&nbsp;')
        sendContent = str.replace(/<img&nbsp;/g,'<img ');
        this.content = sendContent;

      }
    //   var str = JSON.stringify(this.items).replace(/\s/ig,'&nbsp');
    //   console.log(str)
    //   console.log("select" + this.Selected + sendContent);
    //   var mIndex = $(".menuItem").length;
      var mIndex = $(".menuItem").length + 1;
      var params = {
        token: this.tkInfo,
        menu_id: this.menuID,
        menu_name: this.menuName,
        menu_type: mType,
        menu_content: sendContent
      };
      if (this.Selected == "1") {
        if (this.content == "") {
          this.$message({
            showClose: true,
            type: "info",
            message: "请添加图文内容"
          });
          return;
        }
      } else {
        if (this.displayList.length == 0) {
          this.$message({
            showClose: true,
            type: "info",
            message: "请添加视频内容"
          });
          return;
        }
      }
      if (this.menuID != "0") {
        let that = this;
        $.ajax({
          type: "POST",
          timeout: 120000, //超时时间设置，单位毫秒
          async: false,
          url: DATA_API_URL + "mainpage/mod_menu",
          data: params,
          dataType: "json",
          success: function(data) {
            if (data.code == "1") {
              if (!that.saveAndpreview) {
                  that.$message({
                  showClose: true,
                  type: "success",
                  message: "保存成功"
                });
              }
              //  this.tipsMessage('修改成功','success')
              // that.addMenu();
              setTimeout(() => {
                  that.getPageInfo("save")
              }, 500);
            
              
              that.mySucc = true;
              //  that.content = "";
            } else {
              var str = chargeError(data.code);
              if (str == "") {
                str = data.msg;
              }
              that.$message({
                showClose: true,
                type: "error",
                message: str
              });
              // this.tipsMessage(str,'error')
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
          }
        });
        return;
      } else {
        //添加菜单判断
        var ml = $(".menuItem").length;
        if (ml >= 10) {
          this.$message({
            showClose: true,
            type: "error",
            message: "最多只能设置十项"
          });
        } else {
          var params2 = {
            token: this.tkInfo,
            page_id: this.pageId,
            menu_name: this.menuName,
            menu_type: mType,
            menu_content: sendContent,
            menu_index: mIndex.toString()
          };
          console.log(params2);
          let that = this;
          $.ajax({
            type: "POST",
            timeout: 120000, //超时时间设置，单位毫秒
            async: false,
            url: DATA_API_URL + "mainpage/new_menu",
            data: params2,
            dataType: "json",
            success: function(data) {
              if (data.code == "1") {
                if (!that.saveAndpreview) {
                    that.$message({
                    showClose: true,
                    type: "success",
                    message: "添加成功"
                  });
                }
                // that.addMenu();
                
                that.getPageInfo();
                that.menuID = data.result;
                that.mySucc = true;
                // that.getMenu(data.result,sendContent,that.menuName,mType,params2.menu_index);
              } else {
                var str = chargeError(data.code);
                if (str == "") {
                  str = data.msg;
                }
                that.$message({
                  showClose: true,
                  type: "error",
                  message: str
                });
              }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest);
            }
          });
        }
      }
    },
    saveTitle(fs) {
      var modifyParams = {
        token: this.tkInfo, //getCookie("fecbb6e8b4699053"),
        page_id: this.pageId,
        page_name: this.Title
      };
      console.log(fs);
      let that = this;
      $.ajax({
        type: "POST",
        timeout: 120000, //超时时间设置，单位毫秒
        async: false,
        url: DATA_API_URL + "mainpage/mod_page_name",
        data: modifyParams,
        dataType: "json",
        success: function(data) {
          if (data.code == "1") {
              if (fs) {
                  
              }else{
                  that.$message({
                    showClose: true,
                    type: "success",
                    message: "保存成功"
                    });
              }
            
            that.getPageInfo();
          } else {
            var str = chargeError(data.code);
            if (str == "") {
              str = data.msg;
            }
            that.$message({
              showClose: true,
              type: "error",
              message: str
            });
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
        }
      });
    },
    addBackImage() {
      //console.log(this.bannerNom);
      var bannerNo = this.bannerNom;
      bannerNo++;
      if (bannerNo > 5) {
        this.$message({
          showClose: true,
          type: "error",
          message: "最多只能添加5张背景图"
        });
      } else {
        //$("#banner" + bannerNo).css("display", "block");
        var arr = {
          pic_url:
            "http://qv.facebac.com/image/2e2398bcba7ce082c7d7/1lwodrvbnvrox791y3ra/n_n/92494a0f1505120bc641f024c52b8d14.png",
          link_url: "",
          isImg:false
        };
          this.items.push(arr);
        this.bannerNom = bannerNo;
        $("#bannerDetail").animate({scrollTop:288+9999}, 'fast');
      }
    },
    getImgUrl(a) {
      console.log("image Url:" + a);
      this.shareImg = a;
    },
    getImgUrl2(a) {
      console.log("image Url2:" + a);
      this.WXImg = a;
    },
    getImgUrl3(a) {
      console.log("客服二维码" + a);
      this.serviceImg = a;
    },
    //分享信封设置
    setShareEnvelope(fs) {
      this.mySucc = false;
      if (fs) {
        this.saveAndpreview = false
      }else{
          this.saveAndpreview = true;
      }
      this.shareDescrib = this.shareDescrib == null ? '' : this.shareDescrib
      var sharEn = {
        token: this.tkInfo,
        page_id: getCookies("page"),
        envelope_enable: "1",
        envelope_name: this.shareTitle,
        envelope_desc: this.shareDescrib,
        envelope_logo_url: this.shareImg
      };
      console.log(sharEn);
      // if (this.shareTitle == "" || this.shareDescrib == "") {
      //   this.$message({
      //     showClose: true,
      //     type: "Info",
      //     message: "请将信息填写完整"
      //   });
      //   return;
      // }
      let that = this;
      $.ajax({
        type: "POST",
        timeout: 120000, //超时时间设置，单位毫秒
        async: false,
        url: DATA_API_URL + "mainpage/set_envelope",
        data: sharEn,
        dataType: "json",
        success: function(data) {
          if (data.code == 1) {
            if (!that.saveAndpreview) {
                that.$message({
                showClose: true,
                type: "success",
                message: "保存成功"
              });
            }
            // console.log(data);
            // that.$message({
            //   showClose: true,
            //   type: "success",
            //   message: "保存成功"
            // });
            that.mySucc = true;
          } else {
            var str = chargeError(data.code);
            if (str == "") {
              str = data.msg;
            }
            that.$message({
              showClose: true,
              type: "error",
              message: str
            });
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
        }
      });
    },
    //公众号设置
    saveWx(fs) {
      var isShow = "0";
      var isTrue = true;
      this.mySucc = false;
      if (fs) {
          this.saveAndpreview = false;
      }else{
          this.saveAndpreview = true;
      }
      if (this.wxUsing) {
          if ( this.WXImg == '' || this.WXImg == null) {
            
            isTrue = false;
        }
      }
      if (!isTrue) {
          this.isWxCheck = true;
          this.$message({
            showClose: true,
            type: "error",
            message: "请上传二维码"
        });
        return
      }else{
          this.isWxCheck = false;
      }
      
      if (this.scannerShow == '2') {
        isShow = "2";
        this.$ajaxs.checkWX({ token: this.tkInfo }).then(data => {
          console.log(data);
          if (data.code == 1) {
            console.log(data);
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "开通微信授权后，才可设置强制关注"
            });
            console.log(data.msg);
            return;
          }
        });
      } else {
        if (!this.scannerShow) {
          isShow = "0";
        } else {
          isShow = "1";
        }
      }
      var wxEnable = "0";
      console.log(this.wxUsing)
      if (this.wxUsing) {
        wxEnable = "1";
      }
      var wxParams = {
        token: this.tkInfo,
        page_id: getCookies("page"),
        wechat_enable: wxEnable,
        wechat_name: this.wxName,
        qr_code_url: this.WXImg,
        is_show_qr: isShow
      };
      console.log(wxParams);
      this.$ajaxs.setWX(wxParams).then(data => {
        console.log(data);
        if (data.code == 1) {
          if (!this.saveAndpreview) {
              this.$message({
              showClose: true,
              type: "success",
              message: "保存成功"
            });
          }else{
              if (this.myTxt == 'fabu') {
                this.publicVisible = true;
            }
            if (this.myTxt == 'yulan') {
                this.preShowDialogVisible = true;
            }
          }
          
          // this.mySucc = true;
          this.myTxt = '';
        } else {
          var str = chargeError(data.code);
          if (str == "") {
            str = data.msg;
          }
          this.$message({
            showClose: true,
            type: "error",
            message: str
          });
        }
      });
    },
    //客服设置
    serviceSave(fs) {
      this.mySucc = false;
      let isTrue = true;
      let wxTrue = true;
      let nameTrue = true;
      if (fs) {
        this.saveAndpreview = false;
      }else{
          this.saveAndpreview = true
      }
      this.serviceName = this.serviceName == null ? '' : this.serviceName;
      if (this.serviceUsing) {
          if (this.serviceName == "" || this.serviceName == null) {
              isTrue = false;
              nameTrue = false;
          }
          if (this.serviceImg == '' || this.serviceImg == null) {
              isTrue = false;
              wxTrue = false;
          }
      }
      if (!isTrue) {
          if (!nameTrue) {
              this.$message({
                showClose: true,
                type: "error",
                message: "请输入客服名称"
            });
          }
          if (!wxTrue) {
              this.$message({
                showClose: true,
                type: "error",
                message: "请上传二维码"
            });
          }
            return;
      }
      var serEnable = "0";
      if (this.serviceUsing) {
        serEnable = "1";
      }
      var serviceP = {
        token: this.tkInfo,
        page_id: getCookies("page"),
        service_enable: serEnable,
        service_name: this.serviceName,
        service_qr_url: this.serviceImg
      };
      console.log(serviceP);

      let that = this;
      $.ajax({
        type: "POST",
        timeout: 120000, //超时时间设置，单位毫秒
        async: false,
        url: DATA_API_URL + "mainpage/set_service",
        data: serviceP,
        dataType: "json",
        success: function(data) {
          if (data.code == 1) {
            if (!that.saveAndpreview) {
                that.$message({
                showClose: true,
                type: "success",
                message: "保存成功"
              });
            }
            that.mySucc = true;
          } else {
            var str = chargeError(data.code);
            if (str == "") {
              str = data.msg;
            }
            that.$message({
              showClose: true,
              type: "error",
              message: str
            });
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
        }
      });
    }
  }
};
</script>
<style scoped>
.backToMain {
  cursor: pointer;
}
.newMenuHover {
  /* border: 1px solid #4285f4;
  background-color: #4285f4; */
  background-color: #fff;
  color: rgb(144, 147, 153);
  font-size: 14px;
}
.deleteMenuIcon {
  display: none !important;
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  float: right;
  background: url(../../common/image/closeIcon.png) no-repeat;
  right: 0;
  height: 15px;
  width: 15px;
  top: 0;;
}
.menuItem:hover .deleteMenuIcon {
  display: block !important;
}
#cpLink {
  background: #fff;
  border: 1px solid #d6d8d9;
  height: 32px;
  border-radius: 2px;
  width: 290px;
  color: #333;
}
.dlTips {
  font-weight: bolder;
  margin-top: 20px;
}
.blue_btn {
  width: 70px;
  position: absolute;
  right: 19px;
  height: 32px;
  background-color: #f2f2f2 !important;
  color: #000000;
  border: 1px solid #d9d9d9;
}
#liveList {
  height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
}
#selectVideoShow {
  margin-top: 20px;
}
.llWords {
  height: 100px;
  margin-left: 20px;
}
.llWords2 {
  height: 100px;
}
.llWords h2,
.llWords2 h2 {
  width: 54.16667%;
  position: absolute;
  top: -40px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.llWords b,
.llWords2 b {
  position: absolute;
  top: 10px;
  font-size: 12px;
  color: #9b9b9b;
}
.llRadio {
  margin-left: 20px;
}
.lvImg {
  width: 150px;
  height: 80px;
  float: left;
  margin: 6px;
  border-radius: 5px;
  margin-top: 10px;
}
.llImg {
  width: 178px;
  height: 100px;
  float: left;
  margin-top: 10px;
  border-radius: 5px;
}
#videoList {
  height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
}
.videoList {
  width: 100%;
  background: #fcfcfc;
  margin: 10px 0px;
  height: 100px;
  line-height: 100px;
  border: 1px solid#E5E5E5;
  border-radius: 2px;
  float: left;
}
.liveList {
  width: 95%;
  background: #fcfcfc;
  margin: 10px;
  height: 120px;
  line-height: 120px;
  border: 1px solid#E5E5E5;
  border-radius: 2px;
}
.cvTip {
  margin-top: 10px;
}
.df a {
  float: left;
  color: #4285f4;
  text-decoration: underline;
}
.chooseVideo .el-dialog__title {
  color: #333333;
  font-weight: bold;
}
.chooseVideo hr {
  position: relative;
  top: -20px;
  border: 1px solid #f2f2f2;
  margin: 0;
}
.sameRow {
  display: inline;
  margin-left: 10px;
}
.videoOrder {
  margin-bottom: 23px;
}
.el-checkbox-group {
  margin-left: 20px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  font-weight: bold;
  border-bottom: 5px solid #262626;
}
#preShowImg,
#preShowImg2 {
  margin: 20px auto 10px auto;
  width: 120px;
  height: 120px;
  /* border: 1px solid #e5e5e5; */
  padding: 10px;
  /* border-radius: 8px; */
}
.Margintop {
  margin-top: 10px;
}
.Margintopa {
  color: #4285f4;
}
.Marginb {
  margin-bottom: 10px;
}
.fourCorner {
  /* background: linear-gradient(to left, #5870f8, #56a8f9) left top no-repeat,
    linear-gradient(to bottom, #5870f8, #56a8f9) left top no-repeat,
    linear-gradient(to left, #5870f8, #56a8f9) right top no-repeat,
    linear-gradient(to bottom, #5870f8, #56a8f9) right top no-repeat,
    linear-gradient(to left, #5870f8, #56a8f9) left bottom no-repeat,
    linear-gradient(to bottom, #5870f8, #56a8f9) left bottom no-repeat,
    linear-gradient(to left, #5870f8, #56a8f9) right bottom no-repeat,
    linear-gradient(to left, #5870f8, #56a8f9) right bottom no-repeat;
  background-size: 5px 25px, 25px 5px, 5px 25px, 25px 5px; */
  border: 1px #4285f4 solid;
}
.centerPanel {
  width: 1160px;
  margin: 0 auto;
}
.menuItem .moveTop {
  display: none !important;
  position: absolute;
  float: left;
  background: url(../../common/image/leftIcon.png) no-repeat;
  left: 2px;
  height: 15px;
  width: 15px;
  background-size: 100% 100%;
  top: 50%;
  margin-top: -5px;

}
.menuItem .moveBottom {
  display: none !important;
  position: absolute;
  background: url(../../common/image/rightIcon.png) no-repeat;
  right: 0;
  height: 15px;
  width: 15px;
  top: 50%;
  margin-top:-5px;
}
.menuItem:hover {
  position: relative;
  /*top: -15px;*/
  overflow: hidden;
}
.menuItem:hover .moveTop {
  display: block !important;
}
.menuItem:hover .moveBottom {
  display: block !important;
}
.menuItem:hover .menuIteP {
  /* left: -10px; */
  overflow: inherit;
}
.menuIteP {
  position: relative;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.mainList {
  background-color: #fff;
  border-radius: 5px;
  margin-top: 2rem;
  padding: 3rem;
  padding-top: 2rem;
  font-size: 1.8rem;
  height: 75rem;
}
/*删除菜单内容*/
/* .videoList */
.deleteLiVideo {
  display: none !important;
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  right: -10px;
  float: right;
  top: -8px;
  color: #bbb;
  background: #fff;
  border-radius: 50%;
}
.moveUpLiVideoStyle {
  display: none !important;
  position: relative;
  top: -5px;
  left: 210px;
  background: url("../../common/image/upIcon.png") no-repeat;
  height: 15px;
  width: 15px;
  z-index: 999;
}
.moveDownLiVideo {
  display: none !important;
  position: relative;
  float: left;
  top: -25px;
  left: 210px;
  background: url("../../common/image/downIcon.png") no-repeat;
  height: 15px;
  width: 15px;
  z-index: 999;
}
/* .videoList:hover{
  overflow: hidden;
} */
.videoList:hover .deleteLiVideo {
  display: block !important;
}
.videoList:hover .moveUpLiVideoStyle {
  display: block !important;
}
.videoList:hover .moveDownLiVideo {
  display: block !important;
}
.videoList:hover .videoDetail {
  top: -15px;
}
.mainList {
  height: 70rem;
}
.mainList hr {
  margin-top: 2rem;
  border: 1px solid #f2f2f2;
  margin: 0;
  padding: 0;
}
.editTitle h2 {
  float: left;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  width: 500px;
}
.editTitle button {
  float: right;
  margin-top: 5px;
}
.editNav {
  margin-top: 32px;
}
/* .editMain {
  margin-top: 50px;
} */
.edit {
  position: absolute;
  left: 300px;
  top: -90px;
  padding: 15px;
  min-height: 600px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  width: 510px;
  margin-left: 20px;
  font-size: 12px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 5;
}
.edit:before {
  right: 100%;
  top: 20px;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: transparent;
  border-right-color: #e5e5e5;
  border-width: 7px;
  margin-top: -7px;
}
.preview {
  padding-top: 76px;
  /*padding-bottom: 80px;*/
  background: url("../../common/image/phoneFrame.png") no-repeat;
  /*height: 65.4rem;
  width: 32.1rem;
  margin-left: 16px;*/
  width: 320px;
  height: 654px;
  background-size: 100%;
}
.phone-inner {
  margin: 0 auto;
  width: 280px;
  height: 490px;
}
.extraSetting {
  background: url("../../common/image/phoneFrame.png") no-repeat;
  height: 65.4rem;
  width: 32.1rem;
  /*margin-left: 96px;*/
}
.extraBackground {
  background: url("../../common/image/mainPageBackground.png") no-repeat;
  width: 285px;
  height: 495px;
  background-size: 100%;
  position: relative;
  top: 77px;
  left: 17px;
}
.shareBackground {
  background: url("../../common/image/shareBack.png") no-repeat;
  width: 285px;
  height: 495px;
  background-size: 100%;
  position: relative;
  top: 77px;
  left: 17px;
}
.extraShow {
  position: relative;
  top: 179px;
  left: 105px;
}
.extraShow p {
  font-size: 15px;
  font-weight: bold;
  margin-left: 7px;
  width: 80px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.extraShow img {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 42px;
}
.editMain hr {
  margin-top: 2rem;
}
.shareBack {
  background: url("../../common/image/phoneFrame.png") no-repeat;
  width: 320px;
  height: 654px;
  /*margin-left: 16px;*/
}
.p_header {
  width: 100%;
  height: 60px;
  background: url("../../common/image/pageHeader.png") no-repeat;
  /*width: 27.9rem;
  height: 4.8rem;*/
  /*top: 75px;
  left: 19px;
  position: relative;*/
  background-size: 100% auto;
  background-color: #000;
}
.p_show {
  color: #ffffff;
  font-size: 15px;
  top: 28px;
  width: 100%;
  position: relative;
  text-align: center;
  /*margin-left: -50px;*/
  width: 100px;
  left: 100px;
  word-wrap: break-word;
  /* display: -webkit-box; */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.newPshow{
    width: 131px;
    left: 69px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.p_img {
  /* background: url("../../common/image/p_img.png") no-repeat; */
  height: 145px;
  width: 280px;
}
.p_content {
  width: 100%;
  height: 236px;
  font-size: 16px;
  /*overflow-y: scroll;*/
  /*overflow-x: hidden;*/
}
.p_menu {
  /*position: relative;
  width: 72.5%;
  left: 21px;
  top: 5.26%;*/
  position: relative;
  width: 100%;
  height: 45px;
  top: 0px;
}
.p_menu ul {
  border-bottom: 1px solid #cccccc;
  white-space: nowrap;
  height: 47px;
  overflow-y: hidden;
  overflow-x: auto;
}
.p_menu ul li {
  height: 43px;
  line-height: 43px;
  /* padding: 0 5px;
  width: 30%; */
  padding:0 20px;
  float: none;
  display: inline-block;
}
.addMenu {
  position: relative;
  top: -35px;
  font-size: 26px;
  /* border: 2px solid #cccccc;
  padding: 8px; */
  float: right;
  cursor: pointer;
  border: solid 1px #3f8dda;
  box-shadow: 0 0 1px #3f8dda;
  color: #3f8dda;
  background: #fff;
  height: 20px;
}
.newMenuShow {
  position: relative;
  float: right;
  height: 39px;
  line-height: 39px;
  padding: 0 2px;
  width: 20%;
  top: -46px;
}
.newMenuShow {
  padding: 2px;
}
.edit p {
  font-size: 1.6rem;
  color: #333333;
}
.e_ptitle {
  margin-top: 16px;
  font-size: 14px;
}
.saveName {
  float: right;
  margin-top: 20px;
}
.saveBanner {
  float: right;
}
#saveBanner {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.pageName {
  margin-top: 10px;
}
#pageNameEdit {
  /* left: 500px;
  top: 0px; */
  left: 300px;
    top: -70px;
}
.template {
  width: 100px;
  height: 100px;
  display: inline-block;
  border: 1px solid #e5e5e5;
  margin: 0 10px 15px 0;
  padding-top: 5px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}
.template.active {
  border-color: #38f;
}
.Carousel,
Slide {
  width: 100px;
  height: 64px;
}
.CarouselName,
SlideName {
  margin-top: 5px;
}
#bannerDetail,
#videoAdd {
  position: relative;
  top: 100%;
  padding: 15px;
  height: 320px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  width: 400px;
  font-size: 12px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 5;
  overflow-y: auto;
  overflow-x: hidden;
}
#videoAdd {
  width: 480px;
  height: 400px;
}
.Info:before {
  bottom: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: transparent;
  border-bottom-color: #e5e5e5;
  border-width: 7px;
  margin-top: -7px;
  left: 10%;
}
.Info2:before {
  bottom: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: transparent;
  border-bottom-color: #e5e5e5;
  border-width: 7px;
  margin-top: -7px;
  left: 40%;
}
#b_addNewImg,
#b_addNewVideo {
  border: 1px solid #e5e5e5;
  padding: 15px;
  background: #fff;
  text-align: center;
}
#b_addNewImg a {
  color: #4285f4;
  font-size: 14px;
  cursor: pointer;
}
#b_addNewImg p {
  color: #bfbfbf;
  font-size: 12px;
}
.b_imageTab {
  margin-top: 10px;
  border: 1px solid #e5e5e5;
  padding: 5px;
  background: #ffffff;
}

.b_imageDiv {
  position: relative;
  width: 80px;
  height: 80px;
  border: 1px solid #e5e5e5;
  text-align: center;
}
.b_InfoTab {
  display: flex;
  margin-top: 20px;
}
.b_InfoTab span {
  width: 32%;
  font-size: 14px;
  color: #333333;
  margin-top: 10px;
}
.b_InfoTab input {
  width: 50%;
  margin-left: -50px;
}
.b_InfoTab button {
  margin-left: 10px;
}
.ADTip {
  font-size: 1.2rem;
  color: #bfbfbf;
  font-weight: normal;
}
#pContent {
  position: absolute;
  top: -135px;
}
#shareEdit {
  top: -270px;
  left: 275px;
}
.showContent {
  /* position: relative;
  top: 41px;
  left: 21px;
  height: 232px;
  width: 62%;
  padding-top: 15.5px;
  padding-left: 20px;
  padding-right: 20px;*/
  position: relative;
  top: -22px;
  width: 100%;
  height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  /* margin-top: 18px; */
}
.menuSelect {
  margin-top: 20px;
  margin-bottom: 15px;
}
.menuSelect h3 {
  margin-top: 10px;
  font-size: 14px;
  color: #333333;
  font-weight: normal;
}
#pContent::before,
#shareEdit::before,
#wxEdit::before {
  top: 50%;
}
#pageBannerEdit::before {
  top: 25%;
}
.shareShow p {
  font-size: 10px;
}
.videoOrder {
  margin-top: 16px;
}
.delMenu {
  margin-top: 20px;
}
.delMenu a {
  font-size: 14px;
  color: #4285f4;
}
#shareWX {
  position: relative;
  top: 200px;
  height: 100px;
  width: 15rem;
  left: 52px;
  background: #fff;
  border-radius: 20px;
}
#editor {
  height: 300px;
}
.shareItem {
  margin-top: 16px;
}
.shareItem p {
  font-size: 14px;
  color: #333333;
  margin-top: 8px;
}
.shareShow {
  padding: 10px;
  padding-left: 15px;
  position: relative;
  top: -5px;
}
.shareTitle {
  font-weight: bold;
  margin-top: 2px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 10px;
}
.shareDescrib {
  margin-top: 2px;
  font-weight: normal;
  margin-top: 2px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 10px;
}
.shareTitle,
.shareDescrib {
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
/* .shareLink {
  font-weight: normal;
  margin-top: 2px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 10px;
} */
.shareImg {
  width: 85%;
  margin-left: 10px;
  margin-top: 30px;
  width: 38px;
  height: 38px;
}
#wxEdit {
  top: -73px;
  left: 320px;
}
/*是否checkbox样式*/
.model-13 {
  float: right;
}
.checkbox {
  position: relative;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
}
.checkbox label {
  width: 85px;
  height: 42px;
  background: #ccc;
  position: relative;
  display: inline-block;
  border-radius: 46px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.checkbox label:after {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  left: 0;
  top: -5px;
  z-index: 2;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.checkbox input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}
.mySwitch {
  float: right;
}

.model-13 .checkbox:after {
  content: "关闭";
  font-family: Arial;
  position: absolute;
  color: #666;
  top: 9px;
  right: 15px;
}
.model-13 .checkbox label {
  background: none;
  border: 3px solid #777;
  height: 34px;
  border-radius: 20px;
}
.model-13 .checkbox label:after {
  content: "开启";
  font-family: Arial;
  color: #fff;
  text-align: center;
  line-height: 28px;
  text-indent: 100px;
  background: #777;
  overflow: hidden;
  box-shadow: none;
  border-radius: 14px;
  -ms-transform: translateX(-50px);
  -webkit-transform: translateX(-50px);
  transform: translateX(-50px);
  -moz-transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  -o-transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  -webkit-transition: all 0.4s, width 0.2s linear, text-indent 0.4s linear;
  -webkit-transition-delay: 0.2s, 0s, 0s;
  -webkit-transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  transition: all 0.4s 0.2s, width 0.2s linear, text-indent 0.4s linear;
  top: 3px;
  left: auto;
  right: 2px;
  width: 28px;
  height: 28px;
}
.model-13 .checkbox input:checked + label {
  border-color: #4285f4;
}
.model-13 .checkbox input:checked + label:after {
  background: #4285f4;
  left: auto;
  -ms-transform: translateX(0px);
  -webkit-transform: translateX(0px);
  transform: translateX(0px);
  -moz-transition: all 0.4s, width 0.2s linear 0.4s,
    text-indent 0.3s linear 0.4s;
  -o-transition: all 0.4s, width 0.2s linear 0.4s, text-indent 0.3s linear 0.4s;
  -webkit-transition: all 0.4s, width 0.2s linear, text-indent 0.3s linear;
  -webkit-transition-delay: 0s, 0.4s, 0.4s;
  -webkit-transition: all 0.4s, width 0.2s linear 0.4s,
    text-indent 0.3s linear 0.4s;
  transition: all 0.4s, width 0.2s linear 0.4s, text-indent 0.3s linear 0.4s;
  width: 80px;
  text-indent: 0;
}
.scannerTips p {
  font-size: 10px;
  color: #9b9b9b;
}
.checkboxItem {
  margin-top: 10px;
}
.rightbottomBtn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.avatar-uploader {
  height: 100%;
}
.avatar-uploader-icon p {
  font-size: 10px;
  color: #8c8c8c;
}
.orderTip {
  color: #bfbfbf;
  font-size: 6px;
  font-weight: normal;
  display: block;
  margin-top: 2px;
}
.addTip {
  font-size: 15px;
  color: #4285f4;
  cursor: pointer;
}
.is-active {
  /* background-color: #2B6CFF; */
  color: #fff;
}
.imgTypeList .el-radio--mini.is-bordered {
  padding: 6px 10px 0 10px;
}
.menuContents {
  padding: 5px;
}
.menuConten_title {
  position: relative;
  top: -15px;
  font-weight: bolder;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 15px;
}
.ImgType1 {
  display: inline-block;
  width: 48%;
}
.video_pic2 {
  width: 160px;
  height: 83px;
  border-radius: 5px;
}
.video_pic3 {
  width: 140px;
  height: 83px;
  border-radius: 5px;
}
.ImgType1 videoType1 {
  top: -0.8rem;
  left: 82%;
  background-color: rgba(0, 0, 0, 0.2);
}
.ImgType2 {
  display: inline-block;
  width: 100%;
}
.ImgType3 {
  width: 100%;
  position: relative;
  height: 83px;
  margin-top: 10px;
}
.rightTips {
  position: absolute;
  width: 50%;
  right: -5%;
  top: 10px;
}
.video_pic {
  width: 100%;
  display: flex;
  height: 100px;
  border-radius: 3px;
}
.v_yellow_type {
  /* background-image: url(../../common/image/videoTypeBack.png); */
  background-size: 100%;
  background-repeat: no-repeat;
}
.videoType1,
.videoType2 {
  display: inherit;
  font-size: 1.1rem;
  color: #fff;
  position: relative;
  top: -25px;
  float: right;
  padding: 1px 2px 5px 10px;
}
.videoType2 {
  right: 115px;
  top: 63px;
}
.videoType3 {
  font-size: 8px;
  padding: 1px 5px 5px 6px;
  position: absolute;
  left: 60px;
  top: 20px;
  line-height: 20px;
  background: #2B6CFF;
  color: #fff;
  border-radius: 2px;
}
.eyes_icon {
  height: 9px;
  width: 14px;
}
.vTips {
  font-size: 10px;
  top: -10px;
  width: 100%;
}
.vTips2 {
  position: absolute;
  right: 0%;
  top: 10px;
  font-size: 10px;
  margin-left: 10px;
}
.p_page {
  position: relative;
  height: 430px;
}
#pageNameEdit:before {
  top: 100px;
}
#pageBannerEdit {
  top: -130px;
}
.LTypes .is-active {
  background-color: #2B6CFF;
}
.text_tip {
  margin-top: 8px;
}
.p_menu:hover li {
  top: 0px;
}
#menusShow::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
#menusShow::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
#menusShow::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
#ServiceIcon,
#WXIcon {
  height: 32px;
  width: 32px;
  position: relative;
  right: -148px;
  top: 200px;
}
#ServiceIcon {
  right: -110px;
  top: 240px;
}
.shareImgShow {
  height: 96px;
  width: 96px;
  float: left;
}
#shareTips {
  margin-left: 80px;
  margin-top: 24px;
  font-size: 12px;
  color: #9b9b9b;
}
#uploadShareImg {
  float: left;
  margin-left: 20px;
  margin-top: 60px;
}
#iPosition {
  font-style: normal;
  position: relative;
  top: -10px;
  color: #3f8dda;
}
.ql-align-center{
  text-align: center;
}
</style>
<style>
html,
body {
  font-size: 10px;
}
.el-dialog {
  border-radius: 5px;
}
.el-dialog--center .el-dialog__body {
  text-align: center;
  overflow: visible;
}
.el-dialog__body,
.el-dialog__header {
  border-bottom: none;
}
.el-upload--text {
  margin-top: 15px;
}
.el-input-group__append {
  background-color: #2B6CFF;
}
.inputStyle .el-input__inner {
  width: 350px;
}
.inputStyle2 .el-input__inner {
  width: 330px;
}
.pStyle{
  font-weight:bold;
      position: absolute;
    top: -30px;
    /* height: 20px; */
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.seleMyli .el-checkbox__inner{
    border-radius: 50%;
}
.yulanDialog .el-dialog--center .el-dialog__header{
    text-align: left;
    height: 0px;
    font-weight: 600;
}
.yulanDialog .el-dialog--center .el-dialog__body{
    border-top: 1px solid #eee;
    padding-top: 0;
    margin-top: 32px;
}
#copy1 {
  background: #fff;
  border: 1px solid #d6d8d9;
  height: 32px;
  border-radius: 2px;
  width: 290px;
  color: #333;
}
.cellCL{
    padding-top: 20px;
    width: 300px;
    height: 100px;
}
.alertClass{
    width:300px;
    font-weight: 300;
}
.cellCL .el-message-box__header{
    display:none;
}  
</style>



