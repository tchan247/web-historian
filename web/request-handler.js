var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelp = require('../web/http-helpers')

exports.handleRequest = function (req, res) {
  // archive.homePage();
  if (req.method === 'GET') {
    res.writeHead(200);
    // Home Page
    if (req.url === '/') {
      httpHelp.serveAssets(res, archive.paths.index, 200);
    } else if (req.url === '/styles.css') {
      httpHelp.serveAssets(res, archive.paths.styles, 200);
    // Archive Pages
    } else {
      console.log("Run else");
      console.log(req.url.slice(1));
    }

    archive.isUrlInList(req.url.slice(1), function(truthy) {
      if (truthy) {
        httpHelp.serveAssets(res, archive.paths.archivedSites + req.url, 200);
      }
    });
    // else if (req.url === '/www.google.com') {
    //   res.write('<div>google</div>')
    // } else {
    //   // Search through site.txt
    //   fs.readFile( archive.paths.list, function (err, data) {
    //     var body = "";
    //     if (err) throw err;
    //     body += data;
    //     // if the requested URL is not found in site.txt
    //     if (body.indexOf("/" + req.url) === -1) {
    //       res.writeHead(404);
    //     }
    //   });
    // }
  }

  if(req.method === 'POST'){

    res.writeHead(302, {
      'Location': '../public/loading.html'
    });
    if ( !archive.isUrlInList(req.url) ) {
      archive.addUrlToList(req);
      httpHelp.serveAssets(res, archive.paths.loading, 302);
    }
  }
  // res.end();
  // res.end(archive.paths.list);
};
