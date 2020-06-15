const bcrypt = require('bcryptjs');
const flaverr = require('flaverr');
const save = async (req, res, next) => {
    try {
        if (req.user.userData.role != -1) throw flaverr('E_PERMISSION', new Error('Forbidden'));
        const user = {
            nama: req.body.nama,
            username: req.body.username,
            password: await bcrypt.hashSync(req.body.password, 10),
            role: req.body.role ? req.body.role : 1
        }

        const isExist = await User.findOne({
            where: {
                username: user.username
            },
            attributes: {
                exclude: ['password']
            }
        })

        if (isExist) throw flaverr('E_EXIST', new Error(`username ${user.username} already exist`))

        const save = await User.create(user);
    
        return res.status(200).json({
            status: 'success',
            data: save
        });
    }
    catch(err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const update = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!user) throw flaverr('E_NOT_FOUND', Error(`user with id ${req.params.id} is not exist`));

        if(req.body.nama) user.nama = req.body.nama;
        if(req.body.password) user.password = await bcrypt.hashSync(req.body.password, 10);
        if(req.body.role) user.role = req.body.role;

        const save = await user.save();
    
        return res.status(200).json({
            status: 'success',
            data: save
        });
    }
    catch(err) {
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
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!user) throw flaverr('E_NOT_FOUND', Error(`user with id ${req.params.id} is not exist`));

        const destroy = await user.destroy();
    
        return res.status(200).json({
            status: 'success',
            data: destroy
        });
    }
    catch(err) {
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
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password']
            }
        });

        if(!user) throw flaverr('E_NOT_FOUND', Error(`user with id ${req.params.id} is not exist`));
    
        return res.status(200).json({
            status: 'success',
            data: user
        });
    }
    catch(err) {
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
        req.query.per_page = req.query.per_page ?  Number.parseInt(req.query.per_page) : 50;
        const where = {}
        if(req.query.nama) where.nama = { [Op.like]: `%${req.query.nama}%` }
        if(req.query.username) where.username = { [Op.like]: `%${req.query.username}%` }

        const { count, rows } = await User.findAndCountAll({
            offset: (req.query.page - 1)*req.query.per_page,
            limit: req.query.per_page,
            where: where,
            attributes: {
                exclude: ['password']
            }
        });

        if(count === 0) throw flaverr('E_NOT_FOUND', Error(`user not found`));

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
    catch(err) {
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
    destroy,
    update,
    findById,
    findAll
}