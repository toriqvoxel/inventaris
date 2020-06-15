const { body, param, checkIf } = require('express-validator');

const save = () => {
    return [
        body('barang_id').exists().not().isEmpty().isNumeric().toInt(),
        body('gudang_id').exists().not().isEmpty().isNumeric().toInt(),
        body('stok').exists().not().isEmpty().isNumeric().toInt(),
        body('user_id').optional().not().isEmpty().isNumeric().toInt()
    ]
}

const findById = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid inventaris id')
    ]
}

const findByAll = () => {
    return [
        param('barang_id').optional().isNumeric().toInt(),
        param('gudang_id').optional().isNumeric().toInt(),
        param('page').optional().isNumeric().toInt(),
        param('per_page').optional().isNumeric().toInt(),
    ]
}

module.exports = {
    save,
    findById,
    findByAll
}