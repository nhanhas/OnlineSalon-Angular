app
.controller('ServicesMenuController', ['$rootScope', '$scope', '$timeout', '$location', '$http','$q', '$translate', 'FrameworkUtils', 'AppService',   function($rootScope, $scope, $timeout, $location, $http, $q, $translate,FrameworkUtils, AppService) {
    

    //# - Close Screen and go Home
    $scope.closeMenu = function(){
        $location.path('/home');
    }

}]);
