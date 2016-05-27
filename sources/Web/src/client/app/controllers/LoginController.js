(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthService', 'Session', 'logger'];
    /* @ngInject */
    function LoginController($state, AuthService, Session, logger) {
        var vm = this;

        vm.credentials = {};

        vm.isloggedIn = false;
        vm.login = login;

        init();

        //////////////////////////////

        function init() {
            logger.info("Login Page", "", "Test");
            vm.credentials = {
                username: '',
                password: ''
            };

            var session = Session.get();
            if (session != null) {
                vm.credentials = session;
                $state.go('home');
            }

        }


        function login(credentials) {
            vm.isloggedIn = true;
            
            AuthService.login(credentials.username, credentials.password).then(function () {
                vm.isloggedIn = true;
                $state.go('home');
            }, function () {
                vm.isloggedIn = false;
            });
        }
       

    };

})();
