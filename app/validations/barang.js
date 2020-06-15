const { body, param, checkIf } = require('express-validator');

const save = () => {
    return [
        body('nama_barang').exists().not().isEmpty().isString().escape(),
        body('user_id').optional().not().isEmpty().isNumeric().toInt()
    ]
}

const update = () => {
    return [
        body('nama_barang').exists().not().isEmpty().isString().escape()
    ]
}

const destroy = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid barang id')
    ]
}

const findById = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid barang id')
    ]
}

const findByAll = () => {
    return [
        param('nama_barang').optional().isString().escape(),
        param('kode_barang').optional().isString().escape(),
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