(function(module) {

  var Fog = function() {

  };

  Fog.all = [];

  Fog.prototype.create = function() {
    this.$img
  };

  Fog.generate = function() {
    Fog.all.push(new Fog());
  };

  Fog.init = function() {
    Fog.$fogDiv = $('<div>');
    Fog.$fogDiv.attr('id', 'fogDiv');
    $('#canvasWrap').append(Fog.$fogDiv);

    setInterval(Fog.generate,300);
  };

  module.Fog = Fog;
})(window);
