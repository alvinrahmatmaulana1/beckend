const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);
const admin = require('firebase-admin')
const serviceAccount = require('./firebaseConfig.json')
const fs = require("fs");
const path = require("path");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://storage-gambar-8aca4.appspot.com/"
})

const bucket = admin.storage().bucket();

pool.on('error', (err) => {
    console.log(err)
});

// const addDataBerita = (req, res) => {
//     const { judul, deskripsi, tanggal_terbit } = req.body;
//     const gambar = req.file;
  
//     if (!gambar) {
//       return res.status(400).send('Tidak ada berkas yang diunggah');
//     }
  
//     const storageRef = bucket.file(gambar.originalname);
//     const fileStream = storageRef.createWriteStream({
//       metadata: {
//         contentType: gambar.mimetype, // Menggunakan tipe konten dari req.file.mimetype
//       },
//     });
  
//     fileStream.on('error', (err) => {
//       console.error(err);
//       res.status(500).send('Terjadi kesalahan saat mengunggah gambar');
//     });
  
//     fileStream.on('finish', () => {
//       const gambarUrl = `https://storage.googleapis.com/${bucket.name}/${gambar.originalname}`;
//       const query = 'INSERT INTO berita (judul, deskripsi, tanggal_terbit, gambar) VALUES (?, ?, ?, ?)';
  
//       pool.getConnection(function (err, connection) {
//         if (err) {
//           console.log(err);
//           res.status(500).send('Terjadi kesalahan saat menghubungkan ke database');
//           return;
//         }
  
//         connection.query(query, [judul, deskripsi, tanggal_terbit, gambarUrl], function (err, result) {
//           connection.release();
  
//           if (err) {
//             console.error(err);
//             res.status(500).send('Terjadi kesalahan saat menyimpan data ke database');
//           } else {
//             res.status(200).send('Berhasil mengunggah gambar dan menyimpan data');
//           }
//         });
//       });
//     });
  
//     gambar.stream.pipe(fileStream);
//   };
module.exports = {
// addDataBerita,
    getDataBerita(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM berita';
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
    getDetailBerita(req, res) {
        const id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM berita WHERE id = ? ';
            connection.query(query, [id], function (err, result) {
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

    // addDataBerita(req, res) {
        // parse data
        // const {
        //     id,
	 
        //     tanggal_terbit,
        //     gambar
        // } = req.body
        // console.log(req.file)
        // const data = {
        //             judul : req.body.judul,
        //             deskripsi : req.body.deskripsi,
        //             tanggal_terbit : req.body.tanggal_terbit,
        //             gambar: req.file.path
        //         }



        // pool.getConnection(function (err, connection) {
        //     if (err) console.log(err);

        //     const query = 'INSERT INTO berita SET ?';
        //     connection.query(query, [data], function (err, result) {
        //             if (err) console.log(err);

        //             res.send({
        //                 success: true,
        //                 message: 'Your record has been saved successfully',
        //             })
        //         })

        //     connection.release();
        // })

        addDataBerita: (req, res) => {
            const { judul, deskripsi, tanggal_terbit } = req.body;
        
            // Pastikan berkas telah diunggah
            if (!req.file) {
              return res.status(400).send('Tidak ada berkas yang diunggah');
            }
        
            // Dapatkan informasi berkas yang diunggah
            const namaBerkas = req.file.filename;
        
            // Simpan data ke database MySQL
            const sql = 'INSERT INTO berita (judul, deskripsi, tanggal_terbit, gambar) VALUES (?, ?, ?, ?)';
            pool.getConnection(function (err, connection) {
              if (err) {
                return res.status(500).send('Terjadi kesalahan saat menghubungkan ke database: ' + err.message);
              }
        
              connection.query(sql, [judul, deskripsi, tanggal_terbit, namaBerkas], function (err, result) {
                connection.release();
        
                if (err) {
                  return res.status(500).send('Terjadi kesalahan saat menyimpan data ke database: ' + err.message);
                }
        
                // Hapus berkas sementara setelah diunggah
                fs.unlinkSync(path.join('public/uploads/', namaBerkas));
                return res.status(200).send('Berhasil mengunggah gambar dan menyimpan data');
              });
            });
          },
        
    

    editDataBerita(req, res) {
        const id = req.params.id;

        // parse data
        const data = {
            judul : req.body.judul,
            deskripsi : req.body.deskripsi,
            tanggal_terbit : req.body.tanggal_terbit,
            gambar: req.file.path
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'UPDATE berita SET ? WHERE id = ?; '
            connection.query(query, [data, id], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    },
    deleteDataBerita(req, res) {
        const id = req.params.id;

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM berita WHERE id = ?;'
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
// const connection = mysql.createConnection(config);
// connection.connect();

// const getDataBerita = async (req,res) => {
//     const data = await new Promise((resolve,reject) => {
//         connection.query('SELECT * FROM berita', function(error,rows){
//             if(rows) {
//                 resolve(rows)
//             } else{
//                 reject([]);
//             }
//         });
//     });
//     if (data) {
//         res.send({
//             success: true,
//             message: 'Berhasil ambil data',
//             data: data
//         });
//     } else {
//         res.send({
//             success: false,
//             message: 'Gagal ambil data!',
//         });
//     }
// }

// const addDataBerita = async(req,res) => {
//     let data = {
//         judul : req.body.judul,
//         deskripsi : req.body.deskripsi,
//         tanggal_terbit : req.body.tanggal_terbit,
//         gambar: req.file.filename
//     }
// //    const gambar = req.file.path
//     const result = await new Promise((resolve,reject) => {
//         connection.query('INSERT INTO berita SET ?;',[data],function(error,rows){
//             if (rows) {
//                 resolve(true)
//             }else{
//                 reject(false)
//             }
//         });
//         console.log(req.file)
//     });
//     if(result){
//         res.send({
//             success : true,
//             message : 'Berhasil menambah data!'
//         });
//     } else {
//         res.send({
//             success: false,
//             message: 'Gagal menambah data'
//         });
//     }
// }

// const editDataBerita = async(req,res) => {
//     let id = req.params.id;

//     let dataEdit= {
//         judul : req.body.judul,
//         deskripsi : req.body.deskripsi,
//         tanggal_terbit : req.body.tanggal_terbit,
//         gambar: req.file.filename
//     }
//     const result = await new Promise((resolve,reject) => {
//         connection.query('UPDATE berita SET ? WHERE id = ?;', [dataEdit,id],function(error,rows){
//             if(rows) {
//                 resolve(true);
//             } else {
//                 reject(false);
//             }
//         });
//     });
//     if(result){
//         res.send({
//             success: true,
//             message: 'Berhasil edit data'
//         });
//     } else{
//         res.send({
//             success: false,
//             message: 'Gagal edit data'
//         });
//     }
// }

// const deleteDataBerita = async(req,res) => {
//     let id = req.params.id;
//     const result = await new Promise((resolve,reject) => {
//         connection.query('DELETE FROM berita WHERE id = ?;',[id],function(error,rows){
//             if(rows){
//                 resolve(true)
//             } else{
//                 reject(false)
//             }
//         });
//     });
//     if(result){
//         res.send({
//             success: true,
//             message: 'Berhasil Hapus Data'
//         });
//     } else {
//         res.send({
//             success: false,
//             message: 'Gagal Hapus Data'
//         });
//     }
// }
