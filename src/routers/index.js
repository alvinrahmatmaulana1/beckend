const router = require('express').Router();
const routeberita = require('./berita');
const routepdf = require('./pdf');


router.use('/berita', routeberita);
router.use('/pdf', routepdf);


module.exports = router