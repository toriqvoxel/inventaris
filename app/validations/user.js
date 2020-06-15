const { body, param, checkIf } = require('express-validator');

const save = () => {
    return [
        body('nama').exists().not().isEmpty().isString().escape(),
        body('username').exists().not().isEmpty().isString().escape(),
        body('password').exists().not().isEmpty().isString().escape()
    ]
}

const update = () => {
    return [
        body('nama').optional().isString().escape(),
        body('username').optional().isString().escape(),
        body('password').optional().isString().escape()
    ]
}

const destroy = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid user id')
    ]
}

const findById = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid user id')
    ]
}

const findByAll = () => {
    return [
        param('nama').optional().isString().escape(),
        param('username').optional().isString().escape(),
        param('page').optional().isNumeric().toInt(),
        param('per_page').optional().isNumeric().toInt(),
    ]
}

module.exports = {
    save,
    update,
    destroy,
    findById,
    findByAll
}