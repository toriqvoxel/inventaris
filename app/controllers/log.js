const flaverr = require('flaverr');
const save = async (req, res, next) => {
    try {
        const inventariData = {
            barang_id: req.body.barang_id,
            gudang_id: req.body.gudang_id,
            jumlah: req.body.jumlah,
            jenis: req.body.jenis,
            user_id: req.body.user_id
        }

        let inventaris = await Inventaris.findOne({
            where: {
                barang_id: inventariData.barang_id,
                gudang_id: inventariData.gudang_id
            }
        });

        if (!inventaris) {
            inventaris = await Inventaris.create({
                barang_id: inventariData.barang_id,
                gudang_id: inventariData.gudang_id,
                stok: 0
            })
        }

        const stok = inventaris.stok
        if (inventariData.jenis == 'masuk') {
            inventaris.stok = stok + Number.parseInt(inventariData.jumlah)
        } 
        else if (inventariData.jenis == 'keluar') {
            if (stok == 0) throw flaverr('E_NOT_ENOUGH', Error(`stok inventaris 0`))
            inventaris.stok = stok - Number.parseInt(inventariData.jumlah)
            if (inventaris.stok < 0) throw flaverr('E_NOT_ENOUGH', Error(`stok inventaris tidak cukup`))
        }
        else {
            throw flaverr('E_BAD_REQ', Error(`jenis inventaris tidak tersedia`))
        }   

        await inventaris.save();
        const save = await Log.create(inventariData);

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
        const inventaris = await Log.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Barang
            }, {
                model: Gudang
            }, {
                model: User,
                attributes: {
                    exclude: ['password']
                }
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
        if (req.query.barang_id) where.barang_id = Number.parseInt(req.query.barang_id);
        if (req.query.gudang_id) where.gudang_id = Number.parseInt(req.query.gudang_id);
        if (req.query.user_id) where.user_id = Number.parseInt(req.query.user_id);
        if (req.query.jenis) where.jenis = req.query.jenis;
        if (req.query.user_id) where.user_id = Number.parseInt(req.query.user_id);

        const { count, rows } = await Log.findAndCountAll({
            offset: (req.query.page - 1) * req.query.per_page,
            limit: req.query.per_page,
            where: where,
            include: [{
                model: Gudang
            }, {
                model: Barang
            }, {
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }]
        });

        if (count === 0) throw flaverr('E_NOT_FOUND', Error(`log not found`));

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