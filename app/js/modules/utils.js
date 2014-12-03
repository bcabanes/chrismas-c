/* global jQuery */
var utils = (function($) {
    'use strict';
    return {
        createNodes: function(list) {
            var result = {};

            for(var key in list) {
                result[key] = $(list[key]);
            }

            return result;
        }
    };
})(jQuery);
