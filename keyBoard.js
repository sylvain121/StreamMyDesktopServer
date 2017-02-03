const robot = require('robotjs');
const _ = require('lodash');



var allowKeysList = ["backspace", "delete", "enter", "tab", "escape", "up", "down", "right", "left", "home", "end", "pageup", "pagedown", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "command", "alt", "control", "shift", "right_shift", "space", "printscreen", "insert"];

var modifiersList = ["command", "alt", "control", "shift", "right_shift"];


module.exports.toggleKeyDown = function(key, modifier) {
  if (isValidKey(key) && isvalidModifier(modifier)) {
    if (modifier === undefined) {
      robot.keyToggle(key, "down");
    } else {
      robot.keyToggle(key, "down", modifier);
    }
  }
}


module.exports.toggleKeyUp = function(key, modifier) {
  if (isValidKey(key) && isvalidModifier(modifier)) {
    if (modifier === undefined) {
      robot.keyToggle(key, "up");
    } else {
      robot.keyToggle(key, "up", modifier);
    }
  }
}

function isValidKey(key) {
  return genericFinder(key, allowKeysList) || key.length === 1;
}

function isvalidModifier(modifier) {
  return genericFinder(modifier, modifiersList);
}

function genericFinder(input, list) {
  console.log(input);

  var index = _.findIndex(list, input);
  if (index < 0) {
    console.log("unknow key " + input);
    return false;
  } else {
    return true;
  }
}

