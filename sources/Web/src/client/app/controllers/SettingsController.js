(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$state', 'logger'];
    /* @ngInject */
    function SettingsController($state, logger) {
        var vm = this;

        vm.todo = todo;

        //////////////////////////////

        function todo() {
        }
    }

})();
