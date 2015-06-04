var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'index': path.join(__dirname, '../archives/sites.txt'),
  'loading': path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var body = "";
  fs.readFile( path.join(__dirname, '../archives/sites.txt'), {encoding: 'utf8'}, function (err, data) {
    if (err) throw err;
    body += data;
    var urlArray = body.split('\n');
    urlArray.splice(urlArray.length - 1, 1);
    callback(urlArray);
  });
};

exports.isUrlInList = function(){
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};

exports.loadPage = function(callback) {
  fs.readFile(__dirname + '/../web/public/index.html', {encoding: 'utf8'}, function (err, html) {
    if (err) {
        throw err;
    }
    callback(html);
    // console.log(html);
    // res.writeHead(200, {"Content-Type": "text/html"});
    // res.write(callback(html));
    // res.end();
  });
};
exports.loadCss = function(callback) {
  fs.readFile(__dirname + '/../web/public/styles.css', {encoding: 'utf8'}, function (err, css) {
    if (err) {
        throw err;
    }
    callback(css);
    // console.log(html);
    // res.writeHead(200, {"Content-Type": "text/html"});
    // res.write(callback(html));
    // res.end();
  });
}
