/**
 * This Service will hold all the needed Requests
 * and some manipulations to return to Frontend
 */
app.service('AppService', ['$http', 'FrameworkUtils', function($http, FrameworkUtils) {

    //App Service URL  
    //this.serviceWS = 'http://192.168.1.80:8000/server';
    //this.serviceWS = 'http://salaoonline.tk';
    this.serviceWS = 'https://salaonline.makeitdigital.pt';
   
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

    /**
     * #D- Send forgot pw request
     * parameter to server:
     * {"email": ""}  
     */
    this.LOGIN_forgotPW  = function(forgotPwParameter){
        
        let serviceURL = this.serviceWS + '/resetPassword';
        let parameter = forgotPwParameter;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /********************************************************************************
     * Home
     ********************************************************************************/
    /**
     * #A - Get Promotions to Home
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
     * #B - Get All Services to Home
     * parameter to server: none. 
     * It is a GET 
     */
    this.HOME_getAllServices  = function(){
        
        let serviceURL = this.serviceWS + '/getAllServices';

        return FrameworkUtils.Http_GET(serviceURL).then(function(result){     
            return result.data;
        });
    }

    /**
     * #C - Get all professional services arround
     * parameter to server:
     * {"id_user":0 ,"lat":"","long":"","distance":50}
     */
    this.HOME_getProfessionalsArround  = function(localizationParam){
        
        let serviceURL = this.serviceWS + '/getProfessionalsArround';
        let parameter = localizationParam;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /**
     * #D - Request a service 
     * parameter to server:
     * {"id_client":0,"id_profissional":"","services":['416','415'],"date_service":"2018-12-14 00:02:00","in_out":"in","price":20.2,"address":""}
     */
    this.HOME_requestService  = function(requestServiceParam){
        
        let serviceURL = this.serviceWS + '/requestService';
        let parameter = requestServiceParam;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /**
     * #E - Request a list of requested services 
     * parameter to server:
     * {"id_client":0}
     */
    this.HOME_getBookedServices  = function(listServiceParam){
        
        let serviceURL = this.serviceWS + '/listServices';
        let parameter = listServiceParam;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /**
     * #F - Request server to mark news as READ
     * parameter to server:
     * {"id_user":0, "id_news" : 0}
     */
    this.HOME_setPromotions = function(promotionParam){
        let serviceURL = this.serviceWS + '/setPromotions';
        let parameter = promotionParam;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /**
     * #G - Request server to update service status
     * parameter to server: status can be [4 - canceled]
     * {"id_service":0, "status" : 0}
     */
    this.HOME_updateService = function(updateServiceParam){
        let serviceURL = this.serviceWS + '/updateService';
        let parameter = updateServiceParam;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /********************************************************************************
     * Menus - Profile
     ********************************************************************************/
    /**
     * #A - Update profile user
     * parameter to server:
     * {"id_user": "","lat": "", "long": ""}  
     */
    this.PROFILE_updateUserInfo  = function(userInfoParameter){
        
        let serviceURL = this.serviceWS + '/updateUserInfo';
        let parameter = userInfoParameter;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }

    /********************************************************************************
     * Home - Professional
     ********************************************************************************/
    /**
     * #A - Update professional online/offline
     * parameter to server: with status [1 - online, 2 - offline]
     * {"id_professional": 0,"status": 0}  
     */
    this.HOME_changeProfessionalStatus  = function(userInfoParameter){
        
        let serviceURL = this.serviceWS + '/changeProfessionalStatus';
        let parameter = userInfoParameter;

        return FrameworkUtils.Http_POST(serviceURL, parameter).then(function(result){     
            return result.data;
        });
    }


    /********************************************************************************
     * Generic
     ********************************************************************************/
    /**
     * #A - refresh and save location
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

    /**
     * #B - Get Service general settings
     * parameter to server: none. 
     * It is a GET 
     */
    this.GENERIC_getGeneralSettings  = function(){
        
        let serviceURL = this.serviceWS + '/getGeneralSettings';

        return FrameworkUtils.Http_GET(serviceURL).then(function(result){     
            return result.data;
        });
    }

}]);
