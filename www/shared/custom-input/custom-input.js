app
    .directive('customInput', function() {
        return {
            restrict: 'EA',
            scope: {
                label: '@',
                underLabel: '@?',              
                underLabelClass: '@?',       
                model : '=',
                inputType : '@?',
                isRequired: '=?',

            },
            templateUrl: 'shared/custom-input/custom-input.html',

            link: function (scope, element, attrs) {
                
                //Initialize attributes
                scope.label = scope.label || '';
                scope.underLabel = scope.underLabel || '';
                scope.underLabelClass = scope.underLabelClass || 'color-xDark-pink';
                scope.inputType = scope.inputType || 'text';
                scope.isRequired = scope.isRequired || false;
            }
        };

    });