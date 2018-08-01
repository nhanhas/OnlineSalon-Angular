app
    .directive('customRadio', function() {
        return {
            restrict: 'EA',
            scope: {
                options : '=',  // type : { optionLabel : '', optionDescription: '', optionValue : 0 }
                model : '='     // contains the option Object
            },
            templateUrl: 'shared/custom-radio/custom-radio.html',

            link: function (scope, element, attrs) {
                
                //Initialize attributes
                //Nothing

                //Select radio option
                scope.selectOption = function(option){
                    scope.model = option.optionValue;
                }

            }
        };

    });