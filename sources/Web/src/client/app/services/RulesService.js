(function() {
    'use strict';

    angular
        .module('app').
        factory('RulesService', RulesService);

    RulesService.$inject = ['$http', '$q', 'Session', 'config', 'logger'];
    /* @ngInject */
    function RulesService($http, $q, Session, config, logger) {
        var service = {
            getRules: getRules,
            createRule: createRule,
            updateRule: updateRule
        };

        return service;

        ////////////////////


        function getRules(deviceId) {
            var user = Session.get();
            return $http({
                method: 'GET',
                url: config.apiBaseURL + 'devices/' + deviceId + '/rules',
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

        function createRule(deviceId, rule) {
            console.log(rule);
            var requestData = {
                device_id: deviceId,
                command_type: rule.command_type,
                brightness_value: rule.brightness_value,
                ambient_light_value: rule.ambient_light_value,
                activated: rule.activated
            };

            var user = Session.get();
            return $http({
                method: 'POST',
                url: config.apiBaseURL + 'devices/' + deviceId + '/rules',
                data: requestData,
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

        function updateRule(deviceId, rule) {
            var requestData = {
                device_id: deviceId,
                command_type: rule.command_type,
                brightness_value: rule.brightness_value,
                ambient_light_value: rule.ambient_light_value,
                activated: rule.activated
            };

            var user = Session.get();
            return $http({
                method: 'POST',
                url: config.apiBaseURL + 'devices/' + deviceId + '/rules/' + rule.id,
                data: requestData,
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
