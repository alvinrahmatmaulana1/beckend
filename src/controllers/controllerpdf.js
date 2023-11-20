const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);
// const admin = require('firebase-admin')
// const serviceAccount = require('../configs/storage-gambar-8aca4-firebase-adminsdk-j1azo-11c3db309c.json')

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://storage-gambar-8aca4.appspot.com'
// })



pool.on('error', (err) => {
    console.log(err)
});
// const downloadPDF = async (req, res) => {
//     try {
//       const id = req.params.id;
  
//       const connection = await pool.pool.getConnection();
  
//       const [result] = await connection.execute(
//         'SELECT * FROM files WHERE id = ?',
//         [id]
//       );
  
//       if (result.length === 0) {
//         connection.release();
//         return res.status(404).json({ success: false, error: 'File tidak ditemukan' });
//       }
  
//       const { filename, storage_path } = result[0];
  
//       const file = pool.getAdmin().storage().bucket().file(filename);
//       const fileStream = file.createReadStream();
//       res.setHeader('Content-disposition', `attachment; filename=${filename}`);
//       res.setHeader('Content-type', 'application/pdf');
//       fileStream.pipe(res);
  
//       connection.release();
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: 'Kesalahan Server Internal' });
//     }
//   };


module.exports = {
    // downloadPDF,
uploadPDF (req, res) {
    try {
      const { filename, path } = req.file;
  
       pool.getConnection(function (err, connection){
  
      const bucket = admin.storage().bucket('gs://storage-gambar-8aca4.appspot.com');
       bucket.upload(path, { destination: filename });
  
    //   const [result] =  connection.execute(
    //     'INSERT INTO files (filename, filepath) VALUES (?, ?)',
    //     [filename, `gs://storage-gambar-8aca4.appspot.com/${filename}`]
    //   );
    const query = 'INSERT INTO files (filename, filepath) VALUES (?, ?)';
    connection.query(query,[filename,`gs://storage-gambar-8aca4.appspot.com/${filename}`] , function (err, result) {
        if (err) throw err;

        res.send({
            success: true,
            message: 'upload data successfully',
            data: result
        })
    })
  
      connection.release();
  
    //   res.json({ success: true, id: result.insertId });
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Kesalahan Server Internal' });
    }
  },


    
    getDataPdf(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM files';
            connection.query(query, function (err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },

    // downloadPDF   (req, res)  {
    //     try {
    //       const id = req.params.id;
      
        //   const connection =  pool.pool.getConnection();
      
        //   const [result] =  connection.execute(
        //     'SELECT filename, storage_path FROM pdf_files WHERE id = ?',
        //     [fileId]
        //   );
      
        //   if (result.length === 0) {
        //     connection.release();
        //     return res.status(404).json({ success: false, error: 'File tidak ditemukan' });
        //   }
      
        //   const { filename, storage_path } = result[0];
      
        //   const file = pool.getAdmin().storage().bucket().file(filename);
        //   const fileStream = file.createReadStream();
        //   res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        //   res.setHeader('Content-type', 'application/pdf');
        //   fileStream.pipe(res);
      
        //   connection.release();
    //    pool.pool.getConnection(function (err, connection){
            
    //       const query = 'SELECT filename, filepath FROM files WHERE id = ?';
    //       connection.query(query,[id] , function (err, result) {
    //           if (err) throw err;
    //           if (result.length === 0) {
    //                 connection.release();
    //                 return res.status(404).json({ success: false, error: 'File tidak ditemukan' });
    //               }
              
    //               const { filename, storage_path } = result[0];
              
    //               const file = pool.getAdmin().storage().bucket().file(filename);
    //               const fileStream = file.createReadStream();
    //               res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    //               res.setHeader('Content-type', 'application/pdf');
    //               fileStream.pipe(res);
    //           res.send({
    //               success: true,
    //               message: 'fecth data successfully',
    //               data: result
    //           })
    //       })
        
    //         connection.release();
        
          
    //       });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ success: false, error: 'Kesalahan Server Internal' });
    //     }
    //   }
    // getDetailBerita(req, res) {
    //     const id = req.params.id;
    //     pool.getConnection(function (err, connection) {
    //         if (err) throw err;
    //         const query = 'SELECT * FROM berita WHERE id = ? ';
    //         connection.query(query, [id], function (err, result) {
    //             if (err) throw err;

    //             res.send({
    //                 success: true,
    //                 message: 'Fetch data successfully',
    //                 data: result
    //             })
    //         })

    //         connection.release();
    //     })
    // },

    


    

    // editDataBerita(req, res) {
    //     const id = req.params.id;

    //     // parse data
    //     const data = {
    //         judul: req.body.judul,
    //         deskripsi: req.body.deskripsi,
    //         tanggal_terbit: req.body.tanggal_terbit,
    //         gambar: req.file.path
    //     }

    //     pool.getConnection(function (err, connection) {
    //         if (err) throw err;

    //         const query = 'UPDATE berita SET ? WHERE id = ?; '
    //         connection.query(query, [data, id], function (err, result) {
    //             if (err) throw err;

    //             if (result['affectedRows'] === 0) res.send({
    //                 message: 'There is no record with that id'
    //             })

    //             res.send({
    //                 success: true,
    //                 message: 'Updated successfully',
    //             })
    //         })

    //         connection.release();
    //     })
    // },
    deleteDataPdf(req, res) {
        const id = req.params.id;

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM files WHERE id = ?;'
            connection.query(query, [id], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Deleted successfully',
                })
            })
            connection.release();
        })
    }


}

