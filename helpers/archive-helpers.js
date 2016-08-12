var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf-8', (err, data) => {
    if( err ){
      console.error(err);
    }
    callback(data.split("\n"));
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(list => {
    callback(_.some(list, item => {
      return item === url;
    }))
  });
};

exports.addUrlToList = function(url, callback){
  exports.readListOfUrls(list => {
    list.push(url);
    fs.writeFile(exports.paths.list, url, (err, data) => {
      if( err ){
        console.error(err);
      }
      callback(data);
    });
  })
};

exports.isUrlArchived = function(url, callback){
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if( err ){
      console.error(err);
    }
    callback(_.some(files, (file) => file === url));
  });
};

exports.downloadUrls = function(urls){
  urls.forEach((url) => {
    http.get({
	    url: url,
	    progress: function (current, total) {
		    console.log('downloaded %d bytes from %d', current, total);
	    }
    },
    exports.paths.archivedSites + '/' + url,
    function (err, res) {
	    if (err) {
		    console.error(err);
		    return;
	    }
	    //console.log(res.code, res.headers, res.file);
    });
  })
};
