var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if( asset === archive.paths.siteAssets + '/' ){
    asset = archive.paths.siteAssets + '/index.html'
  }
  // var path = archive.paths.siteAssets + asset;
  fs.readFile(asset, (err, data) => {
    if( err ){
      console.error(err);
    }
    res.writeHead(200, headers);
    callback(data, res);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
