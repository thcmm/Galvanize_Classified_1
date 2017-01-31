'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', function(req, res, next) {
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
    //res.send("req id = " + `${req.params.id}`);
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
              knex('classifieds')
                .where('id', req.params.id)
                .first()
                .then((classifieds) => {
                  if (!classifieds) {
                    return next();
                  }

                  return knex('classifieds')
                    .update({title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    item_image: req.body.item_image}, '*')
                    .where('id', req.params.id);
                })
                .then((classifieds) => {
                  res.send(classifieds[0]);
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
