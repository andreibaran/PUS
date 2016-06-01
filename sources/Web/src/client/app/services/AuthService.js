(function() {
    'use strict';

    angular
        .module('app').
        factory('AuthService', AuthService);

    AuthService.$inject = ['localStorageService', '$http', '$q', 'Session', 'config', 'logger'];
    /* @ngInject */
    function AuthService(localStorageService, $http, $q, Session, config, logger) {
        var service = {
            login: login,
            logout: logout,
            requireAuth: requireAuth,
            isLoggedIn: isLoggedIn
        };

        return service;

        ////////////////////


        function login(username, password) {

            var requestData = {
                username: username,
                password: password,
            };

            return $http({
                method: 'POST',
                url: config.apiBaseURL + 'login',
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

        function logout() {
            Session.destroy();
        }

        function requireAuth(restricted) {
            return restricted;
        }

        function isLoggedIn() {
            var user = Session.get();
            return user != null;
        }
    }

})();
