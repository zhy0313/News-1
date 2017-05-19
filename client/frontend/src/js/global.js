/**
 * Created by achao_zju on 2017/4/17.
 */
var myApp=angular.module('myApp',['ngRoute','myController']);
myApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/index',{
            templateUrl:'client/frontend/build/html/index.html',
            controller:'indexController'
        }).
        when('/:type',{
            templateUrl:'client/frontend/build/html/type.html',
            controller:'mliController'
        }).
        otherwise({
            redirectTo:'/index'
        });
}]);
/**
 * Created by achao_zju on 2017/4/17.
 */
var myController=angular.module('myController',[]);
myController.controller('mliController',['$scope','$http','$routeParams','$location','$rootScope',
    function ($scope,$http,$routeParams,$location,$rootScope) {
        $rootScope.orderProp='-time';
        $scope.type=$routeParams.type;
        $scope.count=1;
        if($scope.type!==undefined) {
            $http({
                method: 'get',
                url: 'client/backend/php/showList.php',
                params: {'type': $scope.type,'count':$scope.count}
            }).success(function (data) {
                $scope.articles = data;
            }).error(function (data) {
                console.log("error messgae:" + data);
            });
        }
        $scope.getNext=function(){
            $http({
                method:'get',
                url:'client/backend/php/showList.php',
                params: {'type': $scope.type,'count':$scope.count+1}
            }).success(function(data){
                $scope.count++;
                

            }).error(function (data) {
                console.log("error messgae:" + data);
            });
        };
        $scope.getDetail=function(item) {
            window.open(item.src);
            $http({
                method:'get',
                url:'client/backend/php/count.php',
                params:{'id':item.id,'type':$scope.type}
            }).success(function (data) {
                item.count++;
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
            $scope.hots=data.hots;
            $scope.hots.forEach(function (val,index,arr) {
                switch($scope.hots[index].type){
                    case 'mli':$scope.hots[index].typeCn='军事新闻';break;
                    case 'edu':$scope.hots[index].typeCn='教育新闻';break;
                    case 'sci':$scope.hots[index].typeCn='科技新闻';break;
                    case 'gam':$scope.hots[index].typeCn='游戏新闻';break;
                    case 'ent':$scope.hots[index].typeCn='娱乐新闻';break;
                    default:$scope.hots[index].typeCn='其他新闻';break;
                }
            });
            $scope.mlis=data.mlis;
            $scope.scis=data.scis;
            $scope.edus=data.edus;
            $scope.gams=data.gams;
            $scope.ents=data.ents;
        }).error(function (data) {
            console.log("error messgae:" + data);
        });
        $scope.getDetail=function (item) {
            $http({
                method:'get',
                url:'client/backend/php/count.php',
                params:{'id':item.id,'type':item.type}
            }).success(function (data) {
                item.count++;
            }).error(function (data) {
                console.log("error messgae:" + data);
            });
        };
        
}]);