/**
 * Created by Elise on 4/9/2017.
 */

var oxford = require('project-oxford');
var apikey ="37cc32f455db4c72912b8c9637caf0e4";
var client = new oxford.Client(apikey);


GroupCreate("TrumpDonald");

// addPerson("TrumpDonald", {name: 'Donald Trump',
//     images: [
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19%2C_2015_%28cropped%29.jpg/450px-Donald_Trump_August_19%2C_2015_%28cropped%29.jpg',
//         'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
//         'http://cdn.bgr.com/2016/01/donald-trump.png',
//         'http://i2.cdn.cnn.com/cnnnext/dam/assets/151029092255-donald-trump-pout-large-169.jpg'
//     ]});

process.on("unhandledRejection", function(reason, promise) {
    console.log("Possibly Unhandled Rejection", JSON.stringify(reason));
});



// var p = new Promise(function(resolve, reject) {
//
//     // Do an async task async task and then...
//     var shouldBeOne = GroupCreate("TrumpDonald");
//
//     if(shouldBeOne = 1) {
//         console.log("wooo");
//         resolve('Success!');
//     }
//     else {
//         console.log("sighz");
//         reject('Failure!');
//     }
// });
//
// p.then(function() {
//     /* do something with the result */
//     // addTrump("TrumpDonald");
//     addPerson("TrumpDonald", {name: 'Donald Trump',
//         images: [
//             'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19%2C_2015_%28cropped%29.jpg/450px-Donald_Trump_August_19%2C_2015_%28cropped%29.jpg',
//             'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
//             'http://cdn.bgr.com/2016/01/donald-trump.png',
//             'http://i2.cdn.cnn.com/cnnnext/dam/assets/151029092255-donald-trump-pout-large-169.jpg'
//         ]});
//     console.log("WE MADE IT");
//     displayPersonList("TrumpDonald");
//
// }).catch(function() {
//     /* error :( */
//     console.log("la;jdfsld");
// })
//
// process.on("unhandledRejection", function(reason, promise) {
//     console.log("Possibly Unhandled Rejection", JSON.stringify(reason));
// });

// GroupCreate("TrumpDonald"),

    // addPerson("TrumpDonald", {name: 'Donald Trump',
    //     images: [
    //         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19%2C_2015_%28cropped%29.jpg/450px-Donald_Trump_August_19%2C_2015_%28cropped%29.jpg',
    //         'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
    //         'http://cdn.bgr.com/2016/01/donald-trump.png',
    //         'http://i2.cdn.cnn.com/cnnnext/dam/assets/151029092255-donald-trump-pout-large-169.jpg'
    //     ]})


function GroupCreate(groupId) {
    client.face.personGroup.get(groupId)
        .then(function(response) {
            console.log ("Group Exists: " + groupId);
            // addPerson("TrumpDonald", {name: 'Donald Trump',
            //     images: [
            //         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19%2C_2015_%28cropped%29.jpg/450px-Donald_Trump_August_19%2C_2015_%28cropped%29.jpg',
            //         'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
            //         'http://cdn.bgr.com/2016/01/donald-trump.png',
            //         'http://i2.cdn.cnn.com/cnnnext/dam/assets/151029092255-donald-trump-pout-large-169.jpg'
            //     ]});
            return 1;
        })
        .catch(function(error) {
            if (error.code == 'PersonGroupNotFound') {
                client.face.personGroup.create(groupId,groupId)
                console.log ("Created Group:" + groupId);

                addPerson("TrumpDonald", {name: 'Donald Trump',
                    images: [
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19%2C_2015_%28cropped%29.jpg/450px-Donald_Trump_August_19%2C_2015_%28cropped%29.jpg',
                        'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
                        'http://cdn.bgr.com/2016/01/donald-trump.png',
                        'http://i2.cdn.cnn.com/cnnnext/dam/assets/151029092255-donald-trump-pout-large-169.jpg'
                    ]});

                return 1;
            } else {
                console.log ("Ran into an error");
            }
        })
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
            console.log("hi alyssa");
            console.log(error);
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


