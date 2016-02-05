(function(module) {

  var postController = {};


  postController.index = function(ctx, next) {
    ui();
    var post = Post.getByID(ctx.params.id);
    console.log(post);
    post.toPageHTML();
  };

  function ui() {
    $('#canvasWrap').hide();

    $('#post-page-wrap').show();
  };


  module.postController = postController;
})(window);
