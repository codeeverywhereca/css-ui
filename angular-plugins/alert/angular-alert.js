/*
 * angular-alert (July 16 2016)
 * https://github.com/codeeverywhereca/css-ui/tree/master/angular-plugins/alert
 * Copyright 2016, http://codeeverywhere.ca
 * Licensed under the MIT license.
 */

app.service('AlertBox', ['$timeout', '$document', '$q', '$compile', '$rootScope', function($timeout, $document, $q, $compile, $rootScope) {

    var body = $document.find('body');

    var open = function(AlertBoxObj) {

        var alertHtml = '' +
            '<div class="angular-AlertBox background animated fadeIn">' +
            '	<div class="body animated bounceIn">' +
            '		<div class="close" ng-click="cancelClick();">&times;</div>' +
            '		<div class="title">{{ title }}</div>' +
            //'		<div class="message" ng-bind-html="content"></div>' + -- $sce.trustAsHtml
            '		<div class="message">' + AlertBoxObj.content + '</div>' +
            '		<div class="actions">' +
            '			<a ng-if="showCancelBtn" ng-click="cancelClick()" class="cancel">cancel</a>' +
            '			<a ng-click="okClick()" class="ok">ok</a>' +
            '		</div>' +
            '	</div>' +
            '</div>';

        var deffered = $q.defer();

        var scope = $rootScope.$new(true);

        if (AlertBoxObj.cancel === undefined || AlertBoxObj.cancel == null)
            scope.showCancelBtn = false;
        else
            scope.showCancelBtn = true;

        scope.title = AlertBoxObj.title || "alert";
        scope.ok = AlertBoxObj.ok || "ok";
        scope.cancel = AlertBoxObj.cancel || "cancel";

        scope.okClick = function() {
            deffered.resolve(scope);
            close();
        };

        scope.cancelClick = function() {
            deffered.reject(scope);
            close();
        };

        body.append(alertHtml);

        var el = angular.element($document[0].getElementsByClassName('angular-AlertBox')[0]);

        $compile(el)(scope);

        body.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;

            if (keyCode == 27) {
                deffered.reject(scope);
                close();
            }
        });

        return deffered.promise;
    };

    var close = function() {

        var el = angular.element($document[0].getElementsByClassName('angular-AlertBox')[0]);
        body.unbind("keydown keypress");
        angular.element(el.children()[0]).addClass('animated bounceOut');
        $timeout(function() {
            el.remove();
        }, 750);

    };

    return ({
        alert: open,
        confirm: open
    });
}]);
