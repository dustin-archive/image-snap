// Image Snap
// November 7, 2014
// The MIT License (MIT)
// Copyright (c) 2014 Dustin Dowell
// http://github.com/dustindowell22/image-snap


$( function() {
	function imageSnap() {
		$( 'p img' ).each( function() {

			// Stores the selector
			var $image = $( this );

			// Store image source
			var imageSrc = $image.attr('data-src');

			// Variables
			var parentWidth = parseInt( $image.parent().css( 'width' ) );
			var lineHeight = parseInt( $image.parent().css( 'line-height' ) );

			//console.log( 'parentWidth ' + parentWidth );
			//console.log( 'lineHeight ' + lineHeight );

			// Create new image in memory
			// Set image source
			// Execute on image load
			$( '<img>' ).attr( 'src', imageSrc ).load( function() {

				// Store native image dimensions
				var nativeWidth = this.width; // $( this ) won't work for in memory images
				var nativeHeight = this.height;

				//console.log( 'nativeWidth ' + nativeWidth );
				//console.log( 'nativeHeight ' + nativeHeight );

				// Global Logic
				var imageRatio = nativeWidth / nativeHeight;
				var newHeight = Math.floor( ( nativeWidth / imageRatio ) / lineHeight ) * lineHeight;
				var newWidthPercentage = ( newHeight * imageRatio ) / parentWidth;

				//console.log( 'imageRatio ' + imageRatio );
				//console.log( 'newHeight ' + newHeight );
				//console.log( 'newWidthPercentage ' + newWidthPercentage );

				// Resize Image
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

	// Resize throttle
	var throttle;
	$( window ).resize( function() {
		clearTimeout( throttle );
		throttle = setTimeout( function() {
			$( this ).trigger( 'resizeThrottle' );
		}, 500);
	});

	// Execute function
	$( document ).on( 'ready', imageSnap );
	$( window ).on( 'resizeThrottle', imageSnap );
});
