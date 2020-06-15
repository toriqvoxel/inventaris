const passport = require('passport');
const scope = require('../app/middlewares/scope');
const decryptToken = require('../app/middlewares/decrypt-token');
const auth = require('./auth');
const user = require('./user');
const barang = require('./barang');
const gudang = require('./gudang');
const inventaris = require('./inventaris');
const log = require('./log');

module.exports = (app) => {
  /* GET home page. */
  app.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.use('/auth', auth);

  app.use('/barang', decryptToken, passport.authenticate('jwt', { session: false }), scope, barang);
  app.use('/gudang', decryptToken, passport.authenticate('jwt', { session: false }), scope, gudang);
  app.use('/user', decryptToken, passport.authenticate('jwt', { session: false }), scope, user);
  app.use('/inventaris', decryptToken, passport.authenticate('jwt', { session: false }), scope, inventaris);
  app.use('/log', decryptToken, passport.authenticate('jwt', { session: false }), scope, log);
}