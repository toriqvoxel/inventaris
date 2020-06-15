const flaverr = require('flaverr');
const save = async (req, res, next) => {
    try {
        const gudang = {
            nama_gudang: req.body.nama_gudang,
            alamat: req.body.alamat,
            user_id: req.body.user_id
        }

        const save = await Gudang.create(gudang);

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
        const gudang = await Gudang.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!gudang) throw flaverr('E_NOT_FOUND', Error(`gudang with id ${req.params.id} is not exist`));

        if (req.body.nama_gudang) gudang.nama_gudang = req.body.nama_gudang
        if (req.body.alamat) gudang.alamat = req.body.alamat

        const save = await gudang.save();

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
        const gudang = await Gudang.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!gudang) throw flaverr('E_NOT_FOUND', Error(`gudang with id ${req.params.id} is not exist`));

        const destroy = await gudang.destroy();

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
        const gudang = await Gudang.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Barang,
                as: 'inventaris_gudang'
            }]
        });

        if (!gudang) throw flaverr('E_NOT_FOUND', Error(`gudang with id ${req.params.id} is not exist`));

        return res.status(200).json({
            status: 'success',
            data: gudang
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
        if (req.query.nama_gudang) where.nama_gudang = { [Op.like]: `%${req.query.nama_gudang}%` }
        if (req.query.kode_gudang) where.kode_gudang = { [Op.like]: `%${req.query.kode_gudang}%` }
        if (req.query.alamat) where.alamat = { [Op.like]: `%${req.query.alamat}%` }
        if (req.query.user_id) where.user_id = Number.parseInt(req.query.user_id);

        const { count, rows } = await Gudang.findAndCountAll({
            offset: (req.query.page - 1) * req.query.per_page,
            limit: req.query.per_page,
            where: where
        });

        if (count === 0) throw flaverr('E_NOT_FOUND', Error(`gudang not found`));

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