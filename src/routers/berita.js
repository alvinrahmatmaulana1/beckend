const router = require('express').Router();
const { berita } = require('../controllers');

const multer = require('multer')
// const fs = require('fs');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Pastikan direktori ini ada dan dapat ditulis
//     const uploadDir = 'assets/uploads/';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage });


router.get('/',berita.getDataBerita);
router.get('/:id',berita.getDetailBerita);
 router.post('/add',upload.single('gambar'),berita.addDataBerita);
 router.put('/edit/:id',upload.single('gambar'),berita.editDataBerita);
router.delete('/delete/:id',berita.deleteDataBerita)

module.exports = router