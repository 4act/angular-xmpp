var APP = null;



angular.module('MyApp', [
  'templates-app', 'templates-common','mgcrea.ngStrap','XmppUI','btford.markdown','tagged.directives.infiniteScroll'])
    .controller('pagecontroller', ['$scope','$rootScope','Xmpp','XmppMessage','buddycloudFactory','$http',
        function($scope,$rootScope,Xmpp,XmppMessage,buddycloudFactory,$http) {
            console.log("--pagecontroller--")
            APP=$scope;
            //$scope.host="http://localhost:3000";
            //$scope.host="https://xmpp-ftw.jit.su/";
            $scope.host="https://laos.buddycloud.com";
            $scope.excludejid="likebot@laos.buddycloud.com";  // ----------- not perfect solution, how to make bot massages invisible?
            $scope.data=buddycloudFactory.data;
            $scope.selectednode={}; 

            $scope.roster=Xmpp.roster;
            $scope.nodes=[];
            
            $scope.messages=XmppMessage.messages;
            $scope.notifications=XmppMessage.notifications;

            $scope.friendRequests={};
            $scope.friendRequestsCount=0;
            $scope.open=function(node){
                console.log(node);
                //ugly programming
                if(typeof(node)=="string"){
                    //console.log("it's a string");
                }else{
                    if(typeof(node)=="object"){
                        node=node.node;
                    }
                }
                $scope.selectednode.node=node;
                $scope.tabs.activeTab = 0;
            };

            $scope.tabs = [
              { "title": "Buddycloud" },
              { "title": "Groupchat" },
              { "title": "Develop" }
            ];
            $scope.tabs.activeTab = 0;

            $scope.find=function(text){
                $scope.search=text; 
                console.log(text);
                /*
                var url="https://laos.buddycloud.com/api/search?type=metadata&max=5&q="+text;
                //var url="https://demo.buddycloud.org/api/search?type=metadata&max=25&q="+text;
                $http.get(url).then(function(data){
                        $scope.searchresult=data;
                        $scope.tabs.activeTab = 2;
                        console.log(data);
                    },function(error){
                        console.log(error);
                    }
                );
                */
            };

            console.log("vor connect");
            Xmpp.connect($scope.host).then(function(){
                console.log("verbindung steht");
                $scope.online=true;


                //message tool in navbar
                Xmpp.socket.on('xmpp.wtf.push', function(data) {
                    console.log(data);
                    alert(1);
                });

                //friend request
                //3:::{"type":0,"data":["xmpp.presence.subscribe",{"from":{"domain":"laos.buddycloud.com","user":"bill"}}]}

                Xmpp.socket.on('xmpp.presence.subscribe', function(data) {

                    console.log("Friend request",data,$scope.friendRequestsCount);
                    var jid=data.from.user+"@"+data.from.domain;
                    data.from.jid=jid;
                    if(!$scope.friendRequests[jid]){
                        $scope.friendRequests[jid]=data;
                        $scope.friendRequestsCount++;
                    }

                    $scope.$apply();
                });

                //logged in
                Xmpp.socket.on('xmpp.connection', function(data) {
                    console.log("connect",data);
                    $scope.connected=true;
                    $scope.jid=data.jid;
                    buddycloudFactory.discover()
                    .then(buddycloudFactory.register)
                    .then(buddycloudFactory.getSubscriptions)
                    .then(function(data){
                        console.log("DURCH",data);
                        $scope.selectednode={
                                node:"recent",
                                name:""
                        };
                    },function(error){
                        console.log(error);
                    });

                });

                //debug only
                Xmpp.socket.on('xmpp.error', function (error) {
                    console.log('error', error);
                });
                Xmpp.socket.on('xmpp.error.client', function (error) {
                    console.log('client error', error);
                });
                Xmpp.socket.on('xmpp.muc.invite', function (data) {
                    console.log("muc invitation",data);
                });
            });

            $scope.addFriend=function(from){
                Xmpp.addFriend(from.user+"@"+from.domain);
            };
            $scope.logout=function(jid){
                Xmpp.logout();
                localStorage.removeItem("password");
                $scope.connected=false;  //fake logout. Fixit!!
            };
            $scope.openchat=function(jid){
                $rootScope.$broadcast('openchat',jid);
            };
        }
    ]);



