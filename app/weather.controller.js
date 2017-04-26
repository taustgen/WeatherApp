(function() {
    'use strict';

    angular
        .module('weather')
        .controller('WeatherControl', WeatherControl);

    WeatherControl.$inject = ['$http', 'toastr'];

    /* @ngInject */
    function WeatherControl($http, toastr) {
        var vm = this;
        vm.queries = [];
        vm.searchTerm = '';
        vm.hide = true;
        vm.search = function() {
            $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + vm.searchTerm + '&units=imperial&APPID=09003e70a830f9852753be7af89f2792').then(function(response) {
                vm.currentCity = response.data;
                vm.d = new Date();
                vm.queries.unshift({
                    city: vm.currentCity.name,
                    dateTime: vm.d.toUTCString()
                });
                vm.searchTerm = '';
                vm.hide = false;
            }, function errorCallback(response) {
                toastr.error(response.data.message, "Error: " + response.data.cod.toUpperCase())
            });
        }
        vm.btnSearch = function(city) {
            vm.searchTerm = city;
            vm.search();

        }
    }
})();
