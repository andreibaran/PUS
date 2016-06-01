(function () {
    'use strict';

    angular
        .module('app')
        .controller('MasterController', MasterController);

    MasterController.$inject = ['$scope', '$state', '$location', '$rootScope', '$window', 'AuthService'];
    /* @ngInject */
    function MasterController($scope, $state, $location, $rootScope, $window, AuthService) {
        var mvm = this;
        mvm.logOut = logOut;
        mvm.getCurrentPath = getCurrentPath;

        mvm.menuItems = [
            {
                'title': 'Devices',
                'path': 'devices',
                'icon': 'mobile'
            },
            {
                'title': 'Share',
                'path': 'share',
                'icon': 'share'
            },
            {
                'title': 'Settings',
                'path': 'settings',
                'icon': 'cogs'
            }];

        ////////////////////

        function logOut() {
            AuthService.logout();
            $state.go('login');
        }

        function getCurrentPath() {
            return $location.path();
        }
    }

})();
