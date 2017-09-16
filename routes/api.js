const express = require('express');
const Ninja = require('../models/ninja');
const router = express.Router();


// retrieve a list of ninjas from db
router.get('/ninjas', function (req, res, next) {
    // Ninja.find({}).then(function (data) {
    //     res.send(data);
    // });

    Ninja.geoNear(
        {
            type: "Point",
            coordinates: [
                parseFloat(req.query.lng),
                parseFloat(req.query.lat)
            ]
        },
        {
            maxDistance: 100000,
            spherical: true
        })
        .then(function (data) {
            res.send(data);
        });
});

// add new ninja
router.post('/ninjas', function (req, res, next) {
    Ninja.create(req.body).then(function (data) {
        res.send(data);
    }).catch(next);
});

// edit a ninja
router.put('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function () {
        Ninja.findOne({_id: req.params.id})
        .then(function (data) {
            res.send(data);
        });
    });
});

// delete a ninja
router.delete('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndRemove({_id: req.params.id})
    .then(function (data) {
        res.send(data);
    });
});

module.exports = router;
