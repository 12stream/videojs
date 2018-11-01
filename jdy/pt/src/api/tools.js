export function formatDate(date){
    let seperator1 = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate
}
export  function funDate (date){//获取前后几天的日期
    let date1 = new Date();
    let time1 = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    let date2 = new Date(date1);
    date2.setDate(date1.getDate()+date);
    let time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
    return time2;
}
function timestampToTime(timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D+h+m+s;
}
function getLStorage(name) {
    return sessionStorage.getItem(name)
}
function setLStorage(name, value) {
    return sessionStorage.setItem(name, value)
}
function copyLink(id) {
    console.log(id,'id');
    var url = document.getElementById(id)
    console.log(copyLink, url)
    url.select()
    document.execCommand("copy")
}
function getCreateTime(){
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentTime = "现在是:" + year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second ;
    return currentTime;
}
export default {
    formatDate,
    funDate,
    timestampToTime,
    getLStorage,
    setLStorage,
    copyLink,
    getCreateTime
}