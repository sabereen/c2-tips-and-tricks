/**
 * Created by Mojtaba on 01/13/2016.
 */

(function () {
    var app = angular.module('c2tips');
    app.register.controller('MainWindowController', ['$scope', '$rootScope', '$window', 'database',
        function ($scope, $rootScope, $window, database) {

            var self = this;
            this.shrinkAni = "";
            this.setShrink = () => {this.shrinkAni = "main-shrink"};
            this.removeShrink = () => {this.shrinkAni = ""};
            this.height = $window.innerHeight;
            this.buttons = [
                {
                    icon: 'windows/main/resources/gear.svg',
                    link: 'other'
                },
                {
                    icon: 'windows/main/resources/ask.svg',
                    link: 'list({content: "ask"})'
                },
                {
                    icon: 'windows/main/resources/mine.svg',
                    link: 'source'
                },
                {
                    icon: 'windows/main/resources/teacher.svg',
                    link: 'list({content: "learn"})'
                }
            ];
            this.rSide = [
                {
                    label: 'دوره‌ی تابستانی',
                    link: 'course'
                },
                {
                    label: 'مسابقه',
                    link: 'competition'
                },
                {
                    label: 'مصاحبه',
                    link: 'interview'
                },
                {
                    label: 'بازی‌ها',
                    link: 'games'
                },
                {
                    label: 'خنده',
                    link: 'fun'
                },
                {
                    label: 'اخبار',
                    link: 'news'
                }
            ];
            this.lSide = [
                {
                    label: 'تماس با ما',
                    link: 'contact'
                },
                {
                    label: 'درباره‌ی ما',
                    link: 'aboutus'
                },
                {
                    label: 'سایت ما',
                    link: 'http://si2.ir'
                },
                {
                    label: 'انجمن',
                    link: 'http://construct2.ir'
                },
                {
                    label: 'فصل‌نامه‌ی قبلی',
                    link: 'journal1'
                },
                {
                    label: 'حمایت مالی',
                    link: 'donate'
                }
            ];

            angular.element($window).bind('resize', function () {
                self.height = $window.innerHeight;
                $scope.$digest();
            });
            //this.lSide = this.lSide.map(    function (x) {x.link = '#' + x.link; return x; }); //for url hash mode
            //this.rSide = this.rSide.map(    function (x) {x.link = '#' + x.link; return x; }); //for url hash mode
            //this.buttons = this.buttons.map(function (x) {x.link = '#' + x.link; return x; }); //for url hash mode
        }]);

    app.register.controller('TempController', ['$timeout', '$q', function ($timeout, $q) {
        var self = this;
        // list of `state` value/display objects
        self.states        = loadAll();
        self.selectedItem  = null;
        self.searchText    = null;
        self.querySearch   = querySearch;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            var results = query ? self.states.filter( createFilterFor(query) ) : [];
            return results;
        }
        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }

        self.showAll = function () {
            self.querySearch = function () {return self.states;};
            $scope.$apply();
        }
}]);
})();