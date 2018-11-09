app
    .directive('worldMap', ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi) {
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
                
                //Internal Properties
                scope.markersList = [];

               

                //#1 - Initialize Google Map configuration
                scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 , options: {scrollwheel: false}};
                
                //#2 - Prepare to create each marker for each service
                scope.services.forEach(service => {
                    
                    //#2.1 - TODO - get icon acording to in/out/etc
                    let icon = 'assets/marker-heart.png';
                    
                    //#2.2 - Setup marker
                    let newMarker = {
                        id: service.id,
                        icon: icon,
                        latitude: service.coords.latitude,
                        longitude: service.coords.longitude,
                        status: service.location, //in/out
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


                
                //#Finally show!
                scope.isReady = true;

                /**
                 * Functions Zone
                 */
                //#A - When marker is clicked
                scope.markerClicked = function(marker, eventName, model){
                    model.show = !model.show;
                };


            }
        };
    }]);