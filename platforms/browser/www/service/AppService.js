/**
 * This Service will hold all the needed Requests
 * and some manipulations to return to Frontend
 */
app.service('AppService', ['$http', 'FrameworkUtils', function($http, FrameworkUtils) {

    //App Service URL  
    //this.serviceWS = 'http://192.168.1.80:8000/server';
    this.serviceWS = 'http://salaonline.makeitdigital.pt';
   
    /********************************************************************************
     * Login 
     ********************************************************************************/
    /**
     * #A - Login user in Application
     * parameter to server:
     * { username : "", password : "" }
     */
    this.LOGIN_userLogin  = function(credentials){
        
        let serviceURL = this.serviceWS + '/authenticateUser';
        let parameter = credentials;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
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

    /********************************************************************************
     * Home
     ********************************************************************************/
    /**
     * #D - Get Promotions to Home
     * parameter to server: none. 
     * It is a GET 
     */
    this.HOME_getPromotions  = function(){
        
        let serviceURL = this.serviceWS + '/getPromotions';

        return FrameworkUtils.Http_GET(serviceURL).then(function(result){     
            return result.data;
        });
    }

    /**
     * #E - Get All Services to Home
     * parameter to server: none. 
     * It is a GET 
     */
    this.HOME_getAllServices  = function(){
        
        let serviceURL = this.serviceWS + '/getAllServices';

        return FrameworkUtils.Http_GET(serviceURL).then(function(result){     
            return result.data;
        });
    }

    /********************************************************************************
     * Generic
     ********************************************************************************/
    /**
     * #C - refresh and save location
     * parameter to server:
     * {"id_user": "","lat": "", "long": ""}  
     */
    this.GENERIC_saveLocation  = function(locationParameter){
        
        let serviceURL = this.serviceWS + '/saveLocation';
        let parameter = locationParameter;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }
}]);
