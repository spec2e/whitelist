angular.module('starter.services', [])

  .factory('UsageStats', function ($http, $resource, $q) {

    var host = 'http://192.168.0.10:8000';
    var statsResource = $resource(host + '/spe');

    return {
      getData: getData,
      sendData: sendData
    };

    function getData() {
      return statsResource.query().$promise;
    }

    function sendData() {

      var deferred = $q.defer();

      usageStats.usage("World", function (data) {
        console.log( JSON.stringify(data));
        $http.post(host + '/register/spe', data)
          .then(function success() {
            console.log('data was sent');
            deferred.resolve();
          })
          .catch(function err(err) {
            console.log('something went wrong! ' + JSON.stringify(err));
            deferred.reject(err);
          });
      }, function (err) {
        console.log('error from usage plugin: ' + err);
      });

      return deferred.promise;
    }
  });
