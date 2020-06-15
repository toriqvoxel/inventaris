const flaverr = require('flaverr');
const save = async (req, res, next) => {
    try {
        const inventaris = {
            barang_id: req.body.barang_id,
            gudang_id: req.body.gudang_id,
            user_id: req.body.user_id,
            stok: req.body.stok
        }

        const isExist = await Inventaris.findOne({
            where: {
                barang_id: inventaris.barang_id,
                gudang_id: inventaris.gudang_id
            }
        })

        if (isExist) throw flaverr('E_EXIST', new Error(`Inventaris di gudang tersebut sudah ada`))

        const save = await Inventaris.create(inventaris);

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

const findById = async (req, res, next) => {
    try {
        const inventaris = await Inventaris.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Barang
            }, {
                model: Gudang
            }]
        });

        if (!inventaris) throw flaverr('E_NOT_FOUND', Error(`inventaris with id ${req.params.id} is not exist`));

        return res.status(200).json({
            status: 'success',
            data: inventaris
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
        if (req.query.gudang_id) where.gudang_id = Number.parseInt(req.query.gudang_id);
        if (req.query.barang_id) where.barang_id = Number.parseInt(req.query.barang_id);
        if (req.query.user_id) where.user_id = Number.parseInt(req.query.user_id);

        const { count, rows } = await Inventaris.findAndCountAll({
            offset: (req.query.page - 1) * req.query.per_page,
            limit: req.query.per_page,
            where: where,
            include: [{
                model: Gudang
            }, {
                model: Barang
            }]
        });

        if (count === 0) throw flaverr('E_NOT_FOUND', Error(`inventaris not found`));

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
    findAll,
    findById
}