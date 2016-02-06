/**
 * Created by Mojtaba on 01/22/2016.
 */

angular.module('c2tips')
    .service('database',
    function ($window, $http, isNode) {

        var currentDataBase = 'learn';

        if (isNode) { $window.Nedb = require('nedb') }

        var db = {};
        //this.db = db;
        db.learn = new $window.Nedb({ filename: 'databases/learn.json', autoload: true });
        db.ask   = new $window.Nedb({ filename: 'databases/ask.json'  , autoload: true });

        // لود اولیه دیتابیسها در صورت خالی بودن

        db.learn.count({}, function (err, count) {
            if (!count) {
                $http.get('datastores/learn.json')
                    .success(data => {
                        db.learn.insert(data);
                    });
            }
        });

        db.ask.count({}, function (err, count) {
            if (!count) {
                $http.get('datastores/ask.json')
                    .success(data => {
                        db.ask.insert(data);
                    });
            }
        });

        this.setCurrent = function (currentDB) {
            if (typeof db[currentDB] !== "undefined")
                currentDataBase = currentDB;
        };

        this.getItem = (title, cb) => {
            db[currentDataBase].findOne({"title": title}, function (err, item) {
                if (err) throw err;
                item.content = item.content
                    .replace(/{\|\d+\|.+\|}/gi, x => `datastores/images/${item.topic}.${x.split('|')[1]}${x.split('|')[2]}`)
                    .replace(".:'jodakon':.", '<hr>');
                cb(err, item);
            });
        };

        this.getList = function (cb) {
            db[currentDataBase].find({}, {content: 0}, cb)
        };

    }
);
