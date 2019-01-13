app
    .directive('clientRequest', ['$translate', '$timeout', function($translate, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                request : '=', //contains all info about single client request
                mode : '@?', // According to panel or list usages - values : ['list', 'on-map']
                onSelect : '&?', // on select a request
                onDismiss : '&?'
            },
            templateUrl: 'shared/client-request/client-request.html',

            link : function (scope, element, attrs) {
                

                //Init attributes
                scope.mode = scope.mode || 'list'
                if (!attrs.onSelect) {
                    scope.onSelect = undefined;
                }     

                if (!attrs.onDismiss) {
                    scope.onDismiss = undefined;
                }            
    

                //translate key with distance between
                $translate('APP_COMPONENT_CLIENT_REQUEST_ON_MAP_WAITING_DESC').then((translation)=>{
                    $timeout(()=>{
                        scope.translatedDistanceLabel =  translation.replace('{0}', scope.request.distanceBetween)
                    })
                }); 
          
                //On select this client request
                scope.onSelectRequestHandler = function(){
                    //#1 - Only selectable tile on 'list' mode
                    if(scope.mode === 'list')
                        scope.onSelect({ request: scope.request });
                }

                //Dismiss clientRequest
                scope.onDismissMessageHandler = function(){
                    scope.onDismiss();
                } 

            }
        };
    }]);