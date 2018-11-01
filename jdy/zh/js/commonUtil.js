/**  
 * StringBuffer Class, to join two string is the most use  
 * @author wqs 2017-4-24 11:36:35   
 */
var commonUtils= function (){};
function StringBuffer()
{
    this._strings = [];   
    if(arguments.length==1)   
    {   
        this._strings.push(arguments[0]);   
    }   
}
  
StringBuffer.prototype.append = function(str)   
{   
    this._strings.push(str);   
    return this;   
};
  
StringBuffer.prototype.toString = function()   
{   
    return this._strings.join("");   
};
  
/* 返回长度 */  
StringBuffer.prototype.length = function()   
{   
    var str = this._strings.join("");   
    return str.length;   
};
  
/* 删除后几位字符 */  
StringBuffer.prototype.del = function(num)   
{   
    var len = this.length();   
    var str = this.toString();   
    str     = str.slice(0,len-num);   
    this._strings = [];   
    this._strings.push(str);   
};
//string构造函数trim方法
String.prototype.trim=function() {
	return this.replace(/(^\s*)|(\s*$)/g,'');
};
//时间格式化
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth()+1,                 //月份
		"d+" : this.getDate(),                    //日
		"h+" : this.getHours(),                   //小时
		"m+" : this.getMinutes(),                 //分
		"s+" : this.getSeconds(),                 //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S"  : this.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
};
commonUtils.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
//判空
commonUtils.checkStr = function(vab){
	if (typeof(vab) == "undefined" || null==vab || "" == vab || "undefined" == vab || "null" == vab) { 
	   return false;
	}
	return true;
};
//检查手机号码
commonUtils.checkPhoneNum = function(num) {
    var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    var reg1 = /^0?8008\d{6}$/;
    return !!reg.test(num) || !!reg1.test(num);
};
commonUtils.showPop = function showPop(text,tips,time,fontSize) {
    var time = time || 3000;
    var fontSize = fontSize || 16;
    var pop = $('#popInfo');
    pop = $('<div id="popbox" style="background:rgba(0,0,0,0.5); position:absolute; left:0; top:0;width:100%;"><div id="text_content" style="background:#ffffff; width:76%; margin:0 auto; border-radius:10px; text-align:center; font-size:1em; box-shadow:0px 0px 5px #333333; position:relative;">'+
			'<p style="border-bottom:1px solid #efefef; padding:20px; line-height:2em; font-weight:600;" class="js_warming">'+ text +'</p><a style="color:#09F; line-height:3em;" id="cliHid">'+tips+'</a></div></div>').appendTo('body');
	var oPb=document.getElementById('popbox');
	var oTc=document.getElementById('text_content');
	oPb.style.height=document.documentElement.clientHeight+"px";
	oTc.style.top=(document.documentElement.clientHeight-oTc.offsetHeight)/2+"px";
	$("#cliHid").click(function(){
		pop.remove();
	});
	window.showPopTimer = setTimeout(
        function(){
        	pop.remove();
            //pop.hide();
        }, time);
};


commonUtils.showPop2 = function(text,time,fontSize) {
    var time = time || 2000;
    var fontSize = fontSize || 16;
    var pop = $('#popInfo2');
    if(pop.length > 0){
        pop.hide();
        pop.text(text);
        pop.show();
        window.showPopTimer && clearTimeout(showPopTimer);
        window.showPopTimer = setTimeout(
            function(){
                pop.hide();
            }, time);
    } else {
        pop = $('<div class="popInfo2" id="popInfo2" style="position: fixed;top: 5.5rem;left: 10%;width:80%;line-height: 50px;height: 50px; background-color: rgba(0, 0, 0, 0.7);z-index: 10000;color: #F7F9EE;text-align: center; font-size: '+fontSize+'px; border-radius: 10px;">'+ text +'</div>').appendTo('body');
        window.showPopTimer = setTimeout(
            function(){
                pop.hide();
            }, time);
    }
};

commonUtils.showPop3 = function(text,fontSize) {
    var fontSize = fontSize || 16;
    var pop = $('#popbox3');
    var livepo_text = "";
    if(text=="start"){
        livepo_text = "直播已开始";
        live_show_img = "./image/livestart_icon.png"
    }
    if(text=="end"){
        livepo_text = "该直播已结束";
        live_show_img = "./image/liveend_icon.png"
    }
    if(pop.length > 0){
    	$('#popbox3').remove();
    }
    pop = $('<div id="popbox3" style="background:rgba(0,0,0,0.5); position:absolute; left:0; top:0;width:100%;    height: 100%;z-index: 8888;">'+
                '<div class="popInfo3" id="popInfo3" >'+
                    '<div class="info_txt">'+livepo_text+'</div>'+
                    '<div class="button">'+
                        '<p id="iknown">我知道了</p>'+
                    '</div>'+
                '</div>'+
            '</div>'
            ).appendTo('body');
    // pop = $('<div id="popbox3" style="background:rgba(0,0,0,0.5); position:absolute; left:0; top:0;width:100%;    height: 100%;z-index: 8888;"><div class="popInfo3" id="popInfo3" style="    font-weight: bold;position: fixed;top: 42%;left: 34%;width:32%;z-index: 3000;color: black;text-align: center; font-size: '+fontSize+'px; border-radius: 10px;"><img style="width: 75%;margin: 0 auto;" src="'+live_show_img+'" alt=""><p style="font-size: 0.55rem;line-height:1.5rem;color: #fff;font-weight: normal;">'+livepo_text+'</p></div></div>').appendTo('body');
};
$(document).on("click","#iknown",function(){
	$('#popbox3').remove();
});
commonUtils.timeFormat= function(time) {
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
};
commonUtils.phoneSec = function(phoneNum){
	if(commonUtils.checkPhoneNum(phoneNum)){
		phoneNum = phoneNum.substring(0,3)+"****"+phoneNum.substring(7,phoneNum.length);
	}
	return phoneNum;
};

function Map() {
    this.elements = new Array();
    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    };
    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.elements.length < 1);
    };
    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    };
    //向MAP中增加元素（key, value) 
    this.set = function(_key, _value) {
        this.elements.push( {
            key : _key,
            value : _value
        });
    };
    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    };
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };
    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
}
var giftData;
//礼物列表初始化--手机H5
function initalizeGiftName(m){
	if(giftData.length > 0){
		for(var i=0;i < giftData.length; i++){
			var num = "gift"+(10+i);
			var giftName = giftData[i].giftName;
			m.set(num,giftName);
		}
	}
}

function initalizeGiftMsg(m){
	if(giftData.length > 0){
		for(var i=0;i < giftData.length; i++){
			var id = giftData[i].id;
			var giftName = giftData[i].giftName;
			m.set(giftName,id);
		}
	}
}

function initalizeGiftImg(m){
	if(giftData.length > 0){
		for(var i=0;i < giftData.length; i++){
			var giftImg = giftData[i].giftImg;
			var giftName = giftData[i].giftName;
			m.set(giftName,giftImg);
		}
	}
}
commonUtils.ws=null;
commonUtils.playURL=null;
commonUtils.liveStatus=0;
commonUtils.liveID=null;