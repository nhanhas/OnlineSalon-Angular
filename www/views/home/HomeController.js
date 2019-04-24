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
		searchOpened : false,
		bookingOpened : false,
		serviceSelected : undefined, //service selected to booking/schedule
		messages : [],
		services : [],
		favorites : [],
		allServicesToOffer : [],
		servicesArround: [], 
		bookingPlaceEnum : [], 		//Client Booking panel Options [PLACE]
		bookingPlaceSelected : 1,	//Client Booking panel Options Selected [PLACE]
		//for search panel
		search: {
			mode: 'default',
			services : [], //this is a clone of 'allServicesToOffer'
		}

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
	$scope.view.favorites = [];

	//#INITIALIZE Home data
	$scope.initialize = function(){
		
		//#1 - Prepare Queue of promises
		let promises = [];
		//#1.1 - Promotions
		promises.push($scope.getAllPromotions());
		//#1.2 - All Service
		promises.push($scope.getAllServices());
		//#1.3 - All professional services
		//promises.push($scope.getProfessionalsArround()); - This will be inside getAllservices

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

	//#B - Get All Services from server
	$scope.getAllServices = function(){
		
		//#1 - Get All Services by calling server
		return AppService.HOME_getAllServices().then((result)=>{
			console.log(result);
			//#1.1 - Fulfill services to offer list
			$scope.view.allServicesToOffer = result.data;
			//#1.2 - init our search panel
			$scope.initSearchPanel();

			//#2 - We call professionals here because the promise of all services
			$scope.getProfessionalsArround();

			//#3 - Get booked services
			$scope.getBookedServices();
		});
	};

	//#C - Get All Professionals arround from server
	$scope.getProfessionalsArround = function(){
		//#0 - Get Logged User
		let userInfo = FrameworkUtils.getLoggedUser();

		//#1 - Get current position/dummy position (depending on permissions)
		return FrameworkUtils.getUserCurrentPosition().then((localizationParam)=>{
			localizationParam.id_user = userInfo.id_user;
			localizationParam.distance = 50;
			//#2 - Get Professionals Arround by calling server
			return AppService.HOME_getProfessionalsArround(localizationParam).then((result)=>{
				console.log(result);
				//#2.0 - reset all arround services
				$scope.view.favorites = [];
				let services = result.data;
				//#2.1 - Fulfill services props and push it 
				services.forEach((serviceItem) => {
					let newService = new ServiceVO();
					newService.id = serviceItem.id_prof;

					newService.name = serviceItem.name;    
					newService.email = serviceItem.email;    
					newService.phone = serviceItem.phone;    
					newService.address1 = serviceItem.address1;    
					newService.rating = '';
					newService.picture = (serviceItem.photo && serviceItem.photo !== '') ? serviceItem.photo : newService.picture;

					//#2.2 - [in, out, in/out]
					newService.location = ((service)=>{
						if(service.in === "1")
							return 'in';
						if(service.out === "1")
							return 'out';
						if(service.in_e_out === "1")
							return 'in/out';
						if(service.busy === "1")
							return 'busy';
					})(serviceItem);

					//#2.3 - Main skills
					newService.skills = ((service)=>{
						let skills = {	nails : false,
										body : false,
										hair : false,
										treatment : false
									};
						skills.nails = serviceItem.main_services.includes("3");
						skills.body = serviceItem.main_services.includes("6");
						skills.hair = serviceItem.main_services.includes("5"); 
						skills.treatment = serviceItem.main_services.includes("1");//TODO
						return skills;
					})(serviceItem);

					//#2.4 - World Coordinates
					newService.coords = { latitude: parseFloat(serviceItem.lat), longitude: parseFloat(serviceItem.long) };
					
					//#2.5 - Parse all services available to partner services
					newService.getServices(serviceItem.services, $scope.view.allServicesToOffer);

					//#3 - Push it to services Arround array
					$scope.view.favorites.push(newService);					
				});
			});

			
		});		
	};

	//#D - Get list of requested services
	$scope.getBookedServices = function(){
		//#1 - Get logged user
		let userInfo = FrameworkUtils.getLoggedUser();
		let serviceParam = { id_client : userInfo.id_user};
		//#2 - Get List of booked services Arround by calling server
		return AppService.HOME_getBookedServices(serviceParam).then((result)=>{
			console.log(result);
			//#2.0 - reset all arround services
			$scope.view.services = [];
			let services = result.data;
			//#2.1 - Fulfill services props and push it 
			services.forEach((serviceItem) => {
				let newService = new ServiceVO();
				newService.id = serviceItem.id_reserve;

				newService.name = serviceItem.name;    
				newService.email = serviceItem.email;    
				newService.phone = serviceItem.phone;    
				newService.address1 = serviceItem.address1;    
				newService.rating = '';
				newService.picture = (serviceItem.photo && serviceItem.photo !== '') ? serviceItem.photo : newService.picture;

				newService.date = serviceItem.date_service !== '' ? serviceItem.date_service.split(' ')[0] : '';
        		newService.hour = serviceItem.date_service !== '' ? serviceItem.date_service.split(' ')[1] : '';

				//#2.2 - [in, out, in/out]
				newService.location = ((service)=>{
					if(service.in === "1")
						return 'in';
					if(service.out === "1")
						return 'out';
					if(service.in_e_out === "1")
						return 'in/out';
					if(service.busy === "1")
						return 'busy';
				})(serviceItem);

				//#2.3 - Main skills
				newService.skills = ((service)=>{
					let skills = {	nails : false,
									body : false,
									hair : false,
									treatment : false
								};
					skills.nails = serviceItem.main_services.includes("3");
					skills.body = serviceItem.main_services.includes("6");
					skills.hair = serviceItem.main_services.includes("5"); 
					skills.treatment = serviceItem.main_services.includes("4");//TODO
					return skills;
				})(serviceItem);

				//#2.4 - World Coordinates
				newService.coords = { latitude: parseFloat(serviceItem.lat), longitude: parseFloat(serviceItem.long) };
				
				//#2.5 - Parse all services available to partner services
				newService.getServices(serviceItem.services, $scope.view.allServicesToOffer);

				//#2.6 - Status
				newService.status = ((status)=>{
					switch (status) {
						case '1':
							return 'waiting';
						case '2':
							return 'confirmed';							
						case '3':							
							return 'rejected';
					}
				})(serviceItem.estado);

				//#3 - Push it to services Arround array
				$scope.view.services.push(newService);					
			});
		});
	};
	
	/**
	 * Behaviour functions Panels
	 */
	window.onpopstate = function () {
		$timeout(()=>{
			$scope.showPanel(undefined, true);
		});		
    };
	//#A - Allow to show/hide panels (param <panel> = undefined, will close all)
	$scope.showPanel = function(panel, isBrowserPopState = false){
		//#1 - First we reset all 'Opened' flags
		$scope.view.favoritesOpened = false;
		$scope.view.messagesOpened = false;
		$scope.view.servicesOpened = false;
		$scope.view.menuOpened = false;
		$scope.view.searchOpened = false;

		//#services panel reset (booking/schedule a service)
		$scope.view.bookingOpened = false;
		$scope.view.scheduleOpened = false;

		//#2 - Set visible the requested panel
		if(panel !== undefined)
			history.pushState(null, null, location.href);	
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
			case 'search':
				$scope.view.searchOpened = true;
				break;	
			//#ii - services sections	
			case 'booking':
				$scope.view.bookingOpened = true;
				break;
			case 'schedule':
				$scope.view.scheduleOpened = true;
				break;
			default:
				if(!isBrowserPopState)
					history.back();
				break;
		}

	}

	/************************************** Messages ************************************/
	//#A - Dismiss message
	$scope.dismissMessage = function(message){
		//#1 - Remove it from list of messages		
		$scope.view.messages.splice($scope.view.messages.findIndex(messageItem => messageItem.promoIdentifier === message.promoIdentifier), 1);		
		//#1.1 - We have to add class of active in 1st one again		
		$timeout(()=>{
			jQuery('.item').removeClass('active')
			if($scope.view.messages.length > 0){
				jQuery('.item:nth-of-type(1)').addClass('active');
			}
		});
		
		//#2 - set up parameter to server
		let setPromotionParam = {
			id_user : FrameworkUtils.getLoggedUser().id_user,
			id_news : message.id
		}

		//#3 - Call server to dismiss message
		return AppService.HOME_setPromotions(setPromotionParam);
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
		$timeout(()=>{
			$scope.view.serviceSelected = favorite;
		})		

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
	//#A - Go to a specific menu page
	$scope.goToMenuOption = function(option){
		//#1 - Navigate depending on option
		switch (option) {
			case 'profile':
				$location.path('/profile');
				break;
			case 'services-menu':
				$location.path('/services-menu');
				break;
			case 'promotions-menu':
				$location.path('');
				break;			
			case 'help-menu':
				$location.path('');
				break;
			case 'contacts-menu':
				$location.path('');
				break;	
			case 'legal-menu':
				$location.path('');
				break;		
			default:
				break;
		}		
	}

	/************************************** Booking panel ***********************************/	
	//#A - Book reservation confirm
	$scope.confirmBookReservation = function(){
		//#1 - get the service selected
		let service = $scope.view.serviceSelected;
		let pickedServices = service.getPickedServices();

		let requestServiceParam = {
			id_client: FrameworkUtils.getLoggedUser().id_user,
			id_profissional : service.id,
			services: pickedServices,
			in_out: service.location,
			address: service.address1,
			price: service.getTotalPriceFromPickedService(),
			date_service: (()=>{
				//#1 - parse date
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
				//#2 - return formatted date
				return dd+'-'+mm+'-'+yyyy+ ' ' + hh+':'+minutes+':00';
			})()
		};

		$scope.view.isLoading = true;
        $scope.view.loadingMessage = 'APP_HOME_BOOKING_PANEL_SCHEDULENOW_BUTTON_LOADING';

		//#2 - Request a service to server
		return AppService.HOME_requestService(requestServiceParam).then((result)=>{
			console.log(result);

			$scope.view.isLoading = false;

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

		});


		
	};

	/************************************** Services panel ***********************************/	
	$scope.cancelService = function(service){
		//#1 - Remove it from list of messages		
		$scope.view.services.splice($scope.view.services.findIndex(serviceItem => serviceItem.id === service.id), 1);		

		//#2 - set up parameter to server
		let cancelServiceParam = {
			id_service : service.id,
			status : 4
		}

		$scope.view.isLoading = true;
        $scope.view.loadingMessage = 'APP_HOME_SERVICES_PANEL_CANCEL_SERVICE_LOADING';
		//#3 - Call server to cancel service
		return AppService.HOME_updateService(cancelServiceParam).then((result)=>{
			//#4 - Reload again booked services
			return AppService.HOME_getBookedServices().then((resultBooked)=>{
				$scope.view.isLoading = false;
        		$scope.view.loadingMessage = '';
			})
		});
	};

	/************************************** Search panel ***********************************/	
	//#A  - This function will initialize and reset panel options
	$scope.initSearchPanel = function(){
		//#1 - Make a copy of services
		$scope.view.search.services = angular.copy($scope.view.allServicesToOffer);
	};

	//#B - Behavior when a main category is selected
	$scope.searchSelectCategory = function(category){
		let oldValueSelection = category.picked;
		//#1 - iterate category items to mark them
		category.subCategories.forEach((subCategory)=>{
			subCategory.picked = !oldValueSelection;
		});
		//#2 - marke categoy as picked
		category.picked = !oldValueSelection;
	};

	//#C - Function when a subcategory is selected
	$scope.searchSelectSubCategory = function(subCategory, category){
		//#1 - initialize as All Selected
		let isAllCategorySelected = true 
		category.subCategories.forEach((subCategoryItem)=>{
			if(subCategoryItem === subCategory){
				subCategory.picked = !subCategory.picked;
				
			}
			//Update category picked
			isAllCategorySelected = isAllCategorySelected && subCategoryItem.picked;
		});

		//#2 - Update category with 'all selected' 
		category.picked = isAllCategorySelected;
	};

	//#1 - Load Application Data from Server
	$scope.initialize();



	
	
	//#TEST Function 
	$scope.inputModel = '';
	$scope.testFunction = function (){
		alert('testFunction');
	}


}]);
