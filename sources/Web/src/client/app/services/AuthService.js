(function() {
    'use strict';

    angular
        .module('app').
        factory('AuthService', AuthService);

    AuthService.$inject = ['localStorageService', '$http', 'Session', 'config', 'logger'];
    /* @ngInject */
    function AuthService(localStorageService, $http, Session, config, logger) {
        var service = {
            login: login,
            logout: logout,
            requireAuth: requireAuth,
            isLoggedIn: isLoggedIn
        };

        return service;

        ////////////////////


        function login(username, password) {

            var dummyUsers = [
                {
                    username: 'andrei.baran@info.uaic.ro',
                    password: 'andrei'
                }, 
                {
                    username: 'laura.asoltanei@info.uaic.ro',
                    password: 'laura'
                }
            ];

            angular.forEach(dummyUsers, function(value, key) {
                if(value.username == username && value.password == password) {
                    Session.create(username, password);
                    return true;
                }
            });

            return false;
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
