(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$state', 'logger'];
    /* @ngInject */
    function SettingsController($state, logger) {
        var vm = this;

        var bodyElement = angular.element( document.querySelector( 'body' ) );


        vm.fontsize = 16;
        vm.increaseFont = increaseFont;
        vm.decreaseFont = decreaseFont;

        //////////////////////////////

        function increaseFont() {
            vm.fontsize++;
            bodyElement.css('font-size', vm.fontsize + 'px');
        }
        function decreaseFont() {
            vm.fontsize--;
            bodyElement.css('font-size', vm.fontsize + 'px');
        }
    }

})();
