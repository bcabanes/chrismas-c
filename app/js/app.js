/* global jQuery, zoom */
(function($) {
    'use strict';


    // Detect IE
    if(window.ActiveXObject || "ActiveXObject" in window){
        // Always true if browser is Internet Explorer
        document.write('Too bad! You\'re using Internet Explorer ... Pfff');



        
    }else{
        // Background video
        var BV = new $.BigVideo({useFlashForFirefox:false});
        BV.init();
        BV.show('/medias/snow.mp4', { ambient: true });

        // Init zoom function
        zoom.init();
    }

})(jQuery);
