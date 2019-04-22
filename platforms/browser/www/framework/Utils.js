//Framework Utils

//#Remote
app.service('FrameworkUtils', ['$http', function($http) {

    /**
     * Remote Services Utils
     */
     //GET Type
     this.Http_GET  = function(serviceURL){
         return $http({
                     method: 'GET',
                     url: serviceURL
                 }).then(function successCallback(response) {
                     return response;
                 }, function errorCallback(response) {
                     return 'error';
                 });
     }

     //POST Type
     this.Http_POST  = function(serviceURL, data){
         return $http({
                     method: 'POST',
                     data: data,
                     url: serviceURL
                 }).then(function successCallback(response) {
                     return response;
                 }, function errorCallback(response) {
                     return 'error';
                 });
     }


     /**
      * Basic Utils
      */

    //Parameters from QueryString
    this.getParameterByName = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    //Get a Logged User
    this.getLoggedUser = function(){
        return JSON.parse(localStorage.getItem('userInfo'));
    }

    //Get user current position
    this.getUserCurrentPosition = function(){

          if (navigator.geolocation) {
              alert("aqui");
        let navigatorPosition = (()=>{
            return new Promise(function (resolve, reject) {
                try {
                    let options = {
                        maximumAge: 30000,
                        timeout: 15000,
                        enableHighAccuracy: false
                    };

                    navigator.geolocation.getCurrentPosition(function (position) {
                        alert("aqui1");
                        let coordinates = position.coords;
                        resolve({ lat: coordinates.latitude, long: coordinates.longitude });
                    },
                    function (error) { 
                        if (error.code == error.PERMISSION_DENIED)
                            console.log("User declined geolocation");
                        resolve({ lat: 0, long: 0 });
                    }, options);
                } catch (error) {
                  alert("ola");
                    resolve({ lat: 0, long: 0 });
                }
            });
        });
      }else{
         alert('W3C Geolocation API is not available');
      }
        let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
        if(!iOS){
             //#1 - check again from geolocation param
             return navigator.permissions.query({name:'geolocation'}).then(function(permissionStatus) {
                if(permissionStatus.state == 'granted'){
                    //#2 - get actual position
                    return navigatorPosition();
                }else{
                    return new Promise(function (resolve, reject) {
                        resolve({ lat: 0, long: 0 });
                    });
                }
            });
        }else{
            return navigatorPosition();
        }


	}


 }]);
