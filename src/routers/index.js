const router = require('express').Router();
const routeberita = require('./berita');


router.use('/berita',routeberita);


module.exports = router