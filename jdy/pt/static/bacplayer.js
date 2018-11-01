
function closeLights()
{
	if($("#"+flashContainer))
	{
		var obj = document.createElement("div");
		obj.id = "lightBg";
		obj.style.background = "#000000";
		obj.style.width = "100%";
		obj.style.height = "100%";
		obj.style.position = "fixed";
		obj.style.top = "0px";
		obj.style.left = "0px";
		obj.style.zIndex = "8888";
		$(window.top.document.body).append(obj);
	}
}
function openLights()
{
	var obj = window.top.document.getElementById('lightBg');
	obj.parentNode.removeChild(obj);
}

(function() {	
	var Bacobject= 
	{
		_K_:function(d){return document.getElementById(d);},
		getVideo:function(s){
			var v='';
			if(s){
				for(var i=0;i<s.length;i++){
					var a=s[i].split('->');
					if(a && a[0]){
						v+='<source src="'+a[0]+'"';
					}
					if(a.length==2 && a[1]){
						v+=' type="'+a[1]+'">';
					}
				}
			}
			return v;
		},
		getVars:function(v,k){
			if(v[k]){
				return v[k];
			}
		},
		getParams:function(v){
			var p='';
			if(v){
				if(this.getVars(v,'p')==1 && this.getVars(v,'m')!=1){
					p+=' autoplay="autoplay"';
				}
				if(this.getVars(v,'e')==1){
					p+=' loop="loop"';
				}
				if(this.getVars(v,'m')==1){
					p+=' preload="meta"';
				}
				if(this.getVars(v,'i')){
					p+=' poster="'+this.getVars(v,'i')+'"';
				}
			}
			return p;
		},
		browser:function(){
			var m = (function(ua){
				var a=new Object();
				var b = {
					msie: /msie/.test(ua) && !/opera/.test(ua),
					opera: /opera/.test(ua),
					safari: /webkit/.test(ua) && !/chrome/.test(ua),
					firefox: /firefox/.test(ua),
					chrome: /chrome/.test(ua)
				};
				var vMark = "";
				for (var i in b) {
					if (b[i]) { vMark = "safari" == i ? "version" : i; break; }
				}
				b.version = vMark && RegExp("(?:" + vMark + ")[\\/: ]([\\d.]+)").test(ua) ? RegExp.$1 : "0";
				b.ie = b.msie;
				b.ie6 = b.msie && parseInt(b.version, 10) == 6;
				b.ie7 = b.msie && parseInt(b.version, 10) == 7;
				b.ie8 = b.msie && parseInt(b.version, 10) == 8;
				a.B=vMark;
				a.V=b.version;
				return a;
			})(window.navigator.userAgent.toLowerCase());
			return m;
		},
		Platform:function(){
			var w=''; 
			var u = navigator.userAgent, app = navigator.appVersion;              
			var b={                  
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
				iPad: u.indexOf('iPad') > -1,
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				webKit: u.indexOf('AppleWebKit') > -1,
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				presto: u.indexOf('Presto') > -1,
				trident: u.indexOf('Trident') > -1,       
				mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/),
				webApp: u.indexOf('Safari') == -1
			}; 
			for (var k in b){
				if(b[k]){
					w=k;
					break;
				}
			}
			return w;
		},
		getpath:function(s) {
			var _d = unescape(window.location.href).replace("file:///", "");
			var _u = document.location.protocol + '//' + document.location.hostname;
			var _l = '',_e = '',_t = '';
			var _s = 0;
			var _r = s.split('//');
			if (_r.length > 0) {
				_l = _r[0] + '//'
			}
			var _h = "http|https|ftp|rtsp|mms|ftp|rtmp";
			var _a = _h.split('|');
			for (i = 0; i < _a.length; i++){
				if ((_a[i] + '://') == _l){
					_s = 1;
					break;
				}
			}
			if (_s == 0) {
				if (s.substr(0, 1) == '/'){
					_t = _u + s;
				}
				else {
					_e = _d.substring(0, _d.lastIndexOf("/") + 1).replace("\\", "/");
					var _w = s.replace('../', './');
					var _u = _w.split('./');
					var _n = _u.length;
					var _r = _w.replace('./', '');
					var _q = _e.split('/');
					var _j = _q.length - _n;
					for (i = 0; i < (_j); i++) {
						_t += _q[i] + '/';
					}
					_t += _r;
				}
			}
			else {
				_t = s;
			}
			return _t;
		},
		Flash:function(){
			var f=false,v=0;
			if(document.all){
				try { 
					var s=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); 
					f=true;
					var vs=s.GetVariable("$version");
					v=parseInt(vs.split(" ")[1].split(",")[0]);
				} 
				catch(e){} 
			}
			else{
				if (navigator.plugins && navigator.plugins.length > 0){
					var s=navigator.plugins["Shockwave Flash"];
					if (s){
						f=true;
						var w = s.description.split(" ");
						for (var i = 0; i < w.length; ++i){
							if (isNaN(parseInt(w[i]))) continue;
								v = parseInt(w[i]);
							}
						}
				}
			}
			return {f:f,v:v};
		},
		embedHTML5:function(C,P,W,H,V,A,S){
			var v='',
			b=this.browser()['B'],
			v=this.browser()['V'],
			x=v.split('.'),
			t=x[0],
			m=b+v,
			n=b+t,
			w='',
			s=false,
			f=this.Flash()['f'],
			a=false;
			if(!S){
				S=['iPad','iPhone','ios'];
			}
			for(var i=0;i<S.length;i++){
				w=S[i];
				if (w.indexOf('+')>-1){
					w=w.split('+')[0];
					a=true;
				}
				else{
					a=false;
				}
				if(this.Platform()==w|| m==w || n==w || b==w){
					if(a){
						if(!f){
							s=true;
							break;
						}
					}
					else{
						s=true;
						break;
					}
				}
			}
			if(s){
				v='<video controls id="'+P+'" width="'+W+'" height="'+H+'"'+this.getParams(A)+'>'+this.getVideo(V)+'</video>';
				this._K_(C).innerHTML=v;
				this._K_(C).style.width=W+'px';
				this._K_(C).style.height=H+'px';
				this._K_(C).style.backgroundColor='#000';
			}
		},
		getflashvars:function(s){
			var v='',i=0;
			if(s){
				for(var k in s){
					if(i>0){
						v+='&';
					}
					if(k=='f' && s[k]){
						s[k]=this.getpath(s[k]);
					}
					if(k=='y' && s[k]){
						s[k]=this.getpath(s[k]);
					}
					v+=k+'='+s[k];
					i++;
				}
			}
			return v;
		},
		getparam:function(s){
			var w='',v='',
			o={
				allowScriptAccess:'always',
				allowFullScreen:true,
				quality:'high',
				bgcolor:'#000000'
			};
			if(s){
				for(var k in s){
					o[k]=s[k];
				}
			}
			for(var e in o){
				w+=e+'="'+o[e]+'" ';
				v+='<param name="'+e+'" value="'+o[e]+'" />';
			}
			w=w.replace('movie=','src=');
			return {w:w,v:v};
		},
		getObjectById:function (s){
			var X = null,
			Y = this._K_(s),
			r = "embed";
			if (Y && Y.nodeName == "OBJECT") {
				if (typeof Y.SetVariable != 'undefined') {
					X = Y;
				} else {
					var Z = Y.getElementsByTagName(r)[0];
					if (Z) {
						X = Z;
					}
				}
			}
			return X;
		},
		embedSWF:function(C,D,N,W,H,V,P){
			if(!N){N='bacplayer_a1'}
			if(!P){P={};}
			var u='undefined',
			j=document,
			r='http://www.macromedia.com/go/getflashplayer',
			t='<a href="'+r+'" target="_blank" style="color: rgb(255, 0, 0);line-height: 400px;">请点击此处下载安装最新的flash插件</a>',
			error={
				w:'您的网页不符合w3c标准，无法显示播放器',
				f:'您没有安装flash插件，无法播放视频，'+t,
				v:'您的flash插件版本过低，无法播放视频，'+t
			},
			w3c=typeof j.getElementById != u && typeof j.getElementsByTagName != u && typeof j.createElement != u,
			i='id="'+N+'" name="'+N+'" ',
			s='';
			P['movie']=C;
			P['flashvars']=this.getflashvars(V);
			s+='<object  pluginspage="http://www.macromedia.com/go/getflashplayer" ';
			s+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
			s+='codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" ';
			s+='width="'+W+'" ';
			s+='height="'+H+'" ';
			s+=i;
			s+='align="middle">';
			s+=this.getparam(P)['v'];
			s+='<embed ';
			s+=this.getparam(P)['w'];
			s+=' width="'+W+'" height="'+H+'" name="'+N+'" id="'+N+'" align="middle" '+i;
			s+='type="application/x-shockwave-flash" pluginspage="'+r+'" />';
			s+='</object>';
			if(!w3c){
				this._K_(D).innerHTML=error['w'];
				this._K_(D).style.color='#ffffff';
			}else{
				if(!this.Flash()['f']){
					this._K_(D).innerHTML=error['f'];
					this._K_(D).style.color='#ffffff';
				}else{
					if(this.Flash()['v']<10){
						this._K_(D).innerHTML=error['v'];
						this._K_(D).style.color='#ffffff';
					}else{
						this._K_(D).innerHTML=s;
						this._K_(D).style.color='#000000';
					}
				}
			}
			window.flashContainer = D;
		}
	}
	window.Bacobject = Bacobject;
})();
