(function () {
    'use strict';

    angular
        .module('app')
        .controller('DeviceController', DeviceController);

    DeviceController.$inject = ['$state', '$stateParams', 'DeviceService', 'RulesService', 'logger'];
    /* @ngInject */
    function DeviceController($state, $stateParams, DeviceService, RulesService, logger) {
        var vm = this;
        vm.device = {};
        vm.rule = [];
        vm.rule = {};

        vm.createRule = createRule;
        vm.updateRule = updateRule;

        init();
        //////////////////////////////

        function init() {
            
            DeviceService.getDevice($stateParams.deviceId).then(function (response) {
                console.log(response.data);
       
                vm.device = response.data;
            }, function (data) {
                console.log(data);
            });

            RulesService.getRules($stateParams.deviceId).then(function (response) {
                console.log(response.data);
                vm.rules = response.data;
            }, function (data) {
                console.log(data);
            });

            resetRuleModel();

        }

        function createRule() {
            console.log(vm.rule);
            vm.rule.command_type = $('#command_type').val();
            if (vm.rule.command_type !== '' && vm.rule.brightness_value > 0) {
                RulesService.createRule($stateParams.deviceId, vm.rule).then(function (response) {
                    console.log(response.data);
                    
                    vm.rule.id = response.data;
                    vm.rules.push(vm.rule);
                    resetRuleModel();
                }, function (data) {
                    console.log(data);
                });
            } else {
                console.log("Invalid data");
                console.log(vm.rule);
            }
        }

        function resetRuleModel() {
            vm.rule = {
                id: -1,
                device_id: $stateParams.deviceId,
                command_type: "",
                brightness_value: 0,
                ambient_light_value: 0,
                activated: 0
            };
        }

        function updateRule(rule, index) {
            RulesService.updateRule($stateParams.deviceId, rule).then(function (response) {
                console.log(response.data);
                vm.rules[index] = response.data;
            }, function (data) {
                console.log(data);
            });
        }
    }

})();
