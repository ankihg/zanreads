(function(module) {

  var Moon = {};


  Moon.draw = function() {
    // Moon.$img = $('<img>');

    var nFrame = 6;
    var frame = Math.floor(Math.random()*nFrame);

    //LOAD MOONS FROM LOCALSTORAGE

    Moon.$img.attr('src', '/media/moon/moon'+frame+'.png');

    Moon.$moonDiv.append(Moon.$img);
  };

  Moon.init = function() {
    Moon.$moonDiv = $('<div>');
    Moon.$moonDiv.attr('id', 'moonDiv');
    Moon.$moonDiv.hide();
    $('#canvasWrap').append(Moon.$moonDiv);
    Moon.$moonDiv.fadeIn(1000, function() {
      setInterval(Moon.draw,1000);
    })

    Moon.$img = $('<img>');

    Moon.draw();

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
