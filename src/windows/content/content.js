/**
 * Created by Mojtaba on 02/06/2016.
 */

angular.module('c2tips').register.controller('ContentWindowController', [
    '$stateParams', '$state', '$sce', 'database',
    function ($stateParams, $state, $sce, database) {
        var self = this;
        self.item = null;
        database.setCurrent($state.current.name);
        database.getItem($stateParams.title, function (err, item) {
            if (!item) $state.go('main');
            self.item = item;
            self.item.content = $sce.trustAsHtml(item.content);
        });

    }
]);