var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200);
      res.write('<input>');
    } else {
      res.write('<div>google</div>')
    }
  }

  fs.readFile( archive.paths.list, function (err, data) {
    var body = "";
    if (err) throw err;
    // console.log(typeof JSON.parse(data));
    body += data;
    console.log(body);
  });

  if(req.method === 'POST'){
    res.writeHead(302);
    console.log(req._postData);
    fs.appendFile( archive.paths.list, req._postData.url + "\n", function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }

  res.end(archive.paths.list);
};

