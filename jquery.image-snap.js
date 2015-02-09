// Image Snap
// November 12, 2014
// The MIT License (MIT)
// Copyright (c) 2014 Dustin Dowell
// http://github.com/dustindowell22/image-snap


(function( $ ) {
  $.fn.imageSnap = function( imageSourceAttribute ) {

    // ====================
    // Preferences
    // ====================

      // Image selector
      var imageSelector = $( this );

      // Image source attribute
      // Note:
      // + This should be set to 'src' or 'data-src'.
      // + Setting this to 'data-src' will require you to use 'data-src' on all images that you want to use with Image Snap.
      // + Setting this to 'src' may load each image an additional time in some browsers. Others may check the cache first.
      if( imageSourceAttribute === undefined ) {
        imageSourceAttribute = 'data-src';
      }

    // ====================


    function imageSnap() {
      $( imageSelector ).each( function() {

        // This selector
        var $image = $( this );

        // Image source
        var imageSrc = $image.attr( imageSourceAttribute );

        // Variables
        var parentWidth = parseInt( $image.parent().css( 'width' ) );
        var lineHeight = parseInt( $image.css( 'line-height' ) );

        // Creates new image in-memory, sets image source and executes on image load
        $( '<img>' ).attr( 'src', imageSrc ).load( function() {

          // Native image dimensions
          // Note: $( this ) won't work on in memory images.
          var nativeWidth = this.width;
          var nativeHeight = this.height;

          // Logic
          var imageRatio = nativeWidth / nativeHeight;
          var newHeight = Math.floor( ( nativeWidth / imageRatio ) / lineHeight ) * lineHeight;
          var newWidthPercentage = ( newHeight * imageRatio ) / parentWidth;

          // Resize image
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
        $image.attr( 'src', imageSrc );
      });
    }

    // Execute function
    $( document ).on( 'ready', imageSnap );
    $( window ).on( 'resize', imageSnap );
  };
}( jQuery ));
