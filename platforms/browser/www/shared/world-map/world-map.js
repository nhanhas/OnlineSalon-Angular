app
    .directive('worldMap', ['$rootScope', 'uiGmapGoogleMapApi', 'uiGmapIsReady', function($rootScope, uiGmapGoogleMapApi, uiGmapIsReady) {
        return {
            restrict: 'EA',
            scope: {
                services : '=?', //contains all info about single service
                onBookNow : '&?', //function when clicked to Book now
                onSchedule : '&?', //function when clicked to Schedule now
                serviceRequest : '=?', //this is usable only in appMode = 'pro'. To make route between client and professional
                appMode : '@?' // App mode as 'client' or 'pro'
            },
            templateUrl: 'shared/world-map/world-map.html',

            link : function (scope, element, attrs) {               

                //Init attributes
                scope.services = scope.services || [];
                scope.appMode = scope.appMode || 'client';
                scope.serviceRequest = scope.serviceRequest || undefined;

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
                    
                    let options = {
                        maximumAge: 30000,
                        timeout: 15000,
                        enableHighAccuracy: false
                    };

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

                    }, options)

                    
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

                //#D - [PRO] - Mark on map the track between pro and client
                scope.MAP_getRouteToClient = function(){
                    //#1 - instantiate google map objects for directions
                    let directionsDisplay = new google.maps.DirectionsRenderer();
                    let directionsService = new google.maps.DirectionsService();
                    let geocoder = new google.maps.Geocoder();
                    //#2 - Prepare request
                    var request = {
                        origin: { lat : scope.map.center.latitude, lng : scope.map.center.longitude },
                        destination: { lat : scope.serviceRequest.coords.latitude, lng : scope.serviceRequest.coords.longitude },
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };
                    directionsService.route(request, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setMap(scope.map.control.getGMap());
                        directionsDisplay.setPanel(document.getElementById('directionsList'));
                        
                    } else {
                        alert('Google route unsuccesfull!');
                    }
                    });
                                        
                    
                };
            

                /** END Of Functions Zone */

                //Internal Properties
                scope.markersList = [];


                //#1 - Initialize Google Map configuration
                scope.map = {center: {latitude: 38.7354823, longitude: -9.1288447 }, zoom: 4 , options: {scrollwheel: true, disableDefaultUI: true}, control: {}};
                
                //#2 - Prepare to create each marker for each service
                scope.$watch('services', function(newVal, oldVal){
                    scope.MAP_generateMarkersFromService();
                }, true);

                //#3 - Check if user has 'allowGeolocation'
                switch ($rootScope.allowGeolocation) {
                    case undefined:                        
                    case true:
                            scope.MAP_getCurrentPosition();
                            break;
                    case false:
                        //#1 just show map wihtou current position
                        //#Finally show!
                        scope.isReady = true;
                        break;
                }
               
                //#4 - [appMode = 'pro'] - check if there is any request to track
                //It must be after get user current position - when 'isReady' = true
                scope.$watch('isReady', function(newVal, oldVal){
                    //#1 - only if is ready we get route
                    if(scope.appMode === 'pro' && scope.serviceRequest && scope.isReady){
                        scope.MAP_getRouteToClient();
                    }
                }, true);


            }
        };
    }]);