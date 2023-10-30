const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);
pool.on('error', (err) => {
    console.log(err)
});
module.exports = {

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

    addDataBerita(req, res) {
        // parse data
        // const {
        //     id,
        //     judul,
        //     deskripsi,
        //     tanggal_terbit,
        //     gambar
        // } = req.body
        console.log(req.file)
        const data = {
                    judul : req.body.judul,
                    deskripsi : req.body.deskripsi,
                    tanggal_terbit : req.body.tanggal_terbit,
                    gambar: req.file.path
                }

        

        pool.getConnection(function (err, connection) {
            if (err) console.log(err);

            const query = 'INSERT INTO berita SET ?';
            connection.query(query, [data], function (err, result) {
                    if (err) console.log(err);

                    res.send({
                        success: true,
                        message: 'Your record has been saved successfully',
                    })
                })

            connection.release();
        })
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
