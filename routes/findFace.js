/**
 * Created by Elise on 4/9/2017.
 */

var oxford = require('project-oxford');
var apikey ="37cc32f455db4c72912b8c9637caf0e4";
var client = new oxford.Client(apikey);

console.log("oxford face API");


var myGroup = 'yehkatie';
var myName = 'Katie Yeh';
var myPhotos = ['http://i.imgur.com/QhS7ESd.jpg', 'https://farm3.staticflickr.com/2844/33892801446_db372039ca_c.jpg'];
var testURL = 'https://farm3.staticflickr.com/2844/33121006693_b89ee63178_c.jpg';

// var A1_deleteGroup = function() {
//
//     return new Promise(function(resolve, reject) {
//         GroupDelete(myGroup);
//
//         var result = 'A1_deleteGroup is done'
//
//         console.log(result)
//         resolve(result);
//     })
// }

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



A_createGroup().then(function(result) {
    console.log("A_createGroup done, now B_display()");
    return B_display();
})
    // .then(B_display)
    .then(C_addLostPerson())
    .then(B_display)
    .then(D_trainGroup)
    .then(E_mapPersonList)
    .then(F_identifyURL)
    .catch(function (error) {
    console.log(error);
});

console.log("AAAAAAAH");

// GroupCreate(myGroup);
// displayPersonList(myGroup);
// addLostPerson(myGroup);


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