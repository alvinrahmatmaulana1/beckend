const router = require('express').Router();
const { berita } = require('../controllers');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,__dirname + '/../asset')
    },
    filename: (req ,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({storage: storage});


router.get('/',berita.getDataBerita);
// router.get('/:id',barang.getDatabarang);
 router.post('/add',upload.single('gambar'),berita.addDataBerita);
 router.put('/edit/:id',upload.single('gambar'),berita.editDataBerita);
router.delete('/delete/:id',berita.deleteDataBerita)

module.exports = router