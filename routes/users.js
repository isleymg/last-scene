var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  // res.send('respond with a resource');
    res.render('users', {title: 'somenumber'});
});

module.exports = router;



//for each URL:
//create image object and insert into imageData array
//display imageData array
//something like this <a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>

var imageData = new Array();
var images = document.createElement("IMG");

