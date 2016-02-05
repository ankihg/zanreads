"use strict";
page.base('');

page('/', indexController.index);
page('/reviews/:id', Post.ensureAll, postController.index);
// page('/volunteer', volunteerController.index);
// page('/parks/:id', parkController.ensureParkAll, parkController.loadParkPage, comment.loadAll);
// page('/about-us',parkController.about);

page();
