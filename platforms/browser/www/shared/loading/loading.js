app
    .directive('loading', function() {
        return {
            restrict: 'EA',
            scope: {
                isLoading: '=',
                loadingMessage: '=?'
            },
            templateUrl: 'shared/loading/loading.html',

            link: function (scope, element, attrs) {
                
                //Initialize attributes
                scope.isLoading = scope.isLoading || false;
                scope.loadingMessage = scope.loadingMessage || 'APP_LOADING_DEFAULT_MSG';
            
            }
        };

    });