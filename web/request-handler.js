var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    res.writeHead(200);
    if (req.url === '/') {
      res.write('<input>');
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
    res.writeHead(302);
    fs.appendFile( archive.paths.list, req._postData.url + "\n", function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }

  res.end(archive.paths.list);
};

