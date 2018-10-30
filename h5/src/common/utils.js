export function setTitle(title) {
    document.title = title
    // //hack在微信等webview中无法修改document.title的情况
    //   var $body = $('body')
    //   var $iframe = $('<iframe class="hide" src="/favicon.ico"></iframe>').on('load', function () {
    //     setTimeout(function () {
    //       $iframe.off('load').remove()
    //     }, 0)
    //   }).appendTo($body)
  }
  
  export function converDate(date) {
    if (Object.prototype.toString.call(date) === '[object String]') {
      return new Date(date.replace(/-/g, '/'))
    }
    if (Object.prototype.toString.call(date) === '[object Number]') {
      return new Date(date)
    }
    return date
  }