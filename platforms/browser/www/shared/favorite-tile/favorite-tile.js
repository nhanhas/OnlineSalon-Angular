app
    .directive('favoriteTile', function() {
        return {
            restrict: 'EA',
            scope: {
                layout : '@?', // [default, inline]
                favorite : '=', //contains all info about single favorite
                onBookNow : '&?',
                onSchedule : '&?',
                onDismiss : '&?'
            },
            templateUrl: 'shared/favorite-tile/favorite-tile.html',

            link : function (scope, element, attrs) {
                
                //Init attributes
                scope.layout = scope.layout || 'default';

                if (!attrs.onDismiss) {
                    scope.onDismiss = undefined;
                }               

                //On press book now
                scope.onBookNowHandler = function(){
                    scope.onBookNow({ favorite : scope.favorite });
                } 
                
                //On press schedule
                scope.onScheduleHandler = function(){
                    scope.onSchedule({ favorite : scope.favorite });
                } 

                //Dismiss favorite
                scope.onDismissMessageHandler = function(){
                    scope.onDismiss();
                } 

            }
        };
    });