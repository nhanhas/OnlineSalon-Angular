/**
 * This Service will hold all the needed Requests
 * and some manipulations to return to Frontend
 */
app.service('AppService', ['$http', 'FrameworkUtils', function($http, FrameworkUtils) {

    //App Service URL  
    this.serviceWS = 'http://phc201505003/storews';

   
    //GET from WS
    this.getSomeFromWS  = function(){
        let serviceWithParam = this.serviceWS + "/clients.aspx";

        return FrameworkUtils.Http_GET(serviceWithParam).then(function(result){     
            return false;
        });
    }

}]);
