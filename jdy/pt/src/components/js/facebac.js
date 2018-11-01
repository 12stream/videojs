//var url = 'http://192.168.1.153:8080';
//var url = 'http://opentest.facebac.com';
var url = 'http://open.facebac.com';
//var url = 'http://localhost:8080';
document.write('<script language=javascript src="'+url+'/resources/js/md5.js"></script>');
document.write('<script language=javascript src="'+url+'/resources/js/comm.js"></script>');
document.write('<script language=javascript src="'+url+'/resources/js/upload.js"></script>');
document.write('<script language=javascript src="'+url+'/resources/js/plupload/moxie.min.js"></script>');
document.write('<script language=javascript src="'+url+'/resources/js/plupload/plupload.min.js"></script>');

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
function upload(){
	$('#upload').click();
}
function stopupload(){
	$('#stopload').click();
}
function deletefile(file,up){
	up.removeFile(file);
	$('#upload').click();
}
function UploadComplete(){//所有文件上传完成触发
	
}
function tokenErro(){//token失效或者错误
	alert("tokenErro");
}
function uploadSuccess(videoID){//每个文件上传入库完毕返回视频ID
	
}