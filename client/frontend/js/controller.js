/**
 * Created by achao_zju on 2017/4/17.
 */
var myController=angular.module('myController',[]);
myController.controller('mliController',['$scope','$http','$routeParams','$location',
    function ($scope,$http,$routeParams,$location) {
        $scope.orderProp='-time';
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
        };
}]);