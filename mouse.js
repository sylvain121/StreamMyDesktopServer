const x11 = require('node-x11');
var x_ratio = 0;
var y_ratio = 0;


module.exports.isConfigured = function() {
  return x_ratio > 0 && y_ratio > 0;
}

module.exports.setParameters = function(params) {
x_ratio = parseInt(params.screen.width,10) / parseInt(params.distant.width,10);
y_ratio = parseInt(params.screen.height,10) / parseInt(params.distant.height,10);



}

module.exports.move  = function(x, y) {
  console.log(x,x_ratio, y,y_ratio)
  x11.mouseMove(x*x_ratio, y*y_ratio);

}

/**
 *@params newStat => "up", "down"
 *@params button => "left", "right", "middle"
 */
module.exports.toggle = function(button, newStat) {

  var button_int = 0;
  var isDown = false;
  isDown = (newStat === "down") ? true : false;
  switch(button) {
    case "left":
      button_int = 1;
      break;
    case "middle":
      button_int = 2;
      break;
    case "right":
      button_int = 3;
      break;
  }
  console.log(button_int, button, newStat, isDown);
  x11.mouseButton(button_int, isDown);

}
