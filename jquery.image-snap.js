// Image Snap - 1.0.1
// Febuary 11, 2015
// The MIT License (MIT)
// Copyright (c) 2015 Dustin Dowell
// http://github.com/dustindowell22/image-snap
// =============================================


(function($) {
  $.fn.imageSnap = function(options) {

    // Store object
    var $this = $(this);

    // Settings
    var settings = $.extend({
      imageSourceAttribute : 'data-src',
      verticalMargin       : 16,
      horzontalMargin      : 16
    }, options);

    // Loop through images
    function imageSnap() {
      $this.each(function() {

        // Store object
        var $image = $(this);

        // Image source
        var imageSrc = $image.attr(settings.imageSourceAttribute);

        // Store styles
        var lineHeight = parseInt($image.css('line-height')),
            fontSize = parseInt($image.css('font-size'));

        // Create image element
        $('<img>').attr('src', imageSrc).load(function() {

          // Font Scale
          var fontScale = fontSize / 16;

          // Margins
          var horizontalMargin = settings.horzontalMargin * fontScale,
              verticalMargin = settings.verticalMargin * fontScale;

          // Native image dimensions mutiplied by fontScale
          // Note: $(this) won't work on in-memory images
          var nativeWidth = (this.width * fontScale) - horizontalMargin,
              nativeHeight = (this.height * fontScale) - verticalMargin;

          // Calculate new image dimensions
          var imageRatio = nativeWidth / nativeHeight,
              newHeight = Math.floor((nativeWidth / imageRatio) / lineHeight) * lineHeight;

          // Calculate image width percentage of parent width
          var parentWidth = $image.parent().width(),
              newWidthPercentage = (newHeight * imageRatio) / parentWidth;

          // Apply new image dimensions
          if( newWidthPercentage > (2/3) ) {
            $image.css({
              width: '100%',
              height: 'auto'
            });
          }
          else {
            $image.css({
              width: 'auto',
              height: newHeight + 'px'
            });
          }
        });

        // Load image
        $image.attr('src', imageSrc);
      });
    }

    // Execute during runtime
    imageSnap();

    // Execute on resize
    $(window).on('resize orientationchange', imageSnap);
  };
}(jQuery));
