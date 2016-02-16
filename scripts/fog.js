(function(module) {

  var Fog = function() {
    this.x = Math.random()*Fog.$fogDiv.width();
    this.y = Math.random() *Fog.$fogDiv.height();
    this.draw();
  };

  Fog.all = [];
  Fog.max = 500;

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
      if (Fog.all.length < Fog.max) {
        Fog.all.push(new Fog());
      } else {
        Fog.move();
      }
    }
  };

  Fog.move = function() {
    var rFog = Fog.all[Math.floor(Math.random()*Fog.all.length)];
    rFog.updatePos();
    console.log('moved fog');
  };

  Fog.prototype.updatePos = function() {
    this.x = Math.random()*Fog.$fogDiv.width();
    this.y = Math.random() *Fog.$fogDiv.height();
    this.$img.css('left', this.x).css('top', this.y);
  };

  module.Fog = Fog;
})(window);
