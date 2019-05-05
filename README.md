# g-scrolling-carousel
A Google like jQuery scrolling carousel plugin.

# Why
Because there wasn't any jQuery carousel plugin with the functionality that I needed.

# How to use
```html
<html>
<head>
  <link href="jquery.gScrollingCarousel.css" rel="stylesheet" />
    <style>
        body{
            padding: 5px 13px;
        }
        .g-scrolling-carousel .items{
            padding: 5px 0;
        }
        .g-scrolling-carousel .items a{
            display: inline-block; /* notice the comments between inline-block items */
            margin-right: 10px;
            width: 70px;
            height: 50px;
            box-shadow: 0 0 5px #000;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="g-scrolling-carousel">
  <div class="items">
    <a href="http://example.com">Item #1</a><!--
    --><a href="http://example.com">Item #2</a><!--
    --><a href="http://example.com">Item #3</a><!--
    --><a href="http://example.com">Item #4</a><!--
    --><a href="http://example.com">Item #5</a><!--
    --><a href="http://example.com">Item #6</a><!--
    --><a href="http://example.com">Item #7</a><!--
    --><a href="http://example.com">Item #8</a><!--
    --><a href="http://example.com">Item #9</a><!--
    --><a href="http://example.com">Item #10</a><!--
    --><a href="http://example.com">Item #11</a><!--
    --><a href="http://example.com">Item #12</a><!--
    --><a href="http://example.com">Item #13</a><!--
    --><a href="http://example.com">Item #14</a><!--
    --><a href="http://example.com">Item #15</a><!--
    --><a href="http://example.com">Item #16</a><!--
    --><a href="http://example.com">Item #17</a><!--
  --></div>
</div>

<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script> 
<script src="jquery.gScrollingCarousel.js"></script> 
<script>
  $(document).ready(function(){
    $(".g-scrolling-carousel .items").gScrollingCarousel();
  });
</script>
</body>
</html>
```
