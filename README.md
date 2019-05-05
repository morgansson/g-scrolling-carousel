# g-scrolling-carousel
A Google like jQuery scrolling carousel plugin.

# Why
Because there wasn't any jQuery carousel plugin with the functionality that I needed.

# How to use
```html
<script src="https/code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script> 
<script src="jquery.gScrollingCarousel.js"></script> 
<link href="jquery.gScrollingCarousel.css" rel="stylesheet" />
<script>
  $(".g-scrolling-carousel .items").gScrollingCarousel()
</script>

<div class="g-scrolling-carousel">
  <div class="items">
    <a href="http://example.com">Item #1</a>
    <a href="http://example.com">Item #2</a>
    <a href="http://example.com">Item #3</a>
  </div>
</div>
```
