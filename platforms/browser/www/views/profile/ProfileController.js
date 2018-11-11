app
.controller('ProfileController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$translate', 'FrameworkUtils', 'AppService',   function($rootScope, $scope, $timeout, $location, $http, $q, $translate,FrameworkUtils, AppService) {

    /** 
     * Controller variables
     */
    $scope.view = {        
        profileForm : {        
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
            
        },
        messageError: ''
    };
    

    /**
     * Controller behaviours
     */
    //#1 - get stored data
    let profileData = localStorage.getItem('clientData');
    $scope.view.profileForm = JSON.parse(profileData);

    
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
          $scope.view.profileForm.identification.photo = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
    };

    //#H - Save Form sign in
    $scope.saveAll = function(){

        //#TODO - Call Service
        //#1 - Store it into cache (for demo)
        localStorage.setItem('clientData', JSON.stringify($scope.view.profileForm));

        //#2 - Show message
        $scope.view.messageError = 'APP_PROFILE_SAVE_MESSAGE';
    
    };

    $scope.closeProfile = function(){
        $location.path('/home');
    }

    $scope.logout = function(){
        $location.path('/login');
    }

}]);
