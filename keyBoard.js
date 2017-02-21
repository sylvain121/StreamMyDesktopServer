const x11 = require("node-x11");

module.exports.toggleKeyDown = function(keyCode) {
  console.log("keycode", "down", keyCode, typeof keyCode);
  if (keyCode <= 0) return console.log("unknow keyCode : " + keyCode);
  x11.keyPress(keyCode, true);
}


module.exports.toggleKeyUp = function(keyCode) {
  if (keyCode <= 0) return console.log("unknow keyCode : " + keyCode);
  x11.keyPress(keyCode, false);
}

