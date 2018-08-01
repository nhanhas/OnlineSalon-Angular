app
.controller('View2Controller', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', 'FrameworkUtils', 'AppService',   function($rootScope, $scope, $timeout, $location, $http, $q, FrameworkUtils, AppService) {

	//For inputs
	$scope.inputModel = '';

	//For Dropdowns
	$scope.dropdownOptions = {
        categoryName : 'Unhas',
        location : 'out',
        subCategories : [
            {
                subCategoryName : 'Manicure',
                selectedOption : 0,
                options : [ 
                    {
                        optionLabel : 'Normal',
                        optionValue : 0
                    }, 
                    {
                        optionLabel : 'Francesa',
                        optionValue : 1
                    }, 
                    {
                        optionLabel : 'Gelinho',
                        optionValue : 2
                    },
                    {
                        optionLabel : 'Art',
                        optionValue : 3
                    }, 
                ]
            },
            {
                subCategoryName : 'Pedicure',
                selectedOption : 0,
                options : [ 
                    {
                        optionLabel : 'Normal',
                        optionValue : 0
                    }, 
                    {
                        optionLabel : 'Francesa',
                        optionValue : 1
                    }, 
                    {
                        optionLabel : 'Gelinho',
                        optionValue : 2
                    },
                    {
                        optionLabel : 'Art',
                        optionValue : 3
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
