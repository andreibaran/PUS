(function () {
    'use strict';

    angular
        .module('app')
        .controller('DeviceController', DeviceController);

    DeviceController.$inject = ['$state', '$stateParams', 'DeviceService', 'logger'];
    /* @ngInject */
    function DeviceController($state, $stateParams, DeviceService, logger) {
        var vm = this;
        vm.device = {};

        init();
        //////////////////////////////

        function init() {
            
            DeviceService.getDevice($stateParams.deviceId).then(function (response) {
                console.log(response.data);
       
                vm.device = response.data;
            }, function (data) {
                console.log(data);
            });
        }
    }

})();
