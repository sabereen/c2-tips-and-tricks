/**
 * Created by Mojtaba on 02/02/2016.
 */

angular.module('c2tips').config(['$compileProvider',
    function($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file:chrome-extension):/);
    }]);
