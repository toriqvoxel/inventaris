const scope = async (req, res, next) => {
    if(_.has(req.user, 'userData.role') && req.user.userData.role === -1) return next();

	req.query.user_id = req.user.userData.id

    return next();
}

module.exports = scope;