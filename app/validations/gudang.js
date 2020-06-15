const { body, param, checkIf } = require('express-validator');

const save = () => {
    return [
        body('nama_gudang').exists().not().isEmpty().isString().escape(),
        body('alamat').exists().not().isEmpty().isString().escape(),
        body('user_id').optional().not().isEmpty().isNumeric().toInt()
    ]
}

const update = () => {
    return [
        body('nama_gudang').optional().isString().escape(),
        body('alamat').optional().isString().escape()
    ]
}

const destroy = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid gudang id')
    ]
}

const findById = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid gudang id')
    ]
}

const findByAll = () => {
    return [
        param('nama_gudang').optional().isString().escape(),
        param('kode_gudang').optional().isString().escape(),
        param('alamat').optional().isString().escape(),
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