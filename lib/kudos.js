var fs = require('graceful-fs');
var dataFile = __dirname + '/data.json';
var kudosData = {};

var init = function(){
  return kudosData = JSON.parse( fs.readFileSync(dataFile, 'utf8') );
};

var getCount = function(path){
  if(!kudosData[path]){
    return 0;
  }

  return parseInt(kudosData[path]);
};

var updateCount = function(path, callback){
  var count = getCount(path);

  kudosData[path] = count + 1;

  return saveToFile(callback);
};

var saveToFile = function(callback){
  return fs.writeFile(dataFile, JSON.stringify(kudosData), function(err){
    if(err){
      return callback(true, null);
    }

    return callback(null, kudosData);
  });
};

module.exports = {
  init: init,
  getCount: getCount,
  updateCount: updateCount
};

init();
