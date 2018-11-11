app
    .directive('worldMap', ['$rootScope', 'uiGmapGoogleMapApi', function($rootScope, uiGmapGoogleMapApi) {
        return {
            restrict: 'EA',
            scope: {
                services : '=', //contains all info about single service
                onBookNow : '&?', //function when clicked to Book now
                onSchedule : '&?', //function when clicked to Schedule now
            },
            templateUrl: 'shared/world-map/world-map.html',

            link : function (scope, element, attrs) {               

                //Init attributes
                scope.services = scope.services || [];

                if (!attrs.onBookNow) {
                    scope.onBookNow = undefined;
                }

                if (!attrs.onSchedule) {
                    scope.onSchedule = undefined;
                }

                /**
                 * Functions Zone
                 */
                //#A - When marker is clicked
                scope.markerClicked = function(marker, eventName, model){
                    model.show = !model.show;
                };

                //#B - Get client current position
                scope.MAP_getCurrentPosition = function(){

                    navigator.geolocation.getCurrentPosition(function(position) {
                        //console.log(position.coords.latitude, position.coords.longitude);
                        console.log("User has accepted geolocation");
                        $rootScope.allowGeolocation = true;
                        //#12 - Update map center
                        scope.map.center = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                        scope.map.zoom = 12
                        
                        //#Finally show!
                        scope.isReady = true;
                        scope.$apply();
                    },
                    function (error) { 
                        if (error.code == error.PERMISSION_DENIED)
                            console.log("User declined geolocation");
                        $rootScope.allowGeolocation = false;

                        //#Finally show!
                        scope.isReady = true;
                        scope.$apply();

                    })

                    
                };

                //#C - Create Markers for each service
                scope.MAP_generateMarkersFromService = function(){
                    
                    scope.markersList = [];
                    //#1 - Iterate all services
                    scope.services.forEach(service => {
                    
                        //#2.1 - get icon acording to in/out/etc
                        let icon = ((locationStatus)=>{
                            switch (locationStatus) {
                                case 'in':
                                    return 'assets/marker-heart-green.png';
                                    
                                case 'out':
                                    return 'assets/marker-heart-orange.png';
                                    
                                case 'in/out':
                                    return 'assets/marker-heart-red.png';
                                    
                                case 'busy':
                                    return 'assets/marker-heart-gray.png';
                                    
                            }
                        });
                        
                        
                        //#2.2 - Setup marker
                        let newMarker = {
                            id: service.id,
                            icon: icon(service.location),
                            latitude: service.coords.latitude,
                            longitude: service.coords.longitude,
                            status: service.location, //in/out, etc
                            show: false,
                            service: service, //allow to appear info on click
                            onBookPress: function(favorite){
                                scope.onBookNow({favorite: favorite});
                            },
                            onSchedulePress: function(favorite){
                                scope.onSchedule({favorite: favorite});
                            }
                        }
                        
                        //#2.3 - Add it to marker list
                        scope.markersList.push(newMarker);
                    });

                }
            

                /** END Of Functions Zone */

                //Internal Properties
                scope.markersList = [];


                //#1 - Initialize Google Map configuration
                scope.map = {center: {latitude: 38.7354823, longitude: -9.1288447 }, zoom: 4 , options: {scrollwheel: false, disableDefaultUI: true}};
                
                //#2 - Prepare to create each marker for each service
                scope.$watch('services', function(newVal, oldVal){
                    scope.MAP_generateMarkersFromService();
                }, true);

                //#3 - Check if user has 'allowGeolocation'
                switch ($rootScope.allowGeolocation) {
                    case undefined:                        
                    case true:
                            scope.MAP_getCurrentPosition();
                    case false:
                        //#1 just show map wihtou current position
                        //#Finally show!
                        scope.isReady = true;
                                          
                        break;
                }
               
               
                
                

            }
        };
    }]);