app
    .directive('serviceTile', function() {
        return {
            restrict: 'EA',
            scope: {
                service : '=', //contains all info about single service
                onDismiss : '&?'
            },
            templateUrl: 'shared/service-tile/service-tile.html',

            link : function (scope, element, attrs) {
                
                //Note: message.status can be [confirmed, rejected, waiting]

                //Init attributes
                if (!attrs.onDismiss) {
                    scope.onDismiss = undefined;
                }               

                //Dismiss service
                scope.onDismissMessageHandler = function(){
                    scope.onDismiss();
                } 

            }
        };
    });