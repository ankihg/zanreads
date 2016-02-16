"use strict";
page.base('');

page('/', indexController.index);
page('/reviews/:id', Post.ensureAll, postController.index);
page('/', indexController.index);
page('/catalog', Post.ensureAll, catalogController.index);
// page('/data/reviews2', toReviewsJSON);
//
//
// function toReviewsJSON() {
//   window.location.href = '/data/reviews2.json';
//   // alert('plz respond');
// };


page();
