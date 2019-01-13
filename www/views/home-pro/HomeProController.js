app
.controller('HomeProController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$sce', 'FrameworkUtils', 'AppService', 'uiGmapGoogleMapApi',  function($rootScope, $scope, $timeout, $location, $http, $q, $sce, FrameworkUtils, AppService, uiGmapGoogleMapApi) {

    /**
     * Controller variables
     */
    $scope.view = {
		isLoading : true,
        loadingMessage : 'APP_HOME_LOADING_DEFAULT_MESSAGE',		
        messagesOpened : false,
		requestsOpened : false,
		menuOpened : false,
		messages : [],
		clientsRequests : [],
		selectedRequest : undefined, //this is the main 'on handle' service
		isOnline : false,
		professional : undefined,
		hintsToBeFive : []
		
    }
    

	/**
	 * Dummy data
	 */
	$scope.view.professional = {
		name: 'Nome parceira',
		rating : 4.98,
		picture: 'assets/dev-pics/service-picture-01.png',
		acceptance : '100%',
		rejection : '0%',
		qualityServices : '6.355'
	}

	//5 Star Hints
	$scope.view.hintsToBeFive = [
		{
			name: 'Nome opinião A',
			date : 'dd/mm/aaa',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		{
			name: 'Nome opinião B',
			date : 'dd/mm/aaa',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		{
			name: 'Nome opinião C',
			date : 'dd/mm/aaa',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		{
			name: 'Nome opinião D',
			date : 'dd/mm/aaa',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		}
	]
	$scope.view.clientsRequests = [
		{
			name : 'Miguel Pereira',
			picture: 'assets/dev-pics/service-picture-02.png',
			distanceBetween : 5,
			requestedServices : 'Unhas, depilação, massagem',
			status : 'waiting'
		},
		{
			name : 'Josí Tortuga',
			picture: 'assets/dev-pics/service-picture-03.png',
			distanceBetween : 5,
			requestedServices : 'Unhas, depilação, massagem',
			status : 'accepted'
		}
	]

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
		$scope.view.requestsOpened = false;
		$scope.view.trackingOpened = false;
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
			case 'requests':
				$scope.view.requestsOpened = true;
				break;
			case 'tracking':
				$scope.view.trackingOpened = true;
				break;
			case 'menu':
				$scope.view.menuOpened = true;
				break;
		}

	}


	/************************************** Request panel ***********************************/	
	//#A - When a request is selected from the list
	$scope.onSelectClientRequest = function(request){
		//#1 - Reset the selection
		$scope.view.selectedRequest = undefined;
		$timeout(()=>{
			//#2 - Select a new client request
			$scope.view.selectedRequest = request;

			//#3 - Show it in Panel
			$scope.showPanel('tracking');

		})
	};


	//#1 - Load Application Data from Server
	$scope.initialize();


}]);