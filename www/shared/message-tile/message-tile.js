app
    .directive('messageTile', function() {
        return {
            restrict: 'EA',
            scope: {
                message : '=', //contains all info about single message
                onDismiss : '&?'
            },
            templateUrl: 'shared/message-tile/message-tile.html',

            link : function (scope, element, attrs) {
                
                //Init attributes
                if (!attrs.onDismiss) {
                    scope.onDismiss = undefined;
                }               

                //Dismiss message
                scope.onDismissMessageHandler = function(){
                    scope.onDismiss();
                } 

            }
        };
    });