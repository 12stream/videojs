var view_show_w;
// 版本号判断
if(noLive=="0"){
	$(".spinner").hide();
	$('.page_main,.page_main .delete_live').show();
}
function PcVideoShow(){
	if(pcVideo == '1'){
		$(".spinner").hide();
		$('.page_main,.page_main .delete_live').show();
		$(".delete_live_img img").attr("src", "image/tip_wx.png").addClass("tip_wx");
		$(".delete_live_p").text("请在手机浏览器打开链接");
		$("#btn_botom,.livetime_end2,#djs_ready,.bulletScreen").hide();		
	}
	return false;
};
PcVideoShow();
var version = commonUtils.getUrlParam("v");
var playFlag = false;
initpage();
$(window).resize(function () {
	initpage();
});

function initpage() {
	var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
	var _html = document.getElementsByTagName('html')[0];
	view_show_w = view_width / 10.4167;
	// _html.style.fontSize = view_width / 10.4167 + 'px'; 
}

// 添加足迹
function AddFootprint(id,liveid) {
    $.ajax({
        type: "POST",
        async: true,
        data: {
            userID: id,
            liveID: liveID,
        },
        url: config.lhServerUrl + "/service/addFootprint.action",
        dataType: "json",
        success: function (data) {
			console.log('添加足迹成功');
			console.log(data);
        }
    })
}

var lw25 = $(window).width() * 0.9 * 0.25;
var lw33 = $(window).width() * 0.9 * 0.333;
$(".player-area,.appoint_top").height($(window).width() * 0.5625);
var appoint_modeH = $(window).height() - (1.8 * view_show_w);
$("#appoint_mode_center").css("height", appoint_modeH);
$(window).resize(function () {
	$(".player-area,.appoint_top").height($(window).width() * 0.5625);
	var giftListTop = $(".player-area").height() + (2 * view_show_w) + "px";
	$("#giftList").css("top", giftListTop);
	var appoint_modeH = $(window).height() - (1.8 * view_show_w);
	$("#appoint_mode_center").css("height", appoint_modeH);
});

//初始化发送礼物列表的位置
var giftListTop = $(".player-area").height() + (2 * view_show_w) + "px";
$("#giftList").css("top", giftListTop);
//弹出调转到app提示
var isremove_live = 0;

$(".close_app").on("click", function () {
	$('.show_APP').hide();
});
$(".input_code_close").on("click", function () {
	$('.view_code').hide();
});
$(".input_tickets_close").on("click", function () {
	$('.view_tickets').hide();
});
$(".input_verify_close").on("click", function () {
	$('.verify').hide();
});
$(".verify .button").on("click", function () {
	$('.verify').hide();
});
$(".cover-mask-close").on("click", function () {
	$('.view-mask').hide();
});
$(".delete_live")[0].addEventListener('touchstart', function (e) {
	e.preventDefault();
}, false);
$(".delete_live")[0].addEventListener('touchmove', function (e) {
	e.preventDefault();
}, false);

$(".Arrears")[0].addEventListener('touchstart', function (e) {
	e.preventDefault();
}, false);
$(".Arrears")[0].addEventListener('touchmove', function (e) {
	e.preventDefault();
}, false);
(function ($) {
	try {
		window.localStorage.foobar = "foobar";
	} catch (_) {
		$("body").html("<div><h3 class='wuheng'>请退出无痕模式观看</h3></div>");
	}

	noticeScroll.init();
	// noticeScroll.sendMsg('测试测试测试测试测试测试');
	var signServerUrl = "192.168.3.176:8081";	//支付后台 暂不接入
	var nickname = "";	//昵称
	var uid = "";//		用户uid（聊天室用）
	var unionid = "";//unionid		unionid（微信注册用）
	var imgUrl = "";//头像
	var winHeight = 640;
	var firstCom = 0;
	var storage = window.localStorage;
	var liveID = commonUtils.getUrlParam("liveid");
	var videoID = commonUtils.getUrlParam("videoid");
	var bunchVideoId ="";
	var currentID = "";	//流检测使用
	var identityMode = 0;//	游客
	var anchorID = "";		//主播userid
	var openIDTmp = "";
	var wallet = "";//红包链接
	var walleterImg = "";//发红包用户头像--来自web
	var anchorImg = "";	//主播头像
	var anchorID_video ="";
	var anchorName = "";//主播昵称
	var walletName = "";//红包活动名称
	var show_msg = 1; 	//全体禁言  是否显示聊天消息
	var silence_single;
	var silence; //是否禁言
	var liveExit = 1;
	var goLive = 1;
	var goOrder = 0;
	var dataJsonl = "";	//调起app传参 直播参数
	var dataJsonV = "";//调起app传参 直录像参数
	var live_logo;//视频水印
	var totalViewers;//观看总人次
	var v_room_online_users;//直播在线观看人数
	var v_user_online;//在线观看人数
	var now_url = window.location.href;//当前页面地址
	var weixin_uid;//微信用户标识
	var user_stutas;//主播是否欠费
	var view_stutas;//观众是否封禁
	var appoint_pwd; //预约的liveID
	var yuyue_passd;//预约liveID对应的密码
	var getappoint_pwd;
	var getappoint_passd;
	var isbalck_stutas = 0; //用户是否被踢出房间
	var userpay_Id = ""; //微信注册后的uid
	var yunboid; //云播showid
	var upTime; //上报循环
	var live_pass_length; //密码长度
	var live_via_length;  //门票长度
	var third_id = commonUtils.getUrlParam("user_id");//云播三方id；
	//var third_id = "";   //测试环境下的第三方unionid   oTe0RwJs2H39r-eWJMva3lCVatrE
	var issend_time = 0;//是否发送时间
	var webPayorderNo;//手机端web支付订单号
	var ismake = 0; //用户是否预约
	var live_list = 0;//控制视频按钮的显示的标识
	var isbindPhone = 0;//观看者是否绑定手机号
	var noticeFlag = 1;//是否显示公告栏 0为隐藏 1为显示
	var phone_renwu;  //重要人物手机号
	var isPhone_renwuFlag = false;//重要人物是否提醒
	var noticeConnect = "";//公告内容
	var user_phone; //用户手机号
	var isrehearse; //0.没有彩排 1.正在彩排
	var isView = true;  //默认门票为true
	var isCode = true;  //默认密码为ture
	var mobile;
	var isWhite = false;
	var isCheckWhite = false;// 是否验证过白名单
	var isQualify = false;//观看者是否实名认证
	var anchorQualify = 0;//主播是否实名认证
	var sendCourtesy = 0;//礼物数
	var chatCount = 0;//聊天数
	var vitalMan = [];//重要人物列表,用于重要人物入场
	var vitalManClear = [];//登场过的重要人物记载
	var isWatch;//是否验证过权限(服务器返回的,所有权限验证)
	// var hasLogged = 0;  //登录状态
	var onlineCount = '-1';
	var touristsMode = false; //游客模式
	var defaultAuthorization = true; //默认授权
	var payOpenID = 1;
	var ISsilence_single;//是否开启单个禁言
	var ISsilence_all;//是否开启全体禁言
	var noticeTime;//公告栏显示控制
	var noticeStop;//公告栏显示控制
	var ticketPrice;

	
	if(config.authorizedAppid != storage.appid&&isWeiXin()){
		defaultAuthorization = false;
	}
	if(storage.userInfo_mwyb || storage.userInfo_third){
		if(!storage.userInfo_mwyb){
			payOpenID = JSON.parse(storage.userInfo_third).openid;
		}else{
			payOpenID = JSON.parse(storage.userInfo_mwyb).openid;
		}
	}
	console.log("第三方支付openid:"+payOpenID)

	if (commonUtils.checkStr(videoID)) {
		goLive = 0;
	}
	if (!commonUtils.checkStr(liveID)) {
		liveID = videoID;
	}

	if (commonUtils.checkStr(commonUtils.getUrlParam("user_id"))) {
		uid = commonUtils.getUrlParam("user_id")
		storage.uid = uid;
		identityMode = 1;
	}

	if (window.localStorage && (window.localStorage.setItem('abcde', 123), window.localStorage.getItem('abcde') == 123)) {
		// h5送礼支付是否成功
		if (commonUtils.checkStr(storage.webPayorderNo)) {
			$('.appoint').addClass("appoint_hide");
			if (location.href.indexOf('#reloaded') == -1) {
				location.href = location.href + "#reloaded";
				location.reload();
			}
			isPayGift();
		}
		// 页面加载完成检查订单号
		if (commonUtils.checkStr(storage.orderWebPNo)) {
			var payfoer = setInterval(function () {
				var payUserID = commonUtils.getUrlParam("liveid")?anchorID :anchorID_video;
				$.ajax({
					type: "POST",
					async: true,
					data: {
						user_id: uid,
						live_id: liveID,
						receive_user_id: payUserID	
					},
					url: config.payUrl + "/mwh5/api/mwh5/payRecord/viewPay_isok.do",		///api/mwh5/payRecord/ toPay.do
					dataType: "json",
					success: function (data) {
						storage.orderWebPNo = '';  //防止一直调支付接口
						if (data.data == 1) {							
							clearInterval(payfoer);							
							$(".now_in").click();
							if(commonUtils.getUrlParam("videoid")){
								$("#joinVideo").click();
							}							
						}
					},
					error: function () {
						commonUtils.showPop2("系统错误，请稍后再试!");
					}
				})
			}, 1000);
		}
		if (commonUtils.checkStr(storage.uid) || commonUtils.checkStr(storage.openid)) {
			uid = storage.uid;
			identityMode = 1;//认证
			console.log('uid赋值4=>', uid);
			weixin_uid = storage.weixin_uid;
			nickname = storage.nickname;
			imgUrl = storage.imgUrl;
			unionid = storage.unionid;
			yunboid = storage.yunboid;
			$("#input_world").show();
			$("#loginBtn").hide();
			$(".chatroom_ic_pen").show();
			$("#sendBtn").removeClass("sendBtac");
			setTimeout(function () {
				autoCheckCode();
			}, 500);
			if(commonUtils.getUrlParam("liveid")){
				AddFootprint(uid,liveID);
			}			
		} else {
			if(!touristsMode){
				//location.href="index_afternoon.html?ver="+10000*Math.random(1,10000);
				identityMode = 0;
				$("#loginBtn").show();
				$(".chatroom_ic_pen").show();
				$("#input_world").show();
				$("#sendBtn").addClass("sendBtac");
			}else{
				$("#input_world").show();
				$("#loginBtn").hide();
				$(".chatroom_ic_pen").show();
				$("#sendBtn").removeClass("sendBtac");
			}
			
		}
	} else if (commonUtils.checkStr(getCookie("uid")) || commonUtils.checkStr(getCookie("openid"))) {
		// console.log('uid赋值5=>', uid)
		identityMode = 1;//认证
		weixin_uid = getCookie("weixin_uid");
		nickname = getCookie("nickname");
		imgUrl = getCookie("imgUrl");
		unionid = getCookie("unionid");
		yunboid = getCookie("yunboid");
	} else if (!commonUtils.checkStr(getCookie("openid"))) {
		//location.href="index_afternoon.html?ver="+10000*Math.random(1,10000);
	} else if (!commonUtils.checkStr(uid)) {
		// 游客uid
		identityMode = 0;
		nickname = "游客" + Math.round(Math.random() * 1000);
		uid = (new Date()).valueOf();	//时间戳
		imgUrl = "http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/17/image/timg2.jpg";
	}
	if (!commonUtils.checkStr(nickname) || nickname == null || nickname == "null") {
		// 游客昵称
		nickname = "游客" + Math.round(Math.random() * 1000);
	}
	if (!commonUtils.checkStr(imgUrl) || imgUrl == "/0") {
		imgUrl = "http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/17/image/timg2.jpg";
	}
	var openID = getCookie("openid");	//支付、测试用	opvjxjlo3MlB2LrF-3ogMWXgS6sg

	if (isWeiXin()) {
		weijion();
		console.log("微信注册后的uid:" + uid);
	}
	console.log(commonUtils.checkStr(uid));
	console.log(commonUtils.checkStr(unionid));
	if (!commonUtils.checkStr(uid) && !commonUtils.checkStr(unionid)) {
		uid = (new Date()).valueOf();	//时间戳
	}
	// openIDTmp = uid;		//用户openid		预约
	//uid = uid.toString().MD5();

	// 登录显示昵称为手机号，注释以下
	// nickname = commonUtils.phoneSec(nickname);

	if (commonUtils.checkStr(third_id)) {
		imgUrl = storage.imgUrl;
		identityMode = 1;	//认证
		$("#input_world").show();
		$("#loginBtn").hide();
		$(".chatroom_ic_pen").show();
		$("#sendBtn").removeClass("sendBtac");
	}

	$("#head_img").attr("src", imgUrl);
	//$("#anzuo_head").attr("src",imgUrl);
	init();
	function init() {
		if (isWeiXin()) {
			$(".pay_style b").text("微信");			
			if(commonUtils.getUrlParam("liveid")){
				if(liveInfo.giftSwitch=="1"){
					$("#gift_btn").css("opacity","1");
				}
			}
		} else {
			$(".pay_style b").text("微信");
			if(commonUtils.getUrlParam("liveid")){
				if(liveInfo.giftSwitch=="1"){
					$("#gift_btn").css("opacity","1");
				}
			}
		}
	}
	//设置cookie
	function setCookie(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) +
			((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
	}

	//取回cookie
	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	}
	// //初始化聊天窗口高度
	// function initHeigth(minusHeight) {
	// 	// 获取窗口高度
	// 	if (window.innerHeight)
	// 		winHeight = window.innerHeight;
	// 	else if ((document.body) && (document.body.clientHeight))
	// 		winHeight = document.body.clientHeight;
	// 	var video_H = $(window).width() * 0.5625;
	// 	var chatHt = (winHeight - minusHeight * view_show_w - video_H) + "px";
	// 	$(".tab-pane").css("height", chatHt);
	// 	$(".page-iscroll").css("height", chatHt);
	// 	//document.getElementById("page-iscroll").style.height = chatHt;
	// }
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	//聊天简介切换
	var ONSWITCHCHAT = true;	//拉取聊天记录开关
	//输入框设置
	$(".to-send-msg").click(function () {
		if (!$(this).hasClass("disabled")) {
			$("#chat-footer").addClass("hide");
			$("#chat-input").removeClass("hide");
			$("#input_world").focus();
		}
	});
	//礼物点击
	/*$("#gift_btn").click(function(){
	 $(".gift_content").show();
	 })*/
	//文档body点击事件
	$("body").click(function () {
		$(".gift_content").hide();
		/*$("#chat-footer").removeClass("hide");
		 $("#chat-input").addClass("hide");*/
	});
	//对foot的click事件绑定事件处理程序，阻止事件冒泡，防止其冒泡到document
	// chat-input
	$('.gift_content').bind('click', function (e) {
		stopPropagation(e);
	});
	$("#gift_btn").bind('click', function (e) {
		stopPropagation(e);
	});
	$('.to-send-msg').bind('click', function (e) {
		stopPropagation(e);
	});
	function stopPropagation(e) {
		if (e.stopPropagation)
			e.stopPropagation();
		else
			e.cancelBubble = true;
	}

	//wrapper_scroll 上拉到顶加载历史聊天
	var TIMELAST = 0;
	var HASNEXT = true;
	var scTop1 = 0, scrool_direct = 0;
	$('.page-chat').on('scroll', function () {
		//var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
		var scTop = $('.page-chat').scrollTop();
		if (scTop1 <= scTop) {//下滚
			scrool_direct = 0;
		}
		else {//上滚
			scrool_direct = 1;
		}
		// if (show_msg == 0) {			//禁言状态下 不允许下拉加载历史聊天
		// 	return false;
		// }
		setTimeout(function () { scTop1 = scTop; }, 0);
		if (scTop <= 5 && scrool_direct == 1 && ONSWITCHCHAT) {
			var timestamp_next = (new Date()).valueOf();
			if ((timestamp_next - TIMELAST) > 1000) {
				TIMELAST = timestamp_next;
				if (HASNEXT) {
					var start_id = $("#default_li").next().attr("id");
					if (ws) {
						ws.emit("msg", {
							cmd: 2020,
							msg: '历史聊天',
							data: {
								last_msg_id: start_id,
								len: 20
							}
						})
					}
				} else {
					if (noticeFlag == 0) {
						var loadTips = '<p id="loadTips">已加载到顶...</p>';
					}
					else {
						var loadTips = '<p id="loadTips" class="loadTips_ac">已加载到顶...</p>';
					}
					if (!commonUtils.checkStr($("#loadTips").attr("id"))) {
						$("#default_li").before(loadTips);
					}
					setTimeout(function () {
						$("#loadTips").remove();
					}, 2e3);
				}
			}
		}
	});

	//点击发送按钮
	$("#sendBtn").click(function () {
		sendMsg();
	});
	//礼物支付点击
	$("#pay_btn").click(function () {
		if (identityMode != 1 && !touristsMode) {
			$("#logFont").click();
			return false;
		}
		//默认云播授权，需要绑定手机号
		console.log('配置的appid:'+config.authorizedAppid+"第三方授权appid:"+ storage.appid);
		var showBind =   getUserInfo(uid) ?getUserInfo(uid).mobile:""; 
		if(defaultAuthorization){
			if (!showBind && isWeiXin()) {
				$("#example_video_1").hide();
				$(".mobile_bind").show();
				return false;
			}
		}
		
		//sendGiftMsg();
		// yst调试  以下代码注释
		if (isWeiXin()) {
			payPublic();
		}
		else {
			function getpayUrl() {
				if (openIDTmp.toString().length == 11) {
					phone_num = openIDTmp;
				}
				else {
					phone_num = ""
				}
				var choice_price = $("#gift li").find(".clickActive").parent('.gift_stytle').parent('li').find('.gift_price font span').text();
				var id = $('.active_gift').attr("id");	//礼物id
				if (choice_price == "免费") {
					var id = $('.active_gift').attr("id");	//礼物id					
					var payVideoId = getReceiveVideoID(config.isLive);
					console.log("支付对象videoid："+payVideoId);
					$.ajax({
						type: "POST",
						data: {
							giveUserID: uid,
							receiveUserID: anchorID,
							receiveLiveID: liveID,
							receiveVideoID: payVideoId,
							giftID: id,
							giftCount: 1
						},
						url: config.lhServerUrl + "/mwcurrency/giveGiftH5.action",
						dataType: "json",
						success: function (data) {
							console.log("礼物支付2======");
							if (data.resultCode == "01") {
								sendGiftMsg();
							}
							else {
								commonUtils.showPop2("数据异常，请稍后再试!");
							}
						}, error: function (data) {
							//$(".click_zan").hide();
							commonUtils.showPop2("数据异常，请稍后再试!");
						}
					})
		
				}
				else {
					var payType = getPayType(config.isLive);
					var payVideoId = getReceiveVideoID(config.isLive);
					console.log("支付对象videoid："+payVideoId);
					// H5送礼php支付
					$.ajax({
						type: 'post',
						url: config.vboApi + 'wecha_pay/gift_h5_pay',
						data: {						
							number: config.payMoney || choice_price,
							user_id: uid,
							userName: nickname,
							phoneNumber: phone_num,
							imgUrl: imgUrl,
							giftID: id,
							giftCount: 1,
							thirdKey: uid,
							pay_type:payType,
							receiveLiveID: liveID || commonUtils.getUrlParam("videoid"),
							receiveVideoID: payVideoId,
							receiveUserID:	anchorID													
						},
						dataType: 'json',
						success: function (data) {
							if (data.code=="1") {
								var wxpayUrl = data.result.mweb_url;
								webPayorderNo = data.result.orderNo;
								var storage = window.localStorage;
								var inputMsg = $("#input_gift").val();
								// if (inputMsg == null || inputMsg == "") {
								// 	return;
								// }
								var giftMes = inputMsg;
								var liwuid = m_msg.get(giftMes);	//礼物id
								var giftImg = m_img.get(inputMsg);
								storage.webPayorderNo = webPayorderNo;
								console.log("礼物支付的订单号："+ storage.webPayorderNo);
								storage.inputMsg = inputMsg;
								storage.giftMes = giftMes;
								storage.liwuid = liwuid;
								storage.giftImg = giftImg;	
								location.href = wxpayUrl;	
								isPayGift();								
							}else{
								commonUtils.showPop2("支付失败（"+ data.msg +"）");
								console.log("不能支付："+data.msg);
								$(".appoint_shuru").hide();
							}
						}, error: function () {

						}
					});
				}

			}
			getpayUrl();
		}
	});
	/*
		$(".rewebPay").on("click",function(){
			$(".show_webPayT").hide();
			storage.removeItem("webPayorderNo");
			storage.removeItem("giftMes");
			storage.removeItem("liwuid");
			storage.removeItem("giftImg");
		});
	*/

	//礼物点击事件
	//Web礼物支付完成点击事件
	$(".webPay_over").on("click", function () {
		console.log(storage.webPayorderNo);

	});
	//礼物初始化
	var isclick_gift = true;
	var m_figtName = new Map();		//初始化map礼物列表
	var m_img = new Map();
	var m_msg = new Map();
	var gift_name_arry = new Array();
	var gift_img_arry = new Array();
	var gift_price_arry = new Array();
	var gift_ID_arry = new Array();
	var money_f = ""; //钱的符号
	function occerGiftList() {
		$.ajax({
			type: "POST",
			async: false,
			data: {
				bizCode: "2010",
				userID: anchorID,
				liveID: liveID
			},
			url: config.lhServerUrl + '/service/iBacService.action',
			dataType: "json",
			success: function (data) {
				giftData = data.paramo;
				if (commonUtils.checkStr(giftData)) {
					initalizeGiftName(m_figtName);
					initalizeGiftImg(m_img);
					initalizeGiftMsg(m_msg);
					for (var i = 0; i < giftData.length; i++) {
						gift_name_arry[i] = giftData[i].giftName;
						gift_img_arry[i] = giftData[i].giftImg;
						gift_ID_arry[i] = giftData[i].id;
						gift_price_arry[i] = parseFloat((giftData[i].giveCurrencyValue) / 10).toFixed(2);
						if (gift_price_arry[i] == "0.00") {
							gift_price_arry[i] = '免费';
							money_f = "";
						} else {
							money_f = "￥";
						}
						var giftli = '<li id=' + gift_ID_arry[i] + '><span class="gift_stytle"><img src=' + gift_img_arry[i] + '><i></i></span><p class="gift_price"><font id="gift10Money">' + money_f + '<span>' + gift_price_arry[i] + '</span></font></p><p class="gift_name">' + gift_name_arry[i] + '</p></li>';
						$("#gift").append(giftli);
					}
					if(giftData.length<=4){
						$('#tabBox .hd').hide();
						$(".gift_pay").css('margin-top',"0");
					}else{
						$(".gift_pay").css('margin-top',"0.5rem")
						$('#tabBox .hd').show();

					}
					var liEle = $("#gift li");
					for (var i = 0; i <= giftData.length;) {
						liEle.slice(i, i += 4).wrapAll('<ul></ul>');
					}
				}
				else {
					isclick_gift = false;
					$("#gift_btn").css("visibility", "hidden");
					$("#chat-input").css("padding-right","0.26rem");
				}
			},
			error: function () {
				$("#gift_btn").css("visibility", "hidden");
				$("#chat-input").css("padding-right","0.26rem");
			}
		})
	}
	$("#gift_btn").click(function () {
		if (isclick_gift) {
			$(".gift_content").show();
		}
		else {
			$(".tishi_de .tishi_de_title").text("该主播未设置礼物！");
			$(".tishi_de .tishi_de_title").css("marginTop", "0.8rem");
			$(".tishi_de").fadeIn();
			setTimeout(function () {
				$(".tishi_de").fadeOut();
			}, 2000)
		}
	});
	//是否预约
	if (identityMode == 1 && commonUtils.getUrlParam("liveid")) {
		isappoint();
	}
	//isappoint();
	// 是否预约
	function isappoint() {
		$.ajax({
			type: "POST",
			async: false,
			data: {
				user_id: uid,
				live_id: liveID
			},
			url: config.lhServerUrl + '/api/mwlive/live/live_ismake.do',
			dataType: "json",
			success: function (data) {
				ismake = data.data;
				// 已经预约
				if (ismake == 1) {
					$(".now_appoint").text("立即进入");
					if(isWatch == 1){
						$("#wrap_n .appoint").removeClass("appoint_show");
					}
					$(".now_in").show();
					if (commonUtils.checkStr(live_permit) && live_permit == 2) {
						$("#wrap_n .appoint").removeClass("appoint_show");
					}
				}

			},
			error: function () {
				console.log("select userInfo errord");
			}
		})
	}
	//	点击预约按钮框
	var appointment_phone;
	var orderLive = 0;
	console.log("未绑定手机号1", isbindPhone);
	// 点击请提醒我
	$(".now_appoint").on("click", function () {
		var showBind =   getUserInfo(uid) ?getUserInfo(uid).mobile:"";
		console.log("点击了请提醒我")
		orderLive = 1;
		console.log("未绑定手机号2", isbindPhone);
		console.log("手机号", mobile);
		console.log("主播id:"+anchorID);
		console.log("观看者id:"+uid);
		$("#appoint_inpput").val(mobile);
		if(anchorID == uid ){
			$('.appoint').removeClass("appoint_show");
			return;
		}
		if ($(this).hasClass("now_appoint_ac")) {
			commonUtils.showPop2("您已经预约过该直播！");
		} else {
			if (identityMode == 0 && !touristsMode) {
				$(".loginBox").addClass("loginBoxac");
				$("#btn_botom").hide();
			} else {
				appoint_pwd = window.localStorage.getItem("yuyue_pwd");
				yuyue_passd = window.localStorage.getItem("yuyue_pass");
				if ( !showBind ) {
					if(defaultAuthorization){
						$("#example_video_1").hide();
						$(".mobile_bind").show();
						return false;
					}					
				} if (commonUtils.checkStr(live_permit) && live_permit == 1) {
					if ((appoint_pwd == liveID && yuyue_passd == live_pass)) {
						console.log("预约查询是否是默认授权："+defaultAuthorization);
						// 第三方授权，显示预约框
						if(!defaultAuthorization){
							$(".appoint_shuru").show();
						}else{
							appointment(mobile);
						}
						
					} else {
						$(".view_code").show();
						document.getElementById("pass0").click();
						$("#pass0").focus();
					}
				} else if (commonUtils.checkStr(live_permit) && live_permit == 2) {				
					is_pay(0);
				} else if (commonUtils.checkStr(live_permit) && live_permit == 3) {
					
					autoCheckCode();
					var menpiaoCode = window.localStorage.getItem(liveID);
					if ((appoint_pwd == liveID && yuyue_passd == live_pass) || isWatch == 1 || window.localStorage.getItem(liveID + menpiaoCode) == 'true') {
						console.log("预约查询是否是默认授权："+defaultAuthorization);
						if(!defaultAuthorization){
							$(".appoint_shuru").show();
						}else{
							appointment(mobile);
						}
					} else {
						console.log("密码框1");
						$(".view_tickets").show();						
						document.getElementById("via0").click();
						$("#via0").focus();
						$("#loginBtn").hide();
					}
				}
				else if (commonUtils.checkStr(live_permit) && live_permit == 4 || window.localStorage.getItem('liveId' + liveID) == 'true') {									
					if(commonUtils.checkStr(mobile)){
						isWhiteList();
					}else{
						$(".mobile_bind").show();
					}
				}
				else {
					console.log("预约查询是否是默认授权："+defaultAuthorization);
					if(!defaultAuthorization){
						$(".appoint_shuru").show();
					}else{
						appointment(mobile);
					}
				}
			}
		}
	});

	$(".sure_appoint").on("click", function () {
		checkPhone();
	});
	//	检查预约输入的手机号
	function checkPhone() {
		var phone = document.getElementById('appoint_inpput').value;
		if (!(/^1[3456789]\d{9}$/.test(phone))) {
			$("#appoint_inpput").val("");
			$(".appoint_span").css("visibility", "visible");
			return false;
		} else {
			appointment_phone = $("#appoint_inpput").val();
			appointment(appointment_phone);		
		}
	}
	//uid用户ID;user_inphone发送短信手机号;appoint_type预约登录的方式;loin_account登录的唯一标识，可能是手机号也可能是微信标识。
	var user_inphone;
	function appointment(user_inphone) {
		var appointment_time = (new Date()).valueOf().toString().MD5();
		$.ajax({
			type: "POST",
			data: {
				user_id: uid,
				mobile: user_inphone,
				make_type: 1,
				live_id: liveID,
				appoint_source: 2,
			},
			url: config.lhServerUrl + '/api/mwlive/live/live_make.do',
			dataType: "json",
			success: function (data) {
				//console.log(data);
				if (data.data == 'true' || data.code == 412) {
					ismake = 1;
					$(".appoint_span").css("visibility", "hidden");
					$(".appoint_shuru").hide();
					$(".now_appoint").text("立即进入");
					$(".now_appoint").addClass("now_appoint_ac");
					$(".tishi_de").fadeIn();
					// 预约成功重新查询直播间预约人数
					findeliveStatus();
					setTimeout(function () {
						$(".tishi_de").fadeOut();
						
				
					}, 3000);
					// 进入直播间进入直播间
					$("#appoint").removeClass("appoint_show");
					showQR();
				} else {
					$(".tishi_de .tishi_de_title").text("该直播ID不存在！");
					$(".tishi_de .tishi_de_title").css("marginTop", "0.8rem");
					$(".tishi_de").fadeIn();
					setTimeout(function () {
						$(".tishi_de").fadeOut();
					}, 2000)
				}

			},
			error: function () {
				$("#appoint").removeClass("appoint_show");
				console.log("select userInfo errord3");
			}
		})
	}


	//取消预约
	$(".cansole_appoint").on("click", function () {
		$(".appoint_shuru").hide();
		$(".appoint_span").css("visibility", "hidden");
		$("#appoint_inpput").val("");
	});
	$('#appoint_inpput').on('input propertychange', function () {
		$(".appoint_span").css("visibility", "hidden");
	});

	//初始化map
	/*initalizeGiftName(m_figtName);
	 initalizeGiftImg(m_img);
	 initalizeGiftMsg(m_msg);*/

	//下拉加载更多job
	var totalheight = 0;
	var scroll_i = 1; //加载下拉基数
	var timestamp = 0;
	$(".viewer_content").scroll(function () {
		var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
		totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
		//console.log("hh:"+$(document).height());
		//console.log("tt:"+totalheight);
		if (($(document).height() - 200) <= totalheight) {
			var timestamp1 = (new Date()).valueOf();
			if ((timestamp1 - timestamp) > 1000) {
				timestamp = timestamp1;
				//滑到底部时，加载其它
				var pageSize = 10;
				var pageNo = scroll_i;
				if (hasNext) {//总共的记录要查询的
					var timestamp2 = (new Date()).valueOf();
					scroll_i++;
					console.log("查询");
				}
			}
		}
	});
	//防抖
	function debounce(func, wait, immediate) {
		// 定时器变量
		var timeout;
		return function () {
			// 每次触发 scroll handler 时先清除定时器
			clearTimeout(timeout);
			// 指定 xx ms 后触发真正想进行的操作 handler
			timeout = setTimeout(func, wait);
		};
	}

	/*	接收聊天消息
	 * 	@params v_nickname:名称，v_img：头像，msg：消息内容，giftImg：礼物图片路径，send_time：发送时间，flag：字幕0，礼物1,
	 * 	sourceApproch:1 用户点击实时操作,0系统自动下发,msgobj_uid:用户id,show_msg:0禁言状态，1非禁言
	 */
	var touch_true = true;
	var chatTransLate = 0;
	var animationNum = 0;
	var startInvq = 0;
	function loadMsg(v_nickname, v_img, msg, giftImg, send_time, msg_id, flag, sourceApproch, msgobj_uid,type,adminTag) {
		var msgid_repead = "#" + msg_id;
		if (commonUtils.checkStr($(msgid_repead).attr("id"))) {
			return false;
		}
		var time_cha;
		function diy_time(time1, time2) {
			time1 = Date.parse(new Date(time1));
			time2 = Date.parse(new Date(time2));
			time_cha = Math.abs(parseInt((time2 - time1) / 1000 / 3600 * 60));
		}
		var time_cha2;
		function diy_time2(time1, time2) {
			time1 = Date.parse(new Date(time1));
			time2 = Date.parse(new Date(time2));
			time_cha2 = Math.abs(parseInt((time2 - time1) / 1000 / 3600 * 60));
		}
		var time1 = $('.send_time').last().text();
		var time2 = new Date().format("yyyy-MM-dd hh:mm");
		var sl = $('.send_time').length;
		if (sl >= 1) {
			var time3 = $('.send_time').eq(sl - 1).text();
			var time4 = send_time;
		}
		if (flag == 0) {
			if(type=="1"){
				// 进入直播间
				var str = adminTag ?'<div class="admin_tag bg_linear"><span class="po_ab">'+adminTag +'</span><span class="no_dispaly">'+adminTag +'</span></div>':"";
				html = '<li id=' + msg_id + '><div class="msg_mian"><a  class="avatar" title="' + v_nickname + '"><img class="img-circle" src=' + v_img + ' /></a><div class="msg">'+ str +'<span class="nick-name nowrap" title="' + v_nickname + '">' + v_nickname + '</span><span class="span_p">' + msg + '</span></div></div></li>';				
			}else if(adminTag){
				// 管理员头衔
				html = '<li id=' + msg_id + '><div class="msg_mian"><a  class="avatar" title="' + v_nickname + '"><img class="img-circle" src=' + v_img + ' /></a><div class="msg"><div class="admin_tag bg_linear"><span class="po_ab">'+adminTag +'</span><span class="no_dispaly">'+adminTag +'</span></div><span class="nick-name nowrap" title="' + v_nickname + '">' + v_nickname + '</span><span  class="span_p">' + msg + '</span></div></div></li>';

			}else{
				html = '<li id=' + msg_id + '><div class="msg_mian"><a  class="avatar" title="' + v_nickname + '"><img class="img-circle" src=' + v_img + ' /></a><div class="msg"><span class="nick-name nowrap" title="' + v_nickname + '">' + v_nickname + '</span><span class="span_p">' + msg + '</span></div></div></li>';

			}
			
			$("#chat-list").append(html);
			
		}
		else {
			//显示字幕、颜色设置
			var msgTmp = msg.split(":")[1];
			var html;
			html = '<li id=' + msg_id + '><div class="msg_mian"><a  class="avatar" title="' + v_nickname + '"><img class="img-circle" src=' + v_img + ' /></a><div class="msg"><span class="nick-name nowrap" title="' + v_nickname + '">' + v_nickname + '</span><span  class="span_p"><font style="color: #ffa300;font-size: 0.4rem;">' + msgTmp + '</font></span></div></div></li>';
			$("#chat-list").append(html);
			if (sourceApproch == 1) {
				//使用队列排队显示动画效果
				var giftParamsArry = new Array(); 	//礼物队列参数数组
				giftParamsArry[0] = v_nickname;
				giftParamsArry[1] = v_img;
				giftParamsArry[2] = msg.split(":")[1];
				giftParamsArry[3] = giftImg;
				giftParamsArry[4] = animationNum;
				animationNum++;
				queueShowGiftArry.unshift(giftParamsArry);
				startInvq = setTimeout(Queue, 100);
				$("#audio").attr("src", "sounds/1.mp3");
				//$("#audio")[0].play();
				//Queue();
			}
			/* document.getElementById("gift_animation").style.animation="move 3s ease-in-out";
			 document.getElementById("gift_animation").style.animationDuration="5"*/
			/*var m_img = new Map();
			 initalizeGiftImg(m_img);
			 var img_id = "giftSpe"+getRandom(0,9999);
			 var inner = document.getElementById("chatListUl").innerHTML + '<li><a class="p-nameL">'+v_nickname+':</a><a>'+msg+'</a><img id="'+img_id+'"></li>';
			 document.getElementById('chatListUl').innerHTML=inner;
			 document.getElementById(img_id).src = m_img.get(msg);*/
		}
		var chatBox = $('.page-chat');
		var timerFi = 0;
		var seetT;
		document.getElementById("page-iscroll").addEventListener('touchstart', function () {
			touch_true = false;
			clearTimeout(seetT);
		}, false);
		document.getElementById("page-iscroll").addEventListener('touchmove', function () {
			touch_true = false;
			clearTimeout(seetT);
		}, false);
		document.getElementById("page-iscroll").addEventListener('touchend', function () {
			seetT = setTimeout(function () {
				touch_true = true;
			}, 3000)
		}, false);
		if (touch_true == true && ONSWITCHCHAT == true) {
			chatBox[0].scrollTop = chatBox[0].scrollHeight;
		}
		if (msgobj_uid == uid && ONSWITCHCHAT == true) {
			chatBox[0].scrollTop = chatBox[0].scrollHeight;
		} else if (firstCom == 0) {
			//$('.wrapper').stop().animate({scrollTop:$('.wrapper')[0].scrollHeight},200);//置底滚动条
			//chatBox[0].scrollTop = chatBox[0].scrollHeight;
			window.clearTimeout(timerFi);
			console.log('firstCom', firstCom)
			timerFi = setTimeout(function () {
				firstCom = 1;
				console.log('firstCom', firstCom)
			}, 1e3);
		}
		//触发弹幕
		playDanmu(msg);
		/*var page_iscroll = $('#page-iscroll');
		 page_iscroll[0].scrollTop = page_iscroll[0].scrollHeight;*/
	}


	//队列--1.5s显示一个礼物动画
	var queueShowGiftArry = new Array();
	var queueShowGift = 0;
	/*
	 * @params v_nickname:用户名，v_img：用户头像,msg:消息，giftImg:礼物,animationNum,动画id基数
	 */
	function Queue() {
		//clearInterval(startInvq);
		clearInterval(queueShowGift);		//清除定时器
		if (queueShowGiftArry.length <= 2) {
			showGiftImg();
		}
		queueShowGift = setInterval(showGiftImg, 1.5e3);
	}
	//调用礼物显示
	function showGiftImg() {
		if (queueShowGiftArry.length > 0) {
			var giftParamArryTmp = queueShowGiftArry.pop();	//从队列中拉取数据
			console.log(giftParamArryTmp);
			var v_nickname_Tmp = giftParamArryTmp[0];
			var v_img_Tmp = giftParamArryTmp[1];
			var msg_Tmp = giftParamArryTmp[2];
			var giftImg_Tmp = giftParamArryTmp[3];
			var animationNum_Tmp = giftParamArryTmp[4] % 2;
			createGift(v_nickname_Tmp, v_img_Tmp, msg_Tmp, giftImg_Tmp, animationNum_Tmp);
		} else {
			clearInterval(queueShowGift);		//清除定时器
		}
	}
	//礼物动画效果
	function createGift(v_nickname_Tmp, v_img_Tmp, msg_Tmp, giftImg_Tmp, animationNum_Tmp) {
		var giftTmpID = "gift_animation" + animationNum_Tmp;
		/* if(!commonUtils.checkStr(("#gift_animation0").attr("id"))){
		 giftTmpID = "gift_animation0";
		 }else if(!commonUtils.checkStr(("#gift_animation1").attr("id"))){
		 giftTmpID = "gift_animation1";
		 }*/
		var htmlGift = '<div class="' + giftTmpID + '" id="' + giftTmpID + '"><div class="viewer_style" style="background: url(' + v_img_Tmp + ') center no-repeat ;    background-size: 100% 100%;"></div><div class="viewer_infor">' +
			'<p class="viewer_name">' + v_nickname_Tmp + '</p><p class="gift_name">' + msg_Tmp + '</p></div><div class="sent_gift" style="background: url(' + giftImg_Tmp + ') center no-repeat;    background-size: cover;"></div></div>';
		$("#giftList").append(htmlGift);
		setTimeout(function () {
			var giftCurID = "#" + giftTmpID;
			$(giftCurID).remove();
			
		}, 3000);
	}

	var sourceApproch = 0;	//聊天消息来源  0默认系统下发
	var end_show_type = 0;//播放结束
	end_show_img = "";
	end_show_vod = "";
	var red_flag = 1;
	//创建和获取聊天室信息
	var occerChatRoomNum = 0;
	var bagDate1 = 0;		//红包开始时间
	var bagDate2 = 0;		//红包结束时间
	var flag_line = 0;     //直播信号中断 0未中断 1中断
	var v_roomid;     //聊天室ID
	var joinroomflag = true;  //
	function createOrOccerChatRoom() {
		var joinID;
		if (ws != null) {
			return false;
		}
		if (null == liveID || !commonUtils.checkStr(liveID)) {
			commonUtils.showPop2("系统异常");
			return false;
		}
		if (commonUtils.checkStr(videoID)) {
			joinID = videoID;
		}
		else {
			joinID = liveID;
		}
		//console.log(liveID);
		var ajaxOccerRoom = $.ajax({
			type: "POST",
			async: false,
			timeout: 8000, //超时时间设置，单位毫秒,去除白名单不出现
			data: {
				"cmd": "lb",
				"liveID": joinID
			},
			url: config.disServerUrlNew + '/dispatcher.action',
			dataType: "json",
			success: function (data) {
				//console.log(data);
				v_serveraddr = data.out_room_ServerAddress;
				v_roomid = data.out_roomID;
				// yst==
				// end_show_type = data.end_show_type;
				// end_show_img = data.end_show_img;
				// end_show_vod = data.end_show_vod;

				//insertToDb();	//添加访问记录
				var opts = {
					'transports': ['websocket'],
					'reconnection delay': 2000
				};
				ws = io.connect(v_serveraddr, opts);
				commonUtils.ws = ws;
				//console.log("imgUrlimgUrl"+imgUrl);
				console.log("链接直播间的uid" + uid);
				ws.on('connect', function () {
					var joinUserId = uid;
					console.log("uid:===="+uid)
					if (commonUtils.checkStr(uid) && uid.toString().length <= 14) {
						joinUserId = '';
					}
					var user = {
						cmd: 1001,			 //命令号
						appID: 3,			 //应用标识
						user_type: 102,
						roomID: v_roomid,
						nickName: nickname,
						user_id: joinUserId,		//用户ID    类型：整形
						imgUrl: imgUrl,			//用户头像链接 类型：字符串
						gender: 1			//性别
					};
					ws.emit('join', user);

				});
				ws.on('reconnecting', function () {
					// var user = {
					// 	cmd:1001,			 //命令号
					// 	appID:3,			 //应用标识
					// 	user_type: 102,
					// 	roomID: v_roomid,
					// 	nickName: nickname,
					// 	user_id:uid,		//用户ID    类型：整形
					// 	imgUrl:imgUrl,			//用户头像链接 类型：字符串
					// 	gender:1			//性别
					// };
					// ws.emit('join', user);
					//$("#chat-list li").not(":first").remove();
				});
				var countLine = 0;
				// var liveID = 1178309224503521299;      //测试live_id
				// var	phone_renwu = 80080080089;				 //测试phone
				// var photo_renwu;
				// var name_renwu;
				// var position_renwu;
				// var content_renwu;
				// console.log('重要人物1==>', phone_renwu);
				// if(commonUtils.checkStr(phone_renwu)){

				// }
				var firstEnterFlag = '';//是否第一次加入房间,用来做加入房间的提示限制
				//系统广播
				ws.on('sys', function (sysMsg) {
					var msgobj = sysMsg;
					//console.log(msgobj);
					var v_cmd = msgobj.cmd;
					var v_nickname = msgobj.nickName;
					var v_msg = msgobj.msg;
					var v_room_reviced_flowers = msgobj.data.room_reviced_flowers;
					v_room_online_users = msgobj.data.room_online_users;//在线观看人数
					setTimeout(function () {
						///限制观看人数
						if (joinroomflag == true&&v_room_online_users) {
							checkConcurrent(v_room_online_users);
							joinroomflag = false;
						}
											
					}, 300);

					//加入房间
					var black_status = msgobj.data.black_status;
					var total_viewers = msgobj.data.total_views;
					$("#numRecord").text(total_viewers);
					if (commonUtils.checkStr(black_status) && black_status == 1) {
						showLive(2);
						isbalck_stutas = 1;
						$("#appoint").addClass("appoint_show");
						$(".livetime_end").css("visibility", "hidden");
						$(".livetime_end2").show();
						$(".livetime_end2").text("您已经被踢出房间");
						$(".page-footer,#btn_botom").hide();
						$("#btn_botom").remove();
						return false;
					}
					//公告栏
					
					if (v_cmd == 5001) {
						//公告栏优化
						noticeTime = 0;
						if (liveExit == 0) {
							return false;
						}
						if (commonUtils.checkStr(msgobj.data.msgbody) && noticeConnect != msgobj.data.msgbody) {
							var msgTimer = null;							
							noticeConnect = msgobj.data.msgbody;
							noticeConnect = JSON.parse(noticeConnect);
							$(".Notice").show();
							if(commonUtils.getUrlParam("videoid")){
								$("#default_li").css("margin-top", "0.25rem");
							}else{
								$("#default_li").css("margin-top", "0.25rem");
							}
							$("#noticeContent").text(noticeConnect.msg);
							var rightW = $("#noticeContent").width();
							var noticeWid = $(".Notice").width();
							$("#noticeContent").css("right",'-'+rightW+"px");						
							$("#noticeContent").animate({right:noticeWid+"px"},16000,"linear",function(){
								$("#noticeContent").css("right",'-'+rightW+"px");
								noticeStop = true;
							}); 												
						}	
					}		
					// 禁言与解禁			
					if (v_cmd == 2011 && uid == msgobj.data.silence_user_id) {
						ISsilence_single = true;
						if(!ISsilence_all){
							silenceFun(1,'single');// 单个禁言
						}						
					}					
					if (v_cmd == 2012 && uid == msgobj.data.silence_user_id) {
						ISsilence_single = false;
						if(!ISsilence_all){
							silenceFun(0,'single');// 单个解禁	
						}				
					}

					if (v_cmd == 1001) {
						// 加入房间
					
						var adminTag = 	msgobj.data.admin_tag && msgobj.isAdmin==1 ? msgobj.data.admin_tag : null;
						$("#numRecord").text(msgobj.data.total_views);						
						if (msgobj.msg == '加入房间') {
							// 禁言功能
							silence_all  =  msgobj.data.silence_all;// 全体禁言
							silence_single = msgobj.data.silence;// 单个禁言
							// 全体禁言
							if(silence_all){
								ISsilence_all = true;
								silenceFun(silence_all,'all');
							}else if(silence_single == "1" && uid == msgobj.user_id){
								ISsilence_single = true;
							}
							//单个禁言
							if(!silence_all && silence_single == 1 &&  uid == msgobj.user_id){	
								ISsilence_single = true;							
								silenceFun(silence_single,'single');
							}								
							if (firstEnterFlag.indexOf(msgobj.user_id) == -1) {
								firstEnterFlag += msgobj.user_id;
								if(commonUtils.getUrlParam("liveid")){
									if(adminTag){
										loadMsg(v_nickname, v_img, '进入直播间', giftImg, send_time, msg_id, 0, sourceApproch, msgobj_uid,1,adminTag);
									}else{
										loadMsg(v_nickname, v_img, '进入直播间', giftImg, send_time, msg_id, 0, sourceApproch, msgobj_uid,1);
									}
								}else{
									if(adminTag){
										loadMsg(v_nickname, v_img, '进入房间', giftImg, send_time, msg_id, 0, sourceApproch, msgobj_uid,1,adminTag);
									}else{
										loadMsg(v_nickname, v_img, '进入房间', giftImg, send_time, msg_id, 0, sourceApproch, msgobj_uid,1);
									}
								}
							}
						}
						// 公告栏优化
						if(msgobj.msg == '人数更新'){
							noticeTime ++;
							if(noticeTime > 3 && noticeStop == true){
								$(".Notice").hide();
								if(commonUtils.getUrlParam("videoid")){
									$("#default_li").css("margin-top", "0rem");
								}else{
									$("#default_li").css("margin-top", "0rem");
								}
							}
							
						}
					}
					if (v_cmd == 1004) {		//字幕弹幕消息
						var msg = msgobj.data.msgbody;
						var msgobj_uid = msgobj.user_id;
						var msg_id = msgobj.msg_id;
						var giftWorld = "";
						var giftImg = "";
						var v_img = msgobj.sender_head;
						var adminTag;
						try {
							adminTag = 	msgobj.data.admin_tag && msgobj.isAdmin==1 ? msgobj.data.admin_tag : null; //管理员标识/头衔
						} catch (error) {}

						console.log("禁言msg_id==>", msg_id);
						if (msgobj.msg == '提示消息') {
							return false;
						}
						if (msg_id == 0) {
							$("#input_world").attr('placeholder', '你已被主播禁言');
							$("#input_world").attr("disabled", true);
							$(".chatroom_ic_pen").hide();
						}
						if (v_img == "/0" || !commonUtils.checkStr(v_img)) {
							v_img = "http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/17/image/timg2.jpg";
						}
						var send_time = msgobj.send_time;
						var send_times = new Date(send_time);
						hourd = send_times.getHours();
						if (hourd <= 12) {
							send_time = send_times.format("yyyy-MM-dd hh:mm");
						}
						else if (hourd > 12) {

							send_time = send_times.format("yyyy-MM-dd hh:mm");
						}
						// 昵称显示为手机号bug
						// v_nickname = commonUtils.phoneSec(v_nickname);

						if (v_msg == "礼物") {	//礼物
							var giftName = msg.split(":")[1];
							giftImg = m_img.get(giftName);		//礼物对应显示图
							loadMsg(v_nickname, v_img, msg, giftImg, send_time, msg_id, 1, sourceApproch, msgobj_uid);	//礼物
						} else {
							loadMsg(v_nickname + ":", v_img, msg, giftImg, send_time, msg_id, 0, sourceApproch, msgobj_uid,null,adminTag);	//字幕
						}
					}
					
					if (v_cmd == 1005) {		//礼物消息
						
						var msg = msgobj.data.msgbody;
						var msgobj_uid = msgobj.user_id;
						var msg_id = msgobj.msg_id;
						var giftWorld = "";
						var giftImg = "";
						var v_img = msgobj.imgUrl;
						if (msgobj && commonUtils.checkStr(msgobj.user_type) && (msgobj.user_type == "101" || msgobj.user_type == "100")) {	//app
							v_img = msgobj.sender_head;	//头像
							msg = msgobj.data.giftName;	//礼物名称
							giftImg = msgobj.data.giftImg;	//礼物图片
						}
						if (v_img == "/0" || !commonUtils.checkStr(v_img)) {
							v_img = "http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/17/image/timg2.jpg";
						}
						var offline = msgobj.offline;
						if (offline == 1) {	//系统下发
							sourceApproch = 0;
						} else {
							sourceApproch = 1;
						}
						var send_time = msgobj.send_time;
						var send_times = new Date(send_time);
						hourd = send_times.getHours();
						if (hourd <= 12) {
							send_time = send_times.format("yyyy-MM-dd hh:mm");
						}
						else if (hourd > 12) {

							send_time = send_times.format("yyyy-MM-dd hh:mm");
						}
						giftImg = m_img.get(msg);		//礼物对应显示图
						// 昵称显示为手机号bug
						// v_nickname = commonUtils.phoneSec(v_nickname);
						msg = v_nickname + ": 赠送了一个" + msg;
						// 礼物消息顺序
						// setTimeout(function () {
							loadMsg(v_nickname, v_img, msg, giftImg, send_time, msg_id, 1, sourceApproch, msgobj_uid);	//礼物
						// }, 1500);
						// 榜单没有实时刷新
						// giftAll();
					}
					if (v_cmd == 6031) {		//头衔变更
						var adminTag;
						try {
							adminTag = msgobj.data.admin_tag; //管理员标识/头衔
						} catch (error) {}
						$(".admin_tag").text(adminTag);
					}
					if (v_cmd == 1055) {
						var msg1055 = msgobj.data;
						console.log(msg1055);
						if (msg1055.customize_type == 802) {//重要人物入场

							if (vitalMan.length > 0) {
								vitalMan.push(msg1055);
							} else {
								vitalMan.push(msg1055);
								vitalManOnJoin();
							}
						}
					}
					if (v_cmd == 1055 && now_url.indexOf("vLive") >= 0) {
						isappoint();
						var msg1055 = msgobj.data;
						if (msg1055.back_run == 1 && msg1055.customize_type == 801) {
							showLive(5);
							console.log('直播异常,切后台');
							return false;
						}
						if (msg1055.customize_type == 800) {
							
						}
						return false;
					}
					if (v_cmd == 2020) {		//上拉加载历史聊天记录，数据包的格式传输
						var msg2020 = msgobj.data;
						console.log(msg2020);
						//上拉聊天历史 插入界面显示
						var allsms = msg2020.allsms;
						var html = new StringBuffer();
						if (allsms.length > 0) {
							if (noticeFlag == 0) {
								var load_zhuang = '<div class="load_zhuang"></div>';
							}
							else {
								var load_zhuang = '<div class="load_zhuang load_zhuangac"></div>';
							}
							$("#chat-list").before(load_zhuang);
							var s = setTimeout(function () {
								clearTimeout(s);
								$(".load_zhuang").remove();
								if (allsms.length < 20) {
									HASNEXT = false;
									if (noticeFlag == 0) {
										var loadTips = '<p id="loadTips">已加载到顶...</p>';
									}
									else {
										var loadTips = '<p id="loadTips" class="loadTips_ac">已加载到顶...</p>';
									}
									html.append(loadTips);
									setTimeout(function () {
										$("#loadTips").remove();
									}, 2e3);
								}
								for (var sms_i = 0; sms_i < allsms.length; sms_i++) {
									var send_time = allsms[sms_i].send_time;
									var send_time_d;
									if (sms_i < allsms.length - 1) {
										send_time_d = allsms[sms_i + 1].send_time;
									}
									if (allsms.length == 1) {
										send_time_d = $(".send_time").first().text();
									}
									var send_times = new Date(send_time);
									var send_time_ds = new Date(send_time_d);
									hourd = send_times.getHours();
									if (hourd <= 12) {
										send_time = send_times.format("yyyy-MM-dd hh:mm");
										send_time_d = send_time_ds.format("yyyy-MM-dd hh:mm");
									}
									else if (hourd > 12) {

										send_time = send_times.format("yyyy-MM-dd hh:mm");
										send_time_d = send_time_ds.format("yyyy-MM-dd hh:mm");
									}
									var headImg = allsms[sms_i].sender_head;
									if (allsms[sms_i] && commonUtils.checkStr(allsms[sms_i].user_type) && (allsms[sms_i].user_type == "101" || allsms[sms_i].user_type == "100")) {	//app
										v_img = allsms[sms_i].sender_head;	//头像
										msg = allsms[sms_i].data.giftName;	//礼物名称
										giftImg = allsms[sms_i].data.giftImg;	//礼物图片
									}
									if (!commonUtils.checkStr(headImg) || headImg == "/0") {
										headImg = "http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/17/image/timg2.jpg";
									}
									if (allsms[sms_i].cmd == 1004) {
										var time_cha3;
										function diy_time3(time1, time2) {
											time1 = Date.parse(new Date(time1));
											time2 = Date.parse(new Date(time2));
											time_cha3 = Math.abs(parseInt((time2 - time1) / 1000 / 3600 * 60));
										}
										var time3 = send_time;
										var time4 = send_time_d;
										diy_time3(time3, time4);
										// 昵称显示为手机号bug
										allsms[sms_i].nickName = allsms[sms_i].nickName;
										//if(time_cha3<5){
										html.append('<li id=' + allsms[sms_i].msg_id + '><div class="msg_mian"><a  class="avatar" title="' + allsms[sms_i].nickName + ':"><img class="img-circle" src=' + headImg + ' /></a>');
										html.append('<div class="msg"><span class="nick-name nowrap" title="' + allsms[sms_i].nickName + ':">' + allsms[sms_i].nickName + ':</span><span class="span_p">' + allsms[sms_i].data.msgbody + '</span></div></div></li>');
									

									} else if (allsms[sms_i].cmd == 1005) {
										//var msg05Tmp = allsms[sms_i].nickName + ": 送出了一个"+ allsms[sms_i].data.msgbody;
										var giftName = allsms[sms_i].data.msgbody;
										var v_img = allsms[sms_i].imgUrl;
										if (allsms[sms_i] && commonUtils.checkStr(allsms[sms_i].user_type) && (allsms[sms_i].user_type == "101" || allsms[sms_i].user_type == "100")) {	//app
											v_img = allsms[sms_i].sender_head;	//头像
											giftName = allsms[sms_i].data.giftName;	//礼物名称
										}
										var msg05Tmp = "赠送了一个" + giftName;

										if (commonUtils.checkStr(allsms[sms_i].user_type) && (allsms[sms_i].user_type == "101" || allsms[sms_i].user_type == "100")) {	//app
											v_img = allsms[sms_i].sender_head;	//头像
											msg05Tmp = "赠送了一个" + allsms[sms_i].data.giftName;	//礼物名称
										}
										else if (!commonUtils.checkStr(allsms[sms_i].imgUrl) && (allsms[sms_i].imgUrl == "/0" || !commonUtils.checkStr(allsms[sms_i].sender_head))) {
											v_img = "http://mwfore.mvaas.cn/H5/videoplayer/mw_liveKing/17/image/timg2.jpg";
										}
										// 榜单没有实时刷新
										// giftAll();
										var time_cha4;
										function diy_time4(time1, time2) {
											time1 = Date.parse(new Date(time1));
											time2 = Date.parse(new Date(time2));
											time_cha4 = Math.abs(parseInt((time2 - time1) / 1000 / 3600 * 60));
										}
										var time5 = send_time;
										var time6 = send_time_d;
										diy_time4(time5, time6);
									
										html.append('<li id=' + allsms[sms_i].msg_id + '><div class="msg_mian"><a  class="avatar" title="' + allsms[sms_i].nickName + '"><img class="img-circle" src=' + v_img + ' /></a>');
										html.append('<div class="msg"><span class="nick-name nowrap" title="' + allsms[sms_i].nickName + '">' + allsms[sms_i].nickName + '</span><span  class="span_p"><font style="color: #ffa300;font-size: 0.4rem;">' + msg05Tmp + '</font></span></div></div></li>');
										
									}
								}
								$("#default_li").after(html.toString());
								var sctValue = allsms.length * 1.3369 * view_show_w;
								if (ONSWITCHCHAT) {
									//$('#wrapper_scroll').scrollTop(sctValue);//滚动条回到加载记录前位置
									$('.page-chat').animate({ scrollTop: sctValue }, 0);
								}
							}, 1000);

						}
					}
					if (v_cmd == 2001) {	//自定义消息--流量红包
						//console.log("2001");
						if (liveExit == 0) {	//直播已删除  不显示红包
							return false;
						}
						if (commonUtils.checkStr(msgobj.data.msgbody)) {
							var msg2001 = JSON.parse(msgobj.data.msgbody);
							var bagName = msg2001.name;
							if (bagDate1 != 0 && bagDate1 == msg2001.date1 && bagDate2 != 0 && bagDate2 == msg2001.date2) {
								//红包链接已更换
								if (commonUtils.checkStr($("#redBag").attr("id"))) {
									//delRedBag();
									//clearInterval(redBagintVal);
									//console.log(msg2001.date2)
								}
							}
							bagDate1 = msg2001.date1;
							bagDate2 = msg2001.date2;
							var bagDatetime = msg2001.datetime;
							wallet = msg2001.wallet;
							walleterImg = msg2001.portrait;
							walleterName = msg2001.name;
							var bagSt = (new Date(bagDate1)).valueOf() / 1000;	//开始时间转换成秒--少8小时
							var bagEnd = (new Date(bagDate2)).valueOf() / 1000;	//结束时间转换成秒
							var bagDatetimeNow = (new Date(bagDatetime)).valueOf() / 1000;	//系统当前时间转换成秒
							if (bagEnd - new Date().valueOf() / 1000 <= 0) {
								//console.log("红包已结束");
								if (commonUtils.checkStr($("#redBag").attr("id"))) {
									delRedBag();
									clearInterval(redBagintVal);
									return false;
								}
							} else {
								if (bagSt - new Date().valueOf() / 1000 > 0) {
									//	console.log("红包未开始");
									if (commonUtils.checkStr($("#redBag").attr("id"))) {
										delRedBag();
										clearInterval(redBagintVal);
										return false;
									}
								} else {
									//console.log("红包已开始");
									if (commonUtils.checkStr($("#redBag").attr("id"))) {
										//设置红包倒计时
										var djsTime = bagEnd - new Date().valueOf() / 1000;
										var djsHtml = secondToDate(djsTime);
										$("#redBagDjs").text(djsHtml);
										redBagDjsT(djsTime);
										if (bagSt - new Date().valueOf() / 1000 >= -20) {
											console.log("执行弹出红包1");
											if (!$("#appoint").hasClass("appoint_show")) {
												$("#redBag").click();
											}
										}
										return false;
									}
									createRedBag();
									if (bagSt - new Date().valueOf() / 1000 >= -20) {
										console.log("执行弹出红包2");
										setTimeout(function () {
											if (!$("#appoint").hasClass("appoint_show")) {
												$("#redBag").click();
											}
										}, 2000);
									}
									//设置红包倒计时
									var djsTime = bagEnd - new Date().valueOf() / 1000;
									var djsHtml = secondToDate(djsTime);
									$("#redBagDjs").text(djsHtml);
									redBagDjsT(djsTime);

								}
							}
							//console.log(new Date());
							//console.log(msg2001);
						}
					}
					if (v_cmd == 2002) {	//直播状态变更通知
						if(commonUtils.getUrlParam("liveid")){
							isappoint();
							var msg2002 = msgobj.data;
							var liveIDTmp = msg2002.liveID;	
							if (liveID == liveIDTmp) {
								// 聊天室返回的
								commonUtils.liveStatus = msg2002.live_status;
								data_detail.data.live_status = commonUtils.liveStatus;
								if (commonUtils.liveStatus == 1) {
									showLive(0);
									commonUtils.showPop3("start");
									if (leftDjsTime > 0) {
										flag_line = 1;//直播信号中断并且有倒计时
									}
									isLive(liveUrl);
									config.isLive = true;
									if (live_permit == 0 || isWatch == 1) { 
										// 进入直播间
										$("#appoint").removeClass("appoint_show");
										showQR();
									}
									$("#videoBox").css({"background":''});
									$("#videoBox").show();
									// 微博视频封面修复
									// $("#example_video_1,#play_btn").show();
									$("#video_IMG,#play_btn").show();

									// 播放结束显示双播放器bug
									$("#example_video_1").hide();
									// 直播已开始跟播放器上面提示不一致
									$("#startReady").css("opacity","0")
									$(".live_tips .loading").show();
									$(".livetime_end").text("正在直播中…");

								} else if (commonUtils.liveStatus == 2) {
									// 视频双播放
									if(navigator.userAgent.match(/android/i)){
										$("#video_IMG").show();
										$("#example_video_1").css({"height":"0","margin-top":"200%"});						
									}  						
									show3Af();
									commonUtils.showPop3("end");																				
									if (end_show_type == 0) {
										$(".livetime_end").text("直播已结束");
										showLive(2);									
										$(".over_img").hide();
										$("#videoBox").show();
										$("#appoint").addClass("appoint_show");//show 预约界面		
										// 直播结束bug修复0905				
										$("#video_IMG,#play_btn").show();
										// 播放结束显示双播放器bug
										$("#example_video_1").hide();
									
			
									}else if(end_show_type == 1 && commonUtils.checkStr(end_show_img) && !config.isLive){
										$(".over_img").show().css({"background":'transparent url("' + end_show_img + '") 50% 50% no-repeat','background-size': 'cover'});
										$("#videoBox").hide();
										// 直播结束还有声音
										$("#example_video_1").pause();
									}else if (end_show_type == 2 && end_show_vod) {
										commonUtils.playURL = $("video")[0].src = end_show_vod;
										$("video")[0].src = end_show_vod;
										$(".over_img").hide();
										$("#videoBox").show();
										$("#video_IMG,#play_btn").show();
										// 播放结束显示双播放器bug
										$("#example_video_1").hide();
									};
									liveOnOff(2);
									clearInterval(upTime);
								}
								else if (commonUtils.liveStatus == 10) {  //封禁限制
									$('.Arrears').show();
									document.getElementById("live_djs").style.display = "table";
									document.getElementById("example_video_1").pause();
									showLive(2);
									$(".appoint_top").css({"background":'transparent url("image/mobile/video-default.jpg?ver=1.4") 50% 50% no-repeat','background-size': 'cover'});
									clearInterval(upTime);
								}
								else if (commonUtils.liveStatus == 4) { //直播已删除
									$(".delete_live").hide();						
									$(".livetime_end2,#startReady").text("预告已过期");
									var height = $(".appoint_top").height()+'px';	
									$(".livetime_end2").css({ 'background':'url("image/blur.png") center center no-repeat','height':height,'line-height':height}).show();
									$("#startReady").css("font-weight","600");
									
								}
								else if(commonUtils.live_switch == 3){ //直播已下线
									$(".tapeout_live").show();
									$("#appoint").addClass("appoint_show");//show 预约界面
									$(".appoint_img").attr("src","image/mobile/video-default.jpg?ver=1.4");
									$(".livetime_end").show();
									$(".livetime_end").text("房间已被下线");
									$("#btn_botom,.livetime_end2,#djs_ready").hide();
									clearInterval(upTime);
									return false;
								}
								else if (commonUtils.liveStatus == 11) {  //主播余额不足
									showLive(2);
									$("#appoint").addClass("appoint_show");
									$(".page-footer").hide();
									$("#appoint_mode_center").css("height","100%");
									$(".livetime_end").remove();
									$(".livetime_end2").show();
									$("#btn_botom").css("visibility", "hidden");
									$(".livetime_end2").html("主播余额不足,无法观看");
									clearInterval(upTime);
								}
							}
							changeLiveShow();
						}		
					}
					if (v_cmd == 2021) {	//清除聊天室聊天记录
						console.log("2021");
						if(commonUtils.getUrlParam('liveid')){
							$("#chat-list li").not(":first").remove();
						}else{
							$("#chat-list li").remove();
						}	
						
					}
					if (v_cmd == 2022) {	//清除聊天室单条记录
						console.log("2022");
						var msg2022 = msgobj.data;
						var msg_id = msg2022.msg_id;
						var user_id = msg2022.user_id;
						if (commonUtils.checkStr(msg_id)) {
							var remId = "#" + msg_id;
							if (!commonUtils.checkStr($(remId).attr("id"))) {
								return false;
							}
							$(remId).remove();
						}
					}
					
					if (v_cmd == 2023) {	//清除聊天室聊天记录并禁言
						console.log("2023");
						// var msg2023 = msgobj.data;						
						// show_msg = msg2023.show_msg;
						// 不显示聊天
						// if (show_msg != 1) {
						// 	//$("#chat-list li").not(":first").remove();
						// 	if(commonUtils.getUrlParam('liveid')){
						// 		$("#chat-list li").not(":first").hide();
						// 	}else{
						// 		$("#chat-list li").hide();
						// 	}							
						// 	var htmlStr = '<li id="admin000"><a class="avatar" title="管理员"><img class="img-circle" src="https://y1.cnliveimg.com/mobile/images/mobilehead/default/face_60X60.jpg"></a><div class="msg"><span class="nick-name nowrap" title="管理员">管理员</span>2017/8/22 下午6:42<p id="adminP001">聊天室已经被关闭</p></div></li>';
						// 	$("#input_world").val("此直播间已禁言");
						// 	$("#input_world").attr("disabled", true);
						// 	$(".chatroom_ic_pen").hide();
						// } else if (show_msg == 1) {														
						// 	if(commonUtils.getUrlParam('liveid')){
						// 		$("#chat-list li").not(":first").show();
						// 	}else{
						// 		$("#chat-list li").show();
						// 	}	
						// 	$("#input_world").attr('placeholder', '说点什么吧...');
						// 	// $("#input_world").attr("disabled", false);
						// 	$(".chatroom_ic_pen").show();
						// }
					}
					if (v_cmd == 2024) {
						// 全体禁言
						ISsilence_all  = msgobj.data.silence_all;
						if(ISsilence_single && !ISsilence_all){
							silenceFun(1,'single');
						}else{
							silenceFun(msgobj.data.silence_all,'all');
						}							
						console.log("全体禁言获取单个禁言"+silence_single);		
					}
					if (v_cmd == 2031) { //踢人（加入黑名单）
						var msg2031 = msgobj.data;
						if (msg2031.black_user_id == uid) {
							isbalck_stutas = 1;
							showLive(2);
							$("#appoint").addClass("appoint_show");
							$(".livetime_end").hide();
							$(".livetime_end2").show();
							$(".livetime_end2").text("您已被踢出该直播间");
							$(".page-footer,#btn_botom").hide();
							$("#btn_botom").remove();
							clearInterval(upTime);
							return false
						}
					}
					if (v_cmd == 2032) { //（移出黑名单）
						var msg2032 = msgobj.data;
						if (msg2032.black_user_id == uid) {
							document.location.reload();
						}
					}
				})
			},
			error: function (data) {
			
			},
			complete: function (data) { //请求完成后最终执行参数
			
			}
		})
	}
	//生成红包
	function createRedBag() {
		if ($("#desc_0710").hasClass('active')) {
			var htmlRed = '<div class="redBag" id="redBag" style="display: none;"><p id="redBagDjs"></p></div>';
		} else {
			var htmlRed = '<div class="redBag" id="redBag" style="display: block;"><p id="redBagDjs"></p></div>';
		}
		$("#gift_btn").before(htmlRed);
	}
	//删除红包
	function delRedBag() {
		$("#redBag").remove();
		$("#YuFrame1").remove();
	}
	//秒转换成时分秒
	function secondToDate(result) {
		var h = Math.floor(result / 3600);
		var m = Math.floor((result / 60 % 60));
		if (m >= 0 && m < 10) m = "0" + m;
		var s = Math.floor((result % 60));
		if (s >= 0 && s < 10) s = "0" + s;
		if (h > 0) return result = h + ":" + m + ":" + s;
		else if (m > 0) return result = m + ":" + s;
		else return result = s;
	}
	var redBagintVal = 0;
	var redBagDjsT = function (result) {
		var resultDjs = secondToDate(result);
		if (result <= 0) {
			clearInterval(redBagintVal);		//清除定时器
			delRedBag();
			return false;
		}
		$("#redBagDjs").text(resultDjs);
		result--;
		clearInterval(redBagintVal);		//清除定时器
		redBagintVal = setInterval(function () {
			redBagDjsT(result);
			//console.log("daojishi")
		}, 1e3);
	};
	function getLocalTime(nS) {
		var Now_time = new Date(parseInt(nS)).toLocaleString();
		return Now_time.substr(0, Now_time.length - 3);
	}

	//插入访问记录
	function insertToDb() {
		$.post(config.disServerUrlNew + '/.action', { "cmd": "add_visit_recoder", "uid": uid, "nickname": nickname, "location": imgUrl }, function (data) {
			if (data && data.resultCode == "200") {
				//console.log("记录插入成功");
			}
		})
	}

	console.log("nickname:" + nickname);
	console.log("unionid222:" + unionid);
	console.log("imgUrl:" + imgUrl);
	//console.log("openid222:"+weixin_uid);
	function weijion() {
		if (isWeiXin()) { //微信注册
			console.log("微信注册前的uid:" + uid);
			console.log("微信注册");
			console.log("微信unionid " + unionid);
			console.log("nickname " + nickname);
			console.log("imgUrl " + imgUrl);
			// 6表示使用unionID注册
			// 4表示使用openid注册
			var regType = commonUtils.checkStr(unionid) ? 6:4;
			$.ajax({
				type: "POST",
				data: {
					reg_type: regType,
					third_id: unionid||storage.openid,
					user_title: nickname,
					third_icon: imgUrl
				},
				url: config.lhServerUrl + "/api/mwlive/user/user_h5_third_register.do",
				dataType: "json",
				success: function (data) {
					console.log("user_h5_third_register.do", data)
					if (data.code == 200) {
						//console.log(data.data);		
						uid = data.data;
						identityMode = 1;//认证
						findeliveStatus(null,"wx");
						askVIdeoInfo();
						console.log("微信注册的uid:" + uid);
						if (window.localStorage && (window.localStorage.setItem('abcde', 123), window.localStorage.getItem('abcde') == 123)) {
							storage.uid = uid;
						}
						console.log('uid赋值1=>', uid)
						if (anchorID == uid || isWatch == 1) {
							// console.log("主播自动");
							if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
								return false;
							}
							// 进入直播间
							$("#appoint").removeClass("appoint_show");							
							$(".view_code").hide();
							$('.view_tickets').hide();
							$('.verify').hide();
							$("#loginBtn").hide();
							$(".start_way_t").removeClass("start_way_tac");
							$(".now_appoint,.now_in").show();
							$(".go_pay").hide();
							$(".start_way_t").html("付费(￥<span class='go_pay_money'>" + go_pay_noney + "</span>)");
							showQR();
						}
						findviewUserInfo(uid);
						isappoint();
						if (live_permit == 2) {
							isPay_true();
						}
						
						createOrOccerChatRoom();
					}
				}, error: function (data) {
					console.log('user_h5_third_register.do', data);
				}
			});
		}
		else {
			userpay_Id = openID;

		}
	}
	//setTimeout(function(){
	//	weijion();
	//},200);
	var barrage = 0;
	var ws = null;
	// 发送消息
	//console.log("微信UID："+uid);
	function findlookUser(curUserID) {
		$.ajax({
			type: "post",
			async: false,
			data: {
				id: curUserID
			},
			url: config.lhServerUrl + "/api/mwlive/user/get_userinfo.do",
			dataType: "json",
			success: function (data) {
				if (commonUtils.checkStr(data.data.show_id)) {
					console.log("参数：" + data.data.show_id);
					yunboid = data.data.show_id;
					user_phone = data.data.mobile;
				}
			}, error: function (data) {
			}
		})
	}
	$("#input_world").blur(function () {
		$(".chatroom_ic_pen").show();
		// $("#chat-input").css("width", 60 + "%");
		$("#sendBtn").removeClass("chat-inputac");
		$("#sendBtn").hide();
		$(".slide_nav").show();
		if ($("#input_world").val() != '') {
			// $(".slide_nav #gift_btn").css("display", "none");
			// $(".slide_nav .click_zan").css("display", "none");
		}
		if ($(this).val() != '') {
			$(".chatroom_ic_pen").hide();
			// $("#chat-input").css("width", 100 + "%");
			$("#sendBtn").addClass("chat-inputac");
		}
	});
	
	$("#input_world").focus(function () {
		$(".chatroom_ic_pen").hide();
		// $("#chat-input").css("width", 100 + "%");
		$("#chat-input #sendBtn").show();
		// $(".slide_nav").hide();
		if ($("#input_world").val() == '') {

			if(commonUtils.getUrlParam("liveid")){
				if(liveInfo.giftSwitch=="1"){
					$(".slide_nav #gift_btn").css("display", "block");
				}
			}		
			$(".slide_nav .click_zan").css("display", "block");
		}
		// 发送框优化
		$("#send_MSG").show();
		if(navigator.userAgent.match(/android/i)){
			$("#example_video_1").hide();
		}	
		$("#max_num").text($("#send_content").val().length);
		$("#send_content").focus();
		$(this).blur();
	});
	// 发送框优化
	$("#send_MSG .close").click(function(){
		$("#send_MSG").hide();
		if(navigator.userAgent.match(/android/i)){
			$("#example_video_1").show();
		}	
		console.log("点击发送框");
	});
	$("#send_MSG .ok_btn").click(function(){		
		sendMsg();
		$("#send_MSG").hide();
		if(navigator.userAgent.match(/android/i)){
			$("#example_video_1").show();
		}	
		console.log("点击发送框");
	});

	
	$("#send_content").on("input propertychange", function () {
		var num = $(this).val().length;
		if(num >140){
			var value =$("#send_content").val().substr(0,140);
			$("#send_content").val(value);
			$("#max_num").text(140);
		}else{
			$("#max_num").text(num);
		}
		
    });
	$("#sendBtn").click(function () {
		if ($(this).val() != '') {
			// $(".slide_nav #gift_btn").css("display", "none");
			// $(".slide_nav .click_zan").css("display", "none");
		}
		else {
			if(commonUtils.getUrlParam("liveid")){
				if(liveInfo.giftSwitch=="1"){
					$(".slide_nav #gift_btn").css("display", "block");
				}
			}	
			
			$(".slide_nav .click_zan").css("display", "block");
			
		}
	});
	$("#input_world").on('keyup paste', function () {
		if ($(this).val() != '') {
			$("#sendBtn").addClass("chat-inputac");
		}
		else {
			$("#sendBtn").removeClass("chat-inputac");
		}
	});
	function sendMsg() {
		// var inputMsg = $("#input_world").val();
		// 发送框优化
		var inputMsg = $("#send_content").val();
		if (inputMsg == null || inputMsg == "" || inputMsg.match(/^[ ]+$/)) {
			return;
		}
		$("#send_content").val("");
		issend_time = 1;
		if (ws) {
			sourceApproch = 1;	//消息来源  用户实时操作
			ws.emit("msg", {
				//imgUrl:imgUrl,
				cmd: 1004,
				msg: '弹幕',
				nickName: nickname,
				user_id: uid,
				show_id: yunboid,
				imgUrl:imgUrl,
				barrage: parseInt(barrage),
				data: {
					msgbody: inputMsg
				}
			})
			chatCount++;
		}
		$("#input_world").blur();
		$(".chatroom_ic_pen").show();
		// $("#chat-input").css("width", 60 + "%");
		$("#chat-input #sendBtn").hide();
		//$(".gift_content").hide();
	}
	//发送礼物
	function sendGiftMsg() {
		console.log("发送礼物消息====聊天室")
		issend_time = 1;
		var inputMsg = $("#input_gift").val();
		if (inputMsg == null || inputMsg == "") {
			return;
		}
		var giftMes = inputMsg;
		var id = m_msg.get(giftMes);	//礼物id
		var giftImg = m_img.get(inputMsg);
		if (ws) {
			sourceApproch = 1;	//消息来源  用户实时操作
			ws.emit("msg", {
				//imgUrl:imgUrl,
				cmd: 1005,
				msg: '礼物',
				nickName: nickname,
				send_time: new Date(),
				imgUrl: imgUrl,
				user_id: uid,
				show_id: yunboid,
				giftImg: giftImg,
				data: {
					msgbody: giftMes,
					giftName: giftMes,
					giftImg: giftImg,
					id: id
				}
			})
			sendCourtesy++;
		}
		$(".gift_content").hide();

	}
	var video = $('video');//获取界面video
	//判断视频类型 false 非直播 true 直播
	//http://testhls.facebac.com/live/7e9a82f909128718c34c/playlist.m3u8?token=8f082eed9b5b917ee873&secret=87f7500c5e1b4b9b948226f846c464c5&ckey=e9dffdb4d9bfd2bb13eda46fc7c9d7dc
	function isLive(liveUrl) {
		if (commonUtils.checkStr(liveUrl) && now_url.indexOf("vLive") >= 0 || (data_detail && data_detail.data.live_status == 1)) {
			//直播初始化
			// 直播状态显示
			$("#change-definitions00").text("直播中");
			var watch_num = commonUtils.checkStr(data_detail.data.play_count)?data_detail.data.play_count:'0'                 
			$("#viewsNum").text(watch_num +'人看过');
			$("#live_showIcon").show();
			$("#change-definitions00").addClass("redchange");
			$("#liveActive").show();
			$("#liveNone").hide();
			$("#logo").hide();
			$("#live_showIcon").show().removeClass("blue");
			$(".live_icon").text("直播");
			config.isLive = true;
			return;
			// }
		}
		$("#change-definitions00").text("回放");
		// 回放icon
		$("#live_showIcon").show().addClass("blue");
		$(".live_icon").text("回放");
		$("#change-definitions00").removeClass("redchange");
		$("#liveActive").hide();
		$("#liveNone").show();
		$("#logo").show();

		config.isLive = false;
		//return false;
	}
	//------弹幕start-----

	$("#player-danmu").danmu({
		left: 0,
		top: 0,
		height: "100%",
		width: "100%",
		speed: 13e3,
		zindex: 97,
		opacity: 1,
		font_size_small: 14,
		font_size_big: 20,
		top_botton_danmu_time: 6e3
	});
	$("#player-danmu").danmu("danmuResume");
	$(".danmuBtn").click(function (e) {
		e.stopPropagation();
		if ($(this).hasClass("active")) {
			$("#player-danmu").danmu("danmuStop");
			$(this).removeClass("active");
			barrage = 0;
		} else {
			$("#player-danmu").data("danmuList", {});
			$("#player-danmu").danmu("danmuStart");
			$(this).addClass("active");
			barrage = 1;
		}
	});
	$("#danmuBtn").click(function (e) {
		e.stopPropagation();
		if ($(this).hasClass("active")) {
			$("#player-danmu").danmu("danmuStop");
			$(this).removeClass("active").addClass("none");
			barrage = 0;
		} else {
			$("#player-danmu").data("danmuList", {});
			$("#player-danmu").danmu("danmuStart");
			$(this).addClass("active").removeClass("none");
			barrage = 1;
		}
	});
	var colorRandom = "white";
	function playDanmu(text) {
		if ($("#danmuBtn").hasClass("active")) {
			$("#player-danmu").danmu("addDanmu", {
				text: text,
				time: $("#player-danmu").data("nowTime") + 1,
				color: getReandomColor(),
				size: 0,
				position: 0
			});
		}
	}
	//弹幕测试
	/*setInterval(function() {
	 playDanmu("test");
	 },100)*/

	//随机数
	function rand(min, max) {
		return parseInt(Math.random() * (max - min) + 1) + min;
	}

	//弹幕
	/*function danmu(str){
	 　　var _top = rand(0,18);
	 　　var danmuobj = $('<div style="position: absolute;height:1.2rem; font-size: 1.1rem;z-index: 10;overflow: hidden; white-space: nowrap;">'+str+'</div>')
	 　　danmuobj.css({"left":$(window).width()+"5rem"})
	 　　danmuobj.css({color:getReandomColor()})
	 　　$("#body").append(danmuobj);
	 　　var num = $(window).width();
	 　　setInterval(function(){
	 　　　　num--;
	 　　　　if (num<0) {
	 　　　　num=$(window).width();
	 　　　　}
	 　　　　danmuobj.css({left:num,top:_top+"rem"});
	 　　},20)
	 }*/
	//随机颜色
	function getReandomColor() {
		return '#' + (function (h) {
			return new Array(7 - h.length).join("0") + h
		})((Math.random() * 0x1000000 << 0).toString(16))
	}

	//-------弹幕end-------------
	//礼物支付
	//调用微信JS api 支付 --- START---- wqs 	2017-7-20 17:22:45
	var prepay_id;
	var paySign;
	var appId;
	var timeStamp;
	var nonceStr;
	var packageStr;
	var signType;
	var orderNo;

	function payPublic() {
		var choice_gift = $("#gift li").find(".clickActive").parent('.gift_stytle').parent('li').attr('id');
		var choice_giftname = $("#gift li").find(".clickActive").parent('.gift_stytle').parent('li').find('.gift_name').text();
		var choice_price = $("#gift li").find(".clickActive").parent('.gift_stytle').parent('li').find('.gift_price font span').text();
		var giftimgurl = $("#gift li").find(".clickActive").parent('.gift_stytle').parent('li').find('.gift_price font').text();
		var id = $('.active_gift').attr("id");	//礼物id
		var totalFeeStr = $("#giftMoney").val();
		if (!commonUtils.checkStr(totalFeeStr)) {
			commonUtils.showPop2("请先选择礼物");
			return false;
		}
		if (choice_price == "免费") {
			var id = $('.active_gift').attr("id");	//礼物id
			var payVideoId = getReceiveVideoID(config.isLive);
			console.log("支付对象videoid："+payVideoId);
			$.ajax({
				type: "POST",
				data: {
					giveUserID: uid,
					receiveUserID: anchorID,
					receiveLiveID: liveID,
					receiveVideoID: payVideoId,
					giftID: id,
					giftCount: 1
				},
				url: config.lhServerUrl + "/mwcurrency/giveGiftH5.action",
				dataType: "json",
				success: function (data) {
					console.log("礼物支付成功没有呀！")
					console.log(data)
					if (data.resultCode == "01") {
						sendGiftMsg();
					}
					else {
						commonUtils.showPop2("数据异常，请稍后再试!");
					}
				}, error: function (data) {
					//$(".click_zan").hide();
					commonUtils.showPop2("数据异常，请稍后再试!");
				}
			})
		}
		else {
			var recharge_type = 1;
			if (isWeiXin()) {
				recharge_type = 1;
			}
			else {
				recharge_type = 2;
			}
			choice_price = parseInt(choice_price);
			var giftMes = $(this).find(".gift_name").text();
			var inputMsg = $("#input_gift").val();
			var giftMes = inputMsg;
			var id = $('.active_gift').attr("id");	//礼物id
			var phone_num = "";
			var choice_price = $("#gift li").find(".clickActive").parent('.gift_stytle').parent('li').find('.gift_price font span').text();
			choice_price = parseFloat(choice_price).toFixed(2);
			if (openIDTmp.toString().length == 11) {
				phone_num = openIDTmp;
			}
			else {
				phone_num = ""
			}
			if (!commonUtils.checkStr(videoID)) {
				videoID = "";
			}
			payOpenID = payOpenID?payOpenID:1;
			// 送礼receiveLiveID /receiveVideoID
			var payType = getPayType(config.isLive);
			var payVideoId = getReceiveVideoID(config.isLive);
			$.ajax({
				type: "POST",
				async: true,			
				data: {
					openId: payOpenID,		 //微信id
					number: config.payMoney || choice_price,           //金额
					user_id: uid,      	 //送礼人id
					userName: nickname,   //送礼人昵称
					phoneNumber: phone_num,   //送礼人手机号					
					imgUrl: imgUrl,           //头像		
					giftID: id,              // 礼物id
					giftCount: 1,            //礼物数量
					thirdKey:payOpenID ,             // 礼物数量
					pay_type:payType,//1：直播间，2：点播间
					receiveUserID:anchorID,    //主播id
					receiveLiveID: liveID || commonUtils.getUrlParam("videoid"),  //直播间id	
					receiveVideoID: payVideoId,  //直播间id
				},
				url: config.vboApi + "wecha_pay/gift_wecha_pay",		///api/mwh5/payRecord/ toPay.do  云播支付
				dataType: "json",
				success: function (data) {
					if(data.code == "1"){
						data = data.result;
						orderNo = data.orderNo;			
						appId = data.appId;
						nonceStr = data.nonceStr;					
						packageStr = data.package;
						signType = data.signType;
						timeStamp = data.timeStamp;										
						paySign = data.paySign;
						console.log("支付："+appId)
						callpay();
					}else{
						commonUtils.showPop2("主播临时关闭支付功能");
						console.log("不能支付："+data.msg);
						$(".appoint_shuru").hide();
					}					
				},

				error: function () {				
					commonUtils.showPop2("系统错误，请稍后再试!");
				}
			});
		}


	}
	// 微信公众号支付回调
	function jsApiCall(type) {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				appId: appId,
				timeStamp: timeStamp,
				nonceStr: nonceStr,
				package: packageStr,
				signType: signType,
				paySign: paySign
			},
			function (res) {
				WeixinJSBridge.log(res.err_msg);
				if (res.err_msg == 'get_brand_wcpay_request:ok') {
					sendGiftMsg();
					if (isplay_view == 1 || type=="tickets") {
						if (data_detail.data.live_status == 0) {
							if (ismake == 0) {
								if(!defaultAuthorization){
									$(".appoint_shuru").show();
								}else{
									appointment(mobile);
								}
							}else {
								$(".now_appoint").text("立即进入");
								$(".now_appoint").addClass("now_appoint_ac");
							}
						} else {
							$(".now_in").click();
							if(commonUtils.getUrlParam("videoid")){
								$("#joinVideo").click();
							}
						}
					}
				} else {
					commonUtils.showPop2("支付失败");
				}
			}
		);
	}

	function callpay(type) {
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', jsApiCall);
				document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			}
		} else {
			jsApiCall(type);
		}
	}
	//调用微信JS api 支付 --- END----
	//是否付费成功
	function isPay_true() {
		var payUserID = commonUtils.getUrlParam("liveid")?anchorID :anchorID_video;
		console.log( "支付支付主播房间："+payUserID);
		$.ajax({
			type: "POST",
			async: false,
			data: {
				user_id: uid,
				live_id: liveID,
				receive_user_id: payUserID	
			},
			url: config.payUrl + "/mwh5/api/mwh5/payRecord/viewPay_isok.do",		///api/mwh5/payRecord/ toPay.do
			dataType: "json",
			success: function (data) {
				// 已付费
				if (data.data == 1) {
					if (data_detail.data.live_status == 0) {
						// 没有预约
						if (ismake == 0) {							
							// 没有倒计时
							if(leftDjsTime >0 ){
							}else{
								$(".now_appoint").show();
								$(".appoint").addClass("appoint_show");
							}							
						} else {
							console.log("预约了");
							$(".now_appoint").text("立即进入");
							$(".now_appoint").addClass("now_appoint_ac");
							$(".appoint").removeClass("appoint_show");
						}
					} else {
						window.localStorage.setItem('liveId' + liveID, 'true');
						$(".now_in").click();
						if(commonUtils.getUrlParam("videoid")){
							$("#joinVideo").click();
						}
					}

				}else{
					if(anchorID == uid){
						console.log("主播的付费直播间");
						$("#appoint").removeClass("appoint_show");
					}else{
						$(".go_pay").css('z-index','1000');
					}
								
				}
			},
			error: function () {
				commonUtils.showPop2("系统错误，请稍后再试!");
			}
		})
	}
	//是否付费观看
	var isplay_view = 0;
	// 是否调用付费
	var pay_flag = true;
	function is_pay(type) {
		if (window.localStorage.getItem('liveId' + liveID) == 'true' || isWatch == 1) {			
			// 没有倒计时没有预约
			if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
				console.log("预约查询是否是默认授权："+defaultAuthorization);
				if(!defaultAuthorization){
					$(".appoint_shuru").show();
				}else{
					appointment(mobile);
				}
				console.log("付费观看权限liveId:"+liveID);
				console.log("付费观看权限:"+isWatch);
				return false;
			}
			// 付费未预约			
			// 进入直播间			
			$("#appoint").removeClass("appoint_show");	
			showQR();	
			return false;
		}else{
			$(".appoint").addClass("appoint_show");
		}
		var payUserID =  commonUtils.getUrlParam("liveid")?anchorID :anchorID_video;
		$.ajax({
			type: "POST",
			async: true,
			data: {
				user_id: uid,
				live_id: liveID,
				receive_user_id: payUserID
			},
			url: config.payUrl + "/mwh5/api/mwh5/payRecord/viewPay_isok.do",		///api/mwh5/payRecord/ toPay.do
			dataType: "json",
			success: function (data) {
				console.log("房间付费是否成功=======>", data);
				console.log("支付主播=="+ payUserID);
				var pay_result = data.data;
				if (data.data == 1) {
					if (data_detail.data.live_status == 0) {
						if (data_detail.data.live_status == 0) {
							// 没有预约并且有倒计时
							if (ismake == 0 && leftDjsTime >0) {
								console.log("预约查询是否是默认授权："+defaultAuthorization);
								if(!defaultAuthorization){
									$(".appoint_shuru").show();
								}else{
									appointment(mobile);
								}								
							} else {
								$(".now_appoint").text("立即进入");
								$(".now_appoint").addClass("now_appoint_ac");
								$(".appoint").removeClass("appoint_show");
							}
						} else {
							window.localStorage.setItem('liveId' + liveID, 'true');
							$(".now_in").click();
						}
					} else {
						$(".now_in").click();
						if(commonUtils.getUrlParam("videoid")){
							$("#joinVideo").click();
						}
					}
				}else {
					if(commonUtils.getUrlParam("videoid")){
						$("#joinVideo").click();
					}
					//付费观看
					var paymoney = $('.go_pay_money').text();
					paymoney = parseFloat(paymoney).toFixed(2);
					var payType = commonUtils.getUrlParam("liveid")?1:2;
					var showtype = 1;//1为微信内支付；2为浏览器支付
					if (!commonUtils.checkStr(videoID)) {
						videoID = '1';
					}
					if (!isWeiXin()) {
						//在浏览器付费观看
						weixin_uid = '1';
						showtype = 2;
					}
					payOpenID = payOpenID?payOpenID:1;
					console.log("支付的付费直播间openid:"+payOpenID);
					// 房间付费		
					if(pay_flag == true && type != 0){
						var payData = {							
							openId:payOpenID,
							number:config.payMoney|| paymoney,
							user_id: uid,
							pay_type: payType,
							receive_user_id: payUserID ,
							live_id: commonUtils.getUrlParam("liveid")||commonUtils.getUrlParam("videoid")
						}
						if(isWeiXin()){
							$("#go_pay").attr("disabled",true);	
							$.ajax({
								type: "POST",
								data:payData,
								url: config.vboApi + "wecha_pay/pay_wecha_pay",		///api/mwh5/payRecord/ toPay.do
								dataType: "json",
								success: function (data) {
									if(data.code=='1'){
										data = data.result;
										console.log(data);
										// V播微信支付
										if (isWeiXin()) {
											appId = data.appId;
											nonceStr = data.nonceStr;
											packageStr = data.package;
											signType = data.signType;
											timeStamp = data.timeStamp;
											paySign = data.paySign;
											orderNo = data.orderNo;
											callpay();
											isplay_view = 1;
										}									
									}else{
										commonUtils.showPop2("支付失败"+data.msg);
										console.log("支付失败"+data.msg);
										$(".appoint_shuru").hide();
									}
									pay_flag = true;
									$("#go_pay").removeAttr("disabled");	
								},
								error: function () {								
									pay_flag = true;
									commonUtils.showPop2("系统错误，请稍后再试!");
									$("#go_pay").removeAttr("disabled");
								}
							});
						}else{
							$.ajax({
								type: "POST",
								data: payData,
								url: config.vboApi + "wecha_pay/pay_h5_pay",		///api/mwh5/payRecord/ toPay.do
								dataType: "json",
								success: function (data) {
									if(data.code=='1'){
										var data = data.result;
										var orderWebPNo = data.orderNo;
										window.localStorage.orderWebPNo = orderWebPNo;
										location.href = data.mweb_url;										
									}else{
										commonUtils.showPop2("支付失败："+data.msg);
										console.log("支付失败："+data.msg);
										$(".appoint_shuru").hide();
									}
									pay_flag = true;							
								},
								error: function () {								
									pay_flag = true;
									commonUtils.showPop2("系统错误，请稍后再试!");
								}
							});
						}						
					}
				}
			},
			error: function () {
				commonUtils.showPop2("系统错误，请稍后再试!");
			}
		})
	}

	//点击付费观看
	// $(".go_pay").on("click",function(){
	// 	if(isWeiXin()){
	// 		is_pay();
	// 	}
	// 	else {
	// 		//var ua = navigator.userAgent.toLowerCase();
	// 		//if((ua.match(/MicroMessenger/i) == 'micromessenger')||(ua.match(/WeiBo/i) == "weibo")||(navigator.userAgent.indexOf(' QQ') > -1)){	//微信浏览器或者是在手机QQ
	// 		//	document.getElementById("wxTip").style.display="block";
	// 		//	$("#wrap_n,.appoint").addClass("blur_bg");
	// 		//}else{
	// 		//	is_pay();
	// 		//}
	// 		if(identityMode==1){
	// 			is_pay();
	// 		}
	// 		else {
	// 			$(".loginBox").addClass("loginBoxac");
	// 		}
	// 	}
	// });

	// 付费观看
	$("#go_pay").on("click", function () {
		var showBind =   getUserInfo(uid) ?getUserInfo(uid).mobile:"";
		if (isWeiXin()) {			
			if (!showBind && defaultAuthorization) {
				$("#example_video_1").hide();
				$(".mobile_bind").show();
				return false;
			}
			var userId = commonUtils.getUrlParam("liveid") ? anchorID : anchorID_video;
			if(commonUtils.checkStr(storage.userInfo_third)){
				checkAppid(JSON.parse(storage.userInfo_third).appid,userId,1);			
			}else{
				// storage.clear();
				// location.href = getAccreditUrl(userId);
			}			
			is_pay();
		}else {
			if (identityMode == 1) {
				if (!showBind && defaultAuthorization) {
					$("#example_video_1").hide();
					$(".mobile_bind").show();
					return false;
				}
				is_pay();
			} else {
				$(".loginBox").addClass("loginBoxac");
				$("#btn_botom").hide();
			}
		}
		//  is_pay();
	});
	//付费观看end
	//防止下拉露底
	$(".player-area,.video-contorl,.video-contorl").on('touchmove', function (event) {
		event.preventDefault();
	});
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	if (isAndroid) {
		//stopDrop();
		$("#danmuBtn").hide();
		//$("#anzuo_head").show();
		$(".btTips_mide").addClass("btTips_mide_andor");
		$(".btTips").hide();
		$('.chatViewBox').on('touchstart', function (event) {
			event.stopPropagation();
		});
	} else {
		$("#danmuBtn").show();
		//$("#anzuo_head").hide();
	}
	$('.player-area').on('touchstart', function (event) {
		event.stopPropagation();
	});
	function stopDrop() {
		//
		var lastY;//最后一次y坐标点
		$('.wrapper').on('touchstart', function (event) {
			lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
		});
		$('.wrapper').on('touchmove', function (event) {
			var y = event.originalEvent.changedTouches[0].clientY;
			var st = $(this).scrollTop(); //滚动条高度
			if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
				lastY = y;
				event.preventDefault();
			}
			lastY = y;
		});
	}

	//是否专属直播间
	function isWhiteList() {
		$.ajax({
			type: "POST",
			async: false,
			data: {
				live_id: liveID,
				phone: user_phone
			},
			url: config.lhServerUrl + "/api/mwlive/user/select_oneWhiteList.do",
			dataType: "json",
			success: function (data) {
				console.log(data);
				if (data.code != '200') {
					return false
				}
				isCheckWhite = true;// 验证过白名单身份
				if (data && data.data == null && window.localStorage.getItem('liveId' + liveID) != 'true' && anchorID != uid && data_detail.data.isWatch != 1) {
					$("#appoint").addClass("appoint_show");
					$(".verify").show();
					isWhite = false
				} else {
					window.localStorage.setItem('liveId' + liveID, 'true');
					isWhite = true
					if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
						console.log("预约查询是否是默认授权："+defaultAuthorization);
						if(!defaultAuthorization){
							$(".appoint_shuru").show();
						}else{
							appointment(mobile);
						}
						return false;
					}
					$(".verify").hide();

					// 进入直播间
					$("#appoint").removeClass("appoint_show");
					showQR();
				}
			},
			// error:function(){
			// 	$("#appoint").removeClass("appoint_show");
			// }
		})
	}

	//直播状态、密码、等业务处理
	var live_times;
	var live_server_time;
	var live_basic_client_time;
	var leftTime;
	var leftDjsTime;
	var firstFlag = true;
	//		直播初始化
	var data_detail;
	var liveUrl;
	var active_id;
	var live_permit = 0;	// 是否加密
	var callback_url = "";	//第三方回调地址
	var coverImgUrl0811 = "image/mobile/video-default.jpg?ver=1.4";//直播封面
	var findU;
	function updataLiveContent() {
		if (commonUtils.checkStr(videoID)) {
			config.isLive = false;
			window.clearInterval(startIntVal);
			window.clearInterval(secondMinIntVal);
			videoInit();
		} else {
			config.isLive = true;
			liveInit();
		}
	}
	//直播初始化
	//直播初始化
	var askLiveInfoNum = 0;
	var go_pay_noney;
	var live_pass;
	var live_switch;//是否是禁播 非0表示禁播
	var live_status; //直播已删除
	var live_name;

	function liveInit() {
		var ajaxLiveInfo = $.ajax({
			type: 'GET',
			url: config.lhServerUrl + '/api/mwlive/live/get_info.do',
			timeout: 8000, //超时时间设置，单位毫秒
			data: {
				id: liveID,
				user_id: uid,
				type:1//v播不同步云播
			},
			cache: false,
			dataType: 'json',
			success: function (data) {
				if (data.code == 200 && !data.data) {
					//显示无直播
					window.clearInterval(startIntVal);
					showLive(4);
					showAppointStatus(4);
					$('video')[0].style.background = 'transparent url("image/mobile/video-default.jpg?ver=1.4") 50% 50% no-repeat';
					$('video')[0].style.backgroundSize = "100% 100%";
					// $("#bg-img").attr("src", "image/mobile/video-default.jpg?ver=1.4");
					$(".appoint_top").css({"background":'transparent url("image/mobile/video-default.jpg?ver=1.4") 50% 50% no-repeat','background-size': 'cover'});
					$("#appShareImg").attr("src", "image/mobile/video-default.jpg?ver=1.4");
					$(".delete_live").show();
                    $(".delete_live_p").text("房间已被删除");
					liveExit = 0;
					$(".spinner").hide();
					$(".page_main").show();
					return false;
				}
				onlineCount = data.data.onlineCount ? data.data.onlineCount:"-1";
				data_detail = data;
				live_permit = data_detail.data.live_permit;
				anchorID = data_detail.data.user_id;
				v_user_online = data_detail.data.cur_viewers;
				// 获取页面设置
				getLiveInfo(anchorID);
				live_status = data_detail.data.live_status;
				live_logo = data_detail.data.live_Logo;
				live_name = data_detail.data.live_name;
				if(commonUtils.checkStr(data_detail.data.logoInfo)){
					setLogo(data_detail.data.logoInfo);
				}	
				initLogo();
				go_pay_noney = data_detail.data.view_pass;
				live_pass = go_pay_noney;
				if (live_permit == 1 && checkStr(live_pass)) {
					live_pass_length = live_pass.length;
					if (live_pass_length == 4) {
						$(".code_cover_list").addClass("code_cover_listac4");
						$(".code_cover_list li").eq(5).remove();
						$(".code_cover_list li").eq(4).remove();
					}
				}
				occerGiftList();
				var video_direc = data_detail.data.video_direc;
				if (video_direc == "0") {
					$(".show_way_t").text("横屏");
				}
				else {
					$(".show_way_t").text("竖屏");
				}

				if (live_status == 6) { //直播已删除
					$(".delete_live").show();
					$("#appoint").addClass("appoint_show");//show 预约界面
					$(".appoint_img").attr("src", "image/mobile/video-default.jpg?ver=1.4");
					$(".livetime_end").show();
					$(".livetime_end").text("房间已被删除");
					$("#btn_botom,.livetime_end2,#djs_ready").hide();
					clearInterval(upTime);
					// return false;
				} else if (live_status == 4) {						
					$(".livetime_end2,#startReady").text("预告已过期");
					var height = $(".appoint_top").height()+'px';	
					$(".livetime_end").css({ 'background':'url("image/blur.png") center center no-repeat','height':height,'line-height':height}).show();
					$("#startReady").css("font-weight","600");
					// clearInterval(upTime);
				}

				if (live_status == 0) {
					$(".livetime_end").text("直播即将开始");
					$(".appointCount span").text(data.data.appointCount);
				}
				// DataTransferItemList
				if (live_status == 2) {
					showReadyOrEnd = 1;
					pullVideo();
					
				}
				if(live_status!=0){
					$(".appointCount").hide();
				}
				if (commonUtils.checkStr(live_permit) || live_permit == 0) {
					if (live_permit == 0) {
						$(".start_way_t").text("免费");
						if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
							$("#appoint").addClass("appoint_show");
							// 不显示请提醒我
							// return false;
						}
						$("#appoint").removeClass("appoint_show");
						showQR();
					} else if (live_permit == 1) {
						$(".start_way_t").text("加密");
						$(".start_way_t").addClass("start_way_tac");
					} else if (live_permit == 2) {
						$(".start_way_t").text("付费");
						$(".start_way_t").addClass("start_way_tac");
						$(".now_appoint,.now_in").hide();
						$(".go_pay").show();
						go_pay_noney = parseFloat(go_pay_noney/10).toFixed(2);
						$(".start_way_t").html("付费(￥<span class='go_pay_money'>" + go_pay_noney + "</span>)");
						if (anchorID == uid || window.localStorage.getItem('liveId' + liveID) == 'true' || isWatch == 1) {
							if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
								return false;
							}
							// 进入直播间
							$("#appoint").removeClass("appoint_show");
							showQR();
						}
					} else if (live_permit == 3) {
						$("#appoint").addClass("appoint_show");
						$(".start_way_t").text("门票");
						$(".start_way_t").addClass("orange");
						
					}
					else if (live_permit == 4) {
						$("#appoint").addClass("appoint_show");
						$(".start_way_t").text("专属直播间");
						$(".start_way_t").addClass("start_way_tac");
					}
				}
				showQR();
				active_id = data_detail.data.active_id;
				callback_url = data_detail.data.callback_url;
				commonUtils.liveID = data_detail.data.id;
				commonUtils.liveStatus = data_detail.data.live_status;
				setTimeout(function () {
					if (commonUtils.liveStatus != 4 && !commonUtils.checkStr(storage.webPayorderNo) && !commonUtils.checkStr(storage.orderWebPNo)) {
						if(defaultAuthorization){
							// down_app();//浏览器里面自动打开app yst注释 正式要改
						}
						
					}
				}, 200);
				// 直播简介
				var detail_s = data_detail.data.live_text_imgs;
				if (commonUtils.checkStr(detail_s)) {
					var detail_sjson = JSON.parse(detail_s);
					if (detail_s != "[{}]" && detail_s.length > 20 && commonUtils.checkStr(detail_s)) {
						for (var i = 0; i < detail_sjson.length; i++) {
							if (commonUtils.checkStr(detail_sjson[i].contentDesc)) {
								$(".active_txt").append('<p>' + detail_sjson[i].contentDesc + '</p>');
							}
							if (commonUtils.checkStr(detail_sjson[i].show_url)) {
								$(".active_txt").append('<img src="' + detail_sjson[i].show_url + '">');
							}
							if (commonUtils.checkStr(detail_sjson[i].contentDesc) || commonUtils.checkStr(detail_sjson[i].show_url)) {
								$('.noData').hide();
							}
						}
						$(".active_txt").append('<div class="no_more"><p>-&nbsp;&nbsp;没有更多了&nbsp;&nbsp;-</p></div>');
					}else{
						$('.appoint_mode_center .active_txt').css('padding','0.15rem')
					}


				}
			
				//liveOnOff(2);		//测试
				Date.prototype.format = function (fmt) {
					var o = {
						"M+": this.getMonth() + 1,                 //月份
						"d+": this.getDate(),                    //日
						"h+": this.getHours(),                   //小时
						"m+": this.getMinutes(),                 //分
						"s+": this.getSeconds(),                 //秒
						"q+": Math.floor((this.getMonth() + 3) / 3), //季度
						"S": this.getMilliseconds()             //毫秒
					};
					if (/(y+)/.test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
					}
					for (var k in o) {
						if (new RegExp("(" + k + ")").test(fmt)) {
							fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						}
					}
					return fmt;
				};
				var unixTimestamp = new Date(data_detail.data.begin_time);
				var create_time = new Date(data_detail.data.create_time);
				var timestart = new Date(unixTimestamp).format("yyyy-MM-dd hh:mm");//直播开始时间
				var timecreate = new Date(create_time).format("yyyy-MM-dd hh:mm");
				//console.log("预约时间:"+unixTimestamp);
				if(data_detail.data.live_status=="2"){
					// 如果直播结束，即提前直播，显示直播开始时间
					$(".start_time_now").html(timestart);
				}else{
					if (!commonUtils.checkStr(data_detail.data.begin_time)) {
						if (commonUtils.checkStr(data_detail.data.create_time)) {
							$(".start_time_now").html(timestart);
						} else {
							$(".start_time_now").html("立即开始");
						}
					} else {
						$(".start_time_now").html(timestart);
					}
				}		
				
				
				if (data_detail.data.begin_time - new Date().getTime() > 0 && ismake != 1) {
					// 提前直播
					$("#appoint").addClass("appoint_show");	//show 预约界面
				}
				if (data_detail.data.timecreate - new Date().getTime() > 0 && ismake != 1) {
					// 提前直播
					$("#appoint").addClass("appoint_show");	//show 预约界面
				}
				if ((live_permit == 0 && commonUtils.liveStatus == 1) || (isWatch == 1 && live_permit != 0)) {
					if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
						// 进入直播间  不显示请提醒我，注释以下 ,x新增
						$("#appoint").addClass("appoint_show")
						// return false;
					}
					// 进入直播间  不显示请提醒我，注释以下
					$("#appoint").removeClass("appoint_show");
					showQR();
				}

				if (commonUtils.checkStr(data_detail.data.live_cover_url)) {
					$("#appShareImg").attr("src", data_detail.data.live_cover_url);
					$(".appoint_img").attr("src", data.data.live_cover_url);
					$(".appoint_top").css({"background":'transparent url("' + data.data.live_cover_url + '") 50% 50% no-repeat','background-size': 'cover'});
					//$('video')[0].poster = data_detail.data.live_cover_url;
				} else {
					data_detail.data.live_cover_url = "image/mobile/video-default.jpg?ver=1.4";
					$("#appShareImg").attr("src", data_detail.data.live_cover_url);
					$(".appoint_img").attr("src", data.data.live_cover_url);
					
				}
				console.log("下线==>", data);
				//是否是禁播 非0表示禁播  live_switch 0正常  1欠费 2运营禁封 3主播禁播
				live_switch = data_detail.data.live_switch;
				if ( live_switch == 2) {
					//document.getElementById("example_video_1").remove();
					$(".Arrears").show();
					showLive(2);
					$(".livetime_end").remove();
					$(".livetime_end2").show();
					$("#btn_botom").css("visibility", "hidden");
					$("#appoint_mode_center .appoint_img").attr("src", "image/mobile/video-default.jpg?ver=1.4");
					$(".livetime_end2").html("直播已结束");
				}
				// 下线
				if (live_switch == 3) {
					$(".Downline").show();
				}
				if (isbalck_stutas == 1) {
					showLive(2);
					isbalck_stutas = 1;
					$("#appoint").addClass("appoint_show");
					$(".livetime_end").css("visibility", "hidden");
					$(".livetime_end2").show();
					$(".livetime_end2").text("您已被踢出该直播间");
					$(".page-footer,#btn_botom").hide();
					$("#btn_botom").remove();
					clearInterval(upTime);
					return false;
				}
				if ((data_detail.data.live_status == 2) && (live_permit == 1 || live_permit == 2)) {
					$("#appoint").addClass("appoint_show");	//show 预约界面
				}

				$(".active_titlel").html(data_detail.data.live_name);

				if (commonUtils.liveStatus == 5) {  //直播结束无录像	
					var height = $(".appoint_top").height()+'px';			
					// showLive(5);
					$(".livetime_end").css("visibility", "hidden");
					$(".livetime_end2,#startReady").css({ 'background':'url("image/blur.png") center center no-repeat','height':height,'line-height':height}).show();
					$(".livetime_end2,#startReady").text("直播无录像");
					$("#startReady").css("font-weight","600");
					$("#appoint_mode_center").css('height',"100%");

				}
				live_server_time = data_detail.data.system_time / 1000;
				var timeCurr = new Date(data_detail.data.system_time).format("yyyy-MM-dd hh:mm:ss");
				//console.log("服务器当前时间:"+timeCurr);
				live_times = data_detail.data.begin_time / 1000;
				live_basic_client_time = (new Date().getTime()) / 1000;	//当前浏览器端基准时间
				// 不是游客登录，获取权限
				if (commonUtils.checkStr(uid) && uid.toString().length > 14 && !isWeiXin()) {				
					findviewUserInfo(uid);
					// 2.1.1需求 门票已失效
					if(data.data.isWatch == 2){
						$("#appoint").addClass("appoint_show");
						$("#loseEfficacy").show();
						window.localStorage.removeItem('liveId' + liveID);
						window.localStorage.removeItem('yuyue_pwd');
						window.localStorage.removeItem('yuyue_pass');
					}
				}
				if (commonUtils.checkStr(live_times) && commonUtils.checkStr(live_server_time) && live_times != 0) {
					leftTime = live_times - live_server_time + live_basic_client_time;			//倒计时+当前系统时间
					depSec();
				} else {
					leftDjsTime = -1;	//未设置时间
				}
				appoint_pwd = window.localStorage.getItem("yuyue_pwd");
				yuyue_passd = window.localStorage.getItem("yuyue_pass");
				if(defaultAuthorization){
					if ((((appoint_pwd == liveID && yuyue_passd == live_pass) && data_detail.data.live_status != 0) || window.localStorage.getItem('liveId' + liveID) == 'true' || (isWatch == 1 && live_permit != 0)) && isbindPhone == 1) {
						if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
								// 不显示请提醒我bug
							$("#appoint").addClass("appoint_show");
							// return false;
						}
						// 进入直播间
						$("#appoint").removeClass("appoint_show");
						showQR();
					}
				}
				
				else {
					$("#btn_botom .now_in").show();
				}
				if (end_show_type == 0 && leftDjsTime < 0) {
					if (commonUtils.checkStr(end_show_img)) {
						$(".appoint_img").attr("src", end_show_img);
						// $(".appoint_top").css({"background":'transparent url("' + end_show_img + '") 50% 50% no-repeat','background-size': 'cover'});
					}
				}

				// leftDjsTime >0 为倒计时
				// leftDjsTime < 0为不显示倒计时
			
				if (leftDjsTime < 0) {
					if ((((appoint_pwd == liveID && yuyue_passd == live_pass) && data_detail.data.live_status == 0) || window.localStorage.getItem('liveId' + liveID) == 'true' || (isWatch == 1 && live_permit != 0)) && isbindPhone == 1) {
						if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
							return false;
						}
						// 进入直播间
						$("#appoint").removeClass("appoint_show");
						showQR();
					}
					else {
						$("#btn_botom .now_in").show();
					}
					
				}
				

				// 有权限不显示预告页  
				/**
				 * 修复预约不显示请提醒我
				 * 线上bug
				 * 线上bug注释以下代码
				 */
				// if(data_detail.data.isWatch==1){
				// 	$("#appoint").removeClass("appoint_show");
				// }

				if(	data_detail.data.isWatch==1 ){
					// 预约状态有倒计时 没有预约成功
					if(data_detail.data.live_status ==0 && leftDjsTime >0 ){
						if(ismake != 1){
							$("#appoint").addClass("appoint_show");
						}
					}
					$("#appoint").removeClass("appoint_show");			
				}
				// 2.1.1需求 门票已失效 虚拟门票购买按钮 2.1.1
				var btnTyppe = 0;
				if(data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1){
					btnTyppe = 0;
				}else{
					btnTyppe = 1;
				}
				ticketPrice = parseFloat(data.data.ticket_price /10).toFixed(2);
				// 开启在线购买
				if(ticketPrice && ticketPrice !=0 && live_permit ==3){
					$("#btn_botom").css("visibility", "hidden");
					$('#tiketsBtn').html(template("liveInfoTem",{type:btnTyppe,money:ticketPrice})); 
					$(".ticket_price").text(ticketPrice);
					anchorQualify = data.data.qualify;
					// 门票是否付款
					isPay_true();
					// 失效门票关闭购买
					$(".btn_orange").show();
				}else{
					// 失效门票关闭购买
					$("#loseEfficacy .btn_orange").hide();
					$("#loseEfficacy .btn_blue").css("width","100%");
				}

				// 虚拟门票购买按钮 2.1.1w
				
				coverImgUrl0811 = data_detail.data.live_cover_url;
				var endShow20170811 = end_show_type;//&& commonUtils.checkStr(endShow20170811) && endShow20170811 !=1
				if (commonUtils.liveStatus != 2 && commonUtils.checkStr(endShow20170811) && endShow20170811 != 1) {
					// 视频播放器封面
					$('video')[0].style.background = 'transparent url("' + data_detail.data.live_cover_url + '") 50% 50% no-repeat';
					$('video')[0].style.backgroundSize = "100% 100%";
					//安卓默认播放按钮 隐藏
					$("#video_IMG").css({"background":'transparent url("'+ data_detail.data.live_cover_url +'") 50% 50% no-repeat','background-size': 'cover','opacity':'1'});
					$(".appoint_top").css({"background":'transparent url("' + data_detail.data.live_cover_url + '") 50% 50% no-repeat','background-size': 'cover'});
				}
				findUserInfo(anchorID);
				if (user_stutas == 1) {
					return false;
				}

				if (live_permit == 2) {
					isPay_true();
				}			
				findU = setInterval(function () {
					findUserInfo(anchorID);
					findviewUserInfo(uid);
					findeliveStatus();
				}, 20000);
				findeliveCondition();
				if (now_url.indexOf("video") >= 0) {		//当前录像
					return false;
				}
				DJS();	//逻辑处理  状态+时间 			
				console.log('anchorID3=>' + anchorID, 'uid=>' + uid);
				if (anchorID == uid || isWatch == 1) {
					if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
						$("#appoint").addClass("appoint_show");
						// return false;
					}
					// 进入直播间
					$("#appoint").removeClass("appoint_show");
					$(".view_code").hide();
					$('.view_tickets').hide();
					$('.verify').hide();
					$("#loginBtn").hide();
					showQR();
				}
				commonUtils.playURL = data_detail.data.play_m3u8_url;
				liveUrl = data_detail.data.play_m3u8_url;
				$("#preLoadSource").attr("href", commonUtils.playURL);		//设置预加载资源
				$("#preLoadSource1").attr("href", commonUtils.playURL);		//设置预加载资源
				// isLive(data_detail.data.play_m3u8_url);	        //显示直播/重播player
				$('.p_img').css({"line-height":$(".appoint_top").height()+'px','padding':'0'});
				// 访问上报调用
				upPageReport();
				var reportTimer = setInterval(function(){
					upPageReport();
				},60000);
				createOrOccerChatRoom();
				// 加载进度
				
			},
			error: function () {
				askLiveInfoNum++;
				if (askLiveInfoNum >= 5) {
					ajaxLiveInfo.abort();
					location.href = "reqError.html&ver=" + 10000 * Math.random(1, 10000);
					return false;
				}
				setTimeout(ajaxLiveInfo, 5000);
			},
			complete: function () { //请求完成后最终执行参数
				$(".spinner").hide();
				$(".page_main").show();		
				document.title = live_name;	
			}
		});
		
	}
	//录像初始化
	var askVideoInfoNum = 0;
	// 点播间初始化
	function videoInit() {
		var ajaxVideoInfo = $.ajax({
			type: 'post',
			url: config.mwlivedev + "mwlive/vod/getVodInfo.do",
			// timeout: 8000, //超时时间设置，单位毫秒
			data: {
				id: commonUtils.getUrlParam("videoid")
			},
			cache: false,
			dataType: 'json',
			success: function (data) {
				$("#appoint_show,.live_state").hide()
				if(data.code=="200"&&commonUtils.checkStr(data.data)){
					onlineCount = data.data.onlineCount ? data.data.onlineCount:"-1";
					data_detail = data;				
					$(".active_H,#active_title_id").html(data.data.vodName);
					document.title = data.data.vodName;
					var watch_num = commonUtils.checkStr(data.data.play_count)?data.data.play_count:'0'                 
					$("#viewsNum").text(watch_num +'人看过'); 
					anchorID_video = data.data.userId;  
					bunchVideoId =  data.data.list[0].id;  					
                    getLiveInfo(data.data.userId);
					 // 微信授权	
					 $(".start_time_now").text(data.data.watch_num);
					 var videoIsWatch;
					 if(data.data.isWatch && data.data.isWatch == "1"){
						videoIsWatch = 1;
					 }else{
						videoIsWatch = 0;
					 }	
					 if(commonUtils.checkStr(data.data.logoInfo)){
						setLogo(data.data.logoInfo);
					}		
					initLogo();	
					//  点播间封面	
					data_detail  = data;
					if(commonUtils.checkStr(data.data.vodCoverUrl)){
						$(".pre_video").css('background','transparent url("' + data.data.vodCoverUrl + '") center center no-repeat');
						$(".pre_video").css('backgroundSize','100% 100%');
						$(".appoint_img").attr("src",data.data.vodCoverUrl);
						$("#appShareImg").attr("src", data.data.vodCoverUrl);

						// $('video')[0].style.background = 'transparent url("' + data.data.vodCoverUrl + '") center center no-repeat';
						// $('video')[0].style.backgroundSize = "100% 100%";
						$("video").css('background','transparent url("' + data.data.vodCoverUrl + '") center center no-repeat');
						$("video").css('backgroundSize','100% 100%');
						//安卓默认播放按钮 隐藏
						$("#video_IMG").css({"background":'transparent url("'+ data.data.vodCoverUrl +'") 50% 50% no-repeat','background-size': 'cover','opacity':'1'});

					}										
					$(".start_time_now").html(new Date(data.data.createTime).format("yyyy-MM-dd hh:mm"));
					var videoSrc= data.data.playM3u8Url_720p || data.data.playM3u8Url_480p || data.data.playM3u8Url;
					$("video")[0].src = videoSrc;
					console.log("播放地址三取一"+ videoSrc);

					var ua = window.navigator.userAgent.toLowerCase();
					if ((navigator.userAgent.indexOf(' QQ') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) || (ua.indexOf('mqqbrowser') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))) {
					}
					else {
						$("video")[0].load(videoSrc);
					}
					// 续播的标记
					commonUtils.playURL = videoSrc;
					var arryShow = new Array("#startReady", ".djs_ready", "#live_end", "#live_video", "#live_noSource", "#live_exception", "#videoBox", "#live_dark");
					for (var i = 0; i < arryShow.length; i++) {						
						$(arryShow[i]).show();
						if (i == 6 && end_show_type!=1) {
							$("#playBtn").show();
							$("#videoBox").show();
						}else{
							$("#videoBox").hide();
							$(".over_img").show();
						}					
					}
					// 权限
					var vodPermit = data.data.vodPermit;
					// 调试代码点播权限
					// vodPermit = 1;
					var vod_text_imgs = data.data.vodTextImgs;
					console.log(vod_text_imgs)				
					if(vodPermit=='0'){
						$(".start_way_t").html('免费');
						$("#joinVideo").html("立即进入").show();
						// 进入直播间
						$("#appoint").removeClass("appoint_show");
						showQR();
					}else if(vodPermit=='1'&&videoIsWatch =='0'){
						$(".appoint").addClass("appoint_show");
						$(".start_way_t").text("加密");
						$(".start_way_t").addClass("start_way_tac");
						$("#appoint").addClass("appoint_show");
						$("#joinVideo").html("立即进入").show();
						//调试代码
						passWorld = data.data.viewPass;
					}else if(vodPermit=='2'){
						$("#appoint").addClass("appoint_show");
						$(".start_way_t").addClass("start_way_tac");
						var videoMoney =  parseFloat( data.data.viewPass /10).toFixed(2);
						$(".start_way_t").html("付费(￥<span class='go_pay_money'>" + videoMoney + "</span>)");
						$("#joinVideo").hide();
						$(".go_pay").show();
						isPay_true();
					}
					if (commonUtils.checkStr(data.data.createTime)) {
						var Vide_recordtime = new Date(data.data.createTime).format("yyyy-MM-dd hh:mm");
						$(".video_time_now").html(Vide_recordtime);
					} else {
						$(".video_time_now").html("立即开始");
					}	
					if (commonUtils.checkStr(uid) && uid.toString().length > 14 && !isWeiXin()) {				
						findviewUserInfo(uid);
					}			
					// 点播间立即进入	
					$("#joinVideo").on('click',function(){	
						console.log("观看者是否绑定手机号："+isbindPhone);
						window.localStorage.setItem('liveIdFirstEnter', true);
						// 未登陆
						if (identityMode != 1) {
							$("#logFont").click();
							return false;
						}else{
							lookUserIswatch();
							var showBind =   getUserInfo(uid) ?getUserInfo(uid).mobile:"";
							if(defaultAuthorization){
								if (!showBind && vodPermit != 0) {
									$("#example_video_1").hide();
									$(".mobile_bind").show();
								}								
							}
							if(vodPermit=="0"){
								// 进入直播间
								$("#appoint").removeClass("appoint_show");
								$("video")[0].click();
								showQR();
							}else if(vodPermit=="1"&&videoIsWatch =='0'){							
								$(".view_code").show();
								document.getElementById("pass0").click();
								$("#pass0").focus();
							}else if(vodPermit=="2"){
								lookUserIswatch();
							}	
						}
						
							
											
					});
					if (commonUtils.checkStr(vod_text_imgs) && vod_text_imgs.length > 0 && vod_text_imgs!=[]) {
						// var vod_text_img = JSON.parse(vod_text_img);
						console.log("点播间的简介")
						var vod_text_imgs = JSON.parse(vod_text_imgs);
						console.log(vod_text_imgs)
						if (vod_text_imgs != "[{}]" && vod_text_imgs.length > 0 && commonUtils.checkStr(vod_text_imgs)) {
							for (var i = 0; i < vod_text_imgs.length; i++) {
								if (commonUtils.checkStr(vod_text_imgs[i].img_text)) {
									$(".active_txt").append('<p>' + vod_text_imgs[i].img_text + '</p>');
								}
								if (commonUtils.checkStr(vod_text_imgs[i].img_url)) {
									$(".active_txt").append('<img src="' + vod_text_imgs[i].img_url + '">');
								}
								if (commonUtils.checkStr(vod_text_imgs[i].img_text) || commonUtils.checkStr(vod_text_imgs[i].img_url)) {
									$('.noData').hide();
								}
							}
							$(".active_txt").append('<div class="no_more"><p>-&nbsp;&nbsp;没有更多了&nbsp;&nbsp;-</p></div>');
						}else{
							$(".active_txt").hide()
						}
					}
					// 点播间访问上报调用
					upPageReport();
					var reportTimer = setInterval(function(){
						upPageReport();
					},60000);
					// 查询主播的详情
					lookUserIswatch();
					findU = setInterval(function () {
						findviewUserInfo(uid);
						findUserInfo(anchorID_video);
						lookUserIswatch();
					}, 20000);

					
				}else{
					$(".delete_live").show();
                    $(".delete_live_p").text("房间已被删除")
				}
								
			},
			error: function () {
				if (askLiveInfoNum >= 5) {
					ajaxVideoInfo.abort();
					location.href = "reqError.html&ver=" + 10000 * Math.random(1, 10000);
					return false;
				} else {
					setTimeout(ajaxVideoInfo, 5000);
				}
			},
			complete: function () { //请求完成后最终执行参数
				// 加载进度
				$(".spinner").hide();
				$(".page_main").show();
			}
		});
	}

	// 是否有观看点播的权限
	function  lookUserIswatch(){
		$.ajax({
			async: false,
			url: config.mwlivedev + "mwlive/vod/getVodInfo.do",
			type: "POST",
			data: {
				id: commonUtils.getUrlParam("videoid"),
				user_id:uid
			},
			success: function (data) {
				console.log("点播间权限")
				console.log(data.data.isWatch);
				data_detail = data;
				if(data.data.isWatch =='1'||data.data.vodPermit=="0"){	
					// 进入直播间			
					$("#appoint").removeClass("appoint_show");
					showQR();
				}
				if(data.data.isWatch =='0'&&data.data.vodPermit=="1"){
					$("#appoint").addClass("appoint_show");
				}
				if(data.data.isWatch =='1'){
					$("#appoint").removeClass("appoint_show");
					showQR();
				}							
			},
			error: function () {
				// commonUtils.showPop2("系统错误，请稍后再试!");
			}
		})
	}

	//立即进入
	var passAftChat = 0;		//
	$(".now_in").on("click", function () {
		// 视频双播放
		if(navigator.userAgent.match(/android/i)){
			$("#video_IMG").show();
			$("#example_video_1").css({"height":"0","margin-top":"200%"});						
		}     
		var showBind =   getUserInfo(uid) ?getUserInfo(uid).mobile:"";
		window.localStorage.setItem('liveIdFirstEnter', true);
		findeliveStatus(function () {
			if (identityMode == 1) {
				if(defaultAuthorization){
					if ( !showBind && live_permit != 0) {
						$("#example_video_1").hide();
						$(".mobile_bind").show();
					}
				}
				appoint_pwd = window.localStorage.getItem("yuyue_pwd");
				yuyue_passd = window.localStorage.getItem("yuyue_pass");
				if ((appoint_pwd == liveID && yuyue_passd == live_pass && ismake == 1) || window.localStorage.getItem('liveId' + liveID) == 'true' || (isWatch == 1 && live_permit != 0)) {
					if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
						$("#appoint").addClass("appoint_show");
						// return false;
					}
					$("#appoint").removeClass("appoint_show");
					$(".view_code").css("visibility", "hidden");
					showQR();
				} else {
					passAftChat = 1;
					if (commonUtils.checkStr(live_permit) && live_permit == 1 || window.localStorage.getItem('liveId' + liveID) == 'true' || (isWatch == 1 && live_permit != 0)) {

						if (window.localStorage.getItem('liveIdFirstEnter') == true) {
							if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
								$("#appoint").addClass("appoint_show");
								// return false;
							}
							// 进入直播间
							$("#appoint").removeClass("appoint_show");
							showQR();
						} else {
							console.log("密码==>", isWatch);
							if (isWatch == 1) {
								$(".view_code").hide();
							} else {
								$(".view_code").show();
								document.getElementById("pass0").click();
								$("#pass0").focus();
							}
						}
					}
					else if (commonUtils.checkStr(live_permit) && live_permit == 3 || window.localStorage.getItem('liveId' + liveID) == 'true' || (isWatch == 1 && live_permit != 0)) {
						//门票 
						if (window.localStorage.getItem('liveIdFirstEnter') == true) {
							if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
								return false;
							}
							// 进入直播间
							$("#appoint").removeClass("appoint_show");
							showQR();
						} else {
							// 门票验证
							console.log("门票==>", isWatch);
							if(isWatch == 2){
								$("#appoint").addClass("appoint_show");
								$("#loseEfficacy").show();
								window.localStorage.removeItem('liveId' + liveID);
								window.localStorage.removeItem('yuyue_pwd');
								window.localStorage.removeItem('yuyue_pass');
								return;
							}
							if (isWatch == 1) {
								$("#appoint").removeClass("appoint_show");
								$(".view_tickets").hide();

							} else {
								$(".view_tickets").show();
								document.getElementById("via0").click();
								$("#via0").focus();
								$("#loginBtn").hide();
								autoCheckCode();
							}
						}
					}
					else if (commonUtils.checkStr(live_permit) && live_permit == 4 || window.localStorage.getItem('liveId' + liveID) == 'true' || (isWatch == 1 && live_permit != 0)) {
						//专属直播间
						console.log("专属==>", isWatch);
						if (!showBind && live_permit != 0) {
							$("#example_video_1").hide();
							$(".mobile_bind").show();
						}						
						if (isWatch == 1) {
							$(".verify").hide();
						} else {
							$(".verify").show();
							$("#appoint").addClass("appoint_show");	
						}					
					}
					else {
						if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
							return false;
						}
						$("#appoint").removeClass("appoint_show");
						showQR();
						//$("#chat_0710").click();
					}
				}
			}
			else {
				$("#logFont").click();
				return false;
			}
		},'now_in');

		
	});
	function DJS() {
		//加密
		changeLiveShow();
	}
	//@params end_show_type   2002直播结束状态变化 消息通知 0直播结束 1 播放录像
	var except = 0;	//中断标志 0 不显示中断 1 显示
	var timerCheckM3u8;
	var checkRes = 0;
	//var timerCheckExc=0;
	var showReadyOrEnd = 0;	//默认即将开始 在时间倒计时结束后开始直播 再次结束则是显示结束
	var nowInFlag = 0;	//是否显示过立即进入按钮
	function changeLiveShow() {
		if (commonUtils.liveStatus == 0) {
			liveShowBef();
		} else if (commonUtils.liveStatus == 1) {
			if (nowInFlag == 0) {
				$(".now_appoint").hide();
				$(".now_appoint").css("z-index", "-1");
				$(".now_in").show();
				nowInFlag = 1;
			}
			window.clearInterval(startIntVal);
			commonUtils.playURL = liveUrl;
			currentID = liveID;
			checkM3u8Status();
		} else if (commonUtils.liveStatus == 2) {
			// 直播结束
			window.clearInterval(startIntVal);
			show3Af();
		} else if (commonUtils.liveStatus == 3) {
			//显示异常中断
			showLive(5);
		}
		else if (commonUtils.liveStatus == 4) {
			$(".page_main,.livetime_end").show();
			$(".spinner").hide();
			$(".livetime_end2,#startReady").text("预告已过期");
			var height = $(".appoint_top").height()+'px';	
			$(".livetime_end2,#startReady").css({ 'background':'url("image/blur.png") center center no-repeat','height':height,'line-height':height}).show();
			$("#startReady").css("font-weight","600");
			
		}
	}
	//直播中断后显示
	function show3Af() {
		if (leftDjsTime > 0 && data_detail.data.live_status == 0) {
			showLive(1);		//显示倒计时
			return false;
		}
		else {
			if (commonUtils.checkStr(end_show_img)) {
				$(".appoint_img").attr("src", end_show_img);
				$("#bg-img").attr("src", end_show_img);
			}
		}
		
		if (end_show_type == 2 || data_detail.data.live_status == 2) {
			//若设置了自定义视频则显示视频否则录像生成则播放录像 否则显示结束
			//showLive(2);		//显示结束--3分钟后开始探测录像生成
			//setTimeout(pullVideo,180e3);
			if (commonUtils.checkStr(end_show_vod)) {
				isLive(end_show_vod);
				commonUtils.playURL = $("video")[0].src = end_show_vod;
				$("video")[0].src = end_show_vod;
				config.isLive = false;
				var ua = window.navigator.userAgent.toLowerCase();
				if ((navigator.userAgent.indexOf(' QQ') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) || (ua.indexOf('mqqbrowser') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))) {
				}
				else {
					$("video")[0].load(end_show_vod);
				}
				sleep(500);
				showLive(6);
				setTimeout(showLive(6), 500);
				return false;
			}
			if (commonUtils.checkStr(end_show_img)) {

				// $(".appoint_top").css({"background":'transparent url("image/mobile/video-default.jpg?ver=1.4") 50% 50% no-repeat','background-size': 'cover','opacity':'1'});
				// $(".appoint_img").attr("src", end_show_img);
			
				$("#live_djs").show();
				$("#djs_ready2").hide();
				$("#live_end").show();
				return false;
			}
			pullVideo();
			return false;
		}
		if (data_detail.data.live_status == 2) {
			showLive(6);
		} else {
			showLive(2);		//显示结束
		}
	}
	//直播前显示-- 设置了预约时间，倒计时、未设置直接显示即将开始
	function liveShowBef() {
		if (leftDjsTime < 0) {
			showLive(0);		//显示即将开始
		} else {
			showLive(1);		//显示倒计时
		}
	}
	/*
	 * 定义展示提示内容 @wqs
	 * @params numCh
	 * 0:即将开始 1 倒计时 2 直播结束 3 录像准备中 4 无该直播 5 直播中断 6 播放器
	 */
	function showLive(numCh) {
		showAppointStatus(numCh);
		if (numCh != 6) {
			document.getElementById("live_djs").style.display = "table";
			$('video')[0].pause();
		} else {
			document.getElementById("live_djs").style.display = "none";
			$("#live_djs").hide();
			if(end_show_type!=1){
				document.getElementById("videoBox").style.display = "block";
				document.getElementById("playBtn").style.display = "block";
			}
			if (data_detail && data_detail.data.live_status == 1) {
				$("#livetime_end").text("正在直播中…");
				$(".now_appoint").hide();
				$(".now_appoint").css("z-index", "-1");
				if( isWatch ==1 && leftDjsTime<0){
					$("#appoint").removeClass("appoint_show");
				}
			} else {
				$(".livetime_end").text("直播已结束");
				$(".livetime_end").show();
				$(".livetime_end").css("color", "#9b9b9b");
				$(".appoint_img").attr("src", coverImgUrl0811);
				if (end_show_type == 1) {
					$(".now_appoint").hide();
					$(".now_appoint").css("z-index", "-1");
					$(".now_in").text("立即进入");
				}
			}
		}
		if (numCh == 1) {	//直播倒计时 显示自定义图，隐藏人气
			$(".vc0817").hide();
			if (commonUtils.checkStr(coverImgUrl0811)) {
				$('video')[0].style.background = 'transparent url("' + coverImgUrl0811 + '") 50% 50% no-repeat';
				$('video')[0].style.backgroundSize = "100% 100%";

				//yst==
				$("#bg-img").attr("src", coverImgUrl0811);
				$("#bg-img").css("opacity", "1");	
				//安卓默认播放按钮 隐藏			
				$("#video_IMG").css({"background":'transparent url("'+coverImgUrl0811+'") 50% 50% no-repeat','background-size': 'cover','opacity':'1'});
				$(".appoint_top").css({"background":'transparent url("'+coverImgUrl0811+'") 50% 50% no-repeat','background-size': 'cover','opacity':'1'});
				//$(".appoint_img").attr("src",coverImgUrl0811);
			}
		} else {
			if (numCh == 4) {		//无直播
				$(".vc0817").hide();
			} else {
				$(".vc0817").show();
			}
			if (numCh == 2 && commonUtils.checkStr(end_show_img)) {
				$("#bg-img").attr("src", end_show_img);
				$("#bg-img").css("opacity", 1);
				$(".appoint_top").css({"background":'transparent url("'+end_show_img+'") 50% 50% no-repeat','background-size': 'cover','opacity':'1'});
				$(".appoint_img").attr("src", end_show_img);
				//return false;
			}


			if (commonUtils.checkStr(coverImgUrl0811)) {		//显示默认设置图
				$('video')[0].style.background = 'transparent url("' + coverImgUrl0811 + '") 50% 50% no-repeat';
				$('video')[0].style.backgroundSize = "100% 100%";
				//安卓默认播放按钮 隐藏
				$("#video_IMG").css({"background":'transparent url("'+coverImgUrl0811+'") 50% 50% no-repeat','background-size': 'cover','opacity':'1'});
				$("#bg-img").attr("src", coverImgUrl0811);
				$("#bg-img").css("opacity", 1);
			}
		}
		var arryShow = new Array("#startReady", ".djs_ready", "#live_end", "#live_video", "#live_noSource", "#live_exception", "#videoBox", "#live_dark");
		for (var i = 0; i < arryShow.length; i++) {
			if (i == numCh) {
				$(arryShow[i]).show();
				if (i == 6&&end_show_type!=1) {
					$("#playBtn").show();
					$("#videoBox").show();
				}else if(!config.isLive){
					// 直播结束bug修复0905
					$("#videoBox").hide();
				}
			} else {
				$(arryShow[i]).hide();
			}
		}
		if (numCh == 1) {
			window.clearInterval(startIntVal);
			startIntVal = self.setInterval(countTime, 1e3);
			return false;
		}

	}
	//倒计时提示开始
	//-------------------倒计时start -----------
	function countTime() {
		//时间差
		//定义变量 d,h,m,s保存倒计时的时间
		var d, h, m, s;
		if (commonUtils.liveStatus == 1) {
			showLive(6);
			window.clearInterval(startIntVal);
			return false;
		}
		if (commonUtils.liveStatus == 3) {
			showLive(5);
			return false;
		}
		
		if (leftDjsTime > 0 && commonUtils.liveStatus == 0) {
			goOrder = 1;
			$("#live_djs").show();
			$("#djsName0811").text("直播倒计时");
			$(".now_appoint").show();
			$("#videoBox").hide();
			d = Math.floor(leftDjsTime / 60 / 60 / 24);
			h = Math.floor(leftDjsTime / 60 / 60 % 24);
			m = Math.floor(leftDjsTime / 60 % 60);
			s = Math.floor(leftDjsTime % 60);
			if (d < 10) { d = '0' + d; }
			if (h < 10) { h = '0' + h; }
			if (m < 10) { m = '0' + m; }
			if (s < 10) { s = '0' + s; }
			//将倒计时赋值到div中
			if (d > 0) {
				document.getElementById("day").innerHTML = d;
				document.getElementById("day2").innerHTML = d;
				document.getElementById("hour").innerHTML = h;
				document.getElementById("hour2").innerHTML = h;
				document.getElementById("minute").innerHTML = m;
				document.getElementById("minute2").innerHTML = m;
				document.getElementById("second").innerHTML = s;
				document.getElementById("second2").innerHTML = s;
			} else if (h > 0) {
				$("#day").hide();
				$("#djs_ready").find("b").eq(0).text("");
				$("#djs_ready2").find("b").eq(0).text("");
				document.getElementById("day2").innerHTML = "";
				document.getElementById("hour").innerHTML = h;
				document.getElementById("hour2").innerHTML = h;
				document.getElementById("minute").innerHTML = m;
				document.getElementById("minute2").innerHTML = m;
				document.getElementById("second").innerHTML = s;
				document.getElementById("second2").innerHTML = s;
			} else if (m > 0) {
				$("#day,#hour").hide();
				$("#djs_ready").find("b").eq(0).text("");
				$("#djs_ready").find("b").eq(1).text("");
				$("#djs_ready2").find("b").eq(0).text("");
				$("#djs_ready2").find("b").eq(1).text("");
				document.getElementById("day").innerHTML = "00";
				document.getElementById("day2").innerHTML = "";
				document.getElementById("hour").innerHTML = "00";
				document.getElementById("hour2").innerHTML = "";
				document.getElementById("minute").innerHTML = m;
				document.getElementById("minute2").innerHTML = m;
				document.getElementById("second").innerHTML = s;
				document.getElementById("second2").innerHTML = s;
			} else if (s > 0) {
				$("#day,#hour,#minute").hide();
				$("#djs_ready").find("b").eq(0).text("");
				$("#djs_ready").find("b").eq(1).text("");
				$("#djs_ready").find("b").eq(2).text("");
				$("#djs_ready2").find("b").eq(0).text("");
				$("#djs_ready2").find("b").eq(1).text("");
				$("#djs_ready2").find("b").eq(2).text("");
				document.getElementById("day").innerHTML = "00";
				document.getElementById("day2").innerHTML = "";
				document.getElementById("hour").innerHTML = "00";
				document.getElementById("hour2").innerHTML = "";
				document.getElementById("minute").innerHTML = "00";
				document.getElementById("minute2").innerHTML = "";
				document.getElementById("second").innerHTML = s;
				document.getElementById("second2").innerHTML = s;
			}
		} else {
			//时间已到 显示直播即将开始
			window.clearInterval(startIntVal);
			$("#djs_ready").hide();
			$("#djs_ready2").hide();
			$(".livetime_end").show();
			$(".now_appoint").hide();
			$(".now_appoint").css("z-index", "-1");
			$(".now_in").show();
			if (data_detail.data.live_status == 2 && showReadyOrEnd == 1) {
				showLive(6);		//显示播放器
				pullVideo();
			} else {
				showLive(0);		//即将开始
			}
			if (live_permit == 2) {
				$(".now_appoint").hide();
				$(".go_pay").show();
			}
			if (live_permit == 4) {
			
			}
		}
	}
	var secondMinIntVal = 0;
	function depSec() {
		clearInterval(secondMinIntVal);		//清除定时器
		var current_client_time = (new Date().getTime()) / 1000;
		leftDjsTime = leftTime - current_client_time;
		if (leftDjsTime <= 0 && commonUtils.liveStatus == 1) {
			showReadyOrEnd = 1;
		}
		secondMinIntVal = setInterval(function () {
			if (leftDjsTime <= 0) {
				clearInterval(secondMinIntVal);
				return false;
			}
			depSec();
		}, 1e3)
	}
	//递归每秒调用countTime方法，显示动态时间效果
	var startIntVal = self.setInterval(countTime, 1e3);

	//------------------------------倒计时提示结束--------------------------
	var bind_btflag, bind_btflag2;
	$(".mo_bindPhone").on('keyup paste', function () {
		var mo_bindPhone = $(this).val();
		console.log(mo_bindPhone.length);
		if (mo_bindPhone.length == 11) {
			bind_btflag = 1;
			if (bind_btflag == 1) {
				$("#mo_bindSend").addClass("mo_bindSendac");
			}
		}
		else {
			bind_btflag = 0;
			$("#mo_bindSend").removeClass("mo_bindSendac");
		}
	});

	//点击绑定手机号
	var userTitle;
	var userIcon;
	var thirdIcon;
	var thirdId;
	var hasBind;
	$(".bind_btn").click(function () {
		var mo_bindPhone = $(".mo_bindPhone").val();
		var mo_bindyanzm = $(".mo_bindyanzm").val();
		if (!isWeiXin()) {
			third_id = uid;
		}else{
			third_id = unionid || storage.openid;
		}
		if (commonUtils.checkStr(mo_bindPhone) && mo_bindPhone.length == 11 && commonUtils.checkPhoneNum(mo_bindPhone)) {
			if (commonUtils.checkStr(mo_bindyanzm) && mo_bindyanzm.length > 0) {
				var myHeadImg;			
				if (!thirdIcon || thirdIcon == '' || thirdIcon == null) {
					myHeadImg = imgUrl;
				} else {
					myHeadImg = thirdIcon;
				}
				var regType =  unionid ? 6:4;
				console.log("绑定手机号："+ mo_bindPhone);
				console.log("绑定third_id："+ unionid || storage.openid);
				console.log("imgUrl头像"+ myHeadImg);
				$.ajax({
					type: 'post',
					url: config.lhServerUrl + '/api/mwlive/user/user_select_third_bind.do',
					// timeout: 8000, //超时时间设置，单位毫秒
					data: {
						mobile: mo_bindPhone,
						sm_code: mo_bindyanzm,
						reg_type: regType,					
						third_id: third_id,
						third_icon: myHeadImg,
						user_title: userTitle||nickname,
						type: 'H5'
					},
					dataType: 'json',
					success: function (data) {
						console.log("绑定成功2==>", data);
						if (data && data.code == 200) {
							isbindPhone = 1;
							$(".bind_step1").css("display", "none");
							// $(".bind_account").css("display", "block");
							var data = data.data;
							userTitle = data.user_title;
							userIcon = data.user_icon_url;
							thirdIcon = data.third_icon;
							mobile = data.mobile;
							thirdId = unionid;  //测试环境下的第三方id
							hasBind = data.hasBind;
							if (hasBind == '0') {
								$(".verify,.view_code").hide();
								commonUtils.showPop2("绑定成功");
								location.reload();
							}
							console.log("hasBind==>", hasBind);
							if (hasBind != "0") {
								$(".bind_account").css("display", "block");
								$(".main_message .m_name").text(userTitle);
								$(".main_message img").attr("src", userIcon);
								$(".weixin_message .m_name").text(nickname);
								$(".weixin_message img").attr("src", imgUrl);
								$(".bind_account_top .mw_name").text(userTitle);
								$(".bind_account_top .wx_name").text(nickname);
							} else {
								$(".mobile_bind").hide();
								$("#example_video_1").show();
							}
						} else if (data.code == 412) {
							commonUtils.showPop2("验证码错误，请重新输入");
						}
					}, error: function () {
						commonUtils.showPop2("绑定失败，请稍候再试");
						// isbindPhone = 0;
					}
				})
			} else {
				commonUtils.showPop2("请输入验证码");
				$("#login_pass").focus();
			}
		} else {
			commonUtils.showPop2("请输入正确的手机号码");
			$(".mo_bindPhone").focus();
		}
		// 继续绑定页面
		// $.ajax({
		// 	type: "post",
		// 	url: config.lhServerUrl + "/api/mwlive/user/user_regs_third_bind.do",
		// 	data: {
		// 		mobile: mo_bindPhone,
		// 		sm_code: mo_bindyanzm,
		// 		third_id: 'oTe0RwJs2H39r-eWJMva3lCVatrE',
		// 	},
		// 	dataType: "json",
		// 	success:function(data){
		// 		console.log("绑定111=>", data);
		// 		if(data && data.code == 200){
		// 			var data = data.data;
		// 			console.log(data);
		// 			var userTitle = data.user_title;
		// 			var userIcon = data.user_icon_url;
		// 			var thirdIcon = data.third_icon;
		// 			var thirdId = unionid;  //测试环境下的第三方id
		// 			$(".bind_account_top p span").text(userTitle);
		// 			$(".main_message .m_name").text(userTitle);
		// 			$(".main_message img").attr("src",userIcon);
		// 			$(".weixin_message .m_name").text(nickname);
		// 			$(".weixin_message img").attr("src",imgUrl);
		// 		}
		// 	}
		// });
	});

	//发送绑定手机号验证码
	$("#mo_bindSend").on("click", function () {
		var mo_bindPhone = $(".mo_bindPhone").val();
		if (commonUtils.checkStr(mo_bindPhone) && mo_bindPhone.length == 11 && commonUtils.checkPhoneNum(mo_bindPhone)) {
			$("#mo_bindSend").attr("disabled", true);
			doLoop_bind();
			var mobile = mo_bindPhone;
			var oper_time = new Date().valueOf();
			$.ajax({
				type: "post",
				url: config.lhServerUrl + "/api/mwlive/user/user_login_getsm.do",
				data: {
					mobile: mo_bindPhone,
					oper_time: oper_time
					// type:'MVO',
				},
				dataType: "json",
				success: function (data) {
					if (data && data.code == 200) {
						console.log(data.data);
						commonUtils.showPop2("短信验证码已发送，请查收");
						$("mo_bindSend").attr("disabled", true);
						doLoop();
					} else {
						commonUtils.showPop2("获取失败，请稍候再试");
					}
				}, error: function () {
					commonUtils.showPop2("获取失败，请稍候再试");
				}
			})
		} else {
			commonUtils.showPop2("请输入正确的手机号码");
			$("#login_phone").focus();
		}
	});
	// 登录页面遮挡
	$(".loginBox input").on("focus",function(){
		if(navigator.userAgent.match(/android/i)){
			$(".loginBox").css({'height':'100%',"top":"0"});
			$("#btn_botom,#chat-input,#example_video_1").hide();
		}
	});

	//点击继续绑定
	$(".con_bind").on('click', function () {
		if (!isWeiXin()) {
			third_id = uid;
		}else{
			third_id = unionid || storage.openid;
		}
		
		var mo_bindPhone = $(".mo_bindPhone").val();
		$.ajax({
			type: "post",
			url: config.lhServerUrl + "/api/mwlive/user/user_regs_third_bind.do",
			data: {
				mobile: mo_bindPhone,
				third_id: third_id,
				reg_type: unionid ? 6:4,
				type: 'H5'
			},
			dataType: "json",
			success: function (data) {
				console.log("user_regs_third_bind.do", data);
				if (data && data.code == 200) {
					isbindPhone = 1;
					console.log(data.data);
					$(".mobile_bind").hide();
					$("#example_video_1").show();
					$(".bind_step1").hide();
					$(".bind_step1").css("display", "none");
					storage.nickname = data.data.user_title;
					$(".verify,.view_code").hide();
					commonUtils.showPop2("绑定成功");
					location.reload();
				} else {
					commonUtils.showPop2("继续绑定失败");
				}
			}
		});
	});

	updataLiveContent();
	var firstClick = true;
	var currentPassID = 0;
	$(".code_cover").on("click", function () {
		$("#pass0").focus();
	});
	$(".code input").focus(function () {
		currentPassID = $(this).attr("id").split("pass")[1];
	});
	$(".code input").on('input', function () {
		if (firstClick) {
			$("#pass0").focus();	//ios下无法自动触发focus，需要监测用户手动事件触发
			firstClick = false;
		}
		currentPassID = $(this).attr("id").split("pass")[1];
		var val = $(this).val();
		if (!validateDig(val) || !ilg(val)) {
			$(this).val("");
			$(this).focus();
			return false;
		}
		var pass = $("#pass0").val();
		var passJS = pass.split("");
		for (var i = 0; i <= pass.length; i++) {
			if (i == 0) {
				$(".code_cover_list li").eq(i).addClass("active_pwd_dian");
			}
			else {
				$(".code_cover_list li").eq(i - 1).addClass("active_pwd_dian");
			}
			$(".code_cover_list li").eq(i).text(passJS[i]);
			$(".code_cover_list li").eq(i - 1).addClass("active_code");
			$(".code_cover_list li").eq(i - 1).siblings().removeClass("active_code");
		}
		if (live_pass_length == 4 && pass.length == 4) {
			view_pass_check(pass, function (data) {
				if (data && data.code == 200) {
					$(".code input").blur();
					setTimeout(function () {
						$(".view_code").hide();
						$("#wrap_n").show();
					}, 500);
					// 门票
					window.localStorage.setItem('liveId' + liveID, 'true');
					setCookie("yuyue_pwd", liveID, 1 / 24);
					setCookie("yuyue_pass", live_pass, 1 / 24);
					window.localStorage.setItem('yuyue_pwd', liveID);
					window.localStorage.setItem('yuyue_pass', live_pass);
					if (orderLive == 1 && leftDjsTime > 0 && commonUtils.liveStatus == 0) {
						console.log("预约查询是否是默认授权："+defaultAuthorization);
						if(!defaultAuthorization){
							$(".appoint_shuru").show();
						}else{
							appointment(mobile);
						}
					} else {
						setTimeout(function () {
							if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
								return false;
							}
							$("#appoint").removeClass("appoint_show");
							showQR();
							if (passAftChat == 1) {
							}
						}, 500);
					}
					return false;
				} else {

					$(".view_code .code_err").show();
					for (var i = 0; i <= 5; i++) {
						var pass1 = "#pass" + i;
						$(pass1).val("");
						$(".code_cover_list li").text("");
						$(".code_cover_list li").removeClass("active_pwd_dian");
						$("#pass0").focus();
						$(".code_cover_list li").eq(0).addClass("active_code");
						$(".code_cover_list li").eq(0).siblings().removeClass("active_code");
						$(".view_code .code_err").hide();
					}
				}
			}, function () {
				commonUtils.showPop2("系统错误，请稍后再试");
				for (var i = 0; i <= 5; i++) {
					var pass = "#pass" + i;
					$(pass).val("");
					$(".code_cover_list li").text("");
					$("#pass0").focus();
					$(".code_cover_list li").eq(0).addClass("active_code");
					$(".code_cover_list li").eq(0).siblings().removeClass("active_code");
				}
			});
		}
		if (pass.length == 6) {
			//云播 密码验证
			view_pass_check(pass, function (data) {
				if (data && data.code == 200) {
					$(".code input").blur();
					setTimeout(function () {
						$(".view_code").hide();
						$("#wrap_n").show();
					}, 500);
					window.localStorage.setItem('liveId' + liveID, 'true');
					setCookie("yuyue_pwd", liveID, 1 / 24);
					setCookie("yuyue_pass", live_pass, 1 / 24);
					window.localStorage.setItem('yuyue_pwd', liveID);
					window.localStorage.setItem('yuyue_pass', live_pass);
					if (orderLive == 1 && leftDjsTime > 0 && commonUtils.liveStatus == 0) {

						console.log("预约查询是否是默认授权："+defaultAuthorization);
						if(!defaultAuthorization){
							$(".appoint_shuru").show();
						}else{
							appointment(mobile);
						}
					} else {
						setTimeout(function () {
							if(commonUtils.getUrlParam("liveid")){
								if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
									return false;
								}
								$("#appoint").removeClass("appoint_show");
								showQR();
								if (passAftChat == 1) {
									//$("#chat_0710").click();
								}
							}
							if(commonUtils.getUrlParam("videoid")){
								// 进入直播间
								$("#appoint").removeClass("appoint_show").hide();
								showQR();
							}
							
						}, 500);
					}
					//$('.wrapper').stop().animate({scrollTop:$('.wrapper')[0].scrollHeight},0);//置底滚动条
					return false;
				} else {
					$(".view_code .code_err").show();
					// commonUtils.showPop2("密码输入有误，请重新输入");
					for (var i = 0; i <= 5; i++) {
						var pass1 = "#pass" + i;
						$(pass1).val("");
						$(".code_cover_list li").text("");
						$(".code_cover_list li").removeClass("active_pwd_dian");
						$("#pass0").focus();
						$(".code_cover_list li").eq(0).addClass("active_code");
						$(".code_cover_list li").eq(0).siblings().removeClass("active_code");
					}
				}
			}, function () {
				commonUtils.showPop2("系统错误，请稍后再试");
				for (var i = 0; i <= 5; i++) {
					var pass = "#pass" + i;
					$(pass).val("");
					$(".code_cover_list li").text("");
					$("#pass0").focus();
					$(".code_cover_list li").eq(0).addClass("active_code");
					$(".code_cover_list li").eq(0).siblings().removeClass("active_code");
				}
			});
		} else {
			$("#pass0").focus();
		}
	});

	// 门票码判断
	var firstClick = true;
	var currentPass1ID = 0;
	$(".tickets_cover").on("click", function () {
		$("#via0").focus();
	});
	$(".tickets input").focus(function () {
		currentPass1ID = $(this).attr("id").split("via")[1];
	});

	$(".tickets input").on('input', function () {
		if (firstClick) {
			$("#via0").focus();	//ios下无法自动触发focus，需要监测用户手动事件触发
			firstClick = false;
		}
		currentPass1ID = $(this).attr("id").split("via")[1];
		var val = $(this).val();
		if (validateDig(val) && !ilg(val)) {
			$(this).val("");
			$(this).focus();
			return false;
		}
		var via = $("#via0").val();
		var passJC = via.split("");
		for (var i = 0; i <= via.length; i++) {
			if (i == 0) {
				$(".tickets_cover_list li").eq(i).addClass("active_pwc_dian");
			}
			else {
				$(".tickets_cover_list li").eq(i - 1).addClass("active_pwc_dian");
			}
			$(".tickets_cover_list li").eq(i).text(passJC[i]);
			$(".tickets_cover_list li").eq(i - 1).addClass("active_tickets");
			$(".tickets_cover_list li").eq(i - 1).siblings().removeClass("active_tickets");
		}
		if (via.length == 6) {
			//云播 门票码验证
			useCode(via);
		}
		if (via.length < 6) {
			$("#via0").focus();
		}
	});

	//检测键盘按键
	document.onkeydown = function (event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 8) { // 按 Esc
			var pass = $("#pass0").val();
			if (pass != "") {
				for (var i = 0; i <= pass.length; i++) {
					$(".code_cover_list li").eq(i).text("");
					$(".code_cover_list li").eq(i - 1).addClass("active_code");
					$(".code_cover_list li").eq(i - 1).removeClass("active_pwd_dian");
					$(".code_cover_list li").eq(i - 1).siblings().removeClass("active_code");
				}
			}
			
			var via = $("#via0").val();
			if (via != "") {
				for (var i = 0; i <= via.length; i++) {
					$(".tickets_cover_list li").eq(i).text("");
					$(".tickets_cover_list li").eq(i - 1).addClass("active_tickets");
					$(".tickets_cover_list li").eq(i - 1).removeClass("active_pwc_dian");
					$(".tickets_cover_list li").eq(i - 1).siblings().removeClass("active_tickets");
				}
			}
		}
	};
	//数字检测
	function validateDig(digtal) {
		var reg = new RegExp("^[0-9]*$");
		if (!reg.test(digtal)) {
			return false;
		}
		if (!/^[0-9]*$/.test(digtal)) {
			return false;
		}
		return true;
	}
	//非法字符检测
	function ilg(vab) {
		var pattern = new RegExp("[~'!@#$%^&*()-+_=:]");
		if (vab != "" && vab != null) {
			if (pattern.test(vab)) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	//特殊字符
	function check(ch) {
		var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
		var rs = "";
		for (var i = 0, l = val.length; i < val.length; i++) {
			rs = rs + val.substr(i, 1).replace(reg, '');
		}
		return rs;
	}
	//检测流是否可播
	var numCheck = 0;
	function checkM3u8Status() {
		window.clearTimeout(timerCheckM3u8);
		if (numCheck >= 10) {
			return false;
		}
		$.ajax({
			type: 'post',
			url: config.lhServerUrl + '/api/mwlive/live/isplay.do',
			data: {
				id: currentID
			},
			dataType: 'json',
			success: function (data) {
				if (data.code == 200 && data.data == 1) {
					checkRes = 1;
					window.clearTimeout(timerCheckM3u8);
					sleep(500);
					isLive(commonUtils.playURL);
					$("video")[0].src = commonUtils.playURL;
					var ua = window.navigator.userAgent.toLowerCase();
					if ((navigator.userAgent.indexOf(' QQ') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) || (ua.indexOf('mqqbrowser') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))) {
					}
					else {
						$("video")[0].load(commonUtils.playURL);
					}
					showLive(6);		//显示播放器
					firstFlag = false;
				} else {
					numCheck++;
					checkRes = 0;
					if (config.isLive) {
						showLive(0);		//流不能播放 显示即将开始
					} else {
						showLive(2);		//录像即将开始
					}
					timerCheckM3u8 = setTimeout(changeLiveShow, 3e3);
				}
			}, error: function () {
				numCheck++;
				checkRes = 0;
				showLive(0);		//流不能播放 显示即将开始
				timerCheckM3u8 = setTimeout(changeLiveShow, 3e3);
			}
		})
	}

	function sleep(numberMillis) {
		var now = new Date();
		var exitTime = now.getTime() + numberMillis;
		while (true) {
			now = new Date();
			if (now.getTime() > exitTime)
				return;
		}
	}
	var dataVideo_path;//直播结束后生成录播的信息
	var isVideo_path = 0;//直播结束后是否生成录播0无1有
	var videoArry = new Array();//录像播放地址列表
	var hasVideo = 0;	//检测录像生成定时器
	var canPlay20170803 = false;
	var source_type; //3自定义,1录播视频
	var top = 1; //置顶
	console.log('彩排1==>', isrehearse);
	function pullVideo() {  //从录像列表取地址播放
		if (commonUtils.liveStatus != 2) {
			return false;
		}
		console.log("开始探测录像生成");
		window.clearTimeout(hasVideo);
		if (uid == "") {
			return false;
		}
		$.ajax({
			type: 'GET',
			url: config.lhServerUrl + '/api/mwlive/live/get_info.do',
			data: {
				id: liveID,
				user_id: uid
			},
			cache: false,
			dataType: 'json',
			success: function (data) {
				if (data.data && data.code == 200 && now_url.indexOf("vLive") >= 0) {
					data_detail = data;
					console.log('彩排3==>', isrehearse);
					if (isrehearse == 0) {
						console.log('彩排2==>', isrehearse);
						return false;
					}
					active_id = data.data.active_id;
					if (commonUtils.checkStr(liveID)) {
						$.ajax({
							type: 'post',
							url: config.lhServerUrl + '/api/mwlive/live/get_reclistbyselect.do',
							data: {
								select_str: liveID,
								user_id: uid,
								page_index: 1,
								page_size: 10
							},
							dataType: 'json',
							success: function (data) {
								var data_list = data.data.data_list;
								if (data.code == 200) {
									if (commonUtils.checkStr(data_list)) {			
										var video_switch = data_list[0].video_switch;								
										if (video_switch == 2) {
											showLive(2);
											return false;
										}
										if (data_list.length > 0) {
											console.log("通过activeID探测到录像生成");
											window.clearTimeout(hasVideo);
											for (var i = 0; i < data_list.length; i++) {
												videoArry[i] = data_list[i].file_path;
											}
											isLive(videoArry[0]);
											videoID = data_list[0].video_id;
											commonUtils.playURL = $("video")[0].src = videoArry[0];
											$("video")[0].src = videoArry[0];
											//自定义视频置顶  live_after_type:0,默认录像；1，图片；2，视频
											console.log("直播结束设置"+end_show_type);
											end_show_type = data.data.live_after_type;
											end_show_img = data.data.live_after_url;
											end_show_vod = data.data.live_after_url;
											// 直播结束为自定义视频
											if (end_show_type == 2 && end_show_vod) {
												// top = data_list[0].video_id;
												$(".over_img").hide();
												$("#videoBox").show();
												commonUtils.playURL = $("video")[0].src = end_show_vod;
												$("video")[0].src = end_show_vod;
											}else if(end_show_type == 1 && end_show_img ){
												$(".over_img").show().css({"background":'transparent url("' + end_show_img + '") 50% 50% no-repeat','background-size': 'cover'});
												$("#videoBox").hide();
											}
											
											config.isLive = false;
											// 自定义结束设置为图片视频结束还有声音
											if(end_show_type!=1){
												if ((/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))) {
													canPlay20170803 = true;
												}
											}											
											var ua = window.navigator.userAgent.toLowerCase();
											if ((navigator.userAgent.indexOf(' QQ') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) || (ua.indexOf('mqqbrowser') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))) {
											}
											else {
												// 自定义结束设置为图片视频结束还有声音
												if(end_show_type!=1){
													$("video")[0].load(videoArry[0]);//会引起ios下qq浏览器自动播放
												}
												
											}
											sleep(500);
											showLive(6);
											setTimeout(showLive(6), 500);											
											isVideo_path = 1;
																															
										} else {
											//未生成录像
											hasVideo = setTimeout(pullVideo, 10e3);
											showLive(2);
											console.log("未生成录像");
										}
									} else {
										hasVideo = setTimeout(pullVideo, 10e3);
										showLive(2);
									}
								} else {
									hasVideo = setTimeout(pullVideo, 10e3);
									showLive(2);
								}
					
								// 播放结束显示双播放器bug
								if(navigator.userAgent.match(/android/i) && data_detail.data.live_status ==2 && end_show_type != 1){
									$("#video_IMG").show();
									$("#example_video_1").hide();
								}
							},
							error: function () {
								hasVideo = setTimeout(pullVideo, 10e3);
								showLive(2);
							}
						})
					} else {
						//重新检测是否生成activeID
						checkActiveID();
						//使用liveID拉取录像列表 读取第一个播放
						//selRecordByLiveID();
					}
				}
			}, error: function () {
				hasVideo = setTimeout(pullVideo, 10e3);
				showLive(2);
			}
		})
	}
	$("video").on('canplay', function () {
		if (canPlay20170803) {
			$("video")[0].play();
			$("#video_IMG").hide();
			canPlay20170803 = false;
		}
	});

	//检测是否生成activeID
	function checkActiveID() {
		if (commonUtils.liveStatus != 2) {
			return false;
		}
		$.ajax({
			type: 'GET',
			url: config.lhServerUrl + '/api/mwlive/live/get_info.do',
			data: {
				id: liveID,
				user_id: uid
			},
			cache: false,
			dataType: 'json',
			success: function (data) {
				if (data.code == 200 && data.data) {
					data_detail = data;
					active_id = data.data.active_id;
				} else {
					showLive(2);
					hasVideo = setTimeout(pullVideo, 10e3);
				}
			},
			error: function () {
				showLive(2);
				hasVideo = setTimeout(pullVideo, 10e3);
			}
		})
	}
	//横竖屏判断
	var mql = window.matchMedia("(orientation: portrait)");
	// 如果有匹配，则我们处于垂直视角
	if (mql.matches) {
		// 直立方向
		console.log("垂直方向");
		if (isWeiXin()) {
			$(".ctrl-list,.page-iscroll,.click_zan").show();
			if(commonUtils.getUrlParam("liveid")){
				if(liveInfo.giftSwitch=="1"){
					$("#gift_btn").css("opacity","1");
				}
			}
		
		}
		else {
			$(".ctrl-list,.page-iscroll,.click_zan").show();
			if(commonUtils.getUrlParam("liveid")){
				if(liveInfo.giftSwitch=="1"){
					$("#gift_btn").css("opacity","1");
				}
			}
			
		}
	} else {
		//水平方向
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if (isAndroid) {
			$("#gift_btn").css("opacity","0");
		} else {
			if (isWeiXin()) {
				$(".page-footer,#gift_btn,.ctrl-list,.page-iscroll,.click_zan").hide();
			}
			else {
				$(".page-footer,#gift_btn,.ctrl-list,.page-iscroll,.click_zan").hide();

			}
		}
	}
	// 添加一个媒体查询改变监听者
	mql.addListener(function (m) {
		if (m.matches) {
			// 直立方向
			if ($("#desc_0710").hasClass('active')) {
				$(".ctrl-list,.page-iscroll").show();
			} else {
				if (isWeiXin()) {
					if($('#menuList li[type="0"]').hasClass("active")){
						$(".page-footer,.slide_nav").show();
						if(commonUtils.getUrlParam("liveid")){
							if(liveInfo.giftSwitch=="1"){
								$("#gift_btn").css("opacity","1").show();
							}
						}
					}
					$(".page-iscroll,.ctrl-list").show();
				}
				else {
					if($('#menuList li[type="0"]').hasClass("active")){
						$(".page-footer,.slide_nav").show();
						if(commonUtils.getUrlParam("liveid")){
							if(liveInfo.giftSwitch=="1"){
								$("#gift_btn").css("opacity","1").show();
							}
						}
					}
					$(".page-iscroll,.ctrl-list").show();
				}
			}
			$("#wrap_n").css("display", "block");
			$("#YuFrame1,#YuFrame1Bg").css("display", "block");
			$("#redBag").css("visibility", "visible");
		
		}
		else {
			if($("#startReady").css("font-weight")=="600"){
				$("#startReady").css("height","100%");
			}			
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			$("#redBag").css("visibility", "hidden");
			$(".slide_nav,.page-footer").hide();
			if (isAndroid) {
				$(".slide_nav").hide();
			} else {
				$("#YuFrame1,#YuFrame1Bg").css("display", "none");
				if ($("#appoint").hasClass("appoint_show")) {
					//$("#wrap_n").css("display","none")
				}
				else {
					$(".page-footer,.ctrl-list,.page-iscroll,.slide_nav").hide();
				}
			}
		}
	});

	function reDo(timeCicle, callback, vab, cicleNum) {
		console.log(callback);
		vab = self.setInterval(callback, timeCicle);
	}

	/*box = document.getElementById("default_li_p");
	 box.style.textAlign = "justify";
	 box.style.letterSpacing = '-.12em';
	 box.innerHTML = box.innerHTML.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').split("").join(" ").replace(/\s{3}/g, " &nbsp; ");
	 //登录窗口*/
	$(document).on("click", '#logFont', function () {
		//$(".chatViewBox,#chat_0710,#desc_0710").hide();
		$(".page-footer").hide();
		$(".loginBox").addClass("loginBoxac");
		$("#btn_botom").hide();
		if(navigator.userAgent.match(/android/i)){
			$(".loginBox").css({'height':'auto',"top":"auto"});
		}
		$("#btn_botom,#chat-input").hide();
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
		var video_H = $(window).width() * 0.5625;
		var chatHt = (winHeight - 1.96 * view_show_w - video_H) + "px";
		$(".loginBox").css("height", winHeight - video_H +'px');
		$(".form-sent").css("height", winHeight - video_H +'px');
	});
	//关闭登录
	$(document).on("click", '#closeLogin', function () {
		$(".loginBox").removeClass("loginBoxac");
		if(navigator.userAgent.match(/android/i)){
			$(".loginBox").css({'height':'auto',"top":"auto"});
			$("#example_video_1").show();
		}
		// $(".loginBox .form-sent").css("height",'8.67rem');
		$("#chat-input,#btn_botom,.page-footer").show();
		
		if (isWeiXin()) {
			$(".chatViewBox,#chat_0710,#desc_0710,.redBag").show();
			if(commonUtils.getUrlParam("liveid")){
				if(liveInfo.giftSwitch=="1"){
					$("#gift_btn").css("opacity","1");
				}
			}
		}
		else {
			$(".chatViewBox,#chat_0710,#desc_0710,.redBag").show();
		}
		
	});
	//设置默认头像和昵称
	function set_logo() {
		var setNum = "";
		function MathRand() {
			for (var i = 0; i < 6; i++) {
				setNum += Math.floor(Math.random() * 10);
			}
		}
		MathRand();
		var user_title = "M" + setNum;
		$.ajax({
			type: 'post',
			url: config.lhServerUrl + '/api/mwlive/user/edit_userinfo.do',
			// timeout: 8000, //超时时间设置，单位毫秒
			data: {
				id: uid,
				user_title: user_title,
				user_icon_id: "1178309224502371684",  //测试环境用
				// user_icon_id: "817433040737048953"  //正式环境要改
			},
			dataType: 'json',
			success: function (data) {
				console.log(data);
				if (data && data.code == 200) {
					if (now_url.indexOf("vLive") >= 0) {
						findviewUserInfo(uid);
					}
				} else {

				}
			}, error: function () {

			}
		})
	}
	//登录
	$("#login_btn").click(function () {		
		var login_phone = $("#login_phone").val();
		var sms_code = $("#login_pass").val();
		if (commonUtils.checkStr(login_phone) && login_phone.length == 11 && commonUtils.checkPhoneNum(login_phone)) {
			if (commonUtils.checkStr(sms_code) && sms_code.length > 0) {
				$.ajax({
					type: 'post',
					url: config.lhServerUrl + '/api/mwlive/user/user_login_bysm.do',
					// timeout: 8000, //超时时间设置，单位毫秒
					data: {
						mobile: login_phone,
						sm_code: sms_code,
						web:1
					},
					dataType: 'json',
					success: function (data) {
						if (data && data.code == 200) {

							// 登录之后用新的身份进入聊天室，解决登录之后主播发言没有头衔
							ws.emit("leave", {
								cmd: 1002,
								roomID: v_roomid,
								nickName: nickname,
								user_id: uid,
								show_id: yunboid,
								imgUrl: imgUrl,
								gender: 0
							});
							
							imgUrl = data.data.user_icon_url;
							nickname = data.data.user_title;
							uid = data.data.id;
							storage.uid = data.data.id;	
							
							$(".loginBox").removeClass("loginBoxac");
							if(navigator.userAgent.match(/android/i)){
								$(".loginBox").css({'height':'auto',"top":"auto"});
								$("#example_video_1").show();
							}
							$("#btn_botom,#chat-input").show();
							$("#loginBtn").hide();
							// 登录之后用新的身份进入聊天室，解决登录之后主播发言没有头衔
							var user = {
								cmd: 1001,			 
								appID: 3,			 
								user_type: 102,
								roomID: v_roomid,
								nickName: nickname,
								user_id: uid,		
								imgUrl: imgUrl,			
								gender: 1			
							};
							ws.emit('join', user);
							
							$("#sendBtn").removeClass("sendBtac");
							identityMode = 1;//认证
							if(commonUtils.getUrlParam("liveid")){
								// 登录判断是不是主播							
								if (commonUtils.checkStr(data.data.id)) {
									console.log(data.data);
									var phone_num = login_phone;
									uid = data.data.id;
									openIDTmp = data.data.id;
									// 主播自动获取权限
									findviewUserInfo(uid);
									console.log('anchorID1=>' + anchorID, 'uid=>' + uid);
									if (anchorID == uid || isWatch == 1) {		
										$("#appoint").removeClass("appoint_show");										
										$(".view_code").hide();
										$('.view_tickets').hide();
										$('.verify').hide();
										$("#loginBtn").hide();
										showQR();
									}
							
									if ((!commonUtils.checkStr(data.data.user_title) && !isWeiXin()) || (!commonUtils.checkStr(data.data.user_icon_url) && !isWeiXin())) {
										set_logo();
									}
									else {
										if (commonUtils.checkStr(data.data.user_title)) {
											nickname = data.data.user_title;
										}
										if (commonUtils.checkStr(data.data.user_icon_url)) {
											imgUrl = data.data.user_icon_url;
										}
										//$("#anzuo_head").attr("src",imgUrl);
									}
								}
								// 获取直播间的状态
								findeliveStatus(function () {
									$("#wrap_n").show();
									if (commonUtils.checkStr(live_permit) && live_permit == 1) {  //登录跳转加密
										if (isWatch == 1) {
											$(".view_code").hide();
										} else {
											$(".view_code").show();
											document.getElementById("pass0").click();
											$("#pass0").focus();
										}
									} else if (commonUtils.checkStr(live_permit) && live_permit == 2) {
										if (isWatch == 1||anchorID == uid ) {
											console.log('付费直播间权限：'+isWatch);
											console.log('付费直播间权限：'+anchorID == uid);
											// 进入直播间
											if(ismake==1){
												$("#appoint").removeClass("appoint_show");
												showQR();
											}
											
										} else {
											is_pay(0);
										}
										
									} else if (commonUtils.checkStr(live_permit) && live_permit == 3) {  //登录跳转票码】】
										if (isWatch == 1) {
											$(".view_tickets").hide();
											// 进入直播间
											$("#appoint").removeClass("appoint_show");
											showQR();
											//2.1.1需求
										} else if(isWatch == 2){
											$("#appoint").addClass("appoint_show");
											$("#loseEfficacy").show();
											window.localStorage.removeItem('liveId' + liveID);
											window.localStorage.removeItem('yuyue_pwd');
											window.localStorage.removeItem('yuyue_pass');
										}else {											
											autoCheckCode();
											$(".view_tickets").show();											
											document.getElementById("via0").click();
											$("#via0").focus();
											$("#loginBtn").hide();
										}
									} else if (commonUtils.checkStr(live_permit) && live_permit == 4) {
										// 登录白名单
										if (isWhite) {
											$("#appoint").removeClass("appoint_show");
										}else{
											$("#appoint").addClass("appoint_show");
										}									
										showQR();
									} else {
										console.log("预约查询是否是默认授权："+defaultAuthorization);
										if(!defaultAuthorization){
											$(".appoint_shuru").show();
										}else{
											appointment(mobile);
										}
									}
									yunboid = data.data.show_id;
									// 登录显示昵称为手机号，注释以下
									// nickname = commonUtils.phoneSec(login_phone);
									openIDTmp = login_phone;
									$("#appoint_inpput").val(login_phone);
									identityMode = 1;										
									if (window.localStorage && (window.localStorage.setItem('abcde', 123), window.localStorage.getItem('abcde') == 123)) {
										storage.uid = data.data.id;
										// console.log('uid赋值3=>', uid)
										storage.yunboid = data.data.show_id;
										storage.openIDTmp = openIDTmp;
										storage.nickname = nickname;
										storage.imgUrl = imgUrl;
										$("#closeLogin").click();
										$("#input_world").show();
										$("#loginBtn").hide();
										$(".chatroom_ic_pen").show();
										$("#sendBtn").removeClass("sendBtac");
										//登录背景：预约、红包、聊天互动
	
										if (commonUtils.checkStr(live_permit) && live_permit == 4) {
											if (isWhite) {
												isappoint();	//查预约请求
											}
										} 
										else {
											// 失效门票登录直接进入直播间
											if(commonUtils.checkStr(live_permit) && live_permit != 3 && isWatch != 2){
												isappoint();	//查预约请求
											}											
										}
										if (orderLive == 1) {	//预约
											if (ismake == 1) {	//预约成功
												$(".view_code").hide();
												// commonUtils.showPop2("您已经预约过该直播");
												// 进入直播间
												$("#appoint").removeClass("appoint_show");
												showQR();
											} else {
												if (live_permit == 0 || live_permit == 2) {	//免费或付费
													//$(".now_appoint").click();
													console.log("预约查询是否是默认授权："+defaultAuthorization);
													if(!defaultAuthorization){
														$(".appoint_shuru").show();
													}else{
														appointment(mobile);
													}
												} else if (commonUtils.checkStr(live_permit) && live_permit == 1) {		//加密
													document.getElementById("pass0").click();
													$("#pass0").focus();
											
												} else if (commonUtils.checkStr(live_permit) && live_permit == 3 ) {		//门票													
													// 门票失效显示门票输入框
													if(isWatch == 0){
														$(".view_tickets").show();
														document.getElementById("via0").click();
														$("#via0").focus();
													}
													$("#loginBtn").hide();
													document.getElementById("via0").click();
													$("#via0").focus();
													autoCheckCode();
												} else if (commonUtils.checkStr(live_permit) && live_permit == 4) {		//专属直播间
													// $(".verify").hide();
												}
	
											}
										} else if (orderLive == 2) {
											if (!$("#appoint").hasClass("appoint_show")) {
												$("#redBag").click();
											}
										}
									} else {
										setCookie("uid", uid, 1);
										setCookie("yunboid", yunboid, 1);
										setCookie("openid", uid, 1);
										setCookie("openIDTmp", openIDTmp, 1);
										setCookie("nickname", nickname, 1);
										setCookie("imgUrl", imgUrl, 1);
									}
									if (commonUtils.checkStr(live_permit) && live_permit == 4 && isWhite) {
										ws.emit("leave", {
											cmd: 1002,
											roomID: v_roomid,
											nickName: nickname,
											user_id: uid,
											show_id: yunboid,
											imgUrl: imgUrl,
											gender: 0
										});
										console.log('获取聊天室信息3');
										createOrOccerChatRoom();
									}
								});
							}
							if(commonUtils.getUrlParam("videoid")){
								console.log("点击登录的点播间详情");
								$("#wrap_n").show();
								yunboid = data.data.show_id;
								// 登录显示昵称为手机号，注释以下
								// nickname = commonUtils.phoneSec(login_phone);
								openIDTmp = login_phone;
								$("#appoint_inpput").val(login_phone);
								identityMode = 1;	
								if (commonUtils.checkStr(data.data.id)) {
									var phone_num = login_phone;
									uid = data.data.id;
									openIDTmp = data.data.id;
									// 主播自动获取权限
									findviewUserInfo(uid);
									console.log('anchorID1=>' + anchorID, 'uid=>' + uid);
									if (anchorID == uid || isWatch == 1) {
										if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
											return false;
										}
										// 进入直播间
										$("#appoint").removeClass("appoint_show");
										$(".view_code").hide();
										$('.view_tickets').hide();
										$('.verify').hide();
										$("#loginBtn").hide();
										showQR();
									}
									if ((!commonUtils.checkStr(data.data.user_title) && !isWeiXin()) || (!commonUtils.checkStr(data.data.user_icon_url) && !isWeiXin())) {
										set_logo();
									}
									else {
										if (commonUtils.checkStr(data.data.user_title)) {
											nickname = data.data.user_title;
										}
										if (commonUtils.checkStr(data.data.user_icon_url)) {
											imgUrl = data.data.user_icon_url;
										}
									}
								}
								if (window.localStorage && (window.localStorage.setItem('abcde', 123), window.localStorage.getItem('abcde') == 123)) {
									storage.uid = data.data.id;
									storage.yunboid = data.data.show_id;
									storage.openIDTmp = openIDTmp;
									storage.nickname = nickname;
									storage.imgUrl = imgUrl;
									$("#closeLogin").click();
									$("#input_world").show();
									$("#loginBtn").hide();
									$(".chatroom_ic_pen").show();
									$("#sendBtn").removeClass("sendBtac");	

								} else {
									setCookie("uid", uid, 1);
									setCookie("yunboid", yunboid, 1);
									setCookie("openid", uid, 1);
									setCookie("openIDTmp", openIDTmp, 1);
									setCookie("nickname", nickname, 1);
									setCookie("imgUrl", imgUrl, 1);
								}							
								lookUserIswatch();		
								// createOrOccerChatRoom();								
							}
							// 添加足迹
							if(commonUtils.getUrlParam("liveid")){
								AddFootprint(uid,liveID);
							}
							$(".page-footer").show();					
						} else if (data.code == 410) {
							commonUtils.showPop2("验证码错误，请重新输入");
						} else if (data.code == 423) {
							$(".loginBox").removeClass("loginBoxac");
							if(navigator.userAgent.match(/android/i)){
								$(".loginBox").css({'height':'auto',"top":"auto"});
								$("#example_video_1").show();
							}
							$("#btn_botom,#chat-input").show();
							$(".Arrears").show();
							showLive(2);
							$("#appoint").addClass("appoint_show");
							$(".livetime_end").remove();
							$(".livetime_end2").hide();
							$("#btn_botom").css("visibility", "hidden");
							clearInterval(findU);
						}
						
						

					}, error: function () {
						commonUtils.showPop2("登录失败，请稍候再试");
					}
				})
			} else {
				commonUtils.showPop2("请输入验证码");
				$("#login_pass").focus();
			}
		} else {
			commonUtils.showPop2("请输入正确的手机号码");
			$("#login_phone").focus();
		}
	});
	//登录获取短信验证码
	$("#code_btn").click(function () {
		var login_phone = $("#login_phone").val();
		if (commonUtils.checkStr(login_phone) && login_phone.length == 11 && commonUtils.checkPhoneNum(login_phone)) {
			var curTime = (new Date()).valueOf();
			$.ajax({
				type: 'post',
				url: config.lhServerUrl + '/api/mwlive/user/user_login_getsm.do',
				timeout: 8000, //超时时间设置，单位毫秒
				data: {
					mobile: login_phone,
					oper_time: curTime
					// type:'MVO',
				},
				dataType: 'json',
				success: function (data) {
					if (data && data.code == 200) {
						console.log(data.data);
						commonUtils.showPop2("短信验证码已发送，请查收");
						$("#code_btn").attr("disabled", true);
						doLoop();
					} else {
						commonUtils.showPop2("获取失败，请稍候再试");
					}
				}, error: function () {
					commonUtils.showPop2("获取失败，请稍候再试");
				}
			})
		} else {
			commonUtils.showPop2("请输入正确的手机号码");
			$("#login_phone").focus();
		}
	});
	//显示用户协议内容
	$("#openDeal").click(function () {
		$(".dealText").css("height", "7rem");
		$(".dialog").show();
	});
	$("#deal_close").click(function () {
		$(".dialog").hide();
	});


	

	//直播开始结束调用接口上报信息
	var uuidStr = (parseInt(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000, 10) + (new Date()).valueOf() + new UUID().createUUID() + parseInt(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000, 10)).toString().MD5(32);//md5随机数
	function liveOnOff(onOff) {
		var video_type = 1;
		var idRep = liveID;
		if (config.isLive) {
			video_type = 1;
		} else {
			idRep = videoID;
			video_type = 2;
		}
		if (commonUtils.checkStr(onOff)) {
			var url = config.lhServerUrl + "/api/mwlive/live";
			if (onOff == 1) {	//开始
				url += "/videoview_begin.do";
			} else {
				url += "/videoview_end.do";
			}
			$.ajax({
				type: 'post',
				url: url,
				timeout: 8000, //超时时间设置，单位毫秒
				data: {
					user_id: anchorID,
					client_user_info: uid,
					video_type: video_type,
					id: idRep,
					source_type: 2,
					group_id: uuidStr
				},
				dataType: 'json',
				success: function (data) {
					console.log(data);
				}, error: function (data) {
					console.log("error1111");
				}
			})
		}
	}
	$("video").on('playing', function () {
		liveOnOff(1);
	});

	//流量红包的展示
	$(document).on("click", "#redBag", function () {
		if (identityMode == 0) {
			$(".loginBox").addClass("loginBoxac");
			$("#btn_botom").hide();
			orderLive = 2;	//显示红包
			return false;
		}
		if (!commonUtils.checkStr(anchorName)) {
			anchorName = "管理员";
		}
		if (!commonUtils.checkStr(anchorImg)) {
			anchorImg = config.curUrl + "image/anchorImg.png";
		}
		if (commonUtils.checkStr($("#YuFrame1").attr("id"))) {
			return false;
		}
		$.ajax({
			type: "GET",
			async: true,
			data: {
				uid: openIDTmp,
				nickName: nickname,
				headImg: imgUrl,
				anchorName: anchorName,
				anchorImg: anchorImg
			},
			url: "http://montnets.facebac.com/montnet20170707/montNet/sercetMw",
			dataType: "json",
			success: function (data) {
				console.log(data);
				if (data && data.resultCode == "00" && commonUtils.checkStr(wallet)) {
					var signNature = data.strTmp;
					var nickNameBaseEc = data.nickName;
					var anchorNameBaseEc = data.anchorName;
					var closeUrl = config.curUrl + "closePar.html";
					var srcUrl = wallet + "&openId=" + openIDTmp + "&signNature=" + signNature + "&closeUrl=" + closeUrl + "&nickName=" + nickNameBaseEc + "&headImg=" + imgUrl + "&anchorName=" + anchorNameBaseEc + "&anchorImg=" + anchorImg;
					var wid = clientWidth();
					setTimeout(showIframe(srcUrl, wid * 0.85, 69 / 53 * wid * 0.85), 500);
					//showIframe(srcUrl,wid*0.8,69/53*wid*0.8);
					$("#YuFrame1")[0].addEventListener('touchmove', function (e) {
						e.stopPropagation();	//停止冒泡
					}, false);
				}
			}, error: function (data) {
				console.log(data);
			}
		})
	});
	function clientWidth() {
		if (window.innerWidth)
			winWidth = window.innerWidth;
		else if ((document.body) && (document.body.clientWidth))
			winWidth = document.body.clientWidth;
		return winWidth;
	}
	function clientHeight() {
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
		return winHeight;
	}
	//弹出iframe页面(iframe后面会添加灰色蒙版)**
	function showIframe(url, w, h) {
		//添加iframe
		var if_w = w;
		var if_h = h;
		//allowTransparency='true' 设置背景透明
		$("<iframe width='" + if_w + "' height='" + if_h + "' id='YuFrame1' name='YuFrame1' style='position:fixed;z-index:9990;visibility:hidden;'  frameborder='no' marginheight='0' scrolling='no' marginwidth='0' allowTransparency='true'></iframe>").prependTo('body');
		var st = document.documentElement.scrollTop || document.body.scrollTop;//滚动条距顶部的距离
		var sl = document.documentElement.scrollLeft || document.body.scrollLeft;//滚动条距左边的距离
		var ch = document.documentElement.clientHeight;//屏幕的高度
		var cw = document.documentElement.clientWidth;//屏幕的宽度
		var objH = $("#YuFrame1").height();//浮动对象的高度
		var objW = $("#YuFrame1").width();//浮动对象的宽度
		var objT = Number(st) + (Number(ch) - Number(objH));
		objT = $(".player-area").height() + 2 + "px";
		var objL = Number(sl) + (Number(cw) - Number(objW)) / 2;
		$("#YuFrame1").css('left', objL);
		$("#YuFrame1").css('top', objT);
		$("#YuFrame1").attr("src", url);
		//添加背景遮罩
		$("<div id='YuFrame1Bg' style='background-color: rgba(128, 128, 128, 0);display:block;z-index:993;position:absolute;left:0px;top:0px;filter:Alpha(Opacity=30);/* IE */-moz-opacity:0.4;/* Moz + FF */opacity: 0.4; '/>").prependTo('body');
		var bgWidth = Math.max($("body").width(), cw);
		var bgHeight = Math.max($("body").height(), ch);
		$("#YuFrame1Bg").css({ width: bgWidth, height: bgHeight });

		//点击背景遮罩移除iframe和背景
		$("#YuFrame1Bg").click(function () {
			$("#YuFrame1").remove();
			$("#YuFrame1Bg").remove();
		});
		var iframe = document.getElementById("YuFrame1");
		if (iframe.attachEvent) {
			iframe.attachEvent("onload", function () {
				iframe.style.visibility = "";
				$("#YuFrame1").addClass("iframe_scale");
			});
		} else {
			iframe.onload = function () {
				iframe.style.visibility = "";
				$("#YuFrame1").addClass("iframe_scale");
			};
		}

	}

	var nums = 60;
	var clock;
	function doLoop() {
		clearInterval(clock); //清除js定时器
		nums--;
		if (nums > 0) {
			$("#code_btn").val(nums + 's后重新获取');
			$("#code_btn").addClass("code_btn_dark");
		} else {
			clearInterval(clock); //清除js定时器
			$("#code_btn").attr("disabled", false);
			$("#code_btn").val('获取验证码');
			$("#code_btn").removeClass("code_btn_dark");
			nums = 60; //重置时间
			return false;
		}
		clock = setInterval(doLoop, 1000); //一秒执行一次
	}
	var nums2 = 60;
	var clock2;
	function doLoop_bind() {
		clearInterval(clock2); //清除js定时器
		nums2--;
		if (nums2 > 0) {
			$("#mo_bindSend").val(nums2 + 's后重新获取');
			$("#mo_bindSend").addClass("code_btn_dark2");
		} else {
			clearInterval(clock2); //清除js定时器
			$("#mo_bindSend").attr("disabled", false);
			$("#mo_bindSend").val('获取验证码');
			$("#mo_bindSend").removeClass("code_btn_dark2");
			nums2 = 60; //重置时间
			return false;
		}
		clock2 = setInterval(doLoop_bind, 1000); //一秒执行一次
	}
	//预约界面状态展示-- 0:直播即将开始 1 倒计时 2 直播结束 3 录像准备中(直播已结束，下显示观看录像（若已生成）) 4 无该直播 5 直播中断 6 直播中
	function showAppointStatus(numApo) {
		switch (numApo) {
			case 0:
				$(".livetime_end").show();
				// $(".livetime_end").text("直播即将开始");
				$("#change-definitions00").text("直播即将开始");
				$("#btn_botom").show();
				$(".now_in").text("立即进入");
				$(".now_appoint").removeClass("now_appoint_ac");
				break;
			case 1:
				$("#djs_ready").show();
				$("#djs_ready2").show();
				$(".livetime_end").hide();
				/**
				 * 之前的隐藏的导致 无法显示请提醒我按钮
				 * $(".now_in").hide(); 
				 * $(".now_in").hide();
					* 9月12日线上bug
				*/
				$(".now_in").hide();
				// 不显示请提醒我
				if( leftDjsTime > 0 && ismake !=1 ){
					$("#appoint").addClass("appoint_show");
				}
				$(".now_appoint").show();
				break;
			case 2:
				// $(".livetime_end").show();
				// $(".livetime_end").text("直播已结束");
				// $("#change-definitions00").removeClass("redchange");
				// $("#change-definitions00").text("直播已结束");
				// if ($(".now_appoint").hasClass("now_appoint_ac"))
				// 	$(".now_appoint").removeClass("now_appoint_ac");
				// $("#btn_botom").hide();
				// var h = clientHeight() - $(".btn_botom").outerHeight() + "px";
				// $(".appoint_mode").css("height", h);
				// 直播结束无录像 录像准备中 bug0905
				if ($(".now_appoint").hasClass("now_appoint_ac"))
				$(".now_appoint").removeClass("now_appoint_ac");
				if( isWatch ==1 && leftDjsTime<0 ){
					$("#appoint").removeClass("appoint_show");
				}

				break;
			case 3:
				// $(".livetime_end").show();
				// $(".livetime_end").text("直播已结束");
				// $("#change-definitions00").text("直播已结束");
				// if ($(".now_appoint").hasClass("now_appoint_ac"))
				// 	$(".now_appoint").removeClass("now_appoint_ac");
				// $("#btn_botom").hide();
				// var h = clientHeight() - $(".btn_botom").outerHeight() + "px";
				// $(".appoint_mode").css("height", h);
				// 直播结束无录像 录像准备中 bug0905
				if ($(".now_appoint").hasClass("now_appoint_ac"))
				$(".now_appoint").removeClass("now_appoint_ac");
				if( isWatch ==1 && leftDjsTime<0 ){
					$("#appoint").removeClass("appoint_show");
				}
				break;
			case 4:
				$(".delete_live").show();
				$(".livetime_end").show();
				$(".livetime_end").text("房间已被删除");
				isremove_live = 1;
				$(".start_way").hide();
				$(".appoint_img").attr("src", "image/mobile/video-default.jpg?ver=1.4");
				//if($(".now_appoint").hasClass("now_appoint_ac"))
				$("#appoint").addClass("appoint_show");
				$("#btn_botom").hide();
				var h = clientHeight() - $(".btn_botom").outerHeight() + "px";
				$(".appoint_mode").css("height", h);
				break;
			case 5:
				$(".livetime_end").show();
				$(".livetime_end").text("正在直播中…");
				$(".now_in").show();
				if( isWatch ==1 && leftDjsTime<0 ){
					$("#appoint").removeClass("appoint_show");
				}
				$(".now_appoint").removeClass("now_appoint_ac");
			case 6:
				if (data_detail && data_detail.data.live_status == 1) {
					$(".livetime_end").show();
					$("#djs_ready").hide();
					$("#djs_ready2").hide();
					$(".livetime_end").text("正在直播中…");
					$(".now_in").show();
					if( isWatch ==1 && leftDjsTime<0 ){
						$("#appoint").removeClass("appoint_show");
					}
					$(".now_appoint").removeClass("now_appoint_ac");
					var watch_num = commonUtils.checkStr(data_detail.data.play_count)?data_detail.data.play_count:'0'                 
					$("#viewsNum").text(watch_num +'人看过');
					$(".over_img").hide();
					$("#videoBox").show();
				} else {
					if ((data_detail && data_detail.data.live_status == 2) || config.isLive == false) {
						$("#change-definitions00").text("回放");
						$("#live_showIcon").show().addClass("blue");
						$(".live_icon").text("回放");
						$("#change-definitions00").removeClass("redchange");
						$("#liveActive").hide();
						$("#liveNone").show();
						$("#logo").show();
					} else {
						$(".livetime_end").show();
						$(".livetime_end").text("直播已结束");
						// 直播状态显示
						var watch_num = commonUtils.checkStr(liveInfo.play_count)?liveInfo.play_count:'0'                 
						$("#viewsNum").text(watch_num +'人看过');
						$("#live_showIcon").show();

						$("#change-definitions00").text("直播中");
						$("#change-definitions00").addClass("redchange");
						$(".livetime_end").css("color", "#9b9b9b");
						$(".now_appoint").removeClass("appoint_show");
						$(".now_appoint").removeClass("now_appoint_ac");
						if (commonUtils.checkStr(active_id) && live_permit == 0) {
							var h = clientHeight() - $(".outerHeight").outerHeight() - 1.8 * view_show_w + "px";
							$(".appoint_mode").css("height", h);
							$(".now_in").text("立即进入");
						}
					}
				}
				$(".now_in").show();
				$(".now_appoint").removeClass("appoint_show");
				$(".now_appoint").removeClass("now_appoint_ac");
				break;
			default:
		}
			
	}
	//视频水印设置
	function initLogo() {
		if (commonUtils.checkStr(live_logo)) {
			$(".init_v_logo img").attr("src", live_logo);
		}
	}
	//视频logo设置
	function setLogo(logo_date) {
		var logo_date_xy = logo_date.logo_xy;
		var logo_date_url = logo_date.logo_url;
		var logo_opacity = logo_date.opacity/100;
		if (commonUtils.checkStr(logo_date_url)) {
			$(".logo_show img").attr("src", logo_date_url);
			if (logo_date_xy == 1) {
				$(".logo_show").addClass("logo_position1");
			}
			else if (logo_date_xy == 2) {
				$(".logo_show").addClass("logo_position2");
			}
			else if (logo_date_xy == 3) {
				$(".logo_show").addClass("logo_position3");
			}
			else if (logo_date_xy == 4) {
				$(".logo_show").addClass("logo_position4");
			}
			$(".logo_show").css("opacity",logo_opacity);
		}
	}
	//通过id 查询观看用户信息
	function findviewUserInfo(curUserID) {
		console.log("查询id", curUserID);
		$.ajax({
			type: "post",
			async: false,
			data: {
				id: curUserID
			},
			url: config.lhServerUrl + "/api/mwlive/user/get_userinfo.do",
			dataType: "json",
			success: function (data) {
				console.log("data.data.mobile==>", data.data);
				if (commonUtils.checkStr(data.data)) {
					if (commonUtils.checkStr(data.data.user_title)) {
						nickname = data.data.user_title;
						imgUrl = data.data.user_icon_url;
						console.log("data.data.mobile==>", data.data.mobile);
						if (window.localStorage && (window.localStorage.setItem('abcde', 123), window.localStorage.getItem('abcde') == 123)) {
							storage.nickname = nickname;
							storage.imgUrl = imgUrl;
						} else {
							setCookie("nickname", nickname, 1);
							setCookie("imgUrl", imgUrl, 1);
						}
					}
					if (commonUtils.checkStr(data.data.show_id)) {
						console.log("参数：" + data.data.show_id);
						yunboid = data.data.show_id;
					}
					if (commonUtils.checkStr(data.data.user_status)) {
						if (data.data.user_status == 2 && commonUtils.liveStatus != 4) { //该用户已被封禁，无法观看该直播
							$(".Arrears").show();
							$(".Arrears_modep").html("您的账号由于违规<br>已被封禁如有疑问，请<br>联系梦网云播客服");
							showLive(2);
							$("#appoint").addClass("appoint_show");
							$(".livetime_end").remove();
							$(".livetime_end2").hide();
							$("#btn_botom").css("visibility", "hidden");
							clearInterval(upTime);
							clearInterval(findU);
							setTimeout(function () {
								ws.emit("leave", {
									cmd: 1002,
									roomID: v_roomid,
									nickName: nickname,
									user_id: uid,
									show_id: yunboid,
									imgUrl: imgUrl,
									gender: 0
								});
							}, 1000);
						}

					}
					if (!data.data.mobile) {
						isbindPhone = 0;
					}
					else {
						console.log('重要人物3==>', phone_renwu);
						isbindPhone = 1;
						mobile = data.data.mobile;
						phone_renwu = data.data.mobile;
						if (commonUtils.checkStr(phone_renwu) && !isPhone_renwuFlag) {
							$.ajax({
								type: "post",
								data: {
									live_id: liveID,
									phone: phone_renwu
								},
								url: config.lhServerUrl + "/api/mwlive/user/select_oneImportantFigure.do",
								dataType: "json",
								success: function (data) {
									if (data.code == 200) {
										isPhone_renwuFlag = true;
										console.log("重要人物设置信息==>", data.data);
										//重要人物入场
										if (data.data == null) {
											return false;
										} else {
											photo_renwu = data.data.photo;
											name_renwu = data.data.name;
											position_renwu = data.data.title;
											content_renwu = data.data.content;
											user_ioc = data.data.userImg;
											if (commonUtils.checkStr(data.data)) {
												console.log('重要人物图片==>', phone_renwu);
												ws.emit("msg", {
													cmd: 1055,
													msg: '自定义消息',
													data: {
														phoneNumber: phone_renwu,
														liveID: liveID,
														customize_type: 802,
														nickname: name_renwu,
														content: content_renwu,
														corverUrl: photo_renwu,
														job: position_renwu,
														head_img_url: user_ioc,
													}
												})
											}
										}
									}
								}
							});
						}
						user_phone = data.data.mobile;
						if (live_permit == 4 && !isCheckWhite) {
							isWhiteList();
						}
					}
				}
			}, error: function () {
				console.log("select userInfo error2");
			}
		})
	}
	function findeliveStatus(callback,type) {
		$.ajax({
			type: "GET",
			data: {
				id: liveID,
				user_id: uid
			},
			url: config.lhServerUrl + '/api/mwlive/live/get_info.do',
			dataType: "json",
			success: function (data) {
				console.log("观看者"+ uid)
				console.log('是否有权限观看11=>', isWatch)
				callback = callback || function () { };
				if (commonUtils.checkStr(data.data)) {
					data_detail = data;
					var view_data = data.data;
					//是否是禁播 非0表示禁播
					live_switch = view_data.live_switch;
					isWatch = data.data.isWatch;
									
					console.log('是否有权限观看22=>', isWatch)
					if (live_switch == 2) {
						$(".Arrears").show();
						showLive(2);
						$(".livetime_end").remove();
						$(".livetime_end2").show();
						$("#btn_botom").css("visibility", "hidden");
						$("#appoint_mode_center .appoint_img").attr("src", "image/mobile/video-default.jpg?ver=1.4");
						$(".livetime_end2").html("直播已结束");
					} else if (live_switch == 3) {
						$(".Downline").show();
					}
					
					if(isWatch == 1 && mobile){
						// 预约没有请提醒我  门票进入之后5秒退出
						if(data_detail.data.live_status == 0 && ismake != 1 && leftDjsTime >0){
							if(anchorID != uid){
								$("#appoint").addClass("appoint_show");
							}
							
						}else{
							console.log("没有倒计时！！");
							$("#appoint").removeClass("appoint_show");
										
						}
					}else if(isWatch == 0 && live_permit !=0){
						$("#appoint").addClass("appoint_show");
					}

					if(isWatch == 2 && type == "wx"){
						$("#appoint").addClass("appoint_show");
						$("#loseEfficacy").show();
						window.localStorage.removeItem('liveId' + liveID);
						window.localStorage.removeItem('yuyue_pwd');
						window.localStorage.removeItem('yuyue_pass');
					}
					// 预约人数 定时更新
					if (data.data.live_status == 0) {
						$(".appointCount span").text(data.data.appointCount);
					}
					if(data.data.live_status!=0){
						$(".appointCount").hide();
					}
					callback();
				}

			}, error: function (data) {
			}
		});
	}
	//通过id 查询主播用户信息
	function findUserInfo(curUserID) {
		console.log("主播id" + anchorID);
		$.ajax({
			type: "POST",
			async: false,
			data: {
				id: curUserID
			},
			url: config.lhServerUrl + "/api/mwlive/user/get_userinfo.do",
			dataType: "json",
			success: function (data) {
				if (commonUtils.checkStr(data.data)) {
					if (data.data.qualify == 3) {//认证了，根据余额限制并发，最少100人
						isQualify = true;
					} else {
						isQualify = false;
					}
					if (commonUtils.checkStr(data.data.user_title)) {
						anchorName = data.data.user_title;
						anchorImg = data.data.user_icon_url;
						user_stutas = data.data.user_status;
					}
					if (commonUtils.checkStr(data.data.user_status)) {
						if (data.data.user_status == 1 && commonUtils.liveStatus != 4) {
							showLive(2);
							if(commonUtils.getUrlParam("videoid")){
								$(".live_state").show();
							}
							$("#appoint").addClass("appoint_show");
							$(".page-footer").hide();
							$("#appoint_mode_center").css("height","100%");
							$(".livetime_end").remove();
							$(".livetime_end2").show();
							$("#btn_botom").css("visibility", "hidden");
							$(".livetime_end2").html("主播余额不足,无法观看");
							clearInterval(upTime);
							clearInterval(findU);
						}

						if (data.data.user_status == 2 && commonUtils.liveStatus != 4) { //该主播已被封禁，无法观看该直播
							$(".Arrears").show();
							showLive(2);
							$("#appoint").addClass("appoint_show");
							$(".livetime_end").remove();
							$(".livetime_end2").hide();
							$("#btn_botom").css("visibility", "hidden");
							clearInterval(upTime);
							clearInterval(findU);					
							setTimeout(function () {
								ws.emit("leave", {
									cmd: 1002,
									roomID: v_roomid,
									nickName: nickname,
									user_id: uid,
									show_id: yunboid,
									imgUrl: imgUrl,
									gender: 0
								});
							}, 1000);
						}

					}

				}
			}, error: function () {
				console.log("select userInfo error3");
			}
		})
	}

	//查询主播是否认证并超出人数限制
	var intLimitPeople;  //并发数上限
	var limitPeople;     //限制人数
	function findUserqualify(curUserID) {
		$.ajax({
			type: "post",
			data: {
				id: curUserID
			},
			url: config.lhServerUrl + "/api/mwlive/user/get_userinfo.do",
			dataType: "json",
			success: function (data) {
				if (commonUtils.checkStr(curUserID)) {
					if (commonUtils.checkStr(data.data.qualify)) {
						console.log("在线观看人数：" + v_room_online_users);
						if (data.data.qualify == 3) {//认证了，根据余额限制并发，最少100人
							isQualify = true;
						} else { //未实名验证,限制10人
							isQualify = false;
						}
						return false;
					}
				}
			}
		})
	}
	//引流  打开app或者跳转至app下载
	var downflag = 0;
	//点击预约/评论 跳转到app
	$(".wxTipclose_btn").on("click", function () {
		$("#wxTip").hide();
		$("#wrap_n,.appoint").removeClass("blur_bg");
	});
	$("#openApp,.open_App").click(function () {
		var ua = navigator.userAgent.toLowerCase();
		if ((ua.match(/MicroMessenger/i) == 'micromessenger') || (ua.match(/WeiBo/i) == "weibo") || (navigator.userAgent.indexOf(' QQ') > -1)) {	//微信浏览器或者是在手机QQ
			document.getElementById("wxTip").style.display = "block";
			$("#wrap_n,.appoint").addClass("blur_bg");
			//if(navigator.userAgent.match(/android/i)){
			//	if(null != videoIDapp && "" != videoIDapp && typeof(videoIDapp) != "undefined" && "null" != videoIDapp){
			//		dataJsonV = {status:"2",ID:videoIDapp};
			//	}else if(null != liveIDapp && "" != liveIDapp && typeof(liveIDapp) != "undefined" && "null" != liveIDapp){
			//		dataJsonV = {status:"1",ID:liveIDapp};
			//	}
			//	location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.montnets.live&android_schema=newmwyb://open?data="+JSON.stringify(dataJsonV);
			//}
			//else if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
			//	document.getElementById("wxTip").style.display="block";
			//	$("#wrap_n,.appoint").addClass("blur_bg");
			//}
		} else {
			downflag = 1;
			if (commonUtils.liveStatus != 4 && defaultAuthorization) {
				// yst注释  正式要改
				// down_app();
			}
		}
	});
	function down_app() {
		console.log("downflag############################:" + downflag);
		var openBtApp = "";
		var downUrl = "";
		var liveIDapp = getUrlParam("liveid");
		var videoIDapp = getUrlParam("videoid");
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			if (null != videoIDapp && "" != videoIDapp && typeof (videoIDapp) != "undefined" && "null" != videoIDapp) {
				dataJsonV = { status: "2", ID: videoIDapp };
				openBtApp = "newmwyb://open?data=" + JSON.stringify(dataJsonV);
			} else if (null != liveIDapp && "" != liveIDapp && typeof (liveIDapp) != "undefined" && "null" != liveIDapp) {
				dataJsonl = { status: "1", ID: liveIDapp };
				openBtApp = "newmwyb://open?data=" + JSON.stringify(dataJsonl);
			}
			else {
				openBtApp = "newmwyb://open?data=";
			}
			testOpenIOSApp(openBtApp);
		} else if (navigator.userAgent.match(/android/i)) {
			if (null != videoIDapp && "" != videoIDapp && typeof (videoIDapp) != "undefined" && "null" != videoIDapp) {
				dataJsonV = { status: "2", ID: videoIDapp };
				openBtApp = "newmwyb://open?data=" + JSON.stringify(dataJsonV);
			} else if (null != liveIDapp && "" != liveIDapp && typeof (liveIDapp) != "undefined" && "null" != liveIDapp) {
				dataJsonl = { status: "1", ID: liveIDapp };
				openBtApp = "newmwyb://open?data=" + JSON.stringify(dataJsonl);
			}
			else {
				openBtApp = "newmwyb://open?data=";
			}
			testOpenApp(openBtApp);
		}
	}
	//打开ios app
	function testOpenIOSApp(lcp) {
		if (downflag == 1) {
			setTimeout(function () {
				location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.montnets.live";
			}, 2000);
			location.href = lcp;
		}
		else {
			setTimeout(function () {
				//location.href=url;
			}, 2000);
			location.href = lcp;
		}

	}
	//打开安卓app
	function testOpenApp(lcp) {
		if (downflag == 1) {
			setTimeout(function () {
				location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.montnets.live";
			}, 2000);
			var timeout, t = 1000, hasApp = true;
			setTimeout(function () {
				if (hasApp) {
					// document.getElementById("fluTip").style.display="none";
					document.getElementById("wxTip").style.display = "none";
					$("#wrap_n,.appoint").removeClass("blur_bg");
				} else {
					window.location = url;
				}
				document.body.removeChild(ifr);
			}, 1000);
			var t1 = Date.now();
			var ifr = document.createElement("iframe");
			ifr.setAttribute('src', lcp);
			ifr.setAttribute('style', 'display:none');
			document.body.appendChild(ifr);
			timeout = setTimeout(function () {
				var t2 = Date.now();
				if (!t1 || t2 - t1 < t + 100) {
					hasApp = false;
				}
			}, t);
		}
		else {
			var timeout, t = 1000, hasApp = true;
			setTimeout(function () {
				if (hasApp) {
					// document.getElementById("fluTip").style.display="none";
					document.getElementById("wxTip").style.display = "none";
					$("#wrap_n,.appoint").removeClass("blur_bg");
				} else {
					window.location = url;
				}
				document.body.removeChild(ifr);
			}, 1000);
			var t1 = Date.now();
			var ifr = document.createElement("iframe");
			ifr.setAttribute('src', lcp);
			ifr.setAttribute('style', 'display:none');
			document.body.appendChild(ifr);
			timeout = setTimeout(function () {
				var t2 = Date.now();
				if (!t1 || t2 - t1 < t + 100) {
					hasApp = false;
				}
			}, t);
		}

	}
	//请求观看人数信息
	function askviewTotal() {
		$.ajax({
			type: "POST",
			data: {
				bizCode: "6002",
				userID: anchorID,
				liveID: liveID
			},
			url: config.lhServerUrl + "/service/iBacService.action",
			dataType: "json",
			success: function (data) {
				if (data && data.resultCode == "01")
					totalViewers = data.params.totalViewers;
			}, error: function () {
				console.log("select userInfo error");
			}
		})
	}
	//请求录播列表信息显示录像列表
	function askVIdeoInfo() {
		if (!uid) {
			return false;
		}
		$.ajax({
			type: "POST",
			data: {
				select_str: liveID,
				user_id: uid,
				page_index: 1,
				page_size: 100
			},
			url: config.lhServerUrl + "/api/mwlive/live/get_reclistbyselect.do",
			dataType: "json",
			success: function (data) {
				if(data.code == "200"){
					// end_show_type = data.data.live_after_type;
					// end_show_img = data.data.live_after_url;
					// end_show_vod = data.data.live_after_url;
				}
				if (data.code == "200" && commonUtils.checkStr(data.data.data_list)) {
					var videoList = (data.data.data_list);
					if (videoList.length > 0) {
						if (videoList[0].source_type == 3 || videoList[0].source_type == 6) {
							videoList.shift();
						}
					}
					if (videoList.length >= 1) {
						//控制视频按钮的显示
						live_list = 1;
						// 录像列表 添加videoid到播放中，上报获取
						$("#playBtn").attr("video-id",videoList[0].video_id);
						$("#viewsNum").text(videoList[0].play_count+"人看过");
						if (live_list == 1) {
							var rank_video = '<li data-target="rank" id="rank_video">录像</li>';
							$("#rank_0710").before(rank_video);
						
							$(".video_list_ul").html("");
							for (var i = 0; i < videoList.length; i++) {
								var show_imgSrc = videoList[i].live_cover_url||videoList[i].video_cover_url;
								var show_liveName = videoList[i].live_name;
								var show_liveTime = videoList[i].record_time;
								var play_count = videoList[i].play_count;
								var show_liveTimes = new Date(show_liveTime);
								var play_videoSrc = videoList[i].file_path;
								show_liveTime = show_liveTimes.format("yyyy-MM-dd hh:mm");
								var totle_view = videoList[i].cur_viewers;
								var trends_Img = videoList[i].src = "./image/playing.gif";
								var id =  videoList[i].video_id;
								var appendLi = '<li id="video_'+i+'"dataplay=' + play_videoSrc + '>'+
								'<div class="video_showImg" style="background: url(' + show_imgSrc + ') center no-repeat ;background-size: cover"></div>'+
								'<div class="video_detail">'+'<h3 class="videoh3_title">' + show_liveName + '</h3>'+
								// '<p class="videoh3_tiem">权限：' + show_liveTime + '</p>'+
								'<p class="videoh3_tiem">时间：' + show_liveTime + '</p>'+
								'<p class="view_cont"  data-id="'+ id +'" data-num="'+play_count+'">浏览 : ' + play_count + '次</p>'+
								'<img class="trends_Img" src=' + trends_Img + ' ></div></li>';
								$(".video_list_ul").append(appendLi);				
							}
							$(".video_list_ul").append('<div class="no_more"><p>-&nbsp;&nbsp;没有更多了&nbsp;&nbsp;-</p></div>');
							$("#video_0").prepend('<div class="icon_v"></div><i class="icon_sj"><i>') 
							// 点击录像列表 应该重新上报
							$('.video_list_ul li').on("click", function () {
								console.log("录像事件1")
								var play_New = $(this).attr('dataplay');
								$("video")[0].src = play_New;
								var number = $(this).find(".view_cont").attr("data-num");
								$("#viewsNum").text(number+"人看过");
								$(".p1").hide();
								var myVodeoId = $(this).find(".view_cont").attr("data-id")
								$("#playBtn").attr("video-id",myVodeoId).show();
								var ua = window.navigator.userAgent.toLowerCase();
								if ((navigator.userAgent.indexOf(' QQ') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) || (ua.indexOf('mqqbrowser') > -1 && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))) {
								}
								else {
									$("video")[0].load(play_New);
								}
								$("#change-definitions00").text("回放");
								$("#live_showIcon").show().addClass("blue");
								$(".live_icon").text("回放");
								$("#change-definitions00").removeClass("redchange");
								$("#liveActive").hide();
								$("#liveNone").show();
								$("#logo").show();
								config.isLive = false;
								commonUtils.liveStatus = 1;
								data_detail.data.live_status = 2;
								isLive(play_New);
								sleep(500);
								showLive(6);
								$("video")[0].play();
								$("#video_IMG,.over_img").hide();
								$(this).find('.trends_Img').show();
								$(this).siblings().find('.trends_Img').hide();
							});
						}
					}
					else {
						live_list = 0;
						var miew = ($(window).width() * 0.9) / 3;
						$(".ctrl-list ul li").css("width", miew + 'px');
						$(".video_list").hide();
					}
					if (live_list == 1) {
						$(".swiper_hua .swiper-pagination-bullet").css("width", lw25 + 'px');
					}
					else {
						$(".swiper_hua .swiper-pagination-bullet").css("width", lw33 + 'px');
					}
				}else{
					$('.video_list_ul').html('').addClass("no_data").show();
                    var tishiImg = '<img  src="./image/no_video.png?ver=20184"><p class="no_data_p">暂无录像</p>';
                    $(".video_list_ul").append(tishiImg);
				}
			}, error: function (data) {
				$('.video_list_ul').html('').addClass("no_data").show();
				var tishiImg = '<img src="./image/no_video.png?ver=20184"><p class="no_data_p">暂无录像</p>';
				$(".video_list_ul").append(tishiImg);
				console.log("select userInfo error4");
			}
		})
	}
	if (live_list == 0) {
		var miew = ($(window).width() * 0.9) / 3;
		$(".ctrl-list ul li").css("width", miew + 'px');
		$(".video_list").hide();
	};

	//获取直播状态
	function findeliveCondition() {
		$.ajax({
			type: "POST",
			data: {
				id: liveID
			},
			url: config.lhServerUrl + "/api/mwlive/live/get_status.do",
			dataType: "json",
			success: function (data) {
				console.log("$$$$$$$$$$$$$======")
				console.log(data_detail.data.live_status)
				console.log(data.data);
				console.log("查询是否有直播状态");
				if (data_detail.data.live_status == 1) {
					if (data.data == 1 || data.data == 0) {
						$('.video_list_ul li').on("click", function () {
							console.log("录像事件2")
							$(".forecast").slideDown("slow");
						});
					}
				}

			}
		});
		$(".forecast").on("click", function () {
			var nowUrl = now_url;
			$("video").attr("src", "now_url");
		});
	}
	//返回直播实况
	$(".rank_video").mouseenter(function () {
		findeliveCondition();
	});

	//请求直播信息 传给app
	function askLvInfo() {
		$.ajax({
			type: "POST",
			data: {
				bizCode: "4006",
				liveID: liveID
			},
			url: config.lhServerUrl + "/service/iBacService.action",
			dataType: "json",
			success: function (data) {
				if (data && data.resultCode == "01")
					dataJsonl = data.paramo[0];
			}, error: function (data) {
				console.log("select userInfo error5");
			}
		})
	}
	function showApp() {
		$("#openApp").show();
	}
	function dianzan_get() {
		$.ajax({
			type: "POST",
			data: {
				liveID: liveID
			},
			url: config.lhServerUrl + "/service/queryLike.action",
			dataType: "json",
			success: function (data) {
				if (data.resultCode == "01") {
					var data = data.params;
					var clicklike_num = data.likeCount;
					$(".true_num").text(clicklike_num);
					$(".queryLike_num").text(clicklike_num);
					if (clicklike_num == 0) {
						$(".click_zan").removeClass("click_zan_no");
						$(".click_zan_num").hide();
					}
					else {
						$(".click_zan_num").show();
						$(".click_zan").addClass("click_zan_no");
					}
					if (clicklike_num >= 10000) {
						$('.queryLike_price').show();
						clicklike_num = parseFloat(clicklike_num / 10000).toFixed(2);
						$(".queryLike_num").text(clicklike_num);
					}
					else {
						$('.queryLike_price').hide();
					}
				}
				else {
					$(".click_zan").hide();
				}
			}, error: function (data) {
				$(".click_zan").hide();
			}
		})
	}
	//送礼榜单
	function giftAll() {
		//if(now_url.indexOf("mwLive") >= 0){
		//	videoID="";
		//}
		$.ajax({
			type: "POST",
			data: {
				receiveLiveID: liveID,
				pageSize: 10,
				pageNo: 1
			},
			url: config.lhServerUrl + "/service/queryReceiveGiftAll.action",
			dataType: "json",
			success: function (data) {
				if (data.resultCode == "01") {
					var data = data.params;
					if (commonUtils.checkStr(data.list)) {
						var data = (data.list);
						$('.recommend_list').html('');
						$('.recommend_list').removeClass("no_data");
						for (var i = 0; i < data.length; i++) {
							var data_num = parseFloat(data[i].amount / 10).toFixed(2);
							//yst榜单单位
							// var data_num = data[i].amount;
							var data_numz = parseInt(data_num);
							if (data_numz >= 10000) {
								data_num = parseFloat(data_num / 10000).toFixed(2);
								data_num = data_num + "w"
							}
							if (i == 0) {
								var top1 = '<li class="number_one"><img class="ranking" src="./image/mobile/top_1.png?ver=2018" alt=""><div class="rank_img"><img class="rank_head" src=' + data[0].imgUrl + ' alt=""></div><span class="ranker_name">' + data[0].userName + '</span><span class="flor_bin"><img src="./image/mobile/bin_iocn.png" alt=""><b>' + data_num + '</b></span></li>';
								$('.recommend_list').append(top1);
							}
							if (i == 1) {
								var top2 = '<li><img class="ranking" src="./image/mobile/top_2.png?ver=2018" alt=""><img class="rank_head" src=' + data[1].imgUrl + ' alt=""><span class="ranker_name">' + data[1].userName + '</span><span class="flor_bin"><b>' + data_num + '</b><img src="./image/mobile/bin_iocn.png" alt=""></span></li>';
								$('.recommend_list').append(top2);
							}
							if (i == 2) {
								var top3 = '<li><img class="ranking" src="./image/mobile/top_3.png?ver=2018" alt=""><img class="rank_head" src=' + data[2].imgUrl + ' alt=""><span class="ranker_name">' + data[2].userName + '</span><span class="flor_bin"><b>' + data_num + '</b><img src="./image/mobile/bin_iocn.png" alt=""></span></li>';
								$('.recommend_list').append(top3);
							}
							else if (i > 2) {
								var top = '<li><span class="rank_num">' + (i + 1) + '</span><img class="rank_head" src=' + data[i].imgUrl + ' alt=""><span class="ranker_name">' + data[i].userName + '</span><span class="flor_bin"><b>' + data_num + '</b><img src="./image/mobile/bin_iocn.png" alt=""></span></li>';
								$('.recommend_list').append(top);
								
							}

						}
					}
					else { //暂时没有人赠送礼物
						$('.recommend_list').addClass("no_data").html('');
						var tishiImg = '<img  src="./image/mobile/no_paihang.png?ver=20184"><p class="no_data_p">暂无礼物</p>';
						$(".recommend_list").append(tishiImg);
					}
				}
			}, error: function (data) {
				//$(".click_zan").hide();
				$('.recommend_list').addClass("no_data").html('');
				var tishiImg = '<img src="./image/mobile/no_paihang.png?ver=20184"><p class="no_data_p">暂无礼物</p>';
				$(".recommend_list").append(tishiImg);
			}
		})
	}
	// yst注释
	setTimeout(giftAll, 2e3);
	setTimeout(dianzan_get, 2e3);
	//askLvInfo();
	if(commonUtils.getUrlParam("liveid")){
		askVIdeoInfo();
	}	
	askviewTotal();
	setTimeout(showApp, 1e3);
	initHeigth(3.42);
	console.log('获取聊天室信息4');
	// yst注释聊天室
	createOrOccerChatRoom();
	//$("#desc_0710").click();
	setInterval(dianzan_get, 20e3);
	//点赞

	var heartID = 0;
	var heart_ID = 0;
	var clicj_flag = false;
	var t1Limit = new Date().getTime();
	var t2Limit = "";
	$("#click_zan").click(function () {
		$(".click_zan_num").show();
		$(".click_zan").addClass("click_zan_no");
		t2Limit = new Date().getTime();
		//点赞动画
		heartID++;
		heart_ID++;
		var heart_id = "zan" + heartID;
		var heart_id2 = "dianzan" + heart_ID;
		var randx = parseInt((Math.random() - 0.8) * 120) + 'px';  //随机x轴位子
		var randx2 = parseInt((Math.random() - 0.8) * 120) + 'px';
		var randy = parseInt((Math.random() + 1) * -110) + 'px';   //随机轴y位子
		var randy2 = parseInt((Math.random() + 1) * -110) + 'px';
		var color_arr = ["red", "blue3", "orgeen", "zise2", "green", "green2", "blue", "pink", "blue2", "zise", "yellow"];
		var color_index = Math.floor((Math.random() * color_arr.length));
		var color_index2 = Math.floor((Math.random() * color_arr.length) + 1);
		var cls = color_arr[color_index];
		var cls2 = color_arr[color_index2];

		var heart = '<div id = ' + heart_id + ' class="heart ' + cls + '" ></div>';
		var heart2 = '<div id = ' + heart_id2 + ' class="heart ' + cls2 + '" ></div>';

		$(".heart_box").append(heart);
		$(".heart_box").append(heart2);
		setTimeout(function () {
			$("#" + heart_id).css("transform", "translate(" + randx + "," + randy + ") scale(0.6)");
			$("#" + heart_id).css("-webkit-transform", "translate(" + randx + "," + randy + ") scale(0.6)");
			setTimeout(function () {
				$("#" + heart_id).css("opacity", "0");
			}, 300)
		}, 10);
		setTimeout(function () {
			$("#" + heart_id2).css("transform", "translate(" + randx2 + "," + randy2 + ") scale(0.6)");
			$("#" + heart_id2).css("-webkit-transform", "translate(" + randx2 + "," + randy2 + ") scale(0.6)");
			setTimeout(function () {
				$("#" + heart_id2).css("opacity", "0");
			}, 300)
		}, 50);
		setTimeout(function () {
			for (var hi = 0; hi < $(".heart").length - 35; hi++) {
				$('.heart').eq(hi).remove();
			}
		}, 2500);
		//点赞动画结束
		if (t2Limit - t1Limit < 1000) {
			return false;
		}
		t1Limit = new Date().getTime();
		updoLike();
		function updoLike() {
			console.log(uid);
			$.ajax({
				type: "POST",
				data: {
					masterID: anchorID,
					liveID: liveID,
					likeID: uid
				},
				url: config.lhServerUrl + "/service/doLike.action",
				dataType: "json",
				success: function (data) {
					var like_data = data.resultCode;
					if (like_data == "01") {
						var true_num = $(".true_num").text(); //真实的点赞数
						true_num++;
						$(".true_num").text(true_num);
						$(".queryLike_num").text(true_num);
						if (true_num >= 10000) {
							$('.queryLike_price').show();
							true_num = parseFloat(true_num / 10000).toFixed(2);
							$(".queryLike_num").text(true_num);   //显示的点赞数
						}
						else {
							$('.queryLike_price').hide();
						}
					}
					else {
						commonUtils.showPop2("点赞失败，稍后再试");
					}
				}, error: function (data) {
					commonUtils.showPop2("点赞失败，稍后再试");
				}
			})
		}

	});
	//邀请按钮部分
	$("#invitation").on("click", function () {
		$(".invitation_bg").show();
	});
	$('.invitation_bg').on("click", function () {
		$(".invitation_bg").hide();
	});
	$('.nvitation_list li').on("click", function () {
		event.stopPropagation();
	});

	//页面加载完成显示
	document.onreadystatechange = function () {
		if (document.readyState == "complete") {
			setTimeout(function () {
				// yst注释tab
				TouchSlide({
					slideCell: "#tabBox",
					titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
					effect: "left",
					autoPage: true //自动分页
				});
				// tab切换
				$("#menuList").on("click", 'li', function () {				 
					var menuContent = $(this).attr("menu-content")
					var type = $(this).attr("type");
					$(this).addClass("active").siblings().removeClass("active").removeClass("tab0");
					switch (type) {
						// 菜单类型，0表示聊天，1表示简介，2表示录像列表，3表示榜单，4表示图文 
						case "0":
							$(".page-chat").show().siblings().hide();
							$('.Notice').css("visibility","visible");
							$(".slide_nav,.page-footer").show();
							break;
						case "1":
							$(".page-desc").show().siblings().hide();
							$(".slide_nav,.page-footer").hide();
							$('.Notice').css("visibility","hidden");
							break;
						case "2":
							$(".video_list").show().siblings().hide();							
							$(".video_list_ul").show();
							$(".slide_nav,.page-footer").hide();
							$('.Notice').css("visibility","hidden");
							findeliveCondition();
							break;
						case "3":
							$(".page-recommend").show().siblings().hide();
							$(".slide_nav,.page-footer").hide();
							$('.Notice').css("visibility","hidden");
							giftAll();
							break;
						case "4":
							var str = $(this).find("span").text().replace(/^\"|\"$/g,'');
							$("#imageTxt").html(str).removeClass("no_data");;
							if(menuContent!=0 && str!=0){
								$("#imageTxt").append('<div class="no_more"><p>-&nbsp;&nbsp;没有更多了&nbsp;&nbsp;-</p></div>');
							}else{
								$('#imageTxt').html('').addClass("no_data");
								var tishiImg = '<img  class="noDataImg" src="./image/icon_wu.png?ver=20184"><p class="no_data_p">暂无简介</p>';
								$("#imageTxt").append(tishiImg);
							}
							$("#imageTxt").show().siblings().hide();
							$(".slide_nav,.page-footer").hide();
							$('.Notice').css("visibility","hidden");
							break;
					}
				});
			
				//礼物点击选中礼物
				$("#gift li").on("click", function () {
					$(this).addClass("active_gift");
					$(this).siblings().removeClass("active_gift");
					$(this).parent("ul").siblings().find("li").removeClass("active_gift");
					var giftMes = $(this).find(".gift_name").text();
					$("#giftMoney").val("");
					$('i').removeClass("clickActive");	//清掉所有已选
					if ($(this).find("i").hasClass("clickActive")) {
						$(this).find("i").removeClass("clickActive");
						$("#input_gift").val("");
					} else {
						$(this).find("i").addClass("clickActive");
						$("#input_gift").val(giftMes);
						var money = $(this).find('font').html();
						$("#giftMoney").val(money);
					}
				});
				//分页为一个时隐藏分页原点
				if ($("#tabBox .hd ul li").length <= 1) {
					$("#tabBox .hd ul li").hide();
				}
				else {
					$("#tabBox .hd ul li").show();
				}
				if (isAndroid) {

				}
				else {
					// yst注释tab
					// new Swiper('#appoint_mode_center', {
					// 	scrollbar: '.scrollbarsd',
					// 	direction: 'vertical',
					// 	slidesPerView: 'auto',
					// 	mousewheelControl: true,
					// 	resistanceRatio: 0,
					// 	freeMode: true,
					// });
					// yst注释tab
				}
			}, 300);
		}
	};
	var startTime;
	var endTime;
	var firstEnter = 1;
	var upvideoId = '';
	var data = sessionStorage.getItem('firstkey');

	if (data == 1) {
		//console.log("再次打开！");
		firstEnter = 0;
	}
	else {
		//console.log("首次打开！");
		firstEnter = 1;
	}
	function upPlaytime() {
		var lookType = 0;
		if(commonUtils.getUrlParam("liveid")){
			if (config.isLive == true) {
				lookType = 0;
				upvideoId = "";
			}
			else {
				lookType = 1;
				upvideoId = $("#playBtn").attr("video-id");
			}
		}
		if(commonUtils.getUrlParam("videoid")){			
			lookType = 1;
			upvideoId = bunchVideoId;			
		}
		
		var jsonStr = {
			"userId": uid,
			"maxBitrate": 0,
			"liveId": liveID,
			"chatCount": chatCount,//聊天数
			"code": "100021",
			"minBitrate": 0,
			"appVersion": "1.5.0",
			"curViewers": v_room_online_users,
			"endTime": endTime,
			"roomId": v_roomid,
			"avgBitrate": 0,
			"internetType": "0",
			"anchorId": anchorID||anchorID_video,
			"lookType": lookType,
			"vedioId": upvideoId,
			"sendCourtesy": sendCourtesy,//礼物数
			"userName": nickname,
			"startTime": startTime,
			"firstEnter": firstEnter,	
			"phoneType": "H5",
			"type": $("#playBtn").attr("data-id"),//1为直播2为点播
			"platform": 2,//1
		};
		var param = JSON.stringify(jsonStr);
		//console.log(param);
		$.ajax({
			type: "POST",
			// url: config.lhServerUrl+"/report/100021",
			url: config.lhServerUrl2 + "/report/100021",
			data: {
				param: param
			},
			dataType: 'json',

			success: function (data) {
				console.log("==> " + JSON.stringify(data));
				if (data.mc == "SUCCESS") {
					sendCourtesy = 0;
					chatCount = 0;
					console.log("上报成功")
				} else {
					console.log("==> " + JSON.stringify(data));
					console.log("上报失败")
				}
			},
			error: function (data) {
				console.log("==> " + JSON.stringify(param));
				console.log("上报失败")
			}
		});
	}
	//点击播放
	var playBtn = document.getElementById("play_btn");
	playBtn.addEventListener('touchend', function (event) {
		console.log("点击播放按钮")
		sessionStorage.setItem('firstkey', '1');
		endTime = new Date().format("yyyy-MM-dd hh:mm:ss");
		startTime = new Date().format("yyyy-MM-dd hh:mm:ss");
		upPlaytime();
		upTime = setInterval(function () {
			var data = sessionStorage.getItem('firstkey');
			if (data == 1) {
				console.log("再次打开！");
				firstEnter = 0;
			}
			else {
				console.log("首次打开！");
				firstEnter = 1;
			}
			
			endTime = new Date().format("yyyy-MM-dd hh:mm:ss");
			// startTime = (new Date(new Date().getTime()-60000)).format("yyyy-MM-dd hh:mm:ss");
			if(playFlag){
				console.log('播放中上报');
				upPlaytime();
			}else{
				console.log('暂停中不上报');
				return;
			}
		}, 60000)
	}, false);
	var example_video = document.getElementById("example_video_1");

	// 视频播放结束
	// example_video.onended = function () {
	// 	clearInterval(upTime);
	// };
	// 播放事件
	// example_video.addEventListener('play', function() {
	// 	playFlag = true;
	// }, false);

	// example_video.addEventListener('pause', function() {
	// 	playFlag = false;
	// }, false);
		
	//点击确定按钮隐藏欠费弹窗
	$(".sure_arrears").on("click", function () {
		$(".Arrears").hide();
	});



	setTimeout(function () {
		if (commonUtils.liveStatus != 4 && !commonUtils.checkStr(storage.webPayorderNo) && !commonUtils.checkStr(storage.orderWebPNo)) {
			// $('.show_APP').fadeIn("fast");
		}
	}, 3000);
	//控制公告栏显示
	var test = 0;
	if (noticeFlag == 1) {
		// $(".Notice").show();
		// $("#default_li").css("marginTop","1rem");
		$(".ad_container").width($(".ad_slide").outerWidth());
		var swiper = new Swiper('.ad_container', {
			pagination: '.ad_pagination',
			slidesPerView: 1,
			paginationClickable: true,
			spaceBetween: 0,
			autoplay: 1,
			speed: 6000,
			noSwipingClass: 'ad_slide ',
			freeMode: true,
			loop: true,
			onSlideChangeEnd: function (swiper) {
				console.log(test++)
			}
		});
	}

	function view_pass_check(pass, success, error) {
		var data;
		if(commonUtils.getUrlParam("liveid")){
			data = {
				user_id: anchorID,	//主播用户id
				id: liveID,
				view_pass: pass,
				look_user_id: uid,
			}
		}else{
			data = {
				user_id: anchorID_video,	//主播用户id
				id: liveID,
				view_pass: pass,
				look_user_id: uid,
				video_type:3 //1直播  2录播  3点播
			}
		}
		$.ajax({
			type: 'post',
			url: config.lhServerUrl + '/api/mwlive/live/view_pass_check.do',
			data: data,
			dataType: 'json',
			success: function (data) {
				success(data);
				isView == true;
			}, error: function () {
				error();
			},
		})
	}
	//门票验证
	function useCode(code1, isAuto) {
		console.log('viaviavia===>' + code1);
		$.ajax({
			type: 'post',
			url: config.lhServerUrl + '/service/useCode.action',
			data: {
				liveID: liveID,	//主播用户id
				userID: uid,
				code: code1
			},
			dataType: 'json',
			success: function (data) {
			
				console.log('useCode.action==>', data);
				var isUseCode = window.localStorage.getItem(liveID + code1);
				if ((data && data.resultCode == 1) || isUseCode == true) {//服务器判断门票是否使用;或者缓存中判断门票码是否本机使用
					// 门票使用状态 yst
					window.localStorage.setItem(liveID + code1, true);
					window.localStorage.setItem('liveId' + liveID, 'true');
					console.log(isUseCode)
					$(".tickets input").blur();
					setTimeout(function () {
						$(".view_tickets").hide();
						$("#wrap_n").show();
					}, 500);
					if (leftDjsTime > 0 && commonUtils.liveStatus == 0) {
						var showBind =   getUserInfo(uid) ?getUserInfo(uid).mobile:"";
						if(defaultAuthorization){
							if (!showBind) {
								$("#example_video_1").hide();
								$(".mobile_bind").show();
							} else {
								console.log("预约查询是否是默认授权："+defaultAuthorization);
								if(!defaultAuthorization){
									$(".appoint_shuru").show();
								}else{
									appointment(mobile);
								}
							}
						}else{
							console.log("预约查询是否是默认授权："+defaultAuthorization);
							if(!defaultAuthorization){
								$(".appoint_shuru").show();
							}else{
								appointment(mobile);
							}
						}
						
					} else {
						setTimeout(function () {
							if(defaultAuthorization){
								if (isbindPhone == 1) {
									if (data_detail.data.live_status == 0 && leftDjsTime > 0 && ismake != 1) {
										return false;
									}
									// 进入直播间
									$("#appoint").removeClass("appoint_show");
									showQR();
								}
							}
							setCookie("yuyue_pwd", liveID, 1 / 24);
							setCookie("yuyue_pass", live_pass, 1 / 24);
							window.localStorage.setItem('yuyue_pwd', liveID);
							window.localStorage.setItem('yuyue_pass', live_pass);
							if (passAftChat == 1) {
								//$("#chat_0710").click();
							}
						}, 500);
					}
					return false;
				}
				else if (data && data.resultCode == 5 && !isAuto) {
					$(".view_tickets .code_err").text("门票码已使用");
					for (var i = 0; i <= 5; i++) {
						var via = "#via" + i;
						$(via).val("");
						$(".tickets_cover_list li").text("");
						$(".tickets_cover_list li").removeClass("active_pwc_dian");
						$("#via0").focus();
						$(".tickets_cover_list li").eq(0).addClass("active_tickets");
						$(".tickets_cover_list li").eq(0).siblings().removeClass("active_tickets")
					}
				}
				else if (data && data.resultCode == 3) {
					$(".view_tickets .code_err").text("门票码输入有误，请重新输入");
					for (var i = 0; i <= 5; i++) {
						var via = "#via" + i;
						$(via).val("");
						$(".tickets_cover_list li").text("");
						$(".tickets_cover_list li").removeClass("active_pwc_dian");
						$("#via0").focus();
						$(".tickets_cover_list li").eq(0).addClass("active_tickets");
						$(".tickets_cover_list li").eq(0).siblings().removeClass("active_tickets");
				}
				}else if (data && data.resultCode == 6) {
					$(".view_tickets .code_err").text("您的门票已失效，无法观看");
					for (var i = 0; i <= 5; i++) {
						var via = "#via" + i;
						$(via).val("");
						$(".tickets_cover_list li").text("");
						$(".tickets_cover_list li").removeClass("active_pwc_dian");
						$("#via0").focus();
						$(".tickets_cover_list li").eq(0).addClass("active_tickets");
						$(".tickets_cover_list li").eq(0).siblings().removeClass("active_tickets");
					}
				}

			}, error: function () {
				commonUtils.showPop2("系统错误，请稍后再试");
				errCode();
			}
		})
	}


	function autoCheckCode() {
		var menpiaoCode = window.localStorage.getItem(liveID);
		if (commonUtils.checkStr(menpiaoCode) && menpiaoCode.length == 6) {
			if (uid) {
				useCode(menpiaoCode, true);
			}
		}
	}
	//检查并发数,超过上限进行操作
	function checkConcurrent(curViewers) {
		console.log("当前在线人数："+ curViewers);
		var limited = false, //是否达到上限
			playTime = 0;//播放时长
			var limitPeople = data_detail.data.surplus / 30 / data_detail.data.rate;//当前余额可支持的人数		
		if (!isQualify) {//未认证
			if(onlineCount == '-1'){
				limitPeople = 10;
			}else{
				// 余额可支持人数大于等于设置并发数，上线为设置并发，否则为余额可支持人 200   》20
				limitPeople  = onlineCount >= 10 ? 10 : onlineCount;
			}			
		} else {//认证了
			if(onlineCount == '-1'){
				limitPeople = limitPeople <= 100 ? 100 : limitPeople;
			}else{
				// 余额可支持人数大于等于设置并发数，上线为设置并发，否则为余额可支持人数
				limitPeople  =  limitPeople <= onlineCount? limitPeople : onlineCount;
			}
		}	
		if (curViewers >limitPeople) {
			showLive(2);
			$(".Arrears").show();
			// 主播直播余额不足，观众数量受限
			$(".Arrears_modep").text("房间观众人数已达上限");
			ws.emit("leave", {
				cmd: 1002,
				roomID: v_roomid,
				nickName: nickname,
				user_id: uid,
				show_id: yunboid,
				imgUrl: imgUrl,
				gender: 0
			});
			console.log('获取聊天室信息3');
			clearInterval(upTime);
			clearInterval(findU);
		}
	}

	// 访问上报
	var pageReportStartTime =  parseInt(new Date().getTime() / 1000);
	function upPageReport(){
		var user_id = commonUtils.getUrlParam("liveid")?anchorID :anchorID_video;	
		var live_name = commonUtils.getUrlParam("liveid")?liveInfo.live_name:videoInfo.vodName; 
		var view_type = commonUtils.getUrlParam("liveid")?1:2;
		var browse_type = isWeiXin()?0:1;
		var jsonStr = {
			"user_id": user_id,//主播ID
			"room_id":commonUtils.getUrlParam("liveid")||commonUtils.getUrlParam("videoid"), //房间id
			"view_id": videoID||liveID,//录像id  > 房间id
			"view_type": view_type,//页面类型（0：主页，1：直播，2：点播）
			"view_name": live_name,//页面名称title
			"user_name": nickname,//访客名称，授权后微信的名称
			"user_identifying": checkStr(storage.userInfo_third)?JSON.parse(storage.userInfo_third).openid:uid,//访客唯一标识，授权后微信的openid
			"browse_type": browse_type,//访客浏览类型（0：微信，1：其他）
			"facility": 0,//访客设备类型（0：移动端，1：PC端）
			"mobile": mobile||'',//
			"status": live_permit,//页面付费状态（0:免费，1:付费，2:加密，3:门票）
			"start_time": pageReportStartTime,//	访问开始时间
			"end_time": parseInt(new Date().getTime() / 1000),//
			// 	如果观看的是主页：room_id和view_id是主页的ID，传一样的即可
			//  如果观看的是直播：room_id和view_id是直播的ID，传一样的即可
			//  如果观看的是点播：room_id和view_id是点播的ID，传一样的即可，后续可能会有点播间的概念，为后续兼容
			//  如果观看的是录像：room_id是直播的ID，view_id是录像的ID		
		};	
		$.ajax({
			type: "POST",
			url: config.vboServer + "visitrecord/up_report",
			data: jsonStr,
			dataType: 'json',
			success: function (data) {
				if(data.code == 1 ){
					console.log("页面访问上报成功");
				}else{
					console.log("页面访问上报失败："+ data.msg);
				}
			},
			error: function (data) {				
				console.log("ajax页面访问上报失败")
			}
		});	
	
		
	}	

	// 禁言
	function silenceFun(silenceMsg,type){
		console.log('是否禁言：'+silence_all);
		if(type=="all"){
			if(silenceMsg=="1"){
				$("#input_world").attr('placeholder', ' 此直播间已禁言');
				$("#input_world").attr("disabled",true);
				$(".chatroom_ic_pen").hide();
			}else{
				$("#input_world").attr('placeholder', ' 说点什么吧...');
				$("#input_world").attr("disabled",false);
				$(".chatroom_ic_pen").show();
			}
		}else{
			if(silenceMsg=="1"){
				$("#input_world").attr('placeholder', ' 你已被主播禁言');
				$("#input_world").attr("disabled",true);
				$(".chatroom_ic_pen").hide();
			}else{
				$("#input_world").attr('placeholder', ' 说点什么吧...');
				$("#input_world").attr("disabled",false);
				$(".chatroom_ic_pen").show();
			}	
		}
		
	}

	//重要人物进场特效
	function vitalManOnJoin() {
		if(vitalMan.length > 0) {
			$(".view-mask").css("opacity","1");
			var msg = vitalMan[0];
			if(vitalManClear.indexOf(msg.phone_renwu) > -1) {
				vitalMan.shift();
				vitalManOnJoin();
				return false;
			}
			vitalManClear.push(msg.phone_renwu)
			// $(".imageView").attr("src",photo);	
			$(".view-left").css("background-image", "url('" + msg.corverUrl + "')");
			$(".view-right h4").text(msg.nickname);
			$(".introduce p").text(msg.job);
			$(".intro").text(msg.content);
		
			$(".view-mask").animate({
				marginLeft: '20rem',
			}, 1000);

			// 停顿5秒
			setTimeout(function () {
				$(".view-mask").animate({
					marginLeft: 1000,
				}, 1000);
				$(".view-mask").css("opacity","0");
				setTimeout(function() {
					vitalMan.shift();
					$(".view-mask").css({
						marginLeft: 0
					});
					if(vitalMan.length > 0) {
						vitalManOnJoin()
					}
				}, 1100);
			}, 5000);
		}
	}

	// 购票前检查余票
	function  checkLeaveCode(type){
		$.ajax({
			type:'post',
			url: config.lhServerUrl+ '/service/checkLeaveCode.action',
			data: {
				liveID: liveID,
				qualify: anchorQualify
			},
			dataType: 'json',
			success: function(data){
				payOpenID = payOpenID?payOpenID:1;
				var payType = isWeiXin()?"1":"2";
				if(data.resultCode == "01"){
					var payObj = {
						user_id: uid,
						open_id:payOpenID,
						to_type:2,	
						currencyType: 3,//1是梦币  2是梦豆    3才是现金
						source_type:3,//(1：Android 2：IOS 3:H5 4:web)
						live_id:liveID,
						video_id: videoID||liveID,
						receive_user_id: anchorID,
						type:payType,//type=1表示公众号JSAPI支付,type=2表示纯H5的MWEB调用微信支付
						money:config.payMoney ||ticketPrice,
						ticketType:2
					}
					payTickets(payObj);
				}else if(data.resultCode == "02"){
					$("#noTickets").show();
				}
			},
			error: function(){

			}
		})
	}


	// 立即购买，下单
	$(".buy_btn").click(function(){
		checkLeaveCode();
	});
	// 云播购票下单
	function payTickets(msg){
		// if(!getUserInfo(uid)){
		// 	$(".loginBox").addClass("loginBoxac");
		// }else if(!getUserInfo(uid).mobile){
		// 	$(".mobile_bind").show();
		// }else{
			$.ajax({
				type: "POST",
				url: config.payUrl + "/mwh5/api/mwh5/payRecord/viewtoPay.do",
				data:msg,
				dataType: 'json',
				success: function (data) {
					$("#buyTip").hide();
					if(data.code =="200"){
						data = data.data;
						orderNo = data.orderNo;			
						appId = data.appId;
						nonceStr = data.nonceStr;					
						packageStr = data.packageStr;
						signType = data.signType;
						timeStamp = data.timeStamp;										
						paySign = data.paySign;
						if(isWeiXin()){
							callpay("tickets");
						}else{
							var orderWebPNo = data.orderNo;
							window.localStorage.orderWebPNo = orderWebPNo;
							location.href = data.codeUrl;
						}
					}else{
						commonUtils.showPop2("支付失败（"+data.msg+")");
					}
				},
				error: function (data) {				
				}
			});
			
			
		// }			
	}

	// 获取观看者用户信息
	function getUserInfo(curUserID){
		var lookerInfo;
		$.ajax({
			type: "post",
			async: false,
			data: {
				id: curUserID
			},
			url: config.lhServerUrl + "/api/mwlive/user/get_userinfo.do",
			dataType: "json",
			success: function (data) {
				if (data.code = "200") {
					lookerInfo = data.data;
				}
			}, error: function (data) {
			}
		});
		if(lookerInfo){
			return lookerInfo;
		}
	
	}

	// 点击购票按钮 判断是否登录
	$("#tiketsBtn").on("click","#buyTiketsBtn",function(){
		if(!getUserInfo(uid)){
			$(".loginBox").addClass("loginBoxac");
			$("#btn_botom").hide();		
		}else if(!getUserInfo(uid).mobile){
			$(".mobile_bind").show();
		}else{
			$("#buyTip").show();
		}
		// checkLeaveCode();

	});

	// 门票使用
	$("#tiketsBtn").on("click","#useCode",function(){
		if(!getUserInfo(uid)){
			$(".loginBox").addClass("loginBoxac");
			$("#btn_botom").hide();		
		}else if(!getUserInfo(uid).mobile){
			$(".mobile_bind").show();
		}else{
			$(".view_tickets").show();
			document.getElementById("via0").click();
			$("#via0").focus();
		}
		
	});

	$("#loseEfficacy").on("click",".btn_blue",function(){
		$(".view_tickets").show();
		document.getElementById("via0").click();
		$("#via0").focus();
		$("#loseEfficacy").hide();
	});
	$("#loseEfficacy").on("click",".btn_orange",function(){
		$("#buyTip").show();
		$("#loseEfficacy").hide();
		// checkLeaveCode();
	});

	// 安卓手机focus事件，输入框遮挡 安卓手机兼容问题
	if(navigator.userAgent.match(/android/i)){
		$(".input_tickets").css("top","35%");
		$("#example_video_1").hide();
	}
	

	// 送礼的videoid
	function getReceiveVideoID(islive){
		var receiveVideoID = islive == true || commonUtils.getUrlParam("videoid") ? receiveVideoID = "":receiveVideoID = videoID;
		return receiveVideoID;
	}

	function getPayType(islive){
		var PayType = islive == true || commonUtils.getUrlParam("videoid") ? PayType = 1:PayType = 2;
		return PayType;
	}

	// 查询礼物付费是否成功
	function isPayGift(){
		var givingFeedback = setInterval(function () {
			$.ajax({
				type: 'post',
				url: config.payUrl + '/mwh5/api/web/payRecord/viewWebPay.do',
				data: {
					orderNo: storage.webPayorderNo
				},
				dataType: 'json',
				success: function (data) {
					if (data.data) {		
						var returnType = data.data.returnType;
						console.log("礼物支付返回returnType："+returnType);				
						if (returnType == 1) {							
							clearInterval(givingFeedback);
							var giftMes = storage.giftMes;
							var liwuid = storage.liwuid;
							var giftImg = storage.giftImg;
							if (ws) {
								sourceApproch = 1;	//消息来源  用户实时操作
								ws.emit("msg", {
									cmd: 1005,
									msg: '礼物',
									nickName: nickname,
									send_time: new Date(),
									imgUrl: imgUrl,
									user_id: uid,
									show_id: yunboid,
									giftImg: giftImg,
									data: {
										msgbody: giftMes,
										giftName: giftMes,
										giftImg: giftImg,
										id: liwuid
									}
								})
								sendCourtesy++;
							}
							storage.removeItem("webPayorderNo");
							storage.removeItem("giftMes");
							storage.removeItem("liwuid");
							storage.removeItem("giftImg");
						}
					}
				}, error: function () {
				}
			});
		}, 1000);
	}

})(jQuery);



