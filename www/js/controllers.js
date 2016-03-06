angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

  usageStats.usage("World", function(data) {
    console.log('data is :' + JSON.stringify(data));
    $scope.usage = JSON.stringify(data);

    var host = 'http://192.168.0.10:8000';

    $http.post(host + '/register/spe', $scope.usage)
      .then(function success() {
        console.log('data was sent');
      }, function err(err) {
        console.log('something went wrong! ' + JSON.stringify(err));
      });



  }, function(err) {
    console.log('error from usage plugin: ' + err );
  });

  navigator.appInfo.getAppInfo(function(appInfo) {
    $scope.appInfo = appInfo;
    console.log('identifier: %s', appInfo.identifier);
    console.log('version: %s', appInfo.version);
    console.log('build: %s', appInfo.build);


  }, function(err) {
    alert(err);
  });



})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
