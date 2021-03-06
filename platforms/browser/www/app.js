var app = angular.module("App", ['ngAnimate', 'ngRoute', 'ui.bootstrap', 'pascalprecht.translate', 'uiGmapgoogle-maps']);

//Routes Configuration 
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginController',
            resolve: {
                appInfo :  function(AppService){
                                return AppService.GENERIC_getGeneralSettings().then((result)=>{
                                    if(result && result.code === 0){
                                        return JSON.parse(result.data);
                                    }
                                    return undefined;
                                });
                            },
            }
        }).
        when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeController'
        }).  //Menus
        when('/profile', {
            templateUrl: 'views/menus/profile/profile.html',
            controller: 'ProfileController'
        }).   
        when('/services-menu', {
            templateUrl: 'views/menus/services-menu/services-menu.html',
            controller: 'ServicesMenuController'
        }).
        when('/view2', {
            templateUrl: 'views/view2/view2.html',
            controller: 'View2Controller'
        }).
        when('/home-pro', {
            templateUrl: 'views/home-pro/home-pro.html',
            controller: 'HomeProController'
        }).
        otherwise({
            redirectTo: '/login' 
        });
}])

//Prepare Translations
app.config(['$translateProvider', function($translateProvider) {

    //Parameters from QueryString 
    let getParameterByName = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    //prepare translations
    let lang = getParameterByName('lang') || 'pt';

    $.getJSON("framework/translations-pt.json", function(json) {
        $translateProvider.translations('pt', json)
    });
    $.getJSON("framework/translations-en.json", function(json) {
        $translateProvider.translations('en', json)
    });
    
    //select language
    $translateProvider.preferredLanguage(lang);

}])

app.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            key: 'AIzaSyCyLSpm5HWUhkaVePlssoSl42A7ilfMsN4',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization',
            china:false
        });
    }]
);

//this is used to show .body-loading, when route resolve is not ready
app.run(['$rootScope', 'FrameworkUtils', 'AppService', function($rootScope, FrameworkUtils, AppService){

    $rootScope.$on('$routeChangeStart',function(event, next){
        //# - This is to show at login the logo spalsh 
        $rootScope.stateIsLoading = true;
        return true;
        //#Uncomment to validate login
        //#1 - We are going to validate user authentication
        if(next.originalPath !== '/login'){

            let loggedUser = FrameworkUtils.getLoggedUser();
            let isAuthenticated = false;
            //#1.1 - if we have cached userInfo, validate it
            if(loggedUser){
                //#TODO - Validate user

            }else{
                //#otherwise - get back to login!
                $location.path = '/login';
            }
                
        }

        //# - This is to show at login the logo spalsh 
        $rootScope.stateIsLoading = true;
   });
  
  
    $rootScope.$on('$routeChangeSuccess',function(){
        $rootScope.stateIsLoading = false;
   });
  
}]);


//App Mode (client or professoial - 'pro' or 'client')
//NOTE: Lower case!
app.constant('APP_CONFIG', { "mode" : 'client' });
