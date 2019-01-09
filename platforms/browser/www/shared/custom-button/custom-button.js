app
    .directive('customButton', function() {
        return {
            restrict: 'EA',
            scope: {
                label: '@',
                layout: '@?', //[default, large, thin]
                icon : '@?',
                onPress : '&', 
                                
                isDisabled: '=?',

            },
            templateUrl: 'shared/custom-button/custom-button.html',

            link: function (scope, element, attrs) {
                
                //Initialize attributes
                scope.label = scope.label || '';
                scope.layout = scope.layout || 'default';
                scope.isDisabled = scope.isDisabled || false;
                scope.icon = scope.icon || '';

                if (!attrs.onPress) {
                    scope.onPress = undefined;
                }
 
                //On press handler
                scope.onPressHandler = function(){
                    scope.onPress();
                }

            }
        };

    });