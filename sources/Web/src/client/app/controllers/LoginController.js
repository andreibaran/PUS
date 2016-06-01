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
        vm.errorMessage = '';
        vm.login = login;

        init();

        //////////////////////////////

        function init() {
            vm.credentials = {
                username: '',
                password: ''
            };

            var session = Session.get();
            if (session != null) {
                vm.credentials = session;
                $state.go('devices');
            }

        }

        function login() {
            vm.isloggedIn = true;
            
            AuthService.login(vm.credentials.username, vm.credentials.password).then(function (response) {
                console.log(response);
                vm.isloggedIn = true;
                Session.create(response.data.user);
                $state.go('devices');
            }, function (data) {
                console.log(data);
                vm.isloggedIn = false;
                vm.errorMessage = "Invalid username or password!"
            });
        }
       

    };

})();
