/* global jQuery */
(function($) {
    'use strict';

    var utils = function() {
        return {
            createNodes: function(list) {
                var result = {};

                for(var key in list) {
                    result[key] = $(list[key]);
                }

                return result;
            }
        };
    };
})(jQuery);
