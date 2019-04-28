app
.controller('ServicesMenuController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$translate', 'FrameworkUtils', 'AppService', 'APP_CONFIG',   function($rootScope, $scope, $timeout, $location, $http, $q, $translate,FrameworkUtils, AppService, APP_CONFIG) {
    
    /**
     * Controller variables
     */
    $scope.view = {
		isLoading : true,
        loadingMessage : 'APP_SERVICES_MENU_LOADING_DEFAULT_MESSAGE',
        selectedDate : new Date(),
        servicesCompleted : [],

        //Set app mode as 'view' var because its a shared app screen
        appMode : APP_CONFIG.mode 
	}

    //DUMMY Data
    if($scope.view.appMode === 'client'){
        //#1 - Dummy for client mode
        $scope.view.servicesCompleted = [
            {
                date : 'dd / mm / aaaa 17h15m',
                professional : 'Nome Parceira A',
                rating : 5,
                timeSpent : '1h30m',
                address : 'Morada 1'
            },
            {
                date : 'dd / mm / aaaa 19h15m',
                professional : 'Nome Parceira B',
                rating : 3,
                timeSpent : '2h30m',
                address : 'Morada 3'
            },
            {
                date : 'dd / mm / aaaa 17h15m',
                professional : 'Nome Parceira C',
                rating : 4,
                timeSpent : '1h30m',
                address : 'Morada 56'
            },
            {
                date : 'dd / mm / aaaa 14h15m',
                professional : 'Nome Parceira D',
                rating : 2,
                timeSpent : '4h30m',
                address : 'Morada 6'
            }
    
        ];
    }else{
        //#2 - Dummy for pro mode
        $scope.view.servicesCompleted = [
            {
                date : 'dd / mm / aaaa 17h15m',
                client : 'Nome Cliente A',
                servicesRequested : 'Lista de servicos efetuados',
                totalReceived : 29.40,
                rating : 5,
                timeSpent : '1h30m',
                address : 'Morada 1',
                comment: ''
            },
            {
                date : 'dd / mm / aaaa 19h15m',
                client : 'Nome Cliente B',
                servicesRequested : 'Lista de servicos efetuados',
                totalReceived : 15.40,
                rating : 3,
                timeSpent : '2h30m',
                address : 'Morada 3',
                comment : 'Texto submetido por profissional'
            },
            {
                date : 'dd / mm / aaaa 17h15m',
                client : 'Nome Cliente C',
                servicesRequested : 'Lista de servicos efetuados',
                totalReceived : 29.40,
                rating : 4,
                timeSpent : '1h30m',
                address : 'Morada 3',
                comment : ''
            },
            {
                date : 'dd / mm / aaaa 19h15m',
                client : 'Nome Cliente D',
                servicesRequested : 'Lista de servicos efetuados',
                totalReceived : 122.40,
                rating : 1,
                timeSpent : '2h30m',
                address : 'Morada 5',
                comment : 'Texto submetido por profissional'
            }
    
        ];
    }
    

    //#INITIALIZE Home data
	$scope.initialize = function(){
		
		//#1 - Prepare Queue of promises
		let promises = [];
		

		//#Finally get all promises
		$q.all(promises).then((result)=>{
			//Show screen
			$timeout(()=>{
				$scope.view.isLoading = false;
			});
			
		});

	};

    /**
	 * Behaviour functions Panels
	 */
    //#A - on Report a Comment (App mode = Pro)
    $scope.onReportComment = function(service, comment){
        console.log(comment);
    }

    //#B - on Re-schedule a service (App mode = client)
    $scope.onReSchedule = function(service){
        console.log(service);
    }

    //# - Close Screen and go Home
    $scope.closeMenu = function(){
        if(APP_CONFIG.mode === 'client'){
            $location.path('/home');
        }else{
            $location.path('/home-pro');
        }
        
    }

    //#1 - Load Application Data from Server
	$scope.initialize();

}]);
