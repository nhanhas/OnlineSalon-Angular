app
    .directive('customDropdown', function() {
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

                

            }
        };

    });

    /**
     * Category Object 
     * 
     * category = {
     *      categoryName : '',
     *      location : '' [in; out; in/out; busy],
     *      subCategories : [
     *          {
     *              subCategoryName : '',
     *              selectedOption : 0,
     *              options : [{ optionLabel : '', optionDescription: '', optionValue : 0 }] 
     *          }
     *      ]
     * }
     * 
     */