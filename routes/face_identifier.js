/**
 * Created by Elise on 4/9/2017.
 */

var oxford = require('project-oxford');
var apikey ="37cc32f455db4c72912b8c9637caf0e4";
var client = new oxford.Client(apikey);
var idMap = [];
var people = [];


function mapPersonList(groupId) {
    client.face.person.list(groupId)
        .catch(function(e) {
            console.log(e); // "oh, no!"
        }).then(function (response){
        idMap = [];
        response.forEach(function(person) {
            idMap[person.personId] = person;
        });
    });
}


function identifyURL(testUrl,groupId) {
    client.face.detect({url:testUrl, returnFaceId:true})
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

var myGroup = "TrumpDonald";
mapPersonList(myGroup);
identifyURL('http://cdn.bgr.com/2016/01/donald-trump.png',myGroup);
identifyURL('http://magazinespain.com/wp-content/uploads/donald-trump-4.jpg',myGroup);