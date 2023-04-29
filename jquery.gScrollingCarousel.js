(function($) {
    $.fn.extend({
      gScrollingCarousel: function(options) {
        var defaults = {
          mouseScrolling: true,
          scrollAmount: 'viewport',
          draggable: true,
          snapOnDrag: true,
          mobileNative: true,
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

        function getMaxScrollLeft(carousel){
          return carousel.get(0).scrollWidth - carousel.get(0).clientWidth;
        }
        function updateNavigationVisibility(carousel) {
          var maxScrollLeft = getMaxScrollLeft(carousel);
          var left = carousel.scrollLeft();
          carousel.data("leftElem").css("display", left == 0 ? "none" : "inline-block");
          carousel.data("rightElem").css("display", left >= maxScrollLeft ? "none" : "inline-block");
        }
  
        function handleClickNavigation(carousel, direction) {
          var firstElemWidth = carousel.data("firstElemWidth");
          var firstElemMargin = carousel.data("firstElemMargin"); 
          var currentScrollLeft = carousel.scrollLeft();
          var itemsPerViewport = Math.floor((carousel.width() - firstElemWidth + firstElemMargin) / firstElemWidth) + 1;
          var amountToScroll = options.scrollAmount === 'viewport' ? itemsPerViewport * firstElemWidth : firstElemWidth;
          var scrollAmount = currentScrollLeft % firstElemWidth;
          var newScrollPosition;
          if (direction === 1) {
            if (scrollAmount === 0) {
              newScrollPosition = currentScrollLeft + amountToScroll;
            } else {
              var partiallyVisibleItemWidth = firstElemWidth - scrollAmount;
              newScrollPosition = currentScrollLeft + (amountToScroll + partiallyVisibleItemWidth);
            }
          } else {
            if (scrollAmount === 0) {
              newScrollPosition = currentScrollLeft - amountToScroll;
            } else {
              var partiallyVisibleItemWidth = firstElemWidth - scrollAmount;
              newScrollPosition = currentScrollLeft - (amountToScroll - partiallyVisibleItemWidth);
            }
          }
  
          carousel.stop(true).animate({ scrollLeft: newScrollPosition }, 200, function() {
            if(newScrollPosition <= getMaxScrollLeft(carousel)){
              var snapIndex = Math.round(carousel.scrollLeft() / carousel.data("firstElemWidth"));
              var snapPosition = snapIndex * carousel.data("firstElemWidth");
              carousel.scrollLeft(snapPosition);
            }

            updateNavigationVisibility(carousel);
          });
        }
  
  
        function getFirstElemWidth(carousel) {
          var firstElem = carousel.children(":first");
          var marginRight = parseInt(firstElem.css("marginRight"));
          return firstElem.width() + marginRight;
        }
  
        function getFirstElemMargin(carousel) {
          var firstElem = carousel.children(":first");
          return parseInt(firstElem.css("marginRight"));
        }
  

        return this.each(function() {
          var carousel = $(this);
          if (!supportsTouch || !options.mobileNative){
            var leftElem = $('<span />').addClass('jc-left').html('<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>');
            var rightElem = $('<span />').addClass('jc-right').html('<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>');
    
            carousel.parent().append(leftElem).append(rightElem);
            carousel.data("leftElem", leftElem);
            carousel.data("rightElem", rightElem);
            carousel.data("firstElemWidth", getFirstElemWidth(carousel));
            carousel.data("firstElemMargin",getFirstElemMargin(carousel));
    
            leftElem.on("click", function() {
              handleClickNavigation(carousel, -1);
            });
    
            rightElem.on("click", function() {
              handleClickNavigation(carousel, 1);
            });
    
            updateNavigationVisibility(carousel);

            if (options.mouseScrolling) {
              var firstElemWidth = carousel.data("firstElemWidth");
              var scrollAmount;
              carousel.on("wheel", function(event) {
                event.preventDefault();
                carousel.scrollLeft (scrollAmount);
                var deltaY = event.originalEvent.deltaY;
                var direction = deltaY > 0 ? 1 : -1;
                if(direction==1){
                  scrollAmount = $(this).scrollLeft() + firstElemWidth;
                } else {
                  scrollAmount = $(this).scrollLeft() - firstElemWidth;
                }
                carousel.stop(true).animate({ scrollLeft: scrollAmount }, 100, function() {
                  updateNavigationVisibility(carousel);
                });
              });
            }

            if (options.draggable) {
              var down,startX,startScrollLeft,newScrollPosition,isDragging;
              carousel.on("mousedown.gScrollingCarousel", function(e) {
                e.preventDefault();
                startX = e.pageX;
                startScrollLeft = carousel.scrollLeft();
      
                carousel.on("mousemove.gScrollingCarousel", function(e) {
                    if(e.pageX != startX){
                        isDragging = true;
                        var deltaX = e.pageX - startX;
                        newScrollPosition = startScrollLeft - deltaX
                        carousel.scrollLeft(newScrollPosition);
                    }
                });
      
                $(document).on("mouseup.gScrollingCarousel", function() {
                  carousel.off("mousemove.gScrollingCarousel");
                  $(document).off("mouseup.gScrollingCarousel");
                  if (options.snapOnDrag && newScrollPosition < getMaxScrollLeft(carousel)) {
                    var snapIndex = Math.round(carousel.scrollLeft() / carousel.data("firstElemWidth"));
                    var snapPosition = snapIndex * carousel.data("firstElemWidth");
                    carousel.stop(true).animate({ scrollLeft: snapPosition }, 200, function() {
                      updateNavigationVisibility(carousel);
                    });
                  } else {
                    updateNavigationVisibility(carousel);
                  }
                });
              });
              carousel.on("mouseup mousedown click", function(e){  //prevent clicking while moving
                if(isDragging) {
                  e.preventDefault();
                  setTimeout(function(){
                    isDragging = false;
                  },1);
                }
              });
            }
          } else {
            carousel.css("overflow-x","scroll")
          }
        });
      }
    });
  })(jQuery);