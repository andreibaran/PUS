(function () {
    'use strict';

    angular
        .module('app')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$scope', '$state', '$rootScope', '$window', 'AuthService'];
    /* @ngInject */
    function BaseController($scope, $state, $rootScope, $window, AuthService) {
        var vm = this;
        vm.logout = logout;
        vm.back = back;

        ////////////////////

        function logout() {
            AuthService.logout();
            $state.go('login');
        }

        function back() {
            $window.history.back();
        }
    }

})();
