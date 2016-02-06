(function(module) {

var Post = function(tmp) {
  this.title = tmp.title;
  this.id = this.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/ /g, '-' ).toLowerCase();
  this.author = tmp.author;
  this.imgSrc = tmp.imgSrc;
  this.url = tmp.url; // ?
  this.body = tmp.body;
  console.log(this.title);
};

Post.all = [];

Post.loadAll = function(rawData) {
  Post.all = rawData.map(function(tmp) {
    return new Post(tmp);
  });
};

Post.fetchAll = function(callNext) {
  console.log('fetch all');
  if (localStorage.reviewData) {
    console.log('load from storage');
    Post.checkUpdate(callNext); //checks if needs update, calls loadAll() either way
  } else {
      Post.update(callNext);
  }
};

Post.update = function(callNext) {
 $.getJSON('/data/reviews.json', function(data, message, xhr) {
    Post.loadAll(data);
    localStorage.reviewData = JSON.stringify(data);
    localStorage.reviewEtag = xhr.getResponseHeader('eTag');
    if (callNext) { callNext(); }
  });
};

Post.checkUpdate = function(callNext) {
  $.ajax({
  type: 'HEAD',
  url: "/data/reviews.json",
  complete: function(data) {
    var etag = data.getResponseHeader('eTag');
    if (localStorage.reviewEtag !== etag) {
      Post.update();
      if (callNext) { callNext(); }
    } else {
      Post.loadAll(JSON.parse(localStorage.reviewData));
      if (callNext) { callNext(); }
    }
  }
  });
};

Post.ensureAll = function(ctx, next) {
  console.log('ensure all');
  if (!Post.all || Post.all.length === 0) {
    Post.fetchAll(next);
  } else {
    if (next) { next(); }
  }
};


Post.prototype.toPageHTML = function() {
    this.makeGhostLinks();

    var template = Handlebars.compile($('#post-page-template').text());
    var html = template(this);

    $('#post-page-wrap').empty();
    $('#post-page-wrap').append(html);
};

Post.prototype.makeGhostLinks = function() {
  this.ghostLinks = '';

  for (var i=0; i<3; i++) {
    var post = Post.all[Math.floor(Post.all.length*Math.random())];

    var template = Handlebars.compile($('#ghost-link-template').text());
    var html = template(post);

    this.ghostLinks += html + "&nbsp; &nbsp;";
  }
};

Post.getByID = function(id) {
  var matches = Post.all.filter(function(p) {
    return p.id === id;
  });
  if (matches.length > 0) { return matches[0]; }
};

module.Post = Post;
})(window);
