/**
 * Created by Elise on 4/8/2017.
 */

const request = require('request-promise-native')
const express = require('express')
const router = express.Router()

// YOUR KEY HERE
var FACE_KEY = '37cc32f455db4c72912b8c9637caf0e4'
var FACE_URL = 'https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces[?userData][&targetFace]?subscription-key=' + FACE_KEY

var oxford = require('project-oxford'),
    client = new oxford.Client('37cc32f455db4c72912b8c9637caf0e4');

var person_id = client.person.create(personGroupId="LingadAlyssa"); // returns new personId
var persisted_id = client.person.addFace(personGroupId="LingadAlyssa", personId=person_id, path="C:/Users/Elise/Pictures/test/alyssa2.jpg");
// returns a persistedFaceId
var info = client.person.getFace(personGroupId="LingadAlyssa", personId=person_id, persistedFaceId=persisted_id);



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