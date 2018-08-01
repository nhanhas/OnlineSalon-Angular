app
    .directive('navbar', function() {
        return {
            restrict: 'EA',
            scope: {
                openMenu : '&',
                expandFilter : '&'
            },
            templateUrl: 'shared/navbar/navbar.html',

            link : function (scope, element, attrs) {
                
                //Init attributes
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

            }
        };
    });