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
		executionOpened: false,
		trackingOpened : false,
		menuOpened : false,
		messages : [],
		clientsRequests : [],
		selectedRequest : undefined, //this is the main 'on handle' service
		isClientRequestExpanded : false, //this variable is changed only on <client-request>
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
			id: 1,
			name : 'Miguel Pereira',
			picture: 'assets/dev-pics/service-picture-02.png',
			distanceBetween : 5,
			requestedServices : 'Unhas, depilação, massagem',
			status : 'waiting',
			payment: {
				status : '',
				services: 2,
				total : 15,								
			},
			rating : 0,
			coords : { latitude : 38.7445443, longitude : -9.1508589 }
		},
		{
			id : 2,
			name : 'Josí Tortuga',
			picture: 'assets/dev-pics/service-picture-03.png',
			distanceBetween : 5,
			requestedServices : 'Unhas, depilação, massagem',
			status : 'accepted',
			payment: {
				status : '',
				services: 5,
				total : 125,								
			},
			rating : 0,
			coords : { latitude : 38.7526079, longitude : -9.168954 }
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

				//#dev mode
				let clientRequest = $scope.view.clientsRequests[0];
				$scope.onSelectClientRequest(clientRequest);
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
		$scope.view.executionOpened = false;
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
			case 'execution':
				$scope.view.executionOpened = true;
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
		$scope.view.isClientRequestExpanded = false;
		$timeout(()=>{
			//#2 - Select a new client request
			$scope.view.selectedRequest = request;

			//#3 - Show it in Panel
			$scope.showPanel('tracking');

		})
	};


	/************************************** Tracking panel ***********************************/	
	//#A - When a request selected is accepted from tracking panel
	$scope.onAcceptClient = function(request){
		//#1 - Update to Accepted status
		request.status = 'accepted';
		//#2 - Update select service object (must be the same as reques)
		$scope.view.selectedRequest = request;
	}

	//#B - When a request selected is reject from tracking panel
	$scope.onRejectClient = function(request){
		//#1 - Remove it from the list
		for(var i = 0; i < $scope.view.clientsRequests.length; i++){
			if($scope.view.clientsRequests[i].id === request.id){
				$scope.view.clientsRequests.splice(i, 1);
			}
		}

		//#2 - remove service selected from focus
		$scope.selectedRequest = undefined;
		//#3 - go to list services		
		$scope.showPanel('requests');
	}

	//#C - When a request selected is started from tracking panel
	$scope.onStartClient = function(request){
		//#1 - Update select service object (must be the same as reques)
		$scope.view.selectedRequest = request;

		$scope.showPanel('execution');
	}

	//#D - When a request selected is called to finish
	$scope.onFinishRequest = function(){
		//#1 - mark request as finished
		$scope.view.selectedRequest.status = 'finished';

		//#2 - Update payment status to 'in-course'
		$scope.view.selectedRequest.payment.status = 'in-course';

		//#3 - TODO REMOVE 
		$scope.view.isLoading = true;
        $scope.view.loadingMessage = 'APP_HOME_PRO_SERVICES_EXECUTION_PANEL_FINISHING_LOADING';
		$timeout(()=>{
			$scope.view.isLoading = false;
			$scope.view.selectedRequest.payment.status = 'paid';
		}, 3000)
	}

	//#E - When a request selected is called to finish
	$scope.onExpandInfoClient = function(request, isExpanded){
		$timeout(()=>{
			$scope.view.isClientRequestExpanded = isExpanded;
		});
		
	};

	//#1 - Load Application Data from Server
	$scope.initialize();


}]);