/**
 * Created by Elise on 4/9/2017.
 */

var oxford = require('project-oxford');
var apikey ="37cc32f455db4c72912b8c9637caf0e4";
var client = new oxford.Client(apikey);

console.log("oxford face API");


var myGroup = 'trumpdonald';

// Promise = require('bluebird');

var A_createGroup = function() {

    return new Promise(function(resolve, reject) {
        GroupCreate(myGroup);

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

var C_addTrump = function() {

    return new Promise(function(resolve, reject) {
        addTrump(myGroup);

        var result = 'C_addTrump is done'
        console.log(result)
        resolve(result);
    })
}

var D = function() {

    return new Promise(function(resolve, reject) {
        var result = 'D is done'
        console.log(result)
        resolve(result);
    })
}

A_createGroup().then(function(result) {
        console.log("A_createGroup done, now B_display()");
        return B_display();
    })
    .then(C_addTrump).catch(function (error) {
        console.log(error);
    });

console.log("AAAAAAAH");

// GroupCreate(myGroup);
// displayPersonList(myGroup);
// addTrump(myGroup);


process.on("unhandledRejection", function(reason, promise) {
    console.log("Possibly Unhandled Rejection", JSON.stringify(reason));
});

function GroupCreate(groupId) {
    client.face.personGroup.get(groupId)
        .then(function(response) {
            console.log ("Group Exists: " + groupId);
        })
        .catch(function(error) {
            if (error.code == 'PersonGroupNotFound') {
                client.face.personGroup.create(groupId, "DT", "")
                console.log ("Created Group:" + groupId);
            } else {
                console.log ("Ran into an error");
            }
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