const { body, param, checkIf } = require('express-validator');

const save = () => {
    return [
        body('barang_id').exists().not().isEmpty().isNumeric().toInt(),
        body('gudang_id').exists().not().isEmpty().isNumeric().toInt(),
        body('user_id').optional().not().isEmpty().isNumeric().toInt(),
        body('jumlah').exists().not().isEmpty().isNumeric().toInt(),
        body('jenis').exists().not().isEmpty().isString().escape(),
    ]
}

const findById = () => {
    return [
        param('id').exists().isNumeric().toInt().withMessage('Please provide a valid log id')
    ]
}

const findByAll = () => {
    return [
        param('barang_id').optional().isNumeric().toInt(),
        param('gudang_id').optional().isNumeric().toInt(),
        param('user_id').optional().isNumeric().toInt(),
        param('jumlah').optional().isNumeric().toInt(),
        param('jenis').optional().isString().escape(),
        param('page').optional().isNumeric().toInt(),
        param('per_page').optional().isNumeric().toInt(),
    ]
}

module.exports = {
    save,
    findById,
    findByAll
}