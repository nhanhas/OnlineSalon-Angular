var app = angular.module("App", ['ngAnimate', 'ngRoute', 'ui.bootstrap', 'pascalprecht.translate']);

//Routes Configuration 
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginController'
        }).
        when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeController'
        }).        
        when('/view2', {
            templateUrl: 'views/view2/view2.html',
            controller: 'View2Controller'
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



