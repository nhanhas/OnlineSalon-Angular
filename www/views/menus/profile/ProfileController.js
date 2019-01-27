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
    (()=>{
        //#1.1 - Get profile from cache
        let profileData = localStorage.getItem('userInfo');
        profileData = JSON.parse(profileData);
        
        //#1.2 - Fulfill identification form
        $scope.view.profileForm.identification = {
            name: profileData.name,
            email: profileData.email,
            password: profileData.password,
            repeatPw: profileData.repeatPw,
            phone: profileData.phone,
            photo: profileData.photo,
        };

        //#1.3 - Fulfill address form
        $scope.view.profileForm.address = {
            mainAddress: profileData.address1,
            secondaryAddress: profileData.address2,
            zipcode: profileData.postalCode,
            city: profileData.city
        }
    })();
    

    
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
        //localStorage.setItem('clientData', JSON.stringify($scope.view.profileForm));

        //#2 - Show message
        $scope.view.messageError = 'APP_PROFILE_SAVE_MESSAGE';
    
    };

    //# - Close Screen and go Home
    $scope.closeMenu = function(){
        $location.path('/home');
    }

    $scope.logout = function(){
        $location.path('/login');
    }

}]);
