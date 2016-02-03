(function(module) {

var menuTree = {};

// menuTree.makeClickEvents = function() {
//   $('#books-link').on('click', function() {
//     Tombstone.displayAll();
//   });
//
// };

menuTree.makeElements = function() {
  menuTree.$booksLink = $('<div>');
  menuTree.$booksLink.addClass('menu-link');
  menuTree.$booksLink.attr('id', 'books-link');
  menuTree.$booksLink.css('left', 9.8+'%').css('top', 21.5+'%');
  menuTree.$booksLink.html('good</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reads');
  menuTree.$booksLink.on('click', function() {
    Tombstone.displayAll();
  });
  $('#canvasWrap').append(menuTree.$booksLink);

  console.log('books link appended');
};



module.menuTree = menuTree;
})(window);
