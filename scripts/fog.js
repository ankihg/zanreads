(function(module) {

  var Fog = function() {
    this.x = Math.random()*Fog.$fogDiv.width();
    this.y = Math.random() *Fog.$fogDiv.height();
    this.draw();
  };

  Fog.all = [];

  Fog.init = function() {
    Fog.$fogDiv = $('<div>');
    Fog.$fogDiv.attr('id', 'fogDiv');
    $('#canvasWrap').append(Fog.$fogDiv);

    setInterval(Fog.generate,300);
  };

  Fog.prototype.draw = function() {
    this.$img = $('<img>');
    this.$img.attr('src', '/media/fog.png');
    this.$img.css('left', this.x).css('top', this.y);
    Fog.$fogDiv.append(this.$img);
  };

  Fog.generate = function() {
    if ($('#canvasWrap').is(':visible')) {
      Fog.all.push(new Fog());
    }

    // for (var i=0; i<Push.all.length/8; i++) {
    //   var fog = Fog.all[Math.floor(Math.random()*Fog.all.length)];
    //
    // }
  };

  module.Fog = Fog;
})(window);
