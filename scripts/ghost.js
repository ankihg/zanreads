(function(module) {

var Ghost = function(post, x) {
  this.post = post;
  this.x = x;

  this.create();
};

Ghost.theGhost;

Ghost.raiseGhost = function(post, x) {
  Ghost.removeGhosts();

  Ghost.theGhost = new Ghost(post, x);
  Ghost.theGhost.draw();
};

Ghost.prototype.create = function() {
  this.$ghost = $('<div>');
  this.$ghost.addClass('ghost');

  var clientWidth = $('#canvasWrap').width();
  var clientHeight = $('#canvasWrap').height();

  this.y = 1*clientWidth/100;
  this.width = 7*clientWidth/12;
  this.height = 11*clientWidth/20;

  this.x = Math.min(this.x - this.width/4, clientWidth-this.width);

  this.$ghost.css('left', this.x).css('top', this.y).css('width', this.width).css('height', this.height);


  this.appearGhost();
  this.toHTML();
};

Ghost.prototype.appearGhost = function() {
  this.$img = $('<img>');
  this.$img.addClass('ghost-img');
  this.$img.attr('src', 'http://zanreads.info/ghost2.png');

  this.$ghost.append(this.$img);

  $('#forestDiv').on('click', function() {
    Ghost.theGhost.hideGhost();
  });

  $('#menuTreeDiv').on('click', function() {
    Ghost.theGhost.hideGhost();
  });

};

Ghost.prototype.hideGhost = function() {
  this.$ghost.hide();

  $('#forestDiv').on('click', function() {
    //do nothing
  });
  $('#menuTreeDiv').on('click', function() {
    //do nothing
  })
};

Ghost.prototype.toHTML = function() {
  var template = Handlebars.compile($('#ghost-template').text());
  var html = template(this.post);
  this.$ghost.append(html);
};


Ghost.prototype.draw = function() {
  $('#canvasWrap').append(this.$ghost);
}

Ghost.removeGhosts = function() {
  $('.ghost').remove();
}


module.Ghost = Ghost;
})(window);
