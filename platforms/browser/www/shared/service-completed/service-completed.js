app
    .directive('serviceCompleted', function() {
        return {
            restrict: 'EA',
            scope: {
                service : '=', //contains all info about single service
                onReSchedule: '&?', //appMode to client - On re schedule with same pro
                onReportComment: '&?', //appMode to pro - On commit a report comment
                appMode : '@?' // App mode as 'client' or 'pro'                
            },
            templateUrl: 'shared/service-completed/service-completed.html',

            link : function (scope, element, attrs) {
                
                //Init attributes
                scope.appMode = scope.appMode || 'client';

                if (!attrs.onReSchedule) {
                    scope.onReSchedule = undefined;
                }               

                //Re-Schedule a service (appMode = 'client' )
                scope.onReScheduleHandler = function(){
                    scope.onReSchedule({ service : scope.service });
                } 

                //Report a comment service (appMode = 'pro')
                scope.onReportCommentHandler = function(){
                    //Note: new comment is in service.newComment (created var on the fly)                    
                    scope.onReportComment({service : scope.service, comment : scope.service.newComment });
                } 
         
            }
        };
    });