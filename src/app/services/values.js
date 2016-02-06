/**
 * Created by Mojtaba on 01/31/2016.
 */

angular.module('c2tips')
    .value('isNode',
        typeof require === "function" &&
        typeof require('fs') !== "undefined");