!function($){
	//添加eVideo属性
	var video = $('video');	//获取当前video
	var videoArry = new Array();
	var liveID = commonUtils.getUrlParam("liveid");
	 $(".video-js-box").HTML5Video({
	        isLive: true
	 });
/*		$.ajax({
			type: "POST",
			async: false,
			data: {
				select_str:liveID,
				page_index:1,
				page_size:10
			},
			url: config.lhServerUrl+'/api/mwlive/live/get_reclistbyselect.do',
			dataType: "json",
			success: function (data) {
				var data_list = data.data.data_list;
				if(data.code == 200){
					if(commonUtils.checkStr(data_list)){
						if(data_list.length >0){
							for(var i = 0;i<data_list.length;i++){
								videoArry[i] = data_list[i].file_path;
							}
							commonUtils.playURL = $("video")[0].src = videoArry[0];
						}
					}
				}
			},
			error: function (data) {
				console.log(data);
			}
		});*/
	 //video emptied监听
	/* video.on('emptied', function() {
		//location.reload();
		video[0].load();
	}); */
	 // video waiting监听
	/* video.on('waiting',function(){
		//location.reload();
		video[0].load();
	}); */
	 // video stalled监听
	/* video.on('stalled', function() {
		//location.reload();
		video[0].load();
	}); */
	 //判断当前网络
	function onLine(){
		var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
		return condition;
	}
	function QQpause(){
		if((navigator.userAgent.indexOf(' QQ') > -1)||(navigator.userAgent.indexOf('QQ') > -1)){
			//$(".stopBtn").click();
			console.log("检测暂停3333")
			document.getElementById('example_video_1').pause();
			setTimeout(function(){
				$("#playBtn").show();
			},300);
			return true;
		}
	}
	//视频播放前导图
	/* var timeCl;
	var disServerUrl="http://montnets.facebac.com:9096";
	function checkFlag(){
		$.ajax({
			type: "POST",
			async: false,
			data: {
				"cmd":"get_room_base_users",
				"liveID":"100803040201"
			},
			url: disServerUrl+'/dispatcher.action',
			dataType: "json",
			success: function(data) {
				console.log(data);
				if(data.resultCode == "502"){
					//显示图
					$("#yuyue_img").show();
				}else{
					//隐藏图示
					$("#yuyue_img").hide();
					$("#wrap_n").show();
					window.clearTimeout(timeCl);
				}
			}
		})
		timeCl = setTimeout("checkFlag()", 5000);
	}
	checkFlag(); */
	//断网后3秒重连
	/*var timeClock;
	var timerInteval;
	function clock(){
		var online = onLine();
		if(online == "OFFLINE"){
			setTimeout("cz()", 3000);
			//timerInteval = setInterval("cz()",3000);
			return;
		}
		timeClock = setTimeout("clock()", 2000);
	}
	clock();
	function cz(){
		 if(video[0].paused()){
			video[0].load();
		 }
	}*/
	//视频可播监听
	/* video.on('canplay', function() {
		$('.loading').fadeOut(100);
		if(window.navigator.appVersion.match(/iphone/gi)){
			if(video[0].paused){
				video[0].play();
			}
		}
	});  */
	/* $(".stopBtn").click(function(){
		if(video[0].paused){
			video[0].play();
			$(".stopBtn").removeClass("active");
		}else{
			video[0].pause();
			$(".stopBtn").addClass("active");
		}
	}) */
	//视频开播监听
	video.on('playing', function() {
		$(".stopBtn").removeClass("active");
		$("#playBtn").hide();
	//	$("#chat_0710").click();
		$("#bg-img").css("opacity",0);
		$('video')[0].poster ="";
		$('video')[0].style.background ="";
		if(commonUtils.checkStr($(".logo_show img").attr("src"))){
			$(".logo_show").show();
		}
		if(commonUtils.checkStr($(".init_v_logo img").attr("src"))){
			$(".init_v_logo").show();
		}

	});
	//ios下显示自定义进度条
	if( window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
    		//$(".e-video-control").show();
		if(window.plus){
			var videoWv = plus.webview.create('video.html', 'video', {
    		    kernel: 'WKWebview'
    		});
    		videoWv.show('slide-in-right');
		}
  }
	var aa = 0;
	//切流 切网 自动恢复播放处理	------开始----------、
	//主扫描器 每秒检测
	// 6s重置播放器，未播放、资源出错、重复6s重载播放器、已播放、暂停、停止重置重载播放器
	//安卓对于阿里直播 timeUpdata监听失效--安卓获取到的直播当前时间总是0
	var line = [], first = true, CHANGECOUNT = 0, pageinfo = window.pageinfo, VIDEOINTERVAL = 0, TIMEOUT = 5, TIMECOUNT = 0, UPDATETIMECOUNT = 0, nowTime = 0, ONCE = 0, isERROR = false, PAUSED = 1;
	var errNum = 0;
	if (isQQorWeixin() || 1==1 ) {
		$("video,audio").each(function() {
			$(this)[0].addEventListener("error", function() {
				PAUSED = 0;
				TIMEOUT = 2;
				isERROR = true;
				setTimeout(function() {
					isERROR = false;
				}, 2e3);
			}, false);
			$(this)[0].addEventListener("timeupdate", function(e) {
				errNum = 0;
				PAUSED = 0;
				UPDATETIMECOUNT = 0;
				TIMECOUNT = 0;
				TIMEOUT = 5;

			}, false);
			$(this)[0].addEventListener("play", function() {
				$("#video_IMG").hide();
				$("#example_video_1").show();
				PAUSED = 0;
				nowTime = new Date().valueOf();
				TIMECOUNT = UPDATETIMECOUNT;
				ONCE++;
				if (ONCE == 1) {
					//console.log("commonUtils.playURL:"+commonUtils.playURL);
					var ua = window.navigator.userAgent.toLowerCase();
					if((navigator.userAgent.indexOf(' QQ') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))||(ua.indexOf('mqqbrowser') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))){
						console.log("检测时候暂停1111");
						// document.getElementById('example_video_1').pause();
						// $(".stopBtn").click();						
						// return false;
					}
					else {
						if($(".loading").show()){
							startInterval();
						}
						//this.load(commonUtils.playURL);
						//this.play();
					}
				}
			}, false);
			$(this)[0].addEventListener("pause", function() {
				if (isERROR && new Date().valueOf() - nowTime < 2e3) {
					PAUSED = 0;
				} else {
					PAUSED = 1;
				}
			}, false);
			$(this)[0].addEventListener("playing", function() {
				errNum = 0;
			}, false);
		});
		//console.log("status:"+commonUtils.liveStatus);
		//console.log(config.isLive);
		if( commonUtils.liveStatus != 0 || config.isLive == false ){
		}
		//startInterval();
		var ua = window.navigator.userAgent.toLowerCase();
		if((navigator.userAgent.indexOf(' QQ') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))||(ua.indexOf('mqqbrowser') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))){
			//startInterval();
		}
	}

	 function changeline() {
		 	errNum ++;
		 	console.log(errNum);
	        CHANGECOUNT++;
	        triggerSwitch();
	    }
	    function triggerSwitch() {
	        url = commonUtils.playURL;	//获取播放地址
	        if ($("video").length > 0 && (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))) {	//ios下
	            $("video")[0].src = url;
				var ua = window.navigator.userAgent.toLowerCase();
				if((navigator.userAgent.indexOf(' QQ') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))||(ua.indexOf('mqqbrowser') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))){
					console.log("检测之后暂停2");
					document.getElementById('example_video_1').pause();
					//$("#playBtn").show();
					$(".stopBtn").click();
					
					return false;
				}
				else {
					//$("video")[0].load(url);
					$("video")[0].play();
					$("#video_IMG").hide();
					$("#example_video_1").show();
				}
	        }
	    }
	    //定时器设置
	    function startInterval() {
			console.log('定时器播放的地址'+commonUtils.playURL);
	        CHANGECOUNT = 0;
			clearInterval(VIDEOINTERVAL);
			var ua = window.navigator.userAgent.toLowerCase();
			if((navigator.userAgent.indexOf(' QQ') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))||(ua.indexOf('mqqbrowser') > -1&&navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))){
			//	url = commonUtils.playURL;	//获取播放地址
			//	$("video")[0].load(url);
				//$("video")[0].play();
				console.log("检测暂停eeeeeeeeeeeee");
				document.getElementById('example_video_1').pause();
				$("#playBtn").show();
				$(".stopBtn").click();
				$(".loading ").css("visibility","hidden");
				
				//return false;
				return false;
			}
			VIDEOINTERVAL = setInterval(function() {
				if( commonUtils.liveStatus == 0 || !(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))){
		        	return false;
				}
				if(errNum >= 5 ){		//检测到错误超过5次
				var currID = liveID;
				var currUrl=config.lhServerUrl+'/api/mwlive/live/get_info.do';
				if(!commonUtils.checkStr($("#bg-img").attr("src"))){
					$("#bg-img").attr("src","image/mobile/video-default.jpg?ver=1.1");
				}
				if( config.isLive == false && commonUtils.checkStr(videoID)){
					currID = videoID;
					currUrl = config.lhServerUrl+'/api/mwlive/live/get_recinfo.do';
				}
				$.ajax({
				type:'post',
				url:currUrl,
				data:{
					id:currID
				},
			    cache:false,
				dataType:'json',
				success:function(data){
					if(data.code != 200){
						//显示无直播
						showLive(4);
						console.log("么有录像");
						$('video')[0].style.background ='transparent url("image/mobile/video-default.jpg?ver=1.1") 50% 50% no-repeat';
						$('video')[0].style.backgroundSize="100% 100%";
						$("#bg-img").attr("src","image/mobile/video-default.jpg?ver=1.1");
						$("#bg-img").css("opacity",1);
						return false;
						}else{
							$("#bg-img").css("opacity",1);
							showLive(7);
						}
					},error:function(){
						$("#bg-img").css("opacity",1);
						showLive(7);
					}
				});
				//document.getElementById("live_error").style.display = "table-cell";
	        	return false;
	        }
				if(errNum > 5 ){
					clearInterval(VIDEOINTERVAL);
					return false;
				}
				if (!PAUSED) {
					var _temp = TIMECOUNT - (TIMEOUT ? TIMEOUT : 5);
					if (UPDATETIMECOUNT < _temp) {
						// 自定义结束为图片，直播结束后显示连接中断
						console.log("自定义结束为图片，直播结束后显示连接中断");
						if($("#over_img").css("display") == "none"){
							changeline();
							TIMEOUT = 5;
						}
					
					}
					TIMECOUNT++;
				}

			}, 1e3);
		}

		function isQQorWeixin() {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i) == "qq") {
				return true;
			} else {
				return false;
			}
		}
		//禁止滑动
		if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
			// $(".wrap")[0].addEventListener('touchmove',function(e){
			// 	e.preventDefault();
			// }, false);
			// $(".wrapper")[0].addEventListener('touchmove',function(e){
			// 	 e.stopPropagation();	//停止冒泡
			// }, false);
			// $(".wrapper2")[0].addEventListener('touchmove',function(e){
			// 	e.stopPropagation();	//停止冒泡
			// }, false);
			// $(".dealText")[0].addEventListener('touchmove',function(e){
			// 	e.stopPropagation();	//停止冒泡
			// }, false);
			// $(".appoint")[0].addEventListener('touchmove',function(e){
			// 	e.stopPropagation();	//停止冒泡
			// }, false);
	    }
		/*
		 * 定义展示提示内容 @wqs
		 * @params numCh
		 * 0:即将开始 1 倒计时 2 直播结束 3 录像准备中 4 无该直播 5 直播中断 6 播放器 7网络容错
		 */
		function showLive(numCh){
			if(numCh != 6){
				document.getElementById("live_djs").style.display = "table";
				console.log("暂停2222222222222")
				$('video')[0].pause();
			}else{
				document.getElementById("live_djs").style.display = "none";
				$("live_djs").hide();
				// document.getElementById("videoBox").style.display = "block";
				// document.getElementById("playBtn").style.display = "block";

			}
			if(numCh== 2){
				$("#bg-img").attr("src","image/mobile/liveEnd.png?ver=201708111044");
			}
			var arryShow = new Array("#startReady","#djs_ready","#live_end","#live_video","#live_noSource","#live_exception","#videoBox","#live_error");
			for(var i = 0; i<arryShow.length; i++){
				if(i == numCh){
					if(numCh == 1){
						$(arryShow[1]).hide();
						$(arryShow[0]).show();
					}else{
						$(arryShow[i]).show();
					}
					if(i == 6){
						// 直播结束还有声音
						$("#playBtn").show();
						$("#videoBox").show();
						$("#live_exception").hide();
					}
				}else{
					$(arryShow[i]).hide();
				}
			}
			if(numCh == 1){
				window.clearInterval(startIntVal);
				$(arryShow[1]).show();
				startIntVal = self.setInterval(countTime,1e3);
				return false;
			}
		}
}(jQuery);