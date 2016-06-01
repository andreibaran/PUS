(function () {
    'use strict';

    angular
        .module('app')
        .controller('DevicesController', DevicesController);

    DevicesController.$inject = ['$state', 'DeviceService', 'logger'];
    /* @ngInject */
    function DevicesController($state, DeviceService, logger) {
        var vm = this;
        vm.devices = [];

        init();
        //////////////////////////////

        function init() {
            
            DeviceService.getDevices().then(function (response) {
                console.log(response.data);
       
                vm.devices = response.data;
            }, function (data) {
                console.log(data);
            });
        }
    }

})();
