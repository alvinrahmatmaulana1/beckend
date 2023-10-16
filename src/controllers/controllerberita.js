const config = require('../configs/database');
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.connect();

const getDataBerita = async (req,res) => {
    const data = await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM berita', function(error,rows){
            if(rows) {
                resolve(rows)
            } else{
                reject([]);
            }
        });
    });
    if (data) {
        res.send({
            success: true,
            message: 'Berhasil ambil data',
            data: data
        });
    } else {
        res.send({
            success: false,
            message: 'Gagal ambil data!',
        });
    }
}

const addDataBerita = async(req,res) => {
    let data = {
        judul : req.body.judul,
        deskripsi : req.body.deskripsi,
        tanggal_terbit : req.body.tanggal_terbit,
        gambar: req.file.filename
    }
//    const gambar = req.file.path
    const result = await new Promise((resolve,reject) => {
        connection.query('INSERT INTO berita SET ?;',[data],function(error,rows){
            if (rows) {
                resolve(true)
            }else{
                reject(false)
            }
        });
        console.log(req.file)
    });
    if(result){
        res.send({
            success : true,
            message : 'Berhasil menambah data!'
        });
    } else {
        res.send({
            success: false,
            message: 'Gagal menambah data'
        });
    }
}

const editDataBerita = async(req,res) => {
    let id = req.params.id;

    let dataEdit= {
        judul : req.body.judul,
        deskripsi : req.body.deskripsi,
        tanggal_terbit : req.body.tanggal_terbit,
        gambar: req.file.filename
    }
    const result = await new Promise((resolve,reject) => {
        connection.query('UPDATE berita SET ? WHERE id = ?;', [dataEdit,id],function(error,rows){
            if(rows) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
    if(result){
        res.send({
            success: true,
            message: 'Berhasil edit data'
        });
    } else{
        res.send({
            success: false,
            message: 'Gagal edit data'
        });
    }
}

const deleteDataBerita = async(req,res) => {
    let id = req.params.id;
    const result = await new Promise((resolve,reject) => {
        connection.query('DELETE FROM berita WHERE id = ?;',[id],function(error,rows){
            if(rows){
                resolve(true)
            } else{
                reject(false)
            }
        });
    });
    if(result){
        res.send({
            success: true,
            message: 'Berhasil Hapus Data'
        });
    } else {
        res.send({
            success: false,
            message: 'Gagal Hapus Data'
        });
    }
}
module.exports = {
    getDataBerita,
    addDataBerita,
    editDataBerita,
    deleteDataBerita
    
}