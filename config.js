"use strict";

let config =
{
    "src": "./src",
    "dist": "./dist",
    "full_packages":
    {
        "angular": "angular/angular.js",
        //"angular-route": "angular-route/angular-route.js",
        "angular-ui-router": "angular-ui-router/release/angular-ui-router.js",
        "angular-material": "angular-material/angular-material.js",
        "angular-animate": "angular-animate/angular-animate.js",
        "angular-messages": "angular-messages/angular-messages.js",
        "angular-aria": "angular-aria/angular-aria.js",
        "nedb": "nedb/browser-version/out/nedb.js"
    },
    full_css_packages:
    {
        "angular-material": "angular-material/angular-material.css"
        //,"angular-material-layouts": "angular-material/angular-material.layouts.css"
    }
};

config.packages = {};
config.css_packages = {};

const path = require('path');

dot_min(config.full_packages);
dot_min(config.full_css_packages);

function dot_min(packages) {
    for (let x in packages) {
        let current_path = packages[x];
        packages[x] = './bower_components/' + current_path;

        // Adding .min to file names
        let pkg = "";
        current_path = path.parse(packages[x]);
        current_path.name += ".min";
        current_path.base = current_path.name + current_path.ext;
        if (current_path.ext === ".css") pkg = 'css_';
        config[`${pkg}packages`][x] = path.normalize(path.format(current_path));
    }
}

module.exports = config;