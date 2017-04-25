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