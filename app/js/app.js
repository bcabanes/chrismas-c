/* global window, navigator, jQuery, zoom */
(function($) {
    'use strict';


    var experience = $('.experience'),
        movie = $('.movie');

    var isIe = detectIe(),
        isUnderIos8 = isUnderIos8();

    if(isIe || isUnderIos8){
        experience.remove();
        movie.show();
        setMovieDimensions();
        $(window).on('resize', setMovieDimensions);

    }else{
        // Background video
        var BV = new $.BigVideo({ useFlashForFirefox: false });
        BV.init();
        BV.show('/medias/snow.mp4', { ambient: true });

        // Init zoom function
        zoom.init();
    }


    function setMovieDimensions() {
        'use strict';
        var iframe = movie.children('iframe');
        iframe.height($(window).height());
        iframe.width($(window).width());
    }

    function detectIe() {
        'use strict';
        if(window.ActiveXObject || 'ActiveXObject' in window){ return true; }
        else{ return false; }
    }

    function isUnderIos8() {
        'use strict';
        if(navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 8_\d/i)){ return false; } // Is ios8
        else if(navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)){ return true; } // Is uneder ios8
        else{ return false; } // Is not ios
    }

})(jQuery);
