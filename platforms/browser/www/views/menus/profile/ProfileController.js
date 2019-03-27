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
                id_user: -1,
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
            id_user : profileData.id_user,
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
        
        //#1 - Prepare User parameter
        let userParameter = {            
            id_user: $scope.view.profileForm.identification.id_user,
            name: $scope.view.profileForm.identification.name,
            phone: $scope.view.profileForm.identification.phone,                   
            email: $scope.view.profileForm.identification.email,     
            photo: $scope.view.profileForm.identification.photo,

            address1: $scope.view.profileForm.address.mainAddress,
            address2: $scope.view.profileForm.address.secondaryAddress,
            city: $scope.view.profileForm.address.city,
            postalCode: $scope.view.profileForm.identification.zipcode,
            
        }
        
        //#1 - Get All Services by calling server
		return AppService.PROFILE_updateUserInfo(userParameter).then((result)=>{
            console.log(result);
            if(result){
                //#2 - Store userInfo in cache
                localStorage.setItem('userInfo', JSON.stringify(result.data.user));
                
                //#2.2 - Show message
                $scope.view.messageError = 'APP_PROFILE_SAVE_MESSAGE';
            }else{
                //TODO REMOVE
                localStorage.setItem('userInfo', JSON.stringify(userParameter));
            }

		});

        //#TODO - Call Service
        //#1 - Store it into cache (for demo)
        //localStorage.setItem('clientData', JSON.stringify($scope.view.profileForm));

        
    
    };

    //# - Close Screen and go Home
    $scope.closeMenu = function(){
        $location.path('/home');
    }

    $scope.logout = function(){
        $location.path('/login');
    }

}]);
