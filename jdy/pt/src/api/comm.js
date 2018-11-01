var Qiniu_UploadUrl = "http://vd.facebac.net";
var uptokenurl = url + "/api/video/file/upload_token.do";
var checktokenurl = url +  "/api/video/file/check_token.do";
var uploadurl = url + "/api/video/file/file_upload.do";
var checkImageNameUrl=url + "/api/video/file/imagename_check.do";
var recordUploadurl = url + "/api/video/file/record_upload.do";
var imageUploadurl = url + "/api/video/file/image_upload.do";
var thirdkey;
var folderid;
var istranscode;
var userToken;
//var max_file_size = '5120mb';//文件最大体积
var chunk_size = '4mb';//分块上传时，每块的体积
var map = {};
var userID;
var userRid;
var videoRid;
var checktoken;
var index=0;
var testflie;
var uploadLiveID;
var multiSelection =true;
var imageUrl;

function getFileType(){
	var fileType = $("#file_type").val();
	return fileType;
}
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
	return res;
}
$(function() {
	$("body").append($("<input type='button' style='VISIBILITY: hidden' id='upload' value='上传'>"));
	$("body").append($("<input type='button' style='VISIBILITY: hidden' id='stopload' value='暂停'>"));
	$("body").append($("<input type='button' style='VISIBILITY: hidden' id='pickfiles' value='确定'>"));

	var uploader = Qiniu.uploader({
        runtimes: 'html5,html4,flash',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
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
        auto_start: true
        ,
        log_level: 5,
        init: {
            'FilesAdded': function(up, files) {
            	plupload.each(files, function(file) {
            		if( /[\'\"{}()]/.test(file.name)){//文件包含单引号或者双引号
        				alert("文件不能包含以下特殊字符\'\"{}()");
            			up.removeFile(file);
            			return;
        			}
            		var FileExt=file.name.replace(/.+\./,"").toUpperCase();   //正则表达式获取后缀
            		var fileType  = getFileType();
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
                						up.removeFile(file);
                						addFile(file,up,true);
                						return;
                					}else{
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
            	var fileType  = getFileType();
            	if (fileType == null || fileType == undefined || fileType == '') { //点播上传
            	}else if (fileType == 'videotape'){//录像上传
            		recordUpload(file.name,file.size);
            	}else if (fileType == 'video'){//点播上传
            		fileUpload(file.name,file.size);
            	}else if (fileType == 'image'){//点播上传
            		imageUpload(file.name,file.size);
            	}
            },
            'Error': function(up, err, errTip) {
            	$("#result").text('上传失败');
            }
                 ,
			'Key': function(up, file) {
				var fileType  = getFileType();
				videoRid = getRid(20);
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

    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });
    $('#upload').on('click', function(){
		alert("1223435")
        uploader.start();
    });
    $('#stopload').on('click', function(){
        uploader.stop();
    });
});
function check_token(){
	userToken= $("#token").val();
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
				$('#pickfiles').click();
			}else{
				tokenErro(data.code);
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
				uploadError();
//				alert(data.msg);
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
			"istranscode" : istranscode
		},
		dataType : "json",
		success : function(data) {
			if(200==data.code){
				uploadSuccess(data.data);
				//alert("上传成功");
			}else{
				uploadError();
//				alert(data.msg);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求发送出错！");

		}
	});
}
function fileUpload(fileName,fileSize) {//文件上传完毕触发
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
			"istranscode" : istranscode
		},
		dataType : "json",
		success : function(data) {
			if(200==data.code){
				uploadSuccess(data.data);
				//alert(data.data);
				//alert("上传成功");
			}else{
				uploadError();
//				alert(data.msg);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求发送出错！");
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
function pickfile(){
	check_token();
}
