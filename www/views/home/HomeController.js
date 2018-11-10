app
.controller('HomeController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', 'FrameworkUtils', 'AppService', 'uiGmapGoogleMapApi',  function($rootScope, $scope, $timeout, $location, $http, $q, FrameworkUtils, AppService, uiGmapGoogleMapApi) {

	/**
     * Controller variables
     */
    $scope.view = {
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
			title: 'OFERTA 50% EM UNHAS',
			date : '12 / 09 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-01.png',
			alreadySeen : false
		},
		{
			title: 'OFERTA 15% EM TODOS OS SERVIÇOS',
			date : '09 / 09 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-02.png',
			alreadySeen : false
		},
		{
			title: 'OFERTA 34% EM TRATAMENTOS',
			date : '03 / 08 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-02.png',
			alreadySeen : false
		},
		{
			title: 'OFERTA 100% EM TUDO',
			date : '19 / 08 / 2018',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-01.png',
			alreadySeen : false
		}
	]

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
				latitude: 45.1451,
				longitude: -89.6680
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
				latitude: 40.1451,
				longitude: -99.6680,
			},
			picture : 'assets/dev-pics/service-picture-04.png'
		}
	]




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
				subCategories : [
					{
						subCategoryName : 'Manicure',
						numberOfPicked : 0,
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
					},
					{
						subCategoryName : 'Pedicure',
						numberOfPicked : 0,
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
				categoryName : 'Face',
				location : 'in',
				totalPickedItems : 0,
				subCategories : [
					{
						subCategoryName : 'Relaxe',
						numberOfPicked : 0,
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
					},
					{
						subCategoryName : 'Outros',
						numberOfPicked : 0,
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
				subCategories : [
					{
						subCategoryName : 'Manicure',
						numberOfPicked : 0,
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
					},
					{
						subCategoryName : 'Pedicure',
						numberOfPicked : 0,
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
				subCategories : [
					{
						subCategoryName : 'Manicure',
						numberOfPicked : 0,
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
					},
					{
						subCategoryName : 'Pedicure',
						numberOfPicked : 0,
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







	$scope.inputModel = '';
	
	//#TEST Function 
	$scope.testFunction = function (){
		alert('testFunction');
	}


}]);