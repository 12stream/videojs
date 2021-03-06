/**
 * Created by Administrator on 2018/7/26.
 */
import axios from 'axios'
export function get(url, params = {}) {
  if (Object.keys(params).length > 0) {
    var queryString = '';
    for (var key in params) {
      queryString += '&' + key + '=' + params[key];
    }
    queryString = queryString.substring(1);
    url += '?' + queryString;
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url:url,
    }).then((response) => {
      resolve(response.data);
    }, err => {
      reject(err);
    })
      .catch((error) => {
        ;
        reject(error)
      })
  })
}

export function post(url, params = {}, config = {}) {
  let contentType = 'application/x-www-form-urlencoded';
  if (config && config.contentType) {
    contentType = config.contentType;
  }
  let param = '';
  for (let i in params) {
    param += i + '=' + params[i] + '&';
  }
  if (param != '') {
    param = param.substring(0, param.length - 1);
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      contentType: contentType,
      data: param
    }).then((response) => {
      if (response.status == -1) {
      } else if (response.status == 0) {
        resolve(response.data);
      } else if (response.status == 200) {
        resolve(response.data);
      } else {
		alert('接口异常');
	  }
    }, err => {
      reject(err);
      pop();
    }).catch((err) => {
      console.log(err);
    })
  })
}

export function fetch(url, params = {}, config = {}) {
  let method = 'post';
  if (config && config.method) {
    method = config.method;
  }
  let contentType = 'multipart/form-data';
  if (config && config.contentType) {
    contentType = config.contentType;
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: params,
      contentType: contentType
    }).then((response) => {
      ;
      //返回数据
      if (response.data.code == -1) {
        if (window.location.href.indexOf('#') > 0) {
          window.location.href = window.location.href.split("#")[0] + "#/login";
        }
      } else if (response.data.code == 0) {
        resolve(response.data);
      } else if (response.data.code == 200 || url.indexOf("queryGift.action") > -1 || url.indexOf("addGift.action") > -1 || url.indexOf("iBacService.action") > -1 || url.indexOf("updateGift.action") > -1) {
        resolve(response.data);
      }
    }, err => {
      reject(err);
      pop();
    })
      .catch((error) => {
        reject(error)
      })
  })
}

export function postParams(url, params = {}, config = {}) {
  let contentType = 'application/x-www-form-urlencoded';
  if (config && config.contentType) {
    contentType = config.contentType;
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      params: params,
      headers: {
        "Content-Type": contentType
      }
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      console.log(err);
    })
  })
}

export default {
  get,
  post,
  fetch
}
