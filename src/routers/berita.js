const router = require('express').Router();
const { berita } = require('../controllers');

const multer = require('multer')
// const fs = require('fs');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Pastikan direktori ini ada dan dapat ditulis
//     const uploadDir = './public/uploads';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });
// const storage = multer.diskStorage({
//     destination: function (req, file, cb)  {
//      return cb(null, './public/uploads');
//     },
//     filename: function (req, file, cb)  {
//     return cb(null, file.originalname);
//     }
//   });

const path = require('path');

// Konfigurasi penyimpanan untuk berkas yang diunggah
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Tentukan direktori penyimpanan berkas
//     cb(null, './public/uploads');
//   },
//   filename: function (req, file, cb) {
//     // Tentukan nama berkas yang diunggah
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// Inisialisasi objek multer dengan konfigurasi penyimpanan
// const upload = multer({ storage: storage,

//   fileFilter: function (req, file, cb) {
//     // Validasi tipe konten berkas
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb('Hanya gambar yang diizinkan.', false);
//     }
//   }});

// const upload = multer({ storage , limits: { fileSize: 10 * 1024 * 1024 }, });

const storage = multer.diskStorage({
  destination: function (req, file, cb)  {
   return cb(null, 'public/');
  },
  filename: function (req, file, cb)  {
  return cb(null, file.originalname);
  }
})
const upload = multer({
  storage
});
router.get('/',berita.getDataBerita);
router.get('/:id',berita.getDetailBerita);
router.post('/add',upload.single('gambar'),berita.Addberita);
router.put('/edit/:id',upload.single('gambar'),berita.editDataBerita);
router.delete('/delete/:id',berita.deleteDataBerita)

module.exports = router