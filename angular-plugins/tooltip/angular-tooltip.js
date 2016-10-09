/*
 * angular-tooltip (April 21 2016)
 * https://github.com/codeeverywhereca/css-ui/tree/master/angular-plugins/tooltip
 * Copyright 2016, http://codeeverywhere.ca
 * Licensed under the MIT license.
 */

app.directive('tooltip', ['$timeout', '$window', function($timeout, $window) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {

            // Disable for IE8
            if ($window.navigator.userAgent.indexOf("MSIE 8") > -1) return false;

            // Create a unique id for targeting
            var uid = new Date().getTime();

            elem.on('mouseenter', function() {

                // Delete any existing tooltips first
                var tooltips = document.getElementsByClassName('angular-tooltip');
                for (var x = 0; x < tooltips.length; x++)
                    angular.element(tooltips[x]).remove();

                // Remove 'title' attr
                if (elem[0].getBoundingClientRect().width !== undefined)
                    elem.prop('title', '');

                // Get elem top/left position
                var top = (elem[0].getBoundingClientRect().top),
                    left = (elem[0].getBoundingClientRect().left) - 4;

                // Move tooltip to middle of elem ( -4px b/c size of arrow )
                left += Math.floor(elem[0].getBoundingClientRect().width / 2) - 4;

                // Append to body (bottom of HMTL)
                angular.element(document.body).append('<div id="angular-tooltip-' + uid +
                    '" class="angular-tooltip"><div class="angular-tooltip-text">' + attrs.title + '</div></div>');

                // Create tooltip selector
                var tooltip = angular.element(document.getElementById('angular-tooltip-' + uid));

                var tooltipWidth = tooltip[0].getBoundingClientRect().width - 18 - 2;

                var arrow = null;

                //check if obstructed
                if (top > tooltip[0].getBoundingClientRect().height + 25) {

                    // Position above
                    tooltip
                        .css('top', Math.floor(top - tooltip[0].getBoundingClientRect().height - 8 - 5) + 'px')
                        .css('left', Math.floor(left - Math.floor(tooltip[0].getBoundingClientRect().width / 2) + 8) + 'px')
                        .append('<div class="angular-tooltip-arrow-btm"></div>');

                    // Position ARROW
                    arrow = angular.element(angular.element(document.getElementById('angular-tooltip-' +
                        uid).getElementsByClassName('angular-tooltip-arrow-btm'))[0]);

                    arrow.css('margin-left', (tooltipWidth / 2) + 'px');

                } else {

                    // Position below
                    tooltip
                        .css('top', Math.floor(elem[0].getBoundingClientRect().height + top + 8) + 'px')
                        .css('left', Math.floor(left - Math.floor(tooltip[0].getBoundingClientRect().width / 2) + 8) + 'px');

                    // Add back top arrow to right direction
                    tooltip.prepend('<div class="angular-tooltip-arrow-top"></div>');

                    arrow = angular.element(angular.element(document.getElementById('angular-tooltip-' +
                        uid).getElementsByClassName('angular-tooltip-arrow-top'))[0]);

                    arrow.css('margin-left', (tooltipWidth / 2) + 'px');
                }

                //---
                if ((left < tooltip[0].getBoundingClientRect().width / 2)) {
                    var diff = left - (tooltip[0].getBoundingClientRect().width / 2);
                    tooltip.css('left', Math.floor(left - Math.floor(tooltip[0].getBoundingClientRect().width / 2) + 8 - diff) + 'px');
                    arrow.css('margin-left', ((tooltipWidth / 2) + diff) + 'px');
                }
                //---

                // If keypress on 'tooltip', close + remove listener
                angular.element(document).on('keypress', function(e) {
                    if ((e.keyCode || e.which) == 27) {
                        elem.triggerHandler('mouseleave');
                    }
                });
                // Add animation -- tooltip.addClass('animated fadeIn');
            });

            elem.on('mouseleave click', function() {

                // Add back 'title'
                elem.prop('title', attrs.title);

                var tooltip = angular.element(document.getElementById('angular-tooltip-' + uid));

                //check if defined, else return
                if (tooltip.length === 0) return;

                // For animation
                // setTimeout(function(){tooltip.remove();}, 2500);
                //tooltip.removeClass('bounceIn').addClass('fadeOutUp');

                tooltip.remove();
                angular.element(document).off('keypress');
            });
        }
    };
}]);
