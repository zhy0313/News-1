/**
 * Created by achao_zju on 2017/4/17.
 */
var myApp=angular.module('myApp',['ngRoute','myController','ngSanitize']);
myApp.config(['$routeProvider',
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
}]);
myApp.service('ifLogin',function(){
    this.keepLogin=function(){
        var right=$('.navbar-nav.navbar-right');
        right.children().first().removeClass('hide').show();
        right.children().eq(1).hide();
        right.children().eq(2).hide();
        $('.navbar-nav.navbar-right li.dropdown>a').html($.cookie('user_name')+'<span class="glyphicon glyphicon-menu-down"></span>');
    };
});