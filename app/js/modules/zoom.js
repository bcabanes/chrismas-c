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
            anchor: 'a[href^="#"]'
        },
        classes = { activeMenu: 'active' },
        distance = 500,
        speed = 2000,
        current = {
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

        // Adjust scene
        setZPosition(nodes.scene, scroll);

        // update menu and layer
        setActive();
    }

    function setActive() {
        // update menu
        var position = current.layer + Math.round(current.progress);

        if(position !== current.menu) {
            var layer = $('.layer[data-depth="'+position*distance+'"]');
            nodes.menu.find('.'+classes.activeMenu).removeClass(classes.activeMenu);
            nodes.menu.find('a[href="'+layer.attr('id')+'"]');

            current.menu = position;
        }
    }

    function setZPosition(element, z) {
        element.css({
            '-webkit-transform': 'translate3d(0, 0, ' + z + 'px)',
            '-moz-transform': 'translate3d(0, 0, ' + z + 'px)',
            'transform': 'translate3d(0, 0, ' + z + 'px)',
        });
    }

    function scrollToLayer(target) {
        nodes.body.stop(true).animate({
            'scrollTop': target
        }, speed);
    }

    function setDepth() {
        layers = nodes.layers.length;
        depth = (distance * (layers - 1)) + nodes.window.height();
        nodes.depth.css('height', depth+'px');
    }

    return {
        init: function() {
            nodes = utils.createNodes(selectors);

            // Set environment depth
            setDepth();

            // Set layer z position
            $.each(nodes.layers, function() {
                var layer = $(this);

                setZPosition(layer, -layer.data('depth'));
            });

            // Set initial position
            zoomScene();

            // Zooming
            var throttledZoom = _.throttle(zoomScene, 25);
            nodes.window.on('scroll', throttledZoom);

            // Resize
            nodes.window.on('resize', setDepth);

            // Anchors
            nodes.anchor.on('click', function(event) {
                var target = $($(this).attr('href')).data('depth');
                scrollToLayer(target);
                event.preventDefault();
            });
        }
    };
})(jQuery);
