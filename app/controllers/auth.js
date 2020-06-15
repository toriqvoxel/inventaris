const jwt = require('jsonwebtoken');
const encryption = require('../services/encryption');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
        const data = {
            nama: req.body.nama,
            username: req.body.username,
            password: await bcrypt.hashSync(req.body.password, 10),
            role: req.body.role ? req.body.role : 1
        }

        const user = await User.findOrCreate({
            where: {
                username: data.username
            },
            defaults: data
        });

        const currUser = user[0].dataValues;
        const userData = {
            username: currUser.username,
            nama: currUser.nama,
            id: currUser.id,
            role: user.role
        }

        const tokenData = {
            userData: userData
        }

        let token = jwt.sign(tokenData, process.env.JWT_SECRET);
        token = encryption.encrypt(token);
        return res.status(200).json({
            status: 'success',
            token: token.data,
            data: userData
        });
    } catch (err) {
        return res.status(401).json({
            status: 'failed',
            message: err.message
        });
    }
}

const login = async (req, res, next) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password
        }

        const user = await User.findOne({
            where: {
                username: data.username
            }
        });

        if (!user) throw new Error(`user with username ${data.username} not exist`);

        const verified = await bcrypt.compare(data.password, user.password);

        if (!verified) throw new Error(`username or password did not match`);

        const userData = {
            username: user.username,
            nama: user.nama,
            id: user.id,
            role: user.role
        }

        const tokenData = {
            userData: userData
        }

        let token = jwt.sign(tokenData, process.env.JWT_SECRET);
        token = encryption.encrypt(token);
        return res.status(200).json({
            status: 'success',
            token: token.data,
            data: userData
        });
    } catch (err) {
        return res.status(401).json({
            status: 'failed',
            message: err.message
        });
    }
}

const token = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.userData.id
            }
        });

        if (!user) throw new Error(`user username ${req.user.userData.username} not exist`);

        return res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        return res.status(401).json({
            status: 'failed',
            message: err.message
        });
    }
}

module.exports = {
    register,
    login,
    token
}