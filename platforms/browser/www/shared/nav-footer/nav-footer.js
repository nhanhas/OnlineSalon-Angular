app
    .directive('navFooter', function() {
        return {
            restrict: 'EA',
            scope: {
                messages : '=?', // number of messages
                services : '=?',  // number of services
                openMessages : '&',
                openServices : '&',
                openFavorites: '&',
                openMenu : '&',
                expandFilter : '&'
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

                if (!attrs.openMenu) {
                    scope.openMenu = undefined;
                }
                if (!attrs.expandFilter) {
                    scope.expandFilter = undefined;
                }

                //Open Menu
                scope.onOpenMenuHandler = function(){
                    scope.openMenu();
                }   

                //Expand Filter
                scope.onExpandFilterHandler = function(){
                    scope.expandFilter();
                }

                //Open Messages
                scope.onOpenMessagesHandler = function(){
                    scope.openMessages();
                }   

                //Expand Services
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