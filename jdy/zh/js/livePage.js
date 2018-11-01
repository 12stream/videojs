var liveID = commonUtils.getUrlParam("liveid");
var videoID = commonUtils.getUrlParam("videoid");
var show_qr = false;
var thumbNum;
var wxUrl;
var nickname = "";	//昵称
var uid = "";//
var openID = "";
var imgUrl = "";//头像
var unionid = "";//unionid
var weixin_uid = "";
var storage = window.localStorage;
var vbId = liveID ? liveInfo.user_id: videoInfo.userId;
var forcedAttention = false; //是否强制关注
var isShowRr = "";
var BUSINESS = {};

//初始化聊天窗口高度
function initHeigth(minusHeight) {
    // 获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    var video_H = $(window).width() * 0.5625;
    var chatHt = (winHeight - minusHeight * view_show_w - video_H) + "px";
    var topH = $(".player-area").height();
    var menuH = $("#menuList").height();
    var footerH = $(".page-footer").height()
    var chatBoxH =  (winHeight - topH - menuH - footerH)+ "px"; 
    var pageIscroll =  (winHeight - topH - menuH)+ "px"; 
    var videocontrol =  $(".e-video-control").height();
    $(".page-iscroll,.desc-box,.tab-pane").css("height", pageIscroll);
    $(".page-iscroll,.desc-box").css("height", pageIscroll);
    $(".tab-pane").css("height", pageIscroll);
    $(".appoint_mode_center .pd_15").css("height",winHeight-$(".appoint_top").height()+"px");
    $("#danmuBtn").css('bottom',video_H-videocontrol + 20 +"px");
    $(".loginBox").css("height", winHeight - topH);
}
// 获取直播页面设置
function getLiveInfo(vbId){
    var url;
    var id;
    var data;
    id = commonUtils.checkStr(liveID)?liveID:videoID;
    if(commonUtils.checkStr(liveID)){
        url = config.vboServer + "livecenter/get_live_info";
        data = {
            live_id: id,           
            user_id: vbId,           
        };
    }else{
        url = config.vboServer +'videocenter/get_video_info';	
        data = {
            video_id: id,           
            user_id: vbId,           
        };
    }
    if(commonUtils.checkStr(liveID)){
        // 礼物开关 1为开
        if(liveInfo.giftSwitch=="1"){
            $("#gift_btn").css("opacity","1");
            $("#chat-input").css("padding-right","1.53rem");
        }else{
            $("#gift_btn").css("opacity","0");
            $("#chat-input").css("padding-right","0.29rem");
        }
    }
    $.ajax({
        type: "POST",
        async: true,
        data: data,
        url:url,		
        dataType: "json",
        success: function (data) {            
            if(data.code==1){         
                // 点赞开关，0表示不点赞，1表示点赞
                var rt = data.result; 
                var menuList = rt.menu_list;     
                function sortIndex(a,b){  
                    return a.menu_index-b.menu_index  
                } 
                menuList = menuList.sort(sortIndex);
                var html = template('menuList_template', {list:menuList}); 
                $('#menuList').html(html);
                var type = menuList[0].menu_type;  
                $('#menuList .tab0').addClass("active");
                switch (type) {
                    // 菜单类型，0表示聊天，1表示简介，2表示录像列表，3表示榜单，4表示图文 
                    case 0:
                        $(".page-chat").show().siblings().hide();
                        $('.Notice').css("visibility","visible");
                        $(".slide_nav,.page-footer").show();
                        break;
                    case 1:
                        $(".page-desc").show().siblings().hide();
                        $(".slide_nav,.page-footer").hide();
                        $('.Notice').css("visibility","hidden");
                        break;
                    case 2:
                        $(".video_list").show().siblings().hide();							
                        $(".video_list_ul").show();
                        $(".slide_nav,.page-footer").hide();
                        $('.Notice').css("visibility","hidden");
                        findeliveCondition();
                        break;
                    case 3:
                        $(".page-recommend").show().siblings().hide();
                        $(".slide_nav,.page-footer").hide();
                        $('.Notice').css("visibility","hidden");
                        break;
                    case 4:
                        var str = menuList[0].menu_content.replace(/^\"|\"$/g,'');
                        $("#imageTxt").html(str).removeClass("no_data");;
                        if(menuList[0].menu_content!=0 && str!=0){
                            $("#imageTxt").append('<div class="no_more"><p>-&nbsp;&nbsp;没有更多了&nbsp;&nbsp;-</p></div>');
                        }else{
                            $('#imageTxt').html('').addClass("no_data");
                            var tishiImg = '<img  class="noDataImg" src="./image/icon_wu.png?ver=20184"><p class="no_data_p">暂无简介</p>';
                            $("#imageTxt").append(tishiImg);
                        }
                        $("#imageTxt").show().siblings().hide();
                        $(".slide_nav,.page-footer,.page-chat").hide();
                        $('.Notice').css("visibility","hidden");
                        break;                 
                }
                rt.thumb_enable=="0"?$(".click_zan").hide():$(".click_zan").show();
                rt.wechat_enable=="0"?$("#QRCode").hide():$("#QRCode").show();
                rt.service_enable=="0"?$("#service_btn").hide():$("#service_btn").show();   
                $('#wechat').html(template("wechat_template",{title:rt.wechat_name,src:rt.qr_code_url,wxshare_title:rt.envelope_name,wxshare_des:rt.envelope_desc,wxshare_pic:rt.envelope_logo_url}));                
                var shareName = rt.envelope_name;
                var shareDesc = rt.envelope_desc;
                var sharePic = rt.envelope_logo_url;
                if(!shareName){
                    shareName  = commonUtils.getUrlParam("liveid")?liveInfo.live_name:videoInfo.vodName;
                }
                if(!shareDesc){
                    if (commonUtils.checkStr($("#ac_txt_id").find("p")[0])) {
                        shareDesc = $("#ac_txt_id").find("p")[0].innerText;
                        if(shareDesc.length > 100){
                            shareDesc = shareDesc.substring(0,100);
                        }
                    }else{
                        shareDesc = liveID?'快来围观我的精彩直播吧!':'快来围观我的精彩视频吧!';
                    }    
                }
                if(!sharePic){
                    sharePic = $(".appoint_img").attr("src");
                }
                /*QQ分享*/
                var metaStr = '<meta itemprop="name" content="'+shareName+'"/><meta name="description" itemprop="description" content="'+shareDesc+'"/><meta itemprop="image" content="'+sharePic+'"/>';
                $('head').append(metaStr);
                document.title = shareName;
                console.log("分享的标题222===="+shareName);
                console.log("分享描述22===="+shareDesc);
                console.log("分享图片222===="+sharePic);
                $("#wxshare_des").val(shareDesc);
                $('#service').html(template("service_template",{title:rt.service_name,src:rt.service_qr_url})); 
                // 0：都不勾选，1：进入页面是否显示公众号二维码，2：是否强制显示公众号二维码
                isShowRr  =  rt.is_show_qr ; 
                // 查询是否关注
                if(isShowRr == "2"){
                    isUserAttention = commonUtils.getUrlParam("liveid")? isUserAttention = isAttention(liveInfo.user_id): isUserAttention = isAttention(videoInfo.userId);
                }
                showQR();  
            }
        },
        error: function () {
            commonUtils.showPop2("系统异常，请稍后再试!");
        }
    })

}
// 用户是否关注
function isAttention(vbId) {
    var result;
    console.log("关注的openid："+ window.localStorage.getItem("openid"))
    if (commonUtils.checkStr(window.localStorage.getItem("openid"))) {
        $.ajax({
            async: false,
            data: {
                user_id:vbId,
                openid: window.localStorage.getItem("openid"),
            },
            url: vboApi + "wecha_authorization/get_transaction_info",
            dataType: "json",
            success: function (data) {
                console.log("关注查询subscribe："+data.result.subscribe);
                if (data.code == "1") {
                    if (data.result.subscribe == "1") {
                        result  = true;
                    } else {
                        result = false;
                    }
                }
            },
            error: function () {

            }
        })
    }
    console.log("是否关注的查询"+result);
    return result;
}


function showQR(){
    console.log("是否强制弹出："+isShowRr)
    if(isShowRr == "0"){
        $("#wechat").hide();
        if(navigator.userAgent.match(/android/i)){
            $("#example_video_1").show();
        } 
    }else if(isShowRr == "1"){
         // 强制关注 查询是否关注
        if(isUserAttention){
            $("#wechat").hide();
            if(navigator.userAgent.match(/android/i)){
                $("#example_video_1").show();
            } 
        }else{
            $("#wechat").show(); 
            if(navigator.userAgent.match(/android/i)){
                $("#example_video_1").hide();
            } 
        }     
    // 强制弹出
    }else if(isShowRr == "2"){
        forcedAttention = true;
        // 强制关注 查询是否关注
        if(isUserAttention){
            $("#wechat").hide();
            if(navigator.userAgent.match(/android/i)){
                $("#example_video_1").show();
            } 
        }else{
            $("#wechat").show(); 
            if(navigator.userAgent.match(/android/i)){
                $("#example_video_1").hide();
            } 
        }
        if(!isWeiXin()&& forcedAttention == true){
            $(".delete_live").show();
            $("#appoint").addClass("appoint_show");//show 预约界面
            $(".delete_live_img img").attr("src", "image/tip_wx.png").addClass("tip_wx");
            $(".livetime_end").show();
            $(".delete_live_p").text("请在手机微信客户端打开链接");
            $("#btn_botom,.livetime_end2,#djs_ready,.bulletScreen").hide();

        }
    }
}



$(function () {
      $(".tab0").click(); 
    // 根据直播id获取主播id
    // getUserid();
    // 微信授权
    showQR();
    $("#service_btn").on("click", function () {
        $("#service").show();
        if(navigator.userAgent.match(/android/i)){
            $("#example_video_1").hide();
        } 
    });
    $("#QRCode").on("click", function () {
        $("#wechat").show();
        if(navigator.userAgent.match(/android/i)){
            $("#example_video_1").hide();
        }       
    });
    $(".modal_box").on("click",function(e){
        if($(this).attr("id")=="wechat"){
            if(isWeiXin()){
                //开启强制关注判断是否关注，否则就隐藏
                if(forcedAttention){
                    // 如果关注则隐藏，否则就显示
                    isUserAttention = commonUtils.getUrlParam("liveid")? isUserAttention = isAttention(liveInfo.user_id): isUserAttention = isAttention(videoInfo.userId);
                    if(isUserAttention){
                        if(e.target!=this) return;
                        else {
                            $(this).hide()
                        }    
                    }else{
                        $("#wechat").show(); 
                        if(navigator.userAgent.match(/android/i)){
                            $("#example_video_1").hide();
                        } 
                        commonUtils.showPop2("请关注后再试！");
                        return;
                    }   
                } else{
                    if(e.target!=this) return;
                    else {
                        $(this).hide()
                    }    
                }                                                              
            }   
        }
        if(e.target!=this) return;
        else {
            $(this).hide();
        }
        if($(this).attr("id")=="send_MSG" || $(this).attr("id")=="wechat" || $(this).attr("id")=="service"){           
            if(navigator.userAgent.match(/android/i)){
                $("#example_video_1").show();
            }
        }
        
    });
    $(".modal_box").on("click", ".close_qr,.close_btn",function () {
        $(this).parent().parent(".modal_box").hide(); 
        if( $(this).parent().parent(".modal_box").attr("id")  == "wechat"){
            $("#example_video_1").show();
        }   
    });


   
    // 送礼
    $("#gift").on("click", 'li', function () {
        $(this).addClass("active_gift");
        $(this).siblings().removeClass("active_gift");
        $(this).parent("ul").siblings().find("li").removeClass("active_gift");
        var giftMes = $(this).find(".gift_name").text();
        $("#giftMoney").val("");
        $('i').removeClass("clickActive");	//清掉所有已选
        if ($(this).find("i").hasClass("clickActive")) {
            $(this).find("i").removeClass("clickActive");
            $("#input_gift").val("");
            //$("#input_world").val("");
        } else {
            $(this).find("i").addClass("clickActive");
            $("#input_gift").val(giftMes);
            var money = $(this).find('font').html();
            $("#giftMoney").val(money);
            //$("#input_world").val(giftMes);
        }
    });


});


