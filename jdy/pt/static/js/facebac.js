//测试环境
var url = 'http://open.facebac.com';
//开发环境
// var url = 'http://opentest.facebac.com';
var actionurl = 'http://192.169.2.63:8080/service/iBacManage.action';
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
function errTxt(txt){
    $(".statu_icon").addClass('error').removeClass('complete').show().find('span').text(txt);
    $('.statu_icon .fa').addClass('fa_error').removeClass('fa_complete');
    $("#fileStu").show();
}
function upload(){
    if($(".statu_icon").css("display")=="none"){
        errTxt("请选择文件");

    }else{
        $('#upload').click();
    }
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
function tokenErro(code){//token失效或者错误
    if(code=="405"){
        alert("您已欠费");
    }else{
        queryToken();
    }

}

function uploadError(){
    Upload_error();
}
function uploadSuccess(videoID){//每个文件上传入库完毕返回视频ID
    $.ajax({
        type:"post",
        timeout:120000, //超时时间设置，单位毫秒
        async:false,
        url:playVodUrl,
        data:{"cmd":"get_video_playurl","vodID":videoID},
        dataType:"json",
        success:function(data) {
            if(data.code=='200'){
                if(data.data.dataList.length>0){
                    var videoUrl = data.data.dataList[0].play_url;
                    upload_success(true,videoUrl,videoID);
                }
            }else{
                upload_success(false,data.msg);
            }
        },error: function(XMLHttpRequest, textStatus, errorThrown){
            upload_success(false,"操作失败");
        }
    });
}
//查询视频云token
function queryToken(){
    $.ajax({
        type:"post",
        timeout:120000, //超时时间设置，单位毫秒
        async:false,
        url:actionurl,
        data:{"bizCode":9086},
        dataType:"jsonp",
        jsonp:"jsoncallback",
        success:function(data) {
            if(data.resultCode=='01'){
                getTokenCallback(true,data.params);
            }else{
                getTokenCallback(false,data.resultMsg);
            }
        },error: function(XMLHttpRequest, textStatus, errorThrown){
            getTokenCallback(false,"操作失败");
        }
    });
}
// yst
var isFile= 0;
var isup = 0;
var fileArr=new Array();
function add_file(file,up){//增加文件时触发
//            if(file.size<52428800){
        //自动上传
        if(isFile){
            deletefile(isFile,isup);
        }
        isFile = file;
        isup = up;
        var fileName = file.name.replace(/^(^.{4})(.+)(.{1}\.+\w+$)$/g, "$1...$3");
        $("#videoSrc,#minute,#second").val("");
        $("#pick_file").attr("data-id","");
        $(".statu_icon").show().removeClass('error');
        $("#fileStu").hide();
        $("#fileName").text(fileName).show();
//            }else{
//                $("#up_load").attr("data_val",file.size)
//                $("#fileProgressDiv").hide();
//                $("#fileProgressTip").html("");
//                $("#fileProgress").css("width","0");
//                $("#videoSrc").val("");
//                errTxt("视频大小超出50M")
//                deletefile(file,up);
//                return;
//            }
}
// 上传进度
function Upload_progress(file){//文件上传过程中触发
    var formatSpeed = plupload.formatSize(file.speed).toUpperCase();
    $("#fileProgressDiv").show();
    $("#fileProgressTip").html(file.percent+'%');
    $("#fileProgress").css("width",file.percent+'%');

}

function getTokenCallback(is,param){
    if(is){
        $("#token").val(param);
    }
}

//上传成功
function upload_success(flag,src,videoID){
    if(flag){
        $("#videoSrc").val(src);
        isFile= 0;
        isup =0;
        videoID=videoID+"&v=1.7.0"
        $("#pick_file").attr("data-id",videoID);
        getDuration(videoID);
    }else{
        alert(src);
    }
//            获取秒
    $("#fileProgressDiv").hide();
    $("#fileProgressTip").html("");
    $("#fileProgress").css("width","0");
    successTxt();
}
//        格式分秒
function formatTime(seconds) {
    var min = Math.floor(seconds / 60),
            second = seconds % 60,
            hour, newMin, time;

    if (min > 60) {
        hour = Math.floor(min / 60);
        newMin = min;
    }
    if (second < 10) { second = '0' + second;}
    if (min < 10) { min = '0' + min;}
    return time ={'min':min,'second':second};
}
//上传失败
function Upload_error(){
    $("#fileProgressDiv").hide();
    $("#fileProgressTip").html("");
    $("#fileProgress").css("width","0");
    errTxt("上传失败");
};