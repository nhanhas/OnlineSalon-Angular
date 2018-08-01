app
    .directive('navFooter', function() {
        return {
            restrict: 'EA',
            scope: {
                messages : '=?', // number of messages
                services : '=?',  // number of services
                openMessages : '&',
                openServices : '&',
                openFavorites: '&'
            },
            templateUrl: 'shared/nav-footer/nav-footer.html',

            link : function (scope, element, attrs) {
                
                //Init attributes
                scope.isDisabled = scope.messages || 0;
                scope.isDisabled = scope.services || 0;

                if (!attrs.openMessages) {
                    scope.openMessages = undefined;
                }
                if (!attrs.openServices) {
                    scope.openServices = undefined;
                }
                if (!attrs.openFavorites) {
                    scope.openFavorites = undefined;
                }

                //Open Menu
                scope.onOpenMessagesHandler = function(){
                    scope.openMessages();
                }   

                //Expand Filter
                scope.onOpenServicesHandler = function(){
                    scope.openServices();
                }

                //Open Menu
                scope.onOpenFavoritesHandler = function(){
                    scope.openFavorites();
                }   

            }
        };
    });