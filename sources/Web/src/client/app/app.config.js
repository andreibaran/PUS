(function () {
    'use strict';

    var config = {};

    angular
        .module('app')
        .value('config', config);

    // config the toaster
    angular
        .module('app')
        .constant('toastr', toastr);

    angular
        .module('app')
        .config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-center';
    }

})();

