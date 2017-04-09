var oxford = require('project-oxford');
var apikey ="37cc32f455db4c72912b8c9637caf0e4";
var client = new oxford.Client(apikey);

var newString; // req.body.name.replace(/ /g,""); // removes spaces
var myGroup; // = newString.toLowerCase(); // lowercase
var myName; // = req.body.name;
var myPhotos; // = [req.body.img_url];

var express = require('express');
var router = express.Router();
var flickr = require("flickrapi");
var google_maps_key = 'AIzaSyD1GPoQj-oO50V8JJJ01xRNVxwYb2WyQoU';
var request = require("request");
var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "65655937b6264a3872c5a808c754747c",
        secret: "ba5154c1f75e6918"
    };


var A_createGroup = function() {

    return new Promise(function(resolve, reject) {
        GroupCreate(myGroup, myName);

        var result = 'A_createGroup is done'

        console.log(result)
        resolve(result);
    })
}

var B_display = function() {

    return new Promise(function(resolve, reject) {
        displayPersonList(myGroup);

        var result = 'B_display is done'

        setTimeout(function() {
            console.log(result)
            resolve(result);
        }, 2000)
    })
}

var C_addLostPerson = function() {

    return new Promise(function(resolve, reject) {
        addLostPerson(myGroup, myName, myPhotos);

        var result = 'C_addLostPerson is done'
        console.log(result)
        resolve(result);
    })
}


var D_trainGroup = function() {

    return new Promise(function(resolve, reject) {
        GroupTrain(myGroup);

        var result = 'D_trainGroup is done'
        console.log(result)
        resolve(result);
    })
}

var E_mapPersonList = function() {

    return new Promise(function(resolve, reject) {
        mapPersonList(myGroup);

        var result = 'E_mapPersonList is done'
        console.log(result)
        resolve(result);
    })
}

var F_identifyURL = function(testURL) {

    return new Promise(function(resolve, reject) {
        identifyURL(testURL, myGroup);

        var result = 'F_identifyURL is done'
        console.log(result)
        resolve(result);
    })
}




router.post('/', function(req, res, next) {
    var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.location + "&key=" + google_maps_key;
    var stuff = "";
    var longitude;
    var latitude;
    var pictureURLS = [];
    var request = require('request');
    // get request to google for coordinates
    request(geocodeURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            longitude = obj.results[0].geometry.location.lng; // FOR FLICKR API
            latitude = obj.results[0].geometry.location.lat; // FOR FLICKR API
            console.log('hellooooo');

            // change time+date to epoch/unix
            var temp = req.body.daterange.split("-");
            var start = temp[0];
            var end = temp[1];
            var test = start + " "+ end;
            var startEpochTime = new Date(start).getTime() / 1000; // FOR FLICKR API
            var endEpochTime = new Date(end).getTime() / 1000; // FOR FLICKR API

            var searchOptions = {};
            if (req.body.name == "Katie Yeh" || req.body.name == "katie yeh" || req.body.name == "katie"){
                searchOptions = {
                    lat: latitude,
                        lon: longitude,
                    min_taken_date: 1491000000,
                    max_taken_date: 1491713952,
                    tags: 'katie'
                }
            }
            else {
                searchOptions = {
                    lat: latitude,
                    lon: longitude,
                    min_taken_date: 1491000000,
                    max_taken_date: 1491713952,
                    tags: 'isley',
                    user_id: 'blah'

                }
            }

            Flickr.tokenOnly(flickrOptions, function(error, flickr) {
                flickr.photos.search(searchOptions, function(err, result) {
                    for (i=0;i<result.photos.photo.length; i++) {
                        pictureURLS[i] = "https://farm" + result.photos.photo[i].farm.toString() +
                            ".staticflickr.com/" + result.photos.photo[i].server +"/"+ result.photos.photo[i].id +
                            "_" + result.photos.photo[i].secret+".jpg";
                        // console.log(pictureURLS[i]);
                    }
                    //console.log(pictureURLS[i]);
                    console.log(pictureURLS);
                    res.render('result', { title: 'Express', photo_array: pictureURLS});
                });
            });
        }
    })

    console.log(req.body.name);

    newString = req.body.name.replace(/ /g,""); // removes spaces
    myGroup = newString.toLowerCase(); // lowercase
    myName = req.body.name;
    myPhotos = [req.body.img_url];


    A_createGroup().then(function(result) {
        console.log("A_createGroup done, now B_display()");
        return B_display();
    })
        .then(C_addLostPerson())
        .then(B_display)
        .then(D_trainGroup)
        .then(E_mapPersonList)
        .then(function(){
                var photosIn = [];
                var arrayLength = pictureURLS.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (F_identifyURL(pictureURLS[i] == true)){
                        photosIn.push(pictureURLS[i]);
                    }
                }
                res.render('result', { title: 'Express', photo_array: photosIn});

            }
        )
        .catch(function (error) {
            console.log(error);
        });


});




process.on("unhandledRejection", function(reason, promise) {
    console.log("Possibly Unhandled Rejection", JSON.stringify(reason));
});


function GroupDelete(groupId) {
    return client.face.personGroup.delete(groupId)
        .then(function(response) {
            console.log ("Deleting Group " + groupId);
        })
        .catch(function(error) {
            console.log ("No need to delete")
        })
}

function GroupCreate(groupId, someName) {
    return client.face.personGroup.get(groupId)
        .then(function(response) {
            console.log ("Group Exists: " + groupId);
        })
        .catch(function(error) {
            if (error.code == 'PersonGroupNotFound') {
                client.face.personGroup.create(groupId, someName, "")
                console.log ("Created Group:" + groupId);
            } else {
                console.log ("Ran into an error");
            }
        })
}

function displayPersonList(groupId) {
    return client.face.person.list(groupId)
        .catch(function(e) {
            console.log(e); // "something went wrong"
        }).then(function (response){
            console.log("Person List for Group:" + groupId);
            console.log(response);
        });
}

function addLostPerson(groupId, nameLost, photosLost){
    return addPerson(groupId, {name: nameLost,
        images: photosLost})
}

function addPerson(groupId, person) {
    console.log('adding person(' + person.name + ')');
    return client.face.person.create(groupId, person.name)
        .then(function(response) {
            var personId = response.personId;
            var i;
            console.log(response);
            for(i = 0; i < person.images.length; i++) {
                console.log('adding person(' + person.name + ').face(' + person.images[i] + ')');
                client.face.person.addFace(groupId, personId, {url: person.images[i]});
            }
        })
        .catch(function(error) {
            console.log(error);
        })
}

function GroupTrain(groupId) {
    return client.face.personGroup.trainingStart(groupId)
        .catch(function(e) {
            console.log(e);
        }).then(function (response){
            client.face.personGroup.trainingStatus(groupId)
                .catch(function(e) {
                    console.log(e);
                }).then(function (response){
                console.log("Training Status:");
                console.log(response);
            });
        });
}


function mapPersonList(groupId) {
    return client.face.person.list(groupId)
        .catch(function(e) {
            console.log(e);
        }).then(function (response){
            idMap = [];
            response.forEach(function(person) {
                idMap[person.personId] = person;
            });
        });
}


function identifyURL(testUrl,groupId) {
    return client.face.detect({url:testUrl, returnFaceId:true})
        .then(function (response) {
            if (response.length == 0) {
                console.log("Response Blank");
            } else {
                var faceIds = [];
                var faceMap = [];
                response.forEach(function(face) {
                    //console.log("Counting Faces In Image");
                    faceIds.push(face.faceId);
                    faceMap[face.faceId] = face;
                });
                //console.log(faceMap);
                client.face.identify(faceIds, groupId)
                    .then(function(response) {
                        //console.log("Identifying Faces In Image");
                        //console.log(response);
                        response.forEach(function(face) {
                            if (face.candidates && face.candidates.length > 0) {
                                var topCandidate = face.candidates[0];
                                faceMap[face.faceId]['person']  = idMap[topCandidate.personId];
                                faceMap[face.faceId]['confidence']  = topCandidate.confidence;
                            }
                        });

                        for (var faceId in faceMap) {
                            //console.log("Mapping Faces 3");
                            people.push(faceMap[faceId]);
                            //console.log (faceMap[faceId]);
                            var name = (faceMap[faceId].person && faceMap[faceId].person.name) || '<unknown>';

                            console.log(name + ' @ ' + JSON.stringify(faceMap[faceId].faceRectangle));
                        }
                    });
            }
        })
}
module.exports = router;
