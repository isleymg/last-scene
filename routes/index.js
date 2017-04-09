var express = require('express');
var router = express.Router();
var flickr = require("flickrapi");
// flickr key: 65655937b6264a3872c5a808c754747c
var google_maps_key = 'AIzaSyD1GPoQj-oO50V8JJJ01xRNVxwYb2WyQoU';





/* GET home page. */
router.get('/', function(req, res, next) {
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var hour = 0;
    var hr = dateObj.getHours();
    var am_or_pm;
    var day2;

    if (month < 10){
        month = "0" + month;
    }
    if (day < 10){
        day = "0" + day-1;
        day2 = "0" + (day-3);
    }

    // PM
    if (hr > 12){
        hour = hr % 12 || 12;
        am_or_pm = "PM"
    }
    // AM
    else {
        console.log('its da AM!!');
        hour = hr % 12 || 12;
        am_or_pm = "AM"
    }
    var minutes = dateObj.getMinutes();
    var start_date = month + "/" + day2 + "/" + year + " " + hour + ":" + minutes + " " + am_or_pm;
    var end_date = month + "/" + day + "/" + year + " " + hour + ":" + minutes + " " + am_or_pm;

    var edited_date = start_date + " - " + end_date;
    console.log(edited_date);
    newdate = year + "/" + month + "/" + day;
    res.render('index', { title: 'Express', date: edited_date});
});

router.post('/', function(req, res, next) {

});

var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "65655937b6264a3872c5a808c754747c",
        secret: "ba5154c1f75e6918"
    };


// Flickr API
Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object,
    // but we can only call public methods and access public data
    // if (error) {
    //     throw new Error(error);
    // }
    flickr.photos.search({
        // text: "red+panda"
        lat: 34.9683009,
        lon: 135.7727,
        min_taken_date: 1491000000,
        max_taken_date: 1491713952


    }, function(err, result) {
        var pictureURLS = [];
        for (i=0;i<result.photos.photo.length; i++) {
            pictureURLS[i] = "https://farm" + result.photos.photo[i].farm.toString() +
                ".staticflickr.com/" + result.photos.photo[i].server +"/"+ result.photos.photo[i].id +
                "_" + result.photos.photo[i].secret+".jpg";

        }

        if(err) { throw new Error(err); }
        // do something with result
    });


});


module.exports = router;
