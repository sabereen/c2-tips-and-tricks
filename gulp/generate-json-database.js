/**
 * Created by Mojtaba on 02/01/2016.
 */

var Nedb = require('nedb');
const fs = require("fs");

function genJsonDb(dest) {
    var destination = dest ? 'dist' : 'src';
    var db = {};
    db.learn = new Nedb({ filename: './src/datastores/learn.db', autoload: true });
    db.ask   = new Nedb({ filename: './src/datastores/ask.db'  , autoload: true });

    try { fs.mkdirSync(`./${destination}/datastores`) } catch(e) {}
    db.learn.find({}, (err, array) => fs.writeFile(`./${destination}/datastores/learn.json`, JSON.stringify(array)));
    db.ask  .find({}, (err, array) => fs.writeFile(`./${destination}/datastores/ask.json`  , JSON.stringify(array)));
}

module.exports = genJsonDb;