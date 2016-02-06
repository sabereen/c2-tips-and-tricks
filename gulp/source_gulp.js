"use strict";

const
    gulp = require('gulp')
    ;

const root = process.cwd();

const
    config = require(root + '/config.js'),
    bower_copy = require(root + '/gulp/bower_copy')(false),  // minify: false
    genJsonDb = require(root + '/gulp/generate-json-database')
;

let copy = function () {
    bower_copy.angular();
    bower_copy.angular_modules();
    bower_copy.styles();
    bower_copy.nedb();
};

let generateJsonDb = () => { genJsonDb(false) }; // write to dist: false


module.exports =
{
    copy,
    'generate-json-db': generateJsonDb
};