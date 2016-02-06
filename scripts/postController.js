(function(module) {

  var postController = {};


  postController.index = function(ctx, next) {
    ui();
    var post = Post.getByID(ctx.params.id);
    console.log(post);
    post.toPageHTML();
    makeHomeLink();
  };

  function ui() {
    $('#canvasWrap').hide();

    $('#post-page-wrap').show();
  };

  function makeHomeLink() {
    var link = {
      title: "<br><br>home",
      url: "/"
    }
    var template = Handlebars.compile($('#ghost-link-template').text());
    var html = template(link);

    $('#home-link').append(html);
  }


  module.postController = postController;
})(window);
