(function() {
    'use strict';

    angular
        .module('app')
        .service('Session', Session);

    Session.$inject = ['localStorageService', 'logger'];
    /* @ngInject */
    function Session(localStorageService, logger) {
        var service = {
            create: create,
            destroy: destroy,
            get: get
        }

        return service;

        ////////////////////
        function create(session) {
            localStorageService.set('session', session);
        }

        function destroy() {
            localStorageService.set('session', null);
        }

        function get() {
            return localStorageService.get('session');
        }
    }

})();
