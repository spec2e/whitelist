angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, UsageStats, $interval) {

    var dash = this;
    dash.usageAvailable = true;
    dash.appInfo = undefined;
    dash.sendData = sendData;

    if (
      window.cordova &&
      window.cordova.plugins &&
      window.cordova.plugins.backgroundMode) {

      dash.usageAvailable = true;

      /*
      cordova.plugins.backgroundMode.onactivate = function () {
        $interval(function () {
          UsageStats.sendData();
        }, 5000);
      };
      */
    } else {
      console.log('DashCtrl: cordova plugin backgroundMode not available ...');
    }

    if (
      window.navigator &&
      window.navigator.appInfo) {

      navigator.appInfo.getAppInfo(function (appInfo) {
        dash.appInfo = appInfo;
        console.log('identifier: %s', appInfo.identifier);
        console.log('version: %s', appInfo.version);
        console.log('build: %s', appInfo.build);
      }, function (err) {
        alert(err);
      });
    } else {
      console.log('DashCtrl: cordova plugin appInfo not available ...');
    }

    function sendData () {
      UsageStats.sendData();
    }

  })

  .controller('StatsCtrl', function ($scope, UsageStats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var stats = this;
    stats.statistics = undefined;

    activate();

    function activate() {

      console.log('in stats ctrl');

      UsageStats.getData()
        .then(function (data) {
          stats.statistics = data;
        })
        .catch(function(err) {
          console.log('Error!!!: ' + err);
        });
    }
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
