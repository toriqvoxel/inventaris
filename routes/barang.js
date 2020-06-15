const express = require('express');
const router = express.Router();
const barang = require('../app/controllers/barang');
const validate = require('../app/middlewares/validation');
const validationRules = require('../app/validations/barang');

router.post('/', validationRules.save(), validate, barang.save);
router.get('/:id', validationRules.findById(), validate, barang.findById);
router.get('/', validationRules.findByAll(), validate, barang.findAll);
router.patch('/:id', validationRules.update(), validate, barang.update);
router.delete('/:id', validationRules.destroy(), validate, barang.destroy);

module.exports = router;
