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
        if(!detectmob()){
            // Background video
            var BV = new $.BigVideo({ useFlashForFirefox: false });
            BV.init();
            BV.show([
                { type: "video/mp4",  src: "/medias/snow.mp4" },
                { type: "video/webm", src: "/medias/snow.webm" },
                { type: "video/ogg",  src: "/medias/snow.ogg" }
                ], { ambient: false, doLoop: true });
        }

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

    function detectmob() {
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ){
            return true;
        }
        else {
            return false;
        }
    }

})(jQuery);
