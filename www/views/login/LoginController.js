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
                phone : ''
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
        if(isAllowed){
            //TODO navigate
            $location.path('/home');
            
        }else{
            //#3 - return to login
            $scope.setStep('credentials');            
        }
    }

    //#F - Valide Identification Form [Sign in]
    $scope.continueSignSteps = function(whatStep){
       $scope.view.signInStep = whatStep;
    }



}]);
