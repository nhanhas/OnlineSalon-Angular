app
.controller('HomeProController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$sce', 'FrameworkUtils', 'AppService', 'uiGmapGoogleMapApi',  function($rootScope, $scope, $timeout, $location, $http, $q, $sce, FrameworkUtils, AppService, uiGmapGoogleMapApi) {

    /**
     * Controller variables
     */
    $scope.view = {
		isLoading : true,
        loadingMessage : 'APP_HOME_LOADING_DEFAULT_MESSAGE',		
        messagesOpened : false,
		servicesOpened : false,
		menuOpened : false,
        messages : [],
        services : [],
        isOnline : false
        
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
	 * Functions to retrieve 
	 * server data
	 */
    //TODO


    /**
	 * Behaviour functions Panels
	 */
	
	//#A - Allow to show/hide panels (param <panel> = undefined, will close all)
	$scope.showPanel = function(panel){
		//#1 - First we reset all 'Opened' flags
		$scope.view.messagesOpened = false;
		$scope.view.servicesOpened = false;
		$scope.view.menuOpened = false;

		//#services panel reset (booking/schedule a service)
		$scope.view.bookingOpened = false;
		$scope.view.scheduleOpened = false;

		//#2 - Set visible the requested panel
		switch (panel) {
			//#i - nav sections	
			case 'messages':
				$scope.view.messagesOpened = true;
				break;
			case 'services':
				$scope.view.servicesOpened = true;
				break;
			case 'menu':
				$scope.view.menuOpened = true;
				break;
		}

	}


    


}]);