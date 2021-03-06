app
    .directive('customOptionPicker', function() {
        return {
            restrict: 'EA',
            scope: {
                options : '=',  // type : { optionLabel : '', optionDescription: '', optionSelected : false }
                numberOfPicked : '=?',
                pricePicked : '=?',
                onPick : '&?' //to update dropdown counter
            },
            templateUrl: 'shared/custom-option-picker/custom-option-picker.html',

            link: function (scope, element, attrs) {
                
                //Initialize attributes
                scope.numberOfPicked = scope.numberOfPicked || 0;
                scope.pricePicked = scope.pricePicked || 0;
                if (!attrs.onPick) {
                    scope.onPick = undefined;
                }

                //Select option-picker option
                scope.pickOption = function(option){
                    //#1 - Pick/unPick option
                    option.optionSelected = !option.optionSelected;
                    //#2 - Update number of selected
                    if(option.optionSelected){
                        scope.numberOfPicked++;
                        scope.pricePicked += option.optionPrice;
                        
                    }else{
                        scope.numberOfPicked--;
                        scope.pricePicked -= option.optionPrice;
                    }

                    //#3 - call external callback (if exists)
                    if(scope.onPick){
                        scope.onPick();
                    }
                }

            }
        };

    });