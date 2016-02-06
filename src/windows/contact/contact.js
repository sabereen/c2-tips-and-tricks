/**
 * Created by Mojtaba on 01/21/2016.
 */

angular.module('c2tips').register.controller('ContactWindowController', ['$window'
    ,function ($window) {
        this.submit = function() {
            $window.alert('هنوز قابلیت ثبت پیام پیاده‌سازی نشده');
        }
    }
]);