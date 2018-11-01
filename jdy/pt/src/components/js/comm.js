//import {facebacUrl} from '../../api/config'
// var facebacUrl = 'http://open.facebac.com';
//测试的
//var facebacUrl = 'http://opentest.facebac.com';

import {getLStorage,DATA_URL,LIVE_URL,userName,userPwd,facebacURL} from 'api/config'
var Qiniu_UploadUrl = "http://vd.facebac.net";
var uptokenurl = facebacURL + "/api/video/file/upload_token.do";
var checktokenurl = facebacURL +  "/api/video/file/check_token.do";

var uploadurl = facebacURL + "/api/video/file/file_upload.do";
var checkImageNameUrl=facebacURL + "/api/video/file/imagename_check.do";
var recordUploadurl = facebacURL + "/api/video/file/record_upload.do";
var imageUploadurl = facebacURL + "/api/video/file/image_upload.do";
var getStorageServer = facebacURL + "/api/video/file/get_storage_server.do";
var thirdkey;
var folderid;
var istranscode;
var userToken;
//var max_file_size = '5120mb';//文件最大体积
var chunk_size = '4mb';//分块上传时，每块的体积
export var map = {};
var userID;
export var userRid;
export var videoRid;
var checktoken;
var index=0;
var testflie;
var uploadLiveID;
var fileType = "";
var multiSelection =true;
var imageUrl;
export var fileArry = [];
//网宿配置
//正式：mvaas-qvw 测试：facebac-qvw
export var bucketWS = "facebac-qvw";
export var parentFilePathWS = "zhanghao/test";
export var uploadUrlWs = "http://facebac.up17.v1.wcsapi.com";
export var akIdWS = "2c73bd350427f426364e65d586b320ac5aefa2f9";

var serverType;

var uploader;
var uploader_ws;

function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}

function getRid(m){//生成随机数
	var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var res = "";
	for(var i = 0; i < m ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    console.log(res,'key');
	return res;
}
export function initUpload() {
  fileArry = [];
  fileType = $("#file_type").val();
	// $("body").append($("<input type='button' style='VISIBILITY: hidden' id='upload' value='上传'>"));
	$("body").append($("<input type='button' style='VISIBILITY: hidden' id='stopload' value='暂停'>"));
	$("body").append($("<input type='button' style='VISIBILITY: hidden' id='pickfiles' value='确定'>"));
	//根据资源不同选择不同uploader
	//获取服务器类型
	$.ajax({
		type : "POST",
		timeout : 120000, //超时时间设置，单位毫秒
		async : false,
		url : getStorageServer,
		data : {
		},
		dataType : "json",
		success : function(data) {
			serverType = data;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求发送出错！");
			return;
		}
	});
	//fileType = "video";
	//alert(fileType);
	if("video"==fileType || "videotape" == fileType){

		if("1"==serverType){
			//七牛
			uploader = Qiniu.uploader({
		        runtimes: 'html5,html4,flash',
		        browse_button: 'pickfiles',
		        container: document.getElementById('container'),
		//        max_file_size: max_file_size,
		        flash_swf_url: '/resources/js/plupload/js/Moxie.swf',
		        dragdrop: true,
		        max_retries: 3600,
		        chunk_size: chunk_size,
		        multi_selection: multiSelection,
		        uptoken_url: uptokenurl,
		        //uptoken : uploadToken,
		        domain:Qiniu_UploadUrl,
		        get_new_uptoken: true,
		        // downtoken_url: '/downtoken',
		        // unique_names: true,
		        // save_key: true,
		        // x_vars: {
		        //     'id': '1234',
		        //     'time': function(up, file) {
		        //         var time = (new Date()).getTime();
		        //         // do something with 'time'
		        //         return time;
		        //     },
		        // },
		        auto_start: false,
		        log_level: 5,
		        init: {
		            'FilesAdded': function(up, files) {
		            	//alert(fileType);
		            	plupload.each(files, function(file) {
		            		if( /[\'\"{}()]/.test(file.name)){//文件包含单引号或者双引号
		        				alert("文件不能包含以下特殊字符\'\"{}()");
		            			up.removeFile(file);
		            			return;
		        			}
		            		var FileExt=file.name.replace(/.+\./,"").toUpperCase();   //正则表达式获取后缀
		            		if (fileType == null || fileType == undefined || fileType == '') { //点播上传
		            			alert("请设置上传文件类型(直播录像，点播视频，图片云)");
		            			return;
		                	}else if (fileType == 'videotape' || fileType == 'video'){//录像上传点播上传
		                		if(!(FileExt=="TS"||FileExt=="F4V"||FileExt=="WMV"||FileExt=="MP4"||FileExt=="FLV"||FileExt=="RMVB"||FileExt=="MOV"||FileExt=="RM"||FileExt=="3GP"||FileExt=="DAT"||FileExt=="AVI"||FileExt=="MKV"||FileExt=="MPG"||FileExt=="VOB"
		                			||FileExt=="MP3"||FileExt=="AAC"||FileExt=="M4A"||FileExt=="WAV"||FileExt=="WMA")){
		                			alert("文件格式不正确,不支持"+FileExt+"文件");
		                			up.removeFile(file);
		                			return;
		                		}else{
		                		  alert(111);
		                			addFile(file,up,false);
		                		}
		                	}else if (fileType == 'image'){//图片上传
		                		if(!(FileExt=="GIF"||FileExt=="JPG"||FileExt=="JPEG"||FileExt=="PNG"||FileExt=="SVG"||FileExt=="BMP"||FileExt=="TIFF"||FileExt=="WEBP")){
		                			alert("文件格式不正确,不支持"+FileExt+"文件");
		                			up.removeFile(file);
		                			return;
		                		}else{
		                			$.ajax({
		                				type : "POST",
		                				timeout : 120000, //超时时间设置，单位毫秒
		                				async : false,
		                				url : checkImageNameUrl,
		                				data : {
		                					"fileName" : file.name,"userID" : userID
		                				},
		                				dataType : "json",
		                				success : function(data) {
		                					if(200==data.code){
		                						alert("已存在同名文件");
		                						up.removeFile(file);
		                						//addFile(file,up,true);
		                						return;
		                					}else{
                                alert(222);
		                						addFile(file,up,false);
		                					}
		                				},
		                				error : function(XMLHttpRequest, textStatus, errorThrown) {
		                					up.removeFile(file);
		                					alert("请求发送出错！");
		                					return;
		                				}
		                			});
		                		}
		                	}
		            	});
		            	//uploader.start();
		            },
		            'BeforeUpload': function(up, file) {
		            },
		            'UploadProgress': function(up, file) {
		            	UploadProgress(file);
		            },
		            'UploadComplete': function() {
		            	UploadComplete();
		            	//$("#result").text('上传成功');
		            },
		            'FileUploaded': function(up, file, info) {
		            	if (fileType == null || fileType == undefined || fileType == '') { //点播上传
		            	}else if (fileType == 'videotape'){//录像上传
		            		recordUpload(file.name,file.size);
		            	}else if (fileType == 'video'){//点播上传
		            		fileUpload(file.id,file.name,file.size);
		            	}else if (fileType == 'image'){//点播上传
		            		imageUpload(file.name,file.size);
		            	}
		            },
		            'Error': function(up, err, errTip) {
		            	$("#result").text('上传失败');
		            }
		                 ,
		                 'Key': function(up, file) {
		                	 // videoRid = getRid(20);
		                	 console.log(videoRid);
		                //	 debugger;
		                	 map[file.name]=videoRid;
		                	 console.log(map[file.name],'888');
		                	 var FileExt=file.name.replace(/.+\./,"");   //正则表达式获取后缀
		 		        	 var key;
		 		        	 if (fileType == 'image'){//图片上传
		 		        		key = getImageKey(FileExt);
		 	            	 }else {//点播上传
		 	            		key = getFileKey(FileExt);
		 	            	 }
		                     return key;
		                 }
		        }
		    });
		}else if("2"==serverType){
			//网宿
			uploader = UploadDemo.uploader({
				runtimes: 'html5,flash,html4',    //上传模式,依次退化
		        browse_button: 'pickfiles', // you can pass in id...
		        container: document.getElementById('container'), // ... or DOM Element itself
		        uptoken_url: uptokenurl,
		        flash_swf_url: '/js/plupload/Moxie.swf',
		        max_retries: 0,                   //上传失败最大重试次数
		        dragdrop: true,                   //开启可拖曳上传
		        //drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		        chunk_size: '4mb',                //分块上传时，每片的体积
		        auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
		        filters: {
		            // max_file_size: '4gb',
		            mime_types: [
		                {title: "config file", extensions: "*"}
		            ]
		        },
		        init: {
		            PostInit: function () {
		                $("#uploadFile").on("click", function () {
		                    if (uploader.total.queued < 1) {
		                        BUI.Message.Alert('您还未选择配置文件！')
		                    } else {
		                        $(this).attr("disabled", true);
		                        uploader.start();
		                    }
		                    return false;
		                });
		            },
		            FilesAdded: function (up, files) {
		            	plupload.each(files, function (file) {
		            		if( /[\'\"{}()]/.test(file.name)){//文件包含单引号或者双引号
		        				alert("文件不能包含以下特殊字符\'\"{}()");
		            			up.removeFile(file);
		            			return;
		        			}
		            		var FileExt=file.name.replace(/.+\./,"").toUpperCase();   //正则表达式获取后缀
		            		if (fileType == null || fileType == undefined || fileType == '') { //点播上传
		            			alert("请设置上传文件类型(音视频)");
		            			return;
		                	}else if (fileType == 'videotape' || fileType == 'video'){//录像上传点播上传
		                		if(!(FileExt=="TS"||FileExt=="F4V"||FileExt=="WMV"||FileExt=="MP4"||FileExt=="FLV"||FileExt=="RMVB"||FileExt=="MOV"||FileExt=="RM"||FileExt=="3GP"||FileExt=="DAT"||FileExt=="AVI"||FileExt=="MKV"||FileExt=="MPG"||FileExt=="VOB"
		                			||FileExt=="MP3"||FileExt=="AAC"||FileExt=="M4A"||FileExt=="WAV"||FileExt=="WMA")){
		                			alert("文件格式不正确,不支持"+FileExt+"文件");
		                			up.removeFile(file);
		                			return;
		                		}else{
		                			addFile(file,up,false);
		                		}
		                	}

		            	});
		            	uploader.start();
	                },

		            UploadProgress: function (up, file) {
		                //updateProcess(file.percent, file.id);
		            	UploadProgress(file);
		            },
		            UploadComplete: function (up, files) {
		            	//$("#uploadFile").remove();
		                /*$("#uploadFile").remove();
		                $("#upfileBtnBottom").prepend("<a href='#' class='button J_filesave'>保存</a>")*/
		            	UploadComplete();

		            },
		            FileUploaded: function(up,file,responseObj){
		            	var item = $("tr[data-fileid='" + file.id + "']");
		            	item.find(".filectrl_td22").html("上传完成");
		            	if (fileType == null || fileType == undefined || fileType == '') { //点播上传
		            	}else if (fileType == 'videotape'){//录像上传
		            		recordUpload(file.name,file.size);
		            	}else if (fileType == 'video'){//点播上传
		            		fileUpload(file.id,file.name,file.size);
		            	}else if (fileType == 'image'){//点播上传
		            		imageUpload(file.name,file.size);
		            	}
		            },
		            UploadFile: function (up, file) {
		            },
		            FilesRemoved: function (up, files) {
		                //alert("<p style='color:#999;font-size:18px;margin-top:17.5%;text-align:center;'>您还没有选择任何文件</p>");
		            },
		            Error: function (up, err, errTipe) {
		                if (errTipe) {
		                    var item = $("tr[data-fileid='" + err.file.id + "']");
		                    item.find(".process_contain").html("<span class='txt-error'> " + errTipe + " </span>");
		                    item.find(".filectrl_td").html("<a href='javascript:;' class='button button-darkblue'>续传</a>");
		                    item.find(".filectrl_td a").on("click", function () {
		                        $(this).parents("tr").remove();
		                        err.file.status = 1;
		                        uploader.addFile(err.file);
		                        uploader.start();
		                    });
		                    item.find(".filectrl_td22").html("<a href='javascript:;' class='button button-darkblue'>重新上传</a>");
		                    item.find(".filectrl_td22 a").on("click", function () {
		                        var bucket = "facebac-qvw";
		                        var parentFilePath = "zhanghao/test";
		                        var parentPath = parentFilePath + "/" + err.file.name;
		                        if (parentPath.charAt(0) == "/") {
		                            parentPath = parentPath.substr(1, parentPath.length);
		                        }
		                        parentPath = bucket + ":" + parentPath;
		                        console.log("重新上传 remove key", parentPath + ":" + err.file.id);
		                        console.log("重新上传 remove key before", localStorage.getItem(parentPath + ":" + err.file.id));
		                        localStorage.removeItem(parentPath + ":" + err.file.id);
		                        localStorage.removeItem(parentPath + ":" + err.file.id + "_ctx");
		                        console.log("重新上传 remove key after", localStorage.getItem(parentPath + ":" + err.file.id));
		                        $(this).parents("tr").remove();
		                        err.file.status = 1;
		                        err.file.offset = 0;
		                        err.file.percent = 0;
		                        err.file.loaded = 0;
                          alert(555);
		                        uploader.addFile(err.file);
		                        uploader.start();
		                    });
		                }
		                //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
		            }
		        }
			});
		}

		/*$('#upload').on('click', function(){
			uploader.start();
	    });
	    $('#stopload').on('click', function(){
	    	uploader.stop();
	    });*/
	}else if("image"==fileType){
		//七牛
		uploader = Qiniu.uploader({
	        runtimes: 'html5,html4,flash',
	        browse_button: 'pickfiles',
	        container: document.getElementById('container'),
	//        max_file_size: max_file_size,
	        flash_swf_url: '/resources/js/plupload/js/Moxie.swf',
	        dragdrop: true,
	        max_retries: 3600,
	        chunk_size: chunk_size,
	        multi_selection: multiSelection,
	        uptoken_url: uptokenurl,
	        //uptoken : uploadToken,
	        domain:Qiniu_UploadUrl,
	        get_new_uptoken: true,
	        // downtoken_url: '/downtoken',
	        // unique_names: true,
	        // save_key: true,
	        // x_vars: {
	        //     'id': '1234',
	        //     'time': function(up, file) {
	        //         var time = (new Date()).getTime();
	        //         // do something with 'time'
	        //         return time;
	        //     },
	        // },
	        auto_start: false,
	        log_level: 5,
	        init: {
	            'FilesAdded': function(up, files) {
	            	//alert(fileType);
	            	plupload.each(files, function(file) {
	            		if( /[\'\"{}()]/.test(file.name)){//文件包含单引号或者双引号
	        				alert("文件不能包含以下特殊字符\'\"{}()");
	            			up.removeFile(file);
	            			return;
	        			}
	            		var FileExt=file.name.replace(/.+\./,"").toUpperCase();   //正则表达式获取后缀
	            		if (fileType == null || fileType == undefined || fileType == '') { //点播上传
	            			alert("请设置上传文件类型(直播录像，点播视频，图片云)");
	            			return;
	                	}else if (fileType == 'videotape' || fileType == 'video'){//录像上传点播上传
	                		if(!(FileExt=="TS"||FileExt=="F4V"||FileExt=="WMV"||FileExt=="MP4"||FileExt=="FLV"||FileExt=="RMVB"||FileExt=="MOV"||FileExt=="RM"||FileExt=="3GP"||FileExt=="DAT"||FileExt=="AVI"||FileExt=="MKV"||FileExt=="MPG"||FileExt=="VOB"
	                			||FileExt=="MP3"||FileExt=="AAC"||FileExt=="M4A"||FileExt=="WAV"||FileExt=="WMA")){
	                			alert("文件格式不正确,不支持"+FileExt+"文件");
	                			up.removeFile(file);
	                			return;
	                		}else{
                        alert(666);
	                			addFile(file,up,false);
	                		}
	                	}else if (fileType == 'image'){//图片上传
	                		if(!(FileExt=="GIF"||FileExt=="JPG"||FileExt=="JPEG"||FileExt=="PNG"||FileExt=="SVG"||FileExt=="BMP"||FileExt=="TIFF"||FileExt=="WEBP")){
	                			alert("文件格式不正确,不支持"+FileExt+"文件");
	                			up.removeFile(file);
	                			return;
	                		}else{
	                			$.ajax({
	                				type : "POST",
	                				timeout : 120000, //超时时间设置，单位毫秒
	                				async : false,
	                				url : checkImageNameUrl,
	                				data : {
	                					"fileName" : file.name,"userID" : userID
	                				},
	                				dataType : "json",
	                				success : function(data) {
	                					if(200==data.code){
	                						alert("已存在同名文件");
	                						up.removeFile(file);
	                						//addFile(file,up,true);
	                						return;
	                					}else{
                              alert(777);
	                						addFile(file,up,false);
	                					}
	                				},
	                				error : function(XMLHttpRequest, textStatus, errorThrown) {
	                					up.removeFile(file);
	                					alert("请求发送出错！");
	                					return;
	                				}
	                			});
	                		}
	                	}
	            	});
	            	//uploader.start();
	            },
	            'BeforeUpload': function(up, file) {
	            },
	            'UploadProgress': function(up, file) {
	            	UploadProgress(file);
	            },
	            'UploadComplete': function() {
	            	UploadComplete();
	            	//$("#result").text('上传成功');
	            },
	            'FileUploaded': function(up, file, info) {
	            	if (fileType == null || fileType == undefined || fileType == '') { //点播上传
	            	}else if (fileType == 'videotape'){//录像上传
	            		recordUpload(file.name,file.size);
	            	}else if (fileType == 'video'){//点播上传
	            		fileUpload(file.id,file.name,file.size);
	            	}else if (fileType == 'image'){//点播上传
	            		imageUpload(file.name,file.size);
	            	}
	            },
	            'Error': function(up, err, errTip) {
	            	$("#result").text('上传失败');
	            }
	                 ,
	                 'Key': function(up, file) {
	                	 // videoRid = getRid(20);
	                	 map[file.name]=videoRid;
	                	 var FileExt=file.name.replace(/.+\./,"");   //正则表达式获取后缀
	 		        	 var key;
	 		        	 if (fileType == 'image'){//图片上传
	 		        		key = getImageKey(FileExt);
	 	            	 }else {//点播上传
	 	            		key = getFileKey(FileExt);
	 	            	 }
	                     return key;
	                 }
	        }
	    });
	}

    /*uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });*/
    // $('#upload').on('click', function(){
    // 	//上传
    // 	uploader.start();
    // });
    $('#stopload').on('click', function(){
    	uploader.stop();
    });
};
export function check_token(userToken){
	$.ajax({
		type : "POST",
		timeout : 120000, //超时时间设置，单位毫秒
		async : false,
		url : checktokenurl,
		data : {
			"token" : userToken
		},
		dataType : "json",
		success : function(data) {
			if(200==data.code){
				userID = data.data.userID;
				userRid = data.data.userRid;
				checktoken= data.code;
				$("#token").val(userToken);
				$('#pickfiles').click();
			}else{
				alert("token错误");
				return;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求发送出错！");
		}
	});
}
function imageUpload(fileName,fileSize){
	thirdkey = $("#third_key").val();
	var styleID;
	$.ajax({
		type : "POST",
		timeout : 120000, //超时时间设置，单位毫秒
		async : false,
		url : imageUploadurl,
		data : {
			"fileName" : fileName,
			"fileSize" : fileSize,
			"imageRid" :  map[fileName],
			"userRid" : userRid,
			"userID" : userID,
			"thirdkey" : thirdkey,
			"styleID" : styleID,
			"folderid" : folderid
		},
		dataType : "json",
		success : function(data) {
			if(200==data.code){
				imageUrl = data.data.url;
				//alert("上传成功");
			}else{
				alert(data.msg);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求发送出错！");

		}
	});
}
function recordUpload(fileName,fileSize) {//文件上传完毕触发
	uploadLiveID = $("#upload_liveid").val();
	thirdkey = $("#third_key").val();
	istranscode = $("#istranscode").val();
	$.ajax({
		type : "POST",
		timeout : 120000, //超时时间设置，单位毫秒
		async : false,
		url : recordUploadurl,
		data : {
			"fileName" : fileName,
			"fileSize" : fileSize,
			"videoRid" :  map[fileName],
			"userRid" : userRid,
			"userID" : userID,
			"thirdkey" : thirdkey,
			"uploadLiveID" : uploadLiveID,
			"istranscode" : istranscode,
			"serverType" : serverType
		},
		dataType : "json",
		success : function(data) {
			if(200==data.code){
				uploadSuccess(data.data);
				//alert("上传成功");
			}else{
				alert(data.msg);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求发送出错！");

		}
	});
}
function fileUpload(fileId,fileName,fileSize) {//文件上传完毕触发
	thirdkey = $("#third_key").val();
	folderid = $("#folder_id").val();
	istranscode = $("#istranscode").val();
  $.ajax({
		type : "POST",
		timeout : 120000, //超时时间设置，单位毫秒
		async : false,
		url : uploadurl,
		data : {
			"fileName" : fileName,
			"fileSize" : fileSize,
			"videoRid" :  map[fileName],
			"userRid" : userRid,
			"userID" : userID,
			"thirdkey" : thirdkey,
			"folderid" : folderid,
			"istranscode" : istranscode,
			"serverType" : serverType
		},
		dataType : "json",
		success : function(data) {
			if(200==data.code){
			  $("#"+fileId).attr("data-id",data.data);
				uploadSuccess(data.data);
        //创建点播
				createVideo(data.data);
			}else{
				alert(data.msg);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求发送出错！");
		}
	});
}
function createVideo(vid) {
  //创建点播 start
  $.ajax({
    type : "POST",
    timeout : 120000, //超时时间设置，单位毫秒
    async : false,
    url : DATA_URL+'mwlive/vod/createVodInfo.do',
    data : {
      "id" : vid,
      // "oldVodId":'',
      "userId":sessionStorage.getItem('userId')
    },
    dataType : "json",
    success : function(data) {
      if(200==data.code){
        dispatcher(data.data.id);
        //获取视频截图 start
        /*let paramData = {
          "token":$("#token").val(),
          "search_terms":$('#video_id').val()
        }
        $.ajax({
          type : "post",
          url : "http://opentest.facebac.com//api/video/list/search_list.do",
          data : paramData,
          async : false,
          success : function(res){
            if(res.code == 200){
              video_cover_url = res.data.dataList[0].video_cover_url;
              $("#videoButton").click();
              // $('#video_cover_url').val(res.data.dataList[0].video_cover_url);
              //$('#video_cover_url').src(res.data.dataList[0].video_cover_url);
            }
          }
        })*/
        //获取视频截图 end

      }else{
        alert(data.msg,'error');
      }
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
      alert("创建点播请求发送出错！",'error');
    }
  });
  //创建点播 end
}
//调用聊天室接口
function dispatcher(videoId) {
  $.ajax({
    type : "POST",
    timeout : 120000, //超时时间设置，单位毫秒
    async : false,
    url : LIVE_URL + "dispatcher.action",
    data : {
      cmd: "lb",
      liveID: videoId,
      user_id:getLStorage("user_id"),
      video_type:1
    },
    dataType : "json",
    success : function(data) {
      if(200==data.code){
        console.log(data.data,'调用聊天室成功！');
      }
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
      alert("创建点播请求发送出错！",'error');
    }
  });
}
function getFileKey(FileExt){
	var fileNamemd5 = hex_md5("faceBacVideoOut/"+userRid+"/"+videoRid+"/n_n");
	return "store/"+userRid+"/"+videoRid+"/n_n"+"/"+fileNamemd5+"."+FileExt;

}
function getImageKey(FileExt){
	var fileNamemd5 = hex_md5("faceBacVideoOut/"+userRid+"/"+videoRid+"/n_n");
	return "image/"+userRid+"/"+videoRid+"/n_n"+"/"+fileNamemd5+"."+FileExt;

}
export function get_token(){
  var d = new Date();
  var m = d.getMonth() + 1;
  d =d.getFullYear().toString() +(m < 10 ? "0" + m : m).toString() + d.getDate().toString() +d.getHours().toString() +d.getMinutes().toString() +d.getSeconds().toString();

var args = {"user_name":userName,"create_time":d,
"password":hex_md5(hex_md5(userPwd)+ "#" + d)};


  $.ajax({/* http://opentest.facebac.com/api/manage/user/get_token.do*/
    type : "post",
    url : facebacURL+"/api/manage/user/get_token.do",
    data : args,
    async : false,
    success : function(data){
      //sessionStorage.setItem("token", data.data);
      check_token(data.data);
    }
  })
}
function add_file(file,up){//增加文件时触发
  fileArry.push(file);
  $("#getTable").click();
}
export function getComTable() {
  return fileArry
}


function Upload_progress(file){//文件上传过程中触发
  var formatSpeed = plupload.formatSize(file.speed).toUpperCase();
  $("#speed_" + file.id).text(formatSpeed + "/s");
  $("#size_" + file.id).text(plupload.formatSize(file.size).toUpperCase());
  $("#percent_" + file.id).text(file.percent+'%');
}

function addFile(file,up,isExist){//增加文件时触发
  if(isExist){//是否存在
    add_file(file,up);
  }else{
    add_file(file,up);
  }
}
function UploadProgress(file){//文件上传过程中触发
  Upload_progress(file);
}
export function upload(){
  $('#upload').click();
}
export function stopupload(){
  uploader.stop();
}

export function startUpload(){
  uploader.start();
}

export function deletefile(file){
  console.log(uploader);
  uploader.removeFile(file);
  // up.removeFile(file);
  // $('#upload').click();
}
function UploadComplete(){//所有文件上传完成触发

}
function uploadSuccess(videoID){//每个文件上传入库完毕返回视频ID

}
