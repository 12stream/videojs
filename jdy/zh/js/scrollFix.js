/**
 * Created by Administrator on 2017/7/27.
 */
/**
 * ScrollFix v0.1
 */

var ScrollFix = function(elem) {
    // Variables to track inputs
    var startY = startTopScroll = deltaY = undefined,

        elem = elem || elem.querySelector(elem);

    // If there is no element, then do nothing
    if(!elem)
        return;

    // Handle the start of interactions
    elem.addEventListener('touchstart', function(event){
        startY = event.touches[0].pageY;
        startTopScroll = elem.scrollTop;

        if(startTopScroll <= 0)
            elem.scrollTop = 1;

        if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
            elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }, false);
};