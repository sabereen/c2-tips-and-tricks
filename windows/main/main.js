"use strict";!function(){var n=angular.module("c2tips");n.register.controller("MainWindowController",["$scope","$rootScope","$window","database",function(n,i,e,a){var t=this,r=this;this.shrinkAni="",this.setShrink=function(){t.shrinkAni="main-shrink"},this.removeShrink=function(){t.shrinkAni=""},this.height=e.innerHeight,this.buttons=[{icon:"/windows/main/resources/gear.svg",link:"/other"},{icon:"/windows/main/resources/ask.svg",link:"/ask"},{icon:"/windows/main/resources/mine.svg",link:"/source"},{icon:"/windows/main/resources/teacher.svg",link:"/learn"}],this.rSide=[{label:"دوره‌ی تابستانی",link:"/course"},{label:"مسابقه",link:"/competition"},{label:"مصاحبه",link:"/interview"},{label:"بازی‌ها",link:"/games"},{label:"خنده",link:"/fun"},{label:"اخبار",link:"/news"}],this.lSide=[{label:"تماس با ما",link:"/contact"},{label:"درباره‌ی ما",link:"/aboutus"},{label:"سایت ما",link:"http://si2.ir"},{label:"انجمن",link:"http://construct2.ir"},{label:"فصل‌نامه‌ی قبلی",link:"/journal1"},{label:"حمایت مالی",link:"/donate"}],angular.element(e).bind("resize",function(){r.height=e.innerHeight,n.$digest()})}]),n.register.controller("TempController",["$timeout","$q",function(n,i){function e(n){var i=n?r.states.filter(t(n)):[];return i}function a(){var n="Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,              Wisconsin, Wyoming";return n.split(/, +/g).map(function(n){return{value:n.toLowerCase(),display:n}})}function t(n){var i=angular.lowercase(n);return function(n){return 0===n.value.indexOf(i)}}var r=this;r.states=a(),r.selectedItem=null,r.searchText=null,r.querySearch=e,r.showAll=function(){r.querySearch=function(){return r.states},$scope.$apply()}}])}();