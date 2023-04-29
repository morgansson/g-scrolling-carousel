# g-scrolling-carousel
A Google like jQuery scrolling carousel plugin.

# Why
Because there wasn't any jQuery carousel plugin with the functionality that I needed.

# Default options
```
{
  scrollAmount: 'viewport',
  mouseScrolling: true,
  draggable: true,
  snapOnDrag: true,
  mobileNative: true,
}
```
# How to use
```html
<html>
<head>
  <link href="jquery.gScrollingCarousel.css" rel="stylesheet" />
  <style>
      body{
          padding: 5px 13px;
      }
      .g-scrolling-carousel {
        width:607px;
        margin: 0 auto;
      }
      .g-scrolling-carousel .items > *{
        min-height:96px;
        margin-right:10px;
      }
      .g-scrolling-carousel .items a:last-child{
        margin-right:0;
      }
  </style>
</head>
<body>
  <div class="g-scrolling-carousel carousel">
    <div class="items">
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/1/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/2/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/3/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/4/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/5/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/6/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/7/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/8/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/9/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/10/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/11/144/96"></a>
      <a href="http://example.com" target="_blank"><img src="https://picsum.photos/seed/12/144/96"></a>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script> 
  <script src="jquery.gScrollingCarousel.js"></script> 
  <script>
    $(document).ready(function(){
      $(".g-scrolling-carousel .items").gScrollingCarousel({
        scrollAmount: 'viewport',
        mouseScrolling: true,
        draggable: true,
        snapOnDrag: true,
        mobileNative: true,
      });
    });
  </script>
</body>
</html>
```
