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
  this.$flockDiv.css('left', parseInt(this.$linkDiv.css('left'))-parseInt($('#canvasWrap').css('width'))/40).css('top', parseInt(this.$linkDiv.css('top'))-parseInt($('#canvasWrap').css('height'))/8).css('width', parseInt($('#canvasWrap').css('width'))/6).css('height', parseInt($('#canvasWrap').css('height'))/3);
  var flock = this;
  this.$flockDiv.on('click', function(e) {
    e.preventDefault();
    flock.$linkDiv.trigger('click');
  });

  this.$img = $('<img>');
  this.$img.attr('src', '/media/flock.gif');
  this.$flockDiv.append(this.$img);
}

Flock.prototype.draw = function() {
  $('#canvasWrap').append(this.$flockDiv);


  var flock = this;
  setInterval(function() {
    if ($('#canvasWrap').has(flock.$flockDiv)) {
      flock.$flockDiv.remove();
      //http://stackoverflow.com/questions/10730212/proper-way-to-reset-a-gif-animation-with-displaynone-on-chrome
      // reset a gif:
      flock.$img.attr('src', flock.$img.attr('src').replace(/\?.*$/,"")+"?x="+Math.random());
    }
  }, 1000);
};

Flock.setListeners = function() {
  $('.menu-link').on('mousemove', function() {
    console.log('books-link mousemove');
    Flock.all.push(new Flock($(this)));
  });
};


module.Flock = Flock;
})(window);
