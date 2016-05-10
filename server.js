var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('./'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/reviews', function(req, res) {
  console.log('get reviews');
  fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
    if (err) return res.status(500).json({msg:'error retrieving reviews', err:err});
    return res.status(200).json({msg:'all reviews', data:JSON.parse(data)});
  })
});

app.post('/reviews', function(req, res) {
  console.log('post a review');
  console.log(`${req.method} request for ${req.url}`);
  // fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
  //   if (err) return res.status(500).send(err);
  //   var postArr = JSON.parse(data);
  //   postArr.push(req.body);
  //   fs.writeFile(__dirname + '/data/reviews.json', JSON.stringify(postArr), (err) => {
  //     if (err) return res.status(500).send(err);
  //     return res.status(200).redirect('/');
  //   });
  // });
});

app.put('reviews/:title', function(req, res) {
  console.log('update ');
  console.log(req.params.title);
})

app.get('*.html', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
