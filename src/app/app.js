
angular.module('XmppApp', [ 'templates-app', 'templates-common','AngularXmpp','ngSanitize','ui.bootstrap' ]) 
.controller('page', ['$scope','$rootScope','$http','$location', function($scope,$rootScope,$http,$location) {

    var node=$location.$$url;
    if(node){
        $scope.node=node;
    }else{
        $scope.node="/user/lobby@laos.buddycloud.com/posts";
    }
//        $scope.node="recent";
    $scope.setnode=function(node){
        console.log("3333",node);
        $scope.node=node;
        location.hash=node;
    };
    $scope.initchat=function(chat){
        console.log("chat scope",chat);
        $scope.chat=chat;
    };
    $scope.openchat=function(jid){
        console.log("openchat",jid,$scope.chat);
        $scope.chat.openchat(jid);
    };
    $rootScope.$on('$locationChangeSuccess', function (data) {
        console.log('$locationChangeSuccess changed!', new Date(),data);
        console.log("opening",$location,$location.$$url);
        var node=$location.$$url;
        if(node=="/recent"){
            node="recent";
        }
        if(node===""){
            node="recent";
        }
        console.log("this node should open",node);
        $scope.node=node;
    });
}]);

