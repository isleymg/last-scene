var express = require('express');
var router = express.Router();
var flickr = require("flickrapi");
// flickr key: 65655937b6264a3872c5a808c754747c



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
