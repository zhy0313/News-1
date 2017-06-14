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
                url: 'backend/php/showList.php',
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
                url:'backend/php/showList.php',
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

myController.controller('indexController',['$scope','$http','ifLogin','$location',
    function ($scope,$http,ifLogin,$location) {
        $http({
            method: 'get',
            url:'backend/php/showHot.php'
        }).success(function (data) {
            if(data.ifLogin){
                ifLogin.keepLogin();
            }
            $scope.hots=data.hots;
            $scope.hots.forEach(function (val,index,arr) {
                switch($scope.hots[index].type){
                    case 'mli':$scope.hots[index].typeCn='军事新闻';break;
                    case 'edu':$scope.hots[index].typeCn='教育新闻';break;
                    case 'sci':$scope.hots[index].typeCn='科技新闻';break;
                    case 'eco':$scope.hots[index].typeCn='经济新闻';break;
                    case 'spo':$scope.hots[index].typeCn='体育新闻';break;
                    default:$scope.hots[index].typeCn='其他新闻';break;
                }
            });
            data.mlis.name='军事';
            data.scis.name='科技';
            data.edus.name='教育';
            data.spos.name='体育';
            data.ecos.name='经济';

            $scope.types=[];
            $scope.types.push(data.mlis,data.scis,data.edus,data.spos,data.ecos);

        }).error(function (data) {
            console.log("error messgae:" + data);
        });
        $scope.getDetail=function (item,type) {
           $location.path(type+"/"+item.id);
        };
        
}]);

myController.controller('detailController',['$scope','$http','$routeParams','ifLogin',
    function($scope,$http,$routeParams,ifLogin){
        $http({
            method:'get',
            url:'backend/php/getDetail.php',
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

myController.controller('preController',['$scope','$http','$routeParams','$rootScope',
    function($scope,$http,$routeParams,$rootScope){
        $scope.types=[{'name':'军事','value':"mli"},{'name':'科技',"value":"sci"},{'name':'教育',"value":'edu'},{'name':'体育',"value":'spo'},{'name':'经济',"value":"eco"}];
        for(var index in $scope.types){
            $scope.types[index].ifCheck=true;
        }
        $scope.chooseAll=function(){
            for(var index in $scope.types){
                $scope.types[index].ifCheck=true;
            }  
        };
        $scope.notChooseAll=function(){
            for(var index in $scope.types){
                $scope.types[index].ifCheck=false;
            }  
        };
        $scope.apply=function(){
            var checkedTypes=[];
            for(var index in $scope.types){
                if($scope.types[index].ifCheck){
                    checkedTypes.push($scope.types[index].value);
                }
            }
            $http({
                url:'backend/php/applyPre.php',
                method:'post',
                data:{'pres':checkedTypes,'user_name':$.cookie('user_name')}
            }).success(function(data){
                if(data.data.indexOf('sci')>=0){
                    $rootScope.ifSci=true;
                }else{
                    $rootScope.ifSci=false;
                }
                if(data.data.indexOf('eco')>=0){
                    $rootScope.ifEco=true;
                }else{
                    $rootScope.ifEco=false;
                }
                if(data.data.indexOf('edu')>=0){
                    $rootScope.ifEdu=true;
                }else{
                    $rootScope.ifEdu=false;
                }
                if(data.data.indexOf('spo')>=0){
                    $rootScope.ifSpo=true;
                }else{
                    $rootScope.ifSpo=false;
                }
                if(data.data.indexOf('mli')>=0){
                    $rootScope.ifMli=true;
                }else{
                    $rootScope.ifMli=false;
                }
            });
        };
    }

]);