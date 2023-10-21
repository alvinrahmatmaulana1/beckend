const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const mysql = require('mysql');
// const session = require('express-session');
// const { sessionConfig } = require('./redisConfig');

// const connection = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'bku'
// });


// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(session({
//     store: new session.MemoryStore({
//       checkPeriod: 360000000,
//     }),
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
//   }));


// app.use(session(sessionConfig));

//definis enviroment secara global (.env)
require('dotenv').config();

// convert data ke json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//memanggil route produk
const appRoute = require('./src/routers');
app.use('/', appRoute);

//menjalankan server sesuai dengan port yang terdaftar di .env (8080)
app.listen(process.env.APP_PORT, () => {
    console.log(`Server Berjalan http://localhost:${process.env.APP_PORT}`);
});