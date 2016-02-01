(function(module) {

var Flock = function($linkDiv) {
  this.$linkDiv = $linkDiv;
  this.create();
  this.draw();
};

Flock.all = [];

Flock.prototype.create = function() {
  this.$flockDiv = $('<div>');
  this.$flockDiv.addClass('flock');
  this.$flockDiv.css('left', this.$linkDiv.left).css('top', this.$linkDiv.top);

  this.$img = $('<img>');
  this.$img.attr('src', '/media/flock1.png');
  this.$flockDiv.append(this.$img);
}

Flock.prototype.draw = function() {
  $('#canvasWrap').append(this.$flockDiv);
};

Flock.setListeners = function() {
  $('.menu-link').on('mouseover', function() {
    console.log('books-link mouseover');
    Flock.all.push(new Flock(this));
  });
};


module.Flock = Flock;
})(window);
