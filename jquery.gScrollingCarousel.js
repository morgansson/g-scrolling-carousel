(function($) {
    $.fn.extend({
        gScrollingCarousel: function(options) {

            var defaults = {
                scrolling: true,
                amount: false
            };

            options = $.extend(defaults, options);

            var supportsTouch = false;

            if ('ontouchstart' in window){
                supportsTouch = true;
                } else if(window.navigator.msPointerEnabled) {
                supportsTouch = true;
                } else if ('ontouchstart' in document.documentElement) {
                supportsTouch = true;
            }

            if (!supportsTouch){
                var x,left,down,newX,oldX,maxScrollLeft,am,amX,amL,leftElem,rightElem,currx,items,element,elements;
                element = $(this);
                if(options.amount == false) {
                    amount = element.children(":first").outerWidth(true);
                }else{
                    amount = options.amount;
                }
                leftElem = $('<span />').addClass('jc-left').html('<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>');
                rightElem = $('<span />').addClass('jc-right').html('<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>');
                element.parent().append(leftElem).append(rightElem);

                maxScrollLeft = element.get(0).scrollWidth - element.get(0).clientWidth;
                left = element.scrollLeft();
                if(maxScrollLeft == left) {
                    rightElem.hide();
                } else {
                    rightElem.show();
                }
                if(left == 0) {
                    leftElem.hide();
                } else {
                    leftElem.show();
                }

                if(options.scrolling){
                    element.bind("DOMMouseScroll mousewheel", function (event) {    
                            var oEvent = event.originalEvent, 
                            direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta, 
                            position = element.scrollLeft();
                        position += direction > 0 ? -amount : amount;

                        $(this).scrollLeft(position);
                        event.preventDefault();
                        maxScrollLeft = element.get(0).scrollWidth - element.get(0).clientWidth;
                        left = element.scrollLeft();
                        if(maxScrollLeft == left) {
                            rightElem.fadeOut(200);
                        } else {
                            rightElem.fadeIn(200);
                        }
                        if(left == 0) {
                            leftElem.fadeOut(200);
                        } else {
                            leftElem.fadeIn(200);
                        }

                    });
                }
                element.bind("mousedown", function(e){
                    e.preventDefault();
                    down = true;
                    x = e.pageX;
                    left = $(this).scrollLeft();
                }).bind("mousemove", function(e){
                    if(down){
                        if(e.pageX != x){
                            element.addClass("nonclick");
                            newX = e.pageX;
                            oldX = element.scrollLeft();
                            element.scrollLeft(left-newX+x);  
                            maxScrollLeft = element.get(0).scrollWidth - element.get(0).clientWidth;
                            if(maxScrollLeft == oldX) {
                                rightElem.fadeOut(200);
                            } else {
                                rightElem.fadeIn(200);
                            }
                            if(oldX == 0) {
                                leftElem.fadeOut(200);
                            } else {
                                leftElem.fadeIn(200);
                            }
                        }
                    } else {
                        element.removeClass("nonclick");
                    }
                });
                rightElem.bind("click", function(e){
                  leftElem.fadeIn(200);
                  items = $(this).siblings(".items");
                  currx = items.scrollLeft();
                  amX = parseInt($(this).parent().width() / amount); // cantidad de elementos x viewport
                  am = (amX * amount) - amount;
                  maxScrollLeft = items.get(0).scrollWidth - items.get(0).clientWidth;
                  if(currx+am >= maxScrollLeft) $(this).fadeOut(200);
                  items.animate( { scrollLeft: '+='+am }, 200);
                });
                leftElem.bind("click", function(e){
                  rightElem.fadeIn(200);
                  items = $(this).siblings(".items");
                  currx = items.scrollLeft();
                  amX = parseInt($(this).parent().width() / amount); // cantidad de elementos x viewport
                  am = (amX * amount) - amount;
                  if(currx-am <= 0) $(this).fadeOut(200);
                  items.animate( { scrollLeft: '-='+am }, 200);
                });
                $(window).on('resize', function(){
                    element.each( function(){
                        elements = $(this);
                        maxScrollLeft = elements.get(0).scrollWidth - elements.get(0).clientWidth;
                        left = elements.scrollLeft();
                        if(maxScrollLeft == left) {
                            rightElem.fadeOut(200);
                        } else {
                            rightElem.fadeIn(200);
                        }
                        if(left == 0) {
                            leftElem.fadeOut(200);
                        } else {
                            leftElem.fadeIn(200);
                        }
                    });
                });
                $(document).on("mouseup mousedown click", ".nonclick a", function(e){  //prevent clicking while moving
                  e.preventDefault();
                });
                $(document).on("mouseup", function(e){ //globally remove nonclicks onmouseup
                    setTimeout(function(){
                        element.removeClass("nonclick");
                        down=false;
                    },1);
                });
            }
        }
    });
})(jQuery);
