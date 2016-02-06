"use strict";!function(){function e(e){}function t(e){}function n(e,t,n,o){i.register={controller:e.register,directive:t.directive,filter:n.register,factory:o.factory,service:o.service}}var i=angular.module("c2tips",["ui.router","ngMessages","ngMaterial"]).config(["$controllerProvider","$compileProvider","$filterProvider","$provide",n]).config(["$mdThemingProvider",t]).controller("MainController",["$rootScope",e])}(),angular.module("c2tips").config(["$compileProvider",function(e){e.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/),e.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file:chrome-extension):/)}]),angular.module("c2tips").value("isNode","function"==typeof require&&"undefined"!=typeof require("fs")),function(){angular.module("c2tips").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){function i(){function e(e){return e(function(e){for(var n=0,i="",o=0;o<t.length;o++)if(i=t[o].split(".").pop(),"js"==i){var r=document.createElement("script");r.onload=function(){n+=1,n==t.length&&e()},r.src=t[o],document.getElementsByTagName("head")[0].appendChild(r)}else if("css"==i){var s=document.createElement("link");s.href=t[o],s.rel="stylesheet",s.type="text/css",document.getElementsByTagName("head")[0].appendChild(s),n+=1}})}var t=arguments;return["$q",e]}function o(e,t,n){var o="/"+e;"string"==typeof t?o=t:"undefined"==typeof n&&(n=t);var r={deps:i("windows/"+e+"/"+e+".js","windows/"+e+"/"+e+".css")};return void 0!==n&&(r.otherDeps=i.apply(this,n)),{url:o,templateUrl:"windows/"+e+"/"+e+".html",controller:e.charAt(0).toUpperCase()+e.slice(1)+"WindowController",controllerAs:e,resolve:r}}t.otherwise("/"),e.state("main",o("main","/")).state("contact",o("contact")).state("list",o("list","/list/:content")).state("learn",o("content","/learn/:title")).state("ask",o("content","/ask/:title"))}])}(),angular.module("c2tips").service("database",["$window","$http","isNode",function(e,t,n){var i="learn";n&&(e.Nedb=require("nedb"));var o={};o.learn=new e.Nedb({filename:"databases/learn.json",autoload:!0}),o.ask=new e.Nedb({filename:"databases/ask.json",autoload:!0}),o.learn.count({},function(e,n){n||t.get("datastores/learn.json").success(function(e){o.learn.insert(e)})}),o.ask.count({},function(e,n){n||t.get("datastores/ask.json").success(function(e){o.ask.insert(e)})}),this.setCurrent=function(e){"undefined"!=typeof o[e]&&(i=e)},this.getItem=function(e,t){o[i].findOne({title:e},function(e,n){if(e)throw e;n.content=n.content.replace(/{\|\d+\|.+\|}/gi,function(e){return"datastores/images/"+n.topic+"."+e.split("|")[1]+e.split("|")[2]}).replace(".:'jodakon':.","<hr>"),t(e,n)})},this.getList=function(e){o[i].find({},{content:0},e)}}]);