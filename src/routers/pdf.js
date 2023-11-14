
const router = require('express').Router();
const { pdf } = require('../controllers');

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb)  {
   return cb(null, './public/');
  },
  filename: function (req, file, cb)  {
  return cb(null, file.originalname);
  }
})
const upload = multer({
  storage
});
router.get('/',pdf.getDataPdf);
// router.get('/download/:id',pdf.downloadPDF);
router.post('/add', (req, res, next) => {
    upload.single('pdf')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Gagal mengunggah file' });
      }
      next();
    });
  }, pdf.uploadPDF);
  router.delete('/delete/:id',pdf.deleteDataPdf)

module.exports = router