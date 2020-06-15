const flaverr = require('flaverr');
const save = async (req, res, next) => {
    try {
        const barang = {
            nama_barang: req.body.nama_barang,
            user_id: req.body.user_id
        }

        const save = await Barang.create(barang);

        return res.status(200).json({
            status: 'success',
            data: save
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const update = async (req, res, next) => {
    try {
        const barang = await Barang.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!barang) throw flaverr('E_NOT_FOUND', Error(`barang with id ${req.params.id} is not exist`));

        if (req.body.nama_barang) barang.nama_barang = req.body.nama_barang

        const save = await barang.save();

        return res.status(200).json({
            status: 'success',
            data: save
        });
    }
    catch (err) {
        return res
            .status(err.code === 'E_NOT_FOUND' ? 404 : 500)
            .json({
                status: 'failed',
                message: err.message
            });
    }
}

const destroy = async (req, res, next) => {
    try {
        const barang = await Barang.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!barang) throw flaverr('E_NOT_FOUND', Error(`barang with id ${req.params.id} is not exist`));

        const destroy = await barang.destroy();

        return res.status(200).json({
            status: 'success',
            data: destroy
        });
    }
    catch (err) {
        return res
            .status(err.code === 'E_NOT_FOUND' ? 404 : 500)
            .json({
                status: 'failed',
                message: err.message
            });
    }
}

const findById = async (req, res, next) => {
    try {
        const barang = await Barang.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Gudang,
                as: 'inventaris_gudang'
            }]
        });

        if (!barang) throw flaverr('E_NOT_FOUND', Error(`barang with id ${req.params.id} is not exist`));

        return res.status(200).json({
            status: 'success',
            data: barang
        });
    }
    catch (err) {
        return res
            .status(err.code === 'E_NOT_FOUND' ? 404 : 500)
            .json({
                status: 'failed',
                message: err.message
            });
    }
}

const findAll = async (req, res, next) => {
    try {
        req.query.page = req.query.page ? Number.parseInt(req.query.page) : 1;
        req.query.per_page = req.query.per_page ? Number.parseInt(req.query.per_page) : 50;
        const where = {}
        if (req.query.nama_barang) where.nama_barang = { [Op.like]: `%${req.query.nama_barang}%` }
        if (req.query.kode_barang) where.kode_barang = { [Op.like]: `%${req.query.kode_barang}%` }
        if (req.query.user_id) where.user_id = Number.parseInt(req.query.user_id);

        const { count, rows } = await Barang.findAndCountAll({
            offset: (req.query.page - 1) * req.query.per_page,
            limit: req.query.per_page,
            where: where
        });

        if (count === 0) throw flaverr('E_NOT_FOUND', Error(`barang not found`));

        const result = paginate({
            data: rows,
            count: count,
            page: req.query.page,
            per_page: req.query.per_page
        });

        return res.status(200).json({
            status: 'success',
            data: result
        });
    }
    catch (err) {
        return res
            .status(err.code === 'E_NOT_FOUND' ? 404 : 500)
            .json({
                status: 'failed',
                message: err.message
            });
    }
}

module.exports = {
    save,
    update,
    destroy,
    findAll,
    findById
}