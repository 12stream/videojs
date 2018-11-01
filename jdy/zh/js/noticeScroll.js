; !function (factory) {
  "use strict";
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
      var target = module['exports'] || exports;
      factory(target);
  } else if (typeof define === 'function' && define['amd']) {
      define(['exports'], factory);
  } else {
      factory(window['noticeScroll'] = {});
  }
}(function (HExports) {
  var exports = typeof HExports !== 'undefined' ? HExports : {};

  var lastTime = 0;
  var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

  var requestAnimationFrame = window.requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;

  var prefix;
  var timer;
  //通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
  for( var i = 0; i < prefixes.length; i++ ) {
      if ( requestAnimationFrame && cancelAnimationFrame ) {
          break;
      }
      prefix = prefixes[i];
      requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
      cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
  }

  //如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
  if ( !requestAnimationFrame || !cancelAnimationFrame ) {
      requestAnimationFrame = function( callback, element ) {
          var currTime = new Date().getTime();
          //为了使setTimteout的尽可能的接近每秒60帧的效果
          var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
          var id = window.setTimeout( function() {
              callback( currTime + timeToCall );
          }, timeToCall );
          lastTime = currTime + timeToCall;
          return id;
      };

      cancelAnimationFrame = function( id ) {
          window.clearTimeout( id );
      };
  }

  //得到兼容各浏览器的API
  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;

  /**
   * 初始化
   * @param opt wrapID,contentID,content,speed
   */
  exports.init = function (opt) {
      opt = opt || {};
      var wrapID = opt.wrapID || 'noticeWrap',
          contentID = opt.contentID ||'noticeContent';
      this.wrap = document.getElementById(wrapID);
      this.start = document.getElementById(contentID);
      this.speed = opt.speed || 1;
  };

  exports.sendMsg = function (content) {
      if(this.wrap.scrollLeft == 0) {
          this.start.innerHTML = content;
          cancelAnimationFrame(timer)
          this.startScroll();
      } else {
        //   yst修复bug
        this.start.innerHTML = '';
        this.start.insertAdjacentHTML("beforeEnd",'<span class="appendContent">' + content + '</span>');
      }
  };

  exports.startScroll = function() {
      var that = this;
      if(that.wrap.scrollLeft == 0) {
          timer = requestAnimationFrame(function fn(){
              var curLeft = that.wrap.scrollLeft;
              that.wrap.scrollLeft = curLeft + that.speed;
              var newLeft = that.wrap.scrollLeft;
              if (curLeft === newLeft ) { // 利用scrollLeft存在边界值，若累加前和累加后的值相等，就可以判断已经达到最大值
                  that.wrap.scrollLeft = 0;
                  that.start.innerHTML = '';
                  cancelAnimationFrame(timer)
              } else {
                  requestAnimationFrame(fn);
              }
          });
      }
  };
});