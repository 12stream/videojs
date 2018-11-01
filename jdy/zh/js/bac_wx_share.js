var url = location.href.split('#')[0];
if(window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
	url = location.href;
}

function accreditInfo(vId){
    $.ajax({
        type: "GET",
        async: false,
        data: {
            "user_id":vId,
            "url":url
        }, 
        url: config.vboApi+'wecha_authorization/get_share_accredit_info',	
        dataType: "json",
        success: function(dataRes) {
            if(dataRes.code=="1"){
                var rt = dataRes.result;            
                var debug = rt.debug;
                var timestamp = rt.timestamp;
                var nonceStr = rt.nonceStr;
                var signature = rt.signature;
                var appId = rt.appId;
                var data ={
                    timestamp:timestamp,
                    nonceStr:nonceStr,
                    signature:signature,
                    appId:appId,
                };
                var jsApiList = rt.jsApiList;
                is_else = rt.is_else;
                wxshare(data,jsApiList);
            }
            
        }
    })
}

if(commonUtils.getUrlParam("liveid")){
    accreditInfo(liveInfo.user_id);
}
if(commonUtils.getUrlParam("videoid")){
    accreditInfo(videoInfo.userId);
}
function wxshare(data,jsApiList) {
	wx.config({
        debug: data.debug,
        // debug: true,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: jsApiList
    });
	//var shareDesc = "快来围观我的精彩直播吧";
    wx.ready(function() {
    	var shareDesc = $("#wxshare_des").val();
    	if(shareDesc != null && shareDesc != "" ){
    		if(shareDesc.length > 100){
    			shareDesc = shareDesc.substring(0,100);
    		}
    	}else{
    		if(commonUtils.getUrlParam("liveid")){
                shareDesc = "快来围观我的精彩直播吧!";
            }else{
                shareDesc = "快来围观我的精彩视频吧!";
            }
        }
        var shareTitle;
        if( ! $("#wxshare_title").val() ){
            shareTitle =document.title;
        }else{
            shareTitle = $("#wxshare_title").val();
        }     
    	var shareUrl = location.href.split('#')[0]; 
    	var shareImgUrl = $("#wxshare_pic").val();
    	if(!$("#wxshare_pic").val()){
            shareImgUrl = $('#appShareImg')[0].src;
        }else{
            shareImgUrl = $("#wxshare_pic").val();
        }
        console.log("分享=====")
        console.log("分享标题:"+shareTitle)
        console.log("分享描述:"+shareDesc)
        console.log("分享图片:"+shareImgUrl)
        console.log(shareUrl)
        console.log($("#wxshare_title").val());
        console.log($("#wxshare_des").val());
        console.log($("#wxshare_pic").val());
        wx.checkJsApi({
            jsApiList: [ "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"],
            success: function(res) {
                console.log(res.checkResult);
            }
        });
        wx.onMenuShareTimeline({
            title: shareTitle,
            desc: shareDesc,
            link: shareUrl,
            imgUrl: shareImgUrl,
            success: function() {
            },
            cancel: function() {
            }
        });
        wx.onMenuShareAppMessage({
        	title: shareTitle,
            desc: shareDesc,
            link: shareUrl,
            imgUrl: shareImgUrl,
            success: function() {},
            cancel: function() {}
        });
        wx.onMenuShareQQ({
            title: shareTitle,
            desc: shareDesc,
            link: shareUrl,
            imgUrl: shareImgUrl,
            success: function() {},
            cancel: function() {}
        });
        wx.onMenuShareWeibo({
            title: shareTitle,
            desc: shareDesc,
            link: shareUrl,
            imgUrl: shareImgUrl,
            success: function() {},
            cancel: function() {}
        });
        wx.onMenuShareQZone({
            title: shareTitle,
            desc: shareDesc,
            link: shareUrl,
            imgUrl: shareImgUrl,
            success: function() {},
            cancel: function() {}
        });
    });
    wx.error(function(res) {
    	//alert(res);
    });
}


        
