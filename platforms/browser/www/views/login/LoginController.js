app
.controller('LoginController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$translate', 'FrameworkUtils', 'AppService',   function($rootScope, $scope, $timeout, $location, $http, $q, $translate,FrameworkUtils, AppService) {

    /**
     * Controller variables
     */
    $scope.view = {
        isLoading : false,
        loadingMessage : undefined,
        stepSelected : 'language',        
        credentials : {
            username : '',
            password : '',
            remindCredentials : false
        },
        credentialsMessageError : '',
        pinCodeMessageError : '',
        signMessageError : '',
        signInOpened : false,
        signInStep : 0,
        signInForm : {        
            isIdFormValid : false,    
            isCodeFormValid : false,
            user_id: '', //fulfilled when sign in requested!
            identification : {
                name : '',
                email : '',
                password : '',
                repeatPw : '',
                phone : '',
                photo : undefined
            },
            code : {
                confirmationCode : ''
            }
            
        }
    };
    

    /**
     * Controller behaviours
     */

     //#1 - Get cache if 'remindme'
     let cachedCredentials = JSON.parse(localStorage.getItem('credentials'));
     if(cachedCredentials && cachedCredentials.remindCredentials){
         $scope.view.credentials = cachedCredentials
     }

    //[Watcher] - validate identification form on step 0 of sign in
    $scope.$watch('view.signInForm.identification', function(newVal, oldVal){ 
        //TODO
        if($scope.view.signInForm.identification.name !== '')
            $scope.view.signInForm.isIdFormValid = true;
        else
            $scope.view.signInForm.isIdFormValid = false;
    }, true);

    //[Watcher] - validate code form on step 1 of sign in
    $scope.$watch('view.signInForm.code', function(newVal, oldVal){ 
        //TODO
        if($scope.view.signInForm.code.confirmationCode !== '')
            $scope.view.signInForm.isCodeFormValid = true;
        else
            $scope.view.signInForm.isCodeFormValid = false;
    }, true);

    //AUX - Reset signInForm
    $scope.resetSignIn = function(){
        
        //#FIX - ng-class wrong usage
        jQuery('body').css('background-color', '#fce8f2');

        $scope.view = {
            stepSelected : 'credentials',        
            credentials : {
                username : '',
                password : '',
                remindCredentials : false
            },
            credentialsMessageError : '',
            pinCodeMessageError : '',
            signInOpened : false,
            signInStep : 0,
            signInForm : {        
                isIdFormValid : false,    
                isCodeFormValid : false,
                user_id: '', //fulfilled when sign in requested!
                identification : {
                    name : '',
                    email : '',
                    password : '',
                    repeatPw : '',
                    phone : '',
                    photo : undefined
                },
                code : {
                    confirmationCode : ''
                }
                
            }
        };
    }

    //#A - Choose language for application
    $scope.setStep = function(step){
        $scope.view.stepSelected = step;
    };

    //#B - Choose language for application
    $scope.chooseLanguage = function(lang){
        //#1 - Switch lang
        $translate.use(lang);

        //#2 - proceed to next step
        $scope.setStep('credentials');
    };

    //#C - Login Handler
    $scope.userLogin = function(){
        //#0 - Clean message error 
        $scope.view.credentialsMessageError = '';

        //#1 - Validate credentials
        //TODO     
        if($scope.view.credentials.username !== '' && $scope.view.credentials.password !== '' ){
            //#1 - if "remind me"
            if($scope.view.credentials.remindCredentials){
                localStorage.setItem('credentials', JSON.stringify($scope.view.credentials));
            }else{
                localStorage.setItem('credentials', '{}');
            }

            //#2.1 - prepare data to login 
            let credentials = { username : $scope.view.credentials.username, password : $scope.view.credentials.password};
            
            //#2.2 - Call loading Screen
            $scope.view.isLoading = true;
            $scope.view.loadingMessage = 'APP_LOADING_DEFAULT_MSG';

            //#2.3 - Call Login from server
            AppService.LOGIN_userLogin(credentials).then((result)=>{
                //#2.3.1 - Reset cache user info
                localStorage.setItem('userInfo', '{}');
                console.log(result);

                //#2.4 - Remove loading
                $scope.view.isLoading = false;
                
                //#2.5 - Process response
                if(result.code === 0){
                    //#2.5.1 - Store userInfo in cache
                    localStorage.setItem('userInfo', JSON.stringify(result.data.user));

                    //#2.5.2 - [SUCCESS] proceed to next step [in case of valid]
                    $scope.setStep('authorize');
                }else{
                    //#3 - Show message error
                    $scope.view.credentialsMessageError = $scope.getTranslationByCode(result.code);
                }
                
            });
                
        }else{
            //#3 - Show message error
            $scope.view.credentialsMessageError = 'APP_LOGIN_CREDENTIALS_ERROR_MESSAGE';
        }
    
    }

    //#D - Sign In Handler (open)
    $scope.signIn = function(){
        //#FIX - ng-class wrong usage
        jQuery('body').css('background-color', '#FFFFFF');
        //#1 - show sign in popup
        $scope.view.signInOpened = true;
        
    }

    //#D.1 - Sign In Handler (close)
    $scope.signInClose = function(){
        //#FIX - ng-class wrong usage
        jQuery('body').css('background-color', '#fce8f2');
        //#1 - show sign in popup
        $scope.view.signInOpened = false;
        
    }

    //#E - Confirm [or deny] authorization
    $scope.confirmAuthorization = function(isAllowed){
        //#1 - depending on user confirmation
        if(isAllowed && navigator.geolocation){
            
            navigator.permissions.query({name:'geolocation'}).then(function(permissionStatus) {  
                //#2 - Check if it is already granted
                if(permissionStatus.state == 'granted'){
                    console.log("User has geolocation");
                    $rootScope.allowGeolocation = true;
                    $location.path('/home');
                    $rootScope.$apply();
                    
                }else if(permissionStatus.state == 'prompt'){
                    //#2.1 - Get current position to force allowing
                    navigator.geolocation.getCurrentPosition(function(position) {
                        //console.log(position.coords.latitude, position.coords.longitude);
                        console.log("User has accepted geolocation");
                        $rootScope.allowGeolocation = true;
                        $location.path('/home');
                        $rootScope.$apply();
                    },
                    function (error) { 
                        if (error.code == error.PERMISSION_DENIED)
                            console.log("User declined geolocation");
                        $rootScope.allowGeolocation = false;
                        $location.path('/home');
                        $rootScope.$apply();
                    });    
                }else{
                    console.log("User dont use geolocation");
                    $rootScope.allowGeolocation = false;
                    $location.path('/home');
                    $rootScope.$apply();
                }
            });
            
        }else{
            //#3 - Use app without Geolocation          
            $rootScope.allowGeolocation = false;
            $location.path('/home');
        }
    }

    //#F - Valide Identification Form [Sign in]
    $scope.continueSignSteps = function(whatStep){
       $scope.view.signInStep = whatStep;
    }

    //#G - Open or take photo image
    $scope.browseImages = function(){
        let inputPhoto = document.getElementById('input-photo');
        inputPhoto.click();

        inputPhoto.addEventListener('change', function(event){
            $scope.openFile(event);
        });
    }
    //#G.1 - Read File to Interface (TODO.save image in server)
    $scope.openFile = function(file) {
        var input = file.target;
    
        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          var output = document.getElementById('photo-output');
          output.src = dataURL;

          //#update form photo
          $scope.view.signInForm.identification.photo = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
    };

    //#H - Save Form sign in
    $scope.saveAll = function(){
        //#1 - Prepare data to call validate Pin service
        let pinServiceParams = {
            pin : $scope.view.signInForm.code.confirmationCode,
            user_id : $scope.view.signInForm.user_id
        };

        //#1.1 - Call loading Screen
        $scope.view.isLoading = true;
        $scope.view.loadingMessage = 'APP_LOADING_PINCODE_VALIDATING_MSG';

        //#1 - Make the server Call
        AppService.LOGIN_validatePIN(pinServiceParams).then((result)=>{
            //#1.1 - Remove loading
            $scope.view.isLoading = false;
            $scope.view.loadingMessage = undefined;

            console.log(result);
            
            //#1.2 - Process result
            if(result && result.code === 0){
                //#2 - Store it into cache (for demo)
                localStorage.setItem('clientData', JSON.stringify($scope.view.signInForm));

                //#3 - Navigate to login again
                $scope.resetSignIn();
            }else{
                //#4 - Show message error
                $scope.view.pinCodeMessageError = 'APP_SIGNIN_PINCODE_ERROR_MESSAGE';
            }
            
        })

        
    };

    //#I - Submit Form Sign in
    $scope.submitRegistration = function(){
        //#TODO - make email and password validation

        //#1 - Prepare client data to send to server
        let clientData = {
            name : $scope.view.signInForm.identification.name,
            email_address : $scope.view.signInForm.identification.email,
            password : $scope.view.signInForm.identification.phone,
            telemovel : $scope.view.signInForm.identification.password
        };

        //#1.1 - Call loading Screen
        $scope.view.isLoading = true;
        $scope.view.loadingMessage = 'APP_LOADING_DEFAULT_MSG';

        //#2 - Make the server Call
        AppService.LOGIN_addNewUser(clientData).then(function(result){
            //#2.1 - Remove loading
            $scope.view.isLoading = false;
            $scope.view.loadingMessage = undefined;

            console.log(result);

            //#2.2 - Process result
            if(result && result.code === 0){
                //#2.3.1 - Set user_id response to call at validate pin
                $scope.view.signInForm.user_id = result.data.user_id;

                //#2.3.2 - Show confirmation code step
                $scope.continueSignSteps(1);    
            }else{
                //#2.4 - Show message error
                $scope.view.signMessageError = $scope.getTranslationByCode(result.code);
            }
            
        });

        
        
    }

    //#J - Get Locales translations according to error 'code' 
    $scope.getTranslationByCode = function(code){
        return 'APP_LOGIN_ERROR_' + code.toString();        
    }

}]);
