(function(module) {

var Tree = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.draw();
};

Tree.trees = [];
Tree.nTrees = 300;

Tree.generate = function() {

  if (!Tree.$forestDiv) {
    Tree.$forestDiv = $('<div>');
    Tree.$forestDiv.attr('id', 'forestDiv')
    Tree.$forestDiv.hide();
    $('#canvasWrap').append(Tree.$forestDiv);
    Tree.$forestDiv.fadeIn(2000, 'linear');
  };

  if (Tree.trees.length >= Tree.nTrees) {
   Tree.trees = []; //clear trees
   };

  //  var clientWidth = $('#canvasWrap').width();
  //  var clientHeight = $('#canvasWrap').height();

   var xMin = 0;
   var xMax = $('#forestDiv').width();

   var yMin = 0;
   var yMax = 5*$('#forestDiv').height()/10;
   var yPlus = (yMax-yMin)/Tree.nTrees;

  //  Tree.$forestDiv.css('left', xMin).css('top', yMin).css('width', xMax-xMin).css('height', yMax-yMin);

   var y = yMin;
   for (var n=0; n<Tree.nTrees; n++) {
   var x = (Math.random()*(xMax-xMin)) + xMin;
   y = y + (yPlus*(n/120));
   new Tree(x, y, ($('#forestDiv').width()/6)*(y/100), ($('#forestDiv').height()*2)*(y/100));
   }
};

Tree.prototype.draw = function() {
  this.$img = $('<img>');
  this.$img.addClass('tree');
  this.$img.attr('src', 'media/tree.png');
  this.$img.css('left', this.x).css('top', this.y).css('width', this.width).css('height', this.height);

  Tree.$forestDiv.append(this.$img);
};



module.Tree = Tree;
})(window);
