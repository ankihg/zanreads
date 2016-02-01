(function(module) {

//Tombstone class
var Tombstone = function(post, x, y, width, height) {
  console.log('make tombstone title: '+post.title);
  this.post = post;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.create();
};

Tombstone.all = [];

Tombstone.displayAll = function() {
  if (Tombstone.all.length === 0) {
    Tombstone.createAll();
  }

  Tombstone.all.map(function(tombstone) {
    tombstone.draw();
  });
};

Tombstone.createAll = function() {
  var clientWidth = $('#canvasWrap').width();
  var clientHeight = $('#canvasWrap').height();

  var nRow = 3;
  var nCol = 3;

  var xMin = clientWidth/4;
  var yMin = 6*clientHeight/8;

  var rowSize = (clientWidth-xMin)/(2*nRow);
  var colSize = (clientHeight-yMin)/(2*nCol);

  for (var i=0; i<nRow; i++) {
    for (var j=0; j<2*nCol; j=j+2) {
      if (Tombstone.all.length >= Post.all.length) {
        return;
      }

      var colMod = j + i%2;

      var x = xMin + colMod*rowSize;
      var y = yMin + i*colSize;

      var width = 7*rowSize/8;
      var height = 5*colSize;

      Tombstone.all.push(new Tombstone(Post.all[Tombstone.all.length], x, y, width, height));
    }
  }
};

Tombstone.prototype.create = function() {
  console.log('tombstone draw '+ this.x+', '+this.y );

  this.$tombstone = $("<div>");
  this.$tombstone.addClass('tombstone');
  this.$tombstone.css('left', this.x).css('top', this.y).css('width', this.width).css('height', this.height);

  this.erectTombstone();
  this.engraveText();
  this.handleGhostRise();
};

Tombstone.prototype.erectTombstone = function() {
  this.$img = $('<img>');
  this.$img.attr('src', 'http://zanreads.info/tstone2.png');

  this.$tombstone.append(this.$img);
};

Tombstone.prototype.engraveText = function() {
  console.log('engrave tombstone');
  this.$engraving = $('<div>');
  this.$engraving.addClass('tombstone-engraving');
  this.$engraving.text(this.post.title);

  console.log(this.$engraving.text());
  this.$tombstone.append(this.$engraving);
}

Tombstone.prototype.handleGhostRise = function() {
  var tombstone = this;
  this.$img.on('mouseover', function() {
    Ghost.raiseGhost(tombstone.post, tombstone.x);
  });

  this.$engraving.on('mouseover', function() {
    Ghost.raiseGhost(tombstone.post, tombstone.x);
  });

}


Tombstone.prototype.draw = function() {
  $('#canvasWrap').append(this.$tombstone);
}


module.Tombstone = Tombstone;
})(window);
