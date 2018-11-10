app
.controller('LoginController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$translate', 'FrameworkUtils', 'AppService',   function($rootScope, $scope, $timeout, $location, $http, $q, $translate,FrameworkUtils, AppService) {

    /**
     * Controller variables
     */
    $scope.view = {
        stepSelected : 'language',        
        credentials : {
            username : '',
            password : '',
            remindCredentials : false
        },
        signInOpened : false,
        signInStep : 0,
        signInForm : {        
            isIdFormValid : false,    
            isAddressFormValid : false,  
            isPaymentFormValid : false,  
            identification : {
                name : '',
                email : '',
                password : '',
                repeatPw : '',
                phone : '',
                photo : undefined
            },
            address : {
                mainAddress : '',
                secondaryAddress : '',
                zipcode : '',
                city : ''
            },
            payment : {
                cardName : '',
                month : '',
                year : '',
                ccv : ''
            }
            
        }
    };
    

    /**
     * Controller behaviours
     */

    //[Watcher] - validate identification form on step 0 of sign in
    $scope.$watch('view.signInForm.identification', function(newVal, oldVal){ 
        //TODO
        if($scope.view.signInForm.identification.name !== '')
            $scope.view.signInForm.isIdFormValid = true;
        else
            $scope.view.signInForm.isIdFormValid = false;
    }, true);

    //[Watcher] - validate address form on step 1 of sign in
    $scope.$watch('view.signInForm.address', function(newVal, oldVal){ 
        //TODO
        if($scope.view.signInForm.address.mainAddress !== '')
            $scope.view.signInForm.isAddressFormValid = true;
        else
            $scope.view.signInForm.isAddressFormValid = false;
    }, true);


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
        //#1 - Validate credentials
        //TODO

        //#2 - proceed to next step [in case of valid]
        $scope.setStep('authorize');
    }

    //#D - Sign In Handler
    $scope.signIn = function(){
        //#1 - show sign in popup
        $scope.view.signInOpened = true;
        
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


}]);
