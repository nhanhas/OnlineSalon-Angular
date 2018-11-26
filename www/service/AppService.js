/**
 * This Service will hold all the needed Requests
 * and some manipulations to return to Frontend
 */
app.service('AppService', ['$http', 'FrameworkUtils', function($http, FrameworkUtils) {

    //App Service URL  
    //this.serviceWS = 'http://192.168.1.80:8000/server';
    this.serviceWS = 'http://salaonline.makeitdigital.pt';
   
    /**
     * Login 
     */
    //#A - Login user in Application
    this.LOGIN_userLogin  = function(credentials){
        
        return false;
    };

    /**
     * #B - Add new user to Platform
     * parameter to server:
     * {"name": "","email_address": "","password": "","telemovel": ""}  
     */
    this.LOGIN_addNewUser  = function(clientData){
        
        let serviceURL = this.serviceWS + '/newUser';
        let parameter = clientData;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /**
     * #C - Validate code Pin
     * parameter to server:
     * {"pin": "","user_id": ""}  
     */
    this.LOGIN_validatePIN  = function(pinCodeParameter){
        
        let serviceURL = this.serviceWS + '/validatePin';
        let parameter = pinCodeParameter;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

}]);
