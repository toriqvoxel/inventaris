const express = require('express');
const router = express.Router();
const inventaris = require('../app/controllers/inventaris');
const validate = require('../app/middlewares/validation');
const validationRules = require('../app/validations/inventaris');

router.post('/', validationRules.save(), validate, inventaris.save);
router.get('/:id', validationRules.findById(), validate, inventaris.findById);
router.get('/', validationRules.findByAll(), validate, inventaris.findAll);

module.exports = router;
