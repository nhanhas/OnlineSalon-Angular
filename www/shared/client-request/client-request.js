app
    .directive('clientRequest', ['$translate', '$timeout', function($translate, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                request : '=', //contains all info about single client request
                mode : '@?', // According to panel or list usages - values : ['list', 'on-map', 'on-execution']
                onSelect : '&?', // on select a request (from the list)
                onAccept : '&?', // on accept from tracking panel
                onReject : '&?', // on reject from tracking panel 
                onStart : '&?', // on reject from tracking panel 
                onExpandInfo : '&?', //only 'on-map' mode 
                onDismiss : '&?'
            },
            templateUrl: 'shared/client-request/client-request.html',

            link : function (scope, element, attrs) {
                

                //Init attributes
                scope.mode = scope.mode || 'list'
                scope.isInfoExpanded = false;

                if (!attrs.onSelect) {
                    scope.onSelect = undefined;
                }   
                if (!attrs.onAccept) {
                    scope.onAccept = undefined;
                }    
                if (!attrs.onReject) {
                    scope.onReject = undefined;
                }    
                if (!attrs.onStart) {
                    scope.onStart = undefined;
                }  
                if (!attrs.onExpandInfo) {
                    scope.onExpandInfo = undefined;
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

                //Accept clientRequest
                scope.onAcceptHandler = function(){
                    scope.onAccept({ request: scope.request });
                } 

                //Reject clientRequest
                scope.onRejectHandler = function(){
                    scope.onReject({ request: scope.request });
                } 

                //Start clientRequest
                scope.onStartHandler = function(){
                    scope.onStart({ request: scope.request });
                } 

                //info clientRequest
                scope.onExpandInfoHandler = function(){
                    $timeout(()=>{
                        scope.isInfoExpanded = !scope.isInfoExpanded;
                        scope.onExpandInfo({ request: scope.request, isInfoExpanded : scope.isInfoExpanded });
                    });
                    
                } 

                //Dismiss clientRequest
                scope.onDismissMessageHandler = function(){
                    scope.onDismiss();
                } 

            }
        };
    }]);