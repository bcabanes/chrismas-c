/* global jQuery, _, utils */
var zoom = (function($) {
    'use strict';

    // Private attributes
    var selectors = {
            document: document,
            window: window,
            body: 'body, html',
            scene: '.scene',
            layers: '.layer',
            depth: '.scene__depth',
            menu: '.primary-menu',
            anchor: 'a[href^="#"]',
            audio: 'audio',
            backgroundWhite: '.background.white',
            happyHolidays: '.happy-holidays',
            textHolidays: '.text-holidays'
        },
        classes = { activeMenu: 'active' },
        distance = 500,
        current = {
            scroll: 0,
            layer: 0,
            progress: 0,
            menu: ''
        },
        depth,
        layers,
        nodes;


    // Private methodes
    function zoomScene() {
        // Get scroll, cap within bounds
        var scroll = nodes.window.scrollTop();
        scroll = scroll >= 0 ? (scroll <= depth ? scroll : depth) : 0;

        // Set currents
        current.layer = (scroll / distance) || 0;
        current.progress = (scroll - (current.layer * distance)) / distance;
        current.overallProgress = (scroll / (distance * layers));
        current.scroll = scroll;

        // Adjust scene
        setZPosition(nodes.scene, scroll);

        // Hide white background
        setOpacity(nodes.backgroundWhite, 700, 750);

console.log(current.scroll);
        // Hide happy holidays
        setOpacity(nodes.happyHolidays, 3300, 3500);
        // Display
        setOpacity(nodes.textHolidays, 3400, 3600, true);
    }

    function setZPosition(element, z) {
        element.css({
            '-webkit-transform': 'translate3d(0, 0, ' + z + 'px)',
            '-moz-transform': 'translate3d(0, 0, ' + z + 'px)',
            'transform': 'translate3d(0, 0, ' + z + 'px)',
        });
    }

    function setOpacity(element, min, max, reverse) {
        var opacity = 1;
        if (current.scroll >= min && current.scroll <= max) {
            opacity = (current.scroll >= min ? (current.scroll <= max ? (max - current.scroll) / (max - min) : 0) : 1);
        } else if (current.scroll < min) {
            opacity = 1;
        } else if (current.scroll > max) {
            opacity = 0;
        }
        element.toggle((reverse && current.scroll > min) || !reverse).css('opacity', (reverse ? 1 - opacity : opacity));
    }

    function setDepth() {
        layers = nodes.layers.length;
        depth = (distance * (layers - 1.8)) + nodes.window.height();
        nodes.depth.css('height', depth+'px');
    }

    // Public methodes
    return {
        init: function() {
            nodes = utils.createNodes(selectors);

            // Set environment depth
            setDepth();

            // Set initial position
            zoomScene();

            // Zooming
            var throttledZoom = _.throttle(zoomScene, 25);
            nodes.window.on('scroll', throttledZoom);

            // Resize
            nodes.window.on('resize', setDepth);
        }
    };
})(jQuery);
