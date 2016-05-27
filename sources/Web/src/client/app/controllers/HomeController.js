(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'logger'];
    /* @ngInject */
    function HomeController($state, logger) {
        var vm = this;

        vm.todo = todo;

        //////////////////////////////

        function todo() {
        }
    }

})();
