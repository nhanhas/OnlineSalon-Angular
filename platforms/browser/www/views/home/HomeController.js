app
.controller('HomeController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$sce', 'FrameworkUtils', 'AppService', 'uiGmapGoogleMapApi',  function($rootScope, $scope, $timeout, $location, $http, $q, $sce, FrameworkUtils, AppService, uiGmapGoogleMapApi) {
	
	/**
     * Controller variables
     */
    $scope.view = {
		isLoading : true,
        loadingMessage : 'APP_HOME_LOADING_DEFAULT_MESSAGE',
		favoritesOpened : false,
		messagesOpened : false,
		servicesOpened : false,
		menuOpened : false,
		bookingOpened : false,
		serviceSelected : undefined, //service selected to booking/schedule
		messages : [],
		services : [],
		favorites : [],
		bookingPlaceEnum : [], 		//Client Booking panel Options [PLACE]
		bookingPlaceSelected : 1	//Client Booking panel Options Selected [PLACE]
	}
	
	//Fullfill booking options (Not dynamic...ENUM)
	$scope.view.bookingPlaceEnum = [
		{
			optionLabel : 'APP_HOME_BOOKING_PANEL_PLACE_ENUM_0',
			optionValue : 0
		},
		{
			optionLabel : 'APP_HOME_BOOKING_PANEL_PLACE_ENUM_1',
			optionDescription : 'APP_HOME_BOOKING_PANEL_PLACE_ENUM_1_DESC',
			optionValue : 1
		},
		{
			optionLabel : 'APP_HOME_BOOKING_PANEL_PLACE_ENUM_2',
			optionDescription : 'APP_HOME_BOOKING_PANEL_PLACE_ENUM_2_DESC',
			optionValue : 2
		}
	];


	/**
	 * Later on this will
	 * be dynamic
	 */
	$scope.view.messages = [
		{
			id: 0,
			title: 'OFERTA 50% EM UNHAS',
			date : '12 / 09 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-01.png',
			alreadySeen : false
		},
		{
			id: 1,
			title: 'OFERTA 15% EM TODOS OS SERVIÇOS',
			date : '09 / 09 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-02.png',
			alreadySeen : false
		},
		{
			id: 2,
			title: 'OFERTA 34% EM TRATAMENTOS',
			date : '03 / 08 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-02.png',
			alreadySeen : false
		},
		{
			id: 3,
			title: 'OFERTA 100% EM TUDO',
			date : '19 / 08 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-01.png',
			alreadySeen : false
		}
	]

	//#DEMO DATA
	$scope.view.services = [
		{
			name : 'Miss Piggy',
			date : '12 / 09 / 2018',
			hour : '09h30m',
			status : 'waiting',
			skills : {
				nails : true,
				body : true,
				hair : false,
				treatment : true
			},
			picture : 'assets/dev-pics/service-picture-01.png'
		},
		{
			name : 'Dona Adlaide',
			date : '31 / 09 / 2018',
			hour : '10h15m',
			status : 'confirmed',
			skills : {
				nails : false,
				body : true,
				hair : true,
				treatment : false
			},
			picture : 'assets/dev-pics/service-picture-02.png'
		},
		{
			name : 'Dona Judite',
			date : '22 / 09 / 2018',
			hour : '15h15m',
			status : 'rejected',
			skills : {
				nails : false,
				body : false,
				hair : true,
				treatment : false
			},
			picture : 'assets/dev-pics/service-picture-03.png'
		},
		{
			name : 'Maria Cátia',
			date : '13 / 09 / 2018',
			hour : '14h15m',
			status : 'waiting',
			skills : {
				nails : true,
				body : false,
				hair : false,
				treatment : false
			},
			picture : 'assets/dev-pics/service-picture-04.png'
		},
		{
			name : 'Alice Vanessa',
			date : '10 / 09 / 2018',
			hour : '14h15m',
			status : 'confirmed',
			skills : {
				nails : false,
				body : false,
				hair : true,
				treatment : false
			},
			picture : 'assets/dev-pics/service-picture-05.png'
		}
	];
	$scope.view.services = [];

	$scope.view.favorites = [
		{
			id : 'stamp-0001',
			name : 'Maria Augusta',
			location : 'in',
			rating: '4,98',
			skills : {
				nails : true,
				body : false,
				hair : true,
				treatment : true
			},
			coords: {
				latitude: 38.7154824,
				longitude: -9.1488502
			},
			picture : 'assets/dev-pics/service-picture-01.png'
		},
		{
			id : 'stamp-0002',
			name : 'Lusobrasileira',
			location : 'in/out',
			rating: '5,00',
			skills : {
				nails : false,
				body : true,
				hair : false,
				treatment : true
			},
			coords: {
				latitude: 38.7354822,
				longitude: -9.1288501
			},
			picture : 'assets/dev-pics/service-picture-04.png'
		}
	]


	//#INITIALIZE Home data
	$scope.initialize = function(){
		
		//#1 - Prepare Queue of promises
		let promises = [];
		//#1.1 - Promotions
		promises.push($scope.getAllPromotions());
		//#1.2 - All Service
		promises.push($scope.getAllServices());

		//#Finally get all promises
		$q.all(promises).then((result)=>{
			//Show screen
			$scope.view.isLoading = false;
		});

	};

	/**
	 * Functions to retrieve 
	 * server data
	 */
	//#A - Get Promotions from server
	$scope.getAllPromotions = function(){
		//#0 - Reset messages list 
		$scope.view.messages = [];

		//#1 - Get Promotions by calling server
		return AppService.HOME_getPromotions().then((result)=>{

			console.log(result);

			//#2 - Process result
			if(result && result.data){
				let listOfPromo = result.data;
				
				//#Note - index to carousel
				let index = 0;
				//#3 - Iterate list to prepare to show
				listOfPromo.forEach((promotion)=>{

					//#3.1 - Create a new item 
					let newMessage = {
						id: index,
						promoIdentifier: promotion.id,//it is a server identifier
						title: promotion.title,
						date : promotion.date_init,
						description : $sce.trustAsHtml(promotion.content),
						picture : promotion.image_url,
						alreadySeen : false
					};

					//#3.2 - Push it to messages List
					$scope.view.messages.push(newMessage);
					index++;
				});

			}

		});
	};

	//#A - Get All Services from server
	$scope.getAllServices = function(){
		
		//#1 - Get All Services by calling server
		return AppService.HOME_getAllServices().then((result)=>{
			console.log(result);
		});
	};

	/**
	 * Behaviour functions Panels
	 */
	
	//#A - Allow to show/hide panels (param <panel> = undefined, will close all)
	$scope.showPanel = function(panel){
		//#1 - First we reset all 'Opened' flags
		$scope.view.favoritesOpened = false;
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
			case 'favorites':
				$scope.view.favoritesOpened = true;
				break;
			case 'menu':
				$scope.view.menuOpened = true;
				break;
			//#ii - services sections	
			case 'booking':
				$scope.view.bookingOpened = true;
				break;
			case 'schedule':
				$scope.view.scheduleOpened = true;
				break;
		}

	}

	/************************************** Messages ************************************/
	//#A - Dismiss message
	$scope.dismissMessage = function(message){
		alert(JSON.stringify(message));
	}

	/************************************** Favorites ***********************************/
	//#A - Book a Favorite service
	$scope.onBookHandler = function(favorite){
		//TODO - iterate list of ALL services, and get the service with favorite.id
		$scope.dummyPartnerServices = [
			{
				categoryName : 'Unhas',
				location : 'in/out',
				totalPickedItems : 0,
				totalPriceItems : 0,
				subCategories : [
					{
						subCategoryName : 'Manicure',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionPrice : 9,
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionPrice : 11,
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionPrice : 14,
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionPrice : 16,
								optionSelected : false
							}, 
						]
					},
					{
						subCategoryName : 'Pedicure',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionPrice : 5,
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionPrice : 16,
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionPrice : 17,
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionPrice : 24,
								optionSelected : false
							}, 
						]
					}   
				]
			},
			{
				categoryName : 'Face',
				location : 'in',
				totalPickedItems : 0,
				totalPriceItems : 0,
				subCategories : [
					{
						subCategoryName : 'Relaxe',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionPrice : 2,
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionPrice : 5,
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionPrice : 15,
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionPrice : 17,
								optionSelected : false
							}, 
						]
					},
					{
						subCategoryName : 'Outros',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionSelected : false
							}, 
						]
					}   
				]
			},
			{
				categoryName : 'Cabelo',
				location : 'out',
				totalPickedItems : 0,
				totalPriceItems : 0,
				subCategories : [
					{
						subCategoryName : 'Manicure',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionPrice : 16,
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionPrice : 24,
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionPrice : 56,
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionPrice : 76,
								optionSelected : false
							}, 
						]
					},
					{
						subCategoryName : 'Pedicure',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionSelected : false
							}, 
						]
					}   
				]
			},
			{
				categoryName : 'Corpo',
				location : 'in/out',
				totalPickedItems : 0,
				totalPriceItems : 0,
				subCategories : [
					{
						subCategoryName : 'Manicure',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionPrice : 22,
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionPrice : 33,
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionPrice : 32,
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionPrice : 42,
								optionSelected : false
							}, 
						]
					},
					{
						subCategoryName : 'Pedicure',
						numberOfPicked : 0,
						pricePicked : 0,
						options : [ 
							{
								optionLabel : 'Normal',
								optionPrice : 12,
								optionSelected : false
							}, 
							{
								optionLabel : 'Francesa',
								optionPrice : 22,
								optionSelected : false
							}, 
							{
								optionLabel : 'Gelinho',
								optionPrice : 32,
								optionSelected : false
							},
							{
								optionLabel : 'Art',
								optionPrice : 42,
								optionSelected : false
							}, 
						]
					}   
				]
			}
		]
		
		//#1 - Mark service as view selected
		$scope.view.serviceSelected = undefined;
		$scope.view.serviceSelected = favorite;

		//#2 - Show the booking panel
		$scope.showPanel('booking');

	}

	//#B - Schedule a Favorite service
	$scope.onScheduleHandler = function(favorite){
		//TODO - iterate list of ALL services, and get the service with favorite.id
		
		//#1 - Mark service as view selected
		$scope.view.serviceSelected = undefined;
		$scope.view.serviceSelected = favorite;

		//#2 - Show the booking panel
		$scope.showPanel('schedule');
	}

	/************************************** Menu ***********************************/
	$scope.gotoProfile = function(){
		$location.path('/profile');
	}

	/************************************** Booking panel ***********************************/
	//#A - Display total items picked
	$scope.getTotalServicesPicked = function(){
		let totalServices = 0;

		//#1 - Iterate each service to get info 
		$scope.dummyPartnerServices.forEach((service)=>{
			totalServices += service.totalPickedItems;
		})
		return totalServices;
	}
	//#B - Display total price
	$scope.getTotalPriceFromPickedService = function(){
		let totalPriceServices = 0;

		//#1 - Iterate each service to get info 
		$scope.dummyPartnerServices.forEach((service)=>{
			totalPriceServices += service.totalPriceItems;
		})
		return totalPriceServices;
	}

	//#C - Book reservation confirm
	$scope.confirmBookReservation = function(){
		//#1 - get the service selected
		let service = $scope.view.serviceSelected;

		//#DEMO - insert service in "services list"
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var hh = today.getHours();
		var minutes = today.getMinutes();
		var yyyy = today.getFullYear();
		if(dd<10){
		dd='0'+dd;
		} 
		if(mm<10){
			mm='0'+mm;
		} 
		var today = dd+'/'+mm+'/'+yyyy;

		service.date = today,
		service.hour = hh + 'h' + minutes + 'm' ,
		service.status = 'waiting',
		$scope.view.services.push(service);

		//#show services panel
		$scope.showPanel('services');
	};


	//#1 - Load Application Data from Server
	$scope.initialize();



	
	
	//#TEST Function 
	$scope.inputModel = '';
	$scope.testFunction = function (){
		alert('testFunction');
	}


}]);
