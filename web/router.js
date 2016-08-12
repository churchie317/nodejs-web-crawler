var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers')


var handleDataCallback = function(data, res){
  // IF data
  if( data ){
    // WRITE to response object
    res.write(data);
    res.end();
  } else {
    res.end();
  }
}

var actions = {
  "GET": function(req, res){
    httpHelpers.serveAssets(res, archive.paths.siteAssets + req.url, handleDataCallback)
  },
  "POST": function(req, res, url){
    archive.isUrlInList(url, present => {
      if( !present ){
        httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', handleDataCallback);
      } else {
        httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, handleDataCallback);
      }
    })
  },
}

exports.handleRequest = function (req, res) {
  // LOG information to server
  console.log(`Handling ${req.method} request for url ${req.url}`);

  // RETURN appropriate http request method
  var action = actions[req.method];

  // COLLECT data from stream
  var result = '';
  req.on('data', (data) => {
    result += data;
  });
  req.on('end', () => {
    result = result.slice(4);
    // IF action
    if( action ){
      // INVOKE http request method
      action(req, res, result);
    } else {
      // 'NOT FOUND'
      res.writeHead(404, 'NOT FOUND', httpHelpers.headers);
      res.end();
    }
  })
};
