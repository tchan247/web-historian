var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  // archive.homePage();
  if (req.method === 'GET') {
    res.writeHead(200);
    // Home Page
    if (req.url === '/') {
      archive.loadPage(function(html) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html, function(err){
          res.end()});
      });
    // Archive Pages
    } else if (req.url === '/styles.css') {
      archive.loadCss(function(css) {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.end(css);
      });
    } else if (req.url === '/www.google.com') {
      res.write('<div>google</div>')
    } else {
      // Search through site.txt
      fs.readFile( archive.paths.list, function (err, data) {
        var body = "";
        if (err) throw err;
        body += data;
        // if the requested URL is not found in site.txt
        if (body.indexOf("/" + req.url) === -1) {
          res.writeHead(404);
        }
      });
    }
  }

  if(req.method === 'POST'){
    res.writeHead(302, {
      'Location': '../public/loading.html'
    });
    fs.appendFile( archive.paths.list, req._postData.url + "\n", function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }
  // res.end();
  // res.end(archive.paths.list);
};
