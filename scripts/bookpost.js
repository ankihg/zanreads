//*****4 ZAN*********************
//var title = 'deliverance';
//*******************************


var thePost;

var theTitle;
var theText;
var theAuthor;
var theImgURL;
var theURL;

function setUp() {
 getPost(title);
 parsePostData();
 setText();
 placeImg();
 addGhostLinks();
};

function getPost(title) {
 var postTxt = readTextFile('/books/reviews.txt');
 var posts = postTxt.split('x*****x');

 for (var i=0; i < posts.length; i++) {
 var post = posts[i];
 var postTitle = post.split('x**x')[0];
 if ('<br>'.concat(title, '<br>') == postTitle) {
 thePost = post;
 return;
 }
 }
};

function setText() {
 var textDiv = document.getElementById('textDiv');
 var rect = document.body.getBoundingClientRect();
 textDiv.style.height = 9*rect.height/10;


 var html = '<h1>'.concat(theTitle.toUpperCase(), '</h1>');
 html += '<h3>'.concat(theAuthor.toUpperCase(), '</h3>');
 html += theText;

 textDiv.innerHTML = html;
};

function placeImg() {
 var imgDiv = document.getElementById('imgDiv');
 imgDiv.innerHTML = '<img src='.concat(theImgURL, '>');
};

function addGhostLinks() {
 addHomeGhostLink('/ghost2.png');
 addListGhostLink('/ghost2.png');

 var nGhostLinks = 3;
 var left = 4;
 for (var i=1; i<=nGhostLinks; i++) {

  var ghostLink = document.getElementById('ghostLink'.concat(i));

  var postLinkData = getRandomPostLink();
  var postTitle = postLinkData[0];

  var postURL = postLinkData[1];

 displayGhostLink(ghostLink, postTitle, postURL, left, '/ghost2.png');


  left += 12;

 }

};

function addHomeGhostLink(imgURL) {
 var ghostLink = document.getElementById('ghostLinkHome');
 var html = "<a href='/'>";
 html += "<img src='".concat(imgURL, "'>");

 html += '<div style="position:absolute; left:5%; top:5%; width:70%; height:100%; text-align:center;">'.concat('&nbsp; <br> &nbsp; <br> home', '</div>');
 html += "</a>";

 ghostLink.style.left = "2%";
 ghostLink.style.top = "20%";

 ghostLink.innerHTML = html;
};

function addListGhostLink(imgURL) {
 var ghostLink = document.getElementById('ghostLinkList');
 var html = "<a href='/index/books_list/0-10'>";
 html += "<img src='".concat(imgURL, "'>");

 html += '<div style="position:absolute; left:5%; top:5%; width:70%; height:100%; text-align:center;">'.concat('&nbsp; <br> &nbsp; <br> list', '</div>');
 html += "</a>";

 ghostLink.style.left = "2%";
 ghostLink.style.top = "50%";

 ghostLink.innerHTML = html;
};

function displayGhostLink(ghostLink, postTitle, postURL, left, imgURL) {
 var rect = document.body.getBoundingClientRect();
 ghostLink.style.left = left*rect.width/100;

  var html = '<a href="'.concat(postURL, '">');

  html += '<div style="position:absolute; left:5%; top:5%; width:70%; height:100%; text-align:center;">'.concat(postTitle, '</div>');

  html += "<img src='".concat(imgURL, "'>");
  //html += "<img src='/zan/ghost2.png'>";
  /*var c = Math.random()*4;
  if (c < 1) {
   html += "<img src='/zan/ghosts/ghost_r.png'>";
  } else if (c < 2) {
   html += "<img src='/zan/ghosts/ghost_g.png'>";
  } else if (c < 3) {
   html += "<img src='/zan/ghosts/ghost_b.png'>";
  } else {
   html += "<img src='/zan/ghosts/ghost_y.png'>";
  }*/

  html += '</a.>';

  ghostLink.innerHTML = html;

};

/*function hoverGhost(id) {
 var ghostLink = document.getElementById(id);
 displayGhostLink(ghostLink, postTitle, postURL, left, imgURL); //here
};*/

/*function getRandomPostLink() {
 var postTxt = readTextFile('/books/reviews.txt');
 var posts = postTxt.split('x*****x');

 var r = Math.floor((Math.random()*(posts.length-1))+1);
 var postLinkData = parsePostLinkData(posts[r]);
 return postLinkData.split(','); //title,url
};

function parsePostLinkData(post) {
 var split = post.split('x**x');
 var title = split[0];

 var metadata = split[1].split('x***x');
 if (metadata.length > 1) {

 var tokens = metadata[0].split('x*x');
 for (var i =0; i<tokens.length; i++) {

 var token = tokens[i];

 //url
 if (token.substring(0,8) == '<br>url:') {
  url = token.substring(8, token.length-4);
  return title.concat(',', url);
 }

 }
 }
 return title.concat(',');
};*/

/*function parsePostData() {
 theTitle = title;

 var titleRemoved = thePost.split('x**x')[1];

 var metadata = titleRemoved.split('x***x');
 if (metadata.length > 1) {

 theText = metadata[1];

 var tokens = metadata[0].split('x*x');
 for (var i =0; i<tokens.length; i++) {

 var token = tokens[i];

 //url
 if (token.substring(0,8) == '<br>url:') {
 theURL = token.substring(8, token.length-4);
 } else {

 //img
 var regexImg = /<br>img:(.+)<br>/;
 var match = regexImg.exec(token);
 if (match != null) {
 theImgURL= match[1];
 } else {

 //author
 var regexAut = /<br>aut:(.+)<br>/;
 var matchAut = regexAut.exec(token);
 if (matchAut.length > 0) {
 theAuthor= matchAut[1];
 }
 }
 }
 }
 }

};*/

function changeColors() {
 var div = document.getElementById('textDiv');

 var r = Math.random()*10;

 if (r < 2) {
 div.style.background = "#000000";
 div.style.color = "#FFFFFF";
 } else if (r < 3) {
 div.style.background = "#ffff00";
 div.style.color = "#023ef2";
 } else if (r < 4) {
 div.style.background = "#00ff00";
 div.style.color = "#ff0000";
 } else if (r < 5) {
 div.style.background = "#ff0000";
 div.style.color = "#00ff00";
 } else if (r < 6) {
 div.style.background = "#023ef2";
 div.style.color = "#ffff00";
 } else {
 div.style.background = "#FFFFFF";
 div.style.color = "#000000";
 }
};


/*function readTextFile(file)
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
};

function writeHTML() {
 document.body.style.background = "#000000";
 document.body.style.backgroundImage = "url('/ghosts_colr.png')";

 document.body.innerHTML += "<!DOCTYPE html><head><link rel='stylesheet' type='text/css' href='books/book.css'></head><html><body bgcolor='#000000'><div id='textDiv' onClick='changeColors()'>plz respond plz respond plz respond plz respond plz respond plz respond</div><div id='imgDiv'></div><div class='ghostLink' id='ghostLink1'></div><div class='ghostLink' id='ghostLink2'></div><div class='ghostLink' id='ghostLink3'></div><div class='ghostLink' id='ghostLinkHome'></div><div class='ghostLink' id='ghostLinkList'></div></body></html>";


};

window.onload = function() {
writeHTML();
setUp();
};*/
