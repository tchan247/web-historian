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
  'index': path.join(__dirname, '../web/public/index.html'),
  'loading': path.join(__dirname, '../web/public/loading.html'),
  'styles': path.join(__dirname, '../web/public/styles.css')
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
  console.log("Running readListOfUrls")
  var body = "";
  fs.readFile( path.join(__dirname, '../archives/sites.txt'), {encoding: 'utf8'}, function (err, data) {
    if (err) throw err;
    body += data;
    var urlArray = body.split('\n');
    urlArray.splice(urlArray.length - 1, 1);
    callback(urlArray);
  });
};

exports.isUrlInList = function(urlName){

  exports.readListOfUrls(function() {
    for (var i = 0; i < urlArray.length; i++) {
      if (urlName === urlArray[i]) {
        console.log("Heyo!");
      }
    }
  });

  // console.log(urlName);
  // console.log("Running isUrlInList");
  // exports.readListOfUrls(function(urlArray) {
  //   console.log(urlArray);
  //   console.log("Sub0 ", urlArray[0])
  //   var truthy = false;
  //   for (var i = 0; i < urlArray.length; i++) {
  //     if (urlName === urlArray[i]) {
  //       truthy = true
  //       break;
  //     }
  //   }
  //   callback(truthy);
  // });
};

exports.addUrlToList = function(req){
  req.on('data', function(data) {
      var body = "";
      body += data;
      fs.appendFile( path.join(__dirname, '../archives/sites.txt'), body.split('=')[1] + "\n", function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
