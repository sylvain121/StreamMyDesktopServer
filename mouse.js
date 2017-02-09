var robot = require('robotjs');
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
  robot.moveMouse(x*x_ratio, y*y_ratio);

}

/**
 *@params newStat => "up", "down"
 *@params button => "left", "right", "middle"
 */
module.exports.toggle = function(button, newStat) {

  robot.mouseToggle(newStat, button);

}
