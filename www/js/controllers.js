angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, UsageStats, $interval) {

    var dash = this;
    dash.usageAvailable = false;
    dash.appInfo = undefined;
    dash.sendData = sendData;
    dash.getData = getData;
    dash.statistics = undefined;

    activate();

    return dash;

    function activate() {
      registerUsagePlugin();
    }

    function sendData() {
      UsageStats.sendData()
        .then(function () {
          getData();
        })
    }

    function getData() {
      UsageStats.getData()
        .then(function (data) {
          dash.statistics = data;
        })
        .catch(function (err) {
          console.log('Error!!!: ' + err);
        });
    }

    function registerUsagePlugin() {
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

  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
