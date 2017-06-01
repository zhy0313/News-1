/**
 * Created by achao_zju on 2017/4/17.
 */
angular.module('myApp',['ngRoute','myController','ngSanitize'])
.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/index',{
            templateUrl:'client/frontend/build/html/index.html',
            controller:'indexController'
        }).
        when('/up',{
            templateUrl:'client/frontend/build/html/up.html',
            controller:'upController'
        }).
        when('/:type',{
            templateUrl:'client/frontend/build/html/type.html',
            controller:'mliController'
        }).
        when('/:type/:id',{
            templateUrl:'client/frontend/build/html/detail.html',
            controller:'detailController'
        }).
        otherwise({
            redirectTo:'/index'
        });
}])
.service('ifLogin',function(){
    this.keepLogin=function(){
        var right=$('.navbar-nav.navbar-right');
        right.children().first().removeClass('hide').show();
        right.children().eq(1).hide();
        right.children().eq(2).hide();
        $('.navbar-nav.navbar-right li.dropdown>a').html($.cookie('user_name')+'<span class="glyphicon glyphicon-menu-down"></span>');
    };
})
.service('loginOut',function(){
    this.loginOut=function(){
        var right=$('.navbar-nav.navbar-right');
        right.children().first().hide();
        right.children().eq(1).show();
        right.children().eq(2).show();
    };
})
.run(['$rootScope','$http','loginOut',function($rootScope,$http,loginOut){
    $rootScope.loginOut=loginOut.loginOut;
    $http({
        method:'get',
        url:'client/backend/php/loginOut.php',
        params:{'user_name':$.cookie('user_name')},
    }).success(function(data){
    }).error(function(data){
    });
}]);