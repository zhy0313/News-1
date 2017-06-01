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
/**
 * Created by achao_zju on 2017/4/17.
 */
var myController=angular.module('myController',[]);
myController.controller('mliController',['$scope','$http','$routeParams','$location','$rootScope','ifLogin',
    function ($scope,$http,$routeParams,$location,$rootScope,ifLogin) {
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
                if(data.ifLogin){
                    ifLogin.keepLogin();
                }
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

myController.controller('indexController',['$scope','$http','ifLogin',
    function ($scope,$http,ifLogin) {
        ifLogin.keepLogin();
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
            if(data.ifLogin){
                ifLogin.keepLogin();
            }
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
        if(password!==rePassword){
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
        $.ajax({
            url:"client/backend/php/checkEmail.php?email="+email,
            method:"get",
            success:function(data){
                if(data.num>0){
                    $('.warn-info:eq(3)').text('* 邮箱已经被注册');
                }else{
                    $('.warn-info:eq(3)').text('');
                }
            }
        });
    });
    $('#signUp .modal-footer button').eq(1).bind('click',function(){
        var toUp=true;
        var user_name=$('#user_name').val();
        var password=$('#signUp input:eq(1)').val();
        var rePassword=$('#signUp input:eq(2)').val();
        var email=$('#signUp input:eq(3)').val();

        if(user_name.length<6||password.length<6||rePassword!==password){
            toUp=false;
        }
        var reg=/^\w+@\w+\.(com)$/;
        if(!email.match(reg)){
            toUp=false;
        }        
        if(!toUp){
             $('#signUp .modal-footer span').text("* 信息不完整或不合法");
             return;
        }else{
            $('#signUp .modal-footer span').text("");
        }
        
        $.ajax({
            url:"client/backend/php/up.php",
            method:"post",
            datatype:JSON,
            data:{user_name:user_name,password:password,email:email},
            success:function(data){
                if(data.code===0){
                   alert("注册成功");
                   $("#signUp").modal('hide');
                }else{
                    $('#signUp .modal-footer span').text("* 注册失败");                }
            }
        });
    });
    $('#signIn .modal-body input').first().bind('blur',function(){
        if($(this).val().length===0){
            $('#signIn .warn-info').first().text("* 邮箱不得为空");
            return;
        }else{
            $('#signIn .warn-info').first().text("");
        }
        var email=$(this).val();
        var reg=/^\w+@\w+\.(com)$/;
        if(!email.match(reg)){
            $(this).next().text('* 不是有效邮箱');
        }else{
           $(this).next().text('');
        }
    });
    $('#signIn .modal-body input:eq(1)').bind('blur',function(){
        if($(this).val().length===0){
            $(this).next().text("* 密码不得为空");
        }else{
            $(this).next().text("");
        }
    });
    
    $('#signIn .modal-footer button:eq(1)').bind('click',function(){
        var email= $('#signIn .modal-body input').first().val();
        var password=$('#signIn .modal-body input:eq(1)').val();
        var reg=/^\w+@\w+\.(com)$/;
        if(!email||!email.match(reg)||!password){
            $('#signIn .modal-footer .warn-info').text('* 信息不完整或不合法');
        }else{
            $('#signIn .modal-footer .warn-info').text('');
        }
        $.ajax({
            url:"client/backend/php/in.php",
            method:"post",
            datatype:JSON,
            data:{password:password,email:email},
            success:function(data){
                if(data.code===0){
                   alert("登录成功");
                   var right=$('.navbar-nav.navbar-right');
                   right.children().first().removeClass('hide').show();
                   right.children().eq(1).hide();
                   right.children().eq(2).hide();
                   $('.navbar-nav.navbar-right li.dropdown>a').html(data.data.user_name+'<span class="glyphicon glyphicon-menu-down"></span>');
                 //  console.log( $('.navbar-nav.navbar-right li.dropdown>a')[0]);
                   $.cookie('user_name',data.data.user_name);
                   $('#signIn').modal('hide');
                }else{
                    $('#signIn').find('.warn-info').last().text('* '+data.msg);
                }
            }
        });
    });
});

