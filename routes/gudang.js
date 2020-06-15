const express = require('express');
const router = express.Router();
const gudang = require('../app/controllers/gudang');
const validate = require('../app/middlewares/validation');
const validationRules = require('../app/validations/gudang');

router.post('/', validationRules.save(), validate, gudang.save);
router.get('/:id', validationRules.findById(), validate, gudang.findById);
router.get('/', validationRules.findByAll(), validate, gudang.findAll);
router.patch('/:id', validationRules.update(), validate, gudang.update);
router.delete('/:id', validationRules.destroy(), validate, gudang.destroy);

module.exports = router;
