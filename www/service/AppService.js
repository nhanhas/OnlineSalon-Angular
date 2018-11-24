/**
 * This Service will hold all the needed Requests
 * and some manipulations to return to Frontend
 */
app.service('AppService', ['$http', 'FrameworkUtils', function($http, FrameworkUtils) {

    //App Service URL  
    this.serviceWS = 'http://192.168.1.80:8000/server';
   
    /**
     * Login 
     */
    //#A - Login user in Application
    this.LOGIN_userLogin  = function(credentials){
        
        let serviceURL = this.serviceWS + '/WS_newUser.php';
        let parameter = { credentials : credentials };

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    };

    //#B - Add new user to Platform
    this.LOGIN_addNewUser  = function(clientData){
        
        let serviceURL = this.serviceWS + '/WS_newUser.php';
        let parameter = { clientData : clientData };

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    //#C - Validate PIN
    this.LOGIN_validatePIN  = function(pinCode){
        
        let serviceURL = this.serviceWS + '/WS_validatePIN.php';
        let parameter = { pinCode : pinCode };

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

}]);
