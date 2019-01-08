app
    .directive('navbar', function() {
        return {
            restrict: 'EA',
            scope: {
                isOnline : '=?', //Switcher on/off
                appMode : '@?'
                
            },
            templateUrl: 'shared/navbar/navbar.html',

            link : function (scope, element, attrs) {
                
                //Init attributes
                scope.isOnline = scope.isOnline || false;
                scope.appMode = scope.appMode || 'client';
                

            }
        };
    });