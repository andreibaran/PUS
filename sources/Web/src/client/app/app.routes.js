(function () {
    'use strict';

    angular
        .module('app')
        .config(ConfigRoutes);

    /* @ngInject */
    ConfigRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function ConfigRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('master', {
                abstract: true,
                templateUrl: 'app/views/master.html',
                controller: 'MasterController as mvm'
            })
            .state('login', {
                url: '/login',
                templateUrl:'app/views/login.html',
                controller: 'LoginController as vm',
                data: {restricted: false}
            })
            .state('devices', {
                url: '/devices',
                templateUrl:'app/views/devices.html',
                controller: 'DevicesController as vm',
                data: {restricted: true},
                parent: 'master'
            })
            .state('share', {
                url: '/share',
                templateUrl:'app/views/share.html',
                controller: 'ShareController as vm',
                data: {restricted: true},
                parent: 'master'
            })
            .state('settings', {
                url: '/settings',
                templateUrl:'app/views/settings.html',
                controller: 'SettingsController as vm',
                data: {restricted: true},
                parent: 'master'
            });

        $urlRouterProvider.otherwise('login');
    }

    angular.module('app').run(OnStateChanged);

    OnStateChanged.$inject = ['$rootScope', '$state', '$http', 'AuthService', 'Session', 'logger'];
    /* @ngInject */
    function OnStateChanged($rootScope, $state, $http, AuthService, Session, logger) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if(AuthService.requireAuth(next.data.restricted)) {
                // auth
                if(AuthService.isLoggedIn()) {
                     return;
                }
            }

            if (next.name !== 'login') {
                 event.preventDefault();
                $state.go('login');
            }
        });
    }

})();
