$(document).ready(function() {
	// cache window object
	$window = $(window);

	// cache offseyY, Xposition and speed of sprites
	$("[data-type]").each(function() {
		$(this).data("offsetY", parseInt($(this).attr("data-offsetY")));
		$(this).data("Xposition", $(this).attr("data-Xposition"));
		$(this).data("speed", $(this).attr("data-speed"));
	}); // end data-type

	// for each data-type element
	$("section[data-type='background']").each(function() {
		// variables to cache where we are
		var $self = $(this),
				offsetCoords = $self.offset(),
				topOffset = offsetCoords.top;
		// effects for scrolling the window
		$(window).scroll(function() {
			// section that's in view
			if (($window.scrollTop() + $window.height()) > (topOffset) &&
				 ((topOffset + $self.height()) > $window.scrollTop())) {
				// scroll the background at the speed of var
				// yPos is negative because scrolling up
				var yPos = -($window.scrollTop() / $self.data("speed"));

				// if element has Y offset then add it on
				if ($self.data("offsetY")) {
					yPos += $self.data("offsetY");
				}

				// put together our final background position
				var coords = "50% " + yPos + "px";

				$self.css({ backgroundPosition: coords });

				// check for other sprites in the section
				$("[data-type='sprite']", $self).each(function() {
					// cache sprite
					var $sprite = $(this);

					// use same calculation to scroll sprite
					var yPos = -($window.scrollTop() / $sprite.data("speed"));
					var coords = $sprite.data("Xposition") + " " + (yPos + $sprite.data("offsetY")) + "px";

					$sprite.css({ backgroundPosition: coords });
				}); // end sprite
			} // end if
		}); // end window scroll
	}); // end data-type element
}); // end document ready