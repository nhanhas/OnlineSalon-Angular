app
    .directive('customDropdown', ['$timeout', function($timeout) {
        return {
            restrict: 'EA',
            scope: {
                category : '=',  // described below
                //[Notice] - the 'model', is inside subcategory (selectedOption)
            },
            templateUrl: 'shared/custom-dropdown/custom-dropdown.html',

            link: function (scope, element, attrs) {
                
                //Initialize attributes
                scope.expanded = false;
                
                //#A - Picker Updater
                scope.updateNumberPicked = function(){
                    $timeout(function(){
                        //#1 - reset counter
                        scope.category.totalPickedItems = 0;

                        //#2 - iterate array of categories (sub)
                        scope.category.subCategories.forEach(function(subCategory) {
                            scope.category.totalPickedItems += subCategory.numberOfPicked ;
                        });
                        console.log(scope.category.totalPickedItems);
                    });
                    
                }
                

            }
        };

    }]);

    /**
     * Category Object 
     * 
     * category = {
     *      categoryName : '',
     *      location : '' [in; out; in/out; busy],
     *      totalPickedItems : 0,
     *      subCategories : [
     *          {
     *              subCategoryName : '',
     *              numberOfPicked : 0,
     *              options : [{ optionLabel : '', optionDescription: '', optionSelected : false }] 
     *          }
     *      ]
     * }
     * 
     */