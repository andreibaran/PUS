(function() {
    'use strict';

    angular
        .module('app').
        factory('DeviceService', DeviceService);

    DeviceService.$inject = ['$http', '$q', 'Session', 'config', 'logger'];
    /* @ngInject */
    function DeviceService($http, $q, Session, config, logger) {
        var service = {
            getDevices: getDevices
        };

        return service;

        ////////////////////


        function getDevices() {
            var user = Session.get();
            return $http({
                method: 'GET',
                url: config.apiBaseURL + 'users/' + user.id + '/devices',
            }).then(function(response) {
                if(response.data.code == 200) {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function(response) {
                return $q.reject(response.data);
            });
        }

    }

})();
