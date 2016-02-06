(function(module) {

  var catalogController = {};

  catalogController.index = function() {
    console.log('welcome to the catalog');
    ui();
    listReviews();
  };

  function listReviews() {
    if ($('#catalog-wrap').children('.cat-link').length === 0) {
      Post.all.forEach(function(p) {
        p.toCatalogHTML();
      });
    }
  };

  function ui() {
    $('#catalog-wrap').siblings().hide();
    $('#catalog-wrap').show();
  };


  module.catalogController = catalogController;
})(window);
