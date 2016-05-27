(function () {
    'use strict';

    angular
        .module('app')
        .config(ConfigRoutes);

    /* @ngInject */
    ConfigRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function ConfigRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl:'app/views/login.html',
                controller: 'LoginController as vm',
                data: {restricted: false}
            })
            .state('home', {
                url: '/home',
                templateUrl:'app/views/home.html',
                controller: 'HomeController as vm',
                data: {restricted: true}
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
