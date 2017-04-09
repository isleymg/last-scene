var express = require('express');
var router = express.Router();
var flickr = require("flickrapi");
// flickr key: 65655937b6264a3872c5a808c754747c




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "65655937b6264a3872c5a808c754747c",
        secret: "ba5154c1f75e6918"
    };

/*Flickr.authenticate(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object
}*/

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object,
    // but we can only call public methods and access public data
    // if (error) {
    //     throw new Error(error);
    // }
    console.log("here");
    flickr.photos.search({
        // text: "red+panda"
        lat: 34.9683009,
        lon: 135.7727,
        min_taken_date: 1491000000,
        max_taken_date: 1491713952


    }, function(err, result) {
        console.log("**", result.photos.photo);
        var pictureURLS = [];
        for (i=0;i<result.photos.photo.length; i++) {
            pictureURLS[i] = "https://farm" + result.photos.photo[i].farm.toString() +
                ".staticflickr.com/" + result.photos.photo[i].server +"/"+ result.photos.photo[i].id +
                "_" + result.photos.photo[i].secret+".jpg";
            console.log(pictureURLS[i]);

        }

        if(err) { throw new Error(err); }
        // do something with result
        console.log("blah");
    });


});



module.exports = router;
