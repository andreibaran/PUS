(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['$state', 'logger'];
    /* @ngInject */
    function ShareController($state, logger) {
        var vm = this;

        vm.todo = todo;

        //////////////////////////////

        function todo() {
        }
    }

})();
