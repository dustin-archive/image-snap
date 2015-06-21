# Image Snap - 1.0.2
# June 20, 2015
# The MIT License (MIT)
# Copyright (c) 2015 Dustin Dowell
# github.com/dustindowell22/image-snap
# ==============================================


(($) ->
  $.fn.imageSnap = (sourceAttribute = 'src', verticalMargin = 0, horizontalMargin = 0) ->

    # Loop through images
    $(this).each ->

      # Cache this object
      $image = $(this)

      # Image source
      source = $image.attr(sourceAttribute)

      # Font size
      fontScale = parseFloat($image.css('font-size')) / 16
      lineHeight = parseFloat($image.css('line-height'))

      # Margins
      horizontalMargin = horizontalMargin * fontScale
      verticalMargin = verticalMargin * fontScale

      # Create image element
      $('<img>').attr('src', source).load ->

        # Native image dimensions multiplied by fontScale
        # Note: $(this) won't work on in-memory images
        nativeWidth = (this.width * fontScale) - horizontalMargin
        nativeHeight = (this.height * fontScale) - verticalMargin

        # New image dimensions
        ratio = nativeWidth / nativeHeight
        newHeight = Math.floor((nativeWidth / ratio) / lineHeight) * lineHeight

        # Apply new image dimensions
        $image.css('height', newHeight + 'px')

      # Load image
      $image.attr('src', source)

    # Allow chaining
    return this

) jQuery
