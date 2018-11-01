;(function($) {
    var videoUI = videoUI || {};
    var flag = true;
    var show_control = false; //微信浏览器页面加载没有执行loadedmetadata
    $.fn.HTML5Video = function(options) {
        var pName = 'HTML5Video';
        var options = $.extend({}, videoUI.HTML5Video.defaults, options || {});
        return $(this).each(function() {
            var HTML5Video = new videoUI.HTML5Video(options);
            HTML5Video.$element = $(this);
            HTML5Video._init();
            $(this).data(pName, HTML5Video);
        });
    };
    videoUI.HTML5Video = function(options) {
        this.version = '1.0.1';
        this.name = 'HTML5Video';
        this.options = options; //初始化数据
        this.$element = null; //video的dom
    };
    videoUI.HTML5Video.defaults = {
        isLive: true, //是否为直播
        video: '.video-js',
        control: '.e-video-control', //控制台
        fullScreen: '.fullScreenBtn', //全屏按钮
        stop: '.stopBtn', //停止、播放按钮
        play: '.play_btn', //停止、播放按钮
        //next: '.nextBtn', //快进按钮
        //prev: '.prevBtn', //快退按钮
        audio: '.audioBox', //声音
        audioImg: '.audioImg', //声音按钮
        audioPro: '.audioPro', //声音进度条
        audioBtn: '.vaudioBtn', //声音按钮
        showTime: '.showTime', //显示播放时间
        showCurrenTime: '.showCurrenTime', //当前视频播放长度(进度条)
        currentTime: '.currentTime', ////当前视频播放长度(统计)
        prog: '.video-prog-bar', //播放进度
        bufferProg: '.video-bufferProg', //缓冲进度
        playProg: '.video-playProg', //播放进度
        playProgBtn: '.video-playProg-btn',
        len: '.len', //视频长度
        line: '.chang-line-a',
        lineDiv: '.chang-line-select',
        showTouchTime: '.show-touch-time',
        speed: 1, //快进、快退时间
        //视频结束回调函数
        endcallback: null
    };
    videoUI.HTML5Video.prototype = {
        _init: function() {
//            this.isLive = this.options.isLive;
        	this.isLive = false;
            this.$video = this.$element.find(this.options.video)[0];
            this.$control = this.$element.find(this.options.control);
            this.$fullScreen = this.$element.find(this.options.fullScreen); //全屏按钮
            this.$videoCont = this.$element; //视频区域
            this.$stop = this.$element.find(this.options.stop); //停止、播放按钮
            this.$play = this.$element.find(this.options.play); //停止、播放按钮
            //this.$next = this.$element.find(this.options.next); //快进按钮
            //this.$prev = this.$element.find(this.options.prev); //快退按钮
            this.$audio = this.$element.find(this.options.audio); //声音按钮
            this.$audioImg = this.$element.find(this.options.audioImg); //声音按钮
            this.$len = this.$element.find(this.options.len); //视频长度
            this.$showTime = this.$element.find(this.options.showTime); //显示播放时间
            this.$showCurrenTime = this.$element.find(this.options.showCurrenTime); //当前视频播放长度(进度条)
            this.$currentTime = this.$element.find(this.options.currentTime); ////当前视频播放长度(统计)
            //this.$audioPro = this.$element.find(this.options.audioPro); //声音进度条
            //this.$audioBtn = this.$element.find(this.options.audioBtn); //声音按钮
            this.$prog = this.$element.find(this.options.prog); //播放进度
            this.$bufferProg = this.$element.find(this.options.bufferProg); //缓冲进度
            this.$playProg = this.$element.find(this.options.playProg); //播放进度
            this.$playProgBtn = this.$element.find(this.options.playProgBtn); //播放按钮
            this.$line = this.$element.find(this.options.line);
            this.$lineDiv =this.$element.find(this.options.lineDiv);
            this.$showTouchTime = this.$element.find(this.options.showTouchTime);
            this.alltime = 0; //视频总长
            //全屏全局
            this.inFullScreen = false;
            this.event();
            //this.audio();
            if (!this.isLive) {
                this.playBar();
            }
            var self = this;
           
            var setimeout = setTimeout(function() {
                $("#line-check-tips").remove();
                if (self.$videoCont.hasClass('video-js-box')){
                    self.$control.stop().slideUp();
                    $(".linear_gradien").stop().slideUp();
                }
            }, 5000);
        },
        /*点击事件*/
        event: function() {
            var self = this;
            //视频区域双击（全屏/取消全屏）
            this.$videoCont[0].addEventListener("dblclick", function(e) {
                e.stopPropagation();
                if (self.inFullScreen === false) {
                    self.fullScreen(self.$video);
                } else {
                    self.eixtFullScreen();
                }
            }, false);
          //视频区域单击（播放或者暂停）
            this.$videoCont[0].addEventListener("click", function(e) {
                // 进度调默认按钮暂停按钮显示不对
                if($("#play_btn").css("display")!="none"){
                    $(".stopBtn").removeClass("active");
                }
                if(show_control == true){                 
                    e.stopPropagation();
                    setTimeout(function() {
                        $("#line-check-tips").remove();
                        if (self.$videoCont.hasClass('video-js-box')){
                            self.$control.stop().slideUp();
                            $(".linear_gradien").stop().slideUp();
                        }                    
                    }, 5000);
                }
                
            }, false);
            this.$control.click(function(e){
                if($(e.target).attr('data-toggle')){

                }else{
                    e.stopPropagation();
                }
            });
            //全屏按钮
            this.$fullScreen[0].addEventListener("click", function(e) {
                e.stopPropagation();
                if (self.inFullScreen === false) {
                    self.fullScreen(self.$video);
                } else {
                    self.eixtFullScreen();
                }
            }, false);

            //停止按钮点击暂停、播放
            this.$stop.on('click', function(e) {
                e.stopPropagation();
                self.playState();
            });
            this.$play.on('click', function(e) {    
                flag = true;
                $("#example_video_1").show();                    
                e.stopPropagation();
                if(!config.isLive){
            		if(localStorage.getItem(commonUtils.playURL) >0){
                        document.getElementById("example_video_1").currentTime = localStorage.getItem(commonUtils.playURL);	//手机中有效
                        console.log("断点时间："+ self.$video.currentTime);            			
            		}else{
                        document.getElementById("example_video_1").currentTime = 0;	//手机中有效

                    }
                }
                var video_js = self.$videoCont.find('.video-js').eq(0);
                console.log('点击了播放获取进度：'+self.$video.currentTime);   
                // setTimeout(self.playState(),200)     
                self.playState();       
               
            });
            function orientationChange(){
                if (self.$videoCont.css('display') == 'none') return ;
                switch(window.orientation) {
                    case 0: // Portrait
                    case 180:
                        self.orientationchange = 0;
                        self.eixtFullScreen();
                        // 横屏切换竖屏之后报错bug  注释以下
                        // if(pageinfo.is_chat == 0) {
                        //     $('.page-footer').show();
                        // }
                        // $('.e-video-control').attr('style','');
                        $('.e-video-control').css('height','1.67rem');
                        if($('#menuList li[type="0"]').hasClass("active")){
                            $(".page-footer,.slide_nav").show();                        
                        }
                        break;

                    case -90: // Landscape: turned 90 degrees counter-clockwise
                    case 90: // Land                        
                        self.orientationchange = 1;
                        self.fullScreen(self.$video);
                        $('.page-footer').hide();
                        $('.e-video-control').css('height','1.67rem');
                        console.log("改变到水平方向"+$(".player-area").height());
                        $(".player-area").css("height","100%");
                        console.log("改变到水平方向"+$(".player-area").height());
                        $(".video-js-box").css({
                            'position': 'fixed',
                            'width': '100%',
                            'height': '100%',
                            'overflow': 'hidden',
                            'background': '#000',
                            'z-index': '999'
                        });
                        break;
                }
            }

           //监听退出全屏事件
            window.onresize = function() {
                if (!checkFull()) {
                    console.log("监听退出全屏");
                    self.$stop.removeClass('active');
                    $("#playBtn").show();
                    flag = false;
                }else{
                    console.log("监听全屏");
                    flag = true;
                }
            }
            function checkFull() {
                var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
                //to fix : false || undefined == undefined
                if (isFull === undefined) {isFull = false;}
                return isFull;
            }

            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);
           this.$video.addEventListener('play', function() {
                $(".pre_video").hide();
            	$("#bg-img").css("opacity",0);
            	$('video')[0].poster ="";
                $('video')[0].style.background ="";
                $('#loadTip').hide();
                playFlag = true;
                $('.loading').hide();
                self.$play.css('display', 'none');
                $("#playBtn").hide();
                self.$stop.addClass('active');
                $("#example_video_1,#video-js-box").show();

                if(navigator.userAgent.match(/android/i)){
                    $("#video_IMG").hide();
                    $("#example_video_1").css({"height":"100%","margin-top":"0"});
                   
                }  
                flag = true;
                console.log("播放事件11111");
            }, false);

           var firstLoad = 1;
           this.$video.addEventListener('waiting', function() {
           	$('.loading').show();
           	if(firstLoad == 1){
           		$('#loadTip').hide();
           		firstLoad = 0;
           	}else{
           		$('#loadTip').show();
           	}
           }, false);

            this.$video.addEventListener('pause', function() {
                playFlag = false;
                $('.loading').hide();
                self.$play.css('display', 'block');             
                console.log("暂停事件");
                self.$stop.removeClass('active');
                $("#playBtn").show();
                $("#example_video_1,#video-js-box").show();
            }, false);

            // 播放完成
            this.$video.addEventListener('ended',function(){        //视频播放完的事件          
                $("#playBtn").show();
                window.localStorage.setItem(commonUtils.playURL,0);
            },false);

    

            var initCurr = 0;
            this.$video.addEventListener('timeupdate', function(e) {
                //$("#chat-list").append('timeupdate');
                //播放轴位置
            	if(initCurr == 0 && !config.isLive){
            		if(localStorage.getItem(commonUtils.playURL) >0){
            			self.$video.currentTime = localStorage.getItem(commonUtils.playURL);
            			initCurr = 1;
            		}else{
                        self.$video.currentTime = 0;
            			initCurr = 1;
                    }
            	}
                var currtent = self.$video.currentTime;
                window.localStorage.setItem(commonUtils.playURL,currtent);
                if (!self.isLive ) {
                    //if(!self.alltime){
                    self.alltime = self.$video.duration; //视频总长
                    self.$len.html((self.alltime ? self.timeFormat(self.alltime) : ''));
                    //}
                    var video_js = self.$videoCont.find('.video-js').eq(0);
                    if(video_js.attr('currentTime')) {
                        var currentTime = parseFloat(video_js.attr('currentTime'));
                        //vhallApp.showMsg(currentTime,true);
                        self.$video.currentTime = currentTime;
                        if (video_js.hasClass('once')){
                            video_js.removeAttr('currentTime');
                        }
                        video_js.addClass('once');
                        if(!video_js.attr('currentTime')) {
                            video_js.removeClass('once');
                        }
                    }
                    var currentWid = (currtent / self.alltime) * 100 + '%';
                    var currentLeft = ((currtent / self.alltime) * 100) + '%';
                    self.$playProg.css('width', currentWid);
                    self.$playProgBtn.css('left', currentLeft);
                    if (self.$showCurrenTime.parent().css('display') == 'block') {
                        self.$showCurrenTime.html(self.timeFormat(currtent));
                        self.$showTime.css({
                            'left': currentWid
                        });
                    }
                }
                self.$currentTime.html(self.timeFormat(currtent));
                if ($('.video-tips .time span').length > 0) {
                    $('.video-tips .time span').html(self.timeFormat(currtent));
                }
                if(flag == true){
                    if (self.$play.css('display') == 'block' || !self.$stop.hasClass('active')) {
                        console.log("添加播放样式1")
                        self.$stop.addClass('active');
                    }
                }               
                if ($('.loading').css('display') == 'block') {
                    console.log("进度条");
                    $('.loading').hide();
                }
            }, false);

            //离开界面 重新返回 续播实现   视频加载载完成事件
            var videoLoad = 0;
            this.$video.addEventListener('loadedmetadata', function(e) { 
                show_control = true; //微信浏览器页面加载没有执行loadedmetadata
                console.log("视频加载完成");
            	if(!config.isLive){
                    if(localStorage.getItem(commonUtils.playURL)>0 &&videoLoad == 0){
                        self.$video.currentTime = localStorage.getItem(commonUtils.playURL);
                        document.getElementById("example_video_1").currentTime = localStorage.getItem(commonUtils.playURL);	//手机中有效
                        videoLoad = 1;  
                        console.log( "视频加载完成断点播放时间："+ localStorage.getItem(commonUtils.playURL));
                        console.log( "视频加载完成断点=地址："+ commonUtils.playURL);         
                    }   
                    // 视频双播放
                    if(navigator.userAgent.match(/android/i)){
                        $("#video_IMG,#play_btn").show();                       
                    }         		                        
                } 
                var currtent = self.$video.currentTime;
                if (!self.isLive ) {
                    self.alltime = self.$video.duration; //视频总长
                    self.$len.html((self.alltime ? self.timeFormat(self.alltime) : ''));
                    var video_js = self.$videoCont.find('.video-js').eq(0);
                    if(video_js.attr('currentTime')) {
                        var currentTime = parseFloat(video_js.attr('currentTime'));
                        //vhallApp.showMsg(currentTime,true);
                        self.$video.currentTime = currentTime;
                        if (video_js.hasClass('once')){
                            video_js.removeAttr('currentTime');
                        }
                        video_js.addClass('once');
                        if(!video_js.attr('currentTime')) {
                            video_js.removeClass('once');
                        }
                    }
                    var currentWid = (currtent / self.alltime) * 100 + '%';
                    var currentLeft = ((currtent / self.alltime) * 100) + '%';
                    self.$playProg.css('width', currentWid);
                    self.$playProgBtn.css('left', currentLeft);
                    if (self.$showCurrenTime.parent().css('display') == 'block') {
                        self.$showCurrenTime.html(self.timeFormat(currtent));
                        self.$showTime.css({
                            'left': currentWid
                        });
                    }
                }
                self.$currentTime.html(self.timeFormat(currtent));
                if ($('.video-tips .time span').length > 0) {
                    $('.video-tips .time span').html(self.timeFormat(currtent));
                }                   
            });
          
            //可以考虑扩展调整音量
            this.$videoCont[0].addEventListener('click', function(e) {
                if(show_control == true){
                    e.stopPropagation();
                    if (self.$videoCont.hasClass('is_audio')) {
                        return false;
                    }
                    if (self.$control.css('display') == 'none') {
                        self.$control.slideDown();
                        $(".linear_gradien").slideDown();
                    } else {
                        self.$control.slideUp();
                        $(".linear_gradien").slideUp();
                        self.$lineDiv.hide();
                    }
                }
                
            }, false);
        },
        /**
         * 格式化时间(显示当前播放时间)
         */
        timeFormat: function(time) {
            //格式化时间
            var hour = parseInt(time / 3600),
                minute = parseInt(time / 60),
                second = parseInt(time % 60),
                html = '';
            if (hour < 1) {
                html += minute >= 10 ? minute + ':' : '0' + minute + ':';
                html += second >= 10 ? second : '0' + second;
            } else {
                minute = parseInt(minute % 60);
                html += hour >= 10 ? hour + ':' : '0' + hour + ':';
                html += minute >= 10 ? minute + ':' : '0' + minute + ':';
                html += second >= 10 ? second : '0' + second;
            }
            if (isNaN(hour)) {
                html = "00:00:00";
            }
            return html;
        },
        /**
         * 暂停播放
         * @type event
         * @default {}
         */
        playState: function() {
            //暂停中
            console.log('点击之后获取进度：'+this.$video.currentTime);         
            if (this.$video.paused === true) {
                console.log('播放状态'+this.$video.readyState )
                //获取当前时间
                var self = this;
                //加载
                if (this.$video.readyState == 2) {
                    $('.loading').show();
                    this.$video.pause();
                }
                if (this.$video.readyState == 4) {
                    if (!this.isLive) {
                        self.alltime = self.$video.duration; //视频总长
                        console.log('当前时长：'+self.alltime);
                        console.log('视频总长：'+self.$video.duration);
                        //self.$len.html('/ ' + (self.alltime ? self.timeFormat(self.alltime) : ''));
                    }
                    $('.loading').hide();
                    this.$video.play();
                }
                $('.loading').hide();
                this.$video.play();
            } else {
                this.$video.pause();
            }
        },
        /**
         * 快退
         * @type function
         * @default {}
         */
        prev: function() {
            this.$video.currentTime -= this.options.speed;
        },
        /**
         * 快进
         * @type function
         * @default {}
         */
        next: function() {
            this.$video.currentTime += this.options.speed;
        },
        /**
         * 播放进度轴
         * @type function
         * @default {}
         */
        playBar: function() {

            var self = this;
            //定义视频播放位置
            var Time_out;
            var propWid = this.$prog.width();
            //获取propWid出错。。 未找出原因暂时解决方案
            this.$prog.on('click', function(e) {
                console.log("点击控制条");
                propWid = self.$prog.width();
                e.stopPropagation();
                var offLeft = self.$prog.offset().left;
                var clkWid = (e.pageX - offLeft) / propWid * 100 + '%';
                self.$video.currentTime = (e.clientX - offLeft) / propWid * self.alltime;
                self.$playProg.css('width', clkWid);
                self.$playProgBtn.css('left', clkWid);
            });


            this.$prog.on('mouseleave', function(e) {
                e.stopPropagation();
                self.$showTime.css({
                    'display': 'none'
                });
            });
            this.$prog[0].addEventListener('touchmove', function(e) {
                e.stopPropagation();
                if (!self.$video.paused) {
                    self.$video.pause();
                }               
                if($("#playBtn").is(":hidden")){
                    console.log("播放按钮隐藏了");
                    flag = true;                    
                }else{
                    console.log("播放按钮显示");
                    flag = false;
                }
                propWid = self.$prog.width();
                var offLeft = self.$prog.offset().left;
                var ePageX = e.touches[0].clientX;
                if (ePageX >= offLeft && ePageX <= offLeft + propWid) {
                    var clkWid = (ePageX - offLeft) / propWid * 100 + '%';
                    var mouseTime = (ePageX - offLeft) / propWid * self.alltime;
                    self.$showCurrenTime.html(self.timeFormat(mouseTime));
                    self.$showTime.css({
                        'left': clkWid,
                        'display': 'block'
                    });
                    self.$playProg.css('width', clkWid);
                    self.$playProgBtn.css('left', clkWid);
                    clearTimeout(Time_out);
                    Time_out = setTimeout(function() {
                        self.$video.currentTime = mouseTime;
                    }, 200);
                }
            }, false);
            this.$prog[0].addEventListener('touchend', function(e) {
                e.stopPropagation();
                self.$video.play();
                self.$showCurrenTime.parent().hide();
            }, false);
            var touch_start = null,
                touch_move = 0;
            this.$video.addEventListener('touchstart', function(e) {
                e.stopPropagation();
                touch_start = e.touches[0].clientX;
                touch_move = touch_start;
            }, false);
            this.$video.addEventListener('touchmove', function(e) {
                e.stopPropagation();
                if (!self.$video.paused) {
                    self.$video.pause();
                }
                var window_w = $(window).width();
                var offLeft = self.$prog.offset().left;
                var ePageX = e.touches[0].clientX;
                if (Math.abs(ePageX - touch_start) < 30)
                    return;
                //console.log(ePageX,touch_start);
                if (ePageX > touch_move) {
                    self.next();
                } else {
                    self.prev();
                }
                touch_move = ePageX;
                self.$showTouchTime.show().html(self.timeFormat(self.$video.currentTime) + '/' + self.timeFormat(self.alltime));
            }, false);

            this.$video.addEventListener('touchend', function(e) {
                e.stopPropagation();
                self.$showTouchTime.hide();
                self.$video.play();
                touch_start = null;
            }, false);
        },
        /**
         * 全屏
         * @type function
         * @default {}
         */
        fullScreen: function(divObj) {
            //全屏
            if ($(divObj).hasClass("audio")){
                return;
            }
            // if ($(divObj).hasClass("audio_full_screen")) {
            //     this.$videoCont.css({
            //         'position': 'fixed',
            //         'width': '100%',
            //         'height': '100%',
            //         'overflow': 'hidden',
            //         'background': '#000',
            //         'z-index': '999'
            //     });
            //     this.$fullScreen.addClass('active');
            // } else {
                if (divObj.requestFullscreen) {
                    divObj.requestFullscreen();
                } else if (divObj.msRequestFullscreen) {
                    divObj.msRequestFullscreen();
                } else if (divObj.mozRequestFullScreen) {
                    divObj.mozRequestFullScreen();

                } else if (divObj.webkitEnterFullScreen&&navigator.userAgent.indexOf(' QQ') > -1) {
                    divObj.webkitEnterFullScreen();
                }else if (divObj.webkitRequestFullscreen) {
                    divObj.webkitRequestFullscreen();
                } else if (divObj.oRequestFullscreen) {
                    divObj.oRequestFullscreen();
                } else {
                    // this.$videoCont.css({
                    //     'position': 'fixed',
                    //     'width': '100%',
                    //     'height': '100%',
                    //     'overflow': 'hidden',
                    //     'background': '#000',
                    //     'z-index': '999'
                    // });
                    // this.$video.style.cssText = 'width:100%;height:100%';
                    // this.$fullScreen.addClass('active');
                }
                divObj.webkitEnterFullScreen();
            // }
            // yst横屏退出全屏
            // this.inFullScreen = true;
            return;
        },
        /**
         * 退出全屏
         * @type function
         * @default {}
         */
        eixtFullScreen: function() {
            //if (this.orientationchange) {
            //    return false;
            //}
            if ($(this.$video).hasClass("audio_full_screen")) {
                this.$videoCont.removeAttr('style');
                //this.$videoCont.style.cssText = '';
                this.$fullScreen.removeClass('active');
            }
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.oRequestFullscreen) {
                document.oRequestFullscreen();
            } else {
                this.$videoCont.removeAttr('style');
                this.$video.style.cssText = '';
                this.$fullScreen.removeClass('active');
            }
            //redraw();
            this.inFullScreen = false;
            return;
        }
    };
})(jQuery);
