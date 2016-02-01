var canvasWrap = document.getElementById('canvasWrap');
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

function init() {
 paint();
 setUp();
};

function setUp() {

 setInterval(function(){drawMoon()},600);
 setInterval(function(){Fog.generate()},300);
 setInterval(function(){Flock.drawFlocks()},200);

 addFlockListener();
 addFlockListenerInp(document.getElementById('catalog'), '10, 8');
 addFlockListenerInp(document.getElementById('ankihg'), '7, -2.5');
 addFlockListenerInp(document.getElementById('mail'), '3, 7');
};

function paint() {
 scaleCanvasToClient();
 drawEarth();
 Tree.generate();
 drawMenuTree();
 //drawMoon();
 Fog.regenerate();
}

function repaint() {
 scaleCanvasToClient();
 drawEarth();
 Tree.displayAll();
 drawMenuTree();
 drawMoon();
 Fog.regenerate();

 /*if (Ghost.ghost != null) {
 Ghost.ghost.draw();
 }*/

 Tombstone.redisplayTombstones();
};

function scaleCanvasToClient() {
 canvas.width = document.body.clientWidth;
 canvas.height = document.body.clientHeight;
};

function setGoodReads() {
 Tombstone.doDisplay = true;
 Tombstone.displayTombstones();
};

function setCatalog() {

};

function setZanMail() {

};

function setAnkiHg() {
 window.open('http://ankihg.ucoz.com/', '_blank');
};


function drawEarth() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext("2d");
 rect = canvas.getBoundingClientRect();
 var earth = new Image();
 earth.onload = function () {
 context.drawImage(earth,0,3*rect.height/10, rect.width, 9*rect.height/10);
 }
 earth.src = "http://zanreads.info/earth.png";
};

function drawMenuTree() {
 rect = canvas.getBoundingClientRect();
 var tree = new Image();
 tree.onload = function () {
 context.drawImage(tree,0,0, rect.width/4, rect.height);
 }
 tree.src = "http://zanreads.info/spook_tree3.png";
};

function drawMoon() {
 var moonCanvas = document.getElementById('moonCanvas');
 if (moonCanvas == null) {
 moonCanvas = document.createElement('canvas');
 moonCanvas.id = 'moonCanvas';
 moonCanvas.onmousedown = function() { drawTad(); };
 canvasWrap.appendChild(moonCanvas); //here
 }
 rect = canvas.getBoundingClientRect();

 moonCanvas.style.position = "absolute";
 moonCanvas.style.left = 5*rect.width/6;
 moonCanvas.style.top = 0;
 moonCanvas.style.width = 10*rect.width/100;
 moonCanvas.style.height = 15*rect.height/100;
 //canvasWrap.appendChild(moonCanvas);

 //moonRect = moonCanvas.getBoundingClientRect();
 var moonContext = moonCanvas.getContext("2d");

 var x = 0
 var y = 0;
 var width = moonCanvas.width;
 var height = moonCanvas.height;

 removePreviousMoon(x, y, width, height, moonContext);

 var moon = new Image();
 moon.onload = function () {
 moonContext.drawImage(moon, x, y, width, height);
 }

 var nFrame = 6;
 var frame = Math.floor(Math.random()*nFrame);
 moon.src = "http://zanreads.info/moon/moon".concat(frame, ".png");

 //moonRepaint();
};

function removePreviousMoon(x, y, width, height, moonContext) {
 //covers previous moon position with transparent pixels
 var img = moonContext.createImageData(width, height);
 for (var i = img.data.length; --i >= 0; )
 img.data[i] = 0;
 moonContext.putImageData(img, x, y);

 //Ghost.clearGhost(); //here
};

function moonRepaint() {
 //Fog.regenerate();
 /*if (Ghost.ghost != null) {
 Ghost.ghost.draw();
 }*/
};

function drawTad() {
 var moonCanvas = document.getElementById('moonCanvas');
 if (moonCanvas == null) {
 moonCanvas = document.createElement('canvas');
 moonCanvas.id = 'moonCanvas';
 moonCanvas.onmousedown = function() { drawTad(); };
 canvasWrap.appendChild(moonCanvas);
 }
 rect = canvas.getBoundingClientRect();

 moonCanvas.style.position = "absolute";
 moonCanvas.style.left = 5*rect.width/6;
 moonCanvas.style.top = 0;
 moonCanvas.style.width = 10*rect.width/100;
 moonCanvas.style.height = 15*rect.height/100;
 //canvasWrap.appendChild(moonCanvas);

 var moonContext = moonCanvas.getContext("2d");

 var x = 0
 var y = 0;
 var width = moonCanvas.width;
 var height = moonCanvas.height;

 removePreviousMoon(x, y, width, height, moonContext);

 var moon = new Image();
 moon.onload = function () {
 moonContext.drawImage(moon, x, y, width, height);
 }

 moon.src = "http://zanreads.info/tad.png";
};

function addFlockListenerInp(outerBoxLink, ariaLabel) {
 //makeFlockCanvas();

 //var outerBoxLink = document.getElementById('good-reads');
 //var boxLink = document.getElementById('boxy-link');
 //outerBoxLink.style.left = boxLink.style.left;
 //outerBoxLink.style.top = boxLink.style.top;
 //here
 outerBoxLink.ariaLabel = ariaLabel;

 outerBoxLink.onmouseenter = function(e) {
 //Tombstone.displayTombstones();
 var leftTop = e.srcElement.ariaLabel.split(', ');
 new Flock(parseFloat(leftTop[0]), parseFloat(leftTop[1]));
 };
};

function addFlockListener() {
 //makeFlockCanvas();

 var outerBoxLink = document.getElementById('good-reads');
 var boxLink = document.getElementById('boxy-link');
 //outerBoxLink.style.left = boxLink.style.left;
 //outerBoxLink.style.top = boxLink.style.top;
 //here
 outerBoxLink.ariaLabel = '7, 1';

 outerBoxLink.onmouseenter = function(e) {
 //Tombstone.displayTombstones();
 var leftTop = e.srcElement.ariaLabel.split(', ');
 new Flock(parseInt(leftTop[0]), parseInt(leftTop[1]));
 };
};

function makeFlockCanvas() {
 var flockCanvas = document.getElementById('flockCanvas');
 if (flockCanvas == null) {
 flockCanvas = document.createElement('canvas');
 flockCanvas.id = 'flockCanvas';
 }
 flockCanvas.style.position = "absolute";

 rect = canvas.getBoundingClientRect();
 flockCanvas.style.left = 0;
 flockCanvas.style.top = 0;
 flockCanvas.style.width = rect.width/4;
 flockCanvas.style.height = rect.height;

 canvasWrap.appendChild(flockCanvas);
};

function removeFlockCanvas() {
 var flockCanvas = document.getElementById('flockCanvas');
 if (flockCanvas != null) {
 canvasWrap.removeChild(flockCanvas);
 }
};


//Ghost class
var Ghost = function(x, y, postTxt, title) {

 rect = canvas.getBoundingClientRect();
 this.x = Math.min(x - rect.width/4, Ghost.xDisplayMax);
 this.x = Math.max(this.x, Ghost.xDisplayMin);
 this.y = y - rect.height/20;
 this.width = 13*rect.width/20;
 this.height = 8*rect.height/8;
 this.postTxt = postTxt;
 this.imgURL;
 this.title = title;
 this.author;
 this.url;

 this.parseMetadata();

 this.id = Tombstone.tombstones.length;

 this.post = new Post(this.postTxt, this.x+(25*this.width/100), this.y+(33*this.height/100), 52*this.width/100, 60*this.height/100);


 if (true) {
 if (Ghost.ghost!=null) {
 Ghost.ghost.remove();
 }
 Ghost.ghost = this;
 this.draw();
}

 //Ghost.ghost = this;
}

Ghost.ghost;
rect = canvas.getBoundingClientRect();
Ghost.xDisplayMax = 8*rect.width/8;
Ghost.xDisplayMin = 1*rect.width/8;

Ghost.prototype.draw = function() {

 Tombstone.hideBoxLinks();

 var theGhost = this;
 var ghost = new Image();
 ghost.onload = function () {
 context.drawImage(ghost,theGhost.x,theGhost.y, theGhost.width, theGhost.height);
 }
 ghost.src = "http://zanreads.info/ghost2.png";
 //ghost.onMouseDown = function() { alert('hi') };


 this.post.display();
 this.metadataDisplay();
 this.setUrlLink();
}

Ghost.clearGhost = function() {
  if (Ghost.ghost != null) {
   Ghost.ghost.remove();
   //setGhostNull();
   Ghost.ghost.hideMetadata();
   Post.hide();
   Tombstone.reappearBoxLinks();
 }
};

Ghost.prototype.remove = function() {
 //covers ghost position with transparent pixels
 var img = context.createImageData(this.width, this.height);
 for (var i = img.data.length; --i >= 0; ) {
 img.data[i] = 0;
 }
 context.putImageData(img, this.x, this.y);

 repaint();
};

Ghost.prototype.setUrlLink = function() {
 var postScroll = document.getElementById('postScroll');
 if (this.url != null) {
 //onClick="javascript:location.href='/index/deliverance_james_dickey/0-82'"
 var ghosty = this;
 postScroll.onmousedown = function() { window.location.href = ghosty.url; };
 }
};

Ghost.setGhostNull = function() {
 Ghost.ghost = null;
};

Ghost.prototype.metadataDisplay = function() {
 var metadataDisplay = document.getElementById('metaDisplay');
 if (metadataDisplay == null) {
 metadataDisplay = document.createElement('div');
 metadataDisplay.id = 'metadataDisplay';
 }
 metadataDisplay.style.position = "absolute";
 metadataDisplay.style.left = this.x + 55*this.width/100;
 metadataDisplay.style.top = this.y + this.height/20;
 metadataDisplay.style.width = this.width/4;
 metadataDisplay.style.height = this.height/8;
 metadataDisplay.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
 //metadataDisplay.style.color = 'green';

 //var imgHTML = '<img src="'.concat(this.imgURL , '" alt="Mountain View" style="width:', this.width/5, 'px;height:', this.height/6, 'px;">');

 this.displayImg();
 metadataDisplay.innerHTML = this.title.concat('&nbsp;', this.author);

 canvasWrap.appendChild(metadataDisplay);

};

Ghost.prototype.hideMetadata = function() {
 var metadataDisplay = document.getElementById('metadataDisplay');
 canvasWrap.removeChild(metadataDisplay);
};

Ghost.prototype.displayImg = function() {
 var ghost = this;
 var img = new Image();
 img.onload = function () {
 context.drawImage(img,ghost.x+(38*ghost.width/100), ghost.y + (7*ghost.height/100), 15*ghost.width/100, 24*ghost.height/100);
 }
 img.src = this.imgURL;
};

Ghost.prototype.parseMetadata = function() {

 //<br>img:http://d.gr-assets.com/books/1328856088l/839230.jpg<br>aut:Lidia Yuknavitch<br>

 var metadata = this.postTxt.split('x***x');
 if (metadata.length > 1) {

 this.postTxt = metadata[1];

 var tokens = metadata[0].split('x*x');
 for (var i =0; i<tokens.length; i++) {

 var token = tokens[i];

 //url
 if (token.substring(0,8) == '<br>url:') {
 this.url = token.substring(8, token.length-4);
 } else {

 //img
 var regexImg = /<br>img:(.+)<br>/;
 var match = regexImg.exec(token);
 if (match != null) {
 this.imgURL = match[1];
 } else {

 //author
 var regexAut = /<br>aut:(.+)<br>/;
 var matchAut = regexAut.exec(token);
 if (matchAut.length > 0) {
 this.author = matchAut[1];
 }
 }
 }

 }
 }
};

//Post class
var Post = function(postTxt, x, y, width, height) {
 /*this.txt = 'hej hej plz respond plz respond plz respond no reply plz respond plz respond plz respond plz respond no reply hej hej plz respond plz respond plz respond no reply plz respond plz respond plz respond plz respond no reply hej hej plz respond plz respond plz respond no reply plz respond plz respond plz respond plz respond no reply hej hej plz respond plz respond plz respond no reply plz respond plz respond plz respond plz respond no reply hej hej plz respond plz respond plz respond no reply plz respond plz respond plz respond plz respond no reply hej hej plz respond plz respond plz respond no reply plz respond plz respond plz respond plz respond';*/

 this.txt = postTxt; //this.txt.concat(this.txt, this.txt, this.txt, this.txt, this.txt);
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;
 //this.display();
};

Post.prototype.display = function() {

 var postCanvas = document.getElementById("postScroll");
 postCanvas.style.visibility = "visible";
 postCanvas.scrollTop = 0;
 postCanvas.style.left = this.x;
 postCanvas.style.top = this.y;
 postCanvas.style.width = this.width;
 postCanvas.style.height = this.height;
 postCanvas.innerHTML = this.txt;

 //canvasWrap.innerHTML = ''.concat('<div id="postScroll" style="width: 100px; height: 100px; overflow-y: scroll;">', this.txt ,'</div>');

 /*var postCanvas = document.getElementById("postScroll");
 postCanvas.innerHTML = this.txt;*/
 /*var postContext = postCanvas.getContext("2d");
 postContext.font = "30px Arial";
 postContext.strokeText(this.txt,10,50);*/
};

Post.hide = function() {
 var postCanvas = document.getElementById("postScroll");
 postCanvas.style.visibility = "hidden";
}

//Tombstone class
var Tombstone = function(x, y, width, height, postTxt) {
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;
 this.postTxt = postTxt;

 Tombstone.tombstones.push(this);
 this.id = Tombstone.tombstones.length;

 this.draw();
};

Tombstone.tombstones = [];
Tombstone.doDisplay = false;
Tombstone.boxLinks = [];

Tombstone.prototype.draw = function() {
 var tombstone = this;
 var img = new Image();
 img.onload = function () {
 context.drawImage(img,tombstone.x,tombstone.y, tombstone.width, tombstone.height);
 }
 img.src = "http://zanreads.info/tstone2.png";
 this.makeBoxLinkWithId(this.id);
};


Tombstone.reappearBoxLinks = function() {
 for (var i=1; i<=Tombstone.tombstones.length; i++) {
 if (document.getElementById('box-link'.concat(i)) == null) {
 var tombstone = Tombstone.tombstones[i];
 tombstone.makeBoxLinkWithId(i);
 }
 }
}

Tombstone.prototype.makeBoxLinkWithId = function(id) {
 var boxLink = document.getElementById('box-link'.concat(id));
 if (boxLink == null) {
 boxLink = document.createElement('div');
 boxLink.id = 'box-link'.concat(id);
 }
 boxLink.style.position = "absolute";
 boxLink.style.left = this.x + this.width/4;
 boxLink.style.top = this.y + this.height/8;
 boxLink.style.width = this.width/2;
 boxLink.style.height = 3*this.height/4;
 //boxLink.style.border= "1px dashed yellow";
 boxLink.style.color = 'white';
 boxLink.innerHTML = this.parseTitle();
 //boxLink.title = this.parseText();
 boxLink.ariaLabel = this.parseText();

 boxLink.onmouseover = function(e) {
 new Ghost(e.clientX, rect.height/20, e.srcElement.ariaLabel, e.srcElement.innerHTML);
 };

 canvasWrap.appendChild( boxLink );
};

Tombstone.prototype.makeBoxLink = function() {
 var boxLink = document.getElementById('box-link'.concat(Tombstone.tombstones.length));
 if (boxLink == null) {
 boxLink = document.createElement('div');
 boxLink.id = 'box-link'.concat(Tombstone.tombstones.length);
 }
 boxLink.style.position = "absolute";
 boxLink.style.left = this.x + this.width/4;
 boxLink.style.top = this.y + this.height/8;
 boxLink.style.width = this.width/2;
 boxLink.style.height = 3*this.height/4;
 //boxLink.style.border= "1px dashed yellow";
 boxLink.style.color = 'white';
 boxLink.innerHTML = this.parseTitle();
 //boxLink.title = this.parseText();
 boxLink.ariaLabel = this.parseText();

 boxLink.onmouseover = function(e) {
 new Ghost(e.clientX, rect.height/20, e.srcElement.ariaLabel, e.srcElement.innerHTML);
};

 //boxLink.addEventListener(MouseEvent.CLICK, onClick);
//var html = '<p>no reply</p>';


 //boxLink.innerHTML = html;
 canvasWrap.appendChild( boxLink );

};

Tombstone.prototype.riseGhost = function() {
 this.ghost = new Ghost(this.x, 0);
};

Tombstone.displayTombstones = function() {
 if (Tombstone.tombstones.length == 0) {
 postTxt = readTextFile('/books/reviews.txt');
 posts = postTxt.split('x*****x');

 rect = canvas.getBoundingClientRect();

 /*var xMin = 2*rect.width/10;
 var xMax = 9*rect.width/10;

 var yMin = 5*rect.height/10;
 var yMax = 9*rect.height/10;
 var yPlus = (yMax-yMin)/posts.length;

 var y = yMin;
 for (var n=1; n<posts.length; n++) {
 var x = (Math.random()*(xMax-xMin)) + xMin;
 y = y + yPlus;
 new Tombstone(x, y, (rect.width/8)*(y/300), (rect.height/4)*(y/300), posts[n]);
 }*/

 var nRow = 4;
 var nCol = 5;

 var rowSize = 10*rect.width/100;
 var colSize = 10*rect.height/100;

 var xMin = 2*rect.width/10;
 var yMin = 6*rect.height/10;

 var nTombs = 1;
 for (var i=0; i < nRow; i++) {
 for (var j=0; j<nCol; j=j+2) {
 if (nTombs >= posts.length) {
 return;
 }

 var colMod = j + i%2;

 var x = xMin + colMod*rowSize;
 var y = yMin + i*colSize;

 new Tombstone(x, y, (rect.width/8)*(y/500), (rect.height/4)*(y/500), posts[nTombs]);

 nTombs++;

 }
 }

}
};

Tombstone.redisplayTombstones = function() {
 for (var i=0; i<Tombstone.tombstones.length; i++) {
 Tombstone.tombstones[i].draw();
 }
};

Tombstone.hideBoxLinks = function() {
 if (Tombstone.tombstones.length < 1) {
 return;
 }
 for (var i=1; i<=Tombstone.tombstones.length; i++) {
 var boxLink = document.getElementById('box-link'.concat(i));
 if (boxLink != null) {
 canvasWrap.removeChild(boxLink);
 }
 }
};

Tombstone.prototype.parseTitle = function() {
 var title = this.postTxt.split('x***x');
 title = title[0].split('x**x');
 return title[0];
}

Tombstone.prototype.parseText = function() {
 var title = this.postTxt.split('x**x');
 if (title.length > 1) {
 return title[1];
 }
 return this.postTxt.split('x***x')[1];
}

//Fog class
var Fog = function() {
 rect = canvas.getBoundingClientRect();
 this.x = Math.random()*(4*rect.width/4);
 this.y = (Math.random()*(4*rect.height/5)); //+rect.height/4;
 this.width = 300;
 this.height = 300;


 Fog.fogs.push(this);

 this.draw();
};

Fog.fogs = [];
Fog.max = 30;

Fog.prototype.draw = function() {
 var fog = this;
 var img = new Image();
 img.onload = function () {
 context.drawImage(img,fog.x,fog.y, fog.width, fog.height);
 }
 img.src = "http://zanreads.info/fog.png";
};

Fog.generate = function() {
 //if (Fog.fogs.length < Fog.max) {
 new Fog();
 /*} else {
 alert('no more');
 var r = Math.floor(Math.random() * Fog.fogs.length);
 var fog = Fog.fogs[r];

 rect = canvas.getBoundingClientRect();
 fog.x = Math.random()*(4*rect.width/4);
 fog.y = (Math.random()*(4*rect.height/5)); //+rect.height/4;

 fog.draw();
 //Fog.fogs[r] = fog;
 }*/
}

Fog.regenerate = function() {
 for (var i=0; i<Fog.fogs.length; i++) {
 Fog.fogs[i].draw();
 }
};

//Flock class
var Flock = function(x, y) {
 rect = canvas.getBoundingClientRect();

 this.x = x*rect.width/100;
 this.y = y*rect.height/100
 this.width = rect.width/10;
 this.height = rect.height/10;
 this.frame = 0;

 Flock.flocks.push(this);
}

Flock.flocks = [];
Flock.frames = ['/flock/birds1.png', '/flock/birds2.png', '/flock/birds3.png', '/flock/birds4.png', '/flock/birds5.png', '/flock/birds6.png', '/flock/birds7.png', '/flock/birds_blank.png'];

Flock.fly = function() {
 //new Flock(e.srcElement.left, e.srcElement.top);
}

Flock.drawFlocks = function() {
 removeFlockCanvas();
 if (Flock.flocks.length > 0) {
 makeFlockCanvas();
 }
 for (var i = 0; i < Flock.flocks.length; i++) {
 var flock = Flock.flocks[i];
 flock.drawFlock();
 flock.frame++;
 if (flock.frame >= Flock.frames.length) {
 var index = Flock.flocks.indexOf(flock);
 flock.removePrevious();
 if (index > -1) {
 Flock.flocks.splice(index, 1);
 }
 }
 }
}

Flock.prototype.drawFlock = function() {

 //this.removePrevious();

 var theFlock = this;
 var flock = new Image();
 flock.onload = function () {
 rect = canvas.getBoundingClientRect();
 var flockCanvas = document.getElementById('flockCanvas');
 if (flockCanvas != null) {
 var ctx = flockCanvas.getContext("2d");
 ctx.drawImage(flock, theFlock.x, theFlock.y, theFlock.width, theFlock.height);
 } else {
 context.drawImage(flock, theFlock.x, theFlock.y, theFlock.width, theFlock.height);
 }
 }
 flock.src = Flock.frames[this.frame];

 repaint();
};

Flock.prototype.removePrevious = function() {
 //covers previous cloud position with transparent pixels
 var img = context.createImageData(this.width, this.height);
 for (var i = img.data.length; --i >= 0; )
 img.data[i] = 0;
 context.putImageData(img, this.x, this.y);
};


//Tree class
var Tree = function(x, y, width, height) {
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;

 Tree.trees.push(this);
};

Tree.trees = [];

Tree.prototype.draw = function() {
 var tree = this;
 var img = new Image();
 img.onload = function () {
 context.drawImage(img,tree.x,tree.y, tree.width, tree.height);
 }
 img.src = "http://zanreads.info/tree2.png";
};

Tree.displayAll = function() {
 for (var i=0; i<Tree.trees.length; i++) {
 Tree.trees[i].draw();
 }
};

Tree.generate = function() {
 rect = canvas.getBoundingClientRect();

 var nTrees = 180;

 if (Tree.trees.length >= nTrees) {
 Tree.trees = []; //clear trees
 };

 var xMin = 1*rect.width/10;
 var xMax = 9*rect.width/10;

 var yMin = 6*rect.height/20;
 var yMax = 10*rect.height/20;
 var yPlus = (yMax-yMin)/nTrees;

 var y = yMin;
 for (var n=0; n<nTrees; n++) {
 var x = (Math.random()*(xMax-xMin)) + xMin;
 y = y + yPlus;
 new Tree(x, y, (rect.width/20)*(y/300), (rect.height/8)*(y/300));
 }

 Tree.displayAll();
};


function readTextFile(file)
{
 var rawFile = new XMLHttpRequest();
 rawFile.open("GET", file, false);
 rawFile.onreadystatechange = function ()
 {
 if(rawFile.readyState === 4)
 {
 if(rawFile.status === 200 || rawFile.status == 0)
 {
 var allText = rawFile.responseText;
 //allText = allText.replace('n', '<br>');
 return allText;
 }
 }
 }
 rawFile.send(null);
 return rawFile.responseText.replace(/\n/g, '<br>');
;
}

$(document).ready(function() {
  //main
  init();
});
