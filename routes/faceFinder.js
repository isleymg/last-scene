/**
 * Created by Elise on 4/9/2017.
 */

var express = require('express');
var router = express.Router();

var oxford = require('project-oxford');
var apikey ="37cc32f455db4c72912b8c9637caf0e4";
var client = new oxford.Client(apikey);

/* GET users listing. */
router.get('/', function(req, res, next) {
    GroupCreate("TrumpDonald");
    res.send("hi");

});

module.exports = router;



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
                    .then(function(response) {
                        console.log ("Created Group:" + groupId);

                        addPerson("TrumpDonald", {name: 'Donald Trump',
                            images: [
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19%2C_2015_%28cropped%29.jpg/450px-Donald_Trump_August_19%2C_2015_%28cropped%29.jpg',
                                'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
                                'http://cdn.bgr.com/2016/01/donald-trump.png',
                                'http://i2.cdn.cnn.com/cnnnext/dam/assets/151029092255-donald-trump-pout-large-169.jpg'
                            ]});

                        return 1;
                    })

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
            console.log("error below:");
            console.log(error);
        })
}