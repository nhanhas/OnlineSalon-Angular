app
    .directive('navbar', function() {
        return {
            restrict: 'EA',
            scope: {
                isOnline : '=?', //Switcher on/off
                appMode : '@?',
                setOnlineStatus : '&?' //only in 'pro' mode
                
            },
            templateUrl: 'shared/navbar/navbar.html',

            link : function (scope, element, attrs) {
                
                //Init attributes
                scope.isOnline = scope.isOnline || false;
                scope.appMode = scope.appMode || 'client';
                
                if (!attrs.setOnlineStatus) {
                    scope.setOnlineStatus = undefined;
                }

                //Set professional status ('pro' mode)
                scope.onSetOnlineStatus = function(){                    
                    scope.setOnlineStatus({ newStatus: !scope.isOnline });
                } 

            }
        };
    });