/**
 * Created by Mojtaba on 02/04/2016.
 */

angular.module('c2tips')
    .register.controller('ListWindowController', [
    '$stateParams', 'database',
    function ($stateParams, database) {
        this.content = $stateParams.content;
        database.setCurrent(this.content);
        this.list = null;
        database.getList((err, list) => {
            if (err) throw err;
            this.list = list;
        });
    }]);