/**
 * Created by Administrator on 2018/6/12.
 */
import axios from 'axios'
export function fetch(url, params = {}, config = {}) {
    let method = 'post';
    if(config && config.method){
        method = config.method;
    }
    let contentType = 'multipart/form-data';
    if(config && config.contentType){
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data:params,
            contentType: contentType
        }).then((response) => {
            //返回数据
            resolve(response.data);
        }, err => {
            reject(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export function get(url, params = {}) {
    if(Object.keys(params).length > 0){
        var queryString = '';
        for(var key in params){
            queryString += '&' + key + '=' + params[key];
        }
        queryString = queryString.substring(1);
        url += '?' + queryString;
    }
    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}
export function postParams(url, params = {}, config = {}) {
    let contentType = 'application/x-www-form-urlencoded';
    if(config && config.contentType){
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            params: params,
            headers: {
                "Content-Type":contentType
            }
        }).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    })
}
export function post(url, params = {}, config = {}) {
    let contentType = 'application/x-www-form-urlencoded';
    if(config && config.contentType){
        contentType = config.contentType;
    }
    let param = '';
    for(let i in params){
      param +=  i+'='+params[i]+'&';
    }
    if(param!=''){
      param=param.substring(0,param.length-1);
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: param,
            headers: {
                "Content-Type":contentType
            }
        }).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    })
}
export function upload(url, params = {}) {

    return new Promise((resolve, reject) => {
        axios({
            url: url,
            data: params,
            method: 'POST',
            contentType: 'multipart/form-data',
        }).then(function (res) {
            resolve(res.data);
        }).catch(function (error) {
            reject(error)
        });
    })
}
export default {
    fetch,
    upload,
    get,
    post,
    postParams
}
