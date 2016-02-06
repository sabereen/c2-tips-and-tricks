/**
 * Created by Mojtaba on 01/10/2016.
 */

(function () {

    "use strict";

    let app = angular.module('c2tips', [/*'ngRoute'*/'ui.router', 'ngMessages', 'ngMaterial'])
        .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', register])
        .config(['$mdThemingProvider', config])
        .controller('MainController', ['$rootScope', main])
    ;

    function main($rootScope) {
        //$rootScope.view = 'main';
    }

    function config($mdThemingProvider) {
        //$mdThemingProvider
            //.theme('default')
            //.primaryColor('pink')
            //.accentColor('pink')
            //.dark()
        //;
    }

    // Register Controller and etc for use in lazy loading
    function register($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    }

})();