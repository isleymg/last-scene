/**
 * Created by Elise on 4/8/2017.
 */


var oxford = require('project-oxford');
var apikey ="37cc32f455db4c72912b8c9637caf0e4";
var client = new oxford.Client(apikey);


function GroupCreate(groupId) {
    client.face.personGroup.get(groupId)
        .then(function(response) {
            console.log ("Group Exists: " + groupId);
        })
        .catch(function(error) {
            if (error.code == 'PersonGroupNotFound') {
                client.face.personGroup.create(groupId,groupId)
                console.log ("Created Group:" + groupId);
            } else {
                console.log ("Ran into an error");
            }
        })
}

function GroupDelete(groupId) {
    client.face.personGroup.delete(groupId)
        .then(function(response) {
            console.log ("Deleting Group " + groupId);
        })
        .catch(function(error) {
            console.log ("Group not found or other error")
        })
}

function displayPersonList(groupId) {
    client.face.person.list(groupId)
        .catch(function(e) {
            console.log(e); // "something went wrong"
        }).then(function (response){
        console.log("Person List for Group:" + groupId);
        console.log(response);
    });
}

function addTrump(groupId){
    addPerson(groupId, {name: 'Donald Trump',
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19%2C_2015_%28cropped%29.jpg/450px-Donald_Trump_August_19%2C_2015_%28cropped%29.jpg',
            'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
            'http://cdn.bgr.com/2016/01/donald-trump.png',
            'http://i2.cdn.cnn.com/cnnnext/dam/assets/151029092255-donald-trump-pout-large-169.jpg'
        ]})
}

function addMark(groupId){
    addPerson(myGroup, {name: 'Mark Torr',
        images: [
            'http://www.iweek.co.za/images/stories/2010/MARCH_2013/mark_torr.jpg'
        ]})
}

function addPerson(groupId, person) {
    console.log('adding person(' + person.name + ')');
    client.face.person.create(groupId, person.name)
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
    client.face.personGroup.trainingStart(groupId)
        .catch(function(e) {
            console.log(e); // "All gone pete tong"
        }).then(function (response){
        client.face.personGroup.trainingStatus(groupId)
            .catch(function(e) {
                console.log(e); // "All gone pete tong"
            }).then(function (response){
            console.log("Training Status:");
            console.log(response);
        });
    });
}

//
// var myGroup = "drone_demo_group";
// GroupDelete(myGroup);



// var myGroup = "drone_demo_group";
// GroupDelete(myGroup);
// GroupCreate(myGroup);
// displayPersonList(myGroup);
// addTrump(myGroup);
// displayPersonList(myGroup);
// addMark(myGroup);
// displayPersonList(myGroup);
// GroupTrain(myGroup);
// displayPersonList(myGroup);
// GroupTrain(myGroup);



/////////////////


var oxford = require('project-oxford');
var client = new oxford.Client('37cc32f455db4c72912b8c9637caf0e4');
// console.log("client:");
// console.log(client);

var person_id = client.face.person.create(personGroupId="LingadAlyssa"); // returns new personId
console.log("person_id:");
console.log(person_id);
var persisted_id = client.face.person.addFace(personGroupId="LingadAlyssa", personId=person_id, url="http://famousmore.com//upload/image/famous/katy-perry-age.jpg"); // path="C:/Users/Elise/Pictures/test/alyssa2.jpg");
// returns a persistedFaceId
console.log("persisted_id:");
console.log(persisted_id);
var info = client.face.person.getFace(personGroupId="LingadAlyssa", personId=person_id, persistedFaceId=persisted_id);
console.log("info:");
console.log(info);

//////////////////


// const request = require('request-promise-native');
// const express = require('express');
// const router = express.Router();

// YOUR KEY HERE
// var FACE_KEY = '37cc32f455db4c72912b8c9637caf0e4'
// var FACE_URL = 'https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces[?userData][&targetFace]?subscription-key=' + FACE_KEY



// creates a new Project Oxford Client using Face API key (Microsoft)
/*
var oxford = require('project-oxford'),
    client = new oxford.Client('37cc32f455db4c72912b8c9637caf0e4');


faceList.list();

faceList.create(123, name="Test");

faceList.addFace(123, path="C:/Users/Elise/Pictures/alyssa.jpg", name="Alyssa");
// targetFace=left,top,width,height
*/

/*
client.personGroup.create(personGroupId="100", name="personGroup", userData="");
client.person.create(personGroupId="100", name="Alyssa"); // userData
// client.person.addFace(personGroupId="100", personId="", path="C:/Users/Elise/Pictures/alyssa.jpg");
// client.faceList.create(faceListId="1");
// client.faceList.addFace(faceListId="1", path="C:/Users/Elise/Pictures/test/alyssa.jpg");
// client.faceList.addFace(faceListId="1", path="C:/Users/Elise/Pictures/test/alyssa2.jpg");

client.personGroup.trainingStart("100");
*/

/*
// FACE API: 37cc32f455db4c72912b8c9637caf0e4

const request = require('request-promise-native')
const express = require('express')
const router = express.Router()

// YOUR KEY HERE
var FACE_KEY = '37cc32f455db4c72912b8c9637caf0e4'
var FACE_URL = 'https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces[?userData][&targetFace]?subscription-key=' + FACE_KEY

router.post('/', function (req, res, next) {
    var url = req.body.url

    Promise.all([
        // MAKE CALL TO COG SERVICES
        callAPI(url)
    ]).then(([response]) => {
        var results = response

        // PARSE RESULTS HERE
        // var topEmotion = parseResponse(results)

        // DETERMINE WHICH IMAGE TO DISPLAY
        // var suggestion = makeSuggestion(topEmotion)

        // RENDER RESULTS
        res.render('results', {
        title: 'Results',
        description: 'You entered: ' + url
    })
}).catch(reason => {
        console.log('Promise was rejected becasue ' + reason)

    // RENDER AN ERROR MESSAGE
    res.render('results',
        { title: 'Error',
            description: 'Oops something went wrong! Please make sure that you submitted the correct image link and that your face is both promienent in the image and unobstructed. Submit another link to try again!',
            photo: '/images/Error.jpg'
        })
})
})

module.exports = router

// =========================================================
// HELPER FUNCTIONS HERE
// =========================================================

// This funtion goes in the controllers/results.js file under the "helper functions" comment

function callAPI (url) {
    // Call API
    return request.post({
            url: FACE_URL,
            json: {'url': url}
        }).then((result) => {
            return result
        })
}
*/