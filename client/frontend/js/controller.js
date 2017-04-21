/**
 * Created by achao_zju on 2017/4/17.
 */
var myController=angular.module('myController',[]);
myController.controller('mliController',['$scope','$http','$routeParams',
    function ($scope,$http,$routeParams) {
        $scope.orderProp='-time';
        $scope.type=$routeParams.type;
        $scope.getDetail=function ($index) {
              window.open($scope.articles[$index].src);
        };
        $http({
            method:'get',
            url:'client/backend/php/showList.php',
            params:{'type':$scope.type}
        }).success(function(data){
            $scope.articles=data;
        }).error(function(data){
            console.log("error messgae:"+data)
        })
}]);