(function(module) {

var menuTree = {};

// menuTree.makeClickEvents = function() {
//   $('#books-link').on('click', function() {
//     Tombstone.displayAll();
//   });
//
// };

menuTree.makeElements = function() {
  makeBooksLink();
  makeAnkiLink();
  makeMailLink();
};

function makeBooksLink() {
  menuTree.$booksLink = $('<div>').addClass('menu-link').attr('id', 'books-link');
  menuTree.$booksLink.css('left', 9.8+'%').css('top', 21.5+'%');
  menuTree.$booksLink.html('good</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reads');
  menuTree.$booksLink.on('click', Tombstone.displayAll);
  $('#canvasWrap').append(menuTree.$booksLink);
};

function makeAnkiLink() {
  menuTree.$ankiLink = $('<div>').addClass('menu-link').attr('id', 'anki-link');
  menuTree.$ankiLink.css('left', 9.5+'%').css('top', 7.4+'%');
  menuTree.$ankiLink.html('&');
  menuTree.$ankiLink.on('click', function() {
    window.open('http://ankihg.ucoz.com/', '_blank');
  });
  $('#canvasWrap').append(menuTree.$ankiLink);
};

function makeMailLink() {
  menuTree.$mailLink = $('<div>').addClass('menu-link').attr('id', 'mail-link');
  menuTree.$mailLink.css('left', 5.6+'%').css('top', 51.9+'%');
  menuTree.$mailLink.html('@');
  menuTree.$mailLink.on('click', function() {
    window.open('mailto:sylvan.sparling@gmail.com');
  });
  $('#canvasWrap').append(menuTree.$mailLink);
};



module.menuTree = menuTree;
})(window);
