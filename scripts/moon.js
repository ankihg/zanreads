(function(module) {

  var Moon = {};


  Moon.draw = function() {
    // Moon.$img = $('<img>');

    var nFrame = 6;
    var frame = Math.floor(Math.random()*nFrame);
    Moon.$img.attr('src', '/media/moon/moon'+frame+'.png');

    Moon.$moonDiv.append(Moon.$img);
  }

  Moon.init = function() {
    Moon.$moonDiv = $('<div>');
    Moon.$moonDiv.attr('id', 'moonDiv');
    $('#canvasWrap').append(Moon.$moonDiv);

    Moon.$img = $('<img>');

    setInterval(Moon.draw,600);

    Moon.$img.on('click', function() {
      Moon.$img.attr('src', '/media/moon/tad.png');
      Moon.$moonDiv.append(Moon.$img);
    });
    Moon.$moonDiv.on('click', function() {
      Moon.$img.attr('src', '/media/moon/tad.png');
      Moon.$moonDiv.append(Moon.$img);
    });
  };




  module.Moon = Moon;
})(window);
