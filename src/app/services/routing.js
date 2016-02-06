/**
 * Created by Mojtaba on 01/13/2016.
 */
(function () {

    "use strict";

    angular.module('c2tips')
        .config( function ($stateProvider, $urlRouterProvider, $locationProvider) {

            //$locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state("main", generateOptions("main", "/"))
                .state("contact", generateOptions("contact"))
                .state("list", generateOptions("list", "/list/:content"))
                .state("learn", generateOptions("content", "/learn/:title"))
                .state("ask", generateOptions("content", "/ask/:title"))
                ;

            //function scriptTag(src, callback) {
            //
            //    var doc = document;
            //
            //    var s = doc.createElement('script');
            //    s.type = 'text/' + (src.type || 'javascript');
            //    s.src = src.src || src;
            //    s.async = false;
            //
            //    s.onreadystatechange = s.onload = function () {
            //
            //        var state = s.readyState;
            //
            //        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            //            callback.done = true;
            //            callback();
            //        }
            //    };
            //
            //    // use body if available. more safe in IE
            //    doc.body.appendChild(s);
            //}

            function lazyLoad() {

                var urls = arguments;

                function loader($q) {
                    return $q(function (resolve) {

                        var loadCounter = 0;
                        var ext = '';
                        for (var i = 0; i < urls.length; i++) {
                            ext = urls[i].split('.').pop();
                            if (ext == 'js') {
                                var script = document.createElement('script');
                                script.onload = function () {
                                    loadCounter += 1;
                                    if (loadCounter == urls.length) {
                                        resolve();
                                    }
                                };
                                script.src = urls[i];
                                document.getElementsByTagName('head')[0].appendChild(script);
                            } else if (ext == 'css') {
                                var link = document.createElement('link');
                                link.href = urls[i];
                                link.rel = 'stylesheet';
                                link.type = 'text/css';
                                document.getElementsByTagName('head')[0].appendChild(link);
                                loadCounter += 1;
                            }
                        }

                    });
                }
                return ['$q', loader];
            }

            /**
             * generate option object for state provider
             * @param {string} window
             * @param {string=} URL
             * @param {Array=} otherDeps
             * @returns {{url: string, templateUrl: *, controller: string, controllerAs: *, resolve: {deps: *}}}
             */
            function generateOptions(window, URL, otherDeps) {

                var url = '/' + window;
                if (typeof URL === "string") {
                    url = URL;
                } else if (typeof otherDeps === "undefined") {
                    otherDeps = URL;
                }

                var resolve = {
                    deps: lazyLoad(`windows/${window}/${window}.js`, `windows/${window}/${window}.css`)
                };
                if (otherDeps !== undefined) {
                    resolve.otherDeps = lazyLoad.apply(this, otherDeps); // todo: this line should test
                }

                return {
                    url,
                    templateUrl: `windows/${window}/${window}.html`,
                    controller: window.charAt(0).toUpperCase() + window.slice(1) + "WindowController",
                    controllerAs: window,
                    resolve
                };
            }
        });
})();
