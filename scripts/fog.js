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
    console.log(this.x);
    this.$img.css('left', this.x).css('top', this.y);
    Fog.$fogDiv.append(this.$img);
    console.log('fog drawn');
  };

  Fog.generate = function() {
    Fog.all.push(new Fog());
  };

  module.Fog = Fog;
})(window);
