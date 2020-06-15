const express = require('express');
const router = express.Router();
const log = require('../app/controllers/log');
const validate = require('../app/middlewares/validation');
const validationRules = require('../app/validations/log');

router.post('/', validationRules.save(), validate, log.save);
router.get('/:id', validationRules.findById(), validate, log.findById);
router.get('/', validationRules.findByAll(), validate, log.findAll);

module.exports = router;
