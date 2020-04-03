var webpack = require("webpack");
var path = require("path");

//var ENTRY = path.resolve(__dirname, "Dev");
var ENTRY = "/Users/tobe/code/painter/console/static/js/index.js";
//var OUTPUT = path.resolve(__dirname, "output");
var OUTPUT = "/Users/tobe/code/painter/console/static/bundle/";

var config = {
  entry: ENTRY,
  output: {
    path: OUTPUT,
    filename: "bundle.js"
  },

     module: {
         loaders: [{
             //test: /\.js$/,
             //include: "/Users/tobe/code/painter/console/static/js/",
             include: ENTRY,
             //exclude: "/node_modules/",
             loaders: ['babel-loader']
         },
         { test: /\.css$/, loaders: ["style", "css"] },
         {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.(otf|woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
         ]
     }
};

module.exports = config;
