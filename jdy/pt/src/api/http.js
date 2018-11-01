// export default function axiosHttp(url, params) {
//     return axios.get(url, params).then(function(response) {
//         if (response.code == 200) {
//             console.log(response)
//             return response
//         }
//     }).catch(function(err) {
//         console.log(err)
//         return err
//     })
// }

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(respone => {
                console.log('success api');
                resolve(response);
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

export function setDate(date, time) {
    console.log(time)
    var month = date.getMonth() + 1
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var strDate = date.getDate()
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var strTime = time.getMinutes()
    if (strTime >= 0 && strTime <= 9) {
        strTime = "0" + strTime;
    }
    var currentdate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + time.getHours() + ':' + strTime + ':' + time.getSeconds();
    console.log(currentdate)
    return currentdate
}

export function setDateTime(datetime1, type) {
    let datetime = new Date(datetime1)
    var month = datetime.getMonth() + 1
    if (!type) {
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
    }
    var strDate = datetime.getDate()
    if (!type) {
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
    }
    var getHours = datetime.getHours()
    if (!type) {
        if (getHours >= 0 && getHours <= 9) {
            getHours = "0" + getHours;
        }
    }
    var strTime = datetime.getMinutes()
    if (!type) {
        if (strTime >= 0 && strTime <= 9) {
            strTime = "0" + strTime;
        }
    }
    var getSeconds = datetime.getMinutes()
    if (getSeconds >= 0 && getSeconds <= 9) {
        getSeconds = "0" + getSeconds;
    }
    if (type) {
        return datetime.getFullYear() + "年" + month + "月" + strDate + "日，" + getHours + "点" + strTime + "分"
    } else {
        return datetime.getFullYear() + "-" + month + "-" + strDate + " " + getHours + ":" + strTime + ":" + getSeconds
    }
}

export function filterObj(obj) {
    let i
    for (i in obj) {
        if (obj[i] === undefined || obj[i] === null || obj[i] === '') {
            delete obj[i]
        }
    }
    return obj
}
export function copyData(data) {
    var obj = {}
    obj = JSON.parse(JSON.stringify(data))
    return obj
}

export function filterStatus(obj) {
    let i
    for (i in obj) {
        // if (obj[i].live_switch == 1) {
        //     obj[i].live_switch = false
        // } else {
        //     obj[i].live_switch = true
        // }
        if (obj[i].live_switch == 0) {
            obj[i].live_switch = false
        } else {
            obj[i].live_switch = true
        }
    }
    return obj
}

export function getNewTime() {
    // 获取当前时间 毫秒数
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + month + strDate +
        date.getHours() + date.getMinutes() +
        date.getSeconds();
    return currentdate;
}
export function getCurrentTime(){
    var date = new Date();                      
    var currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()+' - 23:59:00'
    console.log(currentTime)
    return currentTime

}


import axios from 'axios'
import { DATA_URL } from 'api/config'
export function axiosData(data, url) {
    return axios({
        method: 'post',
        url: url,
        // url: DATA_URL + url,
        data: data
            // headers: { "Content-Type": "application/json;charset=utf-8" }
            // headers: {'Content-Type': 'multipart/form-data'}
    })
}