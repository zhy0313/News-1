/**
 * Created by achao_zju on 2017/4/17.
 */
var myController=angular.module('myController',[]);
myController.controller('mliController',['$scope','$http','$routeParams','$location','$rootScope',
    function ($scope,$http,$routeParams,$location,$rootScope) {
        $rootScope.orderProp='-time';
        $scope.type=$routeParams.type;
        if($scope.type!==undefined) {
            $http({
                method: 'get',
                url: 'client/backend/php/showList.php',
                params: {'type': $scope.type}
            }).success(function (data) {
                $scope.articles = data;
            }).error(function (data) {
                console.log("error messgae:" + data)
            });
        }
        $scope.getDetail=function(item) {
            window.open(item.src);
            $http({
                method:'get',
                url:'client/backend/php/count.php',
                params:{'id':item.id,'type':$scope.type}
            }).success(function (data) {
                item.count++;
                console.log('success');
            }).error(function (data) {
                console.log("error messgae:" + data);
            });
        };
}]);

myController.controller('indexController',['$scope','$http',
    function ($scope,$http) {
        $http({
            method: 'get',
            url:'client/backend/php/showHot.php'
        }).success(function (data) {
            $scope.hots=data['hots'];
            $scope.mlis=data['mli'];
            $scope.scis=data['sci'];
        }).error(function (data) {
            console.log("error messgae:" + data)
        });
        
}]);