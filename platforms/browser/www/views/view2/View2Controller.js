app
.controller('View2Controller', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', 'FrameworkUtils', 'AppService',   function($rootScope, $scope, $timeout, $location, $http, $q, FrameworkUtils, AppService) {

	//For inputs
	$scope.inputModel = '';

	//For Option Picker
	$scope.numberOfPicked = 0;
	$scope.optionPickerOptions = [ 
		{
			optionLabel : 'Normal',
			optionDescription : 'Fazer pequeno tratamento',
			optionSelected : false
		}, 
		{
			optionLabel : 'Francesa',
			optionSelected : false
		}, 
		{
			optionLabel : 'Gelinho',
			optionDescription : 'Fazer longo tratamento',
			optionSelected : false
		},
		{
			optionLabel : 'Art',
			optionSelected : false
		}, 
	];

	//For Dropdowns
	$scope.dropdownPickedItems = 0;
	$scope.dropdownOptions = {
        categoryName : 'Unhas',
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
    }

	//For Radios
	$scope.radioSelected = 1;
	$scope.radioOptions = [ 
		{
			optionLabel : 'Normal',
			optionDescription : 'Fazer pequeno tratamento',
			optionValue : 0
		}, 
		{
			optionLabel : 'Francesa',
			optionValue : 1
		}, 
		{
			optionLabel : 'Gelinho',
			optionDescription : 'Fazer longo tratamento',
			optionValue : 2
		},
		{
			optionLabel : 'Art',
			optionValue : 3
		}, 
	];
	
	//#TEST Function 
	$scope.testFunction = function (){
		alert('testFunction');
	}
	//#TEST Function 
	$scope.testFunction = function (object){
		alert(JSON.stringify(object));
	}

	//Message object
	$scope.view = {
		message : {
			title: 'OFERTA 15% EM TODOS OS SERVIÇOS',
			date : 'dd / mm / aaaa',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			picture : 'assets/dev-pics/message-picture-01.png',
			alreadySeen : false
		},
		service : {
			name : 'Nome parceira',
			date : 'dd / mm / aaaa',
			hour : '00h00m',
			status : 'waiting',
			skills : {
				nails : true,
				body : true,
				hair : false,
				treatment : true
			},
			picture : 'assets/dev-pics/service-picture-01.png'
		},
		favorite : {
			name : 'Nome parceira',
			location : 'in/out',
			rating: '4,98',
			skills : {
				nails : true,
				body : true,
				hair : false,
				treatment : true
			},
			picture : 'assets/dev-pics/service-picture-01.png'
		}
	}


}]);
