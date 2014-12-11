(function($) {
    'use strict';

    // Background video
    var BV = new $.BigVideo();
    BV.init();
    BV.show('/medias/snow.mp4', { ambient: true });

    // Init zoom function
    zoom.init();

})(jQuery);
