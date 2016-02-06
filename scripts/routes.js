"use strict";
page.base('');

page('/', indexController.index);
page('/reviews/:id', Post.ensureAll, postController.index);
page('/', indexController.index);
page('/catalog', Post.ensureAll, catalogController.index);


page();
