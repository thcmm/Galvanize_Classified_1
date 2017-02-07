'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => { // function(req, res, next)
    //res.send("base url: /");
    knex.select('id', 'title', 'description', 'price', 'item_image').from('classifieds')
        .then((classifieds) => {
            if (!classifieds) {
                return next();
            }
            res.send(classifieds);
        })
        .catch((err) => {
            res.send("error");
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    knex.select('id', 'title', 'description', 'price', 'item_image').from('classifieds')
        .where('id', req.params.id)
        .first()
        .then((classifieds) => {
            if (!classifieds) {
                return next();
            }
            res.send(classifieds);
        })
        .catch((err) => {
            res.send("error");
            next(err);
        });
});

router.post('/', (req, res, next) => {
    knex('classifieds')
        .insert({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            item_image: req.body.item_image
        }, ['id', 'title', 'description', 'price', 'item_image'])
        .then((classifieds) => {
            res.send(classifieds[0]);
        })
        .catch((err) => {
            next(err);
        });
});

// klistra patch har
router.patch('/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const item_image = req.body.item_image;

    // TODO Lägg till error checking för andra argumenten
    console.log("PATCH route:");
    console.log("req.params.id:", req.params.id);
    console.log("req.body.title:", req.body.title);
    console.log("req.body.description:", req.body.description);
    console.log("req.body.price:", req.body.price);
    console.log("req.body.item_image:", req.body.item_image);

    if (Number.isNaN(id)) { // ike id överlåta promise
        return next();
    }

    knex('classifieds')
        .where('id', id)
        .update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            item_image: req.body.item_image
        }) // Detta maste retur ett object av kolemer
        .returning(['id', 'title', 'description', 'price', 'item_image'])
        .then((response) => {
            console.log("response: ", response[0]);
            if (response[0] == undefined) {
                console.log("**** Record does not exist ****");
                res.send("Boo boo!");
            } else {
                res.send(response[0]);
            }
        })
        .catch((err) => {
            next(err);
        });
});

// klistra del har
router.delete('/:id', function(req, res, next) {
    knex.select('id', 'title', 'description', 'price', 'item_image').from('classifieds')
        .where('id', req.params.id)
        .first()
        .then((classifieds) => {
            if (!classifieds) {
                return next();
            }
            // res.send(classifieds);
            knex('classifieds')
                .where({
                    id: req.params.id
                })
                .del()
                .then(function() {
                    // res.sendStatus(200);
                    res.send(classifieds)
                })
                .catch(function(err) {
                    next(err);
                });
        })
        .catch((err) => {
            res.send("error");
            next(err);
        });
});


// router.get('/classified/:id', db.getItem);
// router.post('/classified', db.createItem);
// router.put('/classified/:id', db.updateItem;
// router.delete('/classified/:id', db.removeItem);


module.exports = router;


// db.getAllItem
