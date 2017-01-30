
'use strict';

const express = require('express');

const router = express.Router();

router.get('/api/classified', db.getAllItem);
router.get('/api/classified/:id', db.getItem);
router.post('/api/classified', db.createItem);
router.put('/api/classified/:id', db.updateItem;
router.delete('/api/classified/:id', db.removeItem);

module.exports = router;
