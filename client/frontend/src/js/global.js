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
/**
 * Created by achao_zju on 2017/4/17.
 */
var myController=angular.module('myController',[]);
myController.controller('mliController',['$scope','$http','$routeParams','$location','$rootScope',
    function ($scope,$http,$routeParams,$location,$rootScope) {
        $rootScope.orderProp='-time';
        $scope.type=$routeParams.type;
        $scope.count=1;
        $scope.hintMessage="显示更多新闻";
        if($scope.type!==undefined) {
            $http({
                method: 'get',
                url: 'client/backend/php/showList.php',
                params: {'type': $scope.type,'count':$scope.count}
            }).success(function (data) {
                $scope.articles = data.list;
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
                $scope.articles=$scope.articles.concat(data.list);
                $scope.count++;
                if(data.num<10){
                    $scope.hintMessage="没有更多新闻了";
                }
            }).error(function (data) {
                console.log("error messgae:" + data);
            });
        };
        $scope.getDetail=function(item) {
            $location.path($scope.type+"/"+item.id);
            //window.open(item.src);
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

myController.controller('detailController',['$scope','$http','$routeParams',
    function($scope,$http,$routeParams){
        $http({
            method:'get',
            url:'client/backend/php/getDetail.php',
            params:{'id':$routeParams.id,'type':$routeParams.type}
        }).success(function (data) {
            $scope.news=data;        
        }).error(function (data) {
            console.log("error messgae:" + data);
        });
}]);


$(document).ready(function(){
    $('#user_name').bind('blur',function(){ // 检查账号合法性
        var user_name=$('#user_name').val();
        if(user_name.length<6){
             $('.warn-info').first().text('* 用户名至少6位字符');
             return;
        }
        $.ajax({
            url:"client/backend/php/checkUserName.php?user_name="+user_name,
            method:"get",
            success:function(data){
                if(data.num>0){
                    $('.warn-info').first().text('* 用户名重复');
                }else{
                    $('.warn-info').first().text('');
                }
            }
        });
    });
    $("#signUp input:eq(1)").bind('blur',function(){
        var password=$(this).val();
        if(password.length<6){
            $('.warn-info:eq(1)').text('* 密码至少6位字符');
        }else{
            $('.warn-info:eq(1)').text('');
        }
    });
    $('#signUp input:eq(2)').bind('blur',function(){
        var rePassword=$(this).val();
        var password=$('#signUp input:eq(1)').val();
        if(password!=rePassword){
            $('.warn-info:eq(2)').text('* 密码不一致');
        }else{
            $('.warn-info:eq(2)').text('');
        }
    });
    $('#signUp input:eq(3)').bind('blur',function(){
        var email=$(this).val();
        var reg=/^\w+@\w+\.(com)$/;
        if(!email.match(reg)){
            $('.warn-info:eq(3)').text('* 不是有效邮箱');
        }else{
            $('.warn-info:eq(3)').text('');
        }
    });
});

